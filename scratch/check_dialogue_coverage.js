const fs = require('fs');

// Read dialogue_i18n.js
const dContent = fs.readFileSync('./src/dialogue_i18n.js', 'utf8');
const fakeModule = {};
const code = dContent.replace('export const DIALOGUE_I18N_FULL =', 'fakeModule.DIALOGUE_I18N_FULL =');
eval(code);

const dNodes = Object.keys(fakeModule.DIALOGUE_I18N_FULL);
console.log('Total nodes in DIALOGUE_I18N_FULL:', dNodes.length);
console.log('Node list:', dNodes);

// Check cases.js nodes
const cContent = fs.readFileSync('./src/cases.js', 'utf8');
const cMatches = [...cContent.matchAll(/^\s{4}([a-zA-Z0-9_]+):\s*\{/gm)].map(m => m[1]);
console.log('Possible nodes in cases.js:', cMatches);

// Check which cases nodes might be missing
const missing = cMatches.filter(n => !fakeModule.DIALOGUE_I18N_FULL[n]);
console.log('Missing from DIALOGUE_I18N_FULL:', missing);
