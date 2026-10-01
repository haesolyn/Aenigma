const fs = require('fs');
const path = require('path');

const casesPath = path.join(__dirname, '..', 'src', 'cases.js');
let content = fs.readFileSync(casesPath, 'utf8');

// 1. Add 2 new POIs to pointsOfInterest
const newPoisCode = `,
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
    }`;

if (!content.includes('poi_gantry_lantern')) {
  content = content.replace(/(id:\s*'poi_floorboard'[\s\S]*?\}\s*\])/, match => {
    return match.replace(/\}\s*\]$/, '}' + newPoisCode + '\n  ]');
  });
}

// 2. Update graves_dialogue_start options to have conditions and unique IDs
const oldGravesOpts = `      options: [
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
      ]`;

const newGravesOpts = `      options: [
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
      ]`;

if (content.includes(oldGravesOpts)) {
  content = content.replace(oldGravesOpts, newGravesOpts);
}

// 3. Update examine_pendulum_start options
const oldPendulumOpts = `      options: [
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
          text: '[DANGEROUS] Reach deep into the churning escapement gears to look for dropped evidence.',
          nextNode: 'pendulum_gear_crush'
        },
        {
          text: '[Step back from the corpse]',
          action: 'close_dialogue'
        }
      ]`;

const newPendulumOpts = `      options: [
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
      ]`;

if (content.includes(oldPendulumOpts)) {
  content = content.replace(oldPendulumOpts, newPendulumOpts);
}

// 4. Update examine_watch_start options
const oldWatchOpts = `      options: [
        {
          text: '[INTERFACING - Medium 11] Pop open the back casing with your thumbnail to examine the inner movement.',
          check: {
            checkId: 'check_pop_watch',
            type: 'white',
            skill: 'interfacing',
            difficulty: 11,
            successNode: 'watch_open_win',
            failNode: 'watch_open_fail'
          }
        },
        {
          text: '[Put the watch in evidence bag]',
          nextNode: 'examine_watch_done'
        },
        {
          text: '[Step back]',
          action: 'close_dialogue'
        }
      ]`;

const newWatchOpts = `      options: [
        {
          id: 'watch_opt_interface',
          condition: (state) => !state.hasClue('clue_watch_code'),
          text: '[INTERFACING - Medium 11] Pop open the back casing with your thumbnail to examine the inner movement.',
          check: {
            checkId: 'check_pop_watch',
            type: 'white',
            skill: 'interfacing',
            difficulty: 11,
            successNode: 'watch_open_win',
            failNode: 'watch_open_fail'
          }
        },
        {
          id: 'watch_opt_take',
          condition: (state) => !state.hasItem('item_pocketwatch'),
          text: '[Put the watch in evidence bag]',
          nextNode: 'examine_watch_done'
        },
        {
          id: 'watch_opt_back',
          text: '[Step back]',
          action: 'close_dialogue'
        }
      ]`;

if (content.includes(oldWatchOpts)) {
  content = content.replace(oldWatchOpts, newWatchOpts);
}

// 5. Update examine_balcony_start options
const oldBalconyOpts = `      options: [
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
          nextNode: 'balcony_fog_reflection'
        },
        {
          text: '[Return inside]',
          action: 'close_dialogue'
        }
      ]`;

const newBalconyOpts = `      options: [
        {
          id: 'balcony_opt_search',
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
          nextNode: 'balcony_fog_reflection'
        },
        {
          id: 'balcony_opt_return',
          text: '[Return inside]',
          action: 'close_dialogue'
        }
      ]`;

if (content.includes(oldBalconyOpts)) {
  content = content.replace(oldBalconyOpts, newBalconyOpts);
}

// 6. Update examine_safe_start options
const oldSafeOpts = `      options: [
        {
          text: '[If combination known (7-3-12)] Enter the code found inside Aurelia\\'s watch.',
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
          text: '[BRUTE FORCE - Dangerous] Try to pry open the heavy lid with brute force.',
          nextNode: 'safe_brute_trap'
        },
        {
          text: '[Leave safe untouched]',
          action: 'close_dialogue'
        }
      ]`;

const newSafeOpts = `      options: [
        {
          id: 'safe_opt_code',
          condition: (state) => !state.hasClue('clue_perpetuum_ledger') && state.hasClue('clue_watch_code'),
          text: '[If combination known (7-3-12)] Enter the code found inside Aurelia\\'s watch.',
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
          text: '[BRUTE FORCE - Dangerous] Try to pry open the heavy lid with brute force.',
          nextNode: 'safe_brute_trap'
        },
        {
          id: 'safe_opt_leave',
          text: '[Leave safe untouched]',
          action: 'close_dialogue'
        }
      ]`;

if (content.includes(oldSafeOpts)) {
  content = content.replace(oldSafeOpts, newSafeOpts);
}

// 7. Update madame_dialogue_start options
const oldMadameOpts = `      options: [
        {
          text: '"Where were you at 03:42 AM when the tower clock stopped?"',
          nextNode: 'madame_alibi'
        },
        {
          text: '[EMPATHY - Medium 10] "You did not love her, did you, Madame?"',
          check: {
            checkId: 'madame_empathy_check',
            type: 'white',
            skill: 'empathy',
            difficulty: 10,
            successNode: 'madame_empathy_win',
            failNode: 'madame_empathy_fail'
          }
        },
        {
          text: '[RED CHECK] [AUTHORITY - Challenging 13] "Enough theatrics, Vivienne. We found the poisoned chess queen and the torn velvet from your coat on the balcony. You murdered her."',
          check: {
            checkId: 'madame_authority_confront',
            type: 'red',
            skill: 'authority',
            difficulty: 13,
            successNode: 'madame_confession_win',
            failNode: 'madame_confession_fail'
          }
        },
        {
          text: '[RASH ACCUSATION - Dangerous] "I don\\'t need evidence, Vivienne! You killed Aurelia and I am arresting you right now!"',
          nextNode: 'madame_premature_arrest_fail'
        },
        {
          text: '[Step away]',
          action: 'close_dialogue'
        }
      ]`;

const newMadameOpts = `      options: [
        {
          id: 'madame_opt_alibi',
          text: '"Where were you at 03:42 AM when the tower clock stopped?"',
          nextNode: 'madame_alibi'
        },
        {
          id: 'madame_opt_empathy',
          condition: (state) => !state.hasClue('clue_madame_motive'),
          text: '[EMPATHY - Medium 10] "You did not love her, did you, Madame?"',
          check: {
            checkId: 'madame_empathy_check',
            type: 'white',
            skill: 'empathy',
            difficulty: 10,
            successNode: 'madame_empathy_win',
            failNode: 'madame_empathy_fail'
          }
        },
        {
          id: 'madame_opt_confront',
          condition: (state) => state.hasClue('clue_poison_needle') && state.hasClue('clue_velvet_cyanide'),
          text: '[RED CHECK] [AUTHORITY - Challenging 13] "Enough theatrics, Vivienne. We found the poisoned chess queen and the torn velvet from your coat on the balcony. You murdered her."',
          check: {
            checkId: 'madame_authority_confront',
            type: 'red',
            skill: 'authority',
            difficulty: 13,
            successNode: 'madame_confession_win',
            failNode: 'madame_confession_fail'
          }
        },
        {
          id: 'madame_opt_rash',
          condition: (state) => !state.hasClue('clue_confession_full'),
          text: '[RASH ACCUSATION - Dangerous] "I don\\'t need evidence, Vivienne! You killed Aurelia and I am arresting you right now!"',
          nextNode: 'madame_premature_arrest_fail'
        },
        {
          id: 'madame_opt_away',
          text: '[Step away]',
          action: 'close_dialogue'
        }
      ]`;

if (content.includes(oldMadameOpts)) {
  content = content.replace(oldMadameOpts, newMadameOpts);
}

// 8. Update madame_confession_win options to add 3rd ending
const oldConfessionOpts = `      options: [
        {
          text: '[DELIVER FINAL JUDGMENT: Arrest Madame Vance for murder]',
          nextNode: 'ending_arrest'
        },
        {
          text: '[DELIVER FINAL JUDGMENT: Hide the Perpetuum Ledger and file it as an accidental death]',
          nextNode: 'ending_coverup'
        }
      ]`;

const newConfessionOpts = `      options: [
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
          text: '[DELIVER REVOLUTIONARY JUDGMENT: Hand the Perpetuum Ledger to the Worker\\'s Union press and expose the Syndicate!]',
          nextNode: 'ending_syndicate_bust'
        }
      ]`;

if (content.includes(oldConfessionOpts)) {
  content = content.replace(oldConfessionOpts, newConfessionOpts);
}

// 9. Add the 3 new nodes to dialogueNodes if not present
const newNodesCode = `
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
`;

if (!content.includes('examine_gantry_lantern:')) {
  content = content.replace(/(ending_coverup:\s*\{[\s\S]*?\}\s*\}\s*\}\s*;?\s*$)/, newNodesCode + '\n    $1');
}

fs.writeFileSync(casesPath, content, 'utf8');
console.log('Successfully updated src/cases.js!');
