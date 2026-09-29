# WattWise - AI for Sustainability

WattWise is an AI-powered Commercial HVAC & Energy Optimizer. It solves the problem of commercial buildings wasting massive amounts of energy cooling or heating empty spaces. 

## Problem Being Solved
Commercial buildings waste up to 30% of their energy due to static HVAC schedules and lack of dynamic occupancy adaptation.

## Solution
WattWise analyzes IoT sensor data, weather forecasts, and historical energy usage to predict building thermal dynamics and optimal HVAC scheduling, automatically reducing energy waste and carbon emissions.

## Architecture
- **Frontend**: React, Vite, Tailwind CSS, Recharts
- **Backend**: Node.js, Express
- **AI**: Generative models and predictive thermal modeling (mocked via APIs)

## Local Setup
1. Clone the repository
2. Run `npm run install:all` to install dependencies for both client and server.
3. Copy `.env.example` to `.env` in the server directory and provide necessary variables.
4. Run `npm run dev` to start both the frontend and backend servers.

## Environment Variables
See `.env.example` for required variables. Never commit actual `.env` files.

## Features
- AI-driven thermal optimization recommendations
- Anomaly detection for energy consumption
- Historical action log and impact visualization
- Carbon emissions saved (CO2) tracking
