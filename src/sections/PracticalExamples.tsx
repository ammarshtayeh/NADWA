import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Copy, Check, Play, X, Loader2, 
  BookOpen, FileText, CheckSquare, MessageSquare, 
  Award, Shield, HelpCircle, FileCheck
} from 'lucide-react';

interface Scenario {
  id: string;
  title: string;
  icon: React.ReactNode;
  iconText: string;
  description: string;
  prompt: string;
  simulatedResult: string;
}

export const PracticalExamples: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamedResult, setStreamedResult] = useState('');
  const [editablePrompt, setEditablePrompt] = useState('');

  const scenarios: Scenario[] = [
    {
      id: 'lesson-plan',
      title: "إنشاء خطة درس تفاعلية",
      icon: <BookOpen className="w-6 h-6 text-emerald-400" />,
      iconText: "📚",
      description: "تصميم خطة درس متكاملة مع أهداف إجرائية وأنشطة حركية وتقييم ختامي ملائم للمناهج.",
      prompt: "تصرفي كمعلمة فلسطينية خبيرة. صممي خطة درس شاملة لمادة العلوم للصف الرابع حول موضوع 'دورة حياة النبات'. أريد هدفين سلوكيين، ونشاطاً استهلالياً شيقاً، ونشاطاً حركياً جماعياً، وسؤال تقييم ختامي.",
      simulatedResult: `📋 خطة درس: دورة حياة النبات (الصف الرابع)
-----------------------------------------------
1. الأهداف السلوكية:
   - أن توضح الطالبة مراحل نمو النبتة بالترتيب الصحيح.
   - أن تذكر الطالبة الاحتياجات الأساسية لنمو النبات (الماء، الضوء، التربة).

2. النشاط الاستهلالي (5 دقائق):
   - عرض بذرة فول صغيرة وجافة على الطالبات، وطرح السؤال: 'كيف يمكن لهذه الحبة الصغيرة الجامدة أن تصبح شجرة خضراء كبيرة تعطينا ثماراً؟'.

3. النشاط الحركي الجماعي (15 دقيقة):
   - لعبة 'أنا النبتة الصغيرة': يمثل الطالبات دور بذرة مدفونة في الأرض (بوضعية الانحناء)، ثم تبدأ المعلمة بوصف هطول المطر وشروق الشمس، فتبدأ الطالبات بالنمو والارتفاع تدريجياً وفتح أيديهن كأوراق خضراء ترفرف في الهواء.

4. التقييم الختامي:
   - ورقة عمل سريعة يرسم فيها الطالبات المراحل الأربعة لنمو النبتة مع كتابة المكونات اللازمة لنجاح نموها.`
    },
    {
      id: 'kids-story',
      title: "إنشاء قصة للأطفال",
      icon: <MessageSquare className="w-6 h-6 text-pink-400" />,
      iconText: "📖",
      description: "توليد قصة شيقة تهدف لترسيخ القيم الأخلاقية في بيئة محببة للأعمار الصغيرة.",
      prompt: "اكتبي قصة تربوية قصيرة للأطفال بعمر 5 سنوات تدور أحداثها في حقل زيتون فلسطيني، لتعزيز قيمة 'التعاون ومساعدة الآخرين'. أضيفي 3 أسئلة تفاعلية لطرحها بعد القصة ونشاطاً حركياً يمثل فيه الأطفال القصة.",
      simulatedResult: `📖 قصة 'شجرة الزيتون المباركة وعصافير الدوري'
-----------------------------------------------------
كان يا ما كان، في حقل زيتون جميل في مدينة رام الله، شجرة زيتون عجوز اسمها 'أم الزيتون'. كانت الشجرة كريمة جداً، لكنها في أحد الأيام اشتكت من عطش شديد لأن المطر تأخر.
سمعت عصافير الدوري الصغيرة شكواها، وقررت مساعدتها. طارت العصافير إلى البئر القريب، وبدأت تحمل قطرات الماء بمنقارها الصغير وتصبها عند جذع الشجرة. تعاونت العصافير مع النملات الصغيرات اللواتي حفرن مسارات صغيرة في التربة ليدخل الماء بسرعة.
شربت شجرة الزيتون وشعرت بالانتعاش، وهزت أغصانها فرحاً وأهدت العصافير حبات زيتون لذيذة. وتعلم الجميع أن بالتعاون ومساعدة الآخرين تزدهر الأرض.

أسئلة تفاعلية لطرحها بعد القصة:
1. لماذا كانت شجرة الزيتون حزينة في البداية؟
2. كيف تعاونت العصافير والنملات لمساعدتها؟
3. ماذا تفعل عندما ترى صديقاً أو أخاً يحتاج للمساعدة؟`
    },
    {
      id: 'class-activity',
      title: "إنشاء نشاط صفي تفاعلي",
      icon: <Award className="w-6 h-6 text-teal-400" />,
      iconText: "🎮",
      description: "ابتكار ألعاب حركية ومنافسات تخدم الفهم الدراسي وتكسر روتين التلقين التقليدي.",
      prompt: "ابتكر لعبة صفية تفاعلية مدتها 10 دقائق تناسب طالبات الصف الثالث لتبسيط فهم مفهوم 'الكسور الرياضية' دون الحاجة لأجهزة إلكترونية، مع شرح شروط وقواعد اللعبة والهدف التربوي منها.",
      simulatedResult: `🎮 نشاط صفي تفاعلي: الكسور الحركية
-----------------------------------------
الهدف: تمثيل الكسور (النصف، الثلث، الربع) حركياً وبصرياً.
المدة: 10 دقائق.
الأدوات: حبال ملونة أو أطواق هولا هوب.

طريقة اللعب:
1. تقسم المعلمة الصف إلى مجموعات من 4 طالبات.
2. تضع المعلمة طوقاً أو ترسم دائرة بالطبشور حول كل مجموعة على الأرض لتشكل 'الكل الواحد'.
3. عندما تنادي المعلمة: 'الكسر هو النصف!'، يجب على طالبتين من المجموعة الوقوف داخل الدائرة وطالبتين بالخارج.
4. عندما تنادي: 'الكسر هو الربع!'، تقف طالبة واحدة بالداخل و3 بالخارج.
5. المجموعة الأسرع في تمثيل الكسور بشكل صحيح تحرز نقطة وتفوز بالجولة.`
    },
    {
      id: 'worksheet',
      title: "إنشاء ورقة عمل صيفية",
      icon: <FileText className="w-6 h-6 text-blue-400" />,
      iconText: "📄",
      description: "إعداد أوراق عمل منسقة وموجهة لقياس مهارات التفكير والاستنتاج والتصنيف المادي.",
      prompt: "اكتب ورقة عمل شاملة لموضوع 'مصادر المياه في فلسطين' لطلبة الصف الخامس. تشمل سؤالاً تمثيلياً وسؤال ملء الفراغات مع وضع الحلول النموذجية الكافية.",
      simulatedResult: `📄 ورقة عمل: مصادر المياه في فلسطين (الصف الخامس)
-----------------------------------------------------
الاسم: ....................          الصف: الخامس

س1: صنف مصادر المياه التالية في جدول مفرغ (مصادر جوفية، مصادر سطحية):
(الينابيع، الآبار الارتوازية، مياه الأمطار المتجمعة، البحر الميت، نهر الأردن).

الحل النموذجي:
- مصادر سطحية: مياه الأمطار المتجمعة، البحر الميت، نهر الأردن.
- مصادر جوفية: الينابيع، الآبار الارتوازية.

س2: أكمل الفراغات بالكلمات المناسبة:
1. يعتبر المطر المصدر الرئيسي للمياه الجارية في فلسطين.
2. المياه التي تتسرب في باطن القشرة الأرضية تسمى مياه جوفية.`
    },
    {
      id: 'exam',
      title: "إنشاء اختبار صفي متميز",
      icon: <CheckSquare className="w-6 h-6 text-amber-400" />,
      iconText: "📝",
      description: "تصميم اختبار قصير متوازن الأسئلة والصعوبات مع نموذج إجابة واضح للتصحيح.",
      prompt: "صمم اختباراً قصيراً (Quiz) مدته 15 دقيقة لدرس 'الجملة الاسمية والجملة الفعلية' لصف رابع أساسي. يتكون من سؤالين تفاعليين مع الإجابة النموذجية.",
      simulatedResult: `📝 اختبار اللغة العربية القصير (الجملة الاسمية والفعلية)
-------------------------------------------------------------
الزمن: 15 دقيقة                     الاسم: ....................

س1: حدد نوع الجمل التالية (اسمية أم فعلية) وحدد ركنيها:
1. يزرع الفلاح الأرض. -> جملة فعلية (الفعل: يزرع، الفاعل: الفلاح)
2. القدس عاصمة فلسطين. -> جملة اسمية (المبتدأ: القدس، الخبر: عاصمة)

س2: حول الجملة الفعلية التالية إلى جملة اسمية:
- 'تفتح الزهر في الربيع.' -> 'الزهر تفتح في الربيع.'

نموذج الإجابة مصمم لتسهيل التصحيح السريع للمعلمة.`
    },
    {
      id: 'parents-letter',
      title: "إنشاء رسالة لأولياء الأمور",
      icon: <FileCheck className="w-6 h-6 text-purple-400" />,
      iconText: "✉️",
      description: "كتابة خطابات تواصل دافئة ومهنية لحث أولياء الأمور على الشراكة التعليمية النشطة.",
      prompt: "اكتب رسالة موجهة لأولياء أمور طالبات الصف الأول لدعوتهن للمشاركة في 'يوم القراءة والمطالعة مع الأطفال' بأسلوب دافئ ومهني ومحدد الأهداف.",
      simulatedResult: `✉️ رسالة دعوة لأولياء الأمور الكرام
----------------------------------------
أهالي طالباتنا الأعزاء في الصف الأول الأساسي،
تحية طيبة وبعد،

يسر إدارة المدرسة ومعلمة الصف دعوتكم لحضور فعالية 'يوم القراءة والمطالعة المشتركة'، وذلك يوم الأربعاء القادم الساعة 9:00 صباحاً في قاعة المدرسة.
نهدف من هذه الفعالية لتعزيز شغف الطالبات الصغيرات بالقراءة ومشاركة أولياء الأمور لهن في التصفح والقص التفاعلي لدعم ثقتهن بأنفسهن.

حضوركم يثري عقول صغيراتنا ويسعد قلوبهن.
مع الاحترام والتقدير،
معلمة الصف وإدارة المدرسة.`
    },
    {
      id: 'meeting-summary',
      title: "تلخيص اجتماع إداري ونقابي",
      icon: <HelpCircle className="w-6 h-6 text-sky-400" />,
      iconText: "📋",
      description: "ترتيب نقاط الاجتماع والقرارات والمهام في جدول واضح وسهل المتابعة الزمنية.",
      prompt: "لخص النقاط التالية في محضر اجتماع رسمي منسق: ناقش الاجتماع التحضير للندوة، تنظيم الحضور، توزيع الشهادات، وإشراك لجان العمل النقابي. وزع المهام مع التواريخ.",
      simulatedResult: `📋 محضر اجتماع التحضير للندوة التدريبية
---------------------------------------------
التاريخ: 01-07-2026                 الموقع: مقر النقابة

جدول الأعمال والقرارات:
1. إقرار التوقيت النهائي للندوة ليكون 3 ساعات (180 دقيقة).
2. تشكيل فريق إشرافي خاص لإدارة لوجستيات الحضور ومسح الـ QR للتحميل.

جدول توزيع المهام والمسؤوليات:
- توزيع شهادات الحضور وتدقيق الأسماء -> أ. رانيا (الموعد: ختام الندوة).
- التنسيق مع لجان العمل النقابي -> أ. عمار اشتية (الموعد: غداً صباحاً).
- الإشراف التقني وشاشات العرض -> م. البرمجة (الموعد: قبل الورشة بنصف ساعة).`
    },
    {
      id: 'union-statement',
      title: "كتابة بيان نقابي مطلبي",
      icon: <Shield className="w-6 h-6 text-red-400" />,
      iconText: "⚖️",
      description: "كتابة مسودات رصينة وقانونية تمثل مواقف لجان العمل النقابي والدفاع عن المعلمات.",
      prompt: "اكتب بيان تضامني نقابي باسم نقابة معلمات ورياض الأطفال للمطالبة بتفعيل الحد الأدنى للأجور وتنظيم عقود التوظيف وفقاً لقانون العمل الفلسطيني.",
      simulatedResult: `⚖️ بيان نقابي رسمي صادر عن نقابة معلمات ورياض الأطفال
---------------------------------------------------------
يا معلماتنا الصامدات،
تأكيداً على رسالة التربية السامية وحرصاً على كرامة المعلمة الفلسطينية كركيزة أساسية في بناء مجتمعنا، نعلن في نقابة معلمات ورياض الأطفال ما يلي:

1. نطالب كافة المؤسسات ورياض الأطفال الخاصة بضرورة الالتزام التام والكامل بتطبيق الحد الأدنى للأجور المحدد قانوناً دون نقصان.
2. ندعو وزارة العمل والجهات المختصة لتفعيل الرقابة الميدانية على صياغة وتنفيذ عقود التوظيف لضمان حقوق الصمود والأمان الوظيفي للمعلمة.

عاش نضال المعلمة الفلسطينية حرة معطاءة.
الهيئة الإدارية لنقابة معلمات ورياض الأطفال.`
    }
  ];

  const handleOpenModal = (sc: Scenario) => {
    setSelectedScenario(sc);
    setEditablePrompt(sc.prompt);
    setStreamedResult('');
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(editablePrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateAIResponse = () => {
    if (!selectedScenario) return;
    setIsGenerating(true);
    setStreamedResult('');

    // Simulate api load & stream typing effect
    setTimeout(() => {
      setIsGenerating(false);
      const text = selectedScenario.simulatedResult;
      let currentIdx = 0;
      
      const interval = setInterval(() => {
        if (currentIdx < text.length) {
          setStreamedResult(prev => prev + text.charAt(currentIdx));
          currentIdx += 3; // stream 3 chars at a time for smooth speed
        } else {
          setStreamedResult(text); // finalize
          clearInterval(interval);
        }
      }, 15);
    }, 1500);
  };

  return (
    <section id="practical-demo" className="relative py-24 bg-slate-900/10 overflow-hidden border-b border-slate-900/60">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.02] z-0"></div>
      <div className="absolute top-1/4 left-[-10%] w-[350px] h-[350px] glow-green rounded-full opacity-[0.05] blur-[120px] z-0"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span>معمل التطبيقات الحية للدورة</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-slate-100 via-emerald-100 to-slate-200 bg-clip-text text-transparent mt-3 mb-4">
            التطبيق المباشر (AI Demo Center)
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            اضغطي على أي سيناريو حقيقي أدناه لفتح لوحة التحكم الذكية، وتجربة صياغة الأمر، ومحاكاة النتيجة الإجرائية حياً في ثوانٍ معدودة.
          </p>
        </div>

        {/* 8 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {scenarios.map((sc) => (
            <motion.div
              key={sc.id}
              whileHover={{ y: -6, borderColor: 'rgba(16, 185, 129, 0.3)' }}
              onClick={() => handleOpenModal(sc)}
              className="glass-panel border-slate-900 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:bg-slate-900/50 hover:shadow-lg hover:shadow-emerald-500/2 transition-all duration-300 cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-850 group-hover:border-emerald-500/20 transition-colors">
                    {sc.icon}
                  </div>
                  <span className="text-lg select-none">{sc.iconText}</span>
                </div>
                
                <h3 className="text-sm sm:text-base font-extrabold text-slate-100 group-hover:text-emerald-400 transition-colors">
                  {sc.title}
                </h3>
                
                <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                  {sc.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-900/80 flex items-center justify-between text-[11px] font-bold text-emerald-450 group-hover:underline">
                <span>توليد وتجربة الأمر</span>
                <span>←</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Modal Dialog */}
      <AnimatePresence>
        {selectedScenario && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md">
            
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col space-y-6"
            >
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedScenario(null)}
                className="absolute top-4 left-4 p-2 rounded-xl bg-slate-950 border border-slate-850 hover:bg-slate-850 text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title Header */}
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex-shrink-0">
                  {selectedScenario.icon}
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">محاكاة التطبيق العملي</span>
                  <h3 className="text-base sm:text-lg font-black text-slate-100">{selectedScenario.title}</h3>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-400">وصف المهمة المطلوبة:</h4>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed bg-slate-950/40 p-4 rounded-2xl border border-slate-900">
                  {selectedScenario.description}
                </p>
              </div>

              {/* Editable Prompt Area */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-slate-400">صيغة الأمر الجاهزة (قابلة للتعديل والنسخ):</h4>
                  <span className="text-[10px] text-slate-500">عدلي المعطيات بين الأقواس لملاءمة درسكِ</span>
                </div>
                
                <div className="relative">
                  <textarea
                    value={editablePrompt}
                    onChange={(e) => setEditablePrompt(e.target.value)}
                    className="w-full min-h-[90px] bg-slate-950 border border-slate-850 hover:border-slate-800 focus:border-emerald-500/60 rounded-2xl p-4 text-xs sm:text-sm text-slate-200 font-mono focus:outline-none transition-colors leading-relaxed"
                  />
                  
                  {/* Actions under textarea */}
                  <div className="absolute left-3 bottom-3 flex items-center gap-2">
                    <button
                      onClick={handleCopyPrompt}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-[10px] font-bold text-slate-300 transition-all cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-red-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'تم النسخ!' : 'نسخ الأمر المحدث'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Trigger Generation Button */}
              <div className="flex justify-center pt-2">
                <button
                  onClick={handleSimulateAIResponse}
                  disabled={isGenerating}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-650 disabled:bg-slate-800 text-slate-950 disabled:text-slate-500 font-extrabold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>جاري معالجة وتوليد الرد...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>محاكاة استلام الرد من المساعد الذكي حياً</span>
                    </>
                  )}
                </button>
              </div>

              {/* Simulated Output Window */}
              {(isGenerating || streamedResult) && (
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <h4 className="text-xs font-bold text-slate-400">شاشة محاكاة استلام الرد (التوليد الحي):</h4>
                  
                  <div className="relative min-h-[150px] max-h-[300px] overflow-y-auto bg-slate-950 border border-slate-900 rounded-2xl p-4.5 text-xs sm:text-sm font-mono text-emerald-450 leading-relaxed whitespace-pre-wrap select-all">
                    {isGenerating ? (
                      <div className="flex flex-col items-center justify-center h-28 space-y-2">
                        <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
                        <span className="text-xs text-slate-500">جاري الكتابة وتحليل القيود الفلسطينية...</span>
                      </div>
                    ) : (
                      <>
                        <div className="absolute top-2 left-2 text-[9px] text-slate-650 select-none">MOCKED AI RESPONSE</div>
                        {streamedResult}
                        {streamedResult !== selectedScenario.simulatedResult && (
                          <span className="inline-block w-1.5 h-4 bg-emerald-400 animate-pulse ml-0.5" />
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PracticalExamples;
