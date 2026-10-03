const fs = require('fs');

console.log('--- Applying Archive & Red Danger Vignette Fixes ---');

// 1. UPDATE index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');

// Update title element id and button text
indexHtml = indexHtml.replace(
  '<h1 class="title-ornament">A E N I G M A</h1>',
  '<h1 class="title-ornament" id="loader-title-ornament">A E N I G M A</h1>'
);

indexHtml = indexHtml.replace(
  '<button id="loader-enter-btn" class="action-btn-large">ENTER THE MIND</button>',
  '<button id="loader-enter-btn" class="action-btn-large">ENTER THE ARCHIVE</button>'
);

fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('1. Updated index.html');


// 2. UPDATE src/i18n.js
let i18nJs = fs.readFileSync('src/i18n.js', 'utf8');

// Replace all loader_enter translations
const loaderEnterReplacements = [
  { from: "loader_enter: 'MASUKI PIKIRAN',", to: "loader_enter: 'MASUK KE ARSIP'," },
  { from: "loader_enter: 'ENTER THE MIND',", to: "loader_enter: 'ENTER THE ARCHIVE'," },
  { from: "loader_enter: '深層意識へ潜行',", to: "loader_enter: 'アーカイブへアクセス'," },
  { from: "loader_enter: '步入深层意识',", to: "loader_enter: '进入档案库'," },
  { from: "loader_enter: '심상으로 진입',", to: "loader_enter: '기록 보관소 진입'," },
  { from: "loader_enter: 'ENTRAR EN LA MENTE',", to: "loader_enter: 'ACCEDER AL ARCHIVO'," },
  { from: "loader_enter: 'PÉNÉTRER L\\'ESPRIT',", to: "loader_enter: 'ACCÉDER AUX ARCHIVES'," },
  { from: "loader_enter: 'DEN GEIST BETRETEN',", to: "loader_enter: 'DAS ARCHIV BETRETEN'," },
  { from: "loader_enter: 'ВОЙТИ В СОЗНАНИЕ',", to: "loader_enter: 'ВОЙТИ В АРХИВ'," },
  { from: "loader_enter: 'ENTRA NELLA MENTE',", to: "loader_enter: 'ACCEDI ALL\\'ARCHIVIO'," },
  { from: "loader_enter: 'ENTRAR NA MENTE',", to: "loader_enter: 'ACESSAR O ARQUIVO'," },
  { from: "loader_enter: 'ادخل إلى أعماق العقل',", to: "loader_enter: 'الدخول إلى الأرشيف'," }
];

loaderEnterReplacements.forEach(({ from, to }) => {
  if (i18nJs.includes(from)) {
    i18nJs = i18nJs.replace(from, to);
  } else {
    console.warn('Could not find:', from);
  }
});

fs.writeFileSync('src/i18n.js', i18nJs, 'utf8');
console.log('2. Updated src/i18n.js');


// 3. UPDATE src/state.js
let stateJs = fs.readFileSync('src/state.js', 'utf8');

// In reset(): ensure body.classList.remove('in-danger'), stop heartbeat, checkSurvivalState()
const resetTarget = `    this.resolvedChecks = {}; // checkId: { status: 'passed'|'failed', timestamp }
    this.visitedChoices = {}; // choiceKey: timestamp
    this.dialogueHistory = [];
  }`;

const resetReplacement = `    this.resolvedChecks = {}; // checkId: { status: 'passed'|'failed', timestamp }
    this.visitedChoices = {}; // choiceKey: timestamp
    this.dialogueHistory = [];

    // Ensure all critical danger effects and heartbeat are stopped on reset
    if (typeof document !== 'undefined' && document.body) {
      document.body.classList.remove('in-danger');
    }
    if (typeof audio !== 'undefined' && audio && audio.setHeartbeatActive) {
      audio.setHeartbeatActive(false);
    }
    this.checkSurvivalState();
  }`;

if (stateJs.includes(resetTarget)) {
  stateJs = stateJs.replace(resetTarget, resetReplacement);
  fs.writeFileSync('src/state.js', stateJs, 'utf8');
  console.log('3. Updated src/state.js');
} else {
  console.error('Could not find reset target in src/state.js');
}


// 4. UPDATE src/ui.js
let uiJs = fs.readFileSync('src/ui.js', 'utf8');

// Update retry button click listener to thoroughly purge in-danger and update HUD
const retryTarget = `    // Game over restart button
    document.getElementById('btn-retry-inquiry')?.addEventListener('click', () => {
      this.closeModal(this.gameoverModal);
      this.state.reset();
      this.activePoi = null;
      this.currentNodeId = null;
      this.applyLanguage(this.state.currentLanguage);
      this.renderSceneMarkers();
      this.dialogueFeed.innerHTML = '';
      this.dialogueChoices.innerHTML = \`<div style="color:var(--text-muted);font-style:italic;padding:12px;">\${t('scene_location', this.state.currentLanguage)}</div>\`;
    });`;

const retryReplacement = `    // Game over restart button
    document.getElementById('btn-retry-inquiry')?.addEventListener('click', () => {
      this.closeModal(this.gameoverModal);
      this.state.reset();
      
      // Cleanly clear red vignette & critical pulse
      if (typeof document !== 'undefined' && document.body) {
        document.body.classList.remove('in-danger');
      }
      if (typeof audio !== 'undefined' && audio) {
        if (audio.setHeartbeatActive) audio.setHeartbeatActive(false);
        if (audio.playUiClick) audio.playUiClick();
      }

      this.updateHUD();
      this.activePoi = null;
      this.currentNodeId = null;
      this.applyLanguage(this.state.currentLanguage);
      this.renderSceneMarkers();
      this.dialogueFeed.innerHTML = '';
      this.dialogueChoices.innerHTML = \`<div style="color:var(--text-muted);font-style:italic;padding:12px;">\${t('scene_location', this.state.currentLanguage)}</div>\`;
    });`;

if (uiJs.includes(retryTarget)) {
  uiJs = uiJs.replace(retryTarget, retryReplacement);
  fs.writeFileSync('src/ui.js', uiJs, 'utf8');
  console.log('4. Updated src/ui.js');
} else {
  console.error('Could not find retryTarget in src/ui.js');
}


// 5. UPDATE src/main.js
let mainJs = fs.readFileSync('src/main.js', 'utf8');

// Replace enterGameStage with dynamic aenigmArchive decryption transition
const enterGameStageTarget = `  function enterGameStage() {
    audio.init();
    audio.playDiscovery();
    const creatorStage = document.getElementById('creator-stage');

    loadingStage.classList.add('hidden');
    setTimeout(() => {
      loadingStage.style.display = 'none';
      if (creatorStage) {
        creatorStage.classList.remove('hidden');
      }
      ui.applyLanguage(state.currentLanguage);
      initCharacterCreator();
    }, 400);
  }`;

const enterGameStageReplacement = `  let isEntering = false;

  function enterGameStage() {
    if (isEntering) return;
    isEntering = true;

    audio.init();
    if (audio.playRadioTune) audio.playRadioTune();
    if (audio.playUiClick) audio.playUiClick();

    const titleEl = document.getElementById('loader-title-ornament') || document.querySelector('.title-ornament');
    const cassetteUnit = document.querySelector('.tape-cassette-unit');
    const creatorStage = document.getElementById('creator-stage');

    if (cassetteUnit) {
      cassetteUnit.classList.add('fast-forward');
    }

    if (enterBtn) {
      enterBtn.style.pointerEvents = 'none';
      enterBtn.style.opacity = '0';
      enterBtn.style.transform = 'scale(0.9)';
      enterBtn.style.transition = 'all 0.3s ease';
    }

    // High-tech decryption / deciphering sequence morphing AENIGMA into aenigmArchive
    const cypherChars = '0123456789ABCDEF!#$&*@%¥§';
    const targetStem = 'aenigm';
    const targetSuffix = 'Archive';
    const targetFull = 'aenigmArchive';
    
    let scrambleTicks = 0;
    const maxTicks = 16; // ~400ms at 25ms per tick

    if (titleEl) {
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
              <span class="brand-stem">\${targetStem}</span><span class="brand-suffix">\${targetSuffix}</span>
            </div>
            <div class="archive-decrypt-badge">◈ SECTOR 7 CASE DOSSIER DECRYPTED ◈</div>
          \`;
          
          if (telemetryText) {
            telemetryText.textContent = "[ACCESS GRANTED: WELCOME DETECTIVE]";
            telemetryText.style.color = "#d4af37";
          }

          if (audio.playDiscovery) audio.playDiscovery();
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
          }, 750);
        }
      }, 25);
    } else {
      // Fallback
      loadingStage.classList.add('hidden');
      setTimeout(() => {
        loadingStage.style.display = 'none';
        if (creatorStage) {
          creatorStage.classList.remove('hidden');
        }
        ui.applyLanguage(state.currentLanguage);
        initCharacterCreator();
      }, 400);
    }
  }`;

if (mainJs.includes(enterGameStageTarget)) {
  mainJs = mainJs.replace(enterGameStageTarget, enterGameStageReplacement);
} else {
  console.error('Could not find enterGameStageTarget in src/main.js');
}

// Also update btn-restart-inquiry in main.js
const restartTarget = `  // Soft Restart from Victory Modal without hard page reload
  document.getElementById('btn-restart-inquiry')?.addEventListener('click', () => {
    state.reset();
    ui.closeModal(ui.victoryModal);`;

const restartReplacement = `  // Soft Restart from Victory Modal without hard page reload
  document.getElementById('btn-restart-inquiry')?.addEventListener('click', () => {
    state.reset();
    if (typeof document !== 'undefined' && document.body) {
      document.body.classList.remove('in-danger');
    }
    if (typeof audio !== 'undefined' && audio && audio.setHeartbeatActive) {
      audio.setHeartbeatActive(false);
    }
    ui.updateHUD();
    ui.closeModal(ui.victoryModal);`;

if (mainJs.includes(restartTarget)) {
  mainJs = mainJs.replace(restartTarget, restartReplacement);
}

fs.writeFileSync('src/main.js', mainJs, 'utf8');
console.log('5. Updated src/main.js');


// 6. UPDATE styles/loader.css
let loaderCss = fs.readFileSync('styles/loader.css', 'utf8');

const loaderAdditions = `
/* --------------------------------------------------------------------------
   Fast-Forward Cassette & aenigmArchive Decryption Animation
   -------------------------------------------------------------------------- */
.tape-cassette-unit.fast-forward {
  border-color: rgba(212, 175, 55, 0.7);
  box-shadow: inset 0 0 25px rgba(212, 175, 55, 0.4), 0 0 30px rgba(77, 240, 255, 0.35);
  transform: scale(1.05);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.tape-cassette-unit.fast-forward .tape-spool {
  animation: spinSpool 0.22s linear infinite !important;
  box-shadow: 0 0 16px rgba(212, 175, 55, 0.8);
}

.tape-cassette-unit.fast-forward .bar-strand {
  animation-duration: 0.12s !important;
  background: #4df0ff !important;
  box-shadow: 0 0 10px #4df0ff;
}

/* Decrypting glitch state */
.title-ornament.decrypting {
  letter-spacing: clamp(2px, 1vw, 5px);
  color: #fff;
  text-shadow: -3px 0 #00ffff, 3px 0 #ff0055, 0 0 25px rgba(212, 175, 55, 0.9);
  animation: glitchDecryption 0.08s infinite alternate !important;
  filter: contrast(1.3);
}

@keyframes glitchDecryption {
  0% { transform: translate(-2px, 1px) skewX(-1.5deg); }
  50% { transform: translate(2px, -1px) skewX(1.5deg); }
  100% { transform: translate(-1px, -2px) skewX(0deg); }
}

/* Decrypted "aenigmArchive" state */
.title-ornament.decrypted {
  animation: none !important;
  letter-spacing: normal;
  transform: scale(1.06);
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.brand-decrypted-wrapper {
  display: inline-flex;
  align-items: baseline;
  justify-content: center;
}

.brand-stem {
  font-family: var(--font-title);
  color: var(--gold-accent);
  letter-spacing: clamp(2px, 0.8vw, 4px);
  text-shadow: 0 0 20px rgba(212, 175, 55, 0.85);
  font-weight: 700;
  text-transform: none;
}

.brand-suffix {
  font-family: var(--font-title);
  color: #4df0ff;
  letter-spacing: clamp(3px, 1.2vw, 6px);
  font-weight: 800;
  text-shadow: 0 0 18px #4df0ff, 0 0 35px rgba(77, 240, 255, 0.7);
  background: linear-gradient(135deg, #70f3ff 0%, #d4af37 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  text-transform: none;
  margin-left: 1px;
}

.archive-decrypt-badge {
  font-family: var(--font-mono);
  font-size: clamp(0.68rem, 1.4vw, 0.82rem);
  letter-spacing: 2px;
  color: #70f3ff;
  background: rgba(10, 35, 50, 0.8);
  border: 1px solid rgba(77, 240, 255, 0.5);
  box-shadow: 0 0 15px rgba(77, 240, 255, 0.35);
  padding: 4px 14px;
  border-radius: 3px;
  margin-top: 6px;
  animation: badgeReveal 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes badgeReveal {
  0% { opacity: 0; transform: translateY(8px) scale(0.9); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

.loader-stage-warp {
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease !important;
  opacity: 0 !important;
  transform: scale(1.08) !important;
  filter: blur(6px) !important;
  pointer-events: none !important;
}
`;

if (!loaderCss.includes('.tape-cassette-unit.fast-forward')) {
  loaderCss += loaderAdditions;
  fs.writeFileSync('styles/loader.css', loaderCss, 'utf8');
  console.log('6. Updated styles/loader.css');
} else {
  console.log('styles/loader.css already had additions');
}

console.log('All changes applied successfully!');
