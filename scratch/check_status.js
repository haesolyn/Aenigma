const fs = require('fs');

const dFull = fs.readFileSync('./src/dialogue_i18n.js', 'utf8');
const dMatch = dFull.match(/"([^"]+)":\s*\{/g);
console.log('Matches in dialogue_i18n:', dMatch ? dMatch.length : 0);

// Let's check CLUES_I18N in src/i18n.js
const i18n = fs.readFileSync('./src/i18n.js', 'utf8');
console.log('i18n length:', i18n.length);
