import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config';

const genAI = new GoogleGenerativeAI(config.geminiApiKey || '');

export const analyzeSustainabilityData = async (
  recordType: string, 
  amount: number, 
  unit: string, 
  cost: number, 
  periodDays: number
) => {
  if (!config.geminiApiKey) {
    throw new Error('Gemini API key is not configured');
  }

  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

  const prompt = `
    You are an expert AI Sustainability Analyst. Analyze the following energy usage record:
    - Type: ${recordType}
    - Amount used: ${amount} ${unit}
    - Duration: ${periodDays} days
    - Cost: $${cost}
    
    Provide a structured JSON response with no markdown formatting or code blocks. The response must exactly match this JSON schema:
    {
      "summary": "A 1-2 sentence overview of this usage.",
      "findings": [
        {
          "title": "Short title",
          "description": "Detailed explanation of the finding",
          "severity": "low" | "medium" | "high"
        }
      ],
      "recommendations": [
        {
          "title": "Actionable recommendation",
          "action": "Specific step to take",
          "reason": "Why this helps",
          "priority": "low" | "medium" | "high"
        }
      ]
    }
  `;

  try {
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

    const text = result.response.text();
    if (!text) {
      throw new Error("Empty response from AI");
    }

    return JSON.parse(text);
  } catch (error) {
    console.error("AI Analysis failed:", error);
    throw error;
  }
};
