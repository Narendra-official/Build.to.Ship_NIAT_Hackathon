const axios = require('axios');

async function test() {
  try {
    const res = await axios.post('https://build-to-ship-niat-hackathon-advp.onrender.com/api/auth/register', {
      email: 'test_node_555@example.com',
      password: 'password123',
      fullName: 'Test User'
    });
    console.log("SUCCESS:", res.data);
  } catch (err) {
    console.log("ERROR STATUS:", err.response?.status);
    console.log("ERROR DATA:", err.response?.data);
  }
}
test();
