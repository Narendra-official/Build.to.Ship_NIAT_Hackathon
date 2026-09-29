const fs = require('fs');

async function runTests() {
  const BASE_URL = 'http://localhost:5000/api';
  let token = '';
  let recordId = '';

  console.log('--- STARTING E2E API TESTS ---');

  // 1. Register
  console.log('\n[1] Registering user...');
  const regRes = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: `test${Date.now()}@example.com`, password: 'password123' })
  });
  const regData = await regRes.json();
  if (!regData.success) {
    console.error('Registration failed:', regData.error);
    return;
  }
  token = regData.data.token;
  console.log('Success! Token received.');

  // 2. Log Energy Record
  console.log('\n[2] Logging energy record...');
  const recRes = await fetch(`${BASE_URL}/records`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({
      type: 'electricity',
      amount: 450,
      unit: 'kWh',
      period_start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      period_end: new Date().toISOString(),
      cost: 65.5
    })
  });
  const recData = await recRes.json();
  if (!recData.success) {
    console.error('Failed to log record:', recData.error);
    return;
  }
  recordId = recData.data.id;
  console.log('Success! Record ID:', recordId);

  // 3. Analyze Record with Gemini
  console.log('\n[3] Triggering AI analysis (Gemini)...');
  const analyzeRes = await fetch(`${BASE_URL}/records/${recordId}/analyze`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const analyzeData = await analyzeRes.json();
  if (!analyzeData.success) {
    console.error('AI Analysis failed:', analyzeData.error);
    return;
  }
  console.log('Success! AI Analysis Results:');
  console.dir(analyzeData.data, { depth: null });

  console.log('\n--- ALL E2E TESTS PASSED ---');
}

runTests().catch(console.error);
