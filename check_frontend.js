const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
const url = 'https://build-to-ship-niat-hackathon.vercel.app/';

async function check() {
  const htmlRes = await fetch(url);
  const html = await htmlRes.text();
  const match = html.match(/src="(\/assets\/index-[^"]+\.js)"/);
  if (!match) {
    console.log("NO JS BUNDLE FOUND");
    return;
  }
  const jsUrl = url + match[1].substring(1);
  const jsRes = await fetch(jsUrl);
  const js = await jsRes.text();
  
  const matches = js.match(/https:\/\/build-to-ship-niat-hackathon-advp\.onrender\.com[^"']*/g);
  if (matches) {
    console.log("API URL in bundle:", [...new Set(matches)]);
  } else {
    console.log("API URL NOT FOUND IN BUNDLE");
  }
}
check();
