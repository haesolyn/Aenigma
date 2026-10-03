const fs = require('fs');
const path = require('path');

const i18nPath = path.join(__dirname, '..', 'src', 'i18n.js');
let content = fs.readFileSync(i18nPath, 'utf8');

const translations = {
  id: "Berkas Kasus Dibuka: Aurelia Vance · Selamat datang di Sektor 7, Detektif {name}",
  en: "Case File Opened: Aurelia Vance · Welcome to District 7, Detective {name}",
  zh: "案件档案已开启：奥蕾莉亚·梵斯 · 欢迎来到第七区，{name}探长",
  ja: "捜査ファイル開封：オレリア・ヴァンス · 第7管区へようこそ、{name}刑事",
  ko: "사건 파일 개시: 오렐리아 밴스 · 제7구역에 오신 것을 환영합니다, {name} 형사님",
  es: "Expediente del caso abierto: Aurelia Vance · Bienvenido al Distrito 7, Detective {name}",
  fr: "Dossier de l'affaire ouvert : Aurelia Vance · Bienvenue dans le District 7, Détective {name}",
  de: "Fallakte geöffnet: Aurelia Vance · Willkommen im Bezirk 7, Detective {name}",
  ru: "Дело открыто: Аурелия Вэнс · Добро пожаловать в Седьмой Район, детектив {name}",
  it: "Fascicolo del caso aperto: Aurelia Vance · Benvenuto nel Distretto 7, Detective {name}",
  pt: "Dossiê do caso aberto: Aurelia Vance · Bem-vindo ao Distrito 7, Detetive {name}",
  ar: "تم فتح ملف القضية: أوريليا فانس · مرحبًا بك في المقاطعة 7، أيها المحقق {name}"
};

for (const [lang, text] of Object.entries(translations)) {
  const marker = `${lang}: {`;
  const idx = content.indexOf(marker);
  if (idx !== -1) {
    const insertPos = idx + marker.length;
    // Check if toast_case_opened is already there
    const blockEnd = content.indexOf('},', insertPos);
    const block = content.substring(insertPos, blockEnd !== -1 ? blockEnd : insertPos + 1000);
    if (!block.includes('toast_case_opened:')) {
      const addition = `\n    toast_case_opened: '${text.replace(/'/g, "\\'")}',`;
      content = content.substring(0, insertPos) + addition + content.substring(insertPos);
      console.log(`Added toast_case_opened for lang: ${lang}`);
    }
  }
}

fs.writeFileSync(i18nPath, content, 'utf8');
console.log('Successfully updated src/i18n.js!');
