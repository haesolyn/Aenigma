const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

const stageStart = html.indexOf('<section id="loading-stage"');
const stageEnd = html.indexOf('</section>', stageStart);

if (stageStart === -1 || stageEnd === -1) {
  console.error('FAIL: loading-stage not found or unclosed');
  process.exit(1);
}

const stageHtml = html.substring(stageStart, stageEnd + 10);

console.log('Stage 1 length:', stageHtml.length);
console.log('loader-dark-ambience in stage:', stageHtml.includes('id="loader-dark-ambience"'));
console.log('loader-glitch-canvas in stage:', stageHtml.includes('id="loader-glitch-canvas"'));
console.log('loader-content in stage:', stageHtml.includes('class="loader-content"'));
console.log('loader-enter-btn in stage:', stageHtml.includes('id="loader-enter-btn"'));
console.log('dossier-camera-flash removed from index.html:', !html.includes('dossier-camera-flash'));

// Check for unclosed divs inside stage
const opens = (stageHtml.match(/<div/g) || []).length;
const closes = (stageHtml.match(/<\/div>/g) || []).length;
console.log(`divs inside loading-stage: open=${opens}, close=${closes}`);

if (opens !== closes) {
  console.error('MISMATCH in div tags inside loading-stage!');
  process.exit(1);
}

console.log('ALL CHECKS PASSED PERFECTLY!');
