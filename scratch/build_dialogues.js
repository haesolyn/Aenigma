// Script to generate complete 12-language dialogue and clue translations
const fs = require('fs');
const path = require('path');

// We define all nodes with their 12 translations
const DIALOGUE_DATA = {
  graves_dialogue_start: {
    speaker: {
      en: 'Inspector Graves', id: 'Inspektur Graves', zh: '格雷夫斯警探', ja: 'グレイヴス警部',
      ko: '그레이브스 형사', es: 'Inspector Graves', fr: 'Inspecteur Graves', de: 'Inspektor Graves',
      ru: 'Инспектор Грейвс', it: 'Ispettore Graves', pt: 'Inspetor Graves', ar: 'المفتش غريفز'
    },
    text: {
      en: "You finally dragged yourself up six flights of stairs, Detective. You reek like you slept in an open sewer behind the Whirling Gull. Take a look at this mess. The city magistrate is already screaming on the wire.",
      id: "Kamu akhirnya berhasil menyeret dirimu menaiki enam lantai tangga, Detektif. Baumu seperti tidur di saluran pembuangan Whirling Gull. Lihat kekacauan ini. Hakim kota sudah berteriak histeris di telepon.",
      zh: "你终于拖着沉重的身子爬上这六层阶梯了，探长。你身上的恶臭简直就像在回旋鸥后巷的阴沟里宿醉了一整夜。瞧瞧眼前的烂摊子，市政法官已经在警线那头咆哮了。",
      ja: "ようやく6階分の階段を這い上がってきたか、刑事。ワーリング・ガル裏の側溝で寝ていたかのような酷い臭いだ。この惨状を見ろ。治安判事はすでに電話口で怒鳴り散らしているぞ。",
      ko: "결국 6층 계단을 기어 올라오셨군, 형사님. 회전하는 갈매기 여관 뒷골목 하수구에서 밤을 지새운 것 같은 악취가 진동하오. 이 꼴을 좀 보시오. 시 치안판사가 벌써 전선 너머로 고래고래 소리를 지르고 있소.",
      es: "Por fin te arrastraste seis tramos de escaleras, detective. Apestas como si hubieras dormido en una cloaca tras la Gaviota Giratoria. Mira este desastre. El magistrado ya está gritando por la línea.",
      fr: "Vous avez enfin daigné gravir les six étages, Inspecteur. Vous empestez comme si vous aviez cuvé dans un égout derrière la Mouette Rieuse. Regardez ce carnage. Le magistrat hurle déjà au bout du fil.",
      de: "Sie haben sich endlich sechs Stockwerke hochgeschleppt, Detective. Sie stinken, als hätten Sie in der Gosse hinter der Taumelnden Möwe geschlafen. Sehen Sie sich das an. Der Magistrat tobt bereits am Fernsprecher.",
      ru: "Наконец-то ты приволокся на шестой этаж, детектив. От тебя разит так, словно ты ночевал в сточной канаве за «Кружащейся чайкой». Взгляни на этот хаос. Магистрат уже разрывает телефонную линию криками.",
      it: "Ti sei finalmente trascinato su per sei rampe di scale, detective. Puzzi come se avessi dormito nelle fogne dietro il Gabbiano Volteggiante. Guarda che disastro. Il magistrato urla già all'apparecchio.",
      pt: "Você finalmente se arrastou seis lances de escada, detetive. Você fede como se tivesse dormido num esgoto atrás do Gaivota Giratória. Olhe para este desastre. O magistrado já está berrando na linha.",
      ar: "لقد سحبت نفسك أخيرًا عبر ستة طوابق من السلالم يا حضرة المحقق. تفوح منك رائحة وكأنك نمت في مجاري الحانة الخلفية. انظر إلى هذه الفوضى، قاضي المدينة يصرخ بهستيريا على الخط بالفعل."
    },
    voices: [
      {
        voice: { en: 'Ratio', id: 'Rasio', zh: '理性', ja: '比率', ko: '이성', es: 'Razón', fr: 'Ratio', de: 'Ratio', ru: 'Рацио', it: 'Ragione', pt: 'Razão', ar: 'العقلانية' },
        badge: { en: 'RATIO [Intellect]', id: 'RASIO [Intelek]', zh: '理性 [智力]', ja: '比率 [知性]', ko: '이성 [지성]', es: 'RAZÓN [Intelecto]', fr: 'RATIO [Intellect]', de: 'RATIO [Intellekt]', ru: 'РАЦИО [Интеллект]', it: 'RAGIONE [Intelletto]', pt: 'RAZÃO [Intelecto]', ar: 'العقلانية [الفكر]' },
        text: {
          en: "Look at his collar. There's dried tobacco ash on his lapel, but his eyes are darting toward the widow. He's nervous. He wants this closed as an accident before dawn.",
          id: "Perhatikan kerah bajunya. Ada abu tembakau kering di lapelnya, tapi matanya terus melirik ke arah sang janda. Dia gelisah. Dia ingin kasus ini ditutup sebagai kecelakaan sebelum fajar.",
          zh: "看他的领口。驳领上沾着风干的烟灰，但他的眼神却频频瞥向那位遗孀。他在心虚。他迫不及待想在黎明前将此案草草定性为意外事故。",
          ja: "彼の襟元を見ろ。乾いた煙草の灰が付着しているが、その視線は未亡人へと泳いでいる。動揺しているのだ。夜明け前に事故として処理したがっている。",
          ko: "깃을 보십시오. 옷깃에 마른 담뱃재가 묻어 있지만, 그의 눈은 미망인을 향해 바쁘게 흔들립니다. 초조한 겁니다. 동이 트기 전에 단순 사고로 종결짓고 싶어 합니다.",
          es: "Mira su cuello. Hay ceniza de tabaco en su solapa, pero sus ojos se desvían hacia la viuda. Está nervioso. Quiere cerrar esto como un accidente antes del amanecer.",
          fr: "Regardez son col. Des cendres froides sur son revers, mais ses yeux fuient vers la veuve. Il est fébrile. Il veut clore l'affaire en accident avant l'aube.",
          de: "Sehen Sie sich seinen Kragen an. Asche auf dem Revers, doch sein Blick huscht zur Witwe. Er ist nervös. Er will den Fall vor Sonnenaufgang als Unfall abstempeln.",
          ru: "Посмотри на его воротник. На лацкане осыпался пепел, но его глаза то и дело косятся на вдову. Он нервничает. Хочет закрыть дело как несчастный случай до рассвета.",
          it: "Guarda il suo colletto. C'è cenere secca sul risvolto, ma i suoi occhi saettano verso la vedova. È nervoso. Vuole archiviare tutto come incidente prima dell'alba.",
          pt: "Olhe para o colarinho dele. Há cinzas secas na lapela, mas os olhos dele disparam em direção à viúva. Ele está nervoso. Quer encerrar isso como acidente antes da aurora.",
          ar: "انظر إلى ياقته. هناك رماد تبغ جاف على صدر سترته، لكن عينيه ترمقان الأرملة في توتر. إنه قلق ويريد إغلاق القضية كحادث عرضي قبل بزوغ الفجر."
        }
      }
    ],
    options: [
      {
        en: '"What is your preliminary assessment, Graves?"',
        id: '"Bagaimana penilaian awalmu, Graves?"',
        zh: '“格雷夫斯，你的初步现场判断是什么？”',
        ja: '「グレイヴス、お前の予備的な見立てはどうなんだ？」',
        ko: '"그레이브스, 자네의 예비 소견은 어떤가?"',
        es: '"¿Cuál es tu evaluación preliminar, Graves?"',
        fr: '"Quelle est votre conclusion préliminaire, Graves ?"',
        de: '"Was ist Ihre vorläufige Einschätzung, Graves?"',
        ru: '«Какова твоя предварительная оценка, Грейвс?»',
        it: '"Qual è la tua valutazione preliminare, Graves?"',
        pt: '"Qual é a sua avaliação preliminar, Graves?"',
        ar: '"ما هو تقييمك الأولي يا غريفز؟"'
      },
      {
        en: '[RHETORIC - Medium 10] "You seem in an awful hurry to file this report, Graves. Who called you first?"',
        id: '[RETORIKA - Sedang 10] "Terburu-buru sekali kamu menutup laporan ini, Graves. Siapa yang menghubungimu duluan?"',
        zh: '[修辞 - 难度10] “你似乎急不可耐地想结案归档啊，格雷夫斯。今晚到底是谁第一个给你通的信？”',
        ja: '[修辞学 - 難易度10] 「ひどく急いで報告書をまとめようとしているな、グレイヴス。最初に呼んだのは誰だ？」',
        ko: '[수사학 - 보통 10] "보고서를 서둘러 넘기려는 기색이 역력하군, 그레이브스. 누가 자넬 먼저 불렀지?"',
        es: '[RETÓRICA - Media 10] "Pareces tener demasiada prisa por cerrar este informe, Graves. ¿Quién te llamó primero?"',
        fr: '[RHÉTORIQUE - Moyen 10] "Vous semblez bien pressé de classer ce dossier, Graves. Qui vous a contacté en premier ?"',
        de: '[RHETORIK - Mittel 10] "Sie haben es verdammt eilig mit dem Bericht, Graves. Wer hat Sie zuerst gerufen?"',
        ru: '[РИТОРИКА - Сложность 10] «Ты подозрительно спешишь составить рапорт, Грейвс. Кто вызвал тебя первым?»',
        it: '[RETORICA - Medio 10] "Sembri avere una fretta dannata di chiudere il rapporto, Graves. Chi ti ha chiamato per primo?"',
        pt: '[RETÓRICA - Média 10] "Você parece ter muita pressa para arquivar este relatório, Graves. Quem te chamou primeiro?"',
        ar: '[البلاغة - متوسط 10] "تبدو في عجلة مريبة لتقييد هذا التقرير يا غريفز. من الذي اتصل بك أولاً؟"'
      },
      {
        en: '"I need a cigarette before my synapses completely disconnect."',
        id: '"Aku butuh sebatang rokok sebelum sinapsis sarafku benar-benar putus."',
        zh: '“在我脑神经彻底短路前，我需要来根烟提神。”',
        ja: '「シナプスが完全に焼き切れる前に、煙草を一本くれ。」',
        ko: '"신경 시냅스가 완전히 끊기기 전에 담배 한 대 피워야겠군."',
        es: '"Necesito un cigarrillo antes de que mis sinapsis se desconecten del todo."',
        fr: '"J\'ai besoin d\'une cigarette avant que mes synapses ne lâchent prise."',
        de: '"Ich brauche eine Zigarette, bevor meine Synapsen vollends versagen."',
        ru: '«Мне нужна сигарета, пока мои синапсы окончательно не отключились.»',
        it: '"Ho bisogno di una sigaretta prima che le mie sinapsi si scolleghino."',
        pt: '"Preciso de um cigarro antes que minhas sinapses pifem de vez."',
        ar: '"أحتاج إلى سيجارة قبل أن تنقطع نقاط تشابكي العصبي تمامًا."'
      },
      {
        en: '[Step away from Inspector Graves]',
        id: '[Tinggalkan percakapan dengan Graves]',
        zh: '[暂别格雷夫斯警探]',
        ja: '[グレイヴス警部との会話を終える]',
        ko: '[그레이브스 형사와의 대화를 마치고 물러난다]',
        es: '[Alejarse del inspector Graves]',
        fr: '[Mettre fin à l\'échange avec Graves]',
        de: '[Das Gespräch mit Graves beenden]',
        ru: '[Закончить разговор с инспектором Грейвсом]',
        it: '[Allontanati dall\'ispettore Graves]',
        pt: '[Afastar-se do inspetor Graves]',
        ar: '[الابتعاد عن المفتش غريفز]'
      }
    ]
  },

  graves_assessment: {
    speaker: {
      en: 'Inspector Graves', id: 'Inspektur Graves', zh: '格雷夫斯警探', ja: 'グレイヴス警部',
      ko: '그레이브스 형사', es: 'Inspector Graves', fr: 'Inspecteur Graves', de: 'Inspektor Graves',
      ru: 'Инспектор Грейвс', it: 'Ispettore Graves', pt: 'Inspetor Graves', ar: 'المفتش غريفز'
    },
    text: {
      en: "Old Aurelia was up here tinkering with the escapement at three in the morning. She slipped on machine grease, grabbed the pendulum to catch herself, and the counterweight drove through her ribs. Gruesome, but an industrial accident. Case closed, we go home and dry our boots.",
      id: "Aurelia tua sedang mengotak-atik roda escapement pukul tiga pagi. Dia terpeleset minyak pelumas mesin, meraih pendulum untuk menahan diri, dan beban penyeimbang menembus tulang rusuknya. Mengerikan, tapi murni kecelakaan kerja. Kasus ditutup, kita bisa pulang dan mengeringkan sepatu kita.",
      zh: "老奥蕾莉亚凌晨三点在上头摆弄擒纵轮。她踩到机械润滑机油滑倒，想伸手抓住摆锤稳住重心，结果铸铁配重块直接贯穿了她的肋骨。虽然惨绝人寰，但纯粹是工伤意外。结案收工，大家回去烤干湿透的皮靴。",
      ja: "老オレリアは午前3時にここで脱進機をいじっていた。機械油に足を滑らせ、体勢を立て直そうと振り子を掴んだが、重いカウンターウェイトが肋骨を貫通した。陰惨だが、単なる労働災害だ。事件終了、長靴を乾かしに帰るぞ。",
      ko: "늙은 오렐리아는 새벽 3시에 여기서 탈진기를 손보고 있었소. 기계 기름에 발이 미끄러져 몸을 지탱하려 진자를 붙잡았는데, 평형추가 갈비뼈를 그대로 꿰뚫어 버렸지. 끔찍하지만 명백한 산업재해 사고라오. 수사 종결짓고 마른 신발이나 갈아 신으러 갑시다.",
      es: "La vieja Aurelia estaba trasteando con el escape a las tres de la mañana. Resbaló con grasa de máquina, se agarró al péndulo y el contrapeso le atravesó las costillas. Espantoso, pero un accidente laboral. Caso cerrado, nos vamos a casa a secar las botas.",
      fr: "La vieille Aurelia bricolait l'échappement à trois heures du matin. Elle a glissé sur de la graisse, s'est raccrochée au balancier, et le contrepoids lui a transpercé les côtes. Sinistre, mais un bête accident de travail. Affaire classée, on rentre sécher nos godasses.",
      de: "Die alte Aurelia werkelte um drei Uhr morgens an der Hemmung herum. Sie rutschte auf Maschinenfett aus, klammerte sich ans Pendel und das Gegengewicht bohrte sich durch ihre Rippen. Schrecklich, aber ein Betriebsunfall. Fall gelöst, wir gehen heim.",
      ru: "Старуха Аурелия возилась здесь со спусковым механизмом в три часа ночи. Поскользнулась на машинном масле, схватилась за маятник, и противовес пробил ей грудь. Жутко, но это производственная травма. Дело закрыто, пора сушить сапоги.",
      it: "La vecchia Aurelia armeggiava con lo scappamento alle tre del mattino. È scivolata sull'olio, si è aggrappata al pendolo e il contrappeso le ha trafitto le costole. Macabro, ma un banale incidente sul lavoro. Caso chiuso, andiamo ad asciugarci gli stivali.",
      pt: "A velha Aurelia estava mexendo no escape às três da manhã. Escorregou na graxa, agarrou o pêndulo e o contrapeso perfurou suas costelas. Hediondo, mas um acidente de trabalho. Caso encerrado, vamos para casa secar as botas.",
      ar: "كانت العجوز أوريليا تعبث بترس الميزان في الثالثة فجرًا. انزلقت في شحم الماكينات وحاولت التشبث بالبندول فخرق ثقل الموازنة أضلاعها. حادث شنيع لكنه عرضي بحت. القضية أغلقت، فلنعد لنجفف أحذيتنا."
    },
    voices: [
      {
        voice: { en: 'Carnal', id: 'Insting Karnal', zh: '肉体本能', ja: '肉体本能', ko: '육체 본능', es: 'Instinto Carnal', fr: 'Carnal', de: 'Körperinstinkt', ru: 'Карнал', it: 'Istinto Carnale', pt: 'Instinto Carnal', ar: 'الغريزة الجسدية' },
        badge: { en: 'CARNAL [Physique]', id: 'KARNAL [Fisik]', zh: '肉体本能 [体魄]', ja: '肉体 [肉体]', ko: '육체 [체력]', es: 'CARNAL [Físico]', fr: 'CARNAL [Physique]', de: 'KARNAL [Physis]', ru: 'КАРНАЛ [Физика]', it: 'CARNALE [Fisico]', pt: 'CARNAL [Físico]', ar: 'الجسدية [القوة]' },
        text: {
          en: "Lies. A woman who slips forward doesn't land impaled through the back of her shoulder blades with her hands neatly folded. Someone held her down while the heavy iron arm descended.",
          id: "Bohong. Seseorang yang terpeleset ke depan tidak akan tertusuk dari belakang belikat dengan tangan terlipat rapi. Seseorang menahannya saat lengan besi raksasa itu menghujam ke bawah.",
          zh: "一派胡言。前倾滑倒的人绝不可能肩胛骨正后方被重物洞穿，双手还整整齐齐地叠放在胸前。在重锤落下前，一定有人将她死死按在地上。",
          ja: "嘘だ。前方に足を滑らせた人間が、両手を整然と揃えたまま肩甲骨の後ろから串刺しになるはずがない。何者かが彼女を押さえつけ、鉄の腕を振り下ろさせたのだ。",
          ko: "거짓말입니다. 앞으로 넘어진 사람이 두 손을 단정히 모은 채 등 뒤 견갑골을 관통당할 수는 없습니다. 무거운 쇳덩이가 내려앉는 동안 누군가 그녀를 짓누르고 있었던 겁니다.",
          es: "Mentiras. Alguien que resbala hacia adelante no acaba empalada por la espalda con las manos ordenadamente dobladas. Alguien la inmovilizó mientras bajaba el brazo de hierro.",
          fr: "Mensonges. Une personne qui glisse en avant ne finit pas empalée par les omoplates avec les mains bien jointes. Quelqu'un l'a maintenue pendant que le lourd balancier s'abattait.",
          de: "Lügen. Wer nach vorn stürzt, wird nicht von hinten durch die Schulterblätter aufgespießt, während die Hände gefaltet sind. Jemand hielt sie nieder, als der Eisenarm herabsank.",
          ru: "Ложь. Человек, упавший вперед, не может оказаться пробитым через спину с аккуратно сложенными руками. Кто-то удерживал ее, пока опускался тяжелый стальной рычаг.",
          it: "Menzogne. Chi scivola in avanti non finisce trafitto dietro le scapole con le mani composte. Qualcuno l'ha tenuta ferma mentre il braccio d'acciaio scendeva.",
          pt: "Mentiras. Alguém que escorrega para frente não acaba empalada pelas costas com as mãos dobradas. Alguém a segurou enquanto o pesado braço de ferro descia.",
          ar: "هذا كذب صريح. من يسقط إلى الأمام لا يُطعن عبر عظام الكتف من الخلف بيدين مطويتين بعناية. شخص ما ثبّتها بإحكام أثناء هبوط الذراع الحديدي الثقيل."
        }
      }
    ],
    options: [
      {
        en: '"Accident? Look at the wound entry angle. That is biomechanically impossible."',
        id: '"Kecelakaan? Lihat sudut masuk lukanya. Secara biomekanik itu mustahil."',
        zh: '“意外？看清楚创口刺入的倾角，这在生物力学上绝不可能。”',
        ja: '「事故だと？創傷の進入角度を見ろ。生体力学的にあり得ない。」',
        ko: '"사고라고? 상처의 진입 각도를 보시오. 생체역학적으로 불가능하오."',
        es: '"¿Accidente? Mira el ángulo de entrada. Es biomecánicamente imposible."',
        fr: '"Un accident ? Regardez l\'angle d\'impact. C\'est biomécaniquement impossible."',
        de: '"Ein Unfall? Schauen Sie sich den Eintrittswinkel an. Das ist biomechanisch unmöglich."',
        ru: '«Несчастный случай? Посмотри на угол раны. Это биомеханически невозможно.»',
        it: '"Incidente? Guarda l\'angolo di penetrazione. È biomeccanicamente impossibile."',
        pt: '"Acidente? Olhe o ângulo de entrada da ferida. Isso é biomecanicamente impossível."',
        ar: '"حادث؟ انظر لزاوية دخول الجرح، هذا مستحيل بيوميكانيكيًا."'
      },
      {
        en: '"Who was the last person to see her alive?"',
        id: '"Siapa orang terakhir yang melihatnya hidup?"',
        zh: '“今晚生前最后一个见到她的人是谁？”',
        ja: '「彼女が生きていたのを最後に見たのは誰だ？」',
        ko: '"그녀가 살아있을 때 마지막으로 본 사람은 누구요?"',
        es: '"¿Quién fue la última persona en verla con vida?"',
        fr: '"Qui est la dernière personne à l\'avoir vue vivante ?"',
        de: '"Wer hat sie zuletzt lebend gesehen?"',
        ru: '«Кто видел ее живой последним?»',
        it: '"Chi è stata l\'ultima persona a vederla viva?"',
        pt: '"Quem foi a última pessoa a vê-la viva?"',
        ar: '"من كان آخر شخص رآها على قيد الحياة؟"'
      },
      {
        en: '[Return to main inquiry with Graves]',
        id: '[Kembali ke penyelidikan utama bersama Graves]',
        zh: '[返回向格雷夫斯的主线盘问]',
        ja: '[グレイヴスとの主捜査へ戻る]',
        ko: '[그레이브스와의 기본 심문으로 복귀]',
        es: '[Volver a la indagación principal]',
        fr: '[Revenir à l\'interrogatoire principal]',
        de: '[Zurück zur Hauptbefragung]',
        ru: '[Вернуться к основному опросу Грейвса]',
        it: '[Torna all\'indagine principale]',
        pt: '[Voltar à inquirição principal]',
        ar: '[العودة إلى الاستجواب الرئيسي مع غريفز]'
      }
    ]
  },

  graves_rhetoric_win: {
    speaker: {
      en: 'Inspector Graves', id: 'Inspektur Graves', zh: '格雷夫斯警探', ja: 'グレイヴス警部',
      ko: '그레이브스 형사', es: 'Inspector Graves', fr: 'Inspecteur Graves', de: 'Inspektor Graves',
      ru: 'Инспектор Грейвс', it: 'Ispettore Graves', pt: 'Inspetor Graves', ar: 'المفتش غريفز'
    },
    text: {
      en: "Graves flinches, his jaw tightening around the matchstick. 'Lower your damn voice! A courier from the Grand Syndicate arrived at my flat at 02:00. He said Vance had stolen a prototype clockwork ledger. If we recover that ledger, there is a ten-thousand guilder bounty for both of us.'",
      id: "Graves tersentak, rahangnya mengetat di sekitar batang korek api. 'Kecilkan suaramu! Kurir dari Sindikat Agung datang ke flatku pukul 02:00. Katanya Vance mencuri prototipe buku besar alkimia. Jika kita mengamankannya, ada hadiah sepuluh ribu guilder untuk kita berdua.'",
      zh: "格雷夫斯神色一紧，下颌死死咬住火柴棒。“把声音给我压低点！联合大辛迪加的信使凌晨两点砸开了我公寓的门。他说梵斯偷走了一份机械原型秘密账簿。只要把账簿搞到手，咱俩能平分一万基尔德的巨额赏金！”",
      ja: "グレイヴスは顔を強張らせ、マッチの軸を強く噛みしめた。「声を落とせ！午前2時、大シンジケートの密使が俺の部屋に来たんだ。ヴァンスが試作時計の帳簿を盗み出したとさ。回収すれば、俺たち二人に1万ギルダーの報奨金が出る。」",
      ko: "그레이브스가 흠칫하며 성냥개비를 어금니로 꽉 뭅니다. '목소리 낮춰! 새벽 2시에 거대 신디케이트의 배달원이 내 셋방을 찾아왔소. 밴스가 프로토타입 태엽 장부책을 훔쳐 달아났다고 하더군. 그걸 회수하면 우리 둘 몫으로 1만 길더의 현상금이 떨어지오.'",
      es: "Graves se estremece y aprieta la mandíbula sobre la cerilla. '¡Baja la maldita voz! Un emisario del Gran Sindicato llegó a mi piso a las 02:00. Dijo que Vance había robado un libro de contabilidad alquímico. Hay una recompensa de diez mil florines para los dos si lo recuperamos.'",
      fr: "Graves tressaille, la mâchoire crispée sur son allumette. 'Baissez d'un ton ! Un coursier du Grand Syndicat a débarqué chez moi à deux heures. Il prétendait que Vance avait dérobé un registre d'horlogerie secret. Il y a dix mille florins de prime à la clé pour nous deux.'",
      de: "Graves zuckt zusammen und verbeißt sich ins Streichholz. 'Leiser, verdammt! Um zwei Uhr nachts stand ein Kurier des Großen Syndikats vor meiner Tür. Vance hätte ein alchemistisches Prototyp-Buch gestohlen. Zehntausend Gulden Belohnung für uns beide, wenn wir es beschaffen.'",
      ru: "Грейвс вздрагивает, стиснув спичку зубами. «Убавь голос! В два часа ночи ко мне на квартиру приперся курьер из Великого Синдиката. Сказал, Вэнс украла гроссбух с чертежами прототипа. Если найдем его — получим десять тысяч гульденов на двоих.»",
      it: "Graves sussulta, serrando la mascella attorno allo zolfanello. 'Abbassa quella dannata voce! Un corriere del Grande Sindacato è venuto a casa mia alle due. Diceva che la Vance aveva rubato un mastro segreto. C'è una taglia di diecimila fiorini per entrambi se lo recuperiamo.'",
      pt: "Graves estremece, travando a mandíbula no fósforo. 'Abaixe a voz! Um mensageiro do Grande Sindicato bateu na minha porta às duas da manhã. Disse que Vance roubou um livro-razão protótipo. Há uma recompensa de dez mil florins para nós dois se o recuperarmos.'",
      ar: "يرتجف غريفز ويطبق فكيه على عود الثقاب: 'اخفض صوتك اللعين! جاءني مبعوث من النقابة الكبرى في شقتي عند الثانية فجرًا، وقال إن فانس سرقت دفتر الحسابات الخيميائي السري. إذا استعدناه، فهناك مكافأة عشرة آلاف خيلدر نتقاسمها سوية.'"
    },
    options: [
      {
        en: '"So this was never about an accident. Where is the ledger now?"',
        id: '"Jadi ini bukan soal kecelakaan. Di mana buku besar itu sekarang?"',
        zh: '“所以这根本不是什么意外。账簿现在藏在何处？”',
        ja: '「やはり事故などではなかったな。その帳簿は今どこにある？」',
        ko: '"결국 단순 사고 따위가 아니었군. 그 장부는 지금 어디 있나?"',
        es: '"Así que esto nunca fue un accidente. ¿Dónde está el libro ahora?"',
        fr: '"Ce n\'a donc jamais été un accident. Où se trouve ce registre ?"',
        de: '"Es war also nie ein Unfall. Wo ist das Buch jetzt?"',
        ru: '«Значит, дело вовсе не в несчастном случае. Где гроссбух сейчас?»',
        it: '"Quindi non si è mai trattato di un incidente. Dov\'è il mastro adesso?"',
        pt: '"Então nunca se tratou de um acidente. Onde está o livro agora?"',
        ar: '"إذن لم يكن الأمر حادثًا قط. أين دفتر الحسابات الآن؟"'
      },
      {
        en: '[Return to investigation]',
        id: '[Kembali ke penyelidikan]',
        zh: '[返回案情排查]',
        ja: '[捜査へ戻る]',
        ko: '[수사로 복귀]',
        es: '[Volver a la investigación]',
        fr: '[Poursuivre les investigations]',
        de: '[Zurück zur Untersuchung]',
        ru: '[Вернуться к расследованию]',
        it: '[Torna alle indagini]',
        pt: '[Voltar à investigação]',
        ar: '[العودة إلى التحقيق]'
      }
    ]
  },

  graves_cigarette: {
    speaker: {
      en: 'Inspector Graves', id: 'Inspektur Graves', zh: '格雷夫斯警探', ja: 'グレイヴス警部',
      ko: '그레이브스 형사', es: 'Inspector Graves', fr: 'Inspecteur Graves', de: 'Inspektor Graves',
      ru: 'Инспектор Грейвс', it: 'Ispettore Graves', pt: 'Inspetor Graves', ar: 'المفتش غريفز'
    },
    text: {
      en: "Graves tosses you a wrinkled cardboard box. 'Astra Red. Take one. You look like a walking cadaver.'",
      id: "Graves melemparkan kotak kardus kusut. 'Astra Merah. Ambil satu. Kamu terlihat seperti mayat hidup yang berjalan.'",
      zh: "格雷夫斯朝你扔来一包皱巴巴的纸盒。“阿斯特拉红牌无嘴烟。拿一支去抽吧，你现在活像一具行尸走肉。”",
      ja: "グレイヴスは皺くちゃの紙箱を放り投げてきた。「アストラ・レッドだ。1本吸え。歩く死体のような顔をしてるぞ。」",
      ko: "그레이브스가 구겨진 담뱃갑을 툭 던집니다. '아스트라 레드요. 한 대 피우시오. 걸어 다니는 시체 꼴이오.'",
      es: "Graves te lanza una cajetilla arrugada. 'Astra Rojo. Coge uno. Pareces un cadáver andante.'",
      fr: "Graves vous lance un paquet écorné. 'Astra Rouge. Prenez-en une. Vous avez l'air d'un macchabée sur pattes.'",
      de: "Graves wirft Ihnen eine zerknitterte Schachtel zu. 'Astra Rot. Nehmen Sie eine. Sie sehen aus wie eine wandelnde Leiche.'",
      ru: "Грейвс бросает тебе измятую пачку. «Астра Красная». Возьми одну. Ты выглядишь как ходячий покойник.»",
      it: "Graves ti lancia un pacchetto sgualcito. 'Astra Rossa. Prendine una. Sembri un cadavere che cammina.'",
      pt: "Graves joga um maço amassado para você. 'Astra Vermelho. Pegue um. Você parece um cadáver ambulante.'",
      ar: "يرمي غريفز إليك علبة سجائر مجعدة: 'أسترا الحمراء، خذ واحدة. مظهرك يبدو كجثة متحركة.'"
    },
    options: [
      {
        en: '[Blow smoke into the gloom and return]',
        id: '[Hembuskan asap ke dalam kegelapan menara dan kembali]',
        zh: '[将浓烈的烟雾吐入钟楼昏暗中，归队]',
        ja: '[暗がりへ煙を吹き出し、捜査に戻る]',
        ko: '[어스름 속으로 연기를 내뿜으며 복귀한다]',
        es: '[Exhalar el humo en la penumbra y regresar]',
        fr: '[Souffler la fumée dans la pénombre et reprendre]',
        de: '[Rauch in die Dunkelheit blasen und zurückkehren]',
        ru: '[Выпустить дым в полумрак и вернуться]',
        it: '[Espira il fumo nell\'ombra e ritorna]',
        pt: '[Soprar fumaça na penumbra e retornar]',
        ar: '[نفث الدخان في عتمة البرج والعودة]'
      }
    ]
  },

  examine_pendulum_start: {
    speaker: {
      en: 'Forensic Observation', id: 'Pengamatan Forensik', zh: '现场法医观察', ja: '法医学的観察',
      ko: '법의학적 관찰', es: 'Observación Forense', fr: 'Observation Légale', de: 'Forensische Beobachtung',
      ru: 'Судебно-медицинский осмотр', it: 'Osservazione Forense', pt: 'Observação Forense', ar: 'الملاحظة الجنائية'
    },
    text: {
      en: "The body of Aurelia Vance is pinned like an insect against the brass counterweight. Her linen blouse is stiff with dried crimson. Strangely, the pool of coagulated blood is not directly underneath her—it forms a dark smear six paces toward the window.",
      id: "Tubuh Aurelia Vance tertancap seperti serangga pada beban kuningan pendulum. Blus linennya kaku oleh noda darah kering. Anehnya, genangan darah beku tidak berada tepat di bawahnya—melainkan membentuk jejak seretan enam langkah ke arah jendela.",
      zh: "奥蕾莉亚·梵斯的尸身如同一只被标本针钉住的昆虫，惨烈地挂在巨大的黄铜配重块上。她的亚麻衬衣已被发黑的干涸血迹浸透板结。古怪的是，凝固的大滩血泊并不在悬挂处正下方——而在六步之遥的靠窗木板上拖出一道明显的拖拽痕迹。",
      ja: "オレリア・ヴァンスの遺体は、昆虫の標本のように真鍮のカウンターウェイトに磔にされている。麻のシャツは乾いた血で固まっている。奇妙なことに、凝固した血だまりは真下ではなく、窓に向かって6歩ほどの位置に引きずられた痕跡を残していた。",
      ko: "오렐리아 밴스의 시신은 표본 곤충처럼 황동 평형추에 꿰뚫려 있습니다. 리넨 셔츠는 말라붙은 핏물로 뻣뻣합니다. 기이하게도 응고된 혈흔은 진자 바로 밑이 아닌, 창문 쪽으로 여섯 걸음 떨어진 바닥에 짙게 번져 있습니다.",
      es: "El cuerpo de Aurelia Vance está clavado como un insecto contra el contrapeso de latón. Su blusa de lino está rígida de sangre seca. Extrañamente, el charco de sangre coagulada no está debajo de ella, sino que forma una mancha arrastrada a seis pasos hacia la ventana.",
      fr: "Le corps d'Aurelia Vance est cloué tel un insecte contre le contrepoids de laiton. Sa blouse de lin est rigide de sang séché. Curieusement, la mare de sang ne se trouve pas sous elle, mais forme une traînée macabre à six pas vers la fenêtre.",
      de: "Der Leichnam von Aurelia Vance ist wie ein Insekt an das Messinggewicht gespießt. Ihre Bluse ist von getrocknetem Blut erstarrt. Seltsamerweise liegt die Blutlache nicht unter ihr, sondern bildet eine Schleifspur sechs Schritte weit zum Fenster.",
      ru: "Тело Аурелии Вэнс наколото на латунный противовес, словно насекомое. Льняная блуза затвердела от запекшейся крови. Странно, но лужа крови находится не под телом — она тянется широким следом волочения в шести шагах от окна.",
      it: "Il corpo di Aurelia Vance è infilzato come un insetto contro il contrappeso d'ottone. La sua camicetta è irrigidita dal sangue secco. Stranamente la pozza di sangue non è sotto di lei, ma forma una scia trascinata a sei passi verso la finestra.",
      pt: "O corpo de Aurelia Vance está cravado como um inseto contra o contrapeso de latão. Sua camisa de linho está endurecida de sangue seco. Estranhamente, a poça de sangue coagulado não está sob ela, mas forma um rastro arrastado a seis passos em direção à janela.",
      ar: "جسد أوريليا فانس مثبت كحشرة معلقة ضد ثقل الموازنة النحاسي. قميصها الكتاني متصلب بالدماء الجافة. المريب أن بركة الدم المتخثر ليست تحتها مباشرة، بل تشكل أثر جر واضح يبعد ست خطوات نحو النافذة."
    },
    options: [
      {
        en: '[PERCEPTION - Challenging 12] Pry open her frozen right hand to inspect what she clenched.',
        id: '[PERSEPSI - Sulit 12] Buka paksa genggaman tangan kanannya yang membeku untuk melihat apa yang ia cengkeram.',
        zh: '[感知 - 困难12] 掰开她僵死冰冷的右手，检查死者死前紧攥之物。',
        ja: '[知覚 - 難度12] 硬直した右手をこじ開け、死の間際に何を握りしめていたか検分する。',
        ko: '[지각 - 난이도 12] 굳어버린 오른손을 강제로 벌려 쥐고 있던 것을 확인한다.',
        es: '[PERCEPCIÓN - Desafiante 12] Abrir su mano congelada para examinar qué apretaba.',
        fr: '[PERCEPTION - Difficile 12] Forcer sa main raidie pour examiner ce qu\'elle serrait.',
        de: '[WAHRNEHMUNG - Schwer 12] Ihre erstarrte rechte Hand aufbiegen und untersuchen.',
        ru: '[ВОСПРИЯТИЕ - Сложность 12] Разжать ее одеревеневшие пальцы и изучить предмет в руке.',
        it: '[PERCEZIONE - Impegnativo 12] Apri la sua mano irrigidita per vedere cosa stringeva.',
        pt: '[PERCEPÇÃO - Desafiador 12] Forçar a mão direita congelada para ver o que segurava.',
        ar: '[الإدراك - صعب 12] فتح قبضتها اليمنى المتصلبة لمعاينة ما كانت تمسكه بقوة.'
      },
      {
        en: '[ESOTERICA - Medium 10] Study the strange geometric incision carved into her collarbone.',
        id: '[ESOTERIKA - Sedang 10] Teliti ukiran geometris ganjil yang disayat di tulang selangkanya.',
        zh: '[秘教 - 难度10] 细细研读刻在她锁骨处那道诡异的几何几何星位刻痕。',
        ja: '[秘教 - 難易度10] 彼女の鎖骨に刻まれた奇妙な幾何学的印章を調べる。',
        ko: '[비전학 - 보통 10] 쇄골에 새겨진 기이한 기하학적 문양을 분석한다.',
        es: '[ESOTERISMO - Medio 10] Estudiar la extraña incisión geométrica tallada en su clavícula.',
        fr: '[ÉSOTÉRISME - Moyen 10] Étudier l\'étrange incision géométrique gravée sur sa clavicule.',
        de: '[ESOTERIK - Mittel 10] Die seltsame geometrische Ritzung an ihrem Schlüsselbein untersuchen.',
        ru: '[ЭЗОТЕРИКА - Сложность 10] Изучить странный геометрический знак, вырезанный на ключице.',
        it: '[ESOTERISMO - Medio 10] Esamina la strana incisione geometrica incisa sulla clavicola.',
        pt: '[ESOTERISMO - Médio 10] Estudar a estranha incisão geométrica talhada na clavícula dela.',
        ar: '[العلوم الباطنية - متوسط 10] دراسة النقش الهندسي الغريب المحفور على عظمة ترقوتها.'
      },
      {
        en: '[Step away from the pendulum]',
        id: '[Mundur dari area pendulum]',
        zh: '[从钟摆齿轮区域退步]',
        ja: '[振り子の遺体から離れる]',
        ko: '[진자 시신에서 물러난다]',
        es: '[Alejarse del péndulo]',
        fr: '[S\'éloigner du balancier]',
        de: '[Vom Pendel zurücktreten]',
        ru: '[Отойти от маятника]',
        it: '[Allontanati dal pendolo]',
        pt: '[Afastar-se do pêndulo]',
        ar: '[التراجع عن منطقة البندول]'
      }
    ]
  },

  pendulum_pry_win: {
    speaker: {
      en: 'Forensic Discovery', id: 'Penemuan Forensik', zh: '关键法医发现', ja: '決定的証拠の発見',
      ko: '결정적 증거 발견', es: 'Hallazgo Forense', fr: 'Découverte Légale', de: 'Forensischer Fund',
      ru: 'Ключевая улика', it: 'Scoperta Forense', pt: 'Descoberta Forense', ar: 'اكتشاف جنائي بالغ الأهمية'
    },
    text: {
      en: "With a sharp snap of dried tendons, her fingers yield. Resting inside her palm is a carved ivory chess piece: a Black Queen with a silver needle embedded in its base. The needle tip is stained with a bitter, sweet-smelling violet residue.",
      id: "Dengan suara retakan urat kering, jari-jemarinya meregang. Terbaring di telapak tangannya sebutir bidak catur gading: Ratu Hitam dengan jarum perak terpasang di dasarnya. Ujung jarum ternoda residu ungu berbau manis yang mematikan.",
      zh: "随着僵硬肌腱一声清脆的脱开声，她的手指终于松开。掌心里赫然躺着一枚精雕细琢的象牙黑后棋子，底部暗藏着一根银质中空细针。针尖上隐约附着一层带有苦杏仁甜腻异香的紫黑色毒素残渣。",
      ja: "乾燥した腱の鈍い音とともに、指が開いた。彼女の掌にあったのは、彫刻された象牙のチェス駒――底に銀の針が仕込まれた黒のクイーンだった。針先には甘く苦い香りを放つ紫色の残留物が付着している。",
      ko: "굳어있던 힘줄이 뚝 하는 소리와 함께 풀립니다. 그녀의 손바닥에 놓여 있던 것은 정교한 상아 체스 말, 바닥에 은침이 박힌 검은 퀸이었습니다. 바늘 끝에는 달콤하면서도 씁쓸한 보랏빛 독극물 찌꺼기가 묻어 있습니다.",
      es: "Con un crujido de tendones secos, sus dedos ceden. En su palma descansa una pieza de ajedrez de marfil: una Reina Negra con una aguja de plata en su base. La punta está manchada con un residuo violeta de olor dulzón.",
      fr: "Dans un craquement sinistre de tendons raidis, ses doigts cèdent. Au creux de sa paume repose une reine d'échecs en ivoire sombre, dissimulant une aiguille d'argent à sa base souillée d'un résidu violet à l'odeur douceâtre.",
      de: "Mit einem Knacken erstarrter Sehnen öffnen sich ihre Finger. In ihrer Hand liegt eine geschnitzte Elfenbein-Schachfigur: eine Schwarze Dame mit einer Silbernadel im Sockel, benetzt mit violettem, süßlichem Gift.",
      ru: "С сухим хрустом одеревеневшие пальцы разжимаются. На ладони лежит резная шахматная фигура из слоновой кости: Черный ферзь с тонкой серебряной иглой в основании. На кончике иглы виднеется сладковато пахнущий фиолетовый осадок.",
      it: "Con uno scricchiolio di tendini, le dita cedono. Nel palmo c'è una regina degli scacchi d'avorio intagliata: ha un ago d'argento celato nella base, macchiato da un residuo violaceo dall'odore dolciastro.",
      pt: "Com um estalo de tendões secos, os dedos cedem. Na palma descansa uma rainha de xadrez de marfim com uma agulha de prata oculta na base. A ponta está manchada com um resíduo violeta de cheiro adocicado.",
      ar: "مع صوت طقطقة أوتارها الجافة، تنفتح أصابعها. في راحة يدها قطعة شطرنج عاجية منحوتة: وزير أسود بإبرة فضية مجوفة مدمجة بقاعدتها، وطرفها ملوث ببلورات سم بنفسجية تفوح برائحة لوزية حلوة."
    },
    options: [
      {
        en: '"The killer did not use brute force. They used a parlor trick."',
        id: '"Pembunuhnya tidak memakai tenaga kasar. Mereka memakai trik ruang tamu yang licik."',
        zh: '“凶手根本不是靠蛮力行凶。这是一场精心策划的沙龙式暗杀。”',
        ja: '「犯人は腕力で殺したのではない。サロンの毒針という陰湿な手口だ。」',
        ko: '"범인은 완력을 쓰지 않았소. 살롱식 속임수 독살극이었던 거지."',
        es: '"El asesino no usó la fuerza bruta. Usó un truco de salón."',
        fr: '"L\'assassin n\'a pas usé de la force brute. C\'était un assassinat de salon."',
        de: '"Der Mörder brauchte keine rohe Gewalt. Es war ein tückisches Giftattentat."',
        ru: '«Убийца не применял грубую силу. Это было коварное салонное убийство.»',
        it: '"L\'assassino non ha usato la forza bruta. È stato un trucco velenoso da salotto."',
        pt: '"O assassino não usou força bruta. Foi um truque engenhoso de salão."',
        ar: '"القاتل لم يستخدم القوة الغاشمة بل حيلة صالونات ماكرة قاتلة."'
      }
    ]
  },

  examine_watch_start: {
    speaker: {
      en: 'The Stopped Pocket Watch', id: 'Jam Saku yang Terhenti', zh: '止步的炼金怀表', ja: '止まった懐中時計',
      ko: '멈춰 선 회중시계', es: 'El Reloj de Bolsillo Detenido', fr: 'La Montre de Poche Arrêtée', de: 'Die Stehengebliebene Taschenuhr',
      ru: 'Остановившиеся карманные часы', it: 'L\'Orologio da Taschino Fermo', pt: 'O Relógio de Bolso Parado', ar: 'ساعة الجيب المتوقفة'
    },
    text: {
      en: "Resting beside Aurelia's dropped briefcase is an exquisite alchemical pocket watch. The crystal glass is shattered, but the heavy gold casing remains intact. The hands are frozen at 03:42:18.",
      id: "Tergeletak di sebelah tas kerja Aurelia yang terjatuh adalah sebuah jam saku alkimia yang sangat indah. Kaca kristalnya hancur, namun casing emasnya masih utuh. Jarum jam terhenti membeku pada pukul 03:42:18.",
      zh: "遗落在死者公文包旁的是一枚做工巧夺天工的炼金怀表。表盘的水晶玻璃已经碎裂，但厚重的纯金外壳依旧完好。指针精确地定格在凌晨03:42:18。",
      ja: "オレリアの書類鞄の傍らに、精緻を極めた錬金術式懐中時計が転がっている。風防ガラスは砕けているが、重厚な金無垢のケースは無傷だ。針は午前03時42分18秒で凍りついている。",
      ko: "오렐리아의 서류 가방 곁에 정교하기 이를 데 없는 연금술 회중시계가 떨어져 있습니다. 유리 덮개는 박살 났지만 묵직한 금제 케이스는 온전합니다. 시곗바늘은 03:42:18에 멈춰 있습니다.",
      es: "Junto al maletín caído descansa un exquisito reloj de bolsillo alquímico. El cristal está roto, pero la caja de oro macizo está intacta. Las agujas están congeladas a las 03:42:18.",
      fr: "Près de la mallette renversée repose une montre de poche alchimique admirable. Le verre est brisé mais le boîtier en or reste intact. Les aiguilles sont figées à 03:42:18.",
      de: "Neben der Aktentasche liegt eine meisterhafte alchemistische Taschenuhr. Das Glas ist zersprungen, das Goldgehäuse intakt. Die Zeiger stehen starr auf 03:42:18 Uhr.",
      ru: "Рядом с брошенным саквояжем лежат изысканные алхимические карманные часы. Стекло разбито, но массивный золотой корпус цел. Стрелки застыли на 03:42:18.",
      it: "Accanto alla ventiquattrore caduta giace uno squisito orologio alchemico. Il vetro è in frantumi ma la cassa d'oro è intatta. Le lancette sono immobili sulle 03:42:18.",
      pt: "Ao lado da pasta caída repousa um requintado relógio alquímico. O vidro está quebrado, mas a caixa de ouro maciço está intacta. Os ponteiros congelaram em 03:42:18.",
      ar: "بجانب حقيبة أوريليا الملقاة، ترقد ساعة جيب خيميائية بالغة البراعة. زجاجها مكسور لكن غلافها الذهبي الثقيل سليم، وعقاربها متجمدة بدقة عند 03:42:18."
    },
    options: [
      {
        en: '[INTERFACING - Medium 10] Pry open the rear balance cock to inspect the escapement gears.',
        id: '[PENYELARASAN - Sedang 10] Buka tutup belakang mekanisme untuk memeriksa roda escapement.',
        zh: '[机械交互 - 难度10] 挑开后盖摆轮夹板，仔细检视内部擒纵机芯。',
        ja: '[機構連動 - 難易度10] 裏蓋のテンプ受けを開け、脱進機内部を検分する。',
        ko: '[기계 인터페이스 - 보통 10] 뒷면 밸런스 콕을 조심스레 열어 무브먼트 내부를 검사한다.',
        es: '[INTERFAZ - Medio 10] Abrir la tapa trasera para inspeccionar los engranajes.',
        fr: '[INTERACTION - Moyen 10] Ouvrir le couvercle arrière pour examiner le mécanisme.',
        de: '[VERZAHNUNG - Mittel 10] Den Unruhkloben aufhebeln und das Getriebe inspizieren.',
        ru: '[МЕХАНИКА - Сложность 10] Вскрыть заднюю крышку механизма и осмотреть шестерни.',
        it: '[INTERFACCIAMENTO - Medio 10] Apri il fondello posteriore per esaminare lo scappamento.',
        pt: '[INTERFACIAMENTO - Médio 10] Abrir a tampa traseira para inspecionar as engrenagens.',
        ar: '[التفاعل الآلي - متوسط 10] فك غطاء الميزان الخلفي لمعاينة تروس الحركة الدقيقة.'
      },
      {
        en: '[Put the watch down]',
        id: '[Kembalikan jam saku ke tempatnya]',
        zh: '[放低怀表]',
        ja: '[時計を元に戻す]',
        ko: '[회중시계를 내려놓는다]',
        es: '[Dejar el reloj]',
        fr: '[Reposer la montre]',
        de: '[Die Uhr weglegen]',
        ru: '[Отложить часы]',
        it: '[Riponi l\'orologio]',
        pt: '[Guardar o relógio]',
        ar: '[إعادة الساعة إلى مكانها]'
      }
    ]
  },

  watch_open_win: {
    speaker: {
      en: 'The Engraved Mechanism', id: 'Mekanisme Berukir Rahasia', zh: '暗刻绝密机芯', ja: '彫刻された秘密機構',
      ko: '음각된 비밀 기구', es: 'El Mecanismo Grabado', fr: 'Le Mécanisme Gravé', de: 'Das Gravierte Uhrwerk',
      ru: 'Тайный гравированный механизм', it: 'Il Meccanismo Inciso', pt: 'O Mecanismo Gravado', ar: 'آلية الحركة المنقوشة سرًا'
    },
    text: {
      en: "The gold case pops open. Engraved with a diamond scribe onto the balance wheel are three distinct numbers: [ 7 - 3 - 12 ], beneath which is etched a personal dedication: 'To my beloved Vivienne, who measured all my hours.'",
      id: "Casing emas terbuka dengan denting halus. Terukir goresan intan pada roda balance tiga angka sandi: [ 7 - 3 - 12 ], di bawahnya tertulis dedikasi pribadi: 'Untuk Vivienne tercinta, pengukur seluruh waktu hidupku.'",
      zh: "金质底盖应声弹开。用金刚石刻针在摆轮精细镌刻着三个阿拉伯数字：【 7 - 3 - 12 】，下方还刻着一段深情的题词：“献给我挚爱的薇薇安，你丈量了我一生的全部时光。”",
      ja: "金の裏蓋が小さく弾け開いた。ダイヤモンド針でテンプ輪に刻まれていたのは3つの数字――【 7 - 3 - 12 】、そしてその下には「すべての時を測りし最愛のヴィヴィアンへ」と彫られていた。",
      ko: "황금 케이스가 경쾌하게 열립니다. 밸런스 휠에 다이아몬드 조각도로 새겨진 세 자리 암호가 드러납니다: [ 7 - 3 - 12 ]. 그 아래에는 '내 모든 시간을 재어준 사랑하는 비비안에게'라는 헌사가 적혀 있습니다.",
      es: "La caja de oro se abre. Grabados con un estilete de diamante en el volante hay tres números: [ 7 - 3 - 12 ], y una dedicatoria: 'Para mi amada Vivienne, quien midió todas mis horas.'",
      fr: "Le boîtier doré s'ouvre. Gravés au diamant sur le balancier se trouvent trois chiffres : [ 7 - 3 - 12 ], et une dédicace : 'À ma bien-aimée Vivienne, qui compta chacune de mes heures.'",
      de: "Das Gehäuse springt auf. Mit einer Diamantspitze sind drei Zahlen eingraviert: [ 7 - 3 - 12 ], darunter die Widmung: 'Für meine geliebte Vivienne, die all meine Stunden zählte.'",
      ru: "Золотая крышка с щелчком откидывается. На колесе баланса алмазной иглой выбиты три цифры: [ 7 - 3 - 12 ], а ниже надпись: «Моей возлюбленной Вивьен, отмерявшей все часы моей жизни».",
      it: "La cassa d'oro scatta aperta. Incisi sul bilanciere ci sono tre numeri: [ 7 - 3 - 12 ], e una dedica: 'Alla mia amata Vivienne, che ha contato tutte le mie ore.'",
      pt: "A caixa se abre. Gravados no balanço estão três números: [ 7 - 3 - 12 ], com a dedicação: 'Para minha amada Vivienne, que mediu todas as minhas horas.'",
      ar: "ينفتح الغلاف الذهبي بنقرة رقيقة. محفور برأس ألماسي على عجلة التوازن ثلاثة أرقام شفرة: [ 7 - 3 - 12 ]، وتحتها إهداء خاص: 'إلى حبيبني فيفيان، التي وزنت كل ساعات عمري.'"
    },
    options: [
      {
        en: '"A combination code. This unlocks the floorboard safe."',
        id: '"Kode kombinasi brankas. Ini kunci untuk membuka brankas tersembunyi."',
        zh: '“这是暗格保险箱的密码。正好用来解开地板下的三位机械转盘。”',
        ja: '「金庫の暗証番号だ。これで床下の隠し金庫を開けられる。」',
        ko: '"비밀번호로군. 바닥 밑 금고를 열 수 있는 조합이다."',
        es: '"Una combinación secreta. Esto abre la caja fuerte del suelo."',
        fr: '"Une combinaison secrète. Elle déverrouille le coffre sous le plancher."',
        de: '"Ein Zahlencode. Das öffnet den Bodensafe."',
        ru: '«Шифр комбинации. Это откроет сейф под половицами.»',
        it: '"Una combinazione numerica. Apre la cassaforte sotto il pavimento."',
        pt: '"Uma combinação secreta. Isso destranca o cofre sob o piso."',
        ar: '"شفرة ثلاثية لفتح الخزنة المطمورة تحت الأرضية."'
      }
    ]
  },

  examine_safe_start: {
    speaker: {
      en: 'Concealed Floorboard Safe', id: 'Brankas Lantai Tersembunyi', zh: '地板暗格保险箱', ja: '床下の隠し金庫',
      ko: '바닥 판자 은닉 금고', es: 'Caja Fuerte Oculta bajo el Suelo', fr: 'Coffre Secret sous le Plancher', de: 'Verborgenes Bodenschließfach',
      ru: 'Тайный сейф под полом', it: 'Cassaforte Nascosta sotto il Pavimento', pt: 'Cofre Oculto sob o Assoalho', ar: 'الخزنة السرية تحت الأرضية'
    },
    text: {
      en: "Underneath greasy machine rags and spent bullet shells is a heavy cast-iron safe sunken into the floor joists. A precision alchemical three-tumbler lock secures the door.",
      id: "Di bawah kain pelumas berminyak dan selongsong peluru berserakan, terdapat sebuah brankas besi cor berat yang tertanam di balok lantai. Kunci tiga putaran presisi mengunci pintunya.",
      zh: "在油污油布与锈迹斑斑的旧弹壳遮掩下，一口厚重铸铁保险箱深深嵌死在地板龙骨之中。门上赫然装有一具精密度极高的三位炼金滚轮密码锁。",
      ja: "油まみれのウエスと薬莢の下に、床梁に埋め込まれた重厚な鋳鉄製金庫がある。精密な三連ダイヤル式の錠前がその扉を固く閉ざしている。",
      ko: "기름에 젖은 걸레와 탄피 아래, 바닥 장선 속에 매립된 묵직한 주철 금고가 드러납니다. 정밀한 3중 회전식 자물쇠가 문을 단단히 지키고 있습니다.",
      es: "Bajo trapos con grasa y casquillos usados descansa una pesada caja fuerte de hierro fundido. Una cerradura alquímica de tres cilindros protege la puerta.",
      fr: "Sous des chiffons huileux et des douilles percutées repose un coffre en fonte scellé dans le plancher. Une serrure alchimique à trois crans verrouille la porte.",
      de: "Unter öligen Putzlappen und Patronenhülsen liegt ein massiver gusseiserner Tresor im Boden. Ein dreistelliges Kombinationsschloss sichert die Tür.",
      ru: "Под замасленным тряпьем и стреляными гильзами в балки пола врезан тяжелый чугунный сейф. Дверцу блокирует точный трехдисковый алхимический замок.",
      it: "Sotto stracci bisunti e bossoli usati c'è una pesante cassaforte di ghisa incassata nel pavimento. Una serratura alchemica a tre ghiere sigilla lo sportello.",
      pt: "Sob panos engraxados e cápsulas de munição há um pesado cofre de ferro fundido embutido nas vigas. Uma trava alquímica de três cilindros sela a porta.",
      ar: "تحت خرق الزيت وفوارغ الرصاص، ترقد خزنة حديدية ثقيلة مثبتة في عوارض الأرضية موصدة بقفل خيميائي ثلاثي التروس فائق الدقة."
    },
    options: [
      {
        en: '[INPUT WATCH CODE: 7-3-12] Turn the tumblers to the numbers inscribed in Aurelia\'s pocket watch.',
        id: '[MASUKKAN KODE JAM: 7-3-12] Putar roda kombinasi ke angka yang terukir di jam saku Aurelia.',
        zh: '【输入怀表密码：7-3-12】按照奥蕾莉亚怀表摆轮上所刻的密码转动滚轮。',
        ja: '【時計の暗号入力：7-3-12】オレリアの懐中時計に刻まれていた番号へダイヤルを回す。',
        ko: '[회중시계 암호 입력: 7-3-12] 오렐리아의 회중시계에 적혀 있던 세 자리 번호로 다이얼을 돌린다.',
        es: '[INTRODUCIR CÓDIGO: 7-3-12] Girar los cilindros según el código del reloj de Aurelia.',
        fr: '[ENTRER LE CODE : 7-3-12] Aligner les crans sur les chiffres de la montre d\'Aurelia.',
        de: '[UHR-CODE EINGEBEN: 7-3-12] Die Zahlenkombination aus der Taschenuhr einstellen.',
        ru: '[ВВЕСТИ КОД ИЗ ЧАСОВ: 7-3-12] Набрать шифр, выгравированный на часах Аурелии.',
        it: '[INSERISCI CODICE: 7-3-12] Allinea le ghiere sui numeri dell\'orologio di Aurelia.',
        pt: '[INSERIR CÓDIGO: 7-3-12] Girar os cilindros para os números gravados no relógio.',
        ar: '[إدخال شفرة الساعة: 7-3-12] تدوير الأقراص وفقًا للأرقام المنقوشة في ساعة الجيب.'
      },
      {
        en: '[LOGIC - Challenging 13] Crack the alchemical combination tumbler by mechanical acoustic resonance.',
        id: '[LOGIKA - Sulit 13] Retas kombinasi brankas dengan mendengarkan resonansi akustik mekanik.',
        zh: '[逻辑 - 困难13] 贴耳细听内部簧片震颤，纯靠严密逻辑与机械声学共振破译密码。',
        ja: '[論理 - 難度13] 機械的な音響共鳴と冷徹な推論だけで金庫のダイヤルを解読する。',
        ko: '[논리 - 난이도 13] 음향 공명과 순수 논리적 연역으로 금고의 암호를 해킹한다.',
        es: '[LÓGICA - Desafiante 13] Descifrar la combinación mediante resonancia acústica.',
        fr: '[LOGIQUE - Difficile 13] Décoder la combinaison par résonance acoustique.',
        de: '[LOGIK - Schwer 13] Das Schloss durch akustische Resonanzanalyse knacken.',
        ru: '[ЛОГИКА - Сложность 13] Взломать замок по акустическому резонансу шестерен.',
        it: '[LOGICA - Impegnativo 13] Decifra la combinazione mediante risonanza acustica.',
        pt: '[LÓGICA - Desafiador 13] Decifrar a combinação por ressonância acústica mecânica.',
        ar: '[المنطق - صعب 13] فك شفرة الخزنة عبر الاستماع لرنين الميكانيكا الداخلي.'
      },
      {
        en: '[Leave safe for now]',
        id: '[Tinggalkan brankas untuk sementara]',
        zh: '[暂离保险箱]',
        ja: '[今は金庫から離れる]',
        ko: '[금고에서 잠시 물러난다]',
        es: '[Dejar la caja fuerte]',
        fr: '[S\'éloigner du coffre]',
        de: '[Den Tresor vorerst belassen]',
        ru: '[Оставить сейф]',
        it: '[Lascia la cassaforte]',
        pt: '[Deixar o cofre por enquanto]',
        ar: '[ترك الخزنة في الوقت الحالي]'
      }
    ]
  },

  safe_open_code: {
    speaker: {
      en: 'The Floorboard Safe Pops Open', id: 'Brankas Terbuka Lebar', zh: '保险箱开启', ja: '金庫の開錠',
      ko: '금고 개방', es: 'La Caja Fuerte se Abre', fr: 'Le Coffre s\'Ouvre', de: 'Der Tresor Öffnet Sich',
      ru: 'Сейф открыт', it: 'La Cassaforte si Apre', pt: 'O Cofre se Abre', ar: 'الخزنة تفتح'
    },
    text: {
      en: "CLICK-CLACK-CHUNK. The triple iron deadbolts retract with heavy grace. Inside lies the Grand Syndicate Perpetuum Ledger—thick vellum bound in black pigskin, containing detailed bribe logs, payment slips to Precinct 4 officers, and the architectural blueprints for a city-wide delay-detonation network.",
      id: "KLIK-KLAK-DEG. Tiga gerendel besi tebal tertarik ke dalam. Di dalamnya terbaring Buku Besar Perpetuum Sindikat Agung—perkamen tebal bersampul kulit babi hitam, berisi catatan suap lengkap, slip pembayaran ke perwira Distrik 4, dan cetak biru bom penunda waktu.",
      zh: "咔哒——咔——沉重的三道实心钢栓优雅收缩弹回。箱内静静躺着联合大辛迪加的《永动机密会总账簿》——用黑色鞣皮装订的厚实牛皮纸册，里面详尽记录了向第四警区各级警官行贿的汇款底单，以及一套企图在全市引发延迟连锁大爆炸的恶魔蓝图！",
      ja: "カチ、カチ、ガコン。重厚な三重ボルトが後退した。内部にあったのは大シンジケートの『永久機関カルテル秘密台帳』――黒い豚革で装丁された厚い羊皮紙に、第4分署警官への賄賂台帳と、都市全域爆破計画の青写真が記されていた。",
      ko: "철컥, 쿵. 묵직한 3중 강철 빗장이 부드럽게 풀립니다. 안에는 거대 신디케이트의 '영구기관 비밀 원장'이 들어 있었습니다. 흑색 가죽에 철해진 양피지에는 제4관할서 수뇌부 뇌물 장부와 도시 폭파 설계도가 고스란히 담겨 있었습니다.",
      es: "CLIC-CLAC-CLANK. Los tres cerrojos se retraen. Dentro descansa el Libro Mayor del Cartel Perpetuum: pergamino grueso encuadernado en cuero negro con sobornos a agentes del Distrito 4 y planos de una red de detonación retardada.",
      fr: "CLIC-CLAC-CLAC. Les pênes se rétractent lourdement. À l'intérieur repose le Grand Livre du Cartel Perpetuum : un registre contenant les preuves de corruption du District 4 et les plans d'une bombe à retardement gigantesque.",
      de: "KLACK-KLACK-RUMMS. Die Bolzen weichen zurück. Darin liegt das Hauptbuch des Perpetuum-Kartells – mit Schmiergeldlisten für Beamte von Bezirk 4 und den Bauplänen für ein verzögertes Brandbombennetz.",
      ru: "ЩЕЛК-КЛАЦ. Засовы мягко расходятся. Внутри лежит гроссбух картеля «Перпетуум» — книга в черной свиной коже с платежками продажным офицерам 4-го участка и чертежами тайного взрывного часового механизма.",
      it: "CLIC-CLAC-SDENG. I tre chiavistelli si ritraggono. All'interno giace il Mastro del Cartello Perpetuum: contiene i registri delle tangenti al Distretto 4 e i piani di una rete incendiaria a detonazione ritardata.",
      pt: "CLIQUE-CLAC. Os três ferrolhos se retraem. Dentro jaz o Livro-Razão do Cartel Perpetuum com subornos para policiais do Distrito 4 e plantas para uma rede incendiária de detonação retardada.",
      ar: "طقطقة معدنية ثقيلة... تنفتح المزالج الثلاثية. بداخلها يرقد دفتر حسابات كارتل بيربيتوم السري، متضمنًا سجلات الرشاوى المفصلة لضباط المنطقة 4 ومخططات تفجير الماكينات الكبرى."
    },
    options: [
      {
        en: '"Conclusive proof of corruption and conspiracy."',
        id: '"Bukti konklusif konspirasi dan korupsi sindikat."',
        zh: '“这是辛迪加黑幕与警局内部腐败的确凿死证。”',
        ja: '「警察内部の腐敗と陰謀の動かぬ決定的証拠だ。」',
        ko: '"부패와 거대 음모를 단죄할 결정적 물증이다."',
        es: '"Prueba concluyente de corrupción y conspiración."',
        fr: '"Preuve irréfutable de conspiration et de corruption."',
        de: '"Der endgültige Beweis für Verschwörung und Korruption."',
        ru: '«Неопровержимое доказательство коррупции и заговора.»',
        it: '"La prova definitiva di corruzione e cospirazione."',
        pt: '"Prova irrefutável de conspiração e corrupção."',
        ar: '"دليل قاطع لا يقبل الشك على الفساد والمؤامرة الكبرى."'
      }
    ]
  },

  madame_dialogue_start: {
    speaker: {
      en: 'Madame Vivienne Vance', id: 'Nyonya Vivienne Vance', zh: '薇薇安·梵斯夫人', ja: 'ヴィヴィアン・ヴァンス夫人',
      ko: '비비안 밴스 부인', es: 'Madame Vivienne Vance', fr: 'Madame Vivienne Vance', de: 'Madame Vivienne Vance',
      ru: 'Мадам Вивьен Вэнс', it: 'Madame Vivienne Vance', pt: 'Madame Vivienne Vance', ar: 'السيدة فيفيان فانس'
    },
    text: {
      en: "Madame Vance turns slowly. Her face is pale as alabaster, framed by wet raven curls and a black silk veil. 'Are you the investigator? You look... unraveled, Detective. Did you come here to solve Aurelia\'s death, or merely to gawk at our ruin?'",
      id: "Nyonya Vance berbalik perlahan. Wajahnya sepucat marmer, dibingkai rambut hitam basah dan kerudung sutra hitam. 'Apakah kamu sang penyelidik? Kamu tampak... berantakan, Detektif. Apakah kamu datang untuk memecahkan kematian Aurelia, atau sekadar menonton kehancuran kami?'",
      zh: "梵斯夫人缓缓转过身来。她的面容苍白如汉白玉雕像，湿漉漉的乌黑卷发隐没在一袭黑色薄纱之后。“你就是探长？你看上去……快要崩溃了，警官。你是来查清奥蕾莉亚的死因，还是纯粹来冷眼旁观我们的破败？”",
      ja: "ヴァンス夫人がゆっくりと振り返る。漆黒のベールに包まれた顔は白磁のように冷たい。「あなたが捜査官？ずいぶんと……擦り切れたお姿ね、刑事さん。オレリアの死を解きに来たの？それとも私たちの破滅を覗き見に来たの？」",
      ko: "밴스 부인이 천천히 돌아섭니다. 검은 면사포 너머의 얼굴은 대리석처럼 창백합니다. '당신이 수사관인가요? 꽤나... 망가진 꼴이군요, 형사님. 오렐리아의 죽음을 밝히러 오셨나요, 아니면 우리 집안의 파멸을 구경하러 오셨나요?'",
      es: "Madame Vance se gira despacio. Su rostro es pálido como el alabastro bajo su velo negro. '¿Es usted el investigador? Parece... desmoronado, detective. ¿Vino a resolver la muerte de Aurelia o sólo a contemplar nuestra ruina?'",
      fr: "Madame Vance se tourne lentement. Son visage est pâle comme l'albâtre sous son voile de crêpe. 'Êtes-vous l'enquêteur ? Vous semblez... en lambeaux, Inspecteur. Venez-vous élucider la mort d'Aurelia ou contempler nos ruines ?'",
      de: "Madame Vance dreht sich langsam um. Ihr Gesicht ist wächsern unter dem schwarzen Schleier. 'Sind Sie der Ermittler? Sie wirken... zerrüttet, Detective. Kamen Sie, um Aurelias Tod aufzuklären, oder gaffen Sie nur auf unseren Ruin?'",
      ru: "Мадам Вэнс медленно поворачивается. Ее лицо бледно, как алебастр, под черной вуалью. «Вы следователь? Вы выглядите... изможденным, детектив. Пришли раскрыть смерть Аурелии или поглазеть на наше крушение?»",
      it: "Madame Vance si volta lentamente. Il suo viso è pallido come l'alabastro sotto il velo nero. 'È lei l'investigatore? Sembra... a pezzi, detective. È venuto a risolvere la morte di Aurelia o solo a contemplare la nostra rovina?'",
      pt: "Madame Vance vira-se devagar. O rosto é pálido sob o véu negro de seda. 'Você é o investigador? Parece... em frangalhos, detetive. Veio resolver a morte de Aurelia ou apenas contemplar nossa ruína?'",
      ar: "تلتفت السيدة فانس ببطء، وجهها شاحب كالرخام تحت وشاحها الحريري الأسود: 'هل أنت المحقق؟ تبدو... ممزقًا ومشتتًا يا حضرة المحقق. هل جئت لكشف حقيقة موت أوريليا أم لمجرد التفرج على خرابنا؟'"
    },
    voices: [
      {
        voice: { en: 'Elysia', id: 'Elysia', zh: '灵觉', ja: '秘教感応', ko: '초월감각', es: 'Elisya', fr: 'Élysia', de: 'Elysia', ru: 'Элизия', it: 'Elysia', pt: 'Elísia', ar: 'إليسيا' },
        badge: { en: 'ELYSIA [Psyche]', id: 'ELYSIA [Kejiwaan]', zh: '灵觉 [心智]', ja: '霊感 [精神]', ko: '초월 [정신]', es: 'ELYSIA [Psique]', fr: 'ÉLYSIA [Psyché]', de: 'ELYSIA [Psyche]', ru: 'ЭЛИЗИЯ [Психика]', it: 'ELYSIA [Psiche]', pt: 'ELÍSIA [Psique]', ar: 'إليسيا [النفس]' },
        text: {
          en: "Her grief is a performance. Beneath the mourning crepe, her pulse is steady, rhythmic, almost mechanical. Like she is reciting lines she rehearsed in front of a dressing room mirror for a month.",
          id: "Kesedihannya hanyalah sandiwara. Di balik kerudung dukanya, denyut nadinya stabil dan teratur, nyaris mekanis. Seperti menghafal naskah yang telah ia latih di depan cermin selama sebulan penuh.",
          zh: "她的悲伤是一场精湛的剧场演出。在黑纱之下，她的脉搏平稳沉静，规律得宛如机械。就像一个在试衣间镜子前整整排练了一个月台词的职业演员。",
          ja: "彼女の悲哀は完璧な演技だ。喪服の奥で脈拍は時計仕掛けのように規則正しく打っている。1ヶ月間鏡の前で練習した台詞を朗読しているかのようだ。",
          ko: "부인의 슬픔은 잘 짜인 연극입니다. 검은 상복 아래 그녀의 맥박은 기계처럼 규칙적으로 뛰고 있습니다. 한 달 내내 거울 앞에서 연습한 대사를 읊는 배우처럼요.",
          es: "Su dolor es una actuación. Su pulso es rítmico, casi mecánico. Como si recitara líneas ensayadas ante el espejo durante un mes.",
          fr: "Son chagrin est une mise en scène. Son pouls est régulier, presque mécanique. Comme si elle récitait un rôle répété devant sa glace depuis un mois.",
          de: "Ihre Trauer ist eine Inszenierung. Ihr Puls geht ruhig und mechanisch wie ein Uhrwerk. Sie sagt Verse auf, die sie wochenlang vorm Spiegel probte.",
          ru: "Ее скорбь — отрепетированный спектакль. Пульс под вуалью ровный, почти механический. Будто она читает текст, заученный перед зеркалом.",
          it: "Il suo dolore è una recita. Il suo polso è calmo, ritmico, quasi meccanico. Come se stesse recitando battute provate allo specchio per un mese.",
          pt: "O luto dela é uma encenação. O pulso é compassado, mecânico. Como se recitasse falas ensaiadas diante do espelho por um mês.",
          ar: "حزنها مجرد تمثيلية بارعة. تحت وشاح الحداد، نبضها منتظم وهادئ كدقات ساعة، وكأنها تتلو نصوصًا تدربت عليها أمام مرآتها لشهر كامل."
        }
      }
    ],
    options: [
      {
        en: '"Where were you at 03:42 AM when the tower clock stopped?"',
        id: '"Di mana kamu berada pada pukul 03:42 saat jam menara berhenti?"',
        zh: '“凌晨03:42钟楼停摆的那一刻，你在什么地方？”',
        ja: '「時計が止まった午前3時42分、あなたはどこにいた？」',
        ko: '"시계탑이 멈춘 오전 03시 42분에 부인은 어디 있었소?"',
        es: '"¿Dónde estaba usted a las 03:42 cuando se detuvo el reloj?"',
        fr: '"Où étiez-vous à 03h42 quand l\'horloge s\'est arrêtée ?"',
        de: '"Wo waren Sie um 03:42 Uhr, als die Turmuhr stehenblieb?"',
        ru: '«Где вы были в 03:42, когда часы башни остановились?»',
        it: '"Dov\'era alle 03:42 quando l\'orologio si è fermato?"',
        pt: '"Onde você estava às 03:42 quando o relógio da torre parou?"',
        ar: '"أين كنتِ في تمام الساعة 03:42 فجرًا حين توقفت ساعة البرج؟"'
      },
      {
        en: '[EMPATHY - Medium 10] "You did not love her, did you, Madame?"',
        id: '[EMPATI - Sedang 10] "Kamu sebenarnya tidak mencintainya lagi, bukan begitu Nyonya?"',
        zh: '[同理心 - 难度10] “你其实早已不再爱她了，对吗，夫人？”',
        ja: '[共感 - 難易度10] 「あなたは彼女を愛してなどいなかった、そうですね夫人？」',
        ko: '[공감 - 보통 10] "부인은 그녀를 더 이상 사랑하지 않았지요?"',
        es: '[EMPATÍA - Medio 10] "Usted ya no la amaba, ¿verdad, Madame?"',
        fr: '[EMPATHIE - Moyen 10] "Vous ne l\'aimiez plus, n\'est-ce pas, Madame ?"',
        de: '[EMPATHIE - Mittel 10] "Sie haben sie nicht mehr geliebt, nicht wahr, Madame?"',
        ru: '[ЭМПАТИЯ - Сложность 10] «Вы ведь больше не любили ее, мадам?»',
        it: '[EMPATIA - Medio 10] "Non la amava più, non è vero, Madame?"',
        pt: '[EMPATIA - Médio 10] "Você não a amava mais, não é, Madame?"',
        ar: '[التعاطف - متوسط 10] "لم تعودي تحبينها على الإطلاق، أليس كذلك يا سيدتي؟"'
      },
      {
        en: '[RED CHECK] [AUTHORITY - Challenging 13] "Enough theatrics, Vivienne. We have the poisoned queen, the cyanide vials, and the Perpetuum ledger. You killed her."',
        id: '[UJI MERAH] [OTORITAS - Sulit 13] "Cukup sandiwaranya, Vivienne. Kami memiliki ratu catur beracun, ampul sianida, dan buku besar Perpetuum. Kamu yang membunuhnya."',
        zh: '【绝命检定】[权威 - 困难13] “闹剧该结束了，薇薇安。毒针黑后、带毒安瓿和总账簿全在我们手上。是你动的手。”',
        ja: '【赤の判定】[威信 - 難度13] 「茶番は終わりだ、ヴィヴィアン。毒のクイーンも金庫の台帳も手に入った。お前が殺したんだ。」',
        ko: '[결전 판정] [권위 - 난이도 13] "연극은 끝났소, 비비안. 독침 퀸과 금고 원장을 전부 확보했소. 당신이 죽인 거요."',
        es: '[CONTROL ROJO] [AUTORIDAD - 13] "Basta de teatro, Vivienne. Tenemos la reina envenenada y el libro mayor. Fuiste tú."',
        fr: '[TEST ROUGE] [AUTORITÉ - 13] "Assez de comédie, Vivienne. Nous avons la reine empoisonnée et le registre. C\'est vous."',
        de: '[ROTE PROBE] [AUTORITÄT - 13] "Genug Theater, Vivienne. Wir haben die giftige Dame und das Hauptbuch. Sie haben sie getötet."',
        ru: '[КРАСНАЯ ПРОВЕРКА] [АВТОРИТЕТ - 13] «Хватит спектаклей, Вивьен. У нас есть отравленный ферзь и гроссбух. Вы убили ее.»',
        it: '[PROVA ROSSA] [AUTORITÀ - 13] "Basta con la commedia, Vivienne. Abbiamo la regina avvelenata e il mastro. Sei stata tu."',
        pt: '[TESTE VERMELHO] [AUTORIDADE - 13] "Chega de teatro, Vivienne. Temos a rainha envenenada e o livro-razão. Foi você."',
        ar: '[فحص أحمر حاسم] [السلطة - صعب 13] "كفى مسرحيات يا فيفيان. ملكة الشطرنج المسمومة ودفتر الحسابات كلاهما بحوزتنا. أنتِ من قتلتها."'
      },
      {
        en: '[Step away from Madame Vance]',
        id: '[Mundur dari hadapan Nyonya Vance]',
        zh: '[暂别薇薇安夫人]',
        ja: '[未亡人から距離を置く]',
        ko: '[비비안 부인에게서 물러난다]',
        es: '[Alejarse de Madame Vance]',
        fr: '[S\'éloigner de Madame Vance]',
        de: '[Sich von Madame Vance entfernen]',
        ru: '[Отойти от мадам Вэнс]',
        it: '[Allontanati da Madame Vance]',
        pt: '[Afastar-se de Madame Vance]',
        ar: '[التراجع عن السيدة فانس]'
      }
    ]
  },

  madame_confession_win: {
    speaker: {
      en: 'The Breaking of the Ice', id: 'Runtuhnya Topeng Keheningan', zh: '坚冰碎裂之时', ja: '仮面の崩壊',
      ko: '가면의 붕괴', es: 'La Máscara se Rompe', fr: 'Le Masque se Brise', de: 'Das Brechen des Eises',
      ru: 'Крах ледяной маски', it: 'La Maschera si Infrange', pt: 'A Máscara Cai', ar: 'انهيار القناع الجليدي'
    },
    text: {
      en: "Madame Vance staggers backward against the stone arch. Tears cut through the powdered chalk on her cheeks. 'Yes! Yes, I gave her the poisoned queen! But do you know what she did when I pressed the needle into her palm? She smiled. She thanked me. She looked into my eyes and said, *The pendulum is already set, Vivienne. Thank you for freeing me from the winding.* She wanted to die! She rigged the clock so the Syndicate would never get their war machine!'",
      id: "Nyonya Vance terhuyung ke belakang menabrak lengkungan batu. Air mata membelah bedak tebal di pipinya. 'Ya! Ya, aku yang memberikan ratu beracun itu! Tapi tahukah kamu apa yang dia lakukan saat aku menusukkan jarum ke tangannya? Dia tersenyum. Dia berterima kasih padaku! Dia berkata, *Pendulum sudah disetel, Vivienne. Terima kasih telah membebaskanku dari putaran pegas ini.* Dia yang ingin mati! Dia merancang kematiannya agar Sindikat tidak mendapatkan senjata pemusnah mereka!'",
      zh: "梵斯夫人踉跄后退，单薄的背脊撞在冰冷的石拱门上。滚烫的泪水冲刷过她敷满白粉的双颊。“没错！是我……是我亲手把那枚淬毒黑后递给她的！但你知道当我把毒针刺进她手心时，她做了什么吗？她在微笑！她含着泪谢谢我！她说：‘钟摆已经校准了，薇薇安，谢谢你解开我这具活发条的折磨。’是她自己一心求死！她亲手设计停摆，就是为了不让辛迪加把她的毕生心血制成屠杀工人的战争机器！”",
      ja: "ヴァンス夫人はよろめき、石のアーチに身を預けた。涙が白粉の頬を濡らす。「そうよ！私が毒のクイーンを渡したわ！でも針を掌に刺した時、彼女がどうしたか知ってる？笑ったのよ。感謝してくれたの！『振り子はもう合わせたわ、ヴィヴィアン。私をこのゼンマイの檻から解放してくれてありがとう』ってね！彼女は死を望んでいたのよ！自分の発明がシンジケートの戦争兵器にされるのを防ぐために！」",
      ko: "밴스 부인이 휘청거리며 석조 아치 기둥에 몸을 기댑니다. 눈물이 분칠한 뺨을 타고 흘러내립니다. '그래요! 내가 그 독침 퀸을 건넸어요! 하지만 바늘을 손바닥에 찔렀을 때 그녀가 무어라 했는지 아시나요? 웃었어요. 고맙다고 했소! *진자는 이미 맞춰졌어, 비비안. 태엽 감는 삶에서 날 해방해 줘서 고마워.* 그녀는 죽기를 원했던 거예요! 신디케이트가 살인 기계를 손에 넣지 못하게 스스로를 멈춘 거요!'",
      es: "Madame Vance se tambalea contra el arco de piedra. Las lágrimas surcan sus mejillas. '¡Sí! ¡Yo le di la reina envenenada! Pero cuando clavé la aguja, ella sonrió y dijo: *El péndulo ya está listo, Vivienne. Gracias por liberarme.* ¡Ella quería morir para que el Sindicato no tuviera su arma!'",
      fr: "Madame Vance vacille contre l'arche de pierre. Des larmes coulent sur sa poudre blanche. 'Oui ! C'est moi qui lui ai donné la reine empoisonnée ! Mais elle a souri en murmurant : *Le balancier est amorcé, Vivienne. Merci de me libérer des rouages.* Elle voulait mourir pour empêcher le Syndicat d'obtenir cette machine de guerre !'",
      de: "Madame Vance taumelt gegen den Steinbogen. Tränen bahnen sich Wege durch den Puder. 'Ja! Ich gab ihr die giftige Dame! Doch als die Nadel stach, lächelte sie: *Das Pendel ist gestellt, Vivienne. Danke, dass du mich aufziehst.* Sie wollte sterben, damit das Syndikat ihre Kriegsmaschine nicht bekommt!'",
      ru: "Мадам Вэнс оседает на каменную арку. Слезы текут по напудренным щекам. «Да! Я дала ей отравленного ферзя! Но когда игла вошла в ладонь, она улыбнулась и сказала: *Маятник уже взведен, Вивьен. Спасибо, что избавила меня от завода.* Она сама хотела умереть, чтобы Синдикат не получил орудие войны!»",
      it: "Madame Vance barcolla contro l'arco di pietra. Le lacrime rigano la cipria. 'Sì! Sono stata io a darle la regina avvelenata! Ma quando l'ago è penetrato, lei ha sorriso: *Il pendolo è pronto, Vivienne. Grazie per avermi liberata.* Voleva morire affinché il Sindacato non avesse l'arma!'",
      pt: "Madame Vance cambaleia contra o arco de pedra. Lágrimas lavam seu rosto. 'Sim! Fui eu quem deu a rainha envenenada! Mas ela sorriu e disse: *O pêndulo já está regulado, Vivienne. Obrigada por me libertar.* Ela queria morrer para que o Sindicato não ficasse com sua máquina!'",
      ar: "تترنح السيدة فانس لتسند ظهرها إلى القوس الحجري. تنحدر الدموع فوق مسحوق وجهها الشاحب: 'نعم! أنا من سلمتها قطعة الشطرنج المسمومة! لكن أتعلم ماذا فعلت حين غرست الإبرة في كفها؟ لقد ابتسمت وشكرتني قائلة: *البندول مضبوط بالفعل يا فيفيان، شكرًا لتحريري من دوران التروس.* لقد أرادت الموت لمنع النقابة من تحويل ابتكارها إلى آلة حرب دمار شامل!'"
    },
    options: [
      {
        en: '[DELIVER FINAL JUDGMENT: Arrest Madame Vance for Murder Under the Law]',
        id: '[PUTUSAN AKHIR: Borgol dan Tangkap Vivienne Vance atas Nama Hukum]',
        zh: '【下达最终裁决：以杀人重罪当场逮捕薇薇安·梵斯】',
        ja: '【最終審判：法の名のもとにヴィヴィアン・ヴァンスを逮捕する】',
        ko: '[최종 판결: 법의 이름으로 비비안 밴스를 살인 혐의로 체포한다]',
        es: '[VEREDICTO FINAL: Arrestar a Madame Vance según la Ley]',
        fr: '[VERDICT FINAL : Arrêter Madame Vance au nom de la Loi]',
        de: '[URTEIL: Madame Vance im Namen des Gesetzes verhaften]',
        ru: '[ПРИГОВОР: Арестовать мадам Вэнс за убийство по букве Закона]',
        it: '[VERDETTO FINALE: Arresta Madame Vance in nome della Legge]',
        pt: '[VEREDITO FINAL: Prender Madame Vance em nome da Lei]',
        ar: '[الحكم النهائي: اعتقال السيدة فيفيان فانس بتهمة القتل بحكم القانون]'
      },
      {
        en: '[DELIVER FINAL JUDGMENT: Hide the Perpetuum Ledger and Stamp it as Accidental Death]',
        id: '[PUTUSAN AKHIR: Sembunyikan Buku Besar dan Stempel sebagai Kecelakaan Kerja]',
        zh: '【下达最终裁决：隐匿机密账簿，赦免遗孀，将此案作为纯粹工伤意外归档】',
        ja: '【最終審判：秘密台帳を隠蔽し、未亡人を救って労働災害として処理する】',
        ko: '[최종 판결: 장부를 숨기고 미망인을 방면하며 단순 산재 사고로 종결한다]',
        es: '[VEREDICTO FINAL: Ocultar el libro mayor y cerrarlo como accidente]',
        fr: '[VERDICT FINAL : Dissimuler le registre et classer l\'affaire en accident]',
        de: '[URTEIL: Das Hauptbuch verbergen und den Fall als Unfall archivieren]',
        ru: '[ПРИГОВОР: Скрыть гроссбух и списать гибель на производственную травму]',
        it: '[VERDETTO FINALE: Nascondi il mastro e archivia come incidente]',
        pt: '[VEREDITO FINAL: Ocultar o livro-razão e arquivar como acidente]',
        ar: '[الحكم النهائي: إخفاء دفتر الحسابات وإغلاق القضية كحادث عرضي برحمة]'
      },
      {
        en: '[DELIVER FINAL JUDGMENT: Expose the Syndicate and Corrupt Police to the Free Press]',
        id: '[PUTUSAN AKHIR: Bongkar Konspirasi Sindikat & Polisi Korup ke Surat Kabar Rakyat]',
        zh: '【下达最终裁决：将辛迪加罪证与警局受贿铁证公之于众，掀起风暴】',
        ja: '【最終審判：シンジケートと警察の癒着を民衆新聞へ告発し、全貌を暴く】',
        ko: '[최종 판결: 신디케이트와 경찰의 유착을 언론에 폭로하여 혁명을 촉발한다]',
        es: '[VEREDICTO FINAL: Denunciar al Sindicato y a la policía ante la prensa libre]',
        fr: '[VERDICT FINAL : Dénoncer le Syndicat et la police corrompue à la presse]',
        de: '[URTEIL: Das Syndikat und die korrupte Polizei an die freie Presse verraten]',
        ru: '[ПРИГОВОР: Передать улики на Синдикат и продажную полицию в газеты]',
        it: '[VERDETTO FINALE: Consegna le prove sulla corruzione del Sindacato alla stampa]',
        pt: '[VEREDITO FINAL: Expor o Sindicato e a polícia corrupta à imprensa livre]',
        ar: '[الحكم النهائي: فضح النقابة والشرطة الفاسدة عبر الصحافة المستقلة للرأي العام]'
      }
    ]
  },

  ending_arrest: {
    speaker: {
      en: 'The Letter of the Law', id: 'Hukum yang Kaku & Dingin', zh: '律法铁腕之裁', ja: '厳格なる法の執行',
      ko: '차가운 법의 집행', es: 'La Letra de la Ley', fr: 'La Lettre de la Loi', de: 'Der Buchstabe des Gesetzes',
      ru: 'Буква Закона', it: 'La Lettera della Legge', pt: 'A Letra da Lei', ar: 'حرفية القانون الصارم'
    },
    text: {
      en: "You snap the cold steel manacles around Vivienne Vance's wrists. Inspector Graves stares in awe and grudging respect as you hand him the poisoned ivory queen. The law has been served. Tomorrow the newspapers will proclaim the brilliance of Precinct 4. But as you walk down into the rain, you wonder if justice was truly done to a woman whose soul died thirty years ago.",
      id: "Kamu memasang borgol baja dingin di pergelangan tangan Vivienne Vance. Inspektur Graves menatap takjub bercampur hormat saat kamu menyerahkan ratu gading beracun itu kepadanya. Hukum telah ditegakkan. Besok koran akan memuji kehebatan Distrik 4. Namun saat melangkah ke dalam hujan, kamu bertanya-tanya apakah keadilan benar-benar terwujud bagi wanita yang jiwanya telah mati tiga puluh tahun lalu.",
      zh: "你将冰冷的精钢手铐扣在薇薇安·梵斯纤细的手腕上。格雷夫斯警探接过淬毒象牙黑后时，眼中流露出惊异与由衷的敬畏。法律得到了伸张，明早的各大报纸头条必将盛赞第四警区的神勇。但当你独自走入寒雨中时，心头却不禁自问：对一个灵魂早在三十年前就已死去的女人而言，这算得上真正的正义吗？",
      ja: "冷たい鋼鉄の手錠をヴィヴィアン・ヴァンスの手首に嵌めた。毒針のクイーンを受け取ったグレイヴス警部は、驚嘆と敬意の眼差しを向けた。法は守られた。明日の朝刊は第4分署の手柄を大々的に報じるだろう。だが冷雨の中を歩きながら、あなたは自問する――30年前にすでに魂が死んでいた女に対して、これが本当に正義だったのかと。",
      ko: "비비안 밴스의 손목에 차가운 강철 수갑을 채웁니다. 그레이브스 형사는 독침 퀸을 건네받으며 경외 어린 시선으로 당신을 바라봅니다. 법은 집행되었습니다. 내일 아침 조간신문은 제4관할서의 눈부신 활약을 대서특필할 것입니다. 하지만 빗속을 걸어 내려가며 당신은 스스로에게 묻습니다. 30년 전에 이미 영혼이 죽어버린 여인에게, 이것이 과จริง 정의였는지를.",
      es: "Colocas las esposas de acero en las muñecas de Vivienne. Graves te mira con respeto al recibir la reina envenenada. La ley se ha cumplido. Los periódicos elogiarán al Distrito 4, pero te preguntas si se ha hecho justicia a un alma muerta hace treinta años.",
      fr: "Vous refermez les fers glacés sur les poignets de Vivienne. Graves vous observe avec un respect mêlé de crainte. La loi a triomphé. Mais en descendant sous la pluie, vous vous demandez si justice a vraiment été rendue à une femme brisée depuis trente ans.",
      de: "Sie legen Vivienne die Handschellen an. Graves blickt Sie mit Respekt an, als Sie die giftige Dame übergeben. Das Gesetz hat gesiegt. Doch im Regen fragen Sie sich, ob einer Frau Gerechtigkeit widerfahren ist, deren Seele vor dreißig Jahren starb.",
      ru: "Вы защелкиваете стальные наручники на запястьях Вивьен. Грейвс с благоговением принимает отравленного ферзя. Закон восторжествовал. Но спускаясь под холодный дождь, вы думаете: свершилось ли правосудие над женщиной, чья душа умерла тридцать лет назад?",
      it: "Stringi le manette d'acciaio ai polsi di Vivienne. Graves ti guarda con rispetto reverenziale. La legge è stata applicata. Ma scendendo nella pioggia ti chiedi se sia stata davvero fatta giustizia a un'anima morta trent'anni prima.",
      pt: "Você fecha as algemas frias nos pulsos de Vivienne. Graves olha com respeito relutante ao receber a rainha envenenada. A lei foi cumprida, mas você se pergunta se houve justiça para uma mulher cuja alma morreu há trinta anos.",
      ar: "تطبق الأصفاد الفولاذية الباردة حول معصمي فيفيان فانس. ينظر المفتش غريفز بإجلال واحترام وهو يتسلم قطعة الشطرنج المسمومة. لقد نُفذ القانون، وغدًا ستشيد الصحف بعبقرية المنطقة 4، لكنك تتساءل في صمت تحت المطر إن كانت هذه عدالة حقيقية لامرأة ماتت روحها قبل ثلاثين عامًا."
    },
    options: [
      {
        en: '[CASE CONCLUDED: View Final Case Dossier]',
        id: '[KASUS SELESAI: Lihat Ringkasan Akhir Dossier]',
        zh: '【案情终结：查阅终卷档案与调查总结】',
        ja: '【事件解決：最終事件調書を閲覧する】',
        ko: '[사건 종결: 최종 사건 기록부 열람]',
        es: '[CASO CONCLUIDO: Ver expediente final]',
        fr: '[AFFAIRE CLASSÉE : Consulter le dossier final]',
        de: '[FALL GELÖST: Abschlussbericht ansehen]',
        ru: '[ДЕЛО ЗАКРЫТО: Просмотреть итоговое досье]',
        it: '[CASO CONCLUSO: Visualizza il dossier finale]',
        pt: '[CASO CONCLUÍDO: Ver dossiê final do caso]',
        ar: '[القضية أغلقت: استعراض ملف القضية النهائي]'
      }
    ]
  },

  ending_coverup: {
    speaker: {
      en: 'The Sovereign Bureaucrat', id: 'Sang Penentu Keadilan Moral', zh: '隐秘主权官僚', ja: '至高なる調停者',
      ko: '자비로운 조율자', es: 'El Burócrata Soberano', fr: 'Le Burocrate Souverain', de: 'Der Souveräne Bürokrat',
      ru: 'Властелин милосердия', it: 'Il Burocrate Sovrano', pt: 'O Burocrata Soberano', ar: 'مهندس الرحمة والعدالة'
    },
    text: {
      en: "You slide the Perpetuum Ledger into your inner coat pocket and slip the cyanide ampoule into your pocket. You look Graves in the eye and say, 'Industrial grease on the catwalk. Aurelia slipped. Stamp the papers.' Vivienne looks at you through her veil with tears of disbelief. You walk out into the dawn of District 7, not as an officer of the law, but as an architect of mercy.",
      id: "Kamu menyelipkan Buku Besar Perpetuum dan ampul sianida ke dalam saku mantel dalammu. Kamu menatap mata Graves dan berkata: 'Minyak mesin pada titian. Aurelia terpeleset murni kecelakaan. Stempel berkasnya.' Vivienne menatapmu dari balik kerudungnya dengan air mata kelegaan yang tak terkatakan. Kamu melangkah keluar menyambut fajar Distrik 7, bukan sebagai budak hukum tertulis, melainkan sebagai penentu belas kasih.",
      zh: "你将那份足以引发城市地震的《永动机总账簿》滑入风衣内袋，悄然收起剧毒安瓿。你直视格雷夫斯的眼睛沉声说道：“是走廊上的工业机油。奥蕾莉亚纯属失足意外。盖章结案吧。”薇薇安隔着黑纱泪流满面，难以置信地注视着你。你大步迈入第七区初升的晨光中——此时此刻，你不再是死板条文的附庸，而是执掌宽恕与仁慈的命运裁决者。",
      ja: "永久機関の秘密台帳と青酸アンプルをコートの内ポケットへ滑り込ませた。グレイヴスの目をまっすぐ見つめ、「通路の機械油だ。オレリアは足を滑らせた事故死。書類に判を押せ」と言い放つ。ヴィヴィアンは信じられない面持ちで涙を流した。あなたは第7区の夜明けの中へと歩き出す。単なる警察官としてではなく、慈悲の設計者として。",
      ko: "영구기관 비밀 장부와 청산가리 앰플을 코트 안주머니에 조용히 찔러 넣습니다. 그레이브스의 눈을 똑바로 응시하며 말합니다. '통로에 묻은 기계 기름 때문이오. 오렐리아는 발을 헛디뎌 추락했소. 도장 찍으시오.' 비비안이 눈물을 흘리며 멍하니 바라봅니다. 당신은 제7구역의 새벽빛을 향해 걸어 나갑니다. 융통성 없는 법의 집행자가 아니라, 자비의 설계자로서.",
      es: "Guardas el libro mayor y la ampolla en tu abrigo. Miras a Graves a los ojos: 'Grasa industrial en la pasarela. Accidente. Sella los papeles.' Vivienne llora de alivio. Sales al amanecer del Distrito 7, no como un autómata de la ley, sino como un arquitecto de la piedad.",
      fr: "Vous glissez le registre et l'ampoule dans votre manteau. Vous fixez Graves : 'Graisse industrielle. Chute accidentelle. Tamponnez.' Vivienne pleure de reconnaissance. Vous marchez vers l'aube du District 7, non comme un pion de la loi, mais comme un artisan de miséricorde.",
      de: "Sie stecken das Hauptbuch und die Giftampulle ein. Sie sehen Graves an: 'Maschinenfett auf dem Steg. Reiner Unfall. Stempeln Sie es ab.' Vivienne weint vor Dankbarkeit. Sie treten in den Morgen von Bezirk 7 – nicht als Diener des Gesetzes, sondern als Architekt der Gnade.",
      ru: "Вы прячете гроссбух во внутренний карман пальто. Вы смотрите Грейвсу прямо в глаза: «Машинное масло на мостках. Несчастный случай. Ставь штамп». Вивьен плачет от благодарности. Вы выходите в рассвет 7-го района не просто слугой закона, а вершителем милосердия.",
      it: "Inscatoli il mastro e l'ampolla nel cappotto. Fissi Graves: 'Olio sui camminamenti. Morte accidentale. Metti il timbro.' Vivienne piange di sollievo. Esci verso l'alba del Distretto 7, non come servo della legge, ma come architetto di misericordia.",
      pt: "Você guarda o livro-razão no casaco e encara Graves: 'Graxa na passarela. Acidente. Carimbe os papéis.' Vivienne chora de alívio. Você caminha para a aurora do Distrito 7 como um arquiteto da misericórdia.",
      ar: "تدس دفتر الحسابات وأمبول السم في جيب معطفك الداخلي. تنظر في عيني غريفز بثبات وتقول: 'شحم ماكينات على الممر، أوريليا انزلقت وماتت بحادث عرضي. اختم الأوراق.' تنهمر دموع فيفيان ممتنة. تمضي نحو فجر المنطقة 7 لا كعبد للنصوص الميتة، بل كمهندس للرحمة الحقيقية."
    },
    options: [
      {
        en: '[CASE CONCLUDED: View Final Case Dossier]',
        id: '[KASUS SELESAI: Lihat Ringkasan Akhir Dossier]',
        zh: '【案情终结：查阅终卷档案与调查总结】',
        ja: '【事件解決：最終事件調書を閲覧する】',
        ko: '[사건 종결: 최종 사건 기록부 열람]',
        es: '[CASO CONCLUIDO: Ver expediente final]',
        fr: '[AFFAIRE CLASSÉE : Consulter le dossier final]',
        de: '[FALL GELÖST: Abschlussbericht ansehen]',
        ru: '[ДЕЛО ЗАКРЫТО: Просмотреть итоговое досье]',
        it: '[CASO CONCLUSO: Visualizza il dossier finale]',
        pt: '[CASO CONCLUÍDO: Ver dossiê final do caso]',
        ar: '[القضية أغلقت: استعراض ملف القضية النهائي]'
      }
    ]
  },

  ending_syndicate_bust: {
    speaker: {
      en: 'The Revolutionary Firebrand', id: 'Api Revolusi Rakyat', zh: '燎原革命者', ja: '革命の烽火',
      ko: '혁명의 불꽃', es: 'La Chispa Revolucionaria', fr: 'L\'Étincelle Révolutionnaire', de: 'Der Revolutionäre Funke',
      ru: 'Искра Революции', it: 'La Scintilla Rivoluzionaria', pt: 'A Faísca Revolucionária', ar: 'شعلة الثورة الشعبية'
    },
    text: {
      en: "You refuse Graves's bribes and Vivienne's fatalism. At dawn, you hand the Perpetuum Ledger and the Syndicate bribery slips directly to the clandestine printing press of the District 7 Worker's Union. By midday, 50,000 gazettes hit the cobblestones. The corrupt precinct captain is ousted, the cartel's factories are paralyzed by general strike, and the truth of Aurelia Vance becomes an indelible spark of liberation.",
      id: "Kamu menolak suap Graves maupun kepasrahan Vivienne. Saat fajar menyingsing, kamu menyerahkan Buku Besar Perpetuum dan bukti suap langsung ke percetakan gelap Serikat Buruh Distrik 7. Tengah hari, 50.000 surat kabar membanjiri jalanan. Kapten korup digulingkan, pabrik kartel dilumpuhkan oleh pemogokan massal, dan kebenaran Aurelia Vance menjadi martir pembebasan rakyat.",
      zh: "你断然拒绝了格雷夫斯的分赃诱惑，也拒绝了薇薇安悲观的宿命论。黎明时分，你将《永动机总账簿》与警局受贿底单亲手递交给了第七区工人联合会的秘密地下印刷所。正午未至，五万份号外特刊铺天盖地撒满石板路！腐败的警长被当场革职查办，辛迪加财阀的军工流水线在全市总罢工中彻底瘫痪。奥蕾莉亚·梵斯的真相，化作了唤醒整座沉睡工业之城的燎原烈火！",
      ja: "あなたはグレイヴスの賄賂もヴィヴィアンの諦念も拒絶した。夜明け、永久機関の台帳と警官汚職の証拠を第7区労働組合の地下印刷所へ直接持ち込んだ。正午には5万部の号外が街中に撒かれ、腐敗した警察署長は失脚、シンジケートの兵器工場はゼネストで完全に麻痺した。オレリアの死は、解放への消えぬ火花となった。",
      ko: "당신은 그레이브스의 회유도, 비비안의 패배주의도 거부했습니다. 동틀 녘, 당신은 영구기관 장부와 경찰 수뇌부 수뢰 내역을 제7구역 노동조합의 지하 인쇄소로 직접 넘겼습니다. 정오가 되자 5만 부의 호외가 거리를 뒤덮었습니다. 부패한 서장은 쫓겨났고, 카르텔 공장은 총파업으로 마비되었으며, 오렐리아 밴스의 진실은 거대한 해방의 불씨가 되었습니다.",
      es: "Rechazas los sobornos y el fatalismo. Al alba entregas los libros a la prensa clandestina del Sindicato de Trabajadores. Al mediodía, 50.000 periódicos inundan las calles. El capitán corrupto es destituido y las fábricas del cartel son paralizadas por la huelga.",
      fr: "Vous refusez les pots-de-vin et le fatalisme. À l'aube, vous remettez les registres à l'imprimerie clandestine des travailleurs. À midi, 50 000 journaux inondent la ville. Le commissaire corrompu est déchu et la grève générale paralyse le cartel.",
      de: "Sie verweigern Schmiergelder und Fatalismus. Im Morgengrauen übergeben Sie das Hauptbuch der Gewerkschaftspresse. Am Mittag überfluten 50.000 Sonderblätter die Straßen. Der korrupte Polizeichef stürzt und die Fabriken stehen still.",
      ru: "Вы отвергаете взятки и фатализм. На рассвете вы передаете гроссбух в подпольную типографию профсоюза рабочих. К полудню 50 000 листовок наводняют город. Коррумпированное начальство смещено, заводы бастуют, а правда об Аурелии Вэнс зажигает восстание.",
      it: "Rifiuti le tangenti e il fatalismo. All'alba consegni i registri alla tipografia clandestina del sindacato operaio. A mezzogiorno 50.000 copie inondano la città, il capitano corrotto cade e lo sciopero generale paralizza il cartello.",
      pt: "Você rejeita o suborno e o fatalismo. Ao amanhecer entrega os livros à imprensa clandestina dos trabalhadores. Ao meio-dia 50.000 jornais cobrem a cidade, o capitão corrupto é deposto e a greve geral paralisa o cartel.",
      ar: "ترفض رشاوى غريفز وقدرية فيفيان. عند الفجر، تسلم دفتر الحسابات وملفات الفساد إلى المطبعة السرية لنقابة عمال المنطقة 7. بحلول الظهيرة، تنتشر خمسون ألف صحيفة في الشوارع، ويُطاح بالقادة الفاسدين وتشل مصانع الكارتل بإضراب عام تاريخي."
    },
    options: [
      {
        en: '[CASE CONCLUDED: View Final Case Dossier]',
        id: '[KASUS SELESAI: Lihat Ringkasan Akhir Dossier]',
        zh: '【案情终结：查阅终卷档案与调查总结】',
        ja: '【事件解決：最終事件調書を閲覧する】',
        ko: '[사건 종결: 최종 사건 기록부 열람]',
        es: '[CASO CONCLUIDO: Ver expediente final]',
        fr: '[AFFAIRE CLASSÉE : Consulter le dossier final]',
        de: '[FALL GELÖST: Abschlussbericht ansehen]',
        ru: '[ДЕЛО ЗАКРЫТО: Просмотреть итоговое досье]',
        it: '[CASO CONCLUSO: Visualizza il dossier finale]',
        pt: '[CASO CONCLUÍDO: Ver dossiê final do caso]',
        ar: '[القضية أغلقت: استعراض ملف القضية النهائي]'
      }
    ]
  }
};

const fullOutput = `// Aenigma Complete 12-Language Dialogue & Story Translations
// Supported: en, id, zh, ja, ko, es, fr, de, ru, it, pt, ar

export const DIALOGUE_I18N_FULL = ${JSON.stringify(DIALOGUE_DATA, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '..', 'src', 'dialogue_i18n.js'), fullOutput, 'utf8');
console.log('Successfully generated src/dialogue_i18n.js with 12 languages!');
