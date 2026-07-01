import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { siteContent } from '../data/content';
import type { RewriteItem } from '../data/content';
import { 
  MessageSquare, Copy, Check, Sparkles, AlertCircle, 
  HelpCircle, ArrowLeft, Zap, RefreshCw, Info, FileText, 
  Camera, ShieldAlert
} from 'lucide-react';
import SpeakerNotes from '../components/SpeakerNotes';

export const HowToPromptPage: React.FC = () => {
  const { 
    promptBuilder, promptRules, comparisons, promptChemistry, 
    smartFramework, promptRewriter, lessonTemplates, 
    textbookPhotoGuide, troubleshootingSafety 
  } = siteContent;
  
  const navigate = useNavigate();

  // Dropdown states for Prompt Builder
  const [role, setRole] = useState(promptBuilder.roles[0].value);
  const [context, setContext] = useState(promptBuilder.contexts[0].value);
  const [task, setTask] = useState(promptBuilder.tasks[0].value);
  const [constraint, setConstraint] = useState(promptBuilder.constraints[0].value);

  const [compiledPrompt, setCompiledPrompt] = useState('');
  const [copiedBuilder, setCopiedBuilder] = useState(false);

  // Rewriter states
  const [customWeakPrompt, setCustomWeakPrompt] = useState('');
  const [selectedExampleId, setSelectedExampleId] = useState<string>('rw1');
  const [rewrittenPrompt, setRewrittenPrompt] = useState<RewriteItem | null>(null);
  const [isRewriting, setIsRewriting] = useState(false);
  const [copiedRewriter, setCopiedRewriter] = useState(false);

  // Copy states for templates and photo guide
  const [copiedTemplateIdx, setCopiedTemplateIdx] = useState<number | null>(null);
  const [copiedPhotoIdx, setCopiedPhotoIdx] = useState<number | null>(null);

  // Compile the builder prompt dynamically
  useEffect(() => {
    const roleText = promptBuilder.roles.find(r => r.value === role)?.text || '';
    const contextText = promptBuilder.contexts.find(c => c.value === context)?.text || '';
    const taskText = promptBuilder.tasks.find(t => t.value === task)?.text || '';
    const constraintText = promptBuilder.constraints.find(cs => cs.value === constraint)?.text || '';

    setCompiledPrompt(`${roleText}\n\n${contextText}\n\n${taskText}\n\n${constraintText}`);
  }, [role, context, task, constraint]);

  // Handle rewriter options
  useEffect(() => {
    const matched = promptRewriter.items.find(item => item.id === selectedExampleId);
    if (matched) {
      setRewrittenPrompt(matched);
      setCustomWeakPrompt(matched.weak);
    }
  }, [selectedExampleId]);

  const handleCopyText = (text: string, callback: () => void) => {
    navigator.clipboard.writeText(text);
    callback();
  };

  const handleRewrite = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRewriting(true);
    await new Promise(r => setTimeout(r, 1000));

    // Check if the input matches any predefined weak prompts
    const matched = promptRewriter.items.find(
      item => item.weak.trim() === customWeakPrompt.trim()
    );

    if (matched) {
      setRewrittenPrompt(matched);
    } else {
      // Dynamic AI rewrite mapping based on keywords in custom input
      const text = customWeakPrompt.toLowerCase();
      let category = 'تحضير درس';
      let strong = '';
      let benefit = '';

      if (text.includes('درس') || text.includes('تحضير') || text.includes('تعليم')) {
        category = 'تحضير درس';
        strong = `تصرفي كمعلمة خبيرة في المدارس الفلسطينية. صممي خطة درس شاملة لمادة العلوم أو الرياضيات حول موضوع [${customWeakPrompt}]. أريد تحديد هدفين سلوكيين، ونشاطاً استهلالياً مشوقاً مدته 5 دقائق يعتمد على مواد متوفرة مجاناً، ونشاطاً حركياً جماعياً، وسؤال تقييم ختامي مباشر لقياس الفهم.`;
        benefit = "تطبيق SMART: تم تحديد دور المعلمة الفلسطينية الخبيرة، والهدف المحدد للدرس، والمخرجات القابلة للقياس (أنشطة، وقت 5 دقائق، أسئلة تقييم).";
      } else if (text.includes('قصة') || text.includes('أطفال') || text.includes('روضة')) {
        category = 'قصة أطفال';
        strong = `اكتبي قصة تربوية قصيرة للأطفال بعمر 5 سنوات في رياض الأطفال الفلسطينية لتعزيز قيمة [${customWeakPrompt}]. صفي بيئة دافئة مستوحاة من بيارات برتقال يافا أو حقول الزيتون، وأضيفي 3 أسئلة للنقاش في اللقاء الصباحي ونشاطاً حركياً تمثيلياً مناسباً لعقولهم.`;
        benefit = "تطبيق SMART: تحديد الفئة العمرية (5 سنوات) والسياق الجغرافي ذي الصلة، وتحديد عدد الأسئلة والأنشطة كمعايير قابلة للقياس.";
      } else if (text.includes('نقاب') || text.includes('تظلم') || text.includes('كتاب') || text.includes('مدير')) {
        category = 'كتاب نقابي رسمي';
        strong = `تقمصي دور مستشار نقابي وقانوني في نقابة معلمات ورياض الأطفال في فلسطين. صوغي كتاباً رسمياً مهنياً وموجزاً موجهاً لمدير المدرسة بخصوص [${customWeakPrompt}] استناداً إلى قانون العمل الفلسطيني وتظلمات الكوادر، مطالباً بفتح باب الحوار لعقد جلسة تسوية.`;
        benefit = "تطبيق SMART: صياغة نبرة قانونية رصينة، وتحديد السياق المهني (نقابة المعلمات)، وتحديد النتيجة المستهدفة بدقة.";
      } else {
        category = 'أمر ذهبي مخصص';
        strong = `تصرفي كخبير ومستشار تكنولوجي متخصص في مجال التعليم والتمكين التكنولوجي. صمم دليلاً إرشادياً مفصلاً وعملياً حول موضوع [${customWeakPrompt}] يتكون من 4 نقاط رئيسية مع أمثلة وسيناريوهات تطبيقية تلائم المدارس الفلسطينية.`;
        benefit = "تطبيق SMART: تحويل الأمر المبهم إلى هيكل مفصل (4 نقاط، سيناريوهات تطبيقية) مع تحديد النطاق والدور المستشار.";
      }

      setRewrittenPrompt({
        id: 'custom-rw',
        category,
        weak: customWeakPrompt,
        strong,
        benefit
      });
    }
    setIsRewriting(false);
  };

  const handleTryPrompt = (text: string) => {
    navigate(`/sandbox?prompt=${encodeURIComponent(text)}`);
  };

  return (
    <div className="relative pt-20 animate-fade-in">
      
      {/* 1. Header Banner */}
      <section className="relative py-20 bg-slate-950 overflow-hidden border-b border-slate-900/60">
        <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.03] z-0"></div>
        <div className="absolute top-1/2 left-[-10%] w-[300px] h-[300px] glow-green opacity-5 blur-[120px] z-0"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-455 text-xs font-bold">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>هندسة الأوامر الحوارية الفعالة وعلم الصياغة</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 leading-tight">
            كيف أحاور الذكاء الاصطناعي؟
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed">
            الذكاء الاصطناعي شريك حوار تفاعلي. هنا ستتعلمين كيف تحولين أفكاركِ البسيطة إلى أوامر سحرية مهندسة تنتج مخرجات فورية ممتازة لدروسك ونشاطك النقابي.
          </p>
        </div>
      </section>

      {/* 2. VISUAL FORMULA DIALECT: كيمياء الأوامر السحرية */}
      <section className="relative py-20 bg-slate-950 overflow-hidden border-b border-slate-900/60">
        <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.01] z-0"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-slate-100 via-emerald-100 to-slate-200 bg-clip-text text-transparent mb-4">
              {promptChemistry.title}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              {promptChemistry.subtitle}
            </p>
          </div>

          {/* Formula Diagram Flow */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start max-w-6xl mx-auto mb-12">
            {promptChemistry.blocks.map((block, i) => (
              <div key={i} className="flex flex-col items-center text-center relative">
                {/* Visual Block Card */}
                <div className={`w-full bg-gradient-to-br ${block.color} border p-5 rounded-2xl shadow-lg relative overflow-hidden group transition-all duration-300 hover:-translate-y-1`}>
                  <span className="absolute top-2 left-3 font-mono text-2xl font-bold opacity-10">0{i+1}</span>
                  <h3 className="text-base sm:text-lg font-black text-slate-100 mb-2">{block.label}</h3>
                  <p className="text-[11px] sm:text-xs text-slate-100/90 leading-relaxed min-h-[40px]">{block.text}</p>
                </div>
                
                {/* Pointer Line */}
                <div className="w-0.5 h-6 bg-slate-800 my-2"></div>

                {/* Example Callout Box */}
                <div className="p-3 bg-slate-900/60 border border-slate-850 rounded-xl text-[11px] sm:text-xs font-mono text-slate-350 leading-relaxed italic w-full">
                  "{block.example}"
                </div>

                {/* Plus operator between columns (on desktop) */}
                {i < 4 && (
                  <div className="hidden lg:flex absolute top-10 right-[-18px] text-emerald-455 font-bold text-xl select-none z-20">
                    +
                  </div>
                )}
              </div>
            ))}

            {/* Equals Block & Ideal Result */}
            <div className="col-span-1 lg:col-span-5 flex flex-col items-center justify-center pt-8 border-t border-slate-900 mt-4">
              <div className="flex items-center gap-4 text-emerald-400 font-extrabold text-2xl select-none mb-4">
                <span>=</span>
                <span className="text-slate-100 text-lg">النتيجة المثالية التفاعلية 🎯</span>
              </div>
              
              {/* Chemical formula Tip box */}
              <div className="glass-panel border-emerald-500/20 bg-emerald-950/5 rounded-2xl p-4 sm:p-5 flex items-start gap-3 max-w-2xl relative overflow-hidden">
                <div className="absolute top-0 right-10 w-12 h-1 bg-red-650"></div>
                <Zap className="w-5.5 h-5.5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-slate-300 text-xs sm:text-sm font-semibold leading-relaxed">
                  <span className="text-emerald-455 font-bold">نصيحة ذهبية:</span> {promptChemistry.tip}
                </p>
              </div>
            </div>

            {/* Axis 2 Speaker Notes */}
            <div className="max-w-4xl mx-auto mt-10">
              <SpeakerNotes
                whatToSay="الذكاء الاصطناعي مثل مرآة ذكية؛ إذا سألته سؤالاً مبدئياً سيعطيك رداً باهتاً. كيمياء البرومبت تتكون من 5 عناصر أساسية (الدور، المهمة، السياق، القيود، والمخرجات). وقاعدة SMART الذهبية تجعله محدداً بالسياق الفلسطيني ومقاساً بالوقت المتاح للحصة الصفية."
                questionsToAsk="ما الفرق بين كتابة 'اكتب لي تحضير درس' وبين كتابة أمر بأسلوب SMART؟"
                liveExample="تعديل أمر صفي بسيط باستخدام أداة معيد الصياغة التفاعلية ومقارنة النتيجتين."
                nextAxis="سنتحدث الآن عن المحور الثالث: كيف نستخدم قوالب التحضير الجاهزة لوزارة التربية وصور كتب المناهج."
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE PROMPT REWRITER: معيد صياغة الأوامر */}
      <section id="prompt-rewriter" className="relative py-20 bg-slate-950 overflow-hidden border-b border-slate-900/60">
        <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.02] z-0"></div>
        <div className="absolute top-1/2 left-[-10%] w-[350px] h-[350px] glow-purple opacity-[0.06] blur-[120px] z-0"></div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-100 via-emerald-100 to-slate-200 bg-clip-text text-transparent mb-4">
              {promptRewriter.title}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              {promptRewriter.subtitle}
            </p>
          </div>

          {/* Quick Examples Selection */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-8">
            {promptRewriter.items.map(item => (
              <button
                key={item.id}
                onClick={() => setSelectedExampleId(item.id)}
                className={`px-4.5 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  selectedExampleId === item.id && customWeakPrompt === item.weak
                    ? 'bg-red-500/20 border-red-500/65 text-red-400 shadow-md shadow-red-500/5'
                    : 'bg-slate-900/60 border-slate-850 text-slate-400 hover:text-slate-250 hover:bg-slate-900'
                }`}
              >
                💡 {item.category}
              </button>
            ))}
          </div>

          {/* Rewrite Interface panel */}
          <div className="glass-panel border-slate-900 rounded-3xl p-6 sm:p-8 space-y-6">
            <form onSubmit={handleRewrite} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2">اكتبي أمراً بسيطاً أو ضعيفاً لتعديله (مثال: قصة عن الأمانة):</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={customWeakPrompt}
                    onChange={(e) => setCustomWeakPrompt(e.target.value)}
                    placeholder="مثال: اكتبلي درس رياضيات، قصة تفاعلية، خطاب مطالبة بالراتب..."
                    className="flex-grow bg-slate-950 border border-slate-850 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-red-500/50"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isRewriting}
                    className="sm:w-auto px-6 py-3.5 bg-gradient-to-r from-red-550 to-red-650 hover:brightness-110 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    {isRewriting ? <RefreshCw className="w-4.5 h-4.5 animate-spin" /> : <Zap className="w-4.5 h-4.5" />}
                    <span>أعد صياغة الأمر ذهبياً ✨</span>
                  </button>
                </div>
              </div>
            </form>

            {/* Comparison Outcome Output */}
            {rewrittenPrompt && (
              <div className="space-y-6 pt-4 border-t border-slate-900">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Left: Weak Command */}
                  <div className="p-5 rounded-2xl bg-red-950/5 border border-red-500/10 space-y-3 relative overflow-hidden">
                    <div className="absolute top-0 right-10 w-12 h-0.5 bg-red-500"></div>
                    <div className="flex items-center gap-1.5 text-red-400 text-xs font-bold">
                      <AlertCircle className="w-4 h-4" />
                      <span>الصياغة البسيطة (البرومبت الضعيف)</span>
                    </div>
                    <p className="text-slate-400 text-xs sm:text-sm font-mono leading-relaxed p-3 bg-slate-950 border border-slate-900 rounded-lg italic">
                      "{rewrittenPrompt.weak}"
                    </p>
                  </div>

                  {/* Right: Golden SMART Command */}
                  <div className="p-5 rounded-2xl bg-emerald-950/5 border border-emerald-500/10 space-y-3 relative overflow-hidden">
                    <div className="absolute top-0 right-10 w-12 h-0.5 bg-emerald-500"></div>
                    <div className="flex items-center gap-1.5 text-emerald-450 text-xs font-bold">
                      <Sparkles className="w-4 h-4" />
                      <span>الصياغة المهندسة (البرومبت الذهبي)</span>
                    </div>
                    <div className="p-3.5 bg-slate-950 border border-slate-900 rounded-lg font-mono text-xs sm:text-sm text-slate-200 leading-relaxed relative">
                      "{rewrittenPrompt.strong}"
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => handleCopyText(rewrittenPrompt.strong, () => {
                          setCopiedRewriter(true);
                          setTimeout(() => setCopiedRewriter(false), 2000);
                        })}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-950 border border-slate-900 px-3 py-2.5 rounded-lg transition-all font-semibold cursor-pointer"
                      >
                        {copiedRewriter ? <Check className="w-3.5 h-3.5 text-red-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedRewriter ? 'تم النسخ!' : 'نسخ الأمر المحدث'}</span>
                      </button>

                      <button
                        onClick={() => handleTryPrompt(rewrittenPrompt.strong)}
                        className="flex-grow inline-flex items-center justify-center gap-1.5 text-xs text-slate-950 bg-emerald-500 hover:bg-emerald-650 px-3 py-2.5 rounded-lg transition-all font-bold cursor-pointer"
                      >
                        <span>جربيه في المختبر التفاعلي 🚀</span>
                      </button>
                    </div>
                  </div>

                </div>

                {/* SMART gains explain box */}
                <div className="p-4.5 rounded-2xl bg-slate-900/30 border border-slate-900 flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-900 text-amber-400 flex-shrink-0 mt-0.5">
                    <Info className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 mb-1">مكاسب تطبيق معادلة SMART والترقية:</h4>
                    <p className="text-slate-350 text-xs sm:text-sm leading-relaxed">
                      {rewrittenPrompt.benefit}
                    </p>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. NEW: قوالب التحضير المعتمدة بوزارة التربية الفلسطينية */}
      <section className="relative py-20 bg-slate-950 overflow-hidden border-b border-slate-900/60">
        <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.02] z-0"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 glow-green opacity-[0.03] blur-[100px] z-0"></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-100 via-emerald-100 to-slate-200 bg-clip-text text-transparent mb-4">
              {lessonTemplates.title}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
              {lessonTemplates.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {lessonTemplates.items.map((item, idx) => (
              <div key={idx} className="glass-panel border-slate-900 rounded-3xl p-6 flex flex-col justify-between space-y-6 hover:border-slate-850 transition-all">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                      <FileText className="w-5 h-5" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-100">{item.title}</h3>
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>

                  <div className="p-3 bg-slate-950 border border-slate-900 rounded-xl space-y-1">
                    <span className="block text-[10px] font-bold text-slate-500">أعمدة وهيكل الجدول المطلوب:</span>
                    <p className="text-emerald-450 text-[11px] sm:text-xs font-mono font-bold leading-relaxed">
                      {item.columns}
                    </p>
                  </div>

                  <div className="p-4 bg-slate-950/60 border border-slate-900 rounded-xl space-y-2">
                    <span className="block text-[10px] font-bold text-slate-500">كود الأمر الذهبي المفرغ:</span>
                    <p className="text-slate-300 text-xs font-mono leading-relaxed select-all">
                      {item.prompt}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 pt-4 border-t border-slate-900">
                  <button
                    onClick={() => handleCopyText(item.prompt, () => {
                      setCopiedTemplateIdx(idx);
                      setTimeout(() => setCopiedTemplateIdx(null), 2000);
                    })}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-950 border border-slate-900 px-3 py-2.5 rounded-lg transition-all font-semibold cursor-pointer"
                  >
                    {copiedTemplateIdx === idx ? <Check className="w-3.5 h-3.5 text-red-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedTemplateIdx === idx ? 'تم النسخ!' : 'نسخ كود القالب'}</span>
                  </button>

                  <button
                    onClick={() => handleTryPrompt(item.prompt)}
                    className="flex-grow inline-flex items-center justify-center gap-1.5 text-xs text-slate-950 bg-emerald-500 hover:bg-emerald-600 px-3 py-2.5 rounded-lg transition-all font-bold cursor-pointer"
                  >
                    <span>تطبيق وتعبئة بالمحاكي 🚀</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. NEW: دليل توجيه صور الكتب المدرسية الفلسطينية */}
      <section className="relative py-20 bg-slate-950 overflow-hidden border-b border-slate-900/60">
        <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.02] z-0"></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-100 via-emerald-100 to-slate-200 bg-clip-text text-transparent mb-4">
              {textbookPhotoGuide.title}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
              {textbookPhotoGuide.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {textbookPhotoGuide.items.map((item, idx) => (
              <div key={idx} className="glass-panel border-slate-900 rounded-3xl p-6 flex flex-col justify-between space-y-6 hover:border-slate-850 transition-all">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
                      <Camera className="w-5 h-5" />
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-150">{item.title}</h3>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {item.description}
                  </p>

                  <div className="p-3.5 bg-slate-950 border border-slate-900 rounded-xl space-y-2">
                    <span className="block text-[9px] font-bold text-red-400 uppercase tracking-widest">الصقي هذا الأمر مع الصورة:</span>
                    <p className="text-slate-200 text-xs font-mono leading-relaxed italic">
                      "{item.prompt}"
                    </p>
                  </div>
                </div>

                <div className="flex gap-2.5 pt-4 border-t border-slate-900">
                  <button
                    onClick={() => handleCopyText(item.prompt, () => {
                      setCopiedPhotoIdx(idx);
                      setTimeout(() => setCopiedPhotoIdx(null), 2000);
                    })}
                    className="w-full inline-flex items-center justify-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-950 border border-slate-900 px-3 py-2.5 rounded-lg transition-all font-semibold cursor-pointer"
                  >
                    {copiedPhotoIdx === idx ? <Check className="w-3.5 h-3.5 text-red-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPhotoIdx === idx ? 'تم النسخ!' : 'نسخ الأمر المرفق'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Axis 3 Speaker Notes */}
          <div className="max-w-4xl mx-auto mt-10">
            <SpeakerNotes
              whatToSay="نستعرض النماذج الرسمية للوزارة كتحضير رباعي وخماسي. أيضاً، إذا لم يتوفر لديكِ وقت للكتابة، يمكنكِ تصوير صفحة كتاب التنشئة بهاتفكِ ورفعها للمساعد الذكي مع الأمر المناسب لينتج لكِ أسئلة الامتحان والألعاب الصفية فوراً."
              questionsToAsk="هل جربتِ سابقاً رفع صورة من كتاب مدرسي لتوليد أسئلة وأنشطة صفية؟"
              liveExample="استخدام أمر تحويل صورة الكتاب ونسخه مباشرة لتطبيق عملي أمام الجمهور."
              nextAxis="سنتحدث الآن عن المحور الرابع: كيف يوفر الذكاء الاصطناعي 90% من الأعباء النقابية والخطابات الرسمية."
            />
          </div>
        </div>
      </section>

      {/* 6. SMART FRAMEWORK EXPLAINER: ما هو SMART وما فائدته؟ */}
      <section className="relative py-20 bg-slate-950 overflow-hidden border-b border-slate-900/60">
        <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.02] z-0"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 glow-green opacity-5 blur-[120px] z-0"></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-100 via-emerald-100 to-slate-200 bg-clip-text text-transparent mb-4">
              {smartFramework.title}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              {smartFramework.subtitle}
            </p>
          </div>

          {/* SMART Grid cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {smartFramework.items.map((item, idx) => (
              <div
                key={idx}
                className={`glass-panel border rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] ${item.color}`}
              >
                <div>
                  {/* Big Letter Header */}
                  <div className="text-4xl font-black font-mono opacity-25 mb-4">{item.letter}</div>
                  
                  <h3 className="font-extrabold text-slate-100 text-sm sm:text-base mb-2">
                    {item.name}
                  </h3>
                  
                  <p className="text-slate-400 text-xs leading-relaxed mb-4">
                    {item.meaning}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-900/80">
                  <span className="block text-[10px] font-bold text-emerald-450 mb-1">فائدته مع الـ AI:</span>
                  <p className="text-slate-350 text-[11px] leading-relaxed">
                    {item.benefit}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Dropdowns Prompt Builder Section */}
      <section className="relative py-20 bg-slate-950 overflow-hidden border-b border-slate-900/60">
        <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.02] z-0"></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-100 via-emerald-100 to-slate-200 bg-clip-text text-transparent mb-4">
              {promptBuilder.title}
            </h2>
            <p className="text-slate-455 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
              {promptBuilder.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Form selectors (5 Columns) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="glass-panel border-slate-900 rounded-2xl p-6 space-y-5 flex-grow">
                {/* 1. Role */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2">1. حددي دور المساعد (Role):</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500/60"
                  >
                    {promptBuilder.roles.map(r => (
                      <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                  </select>
                </div>

                {/* 2. Context */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2">2. حددي السياق (Context):</label>
                  <select
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500/60"
                  >
                    {promptBuilder.contexts.map(c => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>

                {/* 3. Task */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2">3. حددي المهمة المطلوبة (Task):</label>
                  <select
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500/60"
                  >
                    {promptBuilder.tasks.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>

                {/* 4. Constraints */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2">4. حددي القيود والمحددات (Constraints):</label>
                  <select
                    value={constraint}
                    onChange={(e) => setConstraint(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500/60"
                  >
                    {promptBuilder.constraints.map(cs => (
                      <option key={cs.value} value={cs.value}>{cs.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Compiled Output (7 Columns) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div className="glass-panel border-slate-900 rounded-2xl p-6 bg-slate-900/20 flex flex-col justify-between h-full space-y-6">
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                    <Sparkles className="w-4 h-4 text-emerald-450" />
                    <span>البرومبت الذهبي المُجمّع (المنهاج والعمل النقابي):</span>
                  </div>
                  
                  {/* Prompt Output Display */}
                  <div className="p-5 rounded-xl bg-slate-950 border border-slate-900 text-xs sm:text-sm text-slate-200 leading-relaxed font-mono whitespace-pre-wrap select-all select-none min-h-[220px]">
                    {compiledPrompt}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => handleCopyText(compiledPrompt, () => {
                      setCopiedBuilder(true);
                      setTimeout(() => setCopiedBuilder(false), 2000);
                    })}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-slate-900 hover:bg-slate-850 border border-slate-850 text-slate-100 font-bold rounded-xl shadow-lg transition-all cursor-pointer"
                  >
                    {copiedBuilder ? <Check className="w-4.5 h-4.5 text-red-500" /> : <Copy className="w-4.5 h-4.5" />}
                    <span>{copiedBuilder ? 'تم النسخ للحافظة!' : 'نسخ الأمر الذهبي'}</span>
                  </button>

                  <button
                    onClick={() => handleTryPrompt(compiledPrompt)}
                    className="flex-grow flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-black rounded-xl shadow-lg transition-all cursor-pointer"
                  >
                    <span>جربيه في مختبر التوليد 🚀</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Golden Prompting Rules Section */}
      <section className="relative py-20 bg-slate-950 overflow-hidden border-b border-slate-900/60">
        <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.02] z-0"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-100 via-emerald-100 to-slate-200 bg-clip-text text-transparent mb-4">
              {promptRules.title}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              {promptRules.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promptRules.items.map((rule, i) => (
              <div
                key={i}
                className="glass-panel border-slate-900 rounded-2xl p-6 hover:border-slate-850 transition-all relative overflow-hidden group"
              >
                <div className="absolute top-0 right-6 w-10 h-0.5 bg-emerald-500"></div>
                <h3 className="font-extrabold text-slate-200 text-base mb-3 group-hover:text-emerald-400 transition-colors">
                  {rule.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {rule.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Good vs. Bad Prompt Comparisons Section */}
      <section className="relative py-20 bg-slate-950 overflow-hidden border-b border-slate-900/60">
        <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.02] z-0"></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-100 via-emerald-100 to-slate-200 bg-clip-text text-transparent mb-4">
              {comparisons.title}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              {comparisons.subtitle}
            </p>
          </div>

          {/* Comparisons List */}
          <div className="space-y-12">
            {comparisons.items.map((comp, idx) => (
              <div key={idx} className="space-y-6 border-b border-slate-900/60 pb-12 last:border-b-0 last:pb-0">
                <h3 className="text-base sm:text-lg font-bold text-slate-100 border-r-4 border-red-500 pr-3">
                  {comp.title}
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Bad Prompt Card */}
                  <div className="glass-panel border-red-500/10 bg-red-950/5 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-650"></div>
                    <div>
                      <div className="flex items-center gap-1.5 text-red-400 text-xs font-bold mb-3">
                        <AlertCircle className="w-4 h-4" />
                        <span>الأمر البسيط الضعيف (❌ غير مستحسن)</span>
                      </div>
                      <p className="text-slate-300 font-mono text-xs sm:text-sm leading-relaxed p-3 bg-slate-950 border border-slate-900 rounded-lg italic">
                        "{comp.badPrompt}"
                      </p>
                    </div>
                  </div>

                  {/* Good Prompt Card */}
                  <div className="glass-panel border-emerald-500/20 bg-emerald-950/5 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-500"></div>
                    <div>
                      <div className="flex items-center gap-1.5 text-emerald-450 text-xs font-bold mb-3">
                        <Sparkles className="w-4 h-4" />
                        <span>الأمر المهندس الذهبي (✅ مستحسن جداً)</span>
                      </div>
                      <p className="text-slate-200 font-mono text-xs sm:text-sm leading-relaxed p-3 bg-slate-950 border border-slate-900 rounded-lg italic">
                        "{comp.goodPrompt}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Explanation Card */}
                <div className="glass-panel border-slate-900 rounded-xl p-4 bg-slate-900/10 flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-900 text-amber-400 flex-shrink-0 mt-0.5">
                    <HelpCircle className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 mb-1">لماذا هذا التغيير ضروري؟ (الشرح التعليمي والنقابي):</h4>
                    <p className="text-slate-350 text-xs sm:text-sm leading-relaxed">
                      {comp.explanation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. NEW: حل مشكلات الاستخدام وأمن وخصوصية البيانات */}
      <section className="relative py-20 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.02] z-0"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 glow-purple opacity-[0.04] blur-[120px] z-0"></div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-100 via-emerald-100 to-slate-200 bg-clip-text text-transparent mb-4">
              {troubleshootingSafety.title}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
              {troubleshootingSafety.subtitle}
            </p>
          </div>

          <div className="space-y-6">
            {troubleshootingSafety.items.map((item, idx) => (
              <div key={idx} className="glass-panel border-slate-900 rounded-2xl p-6 space-y-4 hover:border-slate-850 transition-all relative overflow-hidden group">
                <div className="absolute top-0 right-12 w-20 h-0.5 bg-red-500"></div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-red-950/40 border border-red-500/20 text-red-400">
                      <ShieldAlert className="w-5 h-5 animate-pulse" />
                    </div>
                    <h3 className="text-xs sm:text-sm md:text-base font-black text-slate-200">
                      {item.question}
                    </h3>
                  </div>

                  <span className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-900 text-slate-400 text-[10px] font-bold">
                    🛡️ {item.badge}
                  </span>
                </div>

                <p className="text-slate-350 text-xs sm:text-sm leading-relaxed whitespace-pre-line bg-slate-950/45 p-4 rounded-xl border border-slate-955/80">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Axis 6 Speaker Notes */}
          <div className="max-w-3xl mx-auto mt-10">
            <SpeakerNotes
              whatToSay="أمن البيانات خط أحمر. يمنع كشف أسماء أو علامات أو خصوصية الطالبات. كذلك سنتعلم كيفية حل مشكلة توقف الذكاء الاصطناعي عن الكتابة فجأة (كتابة كلمة 'أكمل') لتلافي الأخطاء التقنية."
              questionsToAsk="ما هي المخاطر التقنية والأخلاقية لإدخال أسماء وعلامات طالباتنا للمساعد الذكي؟"
              liveExample="مراجعة كروت حل مشكلات انقطاع النصوص والهلوستة واستعراضها."
              nextAxis="سنتحدث الآن عن المحور السابع والأخير: التطبيق الفردي وتصفح حقيبة الموارد وتوزيع الشهادات."
            />
          </div>
        </div>
      </section>

    </div>
  );
};

export default HowToPromptPage;
