// Aenigma 2D6 Skill Check Engine
import { audio } from './audio.js';

export class DiceEngine {
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
