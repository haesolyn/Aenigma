const fs = require('fs');
const path = require('path');

const mainI18nPath = path.join(__dirname, '..', 'src', 'i18n.js');
let mI18nContent = fs.readFileSync(mainI18nPath, 'utf8');

mI18nContent = mI18nContent.replace(/^import\s+[\s\S]*?from\s+['"][^'"]+['"];?\r?\n/gm, '');
mI18nContent = mI18nContent.replace(/^export\s+(const|let|var|class|function)\s+/gm, '$1 ');

const sandbox = {};
const fn = new Function('sandbox', mI18nContent + '\nsandbox.UI_TRANSLATIONS = UI_TRANSLATIONS;\nsandbox.t = t;');
fn(sandbox);

const keysToCheck = [
  'intellect_name', 'intellect_desc',
  'psyche_name', 'psyche_desc',
  'physique_name', 'physique_desc',
  'motorics_name', 'motorics_desc',
  'creator_title', 'creator_subtitle',
  'name_label', 'alias_label',
  'facets_title', 'signature_title', 'vices_title',
  'points_available', 'start_inquiry'
];

const langs = ['en', 'id', 'zh', 'ja', 'ko'];
const missingKeys = {};

for (const lang of langs) {
  missingKeys[lang] = [];
  for (const k of keysToCheck) {
    const val = sandbox.t(k, lang);
    if (!val) {
      missingKeys[lang].push(k);
    }
  }
}

console.log('Missing UI translation keys:', missingKeys);
