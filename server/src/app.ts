import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config';
import authRoutes from './routes/authRoutes';
import recordRoutes from './routes/recordRoutes';
import analysisRoutes from './routes/analysisRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware
const corsOptions = {
  origin: config.nodeEnv === 'production' ? config.clientUrl : 'http://localhost:5173',
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is healthy', timestamp: new Date() });
});

app.use('/api/auth', authRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/history', analysisRoutes);
app.use('/api/analytics', analysisRoutes); // Alias for analytics
app.use('/api/analysis', analysisRoutes); // Alias for frontend API

// Serve frontend static files in production
if (config.nodeEnv === 'production') {
  const clientBuildPath = path.join(__dirname, '../../client/dist');
  app.use(express.static(clientBuildPath));
  app.get('/(.*)', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// Error handling must be last
app.use(errorHandler);

export default app;
