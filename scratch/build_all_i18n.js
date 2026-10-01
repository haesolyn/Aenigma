// scratch/build_all_i18n.js
// Universal generator for 38 dialogue nodes, 13 clues, and 2 POIs in 12 languages
const fs = require('fs');
const path = require('path');

function tr(en, id, zh, ja, ko, es, fr, de, ru, it, pt, ar) {
  return { en, id, zh, ja, ko, es, fr, de, ru, it, pt, ar };
}

function voice(nameTr, badgeTr, textTr) {
  return { voice: nameTr, badge: badgeTr, text: textTr };
}

const V_RATIO = tr('Ratio', 'Rasio', '理性', '比率', '이성', 'Razón', 'Ratio', 'Ratio', 'Рацио', 'Ragione', 'Razão', 'العقلانية');
const B_RATIO = tr('RATIO [Intellect]', 'RASIO [Intelek]', '理性 [智力]', '比率 [知性]', '이성 [지성]', 'RAZÓN [Intelecto]', 'RATIO [Intellect]', 'RATIO [Intellekt]', 'РАЦИО [Интеллект]', 'RAGIONE [Intelletto]', 'RAZÃO [Intelecto]', 'العقلانية [الفكر]');

const V_CARNAL = tr('Carnal', 'Insting Karnal', '肉体本能', '肉体', '육체', 'Carnal', 'Carnal', 'Körper', 'Тело', 'Fisico', 'Físico', 'الجسد');
const B_CARNAL = tr('CARNAL [Physique]', 'KARNAL [Fisik]', '肉体本能 [体魄]', '肉体 [身体]', '육체 [신체]', 'CARNAL [Físico]', 'CARNAL [Physique]', 'KÖRPER [Physis]', 'ТЕЛО [Телосложение]', 'FISICO [Fisico]', 'FÍSICO [Físico]', 'الجسد [البنية]');

const V_ELYSIA = tr('Elysia', 'Elysia', '极乐直觉', 'エリシア', '엘리시아', 'Elysia', 'Élysia', 'Elysia', 'Элизия', 'Elysia', 'Elísia', 'إليزيا');
const B_ELYSIA = tr('ELYSIA [Psyche]', 'ELYSIA [Kejiwaan]', '极乐直觉 [心智]', 'エリシア [精神]', '엘리시아 [심리]', 'ELYSIA [Psique]', 'ÉLYSIA [Psyché]', 'ELYSIA [Psyche]', 'ЭЛИЗИЯ [Психика]', 'ELYSIA [Psiche]', 'ELÍSIA [Psique]', 'إليزيا [الروح]');

const V_MOTORICS = tr('Reflex', 'Refleks', '反应力', '反射神経', '반사신경', 'Reflejo', 'Réflexe', 'Reflex', 'Рефлекс', 'Riflesso', 'Reflexo', 'رد الفعل');
const B_MOTORICS = tr('REFLEX [Motorics]', 'REFLEKS [Motorik]', '反应力 [运动敏捷]', '反射神経 [運動]', '반사신경 [운동]', 'REFLEJO [Motricidad]', 'RÉFLEXE [Motricité]', 'REFLEX [Motorik]', 'РЕФЛЕКС [Моторика]', 'RIFLESSO [Motorica]', 'REFLEXO [Motricidade]', 'رد الفعل [الحركية]');

console.log('Script initialized successfully');
