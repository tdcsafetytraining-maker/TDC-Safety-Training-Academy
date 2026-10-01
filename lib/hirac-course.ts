import type { CourseLanguage, CourseLesson } from './course-catalog';

type Lang = CourseLanguage | 'bn';
type Pack = { slides: Array<[string, string]>; quiz: Array<{ q: string; a: string[] }> };

const refs = [
  'ISO 45001:2018, 6.1.2.1; TDC and project risk-management procedures',
  'ISO 45001:2018, 6.1.2.1; applicable Saudi, client and project requirements',
  'ISO 45001:2018, 6.1.2.2; TDC risk-assessment matrix',
  'ISO 45001:2018, 6.1.2.2; TDC risk-assessment procedure',
  'ISO 45001:2018, 8.1.2; hierarchy of controls',
  'ISO 45001:2018, 5.4 and 7.2; worker consultation and competence',
  'TDC permit-to-work, method-statement and risk-assessment procedures',
  'ISO 45001:2018, 6.1.2 and 10.2; management of change and review',
];
const correct = [1, 2, 3, 0, 2];

const packs: Record<Lang, Pack> = {
  en: {
    slides: [
      ['Start with the task and work area', 'Break the job into clear steps before work starts. Define who may be harmed, where the work will happen, the equipment and substances involved, interfaces with other activities, and normal, abnormal and emergency conditions.'],
      ['Identify hazards systematically', 'Inspect the workplace and ask what can cause harm. Consider falls, moving equipment, stored energy, electricity, fire, chemicals, dust, noise, heat, manual handling, poor access, simultaneous operations and human factors. Include routine and non-routine work.'],
      ['Assess risk before selecting controls', 'For each hazard, identify credible consequences and exposed people. Use the approved TDC or project matrix to rate likelihood and severity, determine the initial risk, and follow the required approval or escalation level. Do not change matrix definitions to make a risk appear acceptable.'],
      ['Use evidence, not guesswork', 'Base ratings on site conditions, exposure frequency, workforce competence, incident history, equipment condition and existing controls. Record assumptions and uncertainty. A severe credible consequence must not be dismissed only because it has not happened before.'],
      ['Apply the hierarchy of controls', 'Select controls in this order: eliminate the hazard, substitute a safer option, use engineering controls, use administrative or work-practice controls, then PPE. Combine controls where one measure is not enough, and never use PPE as the automatic first choice.'],
      ['Consult the people who do the work', 'Involve workers, supervisors, HSE personnel and relevant specialists. Confirm that the controls are practical, understood and compatible with the task. Communicate the assessment in a language and form the workforce understands, and allow questions or stop-work concerns.'],
      ['Authorize work only after controls are ready', 'Link the risk assessment to the method statement, permit, isolation plan, lifting plan or other required documents. Assign each control to an owner, verify it at the workface, brief the team, and calculate residual risk only after the controls are in place.'],
      ['Review when conditions change', 'Stop and reassess after a change in scope, people, equipment, materials, weather, location, sequence or simultaneous operations; after an incident or near miss; or when a control fails. Record revisions and verify controls throughout the job.'],
    ],
    quiz: [
      { q: 'What should be done before hazards are rated?', a: ['Select PPE', 'Break the job into steps and identify who may be harmed', 'Approve the permit', 'Calculate residual risk'] },
      { q: 'Which statement best describes systematic hazard identification?', a: ['Review only previous injuries', 'Consider only routine work', 'Consider normal, abnormal and emergency conditions, including non-routine work', 'List only hazards visible in photographs'] },
      { q: 'When should residual risk be calculated?', a: ['Before controls are selected', 'After the toolbox talk only', 'After selected controls are implemented and verified', 'Only after the job is complete'] },
      { q: 'Which control is generally the strongest?', a: ['Eliminate the hazard', 'Issue additional PPE', 'Post a warning sign', 'Repeat the instruction'] },
      { q: 'What requires the risk assessment to be reviewed?', a: ['The document is one week old', 'A different supervisor reads it', 'The scope, conditions or controls change, or an incident/near miss occurs', 'The initial risk is low'] },
    ],
  },
  ar: {
    slides: [
      ['ابدأ بالمهمة ومنطقة العمل', 'قسّم العمل إلى خطوات واضحة قبل البدء. حدد من قد يتضرر، ومكان العمل، والمعدات والمواد المستخدمة، والتداخل مع الأنشطة الأخرى، والحالات العادية وغير العادية والطارئة.'],
      ['حدد الأخطار بطريقة منهجية', 'افحص موقع العمل واسأل ما الذي قد يسبب الضرر. ضع في الاعتبار السقوط والمعدات المتحركة والطاقة المخزنة والكهرباء والحريق والمواد الكيميائية والغبار والضوضاء والحرارة والمناولة اليدوية وصعوبة الوصول والأعمال المتزامنة والعوامل البشرية.'],
      ['قيّم المخاطر قبل اختيار الضوابط', 'حدد لكل خطر العواقب المحتملة والأشخاص المعرضين. استخدم مصفوفة TDC أو المشروع المعتمدة لتقييم الاحتمالية والشدة وتحديد الخطر الأولي ومستوى الاعتماد أو التصعيد المطلوب. لا تغيّر تعريفات المصفوفة لجعل الخطر مقبولاً.'],
      ['استخدم الأدلة لا التخمين', 'استند إلى ظروف الموقع وتكرار التعرض وكفاءة العاملين وسجل الحوادث وحالة المعدات والضوابط الحالية. سجل الافتراضات وعدم اليقين، ولا تستبعد عاقبة خطيرة موثوقة لمجرد أنها لم تحدث من قبل.'],
      ['طبّق التسلسل الهرمي للضوابط', 'اختر الضوابط بالترتيب: إزالة الخطر، الاستبدال بخيار أكثر أماناً، الضوابط الهندسية، الضوابط الإدارية أو ممارسات العمل، ثم معدات الوقاية الشخصية. اجمع أكثر من ضابط عند الحاجة ولا تجعل PPE الخيار الأول تلقائياً.'],
      ['استشر من ينفذون العمل', 'أشرك العمال والمشرفين وفريق HSE والمتخصصين المعنيين. تأكد أن الضوابط عملية ومفهومة ومتوافقة مع المهمة، واشرح التقييم بلغة وصيغة يفهمها العاملون مع إتاحة الأسئلة وإيقاف العمل.'],
      ['لا تصرح بالعمل قبل تجهيز الضوابط', 'اربط تقييم المخاطر بطريقة العمل والتصريح وخطة العزل أو الرفع والوثائق المطلوبة. عيّن مسؤولاً لكل ضابط وتحقق منه في موقع العمل وأجرِ الإحاطة، ثم احسب الخطر المتبقي بعد تطبيق الضوابط.'],
      ['راجع التقييم عند تغير الظروف', 'أوقف العمل وأعد التقييم عند تغير النطاق أو الأشخاص أو المعدات أو المواد أو الطقس أو الموقع أو التسلسل أو الأعمال المتزامنة، وبعد حادث أو حادث وشيك أو فشل ضابط. وثق التعديلات وتحقق من الضوابط أثناء العمل.'],
    ],
    quiz: [
      { q: 'ما الذي يجب عمله قبل تقييم مستوى الأخطار؟', a: ['اختيار PPE', 'تقسيم العمل إلى خطوات وتحديد من قد يتضرر', 'اعتماد التصريح', 'حساب الخطر المتبقي'] },
      { q: 'ما أفضل وصف للتحديد المنهجي للأخطار؟', a: ['مراجعة الإصابات السابقة فقط', 'دراسة العمل الروتيني فقط', 'دراسة الحالات العادية وغير العادية والطارئة والعمل غير الروتيني', 'تسجيل الأخطار الظاهرة في الصور فقط'] },
      { q: 'متى يُحسب الخطر المتبقي؟', a: ['قبل اختيار الضوابط', 'بعد اجتماع التوعية فقط', 'بعد تطبيق الضوابط المختارة والتحقق منها', 'بعد انتهاء العمل فقط'] },
      { q: 'أي ضابط هو الأقوى عادة؟', a: ['إزالة الخطر', 'إصدار PPE إضافي', 'وضع علامة تحذير', 'تكرار التعليمات'] },
      { q: 'متى يجب مراجعة تقييم المخاطر؟', a: ['بعد مرور أسبوع', 'عندما يقرأه مشرف آخر', 'عند تغير النطاق أو الظروف أو الضوابط أو وقوع حادث أو حادث وشيك', 'عندما يكون الخطر الأولي منخفضاً'] },
    ],
  },
  ur: {
    slides: [
      ['کام اور کام کی جگہ سے آغاز کریں', 'کام شروع ہونے سے پہلے اسے واضح مراحل میں تقسیم کریں۔ طے کریں کون متاثر ہو سکتا ہے، کام کہاں ہوگا، کون سا سامان اور مواد استعمال ہوگا، دوسرے کاموں سے کیا تعلق ہے، اور معمول، غیر معمولی اور ہنگامی حالات کیا ہیں۔'],
      ['خطرات منظم طریقے سے شناخت کریں', 'کام کی جگہ دیکھیں اور پوچھیں کیا نقصان پہنچا سکتا ہے۔ گرنے، چلتی مشینری، ذخیرہ شدہ توانائی، بجلی، آگ، کیمیکل، دھول، شور، گرمی، دستی اٹھان، مشکل رسائی، بیک وقت کام اور انسانی عوامل شامل کریں۔'],
      ['کنٹرول منتخب کرنے سے پہلے خطرہ جانچیں', 'ہر hazard کے ممکنہ نتائج اور exposed افراد شناخت کریں۔ منظور شدہ TDC یا project matrix سے likelihood اور severity، initial risk اور مطلوبہ approval یا escalation طے کریں۔ risk قابل قبول دکھانے کے لیے matrix کی تعریف نہ بدلیں۔'],
      ['اندازے نہیں، ثبوت استعمال کریں', 'site conditions، exposure frequency، workforce competence، incident history، equipment condition اور موجودہ controls کی بنیاد پر rating دیں۔ assumptions اور uncertainty درج کریں اور صرف پہلے نہ ہونے کی وجہ سے سنگین نتیجہ رد نہ کریں۔'],
      ['Hierarchy of Controls لاگو کریں', 'ترتیب یہ ہے: hazard ختم کریں، محفوظ متبادل لائیں، engineering controls، administrative یا work-practice controls، پھر PPE۔ ایک control کافی نہ ہو تو controls ملائیں اور PPE کو خودکار پہلا انتخاب نہ بنائیں۔'],
      ['کام کرنے والوں سے مشورہ کریں', 'workers، supervisors، HSE اور متعلقہ specialists کو شامل کریں۔ تصدیق کریں controls عملی، سمجھے گئے اور کام کے مطابق ہیں۔ assessment ایسی زبان اور شکل میں سمجھائیں جو workforce سمجھے اور سوال یا stop-work concern کی اجازت دیں۔'],
      ['Controls تیار ہونے کے بعد ہی کام منظور کریں', 'risk assessment کو method statement، permit، isolation plan، lifting plan یا ضروری documents سے جوڑیں۔ ہر control کا owner مقرر کریں، workface پر تصدیق کریں، team briefing دیں اور controls کے بعد residual risk نکالیں۔'],
      ['حالات بدلیں تو دوبارہ جائزہ لیں', 'scope، افراد، equipment، materials، weather، location، sequence یا simultaneous operations بدلیں، incident یا near miss ہو، یا control ناکام ہو تو کام روک کر reassess کریں۔ تبدیلی درج کریں اور کام کے دوران controls verify کریں۔'],
    ],
    quiz: [
      { q: 'خطرے کی rating سے پہلے کیا کرنا چاہیے؟', a: ['PPE منتخب کریں', 'کام کو مراحل میں تقسیم کریں اور متاثر ہونے والوں کی شناخت کریں', 'permit منظور کریں', 'residual risk نکالیں'] },
      { q: 'منظم hazard identification کی بہترین وضاحت کیا ہے؟', a: ['صرف پچھلی injuries دیکھیں', 'صرف routine work دیکھیں', 'normal، abnormal، emergency اور non-routine work دیکھیں', 'صرف تصاویر میں نظر آنے والے hazards لکھیں'] },
      { q: 'Residual risk کب نکالنا چاہیے؟', a: ['controls سے پہلے', 'صرف toolbox talk کے بعد', 'منتخب controls نافذ اور verify ہونے کے بعد', 'کام ختم ہونے کے بعد'] },
      { q: 'عام طور پر سب سے مضبوط control کون سا ہے؟', a: ['hazard ختم کرنا', 'اضافی PPE دینا', 'warning sign لگانا', 'ہدایت دہرانا'] },
      { q: 'Risk assessment کب review کرنا ضروری ہے؟', a: ['document ایک ہفتہ پرانا ہو', 'دوسرا supervisor پڑھے', 'scope، conditions یا controls بدلیں یا incident/near miss ہو', 'initial risk کم ہو'] },
    ],
  },
  hi: {
    slides: [
      ['कार्य और कार्यक्षेत्र से शुरू करें', 'काम शुरू होने से पहले उसे स्पष्ट चरणों में बाँटें। पहचानें कि किसे हानि हो सकती है, काम कहाँ होगा, कौन-से उपकरण और पदार्थ होंगे, अन्य गतिविधियों से क्या संबंध है तथा सामान्य, असामान्य और आपात स्थितियाँ क्या हैं।'],
      ['खतरों की व्यवस्थित पहचान करें', 'कार्यस्थल देखें और पूछें कि क्या हानि पहुँचा सकता है। गिरना, चलती मशीन, संचित ऊर्जा, बिजली, आग, रसायन, धूल, शोर, गर्मी, हाथ से उठाना, कठिन पहुँच, साथ-साथ काम और मानवीय कारक शामिल करें।'],
      ['नियंत्रण चुनने से पहले जोखिम आँकें', 'हर खतरे के संभावित परिणाम और प्रभावित लोगों को पहचानें। अनुमोदित TDC या project matrix से likelihood और severity, initial risk तथा आवश्यक approval या escalation तय करें। जोखिम स्वीकार्य दिखाने के लिए matrix की परिभाषा न बदलें।'],
      ['अनुमान नहीं, प्रमाण उपयोग करें', 'site conditions, exposure frequency, workforce competence, incident history, equipment condition और मौजूदा controls पर rating आधारित करें। assumptions और uncertainty दर्ज करें तथा गंभीर विश्वसनीय परिणाम को केवल इसलिए न हटाएँ कि वह पहले नहीं हुआ।'],
      ['नियंत्रण पदानुक्रम लागू करें', 'क्रम है: खतरा हटाएँ, सुरक्षित विकल्प अपनाएँ, engineering controls, administrative या work-practice controls, फिर PPE। एक उपाय पर्याप्त न हो तो नियंत्रण मिलाएँ और PPE को अपने-आप पहला विकल्प न बनाएँ।'],
      ['काम करने वालों से परामर्श करें', 'workers, supervisors, HSE और संबंधित specialists को शामिल करें। पुष्टि करें कि controls व्यावहारिक, समझे गए और कार्य के अनुकूल हैं। assessment ऐसी भाषा व रूप में बताएँ जो workforce समझे और प्रश्न या stop-work concern की अनुमति दें।'],
      ['नियंत्रण तैयार होने पर ही काम अधिकृत करें', 'risk assessment को method statement, permit, isolation plan, lifting plan या अन्य documents से जोड़ें। हर control का owner तय करें, workface पर जाँचें, team briefing दें और controls लागू होने के बाद residual risk निकालें।'],
      ['परिस्थिति बदलने पर समीक्षा करें', 'scope, लोग, equipment, materials, weather, location, sequence या simultaneous operations बदलें, incident/near miss हो या control विफल हो तो काम रोककर reassess करें। संशोधन दर्ज करें और काम भर controls verify करें।'],
    ],
    quiz: [
      { q: 'खतरों की rating से पहले क्या करना चाहिए?', a: ['PPE चुनना', 'काम को चरणों में बाँटना और प्रभावित लोगों की पहचान करना', 'permit मंजूर करना', 'residual risk निकालना'] },
      { q: 'व्यवस्थित hazard identification का सही वर्णन क्या है?', a: ['केवल पिछली injuries देखना', 'केवल routine work देखना', 'normal, abnormal, emergency और non-routine work देखना', 'केवल फोटो में दिखने वाले hazards लिखना'] },
      { q: 'Residual risk कब निकालना चाहिए?', a: ['controls चुनने से पहले', 'केवल toolbox talk के बाद', 'चुने हुए controls लागू और सत्यापित होने के बाद', 'काम पूरा होने के बाद'] },
      { q: 'सामान्यतः सबसे मजबूत control कौन-सा है?', a: ['खतरा हटाना', 'अतिरिक्त PPE देना', 'warning sign लगाना', 'निर्देश दोहराना'] },
      { q: 'Risk assessment की समीक्षा कब आवश्यक है?', a: ['document एक सप्ताह पुराना हो', 'दूसरा supervisor पढ़े', 'scope, conditions या controls बदलें या incident/near miss हो', 'initial risk कम हो'] },
    ],
  },
  bn: {
    slides: [
      ['কাজ ও কর্মক্ষেত্র দিয়ে শুরু করুন', 'কাজ শুরুর আগে পরিষ্কার ধাপে ভাগ করুন। কার ক্ষতি হতে পারে, কোথায় কাজ হবে, কোন সরঞ্জাম ও পদার্থ থাকবে, অন্য কাজের সঙ্গে কী সংযোগ এবং স্বাভাবিক, অস্বাভাবিক ও জরুরি অবস্থা কী—তা নির্ধারণ করুন।'],
      ['পদ্ধতিগতভাবে বিপদ শনাক্ত করুন', 'কর্মক্ষেত্র পরীক্ষা করে জিজ্ঞাসা করুন কী ক্ষতি করতে পারে। পতন, চলন্ত যন্ত্র, সঞ্চিত শক্তি, বিদ্যুৎ, আগুন, রাসায়নিক, ধুলা, শব্দ, তাপ, হাতে বহন, কঠিন প্রবেশ, একসঙ্গে কাজ ও মানবিক বিষয় বিবেচনা করুন।'],
      ['নিয়ন্ত্রণ বাছাইয়ের আগে ঝুঁকি মূল্যায়ন করুন', 'প্রতিটি বিপদের সম্ভাব্য ফল ও ক্ষতিগ্রস্ত মানুষ শনাক্ত করুন। অনুমোদিত TDC বা project matrix দিয়ে likelihood ও severity, initial risk এবং প্রয়োজনীয় approval বা escalation নির্ধারণ করুন। ঝুঁকি গ্রহণযোগ্য দেখাতে matrix-এর সংজ্ঞা বদলাবেন না।'],
      ['অনুমান নয়, প্রমাণ ব্যবহার করুন', 'site conditions, exposure frequency, workforce competence, incident history, equipment condition ও বর্তমান controls-এর ভিত্তিতে rating দিন। assumptions ও uncertainty লিখুন এবং শুধু আগে ঘটেনি বলে গুরুতর বিশ্বাসযোগ্য ফল বাদ দেবেন না।'],
      ['নিয়ন্ত্রণের শ্রেণিবিন্যাস প্রয়োগ করুন', 'ক্রম হলো: বিপদ দূর করা, নিরাপদ বিকল্প, engineering controls, administrative বা work-practice controls, তারপর PPE। একটি ব্যবস্থা যথেষ্ট না হলে একাধিক control দিন এবং PPE-কে স্বয়ংক্রিয় প্রথম পছন্দ করবেন না।'],
      ['যারা কাজ করেন তাদের সঙ্গে পরামর্শ করুন', 'workers, supervisors, HSE ও সংশ্লিষ্ট specialists-কে যুক্ত করুন। controls ব্যবহারযোগ্য, বোঝা হয়েছে এবং কাজের সঙ্গে সামঞ্জস্যপূর্ণ কি না নিশ্চিত করুন। workforce যে ভাষা ও রূপ বোঝে তাতে assessment বুঝিয়ে প্রশ্ন বা stop-work concern-এর সুযোগ দিন।'],
      ['নিয়ন্ত্রণ প্রস্তুত হলে কাজ অনুমোদন করুন', 'risk assessment-কে method statement, permit, isolation plan, lifting plan বা প্রয়োজনীয় documents-এর সঙ্গে যুক্ত করুন। প্রতিটি control-এর owner দিন, workface-এ যাচাই করুন, team briefing দিন এবং controls প্রয়োগের পর residual risk হিসাব করুন।'],
      ['পরিস্থিতি বদলালে পুনর্মূল্যায়ন করুন', 'scope, মানুষ, equipment, materials, weather, location, sequence বা simultaneous operations বদলালে, incident/near miss হলে বা control ব্যর্থ হলে কাজ থামিয়ে reassess করুন। পরিবর্তন লিখুন এবং কাজের সময় controls যাচাই করুন।'],
    ],
    quiz: [
      { q: 'বিপদের rating করার আগে কী করা উচিত?', a: ['PPE বাছাই করা', 'কাজকে ধাপে ভাগ করে কার ক্ষতি হতে পারে তা শনাক্ত করা', 'permit অনুমোদন করা', 'residual risk হিসাব করা'] },
      { q: 'পদ্ধতিগত hazard identification-এর সঠিক বর্ণনা কোনটি?', a: ['শুধু আগের injuries দেখা', 'শুধু routine work দেখা', 'normal, abnormal, emergency এবং non-routine work দেখা', 'শুধু ছবিতে দেখা hazards লেখা'] },
      { q: 'Residual risk কখন হিসাব করা উচিত?', a: ['controls বাছাইয়ের আগে', 'শুধু toolbox talk-এর পরে', 'নির্বাচিত controls প্রয়োগ ও যাচাইয়ের পরে', 'কাজ শেষ হওয়ার পরে'] },
      { q: 'সাধারণত সবচেয়ে শক্তিশালী control কোনটি?', a: ['বিপদ দূর করা', 'অতিরিক্ত PPE দেওয়া', 'warning sign দেওয়া', 'নির্দেশ আবার বলা'] },
      { q: 'কখন risk assessment review করতে হবে?', a: ['document এক সপ্তাহ পুরোনো হলে', 'অন্য supervisor পড়লে', 'scope, conditions বা controls বদলালে বা incident/near miss হলে', 'initial risk কম হলে'] },
    ],
  },
};

export const hiracCourse = Object.fromEntries(Object.entries(packs).map(([language, pack]) => [language, {
  slides: pack.slides.map(([title, text], index) => ({ n: String(index + 1).padStart(2, '0'), title, text, ref: refs[index] })),
  quiz: pack.quiz.map((question, index) => ({ ...question, correct: correct[index] })),
}])) as Record<Lang, CourseLesson>;
