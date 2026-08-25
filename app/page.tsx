'use client';

import Image from 'next/image';
import { FormEvent, useMemo, useState } from 'react';

type Lang = 'en' | 'ar' | 'ur' | 'hi';
type View = 'language' | 'account' | 'dashboard' | 'lesson' | 'quiz' | 'result' | 'profile';

const languages: { code: Lang; name: string; local: string; rtl: boolean }[] = [
  { code: 'en', name: 'English', local: 'English', rtl: false },
  { code: 'ar', name: 'Arabic', local: 'العربية', rtl: true },
  { code: 'ur', name: 'Urdu', local: 'اردو', rtl: true },
  { code: 'hi', name: 'Hindi', local: 'हिन्दी', rtl: false },
];

const copy = {
  en: { choose: 'Choose your language', chooseHelp: 'Your lessons, questions, results, and certificate will use this language.', continue: 'Continue to account', account: 'Create your learner account', accountHelp: 'Use your email and a private password. You can change it from your profile.', name: 'Full name', email: 'Email address', password: 'Password', confirm: 'Confirm password', create: 'Create account', welcome: 'Welcome', progress: 'Your safety training', start: 'Start course', resume: 'Continue course', cards: '4 learning cards', questions: '5 questions', pass: '80% required', lesson: 'Working at Height', next: 'Next card', quiz: 'Start assessment', question: 'Question', submit: 'Submit answers', passed: 'Congratulations, you’ve passed!', failed: 'Review the lesson and try again.', score: 'Your score', attempts: 'Attempts used', certificate: 'Certificate queued for email', retry: 'Try again', dashboard: 'Back to courses', profile: 'Profile & password', save: 'Change password', saved: 'Password change request saved.', signout: 'Sign out', standard: 'OSHA references', lock: 'Three attempts used. This course will reactivate 24 hours after your last attempt.' },
  ar: { choose: 'اختر لغتك', chooseHelp: 'ستُعرض الدروس والأسئلة والنتائج والشهادة بهذه اللغة.', continue: 'المتابعة إلى الحساب', account: 'أنشئ حساب المتدرب', accountHelp: 'استخدم بريدك الإلكتروني وكلمة مرور خاصة، ويمكنك تغييرها من ملفك الشخصي.', name: 'الاسم الكامل', email: 'البريد الإلكتروني', password: 'كلمة المرور', confirm: 'تأكيد كلمة المرور', create: 'إنشاء الحساب', welcome: 'مرحباً', progress: 'تدريب السلامة الخاص بك', start: 'ابدأ الدورة', resume: 'متابعة الدورة', cards: '4 بطاقات تعليمية', questions: '5 أسئلة', pass: 'النجاح من 80٪', lesson: 'العمل على ارتفاعات', next: 'البطاقة التالية', quiz: 'ابدأ التقييم', question: 'السؤال', submit: 'إرسال الإجابات', passed: 'تهانينا، لقد نجحت!', failed: 'راجع الدرس ثم حاول مرة أخرى.', score: 'درجتك', attempts: 'المحاولات المستخدمة', certificate: 'تم تجهيز الشهادة للإرسال بالبريد', retry: 'حاول مرة أخرى', dashboard: 'العودة إلى الدورات', profile: 'الملف الشخصي وكلمة المرور', save: 'تغيير كلمة المرور', saved: 'تم حفظ طلب تغيير كلمة المرور.', signout: 'تسجيل الخروج', standard: 'مراجع OSHA', lock: 'تم استخدام ثلاث محاولات. ستُفعّل الدورة بعد 24 ساعة من آخر محاولة.' },
  ur: { choose: 'اپنی زبان منتخب کریں', chooseHelp: 'آپ کے اسباق، سوالات، نتائج اور سرٹیفکیٹ اسی زبان میں ہوں گے۔', continue: 'اکاؤنٹ کی طرف جائیں', account: 'اپنا تربیتی اکاؤنٹ بنائیں', accountHelp: 'اپنا ای میل اور نجی پاس ورڈ استعمال کریں۔ آپ اسے پروفائل سے بدل سکتے ہیں۔', name: 'پورا نام', email: 'ای میل ایڈریس', password: 'پاس ورڈ', confirm: 'پاس ورڈ کی تصدیق', create: 'اکاؤنٹ بنائیں', welcome: 'خوش آمدید', progress: 'آپ کی حفاظتی تربیت', start: 'کورس شروع کریں', resume: 'کورس جاری رکھیں', cards: '4 تعلیمی کارڈز', questions: '5 سوالات', pass: '80٪ کامیابی ضروری', lesson: 'بلندی پر کام', next: 'اگلا کارڈ', quiz: 'جائزہ شروع کریں', question: 'سوال', submit: 'جوابات جمع کریں', passed: 'مبارک ہو، آپ کامیاب ہوگئے!', failed: 'سبق کا دوبارہ جائزہ لیں اور پھر کوشش کریں۔', score: 'آپ کا اسکور', attempts: 'استعمال شدہ کوششیں', certificate: 'سرٹیفکیٹ ای میل کے لیے تیار ہے', retry: 'دوبارہ کوشش کریں', dashboard: 'کورسز پر واپس جائیں', profile: 'پروفائل اور پاس ورڈ', save: 'پاس ورڈ تبدیل کریں', saved: 'پاس ورڈ کی تبدیلی کی درخواست محفوظ ہوگئی۔', signout: 'سائن آؤٹ', standard: 'OSHA حوالہ جات', lock: 'تین کوششیں مکمل ہوگئیں۔ آخری کوشش کے 24 گھنٹے بعد کورس دوبارہ فعال ہوگا۔' },
  hi: { choose: 'अपनी भाषा चुनें', chooseHelp: 'आपके पाठ, प्रश्न, परिणाम और प्रमाणपत्र इसी भाषा में होंगे।', continue: 'खाते पर जाएँ', account: 'अपना प्रशिक्षु खाता बनाएँ', accountHelp: 'अपना ईमेल और निजी पासवर्ड इस्तेमाल करें। आप इसे प्रोफ़ाइल से कभी भी बदल सकते हैं।', name: 'पूरा नाम', email: 'ईमेल पता', password: 'पासवर्ड', confirm: 'पासवर्ड की पुष्टि', create: 'खाता बनाएँ', welcome: 'स्वागत है', progress: 'आपका सुरक्षा प्रशिक्षण', start: 'पाठ्यक्रम शुरू करें', resume: 'पाठ्यक्रम जारी रखें', cards: '4 शिक्षण कार्ड', questions: '5 प्रश्न', pass: '80% उत्तीर्ण अंक', lesson: 'ऊँचाई पर काम', next: 'अगला कार्ड', quiz: 'मूल्यांकन शुरू करें', question: 'प्रश्न', submit: 'उत्तर जमा करें', passed: 'बधाई हो, आप उत्तीर्ण हुए!', failed: 'पाठ की समीक्षा करें और फिर प्रयास करें।', score: 'आपका अंक', attempts: 'प्रयुक्त प्रयास', certificate: 'प्रमाणपत्र ईमेल के लिए तैयार है', retry: 'फिर प्रयास करें', dashboard: 'पाठ्यक्रमों पर लौटें', profile: 'प्रोफ़ाइल और पासवर्ड', save: 'पासवर्ड बदलें', saved: 'पासवर्ड बदलने का अनुरोध सहेजा गया।', signout: 'साइन आउट', standard: 'OSHA संदर्भ', lock: 'तीन प्रयास पूरे हो गए हैं। अंतिम प्रयास के 24 घंटे बाद पाठ्यक्रम फिर सक्रिय होगा।' },
};

const course = {
  en: {
    slides: [
      { n: '01', title: 'Recognize the fall hazard', text: 'Identify unprotected sides, floor openings, fragile surfaces, ladders, scaffolds and changing site conditions before work starts. Construction fall protection generally applies at 6 ft (1.8 m), with task-specific rules also applying.', ref: '29 CFR 1926.501; 1926.503' },
      { n: '02', title: 'Use the right protection', text: 'Prefer guardrails, covers or other engineered controls. When personal fall arrest is required, use approved components, a suitable anchorage and a properly fitted full-body harness. Inspect the complete system before use.', ref: '29 CFR 1926.502' },
      { n: '03', title: 'Plan and work safely', text: 'A competent person must address site hazards and training. Maintain safe access, protect openings, keep the area orderly and never alter a system without authorization. Stop work when conditions or equipment change.', ref: '29 CFR 1926.20; 1926.503' },
      { n: '04', title: 'Rescue and stop-work actions', text: 'A fall-arrest plan is incomplete without prompt rescue. Know how to summon help, do not improvise a rescue, isolate the area and remove impacted equipment from service until a competent person clears it.', ref: '29 CFR 1926.502(d)(20)–(21)' },
    ],
    quiz: [
      { q: 'What should happen before work at height begins?', a: ['Identify hazards and select controls', 'Wait until a worker complains', 'Use a harness for every task without assessment'], correct: 0 },
      { q: 'Which is an engineered fall-protection control?', a: ['Guardrail system', 'Warning shouted by a coworker', 'Working faster'], correct: 0 },
      { q: 'When should a personal fall-arrest system be inspected?', a: ['Before use', 'Only after a fall', 'Once during employment'], correct: 0 },
      { q: 'What must a fall-protection plan consider?', a: ['Prompt rescue', 'Only the purchase price', 'The worker’s preferred color'], correct: 0 },
      { q: 'What should a worker do when site conditions change?', a: ['Stop and reassess the hazards', 'Continue without telling anyone', 'Remove the protection system'], correct: 0 },
    ],
  },
  ar: {
    slides: [
      { n: '01', title: 'تعرّف على خطر السقوط', text: 'حدّد الحواف غير المحمية وفتحات الأرضيات والأسطح الهشة والسلالم والسقالات وتغيّر ظروف الموقع قبل بدء العمل. تطبّق الحماية من السقوط في أعمال الإنشاء عموماً عند ارتفاع 6 أقدام (1.8 م)، مع مراعاة القواعد الخاصة بكل مهمة.', ref: '29 CFR 1926.501; 1926.503' },
      { n: '02', title: 'استخدم وسيلة الحماية الصحيحة', text: 'أعطِ الأولوية للحواجز والأغطية والضوابط الهندسية. عند الحاجة إلى نظام إيقاف السقوط، استخدم مكونات معتمدة ونقطة تثبيت مناسبة وحزام جسم كامل مضبوطاً جيداً، وافحص النظام قبل الاستخدام.', ref: '29 CFR 1926.502' },
      { n: '03', title: 'خطط ونفّذ العمل بأمان', text: 'يجب أن يعالج الشخص المختص مخاطر الموقع ومتطلبات التدريب. حافظ على وصول آمن، واحمِ الفتحات، ورتّب منطقة العمل، ولا تعدّل نظام الحماية دون تصريح. أوقف العمل عند تغير الظروف أو المعدات.', ref: '29 CFR 1926.20; 1926.503' },
      { n: '04', title: 'الإنقاذ وإيقاف العمل', text: 'خطة إيقاف السقوط غير مكتملة دون إنقاذ سريع. اعرف طريقة طلب المساعدة، ولا ترتجل عملية إنقاذ، واعزل المنطقة، وأخرج المعدات المتأثرة من الخدمة حتى يعتمدها شخص مختص.', ref: '29 CFR 1926.502(d)(20)–(21)' },
    ],
    quiz: [
      { q: 'ما الإجراء المطلوب قبل بدء العمل على ارتفاع؟', a: ['تحديد المخاطر واختيار وسائل التحكم', 'الانتظار حتى يشتكي عامل', 'استخدام الحزام لكل مهمة دون تقييم'], correct: 0 },
      { q: 'أي مما يلي وسيلة حماية هندسية من السقوط؟', a: ['نظام الحواجز', 'تحذير شفهي من زميل', 'العمل بسرعة أكبر'], correct: 0 },
      { q: 'متى يجب فحص نظام إيقاف السقوط الشخصي؟', a: ['قبل الاستخدام', 'بعد السقوط فقط', 'مرة واحدة أثناء مدة العمل'], correct: 0 },
      { q: 'ما الذي يجب أن تتضمنه خطة الحماية من السقوط؟', a: ['الإنقاذ السريع', 'سعر الشراء فقط', 'اللون المفضل للعامل'], correct: 0 },
      { q: 'ماذا يفعل العامل عند تغير ظروف الموقع؟', a: ['يوقف العمل ويعيد تقييم المخاطر', 'يستمر دون إبلاغ أحد', 'يزيل نظام الحماية'], correct: 0 },
    ],
  },
  ur: {
    slides: [
      { n: '01', title: 'گرنے کے خطرے کو پہچانیں', text: 'کام شروع کرنے سے پہلے غیر محفوظ کناروں، فرش کے سوراخوں، نازک سطحوں، سیڑھیوں، اسکیفولڈ اور بدلتے ہوئے سائٹ حالات کی نشاندہی کریں۔ تعمیرات میں عموماً 6 فٹ (1.8 میٹر) پر فال پروٹیکشن درکار ہوتی ہے، جبکہ کام کے لحاظ سے مخصوص قواعد بھی لاگو ہوتے ہیں۔', ref: '29 CFR 1926.501; 1926.503' },
      { n: '02', title: 'درست تحفظ استعمال کریں', text: 'گارڈ ریل، کور یا دوسرے انجینئرنگ کنٹرول کو ترجیح دیں۔ ذاتی فال اریسٹ درکار ہو تو منظور شدہ حصے، مناسب اینکریج اور درست فِٹ والا فل باڈی ہارنس استعمال کریں۔ استعمال سے پہلے پورے نظام کا معائنہ کریں۔', ref: '29 CFR 1926.502' },
      { n: '03', title: 'منصوبہ بنائیں اور محفوظ کام کریں', text: 'مجاز شخص سائٹ کے خطرات اور تربیت کو دیکھے۔ محفوظ رسائی قائم رکھیں، سوراخ ڈھانپیں، جگہ صاف رکھیں اور اجازت کے بغیر نظام میں تبدیلی نہ کریں۔ حالات یا سامان بدلنے پر کام روک دیں۔', ref: '29 CFR 1926.20; 1926.503' },
      { n: '04', title: 'ریسکیو اور کام روکنے کے اقدامات', text: 'فوری ریسکیو کے بغیر فال اریسٹ منصوبہ نامکمل ہے۔ مدد بلانے کا طریقہ جانیں، خود ساختہ ریسکیو نہ کریں، علاقہ الگ کریں اور متاثرہ سامان کو مجاز شخص کی منظوری تک استعمال سے نکال دیں۔', ref: '29 CFR 1926.502(d)(20)–(21)' },
    ],
    quiz: [
      { q: 'بلندی پر کام شروع کرنے سے پہلے کیا کرنا چاہیے؟', a: ['خطرات کی نشاندہی اور کنٹرول کا انتخاب', 'کسی شکایت کا انتظار', 'بغیر جائزے ہر کام میں ہارنس استعمال'], correct: 0 },
      { q: 'انجینئرنگ فال پروٹیکشن کنٹرول کون سا ہے؟', a: ['گارڈ ریل نظام', 'ساتھی کی زبانی تنبیہ', 'زیادہ تیزی سے کام'], correct: 0 },
      { q: 'ذاتی فال اریسٹ نظام کب چیک کرنا چاہیے؟', a: ['استعمال سے پہلے', 'صرف گرنے کے بعد', 'ملازمت میں صرف ایک بار'], correct: 0 },
      { q: 'فال پروٹیکشن منصوبے میں کیا شامل ہونا چاہیے؟', a: ['فوری ریسکیو', 'صرف خریداری کی قیمت', 'کارکن کا پسندیدہ رنگ'], correct: 0 },
      { q: 'سائٹ کے حالات بدلنے پر کارکن کیا کرے؟', a: ['کام روک کر خطرات کا دوبارہ جائزہ', 'کسی کو بتائے بغیر جاری رکھے', 'تحفظ کا نظام ہٹا دے'], correct: 0 },
    ],
  },
  hi: {
    slides: [
      { n: '01', title: 'गिरने के खतरे पहचानें', text: 'काम शुरू होने से पहले खुले किनारे, फ़र्श के छेद, नाज़ुक सतहें, सीढ़ियाँ, मचान और बदलती साइट स्थितियाँ पहचानें। निर्माण कार्य में सामान्यतः 6 फीट (1.8 मीटर) पर गिरने से सुरक्षा लागू होती है; कार्य-विशिष्ट नियम भी लागू हो सकते हैं।', ref: '29 CFR 1926.501; 1926.503' },
      { n: '02', title: 'सही सुरक्षा चुनें', text: 'गार्डरेल, कवर या अन्य इंजीनियरिंग नियंत्रण को प्राथमिकता दें। व्यक्तिगत फॉल-अरेस्ट आवश्यक हो तो अनुमोदित हिस्से, उपयुक्त एंकर और सही फिट वाला फुल-बॉडी हार्नेस इस्तेमाल करें। उपयोग से पहले पूरी प्रणाली जाँचें।', ref: '29 CFR 1926.502' },
      { n: '03', title: 'योजना बनाकर सुरक्षित काम करें', text: 'सक्षम व्यक्ति साइट के खतरों और प्रशिक्षण का प्रबंध करे। सुरक्षित पहुँच रखें, खुले स्थान सुरक्षित करें, कार्यक्षेत्र व्यवस्थित रखें और अनुमति के बिना प्रणाली न बदलें। स्थिति या उपकरण बदलने पर काम रोकें।', ref: '29 CFR 1926.20; 1926.503' },
      { n: '04', title: 'बचाव और काम रोकने की कार्रवाई', text: 'शीघ्र बचाव के बिना फॉल-अरेस्ट योजना अधूरी है। सहायता बुलाने की विधि जानें, मनमाना बचाव न करें, क्षेत्र को अलग करें और प्रभावित उपकरण को सक्षम व्यक्ति की मंज़ूरी तक सेवा से बाहर रखें।', ref: '29 CFR 1926.502(d)(20)–(21)' },
    ],
    quiz: [
      { q: 'ऊँचाई पर काम शुरू करने से पहले क्या होना चाहिए?', a: ['खतरों की पहचान और नियंत्रण का चयन', 'किसी शिकायत की प्रतीक्षा', 'बिना मूल्यांकन हर काम में हार्नेस'], correct: 0 },
      { q: 'इंजीनियरिंग गिरावट-सुरक्षा नियंत्रण कौन सा है?', a: ['गार्डरेल प्रणाली', 'सहकर्मी की आवाज़ में चेतावनी', 'तेज़ काम करना'], correct: 0 },
      { q: 'व्यक्तिगत फॉल-अरेस्ट प्रणाली कब जाँची जानी चाहिए?', a: ['उपयोग से पहले', 'केवल गिरावट के बाद', 'रोज़गार में केवल एक बार'], correct: 0 },
      { q: 'गिरावट-सुरक्षा योजना में क्या शामिल होना चाहिए?', a: ['शीघ्र बचाव', 'केवल खरीद मूल्य', 'कर्मचारी का पसंदीदा रंग'], correct: 0 },
      { q: 'साइट की स्थिति बदलने पर कर्मचारी को क्या करना चाहिए?', a: ['काम रोककर खतरे दोबारा जाँचना', 'बिना बताए काम जारी रखना', 'सुरक्षा प्रणाली हटा देना'], correct: 0 },
    ],
  },
};

export default function Home() {
  const [lang, setLang] = useState<Lang>('en');
  const [selected, setSelected] = useState<Lang | ''>('');
  const [view, setView] = useState<View>('language');
  const [slide, setSlide] = useState(0);
  const [answers, setAnswers] = useState<number[]>([-1, -1, -1, -1, -1]);
  const [attempts, setAttempts] = useState(0);
  const [passed, setPassed] = useState(false);
  const [score, setScore] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const t = copy[lang];
  const data = course[lang];
  const rtl = languages.find((item) => item.code === lang)?.rtl;
  const allAnswered = answers.every((value) => value >= 0);
  const locked = attempts >= 3 && !passed;

  const progress = useMemo(() => {
    if (passed) return 100;
    if (view === 'lesson') return 20 + slide * 12;
    if (view === 'quiz') return 72;
    return 0;
  }, [passed, slide, view]);

  function chooseLanguage() {
    if (!selected) return;
    setLang(selected);
    setView('account');
  }

  function createAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const first = String(form.get('password') || '');
    const second = String(form.get('confirm') || '');
    if (first.length < 8 || first !== second) return;
    setName(String(form.get('name') || 'Learner'));
    setEmail(String(form.get('email') || ''));
    setView('dashboard');
  }

  function gradeQuiz() {
    const correct = answers.reduce((total, answer, index) => total + (answer === data.quiz[index].correct ? 1 : 0), 0);
    const result = correct * 20;
    setScore(result);
    setAttempts((value) => value + 1);
    setPassed(result >= 80);
    setView('result');
  }

  function retry() {
    setAnswers([-1, -1, -1, -1, -1]);
    setSlide(0);
    setView('lesson');
  }

  return (
    <main className="min-h-screen bg-[#f3f7f4] text-[#102219]" dir={rtl ? 'rtl' : 'ltr'}>
      <header className="sticky top-0 z-20 border-b border-[#dce7df] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between px-5 sm:px-8">
          <button type="button" onClick={() => view !== 'language' && setView('dashboard')} aria-label="TDC Safety Academy home"><Image src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/tdc-logo.png`} alt="TDC Contracting" width={150} height={52} priority className="h-auto w-[118px]" /></button>
          {view !== 'language' && view !== 'account' ? (
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setView('profile')} className="rounded-full border border-[#d6e3da] px-3 py-2 text-xs font-bold text-[#31513f]">{t.profile}</button>
              <span className="hidden rounded-full bg-[#eaf6ee] px-3 py-2 text-xs font-bold text-[#087a41] sm:block">{progress}%</span>
            </div>
          ) : <span className="rounded-full bg-[#eaf6ee] px-3 py-2 text-xs font-bold text-[#087a41]">OSHA 1910 + 1926</span>}
        </div>
      </header>

      {view === 'language' && (
        <section className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-14 lg:py-16">
          <div><span className="eyebrow">TDC Safety Academy</span><h1 className="hero-title">Start safe. Work safe. Return safe.</h1><p className="hero-copy">Mobile safety training based on OSHA 1910 and 1926 standards, with focused learning cards, verified assessments and completion records.</p><div className="mt-7 flex flex-wrap gap-3"><span className="pill">80% pass score</span><span className="pill">3 attempts</span><span className="pill">24-hour reset</span></div></div>
          <div className="panel"><p className="step">Step 1 of 3</p><h2 className="panel-title">{t.choose}</h2><p className="panel-copy">{t.chooseHelp}</p><div className="mt-6 grid grid-cols-2 gap-3" role="radiogroup" aria-label="Training language">{languages.map((language) => <button key={language.code} type="button" role="radio" aria-checked={selected === language.code} onClick={() => setSelected(language.code)} className={`language-card ${selected === language.code ? 'selected' : ''}`}><span className="block text-lg font-extrabold" dir={language.rtl ? 'rtl' : 'ltr'}>{language.local}</span><span className="mt-1 block text-xs text-[#687970]">{language.name} · {language.rtl ? 'RTL' : 'LTR'}</span></button>)}</div><button type="button" disabled={!selected} onClick={chooseLanguage} className="primary-button mt-6">{copy[selected || 'en'].continue}</button></div>
        </section>
      )}

      {view === 'account' && (
        <section className="narrow"><button type="button" onClick={() => setView('language')} className="back-link">← {copy[lang].choose}</button><div className="panel mt-4"><p className="step">Step 2 of 3</p><h1 className="panel-title">{t.account}</h1><p className="panel-copy">{t.accountHelp}</p><form onSubmit={createAccount} className="mt-7 space-y-4"><label className="field"><span>{t.name}</span><input name="name" required autoComplete="name" /></label><label className="field"><span>{t.email}</span><input name="email" type="email" required autoComplete="email" /></label><label className="field"><span>{t.password}</span><input name="password" type="password" required minLength={8} autoComplete="new-password" /></label><label className="field"><span>{t.confirm}</span><input name="confirm" type="password" required minLength={8} autoComplete="new-password" /></label><p className="text-xs text-[#6d7c73]">Minimum 8 characters. Passwords are handled by the production authentication provider and never written to Google Sheets.</p><button className="primary-button">{t.create}</button></form></div></section>
      )}

      {view === 'dashboard' && (
        <section className="mx-auto w-full max-w-6xl px-5 py-9 sm:px-8"><p className="step">{t.welcome}, {name || 'Learner'}</p><div className="mt-2 flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-3xl font-black tracking-tight sm:text-4xl">{t.progress}</h1><p className="mt-2 text-sm text-[#65756c]">{email}</p></div><span className="pill">1 of 12 courses active</span></div><article className="course-card mt-8"><div className="course-visual"><span>01</span><b>FALL<br/>PROTECTION</b></div><div className="flex-1 p-6 sm:p-8"><div className="flex flex-wrap gap-2"><span className="tag">29 CFR 1926 Subpart M</span><span className="tag">Awareness</span></div><h2 className="mt-5 text-2xl font-black">{t.lesson}</h2><div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#596b61]"><span>{t.cards}</span><span>{t.questions}</span><span>{t.pass}</span></div>{locked && <div className="mt-5 rounded-xl bg-[#fff3dd] p-4 text-sm font-semibold text-[#7a5011]">{t.lock}</div>}<button type="button" disabled={locked} onClick={() => { setSlide(0); setView('lesson'); }} className="primary-button mt-6 sm:w-auto sm:px-8">{attempts ? t.resume : t.start}</button></div></article><h2 className="mt-10 text-lg font-black">Upcoming modules</h2><div className="mt-4 grid gap-3 sm:grid-cols-3">{['Confined Spaces', 'Lifting & Rigging', 'Fire Watch'].map((item) => <div key={item} className="rounded-2xl border border-[#dce6df] bg-white p-5"><span className="text-xs font-bold uppercase tracking-wider text-[#849188]">Coming next</span><h3 className="mt-2 font-extrabold">{item}</h3></div>)}</div></section>
      )}

      {view === 'lesson' && (
        <section className="narrow-wide"><div className="flex items-center justify-between gap-4"><button type="button" className="back-link" onClick={() => setView('dashboard')}>← {t.dashboard}</button><span className="text-xs font-bold text-[#65766c]">{slide + 1} / 4</span></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-[#dce8df]"><div className="h-full rounded-full bg-[#0a8a49] transition-all" style={{ width: `${(slide + 1) * 25}%` }} /></div><article className="lesson-card mt-6"><div className="lesson-number">{data.slides[slide].n}</div><p className="step">{t.lesson}</p><h1 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">{data.slides[slide].title}</h1><p className="mt-6 text-base leading-8 text-[#43594d] sm:text-lg">{data.slides[slide].text}</p><div className="mt-8 rounded-2xl bg-[#edf7f0] p-4"><span className="text-xs font-bold uppercase tracking-wider text-[#16814c]">{t.standard}</span><p className="mt-1 font-bold">{data.slides[slide].ref}</p></div><button type="button" onClick={() => slide < 3 ? setSlide(slide + 1) : setView('quiz')} className="primary-button mt-8">{slide < 3 ? t.next : t.quiz}</button></article></section>
      )}

      {view === 'quiz' && (
        <section className="narrow-wide"><button type="button" className="back-link" onClick={() => setView('lesson')}>← {t.lesson}</button><div className="mt-5"><p className="step">Assessment · Attempt {attempts + 1} of 3</p><h1 className="mt-2 text-3xl font-black">{t.questions} · {t.pass}</h1></div><div className="mt-7 space-y-5">{data.quiz.map((item, index) => <fieldset key={item.q} className="question-card"><legend className="font-extrabold"><span className="text-[#12824a]">{t.question} {index + 1}.</span> {item.q}</legend><div className="mt-4 space-y-2">{item.a.map((option, optionIndex) => <label key={option} className={`option ${answers[index] === optionIndex ? 'chosen' : ''}`}><input type="radio" name={`q-${index}`} checked={answers[index] === optionIndex} onChange={() => setAnswers((current) => current.map((value, answerIndex) => answerIndex === index ? optionIndex : value))} /><span>{option}</span></label>)}</div></fieldset>)}</div><button type="button" disabled={!allAnswered} onClick={gradeQuiz} className="primary-button mt-6">{t.submit}</button></section>
      )}

      {view === 'result' && (
        <section className="narrow"><div className={`result-card ${passed ? 'success' : 'failure'}`}><div className="result-icon">{passed ? '✓' : '!'}</div><p className="step">{t.score}: {score}%</p><h1 className="mt-3 text-3xl font-black">{passed ? t.passed : t.failed}</h1><div className="mt-6 grid grid-cols-2 gap-3"><div className="metric"><b>{score}%</b><span>{t.score}</span></div><div className="metric"><b>{attempts}/3</b><span>{t.attempts}</span></div></div>{passed && <div className="mt-5 rounded-2xl bg-white/70 p-5"><p className="font-extrabold">{t.certificate}</p><p className="mt-1 text-sm text-[#5b6c62]">{name} · {email}<br/>Certificate ID: TDC-WAH-2026-DEMO</p></div>}{!passed && attempts >= 3 && <p className="mt-5 rounded-xl bg-white/70 p-4 text-sm font-bold">{t.lock}</p>}<div className="mt-6 flex flex-col gap-3 sm:flex-row">{!passed && attempts < 3 && <button type="button" onClick={retry} className="primary-button">{t.retry}</button>}<button type="button" onClick={() => setView('dashboard')} className="secondary-button">{t.dashboard}</button></div></div></section>
      )}

      {view === 'profile' && (
        <section className="narrow"><button type="button" className="back-link" onClick={() => setView('dashboard')}>← {t.dashboard}</button><div className="panel mt-4"><p className="step">{t.profile}</p><h1 className="panel-title">{name}</h1><p className="panel-copy">{email}</p><form className="mt-7 space-y-4" onSubmit={(event) => { event.preventDefault(); setPasswordMessage(t.saved); }}><label className="field"><span>{t.password}</span><input type="password" minLength={8} required autoComplete="new-password" /></label><label className="field"><span>{t.confirm}</span><input type="password" minLength={8} required autoComplete="new-password" /></label><button className="primary-button">{t.save}</button>{passwordMessage && <p className="rounded-xl bg-[#eaf7ee] p-3 text-sm font-bold text-[#08733e]">{passwordMessage}</p>}</form><button type="button" onClick={() => { setView('language'); setSelected(''); setName(''); setEmail(''); }} className="mt-6 text-sm font-bold text-[#9a302b]">{t.signout}</button></div></section>
      )}

      <footer className="mx-auto mt-10 w-full max-w-6xl border-t border-[#d9e5dd] px-5 py-7 text-xs leading-5 text-[#6d7c73] sm:px-8">TDC Safety Academy · Course-completion training. Employer-specific instruction and practical evaluation may also be required.</footer>
    </main>
  );
}
