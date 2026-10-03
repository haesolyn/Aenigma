const fs = require('fs');

console.log('--- Verifying 1-100% Progress Indicator Effects ---');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

// 1. Check index.html
const indexHtml = fs.readFileSync('index.html', 'utf8');
assert(indexHtml.includes('loader-sector-badge'), 'index.html has loader-sector-badge');
assert(indexHtml.includes('terminal-cursor'), 'index.html has terminal-cursor');
assert(indexHtml.includes('loader-pct-container'), 'index.html has loader-pct-container');

// 2. Check styles/loader.css
const loaderCss = fs.readFileSync('styles/loader.css', 'utf8');
assert(loaderCss.includes('.loader-progress-pct.milestone-flash'), 'loader.css has milestone-flash');
assert(loaderCss.includes('.progress-track::before'), 'loader.css has calibration notches');
assert(loaderCss.includes('.progress-fill::after'), 'loader.css has laser spark head');
assert(loaderCss.includes('.progress-track.complete-surge'), 'loader.css has complete-surge effect');

// 3. Check src/main.js
const mainJs = fs.readFileSync('src/main.js', 'utf8');
assert(mainJs.includes('milestone-flash'), 'main.js handles milestone-flash');
assert(mainJs.includes('complete-surge'), 'main.js handles complete-surge');
assert(mainJs.includes('lastMilestone'), 'main.js tracks lastMilestone');

// 4. Check dist/bundle.js
const bundleJs = fs.readFileSync('dist/bundle.js', 'utf8');
assert(bundleJs.includes('milestone-flash'), 'bundle.js has milestone-flash');
assert(bundleJs.includes('complete-surge'), 'bundle.js has complete-surge');

console.log(`\nResult: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
