const fs = require('fs');
const path = require('path');

const i18nPath = path.join(__dirname, '..', 'src', 'i18n.js');
let content = fs.readFileSync(i18nPath, 'utf8');

const additions = {
  id: `    profile_modal_title: 'DOSSIER DETEKTIF & PROFIL PSIKOLOGIS',\n    profile_vitals_title: 'KONDISI VITAL & KETAHANAN',\n    profile_progress_header: 'RESOLUSI KASUS',\n    profile_time_label: 'WAKTU INVESTIGASI'`,
  en: `    profile_modal_title: 'DETECTIVE DOSSIER & PSYCHOLOGICAL PROFILE',\n    profile_vitals_title: 'VITALS & ENDURANCE',\n    profile_progress_header: 'CASE RESOLUTION',\n    profile_time_label: 'INVESTIGATION TIME'`,
  ja: `    profile_modal_title: '刑事調書・精神プロファイル',\n    profile_vitals_title: 'バイタル＆耐久状態',\n    profile_progress_header: '事件解決進捗',\n    profile_time_label: '捜査経過時間'`,
  zh: `    profile_modal_title: '侦探档案与心理侧写',\n    profile_vitals_title: '生命体征与生存状态',\n    profile_progress_header: '案情推进进度',\n    profile_time_label: '调查历时'`,
  ko: `    profile_modal_title: '형사 조서 및 심리 프로필',\n    profile_vitals_title: '활력 징후 및 생존 상태',\n    profile_progress_header: '사건 해결 진행',\n    profile_time_label: '수사 경과 시간'`
};

for (const [lang, extra] of Object.entries(additions)) {
  const markerRegex = new RegExp(`(${lang}:\\s*\\{[\\s\\S]*?buff_label:\\s*['"][^'"]+['"])`, 'm');
  const match = content.match(markerRegex);
  if (match) {
    content = content.replace(markerRegex, `$1,\n${extra}`);
    console.log(`Added profile modal translations for ${lang}`);
  } else {
    console.warn(`Could not find buff_label for ${lang}`);
  }
}

fs.writeFileSync(i18nPath, content, 'utf8');
console.log('src/i18n.js profile modal translations updated!');
