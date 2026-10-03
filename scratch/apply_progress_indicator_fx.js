const fs = require('fs');

console.log('--- Applying Progress Indicator 1-100% Visual & Audio Effects ---');

// 1. UPDATE index.html
let indexHtml = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');

const oldProgressHtml = `      <!-- Defragmentation Progress Bar -->
      <div class="loader-progress-box">
        <div class="telemetry-row">
          <span id="loader-telemetry-text">Initializing neural telemetry...</span>
          <span id="loader-progress-pct">0%</span>
        </div>
        <div class="progress-track">
          <div id="loader-progress-fill" class="progress-fill"></div>
        </div>
      </div>`;

const newProgressHtml = `      <!-- Defragmentation Progress Bar & Telemetry HUD -->
      <div class="loader-progress-box">
        <div class="telemetry-row">
          <div class="telemetry-left">
            <span class="loader-sector-badge">SEC.04</span>
            <span id="loader-telemetry-text">Initializing neural telemetry...</span>
            <span class="terminal-cursor">▋</span>
          </div>
          <div class="loader-pct-container">
            <span id="loader-progress-pct" class="loader-progress-pct">0%</span>
          </div>
        </div>
        <div class="progress-track">
          <div id="loader-progress-fill" class="progress-fill"></div>
        </div>
      </div>`;

if (indexHtml.includes(oldProgressHtml)) {
  indexHtml = indexHtml.replace(oldProgressHtml, newProgressHtml);
  fs.writeFileSync('index.html', indexHtml, 'utf8');
  console.log('1. Updated progress HTML in index.html');
} else {
  console.warn('Could not find oldProgressHtml in index.html');
}


// 2. UPDATE styles/loader.css
let loaderCss = fs.readFileSync('styles/loader.css', 'utf8').replace(/\r\n/g, '\n');

const oldProgressCss = `/* Progress bar */
.loader-progress-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.telemetry-row {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-secondary);
  letter-spacing: 1px;
}

.progress-track {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  overflow: hidden;
  padding: 1px;
}

.progress-fill {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, var(--crimson-accent), var(--gold-accent), var(--color-intellect));
  border-radius: 3px;
  transition: width 0.2s ease-out;
  box-shadow: 0 0 12px rgba(212, 175, 55, 0.6);
}`;

const newProgressCss = `/* Enhanced Progress Bar & Telemetry HUD */
.loader-progress-box {
  width: 100%;
  max-width: 580px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: rgba(12, 16, 24, 0.65);
  border: 1px solid rgba(224, 215, 199, 0.14);
  border-radius: 8px;
  padding: 14px 18px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(0, 0, 0, 0.7);
  position: relative;
  backdrop-filter: blur(6px);
}

.telemetry-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-mono);
  font-size: clamp(0.72rem, 1.4vw, 0.82rem);
  color: var(--text-secondary);
  letter-spacing: 1px;
  gap: 10px;
}

.telemetry-left {
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.loader-sector-badge {
  font-size: 0.65rem;
  font-weight: 800;
  padding: 2px 6px;
  background: rgba(212, 175, 55, 0.15);
  border: 1px solid rgba(212, 175, 55, 0.4);
  color: var(--gold-accent);
  border-radius: 2px;
  letter-spacing: 1px;
  flex-shrink: 0;
}

.terminal-cursor {
  display: inline-block;
  color: #4df0ff;
  font-weight: 900;
  animation: cursorBlink 0.8s infinite;
  margin-left: 2px;
  flex-shrink: 0;
}

@keyframes cursorBlink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

/* Dynamic Nixie Glow Percentage Counter */
.loader-pct-container {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-weight: 800;
  flex-shrink: 0;
}

.loader-progress-pct {
  font-size: clamp(0.85rem, 1.8vw, 1.05rem);
  color: #4df0ff;
  text-shadow: 0 0 10px rgba(77, 240, 255, 0.8), 0 0 20px rgba(77, 240, 255, 0.4);
  min-width: 48px;
  text-align: right;
  letter-spacing: 1px;
  transition: color 0.3s ease, text-shadow 0.3s ease, transform 0.2s ease;
}

.loader-progress-pct.milestone-flash {
  color: #ffffff !important;
  text-shadow: 0 0 14px #ffffff, 0 0 28px #4df0ff !important;
  transform: scale(1.15);
}

.loader-progress-pct.ready {
  color: var(--gold-accent) !important;
  text-shadow: 0 0 15px rgba(212, 175, 55, 0.95), 0 0 30px rgba(212, 175, 55, 0.6) !important;
  transform: scale(1.08);
}

/* Track with forensic calibration tick marks */
.progress-track {
  width: 100%;
  height: 12px;
  background: #0a0d14;
  border: 1px solid rgba(224, 215, 199, 0.22);
  border-radius: 6px;
  overflow: hidden;
  padding: 2px;
  position: relative;
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.85), 0 0 10px rgba(0, 0, 0, 0.5);
}

/* 10% Calibration notches across the track */
.progress-track::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: repeating-linear-gradient(
    90deg,
    transparent 0,
    transparent calc(10% - 1px),
    rgba(255, 255, 255, 0.14) calc(10% - 1px),
    rgba(255, 255, 255, 0.14) 10%
  );
  pointer-events: none;
  z-index: 2;
}

/* Vibrant Animated Defragmentation Fill */
.progress-fill {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #ff2a6d 0%, #d4af37 45%, #00f2fe 100%);
  background-size: 200% 100%;
  border-radius: 4px;
  position: relative;
  transition: width 0.12s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 0 16px rgba(77, 240, 255, 0.7);
  animation: gradientFlow 2.5s ease infinite;
}

@keyframes gradientFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Moving Scanlines Pattern inside Fill */
.progress-fill::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: repeating-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.22) 0,
    rgba(255, 255, 255, 0.22) 6px,
    transparent 6px,
    transparent 12px
  );
  background-size: 24px 24px;
  animation: scanStripe 0.8s linear infinite;
  opacity: 0.75;
}

@keyframes scanStripe {
  0% { background-position: 0 0; }
  100% { background-position: 24px 0; }
}

/* Glowing Leading Laser Head / Spark at the tip of the progress */
.progress-fill::after {
  content: '';
  position: absolute;
  top: -2px;
  right: -3px;
  width: 6px;
  height: calc(100% + 4px);
  background: #ffffff;
  border-radius: 3px;
  box-shadow: 0 0 8px #ffffff, 0 0 18px #00f2fe, 0 0 30px #00f2fe;
  z-index: 3;
}

/* Completion surge animation when reaching 100% */
.progress-track.complete-surge {
  border-color: #4df0ff;
  box-shadow: 0 0 25px rgba(77, 240, 255, 0.85), inset 0 0 15px rgba(212, 175, 55, 0.6);
  animation: surgeFlash 0.6s ease-out;
}

@keyframes surgeFlash {
  0% { transform: scale(1); filter: brightness(1.8); }
  50% { transform: scale(1.02); filter: brightness(2.2); }
  100% { transform: scale(1); filter: brightness(1); }
}`;

if (loaderCss.includes(oldProgressCss)) {
  loaderCss = loaderCss.replace(oldProgressCss, newProgressCss);
  fs.writeFileSync('styles/loader.css', loaderCss, 'utf8');
  console.log('2. Updated progress CSS in styles/loader.css');
} else {
  console.warn('Could not find oldProgressCss in styles/loader.css');
}


// 3. UPDATE src/main.js
let mainJs = fs.readFileSync('src/main.js', 'utf8').replace(/\r\n/g, '\n');

const oldMainProgress = `  let currentProgress = 0;
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

    if (progressFill) progressFill.style.width = \`\${currentProgress}%\`;
    if (progressPct) progressPct.textContent = \`\${currentProgress}%\`;

    const activePhases = TELEMETRY_PHASES_I18N[state.currentLanguage] || TELEMETRY_PHASES_I18N['en'];
    const phase = activePhases.find(p => currentProgress <= p.at);
    if (phase && telemetryText) {
      telemetryText.textContent = phase.text;
    }
  }, 45);`;

const newMainProgress = `  let currentProgress = 0;
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

    if (progressFill) progressFill.style.width = \`\${currentProgress}%\`;
    if (progressPct) {
      progressPct.textContent = \`\${currentProgress}%\`;
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
  }, 65);`;

if (mainJs.includes(oldMainProgress)) {
  mainJs = mainJs.replace(oldMainProgress, newMainProgress);
  fs.writeFileSync('src/main.js', mainJs, 'utf8');
  console.log('3. Updated progress logic in src/main.js');
} else {
  console.warn('Could not find oldMainProgress in src/main.js');
}

console.log('Done applying progress indicator effects!');
