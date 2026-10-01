const fs = require('fs');

const dFull = fs.readFileSync('src/dialogue_i18n.js', 'utf8');
const fake = {};
eval(dFull.replace(/export const /g, 'fake.'));

console.log('DIALOGUE_I18N_FULL keys:', Object.keys(fake.DIALOGUE_I18N_FULL).length);
console.log('CLUES_I18N_FULL keys:', Object.keys(fake.CLUES_I18N_FULL).length);
console.log('NEW_POIS_I18N keys:', Object.keys(fake.NEW_POIS_I18N).length);

const langs = ['en', 'id', 'zh', 'ja', 'ko', 'es', 'fr', 'de', 'ru', 'it', 'pt', 'ar'];

// Check one dialogue node across all languages:
const gNode = fake.DIALOGUE_I18N_FULL['graves_dialogue_start'];
console.log('\n--- graves_dialogue_start across 12 languages ---');
for (const l of langs) {
  console.log(`[${l}] ${gNode.speaker[l]}: "${gNode.text[l].substring(0, 40)}..."`);
  console.log(`      Opt 1: "${gNode.options[0][l].substring(0, 40)}..."`);
}

// Check clues
console.log('\n--- clue_poison_needle across 12 languages ---');
for (const l of langs) {
  console.log(`[${l}] ${fake.CLUES_I18N_FULL['clue_poison_needle'].title[l]}`);
}
