/* Aenigma Detective Mystery RPG - Universal Standalone Bundle */
(function() {
'use strict';

// --- BEGIN: audio.js ---
// Aenigma Web Audio Engine - Haunting Psychological Noir Horror Soundscape
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.droneGain = null;
    this.hissGain = null;
    this.isInitialized = false;
    this.bellTimer = null;
    this.heartbeatTimer = null;
    this.isHeartbeatActive = false;
    this.lastHoverTime = 0;
  }

  init() {
    if (this.isInitialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.isInitialized = true;
      this.startAmbientDrone();
      this.startCathedralBellScheduler();
    } catch (e) {
      console.warn('AudioContext failed to initialize:', e);
    }
  }

  ensureContext() {
    if (!this.isInitialized) {
      this.init();
    } else if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.droneGain && this.ctx) {
      this.droneGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.12, this.ctx.currentTime, 0.1);
    }
    return this.isMuted;
  }

  // --- HAUNTING GOTHIC NOIR AMBIENT DRONE ---
  startAmbientDrone() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Master Ambient Gain
    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(this.isMuted ? 0 : 0.12, now);
    this.droneGain.connect(this.ctx.destination);

    // 1. Sub-bass abyssal drone (D1 = ~36.7 Hz)
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(36.7, now);

    // 2. Dissonant Tritone (Devil's Interval - G#1 = ~51.9 Hz) - creates psychological dread
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(51.9, now);

    // 3. Detuned beating oscillator
    const osc3 = this.ctx.createOscillator();
    osc3.type = 'triangle';
    osc3.frequency.setValueAtTime(37.2, now);

    // Resonant Dark Filter (Gothic chamber acoustics)
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(110, now);
    filter.Q.setValueAtTime(6.0, now);

    // Slow creepy LFO sweeping the filter (wind through broken clocktower panes)
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.05, now); // 20s cycle
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(50, now);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    osc1.connect(filter);
    osc2.connect(filter);
    osc3.connect(filter);
    filter.connect(this.droneGain);

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);
    lfo.start(now);

    // Rain and Tape Noise Layer
    this.createAtmosphericRainAndHiss();

    // Subtle rhythmic clock ticking inside the ambient
    this.startClockTicking();
  }

  createAtmosphericRainAndHiss() {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 2.8;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // Filter to sound like rain against high clocktower glass
    const rainFilter = this.ctx.createBiquadFilter();
    rainFilter.type = 'bandpass';
    rainFilter.frequency.value = 1200;
    rainFilter.Q.value = 0.8;

    this.hissGain = this.ctx.createGain();
    this.hissGain.gain.value = 0.035;

    noise.connect(rainFilter);
    rainFilter.connect(this.hissGain);
    this.hissGain.connect(this.droneGain);
    noise.start();
  }

  // Creepy clock ticking with room reverb
  startClockTicking() {
    if (!this.ctx) return;
    const tickInterval = 1000; // 1 second tick

    const playTick = () => {
      if (!this.isMuted && this.ctx && this.ctx.state === 'running') {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sine';
        const isTock = Math.random() > 0.5;
        osc.frequency.setValueAtTime(isTock ? 480 : 540, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.025);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(650, now);
        filter.Q.setValueAtTime(4, now);

        gain.gain.setValueAtTime(0.035, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.droneGain);

        osc.start(now);
        osc.stop(now + 0.045);
      }
      setTimeout(playTick, tickInterval);
    };

    setTimeout(playTick, 1500);
  }

  // Periodic distant mournful cathedral bell toll (Saint Irene)
  startCathedralBellScheduler() {
    const scheduleNextBell = () => {
      const delay = 24000 + Math.random() * 16000; // every 24-40 seconds
      this.bellTimer = setTimeout(() => {
        this.playCathedralBell();
        scheduleNextBell();
      }, delay);
    };
    scheduleNextBell();
  }

  playCathedralBell() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;

    // Realistic bell harmonics (fundamental + hum + tierce + quint + nominal)
    const baseFreq = 146.83; // D3
    const ratios = [0.5, 1.0, 1.189, 1.5, 2.0, 2.75];
    const decayTimes = [6.0, 4.5, 3.8, 3.0, 2.2, 1.5];

    ratios.forEach((ratio, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq * ratio, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, now);

      const amp = (0.05 / (idx + 1));
      gain.gain.setValueAtTime(amp, now);
      gain.gain.exponentialRampToValueAtTime(0.00001, now + decayTimes[idx]);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + decayTimes[idx]);
    });
  }

  // Heartbeat sound effect for low Morale or low Health
  setHeartbeatActive(active) {
    if (active && !this.isHeartbeatActive) {
      this.isHeartbeatActive = true;
      this.loopHeartbeat();
    } else if (!active) {
      this.isHeartbeatActive = false;
      if (this.heartbeatTimer) clearTimeout(this.heartbeatTimer);
    }
  }

  loopHeartbeat() {
    if (!this.isHeartbeatActive) return;
    this.playHeartbeatThump();
    this.heartbeatTimer = setTimeout(() => {
      this.loopHeartbeat();
    }, 850);
  }

  playHeartbeatThump() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;

    // Double thump: Lub-dub
    [0, 0.16].forEach((offset, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(idx === 0 ? 55 : 46, now + offset);
      osc.frequency.exponentialRampToValueAtTime(25, now + offset + 0.12);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(100, now + offset);

      gain.gain.setValueAtTime(idx === 0 ? 0.22 : 0.16, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.14);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + offset);
      osc.stop(now + offset + 0.15);
    });
  }

  // --- ITEM USE AUDIO EFFECTS ---
  playCigaretteSmoke() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;

    // Match strike sizzle
    const bufferSize = this.ctx.sampleRate * 0.35;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.08));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2800, now);
    filter.Q.setValueAtTime(1.5, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(now);

    // Warm sigh / exhale tone
    setTimeout(() => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const ogain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, t);
      osc.frequency.exponentialRampToValueAtTime(65, t + 0.8);
      ogain.gain.setValueAtTime(0.06, t);
      ogain.gain.exponentialRampToValueAtTime(0.0001, t + 0.85);
      osc.connect(ogain);
      ogain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.85);
    }, 280);
  }

  playMedicineDrink() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;

    // Glass uncork + swallowing water droplet resonances
    [0, 0.12, 0.26].forEach((delay, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const f = 500 - idx * 70;
      osc.frequency.setValueAtTime(f, now + delay);
      osc.frequency.exponentialRampToValueAtTime(f + 250, now + delay + 0.06);

      gain.gain.setValueAtTime(0.09, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + delay);
      osc.stop(now + delay + 0.09);
    });
  }

  playWatchInspect() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;

    // Metallic latch click followed by rapid brass gear whir
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.05);

    // Rapid gear escapement tick sequence
    for (let i = 0; i < 8; i++) {
      const t = now + 0.07 + (i * 0.035);
      const tosc = this.ctx.createOscillator();
      const tgain = this.ctx.createGain();
      tosc.type = 'sine';
      tosc.frequency.setValueAtTime(1800 + (i % 2) * 400, t);
      tgain.gain.setValueAtTime(0.04, t);
      tgain.gain.exponentialRampToValueAtTime(0.0001, t + 0.02);
      tosc.connect(tgain);
      tgain.connect(this.ctx.destination);
      tosc.start(t);
      tosc.stop(t + 0.025);
    }
  }

  playBookRead() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;

    // Leather book thud & paper rustle
    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(950, now);
    filter.Q.setValueAtTime(0.7, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(now);
  }

  // --- GAME OVER HORROR STINGER ---
  playGameOver() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;

    // Low dreadful horror dissonance cluster
    const cluster = [48.99, 51.91, 55.00, 77.78, 103.8]; // G1, G#1, A1, Eb2, G#2
    cluster.forEach(freq => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.7, now + 2.5);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, now);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 3.0);
    });

    // Reverberating bell strike on death
    setTimeout(() => this.playCathedralBell(), 200);
  }

  // --- GENERAL SFX ---
  playTypewriter() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    const baseFreq = 750 + Math.random() * 450;
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.035);

    filter.type = 'highpass';
    filter.frequency.setValueAtTime(400, now);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.045);
  }

  playDiceRoll() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;
    const bounces = 6 + Math.floor(Math.random() * 4);

    for (let i = 0; i < bounces; i++) {
      const delay = Math.pow(i / bounces, 1.8) * 0.75 + (Math.random() * 0.03);
      const hitTime = now + delay;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(180 + Math.random() * 220, hitTime);
      osc.frequency.exponentialRampToValueAtTime(60, hitTime + 0.04);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, hitTime);

      const amp = (0.09 * (1 - i / bounces)) + 0.02;
      gain.gain.setValueAtTime(amp, hitTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, hitTime + 0.04);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(hitTime);
      osc.stop(hitTime + 0.05);
    }
  }

  playSuccess() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;
    const chord = [261.63, 329.63, 392.00, 523.25]; // C Major

    chord.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);

      gain.gain.setValueAtTime(0.06, now + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.04);
      osc.stop(now + 1.2);
    });
  }

  playFailure() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(32, now + 0.8);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(280, now);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.9);
  }

  playDiscovery() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(330, now);
    osc.frequency.exponentialRampToValueAtTime(660, now + 0.35);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.8);
  }

  playUiClick() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.02);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.03);
  }

  // --- NEW ENHANCED PROCEDURAL AUDIO EFFECTS ---

  // Subtle tactile button hover tick (throttled to avoid buzzing)
  playUiHover() {
    if (this.isMuted || !this.ctx) return;
    const nowMs = Date.now();
    if (nowMs - this.lastHoverTime < 50) return;
    this.lastHoverTime = nowMs;

    this.ensureContext();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.012);

    gain.gain.setValueAtTime(0.018, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.016);
  }

  // POI Radar Marker Hover - resonant sonar harmonic ping
  playPoiHover() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(1040, now + 0.09);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(900, now);
    filter.Q.setValueAtTime(3.5, now);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  // POI Inspection Click - mechanical brass aperture click + chime
  playPoiClick() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;

    // Metallic shutter click
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(900, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.03);
    gain.gain.setValueAtTime(0.09, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.04);

    // Ethereal revelation chime
    [587.33, 880.00].forEach((freq, idx) => {
      const cOsc = this.ctx.createOscillator();
      const cGain = this.ctx.createGain();
      cOsc.type = 'sine';
      cOsc.frequency.setValueAtTime(freq, now + 0.04 + idx * 0.03);
      cGain.gain.setValueAtTime(0.05, now + 0.04 + idx * 0.03);
      cGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5 + idx * 0.05);
      cOsc.connect(cGain);
      cGain.connect(this.ctx.destination);
      cOsc.start(now + 0.04 + idx * 0.03);
      cOsc.stop(now + 0.55);
    });
  }

  // Supernatural Inner Voice Intrusive Whisper Drone
  playInnerVoice() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;

    // Creepy resonant harmonic pair with slow beat
    [220, 222.5, 440].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = idx === 2 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(450, now);
      filter.Q.setValueAtTime(4.0, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.04, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.15);
    });
  }

  // Smooth Dossier / Tab Switch Sound (Paper & Leather Folder)
  playTabSwitch() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;

    const bufferSize = this.ctx.sampleRate * 0.15;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(400, now + 0.12);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.09, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(now);
  }

  // Thought Cabinet Node Select (Neural Synapse Sparkle)
  playThoughtNode() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(1760, now + 0.15);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.32);
  }

  // Thought Internalization Completed (Ethereal Mental Crystallization Swell)
  playThoughtInternalize() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;

    const arpeggio = [329.63, 440.00, 554.37, 659.25, 880.00]; // E Maj / F#m ethereal
    arpeggio.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.045, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + 1.45);
    });
  }

  // Visceral Damage Impact (Taking Physical HP Damage)
  playDamageHit() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;

    // Low visceral punch
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.25);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, now);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.32);
  }

  // Psychological Morale Drain (Tinnitus Ringing + Low Rumble)
  playMoraleDrain() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;

    // Piercing high-pitch tinnitus whistle
    const oscHigh = this.ctx.createOscillator();
    const gainHigh = this.ctx.createGain();
    oscHigh.type = 'sine';
    oscHigh.frequency.setValueAtTime(3800, now);
    oscHigh.frequency.exponentialRampToValueAtTime(4200, now + 0.6);

    gainHigh.gain.setValueAtTime(0.04, now);
    gainHigh.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

    oscHigh.connect(gainHigh);
    gainHigh.connect(this.ctx.destination);
    oscHigh.start(now);
    oscHigh.stop(now + 0.85);

    // Dissonant descending wobble
    const oscLow = this.ctx.createOscillator();
    const gainLow = this.ctx.createGain();
    oscLow.type = 'triangle';
    oscLow.frequency.setValueAtTime(180, now);
    oscLow.frequency.exponentialRampToValueAtTime(65, now + 0.7);

    gainLow.gain.setValueAtTime(0.1, now);
    gainLow.gain.exponentialRampToValueAtTime(0.0001, now + 0.75);

    oscLow.connect(gainLow);
    gainLow.connect(this.ctx.destination);
    oscLow.start(now);
    oscLow.stop(now + 0.8);
  }

  // HUD Collapse / Expand Latch Sound
  playHudToggle() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(750, now + 0.04);
    osc.frequency.exponentialRampToValueAtTime(250, now + 0.08);

    gain.gain.setValueAtTime(0.07, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.11);
  }

  // Radio Frequency Sweep (Language Change)
  playRadioTune() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;

    // Heterodyne whistle tuning sweep
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(1600, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(950, now + 0.18);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  // Atmospheric Distant Thunder Crack & Rolling Rumble
  playThunderCrack() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;

    // Filtered noise buffer for sudden crack + prolonged sub-bass roll
    const bufferSize = Math.floor(this.ctx.sampleRate * 2.2);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const progress = i / bufferSize;
      const decay = Math.exp(-progress * 3.5);
      output[i] = (Math.random() * 2 - 1) * decay;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, now);
    filter.frequency.exponentialRampToValueAtTime(70, now + 2.0);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(now);

    // Deep sub rumble layer
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(55, now);
    osc.frequency.exponentialRampToValueAtTime(28, now + 1.8);
    oscGain.gain.setValueAtTime(0.15, now);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);
    osc.connect(oscGain);
    oscGain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 2.1);
  }

  // Heavy Detective Boots on Wet Wooden Floorboard
  playFootsteps() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;

    // Two rapid heel-toe thuds
    [0, 0.22].forEach((offset, idx) => {
      const t = now + offset;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(idx === 0 ? 95 : 80, t);
      osc.frequency.exponentialRampToValueAtTime(35, t + 0.12);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(250, t);

      gain.gain.setValueAtTime(idx === 0 ? 0.08 : 0.05, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.15);
    });
  }

  // Official Forensic Dossier Evidence Seal Stamp
  playDossierStamp() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;

    // Wooden handle press + ink squelch + paper thud
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.18);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.22);

    // Ink slap noise
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.06);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const nGain = this.ctx.createGain();
    nGain.gain.setValueAtTime(0.09, now);
    nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    noise.connect(nGain);
    nGain.connect(this.ctx.destination);
    noise.start(now);
  }

  // Giant Pendulum Escapement Clockwork Tick & Resonance
  playClockworkChime() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;

    // Heavy brass gear ratchet click
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(780, now);
    osc.frequency.exponentialRampToValueAtTime(130, now + 0.08);

    gain.gain.setValueAtTime(0.09, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.16);

    // Metallic chime resonance ring
    const chime = this.ctx.createOscillator();
    const chimeGain = this.ctx.createGain();
    chime.type = 'sine';
    chime.frequency.setValueAtTime(1174.66, now); // D6 bell harmonic
    chimeGain.gain.setValueAtTime(0.04, now);
    chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);
    chime.connect(chimeGain);
    chimeGain.connect(this.ctx.destination);
    chime.start(now);
    chime.stop(now + 0.95);
  }

  // Forensic Chalk Scratch on Crime Scene Floorboards
  playChalkScratch() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;

    const bufferSize = Math.floor(this.ctx.sampleRate * 0.18);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2200, now);
    filter.frequency.linearRampToValueAtTime(1600, now + 0.16);
    filter.Q.setValueAtTime(2.8, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(now);
  }

  // Grand Case Closed Victory Fanfare (Melancholic Brass & Bells)
  playVictoryChime() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;

    // Grand triumphal minor-major progression
    const notes = [
      { f: 220.00, t: 0 },    // A3
      { f: 277.18, t: 0.25 }, // C#4
      { f: 329.63, t: 0.5 },  // E4
      { f: 440.00, t: 0.75 }, // A4
      { f: 554.37, t: 1.1 }   // C#5
    ];

    notes.forEach(n => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, now + n.t);

      gain.gain.setValueAtTime(0.08, now + n.t);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + n.t + 2.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + n.t);
      osc.stop(now + n.t + 2.3);
    });

    // Ringing cathedral bell
    setTimeout(() => this.playCathedralBell(), 600);
  }
}

const audio = new SoundEngine();

// --- END: audio.js ---

// --- BEGIN: dialogue_i18n.js ---
// Aenigma Complete 12-Language Story & Clue Localizations
// Fully covers all 38 Dialogue Nodes, 13 Case Clues, and Crime Scene POIs
// Supported Languages: en, id, zh, ja, ko, es, fr, de, ru, it, pt, ar

const DIALOGUE_I18N_FULL = {
  "graves_dialogue_start": {
    "speaker": {
      "en": "Inspector Graves",
      "id": "Inspektur Graves",
      "zh": "格雷夫斯警探",
      "ja": "グレイヴス警部",
      "ko": "그레이브스 형사",
      "es": "Inspector Graves",
      "fr": "Inspecteur Graves",
      "de": "Inspektor Graves",
      "ru": "Инспектор Грейвс",
      "it": "Ispettore Graves",
      "pt": "Inspetor Graves",
      "ar": "المفتش غريفز"
    },
    "text": {
      "en": "You finally dragged yourself up six flights of stairs, Detective. You reek like you slept in an open sewer behind the Whirling Gull. Take a look at this mess. The city magistrate is already screaming on the wire.",
      "id": "Kamu akhirnya berhasil menyeret dirimu menaiki enam lantai tangga, Detektif. Baumu seperti tidur di saluran pembuangan Whirling Gull. Lihat kekacauan ini. Hakim kota sudah berteriak histeris di telepon.",
      "zh": "你终于拖着沉重的身子爬上这六层阶梯了，探长。你身上的恶臭简直就像在回旋鸥后巷的阴沟里宿醉了一整夜。瞧瞧眼前的烂摊子，市政法官已经在警线那头咆哮了。",
      "ja": "ようやく6階分の階段を這い上がってきたか、刑事。ワーリング・ガル裏の側溝で寝ていたかのような酷い臭いだ。この惨状を見ろ。治安判事はすでに電話口で怒鳴り散らしているぞ。",
      "ko": "결국 6층 계단을 기어 올라오셨군, 형사님. 회전하는 갈매기 여관 뒷골목 하수구에서 밤을 지새운 것 같은 악취가 진동하오. 이 꼴을 좀 보시오. 시 치안판사가 벌써 전선 너머로 고래고래 소리를 지르고 있소.",
      "es": "Por fin te arrastraste seis tramos de escaleras, detective. Apestas como si hubieras dormido en una cloaca tras la Gaviota Giratoria. Mira este desastre. El magistrado ya está gritando por la línea.",
      "fr": "Vous avez enfin daigné gravir les six étages, Inspecteur. Vous empestez comme si vous aviez cuvé dans un égout derrière la Mouette Rieuse. Regardez ce carnage. Le magistrat hurle déjà au bout du fil.",
      "de": "Sie haben sich endlich sechs Stockwerke hochgeschleppt, Detective. Sie stinken, als hätten Sie in der Gosse hinter der Taumelnden Möwe geschlafen. Sehen Sie sich das an. Der Magistrat tobt bereits am Fernsprecher.",
      "ru": "Наконец-то ты приволокся на шестой этаж, детектив. От тебя разит так, словно ты ночевал в сточной канаве за «Кружащейся чайкой». Взгляни на этот хаос. Магистрат уже разрывает телефонную линию криками.",
      "it": "Ti sei finalmente trascinato su per sei rampe di scale, detective. Puzzi come se avessi dormito nelle fogne dietro il Gabbiano Volteggiante. Guarda che disastro. Il magistrato urla già all'apparecchio.",
      "pt": "Você finalmente se arrastou seis lances de escada, detetive. Você fede como se tivesse dormido num esgoto atrás do Gaivota Giratória. Olhe para este desastre. O magistrado já está berrando na linha.",
      "ar": "لقد سحبت نفسك أخيرًا عبر ستة طوابق من السلالم يا حضرة المحقق. تفوح منك رائحة وكأنك نمت في مجاري الحانة الخلفية. انظر إلى هذه الفوضى، قاضي المدينة يصرخ بهستيريا على الخط بالفعل."
    },
    "voices": [
      {
        "voice": {
          "en": "Ratio",
          "id": "Rasio",
          "zh": "理性",
          "ja": "比率",
          "ko": "이성",
          "es": "Razón",
          "fr": "Ratio",
          "de": "Ratio",
          "ru": "Рацио",
          "it": "Ragione",
          "pt": "Razão",
          "ar": "العقلانية"
        },
        "badge": {
          "en": "RATIO [Intellect]",
          "id": "RASIO [Intelek]",
          "zh": "理性 [智力]",
          "ja": "比率 [知性]",
          "ko": "이성 [지성]",
          "es": "RAZÓN [Intelecto]",
          "fr": "RATIO [Intellect]",
          "de": "RATIO [Intellekt]",
          "ru": "РАЦИО [Интеллект]",
          "it": "RAGIONE [Intelletto]",
          "pt": "RAZÃO [Intelecto]",
          "ar": "العقلانية [الفكر]"
        },
        "text": {
          "en": "Look at his collar. There's dried tobacco ash on his lapel, but his eyes are darting toward the widow. He's nervous. He wants this closed as an accident before dawn.",
          "id": "Perhatikan kerah bajunya. Ada abu tembakau kering di lapelnya, tapi matanya terus melirik ke arah sang janda. Dia gelisah. Dia ingin kasus ini ditutup sebagai kecelakaan sebelum fajar.",
          "zh": "看他的领口。驳领上沾着风干的烟灰，但他的眼神却频频瞥向那位遗孀。他在心虚。他迫不及待想在黎明前将此案草草定性为意外事故。",
          "ja": "彼の襟元を見ろ。乾いた煙草の灰が付着しているが、その視線は未亡人へと泳いでいる。動揺しているのだ。夜明け前に事故として処理したがっている。",
          "ko": "깃을 보십시오. 옷깃에 마른 담뱃재가 묻어 있지만, 그의 눈은 미망인을 향해 바쁘게 흔들립니다. 초조한 겁니다. 동이 트기 전에 단순 사고로 종결짓고 싶어 합니다.",
          "es": "Mira su cuello. Hay ceniza de tabaco en su solapa, pero sus ojos se desvían hacia la viuda. Está nervioso. Quiere cerrar esto como un accidente antes del amanecer.",
          "fr": "Regardez son col. Des cendres froides sur son revers, mais ses yeux fuient vers la veuve. Il est fébrile. Il veut clore l'affaire en accident avant l'aube.",
          "de": "Sehen Sie sich seinen Kragen an. Asche auf dem Revers, doch sein Blick huscht zur Witwe. Er ist nervös. Er will den Fall vor Sonnenaufgang als Unfall abstempeln.",
          "ru": "Посмотри на его воротник. На лацкане осыпался пепел, но его глаза то и дело косятся на вдову. Он нервничает. Хочет закрыть дело как несчастный случай до рассвета.",
          "it": "Guarda il suo colletto. C'è cenere secca sul risvolto, ma i suoi occhi saettano verso la vedova. È nervoso. Vuole archiviare tutto come incidente prima dell'alba.",
          "pt": "Olhe para o colarinho dele. Há cinzas secas na lapela, mas os olhos dele disparam em direção à viúva. Ele está nervoso. Quer encerrar isso como acidente antes da aurora.",
          "ar": "انظر إلى ياقته. هناك رماد تبغ جاف على صدر سترته، لكن عينيه ترمقان الأرملة في توتر. إنه قلق ويريد إغلاق القضية كحادث عرضي قبل بزوغ الفجر."
        }
      }
    ],
    "options": [
      {
        "id": "\"Bagaimana penilaian awalmu, Graves?\"",
        "en": "\"What is your preliminary assessment, Graves?\"",
        "zh": "“格雷夫斯，你的初步现场判断是什么？”",
        "ja": "「グレイヴス、お前の予備的な見立てはどうなんだ？」",
        "ko": "\"그레이브스, 자네의 예비 소견은 어떤가?\"",
        "es": "\"¿Cuál es tu evaluación preliminar, Graves?\"",
        "fr": "\"Quelle est votre conclusion préliminaire, Graves ?\"",
        "de": "\"Was ist Ihre vorläufige Einschätzung, Graves?\"",
        "ru": "«Какова твоя предварительная оценка, Грейвс?»",
        "it": "\"Qual è la tua valutazione preliminare, Graves?\"",
        "pt": "\"Qual é a sua avaliação preliminar, Graves?\"",
        "ar": "\"ما هو تقييمك الأولي يا غريفز؟\""
      },
      {
        "id": "[RETORIKA - Sedang 10] \"Terburu-buru sekali kamu menutup laporan ini, Graves. Siapa yang menghubungimu duluan?\"",
        "en": "[RHETORIC - Medium 10] \"You seem in an awful hurry to file this report, Graves. Who called you first?\"",
        "zh": "[修辞 - 难度10] “你似乎急不可耐地想结案归档啊，格雷夫斯。今晚到底是谁第一个给你通的信？”",
        "ja": "[修辞学 - 難易度10] 「ひどく急いで報告書をまとめようとしているな、グレイヴス。最初に呼んだのは誰だ？」",
        "ko": "[수사학 - 보통 10] \"보고서를 서둘러 넘기려는 기색이 역력하군, 그레이브스. 누가 자넬 먼저 불렀지?\"",
        "es": "[RETÓRICA - Media 10] \"Pareces tener demasiada prisa por cerrar este informe, Graves. ¿Quién te llamó primero?\"",
        "fr": "[RHÉTORIQUE - Moyen 10] \"Vous semblez bien pressé de classer ce dossier, Graves. Qui vous a contacté en premier ?\"",
        "de": "[RHETORIK - Mittel 10] \"Sie haben es verdammt eilig mit dem Bericht, Graves. Wer hat Sie zuerst gerufen?\"",
        "ru": "[РИТОРИКА - Сложность 10] «Ты подозрительно спешишь составить рапорт, Грейвс. Кто вызвал тебя первым?»",
        "it": "[RETORICA - Medio 10] \"Sembri avere una fretta dannata di chiudere il rapporto, Graves. Chi ti ha chiamato per primo?\"",
        "pt": "[RETÓRICA - Média 10] \"Você parece ter muita pressa para arquivar este relatório, Graves. Quem te chamou primeiro?\"",
        "ar": "[البلاغة - متوسط 10] \"تبدو في عجلة مريبة لتقييد هذا التقرير يا غريفز. من الذي اتصل بك أولاً؟\""
      },
      {
        "id": "\"Aku tahu tentang hadiah buronan Sindikat, Graves. Katakan di mana buku besar itu.\"",
        "en": "\"I know about the Grand Syndicate bounty, Graves. Tell me where that ledger is.\"",
        "zh": "“我知道大辛迪加悬赏那本账册的事了，格雷夫斯。把它的藏匿处告诉我。”",
        "ja": "「大シンジケートの懸賞金のことは知っているぞ、グレイヴス。帳簿がどこにあるか言え。」",
        "ko": "\"거대 신디케이트의 현상금에 대해 알고 있네, 그레이브스. 그 장부가 어디 있는지 말하게.\"",
        "es": "\"Sé lo de la recompensa del Gran Sindicato, Graves. Dime dónde está ese libro mayor.\"",
        "fr": "\"Je suis au courant pour la prime du Grand Syndicat, Graves. Dites-moi où est ce registre.\"",
        "de": "\"Ich weiß von dem Kopfgeld des Großen Syndikats, Graves. Wo ist dieses Hauptbuch?\"",
        "ru": "«Я знаю о награде Гранд-Синдиката, Грейвс. Говори, где этот гроссбух.»",
        "it": "\"So della taglia del Grande Sindacato, Graves. Dimmi dov'è quel registro.\"",
        "pt": "\"Eu sei sobre a recompensa do Grande Sindicato, Graves. Diga-me onde está o livro-razão.\"",
        "ar": "\"أعرف بشأن مكافأة نقابة الجريمة يا غريفز. أخبرني أين يقع ذلك السجل المحاسبي.\""
      },
      {
        "id": "\"Aku butuh sebatang rokok sebelum sinapsis sarafku benar-benar putus.\"",
        "en": "\"I need a cigarette before my synapses completely disconnect.\"",
        "zh": "“在我脑神经彻底短路前，我需要来根烟提神。”",
        "ja": "「シナプスが完全に焼き切れる前に、煙草を一本くれ。」",
        "ko": "\"신경 시냅스가 완전히 끊기기 전에 담배 한 대 피워야겠군.\"",
        "es": "\"Necesito un cigarrillo antes de que mis sinapsis se desconecten del todo.\"",
        "fr": "\"J'ai besoin d'une cigarette avant que mes synapses ne lâchent prise.\"",
        "de": "\"Ich brauche eine Zigarette, bevor meine Synapsen vollends versagen.\"",
        "ru": "«Мне нужна сигарета, пока мои синапсы окончательно не отключились.»",
        "it": "\"Ho bisogno di una sigaretta prima che le mie sinapsi si scolleghino.\"",
        "pt": "\"Preciso de um cigarro antes que minhas sinapses pifem de vez.\"",
        "ar": "\"أحتاج إلى سيجارة قبل أن تنقطع نقاط تشابكي العصبي تمامًا.\""
      },
      {
        "id": "[Tinggalkan percakapan dengan Graves]",
        "en": "[Step away from Inspector Graves]",
        "zh": "[暂别格雷夫斯警探]",
        "ja": "[グレイヴス警部との会話を終える]",
        "ko": "[그레이브스 형사와의 대화를 마치고 물러난다]",
        "es": "[Alejarse del inspector Graves]",
        "fr": "[Mettre fin à l'échange avec Graves]",
        "de": "[Das Gespräch mit Graves beenden]",
        "ru": "[Закончить разговор с инспектором Грейвсом]",
        "it": "[Allontanati dall'ispettore Graves]",
        "pt": "[Afastar-se do inspetor Graves]",
        "ar": "[الابتعاد عن المفتش غريفز]"
      }
    ]
  },
  "graves_assessment": {
    "speaker": {
      "en": "Inspector Graves",
      "id": "Inspektur Graves",
      "zh": "格雷夫斯警探",
      "ja": "グレイヴス警部",
      "ko": "그레이브스 형사",
      "es": "Inspector Graves",
      "fr": "Inspecteur Graves",
      "de": "Inspektor Graves",
      "ru": "Инспектор Грейвс",
      "it": "Ispettore Graves",
      "pt": "Inspetor Graves",
      "ar": "المفتش غريفز"
    },
    "text": {
      "en": "Old Aurelia was up here tinkering with the escapement at three in the morning. She slipped on machine grease, grabbed the pendulum to catch herself, and the counterweight drove through her ribs. Gruesome, but an industrial accident. Case closed, we go home and dry our boots.",
      "id": "Aurelia tua sedang mengotak-atik roda escapement pukul tiga pagi. Dia terpeleset minyak pelumas mesin, meraih pendulum untuk menahan diri, dan beban penyeimbang menembus tulang rusuknya. Mengerikan, tapi murni kecelakaan kerja. Kasus ditutup, kita bisa pulang dan mengeringkan sepatu kita.",
      "zh": "老奥蕾莉亚凌晨三点在上头摆弄擒纵轮。她踩到机械润滑机油滑倒，想伸手抓住摆锤稳住重心，结果铸铁配重块直接贯穿了她的肋骨。虽然惨绝人寰，但纯粹是工伤意外。结案收工，大家回去烤干湿透的皮靴。",
      "ja": "老オレリアは午前3時にここで脱進機をいじっていた。機械油に足を滑らせ、体勢を立て直そうと振り子を掴んだが、重いカウンターウェイトが肋骨を貫通した。陰惨だが、単なる労働災害だ。事件終了、長靴を乾かしに帰るぞ。",
      "ko": "늙은 오렐리아는 새벽 3시에 여기서 탈진기를 손보고 있었소. 기계 기름에 발이 미끄러져 몸을 지탱하려 진자를 붙잡았는데, 평형추가 갈비뼈를 그대로 꿰뚫어 버렸지. 끔찍하지만 명백한 산업재해 사고라오. 수사 종결짓고 마른 신발이나 갈아 신으러 갑시다.",
      "es": "La vieja Aurelia estaba trasteando con el escape a las tres de la mañana. Resbaló con grasa de máquina, se agarró al péndulo y el contrapeso le atravesó las costillas. Espantoso, pero un accidente laboral. Caso cerrado, nos vamos a casa a secar las botas.",
      "fr": "La vieille Aurelia bricolait l'échappement à trois heures du matin. Elle a glissé sur de la graisse, s'est raccrochée au balancier, et le contrepoids lui a transpercé les côtes. Sinistre, mais un bête accident de travail. Affaire classée, on rentre sécher nos godasses.",
      "de": "Die alte Aurelia werkelte um drei Uhr morgens an der Hemmung herum. Sie rutschte auf Maschinenfett aus, klammerte sich ans Pendel und das Gegengewicht bohrte sich durch ihre Rippen. Schrecklich, aber ein Betriebsunfall. Fall gelöst, wir gehen heim.",
      "ru": "Старуха Аурелия возилась здесь со спусковым механизмом в три часа ночи. Поскользнулась на машинном масле, схватилась за маятник, и противовес пробил ей грудь. Жутко, но это производственная травма. Дело закрыто, пора сушить сапоги.",
      "it": "La vecchia Aurelia armeggiava con lo scappamento alle tre del mattino. È scivolata sull'olio, si è aggrappata al pendolo e il contrappeso le ha trafitto le costole. Macabro, ma un banale incidente sul lavoro. Caso chiuso, andiamo ad asciugarci gli stivali.",
      "pt": "A velha Aurelia estava mexendo no escape às três da manhã. Escorregou na graxa, agarrou o pêndulo e o contrapeso perfurou suas costelas. Hediondo, mas um acidente de trabalho. Caso encerrado, vamos para casa secar as botas.",
      "ar": "كانت العجوز أوريليا تعبث بترس الميزان في الثالثة فجرًا. انزلقت في شحم الماكينات وحاولت التشبث بالبندول فخرق ثقل الموازنة أضلاعها. حادث شنيع لكنه عرضي بحت. القضية أغلقت، فلنعد لنجفف أحذيتنا."
    },
    "voices": [
      {
        "voice": {
          "en": "Carnal",
          "id": "Insting Karnal",
          "zh": "肉体本能",
          "ja": "肉体本能",
          "ko": "육체 본능",
          "es": "Instinto Carnal",
          "fr": "Carnal",
          "de": "Körperinstinkt",
          "ru": "Карнал",
          "it": "Istinto Carnale",
          "pt": "Instinto Carnal",
          "ar": "الغريزة الجسدية"
        },
        "badge": {
          "en": "CARNAL [Physique]",
          "id": "KARNAL [Fisik]",
          "zh": "肉体本能 [体魄]",
          "ja": "肉体 [肉体]",
          "ko": "육체 [체력]",
          "es": "CARNAL [Físico]",
          "fr": "CARNAL [Physique]",
          "de": "KARNAL [Physis]",
          "ru": "КАРНАЛ [Физика]",
          "it": "CARNALE [Fisico]",
          "pt": "CARNAL [Físico]",
          "ar": "الجسدية [القوة]"
        },
        "text": {
          "en": "Lies. A woman who slips forward doesn't land impaled through the back of her shoulder blades with her hands neatly folded. Someone held her down while the heavy iron arm descended.",
          "id": "Bohong. Seseorang yang terpeleset ke depan tidak akan tertusuk dari belakang belikat dengan tangan terlipat rapi. Seseorang menahannya saat lengan besi raksasa itu menghujam ke bawah.",
          "zh": "一派胡言。前倾滑倒的人绝不可能肩胛骨正后方被重物洞穿，双手还整整齐齐地叠放在胸前。在重锤落下前，一定有人将她死死按在地上。",
          "ja": "嘘だ。前方に足を滑らせた人間が、両手を整然と揃えたまま肩甲骨の後ろから串刺しになるはずがない。何者かが彼女を押さえつけ、鉄の腕を振り下ろさせたのだ。",
          "ko": "거짓말입니다. 앞으로 넘어진 사람이 두 손을 단정히 모은 채 등 뒤 견갑골을 관통당할 수는 없습니다. 무거운 쇳덩이가 내려앉는 동안 누군가 그녀를 짓누르고 있었던 겁니다.",
          "es": "Mentiras. Alguien que resbala hacia adelante no acaba empalada por la espalda con las manos ordenadamente dobladas. Alguien la inmovilizó mientras bajaba el brazo de hierro.",
          "fr": "Mensonges. Une personne qui glisse en avant ne finit pas empalée par les omoplates avec les mains bien jointes. Quelqu'un l'a maintenue pendant que le lourd balancier s'abattait.",
          "de": "Lügen. Wer nach vorn stürzt, wird nicht von hinten durch die Schulterblätter aufgespießt, während die Hände gefaltet sind. Jemand hielt sie nieder, als der Eisenarm herabsank.",
          "ru": "Ложь. Человек, упавший вперед, не может оказаться пробитым через спину с аккуратно сложенными руками. Кто-то удерживал ее, пока опускался тяжелый стальной рычаг.",
          "it": "Menzogne. Chi scivola in avanti non finisce trafitto dietro le scapole con le mani composte. Qualcuno l'ha tenuta ferma mentre il braccio d'acciaio scendeva.",
          "pt": "Mentiras. Alguém que escorrega para frente não acaba empalada pelas costas com as mãos dobradas. Alguém a segurou enquanto o pesado braço de ferro descia.",
          "ar": "هذا كذب صريح. من يسقط إلى الأمام لا يُطعن عبر عظام الكتف من الخلف بيدين مطويتين بعناية. شخص ما ثبّتها بإحكام أثناء هبوط الذراع الحديدي الثقيل."
        }
      }
    ],
    "options": [
      {
        "en": "\"Accident? Look at the wound entry angle. That is biomechanically impossible.\"",
        "id": "\"Kecelakaan? Lihat sudut masuk lukanya. Secara biomekanik itu mustahil.\"",
        "zh": "“意外？看清楚创口刺入的倾角，这在生物力学上绝不可能。”",
        "ja": "「事故だと？創傷の進入角度を見ろ。生体力学的にあり得ない。」",
        "ko": "\"사고라고? 상처의 진입 각도를 보시오. 생체역학적으로 불가능하오.\"",
        "es": "\"¿Accidente? Mira el ángulo de entrada. Es biomecánicamente imposible.\"",
        "fr": "\"Un accident ? Regardez l'angle d'impact. C'est biomécaniquement impossible.\"",
        "de": "\"Ein Unfall? Schauen Sie sich den Eintrittswinkel an. Das ist biomechanisch unmöglich.\"",
        "ru": "«Несчастный случай? Посмотри на угол раны. Это биомеханически невозможно.»",
        "it": "\"Incidente? Guarda l'angolo di penetrazione. È biomeccanicamente impossibile.\"",
        "pt": "\"Acidente? Olhe o ângulo de entrada da ferida. Isso é biomecanicamente impossível.\"",
        "ar": "\"حادث؟ انظر لزاوية دخول الجرح، هذا مستحيل بيوميكانيكيًا.\""
      },
      {
        "en": "\"Who was the last person to see her alive?\"",
        "id": "\"Siapa orang terakhir yang melihatnya hidup?\"",
        "zh": "“今晚生前最后一个见到她的人是谁？”",
        "ja": "「彼女が生きていたのを最後に見たのは誰だ？」",
        "ko": "\"그녀가 살아있을 때 마지막으로 본 사람은 누구요?\"",
        "es": "\"¿Quién fue la última persona en verla con vida?\"",
        "fr": "\"Qui est la dernière personne à l'avoir vue vivante ?\"",
        "de": "\"Wer hat sie zuletzt lebend gesehen?\"",
        "ru": "«Кто видел ее живой последним?»",
        "it": "\"Chi è stata l'ultima persona a vederla viva?\"",
        "pt": "\"Quem foi a última pessoa a vê-la viva?\"",
        "ar": "\"من كان آخر شخص رآها على قيد الحياة؟\""
      },
      {
        "en": "[Return to main inquiry with Graves]",
        "id": "[Kembali ke penyelidikan utama bersama Graves]",
        "zh": "[返回向格雷夫斯的主线盘问]",
        "ja": "[グレイヴスとの主捜査へ戻る]",
        "ko": "[그레이브스와의 기본 심문으로 복귀]",
        "es": "[Volver a la indagación principal]",
        "fr": "[Revenir à l'interrogatoire principal]",
        "de": "[Zurück zur Hauptbefragung]",
        "ru": "[Вернуться к основному опросу Грейвса]",
        "it": "[Torna all'indagine principale]",
        "pt": "[Voltar à inquirição principal]",
        "ar": "[العودة إلى الاستجواب الرئيسي مع غريفز]"
      }
    ]
  },
  "graves_rhetoric_win": {
    "speaker": {
      "en": "Inspector Graves",
      "id": "Inspektur Graves",
      "zh": "格雷夫斯警探",
      "ja": "グレイヴス警部",
      "ko": "그레이브스 형사",
      "es": "Inspector Graves",
      "fr": "Inspecteur Graves",
      "de": "Inspektor Graves",
      "ru": "Инспектор Грейвс",
      "it": "Ispettore Graves",
      "pt": "Inspetor Graves",
      "ar": "المفتش غريفز"
    },
    "text": {
      "en": "Graves flinches, his jaw tightening around the matchstick. 'Lower your damn voice! A courier from the Grand Syndicate arrived at my flat at 02:00. He said Vance had stolen a prototype clockwork ledger. If we recover that ledger, there is a ten-thousand guilder bounty for both of us.'",
      "id": "Graves tersentak, rahangnya mengetat di sekitar batang korek api. 'Kecilkan suaramu! Kurir dari Sindikat Agung datang ke flatku pukul 02:00. Katanya Vance mencuri prototipe buku besar alkimia. Jika kita mengamankannya, ada hadiah sepuluh ribu guilder untuk kita berdua.'",
      "zh": "格雷夫斯神色一紧，下颌死死咬住火柴棒。“把声音给我压低点！联合大辛迪加的信使凌晨两点砸开了我公寓的门。他说梵斯偷走了一份机械原型秘密账簿。只要把账簿搞到手，咱俩能平分一万基尔德的巨额赏金！”",
      "ja": "グレイヴスは顔を強張らせ、マッチの軸を強く噛みしめた。「声を落とせ！午前2時、大シンジケートの密使が俺の部屋に来たんだ。ヴァンスが試作時計の帳簿を盗み出したとさ。回収すれば、俺たち二人に1万ギルダーの報奨金が出る。」",
      "ko": "그레이브스가 흠칫하며 성냥개비를 어금니로 꽉 뭅니다. '목소리 낮춰! 새벽 2시에 거대 신디케이트의 배달원이 내 셋방을 찾아왔소. 밴스가 프로토타입 태엽 장부책을 훔쳐 달아났다고 하더군. 그걸 회수하면 우리 둘 몫으로 1만 길더의 현상금이 떨어지오.'",
      "es": "Graves se estremece y aprieta la mandíbula sobre la cerilla. '¡Baja la maldita voz! Un emisario del Gran Sindicato llegó a mi piso a las 02:00. Dijo que Vance había robado un libro de contabilidad alquímico. Hay una recompensa de diez mil florines para los dos si lo recuperamos.'",
      "fr": "Graves tressaille, la mâchoire crispée sur son allumette. 'Baissez d'un ton ! Un coursier du Grand Syndicat a débarqué chez moi à deux heures. Il prétendait que Vance avait dérobé un registre d'horlogerie secret. Il y a dix mille florins de prime à la clé pour nous deux.'",
      "de": "Graves zuckt zusammen und verbeißt sich ins Streichholz. 'Leiser, verdammt! Um zwei Uhr nachts stand ein Kurier des Großen Syndikats vor meiner Tür. Vance hätte ein alchemistisches Prototyp-Buch gestohlen. Zehntausend Gulden Belohnung für uns beide, wenn wir es beschaffen.'",
      "ru": "Грейвс вздрагивает, стиснув спичку зубами. «Убавь голос! В два часа ночи ко мне на квартиру приперся курьер из Великого Синдиката. Сказал, Вэнс украла гроссбух с чертежами прототипа. Если найдем его — получим десять тысяч гульденов на двоих.»",
      "it": "Graves sussulta, serrando la mascella attorno allo zolfanello. 'Abbassa quella dannata voce! Un corriere del Grande Sindacato è venuto a casa mia alle due. Diceva che la Vance aveva rubato un mastro segreto. C'è una taglia di diecimila fiorini per entrambi se lo recuperiamo.'",
      "pt": "Graves estremece, travando a mandíbula no fósforo. 'Abaixe a voz! Um mensageiro do Grande Sindicato bateu na minha porta às duas da manhã. Disse que Vance roubou um livro-razão protótipo. Há uma recompensa de dez mil florins para nós dois se o recuperarmos.'",
      "ar": "يرتجف غريفز ويطبق فكيه على عود الثقاب: 'اخفض صوتك اللعين! جاءني مبعوث من النقابة الكبرى في شقتي عند الثانية فجرًا، وقال إن فانس سرقت دفتر الحسابات الخيميائي السري. إذا استعدناه، فهناك مكافأة عشرة آلاف خيلدر نتقاسمها سوية.'"
    },
    "options": [
      {
        "en": "\"So this was never about an accident. Where is the ledger now?\"",
        "id": "\"Jadi ini bukan soal kecelakaan. Di mana buku besar itu sekarang?\"",
        "zh": "“所以这根本不是什么意外。账簿现在藏在何处？”",
        "ja": "「やはり事故などではなかったな。その帳簿は今どこにある？」",
        "ko": "\"결국 단순 사고 따위가 아니었군. 그 장부는 지금 어디 있나?\"",
        "es": "\"Así que esto nunca fue un accidente. ¿Dónde está el libro ahora?\"",
        "fr": "\"Ce n'a donc jamais été un accident. Où se trouve ce registre ?\"",
        "de": "\"Es war also nie ein Unfall. Wo ist das Buch jetzt?\"",
        "ru": "«Значит, дело вовсе не в несчастном случае. Где гроссбух сейчас?»",
        "it": "\"Quindi non si è mai trattato di un incidente. Dov'è il mastro adesso?\"",
        "pt": "\"Então nunca se tratou de um acidente. Onde está o livro agora?\"",
        "ar": "\"إذن لم يكن الأمر حادثًا قط. أين دفتر الحسابات الآن؟\""
      },
      {
        "en": "[Return to investigation]",
        "id": "[Kembali ke penyelidikan]",
        "zh": "[返回案情排查]",
        "ja": "[捜査へ戻る]",
        "ko": "[수사로 복귀]",
        "es": "[Volver a la investigación]",
        "fr": "[Poursuivre les investigations]",
        "de": "[Zurück zur Untersuchung]",
        "ru": "[Вернуться к расследованию]",
        "it": "[Torna alle indagini]",
        "pt": "[Voltar à investigação]",
        "ar": "[العودة إلى التحقيق]"
      }
    ],
    "voices": [
      {
        "voice": {
          "en": "Elysia",
          "id": "Elysia",
          "zh": "极乐直觉",
          "ja": "エリシア",
          "ko": "엘리시아",
          "es": "Elysia",
          "fr": "Élysia",
          "de": "Elysia",
          "ru": "Элизия",
          "it": "Elysia",
          "pt": "Elísia",
          "ar": "إليزيا"
        },
        "badge": {
          "en": "ELYSIA [Psyche]",
          "id": "ELYSIA [Kejiwaan]",
          "zh": "极乐直觉 [心智]",
          "ja": "エリシア [精神]",
          "ko": "엘리시아 [심리]",
          "es": "ELYSIA [Psique]",
          "fr": "ÉLYSIA [Psyché]",
          "de": "ELYSIA [Psyche]",
          "ru": "ЭЛИЗИЯ [Психика]",
          "it": "ELYSIA [Psiche]",
          "pt": "ELÍSIA [Psique]",
          "ar": "إليزيا [الروح]"
        },
        "text": {
          "en": "Greed radiates off him like heat from a kiln. But he didn't kill Vance—he arrived too late and found her already cold.",
          "id": "Keserakahan memancar dari dirinya bagai panas dari tungku pembakaran. Tapi bukan dia yang membunuh Vance—dia tiba terlalu terlambat dan mendapati tubuhnya sudah dingin membeku.",
          "zh": "贪婪如窑炉的余热般从他身上不断蒸腾散发。但他并没有亲自动手杀死梵斯——他只是来得太迟，赶到时尸体早已冰凉透骨。",
          "ja": "陶芸窯のような熱気となって強欲が彼から立ち込めている。だが彼がヴァンスを殺したのではない——到着が遅すぎ、すでに冷たくなっていた遺体を見つけただけだ。",
          "ko": "가마에서 뿜어져 나오는 열기처럼 탐욕이 그에게서 흘러나옵니다. 하지만 그가 밴스를 죽인 것은 아닙니다. 너무 늦게 도착해 이미 차갑게 식은 시신을 발견했을 뿐입니다.",
          "es": "La codicia irradia de él como el calor de un horno. Pero no mató a Vance; llegó demasiado tarde y la encontró ya fría.",
          "fr": "L'avidité émane de lui comme la chaleur d'un fourneau. Mais il n'a pas tué Vance : il est arrivé trop tard et l'a trouvée déjà froide.",
          "de": "Habgier strahlt von ihm aus wie Hitze aus einem Brennofen. Aber er hat Vance nicht getötet – er kam zu spät und fand sie bereits kalt vor.",
          "ru": "Жадность исходит от него, как жар из печи. Но он не убивал Вэнс — он пришел слишком поздно и застал ее уже остывшей.",
          "it": "L'avidità si sprigiona da lui come calore da una fornace. Ma non ha ucciso Vance: è arrivato troppo tardi e l'ha trovata già fredda.",
          "pt": "A ganância irradia dele como o calor de uma fornalha. Mas ele não matou Vance — chegou tarde demais e a encontrou fria.",
          "ar": "ينبعث الجشع منه كحرارة تتصاعد من فرن متقد. لكنه لم يقتل فانس، بل وصل متأخرًا ووجد جثتها باردة بالفعل."
        }
      }
    ]
  },
  "graves_cigarette": {
    "speaker": {
      "en": "Inspector Graves",
      "id": "Inspektur Graves",
      "zh": "格雷夫斯警探",
      "ja": "グレイヴス警部",
      "ko": "그레이브스 형사",
      "es": "Inspector Graves",
      "fr": "Inspecteur Graves",
      "de": "Inspektor Graves",
      "ru": "Инспектор Грейвс",
      "it": "Ispettore Graves",
      "pt": "Inspetor Graves",
      "ar": "المفتش غريفز"
    },
    "text": {
      "en": "Graves tosses you a wrinkled cardboard box. 'Astra Red. Take one. You look like a walking cadaver.'",
      "id": "Graves melemparkan kotak kardus kusut. 'Astra Merah. Ambil satu. Kamu terlihat seperti mayat hidup yang berjalan.'",
      "zh": "格雷夫斯朝你扔来一包皱巴巴的纸盒。“阿斯特拉红牌无嘴烟。拿一支去抽吧，你现在活像一具行尸走肉。”",
      "ja": "グレイヴスは皺くちゃの紙箱を放り投げてきた。「アストラ・レッドだ。1本吸え。歩く死体のような顔をしてるぞ。」",
      "ko": "그레이브스가 구겨진 담뱃갑을 툭 던집니다. '아스트라 레드요. 한 대 피우시오. 걸어 다니는 시체 꼴이오.'",
      "es": "Graves te lanza una cajetilla arrugada. 'Astra Rojo. Coge uno. Pareces un cadáver andante.'",
      "fr": "Graves vous lance un paquet écorné. 'Astra Rouge. Prenez-en une. Vous avez l'air d'un macchabée sur pattes.'",
      "de": "Graves wirft Ihnen eine zerknitterte Schachtel zu. 'Astra Rot. Nehmen Sie eine. Sie sehen aus wie eine wandelnde Leiche.'",
      "ru": "Грейвс бросает тебе измятую пачку. «Астра Красная». Возьми одну. Ты выглядишь как ходячий покойник.»",
      "it": "Graves ti lancia un pacchetto sgualcito. 'Astra Rossa. Prendine una. Sembri un cadavere che cammina.'",
      "pt": "Graves joga um maço amassado para você. 'Astra Vermelho. Pegue um. Você parece um cadáver ambulante.'",
      "ar": "يرمي غريفز إليك علبة سجائر مجعدة: 'أسترا الحمراء، خذ واحدة. مظهرك يبدو كجثة متحركة.'"
    },
    "options": [
      {
        "en": "[Blow smoke into the gloom and return]",
        "id": "[Hembuskan asap ke dalam kegelapan menara dan kembali]",
        "zh": "[将浓烈的烟雾吐入钟楼昏暗中，归队]",
        "ja": "[暗がりへ煙を吹き出し、捜査に戻る]",
        "ko": "[어스름 속으로 연기를 내뿜으며 복귀한다]",
        "es": "[Exhalar el humo en la penumbra y regresar]",
        "fr": "[Souffler la fumée dans la pénombre et reprendre]",
        "de": "[Rauch in die Dunkelheit blasen und zurückkehren]",
        "ru": "[Выпустить дым в полумрак и вернуться]",
        "it": "[Espira il fumo nell'ombra e ritorna]",
        "pt": "[Soprar fumaça na penumbra e retornar]",
        "ar": "[نفث الدخان في عتمة البرج والعودة]"
      }
    ],
    "voices": [
      {
        "voice": {
          "en": "Reflex",
          "id": "Refleks",
          "zh": "反应力",
          "ja": "反射神経",
          "ko": "반사신경",
          "es": "Reflejo",
          "fr": "Réflexe",
          "de": "Reflex",
          "ru": "Рефлекс",
          "it": "Riflesso",
          "pt": "Reflexo",
          "ar": "رد الفعل"
        },
        "badge": {
          "en": "REFLEX [Motorics]",
          "id": "REFLEKS [Motorik]",
          "zh": "反应力 [运动敏捷]",
          "ja": "反射神経 [運動]",
          "ko": "반사신경 [운동]",
          "es": "REFLEJO [Motricidad]",
          "fr": "RÉFLEXE [Motricité]",
          "de": "REFLEX [Motorik]",
          "ru": "РЕФЛЕКС [Моторика]",
          "it": "RIFLESSO [Motorica]",
          "pt": "REFLEXO [Motricidade]",
          "ar": "رد الفعل [الحركية]"
        },
        "text": {
          "en": "The sulfur match strikes with an electric hiss. Inhaling the tar-heavy smoke calms your tremor. +1 Morale restored.",
          "id": "Korek api belerang menyala dengan desisan elektrik. Menghirup asap pekat tembakau menenangkan tremor tanganmu. +1 Moral dipulihkan.",
          "zh": "硫磺火柴在擦条上划出一声带电般的咝咝脆响。深吸一口焦油浓重的辛辣烟气，让你颤抖的手指终于重获镇定。+1 精神士气恢复。",
          "ja": "硫黄のマッチが電気のような摩擦音を立てて擦られる。タールに満ちた煙を吸い込むと、指先の震えが和らぐ。士気+1回復。",
          "ko": "유황 성냥이 전기가 튀듯 쉬익 소리를 내며 타오릅니다. 타르가 짙은 연기를 들이마시자 손끝의 떨림이 가라앉습니다. 사기 +1 회복.",
          "es": "El fósforo de azufre chisporrotea con un siseo eléctrico. Inhalar el humo espeso de alquitrán calma tu temblor. +1 Moral restaurada.",
          "fr": "L'allumette au soufre s'embrase dans un chuintement électrique. Inhaler cette fumée chargée de goudron apaise vos tremblements. +1 Moral restauré.",
          "de": "Das Schwefelhölzchen entzündet sich mit einem zischenden Laut. Der teerhaltige Rauch beruhigt dein Zittern. +1 Moral wiederhergestellt.",
          "ru": "Серная спичка вспыхивает с электрическим шипением. Вдох смолистого дыма унимает дрожь в пальцах. +1 к Боевому духу.",
          "it": "Il fiammifero allo zolfo si accende con un sibilo elettrico. Inalare il fumo denso di catrame placa il tuo tremore. +1 Morale ripristinato.",
          "pt": "O fósforo de enxofre risca com um chiado elétrico. Inalar a fumaça pesada de alcatrão acalma seu tremor. +1 Moral restaurada.",
          "ar": "يشتعل عود الثقاب الكبريتي بفحيح كهربائي خافت. استنشاق الدخان المشبع بالقطران يهدئ رجفة أصابعك. +1 استعادة المعنويات."
        }
      }
    ]
  },
  "examine_pendulum_start": {
    "speaker": {
      "en": "Forensic Observation",
      "id": "Pengamatan Forensik",
      "zh": "现场法医观察",
      "ja": "法医学的観察",
      "ko": "법의학적 관찰",
      "es": "Observación Forense",
      "fr": "Observation Légale",
      "de": "Forensische Beobachtung",
      "ru": "Судебно-медицинский осмотр",
      "it": "Osservazione Forense",
      "pt": "Observação Forense",
      "ar": "الملاحظة الجنائية"
    },
    "text": {
      "en": "The body of Aurelia Vance is pinned like an insect against the brass counterweight. Her linen blouse is stiff with dried crimson. Strangely, the pool of coagulated blood is not directly underneath her—it forms a dark smear six paces toward the window.",
      "id": "Tubuh Aurelia Vance tertancap seperti serangga pada beban kuningan pendulum. Blus linennya kaku oleh noda darah kering. Anehnya, genangan darah beku tidak berada tepat di bawahnya—melainkan membentuk jejak seretan enam langkah ke arah jendela.",
      "zh": "奥蕾莉亚·梵斯的尸身如同一只被标本针钉住的昆虫，惨烈地挂在巨大的黄铜配重块上。她的亚麻衬衣已被发黑的干涸血迹浸透板结。古怪的是，凝固的大滩血泊并不在悬挂处正下方——而在六步之遥的靠窗木板上拖出一道明显的拖拽痕迹。",
      "ja": "オレリア・ヴァンスの遺体は、昆虫の標本のように真鍮のカウンターウェイトに磔にされている。麻のシャツは乾いた血で固まっている。奇妙なことに、凝固した血だまりは真下ではなく、窓に向かって6歩ほどの位置に引きずられた痕跡を残していた。",
      "ko": "오렐리아 밴스의 시신은 표본 곤충처럼 황동 평형추에 꿰뚫려 있습니다. 리넨 셔츠는 말라붙은 핏물로 뻣뻣합니다. 기이하게도 응고된 혈흔은 진자 바로 밑이 아닌, 창문 쪽으로 여섯 걸음 떨어진 바닥에 짙게 번져 있습니다.",
      "es": "El cuerpo de Aurelia Vance está clavado como un insecto contra el contrapeso de latón. Su blusa de lino está rígida de sangre seca. Extrañamente, el charco de sangre coagulada no está debajo de ella, sino que forma una mancha arrastrada a seis pasos hacia la ventana.",
      "fr": "Le corps d'Aurelia Vance est cloué tel un insecte contre le contrepoids de laiton. Sa blouse de lin est rigide de sang séché. Curieusement, la mare de sang ne se trouve pas sous elle, mais forme une traînée macabre à six pas vers la fenêtre.",
      "de": "Der Leichnam von Aurelia Vance ist wie ein Insekt an das Messinggewicht gespießt. Ihre Bluse ist von getrocknetem Blut erstarrt. Seltsamerweise liegt die Blutlache nicht unter ihr, sondern bildet eine Schleifspur sechs Schritte weit zum Fenster.",
      "ru": "Тело Аурелии Вэнс наколото на латунный противовес, словно насекомое. Льняная блуза затвердела от запекшейся крови. Странно, но лужа крови находится не под телом — она тянется широким следом волочения в шести шагах от окна.",
      "it": "Il corpo di Aurelia Vance è infilzato come un insetto contro il contrappeso d'ottone. La sua camicetta è irrigidita dal sangue secco. Stranamente la pozza di sangue non è sotto di lei, ma forma una scia trascinata a sei passi verso la finestra.",
      "pt": "O corpo de Aurelia Vance está cravado como um inseto contra o contrapeso de latão. Sua camisa de linho está endurecida de sangue seco. Estranhamente, a poça de sangue coagulado não está sob ela, mas forma um rastro arrastado a seis passos em direção à janela.",
      "ar": "جسد أوريليا فانس مثبت كحشرة معلقة ضد ثقل الموازنة النحاسي. قميصها الكتاني متصلب بالدماء الجافة. المريب أن بركة الدم المتخثر ليست تحتها مباشرة، بل تشكل أثر جر واضح يبعد ست خطوات نحو النافذة."
    },
    "options": [
      {
        "id": "[PERSEPSI - Sulit 12] Buka paksa genggaman tangan kanannya yang membeku untuk melihat apa yang ia cengkeram sebelum mati.",
        "en": "[PERCEPTION - Challenging 12] Pry open her frozen right hand to see what she clenched before dying.",
        "zh": "【感知 - 难度 12】掰开她僵死冰冷的右手，检查死者死前紧攥之物。",
        "ja": "【知覚 - 難度 12】硬直した右手をこじ開け、死の間際に何を握りしめていたか検分する。",
        "ko": "[지각 - 난이도 12] 굳어버린 오른손을 강제로 벌려 죽기 직전 쥐고 있던 것을 확인한다.",
        "es": "[PERCEPCIÓN - Desafiante 12] Abrir su mano congelada para examinar qué apretaba antes de morir.",
        "fr": "[PERCEPTION - Difficile 12] Forcer sa main droite figée pour voir ce qu'elle serrait avant de mourir.",
        "de": "[WAHRNEHMUNG - Schwer 12] Ihre verkrampfte rechte Hand aufbrechen, um zu sehen, was sie festhielt.",
        "ru": "[ВОСПРИЯТИЕ - Сложность 12] Разжать ее одеревеневшие пальцы и изучить предмет в руке.",
        "it": "[PERCEZIONE - Impegnativo 12] Apri la sua mano irrigidita per vedere cosa stringeva prima di morire.",
        "pt": "[PERCEPÇÃO - Desafiador 12] Forçar a mão direita congelada para ver o que ela segurava ao morrer.",
        "ar": "[الإدراك - صعب 12] فتح قبضتها اليمنى المتصلبة لمعاينة ما كانت تمسكه بقوة قبل موتها."
      },
      {
        "id": "[ESOTERIKA - Sedang 10] Teliti ukiran geometris aneh yang tergores di tulang selangkanya.",
        "en": "[ESOTERICA - Medium 10] Study the strange geometric incision carved into her collarbone.",
        "zh": "【秘教 - 难度 10】细细研读刻在她锁骨处那道诡异的几何炼金刻痕。",
        "ja": "【秘教 - 難易度 10】彼女の鎖骨に刻まれた奇妙な幾何学的刻印を調べる。",
        "ko": "[비전학 - 보통 10] 쇄골에 새겨진 기이한 기하학적 절개 문양을 분석한다.",
        "es": "[ESOTERISMO - Medio 10] Estudiar la extraña incisión geométrica tallada en su clavícula.",
        "fr": "[ÉSOTÉRISME - Moyen 10] Étudier l'étrange incision géométrique gravée sur sa clavicule.",
        "de": "[ESOTERIK - Mittel 10] Die seltsame geometrische Einritzung an ihrem Schlüsselbein untersuchen.",
        "ru": "[ЭЗОТЕРИКА - Сложность 10] Изучить странные геометрические надрезы на ее ключице.",
        "it": "[ESOTERISMO - Medio 10] Studia la strana incisione geometrica incisa sulla clavicola.",
        "pt": "[ESOTERISMO - Médio 10] Estudar a estranha incisão geométrica talhada na clavícula dela.",
        "ar": "[العلوم الباطنية - متوسط 10] دراسة النقش الهندسي الغريب المحفور على عظمة ترقوتها."
      },
      {
        "id": "[BERBAHAYA] Raih ke dalam celah roda gigi escapement yang berputar untuk mencari bukti yang terjatuh.",
        "en": "[DANGEROUS] Reach deep into the churning escapement gears to look for dropped evidence.",
        "zh": "【极度危险】将手探入猛烈咬合转动的擒纵齿轮深处，搜寻掉落的证据残片。",
        "ja": "【危険】回転する脱進機の歯車の奥深くに手を差し入れ、落ちた証拠を探す。",
        "ko": "[위험] 맞물려 돌아가는 탈진기 톱니바퀴 틈새로 손을 뻗어 떨어진 증거를 찾는다.",
        "es": "[PELIGROSO] Meter la mano entre los engranajes en marcha para buscar pruebas caídas.",
        "fr": "[DANGEREUX] Plonger la main dans les engrenages en mouvement pour chercher un indice tombé.",
        "de": "[GEFÄHRLICH] Tief in die mahlenden Zahnräder greifen, um nach Beweisen zu suchen.",
        "ru": "[ОПАСНО] Залезть рукой глубоко в крутящиеся шестеренки в поисках упавших улик.",
        "it": "[PERICOLOSO] Infila la mano negli ingranaggi in movimento per cercare prove cadute.",
        "pt": "[PERIGOSO] Alcançar o fundo das engrenagens em movimento para procurar provas caídas.",
        "ar": "[خطر] مد يدك في أعماق تروس ميزان الساعة الدوارة بحثًا عن أدلة ساقطة."
      },
      {
        "id": "[Mundur dari jenazah]",
        "en": "[Step back from the corpse]",
        "zh": "【从尸体旁退后】",
        "ja": "【遺体から離れる】",
        "ko": "[시신에서 물러선다]",
        "es": "[Alejarse del cadáver]",
        "fr": "[S'éloigner du cadavre]",
        "de": "[Von der Leiche zurücktreten]",
        "ru": "[Отойти от тела]",
        "it": "[Allontanati dal cadavere]",
        "pt": "[Afastar-se do cadáver]",
        "ar": "[الابتعاد عن الجثة]"
      }
    ],
    "voices": [
      {
        "voice": {
          "en": "Ratio",
          "id": "Rasio",
          "zh": "理性",
          "ja": "比率",
          "ko": "이성",
          "es": "Razón",
          "fr": "Ratio",
          "de": "Ratio",
          "ru": "Рацио",
          "it": "Ragione",
          "pt": "Razão",
          "ar": "العقلانية"
        },
        "badge": {
          "en": "RATIO [Intellect]",
          "id": "RASIO [Intelek]",
          "zh": "理性 [智力]",
          "ja": "比率 [知性]",
          "ko": "이성 [지성]",
          "es": "RAZÓN [Intelecto]",
          "fr": "RATIO [Intellect]",
          "de": "RATIO [Intellekt]",
          "ru": "РАЦИО [Интеллект]",
          "it": "RAGIONE [Intelletto]",
          "pt": "RAZÃO [Intelecto]",
          "ar": "العقلانية [الفكر]"
        },
        "text": {
          "en": "Hypostasis deduction: She did not die here on the pendulum. She was killed at the window sill, bled out, and her body was dragged and mounted onto the clock mechanism to make the stoppage seem like an accidental disaster.",
          "id": "Deduksi hipostasis: Korban tidak mati di sini pada pendulum. Dia dibunuh di dekat jendela, kehabisan darah, lalu jenazahnya diseret dan dipasang ke mekanisme jam agar penghentian jam tampak seperti bencana kecelakaan.",
          "zh": "尸斑重力推演：她的真正死因绝非钟摆压迫。她是在窗台边遇刺身亡、流尽鲜血后，尸体才被凶手拖过来固定在齿轮配重上的，企图制造机械事故假象！",
          "ja": "死斑の推論：彼女はこの振り子の上で死んだのではない。窓際で殺害されて失血死した後、時計停止を事故に見せかけるため遺体を運んで機構に固定したのだ。",
          "ko": "시반 추론: 피해자는 시계추 위에서 사망한 것이 아닙니다. 창틀에서 살해당해 피를 흘린 뒤, 시계 정지를 우발적 사고처럼 위장하기 위해 시신을 기계 장치로 끌고 와 매달아 놓았습니다.",
          "es": "Deducción de hipóstasis: No murió aquí en el péndulo. Fue asesinada en el alféizar de la ventana, se desangró y su cuerpo fue arrastrado y montado en el mecanismo para simular un accidente.",
          "fr": "Déduction d'hypostase : Elle n'est pas morte ici sur le balancier. Elle a été tuée près de la fenêtre, s'est vidée de son sang, puis son corps a été traîné et hissé sur le mécanisme pour simuler un accident.",
          "de": "Livores-Deduktion: Sie starb nicht hier am Pendel. Sie wurde an der Fensterbank getötet, blutete aus, und ihre Leiche wurde auf das Uhrwerk geschleift, um einen Unfall vorzutäuschen.",
          "ru": "Трупные пятна не врут: она умерла не здесь на маятнике. Ее убили у окна, она истекла кровью, а затем тело приволокли сюда для инсценировки несчастного случая.",
          "it": "Deduzione dell'ipostasi: Non è morta qui sul pendolo. È stata uccisa sul davanzale, dissanguata, e il corpo è stato trascinato e montato sull'orologio per simulare un disastro accidentale.",
          "pt": "Dedução de hipóstase: Ela não morreu aqui no pêndulo. Foi assassinada no parapeito, sangrou até morrer, e seu corpo foi arrastado e montado no mecanismo para forjar um acidente.",
          "ar": "استنتاج علمي للترسب الدموي: لم تمت الضحية هنا على البندول بل قُتلت عند حافة النافذة ونزفت حتى الموت، ثم سُحلت جثتها ورُكبت على ثقل الساعة ليبدو التوقف وكأنه حادث عرضي."
        }
      },
      {
        "voice": {
          "en": "Carnal",
          "id": "Karnal",
          "zh": "肉体本能",
          "ja": "肉体",
          "ko": "육체",
          "es": "Carnal",
          "fr": "Carnal",
          "de": "Körper",
          "ru": "Тело",
          "it": "Fisico",
          "pt": "Físico",
          "ar": "الجسد"
        },
        "badge": {
          "en": "CARNAL [Physique]",
          "id": "KARNAL [Fisik]",
          "zh": "肉体本能 [体魄]",
          "ja": "肉体 [身体]",
          "ko": "육체 [신체]",
          "es": "CARNAL [Físico]",
          "fr": "CARNAL [Physique]",
          "de": "KÖRPER [Physis]",
          "ru": "ТЕЛО [Телосложение]",
          "it": "FISICO [Fisico]",
          "pt": "FÍSICO [Físico]",
          "ar": "الجسد [البنية]"
        },
        "text": {
          "en": "Touch her wrist. The rigor mortis is uneven. The left arm is limp, while the right hand is frozen in a convulsive grip, clutching something tightly inside her palm.",
          "id": "Sentuh pergelangan tangannya. Kaku mayatnya tidak merata. Lengan kirinya lemas, sedangkan tangan kanannya membeku dalam cengkeraman kejang, menggenggam sesuatu dengan sangat erat di telapak tangannya.",
          "zh": "触碰她的手腕。尸僵分布极不均匀。左臂软垂无力，而右手却在死前痉挛中彻底僵死，掌心死死攥紧着某种冰冷的小物件。",
          "ja": "手首に触れてみろ。死後硬直に偏りがある。左腕はだらりと垂れ下がっているが、右手は激しい痙攣のまま凍りつき、掌の中に何かを固く握りしめている。",
          "ko": "손목을 만져보십시오. 사후강직이 불균등합니다. 왼팔은 축 늘어져 있지만, 오른손은 경련하듯 굳어 손바닥 안에 무언가를 억세게 움켜쥐고 있습니다.",
          "es": "Toca su muñeca. El rigor mortis es desigual. El brazo izquierdo está flácido, mientras que la mano derecha está congelada en un agarre convulsivo, apretando algo con fuerza en la palma.",
          "fr": "Touchez son poignet. La rigidité cadavérique est inégale. Le bras gauche est flasque, tandis que la main droite est figée dans une crispation convulsive, serrant fort quelque chose dans sa paume.",
          "de": "Berühre ihr Handgelenk. Die Totenstarre ist ungleichmäßig. Der linke Arm ist schlaff, während die rechte Hand in krampfhaftem Griff erstarrt ist und etwas fest umschlossen hält.",
          "ru": "Коснись ее запястья. Трупное окоченение неравномерно. Левая рука безжизненна, но правая ладонь судорожно сжата в кулак, намертво удерживая что-то внутри.",
          "it": "Tocca il suo polso. Il rigor mortis è irregolare. Il braccio sinistro è flaccido, mentre la mano destra è congelata in una presa convulsiva, stringendo saldamente qualcosa nel palmo.",
          "pt": "Toque o pulso dela. O rigor mortis é irregular. O braço esquerdo está mole, enquanto a mão direita congelou num aperto convulsivo, segurando algo com força na palma.",
          "ar": "المس معصمها. التخشب الرمي غير متكافئ؛ الذراع اليسرى مرتخية، بينما اليد اليمنى متجمدة في قبضة تشنجية تطبق بقوة على شيء ما داخل راحة يدها."
        }
      }
    ]
  },
  "pendulum_pry_win": {
    "speaker": {
      "en": "Forensic Discovery",
      "id": "Penemuan Forensik",
      "zh": "关键法医发现",
      "ja": "決定的証拠の発見",
      "ko": "결정적 증거 발견",
      "es": "Hallazgo Forense",
      "fr": "Découverte Légale",
      "de": "Forensischer Fund",
      "ru": "Ключевая улика",
      "it": "Scoperta Forense",
      "pt": "Descoberta Forense",
      "ar": "اكتشاف جنائي بالغ الأهمية"
    },
    "text": {
      "en": "With a sharp snap of dried tendons, her fingers yield. Resting inside her palm is a carved ivory chess piece: a Black Queen with a silver needle embedded in its base. The needle tip is stained with a bitter, sweet-smelling violet residue.",
      "id": "Dengan suara retakan urat kering, jari-jemarinya meregang. Terbaring di telapak tangannya sebutir bidak catur gading: Ratu Hitam dengan jarum perak terpasang di dasarnya. Ujung jarum ternoda residu ungu berbau manis yang mematikan.",
      "zh": "随着僵硬肌腱一声清脆的脱开声，她的手指终于松开。掌心里赫然躺着一枚精雕细琢的象牙黑后棋子，底部暗藏着一根银质中空细针。针尖上隐约附着一层带有苦杏仁甜腻异香的紫黑色毒素残渣。",
      "ja": "乾燥した腱の鈍い音とともに、指が開いた。彼女の掌にあったのは、彫刻された象牙のチェス駒――底に銀の針が仕込まれた黒のクイーンだった。針先には甘く苦い香りを放つ紫色の残留物が付着している。",
      "ko": "굳어있던 힘줄이 뚝 하는 소리와 함께 풀립니다. 그녀의 손바닥에 놓여 있던 것은 정교한 상아 체스 말, 바닥에 은침이 박힌 검은 퀸이었습니다. 바늘 끝에는 달콤하면서도 씁쓸한 보랏빛 독극물 찌꺼기가 묻어 있습니다.",
      "es": "Con un crujido de tendones secos, sus dedos ceden. En su palma descansa una pieza de ajedrez de marfil: una Reina Negra con una aguja de plata en su base. La punta está manchada con un residuo violeta de olor dulzón.",
      "fr": "Dans un craquement sinistre de tendons raidis, ses doigts cèdent. Au creux de sa paume repose une reine d'échecs en ivoire sombre, dissimulant une aiguille d'argent à sa base souillée d'un résidu violet à l'odeur douceâtre.",
      "de": "Mit einem Knacken erstarrter Sehnen öffnen sich ihre Finger. In ihrer Hand liegt eine geschnitzte Elfenbein-Schachfigur: eine Schwarze Dame mit einer Silbernadel im Sockel, benetzt mit violettem, süßlichem Gift.",
      "ru": "С сухим хрустом одеревеневшие пальцы разжимаются. На ладони лежит резная шахматная фигура из слоновой кости: Черный ферзь с тонкой серебряной иглой в основании. На кончике иглы виднеется сладковато пахнущий фиолетовый осадок.",
      "it": "Con uno scricchiolio di tendini, le dita cedono. Nel palmo c'è una regina degli scacchi d'avorio intagliata: ha un ago d'argento celato nella base, macchiato da un residuo violaceo dall'odore dolciastro.",
      "pt": "Com um estalo de tendões secos, os dedos cedem. Na palma descansa uma rainha de xadrez de marfim com uma agulha de prata oculta na base. A ponta está manchada com um resíduo violeta de cheiro adocicado.",
      "ar": "مع صوت طقطقة أوتارها الجافة، تنفتح أصابعها. في راحة يدها قطعة شطرنج عاجية منحوتة: وزير أسود بإبرة فضية مجوفة مدمجة بقاعدتها، وطرفها ملوث ببلورات سم بنفسجية تفوح برائحة لوزية حلوة."
    },
    "options": [
      {
        "en": "\"The killer didn't use brute force. They used a parlor trick.\"",
        "id": "\"Pembunuhnya tidak memakai kekerasan fisik semata. Mereka memakai tipu muslihat yang licik.\"",
        "zh": "“凶手并没有使用粗暴蛮力，而是用了一种阴险的江湖障眼法。”",
        "ja": "「犯人は腕力を使ったんじゃない。巧妙なトリックを使ったんだ。」",
        "ko": "\"범인은 무력을 쓰지 않았소. 교묘한 속임수를 썼지.\"",
        "es": "\"El asesino no usó fuerza bruta. Usó un truco de salón.\"",
        "fr": "\"Le tueur n'a pas usé de force brute. C'était un tour de passe-passe.\"",
        "de": "\"Der Mörder wandte keine rohe Gewalt an. Es war ein billiger Zaubertrick.\"",
        "ru": "«Убийца не применял грубую силу. Он использовал фокус с ядом.»",
        "it": "\"L'assassino non ha usato la forza bruta. Ha usato un trucco da salotto.\"",
        "pt": "\"O assassino não usou força bruta. Usou um truque de salão.\"",
        "ar": "\"لم يستخدم القاتل القوة الغاشمة، بل خدعة ماكرة ملتوية.\""
      },
      {
        "en": "[Close]",
        "id": "[Tutup]",
        "zh": "【关闭】",
        "ja": "【閉じる】",
        "ko": "[닫기]",
        "es": "[Cerrar]",
        "fr": "[Fermer]",
        "de": "[Schließen]",
        "ru": "[Закрыть]",
        "it": "[Chiudi]",
        "pt": "[Fechar]",
        "ar": "[إغلاق]"
      }
    ],
    "voices": [
      {
        "voice": {
          "en": "Reflex",
          "id": "Refleks",
          "zh": "反应力",
          "ja": "反射神経",
          "ko": "반사신경",
          "es": "Reflejo",
          "fr": "Réflexe",
          "de": "Reflex",
          "ru": "Рефлекс",
          "it": "Riflesso",
          "pt": "Reflexo",
          "ar": "رد الفعل"
        },
        "badge": {
          "en": "REFLEX [Motorics]",
          "id": "REFLEKS [Motorik]",
          "zh": "反应力 [运动敏捷]",
          "ja": "反射神経 [運動]",
          "ko": "반사신경 [운동]",
          "es": "REFLEJO [Motricidad]",
          "fr": "RÉFLEXE [Motricité]",
          "de": "REFLEX [Motorik]",
          "ru": "РЕФЛЕКС [Моторика]",
          "it": "RIFLESSO [Motorica]",
          "pt": "REFLEXO [Motricidade]",
          "ar": "رد الفعل [الحركية]"
        },
        "text": {
          "en": "Belladonna and mercuric oxide. An assassination needle. Vance was paralyzed with neurotoxin before her body was hoisted onto the pendulum!",
          "id": "Belladonna dan oksida merkuri. Jarum pembunuh. Vance dilumpuhkan dengan racun saraf sebelum jenazahnya diangkat ke pendulum!",
          "zh": "颠茄素与氧化汞结晶。这是一枚特制的暗杀毒针！梵斯在尸体被挂上钟摆前，就已经被剧毒神经毒素彻底麻痹了！",
          "ja": "ベラドンナと酸化水銀。暗殺用の毒針だ。ヴァンスは振り子に吊るされる前に、神経毒で麻痺させられていたのだ！",
          "ko": "벨라도나와 산화수은. 암살용 독침입니다. 밴스는 시신이 시계추에 매달리기 전에 이미 신경독으로 마비되어 있었습니다!",
          "es": "Belladona y óxido mercúrico. Una aguja de asesinato. ¡Vance fue paralizada con neurotoxina antes de ser izada al péndulo!",
          "fr": "Belladone et oxyde de mercure. Une aiguille d'assassinat. Vance a été paralysée par une neurotoxine avant d'être hissée sur le balancier !",
          "de": "Tollkirsche und Quecksilberoxid. Eine Attentatsnadel. Vance wurde gelähmt, bevor sie an das Pendel gehängt wurde!",
          "ru": "Белладонна и оксид ртути. Игла убийцы. Вэнс была парализована нейротоксином до того, как тело подняли на маятник!",
          "it": "Belladonna e ossido di mercurio. Un ago da assassinio. Vance è stata paralizzata prima di essere issata sul pendolo!",
          "pt": "Beladona e óxido mercúrico. Uma agulha de assassinato. Vance foi paralisada com neurotoxina antes de ser erguida ao pêndulo!",
          "ar": "ست الحسن وأكسيد الزئبق. إبرة اغتيال غادرة. لقد شُل جسد فانس بسم عصبي قبل رفع جثتها على البندول!"
        }
      }
    ]
  },
  "examine_watch_start": {
    "speaker": {
      "en": "The Stopped Pocket Watch",
      "id": "Jam Saku yang Terhenti",
      "zh": "止步的炼金怀表",
      "ja": "止まった懐中時計",
      "ko": "멈춰 선 회중시계",
      "es": "El Reloj de Bolsillo Detenido",
      "fr": "La Montre de Poche Arrêtée",
      "de": "Die Stehengebliebene Taschenuhr",
      "ru": "Остановившиеся карманные часы",
      "it": "L'Orologio da Taschino Fermo",
      "pt": "O Relógio de Bolso Parado",
      "ar": "ساعة الجيب المتوقفة"
    },
    "text": {
      "en": "Resting beside Aurelia's dropped briefcase is an exquisite alchemical pocket watch. The crystal glass is shattered, but the heavy gold casing remains intact. The hands are frozen at 03:42:18.",
      "id": "Tergeletak di sebelah tas kerja Aurelia yang terjatuh adalah sebuah jam saku alkimia yang sangat indah. Kaca kristalnya hancur, namun casing emasnya masih utuh. Jarum jam terhenti membeku pada pukul 03:42:18.",
      "zh": "遗落在死者公文包旁的是一枚做工巧夺天工的炼金怀表。表盘的水晶玻璃已经碎裂，但厚重的纯金外壳依旧完好。指针精确地定格在凌晨03:42:18。",
      "ja": "オレリアの書類鞄の傍らに、精緻を極めた錬金術式懐中時計が転がっている。風防ガラスは砕けているが、重厚な金無垢のケースは無傷だ。針は午前03時42分18秒で凍りついている。",
      "ko": "오렐리아의 서류 가방 곁에 정교하기 이를 데 없는 연금술 회중시계가 떨어져 있습니다. 유리 덮개는 박살 났지만 묵직한 금제 케이스는 온전합니다. 시곗바늘은 03:42:18에 멈춰 있습니다.",
      "es": "Junto al maletín caído descansa un exquisito reloj de bolsillo alquímico. El cristal está roto, pero la caja de oro macizo está intacta. Las agujas están congeladas a las 03:42:18.",
      "fr": "Près de la mallette renversée repose une montre de poche alchimique admirable. Le verre est brisé mais le boîtier en or reste intact. Les aiguilles sont figées à 03:42:18.",
      "de": "Neben der Aktentasche liegt eine meisterhafte alchemistische Taschenuhr. Das Glas ist zersprungen, das Goldgehäuse intakt. Die Zeiger stehen starr auf 03:42:18 Uhr.",
      "ru": "Рядом с брошенным саквояжем лежат изысканные алхимические карманные часы. Стекло разбито, но массивный золотой корпус цел. Стрелки застыли на 03:42:18.",
      "it": "Accanto alla ventiquattrore caduta giace uno squisito orologio alchemico. Il vetro è in frantumi ma la cassa d'oro è intatta. Le lancette sono immobili sulle 03:42:18.",
      "pt": "Ao lado da pasta caída repousa um requintado relógio alquímico. O vidro está quebrado, mas a caixa de ouro maciço está intacta. Os ponteiros congelaram em 03:42:18.",
      "ar": "بجانب حقيبة أوريليا الملقاة، ترقد ساعة جيب خيميائية بالغة البراعة. زجاجها مكسور لكن غلافها الذهبي الثقيل سليم، وعقاربها متجمدة بدقة عند 03:42:18."
    },
    "options": [
      {
        "id": "[PENYELARASAN MESIN - Sedang 11] Cungkil penutup belakang dengan ujung kuku untuk memeriksa roda gigi bagian dalam.",
        "en": "[INTERFACING - Medium 11] Pop open the back casing with your thumbnail to examine the inner movement.",
        "zh": "【机构连动 - 难度 11】用指甲挑开怀表后盖，检视其内嵌的复杂机芯。",
        "ja": "【機構連動 - 難易度 11】親指の爪で裏蓋をこじ開け、内部のムーブメントを調べる。",
        "ko": "[기계 조율 - 보통 11] 엄지손톱으로 뒷면 덮개를 열어 내부 무브먼트를 살펴본다.",
        "es": "[CONEXIÓN MECÁNICA - Medio 11] Abrir la tapa trasera con la uña para examinar el movimiento interno.",
        "fr": "[INTERFAÇAGE - Moyen 11] Ouvrir le boîtier arrière avec l'ongle pour examiner le mouvement.",
        "de": "[MECHANIK - Mittel 11] Das hintere Gehäuse aufhebeln, um das Innenleben zu untersuchen.",
        "ru": "[ВЗАИМОДЕЙСТВИЕ - Сложность 11] Поддеть ногтем заднюю крышку и изучить механизм.",
        "it": "[INTERAZIONE - Medio 11] Apri il coperchio posteriore per esaminare il meccanismo interno.",
        "pt": "[INTERAÇÃO - Médio 11] Abrir a tampa traseira para examinar o mecanismo interno.",
        "ar": "[التعامل الميكانيكي - متوسط 11] فتح الغطاء الخلفي لمعاينة التروس الداخلية للحركة."
      },
      {
        "id": "[Masukkan arloji ke dalam kantong bukti]",
        "en": "[Put the watch in evidence bag]",
        "zh": "【将怀表放入物证袋】",
        "ja": "【懐中時計を証拠品袋に収める】",
        "ko": "[시계를 증거품 가방에 보관한다]",
        "es": "[Poner el reloj en la bolsa de pruebas]",
        "fr": "[Mettre la montre dans le sac à preuves]",
        "de": "[Die Uhr in die Beweismitteltasche legen]",
        "ru": "[Убрать часы в мешок для улик]",
        "it": "[Metti l'orologio nella busta delle prove]",
        "pt": "[Colocar o relógio no saco de evidências]",
        "ar": "[وضع الساعة في حقيبة الأدلة]"
      },
      {
        "id": "[Mundur]",
        "en": "[Step back]",
        "zh": "【退后】",
        "ja": "【戻る】",
        "ko": "[뒤로 물러선다]",
        "es": "[Retroceder]",
        "fr": "[Reculer]",
        "de": "[Zurücktreten]",
        "ru": "[Назад]",
        "it": "[Indietro]",
        "pt": "[Recuar]",
        "ar": "[الرجوع للخلف]"
      }
    ],
    "voices": [
      {
        "voice": {
          "en": "Ratio",
          "id": "Rasio",
          "zh": "理性",
          "ja": "比率",
          "ko": "이성",
          "es": "Razón",
          "fr": "Ratio",
          "de": "Ratio",
          "ru": "Рацио",
          "it": "Ragione",
          "pt": "Razão",
          "ar": "العقلانية"
        },
        "badge": {
          "en": "RATIO [Intellect]",
          "id": "RASIO [Intelek]",
          "zh": "理性 [智力]",
          "ja": "比率 [知性]",
          "ko": "이성 [지성]",
          "es": "RAZÓN [Intelecto]",
          "fr": "RATIO [Intellect]",
          "de": "RATIO [Intellekt]",
          "ru": "РАЦИО [Интеллект]",
          "it": "RAGIONE [Intelletto]",
          "pt": "RAZÃO [Intelecto]",
          "ar": "العقلانية [الفكر]"
        },
        "text": {
          "en": "Listen. The cadence is wrong. A normal escapement beats at five ticks per second (300 BPM). This mechanism is pulsing in an irregular triplet: tap... tap-tap... tap.",
          "id": "Dengarkan baik-baik. Ketukannya ganjil. Escapement jam normal berdetak lima kali per detik (300 BPM). Mekanisme ini berdenyut dalam pola triplet tak beraturan: tik... tik-tik... tik.",
          "zh": "侧耳细听。这种摆动节奏完全不对。普通钟表擒纵器每秒敲击五次（300 BPM）。而眼前的精密机构却在以一种诡异的三连音脉动：咔……咔-咔……咔。",
          "ja": "聴け。リズムが狂っている。通常の脱進機は毎秒5回（300 BPM）刻む。この機構は不規則な三連符で脈打っている：カチッ……カチ・カチッ……カチッ。",
          "ko": "귀를 기울이십시오. 박자가 잘못되었습니다. 보통의 탈진기는 초당 5회(300 BPM) 박동합니다. 하지만 이 장치는 불규칙한 세 박자로 뛰고 있습니다. 틱... 틱-틱... 틱.",
          "es": "Escucha. La cadencia es errónea. Un escape normal late a cinco tics por segundo (300 BPM). Este mecanismo pulsa en un triplete irregular: tac... tac-tac... tac.",
          "fr": "Écoutez. Le rythme est anormal. Un échappement régulier bat à cinq coups par seconde. Ce mécanisme pulse en un triolet irrégulier : tic... tic-tic... tic.",
          "de": "Hör zu. Der Takt stimmt nicht. Ein normales Hemmungswerk tickt fünfmal pro Sekunde. Dieses pulsiert in einer unregelmäßigen Triole: tick... tick-tick... tick.",
          "ru": "Послушай. Ритм нарушен. Обычный спуск тикает пять раз в секунду. Этот механизм пульсирует странной триолью: тик... тик-тик... тик.",
          "it": "Ascolta. Il ritmo è sbagliato. Un normale scappamento batte cinque tic al secondo. Questo meccanismo pulsa in una terzina irregolare: tic... tic-tic... tic.",
          "pt": "Ouça. A cadência está errada. Um escape normal bate cinco vezes por segundo. Este mecanismo pulsa em tercinas irregulares: tique... tique-tique... tique.",
          "ar": "أنصت بدقة. الإيقاع غير سليم؛ ميزان الساعة المعتاد ينبض 5 دقات بالثانية، بينما تنبض هذه الآلية بنمط ثلاثي مضطرب."
        }
      }
    ]
  },
  "watch_open_win": {
    "speaker": {
      "en": "The Engraved Mechanism",
      "id": "Mekanisme Berukir Rahasia",
      "zh": "暗刻绝密机芯",
      "ja": "彫刻された秘密機構",
      "ko": "음각된 비밀 기구",
      "es": "El Mecanismo Grabado",
      "fr": "Le Mécanisme Gravé",
      "de": "Das Gravierte Uhrwerk",
      "ru": "Тайный гравированный механизм",
      "it": "Il Meccanismo Inciso",
      "pt": "O Mecanismo Gravado",
      "ar": "آلية الحركة المنقوشة سرًا"
    },
    "text": {
      "en": "The gold case pops open. Engraved with a diamond scribe onto the balance wheel are three distinct numbers: [ 7 - 3 - 12 ], beneath which is etched a personal dedication: 'To my beloved Vivienne, who measured all my hours.'",
      "id": "Casing emas terbuka dengan denting halus. Terukir goresan intan pada roda balance tiga angka sandi: [ 7 - 3 - 12 ], di bawahnya tertulis dedikasi pribadi: 'Untuk Vivienne tercinta, pengukur seluruh waktu hidupku.'",
      "zh": "金质底盖应声弹开。用金刚石刻针在摆轮精细镌刻着三个阿拉伯数字：【 7 - 3 - 12 】，下方还刻着一段深情的题词：“献给我挚爱的薇薇安，你丈量了我一生的全部时光。”",
      "ja": "金の裏蓋が小さく弾け開いた。ダイヤモンド針でテンプ輪に刻まれていたのは3つの数字――【 7 - 3 - 12 】、そしてその下には「すべての時を測りし最愛のヴィヴィアンへ」と彫られていた。",
      "ko": "황금 케이스가 경쾌하게 열립니다. 밸런스 휠에 다이아몬드 조각도로 새겨진 세 자리 암호가 드러납니다: [ 7 - 3 - 12 ]. 그 아래에는 '내 모든 시간을 재어준 사랑하는 비비안에게'라는 헌사가 적혀 있습니다.",
      "es": "La caja de oro se abre. Grabados con un estilete de diamante en el volante hay tres números: [ 7 - 3 - 12 ], y una dedicatoria: 'Para mi amada Vivienne, quien midió todas mis horas.'",
      "fr": "Le boîtier doré s'ouvre. Gravés au diamant sur le balancier se trouvent trois chiffres : [ 7 - 3 - 12 ], et une dédicace : 'À ma bien-aimée Vivienne, qui compta chacune de mes heures.'",
      "de": "Das Gehäuse springt auf. Mit einer Diamantspitze sind drei Zahlen eingraviert: [ 7 - 3 - 12 ], darunter die Widmung: 'Für meine geliebte Vivienne, die all meine Stunden zählte.'",
      "ru": "Золотая крышка с щелчком откидывается. На колесе баланса алмазной иглой выбиты три цифры: [ 7 - 3 - 12 ], а ниже надпись: «Моей возлюбленной Вивьен, отмерявшей все часы моей жизни».",
      "it": "La cassa d'oro scatta aperta. Incisi sul bilanciere ci sono tre numeri: [ 7 - 3 - 12 ], e una dedica: 'Alla mia amata Vivienne, che ha contato tutte le mie ore.'",
      "pt": "A caixa se abre. Gravados no balanço estão três números: [ 7 - 3 - 12 ], com a dedicação: 'Para minha amada Vivienne, que mediu todas as minhas horas.'",
      "ar": "ينفتح الغلاف الذهبي بنقرة رقيقة. محفور برأس ألماسي على عجلة التوازن ثلاثة أرقام شفرة: [ 7 - 3 - 12 ]، وتحتها إهداء خاص: 'إلى حبيبني فيفيان، التي وزنت كل ساعات عمري.'"
    },
    "options": [
      {
        "en": "\"A combination code. This unlocks the floorboard safe.\"",
        "id": "\"Kode kombinasi brankas. Ini kunci untuk membuka brankas tersembunyi.\"",
        "zh": "“这是暗格保险箱的密码。正好用来解开地板下的三位机械转盘。”",
        "ja": "「金庫の暗証番号だ。これで床下の隠し金庫を開けられる。」",
        "ko": "\"비밀번호로군. 바닥 밑 금고를 열 수 있는 조합이다.\"",
        "es": "\"Una combinación secreta. Esto abre la caja fuerte del suelo.\"",
        "fr": "\"Une combinaison secrète. Elle déverrouille le coffre sous le plancher.\"",
        "de": "\"Ein Zahlencode. Das öffnet den Bodensafe.\"",
        "ru": "«Шифр комбинации. Это откроет сейф под половицами.»",
        "it": "\"Una combinazione numerica. Apre la cassaforte sotto il pavimento.\"",
        "pt": "\"Uma combinação secreta. Isso destranca o cofre sob o piso.\"",
        "ar": "\"شفرة ثلاثية لفتح الخزنة المطمورة تحت الأرضية.\""
      }
    ]
  },
  "examine_safe_start": {
    "speaker": {
      "en": "Concealed Floorboard Safe",
      "id": "Brankas Lantai Tersembunyi",
      "zh": "地板暗格保险箱",
      "ja": "床下の隠し金庫",
      "ko": "바닥 판자 은닉 금고",
      "es": "Caja Fuerte Oculta bajo el Suelo",
      "fr": "Coffre Secret sous le Plancher",
      "de": "Verborgenes Bodenschließfach",
      "ru": "Тайный сейф под полом",
      "it": "Cassaforte Nascosta sotto il Pavimento",
      "pt": "Cofre Oculto sob o Assoalho",
      "ar": "الخزنة السرية تحت الأرضية"
    },
    "text": {
      "en": "Underneath greasy machine rags and spent bullet shells is a heavy cast-iron safe sunken into the floor joists. A precision alchemical three-tumbler lock secures the door.",
      "id": "Di bawah kain pelumas berminyak dan selongsong peluru berserakan, terdapat sebuah brankas besi cor berat yang tertanam di balok lantai. Kunci tiga putaran presisi mengunci pintunya.",
      "zh": "在油污油布与锈迹斑斑的旧弹壳遮掩下，一口厚重铸铁保险箱深深嵌死在地板龙骨之中。门上赫然装有一具精密度极高的三位炼金滚轮密码锁。",
      "ja": "油まみれのウエスと薬莢の下に、床梁に埋め込まれた重厚な鋳鉄製金庫がある。精密な三連ダイヤル式の錠前がその扉を固く閉ざしている。",
      "ko": "기름에 젖은 걸레와 탄피 아래, 바닥 장선 속에 매립된 묵직한 주철 금고가 드러납니다. 정밀한 3중 회전식 자물쇠가 문을 단단히 지키고 있습니다.",
      "es": "Bajo trapos con grasa y casquillos usados descansa una pesada caja fuerte de hierro fundido. Una cerradura alquímica de tres cilindros protege la puerta.",
      "fr": "Sous des chiffons huileux et des douilles percutées repose un coffre en fonte scellé dans le plancher. Une serrure alchimique à trois crans verrouille la porte.",
      "de": "Unter öligen Putzlappen und Patronenhülsen liegt ein massiver gusseiserner Tresor im Boden. Ein dreistelliges Kombinationsschloss sichert die Tür.",
      "ru": "Под замасленным тряпьем и стреляными гильзами в балки пола врезан тяжелый чугунный сейф. Дверцу блокирует точный трехдисковый алхимический замок.",
      "it": "Sotto stracci bisunti e bossoli usati c'è una pesante cassaforte di ghisa incassata nel pavimento. Una serratura alchemica a tre ghiere sigilla lo sportello.",
      "pt": "Sob panos engraxados e cápsulas de munição há um pesado cofre de ferro fundido embutido nas vigas. Uma trava alquímica de três cilindros sela a porta.",
      "ar": "تحت خرق الزيت وفوارغ الرصاص، ترقد خزنة حديدية ثقيلة مثبتة في عوارض الأرضية موصدة بقفل خيميائي ثلاثي التروس فائق الدقة."
    },
    "options": [
      {
        "id": "[Jika kombinasi diketahui (7-3-12)] Masukkan kode yang ditemukan di dalam arloji Aurelia.",
        "en": "[If combination known (7-3-12)] Enter the code found inside Aurelia's watch.",
        "zh": "【若已知密码组合（7-3-12）】输入从奥蕾莉亚怀表内刻痕获取的三重密码。",
        "ja": "【暗証番号既知時（7-3-12）】オレリアの懐中時計で見つけた暗号を入力する。",
        "ko": "[비밀번호를 안다면 (7-3-12)] 오렐리아의 시계 안에서 발견한 암호를 입력한다.",
        "es": "[Si conoce la combinación (7-3-12)] Introducir el código hallado en el reloj de Aurelia.",
        "fr": "[Si combinaison connue (7-3-12)] Entrer le code trouvé dans la montre d'Aurelia.",
        "de": "[Kombination bekannt (7-3-12)] Den Code aus Aurelias Uhr eingeben.",
        "ru": "[Если комбинация известна (7-3-12)] Ввести шифр из часов Аурелии.",
        "it": "[Se la combinazione è nota (7-3-12)] Inserisci il codice trovato nell'orologio.",
        "pt": "[Se a combinação for conhecida (7-3-12)] Digitar o código do relógio de Aurelia.",
        "ar": "[إذا كانت الشفرة معروفة (7-3-12)] إدخال الرمز المكتشف داخل ساعة أوريليا."
      },
      {
        "id": "[LOGIKA - Sulit 13] Coba deduksikan susunan pin gembok melalui getaran akustik.",
        "en": "[LOGIC - Hard 13] Attempt to deduce the tumbler alignment by acoustic vibration.",
        "zh": "【逻辑 - 困难 13】借助听觉振动推演滚轮内部销栓的对齐卡位。",
        "ja": "【論理 - 難度 13】音響振動からタンブラーの噛み合わせを推論する。",
        "ko": "[논리 - 어려움 13] 음향 진동을 감지해 텀블러 핀의 정렬을 추리해 낸다.",
        "es": "[LÓGICA - Difícil 13] Deducir la alineación de los tambores mediante vibración acústica.",
        "fr": "[LOGIQUE - Difficile 13] Déduire l'alignement des goupilles par vibration acoustique.",
        "de": "[LOGIK - Schwer 13] Versuchen, die Zuhaltungen durch Vibrationen zu erschließen.",
        "ru": "[ЛОГИКА - Сложность 13] Вычислить положение штифтов по звуку вибраций.",
        "it": "[LOGICA - Difficile 13] Deduci l'allineamento dei perni tramite vibrazioni acustiche.",
        "pt": "[LÓGICA - Difícil 13] Deduzir o alinhamento dos pinos pela vibração acústica.",
        "ar": "[المنطق - صعب 13] استنتاج محاذاة مسامير القفل من خلال الاهتزازات الصوتية."
      },
      {
        "id": "[KEKUATAN FISIK - Berbahaya] Coba cungkil paksa tutup besi tebal dengan linggis.",
        "en": "[BRUTE FORCE - Dangerous] Try to pry open the heavy iron lid with a crowbar.",
        "zh": "【暴力破解 - 危险】尝试用重型撬棍强行撬开沉重的铸铁保险柜盖。",
        "ja": "【腕力 - 危険】バールを使って重い鉄の蓋を無理やりこじ開けようとする。",
        "ko": "[완력 - 위험] 쇠지렛대로 무거운 철제 뚜껑을 강제로 비틀어 열어본다.",
        "es": "[FUERZA BRUTA - Peligroso] Intentar forzar la pesada tapa de hierro con una palanca.",
        "fr": "[FORCE BRUTE - Dangereux] Forcer le couvercle de fer à l'aide d'un pied-de-biche.",
        "de": "[ROHE GEWALT - Gefährlich] Versuchen, den schweren Eisendeckel aufzubrechen.",
        "ru": "[СИЛА - Опасно] Попытаться вскрыть тяжелую крышку монтировкой.",
        "it": "[FORZA BRUTA - Pericoloso] Tenta di scassinare il pesante coperchio con un piede di porco.",
        "pt": "[FORÇA BRUTA - Perigoso] Tentar forçar a tampa pesada com um pé de cabra.",
        "ar": "[القوة البدنية - خطير] محاولة خلع الغطاء الحديدي الثقيل بالقوة باستخدام عتلة."
      },
      {
        "id": "[Tinggalkan brankas tanpa disentuh]",
        "en": "[Leave safe untouched]",
        "zh": "【暂不动保险箱】",
        "ja": "【金庫に手を触れず立ち去る】",
        "ko": "[금고를 그대로 두고 물러난다]",
        "es": "[Dejar la caja intacta]",
        "fr": "[Laisser le coffre]",
        "de": "[Den Safe unberührt lassen]",
        "ru": "[Не трогать сейф]",
        "it": "[Lascia la cassaforte]",
        "pt": "[Deixar o cofre intacto]",
        "ar": "[ترك الخزنة دون لمسها]"
      }
    ]
  },
  "safe_open_code": {
    "speaker": {
      "en": "The Floorboard Safe Pops Open",
      "id": "Brankas Terbuka Lebar",
      "zh": "保险箱开启",
      "ja": "金庫の開錠",
      "ko": "금고 개방",
      "es": "La Caja Fuerte se Abre",
      "fr": "Le Coffre s'Ouvre",
      "de": "Der Tresor Öffnet Sich",
      "ru": "Сейф открыт",
      "it": "La Cassaforte si Apre",
      "pt": "O Cofre se Abre",
      "ar": "الخزنة تفتح"
    },
    "text": {
      "en": "CLICK-CLACK-CHUNK. The triple iron deadbolts retract with heavy grace. Inside lies the Grand Syndicate Perpetuum Ledger—thick vellum bound in black pigskin, containing detailed bribe logs, payment slips to Precinct 4 officers, and the architectural blueprints for a city-wide delay-detonation network.",
      "id": "KLIK-KLAK-DEG. Tiga gerendel besi tebal tertarik ke dalam. Di dalamnya terbaring Buku Besar Perpetuum Sindikat Agung—perkamen tebal bersampul kulit babi hitam, berisi catatan suap lengkap, slip pembayaran ke perwira Distrik 4, dan cetak biru bom penunda waktu.",
      "zh": "咔哒——咔——沉重的三道实心钢栓优雅收缩弹回。箱内静静躺着联合大辛迪加的《永动机密会总账簿》——用黑色鞣皮装订的厚实牛皮纸册，里面详尽记录了向第四警区各级警官行贿的汇款底单，以及一套企图在全市引发延迟连锁大爆炸的恶魔蓝图！",
      "ja": "カチ、カチ、ガコン。重厚な三重ボルトが後退した。内部にあったのは大シンジケートの『永久機関カルテル秘密台帳』――黒い豚革で装丁された厚い羊皮紙に、第4分署警官への賄賂台帳と、都市全域爆破計画の青写真が記されていた。",
      "ko": "철컥, 쿵. 묵직한 3중 강철 빗장이 부드럽게 풀립니다. 안에는 거대 신디케이트의 '영구기관 비밀 원장'이 들어 있었습니다. 흑색 가죽에 철해진 양피지에는 제4관할서 수뇌부 뇌물 장부와 도시 폭파 설계도가 고스란히 담겨 있었습니다.",
      "es": "CLIC-CLAC-CLANK. Los tres cerrojos se retraen. Dentro descansa el Libro Mayor del Cartel Perpetuum: pergamino grueso encuadernado en cuero negro con sobornos a agentes del Distrito 4 y planos de una red de detonación retardada.",
      "fr": "CLIC-CLAC-CLAC. Les pênes se rétractent lourdement. À l'intérieur repose le Grand Livre du Cartel Perpetuum : un registre contenant les preuves de corruption du District 4 et les plans d'une bombe à retardement gigantesque.",
      "de": "KLACK-KLACK-RUMMS. Die Bolzen weichen zurück. Darin liegt das Hauptbuch des Perpetuum-Kartells – mit Schmiergeldlisten für Beamte von Bezirk 4 und den Bauplänen für ein verzögertes Brandbombennetz.",
      "ru": "ЩЕЛК-КЛАЦ. Засовы мягко расходятся. Внутри лежит гроссбух картеля «Перпетуум» — книга в черной свиной коже с платежками продажным офицерам 4-го участка и чертежами тайного взрывного часового механизма.",
      "it": "CLIC-CLAC-SDENG. I tre chiavistelli si ritraggono. All'interno giace il Mastro del Cartello Perpetuum: contiene i registri delle tangenti al Distretto 4 e i piani di una rete incendiaria a detonazione ritardata.",
      "pt": "CLIQUE-CLAC. Os três ferrolhos se retraem. Dentro jaz o Livro-Razão do Cartel Perpetuum com subornos para policiais do Distrito 4 e plantas para uma rede incendiária de detonação retardada.",
      "ar": "طقطقة معدنية ثقيلة... تنفتح المزالج الثلاثية. بداخلها يرقد دفتر حسابات كارتل بيربيتوم السري، متضمنًا سجلات الرشاوى المفصلة لضباط المنطقة 4 ومخططات تفجير الماكينات الكبرى."
    },
    "options": [
      {
        "en": "\"Conclusive proof of corruption and conspiracy.\"",
        "id": "\"Bukti konklusif konspirasi dan korupsi sindikat.\"",
        "zh": "“这是辛迪加黑幕与警局内部腐败的确凿死证。”",
        "ja": "「警察内部の腐敗と陰謀の動かぬ決定的証拠だ。」",
        "ko": "\"부패와 거대 음모를 단죄할 결정적 물증이다.\"",
        "es": "\"Prueba concluyente de corrupción y conspiración.\"",
        "fr": "\"Preuve irréfutable de conspiration et de corruption.\"",
        "de": "\"Der endgültige Beweis für Verschwörung und Korruption.\"",
        "ru": "«Неопровержимое доказательство коррупции и заговора.»",
        "it": "\"La prova definitiva di corruzione e cospirazione.\"",
        "pt": "\"Prova irrefutável de conspiração e corrupção.\"",
        "ar": "\"دليل قاطع لا يقبل الشك على الفساد والمؤامرة الكبرى.\""
      }
    ],
    "voices": [
      {
        "voice": {
          "en": "Ratio",
          "id": "Rasio",
          "zh": "理性",
          "ja": "比率",
          "ko": "이성",
          "es": "Razón",
          "fr": "Ratio",
          "de": "Ratio",
          "ru": "Рацио",
          "it": "Ragione",
          "pt": "Razão",
          "ar": "العقلانية"
        },
        "badge": {
          "en": "RATIO [Intellect]",
          "id": "RASIO [Intelek]",
          "zh": "理性 [智力]",
          "ja": "比率 [知性]",
          "ko": "이성 [지성]",
          "es": "RAZÓN [Intelecto]",
          "fr": "RATIO [Intellect]",
          "de": "RATIO [Intellekt]",
          "ru": "РАЦИО [Интеллект]",
          "it": "RAGIONE [Intelletto]",
          "pt": "RAZÃO [Intelecto]",
          "ar": "العقلانية [الفكر]"
        },
        "text": {
          "en": "Look at the final entry dated last evening: 'Vivienne knows. She sold the cipher to the Syndicate for passage to the New Continent. Tonight she brings me tea. I know what is in the cup.'",
          "id": "Lihat catatan terakhir bertanggal kemarin malam: 'Vivienne tahu. Dia menjual sandi rahasia kepada Sindikat demi tiket pelayaran ke Benua Baru. Malam ini dia membawakanku teh. Aku tahu apa yang ada di dalam cangkir itu.'",
          "zh": "细读昨夜最后那行凌乱的字迹：‘薇薇安知晓了一切。她将密文出卖给辛迪加，换取前往新大陆的船票。今晚她给我端来了红茶。我心知肚明那杯子里装着什么。’",
          "ja": "昨晩の日付の最後の記録を見ろ：『ヴィヴィアンは知っている。彼女は新大陸への渡航証と引き換えに暗号をシンジケートへ売った。今夜彼女は紅茶を持ってくる。そのカップに何が入っているか、私には分かっている。』",
          "ko": "어젯밤 날짜로 적힌 마지막 기록을 보십시오. '비비안이 알고 있다. 그녀는 신대륙으로 가는 뱃삯을 위해 암호표를 신디케이트에 팔아넘겼다. 오늘 밤 그녀가 차를 가져온다. 잔 속에 무엇이 들었는지 나는 알고 있다.'",
          "es": "Mira la última entrada de anoche: 'Vivienne lo sabe. Vendió la clave al Sindicato. Esta noche me trae té. Sé qué hay en la taza'.",
          "fr": "Lisez la dernière entrée : 'Vivienne sait. Elle a vendu le chiffre au Syndicat. Ce soir, elle m'apporte le thé. Je sais ce qu'il y a dans la tasse.'",
          "de": "Sieh dir den letzten Eintrag an: 'Vivienne weiß es. Sie verkaufte die Chiffre ans Syndikat. Heute Nacht bringt sie Tee. Ich weiß, was in der Tasse ist.'",
          "ru": "Взгляни на последнюю запись: «Вивьен знает. Она продала шифр Синдикату. Сегодня она несет мне чай. Я знаю, что в чашке».",
          "it": "Guarda l'ultima annotazione: 'Vivienne sa. Ha venduto il cifrario al Sindacato. Stasera mi porta il tè. So cosa c'è nella tazza'.",
          "pt": "Veja a última anotação: 'Vivienne sabe. Vendeu a cifra ao Sindicato. Esta noite ela me traz chá. Eu sei o que há na xícara'.",
          "ar": "انظر إلى التدوينة الأخيرة المؤرخة ليلة أمس: 'فيفيان تعلم. باعت الشفرة للنقابة. الليلة تقدم لي الشاي وأعلم جيدًا ما في الكأس'."
        }
      }
    ]
  },
  "madame_dialogue_start": {
    "speaker": {
      "en": "Madame Vivienne Vance",
      "id": "Nyonya Vivienne Vance",
      "zh": "薇薇安·梵斯夫人",
      "ja": "ヴィヴィアン・ヴァンス夫人",
      "ko": "비비안 밴스 부인",
      "es": "Madame Vivienne Vance",
      "fr": "Madame Vivienne Vance",
      "de": "Madame Vivienne Vance",
      "ru": "Мадам Вивьен Вэнс",
      "it": "Madame Vivienne Vance",
      "pt": "Madame Vivienne Vance",
      "ar": "السيدة فيفيان فانس"
    },
    "text": {
      "en": "Madame Vance turns slowly. Her face is pale as alabaster, framed by wet raven curls and a black silk veil. 'Are you the investigator? You look... unraveled, Detective. Did you come here to solve Aurelia's death, or merely to gawk at our ruin?'",
      "id": "Nyonya Vance berbalik perlahan. Wajahnya sepucat marmer, dibingkai rambut hitam basah dan kerudung sutra hitam. 'Apakah kamu sang penyelidik? Kamu tampak... berantakan, Detektif. Apakah kamu datang untuk memecahkan kematian Aurelia, atau sekadar menonton kehancuran kami?'",
      "zh": "梵斯夫人缓缓转过身来。她的面容苍白如汉白玉雕像，湿漉漉的乌黑卷发隐没在一袭黑色薄纱之后。“你就是探长？你看上去……快要崩溃了，警官。你是来查清奥蕾莉亚的死因，还是纯粹来冷眼旁观我们的破败？”",
      "ja": "ヴァンス夫人がゆっくりと振り返る。漆黒のベールに包まれた顔は白磁のように冷たい。「あなたが捜査官？ずいぶんと……擦り切れたお姿ね、刑事さん。オレリアの死を解きに来たの？それとも私たちの破滅を覗き見に来たの？」",
      "ko": "밴스 부인이 천천히 돌아섭니다. 검은 면사포 너머의 얼굴은 대리석처럼 창백합니다. '당신이 수사관인가요? 꽤나... 망가진 꼴이군요, 형사님. 오렐리아의 죽음을 밝히러 오셨나요, 아니면 우리 집안의 파멸을 구경하러 오셨나요?'",
      "es": "Madame Vance se gira despacio. Su rostro es pálido como el alabastro bajo su velo negro. '¿Es usted el investigador? Parece... desmoronado, detective. ¿Vino a resolver la muerte de Aurelia o sólo a contemplar nuestra ruina?'",
      "fr": "Madame Vance se tourne lentement. Son visage est pâle comme l'albâtre sous son voile de crêpe. 'Êtes-vous l'enquêteur ? Vous semblez... en lambeaux, Inspecteur. Venez-vous élucider la mort d'Aurelia ou contempler nos ruines ?'",
      "de": "Madame Vance dreht sich langsam um. Ihr Gesicht ist wächsern unter dem schwarzen Schleier. 'Sind Sie der Ermittler? Sie wirken... zerrüttet, Detective. Kamen Sie, um Aurelias Tod aufzuklären, oder gaffen Sie nur auf unseren Ruin?'",
      "ru": "Мадам Вэнс медленно поворачивается. Ее лицо бледно, как алебастр, под черной вуалью. «Вы следователь? Вы выглядите... изможденным, детектив. Пришли раскрыть смерть Аурелии или поглазеть на наше крушение?»",
      "it": "Madame Vance si volta lentamente. Il suo viso è pallido come l'alabastro sotto il velo nero. 'È lei l'investigatore? Sembra... a pezzi, detective. È venuto a risolvere la morte di Aurelia o solo a contemplare la nostra rovina?'",
      "pt": "Madame Vance vira-se devagar. O rosto é pálido sob o véu negro de seda. 'Você é o investigador? Parece... em frangalhos, detetive. Veio resolver a morte de Aurelia ou apenas contemplar nossa ruína?'",
      "ar": "تلتفت السيدة فانس ببطء، وجهها شاحب كالرخام تحت وشاحها الحريري الأسود: 'هل أنت المحقق؟ تبدو... ممزقًا ومشتتًا يا حضرة المحقق. هل جئت لكشف حقيقة موت أوريليا أم لمجرد التفرج على خرابنا؟'"
    },
    "voices": [
      {
        "voice": {
          "en": "Elysia",
          "id": "Elysia",
          "zh": "灵觉",
          "ja": "秘教感応",
          "ko": "초월감각",
          "es": "Elisya",
          "fr": "Élysia",
          "de": "Elysia",
          "ru": "Элизия",
          "it": "Elysia",
          "pt": "Elísia",
          "ar": "إليسيا"
        },
        "badge": {
          "en": "ELYSIA [Psyche]",
          "id": "ELYSIA [Kejiwaan]",
          "zh": "灵觉 [心智]",
          "ja": "霊感 [精神]",
          "ko": "초월 [정신]",
          "es": "ELYSIA [Psique]",
          "fr": "ÉLYSIA [Psyché]",
          "de": "ELYSIA [Psyche]",
          "ru": "ЭЛИЗИЯ [Психика]",
          "it": "ELYSIA [Psiche]",
          "pt": "ELÍSIA [Psique]",
          "ar": "إليسيا [النفس]"
        },
        "text": {
          "en": "Her grief is a performance. Beneath the mourning crepe, her pulse is steady, rhythmic, almost mechanical. Like she is reciting lines she rehearsed in front of a dressing room mirror for a month.",
          "id": "Kesedihannya hanyalah sandiwara. Di balik kerudung dukanya, denyut nadinya stabil dan teratur, nyaris mekanis. Seperti menghafal naskah yang telah ia latih di depan cermin selama sebulan penuh.",
          "zh": "她的悲伤是一场精湛的剧场演出。在黑纱之下，她的脉搏平稳沉静，规律得宛如机械。就像一个在试衣间镜子前整整排练了一个月台词的职业演员。",
          "ja": "彼女の悲哀は完璧な演技だ。喪服の奥で脈拍は時計仕掛けのように規則正しく打っている。1ヶ月間鏡の前で練習した台詞を朗読しているかのようだ。",
          "ko": "부인의 슬픔은 잘 짜인 연극입니다. 검은 상복 아래 그녀의 맥박은 기계처럼 규칙적으로 뛰고 있습니다. 한 달 내내 거울 앞에서 연습한 대사를 읊는 배우처럼요.",
          "es": "Su dolor es una actuación. Su pulso es rítmico, casi mecánico. Como si recitara líneas ensayadas ante el espejo durante un mes.",
          "fr": "Son chagrin est une mise en scène. Son pouls est régulier, presque mécanique. Comme si elle récitait un rôle répété devant sa glace depuis un mois.",
          "de": "Ihre Trauer ist eine Inszenierung. Ihr Puls geht ruhig und mechanisch wie ein Uhrwerk. Sie sagt Verse auf, die sie wochenlang vorm Spiegel probte.",
          "ru": "Ее скорбь — отрепетированный спектакль. Пульс под вуалью ровный, почти механический. Будто она читает текст, заученный перед зеркалом.",
          "it": "Il suo dolore è una recita. Il suo polso è calmo, ritmico, quasi meccanico. Come se stesse recitando battute provate allo specchio per un mese.",
          "pt": "O luto dela é uma encenação. O pulso é compassado, mecânico. Como se recitasse falas ensaiadas diante do espelho por um mês.",
          "ar": "حزنها مجرد تمثيلية بارعة. تحت وشاح الحداد، نبضها منتظم وهادئ كدقات ساعة، وكأنها تتلو نصوصًا تدربت عليها أمام مرآتها لشهر كامل."
        }
      }
    ],
    "options": [
      {
        "id": "\"Di mana Anda berada pada pukul 03:42 dini hari saat jam menara berhenti?\"",
        "en": "\"Where were you at 03:42 AM when the tower clock stopped?\"",
        "zh": "“凌晨03:42分大钟骤停时，你究竟身在何处？”",
        "ja": "「時計塔が止まった午前3時42分、お前はどこにいた？」",
        "ko": "\"탑 시계가 멈춘 새벽 03시 42분에 부인은 어디 계셨습니까?\"",
        "es": "\"¿Dónde estaba usted a las 03:42 cuando se detuvo el reloj de la torre?\"",
        "fr": "\"Où étiez-vous à 03h42 quand l'horloge s'est arrêtée ?\"",
        "de": "\"Wo waren Sie um 03:42 Uhr, als die Turmuhr stoppte?\"",
        "ru": "«Где вы были в 03:42, когда часы на башне остановились?»",
        "it": "\"Dov'era alle 03:42 quando l'orologio della torre si è fermato?\"",
        "pt": "\"Onde você estava às 03:42 quando o relógio da torre parou?\"",
        "ar": "\"أين كنت في تمام الساعة 03:42 فجرًا عندما توقفت ساعة البرج؟\""
      },
      {
        "id": "[EMPATI - Sedang 10] \"Anda tidak pernah mencintainya, bukan, Nyonya?\"",
        "en": "[EMPATHY - Medium 10] \"You did not love her, did you, Madame?\"",
        "zh": "【共情 - 难度 10】“你其实从未深爱过她，对吗，夫人？”",
        "ja": "【共感 - 難易度 10】「彼女を愛してなどいなかったのだろう、マダム？」",
        "ko": "[공감 - 보통 10] \"부인은 그녀를 사랑하지 않았군요, 그렇지 않습니까?\"",
        "es": "[EMPATÍA - Medio 10] \"No la amaba, ¿verdad, Madame?\"",
        "fr": "[EMPATHIE - Moyen 10] \"Vous ne l'aimiez pas, n'est-ce pas, Madame ?\"",
        "de": "[EMPATHIE - Mittel 10] \"Sie haben sie nie geliebt, nicht wahr, Madame?\"",
        "ru": "[ЭМПАТИЯ - Сложность 10] «Вы ведь никогда не любили ее, мадам?»",
        "it": "[EMPATIA - Medio 10] \"Non l'amava affatto, vero, Madame?\"",
        "pt": "[EMPATIA - Médio 10] \"Você não a amava, não é, Madame?\"",
        "ar": "[التعاطف - متوسط 10] \"لم تكوني تحبينها على الإطلاق، أليس كذلك يا سيدتي؟\""
      },
      {
        "id": "[UJI MERAH] [OTORITAS - Sulit 13] \"Cukup sandiwaranya, Vivienne. Kami menemukan bidak ratu catur beracun dan sobekan beludru dari mantelmu di balkon. Kamulah yang membunuhnya.\"",
        "en": "[RED CHECK] [AUTHORITY - Challenging 13] \"Enough theatrics, Vivienne. We found the poisoned chess queen and the torn velvet from your coat on the balcony. You murdered her.\"",
        "zh": "【红色检定】【威信 - 困难 13】“够了，收起你的拙劣演戏吧，薇薇安。我们在露台搜出了涂毒的黑王后棋子和从你大衣上撕裂的丝绒碎布。是你亲手谋杀了她！”",
        "ja": "【レッドチェック】【威信 - 難度 13】「茶番劇は終わりだ、ヴィヴィアン。毒入りのクイーンの駒も、バルコニーで見つかったお前のコートのビロードも揃っている。お前が彼女を殺したんだ。」",
        "ko": "[레드 체크] [권위 - 어려움 13] \"연극은 그만두시오, 비비안. 독이 묻은 체스 퀸과 발코니에서 뜯겨나간 외투의 벨벳 조각을 찾아냈소. 당신이 그녀를 살해했소.\"",
        "es": "[CHEQUEO ROJO] [AUTORIDAD - Desafiante 13] \"Basta de teatro, Vivienne. Hallamos la reina envenenada y el terciopelo desgarrado de su abrigo. Usted la asesinó.\"",
        "fr": "[TEST ROUGE] [AUTORITÉ - Difficile 13] \"Assez de comédie, Vivienne. Nous avons retrouvé la reine empoisonnée et le velours de votre manteau. Vous l'avez tuée.\"",
        "de": "[ROTER CHECK] [AUTORITÄT - Schwer 13] \"Genug des Theaters, Vivienne. Wir haben die vergiftete Schachkönigin und den Samt Ihres Mantels gefunden. Sie haben sie ermordet.\"",
        "ru": "[КРАСНАЯ ПРОВЕРКА] [АВТОРИТЕТ - Сложность 13] «Хватит спектаклей, Вивьен. Мы нашли отравленного ферзя и лоскут бархата от вашего пальто. Вы ее убили.»",
        "it": "[TEST ROSSO] [AUTORITÀ - Impegnativo 13] \"Basta teatrini, Vivienne. Abbiamo trovato la regina avvelenata e il velluto strappato del suo cappotto. È stata lei.\"",
        "pt": "[TESTE VERMELHO] [AUTORIDADE - Desafiador 13] \"Chega de teatro, Vivienne. Encontramos a rainha envenenada e o veludo rasgado do seu casaco. Você a matou.\"",
        "ar": "[فحص أحمر] [السلطة - صعب 13] \"كفى تمثيلاً يا فيفيان؛ وجدنا ملكة الشطرنج المسمومة وقطعة المخمل الممزقة من معطفك على الشرفة. أنتِ من قتلها.\""
      },
      {
        "id": "[TUDUHAN GEGABAH - Berbahaya] \"Aku tidak butuh bukti, Vivienne! Kamu yang membunuh Aurelia dan aku menangkapmu sekarang juga!\"",
        "en": "[RASH ACCUSATION - Dangerous] \"I don't need evidence, Vivienne! You killed Aurelia and I am arresting you right now!\"",
        "zh": "【鲁莽指控 - 极度危险】“我根本不需要证据，薇薇安！就是你杀了奥蕾莉亚，我现在就要逮捕你！”",
        "ja": "【無謀な告発 - 危険】「証拠など要らん！お前がオレリアを殺したんだ、今すぐ逮捕してやる！」",
        "ko": "[성급한 고발 - 위험] \"증거 따윈 필요 없소, 비비안! 당신이 오렐리아를 죽였고 당장 체포하겠소!\"",
        "es": "[ACUSACIÓN TEMERARIA - Peligroso] \"¡No necesito pruebas, Vivienne! ¡Usted la mató y queda arrestada!\"",
        "fr": "[ACCUSATION TÉMÉRAIRE - Dangereux] \"Je n'ai pas besoin de preuves, Vivienne ! Vous l'avez tuée et je vous arrête !\"",
        "de": "[ÜBEREILTE BESCHULDIGUNG - Gefährlich] \"Ich brauche keine Beweise, Vivienne! Sie werden auf der Stelle verhaftet!\"",
        "ru": "[ОПРОМЕТЧИВОЕ ОБВИНЕНИЕ - Опасно] «Мне не нужны улики, Вивьен! Вы убили ее, и я арестую вас прямо сейчас!»",
        "it": "[ACCUSA AZZARDATA - Pericoloso] \"Non ho bisogno di prove, Vivienne! Lei l'ha uccisa e la arresto subito!\"",
        "pt": "[ACUSAÇÃO PRECIPITADA - Perigoso] \"Não preciso de provas, Vivienne! Você a matou e está presa agora mesmo!\"",
        "ar": "[اتهام متهور - خطير] \"لست بحاجة لأدلة يا فيفيان! أنتِ من قتلت أوريليا وأنا أعتقلك فورًا!\""
      },
      {
        "id": "[Mundur]",
        "en": "[Step away]",
        "zh": "【转身离开】",
        "ja": "【立ち去る】",
        "ko": "[물러선다]",
        "es": "[Apartarse]",
        "fr": "[S'éloigner]",
        "de": "[Wegtreten]",
        "ru": "[Отойти]",
        "it": "[Allontanati]",
        "pt": "[Afastar-se]",
        "ar": "[الابتعاد]"
      }
    ]
  },
  "madame_confession_win": {
    "speaker": {
      "en": "The Breaking of the Ice",
      "id": "Runtuhnya Topeng Keheningan",
      "zh": "坚冰碎裂之时",
      "ja": "仮面の崩壊",
      "ko": "가면의 붕괴",
      "es": "La Máscara se Rompe",
      "fr": "Le Masque se Brise",
      "de": "Das Brechen des Eises",
      "ru": "Крах ледяной маски",
      "it": "La Maschera si Infrange",
      "pt": "A Máscara Cai",
      "ar": "انهيار القناع الجليدي"
    },
    "text": {
      "en": "Madame Vance staggers backward against the stone arch. Tears cut through the powdered chalk on her cheeks. 'Yes! Yes, I gave her the poisoned queen! But do you know what she did when I pressed the needle into her palm? She smiled. She thanked me. She looked into my eyes and said, *The pendulum is already set, Vivienne. Thank you for freeing me from the winding.* She wanted to die! She rigged the clock so the Syndicate would never get their war machine!'",
      "id": "Nyonya Vance terhuyung ke belakang menabrak lengkungan batu. Air mata membelah bedak tebal di pipinya. 'Ya! Ya, aku yang memberikan ratu beracun itu! Tapi tahukah kamu apa yang dia lakukan saat aku menusukkan jarum ke tangannya? Dia tersenyum. Dia berterima kasih padaku! Dia berkata, *Pendulum sudah disetel, Vivienne. Terima kasih telah membebaskanku dari putaran pegas ini.* Dia yang ingin mati! Dia merancang kematiannya agar Sindikat tidak mendapatkan senjata pemusnah mereka!'",
      "zh": "梵斯夫人踉跄后退，单薄的背脊撞在冰冷的石拱门上。滚烫的泪水冲刷过她敷满白粉的双颊。“没错！是我……是我亲手把那枚淬毒黑后递给她的！但你知道当我把毒针刺进她手心时，她做了什么吗？她在微笑！她含着泪谢谢我！她说：‘钟摆已经校准了，薇薇安，谢谢你解开我这具活发条的折磨。’是她自己一心求死！她亲手设计停摆，就是为了不让辛迪加把她的毕生心血制成屠杀工人的战争机器！”",
      "ja": "ヴァンス夫人はよろめき、石のアーチに身を預けた。涙が白粉の頬を濡らす。「そうよ！私が毒のクイーンを渡したわ！でも針を掌に刺した時、彼女がどうしたか知ってる？笑ったのよ。感謝してくれたの！『振り子はもう合わせたわ、ヴィヴィアン。私をこのゼンマイの檻から解放してくれてありがとう』ってね！彼女は死を望んでいたのよ！自分の発明がシンジケートの戦争兵器にされるのを防ぐために！」",
      "ko": "밴스 부인이 휘청거리며 석조 아치 기둥에 몸을 기댑니다. 눈물이 분칠한 뺨을 타고 흘러내립니다. '그래요! 내가 그 독침 퀸을 건넸어요! 하지만 바늘을 손바닥에 찔렀을 때 그녀가 무어라 했는지 아시나요? 웃었어요. 고맙다고 했소! *진자는 이미 맞춰졌어, 비비안. 태엽 감는 삶에서 날 해방해 줘서 고마워.* 그녀는 죽기를 원했던 거예요! 신디케이트가 살인 기계를 손에 넣지 못하게 스스로를 멈춘 거요!'",
      "es": "Madame Vance se tambalea contra el arco de piedra. Las lágrimas surcan sus mejillas. '¡Sí! ¡Yo le di la reina envenenada! Pero cuando clavé la aguja, ella sonrió y dijo: *El péndulo ya está listo, Vivienne. Gracias por liberarme.* ¡Ella quería morir para que el Sindicato no tuviera su arma!'",
      "fr": "Madame Vance vacille contre l'arche de pierre. Des larmes coulent sur sa poudre blanche. 'Oui ! C'est moi qui lui ai donné la reine empoisonnée ! Mais elle a souri en murmurant : *Le balancier est amorcé, Vivienne. Merci de me libérer des rouages.* Elle voulait mourir pour empêcher le Syndicat d'obtenir cette machine de guerre !'",
      "de": "Madame Vance taumelt gegen den Steinbogen. Tränen bahnen sich Wege durch den Puder. 'Ja! Ich gab ihr die giftige Dame! Doch als die Nadel stach, lächelte sie: *Das Pendel ist gestellt, Vivienne. Danke, dass du mich aufziehst.* Sie wollte sterben, damit das Syndikat ihre Kriegsmaschine nicht bekommt!'",
      "ru": "Мадам Вэнс оседает на каменную арку. Слезы текут по напудренным щекам. «Да! Я дала ей отравленного ферзя! Но когда игла вошла в ладонь, она улыбнулась и сказала: *Маятник уже взведен, Вивьен. Спасибо, что избавила меня от завода.* Она сама хотела умереть, чтобы Синдикат не получил орудие войны!»",
      "it": "Madame Vance barcolla contro l'arco di pietra. Le lacrime rigano la cipria. 'Sì! Sono stata io a darle la regina avvelenata! Ma quando l'ago è penetrato, lei ha sorriso: *Il pendolo è pronto, Vivienne. Grazie per avermi liberata.* Voleva morire affinché il Sindacato non avesse l'arma!'",
      "pt": "Madame Vance cambaleia contra o arco de pedra. Lágrimas lavam seu rosto. 'Sim! Fui eu quem deu a rainha envenenada! Mas ela sorriu e disse: *O pêndulo já está regulado, Vivienne. Obrigada por me libertar.* Ela queria morrer para que o Sindicato não ficasse com sua máquina!'",
      "ar": "تترنح السيدة فانس لتسند ظهرها إلى القوس الحجري. تنحدر الدموع فوق مسحوق وجهها الشاحب: 'نعم! أنا من سلمتها قطعة الشطرنج المسمومة! لكن أتعلم ماذا فعلت حين غرست الإبرة في كفها؟ لقد ابتسمت وشكرتني قائلة: *البندول مضبوط بالفعل يا فيفيان، شكرًا لتحريري من دوران التروس.* لقد أرادت الموت لمنع النقابة من تحويل ابتكارها إلى آلة حرب دمار شامل!'"
    },
    "options": [
      {
        "en": "[DELIVER FINAL JUDGMENT: Arrest Madame Vance for Murder Under the Law]",
        "id": "[PUTUSAN AKHIR: Borgol dan Tangkap Vivienne Vance atas Nama Hukum]",
        "zh": "【下达最终裁决：以杀人重罪当场逮捕薇薇安·梵斯】",
        "ja": "【最終審判：法の名のもとにヴィヴィアン・ヴァンスを逮捕する】",
        "ko": "[최종 판결: 법의 이름으로 비비안 밴스를 살인 혐의로 체포한다]",
        "es": "[VEREDICTO FINAL: Arrestar a Madame Vance según la Ley]",
        "fr": "[VERDICT FINAL : Arrêter Madame Vance au nom de la Loi]",
        "de": "[URTEIL: Madame Vance im Namen des Gesetzes verhaften]",
        "ru": "[ПРИГОВОР: Арестовать мадам Вэнс за убийство по букве Закона]",
        "it": "[VERDETTO FINALE: Arresta Madame Vance in nome della Legge]",
        "pt": "[VEREDITO FINAL: Prender Madame Vance em nome da Lei]",
        "ar": "[الحكم النهائي: اعتقال السيدة فيفيان فانس بتهمة القتل بحكم القانون]"
      },
      {
        "en": "[DELIVER FINAL JUDGMENT: Hide the Perpetuum Ledger and Stamp it as Accidental Death]",
        "id": "[PUTUSAN AKHIR: Sembunyikan Buku Besar dan Stempel sebagai Kecelakaan Kerja]",
        "zh": "【下达最终裁决：隐匿机密账簿，赦免遗孀，将此案作为纯粹工伤意外归档】",
        "ja": "【最終審判：秘密台帳を隠蔽し、未亡人を救って労働災害として処理する】",
        "ko": "[최종 판결: 장부를 숨기고 미망인을 방면하며 단순 산재 사고로 종결한다]",
        "es": "[VEREDICTO FINAL: Ocultar el libro mayor y cerrarlo como accidente]",
        "fr": "[VERDICT FINAL : Dissimuler le registre et classer l'affaire en accident]",
        "de": "[URTEIL: Das Hauptbuch verbergen und den Fall als Unfall archivieren]",
        "ru": "[ПРИГОВОР: Скрыть гроссбух и списать гибель на производственную травму]",
        "it": "[VERDETTO FINALE: Nascondi il mastro e archivia come incidente]",
        "pt": "[VEREDITO FINAL: Ocultar o livro-razão e arquivar como acidente]",
        "ar": "[الحكم النهائي: إخفاء دفتر الحسابات وإغلاق القضية كحادث عرضي برحمة]"
      },
      {
        "en": "[DELIVER FINAL JUDGMENT: Expose the Syndicate and Corrupt Police to the Free Press]",
        "id": "[PUTUSAN AKHIR: Bongkar Konspirasi Sindikat & Polisi Korup ke Surat Kabar Rakyat]",
        "zh": "【下达最终裁决：将辛迪加罪证与警局受贿铁证公之于众，掀起风暴】",
        "ja": "【最終審判：シンジケートと警察の癒着を民衆新聞へ告発し、全貌を暴く】",
        "ko": "[최종 판결: 신디케이트와 경찰의 유착을 언론에 폭로하여 혁명을 촉발한다]",
        "es": "[VEREDICTO FINAL: Denunciar al Sindicato y a la policía ante la prensa libre]",
        "fr": "[VERDICT FINAL : Dénoncer le Syndicat et la police corrompue à la presse]",
        "de": "[URTEIL: Das Syndikat und die korrupte Polizei an die freie Presse verraten]",
        "ru": "[ПРИГОВОР: Передать улики на Синдикат и продажную полицию в газеты]",
        "it": "[VERDETTO FINALE: Consegna le prove sulla corruzione del Sindacato alla stampa]",
        "pt": "[VEREDITO FINAL: Expor o Sindicato e a polícia corrupta à imprensa livre]",
        "ar": "[الحكم النهائي: فضح النقابة والشرطة الفاسدة عبر الصحافة المستقلة للرأي العام]"
      }
    ],
    "voices": [
      {
        "voice": {
          "en": "Ratio",
          "id": "Rasio",
          "zh": "理性",
          "ja": "比率",
          "ko": "이성",
          "es": "Razón",
          "fr": "Ratio",
          "de": "Ratio",
          "ru": "Рацио",
          "it": "Ragione",
          "pt": "Razão",
          "ar": "العقلانية"
        },
        "badge": {
          "en": "RATIO [Intellect]",
          "id": "RASIO [Intelek]",
          "zh": "理性 [智力]",
          "ja": "比率 [知性]",
          "ko": "이성 [지성]",
          "es": "RAZÓN [Intelecto]",
          "fr": "RATIO [Intellect]",
          "de": "RATIO [Intellekt]",
          "ru": "РАЦИО [Интеллект]",
          "it": "RAGIONE [Intelletto]",
          "pt": "RAZÃO [Intelecto]",
          "ar": "العقلانية [الفكر]"
        },
        "text": {
          "en": "EPIPHANY. The puzzle is solved. Vance was not a mere victim; she was the orchestrator of her own mechanical suicide pact. She used her partner's vengeance as the final gear in her escapement.",
          "id": "PENCERAHAN LOGIKA. Teka-teki ini terpecahkan. Vance bukan sekadar korban pasif; dia adalah perancang konspirasi mekanis kematiannya sendiri. Dia memanfaatkan dendam pasangannya sebagai roda gigi terakhir dalam mekanisme escapement-nya.",
          "zh": "灵光顿悟！迷局彻底破晓。奥蕾莉亚·梵斯绝非单纯的受害者；她是这场精密机械自戕契约的总导演！她将同伴的复仇执念化作了自己这具致命擒纵钟摆上的最后一枚咬合齿轮！",
          "ja": "啓示！謎はすべて解かれた。ヴァンスは単なる被害者ではなかった。自らの機械的死の契約を仕組んだ演出家だったのだ。パートナーの復讐心を、自身の脱進機の最終ギアとして利用したのだ。",
          "ko": "경이로운 직관. 수수께끼가 마침내 풀렸습니다. 밴스는 단순한 피해자가 아니었습니다. 자신의 죽음을 설계한 기계적 공모자였습니다. 파트너의 복수심을 자신의 탈진기 마지막 톱니바퀴로 이용한 것입니다.",
          "es": "EPIFANÍA. El enigma está resuelto. Vance orquestó su propio pacto de suicidio mecánico, usando la venganza como el último engranaje.",
          "fr": "ÉPIPHANIE. L'énigme est résolue. Vance était l'architecte de son propre pacte suicidaire, utilisant la vengeance comme ultime rouage.",
          "de": "EPIPHANIE. Das Rätsel ist gelöst. Vance orchestrierte ihren eigenen mechanischen Suizid und nutzte Rache als letztes Rädchen im Getriebe.",
          "ru": "ОЗАРЕНИЕ. Головоломка решена. Вэнс спланировала собственную гибель, использовав чужую месть как последнюю шестерню в механизме.",
          "it": "EPIFANIA. Il puzzle è risolto. Vance ha orchestrato il proprio patto suicida meccanico, usando la vendetta come ingranaggio finale.",
          "pt": "EPIFANIA. O enigma está resolvido. Vance orquestrou o próprio pacto de suicídio mecânico, usando a vingança como a engrenagem final.",
          "ar": "إشراق ذهني واستنارة! حُل اللغز بالكامل؛ لم تكن فانس مجرد ضحية، بل نسجت خطة انتحار ميكانيكية استغلت فيها رغبة شريكتها بالانتقام كترس أخير."
        }
      },
      {
        "voice": {
          "en": "Elysia",
          "id": "Elysia",
          "zh": "极乐直觉",
          "ja": "エリシア",
          "ko": "엘리시아",
          "es": "Elysia",
          "fr": "Élysia",
          "de": "Elysia",
          "ru": "Элизия",
          "it": "Elysia",
          "pt": "Elísia",
          "ar": "إليزيا"
        },
        "badge": {
          "en": "ELYSIA [Psyche]",
          "id": "ELYSIA [Kejiwaan]",
          "zh": "极乐直觉 [心智]",
          "ja": "エリシア [精神]",
          "ko": "엘리시아 [심리]",
          "es": "ELYSIA [Psique]",
          "fr": "ÉLYSIA [Psyché]",
          "de": "ELYSIA [Psyche]",
          "ru": "ЭЛИЗИЯ [Психика]",
          "it": "ELYSIA [Psiche]",
          "pt": "ELÍSIA [Psique]",
          "ar": "إليزيا [الروح]"
        },
        "text": {
          "en": "The case is cracked. The rain outside sounds quieter now, like a theater curtain slowly falling over the stage.",
          "id": "Kasus ini telah terpecahkan. Deru hujan di luar kini terdengar lebih tenang, bagai tirai teater yang perlahan turun menutup panggung pertunjukan.",
          "zh": "悬案告破。窗外的暴雨声在此刻悄然轻柔下来，宛如华丽大幕在一出漫长悲剧的舞台上缓缓垂落。",
          "ja": "事件は解決した。外の雨音は今や静まり返り、劇場の幕が舞台へと静かに降りていくかのようだ。",
          "ko": "사건이 해결되었습니다. 바깥의 빗소리가 이제는 한결 차분하게 들려옵니다. 무대 위로 천천히 내려앉는 극장의 장막처럼.",
          "es": "Caso resuelto. La lluvia afuera suena más suave, como un telón que cae sobre el escenario.",
          "fr": "L'affaire est résolue. La pluie semble plus douce dehors, comme un rideau qui tombe sur la scène.",
          "de": "Der Fall ist gelöst. Der Regen draußen klingt nun sanfter, wie ein Theatervorhang, der langsam fällt.",
          "ru": "Дело раскрыто. Шум дождя за окном стихает, словно занавес медленно опускается на сцену.",
          "it": "Il caso è chiuso. La pioggia fuori sembra più sommessa, come un sipario che cala sul palcoscenico.",
          "pt": "Caso encerrado. A chuva lá fora soa mais branda, como uma cortina caindo lentamente sobre o palco.",
          "ar": "أُغلقت القضية وحُلت خيوطها، وبات صوت المطر في الخارج خافتًا كستار مسرحي يسدل بهدوء على خشبة العرض."
        }
      }
    ]
  },
  "ending_arrest": {
    "speaker": {
      "en": "The Letter of the Law",
      "id": "Hukum yang Kaku & Dingin",
      "zh": "律法铁腕之裁",
      "ja": "厳格なる法の執行",
      "ko": "차가운 법의 집행",
      "es": "La Letra de la Ley",
      "fr": "La Lettre de la Loi",
      "de": "Der Buchstabe des Gesetzes",
      "ru": "Буква Закона",
      "it": "La Lettera della Legge",
      "pt": "A Letra da Lei",
      "ar": "حرفية القانون الصارم"
    },
    "text": {
      "en": "You snap the cold steel manacles around Vivienne Vance's wrists. Inspector Graves stares in awe and grudging respect as you hand him the poisoned ivory queen. The law has been served. Tomorrow the newspapers will proclaim the brilliance of Precinct 4. But as you walk down into the rain, you wonder if justice was truly done to a woman whose soul died thirty years ago.",
      "id": "Kamu memasang borgol baja dingin di pergelangan tangan Vivienne Vance. Inspektur Graves menatap takjub bercampur hormat saat kamu menyerahkan ratu gading beracun itu kepadanya. Hukum telah ditegakkan. Besok koran akan memuji kehebatan Distrik 4. Namun saat melangkah ke dalam hujan, kamu bertanya-tanya apakah keadilan benar-benar terwujud bagi wanita yang jiwanya telah mati tiga puluh tahun lalu.",
      "zh": "你将冰冷的精钢手铐扣在薇薇安·梵斯纤细的手腕上。格雷夫斯警探接过淬毒象牙黑后时，眼中流露出惊异与由衷的敬畏。法律得到了伸张，明早的各大报纸头条必将盛赞第四警区的神勇。但当你独自走入寒雨中时，心头却不禁自问：对一个灵魂早在三十年前就已死去的女人而言，这算得上真正的正义吗？",
      "ja": "冷たい鋼鉄の手錠をヴィヴィアン・ヴァンスの手首に嵌めた。毒針のクイーンを受け取ったグレイヴス警部は、驚嘆と敬意の眼差しを向けた。法は守られた。明日の朝刊は第4分署の手柄を大々的に報じるだろう。だが冷雨の中を歩きながら、あなたは自問する――30年前にすでに魂が死んでいた女に対して、これが本当に正義だったのかと。",
      "ko": "비비안 밴스의 손목에 차가운 강철 수갑을 채웁니다. 그레이브스 형사는 독침 퀸을 건네받으며 경외 어린 시선으로 당신을 바라봅니다. 법은 집행되었습니다. 내일 아침 조간신문은 제4관할서의 눈부신 활약을 대서특필할 것입니다. 하지만 빗속을 걸어 내려가며 당신은 스스로에게 묻습니다. 30년 전에 이미 영혼이 죽어버린 여인에게, 이것이 과จริง 정의였는지를.",
      "es": "Colocas las esposas de acero en las muñecas de Vivienne. Graves te mira con respeto al recibir la reina envenenada. La ley se ha cumplido. Los periódicos elogiarán al Distrito 4, pero te preguntas si se ha hecho justicia a un alma muerta hace treinta años.",
      "fr": "Vous refermez les fers glacés sur les poignets de Vivienne. Graves vous observe avec un respect mêlé de crainte. La loi a triomphé. Mais en descendant sous la pluie, vous vous demandez si justice a vraiment été rendue à une femme brisée depuis trente ans.",
      "de": "Sie legen Vivienne die Handschellen an. Graves blickt Sie mit Respekt an, als Sie die giftige Dame übergeben. Das Gesetz hat gesiegt. Doch im Regen fragen Sie sich, ob einer Frau Gerechtigkeit widerfahren ist, deren Seele vor dreißig Jahren starb.",
      "ru": "Вы защелкиваете стальные наручники на запястьях Вивьен. Грейвс с благоговением принимает отравленного ферзя. Закон восторжествовал. Но спускаясь под холодный дождь, вы думаете: свершилось ли правосудие над женщиной, чья душа умерла тридцать лет назад?",
      "it": "Stringi le manette d'acciaio ai polsi di Vivienne. Graves ti guarda con rispetto reverenziale. La legge è stata applicata. Ma scendendo nella pioggia ti chiedi se sia stata davvero fatta giustizia a un'anima morta trent'anni prima.",
      "pt": "Você fecha as algemas frias nos pulsos de Vivienne. Graves olha com respeito relutante ao receber a rainha envenenada. A lei foi cumprida, mas você se pergunta se houve justiça para uma mulher cuja alma morreu há trinta anos.",
      "ar": "تطبق الأصفاد الفولاذية الباردة حول معصمي فيفيان فانس. ينظر المفتش غريفز بإجلال واحترام وهو يتسلم قطعة الشطرنج المسمومة. لقد نُفذ القانون، وغدًا ستشيد الصحف بعبقرية المنطقة 4، لكنك تتساءل في صمت تحت المطر إن كانت هذه عدالة حقيقية لامرأة ماتت روحها قبل ثلاثين عامًا."
    },
    "options": [
      {
        "en": "[CASE CONCLUDED: View Final Case Dossier]",
        "id": "[KASUS SELESAI: Lihat Ringkasan Akhir Dossier]",
        "zh": "【案情终结：查阅终卷档案与调查总结】",
        "ja": "【事件解決：最終事件調書を閲覧する】",
        "ko": "[사건 종결: 최종 사건 기록부 열람]",
        "es": "[CASO CONCLUIDO: Ver expediente final]",
        "fr": "[AFFAIRE CLASSÉE : Consulter le dossier final]",
        "de": "[FALL GELÖST: Abschlussbericht ansehen]",
        "ru": "[ДЕЛО ЗАКРЫТО: Просмотреть итоговое досье]",
        "it": "[CASO CONCLUSO: Visualizza il dossier finale]",
        "pt": "[CASO CONCLUÍDO: Ver dossiê final do caso]",
        "ar": "[القضية أغلقت: استعراض ملف القضية النهائي]"
      }
    ]
  },
  "ending_coverup": {
    "speaker": {
      "en": "The Sovereign Bureaucrat",
      "id": "Sang Penentu Keadilan Moral",
      "zh": "隐秘主权官僚",
      "ja": "至高なる調停者",
      "ko": "자비로운 조율자",
      "es": "El Burócrata Soberano",
      "fr": "Le Burocrate Souverain",
      "de": "Der Souveräne Bürokrat",
      "ru": "Властелин милосердия",
      "it": "Il Burocrate Sovrano",
      "pt": "O Burocrata Soberano",
      "ar": "مهندس الرحمة والعدالة"
    },
    "text": {
      "en": "You slide the Perpetuum Ledger into your inner coat pocket and slip the cyanide ampoule into your pocket. You look Graves in the eye and say, 'Industrial grease on the catwalk. Aurelia slipped. Stamp the papers.' Vivienne looks at you through her veil with tears of disbelief. You walk out into the dawn of District 7, not as an officer of the law, but as an architect of mercy.",
      "id": "Kamu menyelipkan Buku Besar Perpetuum dan ampul sianida ke dalam saku mantel dalammu. Kamu menatap mata Graves dan berkata: 'Minyak mesin pada titian. Aurelia terpeleset murni kecelakaan. Stempel berkasnya.' Vivienne menatapmu dari balik kerudungnya dengan air mata kelegaan yang tak terkatakan. Kamu melangkah keluar menyambut fajar Distrik 7, bukan sebagai budak hukum tertulis, melainkan sebagai penentu belas kasih.",
      "zh": "你将那份足以引发城市地震的《永动机总账簿》滑入风衣内袋，悄然收起剧毒安瓿。你直视格雷夫斯的眼睛沉声说道：“是走廊上的工业机油。奥蕾莉亚纯属失足意外。盖章结案吧。”薇薇安隔着黑纱泪流满面，难以置信地注视着你。你大步迈入第七区初升的晨光中——此时此刻，你不再是死板条文的附庸，而是执掌宽恕与仁慈的命运裁决者。",
      "ja": "永久機関の秘密台帳と青酸アンプルをコートの内ポケットへ滑り込ませた。グレイヴスの目をまっすぐ見つめ、「通路の機械油だ。オレリアは足を滑らせた事故死。書類に判を押せ」と言い放つ。ヴィヴィアンは信じられない面持ちで涙を流した。あなたは第7区の夜明けの中へと歩き出す。単なる警察官としてではなく、慈悲の設計者として。",
      "ko": "영구기관 비밀 장부와 청산가리 앰플을 코트 안주머니에 조용히 찔러 넣습니다. 그레이브스의 눈을 똑바로 응시하며 말합니다. '통로에 묻은 기계 기름 때문이오. 오렐리아는 발을 헛디뎌 추락했소. 도장 찍으시오.' 비비안이 눈물을 흘리며 멍하니 바라봅니다. 당신은 제7구역의 새벽빛을 향해 걸어 나갑니다. 융통성 없는 법의 집행자가 아니라, 자비의 설계자로서.",
      "es": "Guardas el libro mayor y la ampolla en tu abrigo. Miras a Graves a los ojos: 'Grasa industrial en la pasarela. Accidente. Sella los papeles.' Vivienne llora de alivio. Sales al amanecer del Distrito 7, no como un autómata de la ley, sino como un arquitecto de la piedad.",
      "fr": "Vous glissez le registre et l'ampoule dans votre manteau. Vous fixez Graves : 'Graisse industrielle. Chute accidentelle. Tamponnez.' Vivienne pleure de reconnaissance. Vous marchez vers l'aube du District 7, non comme un pion de la loi, mais comme un artisan de miséricorde.",
      "de": "Sie stecken das Hauptbuch und die Giftampulle ein. Sie sehen Graves an: 'Maschinenfett auf dem Steg. Reiner Unfall. Stempeln Sie es ab.' Vivienne weint vor Dankbarkeit. Sie treten in den Morgen von Bezirk 7 – nicht als Diener des Gesetzes, sondern als Architekt der Gnade.",
      "ru": "Вы прячете гроссбух во внутренний карман пальто. Вы смотрите Грейвсу прямо в глаза: «Машинное масло на мостках. Несчастный случай. Ставь штамп». Вивьен плачет от благодарности. Вы выходите в рассвет 7-го района не просто слугой закона, а вершителем милосердия.",
      "it": "Inscatoli il mastro e l'ampolla nel cappotto. Fissi Graves: 'Olio sui camminamenti. Morte accidentale. Metti il timbro.' Vivienne piange di sollievo. Esci verso l'alba del Distretto 7, non come servo della legge, ma come architetto di misericordia.",
      "pt": "Você guarda o livro-razão no casaco e encara Graves: 'Graxa na passarela. Acidente. Carimbe os papéis.' Vivienne chora de alívio. Você caminha para a aurora do Distrito 7 como um arquiteto da misericórdia.",
      "ar": "تدس دفتر الحسابات وأمبول السم في جيب معطفك الداخلي. تنظر في عيني غريفز بثبات وتقول: 'شحم ماكينات على الممر، أوريليا انزلقت وماتت بحادث عرضي. اختم الأوراق.' تنهمر دموع فيفيان ممتنة. تمضي نحو فجر المنطقة 7 لا كعبد للنصوص الميتة، بل كمهندس للرحمة الحقيقية."
    },
    "options": [
      {
        "en": "[CASE CONCLUDED: View Final Case Dossier]",
        "id": "[KASUS SELESAI: Lihat Ringkasan Akhir Dossier]",
        "zh": "【案情终结：查阅终卷档案与调查总结】",
        "ja": "【事件解決：最終事件調書を閲覧する】",
        "ko": "[사건 종결: 최종 사건 기록부 열람]",
        "es": "[CASO CONCLUIDO: Ver expediente final]",
        "fr": "[AFFAIRE CLASSÉE : Consulter le dossier final]",
        "de": "[FALL GELÖST: Abschlussbericht ansehen]",
        "ru": "[ДЕЛО ЗАКРЫТО: Просмотреть итоговое досье]",
        "it": "[CASO CONCLUSO: Visualizza il dossier finale]",
        "pt": "[CASO CONCLUÍDO: Ver dossiê final do caso]",
        "ar": "[القضية أغلقت: استعراض ملف القضية النهائي]"
      }
    ]
  },
  "ending_syndicate_bust": {
    "speaker": {
      "en": "The Revolutionary Firebrand",
      "id": "Api Revolusi Rakyat",
      "zh": "燎原革命者",
      "ja": "革命の烽火",
      "ko": "혁명의 불꽃",
      "es": "La Chispa Revolucionaria",
      "fr": "L'Étincelle Révolutionnaire",
      "de": "Der Revolutionäre Funke",
      "ru": "Искра Революции",
      "it": "La Scintilla Rivoluzionaria",
      "pt": "A Faísca Revolucionária",
      "ar": "شعلة الثورة الشعبية"
    },
    "text": {
      "en": "You refuse Graves's bribes and Vivienne's fatalism. At dawn, you hand the Perpetuum Ledger and the Syndicate bribery slips directly to the clandestine printing press of the District 7 Worker's Union. By midday, 50,000 gazettes hit the cobblestones. The corrupt precinct captain is ousted, the cartel's factories are paralyzed by general strike, and the truth of Aurelia Vance becomes an indelible spark of liberation.",
      "id": "Kamu menolak suap Graves maupun kepasrahan Vivienne. Saat fajar menyingsing, kamu menyerahkan Buku Besar Perpetuum dan bukti suap langsung ke percetakan gelap Serikat Buruh Distrik 7. Tengah hari, 50.000 surat kabar membanjiri jalanan. Kapten korup digulingkan, pabrik kartel dilumpuhkan oleh pemogokan massal, dan kebenaran Aurelia Vance menjadi martir pembebasan rakyat.",
      "zh": "你断然拒绝了格雷夫斯的分赃诱惑，也拒绝了薇薇安悲观的宿命论。黎明时分，你将《永动机总账簿》与警局受贿底单亲手递交给了第七区工人联合会的秘密地下印刷所。正午未至，五万份号外特刊铺天盖地撒满石板路！腐败的警长被当场革职查办，辛迪加财阀的军工流水线在全市总罢工中彻底瘫痪。奥蕾莉亚·梵斯的真相，化作了唤醒整座沉睡工业之城的燎原烈火！",
      "ja": "あなたはグレイヴスの賄賂もヴィヴィアンの諦念も拒絶した。夜明け、永久機関の台帳と警官汚職の証拠を第7区労働組合の地下印刷所へ直接持ち込んだ。正午には5万部の号外が街中に撒かれ、腐敗した警察署長は失脚、シンジケートの兵器工場はゼネストで完全に麻痺した。オレリアの死は、解放への消えぬ火花となった。",
      "ko": "당신은 그레이브스의 회유도, 비비안의 패배주의도 거부했습니다. 동틀 녘, 당신은 영구기관 장부와 경찰 수뇌부 수뢰 내역을 제7구역 노동조합의 지하 인쇄소로 직접 넘겼습니다. 정오가 되자 5만 부의 호외가 거리를 뒤덮었습니다. 부패한 서장은 쫓겨났고, 카르텔 공장은 총파업으로 마비되었으며, 오렐리아 밴스의 진실은 거대한 해방의 불씨가 되었습니다.",
      "es": "Rechazas los sobornos y el fatalismo. Al alba entregas los libros a la prensa clandestina del Sindicato de Trabajadores. Al mediodía, 50.000 periódicos inundan las calles. El capitán corrupto es destituido y las fábricas del cartel son paralizadas por la huelga.",
      "fr": "Vous refusez les pots-de-vin et le fatalisme. À l'aube, vous remettez les registres à l'imprimerie clandestine des travailleurs. À midi, 50 000 journaux inondent la ville. Le commissaire corrompu est déchu et la grève générale paralyse le cartel.",
      "de": "Sie verweigern Schmiergelder und Fatalismus. Im Morgengrauen übergeben Sie das Hauptbuch der Gewerkschaftspresse. Am Mittag überfluten 50.000 Sonderblätter die Straßen. Der korrupte Polizeichef stürzt und die Fabriken stehen still.",
      "ru": "Вы отвергаете взятки и фатализм. На рассвете вы передаете гроссбух в подпольную типографию профсоюза рабочих. К полудню 50 000 листовок наводняют город. Коррумпированное начальство смещено, заводы бастуют, а правда об Аурелии Вэнс зажигает восстание.",
      "it": "Rifiuti le tangenti e il fatalismo. All'alba consegni i registri alla tipografia clandestina del sindacato operaio. A mezzogiorno 50.000 copie inondano la città, il capitano corrotto cade e lo sciopero generale paralizza il cartello.",
      "pt": "Você rejeita o suborno e o fatalismo. Ao amanhecer entrega os livros à imprensa clandestina dos trabalhadores. Ao meio-dia 50.000 jornais cobrem a cidade, o capitão corrupto é deposto e a greve geral paralisa o cartel.",
      "ar": "ترفض رشاوى غريفز وقدرية فيفيان. عند الفجر، تسلم دفتر الحسابات وملفات الفساد إلى المطبعة السرية لنقابة عمال المنطقة 7. بحلول الظهيرة، تنتشر خمسون ألف صحيفة في الشوارع، ويُطاح بالقادة الفاسدين وتشل مصانع الكارتل بإضراب عام تاريخي."
    },
    "options": [
      {
        "en": "[CASE CONCLUDED: View Final Case Dossier]",
        "id": "[KASUS SELESAI: Lihat Ringkasan Akhir Dossier]",
        "zh": "【案情终结：查阅终卷档案与调查总结】",
        "ja": "【事件解決：最終事件調書を閲覧する】",
        "ko": "[사건 종결: 최종 사건 기록부 열람]",
        "es": "[CASO CONCLUIDO: Ver expediente final]",
        "fr": "[AFFAIRE CLASSÉE : Consulter le dossier final]",
        "de": "[FALL GELÖST: Abschlussbericht ansehen]",
        "ru": "[ДЕЛО ЗАКРЫТО: Просмотреть итоговое досье]",
        "it": "[CASO CONCLUSO: Visualizza il dossier finale]",
        "pt": "[CASO CONCLUÍDO: Ver dossiê final do caso]",
        "ar": "[القضية أغلقت: استعراض ملف القضية النهائي]"
      }
    ]
  },
  "graves_rhetoric_fail": {
    "speaker": {
      "en": "Inspector Graves",
      "id": "Inspektur Graves",
      "zh": "格雷夫斯警探",
      "ja": "グレイヴス警部",
      "ko": "그레이브스 형사",
      "es": "Inspector Graves",
      "fr": "Inspecteur Graves",
      "de": "Inspektor Graves",
      "ru": "Инспектор Грейвс",
      "it": "Ispettore Graves",
      "pt": "Inspetor Graves",
      "ar": "المفتش غريفز"
    },
    "text": {
      "en": "Graves laughs harshly, coughing into his fist. 'Don't play grand interrogator with me, partner. You don't even remember your own badge number after last night's binge. Check the body or let me do my job.'",
      "id": "Graves tertawa getir sambil batuk. 'Jangan sok jadi detektif agung di depanku, sobat. Nomor lencanamu saja kamu lupa setelah mabuk semalam. Periksa mayat itu atau biarkan aku yang bekerja.'",
      "zh": "格雷夫斯冷笑一声，握拳咳嗽。“别在我面前装大审讯官了，搭档。昨晚狂喝之后你连自己警徽号都记不清了吧？去查尸体，不然就别挡着我办公。”",
      "ja": "グレイヴスは冷笑し、咳き込んだ。「偉そうに尋問官気取るんじゃねえ。昨夜の酒でバッジ番号も忘れたくせに。遺体を調べるか、邪魔するな。」",
      "ko": "그레이브스는 헛기침하며 비웃었습니다. '위대한 심문관 흉내 내지 마시오. 어젯밤 술로 배지 번호도 까먹었으면서. 시체나 보든가 방해 말든가 하시오.'",
      "es": "Graves se ríe con aspereza tosiendo en su puño. 'No te hagas el gran inquisidor. Ni recuerdas tu placa tras la borrachera. Revisa el cadáver o déjame trabajar.'",
      "fr": "Graves ricane et tousse dans son poing. 'Ne jouez pas les inquisiteurs. Vous ignorez votre matricule après votre cuite. Examinez le corps ou laissez-moi faire.'",
      "de": "Graves lacht heiser in die Faust. 'Spielen Sie nicht den Großinquisitor. Nach dem Rausch wissen Sie nicht mal Ihre Dienstnummer. Prüfen Sie die Leiche oder lassen Sie mich arbeiten.'",
      "ru": "Грейвс резко усмехается и кашляет в кулак. «Не строй из себя следователя. После пьянки ты свой жетон не помнишь. Осматривай труп или не мешай.»",
      "it": "Graves ride aspramente tossendo nel pugno. 'Non fare il grande inquisitore. Non ricordi la matricola dopo la sbronza. Esamina il cadavere o lasciami fare.'",
      "pt": "Graves ri com aspereza tossindo no punho. 'Não se faça de grande inquisidor. Nem lembra sua placa após a bebedeira. Examine o corpo ou deixe-me trabalhar.'",
      "ar": "ضحك غريفز باستهزاء وسعل في قبضته: 'لا تمارس دور المحقق العظيم، فأنت لا تذكر رقم شارتك بعد خمر البارحة! افحص الجثة أو دعني أعمل.'"
    },
    "options": [
      {
        "en": "\"Fine. Let me inspect the corpse.\"",
        "id": "\"Baiklah. Biarkan aku memeriksa jenazahnya.\"",
        "zh": "“好吧，我去勘验尸体。”",
        "ja": "「いいだろう。遺体を調べる。」",
        "ko": "\"좋소. 시신을 확인하겠소.\"",
        "es": "\"Bien. Dejadme inspeccionar el cuerpo.\"",
        "fr": "\"Bien. Laissez-moi examiner le cadavre.\"",
        "de": "\"Schön. Ich untersuche die Leiche.\"",
        "ru": "«Ладно. Пойду осмотрю труп.»",
        "it": "\"Va bene. Vado a esaminare il corpo.\"",
        "pt": "\"Certo. Deixe-me examinar o corpo.\"",
        "ar": "\"حسنًا، دعني أفحص الجثة بنفسي.\""
      }
    ]
  },
  "graves_debate_wound": {
    "speaker": {
      "en": "Inspector Graves",
      "id": "Inspektur Graves",
      "zh": "格雷夫斯警探",
      "ja": "グレイヴス警部",
      "ko": "그레이브스 형사",
      "es": "Inspector Graves",
      "fr": "Inspecteur Graves",
      "de": "Inspektor Graves",
      "ru": "Инспектор Грейвс",
      "it": "Ispettore Graves",
      "pt": "Inspetor Graves",
      "ar": "المفتش غريفز"
    },
    "text": {
      "en": "Graves scowls, waving his lantern over the corpse. 'Maybe she fell from the upper gantry! Look, Detective, until you show me a second set of footprints or a weapon with someone else's fingerprints, the Captain wants this stamped as accidental death.'",
      "id": "Graves merengut sambil melambaikan lenteranya. 'Mungkin dia jatuh dari lantai atas! Dengar Detektif, sampai kamu bisa menunjukkan jejak kaki kedua atau senjata dengan sidik jari orang lain, Kapten ingin kasus ini dicap sebagai kecelakaan.'",
      "zh": "格雷夫斯皱眉晃了晃提灯。“说不定她是从上层高架走道跌落的！听着，除非你拿出第二副脚印或凶器指纹，否则队长就定性为意外身亡。”",
      "ja": "グレイヴスは顔をしかめてカンテラを掲げた。「上層通路から落ちたのかも知れんだろ！第2の足跡か指紋付きの凶器が出ない限り、隊長は事故死で処理する腹だ。」",
      "ko": "그레이브스는 찌푸리며 등불을 비췄습니다. '상층 통로에서 떨어졌을 수도 있잖소! 제2의 발자국이나 지문 묻은 흉기가 없는 한 서장님은 사고사로 처리할 거요.'",
      "es": "Graves frunce el ceño agitando la linterna. '¡Quizá cayó de la pasarela! Sin segundas huellas o arma con huellas ajenas, el capitán quiere que sea accidente.'",
      "fr": "Graves se renfrogne en agitant sa lanterne. 'Peut-être a-t-elle chuté de la passerelle ! Sans autres empreintes ou arme, le Capitaine veut classer en accident.'",
      "de": "Graves finstert und schwenkt die Laterne. 'Vielleicht stürzte sie vom oberen Steg! Ohne zweite Spuren oder Waffe mit Fingerabdrücken will der Captain einen Unfall.'",
      "ru": "Грейвс хмурится и светит фонарем. «Может, она упала с верхних мостков! Пока нет вторых следов или оружия с чужими пальцами, капитан требует оформить несчастный случай.»",
      "it": "Graves si acciglia agitando la lanterna. 'Forse è caduta dal camminamento! Senza una seconda serie d'impronte o un'arma, il Capitano vuole l'incidente.'",
      "pt": "Graves franze a testa com a lanterna. 'Talvez ela tenha caído da passarela! Sem outras pegadas ou arma com digitais, o Capitão quer isso como acidente.'",
      "ar": "قطب غريفز ملوحًا بفانوسه: 'ربما سقطت من الممشى العلوي! ما لم تحضر آثار أقدام أخرى أو سلاحًا يحمل بصمات، فإن القائد يريده حادثًا عرضيًا.'"
    },
    "options": [
      {
        "en": "\"I will find the evidence. Just stay out of my way.\"",
        "id": "\"Aku akan temukan buktinya. Menyingkirlah dari jalanku.\"",
        "zh": "“我会找到证据的，别挡我的路。”",
        "ja": "「証拠は見つける。邪魔をするな。」",
        "ko": "\"증거는 내가 찾겠소. 걸리적거리지나 마시오.\"",
        "es": "\"Encontraré las pruebas. Solo no te metas en mi camino.\"",
        "fr": "\"Je trouverai les preuves. Ne restez pas dans mon chemin.\"",
        "de": "\"Ich werde die Beweise finden. Gehen Sie mir nur aus dem Weg.\"",
        "ru": "«Я найду улики. Не стой на пути.»",
        "it": "\"Troverò le prove. Tu non intralciarmi.\"",
        "pt": "\"Eu encontrarei as provas. Apenas saia do meu caminho.\"",
        "ar": "\"سأجد الدليل، فقط ابتعد عن طريقي.\""
      }
    ]
  },
  "graves_last_seen": {
    "speaker": {
      "en": "Inspector Graves",
      "id": "Inspektur Graves",
      "zh": "格雷夫斯警探",
      "ja": "グレイヴス警部",
      "ko": "그레이브스 형사",
      "es": "Inspector Graves",
      "fr": "Inspecteur Graves",
      "de": "Inspektor Graves",
      "ru": "Инспектор Грейвс",
      "it": "Ispettore Graves",
      "pt": "Inspetor Graves",
      "ar": "المفتش غريفز"
    },
    "text": {
      "en": "'The widow. Madame Vivienne. She claims she brought him peppermint tea at midnight, then went down to the parish rectory for all-night vigil prayers. Convenient alibi, if you ask me.'",
      "id": "'Sang janda. Nyonya Vivienne. Dia mengaku membawakan teh peppermint untuk Aurelia tengah malam tadi, lalu turun ke kapel untuk doa malam. Alibi yang sangat rapi jika kamu tanya pendapatku.'",
      "zh": "“是未亡人薇薇安夫人。她说午夜给奥蕾莉亚送了薄荷茶，之后便下楼到教区祈祷守夜。要我说，这不在场证明可真方便。”",
      "ja": "「未亡人のヴィヴィアン夫人だ。真夜中にペパーミントティーを届け、徹夜祈祷へ行ったと主張している。随分都合のいいアリバイだがな。」",
      "ko": "\"미망인 비비안 부인이오. 자정에 박하차를 가져다주고 밤샘 기도를 드리러 사제관으로 내려갔다고 하오. 참 편리한 알리바이요.\"",
      "es": "'La viuda. Madame Vivienne. Dice que llevó té de menta a medianoche y bajó a rezar la vigilia. Coartada muy conveniente.'",
      "fr": "'La veuve. Madame Vivienne. Elle dit avoir apporté du thé à minuit avant de descendre veiller en prière. Bien commode.'",
      "de": "'Die Witwe. Madame Vivienne. Sie behauptet, um Mitternacht Pfefferminztee gebracht zu haben und dann zur Nachtwache gegangen zu sein. Sehr praktisch.'",
      "ru": "«Вдова. Мадам Вивьен. Утверждает, что принесла чай в полночь, а затем пошла в часовню на всенощную. Удобное алиби.»",
      "it": "'La vedova. Madame Vivienne. Dice di aver portato tè alla menta a mezzanotte e di essere scesa per la veglia. Molto comodo.'",
      "pt": "'A viúva. Madame Vivienne. Diz ter levado chá de hortelã à meia-noite e descido para a vigília. Álibi conveniente.'",
      "ar": "'الأرملة السيدة فيفيان. تدعي أنها قدمت لها شاي النعناع بمنتصف الليل ثم نزلت لصلاة الليل بالكنيسة. حجة مريحة ومريبة.'"
    },
    "options": [
      {
        "en": "\"I should speak with Madame Vance directly.\"",
        "id": "\"Aku harus bicara langsung dengan Nyonya Vance.\"",
        "zh": "“我得直接找薇薇安夫人谈谈。”",
        "ja": "「ヴィヴィアン夫人と直接話そう。」",
        "ko": "\"비비안 부인과 직접 대면해야겠소.\"",
        "es": "\"Hablaré con Madame Vance directamente.\"",
        "fr": "\"Je devrais parler à Madame Vance directement.\"",
        "de": "\"Ich sollte direkt mit Madame Vance sprechen.\"",
        "ru": "«Мне нужно поговорить с мадам Вэнс лично.»",
        "it": "\"Dovrei parlare direttamente con Madame Vance.\"",
        "pt": "\"Devo falar diretamente com Madame Vance.\"",
        "ar": "\"يجب أن أستجوب السيدة فانس مباشرة.\""
      }
    ]
  },
  "graves_ledger_hunt": {
    "speaker": {
      "en": "Inspector Graves",
      "id": "Inspektur Graves",
      "zh": "格雷夫斯警探",
      "ja": "グレイヴス警部",
      "ko": "그레이브스 형사",
      "es": "Inspector Graves",
      "fr": "Inspecteur Graves",
      "de": "Inspektor Graves",
      "ru": "Инспектор Грейвс",
      "it": "Ispettore Graves",
      "pt": "Inspetor Graves",
      "ar": "المفتش غريفز"
    },
    "text": {
      "en": "'If I knew where it was, I wouldn't be freezing my kidneys off in this tower! Vance had a hidden floorboard safe somewhere beneath the secondary escapement. But the lock is an alchemical three-tumbler dial.'",
      "id": "'Kalau aku tahu di mana tempatnya, aku tidak akan kedinginan sampai ke tulang di menara ini! Vance punya brankas tersembunyi di bawah lantai ruang escapement. Tapi kuncinya kombinasi tiga putaran alkimia.'",
      "zh": "“我要是知道在哪，何必在这冻掉腰子！奥蕾莉亚在副擒纵机构下的地板藏了保险箱，但那是三圈炼金滚轮密码锁。”",
      "ja": "「場所を知ってりゃこんな凍える塔に突っ立ってねえよ！ヴァンスは副脱進機下の床板に金庫を隠していた。だが3重の錬金ダイヤル錠だ。」",
      "ko": "\"장소를 알았다면 이 탑에서 얼어붙고 있겠소? 밴스는 보조 탈진기 바닥 밑에 금고를 숨겨뒀소. 3중 연금술 다이얼 자물쇠요.\"",
      "es": "'¡Si lo supiera no me estaría congelando aquí! Vance tenía una caja oculta bajo el piso tras el escape. Pero tiene cerradura de tres diales.'",
      "fr": "'Si je le savais, je ne gèlerais pas ici ! Vance avait un coffre sous le plancher sous l'échappement. Mais c'est un cadran à trois disques.'",
      "de": "'Wüsste ich das, würde ich nicht hier frieren! Vance hatte einen Bodentresor unter dem Werk. Doch das Schloss hat drei Alchemie-Drehscheiben.'",
      "ru": "«Знал бы я, не мерз бы здесь! У Вэнс был тайник под полом за спусковым механизмом. Но там трехдисковый алхимический замок.»",
      "it": "'Se lo sapessi non sarei qui a congelare! La Vance aveva una cassaforte nel pavimento sotto lo scappamento con tre dischi alchemici.'",
      "pt": "'Se eu soubesse não estaria congelando aqui! Vance tinha um cofre no chão sob o escape com fechadura de três tambores.'",
      "ar": "'لو كنت أعلم مكانه لما تجمدت هنا! كان لدى فانس خزنة تحت ألواح الأرضية لكن قفلها مركب من ثلاثة أقراص كيميائية.'"
    },
    "options": [
      {
        "en": "\"I'll inspect the floorboards.\"",
        "id": "\"Aku akan periksa papan lantainya.\"",
        "zh": "“我去搜查地板。”",
        "ja": "「床板を調べてみよう。」",
        "ko": "\"바닥판을 살펴보겠소.\"",
        "es": "\"Inspeccionaré los tablones.\"",
        "fr": "\"Je vais inspecter le plancher.\"",
        "de": "\"Ich werde die Dielen untersuchen.\"",
        "ru": "«Я осмотрю половицы.»",
        "it": "\"Ispezionerò le assi del pavimento.\"",
        "pt": "\"Vou inspecionar o assoalho.\"",
        "ar": "\"سأفحص ألواح الأرضية.\""
      }
    ]
  },
  "pendulum_gear_crush": {
    "speaker": {
      "en": "Mechanical Hazard",
      "id": "Bahaya Mekanik",
      "zh": "齿轮绞夹危险",
      "ja": "歯車の危険",
      "ko": "기계 장치 위협",
      "es": "Peligro Mecánico",
      "fr": "Danger Mécanique",
      "de": "Gefahr im Getriebe",
      "ru": "Механическая ловушка",
      "it": "Pericolo Meccanico",
      "pt": "Perigo Mecânico",
      "ar": "خطر ميكانيكي"
    },
    "text": {
      "en": "You lean too close to the oscillating gear train. A brass spur catches your sleeve, violently jerking you toward the teeth! You wrench yourself free just in time (-1 Health)!",
      "id": "Kamu membungkuk terlalu dekat ke susunan roda gigi yang berosilasi. Roda gigi kuningan menyambar lengan bajumu, menyentakmu ke arah gerigi tajam! Kamu berhasil melepaskan diri tepat waktu (-1 Daya Tahan)!",
      "zh": "你靠得太近，转动的黄铜齿轮猛地绞住了衣袖，差点将你卷入齿列！你奋力挣脱（生命值 -1）！",
      "ja": "歯車列に近付きすぎた。真鍮の突起が袖を噛み、鋭い歯車へ引きずり込もうとする！間一髪で引き剥がした（体力 -1）！",
      "ko": "톱니바퀴 축에 너무 접근했습니다. 황동 톱니가 소매를 낚아채 끌어당깁니다! 필사적으로 몸을 빼냈습니다 (체력 -1)!",
      "es": "Te inclinas demasiado. ¡Un diente de latón atrapa tu manga tirando hacia los engranajes! Te liberas a tiempo (-1 Salud).",
      "fr": "Trop près du rouage, une dent en laiton happe votre manche et vous tire ! Vous vous dégagez de justesse (-1 Santé).",
      "de": "Sie beugen sich zu nah ran. Ein Zahn erfasst den Ärmel und zerrt Sie ins Räderwerk! Sie reißen sich los (-1 Gesundheit).",
      "ru": "Ты наклоняешься слишком близко. Шестерня цепляет рукав и дергает в зубья! Едва успеваешь вырваться (-1 Здоровье).",
      "it": "Ti sporgi troppo. Un dente d'ottone aggancia la manica trascinandoti verso gli ingranaggi! Ti liberi a stento (-1 Salute).",
      "pt": "Você se inclina demais. Um dente puxa sua manga para as engrenagens! Você se liberta no último segundo (-1 Saúde).",
      "ar": "اقتربت من التروس فعلق كمك بأسنان الترس وسحبك نحو المحور الحاد! انتزعت نفسك بأعجوبة (-1 صحة)!"
    },
    "options": [
      {
        "en": "\"That was reckless of me.\"",
        "id": "\"Tindakan yang ceroboh.\"",
        "zh": "“刚才太莽撞了。”",
        "ja": "「軽率だったな。」",
        "ko": "\"경솔했군.\"",
        "es": "\"Eso fue imprudente.\"",
        "fr": "\"C'était imprudent.\"",
        "de": "\"Das war leichtsinnig.\"",
        "ru": "«Это было неосторожно.»",
        "it": "\"È stata un'imprudenza.\"",
        "pt": "\"Isso foi imprudente.\"",
        "ar": "\"كان ذلك تصرفًا طائشًا.\""
      }
    ]
  },
  "pendulum_pry_fail": {
    "speaker": {
      "en": "Forensic Attempt",
      "id": "Kegagalan Otopsi",
      "zh": "强行掰动受创",
      "ja": "検死の失敗",
      "ko": "부검 시도 실패",
      "es": "Intento Forense Fallido",
      "fr": "Tentative Ratée",
      "de": "Misslungener Versuch",
      "ru": "Неудачная попытка",
      "it": "Tentativo Fallito",
      "pt": "Tentativa Fracassada",
      "ar": "محاولة فحص فاشلة"
    },
    "text": {
      "en": "The cadaveric spasm is like cast iron. As you force her fingers, a concealed needle pricks your index finger, burning your flesh with neurotoxin (-2 Health, -1 Morale)!",
      "id": "Spasme mayat sangat kaku. Saat kamu memaksa membuka jemarinya, jarum beracun yang tersembunyi menyengat jarimu! Kamu tersentak kesakitan saat racun membakar kulitmu (-2 Daya Tahan, -1 Kewarasan).",
      "zh": "尸僵如铁。你强行掰开手指时，隐藏的毒针刺破了食指，神经毒素灼烧皮肉（生命值 -2，士气 -1）！",
      "ja": "死後痙攣は鉄のようだった。指を無理に開こうとした瞬間、隠し針が指を刺し神経毒が走る（体力 -2、正気度 -1）！",
      "ko": "시체 경직이 쇠처럼 단단합니다. 억지로 손가락을 펴자 숨겨진 바늘이 손가락을 찔러 독이 번집니다 (체력 -2, 사기 -1)!",
      "es": "El espasmo es como hierro. Al forzar los dedos, una aguja oculta pincha tu índice con neurotoxina (-2 Salud, -1 Moral).",
      "fr": "Le spasme est dur comme fer. En forçant les doigts, une aiguille cachée vous pique de neurotoxine (-2 Santé, -1 Moral).",
      "de": "Der Leichenkrampf ist wie Gusseisen. Beim Aufbiegen sticht eine verdeckte Nadel mit Neurotoxin zu (-2 Gesundheit, -1 Moral)!",
      "ru": "Трупное окоченение словно железо. При попытке разжать пальцы скрытая игла ранит руку нейротоксином (-2 Здоровье, -1 Мораль)!",
      "it": "Lo spasmo è come ghisa. Forzando le dita, un ago nascosto ti punge bruciando di neurotossina (-2 Salute, -1 Morale).",
      "pt": "O espasmo é como ferro. Uma agulha escondida fura seu dedo com neurotoxina (-2 Saúde, -1 Moral).",
      "ar": "التشنج الجنائزي صلب كالفولاذ، فانطلقت إبرة مخفية وخزت إصبعك بالسم العصبي (-2 صحة، -1 معنويات)!"
    },
    "options": [
      {
        "en": "\"Damn my trembling hands...\"",
        "id": "\"Sialan! Tangan terkutuk ini dipasangi perangkap!\"",
        "zh": "“可恶，手掌里竟装了毒针陷阱……”",
        "ja": "「くそっ、手に罠が仕組まれていたか……」",
        "ko": "\"손에 함정이 설치되어 있었군...\"",
        "es": "\"¡Maldición, mis manos temblorosas!\"",
        "fr": "\"Maudites mains tremblantes...\"",
        "de": "\"Verdammt, eine Falle...\"",
        "ru": "«Черт, рука была с ловушкой!»",
        "it": "\"Maledette mani tremanti...\"",
        "pt": "\"Droga de mãos trêmulas...\"",
        "ar": "\"سحقًا، كانت اليد مفخخة بسم!\""
      }
    ],
    "voices": [
      {
        "voice": {
          "en": "Carnal",
          "id": "Karnal",
          "zh": "肉体本能",
          "ja": "肉体",
          "ko": "육체",
          "es": "Carnal",
          "fr": "Carnal",
          "de": "Körper",
          "ru": "Тело",
          "it": "Fisico",
          "pt": "Físico",
          "ar": "الجسد"
        },
        "badge": {
          "en": "CARNAL [Physique]",
          "id": "KARNAL [Fisik]",
          "zh": "肉体本能 [体魄]",
          "ja": "肉体 [身体]",
          "ko": "육체 [신체]",
          "es": "CARNAL [Físico]",
          "fr": "CARNAL [Physique]",
          "de": "KÖRPER [Physis]",
          "ru": "ТЕЛО [Телосложение]",
          "it": "FISICO [Fisico]",
          "pt": "FÍSICO [Físico]",
          "ar": "الجسد [البنية]"
        },
        "text": {
          "en": "Clumsy! Your alcohol-trembled fingers slipped onto the needle. The venom spreads like liquid fire through your veins.",
          "id": "Ceroboh! Jemarimu yang gemetar karena alkohol tergelincir mengenai jarum beracun. Bisanya menyebar bagai api cair di pembuluh darahmu.",
          "zh": "笨手笨脚！你因酒精宿醉而颤抖的手指狠狠划在了尖锐的毒针上。毒液宛如烈火液体般顺着静脉急剧蔓延！",
          "ja": "不器用め！アルコールで震える指が毒針を掠めた。猛毒が液体の炎となって血管を駆け巡る。",
          "ko": "어설프기는! 알코올로 떨리는 손가락이 독침을 스치고 말았습니다. 독이 액체 불꽃처럼 혈관을 타고 번져나갑니다.",
          "es": "¡Torpe! Tus dedos temblorosos resbalaron contra la aguja. El veneno arde como fuego líquido por tus venas.",
          "fr": "Maladroit ! Vos doigts tremblants ont glissé sur l'aiguille. Le venin se répand comme un feu liquide dans vos veines.",
          "de": "Ungeschickt! Deine zitternden Finger glitten auf die Nadel. Das Gift breitet sich wie flüssiges Feuer in deinen Adern aus.",
          "ru": "Неуклюже! Дрожащие пальцы соскользнули прямо на иглу. Яд жидким огнем разливается по венам.",
          "it": "Maldestro! Le tue dita tremanti sono scivolate sull'ago. Il veleno si diffonde come fuoco liquido nelle vene.",
          "pt": "Desajeitado! Seus dedos trêmulos deslizaram sobre a agulha. O veneno se espalha como fogo líquido nas veias.",
          "ar": "خرق فاضح! انزلقت أصابعك المرتجفة من الكحول لتلمس الإبرة، لينتشر السم كنار سائلة في أوردتك."
        }
      }
    ]
  },
  "pendulum_esoterica_win": {
    "speaker": {
      "en": "Occult Deduction",
      "id": "Deduksi Okultisme Horologis",
      "zh": "钟表秘教玄学推演",
      "ja": "時計神秘主義の推論",
      "ko": "오컬트 시계학적 추론",
      "es": "Deducción Oculta",
      "fr": "Déduction Occulte",
      "de": "Okkulte Deduktion",
      "ru": "Оккультная дедукция",
      "it": "Deduzione Occulta",
      "pt": "Dedução Oculta",
      "ar": "استنتاج الطوائف الباطنية"
    },
    "text": {
      "en": "Beneath the blood-crusted collar lies an alchemical mark: a circle quartered by three intersecting crescents. The seal of 'The Order of the Pale Meridian'—a secret cabal of horologists who believed time itself could be reversed through mechanical resonance.",
      "id": "Di balik kerahnya yang berlumuran darah terdapat segel alkimia: lingkaran yang dibelah oleh tiga bulan sabit bersilangan. Simbol 'Ordo Meridian Pucat'—perkumpulan rahasia para pembuat jam yang percaya aliran waktu dapat dibalikkan melalui resonansi mekanik.",
      "zh": "在血迹凝固的领口下藏着炼金印记：被三道新月相交的圆环。“苍白子午线密教”的徽章——深信机械共振可逆转光阴的秘密钟表结社。",
      "ja": "血染の襟の下に錬金術の刻印がある。3つの三日月が交差する円。機械の共鳴で時間を逆転できると信じる「蒼白の子午線教団」の証印だ。",
      "ko": "피 묻은 옷깃 아래 연금술 표식이 보입니다. 세 개의 초승달이 교차하는 원형 인장. 공명으로 시간을 되돌릴 수 있다고 믿는 '창백한 자오선 교단'의 인장입니다.",
      "es": "Bajo el cuello ensangrentado hay una marca alquímica: un círculo con tres lunas. El sello de la 'Orden del Meridiano Pálido', que creía poder revertir el tiempo.",
      "fr": "Sous le col ensanglanté gît une marque alchimique : un cercle coupé de trois croissants. Le sceau de 'L'Ordre du Méridien Pâle', obsédé par l'inversion du temps.",
      "de": "Unter dem Kragen liegt ein Alchemie-Zeichen: ein von drei Mondsicheln geteilter Kreis. Das Siegel des 'Ordens des Bleichen Meridians', der die Zeit umkehren wollte.",
      "ru": "Под воротником скрыт алхимический символ: круг с тремя полумесяцами. Печать «Ордена Бледного Меридиана», верившего в обращение времени вспять.",
      "it": "Sotto il colletto c'è un marchio alchemico: cerchio con tre mezzelune. Il sigillo dell'Ordine del Meridiano Pallido', che credeva di invertire il tempo.",
      "pt": "Sob o colarinho ensanguentado há uma marca alquímica: o selo da 'Ordem do Meridiano Pálido', que acreditava na reversão do tempo.",
      "ar": "تحت الياقة الدامية يكمن نقش كيميائي: دائرة تقطعها ثلاثة أهلة، ختم 'طائفة خط الزوال الشاحب' التي اعتقدت إمكانية عكس الزمن بالرنين."
    },
    "options": [
      {
        "en": "\"She was trying to build a machine that could un-live hours.\"",
        "id": "\"Dia sedang merakit mesin yang dapat memutar balik waktu.\"",
        "zh": "“她竟在制造能倒流时间的机械装置。”",
        "ja": "「彼女は時を巻き戻す機械を造ろうとしていたのか。」",
        "ko": "\"시간을 되돌리는 기계를 만들려 했군.\"",
        "es": "\"Estaba intentando construir una máquina para des-vivir las horas.\"",
        "fr": "\"Elle tentait de construire une machine pour remonter le temps.\"",
        "de": "\"Sie baute eine Maschine, um Stunden ungeschehen zu machen.\"",
        "ru": "«Она пыталась создать машину, поворачивающую время вспять.»",
        "it": "\"Cercava di costruire una macchina per riavvolgere il tempo.\"",
        "pt": "\"Ela tentava construir uma máquina para retroceder o tempo.\"",
        "ar": "\"كانت تحاول بناء آلة تسترجع الساعات الضائعة.\""
      }
    ]
  },
  "pendulum_esoterica_fail": {
    "speaker": {
      "en": "Occult Deduction",
      "id": "Deduksi Buntu",
      "zh": "秘教解读毫无头绪",
      "ja": "神秘解読の行き詰まり",
      "ko": "오컬트 해석 실패",
      "es": "Deducción Frustrada",
      "fr": "Impasse Occulte",
      "de": "Rätselhafte Runen",
      "ru": "Оккультный тупик",
      "it": "Deduzione Frustrata",
      "pt": "Impasse Oculto",
      "ar": "غموض الرموز"
    },
    "text": {
      "en": "The scratches look like random surgical cuts or lacerations from broken clock springs. You cannot make sense of the geometry; it just produces a throbbing headache in your temples.",
      "id": "Goresan itu tampak seperti luka acak akibat pecahan pegas jam. Kamu tidak bisa memahami geometrinya; kepalamu hanya berdenyut nyeri.",
      "zh": "刻痕看起来如同弹簧崩裂造成的随机划痕。你看不透其中的几何含义，太阳穴隐隐作痛。",
      "ja": "傷跡は壊れたゼンマイによる乱雑な切り傷に見える。幾何学の意味が掴めず、こめかみが痛むだけだ。",
      "ko": "상처는 튕겨 나온 태엽에 긁힌 무작위 흉터처럼 보입니다. 기하학적 의미를 알 수 없어 두통만 밀려옵니다.",
      "es": "Los arañazos parecen cortes al azar de resortes rotos. No logras descifrar la geometría y te duele la cabeza.",
      "fr": "Les éraflures ressemblent à de banales entailles de ressorts. Impossible d'en tirer du sens, les tempes battent.",
      "de": "Die Kratzer wirken wie Schnittwunden geborstener Federn. Sie erkennen keinen Sinn, die Schläfen pochen.",
      "ru": "Царапины кажутся случайными порезами от пружин. Ты не видишь смысла, только виски ломит от боли.",
      "it": "I graffi sembrano tagli casuali di molle spezzate. Non cogli la geometria; ricavi solo mal di testa.",
      "pt": "Os arranhões parecem cortes de molas partidas. Você não decifra a geometria e sente dor de cabeça.",
      "ar": "تبدو الخدوش كجروح عشوائية من زنبركات محطمة ولم تستوعب هندستها بل أصابك صداع نابض."
    },
    "options": [
      {
        "en": "[Blink and look away]",
        "id": "[Kedipkan mata dan berpaling]",
        "zh": "【眨眼移开视线】",
        "ja": "【瞬きして視線を逸らす】",
        "ko": "[눈을 깜빡이며 시선을 돌린다]",
        "es": "[Parpadear y apartar la vista]",
        "fr": "[Cligner des yeux et détourner le regard]",
        "de": "[Blinzeln und wegschauen]",
        "ru": "[Моргнуть и отвести взгляд]",
        "it": "[Sbatti le palpebre e guarda altrove]",
        "pt": "[Piscar e desviar o olhar]",
        "ar": "[إشاحة النظر]"
      }
    ]
  },
  "watch_open_fail": {
    "speaker": {
      "en": "Mechanical Mistake",
      "id": "Kesalahan Mekanik",
      "zh": "机械拆解失手",
      "ja": "機械操作の失敗",
      "ko": "기계적 실수",
      "es": "Error Mecánico",
      "fr": "Erreur Mécanique",
      "de": "Mechanischer Fehler",
      "ru": "Механическая оплошность",
      "it": "Errore Meccanico",
      "pt": "Erro Mecânico",
      "ar": "خطأ ميكانيكي عارض"
    },
    "text": {
      "en": "Your thumbnail slips on the oiled bevel, snapping the delicate hinge. The hairspring flies out like a coiled brass viper and cuts your hand (-1 Health)!",
      "id": "Kukumu tergelincir pada engsel yang berminyak. Pegas rambut melesat bagai ular kuningan yang marah dan menyayat jarimu (-1 Daya Tahan)!",
      "zh": "指甲在沾满机油的斜边上一滑，脆弱的精密铰链崩断。游丝如黄铜毒蛇猛烈弹射，割伤了你的手（生命值 -1）！",
      "ja": "油の縁で爪が滑り、繊細な蝶番を弾き飛ばした。ヒゲゼンマイが真鍮の毒蛇のように飛び出し手を切った（体力 -1）！",
      "ko": "기름 묻은 모서리에서 손톱이 미끄러져 경첩이 부러졌습니다. 헤어스프링이 튀어 올라 손등을 베었습니다 (체력 -1)!",
      "es": "Tu uña resbala y rompe la bisagra. El espiral salta como una víbora cortando tu mano (-1 Salud).",
      "fr": "Votre ongle glisse et brise la charnière. Le spiral jaillit comme une vipère et vous entaille la main (-1 Santé).",
      "de": "Ihr Nagel rutscht ab und bricht das Scharnier. Die Spiralfeder schnellt heraus und schneidet die Hand (-1 Gesundheit).",
      "ru": "Ноготь соскальзывает с масляного края, ломая петлю. Волосок баланса вылетает и режет ладонь (-1 Здоровье).",
      "it": "L'unghia scivola rompendo la cerniera. La spirale schizza fuori tagliandoti la mano (-1 Salute).",
      "pt": "Sua unha escorrega e quebra a dobradiça. A mola espiral salta cortando sua mão (-1 Saúde).",
      "ar": "انزلق ظفرك على الحافة الزيتية فانكسر المفصل الدقيق، وطفر زنبرك الشعر الحاد جريحًا يدك (-1 صحة)!"
    },
    "options": [
      {
        "en": "\"Ouch! The spring cut my finger.\"",
        "id": "\"Aduh! Pegasnya menyayat tanganku.\"",
        "zh": "“好疼！被发条割伤了。”",
        "ja": "「痛っ！ゼンマイで手を切った。」",
        "ko": "\"아야! 스프링에 손이 베였군.\"",
        "es": "\"¡Ay! El resorte me ha cortado.\"",
        "fr": "\"Aïe ! Le ressort m'a coupé la main.\"",
        "de": "\"Autsch! Die Feder hat mich geschnitten.\"",
        "ru": "«Ай! Пружина порезала палец.»",
        "it": "\"Ahi! La molla mi ha tagliato la mano.\"",
        "pt": "\"Ai! A mola cortou meu dedo.\"",
        "ar": "\"آخ! جرحني الزنبرك الحاد في يدي.\""
      }
    ]
  },
  "examine_watch_done": {
    "speaker": {
      "en": "Inventory Update",
      "id": "Inventaris Diperbarui",
      "zh": "证物妥善归档",
      "ja": "遺留品保管",
      "ko": "소지품 갱신",
      "es": "Inventario Actualizado",
      "fr": "Inventaire Mis à Jour",
      "de": "Inventar Aktualisiert",
      "ru": "Вещдок сохранен",
      "it": "Inventario Aggiornato",
      "pt": "Inventário Atualizado",
      "ar": "حفظ المضبوطات"
    },
    "text": {
      "en": "You wrap the pocket watch in a clean silk handkerchief and slip it into your trenchcoat pocket.",
      "id": "Kamu membungkus jam saku dengan saputangan sutra dan menyimpannya di saku mantel detektifmu.",
      "zh": "你用干净的丝帕将怀表包裹妥当，收入风衣口袋深处。",
      "ja": "懐中時計を清潔な絹のハンカチで包み、トレンチコートのポケットに収めた。",
      "ko": "회중시계를 깨끗한 비단 손수건으로 감싸 트렌치코트 안주머니에 보관했습니다.",
      "es": "Envuelves el reloj en un pañuelo de seda y lo guardas en tu gabardina.",
      "fr": "Vous enveloppez la montre dans un mouchoir de soie propre et la glissez dans votre manteau.",
      "de": "Sie wickeln die Taschenuhr in ein Seidentuch und stecken sie in den Mantel.",
      "ru": "Ты заворачиваешь карманные часы в шелковый платок и убираешь во внутренний карман пальто.",
      "it": "Avvolgi l'orologio in un fazzoletto di seta e lo infili nel cappotto.",
      "pt": "Você embrulha o relógio num lenço de seda e o guarda no sobretudo.",
      "ar": "قمت بلف ساعة الجيب بمنديل حريري نظيف ودسستها بعناية داخل جيب معطفك."
    },
    "options": [
      {
        "en": "[Continue investigation]",
        "id": "[Lanjutkan penyelidikan]",
        "zh": "【继续现场勘验】",
        "ja": "【現場検証を続ける】",
        "ko": "[수사를 계속한다]",
        "es": "[Continuar investigación]",
        "fr": "[Poursuivre l'enquête]",
        "de": "[Untersuchung fortsetzen]",
        "ru": "[Продолжить расследование]",
        "it": "[Continua l'indagine]",
        "pt": "[Continuar investigação]",
        "ar": "[مواصلة التحقيق]"
      }
    ]
  },
  "examine_balcony_start": {
    "speaker": {
      "en": "The Precipice of Saint Irene",
      "id": "Tepi Menara Saint Irene",
      "zh": "圣艾琳雨夜露台",
      "ja": "聖アイリーンの高所テラス",
      "ko": "성 아이린 첨탑 테라스",
      "es": "El Precipicio de Saint Irene",
      "fr": "Le Précipice de Saint Irene",
      "de": "Der Abgrund von Saint Irene",
      "ru": "Карниз башни Сент-Ирен",
      "it": "Il Precipizio di Saint Irene",
      "pt": "O Precipício de Saint Irene",
      "ar": "شرفة برج القديسة إيرين"
    },
    "text": {
      "en": "Cold wind howls through the stone archway. Below lies the murky chasm of District 7—gas lamps flickering like dying stars across the canal barges. Rain spatters against your face.",
      "id": "Angin dingin melolong melalui lengkungan batu menara. Di bawah terbentang kegelapan Distrik 7—lampu-lampu gas berkelap-kelip seperti bintang yang meredup di atas tongkang kanal. Hujan deras menerpa wajahmu.",
      "zh": "寒风在石拱门间肆虐呼啸。下方是第七区的无边暗夜，煤气灯如残星在运河驳船间摇曳。冷雨打在脸上。",
      "ja": "冷たい風が石のアーチを吹き抜ける。見下ろせば第7区の暗闇、ガス灯が運河で死にかけの星のように瞬く。冷たい雨が顔を打つ。",
      "ko": "차가운 비바람이 석조 아치를 통과해 몰아칩니다. 발밑엔 제7구역의 어둠이 펼쳐져 있고 가스등이 가물거립니다.",
      "es": "El viento aúlla por el arco de piedra. Abajo yace el abismo del Distrito 7; las farolas titilan como estrellas moribundas.",
      "fr": "Le vent hurle sous l'arche. En bas s'étend le gouffre du District 7, les réverbères vacillant sur les canaux.",
      "de": "Kalter Wind heult durch die Steinbögen. Unten liegt der Abgrund des 7. Distrikts; Gaslaternen flackern wie sterbende Sterne.",
      "ru": "Холодный ветер воет в каменных арках. Внизу чернеет бездна 7-го района — газовые фонари мерцают, как угасающие звезды.",
      "it": "Il vento sibila tra le arcate. Sotto si stende l'abisso del Distretto 7 con lampioni che tremolano sui canali.",
      "pt": "O vento uiva pelo arco de pedra. Abaixo jaz o abismo do Distrito 7; lâmpadas a gás tremeluzem na neblina.",
      "ar": "تعصف الرياح الباردة عبر الأقواس الحجرية، وتنبسط في الأسفل هوة المنطقة 7 المظلمة حيث تتلألأ فوانيس الغاز كنجوم تحتضر."
    },
    "options": [
      {
        "en": "[PERCEPTION - Easy 8] Search the wet flagstones for trace evidence.",
        "id": "[PERSEPSI - Mudah 8] Cari jejak bukti di atas ubin batu yang basah.",
        "zh": "【感知 - 简单 8】搜索湿润石板上的残留物证。",
        "ja": "【知覚 - 容易 8】濡れた敷石から痕跡を探す。",
        "ko": "[지각 - 쉬움 8] 젖은 석판 바닥에서 미세 흔적을 찾는다.",
        "es": "[PERCEPCIÓN - Fácil 8] Buscar indicios en las losas mojadas.",
        "fr": "[PERCEPTION - Facile 8] Fouiller les dalles humides à la recherche d'indices.",
        "de": "[WAHRNEHMUNG - Leicht 8] Die nassen Steinplatten nach Spuren absuchen.",
        "ru": "[ВОСПРИЯТИЕ - Легко 8] Осмотреть мокрые каменные плиты в поисках улик.",
        "it": "[PERCEZIONE - Facile 8] Cerca tracce sulle lastre di pietra bagnate.",
        "pt": "[PERCEPÇÃO - Fácil 8] Procurar vestígios nas lajes molhadas.",
        "ar": "[الإدراك الحسي - سهل 8] فحص البلاط الحجري المبتل بحثًا عن آثار أدلة جنائية."
      },
      {
        "en": "Look over the railing into the fog.",
        "id": "Tatap kabut malam di atas kota.",
        "zh": "凭栏远眺浓雾迷蒙的城区。",
        "ja": "手すりから霧の中の街を見下ろす。",
        "ko": "난간 너머 안개 낀 도시를 응시한다.",
        "es": "Mirar sobre la barandilla hacia la niebla.",
        "fr": "Regarder dans le brouillard par-dessus le garde-corps.",
        "de": "Über das Geländer in den Nebel blicken.",
        "ru": "Посмотреть за перила в туманную тьму.",
        "it": "Guarda oltre la ringhiera nella nebbia.",
        "pt": "Olhar pela balaustrada na neblina.",
        "ar": "التحديق من فوق السياج في أعماق الضباب."
      },
      {
        "en": "[Return inside]",
        "id": "[Kembali ke dalam]",
        "zh": "【返回室内】",
        "ja": "【室内へ戻る】",
        "ko": "[실내로 복귀]",
        "es": "[Volver al interior]",
        "fr": "[Retourner à l'intérieur]",
        "de": "[Wieder hineingehen]",
        "ru": "[Вернуться внутрь]",
        "it": "[Torna all'interno]",
        "pt": "[Voltar para dentro]",
        "ar": "[الرجوع للداخل]"
      }
    ],
    "voices": [
      {
        "voice": {
          "en": "Elysia",
          "id": "Elysia",
          "zh": "极乐直觉",
          "ja": "エリシア",
          "ko": "엘리시아",
          "es": "Elysia",
          "fr": "Élysia",
          "de": "Elysia",
          "ru": "Элизия",
          "it": "Elysia",
          "pt": "Elísia",
          "ar": "إليزيا"
        },
        "badge": {
          "en": "ELYSIA [Psyche]",
          "id": "ELYSIA [Kejiwaan]",
          "zh": "极乐直觉 [心智]",
          "ja": "エリシア [精神]",
          "ko": "엘리시아 [심리]",
          "es": "ELYSIA [Psique]",
          "fr": "ÉLYSIA [Psyché]",
          "de": "ELYSIA [Psyche]",
          "ru": "ЭЛИЗИЯ [Психика]",
          "it": "ELYSIA [Psiche]",
          "pt": "ELÍSIA [Psique]",
          "ar": "إليزيا [الروح]"
        },
        "text": {
          "en": "Someone stood here right after the clock stopped. They stood in the rain, looking out over the sleeping city, wiping something off their gloves. The scent of bitter almond still lingers on the stone.",
          "id": "Seseorang berdiri di sini tepat setelah jam menara berhenti. Mereka berdiri di tengah hujan, menatap ke arah kota yang terlelap, menyeka sesuatu dari sarung tangan mereka. Aroma almond pahit masih tertinggal samar di bebatuan.",
          "zh": "就在大钟骤停的瞬间，曾有人站在此处。凶手伫立在暴雨中俯瞰沉睡的街市，从容擦拭着皮手套上的痕迹。湿漉漉的石栏上还隐隐残留着苦杏仁的气味。",
          "ja": "時計が止まった直後、誰かがここに立っていた。雨の中に立ち、眠れる街を見下ろしながら、手袋の汚れを拭っていたのだ。石の上には今も苦いアーモンドの香りが漂っている。",
          "ko": "시계가 멈춘 직후 누군가 이곳에 서 있었습니다. 빗속에 서서 잠든 도시를 내려다보며 장갑에 묻은 무언가를 닦아냈습니다. 석조 난간에는 여전히 씁쓸한 아몬드 향이 감돌고 있습니다.",
          "es": "Alguien estuvo aquí justo tras detenerse el reloj. Mirando la ciudad bajo la lluvia, limpiándose los guantes. El olor a almendras amargas aún perdura.",
          "fr": "Quelqu'un se tenait ici juste après l'arrêt de l'horloge. Dans la pluie, observant la ville, essuyant ses gants. Une odeur d'amande amère flotte encore.",
          "de": "Jemand stand hier, kurz nachdem die Uhr stoppte. Im Regen, über die Stadt blickend, Handschuhe abwischend. Der Duft von Bittermandel hängt am Stein.",
          "ru": "Кто-то стоял здесь сразу после остановки часов. Вглядывался в спящий город под дождем и вытирал перчатки. Запах горького миндаля все еще держится на камне.",
          "it": "Qualcuno è rimasto qui subito dopo il blocco dell'orologio. Sotto la pioggia, a pulire i guanti. L'odore di mandorla amara aleggia ancora sulla pietra.",
          "pt": "Alguém esteve aqui logo após o relógio parar. Na chuva, olhando a cidade, limpando as luvas. O cheiro de amêndoa amarga ainda paira na pedra.",
          "ar": "وقف أحدهم هنا فور توقف الساعة مباشرة متأملاً المدينة تحت المطر ومسح قفازاته؛ ورائحة اللوز المر ما تزال عالقة بالحجر."
        }
      }
    ]
  },
  "balcony_search_win": {
    "speaker": {
      "en": "Trace Evidence Found",
      "id": "Bukti Jejak Terungkap",
      "zh": "起获关键微量物证",
      "ja": "痕跡証拠の回収",
      "ko": "결정적 흔적 증거 발견",
      "es": "Indicio Encontrado",
      "fr": "Indice Matériel",
      "de": "Spur Gesichert",
      "ru": "Улика найдена",
      "it": "Traccia Trovata",
      "pt": "Vestígio Encontrado",
      "ar": "العثور على أثر حاسم"
    },
    "text": {
      "en": "Snagged on the wrought-iron gargoyle is a torn shred of midnight-blue velvet. It matches the high collar of Madame Vance's mourning coat. Next to it, an empty glass ampoule labeled 'Tincture of Somnus & Cyanide'.",
      "id": "Tersangkut pada patung gargoyle besi tempa adalah sobekan beludru biru tua. Warnanya identik dengan kerah mantel berkabung milik Nyonya Vance. Di sebelahnya, tergeletak ampul kaca kosong bertuliskan 'Tinktur Somnus & Sianida'.",
      "zh": "铸铁滴水兽上挂着一片深蓝丝绒布料，与薇薇安夫人的丧服衣领完全吻合。旁边遗落着贴有“催眠酊剂与氰化物”的空玻璃安瓿。",
      "ja": "錬鉄のガーゴイルに濃紺のビロード布片が引っかかっていた。ヴィヴィアン夫人の喪服襟と完全に一致する。隣には『青酸』の空アンプルがあった。",
      "ko": "가고일에 짙은 남색 벨벳 조각이 찢겨 걸려 있었습니다. 비비안 부인의 상복 칼라와 일치합니다. 옆에는 '청산가리' 빈 앰플이 떨어져 있었습니다.",
      "es": "Enganchado en la gárgola hay terciopelo azul noche. Coincide con el abrigo de Madame Vance. Al lado, una ampolla de 'Cianuro'.",
      "fr": "Accroché à la gargouille, un lambeau de velours bleu nuit. Il correspond au manteau de Madame Vance. À côté, une fiole de 'Cyanure'.",
      "de": "Am Wasserspeier hängt mitternachtsblauer Samt von Madame Vances Mantel. Daneben ein leeres Fläschchen mit 'Zyankali'.",
      "ru": "На горгулье зацепился лоскут синего бархата от пальто мадам Вэнс. Рядом лежит пустая ампула «Цианид».",
      "it": "Nel doccione c'è un brandello di velluto blu notte identico all'abito di Vivienne. Accanto, un'ampolla con scritto 'Cianuro'.",
      "pt": "Preso na gárgula há veludo azul-marinho do casaco de Vivienne. Ao lado, uma ampola rotulada 'Cianeto'.",
      "ar": "علق بتمثال المزراب شريط مخملي أزرق ممزق يتطابق مع معطف السيدة فانس، وبجواره أمبول زجاجي فارغ موسوم بـ 'سيانيد'."
    },
    "options": [
      {
        "en": "\"The smoking gun. She was here on the balcony right after Vance died.\"",
        "id": "\"Bukti tak terbantahkan. Vivienne berada di balkon ini tepat setelah Aurelia tewas.\"",
        "zh": "“确凿铁证。奥蕾莉亚刚遇害时她就在这露台上。”",
        "ja": "「動かぬ証拠だ。ヴァンスの絶命直後、彼女はここにいた。」",
        "ko": "\"결정적 물증이오. 밴스가 숨진 직후 그녀는 이곳 발코니에 있었소.\"",
        "es": "\"La prueba irrefutable. Estuvo aquí en el balcón justo tras la muerte de Vance.\"",
        "fr": "\"La preuve irréfutable. Elle était sur ce balcon juste après la mort de Vance.\"",
        "de": "\"Der rauchende Colt. Sie war unmittelbar nach Vances Tod hier auf dem Balkon.\"",
        "ru": "«Неопровержимая улика. Она была здесь сразу после смерти Аурелии.»",
        "it": "\"La pistola fumante. Era qui sul balcone subito dopo la morte di Vance.\"",
        "pt": "\"A prova irrefutável. Ela esteve nesta sacada logo após a morte de Vance.\"",
        "ar": "\"الدليل القاطع: كانت فيفيان هنا على الشرفة فور وقوع الجريمة.\""
      }
    ]
  },
  "balcony_search_fail": {
    "speaker": {
      "en": "Diluted Traces",
      "id": "Jejak Terhapus",
      "zh": "雨水冲刷无存",
      "ja": "雨に流された足跡",
      "ko": "빗물에 씻겨나간 흔적",
      "es": "Rastros Diluidos",
      "fr": "Traces Effacées",
      "de": "Verwaschene Spuren",
      "ru": "Размытые следы",
      "it": "Tracce Cancellate",
      "pt": "Rastros Lavados",
      "ar": "آثار محاها المطر"
    },
    "text": {
      "en": "The driving downpour has washed away almost all footsteps. You only find muddy smears and puddles of soot.",
      "id": "Hujan deras telah menghapus hampir semua jejak kaki. Kamu hanya menemukan noda lumpur dan genangan jelaga mesin.",
      "zh": "暴雨冲刷掉了所有脚印痕迹，只剩下泥泞的污渍与煤烟水洼。",
      "ja": "激しい雨が足跡を洗い流してしまった。泥と煤の水たまりしか残っていない。",
      "ko": "폭우가 발자국을 깨끗이 씻어내 버렸습니다. 진흙과 그을음 웅덩이만 남았습니다.",
      "es": "El aguacero ha borrado casi todas las huellas. Solo hallas barro y hollín.",
      "fr": "La pluie battante a emporté les empreintes. Vous ne trouvez que de la suie boueuse.",
      "de": "Der Wolkenbruch hat fast alle Fußspuren weggespült. Nur Schlamm und Rußpfützen bleiben.",
      "ru": "Ливень смыл почти все следы. Вокруг лишь размытая грязь и лужи сажи.",
      "it": "Il rovescio ha cancellato quasi ogni impronta. Trovi solo fango e pozzanghere di fuliggine.",
      "pt": "A chuva forte lavou quase todas as pegadas. Você só encontra lama e fuligem.",
      "ar": "جرفت الأمطار الغزيرة آثار الأقدام تمامًا، ولم تترك سوى بقع طين وسخام."
    },
    "options": [
      {
        "en": "[Step back inside]",
        "id": "[Melangkah kembali ke dalam]",
        "zh": "【返回室内】",
        "ja": "【中へ戻る】",
        "ko": "[실내로 물러선다]",
        "es": "[Volver adentro]",
        "fr": "[Ranger et rentrer]",
        "de": "[Wieder eintreten]",
        "ru": "[Шагнуть внутрь]",
        "it": "[Torna dentro]",
        "pt": "[Voltar para dentro]",
        "ar": "[الرجوع للداخل]"
      }
    ]
  },
  "balcony_fog_reflection": {
    "speaker": {
      "en": "Atmospheric Reverie",
      "id": "Renungan Suasana Hujan",
      "zh": "冷雨夜形而上沉思",
      "ja": "雨の瞑想",
      "ko": "냉혹한 빗속의 사색",
      "es": "Ensueño Atmosférico",
      "fr": "Rêverie Atmosphérique",
      "de": "Atmosphärische Einkehr",
      "ru": "Атмосферное раздумье",
      "it": "Riflessione Notturna",
      "pt": "Devaneio Noturno",
      "ar": "تأملات المطر"
    },
    "text": {
      "en": "You stare down at the sprawling darkness of Malkuth-on-Thames. You have unlocked a new avenue of introspection: 'Metaphysics of Cold Rain'. You can internalize this thought in your Thought Cabinet.",
      "id": "Kamu menatap kegelapan kota di bawah hujan. Kamu membuka pikiran baru: 'Metafisika Hujan Dingin'. Kamu bisa menginternalisasikannya di Lemari Pikiran.",
      "zh": "你凝望雨雾深渊。新的思维之门轰然洞开：“冷雨形而上学”。可在思维阁中内化此思想。",
      "ja": "雨煙る街の暗闇を見下ろす。新たな思考「冷雨の形而上学」がアンロックされた。思考キャビネットで内面化可能だ。",
      "ko": "빗속 도시의 어둠을 내려다봅니다. 새로운 생각 '차가운 비의 형이상학'이 열렸습니다. 생각 보관함에서 내면화할 수 있습니다.",
      "es": "Miras la oscuridad de la ciudad bajo la lluvia. Desbloqueas: 'Metafísica de la Lluvia Fría' para el Gabinete.",
      "fr": "Vous contemplez les ténèbres sous le déluge. Une nouvelle pensée s'éveille : 'Métaphysique de la Pluie Froide'.",
      "de": "Sie blicken in das Dunkel im Regen. Sie schalten 'Metaphysik des Kalten Regens' frei.",
      "ru": "Ты смотришь в черную бездну города под дождем. Открыта мысль: «Метафизика холодного дождя».",
      "it": "Fissi l'oscurità della città sotto la pioggia. Sblocchi il pensiero: 'Metafisica della Pioggia Fredda'.",
      "pt": "Você contempla a escuridão sob a chuva. Desbloqueado: 'Metafísica da Chuva Fria'.",
      "ar": "تحدق في ظلام المدينة تحت المطر، وانفتحت لك فكرة: 'ميتافيزيقا المطر البارد' في خزانة الأفكار."
    },
    "options": [
      {
        "en": "[Return to the gear room]",
        "id": "[Kembali ke ruang roda gigi]",
        "zh": "【返回齿轮大厅】",
        "ja": "【歯車室へ戻る】",
        "ko": "[톱니바퀴 방으로 복귀]",
        "es": "[Volver a la sala de engranajes]",
        "fr": "[Retourner à la salle des rouages]",
        "de": "[Zurück zum Räderwerk]",
        "ru": "[Вернуться в зал шестерен]",
        "it": "[Torna alla sala degli ingranaggi]",
        "pt": "[Voltar à sala de engrenagens]",
        "ar": "[العودة لغرفة التروس]"
      }
    ]
  },
  "safe_brute_trap": {
    "speaker": {
      "en": "Lethal Anti-Tamper Trap",
      "id": "Perangkap Maut Brankas",
      "zh": "防盗自毁反噬",
      "ja": "防犯トラップ作動",
      "ko": "방범 트랩 발동",
      "es": "Trampa Letal",
      "fr": "Piège Mortel",
      "de": "Tödliche Sicherheitsfalle",
      "ru": "Смертоносная ловушка",
      "it": "Trappola Letale",
      "pt": "Armadilha Letal",
      "ar": "فخ الموت بالخزنة"
    },
    "text": {
      "en": "As your crowbar strains against the hinge, an internal shear-pin snaps. A pressurized needle array fires into your forearm, and chlorine gas erupts (-3 Health, -2 Morale)!",
      "id": "Saat linggismu menekan engsel, pin pengaman internal patah. Rangkaian jarum bertekanan menembus lenganmu, dan gas klorin menyembur (-3 Daya Tahan, -2 Kewarasan)!",
      "zh": "铁撬压向合页时安全销折断！数十枚微型毒针射入前臂，刺鼻氯气喷涌（生命值 -3，士气 -2）！",
      "ja": "バールで力を込めた瞬間、安全ピンが破断した。加圧毒針が無数に刺さり塩素ガスが噴出する（体力 -3、正気度 -2）！",
      "ko": "쇠지렛대로 비트는 순간 핀이 부러졌습니다. 가압 독침이 쏘아지고 염소 가스가 폭발합니다 (체력 -3, 사기 -2)!",
      "es": "Al forzar la bisagra salta un pasador. ¡Agujas presurizadas perforan tu brazo y estalla cloro (-3 Salud, -2 Moral)!",
      "fr": "Le gond cède et brise une goupille. Des aiguilles vous criblent le bras sous un nuage de chlore (-3 Santé, -2 Moral)!",
      "de": "Als Sie hebeln, bricht ein Stift. Drucknadeln schießen in Ihren Arm und Chlorgas strömt aus (-3 Gesundheit, -2 Moral)!",
      "ru": "Монтировка ломает штифт. Залп игл впивается в руку, и хлорный газ бьет в лицо (-3 Здоровье, -2 Мораль)!",
      "it": "La leva spezza un perno. Aghi pressurizzati ti colpiscono ed esplode cloro (-3 Salute, -2 Morale)!",
      "pt": "Um pino se rompe. Agulhas perfuram seu antebraço e gás venenoso irrompe (-3 Saúde, -2 Moral)!",
      "ar": "انكسر صمام الأمان الداخلي فانطلقت مصفوفة إبر مضغوطة طعنت ذراعك وتصاعد غاز الكلور الخانق (-3 صحة، -2 معنويات)!"
    },
    "options": [
      {
        "en": "\"Coughing blood... what a vicious trap!\"",
        "id": "\"Batuk darah... perangkap yang sangat keji!\"",
        "zh": "“咳血……好恶毒的机关！”",
        "ja": "「ゲホッ……なんという凶悪な罠だ……」",
        "ko": "\"쿨럭... 끔찍한 함정이군...\"",
        "es": "\"Cof... ¡qué trampa tan perversa!\"",
        "fr": "\"Toux... quel piège vicieux !\"",
        "de": "\"Hust... was für eine Falle!\"",
        "ru": "«Кашляет кровью... ну и ловушка!»",
        "it": "\"Tosse... che trappola maledetta!\"",
        "pt": "\"Tosse... que armadilha cruel!\"",
        "ar": "\"سعال دامٍ... يا له من فخ خبيث!\""
      }
    ]
  },
  "safe_logic_fail": {
    "speaker": {
      "en": "Lockpick Attempt",
      "id": "Perangkap Brankas Meledak!",
      "zh": "防盗机械闭锁反击",
      "ja": "金庫の防犯機構作動",
      "ko": "금고 잠금 함정 발동",
      "es": "Mecanismo Bloqueado",
      "fr": "Échec du Crochetage",
      "de": "Fehlschlag am Tresor",
      "ru": "Ошибка взлома",
      "it": "Tentativo Fallito",
      "pt": "Falha no Arrombamento",
      "ar": "تعطل محاولة الفتح"
    },
    "text": {
      "en": "The internal tumblers jam with a harsh screech. An internal anti-tamper glass vial cracks, releasing foul sulfur gas and a spring trap snaps on your hands (-2 Health, -1 Morale)!",
      "id": "Silinder internal macet dengan derit memekakkan telinga. Ampul kaca anti-pencuri pecah, menyemburkan gas belerang beracun dan penjepit baja menghantam jarimu (-2 Daya Tahan, -1 Kewarasan)!",
      "zh": "滚轮齿槽尖叫卡死。防盗玻璃管碎裂释放硫磺毒气，弹簧钢夹咬碎了你的手指（生命值 -2，士气 -1）！",
      "ja": "タンブラーが耳障りに噛み合わなくなった。防犯ガラスが割れ硫黄ガスとバネ罠が手を直撃する（体力 -2、正気度 -1）！",
      "ko": "텀블러가 날카로운 소리를 내며 잠깁니다. 유리관이 깨져 유황 가스가 뿜어지고 스프링이 손을 칩니다 (-2 체력, -1 사기)!",
      "es": "Los tambores se atascan. Una ampolla se rompe soltando azufre y una trampa golpea tus manos (-2 Salud, -1 Moral).",
      "fr": "Les gorges se bloquent. Une fiole libère du soufre gazeux tandis qu'un piège frappe vos doigts (-2 Santé, -1 Moral).",
      "de": "Das Werk blockiert kreischend. Eine Glasampulle platzt, Schwefelgas strömt aus und die Falle schnappt zu (-2 Gesundheit, -1 Moral)!",
      "ru": "Диски заклинивает со скрежетом. Серный газ бьет в лицо, а капкан бьет по рукам (-2 Здоровье, -1 Мораль)!",
      "it": "I tamburi si inceppano. Una fiala rilascia gas di zolfo e una trappola scatta sulle tue dita (-2 Salute, -1 Morale).",
      "pt": "Os tambores travam. Uma ampola libera gás sulfuroso e a armadilha machuca suas mãos (-2 Saúde, -1 Moral).",
      "ar": "تعطلت الأقراص بصرير حاد وانكسرت أسطوانة الزجاج لتنشر غاز الكبريت وطبق زنبرك الفخ على يديك (-2 صحة، -1 معنويات)!"
    },
    "options": [
      {
        "en": "\"Damn anti-tamper traps!\"",
        "id": "\"Sialan! Perangkap brankas terkutuk!\"",
        "zh": "“该死……阴险的防盗自毁机关！”",
        "ja": "「くそっ、厄介な防犯トラップめ！」",
        "ko": "\"빌어먹을 방범 장치 같으니!\"",
        "es": "\"¡Malditas trampas de seguridad!\"",
        "fr": "\"Maudits pièges de sécurité !\"",
        "de": "\"Verdammte Sicherheitsfallen!\"",
        "ru": "«Проклятые ловушки от взлома!»",
        "it": "\"Maledette trappole antimanomissione!\"",
        "pt": "\"Malditas armadilhas antifurto!\"",
        "ar": "\"سحقًا لفخاخ الحماية الغادرة!\""
      }
    ]
  },
  "madame_premature_arrest_fail": {
    "speaker": {
      "en": "Catastrophic Blunder",
      "id": "Tindakan Gegabah yang Fatal",
      "zh": "严重渎职与灾难",
      "ja": "破滅的な失態",
      "ko": "치명적인 실책",
      "es": "Error Catastrófico",
      "fr": "Bévue Catastrophique",
      "de": "Katastrophaler Fehltritt",
      "ru": "Фатальная ошибка",
      "it": "Errore Catastrofico",
      "pt": "Erro Catastrófico",
      "ar": "خطأ مهني كارثي"
    },
    "text": {
      "en": "Inspector Graves grabs your shoulder and cocks his service revolver. 'That is enough, Detective! You have no proof, you reek of alcohol, and you are terrorizing a grieving citizen under police protection. Hand over your badge. You are under arrest for extortion and gross misconduct!'",
      "id": "Inspektur Graves mencengkeram bahumu dan mengokang pistol dinasnya. 'Cukup, Detektif! Kamu menuduh warga tanpa selembar pun bukti fisik sambil berbau alkohol. Serahkan lencana dan senjatamu. Kamu ditangkap atas pemerasan dan pelanggaran berat!'",
      "zh": "格雷夫斯抓住你的肩膀，拔出左轮手枪压下击锤！“够了！手里毫无证据却浑身酒气恐吓市民。交出警徽，你被捕了！”",
      "ja": "グレイヴスが肩を掴み拳銃を起こした。「そこまでだ！証拠もなしに酒臭い息で市民を脅すとは。バッジを渡せ、逮捕する！」",
      "ko": "그레이브스가 어깨를 낚아채며 권총을 겨눕니다. '그만하시오! 물증도 없이 술 냄새를 풍기며 유족을 협박하다니. 배지 내놓으시오, 체포요!'",
      "es": "Graves te agarra y amartilla su revólver. '¡Basta! Sin pruebas y oliendo a alcohol está amenazando a una ciudadana. Queda arrestado.'",
      "fr": "L'inspecteur Graves arme son revolver. 'Ça suffit ! Sans preuves et empestant l'alcool, vous terrorisez une citoyenne. Vous êtes aux arrêts !'",
      "de": "Graves packt Sie und spannt den Hahn. 'Es reicht! Ohne Beweise schikanieren Sie Bürger. Geben Sie die Marke ab, Sie sind verhaftet!'",
      "ru": "Грейвс хватает тебя за плечо и взводит курок. «Хватит! Без улик, пьяный, ты терроризируешь потерпевшую. Сдай жетон, ты арестован!»",
      "it": "Graves ti afferra e arma il revolver. 'Basta! Senza prove e puzzando di alcol minacci una cittadina. Consegna il distintivo, sei in arresto!'",
      "pt": "Graves agarra seu ombro e engatilha o revólver. 'Chega! Sem provas você aterroriza a viúva. Entregue o distintivo, está preso!'",
      "ar": "أمسك غريفز بكتفك وسحب مطرقة مسدسه: 'كفى! بلا دليل وتفوح منك الخمر وترهب مواطنة! سلم شارتك، أنت معتقل!'"
    },
    "options": [
      {
        "en": "[Yield to the handcuffs]",
        "id": "[Pasrah pada borgol baja]",
        "zh": "【认罪受缚，戴上手铐】",
        "ja": "【手錠を受け入れる】",
        "ko": "[수갑에 순응한다]",
        "es": "[Ceder ante las esposas]",
        "fr": "[Céder aux menottes]",
        "de": "[Sich den Handschellen beugen]",
        "ru": "[Смириться с наручниками]",
        "it": "[Arrenditi alle manette]",
        "pt": "[Render-se às algemas]",
        "ar": "[الاستسلام للقيود]"
      }
    ]
  },
  "madame_alibi": {
    "speaker": {
      "en": "Madame Vivienne Vance",
      "id": "Nyonya Vivienne Vance",
      "zh": "薇薇安·梵斯夫人",
      "ja": "ヴィヴィアン・ヴァンス夫人",
      "ko": "비비안 밴스 부인",
      "es": "Madame Vivienne Vance",
      "fr": "Madame Vivienne Vance",
      "de": "Madame Vivienne Vance",
      "ru": "Мадам Вивьен Вэнс",
      "it": "Madame Vivienne Vance",
      "pt": "Madame Vivienne Vance",
      "ar": "السيدة فيفيان فانس"
    },
    "text": {
      "en": "'I told your companion Inspector Graves: I was downstairs in the Saint Irene chapel, lighting candles for the departed souls of the epidemic. The priest can attest to my presence—though he was asleep in his confessional booth.'",
      "id": "'Sudah kukatakan pada rekanmu Inspektur Graves: aku berada di bawah di kapel Saint Irene, menyalakan lilin untuk jiwa-jiwa korban wabah. Romo gereja bisa bersaksi—meski dia tertidur di bilik pengakuan dosanya.'",
      "zh": "“我已经告诉过格雷夫斯警探了：当时我在楼下小礼拜堂为大瘟疫亡灵点烛祈祷。神父能作证——尽管他整晚都在告解室打盹。”",
      "ja": "「グレイヴス警部にも話した通りよ。礼拝堂で犠牲者のために蝋燭を灯していたわ。司祭様が証明してくれる——居眠りしていたけれど。」",
      "ko": "\"그레이브스 형사에게도 말했듯, 전 아래층 예배당에서 촛불을 켜고 있었어요. 사제님께서 증언해 주실 거예요. 졸고 계셨지만요.\"",
      "es": "'Ya se lo dije a Graves: estuve en la capilla encendiendo velas por la epidemia. El párroco puede atestiguarlo, aunque dormitaba.'",
      "fr": "'Je l'ai dit à votre collègue : j'allumais des cierges pour les défunts. Le prêtre peut l'attester, même s'il sommeillait.'",
      "de": "'Ich sagte es Graves: Ich entzündete Kerzen in der Kapelle für die Seuchenopfer. Der Priester bezeugt es, obwohl er döste.'",
      "ru": "«Я уже сказала Грейвсу: я была в часовне и зажигала свечи за упокой. Священник подтвердит, хоть он и дремал.»",
      "it": "'L'ho detto a Graves: ero nella cappella ad accendere candele. Il parroco può confermare, anche se dormiva.'",
      "pt": "'Já disse ao inspetor: estava na capela acendendo velas pela epidemia. O padre pode atestar, embora cochilasse.'",
      "ar": "'أخبرت غريفز مسبقًا: كنت بالمصلى أوقد الشموع لضحايا الوباء، وبوسع الكاهن أن يشهد رغم أنه كان يغفو بمقصورته.'"
    },
    "options": [
      {
        "en": "\"Convenient. An alibi witnessed by a sleeping priest.\"",
        "id": "\"Alibi yang nyaman. Disaksikan seorang pendeta yang tertidur.\"",
        "zh": "“真方便，一个熟睡神父作证的不在场证明。”",
        "ja": "「眠っていた司祭のアリバイか。実に都合がいい。」",
        "ko": "\"졸고 있던 사제가 증인이라니 편리한 알리바이군요.\"",
        "es": "\"Conveniente. Una coartada presenciada por un cura dormido.\"",
        "fr": "\"Commode. Un alibi attesté par un prêtre endormi.\"",
        "de": "\"Praktisch. Ein Alibi von einem schlafenden Priester.\"",
        "ru": "«Очень удобно. Алиби от спящего священника.»",
        "it": "\"Comodo. Un alibi da un prete che dormiva.\"",
        "pt": "\"Conveniente. Álibi de um padre dorminhoco.\"",
        "ar": "\"حجة غياب ملائمة، شاهدها كاهن نائم.\""
      }
    ]
  },
  "madame_empathy_win": {
    "speaker": {
      "en": "Madame Vivienne Vance",
      "id": "Nyonya Vivienne Vance",
      "zh": "薇薇安·梵斯夫人",
      "ja": "ヴィヴィアン・ヴァンス夫人",
      "ko": "비비안 밴스 부인",
      "es": "Madame Vivienne Vance",
      "fr": "Madame Vivienne Vance",
      "de": "Madame Vivienne Vance",
      "ru": "Мадам Вивьен Вэнс",
      "it": "Madame Vivienne Vance",
      "pt": "Madame Vivienne Vance",
      "ar": "السيدة فيفيان فانس"
    },
    "text": {
      "en": "Her eyes widen slightly, and for a split second the porcelain mask drops. 'Love? Aurelia did not love human beings, Detective. She loved springs, escapements, and cold brass gears. For thirty years I was just a domestic pendulum swinging in her hallway. While our daughter died of consumption, she was upstairs building an alchemical chronometer to sell to foreign bankers.'",
      "id": "Matanya membesar sesaat, dan topeng porselennya runtuh. 'Cinta? Aurelia tidak mencintai manusia, Detektif. Dia mencintai pegas, roda gigi, dan kuningan dingin. Selama tiga puluh tahun aku hanyalah pendulum rumah tangga di lorongnya. Saat putri kami meninggal karena penyakit paru-paru, dia malah di lantai atas merakit kronometer alkimia untuk dijual ke bankir asing.'",
      "zh": "她的眼眸颤动，面具轰然瓦解。“爱？奥蕾莉亚从不爱人类，探长。她只爱发条与冰冷齿轮。三十年来我不过是走廊里的钟摆。女儿因痨病痛苦死去时，她却在楼上拼装卖给银行家的军械！”",
      "ja": "仮面が崩れ落ちた。「愛？オレリアは人間など愛していなかった。冷たい歯車だけを愛したのよ。30年、私はただの振り子だった。娘が結核で死ぬ時も、彼女は武器を組み立てていたわ。」",
      "ko": "도자기 가면이 깨집니다. '사랑이요? 오렐리아는 인간을 사랑하지 않았어요. 차가운 톱니만 사랑했죠. 딸아이가 폐결핵으로 죽어갈 때도 외국에 팔아넘길 시계를 조립하고 있었어요.'",
      "es": "Cae su máscara. '¿Amor? Aurelia amaba los engranajes fríos. Mientras nuestra hija moría de tuberculosis, ella armaba armas para banqueros.'",
      "fr": "Le masque tombe. 'L'amour ? Aurelia n'aimait que ses froids rouages. Quand notre fille mourait de phtisie, elle fabriquait des armes pour des banquiers.'",
      "de": "Ihre Maske fällt. 'Liebe? Aurelia liebte nur Messingräder. Als unsere Tochter starb, baute sie Waffen für ausländische Bankiers.'",
      "ru": "Маска падает. «Любовь? Аурелия любила только шестеренки. Пока дочь умирала от чахотки, она собирала механизм на продажу банкирам.»",
      "it": "La maschera cade. 'Amore? Aurelia amava solo gli ingranaggi. Mentre nostra figlia moriva, lei costruiva congegni per i banchieri.'",
      "pt": "A máscara cai. 'Amor? Aurelia só amava engrenagens. Enquanto nossa filha morria de tuberculose, ela montava armas para banqueiros.'",
      "ar": "سقط قناعها: 'حب؟ لم تكن تحب إلا التروس الباردة! حين كانت ابنتنا تحتضر بالسل، كانت هي عاكفة على بيع أسلحة الساعات للبنوك!'"
    },
    "options": [
      {
        "en": "\"So you decided to stop her clock once and for all.\"",
        "id": "\"Jadi kamu memutuskan untuk menghentikan jam hidupnya untuk selamanya.\"",
        "zh": "“所以你决定让她的生命指针彻底停滞。”",
        "ja": "「だから時計の針を永遠に止めたのか。」",
        "ko": "\"그래서 그녀의 시계를 영원히 멈추기로 했군요.\"",
        "es": "\"Así que decidió detener su reloj de una vez por todas.\"",
        "fr": "\"Vous avez donc décidé d'arrêter son horloge pour toujours.\"",
        "de": "\"Also beschlossen Sie, ihre Uhr für immer anzuhalten.\"",
        "ru": "«И вы решили остановить ее часы раз и навсегда.»",
        "it": "\"Così ha deciso di fermare il suo orologio per sempre.\"",
        "pt": "\"Então você decidiu parar o relógio dela de uma vez por todas.\"",
        "ar": "\"ولهذا قررتِ إيقاف عقارب حياتها للأبد.\""
      }
    ]
  },
  "madame_empathy_fail": {
    "speaker": {
      "en": "Madame Vivienne Vance",
      "id": "Nyonya Vivienne Vance",
      "zh": "薇薇安·梵斯夫人",
      "ja": "ヴィヴィアン・ヴァンス夫人",
      "ko": "비비안 밴스 부인",
      "es": "Madame Vivienne Vance",
      "fr": "Madame Vivienne Vance",
      "de": "Madame Vivienne Vance",
      "ru": "Мадам Вивьен Вэнс",
      "it": "Madame Vivienne Vance",
      "pt": "Madame Vivienne Vance",
      "ar": "السيدة فيفيان فانس"
    },
    "text": {
      "en": "'How vulgar. You stumble in here, smelling of gin and cheap tobacco, and dare question thirty years together? Inspector Graves, remove this animal from my presence!'",
      "id": "'Betapa menjijikkan. Kamu tersandung masuk ke sini dengan bau alkohol murahan, dan berani mempertanyakan tiga puluh tahun kebersamaan kami? Inspektur Graves, singkirkan makhluk ini dari hadapanku!'",
      "zh": "“粗俗之尤！你一身劣质杜松子酒的恶臭闯进来，竟敢质疑我们三十年的相守？格雷夫斯警探，请把这个狂徒带走！”",
      "ja": "「下品ね。安酒の臭いを撒き散らして闖入し、私たちの30年を侮辱する気？グレイヴス、この男を追い出して！」",
      "ko": "\"천박하군요. 싸구려 술 냄새를 풍기며 들어와 우리의 30년을 모욕하다니. 그레이브스 형사, 당장 내쫓으세요!\"",
      "es": "'Qué vulgar. Entra oliendo a ginebra barata y cuestiona treinta años de matrimonio. ¡Graves, aparte a este animal!'",
      "fr": "'Quelle vulgarité. Vous empestez le gin et osez juger trente ans de mariage ? Graves, éloignez cet individu !'",
      "de": "'Wie vulgär. Sie stinken nach Schnaps und wagen es, dreißig Jahre Ehe anzuzweifeln? Graves, schaffen Sie ihn fort!'",
      "ru": "«Какая пошлость. Вы заваливаетесь с запахом джина и смеете судить о 30 годах брака? Грейвс, уберите его!»",
      "it": "'Che volgarità. Puzzi di gin scadente e osi giudicare trent'anni insieme? Graves, allontanalo!'",
      "pt": "'Que vulgar. Cheirando a gim barato você ousa questionar trinta anos de união? Graves, tire-o daqui!'",
      "ar": "'يا لك من سوقي! تفوح منك رائحة الكحول الرخيصة وتشكك في ثلاثين عامًا من زواجنا؟ يا غريفز أبعده عني!'"
    },
    "options": [
      {
        "en": "\"Hold your tongue, Madame. I am not finished.\"",
        "id": "\"Jaga lidahmu, Nyonya. Aku belum selesai.\"",
        "zh": "“放尊重点，夫人。审问还没结束。”",
        "ja": "「口を慎め、夫人。まだ終わっていない。」",
        "ko": "\"말조심하시오. 아직 끝나지 않았소.\"",
        "es": "\"Cuidado con su lengua, señora. No he terminado.\"",
        "fr": "\"Surveillez vos paroles, Madame. Je n'ai pas fini.\"",
        "de": "\"Hüten Sie Ihre Zunge, Madame. Ich bin nicht fertig.\"",
        "ru": "«Придержите язык, мадам. Я не закончил.»",
        "it": "\"Badi a come parla, Madame. Non ho finito.\"",
        "pt": "\"Cuidado com a língua, senhora. Não terminei.\"",
        "ar": "\"الزمي حدودك يا سيدتي، لم أنته بعد.\""
      }
    ]
  },
  "madame_confession_fail": {
    "speaker": {
      "en": "Unshakable Defiance",
      "id": "Bantahan Dingin",
      "zh": "寸步不让的冷酷抵抗",
      "ja": "揺るぎなき拒絶",
      "ko": "냉혹한 전면 부인",
      "es": "Desafío Inquebrantable",
      "fr": "Défiance Inébranlable",
      "de": "Eiskalte Abweisung",
      "ru": "Ледяное отрицание",
      "it": "Sfida Incrollabile",
      "pt": "Desafio Inabalável",
      "ar": "الإنكار الجليدي الصارم"
    },
    "text": {
      "en": "'Are you insane?' Her voice turns to ice. 'Fabricating evidence against a grieving partner in front of another police officer? Graves, arrest this incompetent maniac before this creature desecrates Aurelia's remains any further!' Graves steps between you with his hand on his revolver (-2 Morale).",
      "id": "'Apakah kamu sudah gila?' Suaranya membeku bagai es. 'Merekayasa tuduhan terhadap pasangan yang berduka di depan perwira polisi lainnya? Graves, tangkap orang mabuk ini sebelum dia menodai jasad Aurelia lebih jauh!' Graves melangkah maju dengan tangan di gagang pistolnya (-2 Kewarasan).",
      "zh": "“你疯了吗？”她的声音冷若冰霜。“在另一位警察面前伪造证据构陷遗孀？格雷夫斯，快拘捕这个疯子，免得他玷污遗体！”格雷夫斯手按配枪挡在中间（士气 -2）。",
      "ja": "「正気？他の警官の前で証拠を捏造するなんて。グレイヴス、遺体を冒涜される前にこの狂人を拘束して！」グレイヴスが割って入る（正気度 -2）。",
      "ko": "\"미쳤나요? 다른 경찰관 앞에서 증거를 조작해 유족을 모함하다니요. 그레이브스, 당장 체포해요!\" 그레이브스가 총을 쥐고 막아섭니다 (사기 -2).",
      "es": "'¿Está loco?' Su voz es hielo. '¿Fabricar pruebas contra una viuda ante otro oficial? ¡Graves, arreste a este loco!' Graves se interpone (-2 Moral).",
      "fr": "'Êtes-vous fou ?' Sa voix se glace. 'Fabriquer des preuves contre une veuve devant un policier ? Graves, arrêtez-le !' Graves s'interpose (-2 Moral).",
      "de": "'Sind Sie verrückt?' Ihre Stimme wird Eis. 'Beweise gegen eine Witwe zu fälschen? Graves, verhaften Sie ihn!' Graves tritt dazwischen (-2 Moral).",
      "ru": "«Вы с ума сошли?» Голос звенит льдом. «Фабриковать улики против вдовы при полиции? Грейвс, уйми его!» Грейвс встает между вами (-2 Мораль).",
      "it": "'È impazzito?' La voce si gela. 'Fabbricare prove contro una vedova davanti a un collega? Graves, arrestalo!' Graves interviene (-2 Morale).",
      "pt": "'Está louco?' A voz vira gelo. 'Forjando provas contra uma viúva na frente de outro policial? Graves, prenda-o!' Graves intervém (-2 Moral).",
      "ar": "'هل جننت؟ تلفق أدلة ضد أرملة مفجوعة أمام زميلك؟ يا غريفز اعتقل هذا المعتوه!' تقدم غريفز بينكما واضعًا يده على مسدسه (-2 معنويات)."
    },
    "options": [
      {
        "en": "\"This isn't over, Vivienne.\"",
        "id": "\"Ini belum berakhir, Vivienne.\"",
        "zh": "“这还没完，薇薇安。”",
        "ja": "「まだ終わっていないぞ、ヴィヴィアン。」",
        "ko": "\"아직 끝나지 않았소, 비비안.\"",
        "es": "\"Esto no ha terminado, Vivienne.\"",
        "fr": "\"Ce n'est pas fini, Vivienne.\"",
        "de": "\"Das ist noch nicht vorbei, Vivienne.\"",
        "ru": "«Это еще не конец, Вивьен.»",
        "it": "\"Non è ancora finita, Vivienne.\"",
        "pt": "\"Isso não acabou, Vivienne.\"",
        "ar": "\"لم تنته القضية بعد يا فيفيان.\""
      }
    ]
  },
  "examine_gantry_lantern": {
    "speaker": {
      "en": "Alchemical Lantern Catwalk",
      "id": "Anjungan Lentera Alkimia",
      "zh": "上层提灯悬空栈桥",
      "ja": "ランタン通路の検証",
      "ko": "연금술 등불 통로 조사",
      "es": "Pasarela de la Linterna",
      "fr": "Passerelle de la Lanterne",
      "de": "Laternensteg-Untersuchung",
      "ru": "Мостки алхимического фонаря",
      "it": "Camminamento della Lanterna",
      "pt": "Passarela da Lanterna",
      "ar": "فحص ممر الفانوس العلوي"
    },
    "text": {
      "en": "A cold draft rushes through the high iron grating. Shards of amber chemical glass crunch beneath your boot. Etched into a broken neck piece is the Grand Syndicate's mercury serpent seal.",
      "id": "Angin dingin berhembus melalui kisi-kisi besi tinggi. Serpihan kaca kimia berwarna kuning kecokelatan berderak di bawah sol sepatumu. Terukir pada pecahan leher botol terdapat lambang ular merkuri milik Sindikat Agung.",
      "zh": "阴冷夜风掠过镂空铁栅。脚底踩碎了琥珀色化学玻璃片。破损瓶颈处烙着辛迪加的水银双头蛇印记。",
      "ja": "高い鉄格子の上を冷風が吹き抜ける。琥珀色の薬品ガラス片が靴底で砕けた。瓶の首にはシンジケートの水銀蛇の紋章が刻印されている。",
      "ko": "철제 통로 위로 찬 바람이 붑니다. 호박색 화학 유리병 파편이 발밑에서 바삭거립니다. 깨진 병목에 신디케이트의 수은 뱀 문장이 새겨져 있습니다.",
      "es": "Una corriente fría cruza la rejilla. Cacos de vidrio crujen bajo tu bota con el sello de la serpiente de mercurio del Sindicato.",
      "fr": "Un courant d'air glacé traverse la grille. Des éclats de verre crissent sous vos bottes, marqués du serpent de mercure du Syndicat.",
      "de": "Zugwind weht über das Gitter. Bernsteinfarbene Glassplitter knirschen unter der Sohle mit dem Schlangen-Siegel des Syndikats.",
      "ru": "Холодный сквозняк свистит сквозь решетку. Осколки янтарного стекла хрустят под сапогом с печатью ртутного змея Синдиката.",
      "it": "Una corrente gelida sferza la grata. Vetri ambrati scricchiolano sotto gli stivali col serpente di mercurio del Sindacato.",
      "pt": "Vento frio sopra pela grade. Cacos de vidro estalam sob a bota com a serpente de mercúrio do Sindicato.",
      "ar": "ريح باردة تعصف عبر القضبان وشظايا الزجاج الكهرماني تطقطق تحت حذائك ممهورة بختم أفعى الزئبق الخاصة بالنقابة."
    },
    "voices": [
      {
        "voice": {
          "en": "Ratio",
          "id": "Rasio",
          "zh": "理性",
          "ja": "比率",
          "ko": "이성",
          "es": "Razón",
          "fr": "Ratio",
          "de": "Ratio",
          "ru": "Рацио",
          "it": "Ragione",
          "pt": "Razão",
          "ar": "العقلانية"
        },
        "badge": {
          "en": "RATIO [Intellect]",
          "id": "RASIO [Intelek]",
          "zh": "理性 [智力]",
          "ja": "比率 [知性]",
          "ko": "이성 [지성]",
          "es": "RAZÓN [Intelecto]",
          "fr": "RATIO [Intellect]",
          "de": "RATIO [Intellekt]",
          "ru": "РАЦИО [Интеллект]",
          "it": "RAGIONE [Intelletto]",
          "pt": "RAZÃO [Intelecto]",
          "ar": "العقلانية [الفكر]"
        },
        "text": {
          "en": "This confirms a clandestine drop hours before the death. The Syndicate delivered the chemical precursors directly to this tower.",
          "id": "Ini mengonfirmasi adanya transaksi rahasia beberapa jam sebelum kematian. Sindikat mengantarkan zat kimia langsung ke menara ini.",
          "zh": "这坐实了案发前数小时的秘密碰头。辛迪加将高危化学试剂亲手送到了钟楼！",
          "ja": "犯行数時間前に密使の接触があった決定打だ。シンジケートが薬品をこの塔へ直接届けたのだ。",
          "ko": "사건 몇 시간 전 은밀한 접선이 있었음을 증명합니다. 신디케이트가 화학 시약을 탑으로 직접 배달한 것입니다.",
          "es": "Esto confirma una entrega clandestina horas antes de la muerte.",
          "fr": "Ceci confirme un échange clandestin quelques heures avant le drame.",
          "de": "Das bestätigt eine geheime Übergabe wenige Stunden vor der Tat.",
          "ru": "Это доказывает тайную встречу за пару часов до гибели.",
          "it": "Ciò conferma una consegna clandestina poche ore prima del delitto.",
          "pt": "Isso confirma uma entrega secreta horas antes da morte.",
          "ar": "يؤكد هذا حدوث تسليم سري قبل الجريمة بساعات، حيث سلمت النقابة المواد إلى أعلى البرج."
        }
      }
    ],
    "options": [
      {
        "id": "[Turun kembali ke lantai utama]",
        "en": "[Step back down to the main floor]",
        "zh": "【回到塔楼主楼层】",
        "ja": "【メインフロアへ戻る】",
        "ko": "[메인 층으로 내려간다]",
        "es": "[Bajar al piso principal]",
        "fr": "[Redescendre à l'étage principal]",
        "de": "[Zurück zum Hauptgeschoss]",
        "ru": "[Спуститься на основной этаж]",
        "it": "[Torna al piano principale]",
        "pt": "[Descer ao piso principal]",
        "ar": "[النزول إلى الطابق الرئيسي]"
      }
    ]
  },
  "examine_chime_bell": {
    "speaker": {
      "en": "Colossal Bell & Acoustic Escapement",
      "id": "Lonceng Raksasa & Escapement Akustik",
      "zh": "圣艾琳青铜巨钟与共振击发机构",
      "ja": "巨大青銅鐘と音響脱進機",
      "ko": "청동 거대 종과 음향 탈진 장치",
      "es": "Campana Colosal y Disparador Acústico",
      "fr": "Cloche Colossale et Déclencheur Acoustique",
      "de": "Kolossale Glocke und Auslöser",
      "ru": "Исполинский колокол и спуск",
      "it": "Campana Colossale e Scappamento Acustico",
      "pt": "Sino Colossal e Escape Acústico",
      "ar": "الجرس الضخم وآلية الإفلات بالرنين"
    },
    "text": {
      "en": "You look up into the cavernous rim of the eight-ton bronze bell. Tied to the heavy iron clapper is a taut piano wire running through tiny brass pulleys down to the pendulum latch.",
      "id": "Kamu menatap ke dalam rongga lonceng perunggu seberat delapan ton. Terikat pada pemukul besi adalah kawat piano tegang yang menjulur melalui puli kuningan kecil menuju kait pendulum.",
      "zh": "你仰望八吨重的青铜大钟内膛。铁铸钟锤上栓着紧绷的琴钢丝，穿过微型滑轮直通下方的钟摆搭扣！",
      "ja": "8トンの巨大な青銅鐘の内側を見上げる。重い打鐘レバーにピアノ線が結ばれ、極小滑車を通って振り子の掛け金へ繋がっている。",
      "ko": "8톤짜리 청동 종 안쪽을 올려다봅니다. 무거운 종 추에 팽팽한 피아노선이 묶여 황동 도르래를 통해 진자 걸쇠까지 이어져 있습니다.",
      "es": "Miras dentro de la campana de bronce. Atado al badajo hay un alambre de piano que baja hacia el pestillo del péndulo.",
      "fr": "Vous levez les yeux sous la cloche de huit tonnes. Relié au battant, un fil d'acier court jusqu'au loquet du balancier.",
      "de": "Sie blicken in die Acht-Tonnen-Glocke. Ein Klavierdraht führt vom Klöppel über winzige Rollen zum Pendelriegel.",
      "ru": "Ты заглядываешь под свод восьмитонного колокола. К языку привязан стальной тросик, идущий через шкивы к защелке маятника.",
      "it": "Guardi sotto la campana da otto tonnellate. Una corda d'acciaio legata al battaglio scende fino al fermo del pendolo.",
      "pt": "Você olha sob o sino de oito toneladas. Preso ao badalo há um fio de aço que desce até o trinco do pêndulo.",
      "ar": "نظرت لتجويف الجرس البرونزي ذي الثمانية أطنان، فرأيت سلك بيانو مشدودًا يربط لسان الجرس الحديدي بسقاطة البندول."
    },
    "voices": [
      {
        "voice": {
          "en": "Reflex",
          "id": "Refleks",
          "zh": "反应力",
          "ja": "反射神経",
          "ko": "반사신경",
          "es": "Reflejo",
          "fr": "Réflexe",
          "de": "Reflex",
          "ru": "Рефлекс",
          "it": "Riflesso",
          "pt": "Reflexo",
          "ar": "رد الفعل"
        },
        "badge": {
          "en": "REFLEX [Motorics]",
          "id": "REFLEKS [Motorik]",
          "zh": "反应力 [运动敏捷]",
          "ja": "反射神経 [運動]",
          "ko": "반사신경 [운동]",
          "es": "REFLEJO [Motricidad]",
          "fr": "RÉFLEXE [Motricité]",
          "de": "REFLEX [Motorik]",
          "ru": "РЕФЛЕКС [Моторика]",
          "it": "RIFLESSO [Motorica]",
          "pt": "REFLEXO [Motricidade]",
          "ar": "رد الفعل [الحركية]"
        },
        "text": {
          "en": "Ingenious acoustics. When the clock struck 03:42, the vibration and swing of the clapper yanked the tripwire, releasing the fatal counterweight automatically.",
          "id": "Akustik yang sangat jenius. Saat jam berdentang pukul 03:42, getaran dan ayunan pemukul menarik kawat picu, menjatuhkan beban maut secara otomatis.",
          "zh": "惊人的声学联动！03:42大钟鸣响的瞬间，钟锤的震荡直接扯动引线，自动解开了杀人的致命配重！",
          "ja": "見事な音響機械だ。時計が3時42分を打った瞬間、鐘の振動がワイヤーを引き、カウンターウェイトを自動的に落としたのだ。",
          "ko": "기막힌 음향 기계입니다. 3시 42분을 치는 순간 종 추의 진동이 와이어를 당겨 평형추를 자동으로 떨어뜨린 겁니다.",
          "es": "Acústica ingeniosa. Al dar las 03:42, la vibración del badajo tiró del cable soltando el contrapeso.",
          "fr": "Acoustique ingénieuse. Au coup de 03h42, la vibration du battant a tiré le fil libérant le contrepoids.",
          "de": "Geniale Akustik. Beim Schlag um 03:42 Uhr riss die Schwingung am Draht und löste das Gegengewicht aus.",
          "ru": "Гениальная механика. В 03:42 удар колокола дернул тросик и автоматически спустил противовес.",
          "it": "Acustica geniale. Al rintocco delle 03:42, la vibrazione ha azionato il cavo liberando il contrappeso.",
          "pt": "Acústica engenhosa. Às 03:42, a vibração puxou o fio soltando o contrapeso automaticamente.",
          "ar": "هندسة صوتية بارعة! حين دقت الساعة عند 03:42 سحب اهتزاز لسان الجرس سلك التفجير وأفلت ثقل الموازنة آليًا."
        }
      }
    ],
    "options": [
      {
        "id": "[Turun dari kubah lonceng]",
        "en": "[Step down from the bell housing]",
        "zh": "【从钟顶支架上走下来】",
        "ja": "【鐘楼から降りる】",
        "ko": "[종탑 하부로 내려간다]",
        "es": "[Bajar del campanario]",
        "fr": "[Descendre de la cloche]",
        "de": "[Vom Glockengehäuse herabsteigen]",
        "ru": "[Спуститься из-под колокола]",
        "it": "[Scendi dalla cella campanaria]",
        "pt": "[Descer da torre do sino]",
        "ar": "[النزول من حجرة الجرس]"
      }
    ]
  }
};

const CLUES_I18N_FULL = {
  "clue_syndicate_bounty": {
    "title": {
      "en": "The Grand Syndicate Ledger Bounty",
      "id": "Hadiah Sayembara Sindikat Jam",
      "zh": "辛迪加黑金悬赏令",
      "ja": "大シンジケートの賞金首調書",
      "ko": "거대 신디케이트의 현상금 장부",
      "es": "La Recompensa del Gran Sindicato",
      "fr": "La Prime du Grand Syndicat",
      "de": "Das Kopfgeld des Großen Syndikats",
      "ru": "Награда Великого Синдиката",
      "it": "La Taglia del Grande Sindacato",
      "pt": "A Recompensa do Grande Sindicato",
      "ar": "مكافأة دفتر النقابة الكبرى"
    },
    "desc": {
      "en": "Inspector Graves was paid off by the Syndicate to retrieve an alchemical prototype ledger stolen by Vance.",
      "id": "Inspektur Graves disuap oleh Sindikat untuk mengamankan buku besar alkimia rahasia yang dicuri Vance.",
      "zh": "格雷夫斯警探收受了辛迪加巨额贿赂，奉命追回奥蕾莉亚偷走的炼金原型秘密账簿。",
      "ja": "グレイヴス警部は、ヴァンスが持ち出した錬金術試作台帳を回収するためシンジケートから買収されていた。",
      "ko": "그레이브스 형사는 밴스가 빼돌린 프로토타입 장부를 회수하는 대가로 신디케이트에 매수되었습니다.",
      "es": "El inspector Graves fue sobornado por el Sindicato para recuperar un libro prototipo robado por Vance.",
      "fr": "L'inspecteur Graves a été soudoyé par le Syndicat pour récupérer un registre secret dérobé par Vance.",
      "de": "Inspektor Graves wurde vom Syndikat bestochen, um ein von Vance gestohlenes Prototyp-Buch zu beschaffen.",
      "ru": "Инспектор Грейвс был подкуплен Синдикатом, чтобы вернуть украденный Вэнс чертежный гроссбух.",
      "it": "L'ispettore Graves è stato corrotto dal Sindacato per recuperare un mastro prototipo rubato dalla Vance.",
      "pt": "O inspetor Graves foi subornado pelo Sindicato para recuperar um livro protótipo roubado por Vance.",
      "ar": "تلقى المفتش غريفز رشوة من النقابة لاستعادة دفتر الحسابات الخيميائي المسروق من فانس."
    }
  },
  "clue_poison_needle": {
    "title": {
      "en": "The Poisoned Ivory Queen",
      "id": "Bidak Ratu Catur Beracun",
      "zh": "淬毒象牙黑后棋子",
      "ja": "毒針仕込みの象牙クイーン",
      "ko": "독침이 장치된 상아 퀸",
      "es": "La Reina de Marfil Envenenada",
      "fr": "La Reine d'Ivoire Empoisonnée",
      "de": "Die Vergiftete Elfenbein-Dame",
      "ru": "Отравленный ферзь из слоновой кости",
      "it": "La Regina d'Avorio Avvelenata",
      "pt": "A Rainha de Marfim Envenenada",
      "ar": "ملكة الشطرنج العاجية المسمومة"
    },
    "desc": {
      "en": "Aurelia Vance was paralyzed by a hollow needle concealed in a chess piece before being hung on the pendulum.",
      "id": "Aurelia Vance dilumpuhkan dengan jarum berongga beracun di dalam bidak catur sebelum digantung di pendulum.",
      "zh": "奥蕾莉亚·梵斯在被挂上大钟摆前，遭人利用棋子暗藏的中空毒针注入致命神经毒素瘫痪。",
      "ja": "オレリア・ヴァンスは大振り子に吊るされる前に、チェス駒に隠された毒針で麻痺させられていた。",
      "ko": "오렐리아 밴스는 시계추에 매달리기 전, 체스 말에 숨겨진 독침에 찔려 마비되었습니다.",
      "es": "Aurelia Vance fue paralizada con una aguja hueca oculta en una pieza de ajedrez antes de ser colgada del péndulo.",
      "fr": "Aurelia Vance a été paralysée par une aiguille empoisonnée dissimulée dans une pièce d'échecs avant d'être pendue au balancier.",
      "de": "Aurelia Vance wurde durch eine in einer Schachfigur versteckte Nadel gelähmt, bevor man sie ans Pendel hängte.",
      "ru": "Аурелия Вэнс была парализована полой иглой с ядом, скрытой в шахматной фигуре, перед тем как ее повесили на маятник.",
      "it": "Aurelia Vance è stata paralizzata da un ago avvelenato celato in un pezzo degli scacchi prima di essere appesa al pendolo.",
      "pt": "Aurelia Vance foi paralisada por uma agulha oca com veneno oculta na peça de xadrez antes de ser presa ao pêndulo.",
      "ar": "شُلت حركة أوريليا فانس بإبرة مجوفة مسمومة كانت مخبأة داخل قطعة شطرنج قبل تعليقها على البندول."
    }
  },
  "clue_meridian_seal": {
    "title": {
      "en": "The Pale Meridian Seal",
      "id": "Segel Meridian Pucat",
      "zh": "苍白子午线密教印记",
      "ja": "蒼白の子午線教団の刻印",
      "ko": "창백한 자오선 교단의 인장",
      "es": "El Sello del Meridiano Pálido",
      "fr": "Le Sceau du Méridien Pâle",
      "de": "Das Siegel des Bleichen Meridians",
      "ru": "Печать Бледного Меридиана",
      "it": "Il Sigillo del Meridiano Pallido",
      "pt": "O Selo do Meridiano Pálido",
      "ar": "ختم خط الزوال الشاحب"
    },
    "desc": {
      "en": "The victim was initiated into an occult horological order attempting to reverse the entropy of time.",
      "id": "Korban merupakan anggota sekte horologis rahasia yang terobsesi membalikkan aliran waktu.",
      "zh": "受害者加入了崇尚机械逆熵、企图倒转时光流向的狂热秘密钟表教派。",
      "ja": "被害者は時間の不可逆性を覆そうと試みる神秘主義の時計結社に深く関与していた。",
      "ko": "피해자는 시간의 엔트로피를 역전시키려던 오컬트 시계 교단에 입단한 상태였습니다.",
      "es": "La víctima pertenecía a una orden horológica oculta que intentaba revertir la entropía del tiempo.",
      "fr": "La victime avait été initiée à un ordre horloger occulte tentant d'inverser l'entropie temporelle.",
      "de": "Das Opfer war Mitglied eines okkulten Uhrmacher-Ordens, der die Zeit umkehren wollte.",
      "ru": "Жертва состояла в оккультном ордене часовщиков, пытавшемся повернуть время вспять.",
      "it": "La vittima faceva parte di un ordine orologico occulto che tentava di invertire l'entropia del tempo.",
      "pt": "A vítima foi iniciada em uma ordem horológica oculta que tentava reverter a entropia do tempo.",
      "ar": "كانت الضحية منتمية لجماعة ساعاتيّة باطنية سرية تسعى لعكس انسياب الزمن."
    }
  },
  "clue_watch_code": {
    "title": {
      "en": "Floorboard Safe Combination (7-3-12)",
      "id": "Kombinasi Brankas Lantai (7-3-12)",
      "zh": "暗格金库密码 (7-3-12)",
      "ja": "床下金庫の暗証コード (7-3-12)",
      "ko": "바닥 금고 암호 (7-3-12)",
      "es": "Combinación de la Caja Fuerte (7-3-12)",
      "fr": "Combinaison du Coffre (7-3-12)",
      "de": "Kombination des Bodentresors (7-3-12)",
      "ru": "Шифр сейфа в полу (7-3-12)",
      "it": "Combinazione della Cassaforte (7-3-12)",
      "pt": "Combinação do Cofre (7-3-12)",
      "ar": "شفرة الخزنة الأرضية (7-3-12)"
    },
    "desc": {
      "en": "The victim inscribed the safe combination code inside her watch balance cock, linking it to Madame Vivienne Vance.",
      "id": "Korban mengukir kode kombinasi brankas rahasia di dalam jam sakunya, menghubungkannya ke Vivienne Vance.",
      "zh": "死者将暗格金库的三位密码深深刻在随身怀表内，并刻下了对薇薇安·梵斯的深情题词。",
      "ja": "被害者は懐中時計のテンプ受けに金庫の解錠コードを刻み、未亡人ヴィヴィアンへの献辞を遺していた。",
      "ko": "피해자는 회중시계 무브먼트 내부에 금고 암호를 새겨 넣었으며, 이는 비비안 밴스 부인과 직결됩니다.",
      "es": "La víctima grabó el código de la caja fuerte en su reloj de bolsillo, vinculándolo a Vivienne Vance.",
      "fr": "La victime avait gravé le code du coffre dans sa montre à gousset, le liant directement à Vivienne Vance.",
      "de": "Das Opfer ritzte den Tresorcode in seine Taschenuhr und verknüpfte ihn mit Vivienne Vance.",
      "ru": "Жертва выгравировала код от сейфа внутри своих карманных часов, связав его с Вивьен Вэнс.",
      "it": "La vittima ha inciso il codice della cassaforte nel bilanciere dell'orologio, legandolo a Vivienne Vance.",
      "pt": "A vítima gravou o código do cofre em seu relógio de bolso, ligando-o a Vivienne Vance.",
      "ar": "نقشت الضحية شفرة فتح الخزنة داخل ساعة جيبها وربطتها بإهداء صريح لفيفيان فانس."
    }
  },
  "clue_velvet_cyanide": {
    "title": {
      "en": "Torn Blue Velvet & Cyanide Vial",
      "id": "Sobekan Beludru Biru & Ampul Sianida",
      "zh": "撕裂的蓝丝绒碎片与剧毒氰化安瓿",
      "ja": "裂けた青いビロードと青酸アンプル",
      "ko": "찢겨진 청색 벨벳 조각과 청산가리 앰플",
      "es": "Terciopelo Azul Rasgado y Vial de Cianuro",
      "fr": "Velours Bleu Déchiré et Fiole de Cyanure",
      "de": "Zerrissener Blauer Samt und Zyankali-Fläschchen",
      "ru": "Оторванный синий бархат и ампула с цианидом",
      "it": "Velluto Blu Strappato e Fiala di Cianuro",
      "pt": "Veludo Azul Rasgado e Frasco de Cianeto",
      "ar": "قطعة مخمل أزرق ممزقة وأمبول سيانيد"
    },
    "desc": {
      "en": "Found on the rain balcony. A direct physical match to Madame Vivienne Vance's mourning dress.",
      "id": "Ditemukan di balkon hujan. Cocok secara fisik dengan mantel beludru Nyonya Vivienne Vance.",
      "zh": "在风雨露台栏杆起获。其纤维编织与磨损破口与薇薇安·梵斯夫人身上的丧服大衣完全吻合。",
      "ja": "雨のバルコニーで発見。ヴィヴィアン・ヴァンス夫人の喪服コートの裂け目と完全に一致する。",
      "ko": "빗물 고인 발코니에서 발견되었습니다. 비비안 밴스 부인의 상복 코트 찢긴 자국과 정확히 일치합니다.",
      "es": "Hallado en el balcón. Coincide exactamente con el abrigo de luto de Madame Vivienne Vance.",
      "fr": "Découvert sur le balcon. Correspond parfaitement au manteau de deuil de Madame Vivienne Vance.",
      "de": "Auf dem Regen-Balkon gefunden. Passt exakt zum Trauermantel von Madame Vivienne Vance.",
      "ru": "Найдено на мокром балконе. Физически совпадает с разрывом на траурном пальто мадам Вивьен Вэнс.",
      "it": "Trovato sul balcone bagnato di pioggia. Corrisponde perfettamente all'abito di Vivienne Vance.",
      "pt": "Encontrado na sacada de chuva. Corresponde perfeitamente ao casaco de luto de Madame Vivienne Vance.",
      "ar": "عُثر عليه بشرفة المطر، ويتطابق تمامًا مع معطف حداد السيدة فيفيان فانس."
    }
  },
  "clue_perpetuum_ledger": {
    "title": {
      "en": "The Perpetuum Cartel Ledger",
      "id": "Buku Besar Perpetuum Sindikat",
      "zh": "永动机辛迪加绝密总账簿",
      "ja": "永久機関カルテルの秘密台帳",
      "ko": "영구기관 카르텔의 비밀 원장",
      "es": "El Libro Mayor del Cartel Perpetuum",
      "fr": "Le Grand Livre du Cartel Perpetuum",
      "de": "Das Hauptbuch des Perpetuum-Kartells",
      "ru": "Секретный гроссбух картеля «Перпетуум»",
      "it": "Il Mastro del Cartello Perpetuum",
      "pt": "O Livro-Razão do Cartel Perpetuum",
      "ar": "دفتر حسابات كارتل بيربيتوم السري"
    },
    "desc": {
      "en": "Definitive proof that Vance was silenced to prevent her from exposing the Grand Syndicate arson conspiracy.",
      "id": "Bukti definitif bahwa Vance dibungkam agar tidak membongkar konspirasi pembakaran kota oleh Sindikat.",
      "zh": "铁证如山：辛迪加为了阻止奥蕾莉亚揭露全市延迟纵火爆炸黑幕，雇佣杀手将她彻底灭口。",
      "ja": "シンジケートの大規模放火陰謀の告発を防ぐため、ヴァンスが口封じされた決定的な物証。",
      "ko": "신디케이트의 도시 방화 음모를 폭로하려던 밴스를 침묵시키기 위해 입막음 살해했다는 확증입니다.",
      "es": "Prueba definitiva de que Vance fue silenciada para encubrir la conspiración incendiaria del Sindicato.",
      "fr": "Preuve accablante que Vance a été assassinée pour étouffer le complot d'incendie du Grand Syndicat.",
      "de": "Der endgültige Beweis, dass Vance mundtot gemacht wurde, um die Brandstiftungsverschwörung zu decken.",
      "ru": "Главное доказательство того, что Вэнс устранили, дабы скрыть заговор Синдиката о поджоге города.",
      "it": "La prova schiacciante che la Vance è stata messa a tacere per coprire i roghi dolosi del Sindacato.",
      "pt": "Prova definitiva de que Vance foi silenciada para abafar a conspiração incendiária do Sindicato.",
      "ar": "الدليل القاطع على تصفية فانس لمنعها من كشف مؤامرة حرائق النقابة الكبرى المدمرة."
    }
  },
  "clue_madame_motive": {
    "title": {
      "en": "Vivienne's Motive: Vengeance & Neglect",
      "id": "Motif Vivienne: Dendam & Pengabaian",
      "zh": "薇薇安的杀意动机：复仇与冷酷漠视",
      "ja": "ヴィヴィアンの動機：復讐と長年の冷遇",
      "ko": "비비안의 범행 동기: 복수와 오랜 방치",
      "es": "El Motivo de Vivienne: Venganza y Negligencia",
      "fr": "Le Mobile de Vivienne : Vengeance et Abandon",
      "de": "Viviennes Motiv: Rache und Vernachlässigung",
      "ru": "Мотив Вивьен: месть за пренебрежение",
      "it": "Il Movente di Vivienne: Vendetta e Abbandono",
      "pt": "O Motivo de Vivienne: Vingança e Desprezo",
      "ar": "دافع فيفيان: الانتقام والمرارة والإهمال"
    },
    "desc": {
      "en": "Aurelia neglected their dying daughter to finish the clockwork war machine for the Syndicate.",
      "id": "Aurelia menelantarkan putri mereka yang sekarat demi menyelesaikan mesin pesanan Sindikat.",
      "zh": "奥蕾莉亚当年为了替辛迪加赶制致命军火，冷血抛下重病垂危的亲生女儿不顾。",
      "ja": "オレリアは兵器製造に没头し、結核で瀕死だった一人娘の看病を放棄していた。",
      "ko": "오렐리아는 신디케이트의 전쟁 기계를 완성하느라 결핵으로 죽어가던 친딸을 외면했습니다.",
      "es": "Aurelia desatendió a su hija moribunda para terminar la máquina bélica del Sindicato.",
      "fr": "Aurelia avait délaissé leur fille mourante pour achever la machine de guerre du Syndicat.",
      "de": "Aurelia vernachlässigte ihre sterbende Tochter, um die Kriegsmaschine fertigzustellen.",
      "ru": "Аурелия бросила умирающую дочь ради завершения военной машины для Синдиката.",
      "it": "Aurelia ha trascurato la figlia morente per terminare la macchina da guerra del Sindacato.",
      "pt": "Aurelia negligenciou a filha doente para terminar a máquina bélica do Sindicato.",
      "ar": "أهملت أوريليا ابنتهما المحتضرة لإتمام آلة الحرب لحساب النقابة الكبرى."
    }
  },
  "clue_confession_full": {
    "title": {
      "en": "THE FULL TRUTH: A Mutual Martyrdom",
      "id": "KEBENARAN PENUH: Perjanjian Kematian Bersama",
      "zh": "终极真相：互谋殉道之死",
      "ja": "真実の全貌：同意の上の殉教的暗殺",
      "ko": "완전한 진실: 상호 합의된 순교적 결말",
      "es": "LA VERDAD TOTAL: Un Martirio Consentido",
      "fr": "LA VÉRITÉ COMPLÈTE : Un Martyre Partagé",
      "de": "DIE VOLLE WAHRHEIT: Ein Gegenseitiges Martyrium",
      "ru": "ВСЯ ПРАВДА: Взаимное мученичество",
      "it": "LA VERITÀ COMPLETA: Un Martirio Consensuale",
      "pt": "A VERDADE COMPLETA: Um Martírio Consensual",
      "ar": "الحقيقة الكاملة: استشهاد متبادل بالاتفاق"
    },
    "desc": {
      "en": "Vivienne poisoned Aurelia with her full consent to prevent the Syndicate from seizing her delay-detonation blueprints.",
      "id": "Vivienne meracuni Aurelia atas persetujuannya agar rancangan bom penunda waktu tidak jatuh ke tangan Sindikat.",
      "zh": "薇薇安是在奥蕾莉亚的含笑请求下亲手下毒，借此让绝密军火图纸与钟表大师一同长眠，阻止辛迪加屠杀工人。",
      "ja": "ヴィヴィアンはオレリア本人の合意のもと毒を盛り、軍事兵器の設計図を道連れにして時計塔を永久に止めた。",
      "ko": "비비안은 신디케이트가 살상 무기 도면을 탈취하지 못하도록, 오렐리아 본인의 간곡한 동의 하에 독침을 찔렀습니다.",
      "es": "Vivienne envenenó a Aurelia con su consentimiento para evitar que el Sindicato obtuviera los planos.",
      "fr": "Vivienne a empoisonné Aurelia avec son plein accord pour que le Syndicat ne s'empare pas des plans.",
      "de": "Vivienne vergiftete Aurelia mit deren Einverständnis, um die Entführung der Pläne zu vereiteln.",
      "ru": "Вивьен отравила Аурелию с ее полного согласия, чтобы чертежи не достались Синдикату.",
      "it": "Vivienne ha avvelenato Aurelia con il suo consenso per impedire al Sindacato di prendere i piani.",
      "pt": "Vivienne envenenou Aurelia com o consentimento dela para impedir que o Sindicato tomasse as plantas.",
      "ar": "سممت فيفيان أوريليا بموافقتها التامة لمنع النقابة من الاستيلاء على مخططات السلاح الكارثي."
    }
  },
  "clue_shattered_reagents": {
    "title": {
      "en": "Shattered Reagents & Syndicate Crest",
      "id": "Serpihan Reagen Kimia & Lambang Sindikat",
      "zh": "碎裂的化学试剂瓶与辛迪加火漆印",
      "ja": "破壊された試薬瓶とシンジケートの紋章",
      "ko": "깨진 시약병과 신디케이트 문장",
      "es": "Reactivos Rotos y Emblema del Sindicato",
      "fr": "Réactifs Brisés et Sceau du Syndicat",
      "de": "Zerschlagene Reagenzien und Syndikats-Wappen",
      "ru": "Осколки реагентов и печать Синдиката",
      "it": "Reagenti Infranti e Sigillo del Sindacato",
      "pt": "Reagentes Quebrados e Brasão do Sindicato",
      "ar": "زجاجات كواشف محطمة وخاتم النقابة"
    },
    "desc": {
      "en": "Discovered on the lantern catwalk. Chemical glass vials bearing the Grand Syndicate mercury seal, confirming delivery hours before death.",
      "id": "Ditemukan di anjungan lentera. Botol kaca kimia berstempel segel merkuri Sindikat Agung, membuktikan kurir datang beberapa jam sebelum maut.",
      "zh": "在提灯走廊铁网间寻获。带有辛迪加水银火漆印的化学安瓿碎片，证实凶案发生前数小时曾有暗部信使出入钟楼。",
      "ja": "ランタン通路で回収。シンジケートの水銀刻印が施された薬瓶の破片で、犯行直前に密使が接触した証拠。",
      "ko": "등불 통로에서 발견되었습니다. 신디케이트의 수은 인장이 찍힌 시약병 파편으로, 사건 직전 밀사가 다녀간 흔적입니다.",
      "es": "Hallado en la pasarela de la linterna. Viales químicos con el sello de mercurio del Gran Sindicato entregados horas antes.",
      "fr": "Découvert sur la passerelle. Des fioles chimiques portant le sceau du Syndicat, livrées quelques heures avant le drame.",
      "de": "Auf dem Laternensteg gefunden. Glasfläschchen mit dem Siegel des Syndikats, wenige Stunden zuvor geliefert.",
      "ru": "Найдено на мостках фонаря. Осколки ампул с печатью Синдиката, доставленные за пару часов до трагедии.",
      "it": "Trovato sul camminamento della lanterna. Fiale chimiche col sigillo del Syndacato consegnate poche ore prima.",
      "pt": "Encontrado na passarela da lanterna. Frascos químicos com o selo do Sindicato entregues horas antes.",
      "ar": "عُثر عليها بممر الفانوس، زجاجات كيميائية ممهورة بختم النقابة الزئبقي سُلمت قبل ساعات من الجريمة."
    }
  },
  "clue_acoustic_tripwire": {
    "title": {
      "en": "Acoustic Resonance Tripwire Mechanism",
      "id": "Mekanisme Kawat Picu Akustik",
      "zh": "钟鸣声学共振触动引线",
      "ja": "音響共鳴トラップワイヤー機構",
      "ko": "음향 공명 격발 와이어 장치",
      "es": "Mecanismo de Resonancia Acústica",
      "fr": "Mécanisme de Déclenchement Acoustique",
      "de": "Akustischer Resonanz-Auslösedraht",
      "ru": "Акустический спусковой механизм колокола",
      "it": "Meccanismo a Risonanza Acustica",
      "pt": "Mecanismo de Fio de Ressonância Acústica",
      "ar": "آلية سلك التفجير بالرنين الصوتي"
    },
    "desc": {
      "en": "Fastened inside the Saint Irene bronze bell. It explains how the pendulum was mechanically tripped precisely on the 42nd minute stroke.",
      "id": "Terpasang di dalam lonceng perunggu Saint Irene. Menjelaskan bagaimana pendulum dijatuhkan secara mekanis tepat di menit ke-42.",
      "zh": "巧妙固定在圣艾琳青铜大钟内部。完美解释了钟摆为何能在无人触碰的情况下，精准在第42分钟钟锤敲击时自行脱钩切断！",
      "ja": "聖アイリーンの青銅鐘の内部に結ばれていた。人の手を介さず、42分の鐘の打撃で振り子が機械的に停止した仕掛けを証明する。",
      "ko": "청동 종 안쪽에 설치된 장치입니다. 사람이 없었음에도 42분 종소리의 진동으로 진자가 스스로 탈착된 트릭을 설명해 줍니다.",
      "es": "Fijado dentro de la campana de bronce. Explica cómo el péndulo se soltó mecánicamente en el golpe del minuto 42.",
      "fr": "Fixé dans la cloche en bronze. Explique comment le balancier s'est déclenché mécaniquement au 42e coup de cloche.",
      "de": "In der Bronzeglocke befestigt. Erklärt, wie das Pendel mechanisch exakt zur 42. Minute ausgelöst wurde.",
      "ru": "Закреплен внутри бронзового колокола. Объясняет, как маятник сработал точно на 42-й минуте от вибрации удара колокола.",
      "it": "Fissato all'interno della campana di bronzo. Spiega come il pendolo sia scattato meccanicamente al rintocco del 42° minuto.",
      "pt": "Preso dentro do sino de bronze. Explica como o pêndulo foi acionado mecanicamente na batida do 42º minuto.",
      "ar": "مثبت داخل الجرس البرونزي الضخم، ويفسر كيفية إفلات البندول آليًا عبر اهتزاز دقة الدقيقة 42 دون حضور بشري."
    }
  },
  "clue_needle_puncture": {
    "title": {
      "en": "Microscopic Cyanide Puncture",
      "id": "Luka Suntikan Mikroskopis di Leher Korban",
      "zh": "颈后微型氰化物注射针孔",
      "ja": "首筋の微細なシアン化物注射創",
      "ko": "목 뒤의 미세한 청산가리 주사 상흔",
      "es": "Punción Microscópica de Cianuro",
      "fr": "Piqûre Microscopique de Cyanure",
      "de": "Mikroskopische Zyankali-Einstichstelle",
      "ru": "Микроскопический след инъекции цианида",
      "it": "Puntura Microscopica di Cianuro",
      "pt": "Perfuração Microscópica de Cianeto",
      "ar": "أثر وخز مجهري لسيانيد في الرقبة"
    },
    "desc": {
      "en": "Precision magnification reveals a tiny blue puncture wound on Aurelia's neck, confirming lethal injection before the fall.",
      "id": "Lensa presisi membuktikan racun disuntikkan ke leher Aurelia sebelum tubuhnya dipindahkan ke pendulum.",
      "zh": "高倍放大镜显现出死者颈椎凹陷处有一枚细如牛毛的浅蓝淤血点，证实她在钟摆坠落前已遭毒杀。",
      "ja": "高倍率ルーペにより、遺体の首筋に青く変色した微細な注射痕を発見。落下前の薬殺を決定づける。",
      "ko": "정밀 돋보기로 목 뒤에서 푸르스름한 미세 주사 바늘 자국을 확인하여 추락 전 독살되었음을 증명합니다.",
      "es": "Un aumento preciso revela una diminuta punción azulada en el cuello de Aurelia, confirmando la inyección letal.",
      "fr": "Un examen minutieux révèle une minuscule piqûre bleutée au cou d'Aurelia, confirmant une injection létale.",
      "de": "Präzise Vergrößerung enthüllt eine winzige Einstichstelle am Nacken, die die tödliche Injektion beweist.",
      "ru": "Увеличение выявило крошечный след укола на шее Аурелии, подтверждающий смертельную инъекцию до падения.",
      "it": "Un ingrandimento rivela una minuscola puntura bluastra sul collo di Aurelia, confermando l'iniezione letale.",
      "pt": "Uma ampliação precisa revela uma minúscula marca de picada azul no pescoço, confirmando injeção letal.",
      "ar": "الفحص المجهري الدقيق يكشف عن وخزة إبرة زرقاء دقيقة في عنق أوريليا، مما يؤكد حقنها بالسم القاتل قبل سقوطها."
    }
  },
  "clue_syndicate_bribe": {
    "title": {
      "en": "Syndicate Payoff Ledger",
      "id": "Catatan Suap Sindikat ke Vivienne Vance",
      "zh": "辛迪加致薇薇安密约收据",
      "ja": "シンジケートの買収受領書",
      "ko": "신디케이트의 비비안 매수 영수증",
      "es": "Recibo de Soborno del Sindicato",
      "fr": "Reçu de Pot-de-Vin du Syndicat",
      "de": "Bestechungsbeleg des Syndikats",
      "ru": "Расписка о взятке Синдиката",
      "it": "Ricevuta di Corruzione del Sindacato",
      "pt": "Recibo de Suborno do Sindicato",
      "ar": "إيصال رشوة النقابة لفيفيان"
    },
    "desc": {
      "en": "Records prove Vivienne Vance accepted 50,000 guilders to deliver Aurelia's delay-detonation blueprints.",
      "id": "Catatan membuktikan Vivienne menerima 50.000 guilder untuk menyerahkan rancangan Aurelia kepada kartel.",
      "zh": "账目存根证明薇薇安曾被许诺五万金币报酬，条件是将奥蕾莉亚的定时引爆专利全盘交给军火财阀。",
      "ja": "ヴィヴィアンが5万ギルダーの報酬と引き換えに、オレリアの起爆装置設計図を渡す約束を交わしていた証拠。",
      "ko": "비비안이 5만 길더의 대가를 받고 오렐리아의 지연 기폭장치 도면을 넘기기로 합의했던 서류입니다.",
      "es": "Los registros demuestran que Vivienne aceptó 50.000 florines para entregar los planos de Aurelia.",
      "fr": "Les registres prouvent que Vivienne a accepté 50 000 florins pour livrer les plans d'Aurelia.",
      "de": "Dokumente belegen, dass Vivienne 50.000 Gulden annahm, um Aurelias Pläne an das Kartell auszuliefern.",
      "ru": "Записи доказывают, что Вивьен приняла 50 000 гульденов за передачу чертежей Аурелии картелю.",
      "it": "I registri provano che Vivienne ha accettato 50.000 fiorini per consegnare i progetti di Aurelia al cartello.",
      "pt": "Registros comprovam que Vivienne aceitou 50.000 florins para entregar as plantas de Aurelia.",
      "ar": "الوثائق تثبت قبول فيفيان خمسين ألف غيلدر لتسليم مخططات أوريليا للتفجير المؤجل إلى كارتل النقابة."
    }
  },
  "clue_poison_mechanism": {
    "title": {
      "en": "Spring-Loaded Needle Mechanism",
      "id": "Mekanisme Jarum Pegas Ratu Gading",
      "zh": "黑后棋底座暗藏微簧棘刺弹簧针",
      "ja": "チェス駒内蔵のバネ仕掛け毒針機構",
      "ko": "체스 퀸 스프링 암살 독침 메커니즘",
      "es": "Mecanismo de Resorte de la Reina de Marfil",
      "fr": "Mécanisme à Ressort de la Reine d'Ivoire",
      "de": "Federmechanismus der Elfenbein-Dame",
      "ru": "Пружинный механизм шахматной фигуры",
      "it": "Meccanismo a Scatto della Regina d'Avorio",
      "pt": "Mecanismo de Mola da Rainha de Marfim",
      "ar": "آلية الإبرة الزنبركية بملكة الشطرنج"
    },
    "desc": {
      "en": "The ivory queen conceals a pressurized needle chamber loaded with fatal prussic acid.",
      "id": "Ratu catur gading menyembunyikan jarum bertekanan pegas yang diisi asam prusat mematikan.",
      "zh": "雕刻象牙黑后棋子中空内部嵌有精密的微型气压弹簧针室，灌注了足以十秒见血封喉的纯氢氰酸液。",
      "ja": "象牙のクイーン内部には極小の加圧バネ針室が仕込まれており、致死性の青酸が充填されていた。",
      "ko": "상아 체스 퀸 내부에는 미세 스프링 압축 챔버가 숨겨져 치명적인 청산가리가 채워져 있었습니다.",
      "es": "La reina de marfil oculta una cámara de aguja presurizada cargada con ácido prúsico fatal.",
      "fr": "La reine d'ivoire dissimule une chambre à aiguille sous pression remplie d'acide prussique mortel.",
      "de": "Die Elfenbein-Dame verbirgt eine druckbelastete Nadelkammer voller Blausäure.",
      "ru": "Внутри фигуры ферзя спрятана полость с пружинной иглой, заряженная синильной кислотой.",
      "it": "La regina d'avorio cela una camera d'ago pressurizzata carica di acido cianidrico letale.",
      "pt": "A rainha de marfim oculta uma câmara de agulha pressurizada carregada com ácido prússico fatal.",
      "ar": "تخفي قطعة ملكة الشطرنج العاجية حجرة إبرة مضغوطة بزنبرك معبأة بحمض البروسيك القاتل."
    }
  }
};

const NEW_POIS_I18N = {
  "poi_gantry_lantern": {
    "title": {
      "en": "Upper Gantry & Alchemical Lantern",
      "id": "Anjungan Atas & Lentera Alkimia",
      "zh": "提灯上层悬空回廊与炼金探灯",
      "ja": "上層キャットウォークと錬金ランタン",
      "ko": "상층 통로와 연금술 등불",
      "es": "Pasarela Superior y Linterna Alquímica",
      "fr": "Passerelle Supérieure et Lanterne Alchimique",
      "de": "Oberer Laufsteg und Alchemielaterne",
      "ru": "Верхние мостки и алхимический фонарь",
      "it": "Passerella Superiore e Lanterna Alchemica",
      "pt": "Passarela Superior e Lanterna Alquímica",
      "ar": "الممر العلوي وفانوس الكيمياء"
    },
    "description": {
      "en": "A narrow iron grating over the gear abyss. Broken glass and alchemical soot mark where a clandestine visitor waited.",
      "id": "Kisi besi sempit di atas jurang roda gigi. Pecahan kaca dan jelaga alkimia menandai tempat kurir rahasia mengintai.",
      "zh": "悬空于齿轮深渊上方的狭窄铁栅回廊。碎玻璃与炼金煤烟残留在此，暴露出曾有秘密访客在暗中窥伺。",
      "ja": "歯車の深淵に架かる細い鉄格子通路。割れたガラスと錬金術の煤が、何者かが潜んでいた痕跡を物語る。",
      "ko": "톱니바퀴 심연 위에 놓인 좁은 철제 격자 통로. 깨진 유리와 연금술 그을음이 밀사의 잠복 흔적을 보여줍니다.",
      "es": "Una estrecha rejilla de hierro sobre el abismo de engranajes. Restos de vidrio y hollín alquímico marcan una visita secreta.",
      "fr": "Une étroite grille de fer au-dessus des engrenages. Du verre brisé et de la suie alchimique trahissent un intrus.",
      "de": "Ein schmaler Eisensteg über den Zahnrädern. Glasscherben und Ruß beweisen einen heimlichen Besucher.",
      "ru": "Узкая железная решетка над пропастью шестерен. Осколки стекла и сажа выдают присутствие тайного гостя.",
      "it": "Una stretta grata di ferro sull'abisso di ingranaggi. Vetri rotti e fuliggine alchemica indicano una presenza segreta.",
      "pt": "Uma estreita grade de ferro sobre o abismo de engrenagens. Cacos de vidro e fuligem revelam uma visita clandestina.",
      "ar": "ممر حديدي ضيق فوق هاوية التروس. زجاج محطم وسخام كيميائي يشيران إلى ترصد زائر سري قبل الحادث."
    }
  },
  "poi_clock_chime_bell": {
    "title": {
      "en": "Colossal Bronze Bell & Chime Gearing",
      "id": "Lonceng Perunggu Raksasa & Gigi Dentang",
      "zh": "圣艾琳青铜大钟与共振撞锤齿轮",
      "ja": "聖アイリーンの巨鐘と鐘打撃歯車",
      "ko": "성 아이린 청동 거대 종과 타종 기어",
      "es": "Campana Monumental y Engranajes del Carrillón",
      "fr": "Cloche Colossale et Engrenages de Sonnerie",
      "de": "Kolossale Bronzeglocke und Schlagwerk",
      "ru": "Исполинский бронзовый колокол и бойный механизм",
      "it": "Campana Monumentale e Meccanismo del Rintocco",
      "pt": "Sino Colossal de Bronze e Engrenagens do Carrilhão",
      "ar": "الجرس البرونزي الضخم وتروس دق الساعات"
    },
    "description": {
      "en": "The eight-ton bell that tolls for District 7. A fine steel wire is wrapped through the clapper linkage down into the pendulum escapement.",
      "id": "Lonceng delapan ton yang berdentang bagi Distrik 7. Kawat baja tipis terlilit dari pemukul lonceng menuju mekanisme pendulum.",
      "zh": "重达八吨的圣艾琳主钟。一根极细的高张力钢丝从钟锤连杆悄然延伸至下方的钟摆脱扣装置上！",
      "ja": "第7区に時を告げる8トンの大鐘。打鐘レバーから振り子の脱進機へと細い鋼鉄ワイヤーが巧みに結ばれている。",
      "ko": "제7구역에 시각을 알리는 8톤 청동 종. 종 치는 추의 연결부에서 진자 탈착부까지 정교한 강철 와이어가 이어져 있습니다.",
      "es": "La campana de ocho toneladas que dobla para el Distrito 7. Un fino cable de acero conecta el badajo al péndulo.",
      "fr": "La cloche de huit tonnes qui sonne pour le District 7. Un fil d'acier fin relie le battant au balancier.",
      "de": "Die Acht-Tonnen-Glocke des Distrikts 7. Ein dünner Stahldraht verbindet den Klöppel mit dem Pendelwerk.",
      "ru": "Восьмитонный колокол 7-го района. Тонкий стальной тросик тянется от языка колокола к спусковому механизму маятника.",
      "it": "La campana da otto tonnellate del Distretto 7. Un sottile cavo d'acciaio collega il battaglio allo scappamento.",
      "pt": "O sino de oito toneladas que toca pelo Distrito 7. Um fino fio de aço liga o badalo ao escape do pêndulo.",
      "ar": "الجرس الضخم البالغ وزنه ثمانية أطنان. سلك فولاذي رفيع يربط لسان الجرس بآلية فك قفل البندول بدقة ميكانيكية."
    }
  }
};

// --- END: dialogue_i18n.js ---

// --- BEGIN: i18n.js ---
// Aenigma Multi-Language Localization System (5 Native Languages)
// Supported: en (English - Default), id (Bahasa Indonesia), zh (Chinese Simplified),
// ja (Japanese), ko (Korean)

const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'id', name: 'Bahasa Indonesia', native: 'Bahasa Indonesia', flag: '🇮🇩', dir: 'ltr' },
  { code: 'zh', name: 'Chinese', native: '简体中文', flag: '🇨🇳', dir: 'ltr' },
  { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵', dir: 'ltr' },
  { code: 'ko', name: 'Korean', native: '한국어', flag: '🇰🇷', dir: 'ltr' }
];

const PROGRESS_LABELS = {
  en: 'PROGRESS',
  id: 'PROGRES',
  zh: '破案进度',
  ja: '捜査進捗',
  ko: '수사 진행'
};

const SKILL_NAMES_I18N = {
  logic: { en: 'Logic', id: 'Logika', zh: '逻辑', ja: '論理', ko: '논리', es: 'Lógica', fr: 'Logique', de: 'Logik', ru: 'Логика', it: 'Logica', pt: 'Lógica', ar: 'المنطق' },
  encyclopedia: { en: 'Encyclopedia', id: 'Ensiklopedia', zh: '百科', ja: '百科事典', ko: '백과사전', es: 'Enciclopedia', fr: 'Encyclopédie', de: 'Enzyklopädie', ru: 'Энциклопедия', it: 'Enciclopedia', pt: 'Enciclopédia', ar: 'الموسوعة' },
  rhetoric: { en: 'Rhetoric', id: 'Retorika', zh: '修辞', ja: '修辞学', ko: '수사학', es: 'Retórica', fr: 'Rhétorique', de: 'Rhetorik', ru: 'Риторика', it: 'Retorica', pt: 'Retórica', ar: 'البلاغة' },
  conceptualization: { en: 'Conceptualization', id: 'Konseptualisasi', zh: '概念化', ja: '概念化', ko: '개념화', es: 'Conceptualización', fr: 'Conceptualisation', de: 'Konzeptualisierung', ru: 'Концептуализация', it: 'Concettualizzazione', pt: 'Conceptualização', ar: 'المفاهيم' },
  empathy: { en: 'Empathy', id: 'Empati', zh: '共情', ja: '共感', ko: '공감', es: 'Empatía', fr: 'Empathie', de: 'Empathie', ru: 'Эмпатия', it: 'Empatia', pt: 'Empatia', ar: 'التعاطف' },
  esoterica: { en: 'Esoterica', id: 'Esoterika', zh: '秘教', ja: '秘教', ko: '비전', es: 'Esotérica', fr: 'Ésotérisme', de: 'Esoterik', ru: 'Эзотерика', it: 'Esoterismo', pt: 'Esoterismo', ar: 'الباطنية' },
  authority: { en: 'Authority', id: 'Otoritas', zh: '威信', ja: '威信', ko: '권위', es: 'Autoridad', fr: 'Autorité', de: 'Autorität', ru: 'Авторитет', it: 'Autorità', pt: 'Autoridade', ar: 'السلطة' },
  suggestion: { en: 'Suggestion', id: 'Sugesti', zh: '暗示', ja: '暗示', ko: '암시', es: 'Sugestión', fr: 'Suggestion', de: 'Suggestion', ru: 'Внушение', it: 'Suggestione', pt: 'Sugestão', ar: 'الإيحاء' },
  endurance: { en: 'Endurance', id: 'Daya Tahan', zh: '耐力', ja: '耐久力', ko: '인내력', es: 'Resistencia', fr: 'Endurance', de: 'Ausdauer', ru: 'Стойкость', it: 'Resistenza', pt: 'Resistência', ar: 'التحمل' },
  painThreshold: { en: 'Pain Threshold', id: 'Ambang Rasa Sakit', zh: '疼痛阈值', ja: '痛覚閾値', ko: '통증 역치', es: 'Umbral de Dolor', fr: 'Seuil de Douleur', de: 'Schmerzgrenze', ru: 'Болевой порог', it: 'Soglia del Dolore', pt: 'Limiar de Dor', ar: 'عتبة الألم' },
  electrochemistry: { en: 'Electrochemistry', id: 'Elektrokimia', zh: '生化反应', ja: '生化学', ko: '생체화학', es: 'Electroquímica', fr: 'Électrochimie', de: 'Elektrochemie', ru: 'Электрохимия', it: 'Elettrochimica', pt: 'Eletroquímica', ar: 'الكيمياء الحيوية' },
  physicalInstrument: { en: 'Physical Instrument', id: 'Kekuatan Fisik', zh: '肉体器械', ja: '身体能力', ko: '신체적 도구', es: 'Instrumento Físico', fr: 'Instrument Physique', de: 'Körperkraft', ru: 'Физический инструмент', it: 'Strumento Fisico', pt: 'Instrumento Físico', ar: 'الأداة البدنية' },
  perception: { en: 'Perception', id: 'Persepsi', zh: '知觉', ja: '知覚', ko: '지각', es: 'Percepción', fr: 'Perception', de: 'Wahrnehmung', ru: 'Внимательность', it: 'Percezione', pt: 'Percepção', ar: 'الإدراك' },
  handEyeCoord: { en: 'Hand-Eye Coord', id: 'Koordinasi Tangan-Mata', zh: '手眼协调', ja: '手眼協調', ko: '협응력', es: 'Coord. Ojo-Mano', fr: 'Coord. Œil-Main', de: 'Hand-Auge-Koord.', ru: 'Координация', it: 'Coord. Occhio-Mano', pt: 'Coord. Mão-Olho', ar: 'التناسق الحركي' },
  savoirFaire: { en: 'Savoir Faire', id: 'Savoir Faire', zh: '处世之道', ja: '処世術', ko: '기민성', es: 'Savoir Faire', fr: 'Savoir-Faire', de: 'Savoir Faire', ru: 'Самообладание', it: 'Savoir-Faire', pt: 'Savoir-Faire', ar: 'الكياسة' },
  interfacing: { en: 'Interfacing', id: 'Penyelarasan Mesin', zh: '机构连动', ja: '機構連動', ko: '기계 조율', es: 'Conexión Mecánica', fr: 'Interfaçage', de: 'Mechanik', ru: 'Взаимодействие', it: 'Interazione', pt: 'Interação', ar: 'التعامل الميكانيكي' }
};

function tSkill(skillKey, lang = 'en') {
  if (SKILL_NAMES_I18N[skillKey]) {
    return SKILL_NAMES_I18N[skillKey][lang] || SKILL_NAMES_I18N[skillKey]['en'] || skillKey.toUpperCase();
  }
  return skillKey.toUpperCase();
}

const DISTRICT_LABELS = {
  en: 'DISTRICT 7',
  id: 'SEKTOR 7',
  zh: '第七区',
  ja: '第7管区',
  ko: '제7구역'
};

const UI_TRANSLATIONS = {
  id: {
    toast_case_opened: 'Berkas Kasus Dibuka: Aurelia Vance · Selamat datang di Sektor 7, Detektif {name}',
    game_title: 'A E N I G M A',
    case_badge: 'KASUS #D4-04',
    archive_intro_text: 'Arsip kasus yang berhasil dipecahkan sebelumnya oleh Detektif Renata Vance di Sektor 7. Setiap kasus yang selesai meninggalkan bukti kunci (Keystone Evidence) yang mengarah pada dalang sindikat rahasia yang sama.',
    keystone_network_title: 'MATRIKS BENANG MERAH KONSPIRASI (KEYSTONE EVIDENCE WEB)',
    from_prefix: 'DARI',
    status_secured: '✓ AMAN',
    status_unmasked: '✓ TERBONGKAR',
    status_inquiry: '⏳ DALAM INKUIRI',
    k4_unlocked_desc: 'Pengakuan pembunuhan & bukti transaksi suap 50.000 guilder terbongkar!',
    k4_pending_desc: 'Sedang diselidiki di Menara Irene: brankas rahasia & pengakuan dalang.',
    case_date_today: 'Hari Ini · 03:42 AM',
    case_date_final: 'Sintesis Penyelidikan Terakhir',
    case_tab_active: 'KASUS AKTIF [#D4-04]',
    case_tab_archive: 'ARSIP KASUS (3)',
    case_tab_master: 'KASUS UTAMA [#PRIME-00]',
    case_status_active: '⚡ AKTIF / SEDANG DISELIDIKI',
    case_status_solved: '✓ TERPECAHKAN',
    case_status_master: '👑 KASUS UTAMA',
    keystone_secured: '✓ KUNCI BUKTI DIPEROLEH',
    keystone_pending: '⏳ BELUM TERUNGKAP',
    btn_synthesize_master: 'HUBUNGKAN SELURUH BENANG MERAH KONSPIRASI',
    master_synthesis_ready: 'SELURUH 4 KUNCI BUKTI TERHIMPUN! KONSORSIUM BAYANGAN SEKTOR 7 TERBONGKAR!',
    master_synthesis_not_ready: 'Masih membutuhkan bukti konklusif dari Kasus #D4-04 untuk mengungkap dalang.',
    loader_quote: '“Detik jam tak pernah berhenti. Hanya daging di dalamnya yang lupa cara berdetak.”',
    loader_telemetry: 'Menginisialisasi telemetri saraf...',
    loader_enter: 'MASUK KE ARSIP',
    creator_title: 'DOSSIER PENYELIDIK',
    creator_subtitle: 'PEMBUATAN KARAKTER',
    gender_female: '♀ WANITA',
    gender_male: '♂ PRIA',
    randomize_dossier: '🎲 ACAK DOSSIER',
    precinct_label: 'Divisi Pembunuhan Distrik 4 · Sektor Timur 7',
    name_label: 'NAMA LENGKAP DETEKTIF',
    alias_label: 'JULUKAN / GELAR PSIKOLOGIS',
    facets_title: 'ASPEK KEJIWAAN',
    points_available: 'Poin Tersedia',
    intellect_name: 'INTELEK',
    intellect_desc: 'Logika, Ensiklopedia, Retorika, Konseptualisasi. Deduksi dingin dan analisis rasional.',
    psyche_name: 'KEJIWAAN',
    psyche_desc: 'Esoterika, Empati, Otoritas, Sugesti. Firasat supranatural dan gravitasi emosional.',
    physique_name: 'FISIK',
    physique_desc: 'Daya Tahan, Ambang Rasa Sakit, Elektrokimia. Adrenalin, naluri purba, dan stamina bertahan hidup.',
    motorics_name: 'MOTORIK',
    motorics_desc: 'Persepsi, Koordinasi Tangan-Mata, Penyelarasan, Savoir Faire. Kepekaan panca indra dan petunjuk mikro.',
    signature_title: 'KEAHLIAN KHUSUS (+2 BONUS & SUARA BATIN)',
    vices_title: 'KEBIASAAN BURUK & CACAT KEJIWAAN',
    start_inquiry: 'MULAI INVESTIGASI',
    endurance_label: 'DAYA TAHAN',
    morale_label: 'KEWARASAN',
    hp_pip: 'HP',
    sp_pip: 'SP',
    day_prefix: 'HARI',
    nav_cabinet: '🧠 LEMARI PIKIRAN',
    nav_clues: '📌 DOSSIER BUKTI',
    nav_inventory: '💼 INVENTARIS',
    nav_audio: 'AUDIO',
    nav_language: 'BAHASA',
    scene_location: 'Menara Jam Saint Irene · Sektor 7',
    scene_timestamp: 'Nyonya Horologis Aurelia Vance · Jenazah ditemukan pukul 03:42 di tengah dentang jam',
    speaker_forensic: 'Pengamatan Forensik',
    interlocutor_active: 'INTERAKSI AKTIF',
    modal_cabinet_title: 'LEMARI PIKIRAN · THOUGHT CABINET',
    modal_inventory_title: 'MANTEL DETEKTIF & KANTONG BUKTI',
    modal_clues_title: 'PAPAN INVESTIGASI & ARSIP KASUS',
    modal_dice_title: 'UJI KEAHLIAN',
    modal_language_title: 'PILIH BAHASA TERJEMAHAN',
    modal_victory_title: 'KASUS SELESAI',
    modal_gameover_title: 'INVESTIGASI GAGAL: TERMINASI',
    dice_tally: 'LEMPARAN 2D6 + MODIFIKASI:',
    dice_rolling: 'MEMUTAR DADU...',
    dice_passed: 'UJI KEAHLIAN BERHASIL!',
    dice_failed: 'UJI KEAHLIAN GAGAL!',
    dice_proceed: 'LANJUTKAN DENGAN HASIL INI',
    btn_restart: 'MULAI INVESTIGASI BARU',
    btn_retry: 'MULAI ULANG INVESTIGASI',
    btn_use: 'GUNAKAN',
    btn_inspect: 'PERIKSA',
    btn_read: 'BACA',
    badge_passive: 'PASIF',
    badge_uses: 'tersisa',
    toast_item_acquired: 'BARANG DIDAPATKAN:',
    toast_item_used: 'BARANG DIGUNAKAN:',
    toast_clue_discovered: 'BUKTI KRUSIAL TERUNGKAP:',
    toast_thought_unlocked: 'PIKIRAN BARU DITEMUKAN:',
    toast_thought_internalized: 'PIKIRAN TELAH DIINTERNALISASI:',
    toast_xp_gained: 'PENGALAMAN BERTAMBAH:',
    toast_level_up: 'NAIK TINGKAT! POIN KEAHLIAN DIDAPATKAN',
    toast_damage_health: 'TERLUKA! DAYA TAHAN BERKURANG',
    toast_damage_morale: 'TERGUNCANG! KEWARASAN BERKURANG',
    audio_on: 'AUDIO: AKTIF',
    audio_off: 'AUDIO: MATI',
    scene_btn_markers: 'TITIK BUKTI',
    scene_btn_hidden: 'DISEMBUNYIKAN',
    scene_btn_radar: 'RADAR',
    scene_inspect_hint: 'PERIKSA BUKTI',
    dice_epiphany: 'PENCERAHAN MUTLAK! SUKSES KRITIS (ANGKA KEMBAR ENAM)',
    dice_snake_eyes: 'MATA ULAR! KEGAGALAN FATAL (ANGKA KEMBAR SATU)',
    cabinet_empty: 'Belum ada pikiran yang diendapkan. Renungkan bukti di tempat kejadian untuk memicu gagasan.',
    cabinet_researching: 'Sedang diinternalisasi...',
    cabinet_internalized_status: '✨ TEROBOSAN PSIKOLOGIS PERMANEN AKTIF',
    cabinet_btn_internalize: 'INTERNALISASI PIKIRAN INI',
    cabinet_locked_hint: 'Selidiki lebih lanjut di Menara Saint Irene untuk membuka pikiran ini.',
    cabinet_temp_box: 'Efek Perenungan Sementara',
    cabinet_perm_box: 'Terobosan Kejiwaan Permanen',
    inventory_empty: 'Kantong mantelmu hanya berisi serpihan kain dan penyesalan dingin.',
    clues_empty: 'Belum ada bukti penting yang tercatat. Teliti menara jam dengan cermat.',
    victory_lead: 'Penyelidik Utama:',
    victory_facet: 'Keahlian Utama:',
    victory_clues: 'Bukti Terkumpul:',
    victory_thoughts: 'Pikiran Diinternalisasi:',
    ending_coverup: 'Kebenaran di balik kematian Aurelia Vance telah terungkap. Lonceng keadilan berdentang melintasi Sektor 7.',
    dialogue_idle_prompt: 'Periksa titik bukti atau buka dossier kasus untuk melanjutkan penyelidikan.',
    dialogue_leave: '[Tinggalkan pengamatan & kembali ke TKP]',
    item_type_tool: 'ALAT',
    item_type_consumable: 'KONSUMSI',
    item_type_clue: 'BUKTI',
    item_type_relic: 'RELIK',
    buff_label: 'Bonus Keahlian:',
    profile_modal_title: 'DOSSIER DETEKTIF & PROFIL PSIKOLOGIS',
    profile_vitals_title: 'KONDISI VITAL & KETAHANAN',
    profile_progress_header: 'RESOLUSI KASUS',
    profile_time_label: 'WAKTU INVESTIGASI'
  },
  en: {
    toast_case_opened: 'Case File Opened: Aurelia Vance · Welcome to District 7, Detective {name}',
    game_title: 'A E N I G M A',
    case_badge: 'CASE #D4-04',
    archive_intro_text: 'Archive of previous homicide cases solved by Detective Renata Vance in District 7. Each resolved case uncovered a vital Keystone Evidence connecting to the same covert syndicate.',
    keystone_network_title: 'KEYSTONE EVIDENCE & CONSPIRACY WEB',
    from_prefix: 'FROM',
    status_secured: '✓ SECURED',
    status_unmasked: '✓ EXPOSED',
    status_inquiry: '⏳ IN INQUIRY',
    k4_unlocked_desc: 'Murder confession & 50,000 guilder bribery records fully exposed!',
    k4_pending_desc: 'Active inquiry in Saint Irene: search floorboard safe & extract suspect confession.',
    case_date_today: 'Today · 03:42 AM',
    case_date_final: 'Grand Inquiry Synthesis',
    case_tab_active: 'ACTIVE INQUIRY [#D4-04]',
    case_tab_archive: 'SOLVED ARCHIVE (3)',
    case_tab_master: 'MASTER CASE [#PRIME-00]',
    case_status_active: '⚡ ACTIVE INQUIRY',
    case_status_solved: '✓ SOLVED',
    case_status_master: '👑 MASTER CASE',
    keystone_secured: '✓ KEYSTONE CLUE SECURED',
    keystone_pending: '⏳ PENDING DISCOVERY',
    btn_synthesize_master: 'SYNTHESIZE CONSPIRACY EVIDENCE WEB',
    master_synthesis_ready: 'ALL 4 KEYSTONES SECURED! THE DISTRICT 7 SYNDICATE STANDS EXPOSED!',
    master_synthesis_not_ready: 'Conclusive evidence from Case #D4-04 still required to finalize synthesis.',
    loader_quote: '“The clock never stops. Only the flesh within it forgets how to beat.”',
    loader_telemetry: 'Initializing neural telemetry...',
    loader_enter: 'ENTER THE ARCHIVE',
    creator_title: 'INVESTIGATOR DOSSIER',
    creator_subtitle: 'CHARACTER CREATION',
    gender_female: '♀ FEMALE',
    gender_male: '♂ MALE',
    randomize_dossier: '🎲 RANDOMIZE DOSSIER',
    precinct_label: 'Precinct 4 Homicide Division · Eastern District 7',
    name_label: 'DETECTIVE FULL NAME',
    alias_label: 'ALIAS / PSYCHOLOGICAL TITLE',
    facets_title: 'FACETS OF PSYCHE',
    points_available: 'Points Available',
    intellect_name: 'INTELLECT',
    intellect_desc: 'Logic, Encyclopedia, Rhetoric, Conceptualization. Cold deduction and rational analysis.',
    psyche_name: 'PSYCHE',
    psyche_desc: 'Esoterica, Empathy, Authority, Suggestion. Supernatural hunches and emotional gravity.',
    physique_name: 'PHYSIQUE',
    physique_desc: 'Endurance, Pain Threshold, Electrochemistry. Adrenaline, gut instinct, and survival stamina.',
    motorics_name: 'MOTORICS',
    motorics_desc: 'Perception, Hand-Eye Coordination, Interfacing, Savoir Faire. Senses and micro-clues.',
    signature_title: 'SIGNATURE SKILL (+2 BONUS & INTRUSIVE VOICE)',
    vices_title: 'PERSONAL VICE & PSYCHOLOGICAL FLAW',
    start_inquiry: 'COMMENCE THE INQUIRY',
    endurance_label: 'ENDURANCE',
    morale_label: 'MORALE',
    hp_pip: 'HP',
    sp_pip: 'SP',
    day_prefix: 'DAY',
    nav_cabinet: '🧠 THOUGHT CABINET',
    nav_clues: '📌 CASE DOSSIER',
    nav_inventory: '💼 INVENTORY',
    nav_audio: 'AUDIO',
    nav_language: 'LANGUAGE',
    scene_location: 'Saint Irene Clocktower · District 7',
    scene_timestamp: 'Mistress Horologist Aurelia Vance · Body discovered at 03:42 AM mid-stroke',
    speaker_forensic: 'Forensic Observation',
    interlocutor_active: 'ACTIVE INTERACTION',
    modal_cabinet_title: 'THOUGHT CABINET',
    modal_inventory_title: 'DETECTIVE COAT & EVIDENCE BAG',
    modal_clues_title: 'CASE DOSSIER & MASTER INVESTIGATION BOARD',
    modal_dice_title: 'SKILL CHECK',
    modal_language_title: 'CHOOSE SUBTITLE & UI LANGUAGE',
    modal_victory_title: 'CASE CONCLUDED',
    modal_gameover_title: 'INVESTIGATION TERMINATED',
    dice_tally: '2D6 ROLL + MODIFIERS:',
    dice_rolling: 'ROLLING...',
    dice_passed: 'SKILL CHECK PASSED!',
    dice_failed: 'SKILL CHECK FAILED!',
    dice_proceed: 'PROCEED WITH OUTCOME',
    btn_restart: 'BEGIN A NEW INQUIRY',
    btn_retry: 'RETRY INVESTIGATION',
    btn_use: 'USE',
    btn_inspect: 'INSPECT',
    btn_read: 'READ',
    badge_passive: 'PASSIVE',
    badge_uses: 'uses left',
    toast_item_acquired: 'ITEM ACQUIRED:',
    toast_item_used: 'ITEM USED:',
    toast_clue_discovered: 'CRITICAL CLUE UNLOCKED:',
    toast_thought_unlocked: 'NEW THOUGHT DISCOVERED:',
    toast_thought_internalized: 'THOUGHT INTERNALIZED:',
    toast_xp_gained: 'EXPERIENCE GAINED:',
    toast_level_up: 'LEVEL UP! SKILL POINT GAINED',
    toast_damage_health: 'INJURED! ENDURANCE REDUCED',
    toast_damage_morale: 'SHAKEN! MORALE COMPROMISED',
    audio_on: 'AUDIO: ON',
    audio_off: 'AUDIO: OFF',
    scene_btn_markers: 'MARKERS',
    scene_btn_hidden: 'HIDDEN',
    scene_btn_radar: 'RADAR',
    scene_inspect_hint: 'INVESTIGATE',
    dice_epiphany: 'EPIPHANY! CRITICAL SUCCESS (DOUBLE SIX)',
    dice_snake_eyes: 'SNAKE EYES! CRITICAL FAILURE (DOUBLE ONES)',
    cabinet_empty: 'No thoughts currently incubating. Contemplate crime scene evidence to spark ideas.',
    cabinet_researching: 'Internalizing...',
    cabinet_internalized_status: '✨ PERMANENT BREAKTHROUGH ACTIVE',
    cabinet_btn_internalize: 'INTERNALIZE THIS THOUGHT',
    cabinet_locked_hint: 'Investigate further in Saint Irene to unlock this thought.',
    cabinet_temp_box: 'Temporary Contemplation Effect',
    cabinet_perm_box: 'Permanent Psychological Breakthrough',
    inventory_empty: 'Your coat pockets contain only lint and cold regret.',
    clues_empty: 'No critical evidence cataloged yet. Scrutinize the clocktower.',
    victory_lead: 'Lead Investigator:',
    victory_facet: 'Signature Facet:',
    victory_clues: 'Evidence Gathered:',
    victory_thoughts: 'Thoughts Internalized:',
    ending_coverup: 'The truth behind Aurelia Vance has been brought into the light. Justice tolls across District 7.',
    dialogue_idle_prompt: 'Examine points of interest or consult your clues dossier to proceed.',
    dialogue_leave: '[Step back & return to crime scene]',
    item_type_tool: 'TOOL',
    item_type_consumable: 'CONSUMABLE',
    item_type_clue: 'CLUE',
    item_type_relic: 'RELIC',
    buff_label: 'Skill Buff:',
    profile_modal_title: 'DETECTIVE DOSSIER & PSYCHOLOGICAL PROFILE',
    profile_vitals_title: 'VITALS & ENDURANCE',
    profile_progress_header: 'CASE RESOLUTION',
    profile_time_label: 'INVESTIGATION TIME'
  },
  ja: {
    toast_case_opened: '捜査ファイル開封：オレリア・ヴァンス · 第7管区へようこそ、{name}刑事',
    game_title: 'エ ニ グ マ',
    case_badge: '事件 #D4-04',
    archive_intro_text: 'レナータ・ヴァンス刑事が第7区で以前に解決した殺人事件の記録。解決した各事件は、同一の地下組織へと繋がる決定的な鍵証拠を残している。',
    keystone_network_title: '決定的証拠の相関陰謀網',
    from_prefix: '出処',
    status_secured: '✓ 確保済',
    status_unmasked: '✓ 暴露済',
    status_inquiry: '⏳ 捜査中',
    k4_unlocked_desc: '暗殺の自白と5万ギルダーの買収台帳が完全に露呈！',
    k4_pending_desc: '聖アイリーン塔にて捜査中：床下の金庫を捜索し、容疑者の自白を引き出せ。',
    case_date_today: '本日 · 午前03:42',
    case_date_final: '全事件総合立証',
    case_tab_active: '担当事件 [#D4-04]',
    case_tab_archive: '解決済調書 (3)',
    case_tab_master: '大事件 [#PRIME-00]',
    case_status_active: '⚡ 捜査中',
    case_status_solved: '✓ 解決済',
    case_status_master: '👑 大事件',
    keystone_secured: '✓ 決定的鍵証拠確保',
    keystone_pending: '⏳ 未解明',
    btn_synthesize_master: '陰謀の全相関関係を演繹統合する',
    master_synthesis_ready: '全4つの重要証拠が集結！第7区の暗黒組織を完全暴露！',
    master_synthesis_not_ready: '事件#D4-04の決定的な証拠がまだ不足しています。',
    loader_quote: '「時計の針は止まらない。止まるのは、鼓動を忘れた肉体だけだ。」',
    loader_telemetry: '神経テレメトリ初期化中...',
    loader_enter: 'アーカイブへアクセス',
    creator_title: '捜査官調書',
    creator_subtitle: 'キャラクター作成',
    gender_female: '♀ 女性',
    gender_male: '♂ 男性',
    randomize_dossier: '🎲 調書をランダム生成',
    precinct_label: '第4分署 凶悪犯罪課 · 東部第7区',
    name_label: '捜査官 氏名',
    alias_label: '通称 / 精神的肩書',
    facets_title: '精神の諸相',
    points_available: '割り振り可能ポイント',
    intellect_name: '知性',
    intellect_desc: '論理、百科事典、修辞学、概念化。冷徹な演繹と合理的分析。',
    psyche_name: '精神',
    psyche_desc: '秘教、共感、威信、暗示。超常的な予感と感情的重力。',
    physique_name: '肉体',
    physique_desc: '耐久力、痛覚閾値、生化学。アドレナリンと生存本能。',
    motorics_name: '運動神経',
    motorics_desc: '知覚、手眼協調、機構連動、処世術。鋭敏な五感と微小痕跡。',
    signature_title: '象徴技能 (+2 ボーナス & 内なる声)',
    vices_title: '個人的悪癖 & 精神の綻び',
    start_inquiry: '捜査を開始する',
    endurance_label: '肉体耐久',
    morale_label: '精神力',
    hp_pip: 'HP',
    sp_pip: 'SP',
    day_prefix: '日目',
    nav_cabinet: '🧠 思考の閣僚',
    nav_clues: '📌 証拠調書',
    nav_inventory: '💼 所持品',
    nav_audio: '音響',
    nav_language: '言語',
    scene_location: '聖アイリーン時計塔 · 第7区',
    scene_timestamp: '時計師オレリア・ヴァンス · 午前3時42分 鐘の途上で発見',
    speaker_forensic: '法医学的観察',
    interlocutor_active: '接触中',
    modal_cabinet_title: '思考の閣僚 · THOUGHT CABINET',
    modal_inventory_title: '捜査官コート & 証拠品袋',
    modal_clues_title: '事件調書＆合同捜査盤',
    modal_dice_title: '技能判定',
    modal_language_title: '字幕および表示言語を選択',
    modal_victory_title: '事件解決',
    modal_gameover_title: '捜査終了: 殉職 / 破滅',
    dice_tally: '2D6 ダイス + 修正値:',
    dice_rolling: 'ダイス回転中...',
    dice_passed: '判定成功！',
    dice_failed: '判定失敗！',
    dice_proceed: '結果を受け入れて続行',
    btn_restart: '新たな捜査を開始',
    btn_retry: '事件を再捜査する',
    btn_use: '使用',
    btn_inspect: '調査',
    btn_read: '読了',
    badge_passive: '常時発動',
    badge_uses: '回使用可能',
    toast_item_acquired: '証拠品入手:',
    toast_item_used: 'アイテム使用:',
    toast_clue_discovered: '決定的手掛かり発見:',
    toast_thought_unlocked: '新たな思考が芽生えた:',
    toast_thought_internalized: '思考の内面化が完了:',
    toast_xp_gained: '経験値獲得:',
    toast_level_up: 'レベル上昇！技能ポイント獲得',
    toast_damage_health: '負傷！耐久値減少',
    toast_damage_morale: '精神動揺！精神力減少',
    audio_on: '音響: オン',
    audio_off: '音響: オフ',
    scene_btn_markers: '証拠マーカー',
    scene_btn_hidden: '非表示',
    scene_btn_radar: 'レーダー',
    scene_inspect_hint: '詳しく調べる',
    dice_epiphany: '神聖なる啓示！クリティカル成功 (ゾロ目 6)',
    dice_snake_eyes: 'スネークアイズ！痛恨のファンブル (ゾロ目 1)',
    cabinet_empty: '現在醸成中の思考はありません。事件現場の証拠を熟考し、閃きを得てください。',
    cabinet_researching: '内面化の進行中...',
    cabinet_internalized_status: '✨ 恒久的な精神の覚醒が有効',
    cabinet_btn_internalize: 'この思考を内面化する',
    cabinet_locked_hint: '聖アイリーン時計塔をさらに捜査することで、この思考が閃きます。',
    cabinet_temp_box: '一時的な熟考による影響',
    cabinet_perm_box: '内面化完了による恒久覚醒',
    inventory_empty: 'コートのポケットには埃と冷えた後悔しか残されていない。',
    clues_empty: '決定的証拠はまだ調書に記録されていません。時計塔を精査してください。',
    victory_lead: '主任捜査官:',
    victory_facet: '象徴的技能:',
    victory_clues: '収集された決定的証拠:',
    victory_thoughts: '内面化された思考閣僚:',
    ending_coverup: 'オレリア・ヴァンスの死の真相は白日の下に晒された。第7区に真実の鐘が鳴り響く。',
    dialogue_idle_prompt: '捜査対象を調べるか、証拠調書を確認して捜査を進めてください。',
    dialogue_leave: '[観察を終えて現場に戻る]',
    item_type_tool: '道具',
    item_type_consumable: '消耗品',
    item_type_clue: '手掛かり',
    item_type_relic: '遺物',
    buff_label: 'スキル強化:',
    profile_modal_title: '刑事調書・精神プロファイル',
    profile_vitals_title: 'バイタル＆耐久状態',
    profile_progress_header: '事件解決進捗',
    profile_time_label: '捜査経過時間'
  },
  zh: {
    toast_case_opened: '案件档案已开启：奥蕾莉亚·梵斯 · 欢迎来到第七区，{name}探长',
    game_title: 'A E N I G M A',
    case_badge: '案件 #D4-04',
    archive_intro_text: '雷娜塔·万斯探长此前在第七区成功告破的谋杀案卷。每起案件结案后均留下一项关键铁证，直指同一幕后黑金结社。',
    keystone_network_title: '核心罪证与全域阴谋网络',
    from_prefix: '来自',
    status_secured: '✓ 已锁定',
    status_unmasked: '✓ 彻底曝光',
    status_inquiry: '⏳ 侦查中',
    k4_unlocked_desc: '谋杀买凶自白与5万盾巨额贿赂账目已彻底浮出水面！',
    k4_pending_desc: '圣艾琳钟楼现场侦查中：搜查暗格保险箱并撬开嫌疑人口供。',
    case_date_today: '今日 · 凌晨03:42',
    case_date_final: '终极调查综合研判',
    case_tab_active: '当前案件 [#D4-04]',
    case_tab_archive: '已破结案档案 (3)',
    case_tab_master: '终极主案 [#PRIME-00]',
    case_status_active: '⚡ 调查中',
    case_status_solved: '✓ 已告破',
    case_status_master: '👑 终极主案',
    keystone_secured: '✓ 核心罪证已锁定',
    keystone_pending: '⏳ 尚未揭晓',
    btn_synthesize_master: '梳理并串联全域阴谋证据链',
    master_synthesis_ready: '全部4项核心罪证已齐备！第七区黑金结社黑幕彻底揭露！',
    master_synthesis_not_ready: '仍需第#D4-04案的关键铁证方可串联全网。',
    loader_quote: '“钟摆永不停歇。唯有齿轮间的血肉，遗忘了跳动的律动。”',
    loader_telemetry: '神经遥测初始化中...',
    loader_enter: '进入档案库',
    creator_title: '调查员档案',
    creator_subtitle: '角色塑造',
    gender_female: '♀ 女性',
    gender_male: '♂ 男性',
    randomize_dossier: '🎲 随机生成档案',
    precinct_label: '第四警区凶杀科 · 东部第七区',
    name_label: '侦探全名',
    alias_label: '化名 / 心理头衔',
    facets_title: '心智维度',
    points_available: '可用属性点',
    intellect_name: '智力',
    intellect_desc: '逻辑、百科全书、修辞、概念化。冷酷演绎与理性洞察。',
    psyche_name: '心智',
    psyche_desc: '秘教、同理心、权威、暗示。通灵直觉与情感引力。',
    physique_name: '体魄',
    physique_desc: '忍耐力、痛觉阈值、电化学。肾上腺素与原始生存本能。',
    motorics_name: '身手',
    motorics_desc: '感知、手眼协调、机械交互、从容自若。敏锐感官与微观痕迹。',
    signature_title: '专精技能 (+2 增益与心之低语)',
    vices_title: '人格缺陷与恶习',
    start_inquiry: '开启侦查',
    endurance_label: '体能',
    morale_label: '理智',
    hp_pip: 'HP',
    sp_pip: 'SP',
    day_prefix: '第',
    nav_cabinet: '🧠 思维内阁',
    nav_clues: '📌 案卷证据',
    nav_inventory: '💼 物品栏',
    nav_audio: '音频',
    nav_language: '语言',
    scene_location: '圣艾琳钟楼 · 第七区',
    scene_timestamp: '钟表宗师奥蕾莉亚·梵斯 · 凌晨03:42于钟摆撞击间身亡',
    speaker_forensic: '法医现场观察',
    interlocutor_active: '交互中',
    modal_cabinet_title: '思维内阁 · THOUGHT CABINET',
    modal_inventory_title: '风衣内衬与物证袋',
    modal_clues_title: '案件档案与主调查板',
    modal_dice_title: '技能检定',
    modal_language_title: '选择字幕及交互语言',
    modal_victory_title: '案情告破',
    modal_gameover_title: '调查溃败: 绝境终结',
    dice_tally: '2D6 掷骰 + 修正值:',
    dice_rolling: '掷骰中...',
    dice_passed: '检定通过！',
    dice_failed: '检定失败！',
    dice_proceed: '承接检定后果',
    btn_restart: '开启新案调查',
    btn_retry: '重启案情调查',
    btn_use: '使用',
    btn_inspect: '检视',
    btn_read: '研读',
    badge_passive: '被动生效',
    badge_uses: '次剩余',
    toast_item_acquired: '获得证物:',
    toast_item_used: '使用物品:',
    toast_clue_discovered: '揭示关键线索:',
    toast_thought_unlocked: '解锁新思绪:',
    toast_thought_internalized: '思绪已完全内化:',
    toast_xp_gained: '获得经验:',
    toast_level_up: '等级提升！获得技能点',
    toast_damage_health: '受伤！体能扣减',
    toast_damage_morale: '精神受创！理智扣减',
    audio_on: '音频: 开启',
    audio_off: '音频: 关闭',
    scene_btn_markers: '证据标点',
    scene_btn_hidden: '隐藏',
    scene_btn_radar: '雷达扫描',
    scene_inspect_hint: '勘查取证',
    dice_epiphany: '顿悟神启！大获全胜 (双六满点)',
    dice_snake_eyes: '蛇眼绝境！惨痛败北 (双一骰灾)',
    cabinet_empty: '暂无正在孕育的思绪。仔细推敲现场线索以激发心智火花。',
    cabinet_researching: '深度推演沉淀中...',
    cabinet_internalized_status: '✨ 恒久心智顿悟已激活',
    cabinet_btn_internalize: '内化此项心智思绪',
    cabinet_locked_hint: '在圣艾琳钟楼展开更深层的调查以解锁此思绪。',
    cabinet_temp_box: '沉思期间的暂时代价',
    cabinet_perm_box: '彻底内化后的心智质变',
    inventory_empty: '风衣口袋里空空如也，只剩下冷雨与悔恨。',
    clues_empty: '案卷尚未收录关键物证。请仔细勘查钟楼。',
    victory_lead: '首席调查官:',
    victory_facet: '核心心智专精:',
    victory_clues: '破案关键物证:',
    victory_thoughts: '已内化思维格言:',
    ending_coverup: '奥蕾莉亚·梵斯离奇命案的真相终见天日。正义之钟在第七区上空悲鸣回荡。',
    dialogue_idle_prompt: '调查现场标点或查阅证据档案以继续推演案情。',
    dialogue_leave: '[暂离此处，返回现场]',
    item_type_tool: '工具',
    item_type_consumable: '消耗品',
    item_type_clue: '线索',
    item_type_relic: '遗物',
    buff_label: '技能增益:',
    profile_modal_title: '侦探档案与心理侧写',
    profile_vitals_title: '生命体征与生存状态',
    profile_progress_header: '案情推进进度',
    profile_time_label: '调查历时'
  },
  ko: {
    toast_case_opened: '사건 파일 개시: 오렐리아 밴스 · 제7구역에 오신 것을 환영합니다, {name} 형사님',
    game_title: 'A E N I G M A',
    case_badge: '사건 #D4-04',
    archive_intro_text: '레나타 반스 형사가 제7구역에서 이전에 해결한 살인 사건 기록입니다. 해결된 각 사건은 동일한 암흑 신디케이트로 이어지는 결정적 핵심 단서를 남겼습니다.',
    keystone_network_title: '핵심 증거 연계 및 거대 음모망',
    from_prefix: '출처',
    status_secured: '✓ 확보됨',
    status_unmasked: '✓ 진상 규명',
    status_inquiry: '⏳ 수사 진행 중',
    k4_unlocked_desc: '살인 청부 자백과 5만 길더 뇌물 장부가 완전히 드러났습니다!',
    k4_pending_desc: '성 아이린 탑 현장 수사 중: 바닥 금고를 수색하고 용의자의 자백을 확보하십시오.',
    case_date_today: '오늘 · 오전 03:42',
    case_date_final: '최종 종합 수사 결론',
    case_tab_active: '진행 사건 [#D4-04]',
    case_tab_archive: '해결된 사건철 (3)',
    case_tab_master: '최종 주 사건 [#PRIME-00]',
    case_status_active: '⚡ 수사 진행 중',
    case_status_solved: '✓ 해결 완료',
    case_status_master: '👑 최종 주 사건',
    keystone_secured: '✓ 핵심 단서 확보',
    keystone_pending: '⏳ 미해결',
    btn_synthesize_master: '음모의 모든 연결 고리를 연역 종합',
    master_synthesis_ready: '4대 핵심 증거 확보 완료! 제7구역 암흑 신디케이트의 전모가 드러났습니다!',
    master_synthesis_not_ready: '종합 수사를 완성하려면 사건 #D4-04의 결정적 단서가 더 필요합니다.',
    loader_quote: '“시계는 결코 멈추지 않는다. 멈추는 것은 고동을 잊은 육신뿐.”',
    loader_telemetry: '신경 원격 측정 초기화 중...',
    loader_enter: '기록 보관소 진입',
    creator_title: '수사관 기록부',
    creator_subtitle: '캐릭터 생성',
    gender_female: '♀ 여성',
    gender_male: '♂ 남성',
    randomize_dossier: '🎲 기록부 무작위 생성',
    precinct_label: '제4관할서 강력계 · 동부 제7구역',
    name_label: '형사 성명',
    alias_label: '이명 / 심리적 직함',
    facets_title: '심리적 특성',
    points_available: '잔여 포인트',
    intellect_name: '지성',
    intellect_desc: '논리, 백과사전, 수사학, 개념화. 냉철한 연역과 이성적 분석.',
    psyche_name: '정신',
    psyche_desc: '비전, 공감, 권위, 암시. 초자연적 직관과 감정적 중력.',
    physique_name: '신체',
    physique_desc: '인내력, 통증 역치, 전기화학. 아드레날린과 원초적 생존 본능.',
    motorics_name: '운동능력',
    motorics_desc: '지각, 손-눈 협응, 기계연동, 처세술. 미세한 단서 포착력.',
    signature_title: '시그니처 기술 (+2 보너스 & 내면의 목소리)',
    vices_title: '개인적 악벽과 정신적 결함',
    start_inquiry: '본격 수사 착수',
    endurance_label: '체력',
    morale_label: '사기',
    hp_pip: 'HP',
    sp_pip: 'SP',
    day_prefix: '일차',
    nav_cabinet: '🧠 생각의 방',
    nav_clues: '📌 증거 서류',
    nav_inventory: '💼 소지품',
    nav_audio: '오디오',
    nav_language: '언어',
    scene_location: '성 아이린 시계탑 · 제7구역',
    scene_timestamp: '시계 장인 오렐리아 밴스 · 오전 03:42 진자 궤적에서 피살체 발견',
    speaker_forensic: '법의학적 관찰',
    interlocutor_active: '상호작용 중',
    modal_cabinet_title: '생각의 방 · THOUGHT CABINET',
    modal_inventory_title: '외투 주머니 & 증거물 가방',
    modal_clues_title: '사건 서류철 및 종합 수사 본부',
    modal_dice_title: '기술 판정',
    modal_language_title: '자막 및 인터페이스 언어 선택',
    modal_victory_title: '사건 종결',
    modal_gameover_title: '수사 파탄: 파멸',
    dice_tally: '2D6 굴림 + 보정치:',
    dice_rolling: '주사위 굴리는 중...',
    dice_passed: '판정 성공!',
    dice_failed: '판정 실패!',
    dice_proceed: '결과 수용 및 진행',
    btn_restart: '새로운 수사 개시',
    btn_retry: '수사 재시도',
    btn_use: '사용',
    btn_inspect: '조사',
    btn_read: '열독',
    badge_passive: '지속 효과',
    badge_uses: '회 남음',
    toast_item_acquired: '증거물 획득:',
    toast_item_used: '아이템 사용:',
    toast_clue_discovered: '결정적 단서 발견:',
    toast_thought_unlocked: '새로운 발상 해금:',
    toast_thought_internalized: '발상 내면화 완료:',
    toast_xp_gained: '경험치 획득:',
    toast_level_up: '레벨 업! 기술 포인트 획득',
    toast_damage_health: '부상! 체력 감소',
    toast_damage_morale: '충격! 사기 저하',
    audio_on: '오디오: 켜짐',
    audio_off: '오디오: 꺼짐',
    scene_btn_markers: '증거 표식',
    scene_btn_hidden: '숨김',
    scene_btn_radar: '레이더 탐지',
    scene_inspect_hint: '단서 조사',
    dice_epiphany: '번뜩이는 영감! 대성공 (주사위 6 더블)',
    dice_snake_eyes: '뱀의 눈! 치명적 대실패 (주사위 1 더블)',
    cabinet_empty: '현재 내면화 중인 생각이 없습니다. 사건 현장의 단서를 곱씹어 새로운 발상을 떠올리세요.',
    cabinet_researching: '생각을 내면화하는 중...',
    cabinet_internalized_status: '✨ 영구적 심리 각성 효과 활성화',
    cabinet_btn_internalize: '이 생각을 내면화하기',
    cabinet_locked_hint: '성 아이린 시계탑을 더 깊이 조사하여 이 생각을 떠올리십시오.',
    cabinet_temp_box: '임시 사색 상태 이상',
    cabinet_perm_box: '영구적 정신적 돌파구',
    inventory_empty: '외투 주머니에는 차가운 후회와 먼지뿐입니다.',
    clues_empty: '아직 기록된 핵심 증거가 없습니다. 시계탑을 철저히 수색하십시오.',
    victory_lead: '수석 수사관:',
    victory_facet: '특화 기술:',
    victory_clues: '수집된 핵심 증거:',
    victory_thoughts: '내면화 완료된 사유:',
    ending_coverup: '오렐리아 밴스의 죽음에 얽힌 진실이 마침내 밝혀졌습니다. 제7구역 전역에 정의의 종소리가 울려 퍼집니다.',
    dialogue_idle_prompt: '현장 증거를 조사하거나 사건 조서를 열어 수사를 진행하십시오.',
    dialogue_leave: '[관찰을 마치고 현장으로 돌아간다]',
    item_type_tool: '도구',
    item_type_consumable: '소모품',
    item_type_clue: '단서',
    item_type_relic: '유물',
    buff_label: '스킬 강화:',
    profile_modal_title: '형사 조서 및 심리 프로필',
    profile_vitals_title: '활력 징후 및 생존 상태',
    profile_progress_header: '사건 해결 진행',
    profile_time_label: '수사 경과 시간'
  },
  es: {
    toast_case_opened: 'Expediente del caso abierto: Aurelia Vance · Bienvenido al Distrito 7, Detective {name}',
    game_title: 'A E N I G M A',
    case_badge: 'CASO #04: LA RELOJERA SILENCIOSA',
    loader_quote: '“El reloj nunca se detiene. Solo la carne en su interior olvida cómo latir.”',
    loader_telemetry: 'Iniciando telemetría neuronal...',
    loader_enter: 'ACCEDER AL ARCHIVO',
    creator_title: 'EXPEDIENTE DE INVESTIGADOR',
    creator_subtitle: 'CREACIÓN DE PERSONAJE',
    gender_female: '♀ FEMENINO',
    gender_male: '♂ MASCULINO',
    randomize_dossier: '🎲 EXPEDIENTE ALEATORIO',
    precinct_label: 'División de Homicidios Precinto 4 · Distrito Oriental 7',
    name_label: 'NOMBRE COMPLETO DEL DETECTIVE',
    alias_label: 'ALIAS / TÍTULO PSICOLÓGICO',
    facets_title: 'FACETAS DE LA PSIQUE',
    points_available: 'Puntos Disponibles',
    intellect_name: 'INTELECTO',
    intellect_desc: 'Lógica, Enciclopedia, Retórica, Conceptualización. Deducción fría y análisis racional.',
    psyche_name: 'PSIQUE',
    psyche_desc: 'Esoterismo, Empatía, Autoridad, Sugestión. Corazonadas sobrenaturales y peso emocional.',
    physique_name: 'FÍSICO',
    physique_desc: 'Aguante, Umbral de Dolor, Electroquímica. Adrenalina, instinto visceral y supervivencia.',
    motorics_name: 'MOTRICIDAD',
    motorics_desc: 'Percepción, Coordinación Ojo-Mano, Interfaz, Savoir Faire. Sentidos agudos y micro-pistas.',
    signature_title: 'HABILIDAD DISTINTIVA (+2 BONO Y VOZ INTRUSIVA)',
    vices_title: 'VICIOS PERSONALES Y GRIETAS PSÍQUICAS',
    start_inquiry: 'COMENZAR LA INDAGATORIA',
    endurance_label: 'AGUANTE',
    morale_label: 'MORAL',
    hp_pip: 'HP',
    sp_pip: 'SP',
    day_prefix: 'DÍA',
    nav_cabinet: '🧠 GABINETE DE IDEAS',
    nav_clues: '📌 EXPEDIENTE DE PISTAS',
    nav_inventory: '💼 INVENTARIO',
    nav_audio: 'AUDIO',
    nav_language: 'IDIOMA',
    scene_location: 'Torre del Reloj de Santa Irene · Distrito 7',
    scene_timestamp: 'Maestra Horóloga Aurelia Vance · Cuerpo hallado a las 03:42 AM a medio toque',
    speaker_forensic: 'Observación Forense',
    interlocutor_active: 'INTERACCIÓN ACTIVA',
    modal_cabinet_title: 'GABINETE DE IDEAS · THOUGHT CABINET',
    modal_inventory_title: 'ABRIGO DE DETECTIVE Y BOLSA DE PRUEBAS',
    modal_clues_title: 'EXPEDIENTE DEL CASO · MATRIZ DE DEDUCCIÓN',
    modal_dice_title: 'TIRADA DE HABILIDAD',
    modal_language_title: 'SELECCIONAR IDIOMA DE SUBTÍTULOS E INTERFAZ',
    modal_victory_title: 'CASO CONCLUIDO',
    modal_gameover_title: 'INVESTIGACIÓN TERMINADA: COLAPSO',
    dice_tally: 'TIRADA 2D6 + MODIFICADORES:',
    dice_rolling: 'RODANDO DADOS...',
    dice_passed: '¡TIRADA SUPERADA!',
    dice_failed: '¡TIRADA FALLIDA!',
    dice_proceed: 'CONTINUAR CON EL RESULTADO',
    btn_restart: 'INICIAR NUEVA PESQUISA',
    btn_retry: 'REINTENTAR INVESTIGACIÓN',
    btn_use: 'USAR',
    btn_inspect: 'INSPECCIONAR',
    btn_read: 'LEER',
    badge_passive: 'PASIVO',
    badge_uses: 'usos restantes',
    toast_item_acquired: 'OBJETO OBTENIDO:',
    toast_item_used: 'OBJETO USADO:',
    toast_clue_discovered: 'PISTA CRUCIAL DESCUBIERTA:',
    toast_thought_unlocked: 'NUEVA IDEA DESBLOQUEADA:',
    toast_thought_internalized: 'IDEA INTERIORIZADA:',
    toast_xp_gained: 'EXPERIENCIA OBTENIDA:',
    toast_level_up: '¡SUBIDA DE NIVEL! PUNTO DE HABILIDAD',
    toast_damage_health: '¡HERIDO! AGUANTE REDUCIDO',
    toast_damage_morale: '¡IMPACTO! MORAL COMPROMETIDA'
  },
  fr: {
    toast_case_opened: 'Dossier de l\'affaire ouvert : Aurelia Vance · Bienvenue dans le District 7, Détective {name}',
    game_title: 'A E N I G M A',
    case_badge: 'DOSSIER #04: L\'HORLOGÈRE SILENCIEUSE',
    loader_quote: '« L\'horloge ne s\'arrête jamais. Seule la chair en son sein oublie comment battre. »',
    loader_telemetry: 'Initialisation de la télémétrie neurale...',
    loader_enter: 'ACCÉDER AUX ARCHIVES',
    creator_title: 'DOSSIER D\'ENQUÊTEUR',
    creator_subtitle: 'CRÉATION DE PERSONNAGE',
    gender_female: '♀ FEMME',
    gender_male: '♂ HOMME',
    randomize_dossier: '🎲 DOSSIER ALÉATOIRE',
    precinct_label: 'Division des Homicides · 4e District Est 7',
    name_label: 'NOM COMPLET DU DÉTECTIVE',
    alias_label: 'ALIAS / TITRE PSYCHOLOGIQUE',
    facets_title: 'FACETTES DE LA PSYCHÉ',
    points_available: 'Points Disponibles',
    intellect_name: 'INTELLECT',
    intellect_desc: 'Logique, Encyclopédie, Rhétorique, Conceptualisation. Froide déduction et analyse rationnelle.',
    psyche_name: 'PSYCHÉ',
    psyche_desc: 'Ésotérisme, Empathie, Autorité, Suggestion. Intuitions surnaturelles et gravité émotionnelle.',
    physique_name: 'PHYSIQUE',
    physique_desc: 'Endurance, Seuil de Douleur, Électrochimie. Adrénaline, instinct viscéral et survie.',
    motorics_name: 'MOTRICITÉ',
    motorics_desc: 'Perception, Coordination Main-Œil, Interfaçage, Savoir-Faire. Sens affûtés et micro-indices.',
    signature_title: 'COMPÉTENCE SIGNATURE (+2 BONUS & VOIX INTRUSIVE)',
    vices_title: 'VICES PERSONNELS & FAILLES PSYCHIQUES',
    start_inquiry: 'OUVRIR L\'ENQUÊTE',
    endurance_label: 'ENDURANCE',
    morale_label: 'MORAL',
    hp_pip: 'PV',
    sp_pip: 'PM',
    day_prefix: 'JOUR',
    nav_cabinet: '🧠 CABINET DE RÉFLEXION',
    nav_clues: '📌 REGISTRE D\'INDICES',
    nav_inventory: '💼 INVENTAIRE',
    nav_audio: 'AUDIO',
    nav_language: 'LANGUE',
    scene_location: 'Tour de l\'Horloge Sainte-Irène · 7e District',
    scene_timestamp: 'Maîtresse Horlogère Aurelia Vance · Corps découvert à 03h42 au milieu du carillon',
    speaker_forensic: 'Constatations Médico-Légales',
    interlocutor_active: 'INTERACTION EN COURS',
    modal_cabinet_title: 'CABINET DE RÉFLEXION · THOUGHT CABINET',
    modal_inventory_title: 'MANTEAU DE DÉTECTIVE & SACHET DE PREUVES',
    modal_clues_title: 'DOSSIER D\'AFFAIRE · MATRICE DE DÉDUCTION',
    modal_dice_title: 'TEST DE COMPÉTENCE',
    modal_language_title: 'CHOISIR LA LANGUE DES SOUS-TITRES & INTERFACE',
    modal_victory_title: 'AFFAIRE CLÔTURÉE',
    modal_gameover_title: 'ENQUÊTE INTERROMPUE: EFFONDREMENT',
    dice_tally: 'LANCER 2D6 + MODIFICATEURS:',
    dice_rolling: 'LANCER EN COURS...',
    dice_passed: 'TEST RÉUSSI !',
    dice_failed: 'TEST ÉCHOUÉ !',
    dice_proceed: 'ACCEPTER LE RÉSULTAT',
    btn_restart: 'OUVRIR UNE NOUVELLE ENQUÊTE',
    btn_retry: 'RECOMMENCER L\'ENQUÊTE',
    btn_use: 'UTILISER',
    btn_inspect: 'INSPECTER',
    btn_read: 'LIRE',
    badge_passive: 'PASSIF',
    badge_uses: 'utilisations restantes',
    toast_item_acquired: 'OBJET REÇU:',
    toast_item_used: 'OBJET CONSOMMÉ:',
    toast_clue_discovered: 'INDICE MAJEUR IDENTIFIÉ:',
    toast_thought_unlocked: 'NOUVELLE PENSÉE ÉVEILLÉE:',
    toast_thought_internalized: 'PENSÉE INTERNALISÉE:',
    toast_xp_gained: 'EXPÉRIENCE ENGRANGÉE:',
    toast_level_up: 'MONTÉE DE NIVEAU ! POINT DE COMPÉTENCE',
    toast_damage_health: 'BLESSURE ! ENDURANCE DIMINUÉE',
    toast_damage_morale: 'CHOC MENTAL ! MORAL COMPROMIS'
  },
  de: {
    toast_case_opened: 'Fallakte geöffnet: Aurelia Vance · Willkommen im Bezirk 7, Detective {name}',
    game_title: 'A E N I G M A',
    case_badge: 'FALL #04: DIE STUMME UHRMACHERIN',
    loader_quote: '„Die Uhr hält niemals an. Nur das Fleisch in ihrem Inneren vergisst das Schlagen.“',
    loader_telemetry: 'Neuraltelemetrie wird initialisiert...',
    loader_enter: 'DAS ARCHIV BETRETEN',
    creator_title: 'ERMITTLER-DOSSIER',
    creator_subtitle: 'CHARAKTERERSTELLUNG',
    gender_female: '♀ WEIBLICH',
    gender_male: '♂ MÄNNLICH',
    randomize_dossier: '🎲 DOSSIER ZUFÄLLIG WÄHLEN',
    precinct_label: 'Mordkommission Revier 4 · Östlicher Distrikt 7',
    name_label: 'VOLLSTÄNDIGER NAME',
    alias_label: 'BEINAME / PSYCHOLOGISCHER TITEL',
    facets_title: 'FACETTEN DER PSYCHE',
    points_available: 'Verfügbare Punkte',
    intellect_name: 'INTELLEKT',
    intellect_desc: 'Logik, Enzyklopädie, Rhetorik, Konzeptualisierung. Kühle Deduktion und rationale Analyse.',
    psyche_name: 'PSYCHE',
    psyche_desc: 'Esoterik, Empathie, Autorität, Suggestion. Übernatürliche Ahnungen und emotionale Schwere.',
    physique_name: 'PHYSIS',
    physique_desc: 'Ausdauer, Schmerzgrenze, Elektrochemie. Adrenalin, Urinstinkt und Überlebenswille.',
    motorics_name: 'MOTORIK',
    motorics_desc: 'Wahrnehmung, Hand-Auge-Koordination, Mechanik, Savoir-Faire. Schärfe der Sinne und Mikrohinweise.',
    signature_title: 'SIGNATURFÄHIGKEIT (+2 BONUS & INNERE STIMME)',
    vices_title: 'PERSÖNLICHE LASTER & PSYCHISCHE RISSE',
    start_inquiry: 'ERMITTLUNG AUFNEHMEN',
    endurance_label: 'AUSDAUER',
    morale_label: 'MORAL',
    hp_pip: 'HP',
    sp_pip: 'MP',
    day_prefix: 'TAG',
    nav_cabinet: '🧠 GEDANKENKABINETT',
    nav_clues: '📌 BEWEISDOSSIER',
    nav_inventory: '💼 INVENTAR',
    nav_audio: 'AUDIO',
    nav_language: 'SPRACHE',
    scene_location: 'Sankt-Irene-Uhrturm · Distrikt 7',
    scene_timestamp: 'Meister-Horologin Aurelia Vance · Leichnam um 03:42 Uhr im Glockenschlag aufgefunden',
    speaker_forensic: 'Forensische Beobachtung',
    interlocutor_active: 'AKTIVE INTERAKTION',
    modal_cabinet_title: 'GEDANKENKABINETT · THOUGHT CABINET',
    modal_inventory_title: 'ERMITTLERMANTEL & ASSERVATENBEUTEL',
    modal_clues_title: 'FALLAKTE · INDIZIEN-DEDUKTIONSMATRIX',
    modal_dice_title: 'FÄHIGKEITSPROBE',
    modal_language_title: 'UNTERTITEL & BENUTZEROBERFLÄCHE WÄHLEN',
    modal_victory_title: 'FALL ABGESCHLOSSEN',
    modal_gameover_title: 'ERMITTLUNG GESCHEITERT: ZUSAMMENBRUCH',
    dice_tally: '2D6 WURF + MODIFIKATOREN:',
    dice_rolling: 'WÜRFEL ROLLEN...',
    dice_passed: 'PROBE BESTANDEN!',
    dice_failed: 'PROBE MISSLUNGEN!',
    dice_proceed: 'MIT ERGEBNIS FORTFAHREN',
    btn_restart: 'NEUE ERMITTLUNG BEGINNEN',
    btn_retry: 'FALL NEU AUFROLLEN',
    btn_use: 'NUTZEN',
    btn_inspect: 'UNTERSUCHEN',
    btn_read: 'LESEN',
    badge_passive: 'PASSIV',
    badge_uses: 'Nutzungen übrig',
    toast_item_acquired: 'GEGENSTAND GEFUNDEN:',
    toast_item_used: 'GEGENSTAND GENUTZT:',
    toast_clue_discovered: 'ENTSCHEIDENDER HINWEIS:',
    toast_thought_unlocked: 'NEUER GEDANKE ENTHÜLLT:',
    toast_thought_internalized: 'GEDANKE VERINNERLICHT:',
    toast_xp_gained: 'ERFAHRUNG GEWONNEN:',
    toast_level_up: 'STUFENAUFSTIEG! FÄHIGKEITSPUNKT',
    toast_damage_health: 'VERLETZT! AUSDAUER GESUNKEN',
    toast_damage_morale: 'ERSCHÜTTERT! MORAL GESCHWÄCHT'
  },
  ru: {
    toast_case_opened: 'Дело открыто: Аурелия Вэнс · Добро пожаловать в Седьмой Район, детектив {name}',
    game_title: 'А Э Н И Г М А',
    case_badge: 'ДЕЛО #04: БЕЗМОЛВНЫЙ ЧАСОВЩИК',
    loader_quote: '«Часы никогда не останавливаются. Лишь плоть внутри них забывает, как биться».',
    loader_telemetry: 'Инициализация нейротелеметрии...',
    loader_enter: 'ВОЙТИ В АРХИВ',
    creator_title: 'ДОСЬЕ СЛЕДОВАТЕЛЯ',
    creator_subtitle: 'СОЗДАНИЕ ПЕРСОНАЖА',
    gender_female: '♀ ЖЕНЩИНА',
    gender_male: '♂ МУЖЧИНА',
    randomize_dossier: '🎲 СЛУЧАЙНОЕ ДОСЬЕ',
    precinct_label: 'Убойный отдел 4-го участка · Восточный сектор 7',
    name_label: 'ПОЛНОЕ ИМЯ ДЕТЕКТИВА',
    alias_label: 'ПСЕВДОНИМ / ПСИХОЛОГИЧЕСКИЙ ТИТУЛ',
    facets_title: 'ГРАНИ ПСИХИКИ',
    points_available: 'Доступно очков',
    intellect_name: 'ИНТЕЛЛЕКТ',
    intellect_desc: 'Логика, Энциклопедия, Риторика, Концептуализация. Холодная дедукция и рациональный анализ.',
    psyche_name: 'ПСИХИКА',
    psyche_desc: 'Эзотерика, Эмпатия, Авторитет, Внушение. Сверхъестественные предчувствия и эмоциональный вес.',
    physique_name: 'ФИЗИОЛОГИЯ',
    physique_desc: 'Стойкость, Болевой порог, Электрохимия. Адреналин, нутряное чутье и выживание.',
    motorics_name: 'МОТОРИКА',
    motorics_desc: 'Восприятие, Координация, Взаимодействие, Сноровка. Острые чувства и микро-улики.',
    signature_title: 'КОРОННЫЙ НАВЫК (+2 БОНУС И ВНУТРЕННИЙ ГОЛОС)',
    vices_title: 'ЛИЧНЫЕ ПОРОКИ И ПСИХИЧЕСКИЕ НАДЛОМЫ',
    start_inquiry: 'НАЧАТЬ РАССЛЕДОВАНИЕ',
    endurance_label: 'СТОЙКОСТЬ',
    morale_label: 'БОЕВОЙ ДУХ',
    hp_pip: 'ЗДР',
    sp_pip: 'ДУХ',
    day_prefix: 'ДЕНЬ',
    nav_cabinet: '🧠 КАБИНЕТ МЫСЛЕЙ',
    nav_clues: '📌 ДОСЬЕ УЛИК',
    nav_inventory: '💼 ИНВЕНТАРЬ',
    nav_audio: 'ЗВУК',
    nav_language: 'ЯЗЫК',
    scene_location: 'Часовая башня Святой Ирины · Сектор 7',
    scene_timestamp: 'Мастер-часовщик Аурелия Вэнс · Тело обнаружено в 03:42 посреди боя курантов',
    speaker_forensic: 'Судебно-медицинский осмотр',
    interlocutor_active: 'АКТИВНЫЙ ДИАЛОГ',
    modal_cabinet_title: 'КАБИНЕТ МЫСЛЕЙ · THOUGHT CABINET',
    modal_inventory_title: 'ПАЛЬТО ДЕТЕКТИВА И МЕШОК С ВЕЩДОКАМИ',
    modal_clues_title: 'МАТРИЦА ДЕДУКЦИИ И УЛИК',
    modal_dice_title: 'ПРОВЕРКА НАВЫКА',
    modal_language_title: 'ВЫБОР ЯЗЫКА СУБТИТРОВ И ИНТЕРФЕЙСА',
    modal_victory_title: 'ДЕЛО РАСКРЫТО',
    modal_gameover_title: 'РАССЛЕДОВАНИЕ ПРОВАЛЕНО: ГИБЕЛЬ',
    dice_tally: 'БРОСОК 2D6 + МОДИФИКАТОРЫ:',
    dice_rolling: 'БРОСОК КОСТЕЙ...',
    dice_passed: 'ПРОВЕРКА УСПЕШНА!',
    dice_failed: 'ПРОВЕРКА ПРОВАЛЕНА!',
    dice_proceed: 'ПРИНЯТЬ РЕЗУЛЬТАТ',
    btn_restart: 'НАЧАТЬ НОВОЕ ДЕЛО',
    btn_retry: 'ПОВТОРИТЬ РАССЛЕДОВАНИЕ',
    btn_use: 'ПРИМЕНИТЬ',
    btn_inspect: 'ОСМОТРЕТЬ',
    btn_read: 'ПРОЧЕСТЬ',
    badge_passive: 'ПАССИВНО',
    badge_uses: 'исп. осталось',
    toast_item_acquired: 'ПОЛУЧЕН ПРЕДМЕТ:',
    toast_item_used: 'ИСПОЛЬЗОВАН ПРЕДМЕТ:',
    toast_clue_discovered: 'НАЙДЕНА КЛЮЧЕВАЯ УЛИКА:',
    toast_thought_unlocked: 'ОТКРЫТА НОВАЯ МЫСЛЬ:',
    toast_thought_internalized: 'МЫСЛЬ УСВОЕНА:',
    toast_xp_gained: 'ПОЛУЧЕН ОПЫТ:',
    toast_level_up: 'НОВЫЙ УРОВЕНЬ! ПОЛУЧЕНО ОЧКО НАВЫКА',
    toast_damage_health: 'РАНЕНИЕ! СТОЙКОСТЬ СНИЖЕНА',
    toast_damage_morale: 'ШОК! БОЕВОЙ ДУХ ПОДОРВАН'
  },
  it: {
    toast_case_opened: 'Fascicolo del caso aperto: Aurelia Vance · Benvenuto nel Distretto 7, Detective {name}',
    game_title: 'A E N I G M A',
    case_badge: 'CASO #04: L\'OROLOGIAIA SILENZIOSA',
    loader_quote: '“L\'orologio non si ferma mai. È solo la carne al suo interno che dimentica come battere.”',
    loader_telemetry: 'Inizializzazione telemetria neurale...',
    loader_enter: 'ACCEDI ALL\'ARCHIVIO',
    creator_title: 'DOSSIER DELL\'INVESTIGATORE',
    creator_subtitle: 'CREAZIONE PERSONAGGIO',
    gender_female: '♀ DONNA',
    gender_male: '♂ UOMO',
    randomize_dossier: '🎲 DOSSIER CASUALE',
    precinct_label: 'Sezione Omicidi Distretto 4 · Settore Orientale 7',
    name_label: 'NOME COMPLETO DETECTIVE',
    alias_label: 'ALIAS / TITOLO PSICOLOGICO',
    facets_title: 'FACETTE DELLA PSICHE',
    points_available: 'Punti Disponibili',
    intellect_name: 'INTELLETTO',
    intellect_desc: 'Logica, Enciclopedia, Retorica, Concettualizzazione. Fredda deduzione e analisi razionale.',
    psyche_name: 'PSICHE',
    psyche_desc: 'Esoterismo, Empatia, Autorità, Suggestione. Intuizioni sovrannaturali e gravità emotiva.',
    physique_name: 'FISICO',
    physique_desc: 'Tempra, Soglia del Dolore, Elettrochimica. Adrenalina, istinto viscerale e sopravvivenza.',
    motorics_name: 'MOTORICA',
    motorics_desc: 'Percezione, Coordinazione Occhio-Mano, Interfaccia, Savoir-Faire. Sensi acuti e micro-indizi.',
    signature_title: 'ABILITÀ DISTINTIVA (+2 BONUS E VOCE INTERIORE)',
    vices_title: 'VIZI PERSONALI E CREPE PSICHICHE',
    start_inquiry: 'AVVIA L\'INDAGINE',
    endurance_label: 'TEMPRA',
    morale_label: 'MORALE',
    hp_pip: 'PV',
    sp_pip: 'PM',
    day_prefix: 'GIORNO',
    nav_cabinet: '🧠 GABINETTO DEI PENSIERI',
    nav_clues: '📌 FASCICOLO PROVE',
    nav_inventory: '💼 INVENTARIO',
    nav_audio: 'AUDIO',
    nav_language: 'LINGUA',
    scene_location: 'Torre dell\'Orologio di Sant\'Irene · Distretto 7',
    scene_timestamp: 'Maestra Orologiaia Aurelia Vance · Corpo rinvenuto alle 03:42 durante i rintocchi',
    speaker_forensic: 'Rilievi Medico-Legali',
    interlocutor_active: 'INTERAZIONE ATTIVA',
    modal_cabinet_title: 'GABINETTO DEI PENSIERI · THOUGHT CABINET',
    modal_inventory_title: 'CAPPOTTO DA DETECTIVE E SACCA PROVE',
    modal_clues_title: 'DOSSIER DEL CASO · MATRICE DI DEDUZIONE',
    modal_dice_title: 'PROVA DI ABILITÀ',
    modal_language_title: 'SELEZIONA LINGUA SOTTOTITOLI E INTERFACCIA',
    modal_victory_title: 'CASO CHIUSO',
    modal_gameover_title: 'INDAGINE INTERROTTA: COLLASSO',
    dice_tally: 'LANCIO 2D6 + MODIFICATORI:',
    dice_rolling: 'LANCIO IN CORSO...',
    dice_passed: 'PROVA SUPERATA!',
    dice_failed: 'PROVA FALLITA!',
    dice_proceed: 'PROCEDI CON IL RISULTATO',
    btn_restart: 'INIZIA NUOVA INDAGINE',
    btn_retry: 'RIPROVA INDAGINE',
    btn_use: 'USA',
    btn_inspect: 'ESAMINA',
    btn_read: 'LEGGI',
    badge_passive: 'PASSIVO',
    badge_uses: 'usi rimasti',
    toast_item_acquired: 'OGGETTO OTTENUTO:',
    toast_item_used: 'OGGETTO CONSUMATO:',
    toast_clue_discovered: 'INDIZIO CRUCIALE SVELATO:',
    toast_thought_unlocked: 'NUOVO PENSIERO AFFIORATO:',
    toast_thought_internalized: 'PENSIERO INTERIORIZZATO:',
    toast_xp_gained: 'ESPERIENZA ACQUISITA:',
    toast_level_up: 'LIVELLO SUPERIORE! PUNTO ABILITÀ',
    toast_damage_health: 'FERITO! TEMPRA RIDOTTA',
    toast_damage_morale: 'SCIOCCATO! MORALE COMPROMESSO'
  },
  pt: {
    toast_case_opened: 'Dossiê do caso aberto: Aurelia Vance · Bem-vindo ao Distrito 7, Detetive {name}',
    game_title: 'A E N I G M A',
    case_badge: 'CASO #04: A RELOJOEIRA SILENCIOSA',
    loader_quote: '“O relógio nunca para. Apenas a carne em seu interior esquece como bater.”',
    loader_telemetry: 'Inicializando telemetria neural...',
    loader_enter: 'ACESSAR O ARQUIVO',
    creator_title: 'DOSSIÊ DO INVESTIGADOR',
    creator_subtitle: 'CRIAÇÃO DE PERSONAGEM',
    gender_female: '♀ FEMININO',
    gender_male: '♂ MASCULINO',
    randomize_dossier: '🎲 DOSSIÊ ALEATÓRIO',
    precinct_label: 'Divisão de Homicídios Distrito 4 · Setor Leste 7',
    name_label: 'NOME COMPLETO DO DETETIVE',
    alias_label: 'ALCUNHA / TÍTULO PSICOLÓGICO',
    facets_title: 'FACETAS DA PSIQUE',
    points_available: 'Pontos Disponíveis',
    intellect_name: 'INTELECTO',
    intellect_desc: 'Lógica, Enciclopédia, Retórica, Conceitualização. Dedução fria e análise racional.',
    psyche_name: 'PSIQUE',
    psyche_desc: 'Esoterismo, Empatia, Autoridade, Sugestão. Intuições sobrenaturais e peso emocional.',
    physique_name: 'FÍSICO',
    physique_desc: 'Resistência, Limiar de Dor, Eletroquímica. Adrenalina, instinto visceral e sobrevivência.',
    motorics_name: 'MOTRICIDADE',
    motorics_desc: 'Percepção, Coordenação Olho-Mão, Interface, Savoir-Faire. Sentidos afiados e micro-pistas.',
    signature_title: 'HABILIDADE ASSINATURA (+2 BÔNUS E VOZ INTRUSIVA)',
    vices_title: 'VÍCIOS PESSOAIS E FRATURAS PSÍQUICAS',
    start_inquiry: 'INICIAR INVESTIGAÇÃO',
    endurance_label: 'RESISTÊNCIA',
    morale_label: 'MORAL',
    hp_pip: 'PV',
    sp_pip: 'PM',
    day_prefix: 'DIA',
    nav_cabinet: '🧠 GABINETE DE PENSAMENTOS',
    nav_clues: '📌 DOSSIÊ DE PISTAS',
    nav_inventory: '💼 INVENTÁRIO',
    nav_audio: 'ÁUDIO',
    nav_language: 'IDIOMA',
    scene_location: 'Torre do Relógio de Santa Irene · Distrito 7',
    scene_timestamp: 'Mestra Horóloga Aurelia Vance · Corpo encontrado às 03:42 durante o badalar do sino',
    speaker_forensic: 'Observação Forense',
    interlocutor_active: 'INTERAÇÃO ATIVA',
    modal_cabinet_title: 'GABINETE DE PENSAMENTOS · THOUGHT CABINET',
    modal_inventory_title: 'CASACO DO DETETIVE E SACO DE EVIDÊNCIAS',
    modal_clues_title: 'DOSSIÊ DO CASO · MATRIZ DE DEDUÇÃO',
    modal_dice_title: 'TESTE DE HABILIDADE',
    modal_language_title: 'SELECIONAR IDIOMA DAS LEGENDAS E INTERFACE',
    modal_victory_title: 'CASO CONCLUÍDO',
    modal_gameover_title: 'INVESTIGAÇÃO ENCERRADA: COLAPSO',
    dice_tally: 'ROLANDO 2D6 + MODIFICADORES:',
    dice_rolling: 'ROLANDO DADOS...',
    dice_passed: 'TESTE BEM-SUCEDIDO!',
    dice_failed: 'TESTE FALHOU!',
    dice_proceed: 'AVANÇAR COM O RESULTADO',
    btn_restart: 'INICIAR NOVA INVESTIGAÇÃO',
    btn_retry: 'RECOMEÇAR INVESTIGAÇÃO',
    btn_use: 'USAR',
    btn_inspect: 'INSPECIONAR',
    btn_read: 'LER',
    badge_passive: 'PASSIVO',
    badge_uses: 'usos restantes',
    toast_item_acquired: 'ITEM ADQUIRIDO:',
    toast_item_used: 'ITEM UTILIZADO:',
    toast_clue_discovered: 'PISTA CRUCIAL ENCONTRADA:',
    toast_thought_unlocked: 'NOVO PENSAMENTO DESPERTO:',
    toast_thought_internalized: 'PENSAMENTO INTERNALIZADO:',
    toast_xp_gained: 'EXPERIÊNCIA ADQUIRIDA:',
    toast_level_up: 'SUBIU DE NÍVEL! PONTO DE HABILIDADE',
    toast_damage_health: 'FERIDO! RESISTÊNCIA REDUZIDA',
    toast_damage_morale: 'ABALADO! MORAL COMPROMETIDO'
  },
  ar: {
    toast_case_opened: 'تم فتح ملف القضية: أوريليا فانس · مرحبًا بك في المقاطعة 7، أيها المحقق {name}',
    game_title: 'إ ي ن ي ج م ا',
    case_badge: 'القضية #04: صانعة الساعات الصامتة',
    loader_quote: '«عقارب الساعة لا تتوقف أبدًا. وحده الجسد بين تروسها ينسى كيف ينبض.»',
    loader_telemetry: 'تهيئة القياس العصبي عن بُعد...',
    loader_enter: 'الدخول إلى الأرشيف',
    creator_title: 'ملف المحقق',
    creator_subtitle: 'إنشاء الشخصية',
    gender_female: '♀ أنثى',
    gender_male: '♂ ذكر',
    randomize_dossier: '🎲 توليد ملف عشوائي',
    precinct_label: 'قسم الجرائم بالدائرة 4 · القطاع الشرقي 7',
    name_label: 'الاسم الكامل للمحقق',
    alias_label: 'اللقب / المسمى النفسي',
    facets_title: 'أبعاد النفس البشرية',
    points_available: 'النقاط المتاحة',
    intellect_name: 'العقل والذكاء',
    intellect_desc: 'المنطق، الموسوعة، البلاغة، المفاهيم. استنتاج بارد وتحليل عقلاني صارم.',
    psyche_name: 'النفس والروح',
    psyche_desc: 'الباطنية، التعاطف، الهيبة والسلطة، الإيحاء. حدس غيبي وثقل وجداني.',
    physique_name: 'البنية الجسدية',
    physique_desc: 'قوة التحمل، عتبة الألم، الكيمياء العضوية. الأدرينالين وغريزة البقاء الفطرية.',
    motorics_name: 'المهارات الحركية',
    motorics_desc: 'الإدراك الحسي، التناسق، التفاعل الميكانيكي، الحنكة. حواس ثاقبة وقراءة الآثار الدقيقة.',
    signature_title: 'المهارة المميزة (+2 نقاط وصوت باطني عميق)',
    vices_title: 'الرذائل الشخصية والشروخ النفسية',
    start_inquiry: 'بدء التحقيق الجنائي',
    endurance_label: 'التحمل الجسدي',
    morale_label: 'المعنويات',
    hp_pip: 'صحة',
    sp_pip: 'روح',
    day_prefix: 'اليوم',
    nav_cabinet: '🧠 خزانة الأفكار',
    nav_clues: '📌 ملف الأدلة',
    nav_inventory: '💼 الحقيبة',
    nav_audio: 'الصوت',
    nav_language: 'اللغة',
    scene_location: 'برج ساعات القديسة إيرين · القطاع 7',
    scene_timestamp: 'كبيرة صانعي الساعات أوريليا فانس · عُثر على الجثمان الساعة 03:42 فجرًا بين دقات البندول',
    speaker_forensic: 'معاينة الطب الشرعي',
    interlocutor_active: 'تفاعل نشط',
    modal_cabinet_title: 'خزانة الأفكار · THOUGHT CABINET',
    modal_inventory_title: 'معطف المحقق وحقيبة الأحراز',
    modal_clues_title: 'ملف القضية · مصفوفة الاستنتاج الجنائي',
    modal_dice_title: 'اختبار المهارة والفرصة',
    modal_language_title: 'اختر لغة الترجمة وواجهة المستخدم',
    modal_victory_title: 'إغلاق القضية بنجاح',
    modal_gameover_title: 'فشل التحقيق: انهيار مأساوي',
    dice_tally: 'رمي النرد 2D6 + المكافآت:',
    dice_rolling: 'تدوير النرد...',
    dice_passed: 'نجح الاختبار!',
    dice_failed: 'فشل الاختبار!',
    dice_proceed: 'متابعة النتيجة',
    btn_restart: 'فتح تحقيق جديد',
    btn_retry: 'إعادة المحاولة',
    btn_use: 'استخدام',
    btn_inspect: 'فحص دقيق',
    btn_read: 'قراءة',
    badge_passive: 'تأثير دائم',
    badge_uses: 'استخدامات متبقية',
    toast_item_acquired: 'تم تحريز أداة:',
    toast_item_used: 'تم استخدام:',
    toast_clue_discovered: 'كشف دليل حاسم:',
    toast_thought_unlocked: 'بزغت فكرة جديدة:',
    toast_thought_internalized: 'تم استيعاب الفكرة:',
    toast_xp_gained: 'اكتساب خبرة:',
    toast_level_up: 'ترقية المستوى! نقطة مهارة جديدة',
    toast_damage_health: 'إصابة جسدية! تراجع التحمل',
    toast_damage_morale: 'صدمة نفسية! تراجع المعنويات'
  }
};

// Item, Clue, Thought, and POI Localizations for 12 Languages
const ITEMS_I18N = {
  detective_badge: {
    name: {
      id: 'Lencana Kusam Distrik 4',
      en: 'Tarnished Precinct 4 Badge',
      ja: '変色した第4分署の警察バッジ',
      zh: '褪色的第四警区警徽',
      ko: '변색된 제4관할서 배지',
      es: 'Placa Deslustrada del Precinto 4',
      fr: 'Insigne Terni du 4e District',
      de: 'Verblasste Dienstmarke von Revier 4',
      ru: 'Потускневший жетон 4-го участка',
      it: 'Distintivo Sbiadito del Distretto 4',
      pt: 'Distintivo Desgastado do Distrito 4',
      ar: 'شارة الدائرة 4 الباهتة'
    },
    description: {
      id: 'Lencana perak dengan lambang keadilan yang tergores. Mengibaskannya di depan saksi memberikan +2 Otoritas.',
      en: 'Bent silver badge with imperial scales scratched off. Flashing it commands obedience (+2 Authority bonus).',
      ja: '天秤の紋章が削り取られた銀のバッジ。相手に見せつけることで威信+2を得る。',
      zh: '磨损的银质警徽。向嫌疑人出示可施加心理威慑（获得+2权威加成）。',
      ko: '천칭 문양이 긁혀나간 은제 배지. 상대에게 과시하여 권위 +2 보너스를 얻습니다.',
      es: 'Placa de plata doblada con la balanza rayada. Mostrarla impone obediencia (+2 Autoridad).',
      fr: 'Insigne d\'argent courbé. Le brandir impose l\'autorité (+2 Autorité).',
      de: 'Verbeulte Silbermarke. Ihr Vorzeigen verschafft Respekt (+2 Autorität).',
      ru: 'Погнутый серебряный жетон. Демонстрация внушает уважение (+2 к Авторитету).',
      it: 'Distintivo d\'argento piegato. Mostrarlo incute timore (+2 Autorità).',
      pt: 'Distintivo de prata amassado. Exibi-lo impõe respeito (+2 Autoridade).',
      ar: 'شارة فضية ملتوية. إبرازها يفرض الهيبة وسلطة التحقيق (+2 سلطة).'
    }
  },
  astra_cigarettes: {
    name: {
      id: 'Sebungkus Rokok Astra Merah',
      en: 'Pack of Astra Red Filterless',
      ja: 'アストラ・レッド（両切り煙草）',
      zh: '阿斯特拉无嘴红烟',
      ko: '아스트라 레드 필터리스 담배',
      es: 'Paquete de Astra Rojo sin Filtro',
      fr: 'Paquet d\'Astra Rouge sans Filtre',
      de: 'Schachtel Astra Rot ohne Filter',
      ru: 'Пачка крепких сигарет «Астра Красная»',
      it: 'Pacchetto di Astra Rosse senza Filtro',
      pt: 'Maço de Astra Vermelho sem Filtro',
      ar: 'علبة سجائر أسترا الحمراء بلا فلتر'
    },
    description: {
      id: 'Tembakau belerang murah dari dermaga selatan. Menghisapnya memulihkan +2 Kewarasan, namun mengurangi -1 Daya Tahan.',
      en: 'Cheap sulfur-cured tobacco from the docks. Inhaling restores +2 Morale, but costs -1 Endurance.',
      ja: '安価な硫黄燻製タバコ。吸い込むと精神力+2回復するが、耐久値-1を消耗する。',
      zh: '码头廉价硫熏烟草。深吸一口可恢复+2理智，但损耗-1体能。',
      ko: '싸구려 유황 훈제 담배. 흡연 시 사기 +2 회복, 체력 -1 소모.',
      es: 'Tabaco curado con azufre barato de los muelles. Fumar restaura +2 Moral, pero cuesta -1 Aguante.',
      fr: 'Tabac bon marché des docks. Fumer restaure +2 Moral, mais coûte -1 Endurance.',
      de: 'Billiger schwefelgetränkter Hafentabak. Rauchen stellt +2 Moral her, kostet -1 Ausdauer.',
      ru: 'Дешевый ядреный табак из доков. Восстанавливает +2 Духа, но отнимает -1 Стойкости.',
      it: 'Tabacco zolfato economico dei moli. Fumarlo ripristina +2 Morale, ma costa -1 Tempra.',
      pt: 'Tabaco barato do cais. Fumar restaura +2 Moral, mas custa -1 Resistência.',
      ar: 'تبغ رخيص معالج بالكبريت. تدخينها يستعيد +2 معنويات لكن يكلف -1 من التحمل الجسدي.'
    }
  },
  medicinal_flask: {
    name: {
      id: 'Labu Tinktur Laudanum Medis',
      en: 'Medicinal Laudanum Tincture',
      ja: '医療用アヘンチンキ瓶',
      zh: '医用阿片酊药剂瓶',
      ko: '의료용 라우다넘 팅크병',
      es: 'Frasco de Tintura de Láudano Medicinal',
      fr: 'Flacon de Teinture de Laudanum Médicinal',
      de: 'Medizinische Laudanum-Tinktur',
      ru: 'Флакон медицинской настойки опия (Лауданум)',
      it: 'Fiala di Tintura di Laudano Medicinale',
      pt: 'Frasco de Tintura de Láudano Medicinal',
      ar: 'قارورة صبغة اللودانوم الطبية المخدرة'
    },
    description: {
      id: 'Cairan kental berwarna amber. Meminumnya memulihkan +2 Daya Tahan & +1 Esoterika, meredakan trauma fisik seketika.',
      en: 'Amber sedative fluid. Drinking restores +2 Health and boosts +1 Esoterica, numbing visceral agony.',
      ja: '琥珀色の鎮痛薬液。服用すると耐久力+2回復、秘教+1、激痛を即座に麻痺させる。',
      zh: '琥珀色镇痛酊剂。饮用恢复+2体能并提升+1秘教，瞬间麻痹剧痛。',
      ko: '호박색 진통 약제. 복용 시 체력 +2 회복 및 비전 +1, 육체적 격통 완화.',
      es: 'Líquido sedante ambarino. Beber restaura +2 Salud y otorga +1 Esoterismo, aliviando el dolor.',
      fr: 'Liquide sédatif ambré. Boire restaure +2 Santé et confère +1 Ésotérisme.',
      de: 'Bernsteinfarbene Tinktur. Stellt +2 Ausdauer her und verleiht +1 Esoterik, betäubt Qualen.',
      ru: 'Янтарный седативный раствор. Восстанавливает +2 Здоровья и дает +1 к Эзотерике, глуша боль.',
      it: 'Liquido sedativo ambrato. Bere ripristina +2 Salute e conferisce +1 Esoterismo.',
      pt: 'Líquido sedativo âmbar. Beber restaura +2 Saúde e concede +1 Esoterismo.',
      ar: 'سائل مسكن كهرماني. شربه يستعيد +2 صحة ويمنح +1 باطنية، مخدرًا الألم الفظيع.'
    }
  },
  broken_pocketwatch: {
    name: {
      id: 'Jam Saku Horologis yang Retak',
      en: 'Cracked Horologist Pocket Watch',
      ja: 'ひび割れた時計師の懐中時計',
      zh: '破裂的宗师怀表',
      ko: '균열된 시계 장인의 회중시계',
      es: 'Reloj de Bolsillo Roto de la Horóloga',
      fr: 'Montre à Gousset Fendue de l\'Horlogère',
      de: 'Gesprungene Taschenuhr der Uhrmacherin',
      ru: 'Разбитые карманные часы мастера',
      it: 'Orologio da Taschino Incrinato dell\'Orologiaia',
      pt: 'Relógio de Bolso Quebrado da Horóloga',
      ar: 'ساعة جيب صانعة الساعات المتصدعة'
    },
    description: {
      id: 'Mati tepat pada 03:42. Memeriksa mekanisme engsel gandanya mengungkap ukiran sandi rahasia: "7 - 3 - 12".',
      en: 'Frozen precisely at 03:42. Inspecting the bezel mechanism reveals the engraved safe cipher: "7 - 3 - 12".',
      ja: '03:42で針が停止。外枠の歯車機構を調べると、金庫の暗号「7 - 3 - 12」が刻まれている。',
      zh: '精准停在03:42。拆解内嵌齿轮可发现镌刻的秘密保险箱密码：“7 - 3 - 12”。',
      ko: '정확히 03:42에 멈춤. 톱니를 점검하면 금고 비밀번호 "7 - 3 - 12"가 각인되어 있습니다.',
      es: 'Detenido a las 03:42. Inspeccionar el mecanismo revela la clave grabada de la caja fuerte: "7 - 3 - 12".',
      fr: 'Figée à 03h42. Examiner le boîtier révèle le chiffre gravé du coffre-fort: « 7 - 3 - 12 ».',
      de: 'Präzise um 03:42 stehengeblieben. Die Untersuchung offenbart die eingravierte Kombination: „7 - 3 - 12“.',
      ru: 'Застыли ровно в 03:42. Осмотр механизма открывает выгравированный шифр сейфа: «7 - 3 - 12».',
      it: 'Fermo alle 03:42. Esaminando la ghiera si scopre la combinazione incisa: "7 - 3 - 12".',
      pt: 'Travado às 03:42. Inspecionar as engrenagens revela o código gravado do cofre: "7 - 3 - 12".',
      ar: 'توقفت بدقة عند 03:42. فحص تروسها يكشف شفرة الخزنة المنقوشة: «7 - 3 - 12».'
    }
  },
  magnifying_loupe: {
    name: {
      id: 'Kaca Pembesar Monokel Presisi',
      en: 'Precision Horologist Loupe',
      ja: '精密時計師用ルーペ',
      zh: '钟表匠精密目镜',
      ko: '정밀 시계공 루페',
      es: 'Lupa Monocular de Precisión',
      fr: 'Loupe de Précision d\'Horloger',
      de: 'Präzisions-Uhrmacherlupe',
      ru: 'Прецизионная часовая лупа-монокль',
      it: 'Lente d\'Ingrandimento di Precisione',
      pt: 'Lupa Monocular de Precisão',
      ar: 'عدسة فحص الساعات الدقيقة'
    },
    description: {
      id: 'Lensa akromatik kuningan. Menggunakannya memberikan +2 Persepsi & mengungkap luka tusuk mikroskopis di leher korban.',
      en: 'Achromatic brass loupe. Equipping grants +2 Perception and reveals microscopic puncture wounds on the victim\'s neck.',
      ja: '色消し真鍮製ルーペ。使用すると知覚+2、被害者の首筋にある微小な注射針痕を発見できる。',
      zh: '消色差黄铜目镜。装备获得+2感知，并能洞察受害者颈部极其细微的毒针孔。',
      ko: '황동제 색지움 루페. 장착 시 지각 +2 부여 및 피해자 목덜미의 미세한 독침 바늘구멍 발견 가능.',
      es: 'Lupa acromática de latón. Otorga +2 Percepción y revela punciones microscópicas en el cuello de la víctima.',
      fr: 'Loupe achromatique en laiton. Confère +2 Perception et révèle des piqûres microscopiques sur le cou de la victime.',
      de: 'Messinglupe. Gewährt +2 Wahrnehmung und offenbart mikroskopische Einstichstellen am Hals des Opfers.',
      ru: 'Ахроматическая латунная лупа. Дает +2 к Восприятию и позволяет различить микроскопический укол на шее жертвы.',
      it: 'Lente acromatica in ottone. Conferisce +2 Percezione e rivela fori di spillo microscopici sul collo della vittima.',
      pt: 'Lupa acromática de latão. Concede +2 Percepção e revela picadas microscópicas no pescoço da vítima.',
      ar: 'عدسة نحاسية دقيقة. استخدامها يمنح +2 إدراك ويكشف ثقوب وخز مجهرية على رقبة الضحية.'
    }
  },
  perpetuum_ledger: {
    name: {
      id: 'Buku Besar Rahasia Perpetuum',
      en: 'The Perpetuum Cartel Ledger',
      ja: '永久機関カルテルの秘密台帳',
      zh: '永动机密会秘密账簿',
      ko: '영구기관 카르텔의 비밀 원장',
      es: 'Libro Mayor del Cartel Perpetuum',
      fr: 'Grand Livre Secret du Cartel Perpetuum',
      de: 'Geheimbuch des Perpetuum-Kartells',
      ru: 'Секретный гроссбух картеля «Перпетуум»',
      it: 'Mastro Segreto del Cartello Perpetuum',
      pt: 'Livro-Razão Secreto do Cartel Perpetuum',
      ar: 'دفتر حسابات كارتل بيربيتوم السري'
    },
    description: {
      id: 'Ditemukan di brankas tersembunyi. Membacanya mengungkap suap jutaan guilder dari Sindikat ke rekening Vivienne Vance (+50 XP).',
      en: 'Found in the floorboard safe. Reading deciphers illicit payoffs from the Syndicate to Madame Vance\'s account (+50 XP).',
      ja: '隠し金庫から発見。読了するとシンジケートからヴィヴィアンへの巨額賄賂が判明（+50 XP）。',
      zh: '在暗格保险箱中起获。研读可破译联合阵线向薇薇安账户汇款的巨额贿赂记录（获得+50经验）。',
      ko: '마루 밑 비밀 금고에서 발견. 열독 시 신디케이트가 비비안 밴스에게 건넨 거액의 뇌물 내역 해독 (+50 XP).',
      es: 'Hallado en la caja oculta. Leerlo descifra sobornos ilícitos del Sindicato a Madame Vance (+50 XP).',
      fr: 'Trouvé dans le coffre du plancher. Le lire déchiffre les pots-de-vin du Syndicat versés à Vivienne (+50 XP).',
      de: 'Im Bodentresor gefunden. Das Lesen entschlüsselt Schmiergelder des Syndikats an Madame Vance (+50 XP).',
      ru: 'Найден в тайнике под полом. Прочтение раскрывает подкуп мадам Вэнс Синдикатом на огромные суммы (+50 опыта).',
      it: 'Trovato nella cassaforte segreta. Leggerlo svela le tangenti versate dal Sindacato a Madame Vance (+50 XP).',
      pt: 'Encontrado no cofre sob o piso. Lê-lo decifra propinas do Sindicato pagas a Madame Vance (+50 XP).',
      ar: 'عُثر عليه بالخزنة الأرضية. قراءته تفك شفرة رشاوى طائلة حُوّلت من النقابة لحساب فيفيان فانس (+50 خبرة).'
    }
  },
  poison_chess_queen: {
    name: {
      id: 'Bidak Ratu Catur Gading Beracun',
      en: 'The Poisoned Ivory Queen',
      ja: '毒針が仕込まれた象牙のクイーン',
      zh: '藏有毒针的象牙黑后棋子',
      ko: '독침이 장치된 상아 흑색 퀸 기물',
      es: 'Reina de Ajedrez Envenenada',
      fr: 'Reine d\'Échecs en Ivoire Empoisonnée',
      de: 'Vergiftete Elfenbein-Schachdame',
      ru: 'Отравленный ферзь из слоновой кости',
      it: 'Regina di Scacchi Avvelenata',
      pt: 'Rainha de Xadrez Envenenada',
      ar: 'قطعة وزير الشطرنج العاجية المسمومة'
    },
    description: {
      id: 'Tergenggam erat di tangan korban. Membongkar dasarnya mengungkap jarum berpegas dengan residu asam prusat mematikan.',
      en: 'Clenched in Aurelia\'s corpse. Unscrewing the hollow base reveals a spring-loaded needle with dried prussic poison.',
      ja: '被害者が握りしめていた物。底を回すと、青酸毒の結晶が付着したスプリング式極細針が飛び出す。',
      zh: '死者手中紧攥之物。拧开中空底座，赫然露出一枚带有干燥氢氰酸剧毒残留的弹簧暗针。',
      ko: '시신의 손에 쥐여 있던 기물. 밑바닥을 돌리면 건조된 청산 독극물이 묻은 스프링 독침이 노출됩니다.',
      es: 'Apretada en la mano del cadáver. Desenroscar la base revela una aguja con residuos de cianuro letal.',
      fr: 'Serrée dans la main de la victime. Dévisser la base creuse révèle une aiguille à ressort souillée de cyanure.',
      de: 'Umklammert in der Hand der Toten. Das Aufschrauben enthüllt eine Federnadel mit Blausäurerückständen.',
      ru: 'Была зажата в руке жертвы. Отвинтив основание, вы обнажаете пружинную иглу со следами цианистого яда.',
      it: 'Stretta nella mano della vittima. Svitando la base cava si rivela un ago a molla con residui di cianuro.',
      pt: 'Apertada na mão do cadáver. Desenroscar a base revela uma agulha com resíduos de cianeto mortal.',
      ar: 'كانت الضحية تقبض عليها بإحكام. فك قاعدتها المجوفة يكشف عن إبرة نابضة ملوثة ببلورات سم السيانيد القاتل.'
    }
  }
};

// Points of Interest (POIs) Translations
const POI_I18N = {
  poi_pendulum: {
    title: {
      id: 'Pendulum Raksasa & Beban Penyeimbang',
      en: 'The Great Pendulum & Counterweight',
      ja: '大振り子と鋳鉄カウンターウェイト',
      zh: '巨型钟摆与铸铁配重块',
      ko: '거대 진자와 주철 평형추',
      es: 'El Gran Péndulo y Contrapeso',
      fr: 'Le Grand Balancier et Contrepoids',
      de: 'Das Große Pendel und Gegengewicht',
      ru: 'Исполинский маятник и противовес',
      it: 'Il Grande Pendolo e Contrappeso',
      pt: 'O Grande Pêndulo e Contrapeso',
      ar: 'البندول الضخم وثقل الموازنة الحديدي'
    },
    description: {
      id: 'Pendulum kuningan raksasa berayun di kegelapan menara, menggantung tepat di atas jurang roda gigi tempat jenazah Aurelia Vance tertancap.',
      en: 'The colossal brass pendulum hanging in the gloom, swinging like a gilded blade above the gear abyss where Aurelia Vance was impaled.',
      ja: '薄暗がりの中に吊るされた巨大な真鍮製振り子。オレリア・ヴァンスの遺体が貫かれた歯車の深淵の上で揺れている。',
      zh: '悬垂于阴暗高处的青铜巨型钟摆，如同一把悬在深渊之上的断头巨刃，受害者正被贯穿在下方的铸铁配重臂上。',
      ko: '어둠 속에 매달린 거대한 황동 진자. 오렐리아 밴스의 시신이 꿰뚫린 톱니바퀴 심연 위로 번뜩입니다.',
      es: 'El colosal péndulo de latón colgando en la penumbra, oscilando sobre el abismo de engranajes donde yacía ensartada Aurelia Vance.',
      fr: 'Le colossal balancier de laiton suspendu dans la pénombre, oscillant au-dessus des engrenages où repose le corps d\'Aurelia Vance.',
      de: 'Das kolossale Messingpendel im Düsteren, schwingend über dem Zahnradabgrund, wo Aurelia Vance aufgespießt wurde.',
      ru: 'Колоссальный латунный маятник в полумраке, качающийся над бездной шестерен, где насажено тело Аурелии Вэнс.',
      it: 'Il colossale pendolo d\'ottone sospeso nel buio, oscillante sopra l\'abisso di ingranaggi dove giace trapassata Aurelia Vance.',
      pt: 'O colossal pêndulo de latão na escuridão, oscilando sobre o abismo de engrenagens onde jaz empalada Aurelia Vance.',
      ar: 'البندول النحاسي العملاق المعلق في الظلام، يتأرجح كنصل قاطع فوق هاوية التروس حيث طُعنت أوريليا فانس.'
    }
  },
  poi_pocketwatch: {
    title: {
      id: 'Jam Saku Alkimia & Garis Kapur Jenazah',
      en: 'The Alchemical Pocket Watch & Chalk Outline',
      ja: '錬金術的懐中時計とチョークの遺体輪郭',
      zh: '炼金怀表与血迹白垩轮廓',
      ko: '연금술 회중시계와 혈흔 백묵 선',
      es: 'El Reloj Alquímico y Contorno de Tiza',
      fr: 'La Montre Alchimique et Tracé à la Craie',
      de: 'Die Alchemistische Taschenuhr und Kreidelinie',
      ru: 'Алхимические карманные часы и меловой контур',
      it: 'L\'Orologio Alchemico e Sagoma di Gesso',
      pt: 'O Relógio Alquímico e Contorno de Giz',
      ar: 'ساعة الجيب الخيميائية ورسم الطباشير'
    },
    description: {
      id: 'Tergeletak di lantai kayu berlumuran darah di dekat tas kerja korban yang berserakan di tengah hembusan angin dingin.',
      en: 'Lying on the blood-soaked boards next to the victim\'s scattered belongings and dropped briefcase in the drafty rain.',
      ja: '血染めの床板に落ちた遺留品。冷たい風雨が吹き込む中、散乱した書類鞄の横に転がっている。',
      zh: '静卧在浸透血渍的木地板上，旁边散落着死者的随身公文包与风雨侵袭的演算手稿。',
      ko: '피로 물든 바닥에 뒹구는 유품. 찬 바람과 비가 들이치는 가운데 흩어진 가방 곁에 놓여 있습니다.',
      es: 'Tirado sobre las tablas ensangrentadas junto al maletín caído y las pertenencias dispersas de la víctima.',
      fr: 'Gisant sur les planches ensanglantées près des effets éparpillés et de la mallette abandonnée de la victime.',
      de: 'Liegt auf den blutgetränkten Dielen neben der verstreuten Aktentasche der Ermordeten.',
      ru: 'Лежат на залитых кровью досках рядом с рассыпанными вещами и портфелем жертвы под каплями дождя.',
      it: 'Giacente sulle assi insanguinate accanto alla valigetta rovesciata e agli effetti personali della vittima.',
      pt: 'Caído sobre as tábuas ensanguentadas ao lado da pasta revirada e dos pertences da vítima.',
      ar: 'ملقاة على الألواح الخشبية المخضبة بالدماء بجوار حقيبة الضحية المتناثرة تحت زخات المطر العاصف.'
    }
  },
  poi_balcony: {
    title: {
      id: 'Wajah Jam Kaca & Terpaan Hujan Malam',
      en: 'The Luminous Clock Face & Rain Vista',
      ja: '大時計のステンドグラス文字盤と雨夜の眺望',
      zh: '透光巨钟表盘与雨夜鸟瞰',
      ko: '투광 시계 문자판과 비바람 전경',
      es: 'La Esfera Luminosa y Vista Lluviosa',
      fr: 'Le Cadran Lumineux et Vue Pluvieuse',
      de: 'Das Leuchtende Zifferblatt und Regenpanorama',
      ru: 'Светящийся циферблат и вид на дождливый город',
      it: 'Il Quadrante Luminoso e la Pioggia Notturna',
      pt: 'O Mostrador Iluminado e Vista Chuvosa',
      ar: 'وجه الساعة الزجاجي المضيء ومشهد المطر'
    },
    description: {
      id: 'Kaca patri jam raksasa yang bercahaya redup. Hujan deras menghantam angka-angka Romawi tinggi di atas atap Distrik 7.',
      en: 'The monumental round stained-glass clock, rain beating violently against the Roman numerals high above the city.',
      ja: '巨大なステンドグラス時計の文字盤。第7区の街並みを見下ろすローマ数字に冷たい雨が激しく叩きつけている。',
      zh: '巍峨的巨大彩色玻璃钟盘，暴风雨正疯狂击打着镶嵌在城市上空的古老罗马数字。',
      ko: '거대한 원형 스테인드글라스 시계판. 제7구역 상공에서 로마 숫자를 때리는 거친 비바람이 내다보입니다.',
      es: 'El monumental reloj de vidriera redonda, con la lluvia golpeando los números romanos sobre los tejados del Distrito 7.',
      fr: 'L\'immense horloge en vitrail rond, où la pluie s\'abat contre les chiffres romains dominant le 7e District.',
      de: 'Das monumentale runde Buntglaszifferblatt, an dessen römische Ziffern der Regen hoch über Distrikt 7 prallt.',
      ru: 'Монументальный витражный циферблат. Капли дождя яростно хлещут по римским цифрам высоко над крышами Сектора 7.',
      it: 'Il monumentale orologio di vetro istoriato, con la pioggia battente sui numeri romani che dominano la città.',
      pt: 'O monumental relógio de vitral redondo, com a chuva fustigando os números romanos no alto do Distrito 7.',
      ar: 'قرص الساعة الزجاجي التذكاري الضخم، تصفعه أمطار الليل الغزيرة فوق الأرقام الرومانية المطلة على القطاع 7.'
    }
  },
  poi_graves: {
    title: {
      id: 'Inspektur Graves (Mitra Sektor 4)',
      en: 'Inspector Graves (Precinct 4 Partner)',
      ja: 'グレイヴス警部（第4分署相棒）',
      zh: '格雷夫斯警探（第四警区分署搭档）',
      ko: '그레이브스 형사 (제4관할서 파트너)',
      es: 'Inspector Graves (Compañero del Precinto 4)',
      fr: 'Inspecteur Graves (Partenaire du 4e District)',
      de: 'Inspektor Graves (Partner aus Revier 4)',
      ru: 'Инспектор Грейвс (Напарник из 4-го участка)',
      it: 'Ispettore Graves (Partner del Distretto 4)',
      pt: 'Inspetor Graves (Parceiro do Distrito 4)',
      ar: 'المفتش غريفز (شريك التحقيق بالدائرة 4)'
    },
    description: {
      id: 'Rekan seniormu berlutut memegang senter, mencatat bukti forensik dengan gelisah sambil menggerutu di tengah dinginnya malam.',
      en: 'Your cynical partner kneeling with a flashlight, taking forensic notes and grumbling in the freezing drizzle.',
      ja: '懐中電灯を手に膝をつく相棒刑事。冷たい雨の中で愚痴をこぼしながら現場の検分メモを取っている。',
      zh: '你的资深搭档正手持手电筒蹲在死者旁记录现场，在刺骨寒雨中烦躁地吐着烟圈。',
      ko: '손전등을 들고 웅크린 파트너 형사. 차가운 빗속에서 불평하며 현장 메모를 작성하고 있습니다.',
      es: 'Tu compañero arrodillado con una linterna, tomando notas forenses y refunfuñando bajo la lluvia gélida.',
      fr: 'Votre coéquipier agenouillé avec une torche, consignant les indices tout en pestant contre la pluie glaciale.',
      de: 'Ihr mürrischer Partner kniet mit der Taschenlampe nieder und kritzelt Notizen im eisigen Nieselregen.',
      ru: 'Ваш напарник с фонарем осматривает пол, делая пометки в протоколе и раздраженно ворча под дождем.',
      it: 'Il tuo collega inginocchiato con una torcia, annotando rilievi e borbottando sotto la pioggia sferzante.',
      pt: 'Seu parceiro ajoelhado com uma lanterna, anotando observações e resmungando na garoa congelante.',
      ar: 'شريكك المخضرم جاثٍ بمصباحه اليدوي، يدون ملاحظات المعاينة ويتذمر تحت قطرات البرد القارس.'
    }
  },
  poi_madame: {
    title: {
      id: 'Nyonya Vivienne Vance (Janda Berkerudung Hitam)',
      en: 'Madame Vivienne Vance (The Shadowed Widow)',
      ja: 'ヴィヴィアン・ヴァンス夫人（喪服の未亡人）',
      zh: '薇薇安·梵斯夫人（黑纱下的未亡人）',
      ko: '비비안 밴스 부인 (검은 면사의 미망인)',
      es: 'Madame Vivienne Vance (La Viuda Sombría)',
      fr: 'Madame Vivienne Vance (La Veuve Voilée)',
      de: 'Madame Vivienne Vance (Die Verhüllte Witwe)',
      ru: 'Мадам Вивьен Вэнс (Овдовевшая за черной вуалью)',
      it: 'Madame Vivienne Vance (La Vedova Velata)',
      pt: 'Madame Vivienne Vance (A Viúva Enlutada)',
      ar: 'السيدة فيفيان فانس (الأرملة ذات الوشاح الأسود)'
    },
    description: {
      id: 'Berdiri mematung di dekat lentera anjungan atas. Kerudung sutra hitamnya berkibar pelan diterpa angin menara.',
      en: 'Standing motionless by the upper lantern gantry, her dark mourning veil fluttering gently in the draft.',
      ja: '上層のランタン通路に佇む未亡人。冷たい風に黒い喪服のベールが微かに揺れている。',
      zh: '伫立在上层铁梯走廊的幽光中，黑色的丝质丧服面纱在回旋的寒风中静静飘动。',
      ko: '상층 등불 난간 곁에 미동 없이 선 여인. 검은 상복 면사가 차가운 바람에 흩날립니다.',
      es: 'Inmóvil junto a la galería de la linterna superior, su velo de luto ondeando suavemente en la corriente.',
      fr: 'Debout, immobile près de la rambarde de la lanterne, son voile de deuil noir flottant au vent glacial.',
      de: 'Reglos an der oberen Laternenbrücke stehend, ihr dunkler Trauerschleier weht im kalten Zugluftstrom.',
      ru: 'Неподвижно стоит на верхней галерее фонаря; ее темная траурная вуаль слегка колышется от сквозняка.',
      it: 'Ferma immobile accanto alla ringhiera superiore, con il velo nero da lutto che ondeggia nel vento.',
      pt: 'De pé, imóvel junto à galeria superior, seu véu negro de luto ondulando suavemente no vento.',
      ar: 'تقف بلا حراك عند منصة الفانوس العلوية، ووشاح حدادها الأسود يرفرف بهدوء مع تيارات الهواء الباردة.'
    }
  },
  poi_floorboard: {
    title: {
      id: 'Brankas Rahasia di Balik Papan Lantai',
      en: 'Concealed Floorboard Safe',
      ja: '床下に隠された秘密金庫',
      zh: '地板暗格下的机械保险箱',
      ko: '바닥 판자 아래 숨겨진 비밀 금고',
      es: 'Caja Fuerte Oculta bajo el Suelo',
      fr: 'Coffre Secret sous le Plancher',
      de: 'Verborgenes Bodenschließfach',
      ru: 'Потайной сейф под половицами',
      it: 'Cassaforte Nascosta sotto il Pavimento',
      pt: 'Cofre Oculto sob o Assoalho',
      ar: 'خزنة سرية مطمورة تحت ألواح الأرضية'
    },
    description: {
      id: 'Papan lantai yang sedikit longgar di balik kain pelumas mesin. Kunci kombinasi tiga putaran terpasang kuat.',
      en: 'A loose plank hidden beneath machine grease rags. Secured with a heavy alchemical three-tumbler dial.',
      ja: '油まみれのウエスに隠された緩んだ床板。三連ダイヤル式の重厚な錬金術ロックで施錠されている。',
      zh: '遮掩在油污抹布下的一处松动木板，暗格内嵌有一口坚固的三位炼金转盘保险箱。',
      ko: '기계 기름걸레 아래 숨겨진 헐거운 바닥 판자. 3중 회전식 연금술 다이얼 자물쇠로 굳게 잠겨 있습니다.',
      es: 'Una tabla suelta oculta bajo trapos con grasa. Protegida por un dial alquímico de tres combinaciones.',
      fr: 'Une latte de plancher dissimulée sous des chiffons gras. Verrouillée par un cadran alchimique à trois crans.',
      de: 'Eine lose Diele unter öligen Putzlappen. Gesichert mit einem massiven alchemistischen Dreiradschloss.',
      ru: 'Шаткая половица под замасленным тряпьем. Заперта тяжелым трехдисковым алхимическим замком.',
      it: 'Un\'asse traballante coperta da stracci unti. Chiusa da una pesante combinazione alchemica a tre ghiere.',
      pt: 'Uma tábua solta oculta sob panos engraxados. Protegida por um pesado disco alquímico de três cilindros.',
      ar: 'لوح خشبي متخلخل تحت خرق شحم الماكينات، موصد بخزنة ثقيلة ذات قرص خيميائي ثلاثي التروس.'
    }
  ,
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
  }
  }
};

const GAMEOVER_I18N = {
  physical: {
    title: {
      id: 'KERUNTUHAN FISIK & SERANGAN JANTUNG',
      en: 'PHYSICAL COLLAPSE & CARDIAC ARREST',
      ja: '肉体的崩壊と心臓麻痺',
      zh: '肉体崩溃与急性心搏骤停',
      ko: '육체적 붕괴 및 심장마비',
      es: 'COLAPSO FÍSICO Y PARO CARDÍACO',
      fr: 'EFFONDREMENT PHYSIQUE ET ARRÊT CARDIAQUE',
      de: 'PHYSISCHER ZUSAMMENBRUCH UND HERZSTILLSTAND',
      ru: 'ФИЗИЧЕСКИЙ КОЛЛАПС И ОСТАНОВКА СЕРДЦА',
      it: 'COLLASSO FISICO E ARRESTO CARDIACO',
      pt: 'COLAPSO FÍSICO E PARADA CARDÍACA',
      ar: 'انهيار جسدي وتوقف عضلة القلب'
    },
    description: {
      id: 'Jantungmu yang lelah akhirnya menyerah. Vena di pelipismu berdenyut perih saat lantai menara jam yang dingin menyambut wajahmu. Roda gigi raksasa di atas terus berputar tanpa belas kasihan. Penyelidikan ini terkubur bersamamu.',
      en: 'Your strained heart finally gives out. Cold rain spatters against your face as your body collapses onto the clocktower floorboards. The brass gears churn unfeelingly overhead. The inquiry dies with you.',
      ja: '酷使された心臓がついに停止する。時計塔の冷たい床板に崩れ落ちるあなたの顔を冷雨が叩く。頭上で巨大な真鍮の歯車が無慈悲に回り続ける中、事件の真相はあなたと共に闇へと葬られた。',
      zh: '重压之下的衰竭心脏彻底停止跳动。冰冷的寒雨拍打在你的脸颊上，身躯沉重地倒在钟楼湿滑的木板上。头顶上巨大的青铜齿轮依旧冷酷轰鸣，这桩惊天悬案随你一同长眠。',
      ko: '한계에 달했던 심장이 결국 멎어버립니다. 차가운 빗물이 얼굴을 때리는 가운데 당신의 몸은 시계탑 바닥으로 붕괴합니다. 머리 위의 황동 톱니바퀴는 무자비하게 돌아가고, 진실은 당신과 함께 매장됩니다.',
      es: 'Tu corazón agotado finalmente se rinde. La lluvia fría golpea tu rostro mientras tu cuerpo colapsa sobre las tablas. Los engranajes de latón siguen girando sin piedad. La investigación muere contigo.',
      fr: 'Votre cœur à bout de souffle finit par céder. La pluie glaciale cingle votre visage tandis que votre corps s\'effondre sur le plancher. Les engrenages continuent de tourner, indifférents. L\'enquête meurt avec vous.',
      de: 'Ihr überlastetes Herz gibt endgültig auf. Kaltes Regenwasser klatscht auf Ihr Gesicht, als Sie auf die Dielen stürzen. Die Messingräder mahlen gefühllos weiter. Die Ermittlung stirbt mit Ihnen.',
      ru: 'Истерзанное сердце замирает. Холодные капли дождя хлещут по лицу, когда вы падаете на дощатый пол башни. Латунные шестерни безучастно продолжают ход. Дело похоронено вместе с вами.',
      it: 'Il tuo cuore affaticato infine cede. La pioggia gelida sferza il tuo viso mentre crolli sulle assi della torre. Gli ingranaggi continuano a girare incuranti. L\'indagine sprofonda con te.',
      pt: 'Seu coração exausto finalmente cede. A chuva fria fustiga seu rosto enquanto seu corpo colapsa no assoalho da torre. As engrenagens continuam girando implacáveis. A investigação morre com você.',
      ar: 'قلبك المنهك يستسلم في النهاية. تصفع قطرات المطر وجهك وأنت تهوي على ألواح برج الساعة الباردة. التروس النحاسية العملاقة تدور بلا رحمة فوقك، وتدفن الحقيقة معك إلى الأبد.'
    }
  },
  psychological: {
    title: {
      id: 'KEGILAAN TOTAL & AMNESIA KEJIWAAN',
      en: 'EXISTENTIAL PSYCHOSIS & HYSTERIA',
      ja: '実存的恐慌と完全なる精神崩壊',
      zh: '存在主义狂乱与彻底的精神崩溃',
      ko: '실존적 광기와 정신적 붕괴',
      es: 'PSICOSIS EXISTENCIAL Y COLAPSO MENTAL',
      fr: 'PSYCHOSE EXISTENTIELLE ET EFFONDREMENT',
      de: 'EXISTENZIELLE PSYCHOSE UND ZUSAMMENBRUCH',
      ru: 'ЭКЗИСТЕНЦИАЛЬНЫЙ ПСИХОЗ И ПОМЕШАТЕЛЬСТВО',
      it: 'PSICOSI ESISTENZIALE E CROLLO MENTALE',
      pt: 'PSICOSE EXISTENCIAL E COLAPSO MENTAL',
      ar: 'ذهان وجودي حاد وانهيار نفسي تام'
    },
    description: {
      id: 'Suara-suara di kepalamu menjerit serentak, menenggelamkan sisa logikamu dalam keputusasaan yang pekat. Kamu melempar lencanamu ke dalam jurang mesin dan tertawa lepas dalam hujan. Kamu bukan lagi seorang detektif.',
      en: 'The chorus of intrusive inner voices shrieks in deafening unison, drowning your last shred of reason in delirium. You fling your badge into the churn of gears and wander aimlessly into the rain.',
      ja: '脳内の内なる声が一斉に悲鳴を上げ、理性の最後の一片を狂気の渦へと沈める。あなたは警察バッジを歯車の狭間へと投げ捨て、冷たい雨の中へと高笑いしながら彷徨い去った。',
      zh: '潜意识深处的无数臆语尖叫轰鸣，将你仅存的一丝理性彻底淹没在可悲的谵妄中。你狂笑着将警徽掷入轰鸣的齿轮裂隙，漫无目的地遁入风雨之中。',
      ko: '내면의 목소리들이 일제히 귀청이 찢어지도록 비명을 지르며, 마지막 남은 이성의 끈을 광기의 심연으로 밀어 넣습니다. 당신은 경찰 배지를 톱니바퀴 틈새로 던져버리고 빗속으로 실성한 듯 사라집니다.',
      es: 'El coro de voces interiores grita al unísono, ahogando tu último ápice de razón en el delirio. Arrojas tu placa a los engranajes y te alejas riendo bajo la lluvia.',
      fr: 'Le chœur de vos voix intérieures hurle à l\'unisson, noyant votre dernier souffle de raison dans le délire. Vous jetez votre insigne dans les rouages et vous perdez sous la pluie.',
      de: 'Der Chor Ihrer inneren Stimmen kreischt ohrenbetäubend auf und ertränkt jeden Rest von Vernunft im Delirium. Sie schleudern Ihre Marke ins Getriebe und taumeln lachend in den Regen.',
      ru: 'Хор внутренних голосов взрывается оглушительным визгом, топя последние крупицы разума в безумии. Вы швыряете свой жетон в шестерни и бесцельно уходите в дождь.',
      it: 'Il coro di voci interiori esplode in un urlo assordante, annegando l\'ultimo barlume di ragione nel delirio. Getti il distintivo tra gli ingranaggi e svanisci ridendo nella pioggia.',
      pt: 'O coro de vozes interiores berra em uníssono, afogando sua última réstia de sanidade no delírio. Você atira seu distintivo nas engrenagens e caminha sem rumo na chuva.',
      ar: 'تتعالى أصواتك الباطنية في صرخة مدوية تصم الآذان، مغرقةً آخر ذرة من عقلك في دوامة الهذيان. تقذف شارتك بين تروس الماكينات وتمضي ضاحكًا بهستيريا تحت وطأة المطر.'
    }
  },
  arrest: {
    title: {
      id: 'PENANGKAPAN & PEMECATAN MEMALUKAN',
      en: 'DISGRACED ARREST & IMMEDIATE DISMISSAL',
      ja: '不名誉な逮捕と即時罷免',
      zh: '当场逮捕与革职查办',
      ko: '불명예 체포 및 즉각 파면',
      es: 'ARRESTO VERGONZOSO Y DESTITUCIÓN INMEDIATA',
      fr: 'ARRESTATION DÉSHONORANTE ET DESTITUTION',
      de: 'SCHMÄHLICHE VERHAFTUNG UND SUSPENDIERUNG',
      ru: 'ПОЗОРНЫЙ АРЕСТ И НЕМЕДЛЕННОЕ УВОЛЬНЕНИЕ',
      it: 'ARRESTO IGNOMINIOSO E RIMOZIONE IMMEDIATA',
      pt: 'PRISÃO DESONROSA E DEMISSÃO IMEDIATA',
      ar: 'اعتقال مخزٍ وعزل فوري من الخدمة'
    },
    description: {
      id: 'Menuduh tanpa bukti fisik adalah bunuh diri bagi seorang perwira hukum. Inspektur Graves menodongkan pistol dinasnya dan memborgolmu di depan Madame Vance. Kariermu berakhir dalam aib.',
      en: 'Accusing a high-profile citizen without material proof was career suicide. Inspector Graves draws his revolver, snaps cold manacles around your wrists, and marches you down in handcuffs.',
      ja: '物証なきまま有力者を告発したのは致命的な過ちだった。グレイヴス警部は拳銃を抜き、未亡人の前であなたを手錠で拘束した。あなたの刑事としての経歴は汚名と共に終わった。',
      zh: '在缺乏确凿物证的情况下鲁莽指控显赫市民无异于自取灭亡。格雷夫斯警探拔出警用左轮手枪，当众将你铐上带走，你的探长生涯在耻辱中彻底断送。',
      ko: '물증 없는 섣부른 추궁은 치명적인 자멸이었습니다. 그레이브스 형사는 권총을 겨누며 비비안 부인 앞에서 당신에게 수갑을 채웠고, 당신의 수사관 경력은 치욕 속에 끝장났습니다.',
      es: 'Acusar a una ciudadana influyente sin pruebas fue un suicidio profesional. El inspector Graves saca su revólver y te pone las esposas en el acto.',
      fr: 'Accuser sans preuve matérielle était un suicide professionnel. L\'inspecteur Graves braque son revolver et vous passe les fers sur-le-champ.',
      de: 'Ohne handfeste Beweise anzuklagen war fataler Leichtsinn. Inspektor Graves zieht die Waffe, legt Ihnen Handschellen an und führt Sie in Schande ab.',
      ru: 'Обвинение без улик оказалось фатальным. Инспектор Грейвс взводит курок револьвера и защелкивает на ваших запястьях наручники. Ваша карьера растоптана.',
      it: 'Accusare senza prove è stato un suicidio professionale. L\'ispettore Graves estrae il revolver e ti stringe le manette ai polsi seduta stante.',
      pt: 'Acusar sem provas materiais foi um suicídio profissional. O inspetor Graves saca o revólver e coloca algemas em você na mesma hora.',
      ar: 'توجيه الاتهام دون أدلة ملموسة كان انتحارًا مهنيًا صريحًا. سحب المفتش غريفز مسدسه وكبل معصميك بالأصفاد مقتادًا إياك في خزي وعار.'
    }
  }
};

// Clues Translations
const CLUES_I18N = (typeof CLUES_I18N_FULL !== 'undefined') ? CLUES_I18N_FULL : {};

// Dialogue Nodes Localizations
const DIALOGUE_I18N = (typeof DIALOGUE_I18N_FULL !== 'undefined') ? DIALOGUE_I18N_FULL : {};

// Helper to get fully localized dialogue node
function getLocalizedDialogueNode(nodeId, lang = 'en', baseNode) {
  if (!baseNode) return null;
  const currentLang = UI_TRANSLATIONS[lang] ? lang : 'en';

  const node = {
    ...baseNode,
    voices: baseNode.voices ? baseNode.voices.map(v => ({ ...v })) : [],
    options: baseNode.options ? baseNode.options.map(o => ({ ...o })) : []
  };

  const nodeTrans = DIALOGUE_I18N[nodeId];
  if (nodeTrans) {
    if (nodeTrans.speaker) {
      node.speaker = nodeTrans.speaker[currentLang] || nodeTrans.speaker['en'] || nodeTrans.speaker['id'] || baseNode.speaker;
    }
    if (nodeTrans.text) {
      node.text = nodeTrans.text[currentLang] || nodeTrans.text['en'] || nodeTrans.text['id'] || baseNode.text;
    }
    if (nodeTrans.voices && Array.isArray(nodeTrans.voices)) {
      nodeTrans.voices.forEach((vTrans, idx) => {
        if (node.voices[idx]) {
          if (vTrans.voice) node.voices[idx].voice = vTrans.voice[currentLang] || vTrans.voice['en'] || vTrans.voice['id'] || node.voices[idx].voice;
          if (vTrans.badge) node.voices[idx].badge = vTrans.badge[currentLang] || vTrans.badge['en'] || vTrans.badge['id'] || node.voices[idx].badge;
          if (vTrans.text) node.voices[idx].text = vTrans.text[currentLang] || vTrans.text['en'] || vTrans.text['id'] || node.voices[idx].text;
        }
      });
    }
    if (nodeTrans.options && Array.isArray(nodeTrans.options)) {
      node.options.forEach((opt, idx) => {
        let oTrans = null;
        if (opt.id) {
          oTrans = nodeTrans.options.find(o => o && o.id === opt.id);
        }
        if (!oTrans) {
          oTrans = nodeTrans.options[idx];
        }
        if (oTrans) {
          const transText = oTrans[currentLang] || oTrans['en'] || oTrans['id'];
          if (transText) {
            opt.text = transText;
          }
        }
      });
    }
  }

  return node;
}

function tClue(clueId, field = 'title', lang = 'en') {
  const clue = CLUES_I18N[clueId];
  if (!clue) return null;
  const currentLang = clue[field] && clue[field][lang] ? lang : 'en';
  return clue[field][currentLang] || clue[field]['en'] || clue[field]['id'] || '';
}

function tGameOver(type, field = 'title', lang = 'en') {
  const g = GAMEOVER_I18N[type] || GAMEOVER_I18N['physical'];
  const currentLang = g[field] && g[field][lang] ? lang : 'en';
  return g[field][currentLang] || g[field]['en'] || g[field]['id'] || '';
}

// Translation lookup helper
function t(key, lang = 'en') {
  const currentLang = UI_TRANSLATIONS[lang] ? lang : 'en';
  if (UI_TRANSLATIONS[currentLang] && UI_TRANSLATIONS[currentLang][key]) {
    return UI_TRANSLATIONS[currentLang][key];
  }
  if (UI_TRANSLATIONS['en'] && UI_TRANSLATIONS['en'][key]) {
    return UI_TRANSLATIONS['en'][key];
  }
  if (UI_TRANSLATIONS['id'] && UI_TRANSLATIONS['id'][key]) {
    return UI_TRANSLATIONS['id'][key];
  }
  return key;
}

function tItem(itemId, field = 'name', lang = 'en') {
  const item = ITEMS_I18N[itemId];
  if (!item) return null;
  const currentLang = item[field] && item[field][lang] ? lang : 'en';
  return item[field][currentLang] || item[field]['en'] || item[field]['id'] || '';
}

function tPoi(poiId, field = 'title', lang = 'en') {
  const poi = (typeof NEW_POIS_I18N !== 'undefined' && NEW_POIS_I18N[poiId]) || POI_I18N[poiId];
  if (!poi) return null;
  const currentLang = poi[field] && poi[field][lang] ? lang : 'en';
  return poi[field][currentLang] || poi[field]['en'] || poi[field]['id'] || '';
}

// --------------------------------------------------------------------------
// Character Creator Vices Localization (5 Native Languages)
// --------------------------------------------------------------------------
const VICES_I18N = {
  smoker: {
    title: {
      en: '🚬 Chain-Smoker of Astra Red',
      id: '🚬 Perokok Berat Astra Merah',
      zh: '🚬 阿斯特拉红烟重度烟瘾',
      ja: '🚬 アストラ・レッドのヘビースモーカー',
      ko: '🚬 아스트라 레드 골초'
    },
    desc: {
      en: 'Perception +1, but chronic cough lowers Endurance maximum by 1.',
      id: 'Persepsi +1, namun batuk menahun mengurangi batas maksimal Daya Tahan sebesar 1.',
      zh: '感知+1，但慢性剧烈咳嗽导致体能上限减少1。',
      ja: '知覚+1、だが慢性的な咳き込みにより耐久力上限が1低下。',
      ko: '지각 +1, 하지만 만성 기침으로 인해 최대 체력이 1 감소합니다.'
    }
  },
  laudanum: {
    title: {
      en: '🧪 Tincture of Laudanum Addict',
      id: '🧪 Ketergantungan Tinktur Laudanum',
      zh: '🧪 阿片酊化学成瘾',
      ja: '🧪 医療用アヘンチンキ中毒',
      ko: '🧪 라우다넘 팅크제 중독'
    },
    desc: {
      en: 'Esoterica +2, but sudden withdrawals inflict periodic Logic penalties.',
      id: 'Esoterika +2, namun gejala sakau mendadak menimbulkan penalti Logika berkala.',
      zh: '秘教+2，但突发的戒断反应会带来阶段性逻辑惩罚。',
      ja: '秘教+2、だが禁断症状による定期的な論理ペナルティを受ける。',
      ko: '비전 +2, 하지만 금단 현상 발생 시 주기적인 논리 페널티를 받습니다.'
    }
  },
  insomniac: {
    title: {
      en: '🕯️ Insomniac Philosopher',
      id: '🕯️ Filsuf Pengidap Insomnia',
      zh: '🕯️ 失眠梦魇哲学家',
      ja: '🕯️ 不眠症の思索家',
      ko: '🕯️ 불면증에 시달리는 철학자'
    },
    desc: {
      en: 'Conceptualization +2, but sleep deprivation heightens susceptibility to panic.',
      id: 'Konseptualisasi +2, namun kurang tidur kronis memperparah kerentanan terhadap panik.',
      zh: '概念化+2，但长期严重睡眠不足大幅加剧恐慌脆弱性。',
      ja: '概念化+2、だが慢性的睡眠不足によりパニック耐性が低下。',
      ko: '개념화 +2, 하지만 수면 부족으로 인해 정신적 패닉에 취약해집니다.'
    }
  },
  klepto: {
    title: {
      en: '🗝️ Compulsive Relic Hoarder',
      id: '🗝️ Pengumpul Relik Kompulsif',
      zh: '🗝️ 强迫症古物囤积癖',
      ja: '🗝️ 強迫的遺物蒐集癖',
      ko: '🗝️ 강박적 유물 수집벽'
    },
    desc: {
      en: 'Interfacing +2, but precinct colleagues view you with suspicion.',
      id: 'Penyelarasan Mesin +2, namun rekan detektif memandangmu dengan curiga.',
      zh: '机构连动+2，但警区同僚始终以怀疑甚至提防的目光注视着你。',
      ja: '機構連動+2、だが分署の同僚たちから常に不審の目で見られる。',
      ko: '기계 조율 +2, 하지만 관할서 동료들이 당신을 의심스럽게 바라봅니다.'
    }
  }
};

function tVice(viceKey, field = 'title', lang = 'en') {
  const v = VICES_I18N[viceKey];
  if (!v) return '';
  const currentLang = v[field] && v[field][lang] ? lang : 'en';
  return v[field][currentLang] || v[field]['en'] || v[field]['id'] || '';
}

// --------------------------------------------------------------------------
// Thought Cabinet Database Localization (5 Native Languages)
// --------------------------------------------------------------------------
const THOUGHTS_I18N = {
  clockmakers_paradox: {
    name: {
      en: "The Clockmaker's Paradox",
      id: "Paradoks Sang Pembuat Jam",
      zh: "钟表宗师的逆时悖论",
      ja: "時計師の逆理",
      ko: "시계 장인의 역설"
    },
    category: {
      en: 'Dialectic Horology',
      id: 'Dialektika Horologis',
      zh: '辩证钟表学',
      ja: '弁証法的時計学',
      ko: '변증법적 시계학'
    },
    flavor: {
      en: 'If Aurelia Vance designed pendulum escapements that measured moments before they physically transpired, did she build her own execution mechanism?',
      id: 'Jika Aurelia Vance merancang mekanisme pendulum yang mengukur momen sebelum terjadi, apakah ia merancang mesin eksekusinya sendiri?',
      zh: '如果奥蕾莉亚·梵斯所设计的擒纵机构能够在物理时刻降临前便预先记录，那她是否亲手铸造了自己的死刑机械？',
      ja: 'もしオレリア・ヴァンスが物理的に刻まれる前の瞬間を測定する脱進機を設計していたなら、彼女は自らの処刑装置を組み立てたのだろうか？',
      ko: '만약 오렐리아 밴스가 사건이 물리적으로 발생하기도 전에 그 순간을 측정하는 진자 탈착기를 설계했다면, 그녀는 자신의 처형 기계를 직접 만든 것인가?'
    },
    explanation: {
      en: 'You find yourself staring at rotating brass gears until your retinas imprint with Roman numerals. Time is not a linear river; it is a coiled torsion spring waiting to snap backward.',
      id: 'Kau menatap roda gigi kuningan hingga retinamu tercap angka Romawi. Waktu bukan aliran sungai linier; waktu adalah pegas torsi yang siap tersentak ke belakang.',
      zh: '你凝视着轰鸣旋转的黄铜齿轮，直到罗马数字灼刻在你的视网膜上。时间绝非奔涌的单向长河；它是一根紧绷的扭力弹簧，随时可能疯狂倒卷。',
      ja: '網膜にローマ数字が焼き付くまで、回転する真鍮の歯車を見つめ続ける。時間は直線的な川ではない。いつでも激しく逆回転しうる圧縮された捩りバネなのだ。',
      ko: '망막에 로마 숫자가 각인될 때까지 회전하는 황동 톱니를 응시합니다. 시간은 선형적인 강물이 아닙니다. 언제든 거꾸로 튕겨 나갈 준비가 된 비틀림 용수철입니다.'
    },
    tempDrawback: {
      en: 'Logic -1 (Migraine from impossible gear ratios)',
      id: 'Logika -1 (Migrain akibat rasio roda gigi mustahil)',
      zh: '逻辑 -1 (解析荒谬齿轮比引发的剧烈偏头痛)',
      ja: '論理 -1 (不可能な歯車比による激しい偏頭痛)',
      ko: '논리 -1 (불가능한 기어비로 인한 극심한 편두통)'
    },
    solution: {
      en: 'Time is malleable when measured by murder. You perceive mechanical flaws in suspects testimonies before they even finish speaking.',
      id: 'Waktu menjadi lentur saat diukur melalui pembunuhan. Kau mengenali cacat logis dalam kesaksian tersangka sebelum mereka selesai bicara.',
      zh: '以谋杀为刻度时，时间展现出奇异的延展性。在嫌疑人话音未落之前，你已洞悉其供词中的逻辑致命断裂。',
      ja: '殺人によって測定される時、時間は歪み始める。容疑者が言葉を結ぶ前に、その証言に潜む機械的欠陥を看破できる。',
      ko: '살인으로 측정될 때 시간은 가변적이 됩니다. 용의자가 말을 끝마치기도 전에 그 증언의 기계적 모순을 간파합니다.'
    }
  },
  amnesia_as_defense: {
    name: {
      en: 'Amnesia as Self-Defense',
      id: 'Amnesia sebagai Pertahanan Diri',
      zh: '作为自卫壁垒的失忆',
      ja: '自己防衛としての記憶喪失',
      ko: '자기 방어로서의 기억상실'
    },
    category: {
      en: 'Psychological Splinter',
      id: 'Serpihan Kejiwaan',
      zh: '心理防御碎片',
      ja: '精神的破片',
      ko: '심리적 파편'
    },
    flavor: {
      en: "Why did you drink yourself into oblivion last night? Perhaps your amnesia wasn't an accident, but an act of mercy by your subconscious.",
      id: 'Mengapa kau menenggelamkan diri dalam alkohol semalam? Mungkin amnesiamu bukan ketidaksengajaan, melainkan tindakan belas kasih dari alam bawah sadarmu.',
      zh: '昨夜你为何狂饮至神智全无？或许突如其来的失忆并非酒醉的意外，而是潜意识为拯救理智所施舍的慈悲。',
      ja: '昨夜、なぜ意識を失うまで酒を呷ったのか？その記憶喪失は過失ではなく、潜在意識による慈悲深き自衛だったのではないか。',
      ko: '어젯밤 당신은 왜 인사불성이 되도록 술을 마셨을까요? 기억상실은 실수가 아니라, 잠재의식이 베푼 자비였을지도 모릅니다.'
    },
    explanation: {
      en: 'The past is a carnivorous beast in the dark. By forgetting your own name and yesterday\'s horrors, you rendered the predator toothless.',
      id: 'Masa lalu adalah binatang buas di kegelapan. Dengan melupakan namamu dan kengerian kemarin, kau mencabut taring pemangsa itu.',
      zh: '过去是一头潜伏在幽暗深处的食肉巨兽。遗忘自己的姓名与昨日的惨剧，正是你卸下巨兽利齿的唯一法门。',
      ja: '過去とは暗闇に潜む肉食獣だ。己の名と昨日の惨劇を忘却することで、その牙を根こそぎ奪い去ったのだ。',
      ko: '과거는 어둠 속의 육식수입니다. 이름과 어제의 공포를 망각함으로써 포식자의 이빨을 뽑아버린 것입니다.'
    },
    tempDrawback: {
      en: 'Morale -1 (Empty mirrors produce cold vertigo)',
      id: 'Kewarasan -1 (Cermin kosong memicu vertigo dingin)',
      zh: '理智 -1 (凝视陌生空洞的镜影引发冰冷晕眩)',
      ja: '精神力 -1 (空虚な鏡が冷酷な眩暈を引き起こす)',
      ko: '사기 -1 (텅 빈 거울이 차가운 현기증을 유발함)'
    },
    solution: {
      en: 'You accept the blank slate. What you forgot cannot be used to break your spirit.',
      id: 'Kau menerima lembaran kosong ini. Hal yang terlupakan tak lagi dapat meremukkan jiwamu.',
      zh: '你欣然接纳了这张空白画卷。已被遗忘的深渊之物，便再也无法击垮你坚硬如铁的意志。',
      ja: '白紙の精神を受け入れる。忘却した過去は、もはやあなたの魂を打ち砕く刃にはなり得ない。',
      ko: '백지상태를 온전히 수용합니다. 잊어버린 과거는 더 이상 당신의 영혼을 꺾을 수 없습니다.'
    }
  },
  metaphysics_of_rain: {
    name: {
      en: 'Metaphysics of Cold Rain',
      id: 'Metafisika Hujan Dingin',
      zh: '寒雨的形而上学',
      ja: '冷雨の形而上学',
      ko: '차가운 비의 형이상학'
    },
    category: {
      en: 'Atmospheric Melancholy',
      id: 'Melankolia Atmosferik',
      zh: '氛围忧郁',
      ja: '大気的憂鬱',
      ko: '대기적 우울'
    },
    flavor: {
      en: 'The rain drumming on the clocktower roof sounds identical to a Morse code transmission from an extinct civilization.',
      id: 'Hujan yang memukuli atap seng menara jam terdengar persis seperti transmisi kode Morse dari peradaban yang telah punah.',
      zh: '雨点击打在钟楼锌铁屋顶上的闷响，听上去宛如某个早已覆灭的失落文明发来的莫尔斯电码。',
      ja: '時計塔の屋根を叩く雨音は、滅亡した古代文明からのモールス信号と完全に一致している。',
      ko: '시계탑 지붕을 두드리는 빗소리는 멸망한 문명이 보내는 모스 부호 통신과 똑같이 들립니다.'
    },
    explanation: {
      en: 'Water carries electrical charges, industrial soot, and whispered regrets. If you listen closely, the storm tells you where the killer stepped.',
      id: 'Air membawa muatan listrik, jelaga pabrik, dan bisikan penyesalan. Jika kau mendengarkan seksama, badai memberitahumu ke mana pembunuh melangkah.',
      zh: '雨水承载着静电荷、工业烟尘与七百万码头工人的叹息。只要静心凝神，风暴自会低吟凶徒潜逃的足迹。',
      ja: '雨水は電荷、煤煙、労働者たちの悔恨を運ぶ。耳を澄ませば、嵐そのものが犯人の足取りを囁いてくれる。',
      ko: '빗물은 전하, 매연, 부두 노동자들의 후회를 실어 나릅니다. 귀를 기울이면 폭풍이 살인자의 발자취를 알려줍니다.'
    },
    tempDrawback: {
      en: 'Conceptualization -1 (Distracted by dripping eaves)',
      id: 'Konseptualisasi -1 (Terganggu oleh tetesan air atap)',
      zh: '概念化 -1 (屋檐连绵的水滴声极度分散思绪)',
      ja: '概念化 -1 (滴る雨垂れの音に思考を乱される)',
      ko: '개념화 -1 (처마 밑 물방울 소리에 정신이 분산됨)'
    },
    solution: {
      en: 'The atmospheric pressure sharpens your intuitive sixth sense. The city speaks directly into your ear canal.',
      id: 'Tekanan atmosferik menajamkan indra keenammu. Kota ini berbisik langsung ke saluran telingamu.',
      zh: '压抑的气压反常地淬炼了你的第六感直觉。整座工业都市的阴影正在贴着你的耳廓低语。',
      ja: '気圧の変化が直観の第六感を研ぎ澄ます。街そのものが、あなたの耳朶へ直接語りかけてくる。',
      ko: '대기압이 육감을 날카롭게 벼려냅니다. 도시 자체가 당신의 귓가에 직접 속삭입니다.'
    }
  },
  sovereign_bureaucrat: {
    name: {
      en: 'The Sovereign Bureaucrat',
      id: 'Birokrat Berdaulat',
      zh: '至高无上的官僚专制',
      ja: '絶対的官僚主義',
      ko: '절대적 관료주의'
    },
    category: {
      en: 'Civic Authority',
      id: 'Otoritas Sipil',
      zh: '公权权威',
      ja: '市民権力',
      ko: '시민 권위'
    },
    flavor: {
      en: 'The chiefs think power resides in bayonets. But real power resides in the rubber stamp of an inspector who simply refuses to sign.',
      id: 'Para petinggi mengira kekuasaan ada pada bayonet. Namun kekuasaan sejati ada pada stempel inspektur yang menolak bertanda tangan.',
      zh: '高层误以为强权来自刺刀。然而至高权力实则蕴含在一位冷酷探长坚决拒签尸检移交文件的印章中。',
      ja: '上層部は権力が銃剣に宿ると信じている。だが真の権力とは、移送書類への署名を冷淡に拒否する捜査官のゴム印にある。',
      ko: '서장들은 권력이 총검에서 나온다고 믿습니다. 하지만 진정한 권력은 서명을 단호히 거부하는 검시관의 고무 직인에 있습니다.'
    },
    explanation: {
      en: 'A badge is just tin. But procedural stubbornness? That is the immutable bedrock of civilization.',
      id: 'Lencana hanyalah timah. Namun keteguhan prosedur? Itulah pondasi peradaban yang tak tergoyahkan.',
      zh: '警徽不过是镀锡薄片。但程序上的铁面执拗？那才是人类文明不可撼动的基石。',
      ja: 'バッジなどただのブリキ板だ。だが規程を盾にした頑迷さこそ、文明の不変の岩盤なのだ。',
      ko: '배지는 양철 조각에 불과합니다. 그러나 절차적 고집이야말로 문명의 확고부동한 반석입니다.'
    },
    tempDrawback: {
      en: 'Savoir Faire -1 (Stiff, unyielding posture)',
      id: 'Savoir Faire -1 (Postur kaku dan tak kenal kompromi)',
      zh: '从容自若 -1 (僵硬傲慢、难以妥协的官僚姿态)',
      ja: '処世術 -1 (柔軟性を欠く強情な官僚的態度)',
      ko: '기민성 -1 (타협을 모르는 뻣뻣하고 완고한 태도)'
    },
    solution: {
      en: 'You exude the unshakeable weight of administrative dread. Witnesses fold before you even raise your voice.',
      id: 'Kau memancarkan bobot intimidasi administratif. Saksi runtuh bahkan sebelum kau meninggikan suara.',
      zh: '你浑身散发着窒息般的行政威压感。甚至在你拔高语调前，目击证人便已在心理防线前彻底溃败。',
      ja: '圧倒的な行政的重圧を漂わせる。声を荒らげるまでもなく、目撃者は自ら心理的に屈服する。',
      ko: '행정적 위압감의 서늘한 무게를 발산합니다. 목소리를 높이기도 전에 증인들이 먼저 무너집니다.'
    }
  },
  nicotine_shroud: {
    name: {
      en: 'The Nicotine Shroud',
      id: 'Selubung Nikotin',
      zh: '尼古丁迷烟之幕',
      ja: 'ニコチンの帳',
      ko: '니코틴 장막'
    },
    category: {
      en: 'Vice & Nerve',
      id: 'Cacat & Keberanian',
      zh: '恶癖与心性',
      ja: '悪癖と胆力',
      ko: '악벽과 담력'
    },
    flavor: {
      en: 'The smoke from an Astra Red does not merely coat your alveoli; it forms a defensive aerosol boundary between your soul and the decaying world.',
      id: 'Asap dari Astra Merah bukan sekadar melapisi paru-parumu; ia membentuk batas pelindung aerosol antara jiwamu dan dunia yang membusuk.',
      zh: '阿斯特拉红烟的辛辣烟雾不仅附着在你的肺泡间；更在你疲惫的灵魂与这腐朽世界之间构筑起一道绝缘屏障。',
      ja: 'アストラ・レッドの紫煙は肺を燻すだけでなく、魂と荒廃した世界との間に防壁を張り巡らせる。',
      ko: '아스트라 레드의 연기는 폐를 감쌀 뿐만 아니라, 영혼과 부패한 세계 사이에 방어막을 형성합니다.'
    },
    explanation: {
      en: 'Every inhalation is a tiny flame against the frost of District 7. You exhale gray clouds that obscure your trembling hands.',
      id: 'Setiap hisapan adalah nyala api kecil melawan dinginnya Sektor 7. Kau menghembuskan awan kelabu yang menyamarkan tanganmu yang gemetar.',
      zh: '每一次深吸，都是在第七区的刺骨寒霜中点燃微弱篝火。呼出的灰白烟雾，恰好遮掩了你不住颤抖的指尖。',
      ja: '一服ごとに、第7区の凍てつく寒気へ抗う小さな炎を灯す。吐き出す灰色の煙が、震える指先を覆い隠す。',
      ko: '들이마시는 한 모금마다 제7구역의 서리에 맞서는 작은 불씨가 됩니다. 내뿜는 회색 연기는 떨리는 손을 가려줍니다.'
    },
    tempDrawback: {
      en: 'Endurance -1 (Rattling smoker cough)',
      id: 'Daya Tahan -1 (Batuk perokok yang parau)',
      zh: '体能 -1 (剧烈嘶哑的烟民抽搐咳嗽)',
      ja: '耐久力 -1 (嗄れた激しい咳込み)',
      ko: '체력 -1 (거칠게 쌕쌕거리는 흡연자 기침)'
    },
    solution: {
      en: 'Steely nerves. In moments of panic, a single puff restores total tactical clarity.',
      id: 'Keteguhan saraf baja. Di saat panik, satu hisapan memulihkan kejernihan taktis sepenuhnya.',
      zh: '钢铁般的神经稳定性。在恐慌濒临失控的临界点，仅需深吸一口，便能瞬间重构缜密的战术冷静。',
      ja: '鋼の胆力。パニックに陥る瞬間も、一服の煙が完全なる戦術的明晰さを取り戻させる。',
      ko: '강철 같은 신경. 공황의 순간에도 단 한 모금의 흡연이 전술적 명석함을 되찾아줍니다.'
    }
  }
};

function tThought(thoughtId, field = 'name', lang = 'en') {
  const thought = THOUGHTS_I18N[thoughtId];
  if (!thought) return '';
  const currentLang = thought[field] && thought[field][lang] ? lang : 'en';
  return thought[field][currentLang] || thought[field]['en'] || thought[field]['id'] || '';
}

// --------------------------------------------------------------------------
// Loading Screen & Detective Randomizer Localizations (5 Native Languages)
// --------------------------------------------------------------------------
const LOADER_QUOTES_I18N = {
  en: [
    "“The clock never stops. Only the flesh within it forgets how to beat.”",
    "“There is a place where every unanswered question gathers like dead skin.”",
    "“You cannot interrogate the fog. It already knows what you did.”",
    "“Amnesia is not an absence of memory, but a presence of self-preservation.”",
    "“In District 7, even the statues have pawn shop tags tied to their wrists.”"
  ],
  id: [
    "“Detik jam tak pernah berhenti. Hanya daging di dalamnya yang lupa cara berdetak.”",
    "“Ada tempat di mana pertanyaan tanpa jawaban berkumpul seperti kulit mati.”",
    "“Kau tak bisa menginterogasi kabut. Ia telah tahu apa yang kau perbuat.”",
    "“Amnesia bukanlah ketiadaan ingatan, melainkan kehadiran naluri pertahanan diri.”",
    "“Di Sektor 7, bahkan patung-patung kota memiliki label rumah gadai di pergelangan tangannya.”"
  ],
  zh: [
    "“钟摆永不停歇。唯有齿轮间的血肉，遗忘了跳动的律动。”",
    "“每个悬而未决的疑问，终将在某个幽暗角落如死皮般堆积。”",
    "“你无法审问迷雾。它早已窥见了你的一切罪孽。”",
    "“失忆绝非记忆的缺席，而是求生本能的慈悲降临。”",
    "“在第七区，就连广场上的大理石雕像，手腕上也系着当铺的标签。”"
  ],
  ja: [
    "「時計の針は止まらない。止まるのは、鼓動を忘れた肉体だけだ。」",
    "「答えの出ぬ問いが、死んだ皮膚のように降り積もる場所がある。」",
    "「霧を尋問することはできない。霧は既に、お前の犯した罪を知っている。」",
    "「記憶喪失とは記憶の欠如ではない。自己防衛本能の存在証明だ。」",
    "「第7区では、街の石像の手首にさえ質屋の札が結びつけられている。」"
  ],
  ko: [
    "“시계는 결코 멈추지 않는다. 멈추는 것은 고동을 잊은 육신뿐.”",
    "“해답 없는 의문들이 각질처럼 쌓여가는 장소가 있다.”",
    "“안개를 심문할 수는 없다. 안개는 이미 네가 한 일을 알고 있다.”",
    "“기억상실은 기억의 부재가 아니라, 자기보존 본능의 엄연한 실재다.”",
    "“제7구역에서는 석상의 손목에조차 전당포 전표가 묶여 있다.”"
  ]
};

const TELEMETRY_PHASES_I18N = {
  en: [
    { at: 15, text: "Calibrating fractured synapses..." },
    { at: 35, text: "Waking internal faculties: Ratio, Elysia, Carnal, Reflex..." },
    { at: 60, text: "Loading forensic archives: Precinct 4..." },
    { at: 85, text: "Reconstructing crime scene: Saint Irene Clocktower, 04:17 AM..." },
    { at: 100, text: "Consciousness restored. Ready to investigate." }
  ],
  id: [
    { at: 15, text: "Mengalibrasi sinapsis saraf yang retak..." },
    { at: 35, text: "Membangunkan fakultas batin: Intelek, Kejiwaan, Fisik, Motorik..." },
    { at: 60, text: "Memuat arsip forensik: Distrik 4..." },
    { at: 85, text: "Merekonstruksi TKP: Menara Jam Saint Irene, 04:17..." },
    { at: 100, text: "Kesadaran pulih. Siap memulai penyelidikan." }
  ],
  zh: [
    { at: 15, text: "正在校准受损的神经突触..." },
    { at: 35, text: "唤醒核心心智维次：理智、通灵、体魄、反应..." },
    { at: 60, text: "载入第四警区法医绝密档案..." },
    { at: 85, text: "现场全息重构：圣艾琳钟楼，凌晨04:17..." },
    { at: 100, text: "深层意识已锚定。准备开启调查。" }
  ],
  ja: [
    { at: 15, text: "断片化したシナプスを較正中..." },
    { at: 35, text: "内なる精神機能を覚醒：知性、霊性、肉体、反射..." },
    { at: 60, text: "第4分署の法医学記録をロード中..." },
    { at: 85, text: "事件現場を再構築：聖アイリーン時計塔 午前04:17..." },
    { at: 100, text: "意識の回復完了。捜査を開始せよ。" }
  ],
  ko: [
    { at: 15, text: "분열된 신경 시냅스 보정 중..." },
    { at: 35, text: "내면의 기능성 활성화: 이성, 영성, 육체, 반사..." },
    { at: 60, text: "제4관할서 법의학 기록 적재 중..." },
    { at: 85, text: "현장 재구성: 성 아이린 시계탑, 새벽 04:17..." },
    { at: 100, text: "의식 회복 완료. 수사를 개시하십시오." }
  ]
};

const ALIASES_I18N = {
  en: [
    'The Dissolute Inspector',
    'The Ghost of Precinct 4',
    'The Broken Dialectician',
    'The Saint of Hangovers',
    'The Clockwork Cynic',
    'The Desolate Poet'
  ],
  id: [
    'Inspektur yang Hancur',
    'Hantu dari Distrik 4',
    'Ahli Dialektika yang Patah',
    'Santo Pemabuk Berat',
    'Sinikus Roda Gigi',
    'Penyair yang Sunyi'
  ],
  zh: [
    '沉沦落魄的探长',
    '第四警区的幽灵',
    '支离破碎的辩证学者',
    '宿醉弥撒的圣徒',
    '机械发条犬儒者',
    '荒原绝境的哀歌诗人'
  ],
  ja: [
    '放蕩の警部',
    '第4分署の亡霊',
    '失意の弁証法家',
    '二日酔いの聖者',
    '時計仕掛けの冷笑家',
    '荒涼たる詩人'
  ],
  ko: [
    '방탕한 수사관',
    '제4관할서의 유령',
    '망가진 변증론자',
    '숙취의 성자',
    '태엽 장치의 냉소주의자',
    '황량한 방랑 시인'
  ]
};




// ============================================================================
// Multi-Case Dossiers & Grand Conspiracy Localization Data
// ============================================================================
const CASES_I18N = {
  case_d4_01: {
    title: {
      en: 'The Canal Drifter',
      id: 'Mayat Mengapung di Kanal Distrik 4',
      zh: '运河沉尸案',
      ja: '運河の漂流死体',
      ko: '운하의 표류 시신 사건'
    },
    victim: {
      en: 'Tomas Karr (32, Dock Courier)',
      id: 'Tomas Karr (32, Kurir Penyelundup)',
      zh: '托马斯·卡尔 (32岁，码头走私信使)',
      ja: 'トマス・カー (32歳、港湾密輸配達人)',
      ko: '토마스 카 (32세, 부두 밀수 운반책)'
    },
    location: {
      en: 'West Basin Canal, District 7',
      id: 'Dermaga Kanal Barat Sektor 7',
      zh: '第七区西蓄水运河码头',
      ja: '第7区 西部運河船溜まり',
      ko: '제7구역 서부 운하 선착장'
    },
    summary: {
      en: 'The body of a dock courier was found bobbing in the tidal mud. Hidden in his oilskin lining was a secret silver wax seal and an encrypted Syndicate cargo manifest.',
      id: 'Mayat kurir dermaga ditemukan mengapung di kanal berlumpur. Di balik lapisan mantelnya tersimpan segel lilin perak rahasia berlogo jam patah dan manifes klandestin.',
      zh: '一名港口信使的浮尸在潮泥中被发现。其油布大衣夹层中缝藏着一枚刻有断裂齿轮的纯银蜡封及加密走私清单。',
      ja: '運河の泥濘に浮かぶ波止場配達人の遺体。オイルスキンの裏地には、折れた歯車の刻まれた秘密の銀蝋印と暗号化された密輸目録が隠されていた。',
      ko: '개펄에 떠오른 부두 운반책의 시신. 방수 외투 안감에서 부러진 톱니 문양의 은빛 밀랍 인장과 암호화된 밀수 목록이 발견되었습니다.'
    },
    keystoneName: {
      en: 'Silver Syndicate Wax Seal',
      id: 'Segel Lilin Sindikat Perak',
      zh: '银色辛迪加蜡封印信',
      ja: '銀色シンジケートの蝋印',
      ko: '은빛 신디케이트 밀랍 인장'
    },
    keystoneDesc: {
      en: 'Proves clandestine parts shipments routed to District 7 under corporate front accounts.',
      id: 'Membuktikan pengiriman suku cadang terlarang ke Sektor 7 di bawah rekening bayangan konsorsium.',
      zh: '证实违禁走私机械零件假借虚构商会账户正源源不断运入第七区。',
      ja: 'ペーパーカンパニーの口座を通じ、第7区へ禁制品の機械部品が密輸されていた事実を証明する。',
      ko: '유령 회사 계좌를 통해 제7구역으로 금지된 기계 부품이 밀수입되고 있었음을 증명합니다.'
    }
  },
  case_d4_02: {
    title: {
      en: 'The Civic Vault Arson',
      id: 'Kebakaran Gudang Arsip Catatan Sipil',
      zh: '民政档案金库纵火案',
      ja: '民政局保管庫放火事件',
      ko: '민정 기록 보관소 방화 사건'
    },
    victim: {
      en: 'Leonard Finch (64, Chief Archivist)',
      id: 'Leonard Finch (64, Kepala Arsiparis)',
      zh: '伦纳德·芬奇 (64岁，首席档案管理员)',
      ja: 'レナード・フィンチ (64歳、筆頭記録保管官)',
      ko: '레너드 핀치 (64세, 수석 기록보관관)'
    },
    location: {
      en: 'Civic Records Sub-Vault, District 4',
      id: 'Gudang Catatan Sipil Bawah Tanah Sektor 4',
      zh: '第四警区民政档案地窖',
      ja: '第4区 民政局地下記録庫',
      ko: '제4구역 민정 기록 지하 보관소'
    },
    summary: {
      en: 'A premeditated incendiary blast incinerated municipal land deeds. Finch died from smoke inhalation clutching charred titles to the Saint Irene clocktower foundations.',
      id: 'Ledakan pembakaran berencana menghanguskan akta tanah kota. Finch tewas lemas sambil mendekap sisa lembaran akta pondasi Menara Jam Saint Irene.',
      zh: '一场蓄谋已久的纵火爆炸彻底焚毁了市政土地契约。芬奇窒息身亡，怀中死死护着圣艾琳钟楼地基的焦黑地契。',
      ja: '綿密に計画された放火により市政土地権利書が焼失。フィンチは聖アイリーン時計塔の基礎部分に関する焦げた権利書を抱きしめたまま窒息死していた。',
      ko: '철저히 계획된 방화 폭발로 시의 토지 증서들이 전소되었습니다. 핀치는 성 아이린 시계탑 부지의 그을린 권리증을 품에 안은 채 질식사했습니다.'
    },
    keystoneName: {
      en: 'Charred Vault Land Deed',
      id: 'Halaman Akta Hangus Sektor Barat',
      zh: '过火焦黑的特权土地地契',
      ja: '焼け焦げた特権地権書',
      ko: '불에 탄 특권 토지 권리증'
    },
    keystoneDesc: {
      en: 'Names the City Magistrate as the secret beneficiary of Saint Irene clocktower acquisitions.',
      id: 'Membuktikan Hakim Magistrat kota adalah penerima manfaat rahasia atas pembelian tanah Menara Irene.',
      zh: '直接揭示市政大法官正是侵吞钟楼所有权幕后神秘财阀的最终收益人。',
      ja: '時計塔周辺の買収劇における真の受益者が市政治安判事であることを露呈させる。',
      ko: '시계탑 부지 매입의 배후에 있는 최종 수혜자가 시 치안판사임을 직접적으로 입증합니다.'
    }
  },
  case_d4_03: {
    title: {
      en: "The Apothecary's Tincture",
      id: 'Racun Belladonna Sang Kolektor Antik',
      zh: '药剂师的淬毒酊剂案',
      ja: '薬種商の毒劇薬事件',
      ko: '약제사의 독성 팅크제 사건'
    },
    victim: {
      en: 'Dr. Silas Vance (59, Horological Chemist)',
      id: 'Dr. Silas Vance (59, Kurator Kimia Antik)',
      zh: '塞拉斯·万斯博士 (59岁，钟表化学家)',
      ja: 'サイラス・ヴァンス博士 (59歳、時計生化学者)',
      ko: '사일러스 반스 박사 (59세, 시계 생화학자)'
    },
    location: {
      en: 'Saint Jude Apothecary, East District',
      id: 'Apotek Saint Jude, Sektor Timur',
      zh: '东区圣犹大药局地下工坊',
      ja: '東部地区 聖ユダ薬種店',
      ko: '동부 구역 성 유다 약국 지하 공방'
    },
    summary: {
      en: 'Killed in his laboratory by an odorless synthetic cyanide alkaloid. A clandestine serial numbered vial was recovered beneath his distilling alembic.',
      id: 'Tewas di laboratoriumnya akibat racun alkaloid sianida sintetis tanpa bau. Ditemukan botol obat bernomor seri klandestin di bawah alat destilasi.',
      zh: '在密闭实验室中被无色无味的合成氰化物毒杀。蒸馏器残骸下方散落着带有军规序列号的暗中调配试剂瓶。',
      ja: '無臭の合成シアン化アルカロイドによって自室で毒殺。蒸留器の下から闇ルートの識別刻印が刻まれた小瓶が押収された。',
      ko: '무취의 합성 시안화 알칼로이드에 의해 밀실에서 독살당했습니다. 증류기 아래에서 군용 암호 번호가 각인된 시약병이 발견되었습니다.'
    },
    keystoneName: {
      en: 'Clandestine Serial Tincture Vial',
      id: 'Vial Tinktur Berkode Klandestin',
      zh: '军规黑市毒物试剂瓶',
      ja: '闇市場の軍用薬瓶',
      ko: '암시장 군용 독약 시약병'
    },
    keystoneDesc: {
      en: 'Matches the chemical compound found in the puncture wound on Aurelia Vance.',
      id: 'Formula sianida biru eksklusif yang sama persis dengan racun jarum pada Aurelia Vance.',
      zh: '化学指纹与奥蕾莉亚·万斯颈部微型针孔中残留的致命毒素完全一致。',
      ja: 'オウレリア・ヴァンスの首元に残された微小針孔の毒素と完全に同一の化学組成。',
      ko: '오렐리아 반스의 목덜미에 남은 미세 주사 바늘 자국의 독소와 화학적으로 정확히 일치합니다.'
    }
  },
  case_d4_04: {
    title: {
      en: 'The Silent Watchmaker of Saint Irene',
      id: 'Sang Pembuat Jam yang Bisu di Menara Irene',
      zh: '圣艾琳钟楼的无声制表师',
      ja: '聖アイリーン時計塔の沈黙せる時計師',
      ko: '성 아이린 시계탑의 침묵하는 시계 장인'
    },
    victim: {
      en: 'Mistress Horologist Aurelia Vance (Age 56)',
      id: 'Nyonya Horologis Aurelia Vance (Usia 56)',
      zh: '首席钟表宗师 奥蕾莉亚·万斯 (56岁)',
      ja: '主任時計師 オウレリア・ヴァンス (56歳)',
      ko: '수석 시계 장인 오렐리아 반스 (56세)'
    },
    location: {
      en: 'The Grand Pendulum Chamber, Tower of Saint Irene, District 7',
      id: 'Ruang Bandul Raksasa, Menara Irene, Sektor 7',
      zh: '第七区圣艾琳钟楼巨钟摆室',
      ja: '第7区 聖アイリーン時計塔 巨大振子室',
      ko: '제7구역 성 아이린 시계탑 대형 진자실'
    },
    summary: {
      en: 'At 03:42 AM, the city clock stopped mid-stroke. Aurelia was impaled upon the pendulum in a room locked from within. Corrupt officials seek to bury it as an industrial accident.',
      id: 'Pukul 03:42 pagi, lonceng kota terhenti mendadak. Aurelia tertusuk bandul raksasa dalam ruangan terkunci dari dalam. Petinggi korup berusaha menutupinya sebagai kecelakaan kerja.',
      zh: '凌晨03:42分，巨大市钟戛然而止。奥蕾莉亚在密室中被大钟摆重锤贯穿胸膛。腐败官僚试图将其草草判定为机械工伤意外。',
      ja: '午前03:42、大時計が突如停止。密室となった振子室でオウレリアが串刺し死体で発見された。腐敗した警察上層部は事故死として葬ろうとしている。',
      ko: '새벽 03:42, 거대한 도시 시계가 멈췄습니다. 오렐리아는 밀실에서 진자 균형추에 꿰뚫린 채 발견되었습니다. 부패한 관료들은 이를 단순 안전사고로 위장하려 합니다.'
    },
    keystoneName: {
      en: 'Perpetuum Blueprints & Syndicate Confession',
      id: 'Cetak Biru Orloge & Pengakuan Dalang',
      zh: '逆时发条设计图与贿赂自白',
      ja: '永久機関設計図と買収自白',
      ko: '영구시계 설계도 및 매수 자백'
    },
    keystoneDesc: {
      en: 'Documents proving the murder was commissioned to facilitate complete temporal blackout for the Syndicate heist.',
      id: 'Dokumen bukti pembunuhan dirancang untuk melumpuhkan kronometer kota demi sabotase sindikat.',
      zh: '证明这起谋杀案是受幕后辛迪加雇佣，旨在瘫痪全市统一授时系统以便进行大规模洗劫。',
      ja: '都市全域の標準時を停止させ、暗黒街の大規模略奪を容易にするための計画的暗殺であったことを立証する。',
      ko: '도시 전역의 표준시를 마비시켜 대규모 약탈을 감행하기 위해 신디케이트가 사주한 청부 살인임을 증명합니다.'
    }
  },
  case_prime_omega: {
    title: {
      en: 'THE GRAND PERPETUUM SYNDICATE CONSPIRACY',
      id: 'KASUS UTAMA: KONSPIRASI SINDIKAT ORLOGE PERPETUUM',
      zh: '终极主案：永恒钟表辛迪加大阴谋',
      ja: '大事件：時計結社ペルペトゥームの巨大陰謀',
      ko: '최종 주 사건: 영구시계 신디케이트의 거대 음모'
    },
    victim: {
      en: 'The Temporal Sovereignty & Civilians of District 7',
      id: 'Kedaulatan Waktu & Warga Sektor 7',
      zh: '第七区全体民众与城市时间主权',
      ja: '第7区市民の生命と都市の時間主権',
      ko: '제7구역 시민의 안전과 도시 시간 주권'
    },
    location: {
      en: 'Underworld Cartel Hub & High Magistrate Citadel',
      id: 'Jaringan Sindikat Bawah Tanah & Balai Magistrat Sektor 7',
      zh: '地下黑帮总枢纽与市政最高裁判所',
      ja: '地下カルテル中枢および市政最高裁判所',
      ko: '지하 카르텔 총본부 및 시 최고 재판소'
    },
    summary: {
      en: 'Cases 01 through 04 form an unbroken chain of treason. The canal courier smuggled forbidden mechanisms, the archive fire erased paper trails, the apothecary brewed execution toxins, and Aurelia Vance was killed to seize the clocktower master switch. The syndicate planned to paralyze District 7 and seize perpetual power.',
      id: 'Keempat kasus yang diselidiki Renata Vance adalah rantai konspirasi tunggal yang terencana: Kurir kanal mengangkut suku cadang, pembakaran arsip melenyapkan jejak tanah, racun apoteker mengeksekusi para saksi, dan pembunuhan sang pembuat jam bertujuan menguasai saklar menara kota demi kudeta waktu sindikat.',
      zh: '自第01案至第04案是一张环环相扣的罪恶蛛网：运河走私走火入魔的禁忌部件、金库纵火抹杀土地证据、药剂师调制致命无痕毒素、谋杀制表大师以夺取全城授时总闸。幕后辛迪加企图趁时间瘫痪彻底掌控第七区。',
      ja: '第01事件から第04事件までは全て一本の糸で繋がっていた。密輸、放火、毒殺、そして時計師暗殺による時限装置の強奪。時計結社は第7区の時間そのものを人質に取り、完全な支配を企てていた。',
      ko: '제01호부터 제04호까지의 사건은 하나의 거대한 음모 사슬입니다. 부두 밀수, 방화 은폐, 독약 제조, 그리고 표준시 장악을 위한 시계 장인 살해까지. 신디케이트는 제7구역의 시간을 마비시키고 영구적인 권력을 장악하려 했습니다.'
    },
    keystoneName: {
      en: 'Conspiracy Synthesis Dossier',
      id: 'Sintesis Penyelidikan Sektor 7',
      zh: '第七区全域大阴谋终审结论',
      ja: '第7区全域巨大陰謀の総合立証',
      ko: '제7구역 종합 수사 결론'
    },
    keystoneDesc: {
      en: 'All 4 Keystone Evidence pieces align. The Syndicate Cartel and corrupt Magistrates stand fully unmasked.',
      id: 'Keempat kunci bukti terhubung sempurna! Sindikat bayangan dan petinggi korup berhasil dibongkar total.',
      zh: '全部4项关键拼图严丝合缝闭合！黑金结社与腐败法官的罪证已被彻底焊死。',
      ja: '4つの決定的証拠が全て合致。結社の黒幕と買収された司法当局の罪状が白日の下に晒された。',
      ko: '4가지 핵심 증거가 모두 완벽히 결합되었습니다. 암흑 신디케이트와 부패한 사법 당국의 진상이 완전히 밝혀졌습니다.'
    }
  }
};

function tCase(caseId, field, lang = 'en') {
  const c = CASES_I18N[caseId];
  if (!c) return '';
  const currentLang = c[field] && c[field][lang] ? lang : 'en';
  return c[field][currentLang] || c[field]['en'] || c[field]['id'] || '';
}


const DOSSIER_I18N = {
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

// --- END: i18n.js ---

// --- BEGIN: thoughts.js ---
// Aenigma - Thought Cabinet Database ("Lemari Pikiran")

const THOUGHTS_CATALOG = [
  {
    id: 'clockmakers_paradox',
    name: "The Clockmaker's Paradox",
    category: 'Dialectic Horology',
    flavor: 'If Aurelia Vance designed pendulum escapements that measured moments before they physically transpired, did she build her own execution mechanism?',
    explanation: 'You find yourself staring at rotating brass gears until your retinas imprint with Roman numerals. Time is not a linear river; it is a coiled torsion spring waiting to snap backward.',
    requiredTicks: 3,
    tempDrawback: 'Logic -1 (Migraine from impossible gear ratios)',
    drawbacks: { logic: -1 },
    solution: 'Time is malleable when measured by murder. You perceive mechanical flaws in suspects testimonies before they even finish speaking.',
    buffs: { logic: 2, perception: 1, interfacing: 1 },
    unlockedBy: 'examine_pendulum'
  },
  {
    id: 'amnesia_as_defense',
    name: 'Amnesia as Self-Defense',
    category: 'Psychological Splinter',
    flavor: 'Why did you drink yourself into oblivion at the St. Irene tavern last night? Perhaps your sudden amnesia wasn\'t a drunken accident, but an act of mercy performed by your subconscious.',
    explanation: 'The past is a carnivorous animal waiting in the dark. By forgetting your own name and yesterday\'s horrors, you rendered the predator toothless.',
    requiredTicks: 4,
    tempDrawback: 'Morale -1 (Empty mirrors produce cold vertigo)',
    drawbacks: { painThreshold: -1 },
    solution: 'You accept the blank slate. What you forgot cannot be used to break your spirit.',
    buffs: { painThreshold: 2, endurance: 1 },
    unlockedBy: 'examine_mirror_or_start'
  },
  {
    id: 'metaphysics_of_rain',
    name: 'Metaphysics of Cold Rain',
    category: 'Atmospheric Melancholy',
    flavor: 'The rain drumming on the clocktower zinc roof sounds identical to a Morse code transmission from an extinct civilization.',
    explanation: 'Water carries electrical charges, industrial soot, and the whispered regrets of seven million harbor workers. If you listen closely enough, the storm tells you where the killer stepped.',
    requiredTicks: 3,
    tempDrawback: 'Conceptualization -1 (Distracted by dripping eaves)',
    drawbacks: { conceptualization: -1 },
    solution: 'The atmospheric pressure sharpens your intuitive sixth sense. The city speaks directly into your ear canal.',
    buffs: { esoterica: 2, encyclopedia: 1 },
    unlockedBy: 'examine_balcony'
  },
  {
    id: 'sovereign_bureaucrat',
    name: 'The Sovereign Bureaucrat',
    category: 'Civic Authority',
    flavor: 'The precinct chiefs think power resides in bayonets. But real power resides in the rubber stamp of an inspector who simply refuses to sign the autopsy transfer.',
    explanation: 'A badge is just tin. But procedural stubbornness? That is the immutable bedrock of civilization.',
    requiredTicks: 2,
    tempDrawback: 'Savoir Faire -1 (Stiff, unyielding posture)',
    drawbacks: { savoirFaire: -1 },
    solution: 'You exude the unshakeable weight of administrative dread. Witnesses fold before you even raise your voice.',
    buffs: { authority: 2, rhetoric: 1 },
    unlockedBy: 'talk_graves'
  },
  {
    id: 'nicotine_shroud',
    name: 'The Nicotine Shroud',
    category: 'Vice & Nerve',
    flavor: 'The smoke from an Astra Red does not merely coat your alveoli; it forms a defensive aerosol boundary between your soul and the decaying world.',
    explanation: 'Every inhalation is a tiny flame against the frost of District 7. You exhale gray clouds that obscure your trembling hands.',
    requiredTicks: 3,
    tempDrawback: 'Endurance -1 (Rattling smoker cough)',
    drawbacks: { endurance: -1 },
    solution: 'Steely nerves. In moments of panic, a single puff restores total tactical clarity.',
    buffs: { handEyeCoord: 2, suggestion: 1 },
    unlockedBy: 'use_cigarettes'
  }
];

// --- END: thoughts.js ---

// --- BEGIN: cases.js ---
// Aenigma Case Narrative Data: "The Silent Watchmaker of Saint Irene"

const CASE_DATA = {
  title: 'The Silent Watchmaker of Saint Irene',
  victim: 'Mistress Horologist Aurelia Vance (Age 56)',
  location: 'The Grand Pendulum Chamber, Tower of Saint Irene, District 7',
  summary: 'At 03:42 AM, the colossal city clock stopped mid-stroke. Inside the gear chamber, Mistress Aurelia Vance was discovered impaled upon the counterweight of the great pendulum. The room was locked from within.',

  // Interactive Inspection Points on the Crime Scene
  pointsOfInterest: [
    {
      id: 'poi_pendulum',
      title: "The Great Pendulum & Counterweight",
      icon: '⏳',
      x: 48, // percentage on scene
      y: 52,
      image: 'assets/poi_pendulum.jpg',
      description: "The colossal brass pendulum hanging in the gloom, swinging like a giant gilded blade above the gear abyss.",
      initialNode: 'examine_pendulum_start'
    },
    {
      id: 'poi_pocketwatch',
      title: "The Alchemical Pocket Watch & Chalk Outline",
      icon: '⏱️',
      x: 54,
      y: 78,
      image: 'assets/poi_pocketwatch.jpg',
      description: "Lying on the blood-soaked boards next to the victim's scattered belongings and dropped briefcase.",
      initialNode: 'examine_watch_start'
    },
    {
      id: 'poi_balcony',
      title: "The Luminous Clock Face & Rain Vista",
      icon: '🌧️',
      x: 64,
      y: 22,
      image: 'assets/poi_balcony.jpg',
      description: "The monumental round stained glass clock, rain beating against the Roman numerals high above the city.",
      initialNode: 'examine_balcony_start'
    },
    {
      id: 'poi_graves',
      title: "Inspector Graves (Precinct 4)",
      icon: '🕵️',
      x: 74,
      y: 64,
      image: 'assets/poi_graves.jpg',
      description: "Your partner kneeling with a flashlight, taking forensic notes and grumbling in the cold rain.",
      initialNode: 'graves_dialogue_start'
    },
    {
      id: 'poi_madame',
      title: "Madame Vivienne Vance (The Shadowed Widow)",
      icon: '🖤',
      x: 14,
      y: 38,
      image: 'assets/poi_madame.jpg',
      description: "Standing motionless by the upper lantern gantry, her dark veil fluttering in the draft.",
      initialNode: 'madame_dialogue_start'
    },
    {
      id: 'poi_floorboard',
      title: "Concealed Floorboard Safe",
      icon: '🗝️',
      x: 38,
      y: 73,
      image: 'assets/poi_safe.jpg',
      description: "A loose plank under discarded grease rags and bullet casings. Faint scratches mark the brass rivets.",
      initialNode: 'examine_safe_start'
    },
    {
      id: 'poi_gantry_lantern',
      title: "Upper Gantry & Alchemical Lantern",
      icon: '🏮',
      x: 26,
      y: 18,
      image: 'assets/poi_balcony.jpg',
      description: "A narrow iron grating over the gear abyss. Broken glass and alchemical soot mark where a clandestine visitor waited.",
      initialNode: 'examine_gantry_lantern'
    },
    {
      id: 'poi_clock_chime_bell',
      title: "Colossal Bronze Bell & Chime Gearing",
      icon: '🔔',
      x: 84,
      y: 16,
      image: 'assets/poi_pendulum.jpg',
      description: "The eight-ton bell that tolls for District 7. A fine steel wire is wrapped through the clapper linkage down into the pendulum escapement.",
      initialNode: 'examine_chime_bell'
    }
  ],

  // Dialogue Tree Nodes
  dialogueNodes: {
    // --- INSPECTOR GRAVES ---
    graves_dialogue_start: {
      speaker: 'Inspector Graves',
      avatar: '🕵️',
      text: "You finally dragged yourself up six flights of stairs, Detective. You reek like you slept in an open sewer behind the Whirling Gull. Take a look at this mess. The city magistrate is already screaming on the wire.",
      voices: [
        {
          voice: 'Ratio',
          color: 'var(--color-intellect)',
          badge: 'RATIO [Intellect]',
          text: "Look at his collar. There's dried tobacco ash on his lapel, but his eyes are darting toward the widow. He's nervous. He wants this closed as an accident before dawn."
        }
      ],
      options: [
        {
          id: 'graves_opt_preliminary',
          text: '"What is your preliminary assessment, Graves?"',
          nextNode: 'graves_assessment'
        },
        {
          id: 'graves_opt_rhetoric',
          condition: (state) => !state.hasClue('clue_syndicate_bounty'),
          text: '[RHETORIC - Medium 10] "You seem in an awful hurry to file this report, Graves. Who called you first?"',
          check: {
            checkId: 'graves_rhetoric_press',
            type: 'white',
            skill: 'rhetoric',
            difficulty: 10,
            successNode: 'graves_rhetoric_win',
            failNode: 'graves_rhetoric_fail'
          }
        },
        {
          id: 'graves_opt_conspiracy',
          condition: (state) => state.hasClue('clue_syndicate_bounty') && !state.hasClue('clue_perpetuum_ledger'),
          text: '"I know about the Grand Syndicate bounty, Graves. Tell me where that ledger is."',
          nextNode: 'graves_ledger_hunt'
        },
        {
          id: 'graves_opt_cigarette',
          once: true,
          condition: (state) => !state.hasItem('item_cigarettes'),
          text: '"I need a cigarette before my synapses completely disconnect."',
          nextNode: 'graves_cigarette'
        },
        {
          id: 'graves_opt_leave',
          text: '[Leave dialogue]',
          action: 'close_dialogue'
        }
      ]
    },

    graves_assessment: {
      speaker: 'Inspector Graves',
      avatar: '🕵️',
      text: "Old Aurelia was up here tinkering with the escapement at three in the morning. She slipped on machine grease, grabbed the pendulum to catch herself, and the counterweight drove through her ribs. Gruesome, but an industrial accident. Case closed, we go home and dry our boots.",
      voices: [
        {
          voice: 'Carnal',
          color: 'var(--color-physique)',
          badge: 'CARNAL [Physique]',
          text: "Lies. A woman who slips forward doesn't land impaled through the back of her shoulder blades with her hands neatly folded. Someone held her down while the heavy iron arm descended."
        }
      ],
      options: [
        {
          text: '"Accident? Look at the wound entry angle. That is biomechanically impossible."',
          nextNode: 'graves_debate_wound'
        },
        {
          text: '"Who was the last person to see her alive?"',
          nextNode: 'graves_last_seen'
        },
        {
          text: '[Return to main inquiry]',
          nextNode: 'graves_dialogue_start'
        }
      ]
    },

    graves_rhetoric_win: {
      speaker: 'Inspector Graves',
      avatar: '🕵️',
      text: "Graves flinches, his jaw tightening around the matchstick. 'Lower your damn voice! A courier from the Grand Syndicate arrived at my flat at 02:00. He said Vance had stolen a prototype clockwork ledger. If we recover that ledger, there is a ten-thousand guilder bounty for both of us.'",
      voices: [
        {
          voice: 'Elysia',
          color: 'var(--color-psyche)',
          badge: 'ELYSIA [Psyche]',
          text: "Greed radiates off him like heat from a kiln. But he didn't kill Vance—he arrived too late and found her already cold."
        }
      ],
      action: (state) => {
        state.addClue({
          id: 'clue_syndicate_bounty',
          title: 'The Grand Syndicate Ledger Bounty',
          desc: 'Inspector Graves was paid off by the Syndicate to retrieve an alchemical prototype ledger stolen by Vance.'
        });
        state.unlockThought('sovereign_bureaucrat');
      },
      options: [
        {
          text: '"So this was never about an accident. Where is the ledger now?"',
          nextNode: 'graves_ledger_hunt'
        },
        {
          text: '[Return]',
          nextNode: 'graves_dialogue_start'
        }
      ]
    },

    graves_rhetoric_fail: {
      speaker: 'Inspector Graves',
      avatar: '🕵️',
      text: "Graves laughs harshly, coughing into his fist. 'Don't play grand interrogator with me, partner. You don't even remember your own badge number after last night's binge. Check the body or let me do my job.'",
      options: [
        {
          text: '"Fine. Let me inspect the corpse."',
          nextNode: 'graves_dialogue_start'
        }
      ]
    },

    graves_cigarette: {
      speaker: 'Inspector Graves',
      avatar: '🕵️',
      text: "Graves tosses you a wrinkled cardboard box. 'Astra Red. Take one. You look like a walking cadaver.'",
      action: (state) => {
        state.healMorale(1);
        state.unlockThought('nicotine_shroud');
      },
      voices: [
        {
          voice: 'Reflex',
          color: 'var(--color-motorics)',
          badge: 'REFLEX [Motorics]',
          text: "The sulfur match strikes with an electric hiss. Inhaling the tar-heavy smoke calms your tremor. +1 Morale restored."
        }
      ],
      options: [
        {
          text: '[Blow smoke into the gloom and return]',
          nextNode: 'graves_dialogue_start'
        }
      ]
    },

    graves_debate_wound: {
      speaker: 'Inspector Graves',
      avatar: '🕵️',
      text: "Graves scowls, waving his lantern over the corpse. 'Maybe she fell from the upper gantry! Look, Detective, until you show me a second set of footprints or a weapon with someone else's fingerprints, the Captain wants this stamped as accidental death.'",
      options: [
        {
          text: '"I will find the evidence. Just stay out of my way."',
          nextNode: 'graves_dialogue_start'
        }
      ]
    },

    graves_last_seen: {
      speaker: 'Inspector Graves',
      avatar: '🕵️',
      text: "'The widow. Madame Vivienne. She claims she brought him peppermint tea at midnight, then went down to the parish rectory for all-night vigil prayers. Convenient alibi, if you ask me.'",
      options: [
        {
          text: '"I should speak with Madame Vance directly."',
          nextNode: 'graves_dialogue_start'
        }
      ]
    },

    graves_ledger_hunt: {
      speaker: 'Inspector Graves',
      avatar: '🕵️',
      text: "'If I knew where it was, I wouldn't be freezing my kidneys off in this tower! Vance had a hidden floorboard safe somewhere beneath the secondary escapement. But the lock is an alchemical three-tumbler dial.'",
      options: [
        {
          text: '"I\'ll inspect the floorboards."',
          nextNode: 'graves_dialogue_start'
        }
      ]
    },

    // --- PENDULUM INSPECTION ---
    examine_pendulum_start: {
      speaker: 'Internal Monologue & Forensic Observation',
      avatar: '⏳',
      text: "The body of Aurelia Vance is pinned like an insect against the brass counterweight. Her linen blouse is stiff with dried crimson. Strangely, the pool of coagulated blood is not directly underneath her—it forms a dark smear six paces toward the window.",
      voices: [
        {
          voice: 'Ratio',
          color: 'var(--color-intellect)',
          badge: 'RATIO [Intellect]',
          text: "Hypostasis deduction: She did not die here on the pendulum. She was killed at the window sill, bled out, and her body was dragged and mounted onto the clock mechanism to make the stoppage seem like an accidental disaster."
        },
        {
          voice: 'Carnal',
          color: 'var(--color-physique)',
          badge: 'CARNAL [Physique]',
          text: "Touch her wrist. The rigor mortis is uneven. The left arm is limp, while the right hand is frozen in a convulsive grip, clutching something tightly inside her palm."
        }
      ],
      options: [
        {
          id: 'pendulum_opt_pry_hand',
          condition: (state) => !state.hasClue('clue_poison_needle'),
          text: '[PERCEPTION - Challenging 12] Pry open her frozen right hand to see what she clenched before dying.',
          check: {
            checkId: 'check_pry_hand',
            type: 'white',
            skill: 'perception',
            difficulty: 12,
            successNode: 'pendulum_pry_win',
            failNode: 'pendulum_pry_fail'
          }
        },
        {
          id: 'pendulum_opt_esoterica',
          condition: (state) => !state.hasClue('clue_meridian_seal'),
          text: '[ESOTERICA - Medium 10] Study the strange geometric incision carved into her collarbone.',
          check: {
            checkId: 'check_esoterica_rune',
            type: 'white',
            skill: 'esoterica',
            difficulty: 10,
            successNode: 'pendulum_esoterica_win',
            failNode: 'pendulum_esoterica_fail'
          }
        },
        {
          id: 'pendulum_opt_gears',
          once: true,
          text: '[DANGEROUS] Reach deep into the churning escapement gears to look for dropped evidence.',
          nextNode: 'pendulum_gear_crush'
        },
        {
          id: 'pendulum_opt_stepback',
          text: '[Step back from the corpse]',
          action: 'close_dialogue'
        }
      ]
    },

    pendulum_gear_crush: {
      speaker: 'Mechanical Horror',
      avatar: '⚙️',
      text: "The massive bronze teeth of the main escapement catch your trenchcoat sleeve! The unstoppable torque drags your arm into the bevel gears before you tear yourself free with a sickening crunch (-2 Health, -1 Morale)!",
      action: (state) => {
        state.damageHealth(2);
        state.damageMorale(1);
      },
      options: [
        {
          text: '"Aaaargh! The clockwork nearly swallowed my arm!"',
          nextNode: 'examine_pendulum_start'
        }
      ]
    },

    pendulum_pry_win: {
      speaker: 'Forensic Discovery',
      avatar: '⏳',
      text: "With a sharp snap of dried tendons, her fingers yield. Resting inside her palm is a carved ivory chess piece: a Black Queen with a silver needle embedded in its base. The needle tip is stained with a bitter, sweet-smelling violet residue.",
      voices: [
        {
          voice: 'Reflex',
          color: 'var(--color-motorics)',
          badge: 'REFLEX [Motorics]',
          text: "Belladonna and mercuric oxide. An assassination needle. Vance was paralyzed with neurotoxin before her body was hoisted onto the pendulum!"
        }
      ],
      action: (state) => {
        state.addItem({
          id: 'poison_chess_queen',
          name: 'Poisoned Ivory Queen',
          type: 'evidence',
          description: 'A black queen chess piece with an alchemical hollow needle. Coated in deadly belladonna-mercury extract.',
          icon: '♟️',
          bonus: { perception: 1 }
        });
        state.addClue({
          id: 'clue_poison_needle',
          title: 'The Poisoned Queen',
          desc: 'Aurelia Vance was paralyzed by a hollow needle concealed in a chess piece before being hung on the pendulum.'
        });
        state.unlockThought('clockmakers_paradox');
      },
      options: [
        {
          text: '"The killer didn\'t use brute force. They used a parlor trick."',
          nextNode: 'examine_pendulum_start'
        },
        {
          text: '[Close]',
          action: 'close_dialogue'
        }
      ]
    },

    pendulum_pry_fail: {
      speaker: 'Forensic Failure',
      avatar: '⏳',
      text: "The cadaveric spasm is like cast iron. As you force her fingers, a concealed needle pricks your index finger, burning your flesh with neurotoxin (-2 Health, -1 Morale)!",
      voices: [
        {
          voice: 'Carnal',
          color: 'var(--color-physique)',
          badge: 'CARNAL [Physique]',
          text: "Clumsy! Your alcohol-trembled fingers slipped onto the needle. The venom spreads like liquid fire through your veins."
        }
      ],
      action: (state) => {
        state.damageHealth(2);
        state.damageMorale(1);
      },
      options: [
        {
          text: '"Damn my trembling hands..."',
          nextNode: 'examine_pendulum_start'
        }
      ]
    },

    pendulum_esoterica_win: {
      speaker: 'Occult Deduction',
      avatar: '🔮',
      text: "Beneath the blood-crusted collar lies an alchemical mark: a circle quartered by three intersecting crescents. The seal of 'The Order of the Pale Meridian'—a secret cabal of horologists who believed time itself could be reversed through mechanical resonance.",
      action: (state) => {
        state.addClue({
          id: 'clue_meridian_seal',
          title: 'The Pale Meridian Seal',
          desc: 'The victim was initiated into an occult horological order attempting to reverse time.'
        });
      },
      options: [
        {
          text: '"She was trying to build a machine that could un-live hours."',
          nextNode: 'examine_pendulum_start'
        }
      ]
    },

    pendulum_esoterica_fail: {
      speaker: 'Occult Deduction',
      avatar: '🔮',
      text: "The scratches look like random surgical cuts or lacerations from broken clock springs. You cannot make sense of the geometry; it just produces a throbbing headache in your temples.",
      options: [
        {
          text: '[Blink and look away]',
          nextNode: 'examine_pendulum_start'
        }
      ]
    },

    // --- POCKET WATCH ---
    examine_watch_start: {
      speaker: 'The Alchemical Watch',
      avatar: '⏱️',
      text: "The gold pocket watch lies on the catwalk. The crystal face is spiderwebbed with cracks, frozen at 03:42. A faint ticking sound emanates from within, even though the hands are motionless.",
      voices: [
        {
          voice: 'Ratio',
          color: 'var(--color-intellect)',
          badge: 'RATIO [Intellect]',
          text: "Listen. The cadence is wrong. A normal escapement beats at five ticks per second (300 BPM). This mechanism is pulsing in an irregular triplet: tap... tap-tap... tap."
        }
      ],
      options: [
        {
          id: 'watch_opt_interfacing',
          condition: (state) => !state.hasClue('clue_watch_code'),
          text: '[INTERFACING - Medium 11] Pop open the back casing with your thumbnail to examine the inner movement.',
          check: {
            checkId: 'check_watch_open',
            type: 'white',
            skill: 'interfacing',
            difficulty: 11,
            successNode: 'watch_open_win',
            failNode: 'watch_open_fail'
          }
        },
        {
          id: 'watch_opt_take',
          once: true,
          condition: (state) => !state.hasItem('broken_pocketwatch'),
          text: '[Put the watch in evidence bag]',
          action: (state) => {
            state.addItem({
              id: 'broken_pocketwatch',
              name: 'Aurelia\'s Stopped Watch',
              type: 'evidence',
              description: 'Frozen at 03:42 AM. Emits an uncanny triplet tick like a dying heartbeat.',
              icon: '⏱️',
              bonus: { logic: 1 }
            });
          },
          nextNode: 'examine_watch_done'
        },
        {
          id: 'watch_opt_stepback',
          text: '[Step back]',
          action: 'close_dialogue'
        }
      ]
    },

    watch_open_win: {
      speaker: 'Mechanical Revelations',
      avatar: '⏱️',
      text: "The back plate clicks open with a sweet brass resonance. Inside, engraved into the gold balance cock, is a cipher code: 'V.V. - 7-3-12 - SHE HAS THE CIPHER KEY'. Underneath the balance spring is a miniature portrait of Madame Vivienne Vance, taken thirty years ago when she was an actress in the Grand Opera.",
      action: (state) => {
        state.addClue({
          id: 'clue_watch_code',
          title: 'Floorboard Safe Combination (7-3-12)',
          desc: 'The victim inscribed the safe code inside her watch balance cock, linking it to Madame Vivienne Vance.'
        });
      },
      options: [
        {
          text: '"The combination to her secret safe: 7-3-12. And Vance knew her partner was coming for her."',
          action: 'close_dialogue'
        }
      ]
    },

    watch_open_fail: {
      speaker: 'Mechanical Mistake',
      avatar: '⏱️',
      text: "Your thumbnail slips on the oiled bevel, snapping the delicate hinge. The hairspring flies out like a coiled brass viper and disappears down the floor cracks.",
      action: (state) => {
        state.damageHealth(1);
      },
      options: [
        {
          text: '"Ouch! The spring cut my finger."',
          action: 'close_dialogue'
        }
      ]
    },

    examine_watch_done: {
      speaker: 'Inventory Update',
      avatar: '⏱️',
      text: "You wrap the pocket watch in a clean silk handkerchief and slip it into your trenchcoat pocket.",
      options: [
        {
          text: '[Continue investigation]',
          action: 'close_dialogue'
        }
      ]
    },

    // --- RAIN BALCONY ---
    examine_balcony_start: {
      speaker: 'The Precipice of Saint Irene',
      avatar: '🌧️',
      text: "Cold wind howls through the stone archway. Below lies the murky chasm of District 7—gas lamps flickering like dying stars across the canal barges. Rain spatters against your face.",
      voices: [
        {
          voice: 'Elysia',
          color: 'var(--color-psyche)',
          badge: 'ELYSIA [Psyche]',
          text: "Someone stood here right after the clock stopped. They stood in the rain, looking out over the sleeping city, wiping something off their gloves. The scent of bitter almond still lingers on the stone."
        }
      ],
      options: [
        {
          id: 'balcony_opt_perception',
          condition: (state) => !state.hasClue('clue_velvet_cyanide'),
          text: '[PERCEPTION - Easy 8] Search the wet flagstones for trace evidence.',
          check: {
            checkId: 'check_balcony_search',
            type: 'white',
            skill: 'perception',
            difficulty: 8,
            successNode: 'balcony_search_win',
            failNode: 'balcony_search_fail'
          }
        },
        {
          id: 'balcony_opt_fog',
          once: true,
          text: 'Look over the railing into the fog.',
          action: (state) => {
            state.unlockThought('metaphysics_of_rain');
          },
          nextNode: 'balcony_fog_reflection'
        },
        {
          id: 'balcony_opt_return',
          text: '[Return inside]',
          action: 'close_dialogue'
        }
      ]
    },

    balcony_search_win: {
      speaker: 'Trace Evidence Found',
      avatar: '🌧️',
      text: "Snagged on the wrought-iron gargoyle is a torn shred of midnight-blue velvet. It matches the high collar of Madame Vance's mourning coat. Next to it, an empty glass ampoule labeled 'Tincture of Somnus & Cyanide'.",
      action: (state) => {
        state.addItem({
          id: 'cyanide_ampoule',
          name: 'Empty Poison Ampoule',
          type: 'evidence',
          description: 'Dark amber glass vial smelling of bitter almonds. Traces of cyanide and somnus.',
          icon: '🧪',
          bonus: { encyclopedia: 1 }
        });
        state.addClue({
          id: 'clue_velvet_cyanide',
          title: 'Torn Blue Velvet & Cyanide Vial',
          desc: 'Found on the rain balcony. A direct physical match to Madame Vivienne Vance.'
        });
      },
      options: [
        {
          text: '"The smoking gun. She was here on the balcony right after Vance died."',
          action: 'close_dialogue'
        }
      ]
    },

    balcony_search_fail: {
      speaker: 'Diluted Traces',
      avatar: '🌧️',
      text: "The driving downpour has washed away almost all footsteps. You only find muddy smears and puddles of soot.",
      options: [
        {
          text: '[Step back inside]',
          action: 'close_dialogue'
        }
      ]
    },

    balcony_fog_reflection: {
      speaker: 'Atmospheric Reverie',
      avatar: '🌧️',
      text: "You stare down at the sprawling darkness of Malkuth-on-Thames. You have unlocked a new avenue of introspection: 'Metaphysics of Cold Rain'. You can internalize this thought in your Thought Cabinet.",
      options: [
        {
          text: '[Return to the gear room]',
          action: 'close_dialogue'
        }
      ]
    },

    // --- CONCEALED SAFE ---
    examine_safe_start: {
      speaker: 'The Secret Floorboard Compartment',
      avatar: '🗝️',
      text: "Under three layers of clock-oil soaked pine lies a heavy steel strongbox with three concentric brass rotary dials. It looks reinforced with lead lining.",
      options: [
        {
          id: 'safe_opt_code',
          text: '[If combination known (7-3-12)] Enter the code found inside Aurelia\'s watch.',
          condition: (state) => state.hasClue('clue_watch_code') && !state.hasClue('clue_perpetuum_ledger'),
          nextNode: 'safe_open_code'
        },
        {
          id: 'safe_opt_logic',
          condition: (state) => !state.hasClue('clue_perpetuum_ledger'),
          text: '[LOGIC - Hard 13] Attempt to deduce the tumbler alignment by acoustic vibration.',
          check: {
            checkId: 'check_safe_logic',
            type: 'white',
            skill: 'logic',
            difficulty: 13,
            successNode: 'safe_open_code',
            failNode: 'safe_logic_fail'
          }
        },
        {
          id: 'safe_opt_brute',
          condition: (state) => !state.hasClue('clue_perpetuum_ledger'),
          text: '[BRUTE FORCE - Dangerous] Try to pry open the heavy iron lid with a crowbar.',
          nextNode: 'safe_brute_trap'
        },
        {
          id: 'safe_opt_leave',
          text: '[Leave safe untouched]',
          action: 'close_dialogue'
        }
      ]
    },

    safe_brute_trap: {
      speaker: 'Lethal Counter-Measure',
      avatar: '💥',
      text: "As your iron crowbar forces the seam, a hidden spring-loaded razor-clamp snaps shut across your forearms with bone-splintering force! High-pressure sulfur fumes burst into your face (-2 Health, -1 Morale)!",
      action: (state) => {
        state.damageHealth(2);
        state.damageMorale(1);
      },
      options: [
        {
          text: '"Aaargh! The safe was rigged with a lethal booby trap!"',
          action: 'close_dialogue'
        }
      ]
    },

    safe_open_code: {
      speaker: 'Safe Opened',
      avatar: '🗝️',
      text: "The heavy bolts retract with a deep, echoing clunk. Inside the velvet-lined recess lies the legendary 'Perpetuum Ledger'—bound in black goatskin with brass cogwheels embedded in the spine, containing alchemical blueprints and secret syndicate accounts!",
      action: (state) => {
        state.addItem({
          id: 'perpetuum_ledger',
          name: 'The Perpetuum Alchemical Ledger',
          type: 'evidence',
          description: 'The master blueprints of Aurelia Vance. Proves the Syndicate planned to burn down District 7 for insurance.',
          icon: '📖',
          bonus: { encyclopedia: 2, logic: 2 }
        });
        state.addClue({
          id: 'clue_perpetuum_ledger',
          title: 'The Perpetuum Ledger',
          desc: 'The definitive proof that Vance was silenced to prevent her from exposing the Grand Syndicate arson conspiracy.'
        });
        state.gainXP(50);
      },
      voices: [
        {
          voice: 'Ratio',
          color: 'var(--color-intellect)',
          badge: 'RATIO [Intellect]',
          text: "Look at the final entry dated last evening: 'Vivienne knows. She sold the cipher to the Syndicate for passage to the New Continent. Tonight she brings me tea. I know what is in the cup.'"
        }
      ],
      options: [
        {
          text: '"Vance knew Vivienne was going to poison her... and she let her do it."',
          action: 'close_dialogue'
        }
      ]
    },

    safe_logic_fail: {
      speaker: 'Lockpick Disaster',
      avatar: '🗝️',
      text: "The internal tumblers jam with a harsh screech. An internal anti-tamper glass vial cracks, releasing foul sulfur gas and a spring trap snaps on your hands (-2 Health, -1 Morale)!",
      action: (state) => {
        state.damageHealth(2);
        state.damageMorale(1);
      },
      options: [
        {
          text: '"Damn anti-tamper traps!"',
          action: 'close_dialogue'
        }
      ]
    },

    // --- MADAME VIVIENNE VANCE ---
    madame_dialogue_start: {
      speaker: 'Madame Vivienne Vance',
      avatar: '🖤',
      text: "Madame Vance turns slowly. Her face is pale as alabaster, framed by wet raven curls and a black silk veil. 'Are you the investigator? You look... unraveled, Detective. Did you come here to solve Aurelia's death, or merely to gawk at our ruin?'",
      voices: [
        {
          voice: 'Elysia',
          color: 'var(--color-psyche)',
          badge: 'ELYSIA [Psyche]',
          text: "Her grief is a performance. Beneath the mourning crepe, her pulse is steady, rhythmic, almost mechanical. Like she is reciting lines she rehearsed in front of a dressing room mirror for a month."
        }
      ],
      options: [
        {
          id: 'madame_opt_alibi',
          once: true,
          text: '"Where were you at 03:42 AM when the tower clock stopped?"',
          nextNode: 'madame_alibi'
        },
        {
          id: 'madame_opt_empathy',
          condition: (state) => !state.hasClue('clue_madame_motive'),
          text: '[EMPATHY - Medium 10] "You did not love her, did you, Madame?"',
          check: {
            checkId: 'check_madame_empathy',
            type: 'white',
            skill: 'empathy',
            difficulty: 10,
            successNode: 'madame_empathy_win',
            failNode: 'madame_empathy_fail'
          }
        },
        {
          id: 'madame_opt_confession_red',
          condition: (state) => (state.hasClue('clue_velvet_cyanide') || state.hasClue('clue_poison_needle')) && !state.flags.case_solved,
          text: '[RED CHECK] [AUTHORITY - Challenging 13] "Enough theatrics, Vivienne. We found the poisoned chess queen and the torn velvet from your coat on the balcony. You murdered her."',
          check: {
            checkId: 'check_madame_confession_red',
            type: 'red',
            skill: 'authority',
            difficulty: 13,
            successNode: 'madame_confession_win',
            failNode: 'madame_confession_fail'
          }
        },
        {
          id: 'madame_opt_rash_accusation',
          condition: (state) => !state.flags.case_solved,
          text: '[RASH ACCUSATION - Dangerous] "I don\'t need evidence, Vivienne! You killed Aurelia and I am arresting you right now!"',
          nextNode: 'madame_premature_arrest_fail'
        },
        {
          id: 'madame_opt_stepaway',
          text: '[Step away]',
          action: 'close_dialogue'
        }
      ]
    },

    madame_premature_arrest_fail: {
      speaker: 'Catastrophic Blunder',
      avatar: '🚨',
      text: "Inspector Graves steps in front of you, drawing his service revolver. 'That is enough, Detective! You have no proof, you reek of alcohol, and you are terrorizing a citizen under police protection. Hand over your badge. You are under arrest for extortion and gross misconduct!'",
      action: (state) => {
        state.triggerGameOver('arrest', 'Disgraced Arrest & Dismissal', 'You made a reckless accusation without proof. Inspector Graves arrested you on the spot.');
      },
      options: [
        {
          text: '[Yield to the handcuffs]',
          action: 'close_dialogue'
        }
      ]
    },

    madame_alibi: {
      speaker: 'Madame Vivienne Vance',
      avatar: '🖤',
      text: "'I told your companion Inspector Graves: I was downstairs in the Saint Irene chapel, lighting candles for the departed souls of the epidemic. The priest can attest to my presence—though he was asleep in his confessional booth.'",
      options: [
        {
          text: '"Convenient. An alibi witnessed by a sleeping priest."',
          nextNode: 'madame_dialogue_start'
        }
      ]
    },

    madame_empathy_win: {
      speaker: 'Madame Vivienne Vance',
      avatar: '🖤',
      text: "Her eyes widen slightly, and for a split second the porcelain mask drops. 'Love? Aurelia did not love human beings, Detective. She loved springs, escapements, and cold brass gears. For thirty years I was just a domestic pendulum swinging in her hallway. While our daughter died of consumption, she was upstairs building an alchemical chronometer to sell to foreign bankers.'",
      action: (state) => {
        state.addClue({
          id: 'clue_madame_motive',
          title: 'Vivienne\'s Motive: Vengeance & Neglect',
          desc: 'Aurelia neglected their dying daughter to finish her machine for the Syndicate.'
        });
        state.unlockThought('guilt_complex_of_precinct4');
      },
      options: [
        {
          text: '"So you decided to stop her clock once and for all."',
          nextNode: 'madame_dialogue_start'
        }
      ]
    },

    madame_empathy_fail: {
      speaker: 'Madame Vivienne Vance',
      avatar: '🖤',
      text: "'How vulgar. You stumble in here, smelling of gin and cheap tobacco, and dare question thirty years together? Inspector Graves, remove this animal from my presence!'",
      action: (state) => {
        state.damageMorale(1);
      },
      options: [
        {
          text: '"Hold your tongue, Madame. I am not finished."',
          nextNode: 'madame_dialogue_start'
        }
      ]
    },

    madame_confession_win: {
      speaker: 'The Breaking of the Ice',
      avatar: '🖤',
      text: "Madame Vance staggers backward against the stone arch. Tears cut through the powdered chalk on her cheeks. 'Yes! Yes, I gave her the poisoned queen! But do you know what she did when I pressed the needle into her palm? She smiled. She thanked me. She looked into my eyes and said, *The pendulum is already set, Vivienne. Thank you for freeing me from the winding.* She wanted to die! She rigged the clock so the Syndicate would never get their war machine!'",
      action: (state) => {
        state.flags.case_solved = true;
        state.addClue({
          id: 'clue_confession_full',
          title: 'THE FULL TRUTH: A Mutual Murder-Martyrdom',
          desc: 'Vivienne poisoned Aurelia with her consent to prevent the Syndicate from seizing her time-delay incendiary blueprints.'
        });
        state.gainXP(100);
      },
      voices: [
        {
          voice: 'Ratio',
          color: 'var(--color-intellect)',
          badge: 'RATIO [Intellect]',
          text: "EPIPHANY. The puzzle is solved. Vance was not a mere victim; she was the orchestrator of her own mechanical suicide pact. She used her partner's vengeance as the final gear in her escapement."
        },
        {
          voice: 'Elysia',
          color: 'var(--color-psyche)',
          badge: 'ELYSIA [Psyche]',
          text: "The case is cracked. The rain outside sounds quieter now, like a theater curtain slowly falling over the stage."
        }
      ],
      options: [
        {
          id: 'confession_opt_arrest',
          text: '[DELIVER FINAL JUDGMENT: Arrest Madame Vance for murder]',
          nextNode: 'ending_arrest'
        },
        {
          id: 'confession_opt_coverup',
          text: '[DELIVER FINAL JUDGMENT: Hide the Perpetuum Ledger and file it as an accidental death]',
          nextNode: 'ending_coverup'
        },
        {
          id: 'confession_opt_syndicate_bust',
          text: '[DELIVER REVOLUTIONARY JUDGMENT: Hand the Perpetuum Ledger to the Worker\'s Union press and expose the Syndicate!]',
          nextNode: 'ending_syndicate_bust'
        }
      ]
    },

    madame_confession_fail: {
      speaker: 'Unshakable Defiance',
      avatar: '🖤',
      text: "'Are you insane?' Her voice turns to ice. 'Fabricating evidence against a grieving partner in front of another police officer? Graves, arrest this incompetent maniac before this creature desecrates Aurelia\'s remains any further!' Graves steps between you with his hand on his revolver.",
      action: (state) => {
        state.damageMorale(2);
      },
      options: [
        {
          text: '"This isn\'t over, Vivienne."',
          action: 'close_dialogue'
        }
      ]
    },

    // --- ENDINGS ---
    ending_arrest: {
      speaker: 'Case Concluded: The Letter of the Law',
      avatar: '⚖️',
      text: "You snap the cold steel manacles around Vivienne Vance's wrists. Inspector Graves stares in awe and grudging respect as you hand him the poisoned ivory queen. The law has been served. Tomorrow the newspapers will proclaim the brilliance of Precinct 4. But as you walk down into the rain, you wonder if justice was truly done to a woman whose soul died thirty years ago.",
      options: [
        {
          text: '[CASE CLOSED: View Case Summary Dossier]',
          action: 'trigger_victory'
        }
      ]
    },

    
    examine_gantry_lantern: {
      speaker: 'Alchemical Lantern Catwalk',
      avatar: '🏮',
      text: "A cold draft rushes through the high iron grating. Shards of amber chemical glass crunch beneath your boot. Etched into a broken neck piece is the Grand Syndicate's mercury serpent seal.",
      voices: [
        {
          voice: 'Ratio',
          color: 'var(--color-intellect)',
          badge: 'RATIO [Intellect]',
          text: "This confirms a clandestine drop hours before the death. The Syndicate delivered the chemical precursors directly to this tower."
        }
      ],
      action: (state) => {
        state.addClue({
          id: 'clue_shattered_reagents',
          title: 'Shattered Reagents & Syndicate Crest',
          desc: 'Discovered on the lantern catwalk. Chemical glass vials bearing the Grand Syndicate mercury seal, confirming delivery hours before death.'
        });
        state.gainXp(25);
      },
      options: [
        {
          id: 'lantern_opt_back',
          text: '[Step back down to the main floor]',
          action: 'close_dialogue'
        }
      ]
    },

    examine_chime_bell: {
      speaker: 'Colossal Bell & Acoustic Escapement',
      avatar: '🔔',
      text: "You look up into the cavernous rim of the eight-ton bronze bell. Tied to the heavy iron clapper is a taut piano wire running through tiny brass pulleys down to the pendulum latch.",
      voices: [
        {
          voice: 'Reflex',
          color: 'var(--color-motorics)',
          badge: 'REFLEX [Motorics]',
          text: "Ingenious acoustics. When the clock struck 03:42, the vibration and swing of the clapper yanked the tripwire, releasing the fatal counterweight automatically."
        }
      ],
      action: (state) => {
        state.addClue({
          id: 'clue_acoustic_tripwire',
          title: 'Acoustic Resonance Tripwire Mechanism',
          desc: 'Fastened inside the Saint Irene bronze bell. It explains how the pendulum was mechanically tripped precisely on the 42nd minute stroke.'
        });
        state.gainXp(25);
      },
      options: [
        {
          id: 'chime_opt_back',
          text: '[Step down from the bell housing]',
          action: 'close_dialogue'
        }
      ]
    },

    ending_syndicate_bust: {
      speaker: 'The Revolutionary Firebrand',
      avatar: '🔥',
      text: "You refuse Graves's bribes and Vivienne's fatalism. At dawn, you hand the Perpetuum Ledger and the Syndicate bribery slips directly to the clandestine printing press of the District 7 Worker's Union. By midday, 50,000 gazettes hit the cobblestones. The corrupt precinct captain is ousted, the cartel's factories are paralyzed by general strike, and the truth of Aurelia Vance becomes an indelible spark of liberation.",
      action: (state) => {
        state.flags.case_solved = true;
        state.flags.ending_type = 'syndicate_bust';
      },
      options: [
        {
          text: '[CASE CONCLUDED: View Final Case Dossier]',
          action: 'trigger_victory'
        }
      ]
    },

    ending_coverup: {
      speaker: 'Case Concluded: The Sovereign Bureaucrat',
      avatar: '🌫️',
      text: "You slide the Perpetuum Ledger into your inner coat pocket and slip the cyanide ampoule into your pocket. You look Graves in the eye and say, 'Industrial grease on the catwalk. Aurelia slipped. Stamp the papers.' Vivienne looks at you through her veil with tears of disbelief. You walk out into the dawn of District 7, not as an officer of the law, but as an architect of mercy.",
      options: [
        {
          text: '[CASE CLOSED: View Case Summary Dossier]',
          action: 'trigger_victory'
        }
      ]
    }
  }
};

// ============================================================================
// MULTI-CASE ARCHIVE & GRAND CONSPIRACY DOSSIER SYSTEM
// ============================================================================
const ALL_CASES_ARCHIVE = [
  {
    id: 'case_d4_01',
    code: '#D4-01/DRF',
    status: 'solved',
    icon: '🌊',
    date: '14 Oct 1926 · 23:15',
    titleKey: 'case_01_title',
    victimKey: 'case_01_victim',
    locationKey: 'case_01_loc',
    summaryKey: 'case_01_summary',
    keystoneNameKey: 'case_01_keystone_name',
    keystoneDescKey: 'case_01_keystone_desc',
    keystoneIcon: '📜',
    isKeystoneUnlocked: () => true
  },
  {
    id: 'case_d4_02',
    code: '#D4-02/ARS',
    status: 'solved',
    icon: '🔥',
    date: '28 Oct 1926 · 02:40',
    titleKey: 'case_02_title',
    victimKey: 'case_02_victim',
    locationKey: 'case_02_loc',
    summaryKey: 'case_02_summary',
    keystoneNameKey: 'case_02_keystone_name',
    keystoneDescKey: 'case_02_keystone_desc',
    keystoneIcon: '📄',
    isKeystoneUnlocked: () => true
  },
  {
    id: 'case_d4_03',
    code: '#D4-03/TNC',
    status: 'solved',
    icon: '🧪',
    date: '02 Nov 1926 · 19:10',
    titleKey: 'case_03_title',
    victimKey: 'case_03_victim',
    locationKey: 'case_03_loc',
    summaryKey: 'case_03_summary',
    keystoneNameKey: 'case_03_keystone_name',
    keystoneDescKey: 'case_03_keystone_desc',
    keystoneIcon: '🩸',
    isKeystoneUnlocked: () => true
  },
  {
    id: 'case_d4_04',
    code: '#D4-04/HOR',
    status: 'active',
    icon: '⏳',
    dateKey: 'case_date_today',
    date: 'Today · 03:42 AM',
    titleKey: 'case_04_title',
    victimKey: 'case_04_victim',
    locationKey: 'case_04_loc',
    summaryKey: 'case_04_summary',
    keystoneNameKey: 'case_04_keystone_name',
    keystoneDescKey: 'case_04_keystone_desc',
    keystoneIcon: '🗝️',
    isKeystoneUnlocked: (state) => !!(state && (state.hasClue('clue_confession_full') || state.hasClue('clue_perpetuum_ledger') || (state.flags && state.flags.case_solved)))
  },
  {
    id: 'case_prime_omega',
    code: '#PRIME-00/OMEGA',
    status: 'master',
    icon: '👑',
    dateKey: 'case_date_final',
    date: 'Grand Synthesis',
    titleKey: 'case_omega_title',
    victimKey: 'case_omega_victim',
    locationKey: 'case_omega_loc',
    summaryKey: 'case_omega_summary',
    keystoneNameKey: 'case_omega_keystone_name',
    keystoneDescKey: 'case_omega_keystone_desc',
    keystoneIcon: '⚖️',
    isKeystoneUnlocked: (state) => !!(state && state.flags && state.flags.case_solved)
  }
];


// --- END: cases.js ---

// --- BEGIN: state.js ---
// Aenigma Central Game State & Reactive Store

const STORAGE_KEY = 'aenigma_detective_save_v1';
const LANG_STORAGE_KEY = 'aenigma_language_preference';

class GameState {
  constructor() {
    this.listeners = [];
    const savedLang = localStorage.getItem(LANG_STORAGE_KEY);
    const validLangs = ['en', 'id', 'zh', 'ja', 'ko'];
    this.currentLanguage = validLangs.includes(savedLang) ? savedLang : 'en';
    this.reset();
  }

  reset() {
    this.detective = {
      name: 'Renata Vance',
      alias: 'The Dissolute Inspector',
      gender: 'female',
      archetype: 'The Sensitive',
      signatureSkill: 'esoterica',
      vice: 'Chain-Smoker of Astra Red',
      portrait: 'assets/portrait_female.jpg',
      health: 4,
      maxHealth: 4,
      morale: 4,
      maxMorale: 4,
      level: 1,
      skillPoints: 0,
      xp: 0,
      attributes: {
        intellect: 4,
        psyche: 5,
        physique: 2,
        motorics: 3
      },
      skills: {
        // Intellect
        logic: 4,
        encyclopedia: 3,
        conceptualization: 4,
        rhetoric: 3,
        // Psyche
        empathy: 4,
        esoterica: 5, // Signature
        authority: 3,
        suggestion: 3,
        // Physique
        endurance: 2,
        painThreshold: 2,
        electrochemistry: 3,
        physicalInstrument: 1,
        // Motorics
        perception: 4,
        handEyeCoord: 3,
        savoirFaire: 2,
        interfacing: 3
      }
    };

    this.time = {
      day: 1,
      hour: 4,
      minute: 20,
      weather: 'Cold Rain & Fog'
    };

    this.inventory = [
      {
        id: 'detective_badge',
        name: 'Tarnished Precinct 4 Badge',
        type: 'tool',
        description: 'Bent silver badge with the imperial scales scratched off. Flashing it commands obedience in desperate alleys.',
        icon: '🛡️',
        bonus: { authority: 1 },
        isUsable: true,
        useLabel: 'flash'
      },
      {
        id: 'astra_cigarettes',
        name: 'Pack of Astra Red Filterless',
        type: 'consumable',
        description: 'Cheap, pungent sulfur-cured tobacco from the southern docks. Calms the frayed nerves of an insomniac.',
        icon: '🚬',
        uses: 3,
        effect: { morale: 2, health: -1 },
        isUsable: true,
        useLabel: 'smoke'
      },
      {
        id: 'medicinal_flask',
        name: 'Medicinal Laudanum Tincture',
        type: 'consumable',
        description: 'Dark amber sedative liquid. Numbs severe physical trauma and sharpens occult perception.',
        icon: '🧪',
        uses: 2,
        effect: { health: 2, morale: 0 },
        isUsable: true,
        useLabel: 'drink'
      },
      {
        id: 'magnifying_loupe',
        name: 'Horologist Monocle Loupe',
        type: 'tool',
        description: 'Brass loupe with triple-ground achromatic lens. Exposes micro-scratches and hidden alchemical hallmarks.',
        icon: '🔍',
        bonus: { perception: 2, interfacing: 1 },
        isUsable: true,
        useLabel: 'equip'
      }
    ];

    this.clues = [];

    // Thought Cabinet ("Lemari Pikiran")
    this.thoughtCabinet = {
      maxSlots: 4,
      activeSlotIndex: null,
      known: [], // Unlocked thoughts available to internalize
      internalizing: [], // Currently cooking: { id, progress, totalTicks }
      internalized: [] // Completed thoughts with permanent buffs
    };

    // Progression Flags & Check History
    this.flags = {
      scene_examined_pendulum: false,
      scene_examined_pocketwatch: false,
      scene_examined_balcony: false,
      scene_examined_ledger: false,
      graves_interrogated: false,
      madame_interrogated: false,
      case_solved: false,
      badge_flashed: false,
      corpse_micro_examined: false
    };

    this.resolvedChecks = {}; // checkId: { status: 'passed'|'failed', timestamp }
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
  }

  markChoiceVisited(key) {
    if (!key) return;
    this.visitedChoices[key] = Date.now();
    this.save();
    this.notify('choice_visited', key);
  }

  isChoiceVisited(key) {
    if (!key) return false;
    return !!this.visitedChoices[key];
  }

  getProgressPercentage() {
    const cluesCount = this.clues ? this.clues.length : 0;
    const thoughtsDone = (this.thoughtCabinet && Array.isArray(this.thoughtCabinet.internalized)) ? this.thoughtCabinet.internalized.length : 0;
    const checksPassed = Object.values(this.resolvedChecks || {}).filter(c => c && c.status === 'passed').length;
    const choicesCount = Object.keys(this.visitedChoices || {}).length;

    // Progress scale 0-100%
    const score = (cluesCount * 7) + (checksPassed * 4) + (thoughtsDone * 4) + Math.round(choicesCount * 0.8);
    return Math.min(100, Math.max(5, Math.round(score)));
  }

  setLanguage(lang) {
    this.currentLanguage = lang;
    localStorage.setItem(LANG_STORAGE_KEY, lang);
    this.notify('language_changed', lang);
  }

  // Subscribe to changes
  subscribe(fn) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  notify(event, payload) {
    this.listeners.forEach(fn => fn(event, payload, this));
  }

  // Time advancement
  advanceTime(minutes = 15) {
    this.time.minute += minutes;
    while (this.time.minute >= 60) {
      this.time.minute -= 60;
      this.time.hour += 1;
      if (this.time.hour >= 24) {
        this.time.hour = 0;
        this.time.day += 1;
      }
    }
    // Tick Thought Cabinet progression
    this.tickThoughts();
    this.notify('time_advanced', this.time);
  }

  // Damage & Healing with dynamic horror heartbeat
  damageHealth(amount = 1) {
    this.detective.health = Math.max(0, this.detective.health - amount);
    this.notify('health_changed', { current: this.detective.health, max: this.detective.maxHealth, delta: -amount });
    this.checkSurvivalState();
    if (this.detective.health <= 0) {
      this.triggerGameOver('physical', 'Cardiac Arrest / Physical Collapse');
    }
  }

  healHealth(amount = 1) {
    this.detective.health = Math.min(this.detective.maxHealth, this.detective.health + amount);
    this.notify('health_changed', { current: this.detective.health, max: this.detective.maxHealth, delta: amount });
    this.checkSurvivalState();
  }

  damageMorale(amount = 1) {
    this.detective.morale = Math.max(0, this.detective.morale - amount);
    this.notify('morale_changed', { current: this.detective.morale, max: this.detective.maxMorale, delta: -amount });
    this.checkSurvivalState();
    if (this.detective.morale <= 0) {
      this.triggerGameOver('psychological', 'Existential Psychosis & Breakdown');
    }
  }

  healMorale(amount = 1) {
    this.detective.morale = Math.min(this.detective.maxMorale, this.detective.morale + amount);
    this.notify('morale_changed', { current: this.detective.morale, max: this.detective.maxMorale, delta: amount });
    this.checkSurvivalState();
  }

  checkSurvivalState() {
    const isCritical = this.detective.health <= 2 || this.detective.morale <= 2;
    if (typeof audio !== 'undefined' && audio && audio.setHeartbeatActive) {
      audio.setHeartbeatActive(isCritical);
    }
    if (document.body) {
      if (isCritical) {
        document.body.classList.add('in-danger');
      } else {
        document.body.classList.remove('in-danger');
      }
    }
  }

  triggerGameOver(type = 'physical', reason = 'Fatal Failure', customDescription = null) {
    if (typeof audio !== 'undefined' && audio && audio.setHeartbeatActive) {
      audio.setHeartbeatActive(false);
    }
    this.notify('game_over', {
      type,
      reason,
      description: customDescription
    });
  }

  // Get total effective skill including signature, equipment & internalized thoughts
  getSkillTotal(skillName) {
    let base = this.detective.skills[skillName] || 1;
    if (this.detective.signatureSkill === skillName) {
      base += 2;
    }
    // Temporary buffs
    if (skillName === 'authority' && this.flags.badge_flashed) {
      base += 2;
    }
    // Inventory equipment bonuses
    this.inventory.forEach(item => {
      if (item.bonus && item.bonus[skillName]) {
        base += item.bonus[skillName];
      }
    });
    // Thought cabinet bonuses
    this.thoughtCabinet.internalized.forEach(t => {
      if (t.buffs && t.buffs[skillName]) {
        base += t.buffs[skillName];
      }
    });
    return Math.max(1, base);
  }

  // Add XP and level up
  gainXP(amount = 20) {
    this.detective.xp += amount;
    if (this.detective.xp >= 100) {
      this.detective.xp -= 100;
      this.detective.level += 1;
      this.detective.skillPoints += 1;
      this.notify('level_up', { level: this.detective.level, points: this.detective.skillPoints });
    }
    this.notify('xp_gained', { xp: this.detective.xp });
  }

  // Inventory actions
  addItem(item) {
    if (!this.inventory.find(i => i.id === item.id)) {
      // Ensure usability flags
      if (['astra_cigarettes', 'medicinal_flask', 'broken_pocketwatch', 'magnifying_loupe', 'perpetuum_ledger', 'poison_chess_queen', 'detective_badge'].includes(item.id)) {
        item.isUsable = true;
      }
      this.inventory.push(item);
      this.notify('item_added', item);
    }
  }

  useItem(itemId) {
    const item = this.inventory.find(i => i.id === itemId);
    if (!item) return;

    if (itemId === 'astra_cigarettes') {
      // Light cigarette: +2 Morale, -1 Health
      if (typeof audio !== 'undefined' && audio.playCigaretteSmoke) audio.playCigaretteSmoke();
      this.healMorale(2);
      this.damageHealth(1);
      item.uses = (item.uses || 1) - 1;
      if (item.uses <= 0) {
        this.inventory = this.inventory.filter(i => i.id !== itemId);
      }
      this.notify('item_used', {
        item,
        msgId: 'smoke_puff',
        desc: 'Asap belerang meredakan kepanikan saraf (+2 Kewarasan, -1 Daya Tahan).'
      });
      this.unlockThought('nicotine_shroud');

    } else if (itemId === 'medicinal_flask') {
      // Drink laudanum: +2 Health, numbs trauma
      if (typeof audio !== 'undefined' && audio.playMedicineDrink) audio.playMedicineDrink();
      this.healHealth(2);
      this.detective.skills.esoterica = (this.detective.skills.esoterica || 3) + 1;
      item.uses = (item.uses || 1) - 1;
      if (item.uses <= 0) {
        this.inventory = this.inventory.filter(i => i.id !== itemId);
      }
      this.notify('item_used', {
        item,
        msgId: 'laudanum_drink',
        desc: 'Tinktur laudanum menumpulkan rasa sakit fisik (+2 Daya Tahan, +1 Esoterika).'
      });

    } else if (itemId === 'broken_pocketwatch') {
      // Inspect watch movement: reveals safe cipher "7-3-12"
      if (typeof audio !== 'undefined' && audio.playWatchInspect) audio.playWatchInspect();
      this.addClue({
        id: 'clue_watch_code',
        title: 'Floorboard Safe Combination (7-3-12)',
        desc: 'The victim inscribed the safe code inside her watch balance cock, linking it to Madame Vivienne Vance.'
      });
      this.notify('item_used', {
        item,
        msgId: 'watch_gears',
        desc: 'Mekanisme jam terbuka! Ukiran sandi brankas terungkap: "7 - 3 - 12".'
      });

    } else if (itemId === 'magnifying_loupe') {
      // Equip loupe: boosts perception and inspects victim's neck
      if (typeof audio !== 'undefined' && audio.playUiClick) audio.playUiClick();
      this.flags.corpse_micro_examined = true;
      this.addClue({
        id: 'clue_needle_puncture',
        title: 'Microscopic Cyanide Puncture',
        desc: 'Precision magnification reveals a tiny blue puncture wound on Aurelia\'s neck, confirming lethal injection before the fall.'
      });
      this.notify('item_used', {
        item,
        msgId: 'loupe_equipped',
        desc: 'Lensa presisi terpasang! Terungkap luka tusuk jarum mikroskopis beracun di leher korban.'
      });

    } else if (itemId === 'perpetuum_ledger') {
      // Read ledger: reveals Syndicate payoffs
      if (typeof audio !== 'undefined' && audio.playBookRead) audio.playBookRead();
      this.addClue({
        id: 'clue_syndicate_bribe',
        title: 'Syndicate Payoff Ledger',
        desc: 'Records prove Vivienne Vance accepted 50,000 guilders to deliver Aurelia\'s delay-detonation blueprints.'
      });
      this.gainXP(50);
      this.notify('item_used', {
        item,
        msgId: 'ledger_read',
        desc: 'Buku besar terbaca! Catatan suap rahasia Sindikat kepada Vivienne terungkap (+50 XP).'
      });

    } else if (itemId === 'poison_chess_queen') {
      // Unscrew hollow queen: reveals spring needle
      if (typeof audio !== 'undefined' && audio.playWatchInspect) audio.playWatchInspect();
      this.addClue({
        id: 'clue_poison_mechanism',
        title: 'Spring-Loaded Needle Mechanism',
        desc: 'The ivory queen conceals a pressurized needle chamber loaded with fatal prussic acid.'
      });
      this.notify('item_used', {
        item,
        msgId: 'queen_unscrewed',
        desc: 'Dasar ratu catur terbuka! Jarum pegas mematikan berisi racun asam prusat terungkap.'
      });

    } else if (itemId === 'detective_badge') {
      // Flash badge: +2 Authority bonus
      if (typeof audio !== 'undefined' && audio.playUiClick) audio.playUiClick();
      this.flags.badge_flashed = true;
      this.notify('item_used', {
        item,
        msgId: 'badge_flashed',
        desc: 'Lencana dikilaskan! Wibawa detektif meningkat (+2 Otoritas pada percakapan).'
      });
    }
  }

  // Clues
  addClue(clue) {
    if (!this.clues.find(c => c.id === clue.id)) {
      this.clues.push(clue);
      this.gainXP(25);
      this.notify('clue_added', clue);
    }
  }

  hasClue(clueId) {
    if (!this.clues) return false;
    return this.clues.some(c => c && c.id === clueId);
  }

  hasItem(itemId) {
    if (!this.inventory) return false;
    return this.inventory.some(i => i && i.id === itemId);
  }

  gainXp(amount = 20) {
    return this.gainXP(amount);
  }

  // Thought Cabinet Methods
  unlockThought(thoughtKey) {
    let thought = null;
    if (typeof thoughtKey === 'string') {
      if (typeof THOUGHTS_CATALOG !== 'undefined') {
        thought = THOUGHTS_CATALOG.find(t => t.id === thoughtKey);
      }
    } else {
      thought = thoughtKey;
    }
    if (!thought) return;

    const alreadyKnown = this.thoughtCabinet.known.find(t => t.id === thought.id);
    const isCooking = this.thoughtCabinet.internalizing.find(t => t.id === thought.id);
    const isDone = this.thoughtCabinet.internalized.find(t => t.id === thought.id);

    if (!alreadyKnown && !isCooking && !isDone) {
      this.thoughtCabinet.known.push({ ...thought });
      this.notify('thought_unlocked', thought);
    }
  }

  startInternalizing(thoughtId) {
    if (this.thoughtCabinet.internalizing.length >= this.thoughtCabinet.maxSlots) {
      return { success: false, reason: 'Semua slot pikiran dalam benakmu sudah terisi penuh.' };
    }
    const idx = this.thoughtCabinet.known.findIndex(t => t.id === thoughtId);
    if (idx === -1) return { success: false, reason: 'Pikiran belum ditemukan.' };

    const thought = this.thoughtCabinet.known.splice(idx, 1)[0];
    thought.progress = 0;
    this.thoughtCabinet.internalizing.push(thought);
    this.notify('thought_started', thought);
    return { success: true };
  }

  tickThoughts() {
    const finished = [];
    this.thoughtCabinet.internalizing.forEach(t => {
      t.progress += 1;
      if (t.progress >= t.requiredTicks) {
        finished.push(t);
      }
    });

    finished.forEach(t => {
      this.thoughtCabinet.internalizing = this.thoughtCabinet.internalizing.filter(item => item.id !== t.id);
      this.thoughtCabinet.internalized.push(t);
      this.notify('thought_internalized', t);
    });
  }

  // Persistence
  save() {
    try {
      const data = {
        detective: this.detective,
        time: this.time,
        inventory: this.inventory,
        clues: this.clues,
        thoughtCabinet: this.thoughtCabinet,
        flags: this.flags,
        resolvedChecks: this.resolvedChecks,
        visitedChoices: this.visitedChoices,
        currentLanguage: this.currentLanguage
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      this.notify('saved');
      return true;
    } catch (e) {
      console.error('Failed to save state:', e);
      return false;
    }
  }

  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return false;
      const data = JSON.parse(raw);
      this.detective = data.detective;
      this.time = data.time;
      this.inventory = data.inventory;
      this.clues = data.clues;
      this.thoughtCabinet = data.thoughtCabinet;
      this.flags = data.flags;
      this.resolvedChecks = data.resolvedChecks || {};
      this.visitedChoices = data.visitedChoices || {};
      if (data.currentLanguage) this.currentLanguage = data.currentLanguage;
      this.notify('loaded');
      return true;
    } catch (e) {
      console.error('Failed to load state:', e);
      return false;
    }
  }
}

const state = new GameState();

// --- END: state.js ---

// --- BEGIN: dice.js ---
// Aenigma 2D6 Skill Check Engine

class DiceEngine {
  constructor(state) {
    this.state = state;
  }

  // Exact 2D6 probability calculation given bonus and target
  calculateSuccessProbability(skillBonus, targetDifficulty) {
    // Required roll on 2D6 = targetDifficulty - skillBonus
    const needed = targetDifficulty - skillBonus;
    if (needed <= 2) return 97.2; // Boxcars always succeed, snake eyes always fail (35/36 = 97.2%)
    if (needed > 12) return 2.8;  // Only boxcars succeed (1/36 = 2.8%)

    // Count favorable combinations on 2D6
    let favorable = 0;
    for (let d1 = 1; d1 <= 6; d1++) {
      for (let d2 = 1; d2 <= 6; d2++) {
        if (d1 === 1 && d2 === 1) continue; // Snake eyes always fail
        if (d1 === 6 && d2 === 6) {
          favorable++; // Boxcars always succeed
          continue;
        }
        if (d1 + d2 >= needed) {
          favorable++;
        }
      }
    }
    return Math.round((favorable / 36) * 1000) / 10;
  }

  // Execute a check
  rollCheck({
    checkId,
    type = 'white', // 'white' | 'red'
    skill,
    difficulty,
    label,
    clueBonus = 0
  }) {
    // Check if red check already attempted
    if (type === 'red' && this.state.resolvedChecks[checkId]) {
      return {
        alreadyResolved: true,
        passed: this.state.resolvedChecks[checkId].status === 'passed'
      };
    }

    const skillBonus = this.state.getSkillTotal(skill);
    const totalBonus = skillBonus + clueBonus;
    
    // Physical random roll
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    const diceSum = d1 + d2;
    const totalScore = diceSum + totalBonus;

    let isCriticalSuccess = false;
    let isCriticalFailure = false;
    let passed = false;

    if (d1 === 1 && d2 === 1) {
      isCriticalFailure = true;
      passed = false;
    } else if (d1 === 6 && d2 === 6) {
      isCriticalSuccess = true;
      passed = true;
    } else {
      passed = totalScore >= difficulty;
    }

    // Audio cue
    audio.playDiceRoll();
    setTimeout(() => {
      if (passed) audio.playSuccess();
      else audio.playFailure();
    }, 700);

    // Record resolution in state
    this.state.resolvedChecks[checkId] = {
      status: passed ? 'passed' : 'failed',
      score: totalScore,
      timestamp: Date.now()
    };

    if (passed) {
      this.state.gainXP(30);
    } else {
      // Psychological penalty on tough red check failure
      if (type === 'red') {
        this.state.damageMorale(1);
      }
    }

    return {
      checkId,
      type,
      skill,
      difficulty,
      label,
      d1,
      d2,
      diceSum,
      skillBonus,
      clueBonus,
      totalBonus,
      totalScore,
      passed,
      isCriticalSuccess,
      isCriticalFailure
    };
  }
}

// --- END: dice.js ---

// --- BEGIN: ui.js ---
// Aenigma Master UI Controller & Interaction Engine

class UIController {
  constructor(state) {
    this.state = state;
    this.caseData = CASE_DATA;
    this.diceEngine = new DiceEngine(state);
    this.currentNodeId = null;
    this.currentInterlocutor = 'Forensic Observation';
    this.activePoi = null;
    this.activeCaseTab = 'active';

    this.initElements();
    this.initLanguageSelector();
    this.bindEvents();
    this.applyLanguage(this.state.currentLanguage);
  }

  initElements() {
    // Stage views
    this.loadingStage = document.getElementById('loading-stage');
    this.creatorStage = document.getElementById('creator-stage');
    this.gameStage = document.getElementById('main-game-stage') || document.getElementById('app-container');

    // Modals
    this.cabinetModal = document.getElementById('cabinet-modal');
    this.inventoryModal = document.getElementById('inventory-modal');
    this.cluesModal = document.getElementById('clues-modal');
    this.diceModal = document.getElementById('dice-modal');
    this.victoryModal = document.getElementById('victory-modal');
    this.languageModal = document.getElementById('language-modal');
    this.gameoverModal = document.getElementById('gameover-modal');
    this.profileModal = document.getElementById('profile-modal');

    // Header buttons & preview stats
    this.hudBtnProfile = document.getElementById('hud-btn-profile');
    this.hudBtnCase = document.getElementById('hud-btn-case');
    this.hudHpPreview = document.getElementById('hud-hp-preview');
    this.hudSpPreview = document.getElementById('hud-sp-preview');
    this.hudAvatarImg = document.getElementById('hud-avatar-img');
    this.detNameEl = document.getElementById('hud-detective-name');
    this.detAliasEl = document.getElementById('hud-detective-alias');
    this.healthPipsContainer = document.getElementById('health-pips');
    this.moralePipsContainer = document.getElementById('morale-pips');
    this.hudTimeEl = document.getElementById('hud-time-display');

    // Scene & Dialogue
    this.sceneCanvas = document.getElementById('scene-markers-layer');
    this.dialogueFeed = document.getElementById('dialogue-feed');
    this.dialogueChoices = document.getElementById('dialogue-choices');
    this.interlocutorNameEl = document.getElementById('current-speaker-title');

    // Modals content containers
    this.thoughtNodesContainer = document.getElementById('thought-nodes-container');
    this.thoughtInspector = document.getElementById('thought-inspector');
    this.inventoryContainer = document.getElementById('inventory-items-container');
    this.cluesContainer = document.getElementById('clues-list-container');
    this.caseBoardContent = document.getElementById('case-board-content');
    this.caseBoardTabBar = document.getElementById('case-board-tab-bar');
    this.toastContainer = document.getElementById('notification-toast-container');
  }

  initLanguageSelector() {
    // Nav & stage language trigger buttons
    document.getElementById('nav-btn-language')?.addEventListener('click', () => {
      this.openLanguageModal();
    });
    document.getElementById('loader-lang-btn')?.addEventListener('click', () => {
      this.openLanguageModal();
    });
    document.getElementById('creator-lang-btn')?.addEventListener('click', () => {
      this.openLanguageModal();
    });

    // Game over restart button
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
      this.dialogueChoices.innerHTML = `<div style="color:var(--text-muted);font-style:italic;padding:12px;">${t('scene_location', this.state.currentLanguage)}</div>`;
    });
  }

  openLanguageModal() {
    this.openModal(this.languageModal);
    this.renderLanguageList();
  }

  renderLanguageList() {
    const grid = document.getElementById('language-options-grid');
    if (!grid) return;
    grid.innerHTML = '';

    SUPPORTED_LANGUAGES.forEach(langObj => {
      const card = document.createElement('div');
      card.className = `lang-card ${this.state.currentLanguage === langObj.code ? 'active' : ''}`;
      card.innerHTML = `
        <span class="lang-flag">${langObj.flag}</span>
        <div class="lang-names">
          <span class="lang-native">${langObj.native}</span>
          <span class="lang-code">${langObj.name} · [${langObj.code.toUpperCase()}]</span>
        </div>
      `;
      card.addEventListener('click', () => {
        audio.playRadioTune();
        this.state.setLanguage(langObj.code);
        this.applyLanguage(langObj.code);
        this.closeModal(this.languageModal);
        this.showToast(`🌐 ${t('modal_language_title', langObj.code)}: ${langObj.native}`);
      });
      grid.appendChild(card);
    });
  }

  applyLanguage(lang) {
    const currentLang = UI_TRANSLATIONS[lang] ? lang : 'en';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = (currentLang === 'ar') ? 'rtl' : 'ltr';

    // Update active language labels in buttons
    const langObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLang) || SUPPORTED_LANGUAGES[0];
    const langLabel = document.getElementById('current-lang-label');
    if (langLabel) {
      langLabel.textContent = `${t('nav_language', currentLang).toUpperCase()}: ${langObj.native.toUpperCase()}`;
    }
    document.querySelectorAll('.stage-lang-btn .lang-label').forEach(el => {
      el.textContent = langObj.native.toUpperCase();
    });

    // Update Stage 1 texts
    const quoteEl = document.getElementById('loader-quote-text');
    if (quoteEl) quoteEl.textContent = t('loader_quote', currentLang);
    const telemetryEl = document.getElementById('loader-telemetry-text');
    if (telemetryEl) telemetryEl.textContent = t('loader_telemetry', currentLang);
    const enterBtn = document.getElementById('loader-enter-btn');
    if (enterBtn) enterBtn.textContent = t('loader_enter', currentLang);

    // Update Stage 2 Character Creator texts
    const creatorTitle = document.getElementById('creator-dossier-title') || document.querySelector('.creator-section-title span:first-child');
    if (creatorTitle) creatorTitle.textContent = t('creator_title', currentLang);
    const creatorSub = document.getElementById('creator-dossier-subtitle') || document.querySelector('.creator-section-title span:last-child');
    if (creatorSub) creatorSub.textContent = t('creator_subtitle', currentLang);
    const precinctSubtext = document.getElementById('creator-precinct-subtext');
    if (precinctSubtext) precinctSubtext.textContent = t('precinct_label', currentLang);
    const nameLabel = document.getElementById('creator-name-label');
    if (nameLabel) nameLabel.textContent = t('name_label', currentLang);
    const aliasLabel = document.getElementById('creator-alias-label');
    if (aliasLabel) aliasLabel.textContent = t('alias_label', currentLang);
    const facetsTitle = document.getElementById('creator-facets-title');
    if (facetsTitle) facetsTitle.textContent = t('facets_title', currentLang);
    const pointsPool = document.getElementById('creator-points-pool');
    if (pointsPool) {
      const match = pointsPool.textContent.match(/\d+/);
      const pts = match ? match[0] : '4';
      pointsPool.textContent = `${pts} ${t('points_available', currentLang)}`;
    }

    // Attributes labels & descriptions
    const attrPairs = [
      { id: 'intellect', name: 'intellect_name', desc: 'intellect_desc' },
      { id: 'psyche', name: 'psyche_name', desc: 'psyche_desc' },
      { id: 'physique', name: 'physique_name', desc: 'physique_desc' },
      { id: 'motorics', name: 'motorics_name', desc: 'motorics_desc' }
    ];
    attrPairs.forEach(a => {
      const nameEl = document.getElementById(`attr-name-${a.id}`);
      if (nameEl) nameEl.textContent = t(a.name, currentLang);
      const descEl = document.getElementById(`attr-desc-${a.id}`);
      if (descEl) descEl.textContent = t(a.desc, currentLang);
    });

    // Signature skill section
    const sigTitle = document.getElementById('creator-signature-title');
    if (sigTitle) sigTitle.textContent = t('signature_title', currentLang);
    const skillIcons = { esoterica: '🔮', logic: '🟦', empathy: '💜', perception: '👁️', endurance: '🩸', authority: '⚖️' };
    document.querySelectorAll('.sig-skill-btn').forEach(btn => {
      const skillKey = btn.dataset.skill;
      if (skillKey) {
        const icon = skillIcons[skillKey] || '✨';
        btn.textContent = `${icon} ${tSkill(skillKey, currentLang).toUpperCase()}`;
      }
    });

    // Vices section
    const vicesTitle = document.getElementById('creator-vices-title');
    if (vicesTitle) vicesTitle.textContent = t('vices_title', currentLang);
    document.querySelectorAll('.vice-card').forEach(card => {
      const vKey = card.dataset.vice;
      if (vKey) {
        const vTitle = card.querySelector('.vice-title');
        if (vTitle) vTitle.textContent = tVice(vKey, 'title', currentLang);
        const vDesc = card.querySelector('.vice-desc');
        if (vDesc) vDesc.textContent = tVice(vKey, 'desc', currentLang);
      }
    });

    const btnFemale = document.getElementById('btn-gender-female');
    if (btnFemale) btnFemale.textContent = t('gender_female', currentLang);
    const btnMale = document.getElementById('btn-gender-male');
    if (btnMale) btnMale.textContent = t('gender_male', currentLang);
    const btnRand = document.getElementById('btn-randomize-identity');
    if (btnRand) btnRand.textContent = t('randomize_dossier', currentLang);
    const startInquiryBtn = document.getElementById('creator-start-btn');
    if (startInquiryBtn) startInquiryBtn.textContent = t('start_inquiry', currentLang);

    // Update Header HUD
    const caseBadge = document.querySelector('.case-badge');
    if (caseBadge) caseBadge.textContent = t('case_badge', currentLang);
    const caseBadgeText = document.getElementById('case-badge-text');
    if (caseBadgeText) caseBadgeText.textContent = t('case_badge', currentLang);

    const tabCabinetText = document.getElementById('tab-cabinet-text');
    if (tabCabinetText) tabCabinetText.textContent = t('nav_cabinet', currentLang);
    const tabCluesText = document.getElementById('tab-clues-text');
    if (tabCluesText) tabCluesText.textContent = t('nav_clues', currentLang);
    const tabInvText = document.getElementById('tab-inv-text');
    if (tabInvText) tabInvText.textContent = t('nav_inventory', currentLang);

    const audioLabel = document.getElementById('audio-btn-label');
    if (audioLabel) {
      audioLabel.textContent = audio.isMuted ? t('audio_off', currentLang) : t('audio_on', currentLang);
    }
    const interlocutorStatus = document.getElementById('interlocutor-status-text');
    if (interlocutorStatus) interlocutorStatus.textContent = t('interlocutor_active', currentLang);

    const healthLabel = document.querySelector('.meter-label-row.health span:first-child');
    if (healthLabel) healthLabel.textContent = t('endurance_label', currentLang);
    const moraleLabel = document.querySelector('.meter-label-row.morale span:first-child');
    if (moraleLabel) moraleLabel.textContent = t('morale_label', currentLang);

    // Update Progress Title & Meter
    const progressTitle = document.getElementById('hud-progress-title');
    if (progressTitle) {
      progressTitle.textContent = PROGRESS_LABELS ? (PROGRESS_LABELS[currentLang] || 'PROGRESS') : 'PROGRESS';
    }
    this.updateProgressMeter();

    // Update Scene Overlay
    const sceneLoc = document.querySelector('.scene-location-title');
    if (sceneLoc) sceneLoc.textContent = t('scene_location', currentLang);
    const sceneTime = document.querySelector('.scene-time-stamp');
    if (sceneTime) sceneTime.textContent = t('scene_timestamp', currentLang);
    const hudToggleTitle = document.querySelector('.hud-toggle-title');
    if (hudToggleTitle) hudToggleTitle.textContent = DISTRICT_LABELS ? (DISTRICT_LABELS[currentLang] || 'DISTRICT 7') : 'DISTRICT 7';

    const markersLabel = document.getElementById('toggle-markers-label');
    if (markersLabel) {
      const isHidden = document.getElementById('scene-viewport')?.classList.contains('markers-hidden');
      markersLabel.textContent = isHidden ? t('scene_btn_hidden', currentLang) : t('scene_btn_markers', currentLang);
    }
    const diceTallyLabel = document.getElementById('dice-tally-label');
    if (diceTallyLabel) diceTallyLabel.textContent = t('dice_tally', currentLang);

    // Update Profile Modal Static Labels
    const profTitle = document.getElementById('profile-modal-title');
    if (profTitle) profTitle.textContent = t('profile_modal_title', currentLang);
    const profVitalsTitle = document.getElementById('profile-vitals-title');
    if (profVitalsTitle) profVitalsTitle.textContent = t('profile_vitals_title', currentLang);
    const profProgHeader = document.getElementById('profile-progress-header');
    if (profProgHeader) profProgHeader.textContent = t('profile_progress_header', currentLang);
    const profTimeLabel = document.getElementById('profile-time-label');
    if (profTimeLabel) profTimeLabel.textContent = t('profile_time_label', currentLang);
    const profFacetsTitle = document.getElementById('profile-facets-title');
    if (profFacetsTitle) profFacetsTitle.textContent = t('facets_title', currentLang);
    const profSigLabel = document.getElementById('profile-sig-label');
    if (profSigLabel) profSigLabel.textContent = t('signature_title', currentLang);
    const profViceLabel = document.getElementById('profile-vice-label');
    if (profViceLabel) profViceLabel.textContent = t('vices_title', currentLang);
    const profPrecinctText = document.getElementById('profile-precinct-text');
    if (profPrecinctText) profPrecinctText.textContent = t('precinct_label', currentLang);
    const profHpTitle = document.getElementById('profile-health-title');
    if (profHpTitle) profHpTitle.textContent = `${t('endurance_label', currentLang)} (HP)`;
    const profSpTitle = document.getElementById('profile-morale-title');
    if (profSpTitle) profSpTitle.textContent = `${t('morale_label', currentLang)} (SP)`;
    const profProgTitle = document.getElementById('profile-progress-title');
    if (profProgTitle) profProgTitle.textContent = PROGRESS_LABELS ? (PROGRESS_LABELS[currentLang] || 'PROGRESS') : 'PROGRESS';

    const fIntLabel = document.getElementById('profile-facet-intellect-label');
    if (fIntLabel) fIntLabel.textContent = t('intellect_name', currentLang).toUpperCase();
    const fPsyLabel = document.getElementById('profile-facet-psyche-label');
    if (fPsyLabel) fPsyLabel.textContent = t('psyche_name', currentLang).toUpperCase();
    const fPhyLabel = document.getElementById('profile-facet-physique-label');
    if (fPhyLabel) fPhyLabel.textContent = t('physique_name', currentLang).toUpperCase();
    const fMotLabel = document.getElementById('profile-facet-motorics-label');
    if (fMotLabel) fMotLabel.textContent = t('motorics_name', currentLang).toUpperCase();

    this.renderProfile();

    // Update Modals Titles
    const cabTitle = document.querySelector('#cabinet-modal .modal-title');
    if (cabTitle) cabTitle.textContent = t('modal_cabinet_title', currentLang);
    const invTitle = document.querySelector('#inventory-modal .modal-title');
    if (invTitle) invTitle.textContent = t('modal_inventory_title', currentLang);
    const clueTitle = document.querySelector('#clues-modal .modal-title');
    if (clueTitle) clueTitle.textContent = t('modal_clues_title', currentLang);
    const tabActiveLabel = document.getElementById('tab-case-active-label');
    if (tabActiveLabel) tabActiveLabel.textContent = t('case_tab_active', currentLang);
    const tabArchiveLabel = document.getElementById('tab-case-archive-label');
    if (tabArchiveLabel) tabArchiveLabel.textContent = t('case_tab_archive', currentLang);
    const tabMasterLabel = document.getElementById('tab-case-master-label');
    if (tabMasterLabel) tabMasterLabel.textContent = t('case_tab_master', currentLang);
    if (this.cluesModal && this.cluesModal.classList.contains('open')) {
      this.renderCaseBoard();
    }
    const langModalTitle = document.getElementById('language-modal-title');
    if (langModalTitle) langModalTitle.textContent = t('modal_language_title', currentLang);
    const vicTitle = document.querySelector('#victory-modal .modal-title');
    if (vicTitle) vicTitle.textContent = t('modal_victory_title', currentLang);
    const restartBtn = document.getElementById('btn-restart-inquiry');
    if (restartBtn) restartBtn.textContent = t('btn_restart', currentLang);

    // Refresh dynamic scene markers & tooltips
    this.renderSceneMarkers();

    // Refresh all evidence banners in feed
    this.dialogueFeed.querySelectorAll('.inspection-evidence-banner').forEach(banner => {
      const poiId = banner.dataset.poiId;
      if (poiId) {
        const bTitle = banner.querySelector('.evidence-poi-title');
        if (bTitle) bTitle.textContent = tPoi(poiId, 'title', currentLang);
        const bDesc = banner.querySelector('.evidence-poi-desc');
        if (bDesc) bDesc.textContent = tPoi(poiId, 'description', currentLang);
      }
    });

    // Refresh active dialogue node and all past feed entries
    this.retranslateCurrentDialogue();

    // Refresh open modals
    if (this.inventoryModal && this.inventoryModal.classList.contains('open')) {
      this.renderInventory();
    }
    if (this.cluesModal && this.cluesModal.classList.contains('open')) {
      this.renderClues();
    }
    if (this.cabinetModal && this.cabinetModal.classList.contains('open')) {
      this.renderCabinet();
    }
  }

  retranslateCurrentDialogue() {
    const currentLang = this.state.currentLanguage;

    // Retranslate ALL past dialogue entries in feed
    this.dialogueFeed.querySelectorAll('.dialogue-entry').forEach(entry => {
      const nodeId = entry.dataset.nodeId;
      if (nodeId && this.caseData.dialogueNodes[nodeId]) {
        const baseNode = this.caseData.dialogueNodes[nodeId];
        const node = getLocalizedDialogueNode(nodeId, currentLang, baseNode);
        const speakerLabel = entry.querySelector('.speaker-label');
        if (speakerLabel) speakerLabel.textContent = node.speaker || 'Narrative';
        const prose = entry.querySelector('.speaker-prose');
        if (prose) prose.textContent = node.text;

        const voiceBlocks = entry.querySelectorAll('.inner-voice-block');
        if (node.voices && node.voices.length > 0) {
          node.voices.forEach((v, idx) => {
            if (voiceBlocks[idx]) {
              const badge = voiceBlocks[idx].querySelector('.voice-badge');
              if (badge) badge.textContent = v.badge;
              const voiceProse = voiceBlocks[idx].querySelector('.voice-prose');
              if (voiceProse) voiceProse.textContent = `"${v.text}"`;
            }
          });
        }
      }
    });

    // Update current active interlocutor bar
    if (this.currentNodeId) {
      const baseNode = this.caseData.dialogueNodes[this.currentNodeId];
      if (baseNode) {
        const node = getLocalizedDialogueNode(this.currentNodeId, currentLang, baseNode);
        if (this.interlocutorNameEl) {
          this.interlocutorNameEl.textContent = node.speaker || t('speaker_forensic', currentLang);
        }
        // Re-render active options in current language
        this.renderChoices(node.options);
      }
    } else {
      if (this.interlocutorNameEl) {
        this.interlocutorNameEl.textContent = t('speaker_forensic', currentLang);
      }
      this.dialogueChoices.innerHTML = `<div style="color:var(--text-muted);font-style:italic;padding:12px;">${t('dialogue_idle_prompt', currentLang)}</div>`;
    }
  }

  bindEvents() {
    // Close modal buttons
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal-backdrop');
        if (modal) this.closeModal(modal);
      });
    });

    // Close on backdrop click
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeModal(modal);
      });
    });

    // Tab buttons with tactile paper audio
    document.getElementById('nav-btn-cabinet')?.addEventListener('click', () => {
      audio.playTabSwitch();
      this.openCabinetModal();
    });
    document.getElementById('nav-btn-inventory')?.addEventListener('click', () => {
      audio.playTabSwitch();
      this.openInventoryModal();
    });
    document.getElementById('nav-btn-clues')?.addEventListener('click', () => {
      audio.playTabSwitch();
      this.openCluesModal();
    });
    document.getElementById('nav-btn-audio')?.addEventListener('click', (e) => {
      const isMuted = audio.toggleMute();
      e.currentTarget.classList.toggle('muted', isMuted);
      const label = document.getElementById('audio-btn-label');
      if (label) {
        label.textContent = isMuted ? 'AUDIO: OFF' : 'AUDIO: ON';
      }
    });

    // Collapsible, Transparent & Dismissible Bottom-Left Scene HUD Toggle
    const toggleSceneHudBtn = document.getElementById('btn-toggle-scene-hud');
    const dismissSceneHudBtn = document.getElementById('btn-dismiss-scene-hud');
    const restoreSceneHudBtn = document.getElementById('btn-restore-scene-hud');
    const sceneHud = document.getElementById('scene-overlay-hud');

    if (toggleSceneHudBtn && sceneHud) {
      toggleSceneHudBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sceneHud.classList.toggle('minimized');
        audio.playHudToggle();
      });
      sceneHud.addEventListener('click', (e) => {
        if (e.target.closest('#btn-dismiss-scene-hud')) return;
        if (sceneHud.classList.contains('minimized')) {
          sceneHud.classList.remove('minimized');
          audio.playHudToggle();
        }
      });
    }

    if (dismissSceneHudBtn && sceneHud && restoreSceneHudBtn) {
      dismissSceneHudBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sceneHud.classList.add('dismissed');
        restoreSceneHudBtn.classList.remove('hidden');
        audio.playHudToggle();
      });

      restoreSceneHudBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sceneHud.classList.remove('dismissed');
        sceneHud.classList.remove('minimized');
        restoreSceneHudBtn.classList.add('hidden');
        audio.playHudToggle();
      });
    }

    // Case Board Tabs Switcher
    document.querySelectorAll('.case-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.dataset.tab;
        if (tab) {
          this.activeCaseTab = tab;
          audio.playTabSwitch();
          this.renderCaseBoard();
        }
      });
    });

    // Header Quick Triggers: Profile Dossier & Case Overview
    document.getElementById('hud-btn-profile')?.addEventListener('click', () => {
      audio.playTabSwitch();
      this.openProfileModal();
    });
    document.getElementById('hud-btn-case')?.addEventListener('click', () => {
      audio.playTabSwitch();
      this.openCluesModal();
    });

    // Scene Toolbar Controls: Show/Hide POI Indicators
    const toggleMarkersBtn = document.getElementById('btn-toggle-poi-markers');
    const sceneViewport = document.getElementById('scene-viewport');

    if (toggleMarkersBtn && sceneViewport) {
      toggleMarkersBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = sceneViewport.classList.toggle('markers-hidden');
        toggleMarkersBtn.classList.toggle('active', isHidden);
        const label = document.getElementById('toggle-markers-label');
        if (label) {
          label.textContent = isHidden ? 'HIDDEN' : 'MARKERS';
        }
        audio.playPoiClick();
      });
    }

    // Keyboard Hotkeys: 'M' for Markers toggle
    document.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (e.key === 'm' || e.key === 'M') {
        toggleMarkersBtn?.click();
      }
    });

    // Global subtle audio hover feedback on buttons, choices & interactive nodes
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('.hud-btn, .action-btn-large, .choice-btn, .lang-card, .vice-card, .sig-skill-btn, .thought-node, .stepper-btn, .scene-hud-toggle-btn, .scene-ctrl-chip');
      if (target) {
        audio.playUiHover();
      }
    });

    // State change listeners
    this.state.subscribe((event, payload) => {
      if (event === 'language_changed') {
        this.applyLanguage(payload);
      }
      this.updateHUD();
      const lang = this.state.currentLanguage;
      if (event === 'clue_added') {
        const title = tClue(payload.id, 'title', lang) || payload.title;
        this.showToast(`🔍 ${t('toast_clue_discovered', lang)} ${title}`);
        audio.playDossierStamp();
        setTimeout(() => audio.playDiscovery(), 120);
      } else if (event === 'thought_unlocked') {
        this.showToast(`💡 ${t('toast_thought_unlocked', lang)} "${payload.name}"`);
        audio.playDiscovery();
      } else if (event === 'thought_internalized') {
        this.showToast(`✨ ${t('toast_thought_internalized', lang)} "${payload.name}"`);
        audio.playThoughtInternalize();
      } else if (event === 'item_added') {
        const name = tItem(payload.id, 'name', lang) || payload.name;
        this.showToast(`📦 ${t('toast_item_acquired', lang)} ${name}`);
        audio.playDiscovery();
      } else if (event === 'item_used') {
        const name = tItem(payload.item.id, 'name', lang) || payload.item.name;
        this.showToast(`✨ ${t('toast_item_used', lang)} ${name}\n${payload.desc || ''}`);
        this.renderInventory();
      } else if (event === 'health_changed') {
        if (payload.delta < 0) {
          audio.playDamageHit();
          this.showToast(`🩸 ${t('toast_damage_health', lang)} (${payload.delta} HP)`);
        }
        if (payload.current <= 1) {
          audio.playHeartbeatThump();
        }
      } else if (event === 'morale_changed') {
        if (payload.delta < 0) {
          audio.playMoraleDrain();
          this.showToast(`🧠 ${t('toast_damage_morale', lang)} (${payload.delta} SP)`);
        }
        if (payload.current <= 1) {
          audio.playHeartbeatThump();
        }
      } else if (event === 'game_over') {
        this.showGameOver(payload);
      }
    });
  }

  showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = `<span>${message.replace(/\n/g, '<br>')}</span>`;
    this.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.transition = 'opacity 0.5s';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 500);
    }, 4500);
  }

  openModal(modal) {
    if (!modal) return;
    audio.playUiClick();
    modal.classList.add('open');
  }

  closeModal(modal) {
    if (!modal) return;
    audio.playUiClick();
    modal.classList.remove('open');
  }

  openProfileModal() {
    this.openModal(this.profileModal);
    this.renderProfile();
  }

  renderProfile() {
    if (!this.profileModal) return;
    const lang = this.state.currentLanguage;
    const det = this.state.detective;
    const portraitSrc = det.portrait || (det.gender === 'male' ? 'assets/portrait_male.jpg' : 'assets/portrait_female.jpg');

    const avatarEl = document.getElementById('profile-avatar-img');
    if (avatarEl) avatarEl.src = portraitSrc;
    const nameEl = document.getElementById('profile-name-text');
    if (nameEl) nameEl.textContent = det.name;
    const aliasEl = document.getElementById('profile-alias-text');
    if (aliasEl) aliasEl.textContent = `"${det.alias}"`;
    const precinctEl = document.getElementById('profile-precinct-text');
    if (precinctEl) precinctEl.textContent = t('precinct_label', lang);

    // Time
    const h = String(this.state.time.hour).padStart(2, '0');
    const m = String(this.state.time.minute).padStart(2, '0');
    const timeVal = document.getElementById('profile-time-val');
    if (timeVal) timeVal.textContent = `${t('day_prefix', lang)} ${this.state.time.day} · ${h}:${m}`;

    // Vitals text & pips
    const hpCount = document.getElementById('profile-health-count');
    if (hpCount) hpCount.textContent = `${det.health} / ${det.maxHealth}`;
    const spCount = document.getElementById('profile-morale-count');
    if (spCount) spCount.textContent = `${det.morale} / ${det.maxMorale}`;

    const hpPips = document.getElementById('profile-health-pips');
    if (hpPips) {
      hpPips.innerHTML = '';
      for (let i = 0; i < det.maxHealth; i++) {
        const pip = document.createElement('div');
        pip.className = `segment-pip health ${i < det.health ? 'active' : ''}`;
        hpPips.appendChild(pip);
      }
    }

    const spPips = document.getElementById('profile-morale-pips');
    if (spPips) {
      spPips.innerHTML = '';
      for (let i = 0; i < det.maxMorale; i++) {
        const pip = document.createElement('div');
        pip.className = `segment-pip morale ${i < det.morale ? 'active' : ''}`;
        spPips.appendChild(pip);
      }
    }

    // Progress
    const pct = this.state.getProgressPercentage();
    const progVal = document.getElementById('profile-progress-val');
    if (progVal) progVal.textContent = `${pct}%`;
    const progFill = document.getElementById('profile-progress-fill');
    if (progFill) progFill.style.width = `${pct}%`;

    // Facets
    const fIntellect = document.getElementById('profile-facet-intellect-val');
    if (fIntellect) fIntellect.textContent = det.attributes.intellect;
    const fPsyche = document.getElementById('profile-facet-psyche-val');
    if (fPsyche) fPsyche.textContent = det.attributes.psyche;
    const fPhysique = document.getElementById('profile-facet-physique-val');
    if (fPhysique) fPhysique.textContent = det.attributes.physique;
    const fMotorics = document.getElementById('profile-facet-motorics-val');
    if (fMotorics) fMotorics.textContent = det.attributes.motorics;

    // Signature skill & Vice
    const skillIcons = { esoterica: '🔮', logic: '🟦', empathy: '💜', perception: '👁️', endurance: '🩸', authority: '⚖️' };
    const sigVal = document.getElementById('profile-sig-val');
    if (sigVal) {
      const icon = skillIcons[det.signatureSkill] || '✨';
      sigVal.textContent = `${icon} ${tSkill(det.signatureSkill, lang).toUpperCase()}`;
    }
    const viceVal = document.getElementById('profile-vice-val');
    if (viceVal) {
      viceVal.textContent = tVice(det.vice, 'title', lang);
    }
  }

  updateHUD() {
    if (this.detNameEl) this.detNameEl.textContent = this.state.detective.name;
    if (this.detAliasEl) this.detAliasEl.textContent = this.state.detective.alias;

    // Mini vitals preview chip in header
    if (this.hudHpPreview) {
      this.hudHpPreview.textContent = `${this.state.detective.health}/${this.state.detective.maxHealth}`;
    }
    if (this.hudSpPreview) {
      this.hudSpPreview.textContent = `${this.state.detective.morale}/${this.state.detective.maxMorale}`;
    }
    const portraitSrc = this.state.detective.portrait || (this.state.detective.gender === 'male' ? 'assets/portrait_male.jpg' : 'assets/portrait_female.jpg');
    if (this.hudAvatarImg) {
      this.hudAvatarImg.src = portraitSrc;
    }

    // Render Health Pips (if containers present)
    if (this.healthPipsContainer) {
      this.healthPipsContainer.innerHTML = '';
      for (let i = 0; i < this.state.detective.maxHealth; i++) {
        const pip = document.createElement('div');
        pip.className = `segment-pip health ${i < this.state.detective.health ? 'active' : ''}`;
        this.healthPipsContainer.appendChild(pip);
      }
    }

    // Render Morale Pips (if containers present)
    if (this.moralePipsContainer) {
      this.moralePipsContainer.innerHTML = '';
      for (let i = 0; i < this.state.detective.maxMorale; i++) {
        const pip = document.createElement('div');
        pip.className = `segment-pip morale ${i < this.state.detective.morale ? 'active' : ''}`;
        this.moralePipsContainer.appendChild(pip);
      }
    }

    // Time display (if present in header)
    if (this.hudTimeEl) {
      const h = String(this.state.time.hour).padStart(2, '0');
      const m = String(this.state.time.minute).padStart(2, '0');
      const dayLabel = t('day_prefix', this.state.currentLanguage);
      this.hudTimeEl.textContent = `${dayLabel} ${this.state.time.day} · ${h}:${m}`;
    }

    // Counters
    const cabBadge = document.getElementById('cabinet-count-badge');
    if (cabBadge) cabBadge.textContent = this.state.thoughtCabinet.internalized.length;

    const clueBadge = document.getElementById('clues-count-badge');
    if (clueBadge) clueBadge.textContent = this.state.clues.length;

    const invBadge = document.getElementById('inv-count-badge');
    if (invBadge) invBadge.textContent = this.state.inventory.length;

    // Refresh Investigation Progress Meter
    this.updateProgressMeter();

    // Also update full profile modal if it is active/rendered
    this.renderProfile();
  }

  updateProgressMeter() {
    const pct = this.state.getProgressPercentage();
    const fillEl = document.getElementById('hud-progress-fill');
    const valEl = document.getElementById('hud-progress-val');
    const titleEl = document.getElementById('hud-progress-title');
    if (fillEl) fillEl.style.width = `${pct}%`;
    if (valEl) valEl.textContent = `${pct}%`;
    if (titleEl) {
      titleEl.textContent = PROGRESS_LABELS ? (PROGRESS_LABELS[this.state.currentLanguage] || 'PROGRESS') : 'PROGRESS';
    }
  }

  renderSceneMarkers() {
    this.sceneCanvas.innerHTML = '';
    const hasActive = !!this.activePoi;
    this.sceneCanvas.classList.toggle('has-active-poi', hasActive);

    this.caseData.pointsOfInterest.forEach(poi => {
      const marker = document.createElement('div');
      
      // Calculate smart tooltip collision avoidance
      let placementClass = '';
      if (poi.y < 35) placementClass += ' tooltip-below';
      if (poi.x > 72) placementClass += ' tooltip-right';
      else if (poi.x < 28) placementClass += ' tooltip-left';

      marker.className = `poi-marker ${this.activePoi === poi.id ? 'active' : ''}${placementClass}`;
      marker.style.left = `${poi.x}%`;
      marker.style.top = `${poi.y}%`;
      marker.dataset.poiId = poi.id;

      const localizedTitle = tPoi(poi.id, 'title', this.state.currentLanguage) || poi.title;
      const inspectText = t('btn_inspect', this.state.currentLanguage) || 'INVESTIGATE';

      marker.innerHTML = `
        <div class="poi-pulse-radar"></div>
        <div class="poi-pin-circle">${poi.icon}</div>
        <div class="poi-tooltip-card">
          <div class="poi-tooltip-title">${localizedTitle}</div>
          <div class="poi-tooltip-hint">[ ${inspectText} ]</div>
        </div>
      `;

      marker.addEventListener('mouseenter', () => {
        audio.playPoiHover();
      });

      marker.addEventListener('click', (e) => {
        e.stopPropagation();
        this.inspectPointOfInterest(poi);
      });

      this.sceneCanvas.appendChild(marker);
    });
  }

  inspectPointOfInterest(poi) {
    // If clicking same active POI, do not duplicate
    if (this.activePoi === poi.id && this.currentNodeId === poi.initialNode) {
      return;
    }

    this.activePoi = poi.id;
    this.sceneCanvas.classList.add('has-active-poi');
    document.querySelectorAll('.poi-marker').forEach(m => {
      m.classList.toggle('active', m.dataset.poiId === poi.id);
    });

    audio.playPoiClick();
    audio.playFootsteps();

    // Contextual atmospheric sound based on inspected artifact
    if (poi.id === 'poi_pendulum' || poi.id === 'poi_pocketwatch') {
      setTimeout(() => audio.playClockworkChime(), 200);
    } else if (poi.id === 'poi_floorboard') {
      setTimeout(() => audio.playChalkScratch(), 250);
    } else if (poi.id === 'poi_clock_chime_bell') {
      setTimeout(() => audio.playCathedralBell(), 200);
    } else if (poi.id === 'poi_balcony') {
      setTimeout(() => audio.playThunderCrack(), 300);
    }

    this.state.advanceTime(10);

    const localizedTitle = tPoi(poi.id, 'title', this.state.currentLanguage) || poi.title;
    const localizedDesc = tPoi(poi.id, 'description', this.state.currentLanguage) || poi.description;

    // Insert Evidence Banner with matching artwork
    if (poi.image) {
      const existingBanner = this.dialogueFeed.querySelector(`.inspection-evidence-banner[data-poi-id="${poi.id}"]`);
      if (!existingBanner) {
        const banner = document.createElement('div');
        banner.className = 'inspection-evidence-banner';
        banner.dataset.poiId = poi.id;
        banner.innerHTML = `
          <div class="evidence-poi-photo-wrap">
            <img src="${poi.image}" alt="${localizedTitle}" class="evidence-poi-photo">
          </div>
          <div class="evidence-poi-details">
            <div class="evidence-poi-header">
              <span class="evidence-poi-icon">${poi.icon || '🔍'}</span>
              <span class="evidence-poi-title">${localizedTitle}</span>
            </div>
            <div class="evidence-poi-desc">${localizedDesc}</div>
          </div>
        `;
        this.dialogueFeed.appendChild(banner);
      }
    }

    this.renderDialogueNode(poi.initialNode);
  }

  renderScene() {
    this.renderSceneMarkers();
  }

  startDialogue(nodeId, speakerTitle, poi) {
    if (poi) {
      this.inspectPointOfInterest(poi);
    } else if (nodeId) {
      this.renderDialogueNode(nodeId);
    }
  }

  renderDialogueNode(nodeId) {
    this.currentNodeId = nodeId;
    const baseNode = this.caseData.dialogueNodes[nodeId];
    if (!baseNode) return;

    // Get fully localized node
    const node = getLocalizedDialogueNode(nodeId, this.state.currentLanguage, baseNode);

    // Execute node action if defined
    if (baseNode.action) {
      baseNode.action(this.state);
    }

    // Update Speaker Bar
    this.currentInterlocutor = node.speaker || t('speaker_forensic', this.state.currentLanguage);
    if (this.interlocutorNameEl) {
      this.interlocutorNameEl.textContent = this.currentInterlocutor;
    }

    audio.playTypewriter();
    if (node.voices && node.voices.length > 0) {
      audio.playInnerVoice();
    }

    // Create Entry in Feed
    const entry = document.createElement('div');
    entry.className = 'dialogue-entry';
    entry.dataset.nodeId = nodeId;
    entry.innerHTML = `
      <div class="speaker-title-row">
        <span class="speaker-avatar">${node.avatar || '👤'}</span>
        <span class="speaker-label">${node.speaker || 'Narrative'}</span>
        <span class="speaker-equalizer"><span></span><span></span><span></span><span></span></span>
      </div>
      <div class="speaker-prose">${node.text}</div>
    `;

    // Inner voices
    if (node.voices && node.voices.length > 0) {
      node.voices.forEach(v => {
        const voiceDiv = document.createElement('div');
        voiceDiv.className = 'inner-voice-block';
        voiceDiv.style.borderColor = v.color;
        voiceDiv.innerHTML = `
          <div class="voice-badge" style="color: ${v.color}">${v.badge}</div>
          <div class="voice-prose">"${v.text}"</div>
        `;
        entry.appendChild(voiceDiv);
      });
    }

    this.dialogueFeed.appendChild(entry);
    this.renderChoices(node.options);

    requestAnimationFrame(() => {
      this.dialogueFeed.scrollTop = this.dialogueFeed.scrollHeight;
    });
  }

  renderChoices(options) {
    this.dialogueChoices.innerHTML = '';
    const renderCloseBtn = () => {
      const closeBtn = document.createElement('button');
      closeBtn.className = 'choice-btn';
      closeBtn.innerHTML = `<span class="choice-num">[1]</span> <span class="choice-text">[${t('dialogue_leave', this.state.currentLanguage)}]</span>`;
      closeBtn.addEventListener('click', () => {
        this.currentNodeId = null;
        this.activePoi = null;
        document.querySelectorAll('.poi-marker').forEach(m => m.classList.remove('active'));
        this.dialogueChoices.innerHTML = `<div style="color:var(--text-muted);font-style:italic;padding:12px;">${t('scene_location', this.state.currentLanguage)}</div>`;
      });
      this.dialogueChoices.appendChild(closeBtn);
    };

    if (!options || options.length === 0) {
      renderCloseBtn();
      return;
    }

    let choiceCounter = 1;
    options.forEach((opt) => {
      const choiceKey = opt.id || (opt.check ? opt.check.checkId : (opt.nextNode || (typeof opt.action === 'string' ? opt.action : null)));

      if (opt.condition && !opt.condition(this.state)) {
        return;
      }
      if (opt.once && choiceKey && this.state.isChoiceVisited(choiceKey)) {
        return;
      }

      const isVisited = !!(choiceKey && this.state.isChoiceVisited(choiceKey));
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      if (isVisited) {
        btn.classList.add('visited');
      }

      const currentNum = choiceCounter++;
      const visitedPrefix = isVisited ? '<span class="visited-check">✓ </span>' : '';

      if (opt.check) {
        const check = opt.check;
        const skillBonus = this.state.getSkillTotal(check.skill);
        const prob = this.diceEngine.calculateSuccessProbability(skillBonus, check.difficulty);

        btn.classList.add(check.type === 'red' ? 'red-check' : 'white-check');
        btn.innerHTML = `
          <span class="choice-num">[${currentNum}]</span>
          <span class="choice-text">${visitedPrefix}${opt.text}</span>
          <span class="check-prob-pill">${prob}%</span>
        `;

        btn.addEventListener('click', () => {
          if (choiceKey) this.state.markChoiceVisited(choiceKey);
          if (typeof opt.action === 'function') opt.action(this.state);
          this.updateProgressMeter();
          this.executeSkillCheck(opt, check);
        });
      } else {
        btn.innerHTML = `
          <span class="choice-num">[${currentNum}]</span>
          <span class="choice-text">${visitedPrefix}${opt.text}</span>
        `;

        btn.addEventListener('click', () => {
          audio.playUiClick();
          if (choiceKey) this.state.markChoiceVisited(choiceKey);
          if (typeof opt.action === 'function') opt.action(this.state);
          this.updateProgressMeter();

          if (opt.action === 'close_dialogue') {
            this.currentNodeId = null;
            this.activePoi = null;
            document.querySelectorAll('.poi-marker').forEach(m => m.classList.remove('active'));
            this.dialogueChoices.innerHTML = `<div style="color:var(--text-muted);font-style:italic;padding:12px;">${t('scene_location', this.state.currentLanguage)}</div>`;
          } else if (opt.action === 'trigger_victory') {
            this.showVictoryScreen();
          } else if (opt.nextNode) {
            this.renderDialogueNode(opt.nextNode);
          }
        });
      }

      this.dialogueChoices.appendChild(btn);
    });

    if (this.dialogueChoices.children.length === 0) {
      renderCloseBtn();
    }
  }

  // 3D Skill Check Roll Execution
  executeSkillCheck(opt, checkConfig) {
    this.openModal(this.diceModal);

    const checkHeader = document.getElementById('dice-check-header');
    const d1El = document.getElementById('die-1');
    const d2El = document.getElementById('die-2');
    const scoreVal = document.getElementById('dice-score-val');
    const outcomeEl = document.getElementById('dice-outcome-text');
    const proceedBtn = document.getElementById('dice-proceed-btn');

    const skillLabel = tSkill(checkConfig.skill, this.state.currentLanguage);
    checkHeader.textContent = `${skillLabel} (DC ${checkConfig.difficulty})`;
    const tallyLabel = document.getElementById('dice-tally-label');
    if (tallyLabel) tallyLabel.textContent = t('dice_tally', this.state.currentLanguage);
    d1El.classList.add('rolling');
    d2El.classList.add('rolling');
    outcomeEl.textContent = t('dice_rolling', this.state.currentLanguage);
    outcomeEl.className = 'outcome-announcement';
    scoreVal.textContent = '?';
    proceedBtn.style.display = 'none';

    audio.playDiceRoll();

    const result = this.diceEngine.rollCheck(checkConfig);

    setTimeout(() => {
      d1El.classList.remove('rolling');
      d2El.classList.remove('rolling');

      this.renderDiePips(d1El, result.d1);
      this.renderDiePips(d2El, result.d2);

      scoreVal.textContent = `${result.diceSum} + ${result.totalBonus} = ${result.totalScore}`;

      if (result.isCriticalSuccess) {
        outcomeEl.textContent = `★ ${t('dice_epiphany', this.state.currentLanguage)}`;
        outcomeEl.className = 'outcome-announcement critical';
        audio.playSuccess();
      } else if (result.isCriticalFailure) {
        outcomeEl.textContent = `☠ ${t('dice_snake_eyes', this.state.currentLanguage)}`;
        outcomeEl.className = 'outcome-announcement failed';
        audio.playFailure();
      } else if (result.passed) {
        outcomeEl.textContent = t('dice_passed', this.state.currentLanguage);
        outcomeEl.className = 'outcome-announcement passed';
        audio.playSuccess();
      } else {
        outcomeEl.textContent = t('dice_failed', this.state.currentLanguage);
        outcomeEl.className = 'outcome-announcement failed';
        audio.playFailure();
      }

      proceedBtn.textContent = t('dice_proceed', this.state.currentLanguage);
      proceedBtn.style.display = 'block';
      proceedBtn.onclick = () => {
        this.closeModal(this.diceModal);
        const nextNode = result.passed ? checkConfig.successNode : checkConfig.failNode;
        if (nextNode) {
          this.renderDialogueNode(nextNode);
        }
      };
    }, 1100);
  }

  renderDiePips(dieElement, number) {
    dieElement.innerHTML = '';
    const patterns = {
      1: [4],
      2: [0, 8],
      3: [0, 4, 8],
      4: [0, 2, 6, 8],
      5: [0, 2, 4, 6, 8],
      6: [0, 2, 3, 5, 6, 8]
    };

    const pips = patterns[number] || [4];
    for (let i = 0; i < 9; i++) {
      const pip = document.createElement('div');
      pip.className = `pip ${pips.includes(i) ? 'visible' : ''}`;
      dieElement.appendChild(pip);
    }
  }

  // Thought Cabinet Modal
  openCabinetModal() {
    this.openModal(this.cabinetModal);
    this.renderCabinet();
  }

  renderCabinet() {
    this.thoughtNodesContainer.innerHTML = '';
    const lang = this.state.currentLanguage;
    THOUGHTS_CATALOG.forEach(thought => {
      const isInternalized = this.state.thoughtCabinet.internalized.some(t => t.id === thought.id);
      const isCooking = this.state.thoughtCabinet.internalizing.find(t => t.id === thought.id);
      const isKnown = this.state.thoughtCabinet.known.some(t => t.id === thought.id);

      let statusClass = 'locked';
      let icon = '🔒';
      if (isInternalized) {
        statusClass = 'internalized';
        icon = '✨';
      } else if (isCooking) {
        statusClass = 'internalizing';
        icon = '⏳';
      } else if (isKnown) {
        statusClass = 'unlocked';
        icon = '💡';
      }

      const thoughtName = tThought(thought.id, 'name', lang) || thought.name;
      const thoughtCat = tThought(thought.id, 'category', lang) || thought.category;

      const nodeCard = document.createElement('div');
      nodeCard.className = `thought-node-card ${statusClass}`;
      nodeCard.innerHTML = `
        <span class="node-icon">${icon}</span>
        <div class="node-info">
          <div class="node-title">${thoughtName}</div>
          <span class="node-category">${thoughtCat}</span>
        </div>
      `;

      nodeCard.addEventListener('click', () => {
        audio.playThoughtNode();
        this.inspectThought(thought, { isInternalized, isCooking, isKnown });
      });

      this.thoughtNodesContainer.appendChild(nodeCard);
    });

    // Default inspect first known or internalized
    const firstKnown = THOUGHTS_CATALOG.find(t =>
      this.state.thoughtCabinet.known.some(k => k.id === t.id) ||
      this.state.thoughtCabinet.internalized.some(k => k.id === t.id)
    ) || THOUGHTS_CATALOG[0];

    this.inspectThought(firstKnown, {
      isInternalized: this.state.thoughtCabinet.internalized.some(t => t.id === firstKnown.id),
      isCooking: this.state.thoughtCabinet.internalizing.find(t => t.id === firstKnown.id),
      isKnown: this.state.thoughtCabinet.known.some(t => t.id === firstKnown.id)
    });
  }

  inspectThought(thought, status) {
    const { isInternalized, isCooking, isKnown } = status;
    const lang = this.state.currentLanguage;

    const tName = tThought(thought.id, 'name', lang) || thought.name;
    const tCat = tThought(thought.id, 'category', lang) || thought.category;
    const tFlav = tThought(thought.id, 'flavor', lang) || thought.flavor;
    const tExp = tThought(thought.id, 'explanation', lang) || thought.explanation;
    const tTemp = tThought(thought.id, 'tempDrawback', lang) || thought.tempDrawback;
    const tSol = tThought(thought.id, 'solution', lang) || thought.solution;

    let actionBtnHtml = '';
    if (isInternalized) {
      actionBtnHtml = `<div style="color:var(--gold-accent);font-family:var(--font-mono);font-size:0.85rem;text-align:center;">${t('cabinet_internalized_status', lang)}</div>`;
    } else if (isCooking) {
      actionBtnHtml = `<div style="color:var(--color-psyche);font-family:var(--font-mono);font-size:0.85rem;text-align:center;">⏳ ${t('cabinet_researching', lang)} (${isCooking.progress}/${thought.requiredTicks})</div>`;
    } else if (isKnown) {
      actionBtnHtml = `<button class="internalize-action-btn" id="btn-start-internalize">${t('cabinet_btn_internalize', lang)}</button>`;
    } else {
      actionBtnHtml = `<div style="color:var(--text-muted);font-style:italic;font-size:0.85rem;text-align:center;">${t('cabinet_locked_hint', lang)}</div>`;
    }

    this.thoughtInspector.innerHTML = `
      <span class="category-tag">${tCat}</span>
      <h3 class="thought-heading">${tName}</h3>
      <div class="thought-flavor-quote">"${tFlav}"</div>
      <div class="thought-deep-explanation">${tExp}</div>

      <div class="thought-stat-box">
        <span class="box-title">${t('cabinet_temp_box', lang)}</span>
        <span class="penalty-text">${tTemp}</span>
      </div>

      <div class="thought-stat-box">
        <span class="box-title">${t('cabinet_perm_box', lang)}</span>
        <span class="bonus-text">${tSol}</span>
      </div>

      ${actionBtnHtml}
    `;

    const startBtn = document.getElementById('btn-start-internalize');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        const res = this.state.startInternalizing(thought.id);
        if (res.success) {
          audio.playUiClick();
          this.renderCabinet();
        } else {
          alert(res.reason);
        }
      });
    }
  }

  // Inventory Modal with genuine usable consequences
  openInventoryModal() {
    this.openModal(this.inventoryModal);
    this.renderInventory();
  }

  renderInventory() {
    this.inventoryContainer.innerHTML = '';
    const lang = this.state.currentLanguage;
    if (this.state.inventory.length === 0) {
      this.inventoryContainer.innerHTML = `<div style="color:var(--text-muted);font-style:italic;padding:16px;">${t('inventory_empty', lang)}</div>`;
      return;
    }

    this.state.inventory.forEach(item => {
      const card = document.createElement('div');
      card.className = 'inv-card';

      let bonusText = '';
      if (item.bonus) {
        bonusText = Object.entries(item.bonus).map(([k, v]) => `+${v} ${tSkill(k, lang).toUpperCase()}`).join(', ');
      }

      const itemName = tItem(item.id, 'name', lang) || item.name;
      const itemDesc = tItem(item.id, 'description', lang) || item.description;
      const itemTypeLabel = t(`item_type_${item.type}`, lang) || item.type;
      const buffLabel = t('buff_label', lang) || 'Buff';

      let actionLabel = t('btn_use', lang);
      if (item.id === 'perpetuum_ledger') actionLabel = t('btn_read', lang);
      else if (item.id === 'broken_pocketwatch' || item.id === 'poison_chess_queen') actionLabel = t('btn_inspect', lang);

      card.innerHTML = `
        <div class="inv-header">
          <span class="inv-icon">${item.icon}</span>
          <div>
            <div class="inv-name">${itemName}</div>
            <span class="inv-type-pill">${itemTypeLabel}</span>
          </div>
        </div>
        <div class="inv-description">${itemDesc}</div>
        ${bonusText ? `<div class="inv-bonus-text">${buffLabel}: ${bonusText}</div>` : ''}
        <div class="inv-action-row">
          ${item.isUsable ? `
            <button class="inv-use-btn" data-id="${item.id}">
              ${actionLabel} ${item.uses ? `(${item.uses} ${t('badge_uses', lang)})` : ''}
            </button>
          ` : `
            <span class="inv-passive-badge">${t('badge_passive', lang)}</span>
          `}
        </div>
      `;

      card.querySelector('.inv-use-btn')?.addEventListener('click', () => {
        this.state.useItem(item.id);
      });

      this.inventoryContainer.appendChild(card);
    });
  }

  // Clues & Multi-Case Board Modal
  openCluesModal() {
    this.openModal(this.cluesModal);
    this.renderCaseBoard();
  }

  renderClues() {
    this.renderCaseBoard();
  }

  renderCaseBoard() {
    if (!this.caseBoardContent) {
      this.caseBoardContent = document.getElementById('case-board-content');
    }
    if (!this.caseBoardContent) return;
    this.caseBoardContent.innerHTML = '';
    const lang = this.state.currentLanguage;
    const tab = this.activeCaseTab || 'active';

    // Update tab button visual active state
    document.querySelectorAll('.case-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tab);
    });

    if (tab === 'active') {
      // Render Active Inquiry: Case #D4-04
      const activeCase = (typeof ALL_CASES_ARCHIVE !== 'undefined' ? ALL_CASES_ARCHIVE.find(c => c.id === 'case_d4_04') : null) || {
        code: '#D4-04/HOR',
        dateKey: 'case_date_today',
        date: 'Today · 03:42 AM',
        isKeystoneUnlocked: () => false
      };
      const title = tCase('case_d4_04', 'title', lang);
      const victim = tCase('case_d4_04', 'victim', lang);
      const loc = tCase('case_d4_04', 'location', lang);
      const summary = tCase('case_d4_04', 'summary', lang);
      const dateText = t(activeCase.dateKey, lang) || activeCase.date;
      const pct = this.state.getProgressPercentage();

      const caseHtml = `
        <div class="case-dossier-hero active-case">
          <div class="case-hero-header">
            <span class="case-hero-code">${activeCase.code}</span>
            <span class="case-hero-status active">${t('case_status_active', lang)}</span>
          </div>
          <h3 class="case-hero-title">${title}</h3>
          <div class="case-hero-meta">
            <span>👤 <strong>${victim}</strong></span>
            <span>📍 <strong>${loc}</strong></span>
            <span>⏱️ <strong>${dateText}</strong></span>
          </div>
          <p class="case-hero-summary">${summary}</p>
          <div class="case-hero-progress">
            <div class="hud-progress-info">
              <span>${(typeof PROGRESS_LABELS !== 'undefined' && PROGRESS_LABELS[lang]) || 'PROGRESS'}:</span>
              <span>${pct}%</span>
            </div>
            <div class="hud-progress-track">
              <div class="hud-progress-fill" style="width: ${pct}%;"></div>
            </div>
          </div>
        </div>

        <div class="case-evidence-section">
          <div class="case-section-heading">
            <span>📌 ${t('modal_clues_title', lang)} (${this.state.clues.length})</span>
          </div>
          <div class="case-clues-grid" id="active-case-clues-grid">
            ${this.state.clues.length === 0 ? `
              <div class="case-empty-notice">${t('clues_empty', lang)}</div>
            ` : this.state.clues.map(clue => {
              const cTitle = tClue(clue.id, 'title', lang) || clue.title;
              const cDesc = tClue(clue.id, 'desc', lang) || clue.desc;
              return `
                <div class="case-evidence-card">
                  <div class="evidence-card-title">🔍 ${cTitle}</div>
                  <div class="evidence-card-desc">${cDesc}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
      this.caseBoardContent.innerHTML = caseHtml;

    } else if (tab === 'archive') {
      // Render Solved Archive: Cases #D4-01, #D4-02, #D4-03
      const solvedCases = (typeof ALL_CASES_ARCHIVE !== 'undefined' ? ALL_CASES_ARCHIVE.filter(c => c.status === 'solved') : []);
      const solvedListHtml = solvedCases.map(c => {
        const title = tCase(c.id, 'title', lang);
        const victim = tCase(c.id, 'victim', lang);
        const loc = tCase(c.id, 'location', lang);
        const summary = tCase(c.id, 'summary', lang);
        const kName = tCase(c.id, 'keystoneName', lang);
        const kDesc = tCase(c.id, 'keystoneDesc', lang);
        const dateText = t(c.dateKey, lang) || c.date;

        return `
          <div class="solved-case-dossier-card">
            <div class="solved-case-head">
              <span class="case-hero-code">${c.code}</span>
              <span class="case-hero-status solved">${t('case_status_solved', lang)}</span>
            </div>
            <h4 class="solved-case-title">${c.icon} ${title}</h4>
            <div class="case-hero-meta">
              <span>👤 ${victim}</span>
              <span>📍 ${loc}</span>
              <span>📅 ${dateText}</span>
            </div>
            <p class="solved-case-summary">${summary}</p>
            <div class="solved-case-keystone">
              <div class="keystone-tag">${t('keystone_secured', lang)}:</div>
              <div class="keystone-name">${c.keystoneIcon} ${kName}</div>
              <div class="keystone-desc">${kDesc}</div>
            </div>
          </div>
        `;
      }).join('');

      this.caseBoardContent.innerHTML = `
        <div class="solved-archive-container">
          <div class="archive-intro-box">
            <span>📁 ${t('case_tab_archive', lang)}</span>
            <p>${t('archive_intro_text', lang)}</p>
          </div>
          <div class="solved-cases-list">
            ${solvedListHtml}
          </div>
        </div>
      `;

    } else if (tab === 'master') {
      // Render Grand Master Case: #PRIME-00/OMEGA
      const omegaTitle = tCase('case_prime_omega', 'title', lang);
      const omegaVictim = tCase('case_prime_omega', 'victim', lang);
      const omegaLoc = tCase('case_prime_omega', 'location', lang);
      const omegaSummary = tCase('case_prime_omega', 'summary', lang);

      const k1Name = tCase('case_d4_01', 'keystoneName', lang);
      const k1Desc = tCase('case_d4_01', 'keystoneDesc', lang);
      const k2Name = tCase('case_d4_02', 'keystoneName', lang);
      const k2Desc = tCase('case_d4_02', 'keystoneDesc', lang);
      const k3Name = tCase('case_d4_03', 'keystoneName', lang);
      const k3Desc = tCase('case_d4_03', 'keystoneDesc', lang);
      const k4Name = tCase('case_d4_04', 'keystoneName', lang);

      const k4Unlocked = !!(this.state && (this.state.hasClue('clue_confession_full') || this.state.hasClue('clue_perpetuum_ledger') || (this.state.flags && this.state.flags.case_solved)));
      const k4Desc = k4Unlocked ? t('k4_unlocked_desc', lang) : t('k4_pending_desc', lang);

      const fromPrefix = t('from_prefix', lang);
      const statusSecured = t('status_secured', lang);
      const statusK4 = k4Unlocked ? t('status_unmasked', lang) : t('status_inquiry', lang);

      const masterHtml = `
        <div class="master-case-hero">
          <div class="case-hero-header">
            <span class="case-hero-code gold">#PRIME-00/OMEGA</span>
            <span class="case-hero-status master">${t('case_status_master', lang)}</span>
          </div>
          <h3 class="master-hero-title">👑 ${omegaTitle}</h3>
          <div class="case-hero-meta">
            <span>🎯 <strong>${omegaVictim}</strong></span>
            <span>📍 <strong>${omegaLoc}</strong></span>
          </div>
          <p class="master-hero-summary">${omegaSummary}</p>
        </div>

        <div class="master-keystone-network">
          <div class="case-section-heading">
            <span>🕸️ ${t('keystone_network_title', lang)}</span>
          </div>
          <div class="keystone-grid">
            
            <div class="keystone-node secured">
              <div class="keystone-node-head">
                <span class="keystone-source-code">${fromPrefix} #D4-01/DRF</span>
                <span class="keystone-status-badge secured">${statusSecured}</span>
              </div>
              <div class="keystone-node-title">📜 ${k1Name}</div>
              <div class="keystone-node-info">${k1Desc}</div>
            </div>

            <div class="keystone-node secured">
              <div class="keystone-node-head">
                <span class="keystone-source-code">${fromPrefix} #D4-02/ARS</span>
                <span class="keystone-status-badge secured">${statusSecured}</span>
              </div>
              <div class="keystone-node-title">📄 ${k2Name}</div>
              <div class="keystone-node-info">${k2Desc}</div>
            </div>

            <div class="keystone-node secured">
              <div class="keystone-node-head">
                <span class="keystone-source-code">${fromPrefix} #D4-03/TNC</span>
                <span class="keystone-status-badge secured">${statusSecured}</span>
              </div>
              <div class="keystone-node-title">🩸 ${k3Name}</div>
              <div class="keystone-node-info">${k3Desc}</div>
            </div>

            <div class="keystone-node ${k4Unlocked ? 'secured' : 'pending'}">
              <div class="keystone-node-head">
                <span class="keystone-source-code">${fromPrefix} #D4-04/HOR</span>
                <span class="keystone-status-badge ${k4Unlocked ? 'secured' : 'pending'}">${statusK4}</span>
              </div>
              <div class="keystone-node-title">🗝️ ${k4Name}</div>
              <div class="keystone-node-info">${k4Desc}</div>
            </div>

          </div>

          <div class="master-action-box">
            <button id="btn-synthesize-master-case" class="action-btn-large ${k4Unlocked ? 'ready' : ''}" style="width: 100%;">
              ⚖️ ${t('btn_synthesize_master', lang)}
            </button>
            <div class="master-synthesis-hint">
              ${k4Unlocked ? t('master_synthesis_ready', lang) : t('master_synthesis_not_ready', lang)}
            </div>
          </div>
        </div>
      `;

      this.caseBoardContent.innerHTML = masterHtml;

      document.getElementById('btn-synthesize-master-case')?.addEventListener('click', () => {
        if (k4Unlocked) {
          audio.playVictoryChime();
          this.showToast(`👑 ${t('master_synthesis_ready', lang)}`);
        } else {
          audio.playUiClick();
          this.showToast(`⚠️ ${t('master_synthesis_not_ready', lang)}`);
        }
      });
    }
  }

  // Atmospheric Game Over Horror Modal
  showGameOver(payload) {
    this.openModal(this.gameoverModal);
    if (typeof audio !== 'undefined' && audio.playGameOver) {
      audio.playGameOver();
    }
    const lang = this.state.currentLanguage;
    const type = payload.type || 'physical';

    const iconEl = document.getElementById('gameover-status-icon');
    const titleEl = document.getElementById('gameover-title-text');
    const reasonEl = document.getElementById('gameover-reason-text');
    const proseEl = document.getElementById('gameover-prose-text');
    const retryBtn = document.getElementById('btn-retry-inquiry');

    if (type === 'physical') {
      iconEl.textContent = '💀';
    } else if (type === 'psychological') {
      iconEl.textContent = '🧠';
    } else if (type === 'arrest') {
      iconEl.textContent = '🚨';
    } else {
      iconEl.textContent = '⏱️';
    }

    titleEl.textContent = tGameOver(type, 'title', lang);
    reasonEl.textContent = payload.reason || tGameOver(type, 'title', lang);
    proseEl.textContent = payload.description || tGameOver(type, 'description', lang);
    retryBtn.textContent = t('btn_retry', lang);
  }

  // Victory / Case Closed Modal
  showVictoryScreen() {
    this.openModal(this.victoryModal);
    audio.playVictoryChime();
    const sum = document.getElementById('victory-summary-text');
    const lang = this.state.currentLanguage;
    if (sum) {
      sum.innerHTML = `
        <strong>${t('case_badge', lang)}</strong><br><br>
        ${t('victory_lead', lang)} <em>${this.state.detective.name}</em> ("${this.state.detective.alias}")<br>
        ${t('victory_facet', lang)} <em>${tSkill(this.state.detective.signatureSkill, lang).toUpperCase()}</em><br>
        ${t('victory_clues', lang)} <em>${this.state.clues.length}</em><br>
        ${t('victory_thoughts', lang)} <em>${this.state.thoughtCabinet.internalized.length}</em><br><br>
        ${t('ending_coverup', lang)}
      `;
    }
  }
}

// --- END: ui.js ---

// --- BEGIN: main.js ---
// Aenigma Main Bootstrap & Flow Orchestrator

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
              <span class="brand-stem">${targetStem}</span><span class="brand-junction" title="Connecting Nexus">${targetPivot}</span><span class="brand-suffix">${targetSuffix}</span>
            </div>
            <div class="archive-decrypt-badge">◈ SECTOR 7 CASE DOSSIER DECRYPTED ◈</div>
          `;
          
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


// --- END: main.js ---


})();
