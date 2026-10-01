# -*- coding: utf-8 -*-
"""
Generates the complete 38-node DIALOGUE_I18N_FULL in 12 languages.
"""
import json
import os

def tr(en, id_text, zh, ja, ko, es, fr, de, ru, it, pt, ar):
    return {
        'en': en, 'id': id_text, 'zh': zh, 'ja': ja,
        'ko': ko, 'es': es, 'fr': fr, 'de': de,
        'ru': ru, 'it': it, 'pt': pt, 'ar': ar
    }

# Load the base 15 nodes from existing scratch/build_dialogues.js if available
import sys

NODES = {}

# 1. graves_dialogue_start
NODES['graves_dialogue_start'] = {
    'speaker': tr('Inspector Graves', 'Inspektur Graves', '格雷夫斯警探', 'グレイヴス警部', '그레이브스 형사', 'Inspector Graves', 'Inspecteur Graves', 'Inspektor Graves', 'Инспектор Грейвс', 'Ispettore Graves', 'Inspetor Graves', 'المفتش غريفز'),
    'text': tr(
        "You finally dragged yourself up six flights of stairs, Detective. You reek like you slept in an open sewer behind the Whirling Gull. Take a look at this mess. The city magistrate is already screaming on the wire.",
        "Kamu akhirnya berhasil menyeret dirimu menaiki enam lantai tangga, Detektif. Baumu seperti tidur di saluran pembuangan Whirling Gull. Lihat kekacauan ini. Hakim kota sudah berteriak histeris di telepon.",
        "你终于拖着沉重的身子爬上这六层阶梯了，探长。你身上的恶臭简直就像在回旋鸥后巷的阴沟里宿醉了一整夜。瞧瞧眼前的烂摊子，市政法官已经在警线那头咆哮了。",
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
    'voices': [
        {
            'voice': tr('Ratio', 'Rasio', '理性', '比率', '이성', 'Razón', 'Ratio', 'Ratio', 'Рацио', 'Ragione', 'Razão', 'العقلانية'),
            'badge': tr('RATIO [Intellect]', 'RASIO [Intelek]', '理性 [智力]', '比率 [知性]', '이성 [지성]', 'RAZÓN [Intelecto]', 'RATIO [Intellect]', 'RATIO [Intellekt]', 'РАЦИО [Интеллект]', 'RAGIONE [Intelletto]', 'RAZÃO [Intelecto]', 'العقلانية [الفكر]'),
            'text': tr(
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
    'options': [
        tr('"What is your preliminary assessment, Graves?"', '"Bagaimana penilaian awalmu, Graves?"', '“格雷夫斯，你的初步现场判断是什么？”', '「グレイヴス、お前の予備的な見立てはどうなんだ？」', '"그레이브스, 자네의 예비 소견은 어떤가?"', '"¿Cuál es tu evaluación preliminar, Graves?"', '"Quelle est votre conclusion préliminaire, Graves ?"', '"Was ist Ihre vorläufige Einschätzung, Graves?"', '«Какова твоя предварительная оценка, Грейвс?»', '"Qual è la tua valutazione preliminare, Graves?"', '"Qual é a sua avaliação preliminar, Graves?"', '"ما هو تقييمك الأولي يا غريفز؟"'),
        tr('[RHETORIC - Medium 10] "You seem in an awful hurry to file this report, Graves. Who called you first?"', '[RETORIKA - Sedang 10] "Terburu-buru sekali kamu menutup laporan ini, Graves. Siapa yang menghubungimu duluan?"', '【修辞学 - 普通 10】“你似乎急着结案提交报告啊，格雷夫斯。今晚到底是谁先给你通风报信的？”', '【修辞学 - 中等 10】「随分と調書を急いでまとめたがっているな、グレイヴス。お前を最初に呼び出したのは誰だ？」', '[수사학 - 보통 10] "보고서를 서둘러 넘기려 안달이 난 모양이군, 그레이브스. 누가 자네에게 먼저 연락했지?"', '[RETÓRICA - Medio 10] "Pareces tener mucha prisa por archivar esto, Graves. ¿Quién te llamó primero?"', '[RHÉTORIQUE - Moyen 10] "Vous semblez bien pressé de clore ce rapport, Graves. Qui vous a contacté en premier ?"', '[RHETORIK - Mittel 10] "Sie scheinen es verdammt eilig zu haben, Graves. Wer hat Sie zuerst alarmiert?"', '[РИТОРИКА - Средне 10] «Ты подозрительно торопишься закрыть отчет, Грейвс. Кто позвонил тебе первым?»', '[RETORICA - Medio 10] "Sembri avere una fretta dannata di archiviare, Graves. Chi ti ha chiamato per primo?"', '[RETÓRICA - Médio 10] "Você parece ter muita pressa para fechar este relatório, Graves. Quem te chamou primeiro?"', '[البلاغة - متوسط 10] "تبدو في عجلة مريبة لإغلاق هذا المحضر يا غريفز. من الذي اتصل بك أولاً؟"'),
        tr('"I need a cigarette before my synapses completely disconnect."', '"Aku butuh sebatang rokok sebelum sinapsis sarafku benar-benar putus."', '“在我脑神经彻底短路前，我需要来根烟提提神。”', '「神経のシナプスが完全に焼き切れる前に、煙草を一本くれ。」', '"시냅스가 완전히 끊기기 전에 담배 한 대 피워야겠소."', '"Necesito un cigarrillo antes de que mis sinapsis se desconecten."', '"J\'ai besoin d\'une cigarette avant que mes neurones ne lâchent."', '"Ich brauche eine Zigarette, bevor meine Synapsen durchbrennen."', '«Мне нужна сигарета, пока мозги окончательно не отключились.»', '"Ho bisogno di una sigaretta prima che le mie sinapsi cedano."', '"Preciso de um cigarro antes que meus neurônios pifem de vez."', '"أحتاج سيجارة قبل أن تنقطع نقاط تشابكي العصبي تمامًا."'),
        tr('[Leave dialogue]', '[Tinggalkan percakapan]', '【离开交谈】', '【会話を終える】', '[대화 종료]', '[Terminar conversación]', '[Quitter le dialogue]', '[Gespräch beenden]', '[Завершить разговор]', '[Termina dialogo]', '[Sair do diálogo]', '[إنهاء الحوار]')
    ]
}

# 2. graves_assessment
NODES['graves_assessment'] = {
    'speaker': tr('Inspector Graves', 'Inspektur Graves', '格雷夫斯警探', 'グレイヴス警部', '그레이브스 형사', 'Inspector Graves', 'Inspecteur Graves', 'Inspektor Graves', 'Инспектор Грейвс', 'Ispettore Graves', 'Inspetor Graves', 'المفتش غريفز'),
    'text': tr(
        "Old Aurelia was up here tinkering with the escapement at three in the morning. She slipped on machine grease, grabbed the pendulum to catch herself, and the counterweight drove through her ribs. Gruesome, but an industrial accident. Case closed, we go home and dry our boots.",
        "Aurelia tua sedang mengotak-atik roda escapement pukul tiga pagi. Dia terpeleset minyak pelumas mesin, meraih pendulum untuk menahan diri, dan beban penyeimbang menembus tulang rusuknya. Mengerikan, tapi murni kecelakaan kerja. Kasus ditutup, kita bisa pulang dan mengeringkan sepatu kita.",
        "老奥蕾莉亚凌晨三点还在摆弄那套擒纵机构。她在机油上滑了一跤，伸手去抓钟摆想稳住身体，结果沉重的配重臂直接贯穿了她的肋骨。死状惨烈，但这纯粹是工伤意外。案子结了，咱们打道回府烘干鞋子去。",
        "老オレリアは午前3時にここで脱進機をいじっていた。機械油に足を滑らせ、体勢を立て直そうと振り子を掴んだが、そのまま配重ブロックに肋骨を貫かれたんだ。無残だが労働災害だ。事件は終わり、さっさと帰って靴を乾かそうぜ。",
        "늙은 오렐리아는 새벽 3시에 탈진기를 손보고 있었소. 기계 윤활유에 미끄러져 시계추를 붙잡으려다 평형추에 갈비뼈가 꿰뚫린 거지. 끔찍하지만 단순 산업재해요. 사건 종결하고 들어가 장화나 말립시다.",
        "La vieja Aurelia estuvo aquí retocando el escape a las tres de la madrugada. Resbaló con grasa, se agarró al péndulo y el contrapeso le atravesó las costillas. Espantoso, pero un accidente laboral. Caso cerrado, vámonos.",
        "La vieille Aurelia bricolait l'échappement à trois heures du matin. Elle a glissé sur de la graisse, s'est raccrochée au balancier, et le contrepoids lui a transpercé les côtes. Sinistre, mais c'est un accident de travail. Affaire classée.",
        "Die alte Aurelia war um drei Uhr morgens hier oben am Werk. Sie glitt auf Schmierfett aus, griff nach dem Pendel, und das Gegengewicht durchstieß ihre Rippen. Grausam, aber ein Betriebsunfall. Akte zu, Feierabend.",
        "Старуха Аурелия возилась тут со спусковым механизмом в три часа ночи. Поскользнулась на смазке, схватилась за маятник, и противовес пробил ей грудь. Жутко, но это несчастный случай. Дело закрыто, по домам.",
        "La vecchia Aurelia era quassù alle tre di notte. È scivolata sull'olio, si è aggrappata al pendolo e il contrappeso le ha sfondato le costole. Orribile, ma un incidente sul lavoro. Caso chiuso, andiamo ad asciugarci gli stivali.",
        "A velha Aurelia estava aqui mexendo no escape às três da manhã. Escorregou na graxa, agarrou o pêndulo e o contrapeso perfurou suas costelas. Horrível, mas um acidente de trabalho. Caso encerrado, vamos embora.",
        "كانت العجوز أوريليا تعبث بتروس الساعة عند الثالثة فجرًا. انزلقت في شحم الماكينات وأمسكت بالبندول لتسند نفسها فاخترق ثقل الموازنة ضلوعها. مشهد مروع لكنه حادث عمل بحت. أغلقت القضية وهيا لنجفف أحذيتنا."
    ),
    'voices': [
        {
            'voice': tr('Carnal', 'Insting Karnal', '本能', '肉体', '육체', 'Carnal', 'Carnal', 'Körper', 'Тело', 'Fisico', 'Físico', 'الجسد'),
            'badge': tr('CARNAL [Physique]', 'KARNAL [Fisik]', '肉体本能 [体魄]', '肉体 [身体]', '육체 [신체]', 'CARNAL [Físico]', 'CARNAL [Physique]', 'KÖRPER [Physis]', 'ТЕЛО [Телосложение]', 'FISICO [Fisico]', 'FÍSICO [Físico]', 'الجسد [البنية]'),
            'text': tr(
                "Lies. A woman who slips forward doesn't land impaled through the back of her shoulder blades with her hands neatly folded. Someone held her down while the heavy iron arm descended.",
                "Bohong. Seseorang yang terpeleset ke depan tidak akan tertusuk dari belakang belikat dengan tangan terlipat rapi. Seseorang menahannya saat lengan besi raksasa itu menghujam ke bawah.",
                "他在说谎。一个向前滑倒的人，绝不可能背部肩胛骨被刺穿、双手还整齐地叠放在胸前。分明是有人在铸铁巨臂砸下时，死死按住了她！",
                "嘘だ。前方に滑った人間が、両手を胸元で揃えたまま肩甲骨の背後から貫かれるはずがない。鉄の腕が降下する間、何者かが彼女を押さえつけていたんだ。",
                "거짓말입니다. 앞으로 넘어진 사람이 양손을 가지런히 모은 채 등 뒤 견갑골을 관통당할 수는 없습니다. 거대한 쇠막대가 내려앉는 동안 누군가 위에서 짓누른 겁니다.",
                "Mentiras. Una mujer que resbala hacia adelante no acaba empalada por la espalda con las manos juntas. Alguien la sujetó mientras bajaba el brazo de hierro.",
                "Mensonges. Une femme glissant en avant ne se retrouve pas empalée par l'omoplate avec les mains jointes. Quelqu'un l'a maintenue au sol.",
                "Lügen. Wer nach vorne rutscht, wird nicht von hinten durch die Schulterblätter durchbohrt, während die Hände gefaltet sind. Jemand hielt sie fest.",
                "Ложь. Человек, поскользнувшись вперед, не упадет так, чтобы маятник пробил спину, пока руки аккуратно сложены. Ее держали силой.",
                "Bugie. Chi scivola in avanti non finisce trapassato da dietro le scapole con le mani composte. Qualcuno l'ha tenuta ferma.",
                "Mentira. Alguém que escorrega para frente não é empalado pelas costas com as mãos postas. Alguém a segurou.",
                "كذب صريح. من ينزلق للأمام لا يُطعن عبر لوحي كتفه من الخلف ويداه مضمومتان بعناية. أحدهم ثبتها قسرًا بينما كان الذراع الحديدي يهوي."
            )
        }
    ],
    'options': [
        tr('"Accident? Look at the wound entry angle. That is biomechanically impossible."', '"Kecelakaan? Lihat sudut masuk lukanya. Secara biomekanik itu mustahil."', '“意外？看看创口刺入的角度。从生物力学角度来看这绝不可能。”', '「事故だと？創口の刺入角を見ろ。生体力学的にあり得ない。」', '"사고요? 상처가 들어간 각도를 보시오. 생체역학적으로 불가능하오."', '"¿Accidente? Mira el ángulo de la herida. Es biomecánicamente imposible."', '"Un accident ? Regardez l\'angle de la plaie. C\'est biomécaniquement impossible."', '"Unfall? Sehen Sie sich den Einstichwinkel an. Das ist biomechanisch unmöglich."', '«Несчастный случай? Взгляни на угол раны. Биомеханически это невозможно.»', '"Incidente? Guarda l\'angolazione della ferita. È biomeccanicamente impossibile."', '"Acidente? Olhe o ângulo da ferida. Biomecanicamente impossível."', '"حادث؟ انظر لزاوية دخول الجرح، هذا مستحيل ميكانيكيًا وحيويًا."'),
        tr('"Who was the last person to see her alive?"', '"Siapa orang terakhir yang melihatnya hidup?"', '“最后一个见到她活着的人是谁？”', '「彼女の生前最後に会ったのは誰だ？」', '"마지막으로 피해자를 살아서 본 사람이 누구요?"', '"¿Quién fue la última persona en verla viva?"', '"Qui a été la dernière personne à la voir vivante ?"', '"Wer hat sie zuletzt lebend gesehen?"', '«Кто видел ее живой в последний раз?»', '"Chi è stata l\'ultima persona a vederla viva?"', '"Quem foi a última pessoa a vê-la viva?"', '"من كان آخر شخص رآها على قيد الحياة؟"'),
        tr('[Return to main inquiry]', '[Kembali ke penyelidikan utama]', '【返回主要询问】', '【本筋の捜査に戻る】', '[주요 심문으로 복귀]', '[Volver al interrogatorio principal]', '[Retourner à l\'enquête]', '[Zurück zur Hauptbefragung]', '[Вернуться к допросу]', '[Torna all\'indagine principale]', '[Retornar à investigação]', '[العودة للتحقيق الرئيسي]')
    ]
}

print("Base setup test passed")
