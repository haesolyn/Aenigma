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

      gain.gain.setValueAtTime(0.05, now + idx * 0.04);
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
}

export const audio = new SoundEngine();
