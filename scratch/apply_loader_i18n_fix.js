const fs = require('fs');

console.log('--- Applying Full Loading Screen Localization Fix ---');

// 1. UPDATE src/state.js: Auto-detect browser language if none saved
let stateJs = fs.readFileSync('src/state.js', 'utf8').replace(/\r\n/g, '\n');

const oldStateLangInit = `    const savedLang = localStorage.getItem(LANG_STORAGE_KEY);
    const validLangs = ['en', 'id', 'zh', 'ja', 'ko'];
    this.currentLanguage = validLangs.includes(savedLang) ? savedLang : 'en';`;

const newStateLangInit = `    const savedLang = (typeof localStorage !== 'undefined') ? localStorage.getItem(LANG_STORAGE_KEY) : null;
    const validLangs = ['en', 'id', 'zh', 'ja', 'ko'];
    let defaultLang = 'en';
    if (typeof navigator !== 'undefined' && navigator.language) {
      const navLang = navigator.language.toLowerCase();
      if (navLang.startsWith('id')) defaultLang = 'id';
      else if (navLang.startsWith('ja')) defaultLang = 'ja';
      else if (navLang.startsWith('zh')) defaultLang = 'zh';
      else if (navLang.startsWith('ko')) defaultLang = 'ko';
    }
    this.currentLanguage = validLangs.includes(savedLang) ? savedLang : defaultLang;`;

if (stateJs.includes(oldStateLangInit)) {
  stateJs = stateJs.replace(oldStateLangInit, newStateLangInit);
  fs.writeFileSync('src/state.js', stateJs, 'utf8');
  console.log('1. Updated language detection in src/state.js');
} else {
  console.warn('Could not find oldStateLangInit in src/state.js');
}


// 2. UPDATE src/i18n.js: Add LOADER_DECRYPT_I18N
let i18nJs = fs.readFileSync('src/i18n.js', 'utf8').replace(/\r\n/g, '\n');

const loaderDecryptSnippet = `
export const LOADER_DECRYPT_I18N = {
  en: {
    decrypting_telemetry: "[DECRYPTING SECTOR 7 DOSSIER ARCHIVE...]",
    badge_decrypted: "◈ SECTOR 7 CASE DOSSIER DECRYPTED ◈",
    access_granted: "[ACCESS GRANTED: WELCOME DETECTIVE]",
    dispatching_dossier: "[DISPATCHING CASE #D4-04 INVESTIGATION DOSSIER...]",
    sector_badge: "SEC.04",
    nexus_title: "Connecting Nexus"
  },
  id: {
    decrypting_telemetry: "[MENDEKRIPSI ARSIP BERKAS SEKTOR 7...]",
    badge_decrypted: "◈ BERKAS KASUS SEKTOR 7 TERDEKRIPSI ◈",
    access_granted: "[AKSES DIIZINKAN: SELAMAT DATANG DETEKTIF]",
    dispatching_dossier: "[MENGIRIM BERKAS KASUS #D4-04 KE MEJA PENYELIDIKAN...]",
    sector_badge: "SEK.04",
    nexus_title: "Penghubung Nexus"
  },
  ja: {
    decrypting_telemetry: "[第7セクター事件記録を解読中...]",
    badge_decrypted: "◈ 第7セクター事件記録 解読完了 ◈",
    access_granted: "[アクセス承認: 捜査官、ようこそ]",
    dispatching_dossier: "[事件 #D4-04 捜査書類を送出中...]",
    sector_badge: "第4区",
    nexus_title: "結合ネクサス"
  },
  zh: {
    decrypting_telemetry: "[正在解密第七分区绝密案件档案...]",
    badge_decrypted: "◈ 第七分区案件档案解密完成 ◈",
    access_granted: "[准入许可通过：欢迎，调查督察]",
    dispatching_dossier: "[正在派遣案件 #D4-04 现场调查卷宗...]",
    sector_badge: "第4区",
    nexus_title: "枢纽节点"
  },
  ko: {
    decrypting_telemetry: "[제7구역 사건 기록 보관소 해독 중...]",
    badge_decrypted: "◈ 제7구역 사건 파일 해독 완료 ◈",
    access_granted: "[접근 인가됨: 환영합니다, 수사관님]",
    dispatching_dossier: "[사건 #D4-04 수사 서류 책상으로 전달 중...]",
    sector_badge: "제4구역",
    nexus_title: "연결 넥서스"
  }
};
`;

if (!i18nJs.includes('export const LOADER_DECRYPT_I18N')) {
  i18nJs += '\n' + loaderDecryptSnippet;
  fs.writeFileSync('src/i18n.js', i18nJs, 'utf8');
  console.log('2. Added LOADER_DECRYPT_I18N to src/i18n.js');
} else {
  console.log('2. src/i18n.js already has LOADER_DECRYPT_I18N');
}


// 3. UPDATE src/ui.js: Ensure applyLanguage updates loader elements
let uiJs = fs.readFileSync('src/ui.js', 'utf8').replace(/\r\n/g, '\n');

// Import LOADER_DECRYPT_I18N in ui.js if not present
if (!uiJs.includes('LOADER_DECRYPT_I18N')) {
  uiJs = uiJs.replace(
    "import { UI_TRANSLATIONS, SUPPORTED_LANGUAGES, SKILLS_I18N, ITEMS_I18N, CLUES_I18N, POIS_I18N, THOUGHTS_I18N, VICES_I18N, PROGRESS_LABELS, CASE_TRANSLATIONS, t, tSkill, tItem, tClue, tPoi, tThought, tVice, tCase, tGameOver } from './i18n.js';",
    "import { UI_TRANSLATIONS, SUPPORTED_LANGUAGES, SKILLS_I18N, ITEMS_I18N, CLUES_I18N, POIS_I18N, THOUGHTS_I18N, VICES_I18N, PROGRESS_LABELS, CASE_TRANSLATIONS, LOADER_DECRYPT_I18N, t, tSkill, tItem, tClue, tPoi, tThought, tVice, tCase, tGameOver } from './i18n.js';"
  );
}

const oldStage1TextUpdate = `    // Update Stage 1 texts
    const quoteEl = document.getElementById('loader-quote-text');
    if (quoteEl) quoteEl.textContent = t('loader_quote', currentLang);
    const telemetryEl = document.getElementById('loader-telemetry-text');
    if (telemetryEl) telemetryEl.textContent = t('loader_telemetry', currentLang);
    const enterBtn = document.getElementById('loader-enter-btn');
    if (enterBtn) enterBtn.textContent = t('loader_enter', currentLang);`;

const newStage1TextUpdate = `    // Update Stage 1 texts & loading indicators in active language
    const quoteEl = document.getElementById('loader-quote-text');
    if (quoteEl) quoteEl.textContent = t('loader_quote', currentLang);
    const telemetryEl = document.getElementById('loader-telemetry-text');
    if (telemetryEl) {
      const enterBtn = document.getElementById('loader-enter-btn');
      if (enterBtn && enterBtn.classList.contains('ready') && typeof TELEMETRY_PHASES_I18N !== 'undefined') {
        const activePhases = TELEMETRY_PHASES_I18N[currentLang] || TELEMETRY_PHASES_I18N['en'];
        const finalPhase = activePhases[activePhases.length - 1];
        if (finalPhase) telemetryEl.textContent = finalPhase.text;
      } else {
        telemetryEl.textContent = t('loader_telemetry', currentLang);
      }
    }
    const enterBtn = document.getElementById('loader-enter-btn');
    if (enterBtn) enterBtn.textContent = t('loader_enter', currentLang);
    const sectorBadge = document.querySelector('.loader-sector-badge');
    if (sectorBadge && typeof LOADER_DECRYPT_I18N !== 'undefined') {
      const dec = LOADER_DECRYPT_I18N[currentLang] || LOADER_DECRYPT_I18N['en'];
      if (dec && dec.sector_badge) sectorBadge.textContent = dec.sector_badge;
    }`;

if (uiJs.includes(oldStage1TextUpdate)) {
  uiJs = uiJs.replace(oldStage1TextUpdate, newStage1TextUpdate);
  fs.writeFileSync('src/ui.js', uiJs, 'utf8');
  console.log('3. Updated applyLanguage in src/ui.js for loading screen elements');
} else {
  console.warn('Could not find oldStage1TextUpdate in src/ui.js');
}


// 4. UPDATE src/main.js
let mainJs = fs.readFileSync('src/main.js', 'utf8').replace(/\r\n/g, '\n');

// Import LOADER_DECRYPT_I18N in main.js
if (!mainJs.includes('LOADER_DECRYPT_I18N')) {
  mainJs = mainJs.replace(
    "import { LOADER_QUOTES_I18N, TELEMETRY_PHASES_I18N, ALIASES_I18N, DOSSIER_I18N, t } from './i18n.js';",
    "import { LOADER_QUOTES_I18N, TELEMETRY_PHASES_I18N, ALIASES_I18N, DOSSIER_I18N, LOADER_DECRYPT_I18N, t } from './i18n.js';"
  );
}

// Ensure ui.applyLanguage is called immediately in bootGame
const oldBootUiInit = `function bootGame() {
  if (hasBooted) return;
  hasBooted = true;

  const ui = new UIController(state);`;

const newBootUiInit = `function bootGame() {
  if (hasBooted) return;
  hasBooted = true;

  const ui = new UIController(state);

  // Immediately apply active language to entire loading screen
  ui.applyLanguage(state.currentLanguage);`;

if (mainJs.includes(oldBootUiInit)) {
  mainJs = mainJs.replace(oldBootUiInit, newBootUiInit);
  console.log('4a. Added immediate ui.applyLanguage to bootGame() in src/main.js');
}

// Replace hardcoded decryption texts with LOADER_DECRYPT_I18N in enterGameStage()
const oldDecryptBlockInMain = `    if (titleEl) {
      titleEl.classList.add('decrypting');
      if (telemetryText) {
        telemetryText.textContent = "[DECRYPTING SECTOR 7 DOSSIER ARCHIVE...]";
        telemetryText.style.color = "#4df0ff";
      }

      const scrambleInterval = setInterval(() => {
        scrambleTicks++;
        if (scrambleTicks < maxTicks) {
          // Generate glitch scrambled characters
          let scrambled = '';
          for (let i = 0; i < targetFull.length; i++) {
            if (i < Math.floor(scrambleTicks / 2)) {
              scrambled += targetFull[i];
            } else {
              scrambled += cypherChars[Math.floor(Math.random() * cypherChars.length)];
            }
          }
          titleEl.textContent = scrambled;
        } else {
          clearInterval(scrambleInterval);
          // Decryption completed! Lock in "aenigmArchive"
          titleEl.classList.remove('decrypting');
          titleEl.classList.add('decrypted');
          titleEl.innerHTML = \`
            <div class="brand-decrypted-wrapper">
              <span class="brand-stem">\${targetStem}</span><span class="brand-junction" title="Connecting Nexus">\${targetPivot}</span><span class="brand-suffix">\${targetSuffix}</span>
            </div>
            <div class="archive-decrypt-badge">◈ SECTOR 7 CASE DOSSIER DECRYPTED ◈</div>
          \`;
          
          if (telemetryText) {
            telemetryText.textContent = "[ACCESS GRANTED: WELCOME DETECTIVE]";
            telemetryText.style.color = "#d4af37";
          }

          if (audio.playDiscovery) audio.playDiscovery();
          if (audio.playDossierStamp) audio.playDossierStamp();

          // Longer hold for aenigmArchive: 2200ms with telemetry progression
          setTimeout(() => {
            if (telemetryText) {
              telemetryText.textContent = "[DISPATCHING CASE #D4-04 INVESTIGATION DOSSIER...]";
            }
          }, 1100);`;

const newDecryptBlockInMain = `    const dec = (typeof LOADER_DECRYPT_I18N !== 'undefined' && (LOADER_DECRYPT_I18N[state.currentLanguage] || LOADER_DECRYPT_I18N['en'])) || {
      decrypting_telemetry: "[DECRYPTING SECTOR 7 DOSSIER ARCHIVE...]",
      badge_decrypted: "◈ SECTOR 7 CASE DOSSIER DECRYPTED ◈",
      access_granted: "[ACCESS GRANTED: WELCOME DETECTIVE]",
      dispatching_dossier: "[DISPATCHING CASE #D4-04 INVESTIGATION DOSSIER...]",
      sector_badge: "SEC.04",
      nexus_title: "Connecting Nexus"
    };

    if (titleEl) {
      titleEl.classList.add('decrypting');
      if (telemetryText) {
        telemetryText.textContent = dec.decrypting_telemetry;
        telemetryText.style.color = "#4df0ff";
      }

      const scrambleInterval = setInterval(() => {
        scrambleTicks++;
        if (scrambleTicks < maxTicks) {
          // Generate glitch scrambled characters
          let scrambled = '';
          for (let i = 0; i < targetFull.length; i++) {
            if (i < Math.floor(scrambleTicks / 2)) {
              scrambled += targetFull[i];
            } else {
              scrambled += cypherChars[Math.floor(Math.random() * cypherChars.length)];
            }
          }
          titleEl.textContent = scrambled;
        } else {
          clearInterval(scrambleInterval);
          // Decryption completed! Lock in "aenigmArchive" with localized badge and nexus title
          titleEl.classList.remove('decrypting');
          titleEl.classList.add('decrypted');
          titleEl.innerHTML = \`
            <div class="brand-decrypted-wrapper">
              <span class="brand-stem">\${targetStem}</span><span class="brand-junction" title="\${dec.nexus_title}">\${targetPivot}</span><span class="brand-suffix">\${targetSuffix}</span>
            </div>
            <div class="archive-decrypt-badge">\${dec.badge_decrypted}</div>
          \`;
          
          if (telemetryText) {
            telemetryText.textContent = dec.access_granted;
            telemetryText.style.color = "#d4af37";
          }

          if (audio.playDiscovery) audio.playDiscovery();
          if (audio.playDossierStamp) audio.playDossierStamp();

          // Longer hold for aenigmArchive: 2200ms with telemetry progression
          setTimeout(() => {
            if (telemetryText) {
              telemetryText.textContent = dec.dispatching_dossier;
            }
          }, 1100);`;

if (mainJs.includes(oldDecryptBlockInMain)) {
  mainJs = mainJs.replace(oldDecryptBlockInMain, newDecryptBlockInMain);
  console.log('4b. Localized decryption sequence in src/main.js');
} else {
  console.warn('Could not find oldDecryptBlockInMain in src/main.js');
}

// Also update state subscription to immediately update quote & telemetry on language change
const oldSubBlock = `    state.subscribe((event) => {
      if (event === 'language_changed') {
        updateCreatorAttributes();
        ui.applyLanguage(state.currentLanguage);
      }
    });`;

const newSubBlock = `    state.subscribe((event) => {
      if (event === 'language_changed') {
        updateCreatorAttributes();
        ui.applyLanguage(state.currentLanguage);

        // Update loader quote immediately to match language
        const activeQuotes = LOADER_QUOTES_I18N[state.currentLanguage] || LOADER_QUOTES_I18N['en'];
        if (quoteEl && activeQuotes) {
          quoteEl.textContent = activeQuotes[quoteIdx % activeQuotes.length];
        }

        // Update telemetry text immediately to match language
        if (telemetryText) {
          const activePhases = TELEMETRY_PHASES_I18N[state.currentLanguage] || TELEMETRY_PHASES_I18N['en'];
          if (isLoaded) {
            const finalPhase = activePhases[activePhases.length - 1];
            if (finalPhase) telemetryText.textContent = finalPhase.text;
          } else {
            const phase = activePhases.find(p => currentProgress <= p.at);
            if (phase) telemetryText.textContent = phase.text;
          }
        }
      }
    });`;

if (mainJs.includes(oldSubBlock)) {
  mainJs = mainJs.replace(oldSubBlock, newSubBlock);
  console.log('4c. Added real-time loader update on language change in src/main.js');
}

fs.writeFileSync('src/main.js', mainJs, 'utf8');

console.log('Done applying full loader i18n fix!');
