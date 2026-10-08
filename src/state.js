// Aenigma Central Game State & Reactive Store
import { firebaseService } from './firebase.js';

const STORAGE_KEY = 'aenigma_detective_save_v1';
const LANG_STORAGE_KEY = 'aenigma_language_preference';

export class GameState {
  constructor() {
    this.listeners = [];
    const savedLang = (typeof localStorage !== 'undefined') ? localStorage.getItem(LANG_STORAGE_KEY) : null;
    const validLangs = ['en', 'id', 'zh', 'ja', 'ko'];
    let defaultLang = 'en';
    if (typeof window !== 'undefined' && window.__AENIGMA_LANG__ && validLangs.includes(window.__AENIGMA_LANG__)) {
      defaultLang = window.__AENIGMA_LANG__;
    } else if (typeof navigator !== 'undefined' && navigator.language) {
      const navLang = navigator.language.toLowerCase();
      if (navLang.startsWith('id')) defaultLang = 'id';
      else if (navLang.startsWith('ja')) defaultLang = 'ja';
      else if (navLang.startsWith('zh')) defaultLang = 'zh';
      else if (navLang.startsWith('ko')) defaultLang = 'ko';
    }
    this.currentLanguage = validLangs.includes(savedLang) ? savedLang : defaultLang;
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
    this.save();
    if (this.detective.health <= 0) {
      this.triggerGameOver('physical', 'Cardiac Arrest / Physical Collapse');
    }
  }

  healHealth(amount = 1) {
    this.detective.health = Math.min(this.detective.maxHealth, this.detective.health + amount);
    this.notify('health_changed', { current: this.detective.health, max: this.detective.maxHealth, delta: amount });
    this.checkSurvivalState();
    this.save();
  }

  damageMorale(amount = 1) {
    this.detective.morale = Math.max(0, this.detective.morale - amount);
    this.notify('morale_changed', { current: this.detective.morale, max: this.detective.maxMorale, delta: -amount });
    this.checkSurvivalState();
    this.save();
    if (this.detective.morale <= 0) {
      this.triggerGameOver('psychological', 'Existential Psychosis & Breakdown');
    }
  }

  healMorale(amount = 1) {
    this.detective.morale = Math.min(this.detective.maxMorale, this.detective.morale + amount);
    this.notify('morale_changed', { current: this.detective.morale, max: this.detective.maxMorale, delta: amount });
    this.checkSurvivalState();
    this.save();
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
    this.save();
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
      this.save();
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
      this.save();
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
    this.save();
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
    if (finished.length > 0) {
      this.save();
    }
  }

  // Persistence & Serialization
  serialize() {
    return {
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
  }

  applyLoadedData(data) {
    if (!data) return false;
    if (data.detective) this.detective = { ...this.detective, ...data.detective };
    if (data.time) this.time = { ...this.time, ...data.time };
    if (Array.isArray(data.inventory)) this.inventory = data.inventory;
    if (Array.isArray(data.clues)) this.clues = data.clues;
    if (data.thoughtCabinet) this.thoughtCabinet = data.thoughtCabinet;
    if (data.flags) this.flags = { ...this.flags, ...data.flags };
    if (data.resolvedChecks) this.resolvedChecks = data.resolvedChecks;
    if (data.visitedChoices) this.visitedChoices = data.visitedChoices;
    if (data.currentLanguage) this.currentLanguage = data.currentLanguage;

    this.checkSurvivalState();
    this.notify('loaded', this);
    return true;
  }

  save(syncCloud = true) {
    try {
      const data = this.serialize();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      this.notify('saved');

      if (syncCloud && typeof firebaseService !== 'undefined' && firebaseService) {
        firebaseService.queueSaveToCloud(data);
      }
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
      return this.applyLoadedData(data);
    } catch (e) {
      console.error('Failed to load state:', e);
      return false;
    }
  }

  async saveToCloudNow() {
    if (typeof firebaseService !== 'undefined' && firebaseService) {
      const data = this.serialize();
      return await firebaseService.saveGameToCloud(data);
    }
    return { success: false, reason: 'Firebase service not initialized' };
  }

  async loadFromCloud() {
    if (typeof firebaseService !== 'undefined' && firebaseService) {
      const res = await firebaseService.loadGameFromCloud();
      if (res && res.success && res.data) {
        this.applyLoadedData(res.data);
        this.save(false); // Update local cache
        return true;
      }
    }
    return false;
  }
}

export const state = new GameState();
