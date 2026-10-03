const cases = require('../src/cases.js');
const cNodes = cases.CASE_DATA.dialogueNodes;

const checkNodes = [
  'examine_pendulum_start',
  'pendulum_pry_win',
  'examine_watch_start',
  'examine_safe_start',
  'madame_dialogue_start',
  'examine_gantry_lantern',
  'examine_chime_bell'
];

for (const n of checkNodes) {
  console.log(`\n=== NODE: ${n} ===`);
  const node = cNodes[n];
  if (!node) continue;
  console.log('Options in cases.js:');
  node.options.forEach((opt, idx) => {
    console.log(`  [${idx}] id: ${opt.id || '(none)'} | text: ${opt.text}`);
  });
}
