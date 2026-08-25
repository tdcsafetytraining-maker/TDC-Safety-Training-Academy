export type CourseLanguage = 'en' | 'ar' | 'ur' | 'hi';

export type CourseLesson = {
  slides: { n: string; title: string; text: string; ref: string }[];
  quiz: { q: string; a: string[]; correct: number }[];
};

export type CourseCatalogItem = {
  id: string;
  standard: string;
  shortLabel: string;
  titles: Record<CourseLanguage, string>;
  references: string;
  contentReady: boolean;
};

export const courseCatalog: CourseCatalogItem[] = [
  { id: 'WAH-001', standard: '29 CFR 1926 Subpart M', shortLabel: 'FALL PROTECTION', titles: { en: 'Fall Protection & Working at Height', ar: 'الحماية من السقوط والعمل على ارتفاعات', ur: 'فال پروٹیکشن اور بلندی پر کام', hi: 'गिरने से सुरक्षा और ऊँचाई पर कार्य' }, references: '29 CFR 1926.500; 1926.501; 1926.502; 1926.503', contentReady: true },
  { id: 'CSP-002', standard: '29 CFR 1926 Subpart AA', shortLabel: 'CONFINED SPACES', titles: { en: 'Confined Spaces in Construction', ar: 'الأماكن المحصورة في الإنشاءات', ur: 'تعمیرات میں محدود جگہیں', hi: 'निर्माण में सीमित स्थान' }, references: '29 CFR 1926.1201–1926.1213', contentReady: true },
  { id: 'SCA-003', standard: '29 CFR 1926 Subpart L', shortLabel: 'SCAFFOLDING', titles: { en: 'Scaffolding Safety', ar: 'سلامة السقالات', ur: 'اسکیفولڈنگ سیفٹی', hi: 'मचान सुरक्षा' }, references: '29 CFR 1926.450–1926.454', contentReady: true },
  { id: 'FOP-004', standard: '29 CFR 1926.501(c), 1926.502(j)', shortLabel: 'FALLING OBJECTS', titles: { en: 'Falling-Object Prevention', ar: 'منع سقوط الأجسام', ur: 'گرتی اشیاء کی روک تھام', hi: 'गिरती वस्तुओं की रोकथाम' }, references: '29 CFR 1926.501(c); 1926.502(j); 1926.451(h)', contentReady: false },
  { id: 'HEM-005', standard: '29 CFR 1926.602', shortLabel: 'HEAVY EQUIPMENT', titles: { en: 'Heavy Equipment & Mobile Plant', ar: 'المعدات الثقيلة والآليات المتحركة', ur: 'بھاری مشینری اور موبائل پلانٹ', hi: 'भारी उपकरण और मोबाइल प्लांट' }, references: '29 CFR 1926.600–1926.602', contentReady: false },
  { id: 'MMI-006', standard: '29 CFR 1926.600–.602', shortLabel: 'MAN–MACHINE', titles: { en: 'Man–Machine Interaction & Struck-By Hazards', ar: 'تفاعل الإنسان والآلة ومخاطر الاصطدام', ur: 'انسان–مشین تعامل اور ٹکر کے خطرات', hi: 'मानव–मशीन संपर्क और टकराने के खतरे' }, references: '29 CFR 1926.600–1926.602; 1926.200–1926.203', contentReady: false },
  { id: 'RIG-007', standard: '29 CFR 1926.251', shortLabel: 'LIFTING & RIGGING', titles: { en: 'Lifting & Rigging', ar: 'الرفع وتجهيز الأحمال', ur: 'لفٹنگ اور رِگنگ', hi: 'लिफ्टिंग और रिगिंग' }, references: '29 CFR 1926.251', contentReady: false },
  { id: 'SIG-008', standard: '29 CFR 1926.1428', shortLabel: 'SIGNAL PERSON', titles: { en: 'Crane Signal Person & Flagman', ar: 'مسؤول إشارات الرافعة والموجّه', ur: 'کرین سگنل پرسن اور فلیگ مین', hi: 'क्रेन सिग्नल पर्सन और फ्लैगमैन' }, references: '29 CFR 1926.1428; 1926.1416; 1926.201', contentReady: false },
  { id: 'FIR-009', standard: '29 CFR 1926.352', shortLabel: 'FIRE WATCH', titles: { en: 'Fire Prevention & Fire Watch', ar: 'الوقاية من الحريق ومراقب الحريق', ur: 'آگ سے بچاؤ اور فائر واچ', hi: 'अग्नि रोकथाम और फायर वॉच' }, references: '29 CFR 1926.150–1926.152; 1926.352', contentReady: false },
  { id: 'HSK-010', standard: '29 CFR 1926.25', shortLabel: 'HOUSEKEEPING / FOD', titles: { en: 'Housekeeping & FOD Prevention', ar: 'النظافة ومنع الأجسام الغريبة', ur: 'ہاؤس کیپنگ اور FOD کی روک تھام', hi: 'हाउसकीपिंग और FOD रोकथाम' }, references: '29 CFR 1926.25', contentReady: false },
  { id: 'EXC-011', standard: '29 CFR 1926 Subpart P', shortLabel: 'EXCAVATIONS', titles: { en: 'Excavation & Trenching', ar: 'الحفريات والخنادق', ur: 'کھدائی اور خندقیں', hi: 'खुदाई और खाइयाँ' }, references: '29 CFR 1926.650–1926.652', contentReady: false },
  { id: 'ELC-012', standard: '29 CFR 1926 Subpart K', shortLabel: 'ELECTRICAL', titles: { en: 'Electrical Safety', ar: 'السلامة الكهربائية', ur: 'برقی حفاظت', hi: 'विद्युत सुरक्षा' }, references: '29 CFR 1926.400–1926.449', contentReady: false },
  { id: 'LOTO-013', standard: '29 CFR 1926.417', shortLabel: 'LOCKOUT / TAGOUT', titles: { en: 'Lockout/Tagout for Construction', ar: 'القفل ووضع البطاقات في الإنشاءات', ur: 'تعمیرات کے لیے لاک آؤٹ/ٹیگ آؤٹ', hi: 'निर्माण के लिए लॉकआउट/टैगआउट' }, references: '29 CFR 1926.417; applicable 29 CFR 1910.147', contentReady: false },
  { id: 'PPE-014', standard: '29 CFR 1926 Subpart E', shortLabel: 'PPE', titles: { en: 'Personal Protective Equipment', ar: 'معدات الوقاية الشخصية', ur: 'ذاتی حفاظتی سامان', hi: 'व्यक्तिगत सुरक्षा उपकरण' }, references: '29 CFR 1926.95–1926.107', contentReady: false },
  { id: 'HPT-015', standard: '29 CFR 1926 Subpart I', shortLabel: 'TOOLS', titles: { en: 'Hand & Power Tool Safety', ar: 'سلامة الأدوات اليدوية والكهربائية', ur: 'ہینڈ اور پاور ٹول سیفٹی', hi: 'हाथ और पावर टूल सुरक्षा' }, references: '29 CFR 1926.300–1926.307', contentReady: false },
  { id: 'HAZ-016', standard: '29 CFR 1926.59', shortLabel: 'HAZCOM', titles: { en: 'Hazard Communication', ar: 'التواصل بشأن المخاطر', ur: 'خطرات سے متعلق مواصلات', hi: 'खतरा संचार' }, references: '29 CFR 1926.59; 29 CFR 1910.1200', contentReady: false },
  { id: 'EMR-017', standard: '29 CFR 1926.35', shortLabel: 'EMERGENCY', titles: { en: 'Emergency Response', ar: 'الاستجابة للطوارئ', ur: 'ہنگامی ردِعمل', hi: 'आपातकालीन प्रतिक्रिया' }, references: '29 CFR 1926.35; 1926.50; 1926.150', contentReady: false },
];

export const confinedSpaceCourse: Record<CourseLanguage, CourseLesson> = {
  en: {
    slides: [
      { n: '01', title: 'Identify the space before entry', text: 'A confined space is large enough to enter, has limited or restricted entry or exit, and is not designed for continuous occupancy. Before work begins, a competent person must identify confined spaces and determine whether any are permit-required.', ref: '29 CFR 1926.1202; 1926.1203(a)' },
      { n: '02', title: 'Know when a permit is required', text: 'A permit-required confined space has, or could have, a hazardous atmosphere; engulfment risk; inwardly converging walls or a floor that slopes and tapers to a smaller cross-section; or another recognized serious safety or health hazard.', ref: '29 CFR 1926.1202' },
      { n: '03', title: 'Control access and coordinate employers', text: 'Post danger signs or use equally effective measures to prevent unauthorized entry. The controlling contractor must exchange hazard, precaution and entry-operation information with entry employers, and employers must coordinate when their work could create hazards for each other.', ref: '29 CFR 1926.1203(b), (h)–(i)' },
      { n: '04', title: 'Use a written permit-space program', text: 'Before employees enter, the employer must implement a written program that prevents unauthorized entry; identifies and evaluates hazards; specifies acceptable entry conditions; isolates the space; purges, ventilates or flushes as needed; and provides barriers, equipment and safe access.', ref: '29 CFR 1926.1203(d); 1926.1204(a)–(d)' },
      { n: '05', title: 'Test in the correct order', text: 'Evaluate atmospheric conditions with a calibrated direct-reading instrument before entry and as necessary during entry. Test oxygen first, then combustible gases and vapors, then toxic gases and vapors. Authorized entrants must be allowed to observe testing and receive results.', ref: '29 CFR 1926.1204(e); 1926.1203(e)(2)' },
      { n: '06', title: 'Assign trained entry roles', text: 'The entry supervisor verifies conditions, signs the permit and terminates entry when required. The attendant remains outside, tracks entrants, communicates and orders evacuation. Entrants know hazards, use equipment, communicate and leave immediately when ordered or warned.', ref: '29 CFR 1926.1207–1926.1210' },
      { n: '07', title: 'Prepare non-entry rescue', text: 'Provide rescue and emergency procedures before entry. Use non-entry retrieval unless it would increase risk or not help rescue. Each entrant generally wears a chest or full-body harness with a retrieval line; wristlets may be used only when a harness is infeasible or more hazardous.', ref: '29 CFR 1926.1204(i); 1926.1211(c)' },
      { n: '08', title: 'Cancel, review and retrain', text: 'Cancel the entry permit when work is complete or a prohibited condition arises, and retain canceled permits for at least one year to review the program. Train before assignment, when duties or operations change, and whenever knowledge or performance is inadequate.', ref: '29 CFR 1926.1205(e)–(f); 1926.1207' },
    ],
    quiz: [
      { q: 'Which combination defines a confined space?', a: ['Small, locked and always hazardous', 'Large enough to enter, limited entry/exit, and not designed for continuous occupancy', 'Any room below ground', 'Any area requiring a ladder'], correct: 1 },
      { q: 'What is the correct atmospheric testing order?', a: ['Toxics, oxygen, combustibles', 'Combustibles, toxics, oxygen', 'Oxygen, combustibles, toxics', 'The order does not matter'], correct: 2 },
      { q: 'Who verifies acceptable entry conditions and signs the entry permit?', a: ['The entry supervisor', 'Any authorized entrant', 'The nearest equipment operator', 'The fire watch'], correct: 0 },
      { q: 'When should an attendant enter the space to perform an unplanned rescue?', a: ['Whenever an entrant stops responding', 'After calling a coworker', 'When wearing a dust mask', 'Never; follow the established rescue procedure and do not abandon attendant duties'], correct: 3 },
      { q: 'How long must canceled entry permits generally be retained?', a: ['30 days', 'At least one year', 'Until the end of the shift', 'They may be discarded immediately'], correct: 1 },
    ],
  },
  ar: {
    slides: [
      { n: '01', title: 'حدّد المكان قبل الدخول', text: 'المكان المحصور كبير بما يكفي لدخول العامل، وله وسيلة دخول أو خروج محدودة أو مقيّدة، ولم يُصمم للإشغال المستمر. قبل بدء العمل، يحدد الشخص المختص الأماكن المحصورة ويقرر ما إذا كان أي منها يتطلب تصريحاً.', ref: '29 CFR 1926.1202; 1926.1203(a)' },
      { n: '02', title: 'اعرف متى يلزم التصريح', text: 'المكان المحصور المتطلب لتصريح يحتوي أو قد يحتوي جواً خطراً، أو خطر الانغمار، أو جدراناً تتقارب إلى الداخل أو أرضية تنحدر إلى مقطع أصغر، أو أي خطر جسيم آخر معروف للسلامة أو الصحة.', ref: '29 CFR 1926.1202' },
      { n: '03', title: 'امنع الدخول ونسّق بين أصحاب العمل', text: 'ضع لافتات خطر أو وسيلة فعالة مماثلة لمنع الدخول غير المصرح. على المقاول المسيطر تبادل معلومات المخاطر والاحتياطات وعمليات الدخول، وعلى أصحاب العمل التنسيق عندما قد ينشئ عمل أحدهم خطراً على الآخر.', ref: '29 CFR 1926.1203(b), (h)–(i)' },
      { n: '04', title: 'طبّق برنامجاً كتابياً', text: 'قبل الدخول، يطبق صاحب العمل برنامجاً كتابياً يمنع الدخول غير المصرح، ويحدد المخاطر ويقيّمها، ويحدد شروط الدخول المقبولة، ويعزل المكان، ويطهره أو يهويه أو يغسله حسب الحاجة، ويوفر الحواجز والمعدات والوصول الآمن.', ref: '29 CFR 1926.1203(d); 1926.1204(a)–(d)' },
      { n: '05', title: 'اختبر الجو بالترتيب الصحيح', text: 'قيّم الجو بجهاز قراءة مباشرة مُعاير قبل الدخول وأثناءه عند الحاجة. اختبر الأكسجين أولاً، ثم الغازات والأبخرة القابلة للاشتعال، ثم الغازات والأبخرة السامة. يحق للداخلين مشاهدة الاختبار ومعرفة النتائج.', ref: '29 CFR 1926.1204(e); 1926.1203(e)(2)' },
      { n: '06', title: 'عيّن أدواراً مدرّبة', text: 'يتحقق مشرف الدخول من الشروط ويوقّع التصريح وينهي الدخول عند اللزوم. يبقى المراقب خارجاً، ويتابع الداخلين ويتواصل معهم ويأمر بالإخلاء. يعرف الداخلون المخاطر ويستخدمون المعدات ويغادرون فور صدور أمر أو إنذار.', ref: '29 CFR 1926.1207–1926.1210' },
      { n: '07', title: 'خطط للإنقاذ دون دخول', text: 'وفّر إجراءات الإنقاذ والطوارئ قبل الدخول. استخدم الاسترجاع دون دخول ما لم يزد الخطر أو لا يفيد. يرتدي الداخل عادة حزام صدر أو حزام جسم كامل موصولاً بخط استرجاع؛ ولا تستخدم أربطة المعصم إلا إذا كان الحزام غير عملي أو أشد خطراً.', ref: '29 CFR 1926.1204(i); 1926.1211(c)' },
      { n: '08', title: 'ألغِ التصريح وراجع وأعد التدريب', text: 'ألغِ التصريح عند إكمال العمل أو ظهور حالة محظورة، واحتفظ بالتصاريح الملغاة سنة واحدة على الأقل لمراجعة البرنامج. درّب قبل التكليف وعند تغير الواجبات أو العمليات وعندما تكون المعرفة أو الأداء غير كافيين.', ref: '29 CFR 1926.1205(e)–(f); 1926.1207' },
    ],
    quiz: [
      { q: 'أي مجموعة تعرّف المكان المحصور؟', a: ['مكان صغير ومغلق وخطر دائماً', 'كبير بما يكفي للدخول، ودخوله أو خروجه محدود، وغير مصمم للإشغال المستمر', 'أي غرفة تحت الأرض', 'أي مكان يحتاج سلماً'], correct: 1 },
      { q: 'ما ترتيب اختبار الجو الصحيح؟', a: ['السموم ثم الأكسجين ثم الاشتعال', 'الاشتعال ثم السموم ثم الأكسجين', 'الأكسجين ثم القابلية للاشتعال ثم السموم', 'لا أهمية للترتيب'], correct: 2 },
      { q: 'من يتحقق من شروط الدخول ويوقّع التصريح؟', a: ['مشرف الدخول', 'أي عامل داخل', 'أقرب مشغل معدات', 'مراقب الحريق'], correct: 0 },
      { q: 'متى يدخل المراقب لتنفيذ إنقاذ غير مخطط؟', a: ['عند توقف العامل عن الرد', 'بعد مناداة زميل', 'عند ارتداء كمامة غبار', 'لا يدخل؛ يتبع خطة الإنقاذ ولا يترك واجبات المراقبة'], correct: 3 },
      { q: 'كم تُحفظ تصاريح الدخول الملغاة عادة؟', a: ['30 يوماً', 'سنة واحدة على الأقل', 'حتى نهاية الوردية', 'تُتلف فوراً'], correct: 1 },
    ],
  },
  ur: {
    slides: [
      { n: '01', title: 'داخل ہونے سے پہلے جگہ کی شناخت کریں', text: 'محدود جگہ اتنی بڑی ہوتی ہے کہ کارکن داخل ہو سکے، اس کا داخلہ یا اخراج محدود ہوتا ہے، اور اسے مسلسل موجودگی کے لیے نہیں بنایا جاتا۔ کام سے پہلے مجاز شخص محدود جگہوں کی شناخت اور پرمٹ کی ضرورت کا تعین کرے۔', ref: '29 CFR 1926.1202; 1926.1203(a)' },
      { n: '02', title: 'جانیں پرمٹ کب ضروری ہے', text: 'پرمٹ والی محدود جگہ میں خطرناک فضا ہو یا بن سکتی ہو، مواد میں دب جانے کا خطرہ ہو، اندر کی طرف سمٹتی دیواریں یا چھوٹے حصے کی طرف ڈھلوان فرش ہو، یا کوئی دوسرا تسلیم شدہ سنگین حفاظتی یا صحت کا خطرہ ہو۔', ref: '29 CFR 1926.1202' },
      { n: '03', title: 'رسائی روکیں اور آجروں میں رابطہ کریں', text: 'غیر مجاز داخلہ روکنے کے لیے خطرے کی نشانیاں یا اتنا ہی مؤثر طریقہ استعمال کریں۔ کنٹرولنگ کنٹریکٹر خطرات، احتیاطوں اور داخلہ آپریشن کی معلومات بانٹے، اور آجر باہم پیدا ہونے والے خطرات پر رابطہ کریں۔', ref: '29 CFR 1926.1203(b), (h)–(i)' },
      { n: '04', title: 'تحریری پرمٹ پروگرام نافذ کریں', text: 'داخلے سے پہلے آجر تحریری پروگرام نافذ کرے جو غیر مجاز داخلہ روکے، خطرات شناخت و جانچے، قابل قبول شرائط طے کرے، جگہ الگ کرے، ضرورت کے مطابق صاف یا ہوادار کرے، اور رکاوٹیں، سامان اور محفوظ رسائی فراہم کرے۔', ref: '29 CFR 1926.1203(d); 1926.1204(a)–(d)' },
      { n: '05', title: 'درست ترتیب سے فضا جانچیں', text: 'داخلے سے پہلے اور دوران ضرورت کے مطابق کیلیبریٹڈ براہِ راست ریڈنگ آلے سے فضا جانچیں۔ پہلے آکسیجن، پھر آتش گیر گیسیں و بخارات، پھر زہریلی گیسیں و بخارات جانچیں۔ داخل کارکن مشاہدہ اور نتائج حاصل کر سکتے ہیں۔', ref: '29 CFR 1926.1204(e); 1926.1203(e)(2)' },
      { n: '06', title: 'تربیت یافتہ کردار مقرر کریں', text: 'انٹری سپروائزر شرائط کی تصدیق، پرمٹ پر دستخط اور ضرورت پر داخلہ ختم کرتا ہے۔ اٹینڈنٹ باہر رہ کر کارکنوں کو گنتا، رابطہ رکھتا اور انخلا کا حکم دیتا ہے۔ داخل کارکن خطرات جانتے، سامان استعمال کرتے اور حکم یا انتباہ پر فوراً نکلتے ہیں۔', ref: '29 CFR 1926.1207–1926.1210' },
      { n: '07', title: 'بغیر داخلے ریسکیو تیار کریں', text: 'داخلے سے پہلے ریسکیو اور ہنگامی طریقہ بنائیں۔ جب تک خطرہ نہ بڑھے یا فائدہ نہ ہو، بغیر داخلے retrieval استعمال کریں۔ ہر داخل کارکن عموماً retrieval لائن کے ساتھ چیسٹ یا فل باڈی ہارنس پہنے؛ کلائی پٹیاں صرف ہارنس ناقابل عمل یا زیادہ خطرناک ہونے پر استعمال ہوں۔', ref: '29 CFR 1926.1204(i); 1926.1211(c)' },
      { n: '08', title: 'پرمٹ ختم، جائزہ اور دوبارہ تربیت', text: 'کام مکمل ہونے یا ممنوع حالت پر پرمٹ منسوخ کریں اور پروگرام کے جائزے کے لیے کم از کم ایک سال رکھیں۔ ذمہ داری سے پہلے، کام یا عمل بدلنے پر، اور علم یا کارکردگی ناکافی ہونے پر تربیت دیں۔', ref: '29 CFR 1926.1205(e)–(f); 1926.1207' },
    ],
    quiz: [
      { q: 'محدود جگہ کی درست تعریف کون سی ہے؟', a: ['چھوٹی، بند اور ہمیشہ خطرناک', 'داخلے کے قابل، محدود آمدورفت، اور مسلسل موجودگی کے لیے نہیں', 'ہر زیر زمین کمرہ', 'ہر جگہ جہاں سیڑھی چاہیے'], correct: 1 },
      { q: 'فضا جانچنے کی درست ترتیب کیا ہے؟', a: ['زہریلا، آکسیجن، آتش گیر', 'آتش گیر، زہریلا، آکسیجن', 'آکسیجن، آتش گیر، زہریلا', 'ترتیب اہم نہیں'], correct: 2 },
      { q: 'شرائط کی تصدیق اور پرمٹ پر دستخط کون کرتا ہے؟', a: ['انٹری سپروائزر', 'کوئی بھی داخل کارکن', 'قریب ترین آپریٹر', 'فائر واچ'], correct: 0 },
      { q: 'اٹینڈنٹ غیر منصوبہ بند ریسکیو کے لیے کب داخل ہو؟', a: ['جواب نہ ملنے پر', 'ساتھی بلانے کے بعد', 'ڈسٹ ماسک پہن کر', 'کبھی نہیں؛ مقررہ ریسکیو طریقہ اپنائے اور ڈیوٹی نہ چھوڑے'], correct: 3 },
      { q: 'منسوخ پرمٹ عموماً کتنی مدت رکھے جاتے ہیں؟', a: ['30 دن', 'کم از کم ایک سال', 'شفٹ کے آخر تک', 'فوراً ضائع'], correct: 1 },
    ],
  },
  hi: {
    slides: [
      { n: '01', title: 'प्रवेश से पहले स्थान पहचानें', text: 'सीमित स्थान इतना बड़ा होता है कि कर्मचारी प्रवेश कर सके, उसमें आने-जाने का मार्ग सीमित होता है, और वह लगातार रहने के लिए बनाया नहीं गया होता। काम से पहले सक्षम व्यक्ति स्थानों की पहचान और परमिट की आवश्यकता तय करता है।', ref: '29 CFR 1926.1202; 1926.1203(a)' },
      { n: '02', title: 'जानें परमिट कब आवश्यक है', text: 'परमिट-आवश्यक स्थान में खतरनाक वातावरण हो या बन सकता हो, दबकर फँसने का खतरा हो, अंदर की ओर सिमटती दीवारें या छोटे भाग की ओर ढलता फर्श हो, अथवा कोई अन्य मान्य गंभीर सुरक्षा या स्वास्थ्य खतरा हो।', ref: '29 CFR 1926.1202' },
      { n: '03', title: 'प्रवेश रोकें और नियोक्ताओं में समन्वय करें', text: 'अनधिकृत प्रवेश रोकने के लिए खतरे का संकेत या उतना ही प्रभावी उपाय लगाएँ। नियंत्रक ठेकेदार खतरे, सावधानियाँ और प्रवेश-कार्य की जानकारी साझा करे; परस्पर खतरा बनने पर नियोक्ता समन्वय करें।', ref: '29 CFR 1926.1203(b), (h)–(i)' },
      { n: '04', title: 'लिखित परमिट कार्यक्रम लागू करें', text: 'प्रवेश से पहले नियोक्ता लिखित कार्यक्रम लागू करे जो अनधिकृत प्रवेश रोके, खतरे पहचाने और आँके, स्वीकार्य दशाएँ तय करे, स्थान अलग करे, आवश्यकता अनुसार शुद्ध या हवादार करे, तथा अवरोध, उपकरण और सुरक्षित पहुँच दे।', ref: '29 CFR 1926.1203(d); 1926.1204(a)–(d)' },
      { n: '05', title: 'सही क्रम में वातावरण जाँचें', text: 'प्रवेश से पहले और दौरान आवश्यकतानुसार कैलिब्रेटेड सीधे-पठन यंत्र से वातावरण जाँचें। पहले ऑक्सीजन, फिर ज्वलनशील गैस/वाष्प, फिर विषैली गैस/वाष्प जाँचें। अधिकृत प्रवेशकों को जाँच देखने और परिणाम पाने दें।', ref: '29 CFR 1926.1204(e); 1926.1203(e)(2)' },
      { n: '06', title: 'प्रशिक्षित भूमिकाएँ निर्धारित करें', text: 'प्रवेश पर्यवेक्षक दशाएँ सत्यापित करता, परमिट पर हस्ताक्षर करता और आवश्यक होने पर प्रवेश समाप्त करता है। परिचर बाहर रहकर प्रवेशकों की गणना, संचार और निकासी कराता है। प्रवेशक खतरे जानते, उपकरण उपयोग करते और आदेश या चेतावनी पर तुरंत निकलते हैं।', ref: '29 CFR 1926.1207–1926.1210' },
      { n: '07', title: 'बिना प्रवेश बचाव तैयार रखें', text: 'प्रवेश से पहले बचाव और आपात प्रक्रिया रखें। जोखिम बढ़ने या अनुपयोगी होने को छोड़कर बिना-प्रवेश पुनर्प्राप्ति अपनाएँ। प्रवेशक सामान्यतः रिट्रीवल लाइन सहित छाती या पूर्ण शरीर हार्नेस पहने; कलाई पट्टियाँ तभी जब हार्नेस अव्यावहारिक या अधिक खतरनाक हो।', ref: '29 CFR 1926.1204(i); 1926.1211(c)' },
      { n: '08', title: 'परमिट रद्द करें, समीक्षा और पुनः प्रशिक्षण दें', text: 'काम पूरा होने या निषिद्ध दशा बनने पर परमिट रद्द करें और कार्यक्रम समीक्षा हेतु रद्द परमिट कम-से-कम एक वर्ष रखें। नियुक्ति से पहले, कार्य/संचालन बदलने पर, और ज्ञान या प्रदर्शन अपर्याप्त होने पर प्रशिक्षण दें।', ref: '29 CFR 1926.1205(e)–(f); 1926.1207' },
    ],
    quiz: [
      { q: 'सीमित स्थान की सही परिभाषा कौन-सी है?', a: ['छोटा, बंद और हमेशा खतरनाक', 'प्रवेश योग्य, सीमित प्रवेश/निकास, और लगातार रहने के लिए नहीं', 'कोई भी भूमिगत कमरा', 'कोई भी स्थान जहाँ सीढ़ी चाहिए'], correct: 1 },
      { q: 'वातावरण जाँचने का सही क्रम क्या है?', a: ['विषाक्त, ऑक्सीजन, ज्वलनशील', 'ज्वलनशील, विषाक्त, ऑक्सीजन', 'ऑक्सीजन, ज्वलनशील, विषाक्त', 'क्रम महत्वपूर्ण नहीं'], correct: 2 },
      { q: 'स्वीकार्य दशाएँ सत्यापित कर परमिट पर हस्ताक्षर कौन करता है?', a: ['प्रवेश पर्यवेक्षक', 'कोई भी प्रवेशक', 'निकटतम ऑपरेटर', 'फायर वॉच'], correct: 0 },
      { q: 'परिचर अनियोजित बचाव के लिए स्थान में कब प्रवेश करे?', a: ['जवाब न मिलने पर', 'सहकर्मी बुलाने के बाद', 'धूल मास्क पहनकर', 'कभी नहीं; निर्धारित बचाव प्रक्रिया अपनाए और परिचर कर्तव्य न छोड़े'], correct: 3 },
      { q: 'रद्द प्रवेश परमिट सामान्यतः कितने समय रखे जाते हैं?', a: ['30 दिन', 'कम-से-कम एक वर्ष', 'शिफ्ट के अंत तक', 'तुरंत नष्ट किए जा सकते हैं'], correct: 1 },
    ],
  },
};

