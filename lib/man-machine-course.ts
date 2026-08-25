import type { CourseLanguage, CourseLesson } from './course-catalog';

const refs = ['29 CFR 1926.20(b)', '29 CFR 1926.200–1926.203', '29 CFR 1926.600(a)(3)', '29 CFR 1926.602(a)(9)', '29 CFR 1926.601(b)(4)', '29 CFR 1926.600(a)(6)', '29 CFR 1926.21(b)(2); 1926.200', '29 CFR 1926.20; 1926.600–1926.602'];

export const manMachineCourse: Record<CourseLanguage, CourseLesson> = {
  en: {
    slides: [
      { n:'01', title:'Recognize the four struck-by paths', text:'A worker can be struck by a moving vehicle, swinging or rotating equipment, a falling/flying object, or an object caught between machine and structure. Before work, the competent person identifies travel routes, blind spots, swing radii, reversing areas and pinch points. The control order is: remove the conflict, physically separate people, use engineered warnings, then procedures and PPE.', ref:refs[0] },
      { n:'02', title:'Build a pedestrian-free operating zone', text:'Use barriers, designated walkways, controlled crossings and one-way routes. The exclusion distance must match the machine, speed, stopping distance, attachment, load, visibility and ground—not an invented universal number. Enter only after the operator sees you, acknowledges you, stops, lowers the attachment and gives permission. High-visibility clothing helps detection but never replaces separation.', ref:refs[1] },
      { n:'03', title:'Stay out of swing and crush zones', text:'Mark the full tail-swing and attachment-swing radius and keep workers outside. Never stand between equipment and a wall, vehicle, stockpile or excavation edge. Lower or substantially block raised blades, buckets and bodies before entry; neutralize controls, stop the motor and set brakes. Hydraulic cylinders, a raised fork or an operator holding the controls are not protective blocking.', ref:refs[2] },
      { n:'04', title:'Reverse with a working alarm or a signaler', text:'When rear view is obstructed, earthmoving/compacting equipment may reverse only with an operating alarm distinguishable from site noise or an employee signaling that it is safe. Agree signals before movement. The signaler stands where visible and outside the travel path. If the operator loses sight, receives conflicting signals or does not understand, the operator stops immediately.', ref:refs[3] },
      { n:'05', title:'Use spotters without placing them in the line of fire', text:'A motor vehicle with an obstructed rear view needs a reverse alarm audible above surrounding noise or an observer signaling safe movement. A spotter never walks backward in the machine path, squeezes between machine and fixed object, uses a phone, or performs another task. Only one designated person signals unless anyone gives an emergency stop, which the operator must obey.', ref:refs[4] },
      { n:'06', title:'Treat every overhead line as energized', text:'Until the utility confirms deenergization and the line is visibly grounded, treat it as live. For covered equipment, maintain at least 10 ft (3.1 m) from lines 50 kV or below; above 50 kV use the greater required distance. Assign a clearance observer where the operator cannot judge it. If contact occurs, workers stay away and the operator normally remains in the cab until power is isolated.', ref:refs[5] },
      { n:'07', title:'Make signals visible, understood and consistent', text:'Signs and signals must be visible when needed and removed or covered when the hazard no longer exists. Train workers on horn, hand, radio and emergency-stop meanings. Test the radio before movement and use clear identification in multi-equipment areas. Never assume language, literacy or hearing ability; confirm understanding by demonstration before work.', ref:refs[6] },
      { n:'08', title:'Stop when the separation system fails', text:'Stop for a person inside the zone, failed alarm or radio, lost eye contact, poor lighting, dust, blind corner, changed route, uncontrolled load or barrier damage. Re-plan before restarting. Workers have stop-work authority and must report near misses. Memory rule: separate, see, signal, stop—movement begins only when all four controls work.', ref:refs[7] },
    ],
    quiz:[
      {q:'When may a pedestrian enter a machine operating zone?',a:['Whenever wearing high-visibility clothing','After eye contact only','After the operator acknowledges, stops and lowers the attachment','When walking behind the spotter'],correct:2},
      {q:'The operator loses sight of the designated signaler while reversing. What must happen?',a:['Stop immediately','Continue at half speed','Sound the horn and continue','Ask another operator to watch'],correct:0},
      {q:'What is the correct universal pedestrian exclusion distance for every machine?',a:['3 m','5 m','10 m','There is none; determine it from the machine and hazard assessment'],correct:3},
      {q:'What can support a raised bucket while a worker enters beneath it?',a:['Hydraulic pressure','Substantial blocking or cribbing','The operator holding the lever','The parking brake alone'],correct:1},
      {q:'What is the normal minimum clearance for covered equipment near a line at 50 kV or below?',a:['4 ft','6 ft','10 ft (3.1 m)','15 ft'],correct:2},
    ]
  },
  ar: {
    slides:[
      {n:'01',title:'تعرّف على مسارات خطر الاصطدام الأربعة',text:'قد تصدم العامل مركبة متحركة أو معدة دوارة أو جسم ساقط/متطاير أو جسم يحصره بين الآلة والمنشأة. يحدد الشخص المختص المسارات والنقاط العمياء ونصف قطر الدوران ومناطق الرجوع والسحق. الترتيب: أزل التعارض، افصل بحاجز، استخدم الإنذار، ثم الإجراءات وPPE.',ref:refs[0]},
      {n:'02',title:'أنشئ منطقة تشغيل خالية من المشاة',text:'استخدم حواجز وممرات ومعابر مضبوطة ومسارات باتجاه واحد. تُحدد مسافة العزل حسب الآلة والسرعة ومسافة التوقف والملحق والحمل والرؤية والأرض، وليس برقم عام. لا تدخل حتى يراك المشغل ويقر بوجودك ويتوقف ويخفض الملحق ويسمح بالدخول. الملابس العاكسة ليست بديلاً للفصل.',ref:refs[1]},
      {n:'03',title:'ابتعد عن الدوران والسحق',text:'علّم كامل نصف قطر دوران الذيل والملحق. لا تقف بين المعدة وجدار أو مركبة أو كومة أو حافة حفر. اخفض أو ادعم الشفرات والجرافات قبل الدخول، وحيّد التحكم وأوقف المحرك وفعّل الفرامل. الأسطوانة الهيدروليكية أو الشوك المرفوع أو إمساك المشغل بالتحكم ليست تدعيماً.',ref:refs[2]},
      {n:'04',title:'ارجع بإنذار عامل أو موجّه',text:'عند حجب الرؤية الخلفية، لا ترجع معدة تحريك أو دمك التربة إلا بإنذار واضح أو عامل يعطي إشارة الأمان. اتفقوا على الإشارات، ويقف الموجّه مرئياً وخارج المسار. عند فقد الرؤية أو تضارب الإشارات أو عدم الفهم، يتوقف المشغل فوراً.',ref:refs[3]},
      {n:'05',title:'استخدم الموجّه دون وضعه في خط النار',text:'المركبة ذات الرؤية الخلفية المحجوبة تحتاج إنذاراً مسموعاً أو مراقباً. لا يمشي الموجّه للخلف في مسار الآلة، ولا ينحصر بينها وبين جسم ثابت، ولا يستخدم الهاتف. يرسل شخص واحد الإشارات إلا أن أي شخص يمكنه إعطاء توقف طارئ ويجب طاعته.',ref:refs[4]},
      {n:'06',title:'اعتبر كل خط علوي مكهرباً',text:'حتى تؤكد شركة الكهرباء فصل الخط وتأريضه المرئي، اعتبره حياً. حافظ على 10 أقدام (3.1 م) على الأقل حتى 50 كيلوفولت والمسافة الأكبر المطلوبة فوق ذلك. عيّن مراقب خلوص عند صعوبة الرؤية. عند التلامس يبتعد الجميع ويبقى المشغل عادة في الكابينة حتى فصل الطاقة.',ref:refs[5]},
      {n:'07',title:'اجعل الإشارات مرئية ومفهومة وثابتة',text:'تكون العلامات والإشارات مرئية عند الحاجة وتُزال أو تُغطى بعد انتهاء الخطر. درّب على معاني البوق واليد والراديو والتوقف الطارئ. اختبر الراديو وحدد هوية الآلة بوضوح. لا تفترض اللغة أو القراءة أو السمع؛ تحقق من الفهم بعرض عملي.',ref:refs[6]},
      {n:'08',title:'توقف عند فشل نظام الفصل',text:'توقف عند دخول شخص أو تعطل إنذار/راديو أو فقد التواصل البصري أو ضعف الإضاءة أو الغبار أو تغير المسار أو تلف الحاجز. أعد التخطيط قبل البدء. لكل عامل سلطة إيقاف العمل. تذكر: افصل، شاهد، أعطِ إشارة، توقف.',ref:refs[7]},
    ],
    quiz:[
      {q:'متى يدخل المشاة منطقة تشغيل الآلة؟',a:['مع سترة عاكسة','بعد التواصل البصري فقط','بعد إقرار المشغل وتوقفه وخفض الملحق','خلف الموجّه'],correct:2},
      {q:'فقد المشغل رؤية الموجّه أثناء الرجوع. ماذا يفعل؟',a:['يتوقف فوراً','يخفض السرعة','يطلق البوق ويستمر','يطلب من مشغل آخر المراقبة'],correct:0},
      {q:'ما مسافة العزل العامة الصحيحة لكل الآلات؟',a:['3 م','5 م','10 م','لا توجد؛ تحدد حسب الآلة وتقييم الخطر'],correct:3},
      {q:'ما الذي يسند جرافة مرفوعة؟',a:['الهيدروليك','تدعيم قوي','المشغل يمسك التحكم','فرامل الوقوف'],correct:1},
      {q:'الخلوص المعتاد حتى 50 كيلوفولت؟',a:['4 أقدام','6 أقدام','10 أقدام','15 قدماً'],correct:2},
    ]
  },
  ur: {
    slides:[
      {n:'01',title:'struck-by کے چار راستے پہچانیں',text:'worker کو moving vehicle، rotating equipment، falling/flying object یا machine اور structure کے درمیان چیز لگ سکتی ہے۔ competent person routes، blind spots، swing radius، reversing اور pinch points شناخت کرے۔ ترتیب: conflict ختم، physical separation، warning، پھر procedure اور PPE۔',ref:refs[0]},
      {n:'02',title:'pedestrian-free operating zone بنائیں',text:'barriers، walkways، controlled crossings اور one-way routes دیں۔ distance machine، speed، stopping distance، attachment، load، visibility اور ground سے طے ہو؛ ایک فرضی universal number نہیں۔ operator دیکھے، acknowledge کرے، stop اور attachment lower کرے تب داخل ہوں۔ hi-vis separation کا بدل نہیں۔',ref:refs[1]},
      {n:'03',title:'swing اور crush zone سے باہر رہیں',text:'tail اور attachment کا پورا swing radius mark کریں۔ machine اور wall، vehicle، stockpile یا excavation edge کے درمیان نہ کھڑے ہوں۔ raised parts lower یا substantial block کریں، controls neutral، motor بند، brakes set۔ hydraulic cylinder، raised fork یا operator کا lever پکڑنا blocking نہیں۔',ref:refs[2]},
      {n:'04',title:'reverse alarm یا signaler کے ساتھ',text:'rear view obstructed ہو تو equipment صرف واضح alarm یا safe signal دینے والے employee کے ساتھ reverse ہو۔ پہلے signals طے کریں۔ signaler visible اور travel path سے باہر ہو۔ sight کھو جائے، conflicting signal یا سمجھ نہ آئے تو operator فوراً stop کرے۔',ref:refs[3]},
      {n:'05',title:'spotter کو line of fire میں نہ رکھیں',text:'obstructed rear vehicle کو audible alarm یا observer چاہیے۔ spotter machine path میں backward نہ چلے، machine اور fixed object میں نہ آئے، phone یا دوسرا کام نہ کرے۔ صرف ایک designated signaler ہو؛ emergency stop کسی کا بھی ہو operator مانے۔',ref:refs[4]},
      {n:'06',title:'ہر overhead line کو energized سمجھیں',text:'utility کے deenergized اور visibly grounded کہنے تک line live ہے۔ 50 kV یا کم پر کم از کم 10 ft (3.1 m)، اوپر required larger distance۔ operator judge نہ کر سکے تو clearance observer ہو۔ contact پر سب دور رہیں اور operator عموماً isolation تک cab میں رہے۔',ref:refs[5]},
      {n:'07',title:'signals visible، understood اور consistent ہوں',text:'signs ضرورت پر visible اور خطرہ ختم ہونے پر remove/cover ہوں۔ horn، hand، radio اور emergency stop سکھائیں۔ movement سے پہلے radio test اور equipment identification کریں۔ language، literacy یا hearing assume نہ کریں؛ demonstration سے understanding verify کریں۔',ref:refs[6]},
      {n:'08',title:'separation system fail ہو تو stop',text:'zone میں شخص، alarm/radio failure، lost eye contact، poor light، dust، changed route، uncontrolled load یا damaged barrier پر stop کریں۔ restart سے پہلے re-plan۔ ہر worker stop-work کر سکتا ہے۔ یاد رکھیں: separate، see، signal، stop۔',ref:refs[7]},
    ],
    quiz:[
      {q:'pedestrian machine zone میں کب داخل ہو؟',a:['hi-vis کے ساتھ','صرف eye contact کے بعد','operator acknowledge، stop اور attachment lower کرے تب','spotter کے پیچھے'],correct:2},
      {q:'reversing میں signaler نظر نہ آئے؟',a:['فوراً stop','half speed','horn اور continue','دوسرا operator دیکھے'],correct:0},
      {q:'ہر machine کی universal exclusion distance؟',a:['3 m','5 m','10 m','کوئی نہیں؛ hazard assessment طے کرے'],correct:3},
      {q:'raised bucket کو کیا support کرے؟',a:['hydraulic','substantial blocking','operator lever','parking brake'],correct:1},
      {q:'50 kV یا کم line clearance؟',a:['4 ft','6 ft','10 ft','15 ft'],correct:2},
    ]
  },
  hi: {
    slides:[
      {n:'01',title:'टकराने के चार रास्ते पहचानें',text:'कर्मचारी को चलती गाड़ी, घूमता उपकरण, गिरती/उड़ती वस्तु या मशीन-संरचना के बीच वस्तु लग सकती है। सक्षम व्यक्ति मार्ग, ब्लाइंड स्पॉट, स्विंग क्षेत्र, रिवर्स और पिंच पॉइंट पहचानता है। क्रम: टकराव हटाएँ, भौतिक अलगाव, चेतावनी, फिर प्रक्रिया और PPE।',ref:refs[0]},
      {n:'02',title:'पैदल-मुक्त संचालन क्षेत्र बनाएँ',text:'अवरोध, पैदल मार्ग, नियंत्रित क्रॉसिंग और एक-दिशा मार्ग दें। दूरी मशीन, गति, रुकने की दूरी, अटैचमेंट, भार, दृश्य और जमीन से तय हो—कोई काल्पनिक सार्वभौमिक संख्या नहीं। ऑपरेटर देखे, स्वीकार करे, रुके और अटैचमेंट नीचे करे तभी प्रवेश करें। हाई-विज अलगाव नहीं है।',ref:refs[1]},
      {n:'03',title:'स्विंग और क्रश क्षेत्र से बाहर रहें',text:'पूरे टेल और अटैचमेंट स्विंग को चिह्नित करें। मशीन और दीवार, वाहन, ढेर या खुदाई किनारे के बीच न खड़े हों। उठे भाग नीचे या मजबूत ब्लॉक करें; नियंत्रण न्यूट्रल, मोटर बंद, ब्रेक लगे। हाइड्रोलिक, उठा फोर्क या ऑपरेटर का लीवर पकड़ना ब्लॉकिंग नहीं।',ref:refs[2]},
      {n:'04',title:'रिवर्स अलार्म या सिग्नलर के साथ',text:'पीछे दृश्य बाधित हो तो उपकरण केवल स्पष्ट अलार्म या सुरक्षित संकेत देने वाले कर्मचारी के साथ रिवर्स हो। संकेत पहले तय करें। सिग्नलर दिखाई दे और मार्ग से बाहर हो। दृश्य संपर्क टूटे, विरोधी संकेत मिले या समझ न आए तो तुरंत रुकें।',ref:refs[3]},
      {n:'05',title:'स्पॉटर को लाइन ऑफ फायर में न रखें',text:'बाधित पीछे दृश्य वाले वाहन को श्रव्य अलार्म या पर्यवेक्षक चाहिए। स्पॉटर मशीन मार्ग में पीछे न चले, मशीन और स्थिर वस्तु के बीच न आए, फोन या दूसरा काम न करे। एक नियुक्त सिग्नलर हो; किसी का भी आपात रोक संकेत ऑपरेटर माने।',ref:refs[4]},
      {n:'06',title:'हर ऊपर लाइन को जीवित मानें',text:'उपयोगिता के बंद और स्पष्ट ग्राउंड बताने तक लाइन जीवित है। 50 kV या कम पर कम-से-कम 10 ft (3.1 m), अधिक वोल्टेज पर बड़ी आवश्यक दूरी रखें। ऑपरेटर न आँक सके तो पर्यवेक्षक हो। संपर्क पर लोग दूर रहें और ऑपरेटर सामान्यतः अलगाव तक कैब में रहे।',ref:refs[5]},
      {n:'07',title:'संकेत दृश्य, समझे और एकसमान हों',text:'संकेत जरूरत पर दिखाई दें और खतरा समाप्त होने पर हटें/ढकें। हॉर्न, हाथ, रेडियो और आपात रोक अर्थ सिखाएँ। चलने से पहले रेडियो जाँच और मशीन पहचान करें। भाषा, पढ़ाई या सुनने की क्षमता न मानें; प्रदर्शन से समझ सत्यापित करें।',ref:refs[6]},
      {n:'08',title:'अलगाव प्रणाली विफल हो तो रोकें',text:'क्षेत्र में व्यक्ति, अलार्म/रेडियो खराब, दृश्य संपर्क खोना, कम रोशनी, धूल, बदला मार्ग, अनियंत्रित भार या टूटा अवरोध हो तो रोकें। पुनः योजना के बाद शुरू करें। हर कर्मचारी काम रोक सकता है। याद रखें: अलग, देखें, संकेत, रोकें।',ref:refs[7]},
    ],
    quiz:[
      {q:'पैदल व्यक्ति मशीन क्षेत्र में कब प्रवेश करे?',a:['हाई-विज के साथ','केवल आँख संपर्क बाद','ऑपरेटर स्वीकार, रुके और अटैचमेंट नीचे करे तब','स्पॉटर के पीछे'],correct:2},
      {q:'रिवर्स में सिग्नलर दिखना बंद हो?',a:['तुरंत रोकें','आधी गति','हॉर्न और जारी','दूसरा ऑपरेटर देखे'],correct:0},
      {q:'हर मशीन की सार्वभौमिक दूरी?',a:['3 m','5 m','10 m','कोई नहीं; खतरा आकलन तय करे'],correct:3},
      {q:'उठे बकेट का सहारा?',a:['हाइड्रोलिक','मजबूत ब्लॉकिंग','ऑपरेटर लीवर','पार्किंग ब्रेक'],correct:1},
      {q:'50 kV या कम लाइन दूरी?',a:['4 ft','6 ft','10 ft','15 ft'],correct:2},
    ]
  }
};

