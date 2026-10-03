const fs = require('fs');

console.log('--- Verifying Archive & Red Danger Vignette Fixes ---');

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
assert(indexHtml.includes('id="loader-title-ornament"'), 'index.html has loader-title-ornament ID');
assert(indexHtml.includes('ENTER THE ARCHIVE'), 'index.html button says ENTER THE ARCHIVE');
assert(!indexHtml.includes('ENTER THE MIND'), 'index.html has no ENTER THE MIND');

// 2. Check src/i18n.js
const i18nJs = fs.readFileSync('src/i18n.js', 'utf8');
assert(i18nJs.includes("loader_enter: 'MASUK KE ARSIP',"), 'i18n.js id has MASUK KE ARSIP');
assert(i18nJs.includes("loader_enter: 'ENTER THE ARCHIVE',"), 'i18n.js en has ENTER THE ARCHIVE');
assert(i18nJs.includes("loader_enter: 'アーカイブへアクセス',"), 'i18n.js ja has アーカイブへアクセス');
assert(!i18nJs.includes("loader_enter: 'MASUKI PIKIRAN'"), 'i18n.js has no MASUKI PIKIRAN');
assert(!i18nJs.includes("loader_enter: 'ENTER THE MIND'"), 'i18n.js has no ENTER THE MIND');

// 3. Check src/state.js
const stateJs = fs.readFileSync('src/state.js', 'utf8');
assert(stateJs.includes("document.body.classList.remove('in-danger')"), 'state.js reset removes in-danger class');
assert(stateJs.includes("this.checkSurvivalState()"), 'state.js reset calls checkSurvivalState');

// 4. Check src/ui.js
const uiJs = fs.readFileSync('src/ui.js', 'utf8');
assert(uiJs.includes("btn-retry-inquiry") && uiJs.includes("document.body.classList.remove('in-danger');"), 'ui.js btn-retry-inquiry explicitly removes in-danger class');
assert(uiJs.includes("this.updateHUD();"), 'ui.js btn-retry-inquiry updates HUD vitals');

// 5. Check src/main.js
const mainJs = fs.readFileSync('src/main.js', 'utf8');
assert(mainJs.includes("targetStem = 'aenigm'"), 'main.js defines targetStem aenigm');
assert(mainJs.includes("targetSuffix = 'Archive'"), 'main.js defines targetSuffix Archive');
assert(mainJs.includes("targetFull = 'aenigmArchive'"), 'main.js defines targetFull aenigmArchive');
assert(mainJs.includes("brand-decrypted-wrapper"), 'main.js creates brand-decrypted-wrapper');

// 6. Check styles/loader.css
const loaderCss = fs.readFileSync('styles/loader.css', 'utf8');
assert(loaderCss.includes('.tape-cassette-unit.fast-forward'), 'loader.css has fast-forward cassette styling');
assert(loaderCss.includes('.title-ornament.decrypting'), 'loader.css has title decrypting styling');
assert(loaderCss.includes('.title-ornament.decrypted'), 'loader.css has title decrypted styling');
assert(loaderCss.includes('.brand-stem'), 'loader.css has brand-stem styling');
assert(loaderCss.includes('.brand-suffix'), 'loader.css has brand-suffix styling');

// 7. Check dist/bundle.js
const bundleJs = fs.readFileSync('dist/bundle.js', 'utf8');
assert(bundleJs.includes('aenigmArchive'), 'bundle.js contains aenigmArchive');
assert(bundleJs.includes('ENTER THE ARCHIVE'), 'bundle.js contains ENTER THE ARCHIVE');
assert(bundleJs.includes('MASUK KE ARSIP'), 'bundle.js contains MASUK KE ARSIP');

console.log(`\nResult: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
