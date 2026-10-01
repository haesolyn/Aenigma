/* Aenigma Detective Mystery RPG - Universal Standalone Bundle */
(function() {
'use strict';

// --- BEGIN: audio.js ---
// Aenigma Web Audio Engine - Generative Noir Soundscape
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.droneGain = null;
    this.noiseNode = null;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.isInitialized = true;
      this.startAmbientDrone();
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
      this.droneGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.08, this.ctx.currentTime, 0.1);
    }
    return this.isMuted;
  }

  startAmbientDrone() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Master Ambient Gain
    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(this.isMuted ? 0 : 0.08, now);
    this.droneGain.connect(this.ctx.destination);

    // Deep Sub Drone (F1 = ~43.65 Hz)
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(43.65, now);

    // Filter for warm dark tone
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, now);
    filter.Q.setValueAtTime(4, now);

    // LFO to slowly sweep the cutoff frequency
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.08, now);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(40, now);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    // Minor second detuned oscillator for dark tension
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(65.4, now); // C2

    const osc3 = this.ctx.createOscillator();
    osc3.type = 'triangle';
    osc3.frequency.setValueAtTime(44.2, now); // subtle beat frequency

    osc1.connect(filter);
    osc2.connect(filter);
    osc3.connect(filter);
    filter.connect(this.droneGain);

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);
    lfo.start(now);

    // Vinyl / Tape Hiss Pink Noise
    this.createTapeHiss();
  }

  createTapeHiss() {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      output[i] = (b0 + b1 + b2) * 0.04;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const hissFilter = this.ctx.createBiquadFilter();
    hissFilter.type = 'bandpass';
    hissFilter.frequency.value = 1800;
    hissFilter.Q.value = 1.2;

    const hissGain = this.ctx.createGain();
    hissGain.gain.value = 0.015;

    noise.connect(hissFilter);
    hissFilter.connect(hissGain);
    hissGain.connect(this.droneGain);
    noise.start();
  }

  // Typewriter / Dialogue Key Click
  playTypewriter() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    const baseFreq = 800 + Math.random() * 400;
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.035);

    filter.type = 'highpass';
    filter.frequency.setValueAtTime(400, now);

    gain.gain.setValueAtTime(0.045, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.045);
  }

  // Dice roll rattle physics sound
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

  // Successful Skill Check Chime (Brassy golden chord)
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

  // Failure Skill Check Stinger (Distorted low drop)
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

  // Suspense / Discovery Stinger
  playDiscovery() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.35);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.8);
  }

  // UI button click / tap
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

const audio = new SoundEngine();

// --- END: audio.js ---

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
      x: 36,
      y: 80,
      image: 'assets/poi_safe.jpg',
      description: "A loose plank under discarded grease rags and bullet casings. Faint scratches mark the brass rivets.",
      initialNode: 'examine_safe_start'
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
          text: '"What is your preliminary assessment, Graves?"',
          nextNode: 'graves_assessment'
        },
        {
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
          text: '"I need a cigarette before my synapses completely disconnect."',
          nextNode: 'graves_cigarette'
        },
        {
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
          text: '"Who was the last person to see him alive?"',
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
          text: "Greed radiates off him like heat from a kiln. But he didn't kill Vance—he arrived too late and found him already cold."
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
      text: "Graves scowls, waving his lantern over the corpse. 'Maybe he fell from the upper gantry! Look, Detective, until you show me a second set of footprints or a weapon with someone else's fingerprints, the Captain wants this stamped as accidental death.'",
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
          text: '[Step back from the corpse]',
          action: 'close_dialogue'
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
      speaker: 'Forensic Attempt',
      avatar: '⏳',
      text: "The cadaveric spasm is like cast iron. As you force her fingers, the brittle bone snaps, and whatever was inside falls through the floor grating into the dark oil tank below. You hear a dull splash.",
      voices: [
        {
          voice: 'Carnal',
          color: 'var(--color-physique)',
          badge: 'CARNAL [Physique]',
          text: "Clumsy. Your hands are shaking from alcohol withdrawal. You lost the physical item, but you caught a glimpse: it looked like an ivory figurine."
        }
      ],
      action: (state) => {
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
          text: 'Look over the railing into the fog.',
          action: (state) => {
            state.unlockThought('metaphysics_of_rain');
          },
          nextNode: 'balcony_fog_reflection'
        },
        {
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
          text: '[If combination known (7-3-12)] Enter the code found inside Aurelia\'s watch.',
          condition: (state) => state.clues.some(c => c.id === 'clue_watch_code'),
          nextNode: 'safe_open_code'
        },
        {
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
          text: '[Leave safe untouched]',
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
      speaker: 'Lockpick Attempt',
      avatar: '🗝️',
      text: "The internal tumblers jam with a harsh screech. An internal anti-tamper glass vial cracks, releasing a foul sulfur gas that burns your nostrils.",
      action: (state) => {
        state.damageHealth(1);
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
          text: '"Where were you at 03:42 AM when the tower clock stopped?"',
          nextNode: 'madame_alibi'
        },
        {
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
          text: '[RED CHECK] [AUTHORITY - Challenging 13] "Enough theatrics, Vivienne. We found the poisoned chess queen and the torn velvet from your coat on the balcony. You murdered her."',
          condition: (state) => state.clues.some(c => c.id === 'clue_velvet_cyanide') || state.clues.some(c => c.id === 'clue_poison_needle'),
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
          text: '[Step away]',
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
          text: '[DELIVER FINAL JUDGMENT: Arrest Madame Vance for murder]',
          nextNode: 'ending_arrest'
        },
        {
          text: '[DELIVER FINAL JUDGMENT: Hide the Perpetuum Ledger and file it as an accidental death]',
          nextNode: 'ending_coverup'
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

// --- END: cases.js ---

// --- BEGIN: state.js ---
// Aenigma Central Game State & Reactive Store

const STORAGE_KEY = 'aenigma_detective_save_v1';

class GameState {
  constructor() {
    this.listeners = [];
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
        description: 'Bent silver badge with the imperial scales scratched off. Still commands obedience in desperate alleys.',
        icon: '🛡️',
        bonus: { authority: 1 }
      },
      {
        id: 'astra_cigarettes',
        name: 'Pack of Astra Red Filterless',
        type: 'consumable',
        description: 'Cheap, pungent sulfur-cured tobacco from the southern docks. Calms the frayed nerves of an insomniac.',
        icon: '🚬',
        uses: 3,
        effect: { morale: +1, endurance: -1 }
      },
      {
        id: 'magnifying_loupe',
        name: 'Horologist Monocle Loupe',
        type: 'tool',
        description: 'Brass loupe with triple-ground achromatic lens. Exposes micro-scratches and hidden alchemical hallmarks.',
        icon: '🔍',
        bonus: { perception: 1, interfacing: 1 }
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
      case_solved: false
    };

    this.resolvedChecks = {}; // checkId: { status: 'passed'|'failed', timestamp }
    this.dialogueHistory = [];
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

  // Damage & Healing
  damageHealth(amount = 1) {
    this.detective.health = Math.max(0, this.detective.health - amount);
    this.notify('health_changed', { current: this.detective.health, max: this.detective.maxHealth });
    if (this.detective.health <= 0) {
      this.notify('game_over', { reason: 'Cardiac Arrest / Physical Collapse' });
    }
  }

  healHealth(amount = 1) {
    this.detective.health = Math.min(this.detective.maxHealth, this.detective.health + amount);
    this.notify('health_changed', { current: this.detective.health, max: this.detective.maxHealth });
  }

  damageMorale(amount = 1) {
    this.detective.morale = Math.max(0, this.detective.morale - amount);
    this.notify('morale_changed', { current: this.detective.morale, max: this.detective.maxMorale });
    if (this.detective.morale <= 0) {
      this.notify('game_over', { reason: 'Complete Existential Despair & Resignation' });
    }
  }

  healMorale(amount = 1) {
    this.detective.morale = Math.min(this.detective.maxMorale, this.detective.morale + amount);
    this.notify('morale_changed', { current: this.detective.morale, max: this.detective.maxMorale });
  }

  // Get total effective skill including signature, equipment & internalized thoughts
  getSkillTotal(skillName) {
    let base = this.detective.skills[skillName] || 1;
    if (this.detective.signatureSkill === skillName) {
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
      this.inventory.push(item);
      this.notify('item_added', item);
    }
  }

  useItem(itemId) {
    const item = this.inventory.find(i => i.id === itemId);
    if (!item) return;

    if (item.type === 'consumable') {
      if (item.effect.health) this.healHealth(item.effect.health);
      if (item.effect.morale) this.healMorale(item.effect.morale);
      item.uses = (item.uses || 1) - 1;
      if (item.uses <= 0) {
        this.inventory = this.inventory.filter(i => i.id !== itemId);
      }
      this.notify('item_used', item);
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

  // Thought Cabinet Methods
  unlockThought(thought) {
    const alreadyKnown = this.thoughtCabinet.known.find(t => t.id === thought.id);
    const isCooking = this.thoughtCabinet.internalizing.find(t => t.id === thought.id);
    const isDone = this.thoughtCabinet.internalized.find(t => t.id === thought.id);

    if (!alreadyKnown && !isCooking && !isDone) {
      this.thoughtCabinet.known.push(thought);
      this.notify('thought_unlocked', thought);
    }
  }

  startInternalizing(thoughtId) {
    if (this.thoughtCabinet.internalizing.length >= this.thoughtCabinet.maxSlots) {
      return { success: false, reason: 'All thought slots occupied in your fractured mind.' };
    }
    const idx = this.thoughtCabinet.known.findIndex(t => t.id === thoughtId);
    if (idx === -1) return { success: false, reason: 'Thought not discovered yet.' };

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
        resolvedChecks: this.resolvedChecks
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
    this.diceEngine = new DiceEngine(state);
    this.currentNodeId = null;
    this.currentInterlocutor = 'Forensic Observation';
    this.activePoi = null;

    this.initElements();
    this.bindEvents();
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

    // Header meters & stats
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
    this.toastContainer = document.getElementById('notification-toast-container');
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

    // Tab buttons
    document.getElementById('nav-btn-cabinet')?.addEventListener('click', () => {
      this.openCabinetModal();
    });
    document.getElementById('nav-btn-inventory')?.addEventListener('click', () => {
      this.openInventoryModal();
    });
    document.getElementById('nav-btn-clues')?.addEventListener('click', () => {
      this.openCluesModal();
    });
    document.getElementById('nav-btn-audio')?.addEventListener('click', (e) => {
      const isMuted = audio.toggleMute();
      e.currentTarget.classList.toggle('muted', isMuted);
      e.currentTarget.querySelector('.btn-label').textContent = isMuted ? 'UNMUTE AUDIO' : 'AUDIO: ON';
    });

    // State change listeners
    this.state.subscribe((event, payload) => {
      this.updateHUD();
      if (event === 'clue_added') {
        this.showToast(`🔍 CLUE DISCOVERED: ${payload.title}`);
        audio.playDiscovery();
      } else if (event === 'thought_unlocked') {
        this.showToast(`💡 NEW THOUGHT UNLOCKED: "${payload.name}" in Thought Cabinet`);
        audio.playDiscovery();
      } else if (event === 'thought_internalized') {
        this.showToast(`✨ THOUGHT INTERNALIZED: "${payload.name}"`);
        audio.playSuccess();
      } else if (event === 'item_added') {
        this.showToast(`📦 ITEM ACQUIRED: ${payload.name}`);
        audio.playDiscovery();
      } else if (event === 'game_over') {
        alert(`GAME OVER: ${payload.reason}`);
      }
    });
  }

  showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = `<span>${message}</span>`;
    this.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.transition = 'opacity 0.5s';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 500);
    }, 4000);
  }

  openModal(modal) {
    audio.playUiClick();
    modal.classList.add('open');
  }

  closeModal(modal) {
    audio.playUiClick();
    modal.classList.remove('open');
  }

  updateHUD() {
    const det = this.state.detective;
    if (this.detNameEl) this.detNameEl.textContent = det.name;
    if (this.detAliasEl) this.detAliasEl.textContent = det.alias;

    const avatarImg = document.getElementById('hud-avatar-img');
    if (avatarImg && det.portrait) {
      avatarImg.src = det.portrait;
    }

    // Time
    if (this.hudTimeEl) {
      const h = String(this.state.time.hour).padStart(2, '0');
      const m = String(this.state.time.minute).padStart(2, '0');
      this.hudTimeEl.textContent = `DAY ${this.state.time.day} · ${h}:${m}`;
    }

    // Health Pips
    if (this.healthPipsContainer) {
      this.healthPipsContainer.innerHTML = '';
      for (let i = 0; i < det.maxHealth; i++) {
        const pip = document.createElement('div');
        pip.className = `segment-pip health ${i < det.health ? 'active' : ''}`;
        this.healthPipsContainer.appendChild(pip);
      }
    }

    // Morale Pips
    if (this.moralePipsContainer) {
      this.moralePipsContainer.innerHTML = '';
      for (let i = 0; i < det.maxMorale; i++) {
        const pip = document.createElement('div');
        pip.className = `segment-pip morale ${i < det.morale ? 'active' : ''}`;
        this.moralePipsContainer.appendChild(pip);
      }
    }

    // Tab badges
    const cluesBadge = document.getElementById('clues-count-badge');
    if (cluesBadge) cluesBadge.textContent = this.state.clues.length;

    const cabinetBadge = document.getElementById('cabinet-count-badge');
    if (cabinetBadge) cabinetBadge.textContent = this.state.thoughtCabinet.internalized.length;

    const invBadge = document.getElementById('inv-count-badge');
    if (invBadge) invBadge.textContent = this.state.inventory.length;
  }

  // Render Scene POI markers
  renderScene() {
    this.sceneCanvas.innerHTML = '';
    CASE_DATA.pointsOfInterest.forEach(poi => {
      const marker = document.createElement('div');
      marker.className = `poi-marker ${this.activePoi?.id === poi.id ? 'active' : ''}`;
      marker.dataset.poiId = poi.id;
      marker.style.left = `${poi.x}%`;
      marker.style.top = `${poi.y}%`;

      marker.innerHTML = `
        <div class="poi-pulse-radar"></div>
        <div class="poi-pin-circle">${poi.icon}</div>
        <div class="poi-tooltip-card">
          <span class="poi-tooltip-title">${poi.title}</span>
          <span class="poi-tooltip-hint">${poi.description}</span>
        </div>
      `;

      marker.addEventListener('click', (e) => {
        e.stopPropagation();
        audio.playUiClick();
        this.selectPoi(poi);
      });

      this.sceneCanvas.appendChild(marker);
    });
  }

  selectPoi(poi) {
    // Prevent duplicate text spamming if already examining this POI at its root narrative
    if (this.activePoi?.id === poi.id && this.currentNodeId === poi.initialNode) {
      if (this.dialogueFeed) {
        this.dialogueFeed.scrollTop = 0;
      }
      return;
    }

    this.activePoi = poi;

    // Highlight the active POI marker
    document.querySelectorAll('.poi-marker').forEach(m => {
      m.classList.toggle('active', m.dataset.poiId === poi.id);
    });

    // Start fresh dialogue for this POI to avoid piling up duplicate old texts
    this.startDialogue(poi.initialNode, poi.title, poi, true);
  }

  // Dialogue Engine
  startDialogue(nodeId, interlocutorName, poi = null, isNewSession = false) {
    if (interlocutorName) {
      this.currentInterlocutor = interlocutorName;
      if (this.interlocutorNameEl) this.interlocutorNameEl.textContent = interlocutorName;
    }

    if (!poi && this.activePoi) {
      poi = this.activePoi;
    } else if (poi) {
      this.activePoi = poi;
      document.querySelectorAll('.poi-marker').forEach(m => {
        m.classList.toggle('active', m.dataset.poiId === poi.id);
      });
    }

    // When starting a new POI inspection, clear previous feed and show matching forensic visual banner
    if (isNewSession) {
      this.dialogueFeed.innerHTML = '';

      if (poi && poi.image) {
        const banner = document.createElement('div');
        banner.className = 'inspection-evidence-banner';
        banner.innerHTML = `
          <div class="evidence-image-frame">
            <img src="${poi.image}" alt="${poi.title}" class="evidence-img">
            <div class="evidence-scanline"></div>
            <span class="evidence-zoom-tag">🔍 FORENSIC VISUAL</span>
          </div>
          <div class="evidence-meta-block">
            <div class="evidence-poi-badge"><span class="badge-icon">${poi.icon}</span> FORENSIC INSPECTION</div>
            <div class="evidence-poi-title">${poi.title}</div>
            <div class="evidence-poi-desc">${poi.description}</div>
          </div>
        `;
        this.dialogueFeed.appendChild(banner);
      }
    }

    this.renderDialogueNode(nodeId);
  }

  renderDialogueNode(nodeId) {
    const node = CASE_DATA.dialogueNodes[nodeId];
    if (!node) {
      console.warn(`Node ${nodeId} not found`);
      return;
    }

    this.currentNodeId = nodeId;
    this.state.advanceTime(10);

    // Execute state action if present
    if (typeof node.action === 'function') {
      node.action(this.state);
    }

    // Sound effect on typewriter prose
    audio.playTypewriter();

    // Create Entry block in feed
    const entry = document.createElement('div');
    entry.className = 'dialogue-entry';
    entry.innerHTML = `
      <div class="speaker-title-row">
        <span class="speaker-avatar">${node.avatar || '👤'}</span>
        <span class="speaker-label">${node.speaker || 'Narrative'}</span>
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

    // Render dialogue choice buttons
    this.renderChoices(node.options);

    // Scroll after layout recalculation so bottom content is never cut off
    requestAnimationFrame(() => {
      this.dialogueFeed.scrollTop = this.dialogueFeed.scrollHeight;
    });
  }

  renderChoices(options) {
    this.dialogueChoices.innerHTML = '';
    if (!options || options.length === 0) {
      const closeBtn = document.createElement('button');
      closeBtn.className = 'choice-btn';
      closeBtn.innerHTML = `<span class="choice-num">[1]</span> <span>[End conversation]</span>`;
      closeBtn.addEventListener('click', () => {
        this.currentNodeId = null;
        this.activePoi = null;
        document.querySelectorAll('.poi-marker').forEach(m => m.classList.remove('active'));
        this.dialogueChoices.innerHTML = '<div style="color:var(--text-muted);font-style:italic;padding:12px;">Select an inspection marker on the crime scene to investigate.</div>';
      });
      this.dialogueChoices.appendChild(closeBtn);
      return;
    }

    options.forEach((opt, idx) => {
      // Check conditional visibility
      if (opt.condition && !opt.condition(this.state)) {
        return;
      }

      const btn = document.createElement('button');
      btn.className = 'choice-btn';

      if (opt.check) {
        // Skill Check Button
        const check = opt.check;
        const skillBonus = this.state.getSkillTotal(check.skill);
        const prob = this.diceEngine.calculateSuccessProbability(skillBonus, check.difficulty);

        btn.classList.add(check.type === 'red' ? 'red-check' : 'white-check');
        btn.innerHTML = `
          <span class="choice-num">[${idx + 1}]</span>
          <span>${opt.text}</span>
          <span class="check-prob-pill">${prob}%</span>
        `;

        btn.addEventListener('click', () => {
          this.executeSkillCheck(opt, check);
        });
      } else {
        // Standard Dialogue Option
        btn.innerHTML = `
          <span class="choice-num">[${idx + 1}]</span>
          <span>${opt.text}</span>
        `;

        btn.addEventListener('click', () => {
          audio.playUiClick();
          if (opt.action === 'close_dialogue') {
            this.currentNodeId = null;
            this.activePoi = null;
            document.querySelectorAll('.poi-marker').forEach(m => m.classList.remove('active'));
            this.dialogueChoices.innerHTML = '<div style="color:var(--text-muted);font-style:italic;padding:12px;">Select an inspection marker on the crime scene to investigate.</div>';
          } else if (opt.action === 'trigger_victory') {
            this.showVictoryScreen();
          } else if (opt.nextNode) {
            this.renderDialogueNode(opt.nextNode);
          }
        });
      }

      this.dialogueChoices.appendChild(btn);
    });
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

    checkHeader.textContent = `${checkConfig.skill.toUpperCase()} CHECK (VS ${checkConfig.difficulty})`;
    d1El.classList.add('rolling');
    d2El.classList.add('rolling');
    outcomeEl.textContent = 'ROLLING D20 IN YOUR MIND...';
    outcomeEl.className = 'outcome-announcement';
    scoreVal.textContent = '?';
    proceedBtn.style.display = 'none';

    // Execute check calculation
    const result = this.diceEngine.rollCheck(checkConfig);

    // Roll animation delay
    setTimeout(() => {
      d1El.classList.remove('rolling');
      d2El.classList.remove('rolling');

      this.renderDiePips(d1El, result.d1);
      this.renderDiePips(d2El, result.d2);

      scoreVal.textContent = `${result.diceSum} + ${result.totalBonus} = ${result.totalScore}`;

      if (result.isCriticalSuccess) {
        outcomeEl.textContent = 'CRITICAL SUCCESS (EPIPHANY)';
        outcomeEl.className = 'outcome-announcement critical';
      } else if (result.isCriticalFailure) {
        outcomeEl.textContent = 'CRITICAL FAILURE (SNAKE EYES)';
        outcomeEl.className = 'outcome-announcement failed';
      } else if (result.passed) {
        outcomeEl.textContent = 'CHECK PASSED';
        outcomeEl.className = 'outcome-announcement passed';
      } else {
        outcomeEl.textContent = 'CHECK FAILED';
        outcomeEl.className = 'outcome-announcement failed';
      }

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
    // Positions for 3x3 grid
    const patterns = {
      1: [4],
      2: [0, 8],
      3: [0, 4, 8],
      4: [0, 2, 6, 8],
      5: [0, 2, 4, 6, 8],
      6: [0, 2, 3, 5, 6, 8]
    };
    const activeIndices = patterns[number] || [];
    for (let i = 0; i < 9; i++) {
      const pip = document.createElement('div');
      if (activeIndices.includes(i)) {
        pip.className = 'die-pip';
      }
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
    const allThoughts = THOUGHTS_CATALOG;

    allThoughts.forEach(thought => {
      const isKnown = this.state.thoughtCabinet.known.some(t => t.id === thought.id);
      const isCooking = this.state.thoughtCabinet.internalizing.find(t => t.id === thought.id);
      const isDone = this.state.thoughtCabinet.internalized.find(t => t.id === thought.id);

      const node = document.createElement('div');
      node.className = 'thought-slot-node';

      let statusText = 'Undiscovered';
      if (isDone) {
        node.classList.add('internalized');
        statusText = 'Internalized';
      } else if (isCooking) {
        node.classList.add('internalizing');
        statusText = `${isCooking.progress}/${isCooking.requiredTicks} Ticks`;
      } else if (isKnown) {
        statusText = 'Available';
      }

      node.innerHTML = `
        <div class="thought-icon-emblem">${isDone ? '🌟' : (isCooking ? '⏳' : (isKnown ? '💡' : '❓'))}</div>
        <div class="thought-node-name">${isKnown || isCooking || isDone ? thought.name : 'Unknown Idea'}</div>
        <div class="thought-status-pill">${statusText}</div>
      `;

      node.addEventListener('click', () => {
        document.querySelectorAll('.thought-slot-node').forEach(n => n.classList.remove('active-selected'));
        node.classList.add('active-selected');
        this.inspectThought(thought, isKnown, isCooking, isDone);
      });

      this.thoughtNodesContainer.appendChild(node);
    });

    // Inspect first available thought
    if (allThoughts[0]) {
      this.inspectThought(allThoughts[0]);
    }
  }

  inspectThought(thought, isKnown, isCooking, isDone) {
    let actionBtnHtml = '';
    if (isDone) {
      actionBtnHtml = `<div style="color:var(--gold-accent);font-family:var(--font-mono);font-size:0.85rem;text-align:center;">✨ PERMANENTLY INTERNALIZED IN SYNAPSES</div>`;
    } else if (isCooking) {
      actionBtnHtml = `<div style="color:var(--color-psyche);font-family:var(--font-mono);font-size:0.85rem;text-align:center;">⏳ Internalizing... (${isCooking.progress}/${thought.requiredTicks} case moments passed)</div>`;
    } else if (isKnown) {
      actionBtnHtml = `<button class="internalize-action-btn" id="btn-start-internalize">INTERNALIZE THIS THOUGHT</button>`;
    } else {
      actionBtnHtml = `<div style="color:var(--text-muted);font-style:italic;font-size:0.85rem;text-align:center;">Investigate further in Saint Irene to unlock this thought.</div>`;
    }

    this.thoughtInspector.innerHTML = `
      <span class="category-tag">${thought.category}</span>
      <h3 class="thought-heading">${thought.name}</h3>
      <div class="thought-flavor-quote">"${thought.flavor}"</div>
      <div class="thought-deep-explanation">${thought.explanation}</div>

      <div class="thought-stat-box">
        <span class="box-title">Temporary Contemplation Effect</span>
        <span class="penalty-text">${thought.tempDrawback}</span>
      </div>

      <div class="thought-stat-box">
        <span class="box-title">Permanent Psychological Breakthrough</span>
        <span class="bonus-text">${thought.solution}</span>
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

  // Inventory Modal
  openInventoryModal() {
    this.openModal(this.inventoryModal);
    this.renderInventory();
  }

  renderInventory() {
    this.inventoryContainer.innerHTML = '';
    this.state.inventory.forEach(item => {
      const card = document.createElement('div');
      card.className = 'inv-card';

      let bonusText = '';
      if (item.bonus) {
        bonusText = Object.entries(item.bonus).map(([k, v]) => `+${v} ${k.toUpperCase()}`).join(', ');
      }

      card.innerHTML = `
        <div class="inv-header">
          <span class="inv-icon">${item.icon}</span>
          <div>
            <div class="inv-name">${item.name}</div>
            <span class="inv-type-pill">${item.type}</span>
          </div>
        </div>
        <div class="inv-description">${item.description}</div>
        ${bonusText ? `<div class="inv-bonus-text">Buff: ${bonusText}</div>` : ''}
        ${item.type === 'consumable' ? `<button class="inv-use-btn" data-id="${item.id}">USE (${item.uses || 1})</button>` : ''}
      `;

      card.querySelector('.inv-use-btn')?.addEventListener('click', () => {
        this.state.useItem(item.id);
        audio.playUiClick();
        this.renderInventory();
      });

      this.inventoryContainer.appendChild(card);
    });
  }

  // Clues Modal
  openCluesModal() {
    this.openModal(this.cluesModal);
    this.cluesContainer.innerHTML = '';
    if (this.state.clues.length === 0) {
      this.cluesContainer.innerHTML = '<div style="color:var(--text-muted);font-style:italic;padding:16px;">No decisive clues uncovered yet. Examine the crime scene thoroughly.</div>';
      return;
    }

    this.state.clues.forEach(clue => {
      const card = document.createElement('div');
      card.className = 'clue-card';
      card.innerHTML = `
        <div class="clue-title-line">📌 ${clue.title}</div>
        <div class="clue-detail-text">${clue.desc}</div>
      `;
      this.cluesContainer.appendChild(card);
    });
  }

  // Victory / Case Closed Modal
  showVictoryScreen() {
    this.openModal(this.victoryModal);
    audio.playSuccess();
    const sum = document.getElementById('victory-summary-text');
    if (sum) {
      sum.innerHTML = `
        <strong>CASE FILE: THE SILENT WATCHMAKER OF SAINT IRENE</strong><br><br>
        Lead Investigator: <em>${this.state.detective.name}</em> ("${this.state.detective.alias}")<br>
        Signature Facet: <em>${this.state.detective.signatureSkill.toUpperCase()}</em><br>
        Clues Uncovered: <em>${this.state.clues.length} pieces of evidence</em><br>
        Thoughts Internalized: <em>${this.state.thoughtCabinet.internalized.length}</em><br><br>
        You have solved one of the darkest conspiracies in District 7. The rain continues to pour over the city, but tonight, justice—or something resembling it—has been wrought.
      `;
    }
  }
}

// --- END: ui.js ---

// --- BEGIN: main.js ---
// Aenigma Main Bootstrap & Flow Orchestrator

const PHILOSOPHICAL_QUOTES = [
  "“The clock never stops. Only the flesh within it forgets how to beat.”",
  "“There is a place where every unanswered question gathers like dead skin.”",
  "“You cannot interrogate the fog. It already knows what you did.”",
  "“Amnesia is not an absence of memory, but a presence of self-preservation.”",
  "“In District 7, even the statues have pawn shop tags tied to their wrists.”"
];

const TELEMETRY_PHASES = [
  { at: 15, text: "Calibrating fractured synapses..." },
  { at: 35, text: "Waking internal faculties: Ratio, Elysia, Carnal, Reflex..." },
  { at: 60, text: "Loading forensic archives: Precinct 4..." },
  { at: 85, text: "Reconstructing crime scene: Saint Irene Clocktower, 04:17 AM..." },
  { at: 100, text: "Consciousness restored. Ready to investigate." }
];

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
    quoteIdx = (quoteIdx + 1) % PHILOSOPHICAL_QUOTES.length;
    if (quoteEl) {
      quoteEl.style.opacity = '0';
      setTimeout(() => {
        quoteEl.textContent = PHILOSOPHICAL_QUOTES[quoteIdx];
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
    if (telemetryText) telemetryText.textContent = "Consciousness restored. Ready to investigate.";
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

    const phase = TELEMETRY_PHASES.find(p => currentProgress <= p.at);
    if (phase && telemetryText) {
      telemetryText.textContent = phase.text;
    }
  }, 45);

  function enterGameStage() {
    audio.init();
    audio.playDiscovery();
    const creatorStage = document.getElementById('creator-stage');

    loadingStage.classList.add('hidden');
    setTimeout(() => {
      loadingStage.style.display = 'none';
      if (creatorStage) {
        creatorStage.classList.remove('hidden');
      }
      initCharacterCreator();
    }, 400);
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
      const aliases = [
        'The Dissolute Inspector',
        'The Ghost of Precinct 4',
        'The Broken Dialectician',
        'The Saint of Hangovers',
        'The Clockwork Cynic',
        'The Desolate Poet'
      ];
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
      if (pointsPoolEl) pointsPoolEl.textContent = `${availablePoints} Points Available`;
      ['intellect', 'psyche', 'physique', 'motorics'].forEach(a => {
        const valEl = document.getElementById(`attr-val-${a}`);
        if (valEl) valEl.textContent = currentAttr[a];
      });
    }

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
        ui.renderScene();
        const initialPoi = (window.CASE_DATA || CASE_DATA)?.pointsOfInterest?.find(p => p.id === 'poi_pendulum');
        ui.startDialogue('examine_pendulum_start', 'Crime Scene: Pendulum Chamber', initialPoi);
        ui.showToast(`Case File Opened: Aurelia Vance · Welcome to District 7, Detective ${finalName}`);
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


// --- END: main.js ---


})();
