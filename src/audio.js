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

export const audio = new SoundEngine();
