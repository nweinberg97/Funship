// Bakes the rendered home page into index.html so the page is never blank,
// even in previews that don't run JavaScript (Quick Look, iOS Files, email previews).
// Usage: node prerender.js  (needs Playwright; build.py runs it when available)
let chromium;
try { ({ chromium } = require('playwright')); } catch (e) { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const fs = require('fs'), path = require('path');
const file = path.join(__dirname, 'index.html');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  await p.goto('file://' + file + '#/');
  await p.waitForSelector('.harbour');
  const html = await p.$eval('#app', (el) => el.innerHTML);
  await b.close();
  let src = fs.readFileSync(file, 'utf8');
  src = src.replace(/<div id="app">[\s\S]*?<\/div><!--\/app-->/, '<div id="app">' + html + '</div><!--/app-->');
  fs.writeFileSync(file, src);
  console.log('prerendered home page', Math.round(html.length / 1024), 'KB');
})();
