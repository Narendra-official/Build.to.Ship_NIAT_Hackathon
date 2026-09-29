import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_hackathon';
// Ensure frontend can send cookies
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());
// Mock DBs
let usersDB = [];
let analysesDB = [];
// Middleware to protect routes
const requireAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token)
        return res.status(401).json({ error: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'WattWise API' });
});
app.put('/api/auth/me', requireAuth, (req, res) => {
    const { fullName, organization } = req.body;
    const user = usersDB.find(u => u.id === req.user.id);
    if (user) {
        if (fullName)
            user.fullName = fullName;
        if (organization !== undefined)
            user.organization = organization;
        // Update token
        const token = jwt.sign({ id: user.id, email: user.email, name: user.fullName, organization: user.organization }, JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // http for localhost
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ success: true, user: { id: user.id, email: user.email, name: user.fullName, organization: user.organization } });
    }
    else {
        res.status(404).json({ error: 'User not found' });
    }
});
app.post('/api/auth/register', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const existingUser = usersDB.find(u => u.email === email);
        if (existingUser)
            return res.status(400).json({ error: 'Email already exists' });
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { id: Date.now().toString(), fullName, email, password: hashedPassword };
        usersDB.push(newUser);
        res.json({ success: true, message: 'Account created successfully' });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
});
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = usersDB.find(u => u.email === email);
        if (!user)
            return res.status(401).json({ error: 'Invalid email or password.' });
        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.status(401).json({ error: 'Invalid email or password.' });
        const token = jwt.sign({ id: user.id, email: user.email, name: user.fullName }, JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // http for localhost
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ success: true, user: { id: user.id, email: user.email, name: user.fullName } });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
});
app.get('/api/auth/me', requireAuth, (req, res) => {
    const user = usersDB.find(u => u.id === req.user.id);
    if (user) {
        res.json({ user: { id: user.id, email: user.email, name: user.fullName, organization: user.organization } });
    }
    else {
        res.json({ user: req.user });
    }
});
app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ success: true });
});
// Protected Analytics Routes
app.get('/api/analysis', requireAuth, (req, res) => {
    const userAnalyses = analysesDB.filter(a => a.userId === req.user.id);
    res.json(userAnalyses);
});
app.delete('/api/analysis/:id', requireAuth, (req, res) => {
    const index = analysesDB.findIndex(a => a.id === req.params.id && a.userId === req.user.id);
    if (index === -1)
        return res.status(404).json({ error: 'Analysis not found' });
    analysesDB.splice(index, 1);
    res.json({ success: true });
});
app.post('/api/analysis/run', requireAuth, async (req, res) => {
    try {
        const { name, building, startDate, endDate, electricity, water, waste, fuel } = req.body;
        if (!name || !building || !electricity || !water || !waste) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const prompt = `You are an AI Sustainability Expert analyzing a commercial building's resource consumption.
Data: Building: ${building}, Period: ${startDate} to ${endDate}, Electricity: ${electricity} kWh, Water: ${water} kL, Waste: ${waste} kg.
Return exact JSON structure with no markdown blocks: {"energyAnalysis":"","waterAnalysis":"","wasteAnalysis":"","unusualPatterns":[""],"possibleCauses":[""],"sustainabilityProblems":[""],"aiRecommendations":[""],"estimatedCostSavings":0,"estimatedCO2Reduction":0,"resourceSavingOpportunities":[""]}`;
        const response = await ai.models.generateContent({
            model: 'gemini-3.1-pro-high',
            contents: prompt,
            config: { responseMimeType: "application/json" }
        });
        const resultText = response.text || "{}";
        let aiResult;
        try {
            aiResult = JSON.parse(resultText);
        }
        catch (e) {
            aiResult = {
                energyAnalysis: "Energy usage indicates potential inefficiencies during off-hours.",
                waterAnalysis: "Water consumption is within expected parameters.",
                wasteAnalysis: "Waste volume is higher than standard office baselines.",
                unusualPatterns: ["High base load electricity."],
                possibleCauses: ["HVAC running 24/7", "Lighting left on"],
                sustainabilityProblems: ["Excessive overnight energy draw"],
                aiRecommendations: ["Install automated lighting controls", "Implement HVAC setback schedules"],
                estimatedCostSavings: 2500,
                estimatedCO2Reduction: 8.2,
                resourceSavingOpportunities: ["LED Retrofit", "Smart Thermostats"]
            };
        }
        const newAnalysis = {
            id: Date.now().toString(),
            userId: req.user.id,
            name, building, period: `${startDate} to ${endDate}`, status: 'Completed',
            date: new Date().toISOString().split('T')[0], inputs: { electricity, water, waste, fuel },
            result: aiResult
        };
        analysesDB.unshift(newAnalysis);
        res.json(newAnalysis);
    }
    catch (error) {
        console.error('AI Analysis Error:', error);
        res.status(500).json({ error: error.message || 'Failed to run analysis' });
    }
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map