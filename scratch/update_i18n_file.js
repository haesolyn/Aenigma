const fs = require('fs');
const path = require('path');

const i18nPath = path.join(__dirname, '..', 'src', 'i18n.js');
let content = fs.readFileSync(i18nPath, 'utf8');

// 1. Add import at the top if not present
if (!content.includes("from './dialogue_i18n.js'")) {
  content = `import { DIALOGUE_I18N_FULL, CLUES_I18N_FULL, NEW_POIS_I18N } from './dialogue_i18n.js';\n` + content;
}

// 2. Add new POIs to POI_I18N before the closing `};` of POI_I18N
const newPoisCode = `,
  poi_gantry_lantern: {
    title: {
      en: "Upper Gantry & Alchemical Lantern",
      id: "Anjungan Atas & Lentera Alkimia",
      zh: "提灯上层悬空回廊与炼金探灯",
      ja: "上層キャットウォークと錬金ランタン",
      ko: "상층 통로와 연금술 등불",
      es: "Pasarela Superior y Linterna Alquímica",
      fr: "Passerelle Supérieure et Lanterne Alchimique",
      de: "Oberer Laufsteg und Alchemielaterne",
      ru: "Верхние мостки и алхимический фонарь",
      it: "Passerella Superiore e Lanterna Alchemica",
      pt: "Passarela Superior e Lanterna Alquímica",
      ar: "الممر العلوي وفانوس الكيمياء"
    },
    description: {
      en: "A narrow iron grating over the gear abyss. Broken glass and alchemical soot mark where a clandestine visitor waited.",
      id: "Kisi besi sempit di atas jurang roda gigi. Pecahan kaca dan jelaga alkimia menandai tempat kurir rahasia mengintai.",
      zh: "悬空于齿轮深渊上方的狭窄铁栅回廊。碎玻璃与炼金煤烟残留在此，暴露出曾有秘密访客在暗中窥伺。",
      ja: "歯車の深淵に架かる細い鉄格子通路。割れたガラスと錬金術の煤が、何者かが潜んでいた痕跡を物語る。",
      ko: "톱니바퀴 심연 위에 놓인 좁은 철제 격자 통로. 깨진 유리와 연금술 그을음이 밀사의 잠복 흔적을 보여줍니다.",
      es: "Una estrecha rejilla de hierro sobre el abismo de engranajes. Restos de vidrio y hollín alquímico marcan una visita secreta.",
      fr: "Une étroite grille de fer au-dessus des engrenages. Du verre brisé et de la suie alchimique trahissent un intrus.",
      de: "Ein schmaler Eisensteg über den Zahnrädern. Glasscherben und Ruß beweisen einen heimlichen Besucher.",
      ru: "Узкая железная решетка над пропастью шестерен. Осколки стекла и сажа выдают присутствие тайного гостя.",
      it: "Una stretta grata di ferro sull'abisso di ingranaggi. Vetri rotti e fuliggine alchemica indicano una presenza segreta.",
      pt: "Uma estreita grade de ferro sobre o abismo de engrenagens. Cacos de vidro e fuligem revelam uma visita clandestina.",
      ar: "ممر حديدي ضيق فوق هاوية التروس. زجاج محطم وسخام كيميائي يشيران إلى ترصد زائر سري قبل الحادث."
    }
  },
  poi_clock_chime_bell: {
    title: {
      en: "Colossal Bronze Bell & Chime Gearing",
      id: "Lonceng Perunggu Raksasa & Gigi Dentang",
      zh: "圣艾琳青铜大钟与共振撞锤齿轮",
      ja: "聖アイリーンの巨鐘と鐘打撃歯車",
      ko: "성 아이린 청동 거대 종과 타종 기어",
      es: "Campana Monumental y Engranajes del Carrillón",
      fr: "Cloche Colossale et Engrenages de Sonnerie",
      de: "Kolossale Bronzeglocke und Schlagwerk",
      ru: "Исполинский бронзовый колокол и бойный механизм",
      it: "Campana Monumentale e Meccanismo del Rintocco",
      pt: "Sino Colossal de Bronze e Engrenagens do Carrilhão",
      ar: "الجرس البرونزي الضخم وتروس دق الساعات"
    },
    description: {
      en: "The eight-ton bell that tolls for District 7. A fine steel wire is wrapped through the clapper linkage down into the pendulum escapement.",
      id: "Lonceng delapan ton yang berdentang bagi Distrik 7. Kawat baja tipis terlilit dari pemukul lonceng menuju mekanisme pendulum.",
      zh: "重达八吨的圣艾琳主钟。一根极细的高张力钢丝从钟锤连杆悄然延伸至下方的钟摆脱扣装置上！",
      ja: "第7区に時を告げる8トンの大鐘。打鐘レバーから振り子の脱進機へと細い鋼鉄ワイヤーが巧みに結ばれている。",
      ko: "제7구역에 시각을 알리는 8톤 청동 종. 종 치는 추의 연결부에서 진자 탈착부까지 정교한 강철 와이어가 이어져 있습니다.",
      es: "La campana de ocho toneladas que dobla para el Distrito 7. Un fino cable de acero conecta el badajo al péndulo.",
      fr: "La cloche de huit tonnes qui sonne pour le District 7. Un fil d'acier fin relie le battant au balancier.",
      de: "Die Acht-Tonnen-Glocke des Distrikts 7. Ein dünner Stahldraht verbindet den Klöppel mit dem Pendelwerk.",
      ru: "Восьмитонный колокол 7-го района. Тонкий стальной тросик тянется от языка колокола к спусковому механизму маятника.",
      it: "La campana da otto tonnellate del Distretto 7. Un sottile cavo d'acciaio collega il battaglio allo scappamento.",
      pt: "O sino de oito toneladas que toca pelo Distrito 7. Um fino fio de aço liga o badalo ao escape do pêndulo.",
      ar: "الجرس الضخم البالغ وزنه ثمانية أطنان. سلك فولاذي رفيع يربط لسان الجرس بآلية فك قفل البندول بدقة ميكانيكية."
    }
  }`;

if (!content.includes('poi_gantry_lantern:')) {
  content = content.replace(/poi_floorboard:\s*\{[\s\S]*?\}\s*\}/, match => {
    return match.replace(/\}\s*$/, newPoisCode + '\n  }');
  });
}

// 3. Replace CLUES_I18N with CLUES_I18N_FULL
const cluesRegex = /export const CLUES_I18N = \{[\s\S]*?\};\r?\n\r?\n\/\/ Dialogue Nodes Localizations/;
if (cluesRegex.test(content)) {
  content = content.replace(cluesRegex, `export const CLUES_I18N = (typeof CLUES_I18N_FULL !== 'undefined') ? CLUES_I18N_FULL : {};\n\n// Dialogue Nodes Localizations`);
}

// 4. Replace DIALOGUE_I18N with DIALOGUE_I18N_FULL
const dialogueRegex = /export const DIALOGUE_I18N = \{[\s\S]*?\};\r?\n\r?\n\/\/ Helper to get fully localized dialogue node/;
if (dialogueRegex.test(content)) {
  content = content.replace(dialogueRegex, `export const DIALOGUE_I18N = (typeof DIALOGUE_I18N_FULL !== 'undefined') ? DIALOGUE_I18N_FULL : {};\n\n// Helper to get fully localized dialogue node`);
}

fs.writeFileSync(i18nPath, content, 'utf8');
console.log('Successfully updated src/i18n.js!');
