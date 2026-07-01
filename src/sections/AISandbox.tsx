import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Sparkles, GraduationCap, BookOpen, FileText, Loader2, Copy, Check, Terminal, FileDown } from 'lucide-react';

type ToolType = 'lesson' | 'story' | 'union' | 'custom';

export const AISandbox: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [activeTool, setActiveTool] = useState<ToolType>('lesson');
  const [inputs, setInputs] = useState({
    // Lesson Planner inputs
    lessonTitle: '',
    lessonGrade: 'الصف الثالث الأساسي',
    lessonMethod: 'التعلم باللعب والنشاط الحركي',
    lessonObjective: 'فهم الطلاب لأهمية البيئة وكيفية حمايتها',
    // Story Generator inputs
    storyMoral: 'الأمانة ومساعدة الآخرين',
    storyHero: 'العصفور الصغير كوكو',
    storySetting: 'بيارة برتقال يافا الجميلة',
    // Union statements inputs
    unionRecipient: 'مدير التربية والتعليم / المدرسة الخاصة',
    unionSubject: 'طلب تسوية رواتب معلمات رياض الأطفال',
    unionIssue: 'عدم الالتزام بالحد الأدنى للأجور وزيادة الأعباء الورقية',
    // Custom Prompt input
    customPrompt: ''
  });

  const [output, setOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [exported, setExported] = useState(false);
  const [genStep, setGenStep] = useState('');

  // Pre-load prompt from URL params if available
  useEffect(() => {
    const promptParam = searchParams.get('prompt');
    if (promptParam) {
      setActiveTool('custom');
      setInputs(prev => ({ ...prev, customPrompt: promptParam }));
      // Smooth scroll to the sandbox workspace
      const element = document.getElementById('sandbox');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    if (!output) return;
    const formattedOutput = output.replace(/\n/g, '\r\n');
    const element = document.createElement("a");
    const file = new Blob([formattedOutput], {type: 'application/msword;charset=utf-8'});
    element.href = URL.createObjectURL(file);
    element.download = `${activeTool}_تحضير_ورشة_${Date.now()}.doc`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  const simulateStreaming = (text: string) => {
    setOutput('');
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setOutput(prev => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        setIsGenerating(false);
        setGenStep('');
      }
    }, 12); // streaming character speed
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    if (activeTool === 'custom') {
      setGenStep('جاري تحليل الأمر الذهبي المخصص...');
      await new Promise(r => setTimeout(r, 1000));
      setGenStep('جاري استنتاج السياق التربوي والنقابي للأمر...');
      await new Promise(r => setTimeout(r, 1000));
      setGenStep('جاري توليد المستند بالاستعانة بتوجيهات الأستاذ عمار...');
      await new Promise(r => setTimeout(r, 800));
    } else {
      setGenStep('جاري تحليل المدخلات وتنسيق البرومبت...');
      await new Promise(r => setTimeout(r, 1200));
      setGenStep('جاري توليد الهيكل العام للمحتوى بالاستعانة بالقوالب الذكية...');
      await new Promise(r => setTimeout(r, 1000));
      setGenStep('جاري تدقيق النصوص وصياغة المخرجات النهائية...');
      await new Promise(r => setTimeout(r, 800));
    }

    let finalResult = '';

    if (activeTool === 'lesson') {
      finalResult = `📋 خطة تحضير درس تفاعلية ممتازة
==============================
الموضوع الدراسي: ${inputs.lessonTitle || 'درس تطبيقي'}
الصف الدراسي المستهدف: ${inputs.lessonGrade}
طريقة التدريس المعتمدة: ${inputs.lessonMethod}
الهدف العام للدرس: ${inputs.lessonObjective}

أولاً: أهداف السلوك الإجرائية:
----------------------------
1. أن توضح المعلمة المفاهيم الأساسية لدرس [${inputs.lessonTitle || 'الدرس'}] بدقة.
2. أن تشارك المعلمة الطالبات في نشاط تفاعلي يعزز [${inputs.lessonObjective}].
3. أن تستنتج الطالبات القيم التربوية المستخلصة من الحصة من خلال الحوار.

ثانياً: التمهيد وعرض الدرس (10 دقائق):
----------------------------
يقوم المعلم بالبدء بتمهيد شيق مستوحى من طريقة [${inputs.lessonMethod}]. يبدأ بطرح تساؤل تفاعلي: "لو كنا نعيش في عالم بدون [${inputs.lessonTitle || 'الموضوع'}]، ماذا كان سيحدث؟" ومناقشة إجابات الطالبات لتهيئة أذهانهن.

ثالثاً: العرض والتطبيق العملي (25 دقيقة):
----------------------------
1. باستخدام [${inputs.lessonMethod}]، يتم تقسيم الصف إلى 3 مجموعات صغيرة.
2. كل مجموعة تقوم بعمل محاكاة أو حل لغز تعليمي يربط الدرس ببيئتنا وحياتنا اليومية.
3. مناقشة النتائج جماعياً مع إبراز كيفية تحقيق الهدف: [${inputs.lessonObjective}].

رابعاً: التقييم الختامي والواجب البيتي (5 دقائق):
----------------------------
- سؤال قياس فهم: صياغة تمرين سريع وممتع يختبر وعي الطالبات.
- نشاط بيتي مبتكر: كتابة فكرة أو رسم لوحة تعكس ما تعلمنه اليوم وتطبيقها مع عائلاتهن لترسيخ الفائدة.`;
    } 
    
    else if (activeTool === 'story') {
      finalResult = `📖 قصة تربوية قصيرة وفعالة للأطفال
==================================
العنوان المقترح: مغامرة في ${inputs.storySetting}
الموضوع القيمي للقصة: ${inputs.storyMoral}
الشخصية الرئيسية: ${inputs.storyHero}
مكان الأحداث: ${inputs.storySetting}

في يوم من الأيام، في بقعة جميلة وهادئة تُدعى [${inputs.storySetting}]، كان يعيش بطلنا اللطيف [${inputs.storyHero}]. كان يحب اللعب مع أصدقائه ومساعدة الجميع.

كان بطلنا يعرف أن أجمل ما يزين الحياة هو [${inputs.storyMoral}]. وفي صباح أحد الأيام، وجد شيئاً غريباً تحت شجرة زيتون وارفة الظلال. كان هناك صندوق صغير ملون ومغلق. 

تذكر بطلنا [${inputs.storyHero}] قيمة [${inputs.storyMoral}]، وعرف فوراً أن عليه أن يفعل الشيء الصحيح. بدلاً من أخذ الصندوق لنفسه، قرر البحث عن صاحبه الحقيقي بمساعدة أصدقائه.

وبعد رحلة بحث قصيرة وممتعة في أرجاء [${inputs.storySetting}]، التقى بصاحب الصندوق الذي كان يبحث عنه بحزن. عندما أعاد بطلنا الصندوق، شعر الجميع بالفرح وتأكدوا أن [${inputs.storyMoral}] هي الطريق الأقصر لكسب حب واحترام الجميع.

ألعاب وأنشطة مقترحة مرتبطة بالقصة:
----------------------------------
1. لعبة الصندوق الدوار: لعبة حركية حيث يمرر الأطفال صندوقاً مع سماع أنشودة، وعند توقف الصوت، يجيب الطفل عن سؤال حول الأمانة.
2. تمثيل الأدوار: تمثيل الأطفال لدور [${inputs.storyHero}] وموقفه النبيل لتعزيز القيمة وجدانياً وعملياً.`;
    } 
    
    else if (activeTool === 'union') {
      finalResult = `✉️ كتاب رسمي / مسودة بيان نقابي موجه
====================================
الجهة المرسل إليها: ${inputs.unionRecipient}
الموضوع: ${inputs.unionSubject}
القضية الأساسية: ${inputs.unionIssue}

تحية طيبة وبعد،،

باسم جمعية معلمات فلسطين ونقابة معلمات ورياض الأطفال، نتوجه إليكم بهذا الكتاب الرسمي للوقوف على مسألة غاية في الأهمية والمسؤولية المشتركة، وهي: [${inputs.unionSubject}].

لقد تلقينا العديد من الشكاوى والتظلمات من الزميلات المعلمات بخصوص [${inputs.unionIssue}]. إن غياب الضمانات المادية الكافية وزيادة الأعباء الإدارية يؤثران بشكل مباشر على عطاء المعلمة واستقرار البيئة التعليمية والتربوية لأطفالنا.

وعليه، فإننا في النقابة نطالب بما يلي كخطوات فورية وعملية:
1. الالتزام الفوري بالحد الأدنى للأجور وتدقيق العقود المبرمة مع المعلمات.
2. تقليص الأعباء والملفات الإدارية غير الضرورية لتتفرغ المعلمة للإبداع والتدريس.
3. فتح باب الحوار المباشر لعقد جلسة مشتركة للاتفاق على آليات عمل عادلة تضمن حقوق الكوادر التعليمية.

شاكرين لكم حسن تعاونكم وتفهمكم، ونأمل الاستجابة السريعة لعقد الجلسة لتفادي أي خطوات تصعيدية نقابية مقبلة.

وتفضلوا بقبول فائق الاحترام والتقدير،،
لجنة المتابعة والتنظيم النقابي
جمعية معلمات فلسطين`;
    }

    else if (activeTool === 'custom') {
      finalResult = `🤖 استجابة المساعد الذكي للأمر المخصص (Custom Prompt Output)
============================================================
أمر المدخلات: "${inputs.customPrompt || 'أمر عام'}"

بناءً على التوجيهات التي حددتها في الأمر الذهبي، إليكِ المخرجات المهندسة بدقة:

أولاً: التحليل العام للمهمة:
------------------------
- الدور المستنتج: معلمة فلسطينية خبيرة / ناشطة نقابية واعية.
- الأسلوب المعتمد: التعلم النشط وتوظيف التكنولوجيا التوليدية بفاعلية واقتدار.

ثانياً: المخرجات المنسقة والمقترحة:
--------------------------------
1. المكون الأول (التحضير والنشاط): تم صياغة وتصميم الهيكل الإجرائي المتكامل استجابةً لطلبكِ المخصص.
2. المكون الثاني (الوسائل والأدوات): نوصيكِ بتشغيل Canva AI لتصميم المكون البصري الموصوف، والاعتماد على Suno لإنتاج النشيد.
3. المتابعة الصفية والتنظيمية: صياغة الأسئلة والحلول وربطها بالهوية والواقع المحلي.

ثالثاً: نصيحة المدرب أ. عمار للتحسين والتعديل:
------------------------------------------
"يمكنكِ مراجعة هذه النتيجة وتعديلها بسهولة من خلال توجيه المساعد بطلب إضافي كأن تقولي له: 'أعد صياغة القصة لتكون بلهجة فلسطينية وارفة الظلال'، أو 'قلص عدد الأسئلة لتناسب لقاءً مدته 10 دقائق'."`;
    }

    simulateStreaming(finalResult);
  };

  return (
    <section id="sandbox" className="relative py-24 bg-slate-950 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-tatreez-diamond opacity-[0.03] z-0"></div>
      <div className="absolute inset-0 ai-grid opacity-[0.1] z-0"></div>
      <div className="absolute top-1/4 right-[-10%] w-[350px] h-[350px] glow-green rounded-full opacity-[0.08] blur-[120px] z-0"></div>
      <div className="absolute bottom-1/4 left-[-10%] w-[400px] h-[400px] glow-red rounded-full opacity-[0.08] blur-[130px] z-0"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            <span>مساحة العمل والتوليد التفاعلية للمدرب</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-100 via-emerald-100 to-slate-200 bg-clip-text text-transparent mb-4">
            مساحة عمل الذكاء الاصطناعي التفاعلية
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            اختبري قوة التكنولوجيا التوليدية بنفسكِ. أدخلي تفاصيل موضوعكِ ودعي محاكي المساعد الذكي ينسق لكِ خطة الدرس أو القصة أو المراسلة النقابية في ثوانٍ!
          </p>
        </div>

        {/* Layout: Form on Right, Code Output Preview on Left */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Right Input Form (5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            {/* Tool Selection Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-850 mb-6">
              <button
                onClick={() => {
                  setActiveTool('lesson');
                  setOutput('');
                }}
                className={`flex-grow flex items-center justify-center gap-2 py-3 px-2 rounded-lg font-bold text-xs transition-all ${
                  activeTool === 'lesson'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>تحضير درس</span>
              </button>

              <button
                onClick={() => {
                  setActiveTool('story');
                  setOutput('');
                }}
                className={`flex-grow flex items-center justify-center gap-2 py-3 px-2 rounded-lg font-bold text-xs transition-all ${
                  activeTool === 'story'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>قصة للأطفال</span>
              </button>

              <button
                onClick={() => {
                  setActiveTool('union');
                  setOutput('');
                }}
                className={`flex-grow flex items-center justify-center gap-2 py-3 px-2 rounded-lg font-bold text-xs transition-all ${
                  activeTool === 'union'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>خطاب نقابي</span>
              </button>

              <button
                onClick={() => {
                  setActiveTool('custom');
                  setOutput('');
                }}
                className={`flex-grow flex items-center justify-center gap-2 py-3 px-2 rounded-lg font-bold text-xs transition-all ${
                  activeTool === 'custom'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                }`}
              >
                <Terminal className="w-4 h-4" />
                <span>أمر مخصص حر</span>
              </button>
            </div>

            {/* Input Form Panel */}
            <form onSubmit={handleGenerate} className="glass-panel border-slate-900 rounded-2xl p-6 flex-1 flex flex-col justify-between gap-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-10 w-12 h-0.5 bg-emerald-500"></div>

              {/* Dynamic Inputs according to active tab */}
              <AnimatePresence mode="wait">
                {activeTool === 'lesson' && (
                  <motion.div
                    key="lesson-fields"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2">عنوان موضوع الدرس:</label>
                      <input
                        type="text"
                        name="lessonTitle"
                        value={inputs.lessonTitle}
                        onChange={handleInputChange}
                        placeholder="مثال: الكسور، أجزاء النبات، عاصمة فلسطين"
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500/60"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2">الصف الدراسي المستهدف:</label>
                      <select
                        name="lessonGrade"
                        value={inputs.lessonGrade}
                        onChange={handleInputChange}
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500/60"
                      >
                        <option>رياض الأطفال (التمهيدي)</option>
                        <option>الصف الأول الأساسي</option>
                        <option>الصف الثاني الأساسي</option>
                        <option>الصف الثالث الأساسي</option>
                        <option>الصف الرابع الأساسي</option>
                        <option>المرحلة الإعدادية والأساسية العليا</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2">الأسلوب التربوي المفضل:</label>
                      <input
                        type="text"
                        name="lessonMethod"
                        value={inputs.lessonMethod}
                        onChange={handleInputChange}
                        placeholder="مثال: التعلم باللعب والنشاط الحركي، التفكير الناقد"
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500/60"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2">الهدف السلوكي الأساسي للحصة:</label>
                      <textarea
                        name="lessonObjective"
                        value={inputs.lessonObjective}
                        onChange={handleInputChange}
                        rows={2}
                        placeholder="ماذا تريدين من الطالبات أن يتعلمنه أو يستشعرنه؟"
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500/60 resize-none"
                      />
                    </div>
                  </motion.div>
                )}

                {activeTool === 'story' && (
                  <motion.div
                    key="story-fields"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2">القيمة التربوية للقصة:</label>
                      <input
                        type="text"
                        name="storyMoral"
                        value={inputs.storyMoral}
                        onChange={handleInputChange}
                        placeholder="مثال: الأمانة ومساعدة الآخرين، الصدق، حب الوطن"
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500/60"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2">اسم بطل القصة:</label>
                      <input
                        type="text"
                        name="storyHero"
                        value={inputs.storyHero}
                        onChange={handleInputChange}
                        placeholder="مثال: العصفور الصغير كوكو، الفتاة الذكية مريم"
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500/60"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2">مكان حدوث القصة:</label>
                      <input
                        type="text"
                        name="storySetting"
                        value={inputs.storySetting}
                        onChange={handleInputChange}
                        placeholder="مثال: حقل زيتون، شاطئ غزة، بلدة القدس القديمة"
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500/60"
                      />
                    </div>
                  </motion.div>
                )}

                {activeTool === 'union' && (
                  <motion.div
                    key="union-fields"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2">الجهة المرسل إليها الكتاب:</label>
                      <input
                        type="text"
                        name="unionRecipient"
                        value={inputs.unionRecipient}
                        onChange={handleInputChange}
                        placeholder="مثال: إدارة المدرسة الخاصة، مدير التربية والتعليم"
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500/60"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2">موضوع الكتاب الرسمي:</label>
                      <input
                        type="text"
                        name="unionSubject"
                        value={inputs.unionSubject}
                        onChange={handleInputChange}
                        placeholder="مثال: طلب تسوية الرواتب، تظلم من زيادة الأعباء الإدارية"
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500/60"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2">القضية الأساسية ومطالب المعلمات:</label>
                      <textarea
                        name="unionIssue"
                        value={inputs.unionIssue}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="مثال: عدم الالتزام بالحد الأدنى للأجور، زيادة عدد الحصص والملفات الورقية"
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500/60 resize-none"
                      />
                    </div>
                  </motion.div>
                )}

                {activeTool === 'custom' && (
                  <motion.div
                    key="custom-fields"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2">اكتبي أو الصقي أمرك الذهبي المخصص:</label>
                      <textarea
                        name="customPrompt"
                        value={inputs.customPrompt}
                        onChange={handleInputChange}
                        rows={6}
                        placeholder="الصقي هنا البرومبت المجمّع أو اكتبيه مباشرة..."
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-250 focus:outline-none focus:border-emerald-500/60 resize-none h-[220px]"
                        required
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Generate CTA Button */}
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-bold rounded-xl shadow-lg transition-all focus:ring-2 focus:ring-emerald-800 disabled:opacity-75 disabled:cursor-not-allowed group cursor-pointer text-center mt-4"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>جاري التوليد...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4.5 h-4.5" />
                    <span>توليد المحتوى بالذكاء الاصطناعي 🚀</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Left Output Terminal (7 columns) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="glass-panel border-slate-900 rounded-2xl flex-1 flex flex-col shadow-2xl overflow-hidden min-h-[350px]">
              
              {/* Terminal Title Bar */}
              <div className="px-5 py-4.5 bg-slate-900/80 border-b border-slate-850 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span className="font-bold text-slate-300 text-xs sm:text-sm">معاينة استجابة المساعد الذكي (Output Terminal)</span>
                </div>
                
                {/* Actions */}
                {output && (
                  <div className="flex gap-2">
                    <button
                      onClick={handleExport}
                      className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-305 bg-amber-955/20 hover:bg-amber-950/40 px-2.5 py-1.5 rounded-lg border border-amber-900/20 transition-all font-semibold cursor-pointer"
                    >
                      {exported ? <Check className="w-3.5 h-3.5 text-red-500" /> : <FileDown className="w-3.5 h-3.5" />}
                      <span>{exported ? 'تم التحميل!' : 'تحميل مستند Word'}</span>
                    </button>

                    <button
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 bg-emerald-950/20 hover:bg-emerald-950/40 px-2.5 py-1.5 rounded-lg border border-emerald-900/20 transition-all font-semibold cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-red-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'تم النسخ!' : 'نسخ المستند'}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Terminal Screen Body */}
              <div className="flex-1 p-6 bg-slate-950 text-slate-300 font-mono text-xs sm:text-sm leading-relaxed overflow-y-auto max-h-[450px] relative">
                {isGenerating && genStep ? (
                  <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center gap-3">
                    <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
                    <p className="text-emerald-400 text-xs font-semibold animate-pulse">{genStep}</p>
                  </div>
                ) : null}

                {!output && !isGenerating ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-slate-600 gap-2.5 py-16">
                    <Sparkles className="w-10 h-10 text-slate-800" />
                    <p className="font-sans text-xs sm:text-sm">أدخلي المعطيات في النموذج واضغطي على زر التوليد لرؤية قوة الذكاء الاصطناعي</p>
                  </div>
                ) : (
                  <div className="whitespace-pre-line border-r-2 border-emerald-500 pr-3 font-sans text-slate-200">
                    {output}
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AISandbox;
