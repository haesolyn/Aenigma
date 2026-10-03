// Aenigma Main Bootstrap & Flow Orchestrator
import { audio } from './audio.js';
import { state } from './state.js';
import { UIController } from './ui.js';
import { CASE_DATA } from './cases.js';
import { LOADER_QUOTES_I18N, TELEMETRY_PHASES_I18N, ALIASES_I18N, t } from './i18n.js';

let hasBooted = false;

function bootGame() {
  if (hasBooted) return;
  hasBooted = true;

  const ui = new UIController(state);

  // --------------------------------------------------------------------------
  // 1. ANIMATED LOADING SCREEN CONTROLLER
  // --------------------------------------------------------------------------
  const quoteEl = document.getElementById('loader-quote-text');
  const progressFill = document.getElementById('loader-progress-fill');
  const progressPct = document.getElementById('loader-progress-pct');
  const telemetryText = document.getElementById('loader-telemetry-text');
  const enterBtn = document.getElementById('loader-enter-btn');
  const loadingStage = document.getElementById('loading-stage');

  let quoteIdx = 0;
  const quoteInterval = setInterval(() => {
    const activeQuotes = LOADER_QUOTES_I18N[state.currentLanguage] || LOADER_QUOTES_I18N['en'];
    quoteIdx = (quoteIdx + 1) % activeQuotes.length;
    if (quoteEl) {
      quoteEl.style.opacity = '0';
      setTimeout(() => {
        quoteEl.textContent = activeQuotes[quoteIdx];
        quoteEl.style.opacity = '1';
      }, 300);
    }
  }, 2800);

  let currentProgress = 0;
  let isLoaded = false;

  function finishLoading() {
    if (isLoaded) return;
    isLoaded = true;
    currentProgress = 100;
    if (progressFill) progressFill.style.width = '100%';
    if (progressPct) progressPct.textContent = '100%';
    const activePhases = TELEMETRY_PHASES_I18N[state.currentLanguage] || TELEMETRY_PHASES_I18N['en'];
    const finalPhase = activePhases[activePhases.length - 1];
    if (telemetryText) telemetryText.textContent = finalPhase ? finalPhase.text : "Consciousness restored. Ready to investigate.";
    clearInterval(progressInterval);
    clearInterval(quoteInterval);
    if (enterBtn) {
      enterBtn.classList.add('ready');
      enterBtn.focus();
    }
  }

  const progressInterval = setInterval(() => {
    currentProgress += Math.floor(Math.random() * 5) + 3;
    if (currentProgress >= 100) {
      finishLoading();
      return;
    }

    if (progressFill) progressFill.style.width = `${currentProgress}%`;
    if (progressPct) progressPct.textContent = `${currentProgress}%`;

    const activePhases = TELEMETRY_PHASES_I18N[state.currentLanguage] || TELEMETRY_PHASES_I18N['en'];
    const phase = activePhases.find(p => currentProgress <= p.at);
    if (phase && telemetryText) {
      telemetryText.textContent = phase.text;
    }
  }, 45);

  let isEntering = false;

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
          titleEl.innerHTML = `
            <div class="brand-decrypted-wrapper">
              <span class="brand-stem">${targetStem}</span><span class="brand-suffix">${targetSuffix}</span>
            </div>
            <div class="archive-decrypt-badge">◈ SECTOR 7 CASE DOSSIER DECRYPTED ◈</div>
          `;
          
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
  }

  // Allow clicking anywhere on loading stage to complete or enter
  loadingStage?.addEventListener('click', (e) => {
    if (!isLoaded) {
      finishLoading();
    } else {
      enterGameStage();
    }
  });

  enterBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    enterGameStage();
  });

  // --------------------------------------------------------------------------
  // 2. CHARACTER CREATOR CONTROLLER ("Usn dll suru gamerny bikinh sndiri")
  // --------------------------------------------------------------------------
  let availablePoints = 4; // Extra points to allocate on top of baseline
  const baseAttr = { intellect: 3, psyche: 3, physique: 2, motorics: 2 };
  const currentAttr = { ...baseAttr };
  let selectedSignature = 'esoterica';
  let selectedVice = 'smoker';
  let selectedGender = 'female';
  let selectedPortrait = 'assets/portrait_female.jpg';

  function initCharacterCreator() {
    const nameInput = document.getElementById('creator-name-input');
    const aliasInput = document.getElementById('creator-alias-input');
    const pointsPoolEl = document.getElementById('creator-points-pool');
    const startCaseBtn = document.getElementById('creator-start-btn');
    const portraitImg = document.getElementById('creator-portrait-img');
    const btnFemale = document.getElementById('btn-gender-female');
    const btnMale = document.getElementById('btn-gender-male');

    // Gender selection
    btnFemale?.addEventListener('click', () => {
      selectedGender = 'female';
      selectedPortrait = 'assets/portrait_female.jpg';
      btnFemale.classList.add('active');
      btnMale?.classList.remove('active');
      if (portraitImg) portraitImg.src = selectedPortrait;
      if (nameInput.value === 'Ren Vance' || nameInput.value === 'Valerian Vance') {
        nameInput.value = 'Renata Vance';
      }
      audio.playUiClick();
    });

    btnMale?.addEventListener('click', () => {
      selectedGender = 'male';
      selectedPortrait = 'assets/portrait_male.jpg';
      btnMale.classList.add('active');
      btnFemale?.classList.remove('active');
      if (portraitImg) portraitImg.src = selectedPortrait;
      if (nameInput.value === 'Renata Vance' || nameInput.value === 'Valerian Vance') {
        nameInput.value = 'Ren Vance';
      }
      audio.playUiClick();
    });

    // Randomize name button
    document.getElementById('btn-randomize-identity')?.addEventListener('click', () => {
      audio.playUiClick();
      const femaleFirstNames = ['Renata', 'Lyra', 'Mei-Lin', 'Kaelen', 'Seraphina', 'Aoi', 'Vivienne', 'Yuki', 'Kasumi', 'Morrigan'];
      const maleFirstNames = ['Valerian', 'Ren', 'Silas', 'Kazuki', 'Dante', 'Arthur', 'Lysander', 'Jin', 'Victor', 'Kenji'];
      const firstNames = selectedGender === 'female' ? femaleFirstNames : maleFirstNames;
      const lastNames = ['Vance', 'Voss', 'Sterling', 'Cross', 'Lin', 'Zhang', 'Chen', 'Blackwood', 'Mercer', 'Winter'];
      const aliases = ALIASES_I18N[state.currentLanguage] || ALIASES_I18N['en'];
      nameInput.value = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
      aliasInput.value = aliases[Math.floor(Math.random() * aliases.length)];
    });

    // Attribute Stepper buttons
    document.querySelectorAll('.stepper-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const attr = e.currentTarget.dataset.attr;
        const delta = parseInt(e.currentTarget.dataset.delta, 10);

        if (delta > 0 && availablePoints > 0 && currentAttr[attr] < 6) {
          currentAttr[attr] += 1;
          availablePoints -= 1;
          audio.playUiClick();
        } else if (delta < 0 && currentAttr[attr] > 1) {
          currentAttr[attr] -= 1;
          availablePoints += 1;
          audio.playUiClick();
        }

        updateCreatorAttributes();
      });
    });

    function updateCreatorAttributes() {
      if (pointsPoolEl) pointsPoolEl.textContent = `${availablePoints} ${t('points_available', state.currentLanguage)}`;
      ['intellect', 'psyche', 'physique', 'motorics'].forEach(a => {
        const valEl = document.getElementById(`attr-val-${a}`);
        if (valEl) valEl.textContent = currentAttr[a];
      });
    }

    state.subscribe((event) => {
      if (event === 'language_changed') {
        updateCreatorAttributes();
        ui.applyLanguage(state.currentLanguage);
      }
    });

    // Signature Skill Selection
    document.querySelectorAll('.sig-skill-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.sig-skill-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        selectedSignature = e.currentTarget.dataset.skill;
        audio.playUiClick();
      });
    });

    // Vice Selection
    document.querySelectorAll('.vice-card').forEach(card => {
      card.addEventListener('click', (e) => {
        document.querySelectorAll('.vice-card').forEach(c => c.classList.remove('selected'));
        e.currentTarget.classList.add('selected');
        selectedVice = e.currentTarget.dataset.vice;
        audio.playUiClick();
      });
    });

    // START CASE BUTTON
    startCaseBtn?.addEventListener('click', () => {
      const finalName = nameInput.value.trim() || (selectedGender === 'female' ? 'Renata Vance' : 'Ren Vance');
      const finalAlias = aliasInput.value.trim() || 'The Dissolute Inspector';

      // Save to game state
      state.detective.name = finalName;
      state.detective.alias = finalAlias;
      state.detective.gender = selectedGender;
      state.detective.portrait = selectedPortrait;
      state.detective.attributes = { ...currentAttr };

      // Distribute to subskills
      state.detective.skills.logic = currentAttr.intellect;
      state.detective.skills.encyclopedia = currentAttr.intellect;
      state.detective.skills.conceptualization = currentAttr.intellect;
      state.detective.skills.rhetoric = currentAttr.intellect;

      state.detective.skills.empathy = currentAttr.psyche;
      state.detective.skills.esoterica = currentAttr.psyche;
      state.detective.skills.authority = currentAttr.psyche;
      state.detective.skills.suggestion = currentAttr.psyche;

      state.detective.skills.endurance = currentAttr.physique;
      state.detective.skills.painThreshold = currentAttr.physique;
      state.detective.skills.electrochemistry = currentAttr.physique;
      state.detective.skills.physicalInstrument = currentAttr.physique;

      state.detective.skills.perception = currentAttr.motorics;
      state.detective.skills.handEyeCoord = currentAttr.motorics;
      state.detective.skills.savoirFaire = currentAttr.motorics;
      state.detective.skills.interfacing = currentAttr.motorics;

      state.detective.signatureSkill = selectedSignature;
      state.detective.maxHealth = Math.max(2, currentAttr.physique + 1);
      state.detective.health = state.detective.maxHealth;
      state.detective.maxMorale = Math.max(2, currentAttr.psyche + 1);
      state.detective.morale = state.detective.maxMorale;

      audio.playSuccess();

      // Transition to Main Game Stage
      const creatorStage = document.getElementById('creator-stage');
      const gameStage = document.getElementById('main-game-stage') || document.getElementById('app-container');

      creatorStage.classList.add('hidden');
      setTimeout(() => {
        creatorStage.style.display = 'none';
        if (gameStage) {
          gameStage.classList.remove('hidden');
        }

        // Render Scene & Initial Narrative
        ui.updateHUD();
        ui.applyLanguage(state.currentLanguage);
        ui.renderScene();
        const initialPoi = (window.CASE_DATA || CASE_DATA)?.pointsOfInterest?.find(p => p.id === 'poi_pendulum');
        ui.startDialogue('examine_pendulum_start', 'Crime Scene: Pendulum Chamber', initialPoi);
        const toastTemplate = t('toast_case_opened', state.currentLanguage) || `Case File Opened: Aurelia Vance · Welcome to District 7, Detective {name}`;
        ui.showToast(toastTemplate.replace('{name}', finalName));

        // Briefly show scene overlay HUD for orientation on entry, then smoothly minimize to corner chip
        const sceneHud = document.getElementById('scene-overlay-hud');
        if (sceneHud) {
          sceneHud.classList.remove('minimized');
          setTimeout(() => {
            if (sceneHud) sceneHud.classList.add('minimized');
          }, 4500);
        }
      }, 500);
    });

    updateCreatorAttributes();
  }

  // Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    // Ignore hotkeys while typing in text inputs
    if (e.target && ['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

    // 1-4 for dialog options if available
    if (['1', '2', '3', '4'].includes(e.key)) {
      const idx = parseInt(e.key, 10) - 1;
      const choices = document.querySelectorAll('.choice-btn');
      if (choices[idx]) {
        choices[idx].click();
      }
    } else if (e.key.toLowerCase() === 'c') {
      ui.openCabinetModal();
    } else if (e.key.toLowerCase() === 'i') {
      ui.openInventoryModal();
    } else if (e.key.toLowerCase() === 'j') {
      ui.openCluesModal();
    }
  });

  // Soft Restart from Victory Modal without hard page reload
  document.getElementById('btn-restart-inquiry')?.addEventListener('click', () => {
    state.reset();
    ui.closeModal(ui.victoryModal);
    const creatorStage = document.getElementById('creator-stage');
    const gameStage = document.getElementById('main-game-stage') || document.getElementById('app-container');
    if (gameStage) gameStage.classList.add('hidden');
    if (creatorStage) {
      creatorStage.classList.remove('hidden');
      creatorStage.style.display = 'grid';
    }
  });
}

// Bootstrap regardless of whether DOMContentLoaded already fired
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootGame);
} else {
  bootGame();
}

// Global debug and test exposures
if (typeof window !== 'undefined') {
  window.aenigma = { state, CASE_DATA, getLocalizedDialogueNode, t, tClue, tPoi, tItem, tSkill, audio };
  window.state = state;
  window.CASE_DATA = CASE_DATA;
  window.getLocalizedDialogueNode = getLocalizedDialogueNode;
  window.t = t;
  window.tClue = tClue;
  window.tPoi = tPoi;
  window.tSkill = tSkill;
}

