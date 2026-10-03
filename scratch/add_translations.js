const fs = require('fs');
const path = require('path');

const i18nPath = path.join(__dirname, '..', 'src', 'i18n.js');
let content = fs.readFileSync(i18nPath, 'utf8');

const additions = {
  id: `    dialogue_leave: '[Tinggalkan pengamatan & kembali ke TKP]',\n    item_type_tool: 'ALAT',\n    item_type_consumable: 'KONSUMSI',\n    item_type_clue: 'BUKTI',\n    item_type_relic: 'RELIK',\n    buff_label: 'Bonus Keahlian:'`,
  en: `    dialogue_leave: '[Step back & return to crime scene]',\n    item_type_tool: 'TOOL',\n    item_type_consumable: 'CONSUMABLE',\n    item_type_clue: 'CLUE',\n    item_type_relic: 'RELIC',\n    buff_label: 'Skill Buff:'`,
  ja: `    dialogue_leave: '[観察を終えて現場に戻る]',\n    item_type_tool: '道具',\n    item_type_consumable: '消耗品',\n    item_type_clue: '手掛かり',\n    item_type_relic: '遺物',\n    buff_label: 'スキル強化:'`,
  zh: `    dialogue_leave: '[暂离此处，返回现场]',\n    item_type_tool: '工具',\n    item_type_consumable: '消耗品',\n    item_type_clue: '线索',\n    item_type_relic: '遗物',\n    buff_label: '技能增益:'`,
  ko: `    dialogue_leave: '[관찰을 마치고 현장으로 돌아간다]',\n    item_type_tool: '도구',\n    item_type_consumable: '소모품',\n    item_type_clue: '단서',\n    item_type_relic: '유물',\n    buff_label: '스킬 강화:'`
};

for (const [lang, extra] of Object.entries(additions)) {
  const markerRegex = new RegExp(`(${lang}:\\s*\\{[\\s\\S]*?dialogue_idle_prompt:\\s*['"][^'"]+['"])`, 'm');
  const match = content.match(markerRegex);
  if (match) {
    content = content.replace(markerRegex, `$1,\n${extra}`);
    console.log(`Added extra translations for ${lang}`);
  } else {
    console.warn(`Could not find dialogue_idle_prompt for ${lang}`);
  }
}

fs.writeFileSync(i18nPath, content, 'utf8');
console.log('src/i18n.js updated successfully!');
