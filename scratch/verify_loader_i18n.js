const fs = require('fs');

console.log('--- Verifying Loading Screen Localization ---');

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

// 1. Check src/state.js
const stateJs = fs.readFileSync('src/state.js', 'utf8');
assert(stateJs.includes("navLang.startsWith('id')"), 'state.js detects Indonesian browser language');

// 2. Check src/i18n.js
const i18nJs = fs.readFileSync('src/i18n.js', 'utf8');
assert(i18nJs.includes('export const LOADER_DECRYPT_I18N'), 'i18n.js exports LOADER_DECRYPT_I18N');
assert(i18nJs.includes('◈ BERKAS KASUS SEKTOR 7 TERDEKRIPSI ◈'), 'i18n.js has Indonesian badge_decrypted');
assert(i18nJs.includes('[MENDEKRIPSI ARSIP BERKAS SEKTOR 7...]'), 'i18n.js has Indonesian decrypting_telemetry');
assert(i18nJs.includes('[AKSES DIIZINKAN: SELAMAT DATANG DETEKTIF]'), 'i18n.js has Indonesian access_granted');
assert(i18nJs.includes('SEK.04'), 'i18n.js has Indonesian sector badge SEK.04');

// 3. Check src/ui.js
const uiJs = fs.readFileSync('src/ui.js', 'utf8');
assert(uiJs.includes('loader-sector-badge'), 'ui.js updates loader-sector-badge');
assert(uiJs.includes('LOADER_DECRYPT_I18N'), 'ui.js imports LOADER_DECRYPT_I18N');

// 4. Check src/main.js
const mainJs = fs.readFileSync('src/main.js', 'utf8');
assert(mainJs.includes('ui.applyLanguage(state.currentLanguage)'), 'main.js calls applyLanguage immediately on boot');
assert(mainJs.includes('LOADER_DECRYPT_I18N'), 'main.js imports and uses LOADER_DECRYPT_I18N');
assert(mainJs.includes('dec.badge_decrypted'), 'main.js renders dec.badge_decrypted dynamically');
assert(mainJs.includes('dec.access_granted'), 'main.js renders dec.access_granted dynamically');
assert(mainJs.includes('dec.dispatching_dossier'), 'main.js renders dec.dispatching_dossier dynamically');

// 5. Check dist/bundle.js
const bundleJs = fs.readFileSync('dist/bundle.js', 'utf8');
assert(bundleJs.includes('LOADER_DECRYPT_I18N'), 'bundle.js contains LOADER_DECRYPT_I18N');
assert(bundleJs.includes('◈ BERKAS KASUS SEKTOR 7 TERDEKRIPSI ◈'), 'bundle.js contains Indonesian badge');
assert(bundleJs.includes('[MENDEKRIPSI ARSIP BERKAS SEKTOR 7...]'), 'bundle.js contains Indonesian telemetry');

console.log(`\nResult: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
