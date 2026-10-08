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
// ATMOSPHERIC MYSTERY & NOIR FORENSIC CANVAS ENGINE
// Replaces stick walkers with cinematic esoteric runes, golden ember dust,
// synaptic clue filaments (evidence web), and volumetric clocktower beacon sweep.
// ----------------------------------------------------------------------------
function initAtmosphericMysteryCanvas(canvasTarget = 'loader-glitch-canvas') {
  const canvas = (typeof canvasTarget === 'string') 
    ? document.getElementById(canvasTarget) 
    : canvasTarget;
  if (!canvas) return () => {};
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  let animId = null;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 0;
  let height = 0;

  const handleResize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth || window.innerWidth;
    height = canvas.clientHeight || window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  handleResize();
  window.addEventListener('resize', handleResize);

  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 32 : 56;
  const runeCount = isMobile ? 8 : 15;

  // 1. Floating Mystery & Forensic Particles (Golden embers + Phosphor cyan motes)
  const particles = [];
  for (let i = 0; i < particleCount; i++) {
    const isCyan = Math.random() < 0.22;
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: -(Math.random() * 0.55 + 0.25),
      radius: Math.random() * 1.8 + 0.8,
      baseAlpha: Math.random() * 0.45 + 0.25,
      currentAlpha: 0.3,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.025 + 0.015,
      isCyan: isCyan,
      colorRgb: isCyan ? '77, 240, 255' : '212, 175, 55',
      swayAmp: Math.random() * 0.35 + 0.1,
      swayFreq: Math.random() * 0.02 + 0.01
    });
  }

  // 2. Esoteric Mystery Runes & Clue Glyphs
  const RUNE_GLYPHS = ['⎊', '⧖', '◈', '🜂', '🜄', '✦', '⚖', '👁', '⚙', '⌘', '⌬', '🜁', '⚔', '⚝', '⨀', '🜃'];
  const runes = [];
  for (let i = 0; i < runeCount; i++) {
    runes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      char: RUNE_GLYPHS[Math.floor(Math.random() * RUNE_GLYPHS.length)],
      vy: -(Math.random() * 0.35 + 0.18),
      vx: (Math.random() - 0.5) * 0.2,
      fontSize: Math.floor(Math.random() * 12 + 14),
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.006,
      baseAlpha: Math.random() * 0.25 + 0.12,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      isCyan: Math.random() < 0.25
    });
  }

  // 3. Volumetric Clocktower Light Sweep
  let beaconSweep = 0;
  let lastTime = performance.now();

  function render(time) {
    const dt = Math.min((time - lastTime) / 1000, 0.1);
    lastTime = time;

    ctx.clearRect(0, 0, width, height);

    // Dynamic beacon sweep from midnight clocktower
    beaconSweep += dt * 0.15;
    const sweepAngle = Math.sin(beaconSweep) * 0.45;
    const originX = width * 0.5;
    const originY = -30;

    const grad = ctx.createRadialGradient(
      originX + Math.sin(sweepAngle) * (width * 0.2), 
      originY, 
      20,
      originX + Math.sin(sweepAngle) * (width * 0.35), 
      height * 0.65, 
      height * 0.8
    );
    grad.addColorStop(0, 'rgba(212, 175, 55, 0.045)');
    grad.addColorStop(0.5, 'rgba(77, 240, 255, 0.015)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Update & draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.pulsePhase += p.pulseSpeed;
      p.currentAlpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.18;
      p.currentAlpha = Math.max(0.08, Math.min(0.95, p.currentAlpha));

      p.x += p.vx + Math.sin(p.pulsePhase * 0.5) * p.swayAmp;
      p.y += p.vy;

      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      } else if (p.y > height + 10) {
        p.y = -10;
      }
      if (p.x < -10) p.x = width + 10;
      else if (p.x > width + 10) p.x = -10;

      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.colorRgb}, ${p.currentAlpha})`;
      ctx.shadowBlur = p.radius * 4;
      ctx.shadowColor = `rgba(${p.colorRgb}, 0.7)`;
      ctx.fill();
      ctx.restore();
    }

    // Synaptic Clue Filaments (Evidence Web between nearby embers)
    const maxLinkDist = isMobile ? 70 : 95;
    ctx.save();
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < maxLinkDist * maxLinkDist) {
          const dist = Math.sqrt(distSq);
          const linkAlpha = (1 - dist / maxLinkDist) * 0.22 * Math.min(p1.currentAlpha, p2.currentAlpha);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = p1.isCyan 
            ? `rgba(77, 240, 255, ${linkAlpha})` 
            : `rgba(212, 175, 55, ${linkAlpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    ctx.restore();

    // Floating Esoteric Mystery Runes
    ctx.save();
    for (let i = 0; i < runes.length; i++) {
      const r = runes[i];
      r.pulsePhase += r.pulseSpeed;
      r.rot += r.rotSpeed;
      const alpha = Math.max(0.06, Math.min(0.45, r.baseAlpha + Math.sin(r.pulsePhase) * 0.12));

      r.y += r.vy;
      r.x += r.vx + Math.sin(r.pulsePhase * 0.7) * 0.25;

      if (r.y < -30) {
        r.y = height + 30;
        r.x = Math.random() * width;
      }
      if (r.x < -30) r.x = width + 30;
      else if (r.x > width + 30) r.x = -30;

      ctx.save();
      ctx.translate(r.x, r.y);
      ctx.rotate(r.rot);
      ctx.font = `${r.fontSize}px "Cinzel", "Cinzel Decorative", Georgia, serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const color = r.isCyan ? `rgba(77, 240, 255, ${alpha})` : `rgba(212, 175, 55, ${alpha})`;
      ctx.fillStyle = color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = r.isCyan ? 'rgba(77, 240, 255, 0.4)' : 'rgba(212, 175, 55, 0.4)';
      ctx.fillText(r.char, 0, 0);
      ctx.restore();
    }
    ctx.restore();

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

  // Immediately apply active language to entire interface & clearance gate
  ui.applyLanguage(state.currentLanguage);

  // Initialize Atmospheric Mystery Canvas immediately on Gate Stage
  const stopGateCanvas = initAtmosphericMysteryCanvas('gate-mystery-canvas');

  // --------------------------------------------------------------------------
  // 0. INVESTIGATOR CLEARANCE GATE CONTROLLER (BEFORE LOADING SCREEN)
  // --------------------------------------------------------------------------
  const authGateStage = document.getElementById('auth-gate-stage');
  const gateActiveSessionView = document.getElementById('gate-active-session-view');
  const gateFormView = document.getElementById('gate-form-view');
  const gateActiveEmail = document.getElementById('gate-active-email');
  const btnGateContinueActive = document.getElementById('btn-gate-continue-active');
  const btnGateSwitchAccount = document.getElementById('btn-gate-switch-account');
  const btnGateGuestFromActive = document.getElementById('btn-gate-guest-from-active');
  const btnGateGuest = document.getElementById('btn-gate-guest');

  const tabGateLogin = document.getElementById('tab-gate-login');
  const tabGateRegister = document.getElementById('tab-gate-register');
  const btnGateSubmitLogin = document.getElementById('btn-gate-submit-login');
  const btnGateSubmitRegister = document.getElementById('btn-gate-submit-register');
  const gateAuthFeedback = document.getElementById('gate-auth-feedback');
  const gateEmailInput = document.getElementById('gate-email-input');
  const gatePasswordInput = document.getElementById('gate-password-input');

  function updateGateSessionUI() {
    if (typeof firebaseService === 'undefined' || !firebaseService) return;
    const status = firebaseService.getStatus();
    if (status.isAuthenticated && status.userEmail) {
      if (gateActiveEmail) gateActiveEmail.textContent = status.userEmail;
      if (gateActiveSessionView) gateActiveSessionView.style.display = 'block';
      if (gateFormView) gateFormView.style.display = 'none';
    } else {
      if (gateActiveSessionView) gateActiveSessionView.style.display = 'none';
      if (gateFormView) gateFormView.style.display = 'block';
    }
  }

  updateGateSessionUI();

  if (typeof firebaseService !== 'undefined') {
    firebaseService.subscribe((event) => {
      if (['auth_ready', 'auth_success', 'auth_signed_out'].includes(event)) {
        updateGateSessionUI();
      }
    });
  }

  tabGateLogin?.addEventListener('click', () => {
    audio.playUiClick();
    tabGateLogin.classList.add('active');
    tabGateRegister?.classList.remove('active');
    if (btnGateSubmitLogin) btnGateSubmitLogin.style.display = 'block';
    if (btnGateSubmitRegister) btnGateSubmitRegister.style.display = 'none';
    if (gateAuthFeedback) {
      gateAuthFeedback.textContent = '';
      gateAuthFeedback.className = 'auth-feedback-msg';
    }
  });

  tabGateRegister?.addEventListener('click', () => {
    audio.playUiClick();
    tabGateRegister.classList.add('active');
    tabGateLogin?.classList.remove('active');
    if (btnGateSubmitLogin) btnGateSubmitLogin.style.display = 'none';
    if (btnGateSubmitRegister) btnGateSubmitRegister.style.display = 'block';
    if (gateAuthFeedback) {
      gateAuthFeedback.textContent = '';
      gateAuthFeedback.className = 'auth-feedback-msg';
    }
  });

  let hasStartedLoading = false;
  let stopGlitchCanvas = null;

  function startLoadingScreen() {
    if (hasStartedLoading) return;
    hasStartedLoading = true;

    if (audio.init) audio.init();
    if (audio.playUiClick) audio.playUiClick();

    if (authGateStage) {
      if (stopGateCanvas) stopGateCanvas();
      authGateStage.classList.add('transition-exit');
      setTimeout(() => {
        authGateStage.style.display = 'none';
      }, 650);
    }

    const loadingStageEl = document.getElementById('loading-stage');
    if (loadingStageEl) {
      loadingStageEl.style.display = 'flex';
      setTimeout(() => {
        loadingStageEl.classList.remove('hidden');
        loadingStageEl.classList.add('loader-entering');
      }, 40);
    }

    // Initialize atmospheric mystery canvas with floating runes, embers, and synaptic filaments
    stopGlitchCanvas = initAtmosphericMysteryCanvas('loader-glitch-canvas');

    // Start loading progress
    startLoaderProgress();
  }

  // Continue / Guest buttons
  btnGateGuest?.addEventListener('click', () => {
    startLoadingScreen();
  });

  btnGateGuestFromActive?.addEventListener('click', () => {
    startLoadingScreen();
  });

  btnGateContinueActive?.addEventListener('click', async () => {
    audio.playUiClick();
    const loadRes = await firebaseService.loadGameFromCloud();
    if (loadRes && loadRes.success && loadRes.data) {
      state.applyLoadedData(loadRes.data);
      state.save(false);
      ui.updateHUD();
      const userEmail = firebaseService.currentUser?.email || '';
      const toastMsg = (t('gate_toast_dossier_loaded_short', state.currentLanguage) || t('gate_toast_dossier_loaded', state.currentLanguage) || 'Case dossier loaded from cloud!').replace('{email}', userEmail);
      ui.showToast(`☁️ ${toastMsg}`);
    }
    startLoadingScreen();
  });

  btnGateSwitchAccount?.addEventListener('click', async () => {
    audio.playUiClick();
    await firebaseService.logout();
    updateGateSessionUI();
  });

  const triggerGateLogin = async () => {
    audio.playUiClick();
    const email = gateEmailInput ? gateEmailInput.value.trim() : '';
    const password = gatePasswordInput ? gatePasswordInput.value : '';

    if (!email || !password) {
      if (gateAuthFeedback) {
        gateAuthFeedback.className = 'auth-feedback-msg error';
        gateAuthFeedback.textContent = t('gate_feedback_empty', state.currentLanguage);
      }
      audio.playDissonantDrone();
      return;
    }

    if (gateAuthFeedback) {
      gateAuthFeedback.className = 'auth-feedback-msg';
      gateAuthFeedback.textContent = t('gate_feedback_validating', state.currentLanguage);
    }

    const res = await firebaseService.loginWithEmailPassword(email, password);
    if (res && res.success) {
      if (gatePasswordInput) gatePasswordInput.value = '';
      if (gateAuthFeedback) {
        gateAuthFeedback.className = 'auth-feedback-msg success';
        gateAuthFeedback.textContent = t('gate_feedback_login_success', state.currentLanguage).replace('{email}', res.user.email);
      }
      audio.playSuccess();
      ui.showToast(`🔑 ${t('gate_toast_approved', state.currentLanguage)}: ${res.user.email}`);

      // Attempt to auto-sync or retrieve saved case data from cloud
      const loadRes = await firebaseService.loadGameFromCloud();
      if (loadRes && loadRes.success && loadRes.data) {
        state.applyLoadedData(loadRes.data);
        state.save(false);
        ui.updateHUD();
        ui.showToast(`🏛️ ${t('gate_toast_dossier_loaded', state.currentLanguage).replace('{email}', res.user.email)}`);
      } else {
        await state.saveToCloudNow();
      }

      setTimeout(() => {
        startLoadingScreen();
      }, 400);
    } else {
      if (gateAuthFeedback) {
        gateAuthFeedback.className = 'auth-feedback-msg error';
        gateAuthFeedback.textContent = res ? res.error : t('gate_feedback_failed', state.currentLanguage);
      }
      audio.playDissonantDrone();
    }
  };

  const triggerGateRegister = async () => {
    audio.playUiClick();
    const email = gateEmailInput ? gateEmailInput.value.trim() : '';
    const password = gatePasswordInput ? gatePasswordInput.value : '';

    if (!email || !password) {
      if (gateAuthFeedback) {
        gateAuthFeedback.className = 'auth-feedback-msg error';
        gateAuthFeedback.textContent = t('gate_feedback_empty', state.currentLanguage);
      }
      audio.playDissonantDrone();
      return;
    }

    if (password.length < 6) {
      if (gateAuthFeedback) {
        gateAuthFeedback.className = 'auth-feedback-msg error';
        gateAuthFeedback.textContent = t('gate_feedback_password_min', state.currentLanguage);
      }
      audio.playDissonantDrone();
      return;
    }

    if (gateAuthFeedback) {
      gateAuthFeedback.className = 'auth-feedback-msg';
      gateAuthFeedback.textContent = t('gate_feedback_registering', state.currentLanguage);
    }

    const res = await firebaseService.registerWithEmailPassword(email, password);
    if (res && res.success) {
      if (gatePasswordInput) gatePasswordInput.value = '';
      if (gateAuthFeedback) {
        gateAuthFeedback.className = 'auth-feedback-msg success';
        gateAuthFeedback.textContent = t('gate_feedback_register_success', state.currentLanguage).replace('{email}', res.user.email);
      }
      audio.playSuccess();
      ui.showToast(`🎉 ${t('gate_toast_registered', state.currentLanguage)}: ${res.user.email}`);
      await state.saveToCloudNow();

      setTimeout(() => {
        startLoadingScreen();
      }, 400);
    } else {
      if (gateAuthFeedback) {
        gateAuthFeedback.className = 'auth-feedback-msg error';
        gateAuthFeedback.textContent = res ? res.error : 'Gagal mendaftar.';
      }
      audio.playDissonantDrone();
    }
  };

  btnGateSubmitLogin?.addEventListener('click', triggerGateLogin);
  btnGateSubmitRegister?.addEventListener('click', triggerGateRegister);

  const handleGateEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (btnGateSubmitRegister && btnGateSubmitRegister.style.display !== 'none') {
        triggerGateRegister();
      } else {
        triggerGateLogin();
      }
    }
  };
  gateEmailInput?.addEventListener('keydown', handleGateEnter);
  gatePasswordInput?.addEventListener('keydown', handleGateEnter);

  // --------------------------------------------------------------------------
  // 1. ANIMATED LOADING SCREEN CONTROLLER
  // --------------------------------------------------------------------------
  const loadingStage = document.getElementById('loading-stage');
  const quoteEl = document.getElementById('loader-quote-text');
  const progressFill = document.getElementById('loader-progress-fill');
  const progressPct = document.getElementById('loader-progress-pct');
  const telemetryText = document.getElementById('loader-telemetry-text');
  const enterBtn = document.getElementById('loader-enter-btn');

  let quoteIdx = 0;
  let quoteInterval = null;
  let progressInterval = null;
  let currentProgress = 0;
  let isLoaded = false;
  let lastMilestone = 0;
  let isEntering = false;
  let transitionCompleted = false;

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
    if (progressInterval) clearInterval(progressInterval);
    if (quoteInterval) clearInterval(quoteInterval);
    if (enterBtn) {
      enterBtn.classList.add('ready');
      enterBtn.focus();
    }
    try {
      if (audio.playClockworkChime) audio.playClockworkChime();
    } catch (e) {}
  }

  function startLoaderProgress() {
    quoteIdx = 0;
    if (quoteInterval) clearInterval(quoteInterval);
    quoteInterval = setInterval(() => {
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

    if (progressInterval) clearInterval(progressInterval);
    progressInterval = setInterval(() => {
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
          try {
            if (audio.playUiHover) audio.playUiHover();
          } catch (e) {}
        }
      }

      const activePhases = TELEMETRY_PHASES_I18N[state.currentLanguage] || TELEMETRY_PHASES_I18N['en'];
      const phase = activePhases.find(p => currentProgress <= p.at);
      if (phase && telemetryText) {
        telemetryText.textContent = phase.text;
      }
    }, 65);
  }

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

  function completeTransitionToCreator() {
    if (transitionCompleted) return;
    transitionCompleted = true;
    if (loadingStage) {
      loadingStage.style.display = 'none';
      loadingStage.classList.add('hidden');
    }
    const caseTransition = document.getElementById('detective-case-transition');
    if (caseTransition) {
      caseTransition.classList.add('hidden');
      caseTransition.classList.remove('opening');
    }
    const creatorStage = document.getElementById('creator-stage');
    if (creatorStage) {
      creatorStage.style.display = 'flex';
      creatorStage.classList.remove('hidden');
    }
    ui.applyLanguage(state.currentLanguage);
    initCharacterCreator();
  }

  function enterGameStage() {
    if (isEntering) return;
    isEntering = true;

    try {
      if (audio.init) audio.init();
      if (audio.playRadioTune) audio.playRadioTune();
      if (audio.playUiClick) audio.playUiClick();
    } catch (e) {
      console.warn('Audio init error:', e);
    }

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

    // Safety fallback timer: guarantee character creator opens after 2.8s max even if animations glitch
    const safetyTimer = setTimeout(() => {
      completeTransitionToCreator();
    }, 2800);

    // High-tech decryption / deciphering sequence morphing AENIGMA into aenigmArchive
    const cypherChars = '0123456789ABCDEF!#$&*@%¥§';
    const targetStem = 'aenigm';
    const targetPivot = 'A';
    const targetSuffix = 'rchive';
    const targetFull = 'aenigmArchive';
    
    let scrambleTicks = 0;
    const maxTicks = 8; // snappy ~160ms at 20ms per tick

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

          try {
            if (audio.playDiscovery) audio.playDiscovery();
            if (audio.playDossierStamp) audio.playDossierStamp();
          } catch (e) {}

          // Snappy hold before launching dossier transition: 300ms
          setTimeout(() => {
            if (telemetryText) {
              telemetryText.textContent = dec.dispatching_dossier;
            }
          }, 150);

          setTimeout(() => {
            try {
              if (audio.stopLoadingScreenAmbience) audio.stopLoadingScreenAmbience();
            } catch (e) {}
            if (loadingStage) loadingStage.classList.add('loader-stage-warp');

            // Launch High-Octane Noir Detective Case Dossier Transition
            const caseTransition = document.getElementById('detective-case-transition');
            const rubberStamp = document.getElementById('dossier-rubber-stamp');
            const stampSplatter = document.getElementById('stamp-ink-splatter');
            const cautionTape = document.getElementById('dossier-caution-tape');

            if (caseTransition) {
              try { if (stopGlitchCanvas) stopGlitchCanvas(); } catch (e) {}
              updateDossierLanguage(state.currentLanguage);
              caseTransition.classList.remove('hidden');

              // Click-to-skip support on dossier transition
              caseTransition.onclick = () => {
                clearTimeout(safetyTimer);
                completeTransitionToCreator();
              };

              // Clean solid desk impact sound
              try { if (audio.playDeskSlam) audio.playDeskSlam(); } catch (e) {}

              // 1. Red Rubber Stamp Slams down (at 300ms)
              setTimeout(() => {
                if (rubberStamp) rubberStamp.classList.add('stamped');
                if (stampSplatter) stampSplatter.classList.add('splattered');
                try { if (audio.playDossierStamp) audio.playDossierStamp(); } catch (e) {}

                // 2. Police Caution Tape Unseals (at 600ms)
                setTimeout(() => {
                  if (cautionTape) cautionTape.classList.add('ripped');
                  try { if (audio.playTapeTear) audio.playTapeTear(); } catch (e) {}

                  // 3. Dossier Unseals & Opens into Scene (at 900ms)
                  setTimeout(() => {
                    caseTransition.classList.add('opening');
                    try { if (audio.playCathedralBell) audio.playCathedralBell(); } catch (e) {}

                    setTimeout(() => {
                      clearTimeout(safetyTimer);
                      if (rubberStamp) rubberStamp.classList.remove('stamped');
                      if (stampSplatter) stampSplatter.classList.remove('splattered');
                      if (cautionTape) cautionTape.classList.remove('ripped');
                      completeTransitionToCreator();
                    }, 350);
                  }, 300);
                }, 300);
              }, 300);

            } else {
              // Fallback if no caseTransition
              setTimeout(() => {
                clearTimeout(safetyTimer);
                completeTransitionToCreator();
              }, 200);
            }
          }, 400);
        }
      }, 20);
    } else {
      // Fallback if no titleEl
      clearTimeout(safetyTimer);
      completeTransitionToCreator();
    }
  }

  // Start gritty noir ambience on first interaction
  const triggerLoadingAudio = () => {
    try {
      if (audio.startLoadingScreenAmbience) audio.startLoadingScreenAmbience();
    } catch (e) {}
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

  const handleEnterClick = (e) => {
    if (e) e.stopPropagation();
    if (!isLoaded) {
      finishLoading();
    }
    enterGameStage();
  };
  enterBtn?.addEventListener('click', handleEnterClick);
  enterBtn?.addEventListener('touchend', (e) => {
    if (e) e.preventDefault();
    handleEnterClick(e);
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
  let creatorInitialized = false;

  function initCharacterCreator() {
    if (creatorInitialized) {
      updateCreatorAttributes();
      ui.applyLanguage(state.currentLanguage);
      return;
    }
    creatorInitialized = true;

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

