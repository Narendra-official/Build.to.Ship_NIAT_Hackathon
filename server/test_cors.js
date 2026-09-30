const express = require('express');
const cors = require('cors');

const app = express();
const allowedOrigins = [
  "https://build-to-ship-niat-hackathon.vercel.app/",
  "https://build-to-ship-niat-hackathon.vercel.app",
  "http://localhost:5173"
];
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.post('/', (req, res) => res.json({ok: true}));

const server = app.listen(5001, () => {
  const req = require('http').request('http://localhost:5001/', {
    method: 'OPTIONS',
    headers: {
      'Origin': 'https://build-to-ship-niat-hackathon.vercel.app',
      'Access-Control-Request-Method': 'POST'
    }
  }, (res) => {
    console.log("CORS-Origin returned:", res.headers['access-control-allow-origin']);
    server.close();
  });
  req.end();
});
