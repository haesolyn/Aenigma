const fs = require('fs');

console.log('--- Verifying Detective Case Dossier Transition ---');

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
assert(indexHtml.includes('id="detective-case-transition"'), 'index.html has detective-case-transition');
assert(indexHtml.includes('id="dossier-rubber-stamp"'), 'index.html has dossier-rubber-stamp');
assert(indexHtml.includes('dossier-evidence-tape'), 'index.html has dossier-evidence-tape');

// 2. Check styles/loader.css
const loaderCss = fs.readFileSync('styles/loader.css', 'utf8');
assert(loaderCss.includes('.detective-case-transition'), 'loader.css has .detective-case-transition');
assert(loaderCss.includes('.dossier-folder-container'), 'loader.css has .dossier-folder-container');
assert(loaderCss.includes('.dossier-rubber-stamp.stamped'), 'loader.css has stamped rubber stamp effect');
assert(loaderCss.includes('.stamp-main-text'), 'loader.css has stamp main text styling');

// 3. Check src/i18n.js
const i18nJs = fs.readFileSync('src/i18n.js', 'utf8');
assert(i18nJs.includes('export const DOSSIER_I18N'), 'i18n.js exports DOSSIER_I18N');
assert(i18nJs.includes("stamp_main: 'AKSES TKP DIIZINKAN'"), 'i18n.js id has AKSES TKP DIIZINKAN');
assert(i18nJs.includes("stamp_main: 'CRIME SCENE AUTHORIZED'"), 'i18n.js en has CRIME SCENE AUTHORIZED');

// 4. Check src/main.js
const mainJs = fs.readFileSync('src/main.js', 'utf8');
assert(mainJs.includes('updateDossierLanguage(state.currentLanguage)'), 'main.js updates dossier language');
assert(mainJs.includes('rubberStamp.classList.add(\'stamped\')'), 'main.js applies stamped class to rubber stamp');
assert(mainJs.includes('}, 2200);'), 'main.js holds aenigmArchive for 2200ms');

// 5. Check dist/bundle.js
const bundleJs = fs.readFileSync('dist/bundle.js', 'utf8');
assert(bundleJs.includes('DOSSIER_I18N'), 'bundle.js has DOSSIER_I18N');
assert(bundleJs.includes('CRIME SCENE AUTHORIZED'), 'bundle.js has CRIME SCENE AUTHORIZED');
assert(bundleJs.includes('AKSES TKP DIIZINKAN'), 'bundle.js has AKSES TKP DIIZINKAN');

console.log(`\nResult: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
