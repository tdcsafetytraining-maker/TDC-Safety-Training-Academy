import type { CourseLanguage, CourseLesson } from './course-catalog';

type QuizText = { q: string; a: string[] };
type QuizSet = { correct: number[]; text: Record<CourseLanguage, QuizText[]> };

export const applyTopicQuiz = (course: Record<CourseLanguage, CourseLesson>, set: QuizSet) => {
  for (const language of ['en', 'ar', 'ur', 'hi'] as CourseLanguage[]) {
    course[language].quiz = set.text[language].map((item, index) => ({ ...item, correct: set.correct[index] }));
  }
};

export const topicQuizzes: Record<'housekeeping' | 'excavation' | 'electrical' | 'loto' | 'tools' | 'hazcom' | 'emergency', QuizSet> = {
  housekeeping: {
    correct: [2, 1, 3, 0, 2],
    text: {
      en: [
        { q: 'When material is dropped more than 20 ft outside a building, what must be used?', a: ['An open bucket', 'An uncovered skip', 'An enclosed chute', 'A warning horn only'] },
        { q: 'What is the minimum barricade height around a floor opening used for debris disposal without a chute?', a: ['21 in', '42 in', '30 in', '6 ft'] },
        { q: 'What does FOD mean in this course?', a: ['Fire Operations Document', 'Field Obstruction Distance', 'Final Occupational Duty', 'Foreign Object Debris'] },
        { q: 'A small tool is missing before equipment close-up. What should happen?', a: ['Stop, search and report before close-up', 'Close it and search later', 'Replace it without reporting', 'Assume another worker has it'] },
        { q: 'How must oily or flammable waste be stored until removal?', a: ['In an open cardboard box', 'On the floor', 'In a fire-resistant covered container', 'In an uncovered plastic tray'] },
      ],
      ar: [
        { q: 'عند إسقاط مواد من ارتفاع يزيد على 20 قدماً خارج المبنى، ماذا يجب استخدامه؟', a: ['دلو مفتوح', 'حاوية مكشوفة', 'مزلق مغلق', 'بوق تحذير فقط'] },
        { q: 'ما الحد الأدنى لارتفاع الحاجز حول فتحة أرضية للتخلص من الحطام دون مزلق؟', a: ['21 بوصة', '42 بوصة', '30 بوصة', '6 أقدام'] },
        { q: 'ماذا يعني الاختصار FOD في هذه الدورة؟', a: ['وثيقة عمليات الحريق', 'مسافة عائق ميداني', 'واجب مهني نهائي', 'حطام جسم غريب'] },
        { q: 'فُقدت أداة صغيرة قبل إغلاق المعدة. ماذا يجب أن يحدث؟', a: ['أوقف العمل وابحث وأبلغ قبل الإغلاق', 'أغلق وابحث لاحقاً', 'استبدلها دون إبلاغ', 'افترض أن عاملاً آخر أخذها'] },
        { q: 'كيف تُحفظ النفايات الزيتية أو القابلة للاشتعال حتى إزالتها؟', a: ['صندوق كرتون مفتوح', 'على الأرض', 'وعاء مغطى مقاوم للحريق', 'صينية بلاستيك مكشوفة'] },
      ],
      ur: [
        { q: 'عمارت کے باہر 20 فٹ سے زیادہ اونچائی سے مواد گرانے پر کیا استعمال کرنا لازم ہے؟', a: ['کھلی بالٹی', 'کھلا skip', 'بند chute', 'صرف warning horn'] },
        { q: 'بغیر chute فرش کے disposal opening کے گرد barricade کی کم از کم اونچائی کیا ہے؟', a: ['21 انچ', '42 انچ', '30 انچ', '6 فٹ'] },
        { q: 'اس کورس میں FOD کا مطلب کیا ہے؟', a: ['Fire Operations Document', 'Field Obstruction Distance', 'Final Occupational Duty', 'Foreign Object Debris'] },
        { q: 'equipment close-up سے پہلے ایک چھوٹا tool غائب ہو تو کیا کریں؟', a: ['روکیں، تلاش کریں اور close-up سے پہلے report کریں', 'بند کرکے بعد میں تلاش کریں', 'بغیر report بدلا دیں', 'فرض کریں کسی اور کے پاس ہے'] },
        { q: 'oily یا flammable waste کو removal تک کیسے رکھیں؟', a: ['کھلے cardboard box میں', 'فرش پر', 'fire-resistant covered container میں', 'کھلی plastic tray میں'] },
      ],
      hi: [
        { q: 'भवन के बाहर 20 ft से अधिक ऊँचाई से material गिराने पर क्या उपयोग करना आवश्यक है?', a: ['खुली bucket', 'खुला skip', 'बंद chute', 'केवल warning horn'] },
        { q: 'बिना chute वाले floor disposal opening के चारों ओर barricade की न्यूनतम ऊँचाई क्या है?', a: ['21 in', '42 in', '30 in', '6 ft'] },
        { q: 'इस course में FOD का अर्थ क्या है?', a: ['Fire Operations Document', 'Field Obstruction Distance', 'Final Occupational Duty', 'Foreign Object Debris'] },
        { q: 'equipment close-up से पहले छोटा tool गायब है। क्या करना चाहिए?', a: ['रोकें, खोजें और close-up से पहले report करें', 'बंद करके बाद में खोजें', 'बिना report बदलें', 'मान लें किसी और के पास है'] },
        { q: 'oily या flammable waste को removal तक कैसे रखा जाए?', a: ['खुले cardboard box में', 'फर्श पर', 'fire-resistant covered container में', 'खुली plastic tray में'] },
      ],
    },
  },
  excavation: {
    correct: [1, 3, 2, 0, 1],
    text: {
      en: [
        { q: 'At what trench depth must a safe means of egress be provided?', a: ['2 ft', '4 ft or deeper', '5 ft only', '10 ft'] },
        { q: 'What is the maximum lateral travel to a ladder or other safe egress in a trench?', a: ['10 ft', '50 ft', '100 ft', '25 ft'] },
        { q: 'When is cave-in protection normally required?', a: ['Only below 20 ft', 'Only when soil is wet', 'At 5 ft or deeper, unless entirely stable rock or a valid under-5-ft determination applies', 'Only after a collapse'] },
        { q: 'How far must spoil and equipment normally be kept from the excavation edge?', a: ['At least 2 ft', 'Directly at the edge', '6 in', 'No minimum distance'] },
        { q: 'Who performs the daily and post-rain excavation inspection?', a: ['The equipment operator', 'A competent person', 'Any visitor', 'The flagger'] },
      ],
      ar: [
        { q: 'عند أي عمق للخندق يجب توفير وسيلة خروج آمنة؟', a: ['قدمان', '4 أقدام فأكثر', '5 أقدام فقط', '10 أقدام'] },
        { q: 'ما أقصى مسافة جانبية إلى سلم أو مخرج آمن في الخندق؟', a: ['10 أقدام', '50 قدماً', '100 قدم', '25 قدماً'] },
        { q: 'متى تلزم الحماية من الانهيار عادة؟', a: ['بعد 20 قدماً فقط', 'عندما تكون التربة مبتلة فقط', 'عند 5 أقدام فأكثر، إلا في الصخر المستقر تماماً أو قرار صحيح تحت 5 أقدام', 'بعد انهيار فقط'] },
        { q: 'كم يجب إبعاد ناتج الحفر والمعدات عن الحافة عادة؟', a: ['قدمين على الأقل', 'عند الحافة مباشرة', '6 بوصات', 'لا توجد مسافة دنيا'] },
        { q: 'من يجري فحص الحفر اليومي وبعد المطر؟', a: ['مشغل المعدة', 'شخص مختص', 'أي زائر', 'عامل الإشارة'] },
      ],
      ur: [
        { q: 'کتنی trench depth پر محفوظ egress دینا لازم ہے؟', a: ['2 فٹ', '4 فٹ یا زیادہ', 'صرف 5 فٹ', '10 فٹ'] },
        { q: 'trench میں ladder یا safe egress تک زیادہ سے زیادہ lateral travel کیا ہے؟', a: ['10 فٹ', '50 فٹ', '100 فٹ', '25 فٹ'] },
        { q: 'cave-in protection عام طور پر کب لازم ہے؟', a: ['صرف 20 فٹ سے نیچے', 'صرف گیلی soil میں', '5 فٹ یا زیادہ، سوائے مکمل stable rock یا درست under-5-ft determination', 'صرف collapse کے بعد'] },
        { q: 'spoil اور equipment کو excavation edge سے عام طور پر کتنا دور رکھنا ہے؟', a: ['کم از کم 2 فٹ', 'بالکل edge پر', '6 انچ', 'کوئی minimum نہیں'] },
        { q: 'روزانہ اور بارش کے بعد excavation inspection کون کرتا ہے؟', a: ['equipment operator', 'competent person', 'کوئی visitor', 'flagger'] },
      ],
      hi: [
        { q: 'किस trench depth पर सुरक्षित egress देना आवश्यक है?', a: ['2 ft', '4 ft या अधिक', 'केवल 5 ft', '10 ft'] },
        { q: 'trench में ladder या safe egress तक अधिकतम lateral travel कितना है?', a: ['10 ft', '50 ft', '100 ft', '25 ft'] },
        { q: 'cave-in protection सामान्यतः कब आवश्यक है?', a: ['केवल 20 ft से नीचे', 'केवल गीली soil में', '5 ft या अधिक, पूर्ण stable rock या वैध under-5-ft determination को छोड़कर', 'केवल collapse के बाद'] },
        { q: 'spoil और equipment को excavation edge से सामान्यतः कितनी दूर रखें?', a: ['कम-से-कम 2 ft', 'ठीक edge पर', '6 in', 'कोई minimum नहीं'] },
        { q: 'daily और post-rain excavation inspection कौन करता है?', a: ['equipment operator', 'competent person', 'कोई visitor', 'flagger'] },
      ],
    },
  },
  electrical: {
    correct: [2, 0, 3, 1, 2],
    text: {
      en: [
        { q: 'Which temporary construction receptacles require GFCI protection or an assured equipment-grounding program?', a: ['Only 480-V outlets', 'Only office outlets', '120-V, single-phase, 15- and 20-amp receptacles not part of permanent wiring', 'Battery chargers only'] },
        { q: 'Under an assured equipment-grounding program, when are cords and equipment visually inspected?', a: ['Before each day’s use', 'Once a year', 'Only after an injury', 'Never'] },
        { q: 'What is the usual maximum interval for required continuity and grounding tests?', a: ['Every 12 months', 'Every 9 months', 'Every 6 months for all equipment', 'Every 3 months, with a 6-month exception for fixed cords not exposed to damage'] },
        { q: 'At what voltage must live parts normally be guarded against accidental contact?', a: ['12 V', '50 V or more', '240 V only', '600 V only'] },
        { q: 'A worker is in contact with energized equipment. What is the first safe action?', a: ['Pull the worker with bare hands', 'Throw water', 'Do not touch; isolate power and call trained emergency response', 'Wait until the shift ends'] },
      ],
      ar: [
        { q: 'أي مقابس مؤقتة في الإنشاء تتطلب GFCI أو برنامج تأريض مضمون؟', a: ['مقابس 480 فولت فقط', 'مقابس المكاتب فقط', '120 فولت، طور واحد، 15 و20 أمبير وليست من التمديد الدائم', 'شواحن البطاريات فقط'] },
        { q: 'ضمن برنامج التأريض المضمون، متى تفحص الأسلاك والمعدات بصرياً؟', a: ['قبل استخدام كل يوم', 'مرة سنوياً', 'بعد إصابة فقط', 'أبداً'] },
        { q: 'ما الفترة القصوى المعتادة لاختبارات الاستمرارية والتأريض؟', a: ['كل 12 شهراً', 'كل 9 أشهر', 'كل 6 أشهر لكل المعدات', 'كل 3 أشهر، مع استثناء 6 أشهر للأسلاك الثابتة غير المعرضة للتلف'] },
        { q: 'عند أي جهد يجب عادة حراسة الأجزاء الحية من اللمس العرضي؟', a: ['12 فولت', '50 فولت فأكثر', '240 فولت فقط', '600 فولت فقط'] },
        { q: 'عامل يلامس معدة مكهربة. ما أول إجراء آمن؟', a: ['اسحبه بيدين عاريتين', 'اسكب ماء', 'لا تلمسه؛ افصل الطاقة واتصل بالاستجابة المدربة', 'انتظر نهاية الوردية'] },
      ],
      ur: [
        { q: 'کون سے temporary construction receptacles کے لیے GFCI یا assured grounding program لازم ہے؟', a: ['صرف 480-V outlets', 'صرف office outlets', '120-V single-phase 15/20-amp receptacles جو permanent wiring کا حصہ نہیں', 'صرف battery chargers'] },
        { q: 'assured grounding program میں cords/equipment کا visual inspection کب ہوتا ہے؟', a: ['ہر دن استعمال سے پہلے', 'سال میں ایک بار', 'صرف injury کے بعد', 'کبھی نہیں'] },
        { q: 'continuity اور grounding tests کا عام maximum interval کیا ہے؟', a: ['12 ماہ', '9 ماہ', 'ہر equipment کے لیے 6 ماہ', '3 ماہ؛ damage سے محفوظ fixed cords کے لیے 6 ماہ exception'] },
        { q: 'live parts کو accidental contact سے کس voltage پر guard کرنا لازم ہے؟', a: ['12 V', '50 V یا زیادہ', 'صرف 240 V', 'صرف 600 V'] },
        { q: 'worker energized equipment کے contact میں ہے۔ پہلا محفوظ عمل کیا ہے؟', a: ['ننگے ہاتھ سے کھینچیں', 'پانی ڈالیں', 'نہ چھوئیں؛ power isolate کرکے trained emergency response بلائیں', 'shift end تک انتظار'] },
      ],
      hi: [
        { q: 'कौन-से temporary construction receptacles के लिए GFCI या assured grounding program आवश्यक है?', a: ['केवल 480-V outlets', 'केवल office outlets', '120-V single-phase 15/20-amp receptacles जो permanent wiring का हिस्सा नहीं', 'केवल battery chargers'] },
        { q: 'assured grounding program में cords/equipment का visual inspection कब होता है?', a: ['हर दिन उपयोग से पहले', 'साल में एक बार', 'केवल injury के बाद', 'कभी नहीं'] },
        { q: 'continuity और grounding tests का सामान्य maximum interval क्या है?', a: ['12 महीने', '9 महीने', 'हर equipment के लिए 6 महीने', '3 महीने; damage से सुरक्षित fixed cords के लिए 6-महीने exception'] },
        { q: 'live parts को accidental contact से किस voltage पर guard करना आवश्यक है?', a: ['12 V', '50 V या अधिक', 'केवल 240 V', 'केवल 600 V'] },
        { q: 'worker energized equipment के contact में है। पहला सुरक्षित action क्या है?', a: ['नंगे हाथ से खींचें', 'पानी डालें', 'न छुएँ; power isolate कर trained emergency response बुलाएँ', 'shift end तक प्रतीक्षा'] },
      ],
    },
  },
  loto: {
    correct: [1, 2, 0, 3, 1],
    text: {
      en: [
        { q: 'Before servicing equipment, is pressing the stop button enough?', a: ['Yes, always', 'No; every hazardous energy source must be identified and isolated', 'Yes, if production approves', 'Only on night shift'] },
        { q: 'Who applies personal lockout and performs servicing under the energy-control procedure?', a: ['Affected employees', 'Visitors', 'Authorized employees', 'Customers'] },
        { q: 'What must happen after isolation and before work begins?', a: ['Release or restrain stored energy and verify isolation', 'Remove every warning tag', 'Restart briefly under load', 'Ask an affected employee to hold the stop button'] },
        { q: 'What is the proper electrical meter verification sequence described in the course?', a: ['Dead-live-dead', 'Live-live-dead', 'Dead-dead-live', 'Live-dead-live'] },
        { q: 'Who normally removes a personal lock?', a: ['Any supervisor', 'The employee who applied it', 'The next shift', 'Any authorized employee'] },
      ],
      ar: [
        { q: 'قبل صيانة المعدة، هل يكفي ضغط زر الإيقاف؟', a: ['نعم دائماً', 'لا؛ يجب تحديد وعزل كل مصدر طاقة خطرة', 'نعم بموافقة الإنتاج', 'في الوردية الليلية فقط'] },
        { q: 'من يضع القفل الشخصي وينفذ الصيانة وفق إجراء التحكم بالطاقة؟', a: ['العامل المتأثر', 'الزائر', 'العامل المصرح', 'العميل'] },
        { q: 'ماذا يجب بعد العزل وقبل بدء العمل؟', a: ['تفريغ أو تقييد الطاقة المخزنة والتحقق من العزل', 'إزالة كل بطاقات التحذير', 'إعادة التشغيل تحت الحمل', 'جعل العامل المتأثر يمسك زر الإيقاف'] },
        { q: 'ما تسلسل التحقق الصحيح لجهاز قياس الكهرباء المذكور في الدورة؟', a: ['ميت-حي-ميت', 'حي-حي-ميت', 'ميت-ميت-حي', 'حي-ميت-حي'] },
        { q: 'من يزيل القفل الشخصي عادة؟', a: ['أي مشرف', 'العامل الذي وضعه', 'الوردية التالية', 'أي عامل مصرح'] },
      ],
      ur: [
        { q: 'equipment servicing سے پہلے کیا stop button دبانا کافی ہے؟', a: ['ہاں ہمیشہ', 'نہیں؛ ہر hazardous energy source identify اور isolate کرنا لازم ہے', 'production approval پر ہاں', 'صرف night shift میں'] },
        { q: 'energy-control procedure میں personal lockout کون لگاتا اور servicing کرتا ہے؟', a: ['affected employee', 'visitor', 'authorized employee', 'customer'] },
        { q: 'isolation کے بعد اور work سے پہلے کیا لازم ہے؟', a: ['stored energy release/restrain کرکے isolation verify کریں', 'تمام warning tags ہٹا دیں', 'load پر دوبارہ start کریں', 'affected employee سے stop button پکڑوائیں'] },
        { q: 'course میں electrical meter verification کی درست sequence کیا ہے؟', a: ['dead-live-dead', 'live-live-dead', 'dead-dead-live', 'live-dead-live'] },
        { q: 'personal lock عام طور پر کون ہٹاتا ہے؟', a: ['کوئی supervisor', 'جس employee نے لگایا', 'next shift', 'کوئی authorized employee'] },
      ],
      hi: [
        { q: 'equipment servicing से पहले क्या stop button दबाना पर्याप्त है?', a: ['हाँ, हमेशा', 'नहीं; हर hazardous energy source पहचानकर isolate करना आवश्यक है', 'production approval पर हाँ', 'केवल night shift में'] },
        { q: 'energy-control procedure में personal lockout कौन लगाता और servicing करता है?', a: ['affected employee', 'visitor', 'authorized employee', 'customer'] },
        { q: 'isolation के बाद और work शुरू होने से पहले क्या आवश्यक है?', a: ['stored energy release/restrain कर isolation verify करें', 'सभी warning tags हटाएँ', 'load पर restart करें', 'affected employee से stop button पकड़वाएँ'] },
        { q: 'course में electrical meter verification का सही sequence क्या है?', a: ['dead-live-dead', 'live-live-dead', 'dead-dead-live', 'live-dead-live'] },
        { q: 'personal lock सामान्यतः कौन हटाता है?', a: ['कोई supervisor', 'जिस employee ने लगाया', 'next shift', 'कोई authorized employee'] },
      ],
    },
  },
  tools: {
    correct: [2, 1, 3, 0, 2],
    text: {
      en: [
        { q: 'What is required when compressed air is used for cleaning?', a: ['Any pressure if outdoors', 'Exactly 100 psi', 'Less than 30 psi with effective chip guarding and PPE', 'No eye protection below 50 psi'] },
        { q: 'Who may operate a powder-actuated tool?', a: ['Any worker over 18', 'A trained operator', 'Only the project manager', 'A visitor with supervision'] },
        { q: 'After a jack raises a load, what must happen immediately?', a: ['Leave it on hydraulic pressure', 'Stand beneath it to inspect', 'Increase pressure above rated capacity', 'Block or crib the load'] },
        { q: 'How often must jacks be inspected at minimum under normal service?', a: ['At least every 6 months', 'Every 5 years', 'Only after failure', 'No inspection is required'] },
        { q: 'What should happen to a tool with a cracked wheel or missing guard?', a: ['Use it slowly', 'Let a coworker try it', 'Isolate, tag and remove it from use until repaired', 'Use it only outdoors'] },
      ],
      ar: [
        { q: 'ما المطلوب عند استخدام الهواء المضغوط للتنظيف؟', a: ['أي ضغط في الخارج', '100 psi تماماً', 'أقل من 30 psi مع حراسة شظايا فعالة وPPE', 'لا تلزم حماية العين تحت 50 psi'] },
        { q: 'من يجوز له تشغيل أداة تعمل بالبارود؟', a: ['أي عامل فوق 18 سنة', 'مشغل مدرب', 'مدير المشروع فقط', 'زائر تحت الإشراف'] },
        { q: 'بعد أن ترفع الرافعة حملاً، ماذا يجب فوراً؟', a: ['تركه على الضغط الهيدروليكي', 'الوقوف تحته للفحص', 'زيادة الضغط فوق السعة', 'تدعيم الحمل بكتل أو ركائز'] },
        { q: 'ما الحد الأدنى لدورية فحص الرافعات في الخدمة العادية؟', a: ['كل 6 أشهر على الأقل', 'كل 5 سنوات', 'بعد الفشل فقط', 'لا يلزم فحص'] },
        { q: 'ماذا تفعل بأداة عجلتها متشققة أو حاجزها مفقود؟', a: ['استخدمها ببطء', 'دع زميلاً يجربها', 'اعزلها وعلّمها وأخرجها من الخدمة حتى الإصلاح', 'استخدمها خارجاً فقط'] },
      ],
      ur: [
        { q: 'cleaning کے لیے compressed air استعمال کرتے وقت کیا لازم ہے؟', a: ['باہر کوئی بھی pressure', 'بالکل 100 psi', '30 psi سے کم، effective chip guarding اور PPE کے ساتھ', '50 psi سے کم eye protection نہیں'] },
        { q: 'powder-actuated tool کون چلا سکتا ہے؟', a: ['18 سال سے بڑا کوئی worker', 'trained operator', 'صرف project manager', 'supervision والا visitor'] },
        { q: 'jack سے load اٹھانے کے فوراً بعد کیا کریں؟', a: ['hydraulic pressure پر چھوڑ دیں', 'نیچے کھڑے ہوکر inspect کریں', 'rated capacity سے زیادہ pressure', 'load کو block یا crib کریں'] },
        { q: 'normal service میں jacks کا minimum inspection interval کیا ہے؟', a: ['کم از کم ہر 6 ماہ', 'ہر 5 سال', 'صرف failure کے بعد', 'inspection لازم نہیں'] },
        { q: 'cracked wheel یا missing guard والے tool کا کیا کریں؟', a: ['آہستہ استعمال', 'coworker سے try', 'isolate/tag کرکے repair تک use سے نکالیں', 'صرف باہر استعمال'] },
      ],
      hi: [
        { q: 'cleaning के लिए compressed air उपयोग करते समय क्या आवश्यक है?', a: ['बाहर कोई भी pressure', 'ठीक 100 psi', '30 psi से कम, effective chip guarding और PPE के साथ', '50 psi से कम eye protection नहीं'] },
        { q: 'powder-actuated tool कौन चला सकता है?', a: ['18 वर्ष से बड़ा कोई worker', 'trained operator', 'केवल project manager', 'supervision वाला visitor'] },
        { q: 'jack से load उठाने के तुरंत बाद क्या करें?', a: ['hydraulic pressure पर छोड़ें', 'नीचे खड़े होकर inspect करें', 'rated capacity से अधिक pressure', 'load को block या crib करें'] },
        { q: 'normal service में jacks का minimum inspection interval क्या है?', a: ['कम-से-कम हर 6 महीने', 'हर 5 वर्ष', 'केवल failure के बाद', 'inspection आवश्यक नहीं'] },
        { q: 'cracked wheel या missing guard वाले tool का क्या करें?', a: ['धीरे उपयोग करें', 'coworker से try कराएँ', 'isolate/tag कर repair तक use से हटाएँ', 'केवल बाहर उपयोग करें'] },
      ],
    },
  },
  hazcom: {
    correct: [1, 2, 0, 3, 1],
    text: {
      en: [
        { q: 'How many sections are in the standardized Safety Data Sheet format?', a: ['8', '16', '12', '20'] },
        { q: 'Which signal word identifies the more severe hazard category?', a: ['Caution', 'Notice', 'Danger', 'Safe'] },
        { q: 'When is Hazard Communication training required?', a: ['At initial assignment and whenever a new chemical hazard is introduced', 'Only every five years', 'Only after an exposure', 'Only for supervisors'] },
        { q: 'When may a transferred chemical remain unlabeled under the immediate-use exception?', a: ['Whenever the container is small', 'When it stays overnight', 'When several workers share it', 'When the employee who transferred it uses it immediately and keeps it under personal control'] },
        { q: 'How many GHS pictograms does OSHA require under Hazard Communication?', a: ['Nine', 'Eight; the environmental pictogram is not mandatory under OSHA', 'Six', 'Four'] },
      ],
      ar: [
        { q: 'كم قسماً في الصيغة الموحدة لصحيفة بيانات السلامة SDS؟', a: ['8', '16', '12', '20'] },
        { q: 'أي كلمة تحذير تدل على فئة الخطر الأشد؟', a: ['Caution', 'Notice', 'Danger', 'Safe'] },
        { q: 'متى يلزم تدريب توصيل المخاطر الكيميائية؟', a: ['عند التعيين الأول وعند إدخال خطر كيميائي جديد', 'كل خمس سنوات فقط', 'بعد التعرض فقط', 'للمشرفين فقط'] },
        { q: 'متى يجوز أن يبقى وعاء منقول بلا ملصق وفق استثناء الاستخدام الفوري؟', a: ['إذا كان صغيراً', 'إذا بقي لليوم التالي', 'إذا شاركه عدة عمال', 'إذا استخدمه ناقل المادة فوراً وبقي تحت سيطرته الشخصية'] },
        { q: 'كم رمز GHS تفرضه OSHA في توصيل المخاطر؟', a: ['تسعة', 'ثمانية؛ رمز البيئة غير إلزامي لدى OSHA', 'ستة', 'أربعة'] },
      ],
      ur: [
        { q: 'standard Safety Data Sheet format میں کتنے sections ہیں؟', a: ['8', '16', '12', '20'] },
        { q: 'زیادہ severe hazard category کی signal word کون سی ہے؟', a: ['Caution', 'Notice', 'Danger', 'Safe'] },
        { q: 'Hazard Communication training کب لازم ہے؟', a: ['initial assignment اور نیا chemical hazard آنے پر', 'صرف ہر پانچ سال', 'صرف exposure کے بعد', 'صرف supervisors کے لیے'] },
        { q: 'immediate-use exception میں transferred chemical کب unlabeled رہ سکتا ہے؟', a: ['container چھوٹا ہو', 'رات بھر رہے', 'کئی workers share کریں', 'transfer کرنے والا employee فوراً استعمال کرے اور personal control میں رکھے'] },
        { q: 'OSHA Hazard Communication میں کتنے GHS pictograms لازم ہیں؟', a: ['نو', 'آٹھ؛ environmental pictogram OSHA میں mandatory نہیں', 'چھ', 'چار'] },
      ],
      hi: [
        { q: 'standard Safety Data Sheet format में कितने sections हैं?', a: ['8', '16', '12', '20'] },
        { q: 'अधिक severe hazard category का signal word कौन-सा है?', a: ['Caution', 'Notice', 'Danger', 'Safe'] },
        { q: 'Hazard Communication training कब आवश्यक है?', a: ['initial assignment और नया chemical hazard आने पर', 'केवल हर पाँच वर्ष', 'केवल exposure के बाद', 'केवल supervisors के लिए'] },
        { q: 'immediate-use exception में transferred chemical कब unlabeled रह सकता है?', a: ['container छोटा हो', 'रातभर रहे', 'कई workers share करें', 'transfer करने वाला employee तुरंत उपयोग करे और personal control में रखे'] },
        { q: 'OSHA Hazard Communication में कितने GHS pictograms आवश्यक हैं?', a: ['नौ', 'आठ; environmental pictogram OSHA में mandatory नहीं', 'छह', 'चार'] },
      ],
    },
  },
  emergency: {
    correct: [2, 0, 3, 1, 2],
    text: {
      en: [
        { q: 'When must an emergency action plan be kept in writing?', a: ['Only for 100 or more employees', 'Never', 'When the employer has more than 10 employees', 'Only after an emergency'] },
        { q: 'What should be done when a person is missing at the assembly point?', a: ['Report the name and last known location immediately; do not conduct an untrained search', 'Send every worker back inside', 'Wait until the next shift', 'Remove the name from the roster'] },
        { q: 'When may workers reenter after an evacuation?', a: ['When they need their tools', 'When smoke appears lighter', 'When a coworker says it is safe', 'Only after the authorized all-clear'] },
        { q: 'If a medical facility is not reasonably accessible, what must be available?', a: ['A driver only', 'A person with a valid first-aid certificate', 'A toolbox talk record', 'A fire watcher only'] },
        { q: 'When may a trained worker attempt to use a portable extinguisher?', a: ['On any size fire', 'After the escape route is blocked', 'Only on an incipient-stage fire with the correct extinguisher and a clear escape route', 'Before raising the alarm'] },
      ],
      ar: [
        { q: 'متى يجب الاحتفاظ بخطة عمل الطوارئ مكتوبة؟', a: ['عند 100 موظف فأكثر فقط', 'أبداً', 'عندما يكون لدى صاحب العمل أكثر من 10 موظفين', 'بعد الطوارئ فقط'] },
        { q: 'ماذا يُفعل عند فقد شخص في نقطة التجمع؟', a: ['أبلغ فوراً اسمه وآخر موقع معروف ولا تنفذ بحثاً دون تدريب', 'أعد جميع العمال للداخل', 'انتظر الوردية التالية', 'احذف اسمه من القائمة'] },
        { q: 'متى يجوز للعمال العودة بعد الإخلاء؟', a: ['عند الحاجة للأدوات', 'عندما يقل الدخان', 'عندما يقول زميل إنه آمن', 'بعد تصريح العودة الرسمي فقط'] },
        { q: 'إذا لم تكن منشأة طبية متاحة بشكل معقول، ماذا يجب توفيره؟', a: ['سائق فقط', 'شخص يحمل شهادة إسعافات أولية سارية', 'سجل حديث أدوات', 'مراقب حريق فقط'] },
        { q: 'متى يجوز لعامل مدرب استخدام مطفأة متنقلة؟', a: ['في حريق بأي حجم', 'بعد انسداد مسار الهروب', 'في حريق ابتدائي فقط مع المطفأة الصحيحة ومسار هروب واضح', 'قبل إطلاق الإنذار'] },
      ],
      ur: [
        { q: 'emergency action plan کب written رکھنا لازم ہے؟', a: ['صرف 100 یا زیادہ employees پر', 'کبھی نہیں', 'جب employer کے 10 سے زیادہ employees ہوں', 'صرف emergency کے بعد'] },
        { q: 'assembly point پر کوئی شخص missing ہو تو کیا کریں؟', a: ['نام اور last known location فوراً report کریں؛ untrained search نہ کریں', 'سب workers کو واپس اندر بھیجیں', 'next shift تک انتظار', 'نام roster سے نکالیں'] },
        { q: 'evacuation کے بعد workers کب reenter کر سکتے ہیں؟', a: ['tools لینے کے لیے', 'smoke کم لگے تو', 'coworker safe کہے تو', 'صرف authorized all-clear کے بعد'] },
        { q: 'medical facility reasonably accessible نہ ہو تو کیا available ہونا لازم ہے؟', a: ['صرف driver', 'valid first-aid certificate والا شخص', 'toolbox talk record', 'صرف fire watcher'] },
        { q: 'trained worker portable extinguisher کب استعمال کر سکتا ہے؟', a: ['کسی بھی size fire پر', 'escape route block ہونے کے بعد', 'صرف incipient-stage fire، correct extinguisher اور clear escape route کے ساتھ', 'alarm سے پہلے'] },
      ],
      hi: [
        { q: 'emergency action plan कब written रखना आवश्यक है?', a: ['केवल 100 या अधिक employees पर', 'कभी नहीं', 'जब employer के 10 से अधिक employees हों', 'केवल emergency के बाद'] },
        { q: 'assembly point पर कोई व्यक्ति missing हो तो क्या करें?', a: ['नाम और last known location तुरंत report करें; untrained search न करें', 'सभी workers को वापस अंदर भेजें', 'next shift तक प्रतीक्षा', 'नाम roster से हटाएँ'] },
        { q: 'evacuation के बाद workers कब reenter कर सकते हैं?', a: ['tools लेने के लिए', 'smoke कम दिखे तो', 'coworker safe कहे तो', 'केवल authorized all-clear के बाद'] },
        { q: 'medical facility reasonably accessible न हो तो क्या उपलब्ध होना आवश्यक है?', a: ['केवल driver', 'valid first-aid certificate वाला व्यक्ति', 'toolbox talk record', 'केवल fire watcher'] },
        { q: 'trained worker portable extinguisher कब उपयोग कर सकता है?', a: ['किसी भी size fire पर', 'escape route block होने के बाद', 'केवल incipient-stage fire, correct extinguisher और clear escape route के साथ', 'alarm से पहले'] },
      ],
    },
  },
};

