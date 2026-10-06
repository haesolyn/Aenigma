// Aenigma Main Bootstrap & Flow Orchestrator
import { audio } from './audio.js';
import { state } from './state.js';
import { firebaseService } from './firebase.js';
import { UIController } from './ui.js';
import { CASE_DATA } from './cases.js';
import { LOADER_QUOTES_I18N, TELEMETRY_PHASES_I18N, ALIASES_I18N, DOSSIER_I18N, LOADER_DECRYPT_I18N, t } from './i18n.js';

let hasBooted = false;


// ----------------------------------------------------------------------------
// GLITCH SILHOUETTE WALKERS CANVAS ENGINE
// ----------------------------------------------------------------------------
function initGlitchSilhouetteCanvas() {
  const canvas = document.getElementById('loader-glitch-canvas');
  if (!canvas) return () => {};
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  let animId = null;
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const handleResize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', handleResize);

  // Mysterious figures moving through the rainy dark street
  const walkers = [
    {
      type: 'detective',
      x: -100,
      yRate: 0.74,
      speed: 1.2,
      direction: 1, // left to right
      scale: 1.1,
      cycle: 0,
      strideFreq: 0.08,
      glitchTimer: 0,
      glitching: false,
      glitchDuration: 0,
      glitchShift: 0,
      opacity: 0.92
    },
    {
      type: 'umbrella',
      x: width + 100,
      yRate: 0.69,
      speed: 0.85,
      direction: -1, // right to left
      scale: 0.95,
      cycle: 1.8,
      strideFreq: 0.07,
      glitchTimer: 45,
      glitching: false,
      glitchDuration: 0,
      glitchShift: 0,
      opacity: 0.88
    },
    {
      type: 'watcher',
      x: width * 0.82,
      yRate: 0.71,
      speed: 0,
      direction: -1,
      scale: 1.0,
      cycle: 0,
      strideFreq: 0,
      glitchTimer: 120,
      glitching: false,
      glitchDuration: 0,
      glitchShift: 0,
      opacity: 0.85,
      emberGlow: 0.5
    }
  ];

  function drawSilhouette(w, colorOverride) {
    const groundY = height * w.yRate;
    const x = w.x;
    const s = w.scale * Math.max(0.7, Math.min(1.25, height / 850));
    const dir = w.direction;
    const cycle = w.cycle;

    ctx.save();
    ctx.translate(x, groundY);
    ctx.scale(dir * s, s);

    const leg1Angle = Math.sin(cycle) * 0.48;
    const leg2Angle = -Math.sin(cycle) * 0.48;
    const arm1Angle = -Math.sin(cycle) * 0.42;
    const coatSwing = Math.sin(cycle) * 0.18;

    const baseColor = colorOverride || '#05070d';
    ctx.fillStyle = baseColor;
    ctx.strokeStyle = baseColor;

    if (w.type === 'detective') {
      // Legs
      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-6, -60);
      ctx.lineTo(-6 + Math.sin(leg1Angle) * 32, -30);
      ctx.lineTo(-6 + Math.sin(leg1Angle) * 60, 0);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(6, -60);
      ctx.lineTo(6 + Math.sin(leg2Angle) * 32, -30);
      ctx.lineTo(6 + Math.sin(leg2Angle) * 60, 0);
      ctx.stroke();

      // Long Billowing Trenchcoat
      ctx.beginPath();
      ctx.moveTo(-16, -115);
      ctx.lineTo(16, -115);
      ctx.lineTo(26 + coatSwing * 14, -58);
      ctx.lineTo(-24 - coatSwing * 12, -58);
      ctx.closePath();
      ctx.fill();

      // Arms
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(10, -110);
      ctx.lineTo(12 + Math.sin(arm1Angle) * 26, -80);
      ctx.lineTo(12 + Math.sin(arm1Angle) * 46, -60);
      ctx.stroke();

      // Head & Fedora
      ctx.beginPath();
      ctx.arc(0, -135, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(3, -145, 24, 5, -0.08, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.rect(-10, -160, 20, 16);
      ctx.fill();

    } else if (w.type === 'umbrella') {
      // Umbrella Figure
      ctx.lineWidth = 12;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-5, -55);
      ctx.lineTo(-5 + Math.sin(leg1Angle) * 28, -26);
      ctx.lineTo(-5 + Math.sin(leg1Angle) * 55, 0);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(5, -55);
      ctx.lineTo(5 + Math.sin(leg2Angle) * 28, -26);
      ctx.lineTo(5 + Math.sin(leg2Angle) * 55, 0);
      ctx.stroke();

      // Coat
      ctx.beginPath();
      ctx.moveTo(-14, -110);
      ctx.lineTo(14, -110);
      ctx.lineTo(20, -55);
      ctx.lineTo(-20, -55);
      ctx.closePath();
      ctx.fill();

      // Head
      ctx.beginPath();
      ctx.arc(0, -125, 11, 0, Math.PI * 2);
      ctx.fill();

      // Umbrella Shaft & Large Canopy
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(4, -85);
      ctx.lineTo(8, -148);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(8, -148, 42, Math.PI, 0);
      ctx.closePath();
      ctx.fill();

    } else if (w.type === 'watcher') {
      // Watcher leaning in the shadows
      ctx.lineWidth = 13;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-5, -50);
      ctx.lineTo(-5, 0);
      ctx.moveTo(7, -50);
      ctx.lineTo(10, 0);
      ctx.stroke();

      // Tall Trenchcoat
      ctx.beginPath();
      ctx.moveTo(-15, -112);
      ctx.lineTo(15, -112);
      ctx.lineTo(20, -48);
      ctx.lineTo(-20, -48);
      ctx.closePath();
      ctx.fill();

      // High Turned-up Collar
      ctx.beginPath();
      ctx.moveTo(-16, -116);
      ctx.lineTo(-20, -132);
      ctx.lineTo(-10, -120);
      ctx.closePath();
      ctx.fill();

      // Head & Fedora
      ctx.beginPath();
      ctx.arc(0, -130, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(0, -138, 20, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.rect(-9, -152, 18, 14);
      ctx.fill();

      // Cigarette & Glowing Ember (simple fast arc)
      if (!colorOverride) {
        w.emberGlow = (Math.sin(Date.now() * 0.005) + 1) * 0.5;
        ctx.fillStyle = `rgba(255, 95, 25, ${0.5 + w.emberGlow * 0.5})`;
        ctx.beginPath();
        ctx.arc(9, -126, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < walkers.length; i++) {
      const w = walkers[i];

      if (w.speed > 0) {
        w.x += w.speed * w.direction;
        w.cycle += w.strideFreq;

        if (w.direction === 1 && w.x > width + 150) {
          w.x = -130;
        } else if (w.direction === -1 && w.x < -150) {
          w.x = width + 130;
        }
      }

      // Glitch timing: triggers cleanly without heavy overhead
      w.glitchTimer++;
      if (!w.glitching && Math.random() < 0.02 && w.glitchTimer > 40) {
        w.glitching = true;
        w.glitchDuration = 5;
        w.glitchTimer = 0;
        w.glitchShift = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 12 + 8);
      }

      ctx.globalAlpha = w.opacity;

      // Chromatic Glitch Aberration: Pure fast vector ghosts
      if (w.glitching) {
        // Cyan ghost
        ctx.save();
        ctx.translate(w.glitchShift, 0);
        drawSilhouette(w, 'rgba(0, 235, 255, 0.7)');
        ctx.restore();

        // Magenta ghost
        ctx.save();
        ctx.translate(-w.glitchShift, 0);
        drawSilhouette(w, 'rgba(255, 30, 80, 0.7)');
        ctx.restore();

        // Horizontal digital glitch slices
        const groundY = height * w.yRate;
        ctx.fillStyle = 'rgba(0, 235, 255, 0.8)';
        ctx.fillRect(w.x - 30, groundY - 60, 60, 2);
        ctx.fillStyle = 'rgba(255, 30, 80, 0.8)';
        ctx.fillRect(w.x - 20, groundY - 35, 50, 2);

        w.glitchDuration--;
        if (w.glitchDuration <= 0) {
          w.glitching = false;
        }
      }

      // Main Dark Noir Silhouette
      drawSilhouette(w, null);
    }

    ctx.globalAlpha = 1.0;
    animId = requestAnimationFrame(render);
  }

  animId = requestAnimationFrame(render);

  return function stop() {
    if (animId) cancelAnimationFrame(animId);
    window.removeEventListener('resize', handleResize);
  };
}

function bootGame() {
  if (hasBooted) return;
  hasBooted = true;

  const ui = new UIController(state);

  // Initialize Firebase Cloud Archive Service
  if (typeof firebaseService !== 'undefined') {
    firebaseService.init();
  }

  // Initialize animated glitch silhouette walkers
  const stopGlitchCanvas = initGlitchSilhouetteCanvas();

  // Immediately apply active language to entire loading screen
  ui.applyLanguage(state.currentLanguage);

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
  let lastMilestone = 0;

  function finishLoading() {
    if (isLoaded) return;
    isLoaded = true;
    currentProgress = 100;
    if (progressFill) progressFill.style.width = '100%';
    if (progressPct) {
      progressPct.textContent = '100%';
      progressPct.classList.add('ready');
    }
    const track = document.querySelector('.progress-track');
    if (track) track.classList.add('complete-surge');

    const activePhases = TELEMETRY_PHASES_I18N[state.currentLanguage] || TELEMETRY_PHASES_I18N['en'];
    const finalPhase = activePhases[activePhases.length - 1];
    if (telemetryText) {
      telemetryText.textContent = finalPhase ? finalPhase.text : "Consciousness restored. Ready to investigate.";
    }
    clearInterval(progressInterval);
    clearInterval(quoteInterval);
    if (enterBtn) {
      enterBtn.classList.add('ready');
      enterBtn.focus();
    }
    if (audio.playClockworkChime) audio.playClockworkChime();
  }

  const progressInterval = setInterval(() => {
    // Dynamic forensic pacing: rapid start, calibration pauses at milestones, smooth lock
    let step = Math.floor(Math.random() * 3) + 2; // base step 2-4%
    if (currentProgress < 25) {
      step += 2; // quick initial neural spooling
    } else if (currentProgress >= 25 && currentProgress < 35) {
      step = 1; // forensic calibration pause at 30%
    } else if (currentProgress >= 60 && currentProgress < 70) {
      step = 1; // forensic sector lock pause
    } else if (currentProgress >= 88 && currentProgress < 95) {
      step = 2;
    }

    currentProgress += step;

    if (currentProgress >= 100) {
      finishLoading();
      return;
    }

    if (progressFill) progressFill.style.width = `${currentProgress}%`;
    if (progressPct) {
      progressPct.textContent = `${currentProgress}%`;
      // Check milestone flash (25%, 50%, 75%)
      const currentMilestone = Math.floor(currentProgress / 25);
      if (currentMilestone > lastMilestone) {
        lastMilestone = currentMilestone;
        progressPct.classList.add('milestone-flash');
        setTimeout(() => progressPct.classList.remove('milestone-flash'), 250);
        if (audio.playUiHover) audio.playUiHover();
      }
    }

    const activePhases = TELEMETRY_PHASES_I18N[state.currentLanguage] || TELEMETRY_PHASES_I18N['en'];
    const phase = activePhases.find(p => currentProgress <= p.at);
    if (phase && telemetryText) {
      telemetryText.textContent = phase.text;
    }
  }, 65);

  
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
    const targetPivot = 'A';
    const targetSuffix = 'rchive';
    const targetFull = 'aenigmArchive';
    
    let scrambleTicks = 0;
    const maxTicks = 16; // ~400ms at 25ms per tick

    const dec = (typeof LOADER_DECRYPT_I18N !== 'undefined' && (LOADER_DECRYPT_I18N[state.currentLanguage] || LOADER_DECRYPT_I18N['en'])) || {
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
          titleEl.innerHTML = `
            <div class="brand-decrypted-wrapper">
              <span class="brand-stem">${targetStem}</span><span class="brand-junction" title="${dec.nexus_title}">${targetPivot}</span><span class="brand-suffix">${targetSuffix}</span>
            </div>
            <div class="archive-decrypt-badge">${dec.badge_decrypted}</div>
          `;
          
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
          }, 1100);

          setTimeout(() => {
            if (audio.stopLoadingScreenAmbience) audio.stopLoadingScreenAmbience();
            loadingStage.classList.add('loader-stage-warp');

            // Launch High-Octane Noir Detective Case Dossier Transition
            const caseTransition = document.getElementById('detective-case-transition');
            const rubberStamp = document.getElementById('dossier-rubber-stamp');
            const stampSplatter = document.getElementById('stamp-ink-splatter');
            const cautionTape = document.getElementById('dossier-caution-tape');

            if (caseTransition) {
              if (stopGlitchCanvas) stopGlitchCanvas();
              updateDossierLanguage(state.currentLanguage);
              caseTransition.classList.remove('hidden');

              // Clean solid desk impact sound
              if (audio.playDeskSlam) audio.playDeskSlam();

              // 1. Red Rubber Stamp Slams down (at 600ms)
              setTimeout(() => {
                if (rubberStamp) rubberStamp.classList.add('stamped');
                if (stampSplatter) stampSplatter.classList.add('splattered');
                if (audio.playDossierStamp) audio.playDossierStamp();

                // 2. Police Caution Tape Unseals (at 1400ms)
                setTimeout(() => {
                  if (cautionTape) cautionTape.classList.add('ripped');
                  if (audio.playTapeTear) audio.playTapeTear();

                  // 3. Dossier Unseals & Opens into Scene (at 1900ms)
                  setTimeout(() => {
                    caseTransition.classList.add('opening');
                    if (audio.playCathedralBell) audio.playCathedralBell();

                    setTimeout(() => {
                      loadingStage.style.display = 'none';
                      caseTransition.classList.add('hidden');
                      caseTransition.classList.remove('opening');
                      if (rubberStamp) rubberStamp.classList.remove('stamped');
                      if (stampSplatter) stampSplatter.classList.remove('splattered');
                      if (cautionTape) cautionTape.classList.remove('ripped');

                      if (creatorStage) {
                        creatorStage.classList.remove('hidden');
                      }
                      ui.applyLanguage(state.currentLanguage);
                      initCharacterCreator();
                    }, 550);
                  }, 500);
                }, 800);
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
          }, 2200);
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

  // Start gritty noir ambience on first interaction
  const triggerLoadingAudio = () => {
    if (audio.startLoadingScreenAmbience) audio.startLoadingScreenAmbience();
  };
  loadingStage?.addEventListener('pointerdown', triggerLoadingAudio, { once: true });
  document.addEventListener('keydown', triggerLoadingAudio, { once: true });

  // Allow clicking anywhere on loading stage to complete or enter
  loadingStage?.addEventListener('click', (e) => {
    triggerLoadingAudio();
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
  window.aenigma = { state, CASE_DATA, getLocalizedDialogueNode, t, tClue, tPoi, tItem, tSkill, audio, firebaseService };
  window.state = state;
  window.firebaseService = firebaseService;
  window.CASE_DATA = CASE_DATA;
  window.getLocalizedDialogueNode = getLocalizedDialogueNode;
  window.t = t;
  window.tClue = tClue;
  window.tPoi = tPoi;
  window.tSkill = tSkill;
}

