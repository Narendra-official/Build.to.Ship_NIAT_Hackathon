const axios = require('axios');
const crypto = require('crypto');

const email = `test_login_${crypto.randomBytes(4).toString('hex')}@example.com`;
const password = 'password123';

async function testFlow() {
  console.log(`[1] Registering user: ${email}`);
  try {
    const regRes = await axios.post('https://build-to-ship-niat-hackathon-advp.onrender.com/api/auth/register', {
      email,
      password,
      fullName: 'Test User'
    });
    console.log("Register SUCCESS:", regRes.data);
  } catch (err) {
    console.log("Register ERROR:", err.response?.data || err.message);
    return;
  }

  console.log(`\n[2] Logging in user: ${email}`);
  try {
    const loginRes = await axios.post('https://build-to-ship-niat-hackathon-advp.onrender.com/api/auth/login', {
      email,
      password
    });
    console.log("Login SUCCESS:", loginRes.data);
  } catch (err) {
    console.log("Login ERROR:", err.response?.data || err.message);
  }
}

testFlow();
