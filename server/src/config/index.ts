import dotenv from 'dotenv';
import path from 'path';

// Load .env from root and server directories
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  jwtSecret: process.env.JWT_SECRET,
  geminiApiKey: process.env.GEMINI_API_KEY,
};

// Validate critical variables
const requiredConfig = ['supabaseUrl', 'supabaseServiceKey', 'jwtSecret', 'geminiApiKey'];
for (const key of requiredConfig) {
  if (!config[key as keyof typeof config]) {
    console.error(`Missing required environment variable: ${key}`);
    // Don't crash immediately if we are just importing config, but log it
  }
}
