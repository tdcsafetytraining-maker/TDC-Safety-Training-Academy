import type { CourseLanguage, CourseLesson } from './course-catalog';

type Pack = { titles:string[]; texts:string[]; questions:{q:string;a:string[]}[] };
const make=(refs:string[],correct:number[],packs:Record<CourseLanguage,Pack>):Record<CourseLanguage,CourseLesson>=>Object.fromEntries(Object.entries(packs).map(([lang,p])=>[lang,{slides:p.titles.map((title,i)=>({n:String(i+1).padStart(2,'0'),title,text:p.texts[i],ref:refs[i]})),quiz:p.questions.map((x,i)=>({...x,correct:correct[i]}))}])) as Record<CourseLanguage,CourseLesson>;
const q=(q:string,a:string[])=>({q,a});

export const riggingCourse=make(
['1926.251(a)(1),(6)','1926.251(a)(2)','1926.251(a)(4)','1926.251(b)–(e)','1926.251(c)(4)','1926.251(c)(6)–(11)','1926.251(e)(6)–(7)','1926.251(a); 1926.1425'],[1,2,3,0,2],{
en:{titles:['Inspect every shift','Read the tag and rated load','Proof-test custom accessories','Choose the hitch and angle','Reject damaged wire rope','Control the suspended load','Protect synthetic slings','Lift only when the plan is safe'],texts:[
'Inspect rigging before use each shift and as conditions require. A competent person designated by the employer inspects each sling, fastening and attachment daily. Remove any damaged or defective item immediately; color coding alone is not an inspection.',
'Use only rigging with permanent, legible manufacturer identification showing safe working load. Never exceed it. Capacity changes with sling type, hitch and angle; use the manufacturer chart rather than guessing. A missing tag means the sling is out of service.',
'Custom grabs, hooks, clamps, lifting beams and similar accessories must show their safe working load and be proof-tested before use to 125% of rated load. A field-made lifting point is not acceptable merely because it looks strong.',
'Plan load weight, center of gravity, hitch, sling angle, attachment points and landing area. Basket hitches must be balanced against slipping. Smaller horizontal sling angles increase leg tension; only use angles and capacities shown by the manufacturer.',
'Do not knot wire rope. Remove it if visible broken wires exceed 10% of all wires in any length of eight rope diameters, or for excessive wear, corrosion, crushing, kinking or other defect. Chain links, hooks and fittings with damage or distortion are also removed.',
'Never shorten a sling with knots, bolts or makeshift devices; do not kink legs or shock-load. Pad sharp edges. Keep hands from between sling and load while tightening. Use tag lines where needed and never stand under a suspended load.',
'Nylon web slings are prohibited around acids/phenolics; polyester and polypropylene around caustics. Do not use nylon/polyester above 180°F (82.2°C), or polypropylene above 200°F (93.3°C). Follow the maker for lower chemical or temperature limits.',
'A qualified rigger is required for specified crane assembly/disassembly and fall-zone work—not automatically for every lift. Stop for unknown weight, unreadable tag, damaged gear, unstable landing, people in the fall zone, uncontrolled rotation or unclear communication.'
],questions:[q('Who performs the required daily sling inspection?',['Any available worker','A competent person designated by the employer','Only the crane manufacturer','The signal person']),q('A custom lifting clamp rated 2,000 lb must be proof-tested before use to at least:',['2,000 lb','2,250 lb','2,500 lb','4,000 lb']),q('When must a sling with no legible capacity identification be used?',['For light loads only','After a visual check','Never; remove it from service','Only with two tag lines']),q('What happens to sling-leg tension as the horizontal angle becomes smaller?',['It decreases','It stays equal to load weight','It becomes zero','It increases']),q('Which practice is permitted?',['Shortening a sling with a bolt','Standing beneath a controlled load','Padding a sling at sharp edges','Shock-loading to free a stuck load'])]},
ar:{titles:['افحص كل وردية','اقرأ البطاقة والحمولة','اختبر الملحق الخاص','اختر الربطة والزاوية','ارفض الحبل التالف','سيطر على الحمل المعلق','احمِ الحبال الصناعية','لا ترفع دون خطة آمنة'],texts:[
'افحص معدات الربط قبل كل وردية وعند تغير الظروف. يفحص شخص مختص يعيّنه صاحب العمل الحبل والمثبتات والملحقات يومياً. أخرج التالف فوراً؛ اللون ليس فحصاً.',
'استخدم معدات تحمل تعريفاً دائماً واضحاً وحمولة العمل الآمنة. لا تتجاوزها. تتغير السعة حسب النوع والربطة والزاوية؛ ارجع لجدول المصنع. البطاقة المفقودة تعني إخراج الحبل من الخدمة.',
'تُعلّم الخطافات والمشابك وعوارض الرفع المصممة خصيصاً وتُختبر قبل الاستخدام إلى 125% من سعتها. نقطة رفع مصنوعة بالموقع لا تصبح مقبولة لمجرد أنها تبدو قوية.',
'خطط للوزن ومركز الثقل والربطة والزاوية ونقاط التثبيت ومكان الإنزال. توازن ربطة السلة لمنع الانزلاق. كلما صغرت الزاوية الأفقية زاد شد الأرجل؛ استخدم جدول المصنع.',
'لا تعقد الحبل السلكي. أخرجه إذا تجاوزت الأسلاك المقطوعة الظاهرة 10% ضمن طول ثمانية أقطار، أو ظهر تآكل أو صدأ أو سحق أو التواء. أخرج السلاسل والخطافات المشوهة.',
'لا تقصر الحبل بعقد أو مسامير ولا تصدم الحمل. احمِ الحواف وأبعد اليد بين الحبل والحمل. استخدم حبل توجيه عند الحاجة ولا تقف أبداً تحت حمل معلق.',
'لا تستخدم النايلون مع الأحماض/الفينولات، ولا البوليستر أو البولي بروبلين مع المواد الكاوية. الحد الأعلى 180°F (82.2°C) للنايلون/البوليستر و200°F (93.3°C) للبولي بروبلين.',
'يلزم المجهز المؤهل في أعمال رافعة محددة، وليس تلقائياً لكل رفع. توقف عند جهل الوزن أو غياب البطاقة أو تلف المعدات أو عدم ثبات مكان الإنزال أو وجود أشخاص بمنطقة السقوط أو غموض التواصل.'
],questions:[q('من يفحص الحبل يومياً؟',['أي عامل','شخص مختص يعينه صاحب العمل','المصنع فقط','مسؤول الإشارة']),q('ملحق سعته 2000 رطل يختبر إلى:', ['2000','2250','2500','4000']),q('متى يستخدم حبل بلا بطاقة سعة واضحة؟',['للحمل الخفيف','بعد النظر','لا يستخدم ويخرج من الخدمة','مع حبلي توجيه']),q('ماذا يحدث للشد عند صغر الزاوية الأفقية؟',['ينقص','يبقى ثابتاً','يصبح صفراً','يزداد']),q('ما المسموح؟',['التقصير بمسمار','الوقوف تحت الحمل','حماية الحبل عند الحافة الحادة','التحميل الصدمي'])]},
ur:{titles:['ہر شفٹ معائنہ','ٹیگ اور گنجائش','خاص لوازم کا ٹیسٹ','ہچ اور زاویہ','خراب رسی مسترد','معلق بوجھ قابو','مصنوعی سلنگ حفاظت','محفوظ منصوبہ پر لفٹ'],texts:[
'ہر شفٹ اور حالات بدلنے پر رگنگ چیک کریں۔ آجر کا مقرر کردہ competent person روز سلنگ، بندھن اور اٹیچمنٹ دیکھے۔ خراب چیز فوراً نکالیں؛ رنگ معائنہ نہیں۔',
'صرف مستقل واضح شناخت اور safe working load والی رگنگ استعمال کریں۔ حد نہ بڑھائیں۔ گنجائش سلنگ، ہچ اور زاویہ سے بدلتی ہے؛ سازندہ چارٹ دیکھیں۔ گم ٹیگ یعنی سروس سے باہر۔',
'خاص grab، hook، clamp یا lifting beam پر SWL ہو اور پہلی استعمال سے پہلے rated load کے 125% پر proof-test ہو۔ دیکھنے میں مضبوط site-made point کافی نہیں۔',
'وزن، مرکزِ ثقل، ہچ، زاویہ، points اور landing بنائیں۔ basket hitch متوازن ہو۔ افقی زاویہ کم ہونے سے leg tension بڑھتا ہے؛ صرف سازندہ جدول استعمال کریں۔',
'wire rope میں گرہ نہیں۔ آٹھ rope diameters میں visible broken wires کل کا 10% سے زیادہ ہوں یا wear/corrosion/crush/kink ہو تو نکالیں۔ خراب chain/hook بھی نکالیں۔',
'گرہ/bolt سے سلنگ چھوٹی، kink یا shock-load نہ کریں۔ تیز کنارے pad کریں، tightening میں ہاتھ دور، ضرورت پر tag line، معلق بوجھ کے نیچے کبھی نہیں۔',
'nylon acids/phenolics میں اور polyester/polypropylene caustics میں نہیں۔ nylon/polyester 180°F (82.2°C)، polypropylene 200°F (93.3°C) سے اوپر نہیں۔',
'مخصوص crane کام میں qualified rigger لازم، ہر lift میں خودکار نہیں۔ نامعلوم وزن، بے ٹیگ/خراب gear، غیر مستحکم landing، fall zone میں لوگ یا مبہم رابطے پر رکیں۔'
],questions:[q('روزانہ سلنگ معائنہ کون کرے؟',['کوئی بھی','آجر کا مقرر competent person','صرف سازندہ','signal person']),q('2,000 lb خاص clamp کا proof test؟',['2,000','2,250','2,500','4,000']),q('بغیر واضح capacity tag سلنگ؟',['ہلکے بوجھ','نظر کے بعد','کبھی نہیں، باہر کریں','دو tag lines سے']),q('افقی زاویہ کم ہو تو leg tension؟',['کم','برابر','صفر','زیادہ']),q('کیا درست ہے؟',['bolt سے چھوٹا','بوجھ کے نیچے کھڑا','تیز کنارے پر padding','shock load'])]},
hi:{titles:['हर पाली निरीक्षण','टैग और क्षमता पढ़ें','विशेष उपकरण जाँचें','हिच और कोण चुनें','क्षतिग्रस्त रस्सी हटाएँ','लटके भार को नियंत्रित करें','सिंथेटिक स्लिंग बचाएँ','सुरक्षित योजना पर ही उठाएँ'],texts:[
'हर पाली उपयोग से पहले और परिस्थितियों के अनुसार रिगिंग जाँचें। नियोक्ता द्वारा नामित सक्षम व्यक्ति स्लिंग, फास्टनिंग और अटैचमेंट रोज जाँचे। दोषयुक्त वस्तु तुरंत हटाएँ; रंग कोड निरीक्षण नहीं है।',
'स्थायी, पढ़ने योग्य निर्माता पहचान और सुरक्षित कार्य भार वाली रिगिंग ही लें। सीमा न लाँघें। क्षमता प्रकार, हिच और कोण से बदलती है; निर्माता चार्ट देखें। बिना टैग स्लिंग सेवा से बाहर है।',
'विशेष grab, hook, clamp या lifting beam पर SWL अंकित हो और पहली बार से पहले rated load के 125% पर proof-test हो। केवल मजबूत दिखना पर्याप्त नहीं।',
'वजन, गुरुत्व केंद्र, हिच, कोण, बिंदु और landing की योजना बनाएँ। basket hitch संतुलित हो। छोटा horizontal angle leg tension बढ़ाता है; निर्माता तालिका अपनाएँ।',
'wire rope में गाँठ नहीं। आठ rope diameters में visible broken wires कुल के 10% से अधिक या wear/corrosion/crush/kink हो तो हटाएँ। क्षतिग्रस्त chain/hook भी हटे।',
'गाँठ/bolt से छोटा, kink या shock-load न करें। तेज धार pad करें, कसते समय हाथ दूर रखें, जरूरत पर tag line और लटके भार के नीचे कभी न रहें।',
'nylon को acids/phenolics, polyester/polypropylene को caustics में न लें। nylon/polyester 180°F (82.2°C), polypropylene 200°F (93.3°C) से ऊपर नहीं।',
'निर्दिष्ट crane कार्य में qualified rigger चाहिए, हर lift में स्वतः नहीं। अज्ञात वजन, गायब टैग, खराब gear, अस्थिर landing, fall zone में व्यक्ति या अस्पष्ट संचार पर रोकें।'
],questions:[q('दैनिक स्लिंग निरीक्षण कौन करता है?',['कोई भी','नियोक्ता का नामित सक्षम व्यक्ति','केवल निर्माता','signal person']),q('2,000 lb विशेष clamp proof-test कितना?',['2,000','2,250','2,500','4,000']),q('बिना स्पष्ट capacity tag स्लिंग कब लें?',['हल्का भार','देखने के बाद','कभी नहीं; सेवा से हटाएँ','दो tag line पर']),q('horizontal angle छोटा होने पर leg tension?',['घटता','समान','शून्य','बढ़ता']),q('क्या अनुमत है?',['bolt से छोटा करना','भार के नीचे खड़ा होना','तेज धार पर padding','shock load'])]}
});

export const signalCourse=make(
['1926.1428(a)','1926.1428(c)','1926.1419','1926.1420','1926.1421','1926.1422','1926.1417; 1926.1428','1926.201'],[2,3,1,0,2],{
en:{titles:['Use a qualified signal person','Prove knowledge and skill','Know when signals are required','Keep one clear signal channel','Use standard hand signals','Use radio or nonstandard signals safely','Stop on any communication failure','Separate crane signaling from traffic flagging'],texts:[
'Before giving crane signals, the person must be qualified by a third-party qualified evaluator or the employer’s qualified evaluator. Site documentation states each signal type covered. Third-party qualification is portable; an employer evaluation is valid only for that employer.',
'The signal person must know the signal method, apply it competently, understand basic crane operation, swing/stopping dynamics and boom deflection, and know §§1926.1419–1422. Qualification requires both an oral or written test and a practical test—not attendance alone.',
'A signal person is required when the load travel point is not in full view of the operator, the direction of travel is obstructed, or the operator or person handling the load determines site safety requires one. Agree the method before operations.',
'Only one person gives signals to an operator at a time, except anyone may give an emergency stop. The signal person must remain in communication; if communication is interrupted, the operator stops until restored and understood.',
'Use the OSHA Standard Method hand signals unless use is infeasible or the operation requires a nonstandard signal. Hand signals must be from a person visible to the operator. The operator obeys a stop or emergency stop from anyone.',
'Before nonstandard signals, operator, signal person and lift director agree on them. Radio/voice signals use a dedicated channel where possible, identify the function and direction, and are tested on site. Avoid vague words such as “go” without direction.',
'The operator stops if a signal is not understood, conflicts, becomes unsuitable, or the signal person disappears. Do not resume until the signal is clarified. Retrain and reassess a signal person whose actions show loss of qualification.',
'A construction traffic flagger controlling public or site traffic follows 1926.201 and MUTCD-type signaling requirements; that role does not by itself qualify the person to signal a crane. Each role needs its own training, position, visibility and escape route.'
],questions:[q('Which signal-person qualification is portable between employers?',['Any employer card','Toolbox attendance','Third-party qualified evaluator documentation','A supervisor’s verbal approval']),q('What proves the qualification requirements?',['Practical test only','Written test only','Years of experience only','Oral/written test plus practical test']),q('Who may give an emergency-stop signal?',['Only lift director','Anyone who sees the danger','Only designated signal person','Only operator']),q('Communication is interrupted during a lift. The operator must:',['Stop until communication is restored','Finish the movement slowly','Follow the last signal','Ask a nearby worker']),q('Does a traffic flagger card automatically qualify a crane signal person?',['Yes, for all cranes','Yes, below 5 tons','No; crane qualification is separate','Only with radio'])]},
ar:{titles:['استخدم مسؤول إشارة مؤهلاً','أثبت المعرفة والمهارة','اعرف متى تلزم الإشارة','قناة واحدة واضحة','استخدم إشارات اليد القياسية','أمّن الراديو والإشارات الخاصة','توقف عند فشل الاتصال','افصل إشارة الرافعة عن تنظيم المرور'],texts:[
'قبل إعطاء إشارات الرافعة يجب التأهيل بواسطة مقيّم طرف ثالث مؤهل أو مقيّم مؤهل لدى صاحب العمل. تحدد وثيقة الموقع أنواع الإشارة. شهادة الطرف الثالث قابلة للنقل، وتقييم صاحب العمل خاص به.',
'يعرف المسؤول طريقة الإشارة ويطبقها ويفهم تشغيل الرافعة وتأرجح/توقف الحمل وانحراف الذراع ومتطلبات 1926.1419–1422. يلزم اختبار شفهي أو كتابي واختبار عملي؛ الحضور وحده لا يكفي.',
'يلزم مسؤول إشارة عندما لا يرى المشغل كامل مسار الحمل، أو يُحجب اتجاه الحركة، أو يرى المشغل/مناول الحمل أن السلامة تتطلبه. اتفق على الطريقة قبل العمل.',
'يعطي شخص واحد الإشارة في كل وقت، لكن لأي شخص إشارة توقف طارئ. يجب استمرار الاتصال؛ عند انقطاعه يتوقف المشغل حتى يعود ويفهم.',
'استخدم طريقة OSHA القياسية لليد إلا إذا تعذرت أو تطلب العمل إشارة خاصة. يجب أن يرى المشغل الموجّه. يطيع توقف أي شخص.',
'اتفق المشغل والموجّه ومدير الرفع على الإشارات الخاصة مسبقاً. اختبر الراديو، واستخدم قناة مخصصة وهوية واتجاهاً واضحين. تجنب كلمة "تحرك" بلا اتجاه.',
'يتوقف المشغل عند إشارة غير مفهومة أو متضاربة أو اختفاء الموجّه. لا يستأنف حتى التوضيح. أعد التدريب والتقييم إذا أظهر الأداء فقدان الأهلية.',
'موجّه المرور وفق 1926.201 ليس مؤهلاً تلقائياً لإشارة رافعة. لكل دور تدريب وموقع ورؤية ومسار هروب خاص.'
],questions:[q('أي تأهيل قابل للنقل بين أصحاب العمل؟',['أي بطاقة','حضور محاضرة','وثيقة مقيّم طرف ثالث','موافقة شفهية']),q('كيف تثبت الأهلية؟',['عملي فقط','كتابي فقط','سنوات خبرة','شفهي/كتابي وعملي']),q('من يعطي توقفاً طارئاً؟',['مدير الرفع','أي شخص يرى الخطر','الموجّه فقط','المشغل فقط']),q('انقطع الاتصال؛ ماذا يفعل المشغل؟',['يتوقف حتى عودته','يكمل ببطء','يتبع آخر إشارة','يسأل عاملاً']),q('هل بطاقة موجّه المرور تكفي للرافعة؟',['نعم','نعم للرافعات الصغيرة','لا، التأهيل منفصل','مع راديو'])]},
ur:{titles:['qualified signal person','علم اور مہارت ثابت','کب signal لازم','ایک واضح channel','معیاری hand signals','radio/خاص signal محفوظ','رابطہ ٹوٹے تو رکیں','crane اور traffic flagging الگ'],texts:[
'crane signal سے پہلے third-party qualified evaluator یا employer qualified evaluator اہلیت دے۔ site document ہر signal type بتائے۔ third-party portable، employer assessment صرف اسی employer کے لیے۔',
'signal person طریقہ، عملی اطلاق، crane basics، swing/stopping dynamics، boom deflection اور 1926.1419–1422 جانے۔ oral/written اور practical دونوں test لازم؛ صرف حاضری نہیں۔',
'جب load travel مکمل نظر نہ آئے، direction obstructed ہو، یا operator/load handler safety کے لیے ضروری سمجھے signal person لازم ہے۔ پہلے طریقہ طے کریں۔',
'ایک وقت ایک signal person، مگر emergency stop کوئی بھی دے۔ رابطہ ٹوٹے تو operator رکے جب تک بحال اور واضح نہ ہو۔',
'ممکن ہو OSHA Standard Method hand signals استعمال کریں اور signal person operator کو نظر آئے۔ کسی کا stop/emergency stop مانیں۔',
'nonstandard signal پہلے operator، signal person اور lift director طے کریں۔ radio test، dedicated channel، function/direction واضح؛ مبہم “go” نہیں۔',
'signal نامعلوم/متضاد یا signal person غائب ہو تو operator رکے۔ وضاحت تک شروع نہ کرے۔ ناقص عمل پر retrain اور reassess۔',
'1926.201 traffic flagger خود crane signal person qualified نہیں۔ دونوں کے الگ training، جگہ، visibility اور escape route ہیں۔'
],questions:[q('کون سی qualification portable ہے؟',['کوئی card','toolbox attendance','third-party evaluator document','زبانی اجازت']),q('اہلیت کیسے ثابت؟',['practical فقط','written فقط','تجربہ فقط','oral/written اور practical']),q('emergency stop کون دے؟',['lift director','خطرہ دیکھنے والا کوئی بھی','صرف signal person','صرف operator']),q('رابطہ ٹوٹے تو؟',['بحالی تک رکیں','آہستہ مکمل','آخری signal','کسی سے پوچھیں']),q('traffic flagger خود crane signal qualified؟',['ہاں','چھوٹی crane','نہیں، الگ اہلیت','radio کے ساتھ'])]},
hi:{titles:['योग्य signal person','ज्ञान और कौशल सिद्ध करें','signal कब आवश्यक','एक स्पष्ट channel','मानक hand signals','radio/विशेष signal सुरक्षित','संचार विफल तो रोकें','crane और traffic flagging अलग'],texts:[
'crane signal से पहले third-party qualified evaluator या employer qualified evaluator योग्यता दे। site document प्रत्येक signal type बताए। third-party portable है; employer assessment उसी employer तक।',
'signal person विधि, प्रयोग, crane basics, swing/stopping, boom deflection और 1926.1419–1422 जाने। oral/written और practical दोनों test जरूरी; attendance पर्याप्त नहीं।',
'load travel पूरा न दिखे, दिशा बाधित हो, या operator/load handler सुरक्षा हेतु माने तो signal person चाहिए। पहले विधि तय करें।',
'एक समय एक व्यक्ति signal दे, पर emergency stop कोई भी दे सकता है। संचार टूटे तो operator बहाल और स्पष्ट होने तक रुके।',
'संभव हो OSHA Standard Method hand signals लें और signal person दिखाई दे। किसी का stop/emergency stop मानें।',
'nonstandard signal operator, signal person और lift director पहले तय करें। radio test, dedicated channel, function/direction स्पष्ट; अस्पष्ट “go” नहीं।',
'signal न समझे, टकराए या signal person गायब हो तो operator रुके। स्पष्ट होने तक नहीं चले। खराब प्रदर्शन पर retrain/reassess।',
'1926.201 traffic flagger अपने-आप crane signal person नहीं। दोनों के अलग training, position, visibility और escape route हैं।'
],questions:[q('कौन-सी qualification portable है?',['कोई card','toolbox attendance','third-party evaluator document','मौखिक अनुमति']),q('योग्यता कैसे सिद्ध?',['practical मात्र','written मात्र','अनुभव मात्र','oral/written और practical']),q('emergency stop कौन दे सकता है?',['lift director','खतरा देखने वाला कोई भी','केवल signal person','केवल operator']),q('संचार टूटे तो?',['बहाली तक रोकें','धीरे पूरा','अंतिम signal','किसी से पूछें']),q('traffic flagger स्वतः crane signal qualified?',['हाँ','छोटी crane','नहीं, अलग योग्यता','radio पर'])]}
});


