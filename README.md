# AI-Powered Sustainability Solution: Energy Optimizer

🚀 **[Live Demo: Energy Optimizer](https://build-to-ship-niat-hackathon.vercel.app/)**

## Problem Statement
Small to medium businesses often struggle to monitor, understand, and reduce their energy usage and carbon footprint. They lack the resources to hire dedicated sustainability experts.

## Solution Description
An AI-powered web application that allows users to log their energy consumption (electricity, gas, water) and receive actionable, structured insights from an AI sustainability expert, along with deterministic carbon footprint calculation.

## Target Users
- Small business owners
- Facility managers
- Sustainability-conscious individuals

## Features
- Secure JWT-based authentication
- Energy usage logging and historical tracking
- Deterministic carbon footprint calculations (kg CO2)
- AI-driven analysis of energy usage with prioritized recommendations
- Row-level security for data privacy

## Architecture
- **Backend:** Node.js, Express, TypeScript
- **Database:** Supabase (PostgreSQL)
- **AI Integration:** Google Gemini
- **Validation:** Zod
- **Security:** bcrypt, JWT, CORS, RLS

## Backend Setup
1. Clone the repository
2. Navigate to the `server` directory
3. Run `npm install`
4. Copy `.env.example` to `.env` and fill in the values
5. Run `npm run dev` to start the server

## Environment Variables
- `PORT`
- `NODE_ENV`
- `CLIENT_URL`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `JWT_SECRET`
- `GEMINI_API_KEY`

## Database Migration
Run the SQL script located at `supabase/migrations/001_initial_schema.sql` in your Supabase SQL Editor.

## API Documentation
- `POST /api/auth/register` - Create an account
- `POST /api/auth/login` - Authenticate
- `GET /api/auth/me` - Get current user profile
- `POST /api/auth/logout` - Logout

- `POST /api/records` - Log energy usage
- `GET /api/records` - List past logs
- `POST /api/records/:id/analyze` - Trigger AI analysis

- `GET /api/history` - Retrieve all analyses and linked records
- `GET /api/health` - Server health check

## Live Demo
Check out the live application here: **[Energy Optimizer](https://build-to-ship-niat-hackathon.vercel.app/)**

## Deployment
This full-stack application is deployed on Vercel. It relies on standard environment variables for configuration.

## Demo Workflow
1. Register a new user.
2. Log an energy record (e.g., 500 kWh of electricity for a month).
3. Request an AI analysis of that record.
4. View the deterministic carbon footprint and the AI's recommendations.
