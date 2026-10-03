const fs = require('fs');

console.log('--- Applying Dramatic Noir Transition & Dark Ambience Audio ---');

// 1. UPDATE src/audio.js: Add Loading Ambience, Desk Slam, Camera Flash, Tape Tear
let audioJs = fs.readFileSync('src/audio.js', 'utf8').replace(/\r\n/g, '\n');

const newAudioMethods = `
  // --- OMINOUS & GRITTY LOADING SCREEN AMBIENCE ---
  startLoadingScreenAmbience() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx || this.loadingAmbienceActive) return;
    this.loadingAmbienceActive = true;
    const now = this.ctx.currentTime;

    // Master loading ambience gain node
    this.loadingMasterGain = this.ctx.createGain();
    this.loadingMasterGain.gain.setValueAtTime(0.001, now);
    this.loadingMasterGain.gain.exponentialRampToValueAtTime(0.18, now + 1.2);
    this.loadingMasterGain.connect(this.ctx.destination);

    // 1. Deep Sub-bass Abyssal Drone (44Hz sawtooth + lowpass)
    this.loadingDroneOsc = this.ctx.createOscillator();
    this.loadingDroneOsc.type = 'sawtooth';
    this.loadingDroneOsc.frequency.setValueAtTime(44, now);

    const droneFilter = this.ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.setValueAtTime(95, now);
    droneFilter.Q.setValueAtTime(5.0, now);

    // Subtle pitch modulation (ominous dread wobble)
    const droneLfo = this.ctx.createOscillator();
    droneLfo.type = 'sine';
    droneLfo.frequency.setValueAtTime(0.15, now);
    const droneLfoGain = this.ctx.createGain();
    droneLfoGain.gain.setValueAtTime(3.5, now);
    droneLfo.connect(droneLfoGain);
    droneLfoGain.connect(this.loadingDroneOsc.frequency);
    droneLfo.start(now);
    this.loadingDroneLfo = droneLfo;

    this.loadingDroneOsc.connect(droneFilter);
    droneFilter.connect(this.loadingMasterGain);
    this.loadingDroneOsc.start(now);

    // 2. Gritty Analog Tape Hiss & Static Crackle
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Pink/Brown noise filter
      lastOut = (lastOut + (0.025 * white)) / 1.025;
      data[i] = lastOut * 3.2;
      // Add random tape static pops/clicks
      if (Math.random() < 0.0015) {
        data[i] += (Math.random() * 2 - 1) * 0.8;
      }
    }

    this.loadingNoiseSource = this.ctx.createBufferSource();
    this.loadingNoiseSource.buffer = noiseBuffer;
    this.loadingNoiseSource.loop = true;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(1400, now);
    noiseFilter.Q.setValueAtTime(0.9, now);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.045, now);

    this.loadingNoiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.loadingMasterGain);
    this.loadingNoiseSource.start(now);
  }

  stopLoadingScreenAmbience() {
    if (!this.loadingAmbienceActive || !this.ctx) return;
    this.loadingAmbienceActive = false;
    const now = this.ctx.currentTime;
    if (this.loadingMasterGain) {
      this.loadingMasterGain.gain.setTargetAtTime(0.0001, now, 0.4);
      setTimeout(() => {
        try {
          if (this.loadingDroneOsc) this.loadingDroneOsc.stop();
          if (this.loadingDroneLfo) this.loadingDroneLfo.stop();
          if (this.loadingNoiseSource) this.loadingNoiseSource.stop();
        } catch (e) {}
      }, 500);
    }
  }

  // Heavy Wood Desk Impact with Sub-Bass Punch
  playDeskSlam() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;

    // Sub-drop thud (120Hz -> 30Hz)
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(32, now + 0.28);

    gain.gain.setValueAtTime(0.38, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);

    // Heavy wooden slab slap noise
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.12);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(220, now);

    const nGain = this.ctx.createGain();
    nGain.gain.setValueAtTime(0.22, now);
    nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    noise.connect(filter);
    filter.connect(nGain);
    nGain.connect(this.ctx.destination);
    noise.start(now);
  }

  // Rapid Forensic Camera Flashbulbs Burst
  playCameraFlashBurst() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;

    [0, 0.14, 0.26].forEach((offset) => {
      const t = now + offset;
      // High-pitch capacitor recharge hiss
      const capOsc = this.ctx.createOscillator();
      const capGain = this.ctx.createGain();
      capOsc.type = 'sine';
      capOsc.frequency.setValueAtTime(1800, t);
      capOsc.frequency.exponentialRampToValueAtTime(4200, t + 0.08);

      capGain.gain.setValueAtTime(0.06, t);
      capGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);

      capOsc.connect(capGain);
      capGain.connect(this.ctx.destination);
      capOsc.start(t);
      capOsc.stop(t + 0.1);

      // Shutter snap click
      const snapOsc = this.ctx.createOscillator();
      const snapGain = this.ctx.createGain();
      snapOsc.type = 'triangle';
      snapOsc.frequency.setValueAtTime(950, t);
      snapOsc.frequency.exponentialRampToValueAtTime(80, t + 0.04);

      snapGain.gain.setValueAtTime(0.18, t);
      snapGain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

      snapOsc.connect(snapGain);
      snapGain.connect(this.ctx.destination);
      snapOsc.start(t);
      snapOsc.stop(t + 0.06);
    });
  }

  // Police Caution Tape Tearing Sound
  playTapeTear() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;

    const bufferSize = Math.floor(this.ctx.sampleRate * 0.16);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3200, now);
    filter.Q.setValueAtTime(2.5, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.16, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(now);
  }
`;

const insertTarget = '  // Giant Pendulum Escapement Clockwork Tick & Resonance';
if (audioJs.includes(insertTarget)) {
  audioJs = audioJs.replace(insertTarget, newAudioMethods + '\n  ' + insertTarget);
  fs.writeFileSync('src/audio.js', audioJs, 'utf8');
  console.log('1. Added new cinematic audio methods to src/audio.js');
} else {
  console.warn('Could not find insertTarget in src/audio.js');
}


// 2. UPDATE index.html: Add Dark Ambience Background & Enhanced Dossier Elements
let indexHtml = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');

// 2a. Add Dark Ambience to #loading-stage
const ambienceHtml = `    <!-- Dark Noir Ambience Background: Fog, Rain & Shadowy Silhouette Figures -->
    <div class="loader-dark-ambience" id="loader-dark-ambience">
      <div class="ambience-fog-layer far"></div>
      <div class="ambience-rain-layer"></div>
      <div class="ambience-silhouettes-container">
        <!-- Shadowy Figures Moving through the Dark Fog -->
        <div class="shadow-walker walker-detective" title="Inspector in the rain"></div>
        <div class="shadow-walker walker-umbrella" title="Figure with umbrella"></div>
        <div class="shadow-walker walker-witness" title="Shadowy watcher">
          <div class="cigarette-ember"></div>
        </div>
        <div class="shadow-whisperers" title="Conspirators in the gloom"></div>
        <div class="distant-streetlamp lamp-left"></div>
        <div class="distant-streetlamp lamp-right"></div>
      </div>
      <div class="ambience-fog-layer near"></div>
      <div class="ambience-vignette-overlay"></div>
    </div>`;

if (!indexHtml.includes('loader-dark-ambience')) {
  indexHtml = indexHtml.replace(
    '<section id="loading-stage" class="fullscreen-stage">',
    `<section id="loading-stage" class="fullscreen-stage">\n${ambienceHtml}`
  );
  console.log('2a. Added loader-dark-ambience to index.html');
}

// 2b. Add Polaroid, Crime Scene Tape, Splatter and Flash to #detective-case-transition
const oldDossierBody = `<div class="dossier-folder-paper">
        <div class="dossier-evidence-tape">EVIDENCE · DO NOT TAMPER · CRIME SCENE</div>`;

const newDossierBody = `<div class="dossier-camera-flash" id="dossier-camera-flash"></div>
    <div class="dossier-folder-paper">
        <div class="dossier-evidence-tape" id="dossier-evidence-tape">EVIDENCE · DO NOT TAMPER · CRIME SCENE</div>
        
        <!-- Pinned Crime Scene Polaroid of Saint Irene Clocktower -->
        <div class="dossier-polaroid-pin">
          <div class="brass-paperclip"></div>
          <div class="polaroid-photo">
            <div class="polaroid-img-clock">
              <span class="polaroid-stamp-ref">SCENE #01</span>
            </div>
            <span class="polaroid-caption">SAINT IRENE · PENDULUM CHAMBER</span>
          </div>
        </div>`;

if (indexHtml.includes(oldDossierBody)) {
  indexHtml = indexHtml.replace(oldDossierBody, newDossierBody);
}

// Add splatter ring next to rubber stamp
const oldRubberStamp = `<div class="dossier-rubber-stamp" id="dossier-rubber-stamp">`;
const newRubberStamp = `<div class="stamp-ink-splatter" id="stamp-ink-splatter"></div>
        <div class="dossier-rubber-stamp" id="dossier-rubber-stamp">`;

if (indexHtml.includes(oldRubberStamp) && !indexHtml.includes('stamp-ink-splatter')) {
  indexHtml = indexHtml.replace(oldRubberStamp, newRubberStamp);
}

// Add full-screen crime scene caution tape strip
const oldDossierFooter = `<div class="dossier-footer-note">`;
const newDossierFooter = `<div class="dossier-caution-tape-strip" id="dossier-caution-tape">
          <span class="tape-text">⚠️ POLICE CRIME SCENE — DO NOT CROSS — HOMICIDE SQUAD ⚠️</span>
        </div>
        <div class="dossier-footer-note">`;

if (indexHtml.includes(oldDossierFooter) && !indexHtml.includes('dossier-caution-tape')) {
  indexHtml = indexHtml.replace(oldDossierFooter, newDossierFooter);
}

fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('2. Updated index.html with ambience & dossier elements');


// 3. UPDATE styles/loader.css: Add dark ambience & intense cinematic transitions
let loaderCss = fs.readFileSync('styles/loader.css', 'utf8').replace(/\r\n/g, '\n');

const darkAmbienceAndTransitionCss = `
/* ==========================================================================
   DARK NOIR AMBIENCE: Fog, Rain & Shadowy Silhouette Figures
   ========================================================================== */
.loader-dark-ambience {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
}

/* Atmospheric Volumetric Fog Layers */
.ambience-fog-layer {
  position: absolute;
  top: 0;
  left: -20%;
  width: 140%;
  height: 100%;
  background: radial-gradient(circle at 50% 60%, rgba(20, 26, 38, 0.4) 0%, rgba(8, 11, 16, 0.8) 70%, #06080d 100%);
  pointer-events: none;
}

.ambience-fog-layer.far {
  filter: blur(24px);
  opacity: 0.85;
  animation: driftFogFar 35s infinite alternate ease-in-out;
}

.ambience-fog-layer.near {
  background: radial-gradient(circle at 30% 70%, rgba(40, 50, 70, 0.18) 0%, transparent 60%);
  filter: blur(18px);
  opacity: 0.6;
  z-index: 4;
  animation: driftFogNear 24s infinite alternate ease-in-out;
}

@keyframes driftFogFar {
  0% { transform: translateX(-5%) translateY(0); }
  100% { transform: translateX(5%) translateY(-3%); }
}

@keyframes driftFogNear {
  0% { transform: translateX(4%) translateY(-2%); }
  100% { transform: translateX(-4%) translateY(2%); }
}

/* Atmospheric Rainy Wet Glass */
.ambience-rain-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    105deg,
    transparent 0,
    transparent 14px,
    rgba(255, 255, 255, 0.035) 15px,
    transparent 16px
  );
  animation: rainStreaks 0.45s linear infinite;
  opacity: 0.55;
  z-index: 2;
}

@keyframes rainStreaks {
  0% { background-position: 0 0; }
  100% { background-position: -30px 180px; }
}

/* Shadowy Figures Container */
.ambience-silhouettes-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
}

/* Distant Flickering Gas Streetlamps */
.distant-streetlamp {
  position: absolute;
  width: 120px;
  height: 240px;
  bottom: 12%;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 10%, rgba(255, 170, 60, 0.22) 0%, rgba(255, 140, 20, 0.08) 40%, transparent 70%);
  filter: blur(14px);
  animation: lampFlicker 6s infinite ease-in-out;
}

.distant-streetlamp.lamp-left { left: 8%; }
.distant-streetlamp.lamp-right { right: 12%; animation-delay: 2.2s; }

@keyframes lampFlicker {
  0%, 100% { opacity: 0.85; transform: scale(1); }
  45% { opacity: 0.7; transform: scale(0.96); }
  48% { opacity: 0.95; transform: scale(1.04); }
  52% { opacity: 0.78; }
}

/* Generic Shadow Walker base */
.shadow-walker {
  position: absolute;
  bottom: 14%;
  pointer-events: none;
}

/* Walker 1: Tall Detective in Fedora & Trenchcoat moving Left to Right */
.walker-detective {
  width: 90px;
  height: 180px;
  left: -120px;
  background: radial-gradient(ellipse at 50% 10%, #000 12%, transparent 13%),
              radial-gradient(ellipse at 50% 28%, #000 24%, transparent 26%),
              linear-gradient(180deg, transparent 20%, #030407 35%, #020305 95%);
  clip-path: polygon(30% 0%, 70% 0%, 85% 12%, 60% 14%, 75% 35%, 90% 70%, 95% 100%, 5% 100%, 10% 70%, 25% 35%, 40% 14%, 15% 12%);
  filter: blur(4px);
  opacity: 0.24;
  animation: walkLeftToRight 32s linear infinite;
}

@keyframes walkLeftToRight {
  0% { transform: translateX(0) scaleX(1); opacity: 0; }
  10% { opacity: 0.26; }
  90% { opacity: 0.26; }
  100% { transform: translateX(calc(100vw + 200px)) scaleX(1); opacity: 0; }
}

/* Walker 2: Mysterious Figure with Umbrella moving Right to Left */
.walker-umbrella {
  width: 100px;
  height: 170px;
  right: -130px;
  bottom: 18%;
  background: radial-gradient(ellipse at 50% 8%, #010204 40%, transparent 42%),
              linear-gradient(180deg, transparent 15%, #020306 40%, #010103 100%);
  clip-path: polygon(0% 22%, 100% 22%, 80% 0%, 20% 0%, 50% 22%, 75% 45%, 85% 100%, 15% 100%, 25% 45%);
  filter: blur(6px);
  opacity: 0.18;
  animation: walkRightToLeft 42s linear infinite;
  animation-delay: 4s;
}

@keyframes walkRightToLeft {
  0% { transform: translateX(0); opacity: 0; }
  10% { opacity: 0.19; }
  90% { opacity: 0.19; }
  100% { transform: translateX(calc(-100vw - 220px)); opacity: 0; }
}

/* Walker 3: Solitary Watcher with glowing cigarette ember */
.walker-witness {
  width: 70px;
  height: 160px;
  right: 18%;
  bottom: 15%;
  background: #020305;
  clip-path: polygon(35% 0%, 65% 0%, 75% 18%, 80% 60%, 85% 100%, 15% 100%, 20% 60%, 25% 18%);
  filter: blur(4.5px);
  opacity: 0.22;
  animation: witnessLurk 14s infinite alternate ease-in-out;
}

.cigarette-ember {
  position: absolute;
  top: 26px;
  left: 36px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #ff5500;
  box-shadow: 0 0 6px #ff5500, 0 0 14px rgba(255, 85, 0, 0.8);
  animation: cigarettePulse 4.5s infinite ease-in-out;
}

@keyframes cigarettePulse {
  0%, 100% { opacity: 0.2; transform: scale(0.8); }
  50% { opacity: 0.95; transform: scale(1.4); }
  55% { opacity: 0.4; }
  60% { opacity: 0.85; }
}

@keyframes witnessLurk {
  0% { opacity: 0.08; transform: translateY(4px); }
  50% { opacity: 0.26; transform: translateY(0); }
  100% { opacity: 0.08; transform: translateY(4px); }
}

/* Two Conspirators Murmuring in the Gloom */
.shadow-whisperers {
  position: absolute;
  bottom: 16%;
  left: 22%;
  width: 110px;
  height: 150px;
  background: radial-gradient(circle at 35% 20%, #010203 16%, transparent 18%),
              radial-gradient(circle at 65% 22%, #010203 16%, transparent 18%),
              linear-gradient(180deg, transparent 25%, #020305 45%, #010204 100%);
  filter: blur(7px);
  opacity: 0.16;
  animation: murmurShift 8s infinite alternate ease-in-out;
}

@keyframes murmurShift {
  0% { transform: scale(0.97) rotate(-1deg); opacity: 0.13; }
  100% { transform: scale(1.02) rotate(1deg); opacity: 0.22; }
}

.ambience-vignette-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 160px rgba(0, 0, 0, 0.92);
  z-index: 5;
  pointer-events: none;
}

/* ==========================================================================
   HIGH-OCTANE CINEMATIC TRANSITIONS: Screen Shake, Stamp Splatter & Tear
   ========================================================================== */

/* Fullscreen Violent Screen Shake */
body.screen-shake-violent {
  animation: violentImpactShake 0.35s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes violentImpactShake {
  0% { transform: translate(0, 0) rotate(0deg); }
  15% { transform: translate(-6px, 8px) rotate(-1deg); }
  30% { transform: translate(7px, -6px) rotate(1.2deg); }
  45% { transform: translate(-5px, 4px) rotate(-0.8deg); }
  65% { transform: translate(4px, -3px) rotate(0.5deg); }
  85% { transform: translate(-2px, 1px) rotate(-0.2deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
}

/* Forensic Camera Flashbulb Burst */
.dossier-camera-flash {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #ffffff;
  opacity: 0;
  pointer-events: none;
  z-index: 10001;
}

.dossier-camera-flash.flash-burst {
  animation: cameraFlashAnimation 0.5s ease-out;
}

@keyframes cameraFlashAnimation {
  0% { opacity: 0.95; }
  25% { opacity: 0.1; }
  45% { opacity: 0.85; }
  65% { opacity: 0.15; }
  80% { opacity: 0.95; }
  100% { opacity: 0; }
}

/* Heavy Impact Manila Folder Slam */
.detective-case-transition.slamming .dossier-folder-container {
  animation: heavyDeskSlam 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards !important;
}

@keyframes heavyDeskSlam {
  0% { transform: translateY(-120px) scale(1.18) rotate(-4deg); opacity: 0; }
  65% { transform: translateY(12px) scale(0.97) rotate(1.5deg); opacity: 1; }
  82% { transform: translateY(-5px) scale(1.02) rotate(-0.5deg); }
  100% { transform: translateY(0) scale(1) rotate(0deg); opacity: 1; }
}

/* Pinned Crime Scene Polaroid */
.dossier-polaroid-pin {
  position: absolute;
  top: -16px;
  right: 28px;
  width: 110px;
  background: #fff;
  padding: 6px 6px 12px 6px;
  border-radius: 2px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.65), 0 2px 6px rgba(0,0,0,0.4);
  transform: rotate(6deg);
  z-index: 8;
  border: 1px solid rgba(0,0,0,0.15);
  animation: polaroidJitter 0.5s ease-out;
}

.brass-paperclip {
  position: absolute;
  top: -10px;
  left: 38px;
  width: 12px;
  height: 24px;
  border: 3px solid #b5943b;
  border-radius: 6px;
  background: transparent;
  box-shadow: 0 2px 4px rgba(0,0,0,0.5);
  z-index: 9;
}

.polaroid-img-clock {
  width: 100%;
  height: 80px;
  background: #191b22 url('assets/clocktower_scene.jpg') center/cover no-repeat;
  border: 1px solid #ddd;
  position: relative;
  filter: contrast(1.2) sepia(0.3);
}

.polaroid-stamp-ref {
  position: absolute;
  bottom: 2px;
  right: 3px;
  font-family: var(--font-mono);
  font-size: 0.55rem;
  font-weight: 900;
  color: #ff3344;
  background: rgba(0,0,0,0.7);
  padding: 1px 3px;
}

.polaroid-caption {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.52rem;
  font-weight: 800;
  color: #333;
  margin-top: 5px;
  text-align: center;
  letter-spacing: 0.5px;
}

/* Red Rubber Stamp Splatter Shockwave */
.stamp-ink-splatter {
  position: absolute;
  top: 52%;
  left: 50%;
  width: 280px;
  height: 120px;
  transform: translate(-50%, -50%) rotate(-11deg) scale(0.6);
  border: 6px solid rgba(181, 26, 32, 0.7);
  border-radius: 12px;
  opacity: 0;
  pointer-events: none;
  z-index: 9;
}

.stamp-ink-splatter.splattered {
  animation: splatterBurst 0.6s ease-out forwards;
}

@keyframes splatterBurst {
  0% { opacity: 0.9; transform: translate(-50%, -50%) rotate(-11deg) scale(0.9); }
  50% { opacity: 0.6; transform: translate(-50%, -50%) rotate(-11deg) scale(1.4); }
  100% { opacity: 0; transform: translate(-50%, -50%) rotate(-11deg) scale(1.8); }
}

/* Police Caution Crime Scene Tape Strip across folder */
.dossier-caution-tape-strip {
  width: calc(100% + 40px);
  margin-left: -20px;
  margin-top: 12px;
  background: #ffcc00;
  color: #000;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 900;
  letter-spacing: 1.5px;
  padding: 5px 12px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.5);
  border-top: 2px dashed #000;
  border-bottom: 2px dashed #000;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}

.dossier-caution-tape-strip.ripped {
  transform: scaleY(0.1) rotate(-3deg);
  opacity: 0;
  filter: blur(4px);
}

/* Violent 3D Dossier Burst Open */
.detective-case-transition.burst-open {
  opacity: 0 !important;
  transform: perspective(900px) rotateX(18deg) scale(1.18) !important;
  filter: blur(10px) brightness(1.5) !important;
  transition: all 0.55s cubic-bezier(0.16, 1, 0.3, 1) !important;
  pointer-events: none !important;
}
`;

loaderCss += '\n' + darkAmbienceAndTransitionCss;
fs.writeFileSync('styles/loader.css', loaderCss, 'utf8');
console.log('3. Updated styles/loader.css with dark ambience & transition animations');


// 4. UPDATE src/main.js: Choreograph dramatic sequence and loading screen audio
let mainJs = fs.readFileSync('src/main.js', 'utf8').replace(/\r\n/g, '\n');

// 4a. Start loading audio on initial user interaction with loading stage
const oldLoadingStageClick = `  // Allow clicking anywhere on loading stage to complete or enter
  loadingStage?.addEventListener('click', (e) => {
    if (!isLoaded) {
      finishLoading();
    } else {
      enterGameStage();
    }
  });`;

const newLoadingStageClick = `  // Start gritty noir ambience on first interaction
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
  });`;

if (mainJs.includes(oldLoadingStageClick)) {
  mainJs = mainJs.replace(oldLoadingStageClick, newLoadingStageClick);
}

// 4b. High-Octane Cinematic Sequence in enterGameStage()
const oldDossierTransitionBlock = `          setTimeout(() => {
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

            } else {`;

const newDossierTransitionBlock = `          setTimeout(() => {
            if (audio.stopLoadingScreenAmbience) audio.stopLoadingScreenAmbience();
            loadingStage.classList.add('loader-stage-warp');

            // Launch High-Octane Noir Detective Case Dossier Transition
            const caseTransition = document.getElementById('detective-case-transition');
            const rubberStamp = document.getElementById('dossier-rubber-stamp');
            const stampSplatter = document.getElementById('stamp-ink-splatter');
            const cameraFlash = document.getElementById('dossier-camera-flash');
            const cautionTape = document.getElementById('dossier-caution-tape');

            if (caseTransition) {
              updateDossierLanguage(state.currentLanguage);
              caseTransition.classList.remove('hidden');
              caseTransition.classList.add('slamming');

              // Violent Desk Slam Impact
              document.body.classList.add('screen-shake-violent');
              if (audio.playDeskSlam) audio.playDeskSlam();
              setTimeout(() => document.body.classList.remove('screen-shake-violent'), 350);

              // 1. Explosive Red Rubber Stamp Impact (at 600ms)
              setTimeout(() => {
                if (rubberStamp) rubberStamp.classList.add('stamped');
                if (stampSplatter) stampSplatter.classList.add('splattered');

                document.body.classList.add('screen-shake-violent');
                if (audio.playDossierStamp) audio.playDossierStamp();
                setTimeout(() => document.body.classList.remove('screen-shake-violent'), 300);

                // 2. Rapid Crime Scene Camera Flashbulb Burst (at 1200ms)
                setTimeout(() => {
                  if (cameraFlash) {
                    cameraFlash.classList.add('flash-burst');
                    setTimeout(() => cameraFlash.classList.remove('flash-burst'), 550);
                  }
                  if (audio.playCameraFlashBurst) audio.playCameraFlashBurst();

                  // 3. Police Caution Tape Rips in Half (at 1700ms)
                  setTimeout(() => {
                    if (cautionTape) cautionTape.classList.add('ripped');
                    if (audio.playTapeTear) audio.playTapeTear();

                    // 4. Dossier Violently Bursts Open into Scene (at 2100ms)
                    setTimeout(() => {
                      caseTransition.classList.add('burst-open');
                      if (audio.playCathedralBell) audio.playCathedralBell();
                      if (audio.playThunderCrack) audio.playThunderCrack();

                      setTimeout(() => {
                        loadingStage.style.display = 'none';
                        caseTransition.classList.add('hidden');
                        caseTransition.classList.remove('slamming', 'burst-open');
                        if (rubberStamp) rubberStamp.classList.remove('stamped');
                        if (stampSplatter) stampSplatter.classList.remove('splattered');
                        if (cautionTape) cautionTape.classList.remove('ripped');

                        if (creatorStage) {
                          creatorStage.classList.remove('hidden');
                        }
                        ui.applyLanguage(state.currentLanguage);
                        initCharacterCreator();
                      }, 550);
                    }, 400);
                  }, 500);
                }, 600);
              }, 600);

            } else {`;

if (mainJs.includes(oldDossierTransitionBlock)) {
  mainJs = mainJs.replace(oldDossierTransitionBlock, newDossierTransitionBlock);
  fs.writeFileSync('src/main.js', mainJs, 'utf8');
  console.log('4. Updated cinematic sequence in src/main.js');
} else {
  console.warn('Could not find oldDossierTransitionBlock in src/main.js');
}

console.log('Done applying dramatic loader & ambience!');
