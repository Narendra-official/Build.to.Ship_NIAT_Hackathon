const https = require('https');

function check() {
  const req = https.request('https://build-to-ship-niat-hackathon-advp.onrender.com/api/auth/register', {
    method: 'OPTIONS',
    headers: {
      'Origin': 'https://build-to-ship-niat-hackathon.vercel.app',
      'Access-Control-Request-Method': 'POST'
    }
  }, (res) => {
    const origin = res.headers['access-control-allow-origin'];
    console.log(new Date().toISOString(), 'CORS-Origin:', origin);
    if (origin === 'https://build-to-ship-niat-hackathon.vercel.app') {
      console.log("DEPLOYMENT COMPLETED AND WORKING!");
      process.exit(0);
    }
  });
  req.end();
}

setInterval(check, 5000);
check();
