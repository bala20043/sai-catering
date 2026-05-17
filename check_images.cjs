const https = require('https');
const fs = require('fs');

const fileContent = fs.readFileSync('src/lib/constants.ts', 'utf8');
const urlRegex = /https:\/\/images\.pexels\.com\/photos\/[0-9]+\/pexels-photo-[0-9]+\.jpeg\?auto=compress&cs=tinysrgb&w=[0-9]+/g;
const urls = [...new Set(fileContent.match(urlRegex) || [])];

console.log(`Checking ${urls.length} unique URLs...`);

let checked = 0;
let broken = [];

urls.forEach(url => {
  https.get(url, (res) => {
    checked++;
    if (res.statusCode !== 200) {
      console.log(`[BROKEN ${res.statusCode}] ${url}`);
      broken.push(url);
    }
    if (checked === urls.length) {
      console.log('--- DONE ---');
      console.log(`Total broken images: ${broken.length}`);
    }
  }).on('error', (e) => {
    checked++;
    console.log(`[ERROR] ${url} : ${e.message}`);
    broken.push(url);
    if (checked === urls.length) {
      console.log('--- DONE ---');
      console.log(`Total broken images: ${broken.length}`);
    }
  });
});
