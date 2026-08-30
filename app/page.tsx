'use client';

import Image from 'next/image';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { CertificateRecord, getProfile, registerLearner, submitAttempt } from '../lib/backend';
import { changePassword, FirebaseSession, refreshSession, sendPasswordReset, signIn, signUp } from '../lib/firebase-rest';
import { confinedSpaceCourse, courseCatalog, type CourseLanguage, type CourseLesson } from '../lib/course-catalog';
import { scaffoldCourse } from '../lib/phase-one-courses';
import { fallingObjectCourse } from '../lib/falling-object-course';
import { equipmentCourse } from '../lib/equipment-course';
import { manMachineCourse } from '../lib/man-machine-course';
import { riggingCourse, signalCourse } from '../lib/final-courses-a';
import { fireCourse, housekeepingCourse, excavationCourse, electricalCourse, lotoCourse } from '../lib/final-courses-b';
import { ppeCourse, toolsCourse, hazcomCourse, emergencyCourse } from '../lib/final-courses-c';
import { saudiProjectLocations, saudiProjectRegions, type SaudiProjectRegion } from '../lib/saudi-locations';
import { materialStorageCourse, permitToWorkCourse, barriersSignsCourse, floorOpeningCourse, toolboxTalkCourse, manualHandlingCourse } from '../lib/additional-courses';
import { banglaCourses } from '../lib/bangla-courses.generated';

type Lang = CourseLanguage | 'bn';
type View = 'language' | 'account' | 'dashboard' | 'lesson' | 'quiz' | 'result' | 'profile';

type StoredAuth = {
  refreshToken: string;
  email: string;
  name: string;
  language: Lang;
  completedCourseIds?: string[];
  projectRegion?: SaudiProjectRegion | '';
  city?: string;
};

const AUTH_STORAGE_KEY = 'tdc-safety-academy-session-v1';
const IDLE_ACTIVITY_KEY = 'tdc-safety-academy-last-activity';
const IDLE_TIMEOUT_MS = 30 * 60 * 1000;

const languages: { code: Lang; name: string; local: string; rtl: boolean }[] = [
  { code: 'en', name: 'English', local: 'English', rtl: false },
  { code: 'ar', name: 'Arabic', local: 'العربية', rtl: true },
  { code: 'ur', name: 'Urdu', local: 'اردو', rtl: true },
  { code: 'hi', name: 'Hindi', local: 'हिन्दी', rtl: false },
  { code: 'bn', name: 'Bangla', local: 'বাংলা', rtl: false },
];

const lessonUi: Record<Lang, { focus: string; points: string; figures: string; reveal: string; takeaway: string; listen: string; stop: string; previous: string; slide: string }> = {
  en: { focus: 'Safety focus', points: 'What you need to know', figures: 'Key figures', reveal: 'Tap to reveal the key takeaway', takeaway: 'Remember this', listen: 'Listen', stop: 'Stop audio', previous: 'Previous', slide: 'Slide' },
  ar: { focus: 'محور السلامة', points: 'ما يجب أن تعرفه', figures: 'الأرقام المهمة', reveal: 'اضغط لإظهار الخلاصة المهمة', takeaway: 'تذكر هذا', listen: 'استمع', stop: 'إيقاف الصوت', previous: 'السابق', slide: 'الشريحة' },
  ur: { focus: 'حفاظتی توجہ', points: 'آپ کو کیا جاننا ہے', figures: 'اہم اعداد', reveal: 'اہم خلاصہ دیکھنے کے لیے دبائیں', takeaway: 'یہ یاد رکھیں', listen: 'سنیں', stop: 'آواز بند کریں', previous: 'پچھلی', slide: 'سلائیڈ' },
  hi: { focus: 'सुरक्षा विषय', points: 'आपको क्या जानना है', figures: 'मुख्य आँकड़े', reveal: 'मुख्य बात देखने के लिए टैप करें', takeaway: 'इसे याद रखें', listen: 'सुनें', stop: 'ऑडियो रोकें', previous: 'पिछला', slide: 'स्लाइड' },
  bn: { focus: 'নিরাপত্তার বিষয়', points: 'যা আপনার জানা দরকার', figures: 'গুরুত্বপূর্ণ পরিমাপ', reveal: 'মূল বিষয়টি দেখতে ট্যাপ করুন', takeaway: 'এটি মনে রাখুন', listen: 'শুনুন', stop: 'অডিও বন্ধ করুন', previous: 'পূর্ববর্তী', slide: 'স্লাইড' },
};

const visualRules = [
  { words: ['fire', 'hot work', 'حريق', 'آگ', 'आग', 'আগুন'], icon: '🔥', tone: 'amber' },
  { words: ['electric', 'voltage', 'كهرب', 'بجلی', 'विद्युत', 'বৈদ্যুতিক'], icon: '⚡', tone: 'blue' },
  { words: ['fall', 'height', 'guardrail', 'سقوط', 'اونچائی', 'गिर', 'পতন', 'উচ্চতায়'], icon: '🦺', tone: 'green' },
  { words: ['excavat', 'trench', 'حفر', 'خندق', 'खाई', 'খনন', 'পরিখা'], icon: '⛏️', tone: 'earth' },
  { words: ['crane', 'rigg', 'lift', 'scaffold', 'رافعة', 'رفع', 'کرین', 'उठ', 'ক্রেন', 'উত্তোলন', 'ভারা'], icon: '🏗️', tone: 'orange' },
  { words: ['confined', 'entry', 'permit', 'محصور', 'داخل', 'प्रवेश', 'সীমাবদ্ধ', 'প্রবেশ', 'পারমিট'], icon: '🚧', tone: 'slate' },
  { words: ['lockout', 'energy', 'عزل', 'قفل', 'توانائی', 'ऊर्जा', 'লকআউট', 'শক্তি'], icon: '🔒', tone: 'red' },
  { words: ['chemical', 'hazard communication', 'sds', 'كيميائ', 'کیمیائی', 'रसायन', 'রাসায়নিক'], icon: '🧪', tone: 'purple' },
  { words: ['tool', 'equipment', 'machine', 'أداة', 'معدات', 'مشین', 'उपकरण', 'সরঞ্জাম', 'মেশিন'], icon: '🛠️', tone: 'teal' },
];

function presentSlide(title: string, text: string) {
  const sentences = text.split(/(?<=[.!?؟۔।])\s+/u).map((part) => part.trim()).filter(Boolean);
  const clauses = text.split(/;\s+/u).map((part) => part.trim()).filter(Boolean);
  const lead = sentences.length > 1 ? sentences[0] : clauses[0] || text;
  const bullets = sentences.length > 1 ? sentences.slice(1) : clauses.length > 1 ? clauses.slice(1) : [text];
  const takeaway = bullets.at(-1) || lead;
  const searchable = `${title} ${text}`.toLowerCase();
  const visual = visualRules.find((rule) => rule.words.some((word) => searchable.includes(word))) || { icon: '⚠️', tone: 'green' };
  const measurementPattern = /\b(?:\d+(?:[.,]\d+)?(?:\s*(?:±|x|×)\s*\d+(?:[.,]\d+)?)?\s*(?:%|ft²|ft|feet|inches|inch|in|m²|m|cm|mm|kV|V|A|amp|amps|psi|lb|lbs|pounds?|kg|kN|N|minutes?|hours?|days?|months?|years?|gallons?|gal)|\d+(?:[.,]\d+)?H\s*:\s*1V)\b/giu;
  const figures = [...new Set(text.match(measurementPattern) || [])].slice(0, 4);
  return { lead, bullets, takeaway, figures, visual };
}

const copy = {
  en: { choose: 'Choose your language', chooseHelp: 'Your lessons, questions, results, and certificate will use this language.', continue: 'Continue to account', account: 'Learner account', accountHelp: 'Sign in with your email and private password. New here? Choose Sign up to create an account.', name: 'Full name', email: 'Email address', password: 'Password', confirm: 'Confirm password', create: 'Create account', welcome: 'Welcome', progress: 'Your safety training', start: 'Start course', resume: 'Continue course', cards: '8 detailed slides', questions: '5 questions', pass: '80% required', lesson: 'Working at Height', next: 'Next slide', quiz: 'Start assessment', question: 'Question', submit: 'Submit answers', passed: 'Congratulations, you’ve passed!', failed: 'Review the lesson and try again.', score: 'Your score', attempts: 'Attempts used', certificate: 'Certificate ready to download', download: 'Download certificate PDF', home: 'Home', retry: 'Try again', dashboard: 'Back to courses', profile: 'Profile & certificates', save: 'Change password', saved: 'Password changed successfully.', signout: 'Sign out', standard: 'OSHA references', lock: 'Three attempts used. This course will reactivate 24 hours after your last attempt.' },
  ar: { choose: 'اختر لغتك', chooseHelp: 'ستُعرض الدروس والأسئلة والنتائج والشهادة بهذه اللغة.', continue: 'المتابعة إلى الحساب', account: 'حساب المتدرب', accountHelp: 'أنشئ حساباً أو سجّل الدخول باستخدام بريدك الإلكتروني وكلمة مرور خاصة.', name: 'الاسم الكامل', email: 'البريد الإلكتروني', password: 'كلمة المرور', confirm: 'تأكيد كلمة المرور', create: 'إنشاء الحساب', welcome: 'مرحباً', progress: 'تدريب السلامة الخاص بك', start: 'ابدأ الدورة', resume: 'متابعة الدورة', cards: '8 شرائح تفصيلية', questions: '5 أسئلة', pass: 'النجاح من 80٪', lesson: 'العمل على ارتفاعات', next: 'الشريحة التالية', quiz: 'ابدأ التقييم', question: 'السؤال', submit: 'إرسال الإجابات', passed: 'تهانينا، لقد نجحت!', failed: 'راجع الدرس ثم حاول مرة أخرى.', score: 'درجتك', attempts: 'المحاولات المستخدمة', certificate: 'الشهادة جاهزة للتنزيل', download: 'تنزيل الشهادة PDF', home: 'الرئيسية', retry: 'حاول مرة أخرى', dashboard: 'العودة إلى الدورات', profile: 'الملف الشخصي والشهادات', save: 'تغيير كلمة المرور', saved: 'تم تغيير كلمة المرور بنجاح.', signout: 'تسجيل الخروج', standard: 'مراجع OSHA', lock: 'تم استخدام ثلاث محاولات. ستُفعّل الدورة بعد 24 ساعة من آخر محاولة.' },
  ur: { choose: 'اپنی زبان منتخب کریں', chooseHelp: 'آپ کے اسباق، سوالات، نتائج اور سرٹیفکیٹ اسی زبان میں ہوں گے۔', continue: 'اکاؤنٹ کی طرف جائیں', account: 'تربیتی اکاؤنٹ', accountHelp: 'اکاؤنٹ بنائیں یا اپنے ای میل اور نجی پاس ورڈ سے سائن اِن کریں۔', name: 'پورا نام', email: 'ای میل ایڈریس', password: 'پاس ورڈ', confirm: 'پاس ورڈ کی تصدیق', create: 'اکاؤنٹ بنائیں', welcome: 'خوش آمدید', progress: 'آپ کی حفاظتی تربیت', start: 'کورس شروع کریں', resume: 'کورس جاری رکھیں', cards: '8 تفصیلی سلائیڈز', questions: '5 سوالات', pass: '80٪ کامیابی ضروری', lesson: 'بلندی پر کام', next: 'اگلی سلائیڈ', quiz: 'جائزہ شروع کریں', question: 'سوال', submit: 'جوابات جمع کریں', passed: 'مبارک ہو، آپ کامیاب ہوگئے!', failed: 'سبق کا دوبارہ جائزہ لیں اور پھر کوشش کریں۔', score: 'آپ کا اسکور', attempts: 'استعمال شدہ کوششیں', certificate: 'سرٹیفکیٹ ڈاؤن لوڈ کے لیے تیار ہے', download: 'سرٹیفکیٹ PDF ڈاؤن لوڈ کریں', home: 'ہوم', retry: 'دوبارہ کوشش کریں', dashboard: 'کورسز پر واپس جائیں', profile: 'پروفائل اور سرٹیفکیٹس', save: 'پاس ورڈ تبدیل کریں', saved: 'پاس ورڈ کامیابی سے تبدیل ہوگیا۔', signout: 'سائن آؤٹ', standard: 'OSHA حوالہ جات', lock: 'تین کوششیں مکمل ہوگئیں۔ آخری کوشش کے 24 گھنٹے بعد کورس دوبارہ فعال ہوگا۔' },
  hi: { choose: 'अपनी भाषा चुनें', chooseHelp: 'आपके पाठ, प्रश्न, परिणाम और प्रमाणपत्र इसी भाषा में होंगे।', continue: 'खाते पर जाएँ', account: 'प्रशिक्षु खाता', accountHelp: 'खाता बनाएँ या अपने ईमेल और निजी पासवर्ड से साइन इन करें।', name: 'पूरा नाम', email: 'ईमेल पता', password: 'पासवर्ड', confirm: 'पासवर्ड की पुष्टि', create: 'खाता बनाएँ', welcome: 'स्वागत है', progress: 'आपका सुरक्षा प्रशिक्षण', start: 'पाठ्यक्रम शुरू करें', resume: 'पाठ्यक्रम जारी रखें', cards: '8 विस्तृत स्लाइड', questions: '5 प्रश्न', pass: '80% उत्तीर्ण अंक', lesson: 'ऊँचाई पर काम', next: 'अगली स्लाइड', quiz: 'मूल्यांकन शुरू करें', question: 'प्रश्न', submit: 'उत्तर जमा करें', passed: 'बधाई हो, आप उत्तीर्ण हुए!', failed: 'पाठ की समीक्षा करें और फिर प्रयास करें।', score: 'आपका अंक', attempts: 'प्रयुक्त प्रयास', certificate: 'प्रमाणपत्र डाउनलोड के लिए तैयार है', download: 'प्रमाणपत्र PDF डाउनलोड करें', home: 'होम', retry: 'फिर प्रयास करें', dashboard: 'पाठ्यक्रमों पर लौटें', profile: 'प्रोफ़ाइल और प्रमाणपत्र', save: 'पासवर्ड बदलें', saved: 'पासवर्ड सफलतापूर्वक बदल दिया गया।', signout: 'साइन आउट', standard: 'OSHA संदर्भ', lock: 'तीन प्रयास पूरे हो गए हैं। अंतिम प्रयास के 24 घंटे बाद पाठ्यक्रम फिर सक्रिय होगा।' },
  bn: { choose: 'আপনার ভাষা নির্বাচন করুন', chooseHelp: 'আপনার পাঠ, প্রশ্ন, ফলাফল এবং সনদ এই ভাষায় দেখানো হবে।', continue: 'অ্যাকাউন্টে যান', account: 'প্রশিক্ষণার্থীর অ্যাকাউন্ট', accountHelp: 'আপনার ইমেইল ও ব্যক্তিগত পাসওয়ার্ড দিয়ে সাইন ইন করুন। নতুন হলে সাইন আপ করুন।', name: 'পূর্ণ নাম', email: 'ইমেইল ঠিকানা', password: 'পাসওয়ার্ড', confirm: 'পাসওয়ার্ড নিশ্চিত করুন', create: 'অ্যাকাউন্ট তৈরি করুন', welcome: 'স্বাগতম', progress: 'আপনার নিরাপত্তা প্রশিক্ষণ', start: 'কোর্স শুরু করুন', resume: 'কোর্স চালিয়ে যান', cards: '৮টি বিস্তারিত স্লাইড', questions: '৫টি প্রশ্ন', pass: '৮০% পাস নম্বর', lesson: 'উচ্চতায় কাজ', next: 'পরবর্তী স্লাইড', quiz: 'মূল্যায়ন শুরু করুন', question: 'প্রশ্ন', submit: 'উত্তর জমা দিন', passed: 'অভিনন্দন, আপনি পাস করেছেন!', failed: 'পাঠটি পর্যালোচনা করে আবার চেষ্টা করুন।', score: 'আপনার নম্বর', attempts: 'ব্যবহৃত প্রচেষ্টা', certificate: 'সনদ ডাউনলোডের জন্য প্রস্তুত', download: 'সনদের PDF ডাউনলোড করুন', home: 'হোম', retry: 'আবার চেষ্টা করুন', dashboard: 'কোর্সে ফিরে যান', profile: 'প্রোফাইল ও সনদ', save: 'পাসওয়ার্ড পরিবর্তন করুন', saved: 'পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে।', signout: 'সাইন আউট', standard: 'OSHA রেফারেন্স', lock: 'তিনটি প্রচেষ্টা শেষ হয়েছে। শেষ প্রচেষ্টার ২৪ ঘণ্টা পরে কোর্সটি আবার সক্রিয় হবে।' },
};

const accountUi: Record<Lang, { createTab: string; signInTab: string; entryStep: string; noAccount: string; haveAccount: string; requiredName: string; nameRequired: string; signInNote: string; securityNote: string; wait: string; forgot: string; sessionEnded: string; showPassword: string; hidePassword: string; signupSuccess: string }> = {
  en: { createTab: 'Sign up', signInTab: 'Sign in', entryStep: 'Access your training', noAccount: 'Don’t have an account? Sign up', haveAccount: 'Already have an account? Sign in', requiredName: 'Required · printed on certificates', nameRequired: 'Enter your full name. It will appear on your certificates.', signInNote: 'Sign in with your registered email and password. Passwords are handled securely by Firebase Authentication.', securityNote: 'Your full name, email, and password are required to create an account. Passwords are handled by Firebase Authentication and are never written to Google Sheets.', wait: 'Please wait…', forgot: 'Forgot password?', sessionEnded: 'Your session could not be renewed. Sign in again; your selected answers remain on this device.', showPassword: 'Show password', hidePassword: 'Hide password', signupSuccess: 'Account created successfully. Please sign in with your email and password.' },
  ar: { createTab: 'إنشاء حساب', signInTab: 'تسجيل الدخول', entryStep: 'الوصول إلى التدريب', noAccount: 'ليس لديك حساب؟ أنشئ حساباً', haveAccount: 'لديك حساب بالفعل؟ سجّل الدخول', requiredName: 'مطلوب · يُطبع على الشهادات', nameRequired: 'أدخل اسمك الكامل. سيظهر على شهاداتك.', signInNote: 'سجّل الدخول باستخدام بريدك الإلكتروني المسجل وكلمة المرور. تُعالج كلمات المرور بأمان بواسطة Firebase.', securityNote: 'الاسم الكامل والبريد الإلكتروني وكلمة المرور مطلوبة لإنشاء حساب. تُعالج كلمات المرور بواسطة Firebase ولا تُكتب في جداول Google.', wait: 'يرجى الانتظار…', forgot: 'نسيت كلمة المرور؟', sessionEnded: 'تعذر تجديد الجلسة. سجّل الدخول مرة أخرى؛ ستبقى إجاباتك المحددة على هذا الجهاز.', showPassword: 'إظهار كلمة المرور', hidePassword: 'إخفاء كلمة المرور', signupSuccess: 'تم إنشاء الحساب بنجاح. يرجى تسجيل الدخول باستخدام بريدك الإلكتروني وكلمة المرور.' },
  ur: { createTab: 'سائن اپ', signInTab: 'سائن اِن', entryStep: 'اپنی تربیت تک رسائی', noAccount: 'اکاؤنٹ نہیں ہے؟ سائن اپ کریں', haveAccount: 'پہلے سے اکاؤنٹ ہے؟ سائن اِن کریں', requiredName: 'ضروری · سرٹیفکیٹ پر درج ہوگا', nameRequired: 'اپنا پورا نام درج کریں۔ یہ آپ کے سرٹیفکیٹس پر ظاہر ہوگا۔', signInNote: 'اپنے رجسٹرڈ ای میل اور پاس ورڈ سے سائن اِن کریں۔ پاس ورڈ Firebase محفوظ طریقے سے سنبھالتا ہے۔', securityNote: 'اکاؤنٹ بنانے کے لیے پورا نام، ای میل اور پاس ورڈ درکار ہیں۔ پاس ورڈ Firebase سنبھالتا ہے اور Google Sheets میں کبھی محفوظ نہیں ہوتا۔', wait: 'براہ کرم انتظار کریں…', forgot: 'پاس ورڈ بھول گئے؟', sessionEnded: 'سیشن کی تجدید نہیں ہو سکی۔ دوبارہ سائن اِن کریں؛ آپ کے منتخب جوابات اسی ڈیوائس پر رہیں گے۔', showPassword: 'پاس ورڈ دکھائیں', hidePassword: 'پاس ورڈ چھپائیں', signupSuccess: 'اکاؤنٹ کامیابی سے بن گیا۔ براہ کرم اپنے ای میل اور پاس ورڈ سے سائن اِن کریں۔' },
  hi: { createTab: 'साइन अप', signInTab: 'साइन इन', entryStep: 'अपना प्रशिक्षण खोलें', noAccount: 'खाता नहीं है? साइन अप करें', haveAccount: 'पहले से खाता है? साइन इन करें', requiredName: 'आवश्यक · प्रमाणपत्र पर मुद्रित होगा', nameRequired: 'अपना पूरा नाम दर्ज करें। यह आपके प्रमाणपत्रों पर दिखाई देगा।', signInNote: 'अपने पंजीकृत ईमेल और पासवर्ड से साइन इन करें। पासवर्ड Firebase Authentication द्वारा सुरक्षित रूप से संभाले जाते हैं।', securityNote: 'खाता बनाने के लिए पूरा नाम, ईमेल और पासवर्ड आवश्यक हैं। पासवर्ड Firebase संभालता है और Google Sheets में कभी नहीं लिखा जाता।', wait: 'कृपया प्रतीक्षा करें…', forgot: 'पासवर्ड भूल गए?', sessionEnded: 'सत्र नवीनीकृत नहीं हो सका। फिर साइन इन करें; चुने हुए उत्तर इसी डिवाइस पर बने रहेंगे।', showPassword: 'पासवर्ड दिखाएँ', hidePassword: 'पासवर्ड छिपाएँ', signupSuccess: 'खाता सफलतापूर्वक बन गया। कृपया अपने ईमेल और पासवर्ड से साइन इन करें।' },
  bn: { createTab: 'সাইন আপ', signInTab: 'সাইন ইন', entryStep: 'আপনার প্রশিক্ষণে প্রবেশ করুন', noAccount: 'অ্যাকাউন্ট নেই? সাইন আপ করুন', haveAccount: 'ইতিমধ্যে অ্যাকাউন্ট আছে? সাইন ইন করুন', requiredName: 'আবশ্যক · সনদে মুদ্রিত হবে', nameRequired: 'আপনার পূর্ণ নাম লিখুন। এটি সনদে দেখানো হবে।', signInNote: 'নিবন্ধিত ইমেইল ও পাসওয়ার্ড দিয়ে সাইন ইন করুন। Firebase Authentication নিরাপদে পাসওয়ার্ড পরিচালনা করে।', securityNote: 'অ্যাকাউন্ট তৈরির জন্য পূর্ণ নাম, ইমেইল ও পাসওয়ার্ড আবশ্যক। পাসওয়ার্ড Firebase পরিচালনা করে এবং Google Sheets-এ লেখা হয় না।', wait: 'অনুগ্রহ করে অপেক্ষা করুন…', forgot: 'পাসওয়ার্ড ভুলে গেছেন?', sessionEnded: 'সেশন নবায়ন করা যায়নি। আবার সাইন ইন করুন; নির্বাচিত উত্তর এই ডিভাইসে থাকবে।', showPassword: 'পাসওয়ার্ড দেখান', hidePassword: 'পাসওয়ার্ড লুকান', signupSuccess: 'অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে। ইমেইল ও পাসওয়ার্ড দিয়ে সাইন ইন করুন।' },
};

const idleMessages: Record<Lang, string> = {
  en: 'You were signed out after 30 minutes of inactivity. Please sign in again.',
  ar: 'تم تسجيل خروجك بعد 30 دقيقة من عدم النشاط. يرجى تسجيل الدخول مرة أخرى.',
  ur: '30 منٹ غیر فعال رہنے کے بعد آپ کو سائن آؤٹ کر دیا گیا۔ دوبارہ سائن اِن کریں۔',
  hi: '30 मिनट निष्क्रिय रहने के बाद आपको साइन आउट कर दिया गया। कृपया फिर साइन इन करें।',
  bn: '৩০ মিনিট কোনো কার্যক্রম না থাকায় আপনাকে সাইন আউট করা হয়েছে। আবার সাইন ইন করুন।',
};

const course = {
  en: {
    slides: [
      { n: '01', title: 'Recognize the fall hazard', text: 'Identify unprotected sides, floor openings, fragile surfaces, ladders, scaffolds and changing site conditions before work starts. Construction fall protection generally applies at 6 ft (1.8 m), with task-specific rules also applying.', ref: '29 CFR 1926.501; 1926.503' },
      { n: '02', title: 'Use the right protection', text: 'Prefer guardrails, covers or other engineered controls. When personal fall arrest is required, use approved components, a suitable anchorage and a properly fitted full-body harness. Inspect the complete system before use.', ref: '29 CFR 1926.502' },
      { n: '03', title: 'Plan and work safely', text: 'A competent person must address site hazards and training. Maintain safe access, protect openings, keep the area orderly and never alter a system without authorization. Stop work when conditions or equipment change.', ref: '29 CFR 1926.20; 1926.503' },
      { n: '04', title: 'Rescue and stop-work actions', text: 'A fall-arrest plan is incomplete without prompt rescue. Know how to summon help, do not improvise a rescue, isolate the area and remove impacted equipment from service until a competent person clears it.', ref: '29 CFR 1926.502(d)(20)–(21)' },
      { n: '05', title: 'Guardrail dimensions and strength', text: 'The top edge must be 42 in (1.1 m), plus or minus 3 in (8 cm), above the working level. When there is no wall or parapet at least 21 in (53 cm) high, install a midrail midway. The top rail must resist at least 200 lb (890 N); intermediate members must resist at least 150 lb (666 N).', ref: '29 CFR 1926.502(b)(1)–(5)' },
      { n: '06', title: 'Anchorage and fall clearance', text: 'A personal fall-arrest anchorage must be independent of platform-support anchorages and support at least 5,000 lb (22.2 kN) per attached worker, or be designed as a complete system with a safety factor of at least two under a qualified person. Plan total fall distance so the worker cannot strike a lower level.', ref: '29 CFR 1926.502(d)(15)–(16)' },
      { n: '07', title: 'Openings and falling objects', text: 'Protect holes, including skylights, with covers, guardrails or personal fall arrest as applicable. Covers must also prevent trips and falling objects. Use hard hats plus toeboards, screens, canopies or barricades where workers below may be struck. Toeboards must be at least 3½ in (9 cm) high.', ref: '29 CFR 1926.501(b)(4), 1926.501(c), 1926.502(j)' },
      { n: '08', title: 'Competent-person training', text: 'Workers exposed to fall hazards must be trained by a competent person to recognize hazards and correctly use, inspect, erect and maintain the protection provided. Retraining is required when the workplace, equipment or a worker’s demonstrated knowledge changes.', ref: '29 CFR 1926.503(a)–(c)' },
    ],
    quiz: [
      { q: 'At what height does general construction fall protection normally apply at an unprotected edge?', a: ['10 ft (3.0 m)', '6 ft (1.8 m)', '4 ft (1.2 m)', 'Only after a fall occurs'], correct: 1 },
      { q: 'Which guardrail arrangement meets the stated OSHA criteria?', a: ['A 30-in top rail only', 'Plastic banding at 42 in', 'A 42-in top rail (±3 in) with a midrail when required', 'A warning sign without rails'], correct: 2 },
      { q: 'What is the usual minimum anchorage capacity per attached employee for personal fall arrest?', a: ['5,000 lb (22.2 kN), unless a qualified-person system design applies', '500 lb (2.2 kN)', 'The worker’s body weight', '200 lb (890 N)'], correct: 0 },
      { q: 'What is required after a personal fall-arrest system stops a fall?', a: ['Return it immediately after a visual glance', 'Use it only for light work', 'Let the worker decide', 'Remove it from service until inspected and cleared by a competent person'], correct: 3 },
      { q: 'When is fall-protection retraining required?', a: ['Only every five years', 'When workplace/equipment changes or knowledge is inadequate', 'Only when requested by the worker', 'Never after initial training'], correct: 1 },
    ],
  },
  ar: {
    slides: [
      { n: '01', title: 'تعرّف على خطر السقوط', text: 'حدّد الحواف غير المحمية وفتحات الأرضيات والأسطح الهشة والسلالم والسقالات وتغيّر ظروف الموقع قبل بدء العمل. تطبّق الحماية من السقوط في أعمال الإنشاء عموماً عند ارتفاع 6 أقدام (1.8 م)، مع مراعاة القواعد الخاصة بكل مهمة.', ref: '29 CFR 1926.501; 1926.503' },
      { n: '02', title: 'استخدم وسيلة الحماية الصحيحة', text: 'أعطِ الأولوية للحواجز والأغطية والضوابط الهندسية. عند الحاجة إلى نظام إيقاف السقوط، استخدم مكونات معتمدة ونقطة تثبيت مناسبة وحزام جسم كامل مضبوطاً جيداً، وافحص النظام قبل الاستخدام.', ref: '29 CFR 1926.502' },
      { n: '03', title: 'خطط ونفّذ العمل بأمان', text: 'يجب أن يعالج الشخص المختص مخاطر الموقع ومتطلبات التدريب. حافظ على وصول آمن، واحمِ الفتحات، ورتّب منطقة العمل، ولا تعدّل نظام الحماية دون تصريح. أوقف العمل عند تغير الظروف أو المعدات.', ref: '29 CFR 1926.20; 1926.503' },
      { n: '04', title: 'الإنقاذ وإيقاف العمل', text: 'خطة إيقاف السقوط غير مكتملة دون إنقاذ سريع. اعرف طريقة طلب المساعدة، ولا ترتجل عملية إنقاذ، واعزل المنطقة، وأخرج المعدات المتأثرة من الخدمة حتى يعتمدها شخص مختص.', ref: '29 CFR 1926.502(d)(20)–(21)' },
      { n: '05', title: 'أبعاد الحواجز ومقاومتها', text: 'يكون ارتفاع الحافة العليا للحاجز 42 بوصة (1.1 م) مع سماحية ±3 بوصات (8 سم). عند عدم وجود جدار أو حاجز مصمت بارتفاع 21 بوصة (53 سم) على الأقل، يُركّب حاجز أوسط في منتصف المسافة. يتحمل الحاجز العلوي 200 رطل (890 نيوتن) على الأقل، والأجزاء الوسطية 150 رطلاً (666 نيوتن).', ref: '29 CFR 1926.502(b)(1)–(5)' },
      { n: '06', title: 'نقطة التثبيت ومسافة السقوط', text: 'يجب أن تكون نقطة تثبيت نظام إيقاف السقوط مستقلة عن نقاط تعليق المنصة وقادرة على تحمل 5000 رطل (22.2 كيلو نيوتن) لكل عامل، أو أن تكون جزءاً من نظام كامل بمعامل أمان لا يقل عن اثنين وتحت إشراف شخص مؤهل. احسب مسافة السقوط لمنع الاصطدام بمستوى أدنى.', ref: '29 CFR 1926.502(d)(15)–(16)' },
      { n: '07', title: 'الفتحات والأجسام الساقطة', text: 'تُحمى الفتحات، بما فيها المناور، بأغطية أو حواجز أو نظام إيقاف سقوط حسب الحالة. يجب أن تمنع الأغطية التعثر وسقوط المواد أيضاً. استخدم الخوذ مع حواجز قدم أو شِباك أو مظلات أو مناطق عزل. الحد الأدنى لارتفاع حاجز القدم 3½ بوصة (9 سم).', ref: '29 CFR 1926.501(b)(4), 1926.501(c), 1926.502(j)' },
      { n: '08', title: 'التدريب بواسطة شخص مختص', text: 'يجب أن يدرّب شخص مختص العاملين المعرّضين لخطر السقوط على تمييز المخاطر والاستخدام والفحص والتركيب والصيانة الصحيحة لأنظمة الحماية. يُعاد التدريب عند تغيّر الموقع أو المعدات أو ظهور قصور في معرفة العامل أو مهارته.', ref: '29 CFR 1926.503(a)–(c)' },
    ],
    quiz: [
      { q: 'متى تطبّق الحماية العامة من السقوط عند حافة غير محمية في الإنشاءات؟', a: ['10 أقدام', '6 أقدام (1.8 م)', '4 أقدام', 'بعد وقوع السقوط فقط'], correct: 1 },
      { q: 'أي ترتيب للحواجز يوافق المتطلبات المذكورة؟', a: ['حاجز علوي بارتفاع 30 بوصة فقط', 'شريط بلاستيكي بارتفاع 42 بوصة', 'حاجز علوي 42 بوصة ±3 بوصات وحاجز أوسط عند الحاجة', 'لافتة تحذير فقط'], correct: 2 },
      { q: 'ما قدرة التحمل المعتادة لنقطة تثبيت نظام إيقاف السقوط لكل عامل؟', a: ['5000 رطل (22.2 كيلو نيوتن)، ما لم يُستخدم تصميم نظام بإشراف شخص مؤهل', '500 رطل', 'وزن العامل فقط', '200 رطل'], correct: 0 },
      { q: 'ماذا يحدث للنظام بعد أن يوقف سقوطاً؟', a: ['يُعاد استخدامه فوراً', 'يُستخدم للأعمال الخفيفة', 'يقرر العامل وحده', 'يُخرج من الخدمة حتى يفحصه ويعتمده شخص مختص'], correct: 3 },
      { q: 'متى يلزم إعادة التدريب؟', a: ['كل خمس سنوات فقط', 'عند تغير الموقع أو المعدات أو عدم كفاية المعرفة', 'عند طلب العامل فقط', 'لا يلزم بعد التدريب الأول'], correct: 1 },
    ],
  },
  ur: {
    slides: [
      { n: '01', title: 'گرنے کے خطرے کو پہچانیں', text: 'کام شروع کرنے سے پہلے غیر محفوظ کناروں، فرش کے سوراخوں، نازک سطحوں، سیڑھیوں، اسکیفولڈ اور بدلتے ہوئے سائٹ حالات کی نشاندہی کریں۔ تعمیرات میں عموماً 6 فٹ (1.8 میٹر) پر فال پروٹیکشن درکار ہوتی ہے، جبکہ کام کے لحاظ سے مخصوص قواعد بھی لاگو ہوتے ہیں۔', ref: '29 CFR 1926.501; 1926.503' },
      { n: '02', title: 'درست تحفظ استعمال کریں', text: 'گارڈ ریل، کور یا دوسرے انجینئرنگ کنٹرول کو ترجیح دیں۔ ذاتی فال اریسٹ درکار ہو تو منظور شدہ حصے، مناسب اینکریج اور درست فِٹ والا فل باڈی ہارنس استعمال کریں۔ استعمال سے پہلے پورے نظام کا معائنہ کریں۔', ref: '29 CFR 1926.502' },
      { n: '03', title: 'منصوبہ بنائیں اور محفوظ کام کریں', text: 'مجاز شخص سائٹ کے خطرات اور تربیت کو دیکھے۔ محفوظ رسائی قائم رکھیں، سوراخ ڈھانپیں، جگہ صاف رکھیں اور اجازت کے بغیر نظام میں تبدیلی نہ کریں۔ حالات یا سامان بدلنے پر کام روک دیں۔', ref: '29 CFR 1926.20; 1926.503' },
      { n: '04', title: 'ریسکیو اور کام روکنے کے اقدامات', text: 'فوری ریسکیو کے بغیر فال اریسٹ منصوبہ نامکمل ہے۔ مدد بلانے کا طریقہ جانیں، خود ساختہ ریسکیو نہ کریں، علاقہ الگ کریں اور متاثرہ سامان کو مجاز شخص کی منظوری تک استعمال سے نکال دیں۔', ref: '29 CFR 1926.502(d)(20)–(21)' },
      { n: '05', title: 'گارڈ ریل کی پیمائش اور مضبوطی', text: 'ٹاپ ریل کام کی سطح سے 42 انچ (1.1 میٹر)، ±3 انچ (8 سینٹی میٹر) ہو۔ اگر دیوار یا پیراپیٹ کم از کم 21 انچ (53 سینٹی میٹر) نہ ہو تو درمیان میں مڈ ریل لگائیں۔ ٹاپ ریل کم از کم 200 پاؤنڈ (890 نیوٹن) اور درمیانی حصے 150 پاؤنڈ (666 نیوٹن) قوت برداشت کریں۔', ref: '29 CFR 1926.502(b)(1)–(5)' },
      { n: '06', title: 'اینکریج اور فال کلیئرنس', text: 'ذاتی فال اریسٹ اینکریج پلیٹ فارم کے سپورٹ اینکریج سے الگ ہو اور ہر منسلک کارکن کے لیے کم از کم 5000 پاؤنڈ (22.2 کلو نیوٹن) برداشت کرے، یا کسی اہل شخص کی نگرانی میں کم از کم دو کے حفاظتی عامل والے مکمل نظام کا حصہ ہو۔ نچلی سطح سے ٹکراؤ روکنے کے لیے مکمل فال فاصلہ شمار کریں۔', ref: '29 CFR 1926.502(d)(15)–(16)' },
      { n: '07', title: 'سوراخ اور گرتی اشیا', text: 'اسکائی لائٹ سمیت سوراخوں کو ضرورت کے مطابق کور، گارڈ ریل یا ذاتی فال اریسٹ سے محفوظ کریں۔ کور ٹھوکر اور اشیا کے گرنے کو بھی روکے۔ نیچے موجود کارکنوں کے لیے ہیلمٹ کے ساتھ ٹو بورڈ، اسکرین، کینوپی یا بیریکیڈ استعمال کریں۔ ٹو بورڈ کم از کم 3½ انچ (9 سینٹی میٹر) اونچا ہو۔', ref: '29 CFR 1926.501(b)(4), 1926.501(c), 1926.502(j)' },
      { n: '08', title: 'مجاز شخص کی تربیت', text: 'گرنے کے خطرے سے دوچار کارکنوں کو مجاز شخص خطرات پہچاننے اور حفاظتی نظام کے درست استعمال، معائنے، تنصیب اور دیکھ بھال کی تربیت دے۔ کام کی جگہ، سامان یا کارکن کی ظاہر شدہ سمجھ میں تبدیلی پر دوبارہ تربیت ضروری ہے۔', ref: '29 CFR 1926.503(a)–(c)' },
    ],
    quiz: [
      { q: 'تعمیرات میں غیر محفوظ کنارے پر عمومی فال پروٹیکشن کس بلندی پر درکار ہے؟', a: ['10 فٹ', '6 فٹ (1.8 میٹر)', '4 فٹ', 'صرف حادثے کے بعد'], correct: 1 },
      { q: 'کون سا گارڈ ریل انتظام بیان کردہ معیار پورا کرتا ہے؟', a: ['صرف 30 انچ ٹاپ ریل', '42 انچ پر پلاسٹک بینڈ', '42 انچ ±3 انچ ٹاپ ریل اور ضرورت پر مڈ ریل', 'صرف تنبیہی بورڈ'], correct: 2 },
      { q: 'ذاتی فال اریسٹ اینکریج کی عام کم از کم صلاحیت فی کارکن کیا ہے؟', a: ['5000 پاؤنڈ (22.2 کلو نیوٹن)، جب تک اہل شخص کا ڈیزائن شدہ نظام نہ ہو', '500 پاؤنڈ', 'صرف کارکن کا وزن', '200 پاؤنڈ'], correct: 0 },
      { q: 'فال روکنے کے بعد نظام کے ساتھ کیا کیا جائے؟', a: ['فوراً دوبارہ استعمال', 'صرف ہلکے کام میں استعمال', 'کارکن خود فیصلہ کرے', 'مجاز شخص کے معائنے اور منظوری تک استعمال سے خارج'], correct: 3 },
      { q: 'دوبارہ تربیت کب ضروری ہے؟', a: ['صرف ہر پانچ سال بعد', 'جگہ یا سامان بدلے یا علم ناکافی ہو', 'صرف کارکن کے کہنے پر', 'ابتدائی تربیت کے بعد کبھی نہیں'], correct: 1 },
    ],
  },
  hi: {
    slides: [
      { n: '01', title: 'गिरने के खतरे पहचानें', text: 'काम शुरू होने से पहले खुले किनारे, फ़र्श के छेद, नाज़ुक सतहें, सीढ़ियाँ, मचान और बदलती साइट स्थितियाँ पहचानें। निर्माण कार्य में सामान्यतः 6 फीट (1.8 मीटर) पर गिरने से सुरक्षा लागू होती है; कार्य-विशिष्ट नियम भी लागू हो सकते हैं।', ref: '29 CFR 1926.501; 1926.503' },
      { n: '02', title: 'सही सुरक्षा चुनें', text: 'गार्डरेल, कवर या अन्य इंजीनियरिंग नियंत्रण को प्राथमिकता दें। व्यक्तिगत फॉल-अरेस्ट आवश्यक हो तो अनुमोदित हिस्से, उपयुक्त एंकर और सही फिट वाला फुल-बॉडी हार्नेस इस्तेमाल करें। उपयोग से पहले पूरी प्रणाली जाँचें।', ref: '29 CFR 1926.502' },
      { n: '03', title: 'योजना बनाकर सुरक्षित काम करें', text: 'सक्षम व्यक्ति साइट के खतरों और प्रशिक्षण का प्रबंध करे। सुरक्षित पहुँच रखें, खुले स्थान सुरक्षित करें, कार्यक्षेत्र व्यवस्थित रखें और अनुमति के बिना प्रणाली न बदलें। स्थिति या उपकरण बदलने पर काम रोकें।', ref: '29 CFR 1926.20; 1926.503' },
      { n: '04', title: 'बचाव और काम रोकने की कार्रवाई', text: 'शीघ्र बचाव के बिना फॉल-अरेस्ट योजना अधूरी है। सहायता बुलाने की विधि जानें, मनमाना बचाव न करें, क्षेत्र को अलग करें और प्रभावित उपकरण को सक्षम व्यक्ति की मंज़ूरी तक सेवा से बाहर रखें।', ref: '29 CFR 1926.502(d)(20)–(21)' },
      { n: '05', title: 'गार्डरेल की माप और मजबूती', text: 'टॉप रेल कार्य-स्तर से 42 इंच (1.1 मीटर), ±3 इंच (8 सेमी) ऊँची होनी चाहिए। कम-से-कम 21 इंच (53 सेमी) की दीवार या पैरापेट न हो तो बीच में मिडरेल लगाएँ। टॉप रेल कम-से-कम 200 पाउंड (890 N) और मध्य सदस्य 150 पाउंड (666 N) बल सहें।', ref: '29 CFR 1926.502(b)(1)–(5)' },
      { n: '06', title: 'एंकर और गिरने की दूरी', text: 'व्यक्तिगत फॉल-अरेस्ट एंकर प्लेटफ़ॉर्म-सपोर्ट एंकर से स्वतंत्र हो और प्रत्येक जुड़े कर्मचारी के लिए कम-से-कम 5,000 पाउंड (22.2 kN) सह सके, या योग्य व्यक्ति की देखरेख में कम-से-कम दो सुरक्षा-गुणक वाले पूर्ण सिस्टम का हिस्सा हो। निचले स्तर से टकराव रोकने के लिए पूरी फॉल दूरी की गणना करें।', ref: '29 CFR 1926.502(d)(15)–(16)' },
      { n: '07', title: 'खुले स्थान और गिरती वस्तुएँ', text: 'स्काइलाइट सहित खुले स्थानों को परिस्थिति के अनुसार कवर, गार्डरेल या व्यक्तिगत फॉल-अरेस्ट से सुरक्षित करें। कवर ठोकर और वस्तुओं के गिरने को भी रोकें। नीचे के कर्मियों के लिए हार्ड हैट के साथ टोबोर्ड, स्क्रीन, कैनोपी या बैरिकेड लगाएँ। टोबोर्ड कम-से-कम 3½ इंच (9 सेमी) ऊँचा हो।', ref: '29 CFR 1926.501(b)(4), 1926.501(c), 1926.502(j)' },
      { n: '08', title: 'सक्षम व्यक्ति द्वारा प्रशिक्षण', text: 'गिरने के जोखिम वाले कर्मचारियों को सक्षम व्यक्ति खतरे पहचानने और सुरक्षा प्रणालियों के सही उपयोग, निरीक्षण, स्थापना और रखरखाव का प्रशिक्षण दे। कार्यस्थल, उपकरण या कर्मचारी की प्रदर्शित समझ बदलने पर पुनः प्रशिक्षण आवश्यक है।', ref: '29 CFR 1926.503(a)–(c)' },
    ],
    quiz: [
      { q: 'निर्माण में असुरक्षित किनारे पर सामान्य गिरावट-सुरक्षा किस ऊँचाई से लागू होती है?', a: ['10 फीट', '6 फीट (1.8 मीटर)', '4 फीट', 'केवल गिरने के बाद'], correct: 1 },
      { q: 'कौन-सी गार्डरेल व्यवस्था बताए गए मानदंड को पूरा करती है?', a: ['केवल 30 इंच टॉप रेल', '42 इंच पर प्लास्टिक बैंड', '42 इंच ±3 इंच टॉप रेल और आवश्यकता पर मिडरेल', 'केवल चेतावनी संकेत'], correct: 2 },
      { q: 'व्यक्तिगत फॉल-अरेस्ट एंकर की सामान्य न्यूनतम क्षमता प्रति कर्मचारी क्या है?', a: ['5,000 पाउंड (22.2 kN), जब तक योग्य व्यक्ति की सिस्टम डिज़ाइन लागू न हो', '500 पाउंड', 'केवल कर्मचारी का वजन', '200 पाउंड'], correct: 0 },
      { q: 'गिरावट रोकने के बाद सिस्टम के साथ क्या करना चाहिए?', a: ['तुरंत दोबारा उपयोग', 'केवल हल्के काम में उपयोग', 'कर्मचारी स्वयं तय करे', 'सक्षम व्यक्ति के निरीक्षण और स्वीकृति तक सेवा से बाहर रखें'], correct: 3 },
      { q: 'पुनः प्रशिक्षण कब आवश्यक है?', a: ['केवल हर पाँच वर्ष', 'कार्यस्थल/उपकरण बदले या ज्ञान अपर्याप्त हो', 'केवल कर्मचारी के अनुरोध पर', 'प्रारंभिक प्रशिक्षण के बाद कभी नहीं'], correct: 1 },
    ],
  },
};

export default function Home() {
  const [lang, setLang] = useState<Lang>('en');
  const [selected, setSelected] = useState<Lang | ''>('en');
  const [view, setView] = useState<View>('account');
  const [slide, setSlide] = useState(0);
  const [answers, setAnswers] = useState<number[]>(() => Array(5).fill(-1));
  const [attempts, setAttempts] = useState(0);
  const [passed, setPassed] = useState(false);
  const [score, setScore] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [idToken, setIdToken] = useState('');
  const [authMode, setAuthMode] = useState<'signup' | 'signin'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [authNotice, setAuthNotice] = useState('');
  const [lockoutUntil, setLockoutUntil] = useState('');
  const [certificate, setCertificate] = useState<CertificateRecord | null>(null);
  const [certificates, setCertificates] = useState<CertificateRecord[]>([]);
  const [passwordMessage, setPasswordMessage] = useState('');
  const [serviceWarning, setServiceWarning] = useState('');
  const [takeawayRevealed, setTakeawayRevealed] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [activeCourseId, setActiveCourseId] = useState('WAH-001');
  const [completedCourseIds, setCompletedCourseIds] = useState<string[]>([]);
  const [projectRegion, setProjectRegion] = useState<SaudiProjectRegion | ''>('');
  const [city, setCity] = useState('');
  const [customCity, setCustomCity] = useState('');
  const activeCourse = courseCatalog.find((item) => item.id === activeCourseId) || courseCatalog[0];
  const baseLang: CourseLanguage = lang === 'bn' ? 'en' : lang;
  const lessons: Record<string, CourseLesson> = {
    'CSP-002': confinedSpaceCourse[baseLang], 'SCA-003': scaffoldCourse[baseLang], 'FOP-004': fallingObjectCourse[baseLang],
    'HEM-005': equipmentCourse[baseLang], 'MMI-006': manMachineCourse[baseLang], 'RIG-007': riggingCourse[baseLang],
    'SIG-008': signalCourse[baseLang], 'FIR-009': fireCourse[baseLang], 'HSK-010': housekeepingCourse[baseLang],
    'EXC-011': excavationCourse[baseLang], 'ELC-012': electricalCourse[baseLang], 'LOTO-013': lotoCourse[baseLang],
    'PPE-014': ppeCourse[baseLang], 'HPT-015': toolsCourse[baseLang], 'HAZ-016': hazcomCourse[baseLang], 'EMR-017': emergencyCourse[baseLang],
    'STM-018': materialStorageCourse[baseLang], 'PTW-019': permitToWorkCourse[baseLang], 'BAR-020': barriersSignsCourse[baseLang],
    'FLO-021': floorOpeningCourse[baseLang], 'TBT-022': toolboxTalkCourse[baseLang], 'MHL-023': manualHandlingCourse[baseLang],
  };
  const data = lang === 'bn' ? banglaCourses[activeCourseId] : lessons[activeCourseId] || course[baseLang];
  const courseTitle = lang === 'bn' ? banglaCourses[activeCourse.id].title : activeCourse.titles[baseLang];
  const t = { ...copy[lang], lesson: courseTitle };
  const accountText = accountUi[lang];
  const rtl = languages.find((item) => item.code === lang)?.rtl;
  const allAnswered = answers.every((value) => value >= 0);
  const locked = Boolean(lockoutUntil && new Date(lockoutUntil) > new Date()) && !passed;
  const firstIncompleteIndex = courseCatalog.findIndex((item) => !completedCourseIds.includes(item.id));
  const availableCourseCount = courseCatalog.filter((item, index) => item.contentReady && (completedCourseIds.includes(item.id) || index === firstIncompleteIndex)).length;
  const currentSlide = data.slides[slide];
  const presentation = useMemo(() => presentSlide(currentSlide.title, currentSlide.text), [currentSlide.title, currentSlide.text]);
  const lessonText = lessonUi[lang];

  useEffect(() => {
    setTakeawayRevealed(false);
    setSpeaking(false);
    window.speechSynthesis?.cancel();
  }, [slide, activeCourseId, lang, view]);

  function toggleNarration() {
    if (!('speechSynthesis' in window)) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(`${currentSlide.title}. ${currentSlide.text}`);
    utterance.lang = { en: 'en-US', ar: 'ar-SA', ur: 'ur-PK', hi: 'hi-IN', bn: 'bn-BD' }[lang];
    utterance.rate = 0.92;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  }

  function selectCourse(courseId: string) {
    setActiveCourseId(courseId);
    setSlide(0);
    setAnswers(Array(5).fill(-1));
    setAttempts(0);
    setPassed(false);
    setScore(0);
    setCertificate(null);
    setLockoutUntil('');
    setError('');
    setTakeawayRevealed(false);
  }

  function persistSession(session: FirebaseSession, details: Omit<StoredAuth, 'refreshToken'>) {
    const stored: StoredAuth = { ...details, refreshToken: session.refreshToken };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(stored));
    if (!localStorage.getItem(IDLE_ACTIVITY_KEY)) localStorage.setItem(IDLE_ACTIVITY_KEY, String(Date.now()));
    setIdToken(session.idToken);
  }

  async function renewIdToken() {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) throw new Error(accountText.sessionEnded);
    const stored = JSON.parse(raw) as StoredAuth;
    if (!stored.refreshToken) throw new Error(accountText.sessionEnded);
    const session = await refreshSession(stored.refreshToken);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ ...stored, refreshToken: session.refreshToken }));
    setIdToken(session.idToken);
    return session.idToken;
  }

  useEffect(() => {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return;
    let stored: StoredAuth;
    try {
      stored = JSON.parse(raw) as StoredAuth;
      if (!stored.refreshToken || !stored.email) throw new Error('Invalid stored session.');
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return;
    }

    setBusy(true);
    refreshSession(stored.refreshToken).then((session) => {
      persistSession(session, {
        email: stored.email,
        name: stored.name,
        language: stored.language,
        completedCourseIds: stored.completedCourseIds || [],
        projectRegion: stored.projectRegion || '', city: stored.city || '',
      });
      setLang(stored.language);
      setSelected(stored.language);
      setName(stored.name);
      setEmail(stored.email);
      setCompletedCourseIds(stored.completedCourseIds || []);
      setProjectRegion(stored.projectRegion || '');
      setCity(stored.city || '');
      setView('dashboard');
    }).catch(() => {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }).finally(() => setBusy(false));
  }, []);

  useEffect(() => {
    if (!idToken) return;
    const timer = window.setInterval(() => { renewIdToken().catch(() => undefined); }, 45 * 60 * 1000);
    const refreshWhenVisible = () => { if (document.visibilityState === 'visible') renewIdToken().catch(() => undefined); };
    document.addEventListener('visibilitychange', refreshWhenVisible);
    return () => { window.clearInterval(timer); document.removeEventListener('visibilitychange', refreshWhenVisible); };
  }, [idToken]);

  useEffect(() => {
    if (!idToken) return;
    let lastActivity = Number(localStorage.getItem(IDLE_ACTIVITY_KEY)) || Date.now();
    let lastStored = lastActivity;
    const recordActivity = () => {
      lastActivity = Date.now();
      if (lastActivity - lastStored >= 5000) {
        localStorage.setItem(IDLE_ACTIVITY_KEY, String(lastActivity));
        lastStored = lastActivity;
      }
    };
    const checkIdle = () => {
      lastActivity = Math.max(lastActivity, Number(localStorage.getItem(IDLE_ACTIVITY_KEY)) || 0);
      if (Date.now() - lastActivity < IDLE_TIMEOUT_MS) return;
      signOut();
      setError(idleMessages[lang]);
    };
    const activityEvents: Array<keyof WindowEventMap> = ['pointerdown', 'keydown', 'touchstart', 'scroll'];
    activityEvents.forEach((eventName) => window.addEventListener(eventName, recordActivity, { passive: true }));
    document.addEventListener('visibilitychange', checkIdle);
    const idleTimer = window.setInterval(checkIdle, 15000);
    checkIdle();
    return () => {
      activityEvents.forEach((eventName) => window.removeEventListener(eventName, recordActivity));
      document.removeEventListener('visibilitychange', checkIdle);
      window.clearInterval(idleTimer);
    };
  }, [idToken, lang]);

  useEffect(() => {
    if ((view !== 'profile' && view !== 'dashboard') || !idToken) return;
    getProfile(idToken).then((profile) => {
      setName(profile.fullName || name);
      setCertificates(profile.certificates);
      setCompletedCourseIds((current) => Array.from(new Set([...current, ...profile.completedCourseIds])));
      setServiceWarning('');
    }).catch(() => setServiceWarning('You are signed in. Training records are temporarily unavailable; locally saved progress is shown.'));
  }, [view, idToken]);

  useEffect(() => {
    setAnswers(Array(5).fill(-1));
    setError('');
  }, [activeCourseId, lang]);

  useEffect(() => {
    if (view !== 'dashboard') return;
    const firstIncomplete = courseCatalog.find((item) => !completedCourseIds.includes(item.id));
    if (firstIncomplete && (activeCourseId === 'WAH-001' || completedCourseIds.includes(activeCourseId))) {
      setActiveCourseId(firstIncomplete.id);
      setAnswers(Array(5).fill(-1));
      setAttempts(0);
      setPassed(false);
      setLockoutUntil('');
    }
  }, [completedCourseIds, view]);

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

  function goHome() {
    setError('');
    setAuthNotice('');
    setView(idToken ? 'dashboard' : 'account');
  }

  async function authenticate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const authForm = event.currentTarget;
    const form = new FormData(authForm);
    const fullName = String(form.get('name') || '').trim();
    const accountEmail = String(form.get('email') || '').trim();
    const first = String(form.get('password') || '');
    const second = String(form.get('confirm') || '');
    const selectedRegion = String(form.get('projectRegion') || '') as SaudiProjectRegion | '';
    const cityChoice = String(form.get('city') || '').trim();
    const selectedCity = cityChoice === '__other__' ? String(form.get('customCity') || '').trim() : cityChoice;
    if (authMode === 'signup' && !fullName) {
      setError(accountText.nameRequired);
      return;
    }
    if (authMode === 'signup' && (!selectedRegion || !selectedCity)) {
      setError('Select your Saudi project region and city.');
      return;
    }
    if (first.length < 8 || (authMode === 'signup' && first !== second)) {
      setError('Passwords must match and contain at least 8 characters.');
      return;
    }
    setBusy(true);
    setError('');
    setAuthNotice('');
    try {
      if (authMode === 'signup') {
        const session = await signUp(accountEmail, first, fullName);
        const resolvedName = fullName;
        try { await registerLearner(session.idToken, resolvedName, lang, selectedRegion, selectedCity); } catch { /* Registration is retried after sign-in. */ }
        setProjectRegion(selectedRegion); setCity(selectedCity);
        authForm.reset();
        const emailInput = authForm.elements.namedItem('email') as HTMLInputElement | null;
        if (emailInput) emailInput.value = accountEmail;
        setShowPassword(false);
        setAuthMode('signin');
        setAuthNotice(accountText.signupSuccess);
        return;
      }
      const session = await signIn(accountEmail, first);
      const resolvedName = fullName || session.displayName || accountEmail.split('@')[0];
      persistSession(session, {
        email: session.email || accountEmail,
        name: resolvedName,
        language: lang,
        completedCourseIds,
        projectRegion, city,
      });
      setName(resolvedName);
      setEmail(session.email || accountEmail);
      setView('dashboard');
      try {
        await registerLearner(session.idToken, resolvedName, lang, projectRegion, city);
        setServiceWarning('');
      } catch {
        setServiceWarning('You are signed in. Training records are temporarily unavailable; please retry from your course or profile.');
      }
    } catch (problem) {
      setError(problem instanceof Error ? problem.message : 'Unable to sign in.');
    } finally {
      setBusy(false);
    }
  }

  async function gradeQuiz() {
    const correct = answers.reduce((total, answer, index) => total + (answer === data.quiz[index].correct ? 1 : 0), 0);
    const result = correct * 20;
    setBusy(true);
    setError('');
    try {
      const freshIdToken = await renewIdToken();
      const record = await submitAttempt({
        idToken: freshIdToken, courseId: activeCourse.id, courseTitle, learnerName: name,
        language: lang, answers, scorePercent: result, correctAnswers: correct,
        totalQuestions: data.quiz.length, startedAt: new Date().toISOString(),
        oshaReferences: activeCourse.references,
      });
      setScore(result);
      setAttempts(record.attemptNumber);
      setPassed(record.passed);
      setLockoutUntil(record.lockoutUntil || '');
      setCertificate(record.certificate || null);
      if (record.passed) {
        if (record.certificate) {
          setCertificates((current) => [record.certificate!, ...current.filter((item) => item.certificateId !== record.certificate!.certificateId)]);
        }
        const nextCompleted = Array.from(new Set([...completedCourseIds, activeCourse.id]));
        setCompletedCourseIds(nextCompleted);
        const raw = localStorage.getItem(AUTH_STORAGE_KEY);
        if (raw) {
          const stored = JSON.parse(raw) as StoredAuth;
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ ...stored, completedCourseIds: nextCompleted }));
        }
      }
      setView('result');
    } catch (problem) {
      const message = problem instanceof Error ? problem.message : 'Unable to record the assessment.';
      if (/authentication|required|session|token/i.test(message)) {
        setAuthMode('signin');
        setView('account');
        setError(accountText.sessionEnded);
      } else {
        setError(message);
      }
    } finally {
      setBusy(false);
    }
  }

  function retry() {
    setAnswers(Array(5).fill(-1));
    setSlide(0);
    setView('lesson');
  }

  async function updatePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const first = String(form.get('password') || '');
    const second = String(form.get('confirm') || '');
    if (first.length < 8 || first !== second) { setPasswordMessage('Passwords must match and contain at least 8 characters.'); return; }
    setBusy(true);
    try {
      const freshIdToken = await renewIdToken();
      const session = await changePassword(freshIdToken, first);
      persistSession(session, { email, name, language: lang, completedCourseIds, projectRegion, city });
      setPasswordMessage(t.saved);
      event.currentTarget.reset();
    } catch (problem) {
      setPasswordMessage(problem instanceof Error ? problem.message : 'Password change failed.');
    } finally { setBusy(false); }
  }

  function signOut() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(IDLE_ACTIVITY_KEY);
    setView('account'); setSelected(lang); setAuthMode('signin'); setShowPassword(false); setName(''); setEmail(''); setIdToken('');
    setAnswers(Array(5).fill(-1)); setAttempts(0); setPassed(false); setCertificates([]); setCertificate(null); setError(''); setAuthNotice(''); setServiceWarning('');
    setCompletedCourseIds([]); setActiveCourseId('WAH-001'); setProjectRegion(''); setCity(''); setCustomCity('');
  }

  return (
    <main className="min-h-screen bg-[#f3f7f4] text-[#102219]" dir={rtl ? 'rtl' : 'ltr'}>
      <header className="sticky top-0 z-20 border-b border-[#dce7df] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between px-5 sm:px-8">
          <button type="button" onClick={goHome} aria-label="TDC Safety Academy home"><Image src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/tdc-logo.png`} alt="TDC Contracting" width={150} height={52} priority className="h-auto w-[94px] sm:w-[118px]" /></button>
          <div className="flex items-center gap-2">
            <button type="button" onClick={goHome} className="rounded-full border border-[#d6e3da] px-3 py-2 text-xs font-bold text-[#31513f]">{t.home}</button>
            {view !== 'language' && view !== 'account' && <button type="button" onClick={() => setView('profile')} title={t.profile} className="max-w-[7.5rem] truncate rounded-full border border-[#d6e3da] px-3 py-2 text-xs font-bold text-[#31513f]">{t.profile}</button>}
            {view !== 'language' && view !== 'account' ? <span className="hidden rounded-full bg-[#eaf6ee] px-3 py-2 text-xs font-bold text-[#087a41] sm:block">{progress}%</span> : <span className="hidden rounded-full bg-[#eaf6ee] px-3 py-2 text-xs font-bold text-[#087a41] sm:block">OSHA 1910 + 1926</span>}
          </div>
        </div>
      </header>

      {view === 'language' && (
        <section className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-14 lg:py-16">
          <div><span className="eyebrow">TDC Safety Academy · Start safe. Work safe. Return safe.</span><h1 className="hero-title">Improving TDC Health &amp; Safety Culture</h1><p className="hero-copy">Mobile safety training based on OSHA 1910 and 1926 standards, with focused learning cards, verified assessments and completion records.</p><div className="mt-7 flex flex-wrap gap-3"><span className="pill">80% pass score</span><span className="pill">3 attempts</span><span className="pill">24-hour reset</span></div></div>
          <div className="panel"><p className="step">Step 1 of 3</p><h2 className="panel-title">{t.choose}</h2><p className="panel-copy">{t.chooseHelp}</p><div className="mt-6 grid grid-cols-2 gap-3" role="radiogroup" aria-label="Training language">{languages.map((language) => <button key={language.code} type="button" role="radio" aria-checked={selected === language.code} onClick={() => setSelected(language.code)} className={`language-card ${selected === language.code ? 'selected' : ''}`}><span className="block text-lg font-extrabold" dir={language.rtl ? 'rtl' : 'ltr'}>{language.local}</span><span className="mt-1 block text-xs text-[#687970]">{language.name} · {language.rtl ? 'RTL' : 'LTR'}</span></button>)}</div><button type="button" disabled={!selected} onClick={chooseLanguage} className="primary-button mt-6">{copy[selected || 'en'].continue}</button></div>
        </section>
      )}

      {view === 'account' && (
        <section className="narrow">
          <div className="mb-6 text-center">
            <p className="eyebrow">TDC Internal HSE Learning Portal</p>
            <h1 className="mt-2 text-2xl font-black tracking-tight text-[#102219] sm:text-3xl">Improving TDC Health &amp; Safety Culture</h1>
          </div>
          <button type="button" onClick={() => setView('language')} className="back-link">← {copy[lang].choose}</button>
          <div className="panel mt-4">
            <p className="step">{accountText.entryStep}</p><h1 className="panel-title">{t.account}</h1><p className="panel-copy">{t.accountHelp}</p>
            <form onSubmit={authenticate} className="mt-6 space-y-4">
              {authMode === 'signup' && <label className="field"><span>{t.name}</span><input name="name" autoComplete="name" placeholder={accountText.requiredName} required /></label>}
              {authMode === 'signup' && <label className="field"><span>Saudi project region</span><select name="projectRegion" value={projectRegion} required onChange={(event) => { setProjectRegion(event.target.value as SaudiProjectRegion); setCity(''); }}><option value="">Select project region</option>{saudiProjectRegions.map((region) => <option key={region} value={region}>{region}</option>)}</select></label>}
              {authMode === 'signup' && <label className="field"><span>City</span><select name="city" value={city} required disabled={!projectRegion} onChange={(event) => { setCity(event.target.value); setCustomCity(''); }}><option value="">{projectRegion ? 'Select city' : 'Select a region first'}</option>{projectRegion && saudiProjectLocations[projectRegion].map((location) => <option key={location} value={location}>{location}</option>)}{projectRegion && <option value="__other__">Other Saudi city / project site</option>}</select></label>}
              {authMode === 'signup' && city === '__other__' && <label className="field"><span>Enter city or project site</span><input name="customCity" value={customCity} onChange={(event) => setCustomCity(event.target.value)} required maxLength={100} /></label>}
              <label className="field"><span>{t.email}</span><input name="email" type="email" required autoComplete="email" /></label>
              <label className="field"><span>{t.password}</span><input name="password" type={showPassword ? 'text' : 'password'} required minLength={8} autoComplete={authMode === 'signup' ? 'new-password' : 'current-password'} /></label>
              {authMode === 'signup' && <label className="field"><span>{t.confirm}</span><input name="confirm" type={showPassword ? 'text' : 'password'} required minLength={8} autoComplete="new-password" /></label>}
              <label className="show-password"><input type="checkbox" checked={showPassword} onChange={(event) => setShowPassword(event.target.checked)} /><span>{showPassword ? accountText.hidePassword : accountText.showPassword}</span></label>
              <p className="text-xs text-[#6d7c73]">{authMode === 'signup' ? accountText.securityNote : accountText.signInNote}</p>
              {authNotice && <p className="rounded-xl bg-[#eaf7ee] p-3 text-sm font-bold text-[#08733e]">{authNotice}</p>}
              {error && <p className="rounded-xl bg-[#fff0ec] p-3 text-sm font-bold text-[#9a302b]">{error}</p>}
              <button disabled={busy} className="primary-button">{busy ? accountText.wait : authMode === 'signup' ? t.create : accountText.signInTab}</button>
              {authMode === 'signin' && <button type="button" className="w-full text-sm font-bold text-[#087b41]" onClick={async () => { const accountEmail = (document.querySelector('input[name=email]') as HTMLInputElement)?.value; if (!accountEmail) { setError('Enter your email address first.'); return; } try { await sendPasswordReset(accountEmail); setError('Password reset email sent.'); } catch (problem) { setError(problem instanceof Error ? problem.message : 'Reset failed.'); } }}>{accountText.forgot}</button>}
              <div className="border-t border-[#dce7df] pt-4 text-center">
                <button type="button" className="text-sm font-bold text-[#087b41]" onClick={() => { setAuthMode(authMode === 'signin' ? 'signup' : 'signin'); setShowPassword(false); setError(''); setAuthNotice(''); }}>{authMode === 'signin' ? accountText.noAccount : accountText.haveAccount}</button>
              </div>
            </form>
          </div>
        </section>
      )}

      {view === 'dashboard' && (
        <section className="mx-auto w-full max-w-6xl px-5 py-9 sm:px-8">
          <p className="step">{t.welcome}, {name || 'Learner'}</p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <div><h1 className="text-3xl font-black tracking-tight sm:text-4xl">{t.progress}</h1><p className="mt-2 text-sm text-[#65756c]">{email}</p></div>
            <span className="pill">{availableCourseCount} course active · {completedCourseIds.length}/{courseCatalog.length} completed</span>
          </div>
          {serviceWarning && <p className="mt-5 rounded-xl bg-[#fff3dd] p-4 text-sm font-semibold text-[#7a5011]">{serviceWarning}</p>}
          <article className="course-card mt-8">
            <div className="course-visual"><span>{String(courseCatalog.findIndex((item) => item.id === activeCourse.id) + 1).padStart(2, '0')}</span><b>{activeCourse.shortLabel}</b></div>
            <div className="flex-1 p-6 sm:p-8">
              <div className="flex flex-wrap gap-2"><span className="tag">{activeCourse.standard}</span><span className="tag">{completedCourseIds.includes(activeCourse.id) ? 'Completed · Review available' : 'Current course'}</span></div>
              <h2 className="mt-5 text-2xl font-black">{courseTitle}</h2>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#596b61]"><span>{t.cards}</span><span>{t.questions}</span><span>{t.pass}</span></div>
              {locked && <div className="mt-5 rounded-xl bg-[#fff3dd] p-4 text-sm font-semibold text-[#7a5011]">{t.lock}<br/>{lockoutUntil}</div>}
              {!activeCourse.contentReady && <p className="mt-5 rounded-xl bg-[#eef4f0] p-4 text-sm font-semibold text-[#52665a]">This OSHA module is listed in the sequence and its reviewed lesson is being prepared.</p>}
              <button type="button" disabled={locked || !activeCourse.contentReady} onClick={() => { setSlide(0); setAnswers(Array(data.quiz.length).fill(-1)); setView('lesson'); }} className="primary-button mt-6 sm:w-auto sm:px-8">{completedCourseIds.includes(activeCourse.id) ? 'Review course' : attempts ? t.resume : t.start}</button>
            </div>
          </article>
          <h2 className="mt-10 text-lg font-black">Construction safety course sequence</h2>
          <p className="mt-2 text-sm text-[#607067]">Pass the current course with 80% or higher to unlock the next course.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {courseCatalog.map((item, index) => {
              const completed = completedCourseIds.includes(item.id);
              const unlocked = completed || index === firstIncompleteIndex;
              const selectable = unlocked && item.contentReady;
              return <button key={item.id} type="button" disabled={!selectable} onClick={() => selectCourse(item.id)} className={`catalog-card ${activeCourse.id === item.id ? 'active' : ''}`}>
                <span className={`catalog-status ${completed ? 'complete' : unlocked ? 'current' : ''}`}>{completed ? '✓ Completed' : unlocked ? (item.contentReady ? 'Available now' : 'Content in preparation') : '🔒 Locked'}</span>
                <span className="mt-3 block text-xs font-bold text-[#718078]">{String(index + 1).padStart(2, '0')} · {item.standard}</span>
                <strong className="mt-2 block text-base">{lang === 'bn' ? banglaCourses[item.id].title : item.titles[baseLang]}</strong>
              </button>;
            })}
          </div>
        </section>
      )}

      {view === 'lesson' && (
        <section className="narrow-wide lesson-shell">
          <div className="flex items-center justify-between gap-4">
            <button type="button" className="back-link" onClick={() => setView('dashboard')}>← {t.dashboard}</button>
            <span className="slide-counter">{lessonText.slide} {slide + 1} / {data.slides.length}</span>
          </div>
          <div className="lesson-progress" aria-label={`${slide + 1} of ${data.slides.length}`}>
            <div style={{ width: `${((slide + 1) / data.slides.length) * 100}%` }} />
          </div>
          <div className="slide-dots" aria-label="Course slide navigation">
            {data.slides.map((item, index) => <button key={item.n} type="button" aria-label={`${lessonText.slide} ${index + 1}`} aria-current={index === slide ? 'step' : undefined} className={index === slide ? 'active' : index < slide ? 'visited' : ''} onClick={() => setSlide(index)} />)}
          </div>

          <article className={`lesson-card interactive-lesson tone-${presentation.visual.tone}`}>
            <div className="lesson-number">{currentSlide.n}</div>
            <header className="lesson-heading">
              <div className="lesson-icon" aria-hidden="true">{presentation.visual.icon}</div>
              <div>
                <p className="step">{lessonText.focus} · {t.lesson}</p>
                <h1>{currentSlide.title}</h1>
              </div>
            </header>

            <div className="lesson-lead">{presentation.lead}</div>

            {presentation.figures.length > 0 && <section className="key-figures" aria-label={lessonText.figures}>
              <p className="lesson-section-label">📏 {lessonText.figures}</p>
              <div className="figure-grid">{presentation.figures.map((figure) => <strong key={figure} dir="ltr">{figure}</strong>)}</div>
            </section>}

            <section className="lesson-points">
              <p className="lesson-section-label">✓ {lessonText.points}</p>
              <ul>{presentation.bullets.map((point, index) => <li key={`${currentSlide.n}-${index}`}><span>{index + 1}</span><p>{point}</p></li>)}</ul>
            </section>

            <button type="button" className={`takeaway-card ${takeawayRevealed ? 'revealed' : ''}`} aria-expanded={takeawayRevealed} onClick={() => setTakeawayRevealed((value) => !value)}>
              <span className="takeaway-symbol">{takeawayRevealed ? '✓' : '?'}</span>
              <span><b>{takeawayRevealed ? lessonText.takeaway : lessonText.reveal}</b>{takeawayRevealed && <small>{presentation.takeaway}</small>}</span>
              <span className="takeaway-chevron">⌄</span>
            </button>

            <div className="lesson-meta">
              <button type="button" className={`audio-button ${speaking ? 'speaking' : ''}`} onClick={toggleNarration}>{speaking ? '■' : '▶'} {speaking ? lessonText.stop : lessonText.listen}</button>
              <div><span>{t.standard}</span><b>{currentSlide.ref}</b></div>
            </div>

            <div className="lesson-actions">
              <button type="button" disabled={slide === 0} onClick={() => setSlide((value) => Math.max(0, value - 1))} className="secondary-button">← {lessonText.previous}</button>
              <button type="button" onClick={() => { if (slide < data.slides.length - 1) { setSlide(slide + 1); } else { setAnswers(Array(data.quiz.length).fill(-1)); setView('quiz'); } }} className="primary-button">{slide < data.slides.length - 1 ? `${t.next} →` : t.quiz}</button>
            </div>
          </article>
        </section>
      )}

      {view === 'quiz' && (
        <section className="narrow-wide"><button type="button" className="back-link" onClick={() => setView('lesson')}>← {t.lesson}</button><div className="mt-5"><p className="step">Assessment · Attempt {attempts + 1} of 3</p><h1 className="mt-2 text-3xl font-black">{t.questions} · {t.pass}</h1></div><div className="mt-7 space-y-5">{data.quiz.map((item, index) => <fieldset key={`${activeCourseId}-${lang}-${index}`} className="question-card"><legend className="font-extrabold"><span className="text-[#12824a]">{t.question} {index + 1}.</span> {item.q}</legend><div className="mt-4 space-y-2">{item.a.map((option, optionIndex) => <label key={option} className={`option ${answers[index] === optionIndex ? 'chosen' : ''}`}><input type="radio" name={`${activeCourseId}-${lang}-q-${index}`} checked={answers[index] === optionIndex} onChange={() => setAnswers((current) => current.map((value, answerIndex) => answerIndex === index ? optionIndex : value))} /><b className="option-letter" dir="ltr">{String.fromCharCode(65 + optionIndex)}.</b><span className="option-text">{option}</span></label>)}</div></fieldset>)}</div>{error && <p className="mt-4 rounded-xl bg-[#fff0ec] p-3 text-sm font-bold text-[#9a302b]">{error}</p>}<button type="button" disabled={!allAnswered || busy} onClick={gradeQuiz} className="primary-button mt-6">{busy ? 'Recording…' : t.submit}</button></section>
      )}

      {view === 'result' && (
        <section className="narrow"><div className={`result-card ${passed ? 'success' : 'failure'}`}><div className="result-icon">{passed ? '✓' : '!'}</div><p className="step">{t.score}: {score}%</p><h1 className="mt-3 text-3xl font-black">{passed ? t.passed : t.failed}</h1><div className="mt-6 grid grid-cols-2 gap-3"><div className="metric"><b>{score}%</b><span>{t.score}</span></div><div className="metric"><b>{attempts}/3</b><span>{t.attempts}</span></div></div>{passed && certificate && <div className="mt-5 rounded-2xl bg-white/70 p-5"><p className="font-extrabold">{t.certificate}</p><p className="mt-1 text-sm text-[#5b6c62]">{name} · {email}<br/>Serial Number: {certificate.certificateId}</p><a href={certificate.downloadUrl} target="_blank" rel="noreferrer" className="primary-button mt-4">{t.download}</a></div>}{!passed && locked && <p className="mt-5 rounded-xl bg-white/70 p-4 text-sm font-bold">{t.lock}<br/>{lockoutUntil}</p>}<div className="mt-6 flex flex-col gap-3 sm:flex-row">{!passed && !locked && <button type="button" onClick={retry} className="primary-button">{t.retry}</button>}<button type="button" onClick={() => setView('dashboard')} className="secondary-button">{t.dashboard}</button></div></div></section>
      )}

      {view === 'profile' && (
        <section className="narrow"><button type="button" className="back-link" onClick={() => setView('dashboard')}>← {t.dashboard}</button><div className="panel mt-4"><p className="step">{t.profile}</p><h1 className="panel-title">{name}</h1><p className="panel-copy">{email}</p><h2 className="mt-7 text-lg font-black">Certificates</h2><div className="mt-3 space-y-3">{certificates.length ? certificates.map((item) => <article key={item.certificateId} className="rounded-xl border border-[#dce6df] p-4"><b>{item.courseTitle}</b><p className="mt-1 text-xs text-[#607067]">{item.certificateId} · {item.completionDate} · {item.scorePercent}%</p><a href={item.downloadUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-black text-[#087b41]">{t.download}</a></article>) : <p className="text-sm text-[#607067]">No certificates issued yet.</p>}</div><form className="mt-8 space-y-4 border-t border-[#dce6df] pt-7" onSubmit={updatePassword}><h2 className="text-lg font-black">Change password</h2><label className="field"><span>{t.password}</span><input name="password" type="password" minLength={8} required autoComplete="new-password" /></label><label className="field"><span>{t.confirm}</span><input name="confirm" type="password" minLength={8} required autoComplete="new-password" /></label><button disabled={busy} className="primary-button">{t.save}</button>{passwordMessage && <p className="rounded-xl bg-[#eaf7ee] p-3 text-sm font-bold text-[#08733e]">{passwordMessage}</p>}</form><button type="button" onClick={signOut} className="mt-6 text-sm font-bold text-[#9a302b]">{t.signout}</button></div></section>
      )}

      <footer className="mx-auto mt-10 w-full max-w-6xl border-t border-[#d9e5dd] px-5 py-7 text-xs leading-5 text-[#6d7c73] sm:px-8">TDC Safety Academy · Course-completion training. Employer-specific instruction and practical evaluation may also be required.</footer>
    </main>
  );
}

