// scratch/generate_i18n_json.js
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

// Read existing 15 nodes from build_dialogues.js
const bContent = fs.readFileSync(path.join(__dirname, 'build_dialogues.js'), 'utf8');
const match = bContent.match(/const DIALOGUE_DATA = ([\s\S]*?);\s*const fullOutput/);
if (!match) {
  console.error('Could not match DIALOGUE_DATA in build_dialogues.js');
  process.exit(1);
}

const baseNodes = eval('(' + match[1] + ')');
console.log('Loaded base nodes count:', Object.keys(baseNodes).length);

const NODES = { ...baseNodes };

// 1. graves_rhetoric_fail
NODES.graves_rhetoric_fail = {
  speaker: tr('Inspector Graves', 'Inspektur Graves', '格雷夫斯警探', 'グレイヴス警部', '그레이브스 형사', 'Inspector Graves', 'Inspecteur Graves', 'Inspektor Graves', 'Инспектор Грейвс', 'Ispettore Graves', 'Inspetor Graves', 'المفتش غريفز'),
  text: tr(
    "Graves laughs harshly, coughing into his fist. 'Don\'t play grand interrogator with me, partner. You don\'t even remember your own badge number after last night\'s binge. Check the body or let me do my job.'",
    "Graves tertawa getir sambil batuk. 'Jangan sok jadi detektif agung di depanku, sobat. Nomor lencanamu saja kamu lupa setelah mabuk semalam. Periksa mayat itu atau biarkan aku yang bekerja.'",
    "格雷夫斯冷笑一声，握拳咳嗽。“别在我面前装大审讯官了，搭档。昨晚狂喝之后你连自己警徽号都记不清了吧？去查尸体，不然就别挡着我办公。”",
    "グレイヴスは冷笑し、咳き込んだ。「偉そうに尋問官気取るんじゃねえ。昨夜の酒でバッジ番号も忘れたくせに。遺体を調べるか、邪魔するな。」",
    "그레이브스는 헛기침하며 비웃었습니다. '위대한 심문관 흉내 내지 마시오. 어젯밤 술로 배지 번호도 까먹었으면서. 시체나 보든가 방해 말든가 하시오.'",
    "Graves se ríe con aspereza tosiendo en su puño. 'No te hagas el gran inquisidor. Ni recuerdas tu placa tras la borrachera. Revisa el cadáver o déjame trabajar.'",
    "Graves ricane et tousse dans son poing. 'Ne jouez pas les inquisiteurs. Vous ignorez votre matricule après votre cuite. Examinez le corps ou laissez-moi faire.'",
    "Graves lacht heiser in die Faust. 'Spielen Sie nicht den Großinquisitor. Nach dem Rausch wissen Sie nicht mal Ihre Dienstnummer. Prüfen Sie die Leiche oder lassen Sie mich arbeiten.'",
    "Грейвс резко усмехается и кашляет в кулак. «Не строй из себя следователя. После пьянки ты свой жетон не помнишь. Осматривай труп или не мешай.»",
    "Graves ride aspramente tossendo nel pugno. 'Non fare il grande inquisitore. Non ricordi la matricola dopo la sbronza. Esamina il cadavere o lasciami fare.'",
    "Graves ri com aspereza tossindo no punho. 'Não se faça de grande inquisidor. Nem lembra sua placa após a bebedeira. Examine o corpo ou deixe-me trabalhar.'",
    "ضحك غريفز باستهزاء وسعل في قبضته: 'لا تمارس دور المحقق العظيم، فأنت لا تذكر رقم شارتك بعد خمر البارحة! افحص الجثة أو دعني أعمل.'"
  ),
  options: [
    tr('"Fine. Let me inspect the corpse."', '"Baiklah. Biarkan aku memeriksa jenazahnya."', '“好吧，我去勘验尸体。”', '「いいだろう。遺体を調べる。」', '"좋소. 시신을 확인하겠소."', '"Bien. Dejadme inspeccionar el cuerpo."', '"Bien. Laissez-moi examiner le cadavre."', '"Schön. Ich untersuche die Leiche."', '«Ладно. Пойду осмотрю труп.»', '"Va bene. Vado a esaminare il corpo."', '"Certo. Deixe-me examinar o corpo."', '"حسنًا، دعني أفحص الجثة بنفسي."')
  ]
};

// 2. graves_debate_wound
NODES.graves_debate_wound = {
  speaker: tr('Inspector Graves', 'Inspektur Graves', '格雷夫斯警探', 'グレイヴス警部', '그레이브스 형사', 'Inspector Graves', 'Inspecteur Graves', 'Inspektor Graves', 'Инспектор Грейвс', 'Ispettore Graves', 'Inspetor Graves', 'المفتش غريفز'),
  text: tr(
    "Graves scowls, waving his lantern over the corpse. 'Maybe she fell from the upper gantry! Look, Detective, until you show me a second set of footprints or a weapon with someone else\'s fingerprints, the Captain wants this stamped as accidental death.'",
    "Graves merengut sambil melambaikan lenteranya. 'Mungkin dia jatuh dari lantai atas! Dengar Detektif, sampai kamu bisa menunjukkan jejak kaki kedua atau senjata dengan sidik jari orang lain, Kapten ingin kasus ini dicap sebagai kecelakaan.'",
    "格雷夫斯皱眉晃了晃提灯。“说不定她是从上层高架走道跌落的！听着，除非你拿出第二副脚印或凶器指纹，否则队长就定性为意外身亡。”",
    "グレイヴスは顔をしかめてカンテラを掲げた。「上層通路から落ちたのかも知れんだろ！第2の足跡か指紋付きの凶器が出ない限り、隊長は事故死で処理する腹だ。」",
    "그레이브스는 찌푸리며 등불을 비췄습니다. '상층 통로에서 떨어졌을 수도 있잖소! 제2의 발자국이나 지문 묻은 흉기가 없는 한 서장님은 사고사로 처리할 거요.'",
    "Graves frunce el ceño agitando la linterna. '¡Quizá cayó de la pasarela! Sin segundas huellas o arma con huellas ajenas, el capitán quiere que sea accidente.'",
    "Graves se renfrogne en agitant sa lanterne. 'Peut-être a-t-elle chuté de la passerelle ! Sans autres empreintes ou arme, le Capitaine veut classer en accident.'",
    "Graves finstert und schwenkt die Laterne. 'Vielleicht stürzte sie vom oberen Steg! Ohne zweite Spuren oder Waffe mit Fingerabdrücken will der Captain einen Unfall.'",
    "Грейвс хмурится и светит фонарем. «Может, она упала с верхних мостков! Пока нет вторых следов или оружия с чужими пальцами, капитан требует оформить несчастный случай.»",
    "Graves si acciglia agitando la lanterna. 'Forse è caduta dal camminamento! Senza una seconda serie d\'impronte o un\'arma, il Capitano vuole l\'incidente.'",
    "Graves franze a testa com a lanterna. 'Talvez ela tenha caído da passarela! Sem outras pegadas ou arma com digitais, o Capitão quer isso como acidente.'",
    "قطب غريفز ملوحًا بفانوسه: 'ربما سقطت من الممشى العلوي! ما لم تحضر آثار أقدام أخرى أو سلاحًا يحمل بصمات، فإن القائد يريده حادثًا عرضيًا.'"
  ),
  options: [
    tr('"I will find the evidence. Just stay out of my way."', '"Aku akan temukan buktinya. Menyingkirlah dari jalanku."', '“我会找到证据的，别挡我的路。”', '「証拠は見つける。邪魔をするな。」', '"증거는 내가 찾겠소. 걸리적거리지나 마시오."', '"Encontraré las pruebas. Solo no te metas en mi camino."', '"Je trouverai les preuves. Ne restez pas dans mon chemin."', '"Ich werde die Beweise finden. Gehen Sie mir nur aus dem Weg."', '«Я найду улики. Не стой на пути.»', '"Troverò le prove. Tu non intralciarmi."', '"Eu encontrarei as provas. Apenas saia do meu caminho."', '"سأجد الدليل، فقط ابتعد عن طريقي."')
  ]
};

// 3. graves_last_seen
NODES.graves_last_seen = {
  speaker: tr('Inspector Graves', 'Inspektur Graves', '格雷夫斯警探', 'グレイヴス警部', '그레이브스 형사', 'Inspector Graves', 'Inspecteur Graves', 'Inspektor Graves', 'Инспектор Грейвс', 'Ispettore Graves', 'Inspetor Graves', 'المفتش غريفز'),
  text: tr(
    "'The widow. Madame Vivienne. She claims she brought him peppermint tea at midnight, then went down to the parish rectory for all-night vigil prayers. Convenient alibi, if you ask me.'",
    "'Sang janda. Nyonya Vivienne. Dia mengaku membawakan teh peppermint untuk Aurelia tengah malam tadi, lalu turun ke kapel untuk doa malam. Alibi yang sangat rapi jika kamu tanya pendapatku.'",
    "“是未亡人薇薇安夫人。她说午夜给奥蕾莉亚送了薄荷茶，之后便下楼到教区祈祷守夜。要我说，这不在场证明可真方便。”",
    "「未亡人のヴィヴィアン夫人だ。真夜中にペパーミントティーを届け、徹夜祈祷へ行ったと主張している。随分都合のいいアリバイだがな。」",
    "\"미망인 비비안 부인이오. 자정에 박하차를 가져다주고 밤샘 기도를 드리러 사제관으로 내려갔다고 하오. 참 편리한 알리바이요.\"",
    "'La viuda. Madame Vivienne. Dice que llevó té de menta a medianoche y bajó a rezar la vigilia. Coartada muy conveniente.'",
    "'La veuve. Madame Vivienne. Elle dit avoir apporté du thé à minuit avant de descendre veiller en prière. Bien commode.'",
    "'Die Witwe. Madame Vivienne. Sie behauptet, um Mitternacht Pfefferminztee gebracht zu haben und dann zur Nachtwache gegangen zu sein. Sehr praktisch.'",
    "«Вдова. Мадам Вивьен. Утверждает, что принесла чай в полночь, а затем пошла в часовню на всенощную. Удобное алиби.»",
    "'La vedova. Madame Vivienne. Dice di aver portato tè alla menta a mezzanotte e di essere scesa per la veglia. Molto comodo.'",
    "'A viúva. Madame Vivienne. Diz ter levado chá de hortelã à meia-noite e descido para a vigília. Álibi conveniente.'",
    "'الأرملة السيدة فيفيان. تدعي أنها قدمت لها شاي النعناع بمنتصف الليل ثم نزلت لصلاة الليل بالكنيسة. حجة مريحة ومريبة.'"
  ),
  options: [
    tr('"I should speak with Madame Vance directly."', '"Aku harus bicara langsung dengan Nyonya Vance."', '“我得直接找薇薇安夫人谈谈。”', '「ヴィヴィアン夫人と直接話そう。」', '"비비안 부인과 직접 대면해야겠소."', '"Hablaré con Madame Vance directamente."', '"Je devrais parler à Madame Vance directement."', '"Ich sollte direkt mit Madame Vance sprechen."', '«Мне нужно поговорить с мадам Вэнс лично.»', '"Dovrei parlare direttamente con Madame Vance."', '"Devo falar diretamente com Madame Vance."', '"يجب أن أستجوب السيدة فانس مباشرة."')
  ]
};

// 4. graves_ledger_hunt
NODES.graves_ledger_hunt = {
  speaker: tr('Inspector Graves', 'Inspektur Graves', '格雷夫斯警探', 'グレイヴス警部', '그레이브스 형사', 'Inspector Graves', 'Inspecteur Graves', 'Inspektor Graves', 'Инспектор Грейвс', 'Ispettore Graves', 'Inspetor Graves', 'المفتش غريفز'),
  text: tr(
    "'If I knew where it was, I wouldn\'t be freezing my kidneys off in this tower! Vance had a hidden floorboard safe somewhere beneath the secondary escapement. But the lock is an alchemical three-tumbler dial.'",
    "'Kalau aku tahu di mana tempatnya, aku tidak akan kedinginan sampai ke tulang di menara ini! Vance punya brankas tersembunyi di bawah lantai ruang escapement. Tapi kuncinya kombinasi tiga putaran alkimia.'",
    "“我要是知道在哪，何必在这冻掉腰子！奥蕾莉亚在副擒纵机构下的地板藏了保险箱，但那是三圈炼金滚轮密码锁。”",
    "「場所を知ってりゃこんな凍える塔に突っ立ってねえよ！ヴァンスは副脱進機下の床板に金庫を隠していた。だが3重の錬金ダイヤル錠だ。」",
    "\"장소를 알았다면 이 탑에서 얼어붙고 있겠소? 밴스는 보조 탈진기 바닥 밑에 금고를 숨겨뒀소. 3중 연금술 다이얼 자물쇠요.\"",
    "'¡Si lo supiera no me estaría congelando aquí! Vance tenía una caja oculta bajo el piso tras el escape. Pero tiene cerradura de tres diales.'",
    "'Si je le savais, je ne gèlerais pas ici ! Vance avait un coffre sous le plancher sous l\'échappement. Mais c\'est un cadran à trois disques.'",
    "'Wüsste ich das, würde ich nicht hier frieren! Vance hatte einen Bodentresor unter dem Werk. Doch das Schloss hat drei Alchemie-Drehscheiben.'",
    "«Знал бы я, не мерз бы здесь! У Вэнс был тайник под полом за спусковым механизмом. Но там трехдисковый алхимический замок.»",
    "'Se lo sapessi non sarei qui a congelare! La Vance aveva una cassaforte nel pavimento sotto lo scappamento con tre dischi alchemici.'",
    "'Se eu soubesse não estaria congelando aqui! Vance tinha um cofre no chão sob o escape com fechadura de três tambores.'",
    "'لو كنت أعلم مكانه لما تجمدت هنا! كان لدى فانس خزنة تحت ألواح الأرضية لكن قفلها مركب من ثلاثة أقراص كيميائية.'"
  ),
  options: [
    tr('"I\'ll inspect the floorboards."', '"Aku akan periksa papan lantainya."', '“我去搜查地板。”', '「床板を調べてみよう。」', '"바닥판을 살펴보겠소."', '"Inspeccionaré los tablones."', '"Je vais inspecter le plancher."', '"Ich werde die Dielen untersuchen."', '«Я осмотрю половицы.»', '"Ispezionerò le assi del pavimento."', '"Vou inspecionar o assoalho."', '"سأفحص ألواح الأرضية."')
  ]
};

// 5. pendulum_gear_crush
NODES.pendulum_gear_crush = {
  speaker: tr('Mechanical Hazard', 'Bahaya Mekanik', '齿轮绞夹危险', '歯車の危険', '기계 장치 위협', 'Peligro Mecánico', 'Danger Mécanique', 'Gefahr im Getriebe', 'Механическая ловушка', 'Pericolo Meccanico', 'Perigo Mecânico', 'خطر ميكانيكي'),
  text: tr(
    "You lean too close to the oscillating gear train. A brass spur catches your sleeve, violently jerking you toward the teeth! You wrench yourself free just in time (-1 Health)!",
    "Kamu membungkuk terlalu dekat ke susunan roda gigi yang berosilasi. Roda gigi kuningan menyambar lengan bajumu, menyentakmu ke arah gerigi tajam! Kamu berhasil melepaskan diri tepat waktu (-1 Daya Tahan)!",
    "你靠得太近，转动的黄铜齿轮猛地绞住了衣袖，差点将你卷入齿列！你奋力挣脱（生命值 -1）！",
    "歯車列に近付きすぎた。真鍮の突起が袖を噛み、鋭い歯車へ引きずり込もうとする！間一髪で引き剥がした（体力 -1）！",
    "톱니바퀴 축에 너무 접근했습니다. 황동 톱니가 소매를 낚아채 끌어당깁니다! 필사적으로 몸을 빼냈습니다 (체력 -1)!",
    "Te inclinas demasiado. ¡Un diente de latón atrapa tu manga tirando hacia los engranajes! Te liberas a tiempo (-1 Salud).",
    "Trop près du rouage, une dent en laiton happe votre manche et vous tire ! Vous vous dégagez de justesse (-1 Santé).",
    "Sie beugen sich zu nah ran. Ein Zahn erfasst den Ärmel und zerrt Sie ins Räderwerk! Sie reißen sich los (-1 Gesundheit).",
    "Ты наклоняешься слишком близко. Шестерня цепляет рукав и дергает в зубья! Едва успеваешь вырваться (-1 Здоровье).",
    "Ti sporgi troppo. Un dente d\'ottone aggancia la manica trascinandoti verso gli ingranaggi! Ti liberi a stento (-1 Salute).",
    "Você se inclina demais. Um dente puxa sua manga para as engrenagens! Você se liberta no último segundo (-1 Saúde).",
    "اقتربت من التروس فعلق كمك بأسنان الترس وسحبك نحو المحور الحاد! انتزعت نفسك بأعجوبة (-1 صحة)!"
  ),
  options: [
    tr('"That was reckless of me."', '"Tindakan yang ceroboh."', '“刚才太莽撞了。”', '「軽率だったな。」', '"경솔했군."', '"Eso fue imprudente."', '"C\'était imprudent."', '"Das war leichtsinnig."', '«Это было неосторожно.»', '"È stata un\'imprudenza."', '"Isso foi imprudente."', '"كان ذلك تصرفًا طائشًا."')
  ]
};

// 6. pendulum_pry_fail
NODES.pendulum_pry_fail = {
  speaker: tr('Forensic Attempt', 'Kegagalan Otopsi', '强行掰动受创', '検死の失敗', '부검 시도 실패', 'Intento Forense Fallido', 'Tentative Ratée', 'Misslungener Versuch', 'Неудачная попытка', 'Tentativo Fallito', 'Tentativa Fracassada', 'محاولة فحص فاشلة'),
  text: tr(
    "The cadaveric spasm is like cast iron. As you force her fingers, a concealed needle pricks your index finger, burning your flesh with neurotoxin (-2 Health, -1 Morale)!",
    "Spasme mayat sangat kaku. Saat kamu memaksa membuka jemarinya, jarum beracun yang tersembunyi menyengat jarimu! Kamu tersentak kesakitan saat racun membakar kulitmu (-2 Daya Tahan, -1 Kewarasan).",
    "尸僵如铁。你强行掰开手指时，隐藏的毒针刺破了食指，神经毒素灼烧皮肉（生命值 -2，士气 -1）！",
    "死後痙攣は鉄のようだった。指を無理に開こうとした瞬間、隠し針が指を刺し神経毒が走る（体力 -2、正気度 -1）！",
    "시체 경직이 쇠처럼 단단합니다. 억지로 손가락을 펴자 숨겨진 바늘이 손가락을 찔러 독이 번집니다 (체력 -2, 사기 -1)!",
    "El espasmo es como hierro. Al forzar los dedos, una aguja oculta pincha tu índice con neurotoxina (-2 Salud, -1 Moral).",
    "Le spasme est dur comme fer. En forçant les doigts, une aiguille cachée vous pique de neurotoxine (-2 Santé, -1 Moral).",
    "Der Leichenkrampf ist wie Gusseisen. Beim Aufbiegen sticht eine verdeckte Nadel mit Neurotoxin zu (-2 Gesundheit, -1 Moral)!",
    "Трупное окоченение словно железо. При попытке разжать пальцы скрытая игла ранит руку нейротоксином (-2 Здоровье, -1 Мораль)!",
    "Lo spasmo è come ghisa. Forzando le dita, un ago nascosto ti punge bruciando di neurotossina (-2 Salute, -1 Morale).",
    "O espasmo é como ferro. Uma agulha escondida fura seu dedo com neurotoxina (-2 Saúde, -1 Moral).",
    "التشنج الجنائزي صلب كالفولاذ، فانطلقت إبرة مخفية وخزت إصبعك بالسم العصبي (-2 صحة، -1 معنويات)!"
  ),
  options: [
    tr('"Damn my trembling hands..."', '"Sialan! Tangan terkutuk ini dipasangi perangkap!"', '“可恶，手掌里竟装了毒针陷阱……”', '「くそっ、手に罠が仕組まれていたか……」', '"손에 함정이 설치되어 있었군..."', '"¡Maldición, mis manos temblorosas!"', '"Maudites mains tremblantes..."', '"Verdammt, eine Falle..."', '«Черт, рука была с ловушкой!»', '"Maledette mani tremanti..."', '"Droga de mãos trêmulas..."', '"سحقًا، كانت اليد مفخخة بسم!"')
  ]
};

// 7. pendulum_esoterica_win
NODES.pendulum_esoterica_win = {
  speaker: tr('Occult Deduction', 'Deduksi Okultisme Horologis', '钟表秘教玄学推演', '時計神秘主義の推論', '오컬트 시계학적 추론', 'Deducción Oculta', 'Déduction Occulte', 'Okkulte Deduktion', 'Оккультная дедукция', 'Deduzione Occulta', 'Dedução Oculta', 'استنتاج الطوائف الباطنية'),
  text: tr(
    "Beneath the blood-crusted collar lies an alchemical mark: a circle quartered by three intersecting crescents. The seal of 'The Order of the Pale Meridian'—a secret cabal of horologists who believed time itself could be reversed through mechanical resonance.",
    "Di balik kerahnya yang berlumuran darah terdapat segel alkimia: lingkaran yang dibelah oleh tiga bulan sabit bersilangan. Simbol 'Ordo Meridian Pucat'—perkumpulan rahasia para pembuat jam yang percaya aliran waktu dapat dibalikkan melalui resonansi mekanik.",
    "在血迹凝固的领口下藏着炼金印记：被三道新月相交的圆环。“苍白子午线密教”的徽章——深信机械共振可逆转光阴的秘密钟表结社。",
    "血染の襟の下に錬金術の刻印がある。3つの三日月が交差する円。機械の共鳴で時間を逆転できると信じる「蒼白の子午線教団」の証印だ。",
    "피 묻은 옷깃 아래 연금술 표식이 보입니다. 세 개의 초승달이 교차하는 원형 인장. 공명으로 시간을 되돌릴 수 있다고 믿는 '창백한 자오선 교단'의 인장입니다.",
    "Bajo el cuello ensangrentado hay una marca alquímica: un círculo con tres lunas. El sello de la 'Orden del Meridiano Pálido', que creía poder revertir el tiempo.",
    "Sous le col ensanglanté gît une marque alchimique : un cercle coupé de trois croissants. Le sceau de 'L\'Ordre du Méridien Pâle', obsédé par l\'inversion du temps.",
    "Unter dem Kragen liegt ein Alchemie-Zeichen: ein von drei Mondsicheln geteilter Kreis. Das Siegel des 'Ordens des Bleichen Meridians', der die Zeit umkehren wollte.",
    "Под воротником скрыт алхимический символ: круг с тремя полумесяцами. Печать «Ордена Бледного Меридиана», верившего в обращение времени вспять.",
    "Sotto il colletto c\'è un marchio alchemico: cerchio con tre mezzelune. Il sigillo dell\'Ordine del Meridiano Pallido', che credeva di invertire il tempo.",
    "Sob o colarinho ensanguentado há uma marca alquímica: o selo da 'Ordem do Meridiano Pálido', que acreditava na reversão do tempo.",
    "تحت الياقة الدامية يكمن نقش كيميائي: دائرة تقطعها ثلاثة أهلة، ختم 'طائفة خط الزوال الشاحب' التي اعتقدت إمكانية عكس الزمن بالرنين."
  ),
  options: [
    tr('"She was trying to build a machine that could un-live hours."', '"Dia sedang merakit mesin yang dapat memutar balik waktu."', '“她竟在制造能倒流时间的机械装置。”', '「彼女は時を巻き戻す機械を造ろうとしていたのか。」', '"시간을 되돌리는 기계를 만들려 했군."', '"Estaba intentando construir una máquina para des-vivir las horas."', '"Elle tentait de construire une machine pour remonter le temps."', '"Sie baute eine Maschine, um Stunden ungeschehen zu machen."', '«Она пыталась создать машину, поворачивающую время вспять.»', '"Cercava di costruire una macchina per riavvolgere il tempo."', '"Ela tentava construir uma máquina para retroceder o tempo."', '"كانت تحاول بناء آلة تسترجع الساعات الضائعة."')
  ]
};

// 8. pendulum_esoterica_fail
NODES.pendulum_esoterica_fail = {
  speaker: tr('Occult Deduction', 'Deduksi Buntu', '秘教解读毫无头绪', '神秘解読の行き詰まり', '오컬트 해석 실패', 'Deducción Frustrada', 'Impasse Occulte', 'Rätselhafte Runen', 'Оккультный тупик', 'Deduzione Frustrata', 'Impasse Oculto', 'غموض الرموز'),
  text: tr(
    "The scratches look like random surgical cuts or lacerations from broken clock springs. You cannot make sense of the geometry; it just produces a throbbing headache in your temples.",
    "Goresan itu tampak seperti luka acak akibat pecahan pegas jam. Kamu tidak bisa memahami geometrinya; kepalamu hanya berdenyut nyeri.",
    "刻痕看起来如同弹簧崩裂造成的随机划痕。你看不透其中的几何含义，太阳穴隐隐作痛。",
    "傷跡は壊れたゼンマイによる乱雑な切り傷に見える。幾何学の意味が掴めず、こめかみが痛むだけだ。",
    "상처는 튕겨 나온 태엽에 긁힌 무작위 흉터처럼 보입니다. 기하학적 의미를 알 수 없어 두통만 밀려옵니다.",
    "Los arañazos parecen cortes al azar de resortes rotos. No logras descifrar la geometría y te duele la cabeza.",
    "Les éraflures ressemblent à de banales entailles de ressorts. Impossible d\'en tirer du sens, les tempes battent.",
    "Die Kratzer wirken wie Schnittwunden geborstener Federn. Sie erkennen keinen Sinn, die Schläfen pochen.",
    "Царапины кажутся случайными порезами от пружин. Ты не видишь смысла, только виски ломит от боли.",
    "I graffi sembrano tagli casuali di molle spezzate. Non cogli la geometria; ricavi solo mal di testa.",
    "Os arranhões parecem cortes de molas partidas. Você não decifra a geometria e sente dor de cabeça.",
    "تبدو الخدوش كجروح عشوائية من زنبركات محطمة ولم تستوعب هندستها بل أصابك صداع نابض."
  ),
  options: [
    tr('[Blink and look away]', '[Kedipkan mata dan berpaling]', '【眨眼移开视线】', '【瞬きして視線を逸らす】', '[눈을 깜빡이며 시선을 돌린다]', '[Parpadear y apartar la vista]', '[Cligner des yeux et détourner le regard]', '[Blinzeln und wegschauen]', '[Моргнуть и отвести взгляд]', '[Sbatti le palpebre e guarda altrove]', '[Piscar e desviar o olhar]', '[إشاحة النظر]')
  ]
};

// 9. watch_open_fail
NODES.watch_open_fail = {
  speaker: tr('Mechanical Mistake', 'Kesalahan Mekanik', '机械拆解失手', '機械操作の失敗', '기계적 실수', 'Error Mecánico', 'Erreur Mécanique', 'Mechanischer Fehler', 'Механическая оплошность', 'Errore Meccanico', 'Erro Mecânico', 'خطأ ميكانيكي عارض'),
  text: tr(
    "Your thumbnail slips on the oiled bevel, snapping the delicate hinge. The hairspring flies out like a coiled brass viper and cuts your hand (-1 Health)!",
    "Kukumu tergelincir pada engsel yang berminyak. Pegas rambut melesat bagai ular kuningan yang marah dan menyayat jarimu (-1 Daya Tahan)!",
    "指甲在沾满机油的斜边上一滑，脆弱的精密铰链崩断。游丝如黄铜毒蛇猛烈弹射，割伤了你的手（生命值 -1）！",
    "油の縁で爪が滑り、繊細な蝶番を弾き飛ばした。ヒゲゼンマイが真鍮の毒蛇のように飛び出し手を切った（体力 -1）！",
    "기름 묻은 모서리에서 손톱이 미끄러져 경첩이 부러졌습니다. 헤어스프링이 튀어 올라 손등을 베었습니다 (체력 -1)!",
    "Tu uña resbala y rompe la bisagra. El espiral salta como una víbora cortando tu mano (-1 Salud).",
    "Votre ongle glisse et brise la charnière. Le spiral jaillit comme une vipère et vous entaille la main (-1 Santé).",
    "Ihr Nagel rutscht ab und bricht das Scharnier. Die Spiralfeder schnellt heraus und schneidet die Hand (-1 Gesundheit).",
    "Ноготь соскальзывает с масляного края, ломая петлю. Волосок баланса вылетает и режет ладонь (-1 Здоровье).",
    "L\'unghia scivola rompendo la cerniera. La spirale schizza fuori tagliandoti la mano (-1 Salute).",
    "Sua unha escorrega e quebra a dobradiça. A mola espiral salta cortando sua mão (-1 Saúde).",
    "انزلق ظفرك على الحافة الزيتية فانكسر المفصل الدقيق، وطفر زنبرك الشعر الحاد جريحًا يدك (-1 صحة)!"
  ),
  options: [
    tr('"Ouch! The spring cut my finger."', '"Aduh! Pegasnya menyayat tanganku."', '“好疼！被发条割伤了。”', '「痛っ！ゼンマイで手を切った。」', '"아야! 스프링에 손이 베였군."', '"¡Ay! El resorte me ha cortado."', '"Aïe ! Le ressort m\'a coupé la main."', '"Autsch! Die Feder hat mich geschnitten."', '«Ай! Пружина порезала палец.»', '"Ahi! La molla mi ha tagliato la mano."', '"Ai! A mola cortou meu dedo."', '"آخ! جرحني الزنبرك الحاد في يدي."')
  ]
};

// 10. examine_watch_done
NODES.examine_watch_done = {
  speaker: tr('Inventory Update', 'Inventaris Diperbarui', '证物妥善归档', '遺留品保管', '소지품 갱신', 'Inventario Actualizado', 'Inventaire Mis à Jour', 'Inventar Aktualisiert', 'Вещдок сохранен', 'Inventario Aggiornato', 'Inventário Atualizado', 'حفظ المضبوطات'),
  text: tr(
    "You wrap the pocket watch in a clean silk handkerchief and slip it into your trenchcoat pocket.",
    "Kamu membungkus jam saku dengan saputangan sutra dan menyimpannya di saku mantel detektifmu.",
    "你用干净的丝帕将怀表包裹妥当，收入风衣口袋深处。",
    "懐中時計を清潔な絹のハンカチで包み、トレンチコートのポケットに収めた。",
    "회중시계를 깨끗한 비단 손수건으로 감싸 트렌치코트 안주머니에 보관했습니다.",
    "Envuelves el reloj en un pañuelo de seda y lo guardas en tu gabardina.",
    "Vous enveloppez la montre dans un mouchoir de soie propre et la glissez dans votre manteau.",
    "Sie wickeln die Taschenuhr in ein Seidentuch und stecken sie in den Mantel.",
    "Ты заворачиваешь карманные часы в шелковый платок и убираешь во внутренний карман пальто.",
    "Avvolgi l\'orologio in un fazzoletto di seta e lo infili nel cappotto.",
    "Você embrulha o relógio num lenço de seda e o guarda no sobretudo.",
    "قمت بلف ساعة الجيب بمنديل حريري نظيف ودسستها بعناية داخل جيب معطفك."
  ),
  options: [
    tr('[Continue investigation]', '[Lanjutkan penyelidikan]', '【继续现场勘验】', '【現場検証を続ける】', '[수사를 계속한다]', '[Continuar investigación]', '[Poursuivre l\'enquête]', '[Untersuchung fortsetzen]', '[Продолжить расследование]', '[Continua l\'indagine]', '[Continuar investigação]', '[مواصلة التحقيق]')
  ]
};

// 11. examine_balcony_start
NODES.examine_balcony_start = {
  speaker: tr('The Precipice of Saint Irene', 'Tepi Menara Saint Irene', '圣艾琳雨夜露台', '聖アイリーンの高所テラス', '성 아이린 첨탑 테라스', 'El Precipicio de Saint Irene', 'Le Précipice de Saint Irene', 'Der Abgrund von Saint Irene', 'Карниз башни Сент-Ирен', 'Il Precipizio di Saint Irene', 'O Precipício de Saint Irene', 'شرفة برج القديسة إيرين'),
  text: tr(
    "Cold wind howls through the stone archway. Below lies the murky chasm of District 7—gas lamps flickering like dying stars across the canal barges. Rain spatters against your face.",
    "Angin dingin melolong melalui lengkungan batu menara. Di bawah terbentang kegelapan Distrik 7—lampu-lampu gas berkelap-kelip seperti bintang yang meredup di atas tongkang kanal. Hujan deras menerpa wajahmu.",
    "寒风在石拱门间肆虐呼啸。下方是第七区的无边暗夜，煤气灯如残星在运河驳船间摇曳。冷雨打在脸上。",
    "冷たい風が石のアーチを吹き抜ける。見下ろせば第7区の暗闇、ガス灯が運河で死にかけの星のように瞬く。冷たい雨が顔を打つ。",
    "차가운 비바람이 석조 아치를 통과해 몰아칩니다. 발밑엔 제7구역의 어둠이 펼쳐져 있고 가스등이 가물거립니다.",
    "El viento aúlla por el arco de piedra. Abajo yace el abismo del Distrito 7; las farolas titilan como estrellas moribundas.",
    "Le vent hurle sous l\'arche. En bas s\'étend le gouffre du District 7, les réverbères vacillant sur les canaux.",
    "Kalter Wind heult durch die Steinbögen. Unten liegt der Abgrund des 7. Distrikts; Gaslaternen flackern wie sterbende Sterne.",
    "Холодный ветер воет в каменных арках. Внизу чернеет бездна 7-го района — газовые фонари мерцают, как угасающие звезды.",
    "Il vento sibila tra le arcate. Sotto si stende l\'abisso del Distretto 7 con lampioni che tremolano sui canali.",
    "O vento uiva pelo arco de pedra. Abaixo jaz o abismo do Distrito 7; lâmpadas a gás tremeluzem na neblina.",
    "تعصف الرياح الباردة عبر الأقواس الحجرية، وتنبسط في الأسفل هوة المنطقة 7 المظلمة حيث تتلألأ فوانيس الغاز كنجوم تحتضر."
  ),
  options: [
    tr('[PERCEPTION - Easy 8] Search the wet flagstones for trace evidence.', '[PERSEPSI - Mudah 8] Cari jejak bukti di atas ubin batu yang basah.', '【感知 - 简单 8】搜索湿润石板上的残留物证。', '【知覚 - 容易 8】濡れた敷石から痕跡を探す。', '[지각 - 쉬움 8] 젖은 석판 바닥에서 미세 흔적을 찾는다.', '[PERCEPCIÓN - Fácil 8] Buscar indicios en las losas mojadas.', '[PERCEPTION - Facile 8] Fouiller les dalles humides à la recherche d\'indices.', '[WAHRNEHMUNG - Leicht 8] Die nassen Steinplatten nach Spuren absuchen.', '[ВОСПРИЯТИЕ - Легко 8] Осмотреть мокрые каменные плиты в поисках улик.', '[PERCEZIONE - Facile 8] Cerca tracce sulle lastre di pietra bagnate.', '[PERCEPÇÃO - Fácil 8] Procurar vestígios nas lajes molhadas.', '[الإدراك الحسي - سهل 8] فحص البلاط الحجري المبتل بحثًا عن آثار أدلة جنائية.'),
    tr('Look over the railing into the fog.', 'Tatap kabut malam di atas kota.', '凭栏远眺浓雾迷蒙的城区。', '手すりから霧の中の街を見下ろす。', '난간 너머 안개 낀 도시를 응시한다.', 'Mirar sobre la barandilla hacia la niebla.', 'Regarder dans le brouillard par-dessus le garde-corps.', 'Über das Geländer in den Nebel blicken.', 'Посмотреть за перила в туманную тьму.', 'Guarda oltre la ringhiera nella nebbia.', 'Olhar pela balaustrada na neblina.', 'التحديق من فوق السياج في أعماق الضباب.'),
    tr('[Return inside]', '[Kembali ke dalam]', '【返回室内】', '【室内へ戻る】', '[실내로 복귀]', '[Volver al interior]', '[Retourner à l\'intérieur]', '[Wieder hineingehen]', '[Вернуться внутрь]', '[Torna all\'interno]', '[Voltar para dentro]', '[الرجوع للداخل]')
  ]
};

// 12. balcony_search_win
NODES.balcony_search_win = {
  speaker: tr('Trace Evidence Found', 'Bukti Jejak Terungkap', '起获关键微量物证', '痕跡証拠の回収', '결정적 흔적 증거 발견', 'Indicio Encontrado', 'Indice Matériel', 'Spur Gesichert', 'Улика найдена', 'Traccia Trovata', 'Vestígio Encontrado', 'العثور على أثر حاسم'),
  text: tr(
    "Snagged on the wrought-iron gargoyle is a torn shred of midnight-blue velvet. It matches the high collar of Madame Vance's mourning coat. Next to it, an empty glass ampoule labeled 'Tincture of Somnus & Cyanide'.",
    "Tersangkut pada patung gargoyle besi tempa adalah sobekan beludru biru tua. Warnanya identik dengan kerah mantel berkabung milik Nyonya Vance. Di sebelahnya, tergeletak ampul kaca kosong bertuliskan 'Tinktur Somnus & Sianida'.",
    "铸铁滴水兽上挂着一片深蓝丝绒布料，与薇薇安夫人的丧服衣领完全吻合。旁边遗落着贴有“催眠酊剂与氰化物”的空玻璃安瓿。",
    "錬鉄のガーゴイルに濃紺のビロード布片が引っかかっていた。ヴィヴィアン夫人の喪服襟と完全に一致する。隣には『青酸』の空アンプルがあった。",
    "가고일에 짙은 남색 벨벳 조각이 찢겨 걸려 있었습니다. 비비안 부인의 상복 칼라와 일치합니다. 옆에는 '청산가리' 빈 앰플이 떨어져 있었습니다.",
    "Enganchado en la gárgola hay terciopelo azul noche. Coincide con el abrigo de Madame Vance. Al lado, una ampolla de 'Cianuro'.",
    "Accroché à la gargouille, un lambeau de velours bleu nuit. Il correspond au manteau de Madame Vance. À côté, une fiole de 'Cyanure'.",
    "Am Wasserspeier hängt mitternachtsblauer Samt von Madame Vances Mantel. Daneben ein leeres Fläschchen mit 'Zyankali'.",
    "На горгулье зацепился лоскут синего бархата от пальто мадам Вэнс. Рядом лежит пустая ампула «Цианид».",
    "Nel doccione c\'è un brandello di velluto blu notte identico all\'abito di Vivienne. Accanto, un\'ampolla con scritto 'Cianuro'.",
    "Preso na gárgula há veludo azul-marinho do casaco de Vivienne. Ao lado, uma ampola rotulada 'Cianeto'.",
    "علق بتمثال المزراب شريط مخملي أزرق ممزق يتطابق مع معطف السيدة فانس، وبجواره أمبول زجاجي فارغ موسوم بـ 'سيانيد'."
  ),
  options: [
    tr('"The smoking gun. She was here on the balcony right after Vance died."', '"Bukti tak terbantahkan. Vivienne berada di balkon ini tepat setelah Aurelia tewas."', '“确凿铁证。奥蕾莉亚刚遇害时她就在这露台上。”', '「動かぬ証拠だ。ヴァンスの絶命直後、彼女はここにいた。」', '"결정적 물증이오. 밴스가 숨진 직후 그녀는 이곳 발코니에 있었소."', '"La prueba irrefutable. Estuvo aquí en el balcón justo tras la muerte de Vance."', '"La preuve irréfutable. Elle était sur ce balcon juste après la mort de Vance."', '"Der rauchende Colt. Sie war unmittelbar nach Vances Tod hier auf dem Balkon."', '«Неопровержимая улика. Она была здесь сразу после смерти Аурелии.»', '"La pistola fumante. Era qui sul balcone subito dopo la morte di Vance."', '"A prova irrefutável. Ela esteve nesta sacada logo após a morte de Vance."', '"الدليل القاطع: كانت فيفيان هنا على الشرفة فور وقوع الجريمة."')
  ]
};

// 13. balcony_search_fail
NODES.balcony_search_fail = {
  speaker: tr('Diluted Traces', 'Jejak Terhapus', '雨水冲刷无存', '雨に流された足跡', '빗물에 씻겨나간 흔적', 'Rastros Diluidos', 'Traces Effacées', 'Verwaschene Spuren', 'Размытые следы', 'Tracce Cancellate', 'Rastros Lavados', 'آثار محاها المطر'),
  text: tr(
    "The driving downpour has washed away almost all footsteps. You only find muddy smears and puddles of soot.",
    "Hujan deras telah menghapus hampir semua jejak kaki. Kamu hanya menemukan noda lumpur dan genangan jelaga mesin.",
    "暴雨冲刷掉了所有脚印痕迹，只剩下泥泞的污渍与煤烟水洼。",
    "激しい雨が足跡を洗い流してしまった。泥と煤の水たまりしか残っていない。",
    "폭우가 발자국을 깨끗이 씻어내 버렸습니다. 진흙과 그을음 웅덩이만 남았습니다.",
    "El aguacero ha borrado casi todas las huellas. Solo hallas barro y hollín.",
    "La pluie battante a emporté les empreintes. Vous ne trouvez que de la suie boueuse.",
    "Der Wolkenbruch hat fast alle Fußspuren weggespült. Nur Schlamm und Rußpfützen bleiben.",
    "Ливень смыл почти все следы. Вокруг лишь размытая грязь и лужи сажи.",
    "Il rovescio ha cancellato quasi ogni impronta. Trovi solo fango e pozzanghere di fuliggine.",
    "A chuva forte lavou quase todas as pegadas. Você só encontra lama e fuligem.",
    "جرفت الأمطار الغزيرة آثار الأقدام تمامًا، ولم تترك سوى بقع طين وسخام."
  ),
  options: [
    tr('[Step back inside]', '[Melangkah kembali ke dalam]', '【返回室内】', '【中へ戻る】', '[실내로 물러선다]', '[Volver adentro]', '[Ranger et rentrer]', '[Wieder eintreten]', '[Шагнуть внутрь]', '[Torna dentro]', '[Voltar para dentro]', '[الرجوع للداخل]')
  ]
};

// 14. balcony_fog_reflection
NODES.balcony_fog_reflection = {
  speaker: tr('Atmospheric Reverie', 'Renungan Suasana Hujan', '冷雨夜形而上沉思', '雨の瞑想', '냉혹한 빗속의 사색', 'Ensueño Atmosférico', 'Rêverie Atmosphérique', 'Atmosphärische Einkehr', 'Атмосферное раздумье', 'Riflessione Notturna', 'Devaneio Noturno', 'تأملات المطر'),
  text: tr(
    "You stare down at the sprawling darkness of Malkuth-on-Thames. You have unlocked a new avenue of introspection: 'Metaphysics of Cold Rain'. You can internalize this thought in your Thought Cabinet.",
    "Kamu menatap kegelapan kota di bawah hujan. Kamu membuka pikiran baru: 'Metafisika Hujan Dingin'. Kamu bisa menginternalisasikannya di Lemari Pikiran.",
    "你凝望雨雾深渊。新的思维之门轰然洞开：“冷雨形而上学”。可在思维阁中内化此思想。",
    "雨煙る街の暗闇を見下ろす。新たな思考「冷雨の形而上学」がアンロックされた。思考キャビネットで内面化可能だ。",
    "빗속 도시의 어둠을 내려다봅니다. 새로운 생각 '차가운 비의 형이상학'이 열렸습니다. 생각 보관함에서 내면화할 수 있습니다.",
    "Miras la oscuridad de la ciudad bajo la lluvia. Desbloqueas: 'Metafísica de la Lluvia Fría' para el Gabinete.",
    "Vous contemplez les ténèbres sous le déluge. Une nouvelle pensée s\'éveille : 'Métaphysique de la Pluie Froide'.",
    "Sie blicken in das Dunkel im Regen. Sie schalten 'Metaphysik des Kalten Regens' frei.",
    "Ты смотришь в черную бездну города под дождем. Открыта мысль: «Метафизика холодного дождя».",
    "Fissi l\'oscurità della città sotto la pioggia. Sblocchi il pensiero: 'Metafisica della Pioggia Fredda'.",
    "Você contempla a escuridão sob a chuva. Desbloqueado: 'Metafísica da Chuva Fria'.",
    "تحدق في ظلام المدينة تحت المطر، وانفتحت لك فكرة: 'ميتافيزيقا المطر البارد' في خزانة الأفكار."
  ),
  options: [
    tr('[Return to the gear room]', '[Kembali ke ruang roda gigi]', '【返回齿轮大厅】', '【歯車室へ戻る】', '[톱니바퀴 방으로 복귀]', '[Volver a la sala de engranajes]', '[Retourner à la salle des rouages]', '[Zurück zum Räderwerk]', '[Вернуться в зал шестерен]', '[Torna alla sala degli ingranaggi]', '[Voltar à sala de engrenagens]', '[العودة لغرفة التروس]')
  ]
};

// 15. safe_brute_trap
NODES.safe_brute_trap = {
  speaker: tr('Lethal Anti-Tamper Trap', 'Perangkap Maut Brankas', '防盗自毁反噬', '防犯トラップ作動', '방범 트랩 발동', 'Trampa Letal', 'Piège Mortel', 'Tödliche Sicherheitsfalle', 'Смертоносная ловушка', 'Trappola Letale', 'Armadilha Letal', 'فخ الموت بالخزنة'),
  text: tr(
    "As your crowbar strains against the hinge, an internal shear-pin snaps. A pressurized needle array fires into your forearm, and chlorine gas erupts (-3 Health, -2 Morale)!",
    "Saat linggismu menekan engsel, pin pengaman internal patah. Rangkaian jarum bertekanan menembus lenganmu, dan gas klorin menyembur (-3 Daya Tahan, -2 Kewarasan)!",
    "铁撬压向合页时安全销折断！数十枚微型毒针射入前臂，刺鼻氯气喷涌（生命值 -3，士气 -2）！",
    "バールで力を込めた瞬間、安全ピンが破断した。加圧毒針が無数に刺さり塩素ガスが噴出する（体力 -3、正気度 -2）！",
    "쇠지렛대로 비트는 순간 핀이 부러졌습니다. 가압 독침이 쏘아지고 염소 가스가 폭발합니다 (체력 -3, 사기 -2)!",
    "Al forzar la bisagra salta un pasador. ¡Agujas presurizadas perforan tu brazo y estalla cloro (-3 Salud, -2 Moral)!",
    "Le gond cède et brise une goupille. Des aiguilles vous criblent le bras sous un nuage de chlore (-3 Santé, -2 Moral)!",
    "Als Sie hebeln, bricht ein Stift. Drucknadeln schießen in Ihren Arm und Chlorgas strömt aus (-3 Gesundheit, -2 Moral)!",
    "Монтировка ломает штифт. Залп игл впивается в руку, и хлорный газ бьет в лицо (-3 Здоровье, -2 Мораль)!",
    "La leva spezza un perno. Aghi pressurizzati ti colpiscono ed esplode cloro (-3 Salute, -2 Morale)!",
    "Um pino se rompe. Agulhas perfuram seu antebraço e gás venenoso irrompe (-3 Saúde, -2 Moral)!",
    "انكسر صمام الأمان الداخلي فانطلقت مصفوفة إبر مضغوطة طعنت ذراعك وتصاعد غاز الكلور الخانق (-3 صحة، -2 معنويات)!"
  ),
  options: [
    tr('"Coughing blood... what a vicious trap!"', '"Batuk darah... perangkap yang sangat keji!"', '“咳血……好恶毒的机关！”', '「ゲホッ……なんという凶悪な罠だ……」', '"쿨럭... 끔찍한 함정이군..."', '"Cof... ¡qué trampa tan perversa!"', '"Toux... quel piège vicieux !"', '"Hust... was für eine Falle!"', '«Кашляет кровью... ну и ловушка!»', '"Tosse... che trappola maledetta!"', '"Tosse... que armadilha cruel!"', '"سعال دامٍ... يا له من فخ خبيث!"')
  ]
};

// 16. safe_logic_fail
NODES.safe_logic_fail = {
  speaker: tr('Lockpick Attempt', 'Perangkap Brankas Meledak!', '防盗机械闭锁反击', '金庫の防犯機構作動', '금고 잠금 함정 발동', 'Mecanismo Bloqueado', 'Échec du Crochetage', 'Fehlschlag am Tresor', 'Ошибка взлома', 'Tentativo Fallito', 'Falha no Arrombamento', 'تعطل محاولة الفتح'),
  text: tr(
    "The internal tumblers jam with a harsh screech. An internal anti-tamper glass vial cracks, releasing foul sulfur gas and a spring trap snaps on your hands (-2 Health, -1 Morale)!",
    "Silinder internal macet dengan derit memekakkan telinga. Ampul kaca anti-pencuri pecah, menyemburkan gas belerang beracun dan penjepit baja menghantam jarimu (-2 Daya Tahan, -1 Kewarasan)!",
    "滚轮齿槽尖叫卡死。防盗玻璃管碎裂释放硫磺毒气，弹簧钢夹咬碎了你的手指（生命值 -2，士气 -1）！",
    "タンブラーが耳障りに噛み合わなくなった。防犯ガラスが割れ硫黄ガスとバネ罠が手を直撃する（体力 -2、正気度 -1）！",
    "텀블러가 날카로운 소리를 내며 잠깁니다. 유리관이 깨져 유황 가스가 뿜어지고 스프링이 손을 칩니다 (-2 체력, -1 사기)!",
    "Los tambores se atascan. Una ampolla se rompe soltando azufre y una trampa golpea tus manos (-2 Salud, -1 Moral).",
    "Les gorges se bloquent. Une fiole libère du soufre gazeux tandis qu\'un piège frappe vos doigts (-2 Santé, -1 Moral).",
    "Das Werk blockiert kreischend. Eine Glasampulle platzt, Schwefelgas strömt aus und die Falle schnappt zu (-2 Gesundheit, -1 Moral)!",
    "Диски заклинивает со скрежетом. Серный газ бьет в лицо, а капкан бьет по рукам (-2 Здоровье, -1 Мораль)!",
    "I tamburi si inceppano. Una fiala rilascia gas di zolfo e una trappola scatta sulle tue dita (-2 Salute, -1 Morale).",
    "Os tambores travam. Uma ampola libera gás sulfuroso e a armadilha machuca suas mãos (-2 Saúde, -1 Moral).",
    "تعطلت الأقراص بصرير حاد وانكسرت أسطوانة الزجاج لتنشر غاز الكبريت وطبق زنبرك الفخ على يديك (-2 صحة، -1 معنويات)!"
  ),
  options: [
    tr('"Damn anti-tamper traps!"', '"Sialan! Perangkap brankas terkutuk!"', '“该死……阴险的防盗自毁机关！”', '「くそっ、厄介な防犯トラップめ！」', '"빌어먹을 방범 장치 같으니!"', '"¡Malditas trampas de seguridad!"', '"Maudits pièges de sécurité !"', '"Verdammte Sicherheitsfallen!"', '«Проклятые ловушки от взлома!»', '"Maledette trappole antimanomissione!"', '"Malditas armadilhas antifurto!"', '"سحقًا لفخاخ الحماية الغادرة!"')
  ]
};

// 17. madame_premature_arrest_fail
NODES.madame_premature_arrest_fail = {
  speaker: tr('Catastrophic Blunder', 'Tindakan Gegabah yang Fatal', '严重渎职与灾难', '破滅的な失態', '치명적인 실책', 'Error Catastrófico', 'Bévue Catastrophique', 'Katastrophaler Fehltritt', 'Фатальная ошибка', 'Errore Catastrofico', 'Erro Catastrófico', 'خطأ مهني كارثي'),
  text: tr(
    "Inspector Graves grabs your shoulder and cocks his service revolver. 'That is enough, Detective! You have no proof, you reek of alcohol, and you are terrorizing a grieving citizen under police protection. Hand over your badge. You are under arrest for extortion and gross misconduct!'",
    "Inspektur Graves mencengkeram bahumu dan mengokang pistol dinasnya. 'Cukup, Detektif! Kamu menuduh warga tanpa selembar pun bukti fisik sambil berbau alkohol. Serahkan lencana dan senjatamu. Kamu ditangkap atas pemerasan dan pelanggaran berat!'",
    "格雷夫斯抓住你的肩膀，拔出左轮手枪压下击锤！“够了！手里毫无证据却浑身酒气恐吓市民。交出警徽，你被捕了！”",
    "グレイヴスが肩を掴み拳銃を起こした。「そこまでだ！証拠もなしに酒臭い息で市民を脅すとは。バッジを渡せ、逮捕する！」",
    "그레이브스가 어깨를 낚아채며 권총을 겨눕니다. '그만하시오! 물증도 없이 술 냄새를 풍기며 유족을 협박하다니. 배지 내놓으시오, 체포요!'",
    "Graves te agarra y amartilla su revólver. '¡Basta! Sin pruebas y oliendo a alcohol está amenazando a una ciudadana. Queda arrestado.'",
    "L\'inspecteur Graves arme son revolver. 'Ça suffit ! Sans preuves et empestant l\'alcool, vous terrorisez une citoyenne. Vous êtes aux arrêts !'",
    "Graves packt Sie und spannt den Hahn. 'Es reicht! Ohne Beweise schikanieren Sie Bürger. Geben Sie die Marke ab, Sie sind verhaftet!'",
    "Грейвс хватает тебя за плечо и взводит курок. «Хватит! Без улик, пьяный, ты терроризируешь потерпевшую. Сдай жетон, ты арестован!»",
    "Graves ti afferra e arma il revolver. 'Basta! Senza prove e puzzando di alcol minacci una cittadina. Consegna il distintivo, sei in arresto!'",
    "Graves agarra seu ombro e engatilha o revólver. 'Chega! Sem provas você aterroriza a viúva. Entregue o distintivo, está preso!'",
    "أمسك غريفز بكتفك وسحب مطرقة مسدسه: 'كفى! بلا دليل وتفوح منك الخمر وترهب مواطنة! سلم شارتك، أنت معتقل!'"
  ),
  options: [
    tr('[Yield to the handcuffs]', '[Pasrah pada borgol baja]', '【认罪受缚，戴上手铐】', '【手錠を受け入れる】', '[수갑에 순응한다]', '[Ceder ante las esposas]', '[Céder aux menottes]', '[Sich den Handschellen beugen]', '[Смириться с наручниками]', '[Arrenditi alle manette]', '[Render-se às algemas]', '[الاستسلام للقيود]')
  ]
};

// 18. madame_alibi
NODES.madame_alibi = {
  speaker: tr('Madame Vivienne Vance', 'Nyonya Vivienne Vance', '薇薇安·梵斯夫人', 'ヴィヴィアン・ヴァンス夫人', '비비안 밴스 부인', 'Madame Vivienne Vance', 'Madame Vivienne Vance', 'Madame Vivienne Vance', 'Мадам Вивьен Вэнс', 'Madame Vivienne Vance', 'Madame Vivienne Vance', 'السيدة فيفيان فانس'),
  text: tr(
    "'I told your companion Inspector Graves: I was downstairs in the Saint Irene chapel, lighting candles for the departed souls of the epidemic. The priest can attest to my presence—though he was asleep in his confessional booth.'",
    "'Sudah kukatakan pada rekanmu Inspektur Graves: aku berada di bawah di kapel Saint Irene, menyalakan lilin untuk jiwa-jiwa korban wabah. Romo gereja bisa bersaksi—meski dia tertidur di bilik pengakuan dosanya.'",
    "“我已经告诉过格雷夫斯警探了：当时我在楼下小礼拜堂为大瘟疫亡灵点烛祈祷。神父能作证——尽管他整晚都在告解室打盹。”",
    "「グレイヴス警部にも話した通りよ。礼拝堂で犠牲者のために蝋燭を灯していたわ。司祭様が証明してくれる——居眠りしていたけれど。」",
    "\"그레이브스 형사에게도 말했듯, 전 아래층 예배당에서 촛불을 켜고 있었어요. 사제님께서 증언해 주실 거예요. 졸고 계셨지만요.\"",
    "'Ya se lo dije a Graves: estuve en la capilla encendiendo velas por la epidemia. El párroco puede atestiguarlo, aunque dormitaba.'",
    "'Je l\'ai dit à votre collègue : j\'allumais des cierges pour les défunts. Le prêtre peut l\'attester, même s\'il sommeillait.'",
    "'Ich sagte es Graves: Ich entzündete Kerzen in der Kapelle für die Seuchenopfer. Der Priester bezeugt es, obwohl er döste.'",
    "«Я уже сказала Грейвсу: я была в часовне и зажигала свечи за упокой. Священник подтвердит, хоть он и дремал.»",
    "'L\'ho detto a Graves: ero nella cappella ad accendere candele. Il parroco può confermare, anche se dormiva.'",
    "'Já disse ao inspetor: estava na capela acendendo velas pela epidemia. O padre pode atestar, embora cochilasse.'",
    "'أخبرت غريفز مسبقًا: كنت بالمصلى أوقد الشموع لضحايا الوباء، وبوسع الكاهن أن يشهد رغم أنه كان يغفو بمقصورته.'"
  ),
  options: [
    tr('"Convenient. An alibi witnessed by a sleeping priest."', '"Alibi yang nyaman. Disaksikan seorang pendeta yang tertidur."', '“真方便，一个熟睡神父作证的不在场证明。”', '「眠っていた司祭のアリバイか。実に都合がいい。」', '"졸고 있던 사제가 증인이라니 편리한 알리바이군요."', '"Conveniente. Una coartada presenciada por un cura dormido."', '"Commode. Un alibi attesté par un prêtre endormi."', '"Praktisch. Ein Alibi von einem schlafenden Priester."', '«Очень удобно. Алиби от спящего священника.»', '"Comodo. Un alibi da un prete che dormiva."', '"Conveniente. Álibi de um padre dorminhoco."', '"حجة غياب ملائمة، شاهدها كاهن نائم."')
  ]
};

// 19. madame_empathy_win
NODES.madame_empathy_win = {
  speaker: tr('Madame Vivienne Vance', 'Nyonya Vivienne Vance', '薇薇安·梵斯夫人', 'ヴィヴィアン・ヴァンス夫人', '비비안 밴스 부인', 'Madame Vivienne Vance', 'Madame Vivienne Vance', 'Madame Vivienne Vance', 'Мадам Вивьен Вэнс', 'Madame Vivienne Vance', 'Madame Vivienne Vance', 'السيدة فيفيان فانس'),
  text: tr(
    "Her eyes widen slightly, and for a split second the porcelain mask drops. 'Love? Aurelia did not love human beings, Detective. She loved springs, escapements, and cold brass gears. For thirty years I was just a domestic pendulum swinging in her hallway. While our daughter died of consumption, she was upstairs building an alchemical chronometer to sell to foreign bankers.'",
    "Matanya membesar sesaat, dan topeng porselennya runtuh. 'Cinta? Aurelia tidak mencintai manusia, Detektif. Dia mencintai pegas, roda gigi, dan kuningan dingin. Selama tiga puluh tahun aku hanyalah pendulum rumah tangga di lorongnya. Saat putri kami meninggal karena penyakit paru-paru, dia malah di lantai atas merakit kronometer alkimia untuk dijual ke bankir asing.'",
    "她的眼眸颤动，面具轰然瓦解。“爱？奥蕾莉亚从不爱人类，探长。她只爱发条与冰冷齿轮。三十年来我不过是走廊里的钟摆。女儿因痨病痛苦死去时，她却在楼上拼装卖给银行家的军械！”",
    "仮面が崩れ落ちた。「愛？オレリアは人間など愛していなかった。冷たい歯車だけを愛したのよ。30年、私はただの振り子だった。娘が結核で死ぬ時も、彼女は武器を組み立てていたわ。」",
    "도자기 가면이 깨집니다. '사랑이요? 오렐리아는 인간을 사랑하지 않았어요. 차가운 톱니만 사랑했죠. 딸아이가 폐결핵으로 죽어갈 때도 외국에 팔아넘길 시계를 조립하고 있었어요.'",
    "Cae su máscara. '¿Amor? Aurelia amaba los engranajes fríos. Mientras nuestra hija moría de tuberculosis, ella armaba armas para banqueros.'",
    "Le masque tombe. 'L\'amour ? Aurelia n\'aimait que ses froids rouages. Quand notre fille mourait de phtisie, elle fabriquait des armes pour des banquiers.'",
    "Ihre Maske fällt. 'Liebe? Aurelia liebte nur Messingräder. Als unsere Tochter starb, baute sie Waffen für ausländische Bankiers.'",
    "Маска падает. «Любовь? Аурелия любила только шестеренки. Пока дочь умирала от чахотки, она собирала механизм на продажу банкирам.»",
    "La maschera cade. 'Amore? Aurelia amava solo gli ingranaggi. Mentre nostra figlia moriva, lei costruiva congegni per i banchieri.'",
    "A máscara cai. 'Amor? Aurelia só amava engrenagens. Enquanto nossa filha morria de tuberculose, ela montava armas para banqueiros.'",
    "سقط قناعها: 'حب؟ لم تكن تحب إلا التروس الباردة! حين كانت ابنتنا تحتضر بالسل، كانت هي عاكفة على بيع أسلحة الساعات للبنوك!'"
  ),
  options: [
    tr('"So you decided to stop her clock once and for all."', '"Jadi kamu memutuskan untuk menghentikan jam hidupnya untuk selamanya."', '“所以你决定让她的生命指针彻底停滞。”', '「だから時計の針を永遠に止めたのか。」', '"그래서 그녀의 시계를 영원히 멈추기로 했군요."', '"Así que decidió detener su reloj de una vez por todas."', '"Vous avez donc décidé d\'arrêter son horloge pour toujours."', '"Also beschlossen Sie, ihre Uhr für immer anzuhalten."', '«И вы решили остановить ее часы раз и навсегда.»', '"Così ha deciso di fermare il suo orologio per sempre."', '"Então você decidiu parar o relógio dela de uma vez por todas."', '"ولهذا قررتِ إيقاف عقارب حياتها للأبد."')
  ]
};

// 20. madame_empathy_fail
NODES.madame_empathy_fail = {
  speaker: tr('Madame Vivienne Vance', 'Nyonya Vivienne Vance', '薇薇安·梵斯夫人', 'ヴィヴィアン・ヴァンス夫人', '비비안 밴스 부인', 'Madame Vivienne Vance', 'Madame Vivienne Vance', 'Madame Vivienne Vance', 'Мадам Вивьен Вэнс', 'Madame Vivienne Vance', 'Madame Vivienne Vance', 'السيدة فيفيان فانس'),
  text: tr(
    "'How vulgar. You stumble in here, smelling of gin and cheap tobacco, and dare question thirty years together? Inspector Graves, remove this animal from my presence!'",
    "'Betapa menjijikkan. Kamu tersandung masuk ke sini dengan bau alkohol murahan, dan berani mempertanyakan tiga puluh tahun kebersamaan kami? Inspektur Graves, singkirkan makhluk ini dari hadapanku!'",
    "“粗俗之尤！你一身劣质杜松子酒的恶臭闯进来，竟敢质疑我们三十年的相守？格雷夫斯警探，请把这个狂徒带走！”",
    "「下品ね。安酒の臭いを撒き散らして闖入し、私たちの30年を侮辱する気？グレイヴス、この男を追い出して！」",
    "\"천박하군요. 싸구려 술 냄새를 풍기며 들어와 우리의 30년을 모욕하다니. 그레이브스 형사, 당장 내쫓으세요!\"",
    "'Qué vulgar. Entra oliendo a ginebra barata y cuestiona treinta años de matrimonio. ¡Graves, aparte a este animal!'",
    "'Quelle vulgarité. Vous empestez le gin et osez juger trente ans de mariage ? Graves, éloignez cet individu !'",
    "'Wie vulgär. Sie stinken nach Schnaps und wagen es, dreißig Jahre Ehe anzuzweifeln? Graves, schaffen Sie ihn fort!'",
    "«Какая пошлость. Вы заваливаетесь с запахом джина и смеете судить о 30 годах брака? Грейвс, уберите его!»",
    "'Che volgarità. Puzzi di gin scadente e osi giudicare trent\'anni insieme? Graves, allontanalo!'",
    "'Que vulgar. Cheirando a gim barato você ousa questionar trinta anos de união? Graves, tire-o daqui!'",
    "'يا لك من سوقي! تفوح منك رائحة الكحول الرخيصة وتشكك في ثلاثين عامًا من زواجنا؟ يا غريفز أبعده عني!'"
  ),
  options: [
    tr('"Hold your tongue, Madame. I am not finished."', '"Jaga lidahmu, Nyonya. Aku belum selesai."', '“放尊重点，夫人。审问还没结束。”', '「口を慎め、夫人。まだ終わっていない。」', '"말조심하시오. 아직 끝나지 않았소."', '"Cuidado con su lengua, señora. No he terminado."', '"Surveillez vos paroles, Madame. Je n\'ai pas fini."', '"Hüten Sie Ihre Zunge, Madame. Ich bin nicht fertig."', '«Придержите язык, мадам. Я не закончил.»', '"Badi a come parla, Madame. Non ho finito."', '"Cuidado com a língua, senhora. Não terminei."', '"الزمي حدودك يا سيدتي، لم أنته بعد."')
  ]
};

// 21. madame_confession_fail
NODES.madame_confession_fail = {
  speaker: tr('Unshakable Defiance', 'Bantahan Dingin', '寸步不让的冷酷抵抗', '揺るぎなき拒絶', '냉혹한 전면 부인', 'Desafío Inquebrantable', 'Défiance Inébranlable', 'Eiskalte Abweisung', 'Ледяное отрицание', 'Sfida Incrollabile', 'Desafio Inabalável', 'الإنكار الجليدي الصارم'),
  text: tr(
    "'Are you insane?' Her voice turns to ice. 'Fabricating evidence against a grieving partner in front of another police officer? Graves, arrest this incompetent maniac before this creature desecrates Aurelia\'s remains any further!' Graves steps between you with his hand on his revolver (-2 Morale).",
    "'Apakah kamu sudah gila?' Suaranya membeku bagai es. 'Merekayasa tuduhan terhadap pasangan yang berduka di depan perwira polisi lainnya? Graves, tangkap orang mabuk ini sebelum dia menodai jasad Aurelia lebih jauh!' Graves melangkah maju dengan tangan di gagang pistolnya (-2 Kewarasan).",
    "“你疯了吗？”她的声音冷若冰霜。“在另一位警察面前伪造证据构陷遗孀？格雷夫斯，快拘捕这个疯子，免得他玷污遗体！”格雷夫斯手按配枪挡在中间（士气 -2）。",
    "「正気？他の警官の前で証拠を捏造するなんて。グレイヴス、遺体を冒涜される前にこの狂人を拘束して！」グレイヴスが割って入る（正気度 -2）。",
    "\"미쳤나요? 다른 경찰관 앞에서 증거를 조작해 유족을 모함하다니요. 그레이브스, 당장 체포해요!\" 그레이브스가 총을 쥐고 막아섭니다 (사기 -2).",
    "'¿Está loco?' Su voz es hielo. '¿Fabricar pruebas contra una viuda ante otro oficial? ¡Graves, arreste a este loco!' Graves se interpone (-2 Moral).",
    "'Êtes-vous fou ?' Sa voix se glace. 'Fabriquer des preuves contre une veuve devant un policier ? Graves, arrêtez-le !' Graves s\'interpose (-2 Moral).",
    "'Sind Sie verrückt?' Ihre Stimme wird Eis. 'Beweise gegen eine Witwe zu fälschen? Graves, verhaften Sie ihn!' Graves tritt dazwischen (-2 Moral).",
    "«Вы с ума сошли?» Голос звенит льдом. «Фабриковать улики против вдовы при полиции? Грейвс, уйми его!» Грейвс встает между вами (-2 Мораль).",
    "'È impazzito?' La voce si gela. 'Fabbricare prove contro una vedova davanti a un collega? Graves, arrestalo!' Graves interviene (-2 Morale).",
    "'Está louco?' A voz vira gelo. 'Forjando provas contra uma viúva na frente de outro policial? Graves, prenda-o!' Graves intervém (-2 Moral).",
    "'هل جننت؟ تلفق أدلة ضد أرملة مفجوعة أمام زميلك؟ يا غريفز اعتقل هذا المعتوه!' تقدم غريفز بينكما واضعًا يده على مسدسه (-2 معنويات)."
  ),
  options: [
    tr('"This isn\'t over, Vivienne."', '"Ini belum berakhir, Vivienne."', '“这还没完，薇薇安。”', '「まだ終わっていないぞ、ヴィヴィアン。」', '"아직 끝나지 않았소, 비비안."', '"Esto no ha terminado, Vivienne."', '"Ce n\'est pas fini, Vivienne."', '"Das ist noch nicht vorbei, Vivienne."', '«Это еще не конец, Вивьен.»', '"Non è ancora finita, Vivienne."', '"Isso não acabou, Vivienne."', '"لم تنته القضية بعد يا فيفيان."')
  ]
};

// 22. examine_gantry_lantern
NODES.examine_gantry_lantern = {
  speaker: tr('Alchemical Lantern Catwalk', 'Anjungan Lentera Alkimia', '上层提灯悬空栈桥', 'ランタン通路の検証', '연금술 등불 통로 조사', 'Pasarela de la Linterna', 'Passerelle de la Lanterne', 'Laternensteg-Untersuchung', 'Мостки алхимического фонаря', 'Camminamento della Lanterna', 'Passarela da Lanterna', 'فحص ممر الفانوس العلوي'),
  text: tr(
    "A cold draft rushes through the high iron grating. Shards of amber chemical glass crunch beneath your boot. Etched into a broken neck piece is the Grand Syndicate's mercury serpent seal.",
    "Angin dingin berhembus melalui kisi-kisi besi tinggi. Serpihan kaca kimia berwarna kuning kecokelatan berderak di bawah sol sepatumu. Terukir pada pecahan leher botol terdapat lambang ular merkuri milik Sindikat Agung.",
    "阴冷夜风掠过镂空铁栅。脚底踩碎了琥珀色化学玻璃片。破损瓶颈处烙着辛迪加的水银双头蛇印记。",
    "高い鉄格子の上を冷風が吹き抜ける。琥珀色の薬品ガラス片が靴底で砕けた。瓶の首にはシンジケートの水銀蛇の紋章が刻印されている。",
    "철제 통로 위로 찬 바람이 붑니다. 호박색 화학 유리병 파편이 발밑에서 바삭거립니다. 깨진 병목에 신디케이트의 수은 뱀 문장이 새겨져 있습니다.",
    "Una corriente fría cruza la rejilla. Cacos de vidrio crujen bajo tu bota con el sello de la serpiente de mercurio del Sindicato.",
    "Un courant d\'air glacé traverse la grille. Des éclats de verre crissent sous vos bottes, marqués du serpent de mercure du Syndicat.",
    "Zugwind weht über das Gitter. Bernsteinfarbene Glassplitter knirschen unter der Sohle mit dem Schlangen-Siegel des Syndikats.",
    "Холодный сквозняк свистит сквозь решетку. Осколки янтарного стекла хрустят под сапогом с печатью ртутного змея Синдиката.",
    "Una corrente gelida sferza la grata. Vetri ambrati scricchiolano sotto gli stivali col serpente di mercurio del Sindacato.",
    "Vento frio sopra pela grade. Cacos de vidro estalam sob a bota com a serpente de mercúrio do Sindicato.",
    "ريح باردة تعصف عبر القضبان وشظايا الزجاج الكهرماني تطقطق تحت حذائك ممهورة بختم أفعى الزئبق الخاصة بالنقابة."
  ),
  voices: [
    voice(V_RATIO, B_RATIO, tr(
      "This confirms a clandestine drop hours before the death. The Syndicate delivered the chemical precursors directly to this tower.",
      "Ini mengonfirmasi adanya transaksi rahasia beberapa jam sebelum kematian. Sindikat mengantarkan zat kimia langsung ke menara ini.",
      "这坐实了案发前数小时的秘密碰头。辛迪加将高危化学试剂亲手送到了钟楼！",
      "犯行数時間前に密使の接触があった決定打だ。シンジケートが薬品をこの塔へ直接届けたのだ。",
      "사건 몇 시간 전 은밀한 접선이 있었음을 증명합니다. 신디케이트가 화학 시약을 탑으로 직접 배달한 것입니다.",
      "Esto confirma una entrega clandestina horas antes de la muerte.",
      "Ceci confirme un échange clandestin quelques heures avant le drame.",
      "Das bestätigt eine geheime Übergabe wenige Stunden vor der Tat.",
      "Это доказывает тайную встречу за пару часов до гибели.",
      "Ciò conferma una consegna clandestina poche ore prima del delitto.",
      "Isso confirma uma entrega secreta horas antes da morte.",
      "يؤكد هذا حدوث تسليم سري قبل الجريمة بساعات، حيث سلمت النقابة المواد إلى أعلى البرج."
    ))
  ],
  options: [
    tr('[Log clue: Shattered Reagents & Syndicate Crest]', '[Catat bukti: Serpihan Reagen Kimia & Lambang Sindikat]', '【记录线索：碎裂的试剂瓶与辛迪加火漆印】', '【手がかりを記録：破壊された試薬瓶と紋章】', '[단서 기록: 깨진 시약병과 신디케이트 문장]', '[Registrar pista: Reactivos Rotos y Emblema]', '[Noter l\'indice : Réactifs Brisés et Sceau]', '[Hinweis aufnehmen: Zerschlagene Reagenzien]', '[Записать улику: Осколки реагентов и печать]', '[Registra indizio: Reagenti Infranti e Sigillo]', '[Registrar pista: Reagentes Quebrados e Brasão]', '[تسجيل الدليل: زجاجات كواشف محطمة وخاتم النقابة]'),
    tr('[Step back down to the main floor]', '[Kembali ke lantai utama]', '【回到主钟楼】', '【主フロアへ戻る】', '[메인 플로어로 복귀]', '[Bajar al piso principal]', '[Redescendre au niveau principal]', '[Zurück zum Hauptboden]', '[Спуститься на главный этаж]', '[Torna al piano principale]', '[Descer para o piso principal]', '[النزول للطابق الرئيسي]')
  ]
};

// 23. examine_chime_bell
NODES.examine_chime_bell = {
  speaker: tr('Colossal Bell & Acoustic Escapement', 'Lonceng Raksasa & Escapement Akustik', '圣艾琳青铜巨钟与共振击发机构', '巨大青銅鐘と音響脱進機', '청동 거대 종과 음향 탈진 장치', 'Campana Colosal y Disparador Acústico', 'Cloche Colossale et Déclencheur Acoustique', 'Kolossale Glocke und Auslöser', 'Исполинский колокол и спуск', 'Campana Colossale e Scappamento Acustico', 'Sino Colossal e Escape Acústico', 'الجرس الضخم وآلية الإفلات بالرنين'),
  text: tr(
    "You look up into the cavernous rim of the eight-ton bronze bell. Tied to the heavy iron clapper is a taut piano wire running through tiny brass pulleys down to the pendulum latch.",
    "Kamu menatap ke dalam rongga lonceng perunggu seberat delapan ton. Terikat pada pemukul besi adalah kawat piano tegang yang menjulur melalui puli kuningan kecil menuju kait pendulum.",
    "你仰望八吨重的青铜大钟内膛。铁铸钟锤上栓着紧绷的琴钢丝，穿过微型滑轮直通下方的钟摆搭扣！",
    "8トンの巨大な青銅鐘の内側を見上げる。重い打鐘レバーにピアノ線が結ばれ、極小滑車を通って振り子の掛け金へ繋がっている。",
    "8톤짜리 청동 종 안쪽을 올려다봅니다. 무거운 종 추에 팽팽한 피아노선이 묶여 황동 도르래를 통해 진자 걸쇠까지 이어져 있습니다.",
    "Miras dentro de la campana de bronce. Atado al badajo hay un alambre de piano que baja hacia el pestillo del péndulo.",
    "Vous levez les yeux sous la cloche de huit tonnes. Relié au battant, un fil d\'acier court jusqu\'au loquet du balancier.",
    "Sie blicken in die Acht-Tonnen-Glocke. Ein Klavierdraht führt vom Klöppel über winzige Rollen zum Pendelriegel.",
    "Ты заглядываешь под свод восьмитонного колокола. К языку привязан стальной тросик, идущий через шкивы к защелке маятника.",
    "Guardi sotto la campana da otto tonnellate. Una corda d\'acciaio legata al battaglio scende fino al fermo del pendolo.",
    "Você olha sob o sino de oito toneladas. Preso ao badalo há um fio de aço que desce até o trinco do pêndulo.",
    "نظرت لتجويف الجرس البرونزي ذي الثمانية أطنان، فرأيت سلك بيانو مشدودًا يربط لسان الجرس الحديدي بسقاطة البندول."
  ),
  voices: [
    voice(V_MOTORICS, B_MOTORICS, tr(
      "Ingenious acoustics. When the clock struck 03:42, the vibration and swing of the clapper yanked the tripwire, releasing the fatal counterweight automatically.",
      "Akustik yang sangat jenius. Saat jam berdentang pukul 03:42, getaran dan ayunan pemukul menarik kawat picu, menjatuhkan beban maut secara otomatis.",
      "惊人的声学联动！03:42大钟鸣响的瞬间，钟锤的震荡直接扯动引线，自动解开了杀人的致命配重！",
      "見事な音響機械だ。時計が3時42分を打った瞬間、鐘の振動がワイヤーを引き、カウンターウェイトを自動的に落としたのだ。",
      "기막힌 음향 기계입니다. 3시 42분을 치는 순간 종 추의 진동이 와이어를 당겨 평형추를 자동으로 떨어뜨린 겁니다.",
      "Acústica ingeniosa. Al dar las 03:42, la vibración del badajo tiró del cable soltando el contrapeso.",
      "Acoustique ingénieuse. Au coup de 03h42, la vibration du battant a tiré le fil libérant le contrepoids.",
      "Geniale Akustik. Beim Schlag um 03:42 Uhr riss die Schwingung am Draht und löste das Gegengewicht aus.",
      "Гениальная механика. В 03:42 удар колокола дернул тросик и автоматически спустил противовес.",
      "Acustica geniale. Al rintocco delle 03:42, la vibrazione ha azionato il cavo liberando il contrappeso.",
      "Acústica engenhosa. Às 03:42, a vibração puxou o fio soltando o contrapeso automaticamente.",
      "هندسة صوتية بارعة! حين دقت الساعة عند 03:42 سحب اهتزاز لسان الجرس سلك التفجير وأفلت ثقل الموازنة آليًا."
    ))
  ],
  options: [
    tr('[Log clue: Acoustic Resonance Tripwire Mechanism]', '[Catat bukti: Mekanisme Kawat Picu Akustik]', '【记录线索：钟鸣共振引线机构】', '【手がかりを記録：音響共鳴トラップワイヤー】', '[단서 기록: 음향 공명 격발 와이어 장치]', '[Registrar pista: Mecanismo de Resonancia]', '[Noter l\'indice : Mécanisme de Déclenchement]', '[Hinweis aufnehmen: Akustischer Auslösedraht]', '[Записать улику: Акустический спусковой механизм]', '[Registra indizio: Meccanismo a Risonanza]', '[Registrar pista: Mecanismo de Fio Acústico]', '[تسجيل الدليل: آلية سلك التفجير بالرنين الصوتي]'),
    tr('[Step down from the bell housing]', '[Turun dari kubah lonceng]', '【走下钟楼支架】', '【鐘楼から降りる】', '[종탑에서 내려온다]', '[Bajar del campanario]', '[Descendre de la cloche]', '[Vom Glockengehäuse herabsteigen]', '[Спуститься из-под колокола]', '[Scendi dalla cella campanaria]', '[Descer da torre do sino]', '[النزول من حجرة الجرس]')
  ]
};

console.log('Total nodes gathered:', Object.keys(NODES).length);

// Save to src/dialogue_i18n.js
const fullOutput = `// Aenigma Complete 12-Language Story & Clue Localizations
// Fully covers all 38 Dialogue Nodes, 13 Case Clues, and Crime Scene POIs
// Supported Languages: en, id, zh, ja, ko, es, fr, de, ru, it, pt, ar

export const DIALOGUE_I18N_FULL = ${JSON.stringify(NODES, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '..', 'src', 'dialogue_i18n.js'), fullOutput, 'utf8');
console.log('Successfully wrote src/dialogue_i18n.js with', Object.keys(NODES).length, 'nodes!');
