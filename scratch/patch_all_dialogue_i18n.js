const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'dialogue_i18n.js');
const mod = require(filePath);
const D = mod.DIALOGUE_I18N_FULL;

function tr(en, id_text, zh, ja, ko, es, fr, de, ru, it, pt, ar) {
  return {
    en, id: id_text, zh, ja,
    ko, es: es || en, fr: fr || en, de: de || en,
    ru: ru || en, it: it || en, pt: pt || en, ar: ar || en
  };
}

const V_RATIO = tr('Ratio', 'Rasio', '理性', '比率', '이성', 'Razón', 'Ratio', 'Ratio', 'Рацио', 'Ragione', 'Razão', 'العقلانية');
const B_RATIO = tr('RATIO [Intellect]', 'RASIO [Intelek]', '理性 [智力]', '比率 [知性]', '이성 [지성]', 'RAZÓN [Intelecto]', 'RATIO [Intellect]', 'RATIO [Intellekt]', 'РАЦИО [Интеллект]', 'RAGIONE [Intelletto]', 'RAZÃO [Intelecto]', 'العقلانية [الفكر]');

const V_CARNAL = tr('Carnal', 'Karnal', '肉体本能', '肉体', '육체', 'Carnal', 'Carnal', 'Körper', 'Тело', 'Fisico', 'Físico', 'الجسد');
const B_CARNAL = tr('CARNAL [Physique]', 'KARNAL [Fisik]', '肉体本能 [体魄]', '肉体 [身体]', '육체 [신체]', 'CARNAL [Físico]', 'CARNAL [Physique]', 'KÖRPER [Physis]', 'ТЕЛО [Телосложение]', 'FISICO [Fisico]', 'FÍSICO [Físico]', 'الجسد [البنية]');

const V_ELYSIA = tr('Elysia', 'Elysia', '极乐直觉', 'エリシア', '엘리시아', 'Elysia', 'Élysia', 'Elysia', 'Элизия', 'Elysia', 'Elísia', 'إليزيا');
const B_ELYSIA = tr('ELYSIA [Psyche]', 'ELYSIA [Kejiwaan]', '极乐直觉 [心智]', 'エリシア [精神]', '엘리시아 [심리]', 'ELYSIA [Psique]', 'ÉLYSIA [Psyché]', 'ELYSIA [Psyche]', 'ЭЛИЗИЯ [Психика]', 'ELYSIA [Psiche]', 'ELÍSIA [Psique]', 'إليزيا [الروح]');

const V_REFLEX = tr('Reflex', 'Refleks', '反应力', '反射神経', '반사신경', 'Reflejo', 'Réflexe', 'Reflex', 'Рефлекс', 'Riflesso', 'Reflexo', 'رد الفعل');
const B_REFLEX = tr('REFLEX [Motorics]', 'REFLEKS [Motorik]', '反应力 [运动敏捷]', '反射神経 [運動]', '반사신경 [운동]', 'REFLEJO [Motricidad]', 'RÉFLEXE [Motricité]', 'REFLEX [Motorik]', 'РЕФЛЕКС [Моторика]', 'RIFLESSO [Motorica]', 'REFLEXO [Motricidade]', 'رد الفعل [الحركية]');

function voice_item(v_name, b_name, text_dict) {
  return {
    voice: v_name,
    badge: b_name,
    text: text_dict
  };
}

// 1. graves_dialogue_start (already has voice)

// 2. graves_assessment (already has voice)

// 3. graves_rhetoric_win
D['graves_rhetoric_win'].voices = [
  voice_item(V_ELYSIA, B_ELYSIA, tr(
    "Greed radiates off him like heat from a kiln. But he didn't kill Vance—he arrived too late and found her already cold.",
    "Keserakahan memancar dari dirinya bagai panas dari tungku pembakaran. Tapi bukan dia yang membunuh Vance—dia tiba terlalu terlambat dan mendapati tubuhnya sudah dingin membeku.",
    "贪婪如窑炉的余热般从他身上不断蒸腾散发。但他并没有亲自动手杀死梵斯——他只是来得太迟，赶到时尸体早已冰凉透骨。",
    "陶芸窯のような熱気となって強欲が彼から立ち込めている。だが彼がヴァンスを殺したのではない——到着が遅すぎ、すでに冷たくなっていた遺体を見つけただけだ。",
    "가마에서 뿜어져 나오는 열기처럼 탐욕이 그에게서 흘러나옵니다. 하지만 그가 밴스를 죽인 것은 아닙니다. 너무 늦게 도착해 이미 차갑게 식은 시신을 발견했을 뿐입니다.",
    "La codicia irradia de él como el calor de un horno. Pero no mató a Vance; llegó demasiado tarde y la encontró ya fría.",
    "L'avidité émane de lui comme la chaleur d'un fourneau. Mais il n'a pas tué Vance : il est arrivé trop tard et l'a trouvée déjà froide.",
    "Habgier strahlt von ihm aus wie Hitze aus einem Brennofen. Aber er hat Vance nicht getötet – er kam zu spät und fand sie bereits kalt vor.",
    "Жадность исходит от него, как жар из печи. Но он не убивал Вэнс — он пришел слишком поздно и застал ее уже остывшей.",
    "L'avidità si sprigiona da lui come calore da una fornace. Ma non ha ucciso Vance: è arrivato troppo tardi e l'ha trovata già fredda.",
    "A ganância irradia dele como o calor de uma fornalha. Mas ele não matou Vance — chegou tarde demais e a encontrou fria.",
    "ينبعث الجشع منه كحرارة تتصاعد من فرن متقد. لكنه لم يقتل فانس، بل وصل متأخرًا ووجد جثتها باردة بالفعل."
  ))
];

// 4. graves_cigarette
D['graves_cigarette'].voices = [
  voice_item(V_REFLEX, B_REFLEX, tr(
    "The sulfur match strikes with an electric hiss. Inhaling the tar-heavy smoke calms your tremor. +1 Morale restored.",
    "Korek api belerang menyala dengan desisan elektrik. Menghirup asap pekat tembakau menenangkan tremor tanganmu. +1 Moral dipulihkan.",
    "硫磺火柴在擦条上划出一声带电般的咝咝脆响。深吸一口焦油浓重的辛辣烟气，让你颤抖的手指终于重获镇定。+1 精神士气恢复。",
    "硫黄のマッチが電気のような摩擦音を立てて擦られる。タールに満ちた煙を吸い込むと、指先の震えが和らぐ。士気+1回復。",
    "유황 성냥이 전기가 튀듯 쉬익 소리를 내며 타오릅니다. 타르가 짙은 연기를 들이마시자 손끝의 떨림이 가라앉습니다. 사기 +1 회복.",
    "El fósforo de azufre chisporrotea con un siseo eléctrico. Inhalar el humo espeso de alquitrán calma tu temblor. +1 Moral restaurada.",
    "L'allumette au soufre s'embrase dans un chuintement électrique. Inhaler cette fumée chargée de goudron apaise vos tremblements. +1 Moral restauré.",
    "Das Schwefelhölzchen entzündet sich mit einem zischenden Laut. Der teerhaltige Rauch beruhigt dein Zittern. +1 Moral wiederhergestellt.",
    "Серная спичка вспыхивает с электрическим шипением. Вдох смолистого дыма унимает дрожь в пальцах. +1 к Боевому духу.",
    "Il fiammifero allo zolfo si accende con un sibilo elettrico. Inalare il fumo denso di catrame placa il tuo tremore. +1 Morale ripristinato.",
    "O fósforo de enxofre risca com um chiado elétrico. Inalar a fumaça pesada de alcatrão acalma seu tremor. +1 Moral restaurada.",
    "يشتعل عود الثقاب الكبريتي بفحيح كهربائي خافت. استنشاق الدخان المشبع بالقطران يهدئ رجفة أصابعك. +1 استعادة المعنويات."
  ))
];

// 5. examine_pendulum_start
D['examine_pendulum_start'].voices = [
  voice_item(V_RATIO, B_RATIO, tr(
    "Hypostasis deduction: She did not die here on the pendulum. She was killed at the window sill, bled out, and her body was dragged and mounted onto the clock mechanism to make the stoppage seem like an accidental disaster.",
    "Deduksi hipostasis: Korban tidak mati di sini pada pendulum. Dia dibunuh di dekat jendela, kehabisan darah, lalu jenazahnya diseret dan dipasang ke mekanisme jam agar penghentian jam tampak seperti bencana kecelakaan.",
    "尸斑重力推演：她的真正死因绝非钟摆压迫。她是在窗台边遇刺身亡、流尽鲜血后，尸体才被凶手拖过来固定在齿轮配重上的，企图制造机械事故假象！",
    "死斑の推論：彼女はこの振り子の上で死んだのではない。窓際で殺害されて失血死した後、時計停止を事故に見せかけるため遺体を運んで機構に固定したのだ。",
    "시반 추론: 피해자는 시계추 위에서 사망한 것이 아닙니다. 창틀에서 살해당해 피를 흘린 뒤, 시계 정지를 우발적 사고처럼 위장하기 위해 시신을 기계 장치로 끌고 와 매달아 놓았습니다.",
    "Deducción de hipóstasis: No murió aquí en el péndulo. Fue asesinada en el alféizar de la ventana, se desangró y su cuerpo fue arrastrado y montado en el mecanismo para simular un accidente.",
    "Déduction d'hypostase : Elle n'est pas morte ici sur le balancier. Elle a été tuée près de la fenêtre, s'est vidée de son sang, puis son corps a été traîné et hissé sur le mécanisme pour simuler un accident.",
    "Livores-Deduktion: Sie starb nicht hier am Pendel. Sie wurde an der Fensterbank getötet, blutete aus, und ihre Leiche wurde auf das Uhrwerk geschleift, um einen Unfall vorzutäuschen.",
    "Трупные пятна не врут: она умерла не здесь на маятнике. Ее убили у окна, она истекла кровью, а затем тело приволокли сюда для инсценировки несчастного случая.",
    "Deduzione dell'ipostasi: Non è morta qui sul pendolo. È stata uccisa sul davanzale, dissanguata, e il corpo è stato trascinato e montato sull'orologio per simulare un disastro accidentale.",
    "Dedução de hipóstase: Ela não morreu aqui no pêndulo. Foi assassinada no parapeito, sangrou até morrer, e seu corpo foi arrastado e montado no mecanismo para forjar um acidente.",
    "استنتاج علمي للترسب الدموي: لم تمت الضحية هنا على البندول بل قُتلت عند حافة النافذة ونزفت حتى الموت، ثم سُحلت جثتها ورُكبت على ثقل الساعة ليبدو التوقف وكأنه حادث عرضي."
  )),
  voice_item(V_CARNAL, B_CARNAL, tr(
    "Touch her wrist. The rigor mortis is uneven. The left arm is limp, while the right hand is frozen in a convulsive grip, clutching something tightly inside her palm.",
    "Sentuh pergelangan tangannya. Kaku mayatnya tidak merata. Lengan kirinya lemas, sedangkan tangan kanannya membeku dalam cengkeraman kejang, menggenggam sesuatu dengan sangat erat di telapak tangannya.",
    "触碰她的手腕。尸僵分布极不均匀。左臂软垂无力，而右手却在死前痉挛中彻底僵死，掌心死死攥紧着某种冰冷的小物件。",
    "手首に触れてみろ。死後硬直に偏りがある。左腕はだらりと垂れ下がっているが、右手は激しい痙攣のまま凍りつき、掌の中に何かを固く握りしめている。",
    "손목을 만져보십시오. 사후강직이 불균등합니다. 왼팔은 축 늘어져 있지만, 오른손은 경련하듯 굳어 손바닥 안에 무언가를 억세게 움켜쥐고 있습니다.",
    "Toca su muñeca. El rigor mortis es desigual. El brazo izquierdo está flácido, mientras que la mano derecha está congelada en un agarre convulsivo, apretando algo con fuerza en la palma.",
    "Touchez son poignet. La rigidité cadavérique est inégale. Le bras gauche est flasque, tandis que la main droite est figée dans une crispation convulsive, serrant fort quelque chose dans sa paume.",
    "Berühre ihr Handgelenk. Die Totenstarre ist ungleichmäßig. Der linke Arm ist schlaff, während die rechte Hand in krampfhaftem Griff erstarrt ist und etwas fest umschlossen hält.",
    "Коснись ее запястья. Трупное окоченение неравномерно. Левая рука безжизненна, но правая ладонь судорожно сжата в кулак, намертво удерживая что-то внутри.",
    "Tocca il suo polso. Il rigor mortis è irregolare. Il braccio sinistro è flaccido, mentre la mano destra è congelata in una presa convulsiva, stringendo saldamente qualcosa nel palmo.",
    "Toque o pulso dela. O rigor mortis é irregular. O braço esquerdo está mole, enquanto a mão direita congelou num aperto convulsivo, segurando algo com força na palma.",
    "المس معصمها. التخشب الرمي غير متكافئ؛ الذراع اليسرى مرتخية، بينما اليد اليمنى متجمدة في قبضة تشنجية تطبق بقوة على شيء ما داخل راحة يدها."
  ))
];

// Options for examine_pendulum_start (must have all 4 options with exact IDs)
D['examine_pendulum_start'].options = [
  {
    id: 'pendulum_opt_pry_hand',
    ...tr(
      "[PERCEPTION - Challenging 12] Pry open her frozen right hand to see what she clenched before dying.",
      "[PERSEPSI - Sulit 12] Buka paksa genggaman tangan kanannya yang membeku untuk melihat apa yang ia cengkeram sebelum mati.",
      "【感知 - 难度 12】掰开她僵死冰冷的右手，检查死者死前紧攥之物。",
      "【知覚 - 難度 12】硬直した右手をこじ開け、死の間際に何を握りしめていたか検分する。",
      "[지각 - 난이도 12] 굳어버린 오른손을 강제로 벌려 죽기 직전 쥐고 있던 것을 확인한다.",
      "[PERCEPCIÓN - Desafiante 12] Abrir su mano congelada para examinar qué apretaba antes de morir.",
      "[PERCEPTION - Difficile 12] Forcer sa main droite figée pour voir ce qu'elle serrait avant de mourir.",
      "[WAHRNEHMUNG - Schwer 12] Ihre verkrampfte rechte Hand aufbrechen, um zu sehen, was sie festhielt.",
      "[ВОСПРИЯТИЕ - Сложность 12] Разжать ее одеревеневшие пальцы и изучить предмет в руке.",
      "[PERCEZIONE - Impegnativo 12] Apri la sua mano irrigidita per vedere cosa stringeva prima di morire.",
      "[PERCEPÇÃO - Desafiador 12] Forçar a mão direita congelada para ver o que ela segurava ao morrer.",
      "[الإدراك - صعب 12] فتح قبضتها اليمنى المتصلبة لمعاينة ما كانت تمسكه بقوة قبل موتها."
    )
  },
  {
    id: 'pendulum_opt_esoterica',
    ...tr(
      "[ESOTERICA - Medium 10] Study the strange geometric incision carved into her collarbone.",
      "[ESOTERIKA - Sedang 10] Teliti ukiran geometris aneh yang tergores di tulang selangkanya.",
      "【秘教 - 难度 10】细细研读刻在她锁骨处那道诡异的几何炼金刻痕。",
      "【秘教 - 難易度 10】彼女の鎖骨に刻まれた奇妙な幾何学的刻印を調べる。",
      "[비전학 - 보통 10] 쇄골에 새겨진 기이한 기하학적 절개 문양을 분석한다.",
      "[ESOTERISMO - Medio 10] Estudiar la extraña incisión geométrica tallada en su clavícula.",
      "[ÉSOTÉRISME - Moyen 10] Étudier l'étrange incision géométrique gravée sur sa clavicule.",
      "[ESOTERIK - Mittel 10] Die seltsame geometrische Einritzung an ihrem Schlüsselbein untersuchen.",
      "[ЭЗОТЕРИКА - Сложность 10] Изучить странные геометрические надрезы на ее ключице.",
      "[ESOTERISMO - Medio 10] Studia la strana incisione geometrica incisa sulla clavicola.",
      "[ESOTERISMO - Médio 10] Estudar a estranha incisão geométrica talhada na clavícula dela.",
      "[العلوم الباطنية - متوسط 10] دراسة النقش الهندسي الغريب المحفور على عظمة ترقوتها."
    )
  },
  {
    id: 'pendulum_opt_gears',
    ...tr(
      "[DANGEROUS] Reach deep into the churning escapement gears to look for dropped evidence.",
      "[BERBAHAYA] Raih ke dalam celah roda gigi escapement yang berputar untuk mencari bukti yang terjatuh.",
      "【极度危险】将手探入猛烈咬合转动的擒纵齿轮深处，搜寻掉落的证据残片。",
      "【危険】回転する脱進機の歯車の奥深くに手を差し入れ、落ちた証拠を探す。",
      "[위험] 맞물려 돌아가는 탈진기 톱니바퀴 틈새로 손을 뻗어 떨어진 증거를 찾는다.",
      "[PELIGROSO] Meter la mano entre los engranajes en marcha para buscar pruebas caídas.",
      "[DANGEREUX] Plonger la main dans les engrenages en mouvement pour chercher un indice tombé.",
      "[GEFÄHRLICH] Tief in die mahlenden Zahnräder greifen, um nach Beweisen zu suchen.",
      "[ОПАСНО] Залезть рукой глубоко в крутящиеся шестеренки в поисках упавших улик.",
      "[PERICOLOSO] Infila la mano negli ingranaggi in movimento per cercare prove cadute.",
      "[PERIGOSO] Alcançar o fundo das engrenagens em movimento para procurar provas caídas.",
      "[خطر] مد يدك في أعماق تروس ميزان الساعة الدوارة بحثًا عن أدلة ساقطة."
    )
  },
  {
    id: 'pendulum_opt_stepback',
    ...tr(
      "[Step back from the corpse]",
      "[Mundur dari jenazah]",
      "【从尸体旁退后】",
      "【遺体から離れる】",
      "[시신에서 물러선다]",
      "[Alejarse del cadáver]",
      "[S'éloigner du cadavre]",
      "[Von der Leiche zurücktreten]",
      "[Отойти от тела]",
      "[Allontanati dal cadavere]",
      "[Afastar-se do cadáver]",
      "[الابتعاد عن الجثة]"
    )
  }
];

// 6. pendulum_pry_win
D['pendulum_pry_win'].voices = [
  voice_item(V_REFLEX, B_REFLEX, tr(
    "Belladonna and mercuric oxide. An assassination needle. Vance was paralyzed with neurotoxin before her body was hoisted onto the pendulum!",
    "Belladonna dan oksida merkuri. Jarum pembunuh. Vance dilumpuhkan dengan racun saraf sebelum jenazahnya diangkat ke pendulum!",
    "颠茄素与氧化汞结晶。这是一枚特制的暗杀毒针！梵斯在尸体被挂上钟摆前，就已经被剧毒神经毒素彻底麻痹了！",
    "ベラドンナと酸化水銀。暗殺用の毒針だ。ヴァンスは振り子に吊るされる前に、神経毒で麻痺させられていたのだ！",
    "벨라도나와 산화수은. 암살용 독침입니다. 밴스는 시신이 시계추에 매달리기 전에 이미 신경독으로 마비되어 있었습니다!",
    "Belladona y óxido mercúrico. Una aguja de asesinato. ¡Vance fue paralizada con neurotoxina antes de ser izada al péndulo!",
    "Belladone et oxyde de mercure. Une aiguille d'assassinat. Vance a été paralysée par une neurotoxine avant d'être hissée sur le balancier !",
    "Tollkirsche und Quecksilberoxid. Eine Attentatsnadel. Vance wurde gelähmt, bevor sie an das Pendel gehängt wurde!",
    "Белладонна и оксид ртути. Игла убийцы. Вэнс была парализована нейротоксином до того, как тело подняли на маятник!",
    "Belladonna e ossido di mercurio. Un ago da assassinio. Vance è stata paralizzata prima di essere issata sul pendolo!",
    "Beladona e óxido mercúrico. Uma agulha de assassinato. Vance foi paralisada com neurotoxina antes de ser erguida ao pêndulo!",
    "ست الحسن وأكسيد الزئبق. إبرة اغتيال غادرة. لقد شُل جسد فانس بسم عصبي قبل رفع جثتها على البندول!"
  ))
];
D['pendulum_pry_win'].options = [
  tr(
    "\"The killer didn't use brute force. They used a parlor trick.\"",
    "\"Pembunuhnya tidak memakai kekerasan fisik semata. Mereka memakai tipu muslihat yang licik.\"",
    "“凶手并没有使用粗暴蛮力，而是用了一种阴险的江湖障眼法。”",
    "「犯人は腕力を使ったんじゃない。巧妙なトリックを使ったんだ。」",
    "\"범인은 무력을 쓰지 않았소. 교묘한 속임수를 썼지.\"",
    "\"El asesino no usó fuerza bruta. Usó un truco de salón.\"",
    "\"Le tueur n'a pas usé de force brute. C'était un tour de passe-passe.\"",
    "\"Der Mörder wandte keine rohe Gewalt an. Es war ein billiger Zaubertrick.\"",
    "«Убийца не применял грубую силу. Он использовал фокус с ядом.»",
    "\"L'assassino non ha usato la forza bruta. Ha usato un trucco da salotto.\"",
    "\"O assassino não usou força bruta. Usou um truque de salão.\"",
    "\"لم يستخدم القاتل القوة الغاشمة، بل خدعة ماكرة ملتوية.\""
  ),
  tr(
    "[Close]",
    "[Tutup]",
    "【关闭】",
    "【閉じる】",
    "[닫기]",
    "[Cerrar]",
    "[Fermer]",
    "[Schließen]",
    "[Закрыть]",
    "[Chiudi]",
    "[Fechar]",
    "[إغلاق]"
  )
];

// 7. pendulum_pry_fail
D['pendulum_pry_fail'].voices = [
  voice_item(V_CARNAL, B_CARNAL, tr(
    "Clumsy! Your alcohol-trembled fingers slipped onto the needle. The venom spreads like liquid fire through your veins.",
    "Ceroboh! Jemarimu yang gemetar karena alkohol tergelincir mengenai jarum beracun. Bisanya menyebar bagai api cair di pembuluh darahmu.",
    "笨手笨脚！你因酒精宿醉而颤抖的手指狠狠划在了尖锐的毒针上。毒液宛如烈火液体般顺着静脉急剧蔓延！",
    "不器用め！アルコールで震える指が毒針を掠めた。猛毒が液体の炎となって血管を駆け巡る。",
    "어설프기는! 알코올로 떨리는 손가락이 독침을 스치고 말았습니다. 독이 액체 불꽃처럼 혈관을 타고 번져나갑니다.",
    "¡Torpe! Tus dedos temblorosos resbalaron contra la aguja. El veneno arde como fuego líquido por tus venas.",
    "Maladroit ! Vos doigts tremblants ont glissé sur l'aiguille. Le venin se répand comme un feu liquide dans vos veines.",
    "Ungeschickt! Deine zitternden Finger glitten auf die Nadel. Das Gift breitet sich wie flüssiges Feuer in deinen Adern aus.",
    "Неуклюже! Дрожащие пальцы соскользнули прямо на иглу. Яд жидким огнем разливается по венам.",
    "Maldestro! Le tue dita tremanti sono scivolate sull'ago. Il veleno si diffonde come fuoco liquido nelle vene.",
    "Desajeitado! Seus dedos trêmulos deslizaram sobre a agulha. O veneno se espalha como fogo líquido nas veias.",
    "خرق فاضح! انزلقت أصابعك المرتجفة من الكحول لتلمس الإبرة، لينتشر السم كنار سائلة في أوردتك."
  ))
];

// 8. examine_watch_start
D['examine_watch_start'].voices = [
  voice_item(V_RATIO, B_RATIO, tr(
    "Listen. The cadence is wrong. A normal escapement beats at five ticks per second (300 BPM). This mechanism is pulsing in an irregular triplet: tap... tap-tap... tap.",
    "Dengarkan baik-baik. Ketukannya ganjil. Escapement jam normal berdetak lima kali per detik (300 BPM). Mekanisme ini berdenyut dalam pola triplet tak beraturan: tik... tik-tik... tik.",
    "侧耳细听。这种摆动节奏完全不对。普通钟表擒纵器每秒敲击五次（300 BPM）。而眼前的精密机构却在以一种诡异的三连音脉动：咔……咔-咔……咔。",
    "聴け。リズムが狂っている。通常の脱進機は毎秒5回（300 BPM）刻む。この機構は不規則な三連符で脈打っている：カチッ……カチ・カチッ……カチッ。",
    "귀를 기울이십시오. 박자가 잘못되었습니다. 보통의 탈진기는 초당 5회(300 BPM) 박동합니다. 하지만 이 장치는 불규칙한 세 박자로 뛰고 있습니다. 틱... 틱-틱... 틱.",
    "Escucha. La cadencia es errónea. Un escape normal late a cinco tics por segundo (300 BPM). Este mecanismo pulsa en un triplete irregular: tac... tac-tac... tac.",
    "Écoutez. Le rythme est anormal. Un échappement régulier bat à cinq coups par seconde. Ce mécanisme pulse en un triolet irrégulier : tic... tic-tic... tic.",
    "Hör zu. Der Takt stimmt nicht. Ein normales Hemmungswerk tickt fünfmal pro Sekunde. Dieses pulsiert in einer unregelmäßigen Triole: tick... tick-tick... tick.",
    "Послушай. Ритм нарушен. Обычный спуск тикает пять раз в секунду. Этот механизм пульсирует странной триолью: тик... тик-тик... тик.",
    "Ascolta. Il ritmo è sbagliato. Un normale scappamento batte cinque tic al secondo. Questo meccanismo pulsa in una terzina irregolare: tic... tic-tic... tic.",
    "Ouça. A cadência está errada. Um escape normal bate cinco vezes por segundo. Este mecanismo pulsa em tercinas irregulares: tique... tique-tique... tique.",
    "أنصت بدقة. الإيقاع غير سليم؛ ميزان الساعة المعتاد ينبض 5 دقات بالثانية، بينما تنبض هذه الآلية بنمط ثلاثي مضطرب."
  ))
];
D['examine_watch_start'].options = [
  {
    id: 'watch_opt_interfacing',
    ...tr(
      "[INTERFACING - Medium 11] Pop open the back casing with your thumbnail to examine the inner movement.",
      "[PENYELARASAN MESIN - Sedang 11] Cungkil penutup belakang dengan ujung kuku untuk memeriksa roda gigi bagian dalam.",
      "【机构连动 - 难度 11】用指甲挑开怀表后盖，检视其内嵌的复杂机芯。",
      "【機構連動 - 難易度 11】親指の爪で裏蓋をこじ開け、内部のムーブメントを調べる。",
      "[기계 조율 - 보통 11] 엄지손톱으로 뒷면 덮개를 열어 내부 무브먼트를 살펴본다.",
      "[CONEXIÓN MECÁNICA - Medio 11] Abrir la tapa trasera con la uña para examinar el movimiento interno.",
      "[INTERFAÇAGE - Moyen 11] Ouvrir le boîtier arrière avec l'ongle pour examiner le mouvement.",
      "[MECHANIK - Mittel 11] Das hintere Gehäuse aufhebeln, um das Innenleben zu untersuchen.",
      "[ВЗАИМОДЕЙСТВИЕ - Сложность 11] Поддеть ногтем заднюю крышку и изучить механизм.",
      "[INTERAZIONE - Medio 11] Apri il coperchio posteriore per esaminare il meccanismo interno.",
      "[INTERAÇÃO - Médio 11] Abrir a tampa traseira para examinar o mecanismo interno.",
      "[التعامل الميكانيكي - متوسط 11] فتح الغطاء الخلفي لمعاينة التروس الداخلية للحركة."
    )
  },
  {
    id: 'watch_opt_take',
    ...tr(
      "[Put the watch in evidence bag]",
      "[Masukkan arloji ke dalam kantong bukti]",
      "【将怀表放入物证袋】",
      "【懐中時計を証拠品袋に収める】",
      "[시계를 증거품 가방에 보관한다]",
      "[Poner el reloj en la bolsa de pruebas]",
      "[Mettre la montre dans le sac à preuves]",
      "[Die Uhr in die Beweismitteltasche legen]",
      "[Убрать часы в мешок для улик]",
      "[Metti l'orologio nella busta delle prove]",
      "[Colocar o relógio no saco de evidências]",
      "[وضع الساعة في حقيبة الأدلة]"
    )
  },
  {
    id: 'watch_opt_stepback',
    ...tr(
      "[Step back]",
      "[Mundur]",
      "【退后】",
      "【戻る】",
      "[뒤로 물러선다]",
      "[Retroceder]",
      "[Reculer]",
      "[Zurücktreten]",
      "[Назад]",
      "[Indietro]",
      "[Recuar]",
      "[الرجوع للخلف]"
    )
  }
];

// 9. examine_balcony_start
D['examine_balcony_start'].voices = [
  voice_item(V_ELYSIA, B_ELYSIA, tr(
    "Someone stood here right after the clock stopped. They stood in the rain, looking out over the sleeping city, wiping something off their gloves. The scent of bitter almond still lingers on the stone.",
    "Seseorang berdiri di sini tepat setelah jam menara berhenti. Mereka berdiri di tengah hujan, menatap ke arah kota yang terlelap, menyeka sesuatu dari sarung tangan mereka. Aroma almond pahit masih tertinggal samar di bebatuan.",
    "就在大钟骤停的瞬间，曾有人站在此处。凶手伫立在暴雨中俯瞰沉睡的街市，从容擦拭着皮手套上的痕迹。湿漉漉的石栏上还隐隐残留着苦杏仁的气味。",
    "時計が止まった直後、誰かがここに立っていた。雨の中に立ち、眠れる街を見下ろしながら、手袋の汚れを拭っていたのだ。石の上には今も苦いアーモンドの香りが漂っている。",
    "시계가 멈춘 직후 누군가 이곳에 서 있었습니다. 빗속에 서서 잠든 도시를 내려다보며 장갑에 묻은 무언가를 닦아냈습니다. 석조 난간에는 여전히 씁쓸한 아몬드 향이 감돌고 있습니다.",
    "Alguien estuvo aquí justo tras detenerse el reloj. Mirando la ciudad bajo la lluvia, limpiándose los guantes. El olor a almendras amargas aún perdura.",
    "Quelqu'un se tenait ici juste après l'arrêt de l'horloge. Dans la pluie, observant la ville, essuyant ses gants. Une odeur d'amande amère flotte encore.",
    "Jemand stand hier, kurz nachdem die Uhr stoppte. Im Regen, über die Stadt blickend, Handschuhe abwischend. Der Duft von Bittermandel hängt am Stein.",
    "Кто-то стоял здесь сразу после остановки часов. Вглядывался в спящий город под дождем и вытирал перчатки. Запах горького миндаля все еще держится на камне.",
    "Qualcuno è rimasto qui subito dopo il blocco dell'orologio. Sotto la pioggia, a pulire i guanti. L'odore di mandorla amara aleggia ancora sulla pietra.",
    "Alguém esteve aqui logo após o relógio parar. Na chuva, olhando a cidade, limpando as luvas. O cheiro de amêndoa amarga ainda paira na pedra.",
    "وقف أحدهم هنا فور توقف الساعة مباشرة متأملاً المدينة تحت المطر ومسح قفازاته؛ ورائحة اللوز المر ما تزال عالقة بالحجر."
  ))
];

// 10. examine_safe_start options
D['examine_safe_start'].options = [
  {
    id: 'safe_opt_code',
    ...tr(
      "[If combination known (7-3-12)] Enter the code found inside Aurelia's watch.",
      "[Jika kombinasi diketahui (7-3-12)] Masukkan kode yang ditemukan di dalam arloji Aurelia.",
      "【若已知密码组合（7-3-12）】输入从奥蕾莉亚怀表内刻痕获取的三重密码。",
      "【暗証番号既知時（7-3-12）】オレリアの懐中時計で見つけた暗号を入力する。",
      "[비밀번호를 안다면 (7-3-12)] 오렐리아의 시계 안에서 발견한 암호를 입력한다.",
      "[Si conoce la combinación (7-3-12)] Introducir el código hallado en el reloj de Aurelia.",
      "[Si combinaison connue (7-3-12)] Entrer le code trouvé dans la montre d'Aurelia.",
      "[Kombination bekannt (7-3-12)] Den Code aus Aurelias Uhr eingeben.",
      "[Если комбинация известна (7-3-12)] Ввести шифр из часов Аурелии.",
      "[Se la combinazione è nota (7-3-12)] Inserisci il codice trovato nell'orologio.",
      "[Se a combinação for conhecida (7-3-12)] Digitar o código do relógio de Aurelia.",
      "[إذا كانت الشفرة معروفة (7-3-12)] إدخال الرمز المكتشف داخل ساعة أوريليا."
    )
  },
  {
    id: 'safe_opt_logic',
    ...tr(
      "[LOGIC - Hard 13] Attempt to deduce the tumbler alignment by acoustic vibration.",
      "[LOGIKA - Sulit 13] Coba deduksikan susunan pin gembok melalui getaran akustik.",
      "【逻辑 - 困难 13】借助听觉振动推演滚轮内部销栓的对齐卡位。",
      "【論理 - 難度 13】音響振動からタンブラーの噛み合わせを推論する。",
      "[논리 - 어려움 13] 음향 진동을 감지해 텀블러 핀의 정렬을 추리해 낸다.",
      "[LÓGICA - Difícil 13] Deducir la alineación de los tambores mediante vibración acústica.",
      "[LOGIQUE - Difficile 13] Déduire l'alignement des goupilles par vibration acoustique.",
      "[LOGIK - Schwer 13] Versuchen, die Zuhaltungen durch Vibrationen zu erschließen.",
      "[ЛОГИКА - Сложность 13] Вычислить положение штифтов по звуку вибраций.",
      "[LOGICA - Difficile 13] Deduci l'allineamento dei perni tramite vibrazioni acustiche.",
      "[LÓGICA - Difícil 13] Deduzir o alinhamento dos pinos pela vibração acústica.",
      "[المنطق - صعب 13] استنتاج محاذاة مسامير القفل من خلال الاهتزازات الصوتية."
    )
  },
  {
    id: 'safe_opt_brute',
    ...tr(
      "[BRUTE FORCE - Dangerous] Try to pry open the heavy iron lid with a crowbar.",
      "[KEKUATAN FISIK - Berbahaya] Coba cungkil paksa tutup besi tebal dengan linggis.",
      "【暴力破解 - 危险】尝试用重型撬棍强行撬开沉重的铸铁保险柜盖。",
      "【腕力 - 危険】バールを使って重い鉄の蓋を無理やりこじ開けようとする。",
      "[완력 - 위험] 쇠지렛대로 무거운 철제 뚜껑을 강제로 비틀어 열어본다.",
      "[FUERZA BRUTA - Peligroso] Intentar forzar la pesada tapa de hierro con una palanca.",
      "[FORCE BRUTE - Dangereux] Forcer le couvercle de fer à l'aide d'un pied-de-biche.",
      "[ROHE GEWALT - Gefährlich] Versuchen, den schweren Eisendeckel aufzubrechen.",
      "[СИЛА - Опасно] Попытаться вскрыть тяжелую крышку монтировкой.",
      "[FORZA BRUTA - Pericoloso] Tenta di scassinare il pesante coperchio con un piede di porco.",
      "[FORÇA BRUTA - Perigoso] Tentar forçar a tampa pesada com um pé de cabra.",
      "[القوة البدنية - خطير] محاولة خلع الغطاء الحديدي الثقيل بالقوة باستخدام عتلة."
    )
  },
  {
    id: 'safe_opt_leave',
    ...tr(
      "[Leave safe untouched]",
      "[Tinggalkan brankas tanpa disentuh]",
      "【暂不动保险箱】",
      "【金庫に手を触れず立ち去る】",
      "[금고를 그대로 두고 물러난다]",
      "[Dejar la caja intacta]",
      "[Laisser le coffre]",
      "[Den Safe unberührt lassen]",
      "[Не трогать сейф]",
      "[Lascia la cassaforte]",
      "[Deixar o cofre intacto]",
      "[ترك الخزنة دون لمسها]"
    )
  }
];

// 11. safe_open_code
D['safe_open_code'].voices = [
  voice_item(V_RATIO, B_RATIO, tr(
    "Look at the final entry dated last evening: 'Vivienne knows. She sold the cipher to the Syndicate for passage to the New Continent. Tonight she brings me tea. I know what is in the cup.'",
    "Lihat catatan terakhir bertanggal kemarin malam: 'Vivienne tahu. Dia menjual sandi rahasia kepada Sindikat demi tiket pelayaran ke Benua Baru. Malam ini dia membawakanku teh. Aku tahu apa yang ada di dalam cangkir itu.'",
    "细读昨夜最后那行凌乱的字迹：‘薇薇安知晓了一切。她将密文出卖给辛迪加，换取前往新大陆的船票。今晚她给我端来了红茶。我心知肚明那杯子里装着什么。’",
    "昨晩の日付の最後の記録を見ろ：『ヴィヴィアンは知っている。彼女は新大陸への渡航証と引き換えに暗号をシンジケートへ売った。今夜彼女は紅茶を持ってくる。そのカップに何が入っているか、私には分かっている。』",
    "어젯밤 날짜로 적힌 마지막 기록을 보십시오. '비비안이 알고 있다. 그녀는 신대륙으로 가는 뱃삯을 위해 암호표를 신디케이트에 팔아넘겼다. 오늘 밤 그녀가 차를 가져온다. 잔 속에 무엇이 들었는지 나는 알고 있다.'",
    "Mira la última entrada de anoche: 'Vivienne lo sabe. Vendió la clave al Sindicato. Esta noche me trae té. Sé qué hay en la taza'.",
    "Lisez la dernière entrée : 'Vivienne sait. Elle a vendu le chiffre au Syndicat. Ce soir, elle m'apporte le thé. Je sais ce qu'il y a dans la tasse.'",
    "Sieh dir den letzten Eintrag an: 'Vivienne weiß es. Sie verkaufte die Chiffre ans Syndikat. Heute Nacht bringt sie Tee. Ich weiß, was in der Tasse ist.'",
    "Взгляни на последнюю запись: «Вивьен знает. Она продала шифр Синдикату. Сегодня она несет мне чай. Я знаю, что в чашке».",
    "Guarda l'ultima annotazione: 'Vivienne sa. Ha venduto il cifrario al Sindacato. Stasera mi porta il tè. So cosa c'è nella tazza'.",
    "Veja a última anotação: 'Vivienne sabe. Vendeu a cifra ao Sindicato. Esta noite ela me traz chá. Eu sei o que há na xícara'.",
    "انظر إلى التدوينة الأخيرة المؤرخة ليلة أمس: 'فيفيان تعلم. باعت الشفرة للنقابة. الليلة تقدم لي الشاي وأعلم جيدًا ما في الكأس'."
  ))
];

// 12. madame_dialogue_start options
D['madame_dialogue_start'].options = [
  {
    id: 'madame_opt_alibi',
    ...tr(
      "\"Where were you at 03:42 AM when the tower clock stopped?\"",
      "\"Di mana Anda berada pada pukul 03:42 dini hari saat jam menara berhenti?\"",
      "“凌晨03:42分大钟骤停时，你究竟身在何处？”",
      "「時計塔が止まった午前3時42分、お前はどこにいた？」",
      "\"탑 시계가 멈춘 새벽 03시 42분에 부인은 어디 계셨습니까?\"",
      "\"¿Dónde estaba usted a las 03:42 cuando se detuvo el reloj de la torre?\"",
      "\"Où étiez-vous à 03h42 quand l'horloge s'est arrêtée ?\"",
      "\"Wo waren Sie um 03:42 Uhr, als die Turmuhr stoppte?\"",
      "«Где вы были в 03:42, когда часы на башне остановились?»",
      "\"Dov'era alle 03:42 quando l'orologio della torre si è fermato?\"",
      "\"Onde você estava às 03:42 quando o relógio da torre parou?\"",
      "\"أين كنت في تمام الساعة 03:42 فجرًا عندما توقفت ساعة البرج؟\""
    )
  },
  {
    id: 'madame_opt_empathy',
    ...tr(
      "[EMPATHY - Medium 10] \"You did not love her, did you, Madame?\"",
      "[EMPATI - Sedang 10] \"Anda tidak pernah mencintainya, bukan, Nyonya?\"",
      "【共情 - 难度 10】“你其实从未深爱过她，对吗，夫人？”",
      "【共感 - 難易度 10】「彼女を愛してなどいなかったのだろう、マダム？」",
      "[공감 - 보통 10] \"부인은 그녀를 사랑하지 않았군요, 그렇지 않습니까?\"",
      "[EMPATÍA - Medio 10] \"No la amaba, ¿verdad, Madame?\"",
      "[EMPATHIE - Moyen 10] \"Vous ne l'aimiez pas, n'est-ce pas, Madame ?\"",
      "[EMPATHIE - Mittel 10] \"Sie haben sie nie geliebt, nicht wahr, Madame?\"",
      "[ЭМПАТИЯ - Сложность 10] «Вы ведь никогда не любили ее, мадам?»",
      "[EMPATIA - Medio 10] \"Non l'amava affatto, vero, Madame?\"",
      "[EMPATIA - Médio 10] \"Você não a amava, não é, Madame?\"",
      "[التعاطف - متوسط 10] \"لم تكوني تحبينها على الإطلاق، أليس كذلك يا سيدتي؟\""
    )
  },
  {
    id: 'madame_opt_confession_red',
    ...tr(
      "[RED CHECK] [AUTHORITY - Challenging 13] \"Enough theatrics, Vivienne. We found the poisoned chess queen and the torn velvet from your coat on the balcony. You murdered her.\"",
      "[UJI MERAH] [OTORITAS - Sulit 13] \"Cukup sandiwaranya, Vivienne. Kami menemukan bidak ratu catur beracun dan sobekan beludru dari mantelmu di balkon. Kamulah yang membunuhnya.\"",
      "【红色检定】【威信 - 困难 13】“够了，收起你的拙劣演戏吧，薇薇安。我们在露台搜出了涂毒的黑王后棋子和从你大衣上撕裂的丝绒碎布。是你亲手谋杀了她！”",
      "【レッドチェック】【威信 - 難度 13】「茶番劇は終わりだ、ヴィヴィアン。毒入りのクイーンの駒も、バルコニーで見つかったお前のコートのビロードも揃っている。お前が彼女を殺したんだ。」",
      "[레드 체크] [권위 - 어려움 13] \"연극은 그만두시오, 비비안. 독이 묻은 체스 퀸과 발코니에서 뜯겨나간 외투의 벨벳 조각을 찾아냈소. 당신이 그녀를 살해했소.\"",
      "[CHEQUEO ROJO] [AUTORIDAD - Desafiante 13] \"Basta de teatro, Vivienne. Hallamos la reina envenenada y el terciopelo desgarrado de su abrigo. Usted la asesinó.\"",
      "[TEST ROUGE] [AUTORITÉ - Difficile 13] \"Assez de comédie, Vivienne. Nous avons retrouvé la reine empoisonnée et le velours de votre manteau. Vous l'avez tuée.\"",
      "[ROTER CHECK] [AUTORITÄT - Schwer 13] \"Genug des Theaters, Vivienne. Wir haben die vergiftete Schachkönigin und den Samt Ihres Mantels gefunden. Sie haben sie ermordet.\"",
      "[КРАСНАЯ ПРОВЕРКА] [АВТОРИТЕТ - Сложность 13] «Хватит спектаклей, Вивьен. Мы нашли отравленного ферзя и лоскут бархата от вашего пальто. Вы ее убили.»",
      "[TEST ROSSO] [AUTORITÀ - Impegnativo 13] \"Basta teatrini, Vivienne. Abbiamo trovato la regina avvelenata e il velluto strappato del suo cappotto. È stata lei.\"",
      "[TESTE VERMELHO] [AUTORIDADE - Desafiador 13] \"Chega de teatro, Vivienne. Encontramos a rainha envenenada e o veludo rasgado do seu casaco. Você a matou.\"",
      "[فحص أحمر] [السلطة - صعب 13] \"كفى تمثيلاً يا فيفيان؛ وجدنا ملكة الشطرنج المسمومة وقطعة المخمل الممزقة من معطفك على الشرفة. أنتِ من قتلها.\""
    )
  },
  {
    id: 'madame_opt_rash_accusation',
    ...tr(
      "[RASH ACCUSATION - Dangerous] \"I don't need evidence, Vivienne! You killed Aurelia and I am arresting you right now!\"",
      "[TUDUHAN GEGABAH - Berbahaya] \"Aku tidak butuh bukti, Vivienne! Kamu yang membunuh Aurelia dan aku menangkapmu sekarang juga!\"",
      "【鲁莽指控 - 极度危险】“我根本不需要证据，薇薇安！就是你杀了奥蕾莉亚，我现在就要逮捕你！”",
      "【無謀な告発 - 危険】「証拠など要らん！お前がオレリアを殺したんだ、今すぐ逮捕してやる！」",
      "[성급한 고발 - 위험] \"증거 따윈 필요 없소, 비비안! 당신이 오렐리아를 죽였고 당장 체포하겠소!\"",
      "[ACUSACIÓN TEMERARIA - Peligroso] \"¡No necesito pruebas, Vivienne! ¡Usted la mató y queda arrestada!\"",
      "[ACCUSATION TÉMÉRAIRE - Dangereux] \"Je n'ai pas besoin de preuves, Vivienne ! Vous l'avez tuée et je vous arrête !\"",
      "[ÜBEREILTE BESCHULDIGUNG - Gefährlich] \"Ich brauche keine Beweise, Vivienne! Sie werden auf der Stelle verhaftet!\"",
      "[ОПРОМЕТЧИВОЕ ОБВИНЕНИЕ - Опасно] «Мне не нужны улики, Вивьен! Вы убили ее, и я арестую вас прямо сейчас!»",
      "[ACCUSA AZZARDATA - Pericoloso] \"Non ho bisogno di prove, Vivienne! Lei l'ha uccisa e la arresto subito!\"",
      "[ACUSAÇÃO PRECIPITADA - Perigoso] \"Não preciso de provas, Vivienne! Você a matou e está presa agora mesmo!\"",
      "[اتهام متهور - خطير] \"لست بحاجة لأدلة يا فيفيان! أنتِ من قتلت أوريليا وأنا أعتقلك فورًا!\""
    )
  },
  {
    id: 'madame_opt_stepaway',
    ...tr(
      "[Step away]",
      "[Mundur]",
      "【转身离开】",
      "【立ち去る】",
      "[물러선다]",
      "[Apartarse]",
      "[S'éloigner]",
      "[Wegtreten]",
      "[Отойти]",
      "[Allontanati]",
      "[Afastar-se]",
      "[الابتعاد]"
    )
  }
];

// 13. madame_confession_win
D['madame_confession_win'].voices = [
  voice_item(V_RATIO, B_RATIO, tr(
    "EPIPHANY. The puzzle is solved. Vance was not a mere victim; she was the orchestrator of her own mechanical suicide pact. She used her partner's vengeance as the final gear in her escapement.",
    "PENCERAHAN LOGIKA. Teka-teki ini terpecahkan. Vance bukan sekadar korban pasif; dia adalah perancang konspirasi mekanis kematiannya sendiri. Dia memanfaatkan dendam pasangannya sebagai roda gigi terakhir dalam mekanisme escapement-nya.",
    "灵光顿悟！迷局彻底破晓。奥蕾莉亚·梵斯绝非单纯的受害者；她是这场精密机械自戕契约的总导演！她将同伴的复仇执念化作了自己这具致命擒纵钟摆上的最后一枚咬合齿轮！",
    "啓示！謎はすべて解かれた。ヴァンスは単なる被害者ではなかった。自らの機械的死の契約を仕組んだ演出家だったのだ。パートナーの復讐心を、自身の脱進機の最終ギアとして利用したのだ。",
    "경이로운 직관. 수수께끼가 마침내 풀렸습니다. 밴스는 단순한 피해자가 아니었습니다. 자신의 죽음을 설계한 기계적 공모자였습니다. 파트너의 복수심을 자신의 탈진기 마지막 톱니바퀴로 이용한 것입니다.",
    "EPIFANÍA. El enigma está resuelto. Vance orquestó su propio pacto de suicidio mecánico, usando la venganza como el último engranaje.",
    "ÉPIPHANIE. L'énigme est résolue. Vance était l'architecte de son propre pacte suicidaire, utilisant la vengeance comme ultime rouage.",
    "EPIPHANIE. Das Rätsel ist gelöst. Vance orchestrierte ihren eigenen mechanischen Suizid und nutzte Rache als letztes Rädchen im Getriebe.",
    "ОЗАРЕНИЕ. Головоломка решена. Вэнс спланировала собственную гибель, использовав чужую месть как последнюю шестерню в механизме.",
    "EPIFANIA. Il puzzle è risolto. Vance ha orchestrato il proprio patto suicida meccanico, usando la vendetta come ingranaggio finale.",
    "EPIFANIA. O enigma está resolvido. Vance orquestrou o próprio pacto de suicídio mecânico, usando a vingança como a engrenagem final.",
    "إشراق ذهني واستنارة! حُل اللغز بالكامل؛ لم تكن فانس مجرد ضحية، بل نسجت خطة انتحار ميكانيكية استغلت فيها رغبة شريكتها بالانتقام كترس أخير."
  )),
  voice_item(V_ELYSIA, B_ELYSIA, tr(
    "The case is cracked. The rain outside sounds quieter now, like a theater curtain slowly falling over the stage.",
    "Kasus ini telah terpecahkan. Deru hujan di luar kini terdengar lebih tenang, bagai tirai teater yang perlahan turun menutup panggung pertunjukan.",
    "悬案告破。窗外的暴雨声在此刻悄然轻柔下来，宛如华丽大幕在一出漫长悲剧的舞台上缓缓垂落。",
    "事件は解決した。外の雨音は今や静まり返り、劇場の幕が舞台へと静かに降りていくかのようだ。",
    "사건이 해결되었습니다. 바깥의 빗소리가 이제는 한결 차분하게 들려옵니다. 무대 위로 천천히 내려앉는 극장의 장막처럼.",
    "Caso resuelto. La lluvia afuera suena más suave, como un telón que cae sobre el escenario.",
    "L'affaire est résolue. La pluie semble plus douce dehors, comme un rideau qui tombe sur la scène.",
    "Der Fall ist gelöst. Der Regen draußen klingt nun sanfter, wie ein Theatervorhang, der langsam fällt.",
    "Дело раскрыто. Шум дождя за окном стихает, словно занавес медленно опускается на сцену.",
    "Il caso è chiuso. La pioggia fuori sembra più sommessa, come un sipario che cala sul palcoscenico.",
    "Caso encerrado. A chuva lá fora soa mais branda, como uma cortina caindo lentamente sobre o palco.",
    "أُغلقت القضية وحُلت خيوطها، وبات صوت المطر في الخارج خافتًا كستار مسرحي يسدل بهدوء على خشبة العرض."
  ))
];

// 14. examine_gantry_lantern options
D['examine_gantry_lantern'].options = [
  {
    id: 'lantern_opt_back',
    ...tr(
      "[Step back down to the main floor]",
      "[Turun kembali ke lantai utama]",
      "【回到塔楼主楼层】",
      "【メインフロアへ戻る】",
      "[메인 층으로 내려간다]",
      "[Bajar al piso principal]",
      "[Redescendre à l'étage principal]",
      "[Zurück zum Hauptgeschoss]",
      "[Спуститься на основной этаж]",
      "[Torna al piano principale]",
      "[Descer ao piso principal]",
      "[النزول إلى الطابق الرئيسي]"
    )
  }
];

// 15. examine_chime_bell options
D['examine_chime_bell'].options = [
  {
    id: 'chime_opt_back',
    ...tr(
      "[Step down from the bell housing]",
      "[Turun dari kubah lonceng]",
      "【从钟顶支架上走下来】",
      "【鐘楼から降りる】",
      "[종탑 하부로 내려간다]",
      "[Bajar del campanario]",
      "[Descendre de la cloche]",
      "[Vom Glockengehäuse herabsteigen]",
      "[Спуститься из-под колокола]",
      "[Scendi dalla cella campanaria]",
      "[Descer da torre do sino]",
      "[النزول من حجرة الجرس]"
    )
  }
];

// Generate output
const newContent = `// Aenigma Complete 12-Language Story & Clue Localizations
// Fully covers all 38 Dialogue Nodes, 13 Case Clues, and Crime Scene POIs
// Supported Languages: en, id, zh, ja, ko, es, fr, de, ru, it, pt, ar

export const DIALOGUE_I18N_FULL = ${JSON.stringify(D, null, 2)};

export const CLUES_I18N_FULL = ${JSON.stringify(mod.CLUES_I18N_FULL, null, 2)};

export const NEW_POIS_I18N = ${JSON.stringify(mod.NEW_POIS_I18N, null, 2)};
`;

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Successfully patched src/dialogue_i18n.js!');
