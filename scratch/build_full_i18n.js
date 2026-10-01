// Complete 12-Language Dialogue & Clue Localization Generator
const fs = require('fs');
const path = require('path');

// Helper to make 12-language object easily
function tr(en, id, zh, ja, ko, es, fr, de, ru, it, pt, ar) {
  return { en, id, zh, ja, ko, es, fr, de, ru, it, pt, ar };
}

const NODES = {};

// 1. graves_dialogue_start
NODES.graves_dialogue_start = {
  speaker: tr(
    'Inspector Graves', 'Inspektur Graves', '格雷夫斯警探', 'グレイヴス警部',
    '그레이브스 형사', 'Inspector Graves', 'Inspecteur Graves', 'Inspektor Graves',
    'Инспектор Грейвс', 'Ispettore Graves', 'Inspetor Graves', 'المفتش غريفز'
  ),
  text: tr(
    "You finally dragged yourself up six flights of stairs, Detective. You reek like you slept in an open sewer behind the Whirling Gull. Take a look at this mess. The city magistrate is already screaming on the wire.",
    "Kamu akhirnya berhasil menyeret dirimu menaiki enam lantai tangga, Detektif. Baumu seperti tidur di saluran pembuangan Whirling Gull. Lihat kekacauan ini. Hakim kota sudah berteriak histeris di telepon.",
    "你终于拖着沉重的步子爬上六层阶梯了，探长。你身上的恶臭简直就像在回旋鸥后巷的阴沟里宿醉了一夜。瞧瞧眼前的惨状，市政法官已经在警线那头咆哮了。",
    "ようやく6階分の階段を這い上がってきたか、刑事。ワーリング・ガル裏の側溝で寝ていたかのような酷い臭いだ。この惨状を見ろ。治安判事はすでに電話口で怒鳴り散らしているぞ。",
    "결국 6층 계단을 기어 올라오셨군, 형사님. 회전하는 갈매기 여관 뒷골목 하수구에서 밤을 지새운 것 같은 악취가 진동하오. 이 꼴을 좀 보시오. 시 치안판사가 벌써 전선 너머로 고래고래 소리를 지르고 있소.",
    "Por fin te arrastraste seis tramos de escaleras, detective. Apestas como si hubieras dormido en una cloaca tras la Gaviota Giratoria. Mira este desastre. El magistrado ya está gritando por la línea.",
    "Vous avez enfin daigné gravir les six étages, Inspecteur. Vous empestez comme si vous aviez cuvé dans un égout derrière la Mouette Rieuse. Regardez ce carnage. Le magistrat hurle déjà au bout du fil.",
    "Sie haben sich endlich sechs Stockwerke hochgeschleppt, Detective. Sie stinken, als hätten Sie in der Gosse hinter der Taumelnden Möwe geschlafen. Sehen Sie sich das an. Der Magistrat tobt bereits am Fernsprecher.",
    "Наконец-то ты приволокся на шестой этаж, детектив. От тебя разит так, словно ты ночевал в сточной канаве за «Кружащейся чайкой». Взгляни на этот хаос. Магистрат уже разрывает телефонную линию криками.",
    "Ti sei finalmente trascinato su per sei rampe di scale, detective. Puzzi come se avessi dormito nelle fogne dietro il Gabbiano Volteggiante. Guarda che disastro. Il magistrato urla già all'apparecchio.",
    "Você finalmente se arrastou seis lances de escada, detetive. Você fede como se tivesse dormido num esgoto atrás do Gaivota Giratória. Olhe para este desastre. O magistrado já está berrando na linha.",
    "لقد سحبت نفسك أخيرًا عبر ستة طوابق من السلالم يا حضرة المحقق. تفوح منك رائحة وكأنك نمت في مجاري الحانة الخلفية. انظر إلى هذه الفوضى، قاضي المدينة يصرخ بهستيريا على الخط بالفعل."
  ),
  voices: [
    {
      voice: tr('Ratio', 'Rasio', '理性', '比率', '이성', 'Razón', 'Ratio', 'Ratio', 'Рацио', 'Ragione', 'Razão', 'العقلانية'),
      badge: tr('RATIO [Intellect]', 'RASIO [Intelek]', '理性 [智力]', '比率 [知性]', '이성 [지성]', 'RAZÓN [Intelecto]', 'RATIO [Intellect]', 'RATIO [Intellekt]', 'РАЦИО [Интеллект]', 'RAGIONE [Intelletto]', 'RAZÃO [Intelecto]', 'العقلانية [الفكر]'),
      text: tr(
        "Look at his collar. There's dried tobacco ash on his lapel, but his eyes are darting toward the widow. He's nervous. He wants this closed as an accident before dawn.",
        "Perhatikan kerah bajunya. Ada abu tembakau kering di lapelnya, tapi matanya terus melirik ke arah sang janda. Dia gelisah. Dia ingin kasus ini ditutup sebagai kecelakaan sebelum fajar.",
        "看他的领口。驳领上沾着风干的烟灰，但他的眼神却频频瞥向那位遗孀。他在心虚。他迫不及待想在黎明前将此案草草定性为意外事故。",
        "彼の襟元を見ろ。乾いた煙草の灰が付着しているが、その視線は未亡人へと泳いでいる。動揺しているのだ。夜明け前に事故として処理したがっている。",
        "깃을 보십시오. 옷깃에 마른 담뱃재가 묻어 있지만, 그의 눈은 미망인을 향해 바쁘게 흔들립니다. 초조한 겁니다. 동이 트기 전에 단순 사고로 종결짓고 싶어 합니다.",
        "Mira su cuello. Hay ceniza de tabaco en su solapa, pero sus ojos se desvían hacia la viuda. Está nervioso. Quiere cerrar esto como un accidente antes del amanecer.",
        "Regardez son col. Des cendres froides sur son revers, mais ses yeux fuient vers la veuve. Il est fébrile. Il veut clore l'affaire en accident avant l'aube.",
        "Sehen Sie sich seinen Kragen an. Asche auf dem Revers, doch sein Blick huscht zur Witwe. Er ist nervös. Er will den Fall vor Sonnenaufgang als Unfall abstempeln.",
        "Посмотри на его воротник. На лацкане осыпался пепел, но его глаза то и дело косятся на вдову. Он нервничает. Хочет закрыть дело как несчастный случай до рассвета.",
        "Guarda il suo colletto. C'è cenere secca sul risvolto, ma i suoi occhi saettano verso la vedova. È nervoso. Vuole archiviare tutto come incidente prima dell'alba.",
        "Olhe para o colarinho dele. Há cinzas secas na lapela, mas os olhos dele disparam em direção à viúva. Ele está nervoso. Quer encerrar isso como acidente antes da aurora.",
        "انظر إلى ياقته. هناك رماد تبغ جاف على صدر سترته، لكن عينيه ترمقان الأرملة في توتر. إنه قلق ويريد إغلاق القضية كحادث عرضي قبل بزوغ الفجر."
      )
    }
  ],
  options: [
    tr(
      '"What is your preliminary assessment, Graves?"',
      '"Bagaimana penilaian awalmu, Graves?"',
      '“格雷夫斯，你的初步现场判断是什么？”',
      '「グレイヴス、お前の予備的な見立てはどうなんだ？」',
      '"그레이브스, 자네의 예비 소견은 어떤가?"',
      '"¿Cuál es tu evaluación preliminar, Graves?"',
      '"Quelle est votre conclusion préliminaire, Graves ?"',
      '"Was ist Ihre vorläufige Einschätzung, Graves?"',
      '«Какова твоя предварительная оценка, Грейвс?»',
      '"Qual è la tua valutazione preliminare, Graves?"',
      '"Qual é a sua avaliação preliminar, Graves?"',
      '"ما هو تقييمك الأولي يا غريفز؟"'
    ),
    tr(
      '[RHETORIC - Medium 10] "You seem in an awful hurry to file this report, Graves. Who called you first?"',
      '[RETORIKA - Sedang 10] "Terburu-buru sekali kamu menutup laporan ini, Graves. Siapa yang menghubungimu duluan?"',
      '[修辞 - 难度10] “你似乎急不可耐地想结案归档啊，格雷夫斯。今晚到底是谁第一个给你通的信？”',
      '[修辞学 - 難易度10] 「ひどく急いで報告書をまとめようとしているな、グレイヴス。最初に呼んだのは誰だ？」',
      '[수사학 - 보통 10] "보고서를 서둘러 넘기려는 기색이 역력하군, 그레이브스. 누가 자넬 먼저 불렀지?"',
      '[RETÓRICA - Media 10] "Pareces tener demasiada prisa por cerrar este informe, Graves. ¿Quién te llamó primero?"',
      '[RHÉTORIQUE - Moyen 10] "Vous semblez bien pressé de classer ce dossier, Graves. Qui vous a contacté en premier ?"',
      '[RHETORIK - Mittel 10] "Sie haben es verdammt eilig mit dem Bericht, Graves. Wer hat Sie zuerst gerufen?"',
      '[РИТОРИКА - Сложность 10] «Ты подозрительно спешишь составить рапорт, Грейвс. Кто вызвал тебя первым?»',
      '[RETORICA - Medio 10] "Sembri avere una fretta dannata di chiudere il rapporto, Graves. Chi ti ha chiamato per primo?"',
      '[RETÓRICA - Média 10] "Você parece ter muita pressa para arquivar este relatório, Graves. Quem te chamou primeiro?"',
      '[البلاغة - متوسط 10] "تبدو في عجلة مريبة لتقييد هذا التقرير يا غريفز. من الذي اتصل بك أولاً؟"'
    ),
    tr(
      '"I need a cigarette before my synapses completely disconnect."',
      '"Aku butuh sebatang rokok sebelum sinapsis sarafku benar-benar putus."',
      '“在我脑神经彻底短路前，我需要来根烟提神。”',
      '「シナプスが完全に焼き切れる前に、煙草を一本くれ。」',
      '"신경 시냅스가 완전히 끊기기 전에 담배 한 대 피워야겠군."',
      '"Necesito un cigarrillo antes de que mis sinapsis se desconecten del todo."',
      '"J\'ai besoin d\'une cigarette avant que mes synapses ne lâchent prise."',
      '"Ich brauche eine Zigarette, bevor meine Synapsen vollends versagen."',
      '«Мне нужна сигарета, пока мои синапсы окончательно не отключились.»',
      '"Ho bisogno di una sigaretta prima che le mie sinapsi si scolleghino."',
      '"Preciso de um cigarro antes que minhas sinapses pifem de vez."',
      '"أحتاج إلى سيجارة قبل أن تنقطع نقاط تشابكي العصبي تمامًا."'
    ),
    tr(
      '[Leave dialogue]',
      '[Tinggalkan percakapan]',
      '[结束对话]',
      '[会話を終える]',
      '[대화를 종료한다]',
      '[Terminar conversación]',
      '[Mettre fin à l\'échange]',
      '[Gespräch beenden]',
      '[Закончить разговор]',
      '[Termina conversazione]',
      '[Encerrar conversa]',
      '[إنهاء الحوار]'
    )
  ]
};

// 2. graves_assessment
NODES.graves_assessment = {
  speaker: NODES.graves_dialogue_start.speaker,
  text: tr(
    "Old Aurelia was up here tinkering with the escapement at three in the morning. She slipped on machine grease, grabbed the pendulum to catch herself, and the counterweight drove through her ribs. Gruesome, but an industrial accident. Case closed, we go home and dry our boots.",
    "Aurelia tua sedang mengotak-atik roda escapement pukul tiga pagi. Dia terpeleset minyak pelumas mesin, meraih pendulum untuk menahan diri, dan beban penyeimbang menembus tulang rusuknya. Mengerikan, tapi murni kecelakaan kerja. Kasus ditutup, kita bisa pulang dan mengeringkan sepatu kita.",
    "老奥蕾莉亚凌晨三点在上头摆弄擒纵轮。她踩到机械机油滑倒，想抓住摆锤借力，结果配重块直接贯穿了肋骨。虽说惨绝人寰，但纯属工伤意外。结案收工，大家回去烤干湿皮靴。",
    "老オレリアは午前3時にここで脱進機をいじっていた。機械油に足を滑らせ、体勢を立て直そうと振り子を掴んだが、重いカウンターウェイトが肋骨を貫通した。陰惨だが、単なる労働災害だ。事件終了、長靴を乾かしに帰るぞ。",
    "늙은 오렐리아는 새벽 3시에 여기서 탈진기를 손보고 있었소. 기계 기름에 발이 미끄러져 몸을 지탱하려 진자를 붙잡았는데, 평형추가 갈비뼈를 그대로 꿰뚫어 버렸지. 끔찍하지만 명백한 산업재해 사고라오. 수사 종결짓고 마른 신발이나 갈아 신으러 갑시다.",
    "La vieja Aurelia estaba trasteando con el escape a las tres de la mañana. Resbaló con grasa de máquina, se agarró al péndulo y el contrapeso le atravesó las costillas. Espantoso, pero un accidente laboral. Caso cerrado, nos vamos a casa a secar las botas.",
    "La vieille Aurelia bricolait l'échappement à trois heures du matin. Elle a glissé sur de la graisse, s'est raccrochée au balancier, et le contrepoids lui a transpercé les côtes. Sinistre, mais un bête accident de travail. Affaire classée, on rentre sécher nos godasses.",
    "Die alte Aurelia werkelte um drei Uhr morgens an der Hemmung herum. Sie rutschte auf Maschinenfett aus, klammerte sich ans Pendel und das Gegengewicht bohrte sich durch ihre Rippen. Schrecklich, aber ein Betriebsunfall. Fall gelöst, wir gehen heim.",
    "Старуха Аурелия возилась здесь со спусковым механизмом в три часа ночи. Поскользнулась на машинном масле, схватилась за маятник, и противовес пробил ей грудь. Жутко, но это производственная травма. Дело закрыто, пора сушить сапоги.",
    "La vecchia Aurelia armeggiava con lo scappamento alle tre del mattino. È scivolata sull'olio, si è aggrappata al pendolo e il contrappeso le ha trafitto le costole. Macabro, ma un banale incidente sul lavoro. Caso chiuso, andiamo ad asciugarci gli stivali.",
    "A velha Aurelia estava mexendo no escape às três da manhã. Escorregou na graxa, agarrou o pêndulo e o contrapeso perfurou suas costelas. Hediondo, mas um acidente de trabalho. Caso encerrado, vamos para casa secar as botas.",
    "كانت العجوز أوريليا تعبث بترس الميزان في الثالثة فجرًا. انزلقت في شحم الماكينات وحاولت التشبث بالبندول فخرق ثقل الموازنة أضلاعها. حادث شنيع لكنه عرضي بحت. القضية أغلقت، فلنعد لنجفف أحذيتنا."
  ),
  voices: [
    {
      voice: tr('Carnal', 'Insting Karnal', '肉体本能', '肉体本能', '육체 본능', 'Instinto Carnal', 'Carnal', 'Körperinstinkt', 'Карнал', 'Istinto Carnale', 'Instinto Carnal', 'الغريزة الجسدية'),
      badge: tr('CARNAL [Physique]', 'KARNAL [Fisik]', '肉体本能 [体魄]', '肉体 [肉体]', '육체 [체력]', 'CARNAL [Físico]', 'CARNAL [Physique]', 'KARNAL [Physis]', 'КАРНАЛ [Физика]', 'CARNALE [Fisico]', 'CARNAL [Físico]', 'الجسدية [القوة]'),
      text: tr(
        "Lies. A woman who slips forward doesn't land impaled through the back of her shoulder blades with her hands neatly folded. Someone held her down while the heavy iron arm descended.",
        "Bohong. Seseorang yang terpeleset ke depan tidak akan tertusuk dari belakang belikat dengan tangan terlipat rapi. Seseorang menahannya saat lengan besi raksasa itu menghujam ke bawah.",
        "一派胡言。前倾滑倒的人绝不可能后背肩胛骨被重物洞穿，双手还整整齐齐地叠放在胸前。在重锤落下前，一定有人将她死死按在地上。",
        "嘘だ。前方に足を滑らせた人間が、両手を整然と揃えたまま肩甲骨の後ろから串刺しになるはずがない。何者かが彼女を押さえつけ、鉄の腕を振り下ろさせたのだ。",
        "거짓말입니다. 앞으로 넘어진 사람이 두 손을 단정히 모은 채 등 뒤 견갑골을 관통당할 수는 없습니다. 무거운 쇳덩이가 내려앉는 동안 누군가 그녀를 짓누르고 있었던 겁니다.",
        "Mentiras. Alguien que resbala hacia adelante no acaba empalada por la espalda con las manos ordenadamente dobladas. Alguien la inmovilizó mientras bajaba el brazo de hierro.",
        "Mensonges. Une personne qui glisse en avant ne finit pas empalée par les omoplates avec les mains bien jointes. Quelqu'un l'a maintenue pendant que le lourd balancier s'abattait.",
        "Lügen. Wer nach vorn stürzt, wird nicht von hinten durch die Schulterblätter aufgespießt, während die Hände gefaltet sind. Jemand hielt sie nieder, als der Eisenarm herabsank.",
        "Ложь. Человек, упавший вперед, не может оказаться пробитым через спину с аккуратно сложенными руками. Кто-то удерживал ее, пока опускался тяжелый стальной рычаг.",
        "Menzogne. Chi scivola in avanti non finisce trafitto dietro le scapole con le mani composte. Qualcuno l'ha tenuta ferma mentre il braccio d'acciaio scendeva.",
        "Mentiras. Alguém que escorrega para frente não acaba empalada pelas costas com as mãos dobradas. Alguém a segurou enquanto o pesado braço de ferro descia.",
        "هذا كذب صريح. من يسقط إلى الأمام لا يُطعن عبر عظام الكتف من الخلف بيدين مطويتين بعناية. شخص ما ثبّتها بإحكام أثناء هبوط الذراع الحديدي الثقيل."
      )
    }
  ],
  options: [
    tr(
      '"Accident? Look at the wound entry angle. That is biomechanically impossible."',
      '"Kecelakaan? Lihat sudut masuk lukanya. Secara biomekanik itu mustahil."',
      '“意外？看清楚创口刺入的倾角，这在生物力学上绝不可能。”',
      '「事故だと？創傷の進入角度を見ろ。生体力学的にあり得ない。」',
      '"사고라고? 상처의 진입 각도를 보시오. 생체역학적으로 불가능하오."',
      '"¿Accidente? Mira el ángulo de entrada. Es biomecánicamente imposible."',
      '"Un accident ? Regardez l\'angle d\'impact. C\'est biomécaniquement impossible."',
      '"Ein Unfall? Schauen Sie sich den Eintrittswinkel an. Das ist biomechanisch unmöglich."',
      '«Несчастный случай? Посмотри на угол раны. Это биомеханически невозможно.»',
      '"Incidente? Guarda l\'angolo di penetrazione. È biomeccanicamente impossibile."',
      '"Acidente? Olhe o ângulo de entrada da ferida. Isso é biomecanicamente impossível."',
      '"حادث؟ انظر لزاوية دخول الجرح، هذا مستحيل بيوميكانيكيًا."'
    ),
    tr(
      '"Who was the last person to see her alive?"',
      '"Siapa orang terakhir yang melihatnya hidup?"',
      '“今晚生前最后一个见到她的人是谁？”',
      '「彼女が生きていたのを最後に見たのは誰だ？」',
      '"그녀가 살아있을 때 마지막으로 본 사람은 누구요?"',
      '"¿Quién fue la última persona en verla con vida?"',
      '"Qui est la dernière personne à l\'avoir vue vivante ?"',
      '"Wer hat sie zuletzt lebend gesehen?"',
      '«Кто видел ее живой последним?»',
      '"Chi è stata l\'ultima persona a vederla viva?"',
      '"Quem foi a última pessoa a vê-la viva?"',
      '"من كان آخر شخص رآها على قيد الحياة؟"'
    ),
    tr(
      '[Return to main inquiry]',
      '[Kembali ke penyelidikan utama]',
      '[返回主线盘问]',
      '[主捜査へ戻る]',
      '[주요 심문으로 복귀]',
      '[Volver a la indagación]',
      '[Revenir à l\'interrogatoire]',
      '[Zurück zur Befragung]',
      '[Вернуться к опросу]',
      '[Torna all\'indagine]',
      '[Voltar à inquirição]',
      '[العودة للاستجواب]'
    )
  ]
};

// 3. graves_debate_wound
NODES.graves_debate_wound = {
  speaker: NODES.graves_dialogue_start.speaker,
  text: tr(
    "Graves scowls, waving his lantern over the corpse. 'Maybe she fell from the upper gantry! Look, Detective, until you show me a second set of footprints or a weapon with someone else\'s fingerprints, the Captain wants this stamped as accidental death.'",
    "Graves merengut sambil melambaikan lenteranya. 'Mungkin dia jatuh dari lantai atas! Dengar Detektif, sampai kamu bisa menunjukkan jejak kaki kedua atau senjata dengan sidik jari orang lain, Kapten ingin kasus ini dicap sebagai kecelakaan.'",
    "格雷夫斯皱起眉头，提起油灯在尸体上方晃了晃。“也许她是从顶层提灯过道摔下来的！听着探长，在你拿出第二双脚印或带有别人指纹的凶器之前，局长只想把这案子敲上意外结案印章！”",
    "グレイヴスは顔をしかめ、カンテラを遺体の上にかざした。「上層の通路から落ちたのかもしれんだろ！いいか刑事、第二の足跡か、誰かの指紋がついた凶器でも見せてくれない限り、警部は事故死の判を押したがっているんだ。」",
    "그레이브스가 얼굴을 찌푸리며 랜턴을 시신 위로 휘두릅니다. '상층 난간에서 떨어졌을 수도 있잖소! 이봐요 형사님, 제2의 발자국이나 다른 사람 지문이 묻은 흉기를 가져오지 않는 한, 서장님은 이걸 단순 사고사로 도장 찍길 원한다고요.'",
    "Graves frunce el ceño agitando su linterna. '¡Quizá cayó de la pasarela superior! Mira, detective, hasta que me enseñes un segundo par de huellas o un arma con huellas dactilares, el Capitán quiere esto archivado como accidente.'",
    "Graves se renfrogne en agitant sa lanterne. 'Elle est peut-être tombée de la passerelle ! Écoutez, Inspecteur, tant que vous ne me montrez pas une seconde paire d'empreintes ou une arme, le Capitaine veut classer ça en mort accidentelle.'",
    "Graves finstert die Leiche an. 'Vielleicht stürzte sie vom oberen Steg! Hören Sie, Detective: Solange Sie mir keine zweiten Fußspuren oder eine Tatwaffe zeigen, will der Captain diesen Fall als Unfall abhaken.'",
    "Грейвс хмурится, размахивая фонарем над телом. «Может, она упала с верхних мостков! Слушай, детектив, пока ты не покажешь вторые следы или оружие с чужими отпечатками, капитан требует закрыть дело как несчастный случай.»",
    "Graves si acciglia sventolando la lanterna sul cadavere. 'Forse è caduta dal ballatoio! Ascolta detective, finché non mi mostri altre orme o un'arma con impronte, il Capitano vuole archiviare tutto come incidente.'",
    "Graves franze a testa balançando a lanterna. 'Talvez ela tenha caído da passarela superior! Ouça, detetive: até que você me mostre pegadas diferentes ou uma arma com digitais, o Capitão quer isso arquivado como acidente.'",
    "يقطب غريفز حاجبيه ملوحًا بفانوسه: 'ربما سقطت من الممشى العلوي! اسمع يا محقق، حتى تريني أثر أقدام ثانٍ أو سلاحًا عليه بصمات شخص آخر، القائد يريد ختم هذه القضية كموت عرضي.'"
  ),
  options: [
    tr(
      '"I will find the evidence. Just stay out of my way."',
      '"Aku akan menemukan buktinya. Menyingkirlah dari jalanku."',
      '“我会找到证据的。你别挡我的路就好。”',
      '「証拠は見つけ出す。邪魔をするな。」',
      '"증거는 내가 찾아내겠소. 내 앞길이나 막지 마시오."',
      '"Encontraré las pruebas. No te metas en mi camino."',
      '"Je trouverai les preuves. Ne vous mettez pas en travers de ma route."',
      '"Ich werde die Beweise finden. Stehen Sie mir nicht im Weg."',
      '«Я найду улики. Просто не стой у меня на пути.»',
      '"Troverò le prove. Non intralciarmi."',
      '"Eu vou encontrar as provas. Apenas saia do meu caminho."',
      '"سأعثر على الأدلة، فقط ابتعد عن طريقي."'
    )
  ]
};

// 4. graves_last_seen
NODES.graves_last_seen = {
  speaker: NODES.graves_dialogue_start.speaker,
  text: tr(
    "'The widow. Madame Vivienne. She claims she brought him peppermint tea at midnight, then went down to the parish rectory for all-night vigil prayers. Convenient alibi, if you ask me.'",
    "'Sang janda. Nyonya Vivienne. Dia mengklaim mengantarkan teh pepermint tengah malam, lalu turun ke gereja untuk doa malam. Alibi yang sangat nyaman, menurutku.'",
    "“是遗孀薇薇安夫人。她声称午夜时分给奥蕾莉亚送过热薄荷茶，随后就下楼去教区小堂做通宵守夜祈祷了。依我看，这不在场证明未免太‘完美’了些。”",
    "「未亡人のヴィヴィアン夫人だ。真夜中にペパーミントティーを届け、その後は小教区の礼拝堂で徹夜の祈祷に行っていたと主張している。都合の良いアリバイだな。」",
    "'미망인 비비안 부인이오. 자정에 박하차를 가져다주고는 밤샘 기도를 드리러 교구 사제관으로 내려갔다고 주장하더군. 지나치게 편리한 알리바이 아니오?'",
    "'La viuda. Madame Vivienne. Afirma que le trajo té de menta a medianoche y bajó a la rectoría a rezar toda la noche. Una coartada muy oportuna, si me preguntas.'",
    "'La veuve. Madame Vivienne. Elle prétend lui avoir apporté un thé à la menthe à minuit avant de descendre à la cure pour veiller en prière. Un alibi bien commode à mon avis.'",
    "'Die Witwe. Madame Vivienne. Sie behauptet, um Mitternacht Pfefferminztee gebracht zu haben und dann zur Nachtwache ins Pfarramt gegangen zu sein. Ein bequemes Alibi.'",
    "«Вдова. Мадам Вивьен. Утверждает, что принесла ей мятный чай в полночь, а затем спустилась в приход на всенощную молитву. Удобное алиби, если спросишь меня.»",
    "'La vedova. Madame Vivienne. Sostiene di averle portato un tè alla menta a mezzanotte, per poi scendere alla parrocchia a pregare. Un alibi fin troppo comodo.'",
    "'A viúva. Madame Vivienne. Ela alega que trouxe chá de hortelã à meia-noite e desceu para a vigília na reitoria da paróquia. Um álibi muito conveniente se quer saber.'",
    "'الأرملة السيدة فيفيان. تدعي أنها جلبت لها شاي النعناع عند منتصف الليل ثم نزلت لمقر الكنيسة للصلاة طوال الليل. حجة غياب مريحة للغاية إن سألتني.'"
  ),
  options: [
    tr(
      '"I should interrogate Madame Vance directly."',
      '"Aku harus menginterogasi Nyonya Vance secara langsung."',
      '“我必须亲自当面盘问梵斯夫人。”',
      '「ヴァンス夫人に直接尋问する必要があるな。」',
      '"밴스 부인을 직접 대면 심문해야겠군."',
      '"Debo interrogar a Madame Vance directamente."',
      '"Je dois interroger Madame Vance en personne."',
      '"Ich sollte Madame Vance direkt befragen."',
      '«Мне следует допросить мадам Вэнс лично.»',
      '"Devo interrogare Madame Vance direttamente."',
      '"Devo interrogar Madame Vance pessoalmente."',
      '"يجب أن أستجوب السيدة فانس مباشرة وبنفسي."'
    )
  ]
};

// 5. graves_ledger_hunt
NODES.graves_ledger_hunt = {
  speaker: NODES.graves_dialogue_start.speaker,
  text: tr(
    "'If I knew where it was, I wouldn't be freezing my kidneys off in this tower! Vance had a hidden floorboard safe somewhere beneath the secondary escapement. But the lock is an alchemical three-tumbler dial.'",
    "'Kalau aku tahu tempatnya, aku tidak akan kedinginan sampai beku di menara ini! Vance punya brankas lantai tersembunyi di bawah roda escapement kedua. Tapi kuncinya adalah dial alkimia tiga putaran.'",
    "“我要是知道在哪儿，还用在这鬼钟楼里冻得肾疼吗！梵斯在次级擒纵机构下方的地板里藏了一口暗格金库。但门锁是极为难缠的三位炼金转盘。”",
    "「場所を知ってたら、こんな塔の中で凍えてるわけないだろ！ヴァンスは第2脱進機の下のどこかに隠し金庫を持っていた。だが錠前は3連の錬金術ダイヤル式だ。」",
    "'장소를 알았다면 내가 이 탑에서 꽁꽁 얼어붙고 있었겠소! 밴스는 보조 탈진기 아래 바닥 어딘가에 비밀 금고를 숨겨뒀소. 하지만 자물쇠가 골치 아픈 3중 연금술 다이얼이오.'",
    "'¡Si supiera dónde está no me estaría congelando en esta torre! Vance tenía una caja fuerte bajo el suelo, cerca del escape secundario. Pero tiene un dial alquímico de tres combinaciones.'",
    "'Si je savais où il est, je ne me gèlerais pas les os dans cette tour ! Vance avait un coffre secret sous le plancher. Mais c'est un cadran alchimique à trois chiffres.'",
    "'Wüsste ich das, würde ich mir hier nicht den Hintern abfrieren! Vance hatte einen Bodensafe unter der Hilfshemmung. Aber das Schloss ist ein alchemistisches Dreirad.'",
    "'Знал бы я где он — не морозил бы здесь почки! У Вэнс был тайник под половицами у запасного спуска. Но там трехдисковый алхимический кодовый замок.'",
    "'Se sapessi dov'è, non mi congelerei in questa torre! La Vance aveva una cassaforte nel pavimento sotto lo scappamento. Ma è chiusa da una combinazione alchemica a tre ghiere.'",
    "'Se eu soubesse onde está, não estaria congelando aqui! Vance tinha um cofre oculto sob o assoalho. Mas o segredo é um disco alquímico de três combinações.'",
    "'لو كنت أعلم مكانه لما كنت أتجمد من البرد في هذا البرج! كان لدى فانس خزنة سرية تحت الأرضية قرب الترس الثانوي، لكن قفلها خيميائي معقد ذو قرص ثلاثي.'"
  ),
  options: [
    tr(
      '"I will inspect the floorboards and find the combination."',
      '"Aku akan memeriksa papan lantai dan menemukan kombinasinya."',
      '“我去搜查地板暗格，设法找出密码。”',
      '「床板を調べて暗証番号を見つけ出す。」',
      '"바닥 판자를 조사하여 암호를 찾아내겠소."',
      '"Inspeccionaré el suelo y encontraré la combinación."',
      '"Je vais fouiller le plancher et trouver le code."',
      '"Ich werde den Boden untersuchen und den Code finden."',
      '«Я осмотрю половицы и найду шифр.»',
      '"Ispezionerò il pavimento e troverò il codice."',
      '"Vou inspecionar o assoalho e encontrar o código."',
      '"سأفحص ألواح الأرضية وأعثر على شفرة الفتح."'
    )
  ]
};

// 6. examine_balcony_start
NODES.examine_balcony_start = {
  speaker: tr(
    'The Rain Vista Balcony', 'Balkon Hujan Menara Jam', '风雨巨钟露台', '雨の大時計バルコニー',
    '빗속의 대시계 발코니', 'El Balcón de la Lluvia', 'Le Balcon sous la Pluie', 'Der Regen-Balkon',
    'Дождливый балкон башни', 'Il Balcone della Pioggia', 'A Sacada da Chuva', 'شرفة المطر المطلة'
  ),
  text: tr(
    "High above District 7, freezing rain lashes against the monumental stained-glass clock face. The cold wind howls through the gargoyles. On the iron balustrade, something dark and sodden flutters in the gale.",
    "Jauh di atas Distrik 7, hujan dingin mencambuk kaca patri raksasa menara jam. Angin dingin melolong menembus patung gargoyle. Di pagar besi pembatas, sesuatu yang gelap dan basah berkibar diterpa badai.",
    "在第七区千家万户的幽暗屋顶之上，刺骨的寒雨凶猛拍打着大钟巨大的彩色琉璃钟面。寒风在滴水兽雕像间发出凄厉号叫。在生锈的铁栏杆上，一抹深色的潮湿织物在狂风中剧烈飘动。",
    "第7区の遥か高空、氷雨が巨大なステンドグラスの時計盤を激しく叩きつけている。冷たい突風がガーゴイルの間で唸る。鉄の欄干に、雨に濡れた黒い布切れが風にバタバタと靡いていた。",
    "제7구역의 까마득한 상공, 얼어붙을 듯한 빗줄기가 대형 스테인드글라스 시계판을 때립니다. 가고일 석상 사이로 찬 바람이 울부짖습니다. 난간에 비에 젖은 짙은 색 천 조각 하나가 바람에 펄럭이고 있습니다.",
    "Sobre el Distrito 7, la lluvia azota la vidriera del reloj monumental. El viento aúlla entre las gárgolas. En la barandilla de hierro, algo oscuro y empapado ondea con el vendaval.",
    "Dominant le District 7, une pluie glaciale cingle le cadran de verre monumental. Le vent hurle à travers les gargouilles. Sur la balustrade, un lambeau de tissu sombre claque au vent.",
    "Hoch über Bezirk 7 peitscht Eisregen gegen das Buntglas der Riesenuhr. Der Wind heult durch die Wasserspeier. Am Eisengeländer flattert etwas Dunkles, Durchnässtes im Sturm.",
    "Высоко над 7-м районом ледяной дождь хлещет в витражный циферблат башни. Ветер воет сквозь гаргулий. На железных перилах треплется намокший темный лоскут ткани.",
    "Sopra il Distretto 7, la pioggia sferza l'enorme quadrante di vetro. Il vento ulula tra i gargoyle. Sulla ringhiera di ferro, un lembo scuro e fradicio sventola nella bufera.",
    "No alto do Distrito 7, a chuva gélida chicoteia o relógio monumental de vitral. O vento uiva nas gárgulas. Na balaustrada de ferro, um tecido escuro encharcado tremula no vendaval.",
    "عاليًا فوق المنطقة 7، يجلد المطر المتجمد زجاج ساعة البرج الضخمة. تعوي الرياح عبر المزاريب الحجرية، وعلى السياج الحديدي ترفرف قطعة قماش داكنة مبللة مع العاصفة."
  ),
  options: [
    tr(
      '[PERCEPTION - Challenging 11] Inspect the balustrade for snagged fibers and dropped evidence.',
      '[PERSEPSI - Sulit 11] Periksa pagar besi untuk mencari serat kain dan bukti yang terjatuh.',
      '[感知 - 困难11] 仔细搜查栏杆尖刺处钩住的织物纤维与掉落的证物。',
      '[知覚 - 難度11] 欄干に引っかかった繊維と、足元に落ちた遺留品を捜索する。',
      '[지각 - 난이도 11] 난간에 걸린 섬유 조각과 바닥에 떨어진 증거물을 정밀 수색한다.',
      '[PERCEPCIÓN - 11] Inspeccionar la barandilla en busca de fibras y pruebas caídas.',
      '[PERCEPTION - 11] Inspecter la balustrade à la recherche de fibres et d\'indices.',
      '[WAHRNEHMUNG - 11] Das Geländer nach Fasern und Spuren absuchen.',
      '[ВОСПРИЯТИЕ - 11] Осмотреть перила в поисках волокон ткани и оброненных улик.',
      '[PERCEZIONE - 11] Ispeziona la ringhiera in cerca di fibre tessili e indizi.',
      '[PERCEPÇÃO - 11] Inspecionar a balaustrada em busca de fibras e provas caídas.',
      '[الإدراك - صعب 11] فحص السياج الحديدي بحثًا عن ألياف القماش العالقة وأي أدلة ساقطة.'
    ),
    tr(
      '[Step back inside the dry chamber]',
      '[Kembali ke dalam ruangan kering]',
      '[退回钟楼干燥室内]',
      '[乾いた時計室へ戻る]',
      '[비바람을 피해 실내로 물러난다]',
      '[Regresar al interior seco]',
      '[Rentrer à l\'abri]',
      '[Zurück in die Kammer treten]',
      '[Вернуться в сухое помещение]',
      '[Rientra all\'interno]',
      '[Voltar para o abrigo]',
      '[العودة لداخل الغرفة الجافة]'
    )
  ]
};

// 7. balcony_search_win
NODES.balcony_search_win = {
  speaker: tr(
    'Balcony Forensic Recovery', 'Temuan Forensik Balkon', '露台关键物证回收', 'バルコニーの決定的証拠',
    '발코니 법의학적 증거 수습', 'Hallazgo en el Balcón', 'Découverte sur le Balcon', 'Balkon-Fund',
    'Улика на балконе', 'Ritrovamento sul Balcone', 'Recuperação na Sacada', 'استخراج الأدلة من الشرفة'
  ),
  text: tr(
    "You untangle the fabric snagged on an ornamental iron rivet: it is heavy midnight-blue Lyon velvet, torn freshly along the hem. Beside it on the wet flagstones lies an empty glass ampoule with a rubber stopper—stamped with the monogram 'V.V.' and smelling of crushed bitter almonds.",
    "Kamu melepaskan sobekan kain yang tersangkut di paku keling besi: beludru biru tua Lyon yang robek baru saja. Di sebelahnya di lantai batu yang basah tergeletak ampul kaca kosong dengan tutup karet—berstempel monogram 'V.V.' dan berbau seperti minyak almond pahit.",
    "你小心翼翼地取下钩在铸铁铆钉上的织物残片：这是一块名贵的里昂深海蓝丝绒，边缘是刚刚撕扯断裂的新鲜毛边。而在潮湿积水的石板缝隙里，赫然躺着一支空的橡胶塞玻璃安瓿——上面清晰印有‘V.V.’的花体姓名缩写，散发着刺鼻的苦杏仁青酸剧毒气味！",
    "鉄のリベットに引っかかっていた布片を解き外した。上質なリヨン産ミッドナイトブルーのビロードで、裾から新しく引き裂かれたものだ。足元の濡れた敷石には、ゴム栓のついた空のガラスアンプルが転がっていた。『V.V.』の頭文字が刻印され、青酸特有の苦いアーモンド臭が漂う。",
    "주철 리벳에 걸려 있던 천 조각을 떼어냅니다. 고급스러운 암청색 벨벳으로, 최근에 찢겨 나간 흔적이 역력합니다. 젖은 돌바닥 틈새에는 고무마개가 달린 빈 유리 앰플이 떨어져 있었습니다. 'V.V.'라는 모노그램 인장이 찍혀 있고, 씁쓸한 아몬드 향이 코를 찌릅니다.",
    "Desenganchas la tela del remache de hierro: es terciopelo azul noche de Lyon, recién rasgado. A su lado yace una ampolla de vidrio vacía con tapón de goma, grabada con las iniciales 'V.V.' y olor a almendras amargas.",
    "Vous détachez le tissu pris dans un rivet : un velours bleu nuit de Lyon, fraîchement déchiré. À ses côtés gît une fiole de verre vide estampillée 'V.V.' exhalant une odeur d'amande amère.",
    "Sie lösen den Stoff vom Eisenniet: mitternachtsblauer Lyoner Samt, frisch gerissen. Daneben liegt eine leere Glasampulle mit Gummistopfen – graviert mit 'V.V.' und bitterem Mandelgeruch.",
    "Ты снимаешь ткань с заклепки: это плотный бархат цвета ночи, свежеоторванный по подолу. Рядом на мокром камне лежит пустая ампула с резиновой пробкой и инициалами «V.V.», пахнущая горьким миндалем.",
    "Stacchi il tessuto incastrato nel rivetto: è pesante velluto blu notte di Lione, strappato di recente. Accanto c'è una fiala vuota marchiata 'V.V.' dall'odore di mandorle amare.",
    "Você desprende o tecido preso no rebite: veludo azul-noite de Lyon, rasgado recentemente. Ao lado jaz uma ampola vazia com iniciais 'V.V.' e cheiro de amêndoas amargas.",
    "تفصل قطعة القماش العالقة بالسياج الحديدي: مخمل أزرق داكن ممزق حديثًا، وبجانبه على الحجارة المبتلة أمبول زجاجي فارغ يحمل نقش الحرفين 'V.V.' وتفوح منه رائحة لوز مر قوية."
  ),
  options: [
    tr(
      '"Vivienne Vance was on this balcony before the body was moved."',
      '"Vivienne Vance berada di balkon ini sebelum jenazah dipindahkan."',
      '“在尸体被挂上钟摆前，薇薇安·梵斯就在这个风雨露台上。”',
      '「遺体が動かされる直前、ヴィヴィアン・ヴァンスはこのバルコニーにいた。」',
      '"시신이 옮겨지기 전, 비비안 밴스는 분명 이 발코니에 있었소."',
      '"Vivienne Vance estuvo en este balcón antes de mover el cadáver."',
      '"Vivienne Vance était sur ce balcon avant le déplacement du corps."',
      '"Vivienne Vance war auf diesem Balkon, bevor die Leiche bewegt wurde."',
      '«Вивьен Вэнс была на этом балконе до того, как тело перенесли.»',
      '"Vivienne Vance era su questo balcone prima che il corpo venisse spostato."',
      '"Vivienne Vance esteve nesta sacada antes de o corpo ser movido."',
      '"كانت فيفيان فانس على هذه الشرفة قبل تحريك الجثة بالتأكيد."'
    )
  ]
};

// 8. examine_gantry_lantern (NEW WORLD BUILDING POI)
NODES.examine_gantry_lantern = {
  speaker: tr(
    'Upper Lantern Catwalk', 'Anjungan Lentera Atas', '顶层提灯铁梯走廊', '上層ランタン回廊',
    '상층 등불 통로', 'Pasarela de la Linterna', 'Passerelle de la Lanterne', 'Laternenlaufsteg',
    'Мостки у верхнего фонаря', 'Ballatoio della Lanterna', 'Passarela da Lanterna', 'ممشى الفانوس العلوي'
  ),
  text: tr(
    "High above the clockwork chassis, iron grates overlook the abyssal gear train. Hanging from an arch is a heavy brass gaslamp. The floor grates are spattered with spilled alchemical reagents that have eaten into the bronze patina.",
    "Jauh di atas sasis mesin jam, kisi-kisi besi menghadap ke jurang roda gigi raksasa. Tergantung dari lengkungan sebuah lentera gas kuningan berat. Lantai berjeruji terciprat reagen kimia yang telah mengikis patina perunggu.",
    "高悬于巨大钟表底座之上的钢铁镂空格栅，俯瞰着下方轰鸣的齿轮深渊。拱门下悬挂着一盏厚重的黄铜煤气提灯。铸铁地板格栅上溅满了剧毒的化学试剂，强腐蚀性已将青铜包浆蚀咬得坑坑洼洼。",
    "時計仕掛けの基台の上空、鉄格子が歯車の深淵を見下ろしている。アーチから重厚な真鍮ガス灯が吊るされていた。足元の格子床には、青銅の緑青を激しく腐食させた化学試薬の飛沫痕が散っていた。",
    "거대한 시계 프레임 상공의 격자 철판 아래로 톱니바퀴 심연이 내려다보입니다. 아치에 묵직한 황동 가스등이 걸려 있습니다. 바닥 철망에는 청동 부식을 일으킨 화학 시약의 튄 자국이 선명합니다.",
    "Sobre el chasis de engranajes, las rejillas de hierro dominan el abismo. Cuelga una lámpara de gas de latón. El suelo está salpicado de reactivos químicos que han carcomido la pátina de bronce.",
    "Au-dessus des rouages, les caillebotis dominent le vide béant. Une lourde lanterne à gaz est suspendue à l'arche. Le sol est maculé de réactifs chimiques corrosifs qui ont rongé le bronze.",
    "Über dem Uhrwerkchassis blicken Gitter in den Zahnradabgrund. Eine Messinggaslampe hängt am Bogen. Der Gitterboden ist mit verätzenden Reagenzien bespritzt.",
    "Высоко над часовой рамой железные решетки нависают над шестеренчатой бездной. На арке висит медный газовый фонарь. На полу видны брызги едких химикатов, проевшие бронзу.",
    "Sopra il telaio degli ingranaggi, le grate di ferro affacciano sul vuoto. Una pesante lampada a gas pende dall'arco. Il pavimento è macchiato di reagenti chimici corrosivi.",
    "No alto do chassi do relógio, grades de ferro dominam o abismo. Uma lanterna de latão pende do arco. O piso tem respingos de reagentes que corroeram a pátina de bronze.",
    "عاليًا فوق هيكل الماكينات، تطل الشباك الحديدية على هاوية التروس. يتدلى فانوس غازي نحاسي، وأرضية الشباك ملطخة برذاذ كواشف كيميائية كاوية نخرت البرونز."
  ),
  options: [
    tr(
      '[CHEMISTRY / LOGIC - Medium 10] Analyze the chemical burns and recover broken ampoule shards.',
      '[KIMIA / LOGIKA - Sedang 10] Analisis bekas luka kimia dan kumpulkan pecahan ampul.',
      '[化学分析 / 逻辑 - 难度10] 提取强酸腐蚀样本，从铁格缝隙里钳出碎裂的试剂安瓿残片。',
      '[化学 / 論理 - 難度10] 薬品の腐食痕を分析し、鉄格子の隙間から試薬瓶の破片を回収する。',
      '[화학 / 논리 - 보통 10] 화학적 부식 흔적을 분석하고 깨진 시약병 파편을 수습한다.',
      '[QUÍMICA / LÓGICA - 10] Analizar las quemaduras químicas y recuperar fragmentos de ampolla.',
      '[CHIMIE / LOGIQUE - 10] Analyser les traces corrosives et récupérer les éclats de fiole.',
      '[CHEMIE / LOGIK - 10] Die Verätzungen analysieren und Glasscherben bergen.',
      '[ХИМИЯ / ЛОГИКА - 10] Исследовать следы едкого химиката и извлечь осколки ампул.',
      '[CHIMICA / LOGICA - 10] Analizza le bruciature chimiche e recupera i frammenti della fiala.',
      '[QUÍMICA / LÓGICA - 10] Analisar as queimaduras químicas e recolher estilhaços do frasco.',
      '[الكيمياء والمنطق - متوسط 10] تحليل آثار الاحتراق الكيميائي واستخراج شظايا الأمبولات.'
    ),
    tr(
      '[Step down to the clock face platform]',
      '[Turun kembali ke platform muka jam]',
      '[走下铁梯回到钟面平台]',
      '[時計盤の階層へ降りる]',
      '[시계판 층으로 내려간다]',
      '[Bajar a la plataforma del reloj]',
      '[Redescendre vers le cadran]',
      '[Hinabsteigen zur Uhrwerksebene]',
      '[Спуститься к циферблату]',
      '[Scendi alla piattaforma del quadrante]',
      '[Descer para a plataforma do relógio]',
      '[النزول إلى منصة وجه الساعة]'
    )
  ]
};

// 9. examine_chime_bell (NEW WORLD BUILDING POI)
NODES.examine_chime_bell = {
  speaker: tr(
    'The Colossal Chime of Saint Irene', 'Lonceng Raksasa Saint Irene', '圣艾琳报时铜钟', '聖アイリーンの巨鐘',
    '성 아이린의 거대 청동 종', 'La Campana de Saint Irene', 'La Cloche de Sainte-Irène', 'Die Riesenglocke von Saint Irene',
    'Исполинский колокол Святой Ирины', 'La Campana di Sant\'Irene', 'O Sino de Santa Irene', 'جرس القديسة إيرين العملاق'
  ),
  text: tr(
    "Cast two centuries ago from church bronze, the immense bell dominates the upper belfry. Its iron clapper weighs five hundred pounds. Etched along the rim are ancient horological mantras and prayers against the plague.",
    "Ditempa dua abad lalu dari perunggu gereja, lonceng raksasa mendominasi menara lonceng atas. Pemukul besinya berbobot ratusan pon. Terukir di sekeliling tepinya mantra horologis kuno dan doa penolak wabah.",
    "这座两百年前由大教堂青铜熔铸而成的庞然巨钟，巍峨矗立在上层钟楼核心。光是悬挂的锻铁钟锤就重达五百磅。钟口边缘铭刻着古老的机械祈祷文与驱散黑霜瘟疫的祝圣咒语。",
    "2世紀前に鋳造された巨大な青銅鐘が鐘楼上層に君臨している。鍛鉄の舌だけでも数百ポンドの重さがある。縁には疫病を退散させる古代の時計仕掛けの祈祷文が刻まれている。",
    "200년 전 대성당 청동으로 주조된 거대한 종이 상층 종탑을 압도하고 있습니다. 쇳덩이 추 무게만 수백 파운드에 달합니다. 종 가장자리에는 역병을 쫓기 위한 고대 시계학 기도문이 새겨져 있습니다.",
    "Fundida hace dos siglos, la inmensa campana domina el campanario. Su badajo de hierro pesa cientos de libras. En el borde hay grabados antiguos mantras contra la plaga.",
    "Coulée il y a deux siècles, l'immense cloche domine le beffroi. Son battant de fer pèse plusieurs centaines de livres. Des prières anciennes contre la peste sont gravées sur le pourtour.",
    "Vor zwei Jahrhunderten gegossen, beherrscht die gewaltige Bronzeglocke den Glockenstuhl. Ihr Klöppel wiegt hunderte Pfund. Am Rand stehen Gebete gegen die Seuche.",
    "Отлитый два века назад исполинский колокол венчает верхнюю звонницу. Его кованый язык весит сотни фунтов. По ободу выгравированы древние молитвы об избавлении от чумы.",
    "Fusa due secoli fa, l'immensa campana domina la cella campanaria. Il battaglio pesa centinaia di libbre. Sul bordo ci sono antiche preghiere contro la pestilenza.",
    "Fundido há dois séculos, o imenso sino domina o campanário. Seu badalo de ferro pesa centenas de quilos. Na borda há antigas preces contra a peste.",
    "صُنع هذا الجرس البرونزي الهائل قبل قرنين، ويهيمن على برج الأجراس. يزن لسان حديده مئات الأرطال، وعلى حافته نقوش صلوات قديمة للحماية من وباء الصقيع."
  ),
  options: [
    tr(
      '[PERCEPTION / INTERFACING - 11] Inspect the striker hammer for tripwire attachments.',
      '[PERSEPSI / PENYELARASAN - 11] Periksa palu pemukul lonceng untuk mencari kawat pemicu mekanik.',
      '[感知 / 机械 - 难度11] 检查钟锤撞击机械臂，寻找与大钟摆脱钩联动的隐蔽触发引线。',
      '[知覚 / 機構連動 - 難度11] 鐘の撃鉄を調べ、大振り子と連動していたトラップワイヤーを捜索する。',
      '[지각 / 기계 인터페이스 - 11] 종 해머를 점검하여 진자 탈착과 연결된 트랩 와이어를 찾아낸다.',
      '[PERCEPCIÓN / INTERFAZ - 11] Inspeccionar el percutor en busca de cables trampa.',
      '[PERCEPTION / INTERACTION - 11] Inspecter le marteau pour trouver un fil déclencheur.',
      '[WAHRNEHMUNG / MECHANIK - 11] Den Schlaghammer nach Auslösedrähten untersuchen.',
      '[ВОСПРИЯТИЕ / МЕХАНИКА - 11] Осмотреть молот на предмет скрытой спусковой проволоки.',
      '[PERCEZIONE / INTERFACCIAMENTO - 11] Ispeziona il martello alla ricerca di fili d\'innesco.',
      '[PERCEPÇÃO / INTERFACIAMENTO - 11] Inspecionar o martelo em busca de fios de disparo.',
      '[الإدراك والتفاعل - 11] فحص مطرقة الجرس للتحقق من وجود أسلاك إفلات آلية مرتبطة بالبندول.'
    ),
    tr(
      '[Descend back down]',
      '[Turun kembali]',
      '[步下台阶]',
      '[階段を降りる]',
      '[아래층으로 내려간다]',
      '[Bajar]',
      '[Redescendre]',
      '[Wieder hinabsteigen]',
      '[Спуститься]',
      '[Scendi]',
      '[Descer]',
      '[النزول]'
    )
  ]
};

// Generate output
const outputCode = `// Aenigma Complete 12-Language Dialogue & Clue Localization System
// Comprehensive full translations for all 12 supported languages:
// en, id, zh, ja, ko, es, fr, de, ru, it, pt, ar

export const DIALOGUE_I18N_FULL = ${JSON.stringify(NODES, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '..', 'src', 'dialogue_i18n.js'), outputCode, 'utf8');
console.log('Successfully generated full dialogue localization in src/dialogue_i18n.js');
