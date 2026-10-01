const fs = require('fs');

const casesContent = fs.readFileSync('./src/cases.js', 'utf8');

// List of all 35 nodes:
const allNodes = [
  'graves_dialogue_start',
  'graves_assessment',
  'graves_rhetoric_win',
  'graves_rhetoric_fail',
  'graves_cigarette',
  'graves_debate_wound',
  'graves_last_seen',
  'graves_ledger_hunt',
  'examine_pendulum_start',
  'pendulum_gear_crush',
  'pendulum_pry_win',
  'pendulum_pry_fail',
  'pendulum_esoterica_win',
  'pendulum_esoterica_fail',
  'examine_watch_start',
  'watch_open_win',
  'watch_open_fail',
  'examine_watch_done',
  'examine_balcony_start',
  'balcony_search_win',
  'balcony_search_fail',
  'balcony_fog_reflection',
  'examine_safe_start',
  'safe_brute_trap',
  'safe_open_code',
  'safe_logic_fail',
  'madame_dialogue_start',
  'madame_premature_arrest_fail',
  'madame_alibi',
  'madame_empathy_win',
  'madame_empathy_fail',
  'madame_confession_win',
  'madame_confession_fail',
  'ending_arrest',
  'ending_coverup'
];

// Let's check which ones are in dialogue_i18n.js
const dContent = fs.readFileSync('./src/dialogue_i18n.js', 'utf8');
const missing = allNodes.filter(n => !dContent.includes(`"${n}":`));
console.log('Missing nodes count:', missing.length);
console.log('Missing nodes:', missing);
