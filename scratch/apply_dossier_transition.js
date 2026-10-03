const fs = require('fs');

console.log('--- Applying Detective Dossier Transition & Longer aenigmArchive Hold ---');

// 1. UPDATE index.html: Add #detective-case-transition overlay
let indexHtml = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');

const dossierHtml = `  <!-- ========================================================================
       CINEMATIC NOIR CASE DOSSIER TRANSITION OVERLAY
       ======================================================================== -->
  <div id="detective-case-transition" class="detective-case-transition hidden">
    <div class="dossier-folder-container">
      
      <!-- Top Manila Folder Tab -->
      <div class="dossier-folder-tab">
        <span class="dossier-tab-label" id="dossier-tab-label">📁 PRECINCT 4 · SPECIAL INVESTIGATION BRANCH</span>
        <span class="dossier-tab-id">REF: #D4-04/HOR</span>
      </div>

      <!-- Main Dossier Folder Paper Body -->
      <div class="dossier-folder-paper">
        <div class="dossier-evidence-tape">EVIDENCE · DO NOT TAMPER · CRIME SCENE</div>
        
        <div class="dossier-paper-header">
          <div class="precinct-badge-mark">⚖️</div>
          <div class="precinct-header-text">
            <h3 id="dossier-header-title">SECTOR 7 POLICE COMMISSION · HOMICIDE DIVISION</h3>
            <p id="dossier-header-subtitle">FORENSIC INCIDENT DISPATCH & CRIME SCENE CLEARANCE</p>
          </div>
        </div>

        <div class="dossier-typewriter-body">
          <div class="dossier-row">
            <span class="dossier-label" id="dossier-lbl-code">INCIDENT CODE:</span>
            <span class="dossier-val highlight">#D4-04 / HOROLOGIST</span>
          </div>
          <div class="dossier-row">
            <span class="dossier-label" id="dossier-lbl-loc">LOCATION:</span>
            <span class="dossier-val" id="dossier-val-loc">Saint Irene Clocktower — Upper Clockwork Gallery</span>
          </div>
          <div class="dossier-row">
            <span class="dossier-label" id="dossier-lbl-time">DISPATCH TIME:</span>
            <span class="dossier-val" id="dossier-val-time">Day 1 · 04:17 AM [Cold Rain & Low Fog]</span>
          </div>
          <div class="dossier-row">
            <span class="dossier-label" id="dossier-lbl-victim">PRIMARY VICTIM:</span>
            <span class="dossier-val" id="dossier-val-victim">Elia Thorne · Master Guild Horologist</span>
          </div>
          <div class="dossier-row">
            <span class="dossier-label" id="dossier-lbl-mandate">DIRECTIVE:</span>
            <span class="dossier-val" id="dossier-val-mandate">Establish cause of unnatural death; secure clockwork evidence</span>
          </div>
        </div>

        <!-- The Dramatic Official Red Stamp -->
        <div class="dossier-rubber-stamp" id="dossier-rubber-stamp">
          <div class="stamp-border">
            <span class="stamp-stars">★ ★ ★</span>
            <span class="stamp-main-text" id="dossier-stamp-main">CRIME SCENE AUTHORIZED</span>
            <span class="stamp-sub-text" id="dossier-stamp-sub">PRECINCT 4 FORENSIC INQUIRY</span>
            <span class="stamp-stars">★ ★ ★</span>
          </div>
        </div>

        <div class="dossier-footer-note">
          <span id="dossier-footer-note">CLASSIFIED LEVEL III · EYES OF ASSIGNED INSPECTOR ONLY</span>
        </div>
      </div>

    </div>
  </div>
`;

if (!indexHtml.includes('id="detective-case-transition"')) {
  indexHtml = indexHtml.replace(
    '</section>\n\n  <!-- ========================================================================\n       STAGE 2: DETECTIVE PROFILING (CHARACTER CREATION)',
    `</section>\n\n${dossierHtml}\n  <!-- ========================================================================\n       STAGE 2: DETECTIVE PROFILING (CHARACTER CREATION)`
  );
  fs.writeFileSync('index.html', indexHtml, 'utf8');
  console.log('1. Added #detective-case-transition to index.html');
} else {
  console.log('1. index.html already has #detective-case-transition');
}


// 2. UPDATE styles/loader.css: Add Dossier Transition Styles
let loaderCss = fs.readFileSync('styles/loader.css', 'utf8').replace(/\r\n/g, '\n');

const dossierCss = `
/* ==========================================================================
   CINEMATIC NOIR CASE DOSSIER TRANSITION OVERLAY
   ========================================================================== */
.detective-case-transition {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at center, rgba(14, 18, 24, 0.96) 0%, rgba(6, 8, 12, 0.99) 100%);
  backdrop-filter: blur(12px);
  padding: clamp(12px, 3vh, 30px);
  box-sizing: border-box;
  opacity: 1;
  visibility: visible;
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease;
  overflow: hidden;
}

.detective-case-transition.hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.detective-case-transition.opening {
  opacity: 0;
  transform: scale(1.1);
  filter: blur(8px);
  pointer-events: none;
}

/* Authentic Weathered Manila Cardstock Folder */
.dossier-folder-container {
  width: 100%;
  max-width: 620px;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(212, 175, 55, 0.15);
  transform: translateY(20px) scale(0.95);
  animation: dossierSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes dossierSlideIn {
  0% { transform: translateY(30px) scale(0.92); opacity: 0; }
  100% { transform: translateY(0) scale(1); opacity: 1; }
}

/* Manila Folder Top Tab */
.dossier-folder-tab {
  align-self: flex-start;
  background: linear-gradient(180deg, #c2a675 0%, #a88d5e 100%);
  border: 1px solid rgba(224, 215, 199, 0.4);
  border-bottom: none;
  border-radius: 6px 12px 0 0;
  padding: 6px 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: 0 -4px 10px rgba(0,0,0,0.3);
  margin-left: 20px;
}

.dossier-tab-label {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  color: #1a1712;
  letter-spacing: 1px;
}

.dossier-tab-id {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 800;
  color: #8b1e22;
  background: rgba(255, 255, 255, 0.6);
  padding: 1px 6px;
  border-radius: 2px;
}

/* Vintage Aged Incident Report Paper Sheet */
.dossier-folder-paper {
  background: #eae2d0 url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E");
  border: 2px solid #8c734b;
  border-radius: 4px;
  padding: clamp(18px, 3vh, 26px);
  position: relative;
  overflow: hidden;
  color: #1a1815;
  box-shadow: inset 0 0 40px rgba(100, 75, 40, 0.25);
}

/* Diagonal Crime Scene Evidence Tape */
.dossier-evidence-tape {
  position: absolute;
  top: 18px;
  right: -55px;
  transform: rotate(35deg);
  background: repeating-linear-gradient(45deg, #e6b800, #e6b800 10px, #1a1a1a 10px, #1a1a1a 20px);
  color: #fff;
  font-family: var(--font-mono);
  font-size: 0.62rem;
  font-weight: 900;
  letter-spacing: 2px;
  padding: 3px 60px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.4);
  text-shadow: 0 1px 2px #000;
  pointer-events: none;
  z-index: 5;
}

.dossier-paper-header {
  display: flex;
  align-items: center;
  gap: 14px;
  border-bottom: 2px solid #3d3528;
  padding-bottom: 12px;
  margin-bottom: 14px;
}

.precinct-badge-mark {
  font-size: 2.2rem;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
}

.precinct-header-text h3 {
  font-family: var(--font-title);
  font-size: clamp(0.95rem, 2vw, 1.15rem);
  letter-spacing: 1.5px;
  color: #1c1813;
  margin: 0 0 2px 0;
  text-transform: uppercase;
}

.precinct-header-text p {
  font-family: var(--font-mono);
  font-size: clamp(0.65rem, 1.2vw, 0.72rem);
  color: #594d3c;
  letter-spacing: 1px;
  margin: 0;
  font-weight: 600;
}

/* Typewritten Incident Details */
.dossier-typewriter-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: clamp(0.72rem, 1.4vw, 0.84rem);
  line-height: 1.45;
  color: #24201a;
  background: rgba(255, 255, 255, 0.45);
  padding: 12px 14px;
  border: 1px dashed rgba(80, 65, 40, 0.35);
  border-radius: 3px;
}

.dossier-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.dossier-label {
  min-width: 125px;
  font-weight: 800;
  color: #4a3e2e;
  letter-spacing: 0.5px;
}

.dossier-val {
  flex: 1;
  font-weight: 600;
  color: #111;
}

.dossier-val.highlight {
  font-weight: 900;
  color: #8b1e22;
  letter-spacing: 1px;
}

/* The Heavy Official Crimson Rubber Stamp */
.dossier-rubber-stamp {
  position: absolute;
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-12deg) scale(2.5);
  opacity: 0;
  pointer-events: none;
  z-index: 10;
  transition: transform 0.22s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.15s ease;
}

.dossier-rubber-stamp.stamped {
  opacity: 0.94;
  transform: translate(-50%, -50%) rotate(-11deg) scale(1);
}

.stamp-border {
  border: 4px double #b51a20;
  padding: 8px 22px;
  border-radius: 6px;
  background: rgba(181, 26, 32, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  color: #b51a20;
  box-shadow: 0 0 12px rgba(181, 26, 32, 0.25), inset 0 0 8px rgba(181, 26, 32, 0.15);
  filter: contrast(1.3);
}

.stamp-main-text {
  font-family: var(--font-title);
  font-size: clamp(1.1rem, 2.5vw, 1.45rem);
  font-weight: 900;
  letter-spacing: clamp(2px, 0.8vw, 4px);
  text-transform: uppercase;
  text-shadow: 0 0 2px rgba(181, 26, 32, 0.6);
}

.stamp-sub-text {
  font-family: var(--font-mono);
  font-size: clamp(0.6rem, 1.2vw, 0.75rem);
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.stamp-stars {
  font-size: 0.65rem;
  letter-spacing: 4px;
}

.dossier-footer-note {
  margin-top: 14px;
  padding-top: 8px;
  border-top: 1px solid rgba(80, 65, 40, 0.25);
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: #635745;
  letter-spacing: 1.5px;
  text-align: center;
  font-weight: 700;
}
`;

if (!loaderCss.includes('.detective-case-transition')) {
  loaderCss += '\n' + dossierCss;
  fs.writeFileSync('styles/loader.css', loaderCss, 'utf8');
  console.log('2. Added dossier styles to styles/loader.css');
} else {
  console.log('2. styles/loader.css already has .detective-case-transition');
}


// 3. UPDATE src/i18n.js: Add dossier localization dictionary
let i18nJs = fs.readFileSync('src/i18n.js', 'utf8').replace(/\r\n/g, '\n');

const dossierI18nSnippet = `
export const DOSSIER_I18N = {
  en: {
    tab: '📁 PRECINCT 4 · SPECIAL INVESTIGATION BRANCH',
    title: 'SECTOR 7 POLICE COMMISSION · HOMICIDE DIVISION',
    subtitle: 'FORENSIC INCIDENT DISPATCH & CRIME SCENE CLEARANCE',
    lbl_code: 'INCIDENT CODE:',
    lbl_loc: 'LOCATION:',
    val_loc: 'Saint Irene Clocktower — Upper Clockwork Gallery',
    lbl_time: 'DISPATCH TIME:',
    val_time: 'Day 1 · 04:17 AM [Cold Rain & Low Fog]',
    lbl_victim: 'PRIMARY VICTIM:',
    val_victim: 'Elia Thorne · Master Guild Horologist',
    lbl_mandate: 'DIRECTIVE:',
    val_mandate: 'Establish cause of unnatural death; secure clockwork evidence',
    stamp_main: 'CRIME SCENE AUTHORIZED',
    stamp_sub: 'PRECINCT 4 FORENSIC INQUIRY',
    footer: 'CLASSIFIED LEVEL III · EYES OF ASSIGNED INSPECTOR ONLY'
  },
  id: {
    tab: '📁 PRESIUM 4 · CABANG PENYELIDIKAN KHUSUS',
    title: 'KOMISI KEPOLISIAN SEKTOR 7 · DIVISI PEMBUNUHAN',
    subtitle: 'DISPOSISI INSIDEN FORENSIK & IZIN MASUK TKP',
    lbl_code: 'KODE INSIDEN:',
    lbl_loc: 'LOKASI TKP:',
    val_loc: 'Menara Jam Saint Irene — Galeri Jam Atas',
    lbl_time: 'WAKTU DISPOSISI:',
    val_time: 'Hari 1 · 04:17 AM [Hujan Dingin & Kabut Tebal]',
    lbl_victim: 'KORBAN UTAMA:',
    val_victim: 'Elia Thorne · Ahli Jam Guild Utama',
    lbl_mandate: 'MANDAT:',
    val_mandate: 'Selidiki penyebab kematian tak wajar; amankan bukti roda gigi',
    stamp_main: 'AKSES TKP DIIZINKAN',
    stamp_sub: 'PENYELIDIKAN RESMI PRESIUM 4',
    footer: 'RAHASIA TINGKAT III · HANYA UNTUK INSPEKTUR DITUGASKAN'
  },
  ja: {
    tab: '📁 第4分署 · 特別捜査課',
    title: '第7セクター警察委員会 · 殺人捜査課',
    subtitle: '法医学現場出動指令 兼 現場突入許可書',
    lbl_code: '事件番号:',
    lbl_loc: '現場住所:',
    val_loc: '聖アイリーン時計塔 — 最上階機械室',
    lbl_time: '出動時刻:',
    val_time: '第1日目 · 04:17 AM [冷雨と濃霧]',
    lbl_victim: '被害者名:',
    val_victim: 'エリア・ソーン · 時計師ギルド総代',
    lbl_mandate: '捜査指令:',
    val_mandate: '不審死の原因究明、および仕掛け歯車の証拠保全',
    stamp_main: '現場立入捜査許可',
    stamp_sub: '第4分署鑑識令状執行',
    footer: '機密区分III · 担当捜査官以外の閲覧を禁ず'
  },
  zh: {
    tab: '📁 第四警区 · 特别调查处',
    title: '第七分区警察委员会 · 凶杀调查科',
    subtitle: '法医现场派遣通知 暨 现场搜查许可',
    lbl_code: '案件编号:',
    lbl_loc: '事发地点:',
    val_loc: '圣艾琳钟楼 — 顶部齿轮回廊',
    lbl_time: '派遣时间:',
    val_time: '第1日 · 04:17 AM [寒雨与浓雾]',
    lbl_victim: '主要死者:',
    val_victim: '埃利亚·索恩 · 钟表匠公会大师',
    lbl_mandate: '行动指令:',
    val_mandate: '查明反常心脏猝死起因；依法查封机巧钟表核心证物',
    stamp_main: '案发现场准入批准',
    stamp_sub: '第四警区法医搜查令',
    footer: '三级绝密 · 仅限指定调查督察亲启'
  },
  ko: {
    tab: '📁 제4관할서 · 특별수사과',
    title: '제7구역 경찰위원회 · 강력수사계',
    subtitle: '법의학 현장 출동 지령 및 사건 현장 출입 인가서',
    lbl_code: '사건 코드:',
    lbl_loc: '현장 위치:',
    val_loc: '성 아이린 시계탑 — 상층 태엽 기계실',
    lbl_time: '출동 시각:',
    val_time: '1일 차 · 04:17 AM [차가운 비와 짙은 안개]',
    lbl_victim: '주요 피해자:',
    val_victim: '엘리아 쏜 · 시계장인 조합 거장',
    lbl_mandate: '수사 지침:',
    val_mandate: '비정상적 심정지 사인 규명 및 시계태엽 핵심 증거물 확보',
    stamp_main: '사건 현장 수사 인가',
    stamp_sub: '제4관할서 공식 영장 집행',
    footer: '3급 기밀 · 전담 조사관 외 열람 엄금'
  }
};
`;

if (!i18nJs.includes('export const DOSSIER_I18N')) {
  i18nJs += '\n' + dossierI18nSnippet;
  fs.writeFileSync('src/i18n.js', i18nJs, 'utf8');
  console.log('3. Added DOSSIER_I18N to src/i18n.js');
} else {
  console.log('3. src/i18n.js already has DOSSIER_I18N');
}


// 4. UPDATE src/main.js: Choreograph 2.2s aenigmArchive hold & dossier unsealing
let mainJs = fs.readFileSync('src/main.js', 'utf8').replace(/\r\n/g, '\n');

// Import DOSSIER_I18N in main.js
if (!mainJs.includes('DOSSIER_I18N')) {
  mainJs = mainJs.replace(
    "import { LOADER_QUOTES_I18N, TELEMETRY_PHASES_I18N, ALIASES_I18N, t } from './i18n.js';",
    "import { LOADER_QUOTES_I18N, TELEMETRY_PHASES_I18N, ALIASES_I18N, DOSSIER_I18N, t } from './i18n.js';"
  );
}

// Add updateDossierLanguage helper inside main.js
const updateDossierHelper = `
  function updateDossierLanguage(lang) {
    const data = (typeof DOSSIER_I18N !== 'undefined' && (DOSSIER_I18N[lang] || DOSSIER_I18N['en'])) || {};
    const setT = (id, val) => { const el = document.getElementById(id); if (el && val) el.textContent = val; };
    setT('dossier-tab-label', data.tab);
    setT('dossier-header-title', data.title);
    setT('dossier-header-subtitle', data.subtitle);
    setT('dossier-lbl-code', data.lbl_code);
    setT('dossier-lbl-loc', data.lbl_loc);
    setT('dossier-val-loc', data.val_loc);
    setT('dossier-lbl-time', data.lbl_time);
    setT('dossier-val-time', data.val_time);
    setT('dossier-lbl-victim', data.lbl_victim);
    setT('dossier-val-victim', data.val_victim);
    setT('dossier-lbl-mandate', data.lbl_mandate);
    setT('dossier-val-mandate', data.val_mandate);
    setT('dossier-stamp-main', data.stamp_main);
    setT('dossier-stamp-sub', data.stamp_sub);
    setT('dossier-footer-note', data.footer);
  }
`;

const oldDecryptionBlock = `          if (audio.playDiscovery) audio.playDiscovery();
          if (audio.playDossierStamp) audio.playDossierStamp();

          // After showing the glorious decrypted title, smoothly transition to creator stage
          setTimeout(() => {
            loadingStage.classList.add('loader-stage-warp');
            setTimeout(() => {
              loadingStage.style.display = 'none';
              if (creatorStage) {
                creatorStage.classList.remove('hidden');
              }
              ui.applyLanguage(state.currentLanguage);
              initCharacterCreator();
            }, 550);
          }, 750);`;

const newDecryptionBlock = `          if (audio.playDiscovery) audio.playDiscovery();
          if (audio.playDossierStamp) audio.playDossierStamp();

          // Longer hold for aenigmArchive: 2200ms with telemetry progression
          setTimeout(() => {
            if (telemetryText) {
              telemetryText.textContent = "[DISPATCHING CASE #D4-04 INVESTIGATION DOSSIER...]";
            }
          }, 1100);

          setTimeout(() => {
            loadingStage.classList.add('loader-stage-warp');

            // Launch Cinematic Noir Detective Case Dossier Transition
            const caseTransition = document.getElementById('detective-case-transition');
            const rubberStamp = document.getElementById('dossier-rubber-stamp');

            if (caseTransition) {
              updateDossierLanguage(state.currentLanguage);
              caseTransition.classList.remove('hidden');
              if (audio.playBookRead) audio.playBookRead();

              // Stamp the dossier with official red seal after 600ms
              setTimeout(() => {
                if (rubberStamp) {
                  rubberStamp.classList.add('stamped');
                }
                if (audio.playDossierStamp) audio.playDossierStamp();

                // Hold stamped dossier for 1200ms, then unseal and open case file
                setTimeout(() => {
                  caseTransition.classList.add('opening');
                  if (audio.playWatchInspect) audio.playWatchInspect();

                  setTimeout(() => {
                    loadingStage.style.display = 'none';
                    caseTransition.classList.add('hidden');
                    caseTransition.classList.remove('opening');
                    if (rubberStamp) rubberStamp.classList.remove('stamped');

                    if (creatorStage) {
                      creatorStage.classList.remove('hidden');
                    }
                    ui.applyLanguage(state.currentLanguage);
                    initCharacterCreator();
                  }, 600);
                }, 1200);
              }, 600);

            } else {
              // Fallback
              setTimeout(() => {
                loadingStage.style.display = 'none';
                if (creatorStage) {
                  creatorStage.classList.remove('hidden');
                }
                ui.applyLanguage(state.currentLanguage);
                initCharacterCreator();
              }, 550);
            }
          }, 2200);`;

if (mainJs.includes(oldDecryptionBlock)) {
  mainJs = mainJs.replace(oldDecryptionBlock, newDecryptionBlock);
  // Also insert updateDossierHelper right before enterGameStage
  mainJs = mainJs.replace('let isEntering = false;', `${updateDossierHelper}\n  let isEntering = false;`);
  fs.writeFileSync('src/main.js', mainJs, 'utf8');
  console.log('4. Updated decryption hold & dossier transition choreography in src/main.js');
} else {
  console.error('Could not find oldDecryptionBlock in src/main.js');
}

console.log('Done applying detective dossier transition!');
