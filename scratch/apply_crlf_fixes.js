const fs = require('fs');

console.log('--- Applying Archive & Red Danger Vignette Fixes (CRLF aware) ---');

// 1. UPDATE src/state.js
let stateJs = fs.readFileSync('src/state.js', 'utf8');

const stateRegex = /(this\.dialogueHistory\s*=\s*\[\];\r?\n)(\s*})/;
if (stateRegex.test(stateJs)) {
  stateJs = stateJs.replace(stateRegex, `$1\n    // Ensure all critical danger effects and heartbeat are stopped on reset\n    if (typeof document !== 'undefined' && document.body) {\n      document.body.classList.remove('in-danger');\n    }\n    if (typeof audio !== 'undefined' && audio && audio.setHeartbeatActive) {\n      audio.setHeartbeatActive(false);\n    }\n    this.checkSurvivalState();\n$2`);
  fs.writeFileSync('src/state.js', stateJs, 'utf8');
  console.log('1. Successfully updated src/state.js');
} else {
  console.error('Failed to match stateRegex in src/state.js');
}

// 2. UPDATE src/ui.js
let uiJs = fs.readFileSync('src/ui.js', 'utf8');

const uiRegex = /document\.getElementById\('btn-retry-inquiry'\)\?\.addEventListener\('click',\s*\(\)\s*=>\s*\{[\s\S]*?this\.dialogueChoices\.innerHTML\s*=\s*`[\s\S]*?`;\r?\n\s*\}\);/;

const uiReplacement = `document.getElementById('btn-retry-inquiry')?.addEventListener('click', () => {
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

if (uiRegex.test(uiJs)) {
  uiJs = uiJs.replace(uiRegex, uiReplacement);
  fs.writeFileSync('src/ui.js', uiJs, 'utf8');
  console.log('2. Successfully updated src/ui.js');
} else {
  console.error('Failed to match uiRegex in src/ui.js');
}

// 3. UPDATE src/main.js
let mainJs = fs.readFileSync('src/main.js', 'utf8');

const mainEnterRegex = /function\s+enterGameStage\(\)\s*\{[\s\S]*?initCharacterCreator\(\);\r?\n\s*\},?\s*400\);?\r?\n\s*\}/;

const mainEnterReplacement = `let isEntering = false;

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

if (mainEnterRegex.test(mainJs)) {
  mainJs = mainJs.replace(mainEnterRegex, mainEnterReplacement);
  fs.writeFileSync('src/main.js', mainJs, 'utf8');
  console.log('3. Successfully updated src/main.js');
} else {
  console.error('Failed to match mainEnterRegex in src/main.js');
}

console.log('Done CRLF-aware replacement!');
