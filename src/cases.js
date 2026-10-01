// Aenigma Case Narrative Data: "The Silent Watchmaker of Saint Irene"

export const CASE_DATA = {
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
