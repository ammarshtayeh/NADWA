import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, UserCheck, MessageSquarePlus, Lightbulb, Repeat } from 'lucide-react';

interface PromptFrameworkItem {
  element: string;
  description: string;
  example: string;
  color: string;
  bg: string;
}

interface PromptMethod {
  title: string;
  description: string;
  formula: string;
  example: string;
  icon: React.ComponentType<any>;
}

export const PromptingGuide: React.FC = () => {
  
  const framework: PromptFrameworkItem[] = [
    {
      element: "الدور (Role)",
      description: "حددي شخصية الذكاء الاصطناعي وخبرته لتوجهي نمط إجابته.",
      example: "تصرفي كمعلمة خبيرة في رياض الأطفال في فلسطين...",
      color: "text-red-400 border-red-500/20",
      bg: "bg-red-950/10"
    },
    {
      element: "السياق (Context)",
      description: "صِفي البيئة المحيطة، خلفية الموضوع، ومستوى الطلاب المستهدف.",
      example: "...أريد تحضير درس عن النظافة الشخصية لأطفال بعمر 5 سنوات بموارد بسيطة...",
      color: "text-amber-400 border-amber-500/20",
      bg: "bg-amber-950/10"
    },
    {
      element: "المهمة (Task)",
      description: "حددي العمل المطلوب إنجازه بدقة ووضوح.",
      example: "...اكتبي خطة نشاط حركي مدته 15 دقيقة يتضمن قصة قصيرة...",
      color: "text-emerald-400 border-emerald-500/20",
      bg: "bg-emerald-950/10"
    },
    {
      element: "المحددات (Constraints)",
      description: "ضعي قيوداً على طول الإجابة، اللغة، والأسلوب التربوي المتبع.",
      example: "...بحيث تكون اللغة عربية فصحى مبسطة، وتجنبي طلب أدوات مكلفة.",
      color: "text-blue-400 border-blue-500/20",
      bg: "bg-blue-950/10"
    }
  ];

  const methods: PromptMethod[] = [
    {
      title: "1. أسلوب تقمص الدور (Role Prompting)",
      description: "إعطاء المساعد الذكي صفة اعتبارية ومهنية مثل (مستشار قانوني نقابي، معلم رياضيات متقدم) لتغيير أسلوب التفكير وزيادة دقة المصطلحات.",
      formula: "تقمصي دور [الوظيفة/الخبرة] + وصممي [العمل المطلوب]",
      example: "تقمصي دور مستشار قانوني في قانون العمل الفلسطيني، واشرحي لي كيفية احتساب تعويض نهاية الخدمة لمعلمة مدرسة خاصة.",
      icon: UserCheck
    },
    {
      title: "2. أسلوب الأمثلة التوضيحية (Few-Shot Prompting)",
      description: "بدلاً من طلب المخرجات مباشرة، زوّدي الذكاء الاصطناعي بمثال أو مثالين لطريقة تحضيرك المفضلة، ثم اطلبي منه المحاكاة على مواضيع جديدة.",
      formula: "إدخال مثال [سؤال + جواب] + اطلبي منه توليد جواب مماثل لـ [موضوع جديد]",
      example: "هذا مثال على تحضيري لدرس العلوم (الاسم: ... الهدف: ... الأنشطة: ...). والآن، صممي لي تحضيراً لدرس 'الكسور في الرياضيات' بنفس الأسلوب تماماً.",
      icon: MessageSquarePlus
    },
    {
      title: "3. أسلوب التفكير المتسلسل (Chain of Thought)",
      description: "توجيه الذكاء الاصطناعي لحل المشكلة أو صياغة الرد خطوة بخطوة والتعبير عن تفكيره المنطقي، مما يقلل بشكل كبير من احتمالات الخطأ والهلوسة.",
      formula: "فكري خطوة بخطوة + صممي حل المشكلة لـ [القضية]",
      example: "لدينا مشكلة زيادة عبء تصحيح أوراق العمل للمعلمات. فكري خطوة بخطوة في اقتراح 3 حلول عملية، واشرحي إيجابيات وسلبيات كل حل قبل الخروج بتوصيتك.",
      icon: Lightbulb
    },
    {
      title: "4. حلقة التحسين المستمر (Iterative Prompting)",
      description: "لا تتوقعي الحصول على نتيجة مثالية من الأمر الأول. تعاملي مع الذكاء الاصطناعي كحوار مستمر؛ قومي بتعديل إجابته وطلب إضافات وتفاصيل تلو الأخرى.",
      formula: "مراجعة الجواب الأول + إعطاء تعديل (مثال: 'اجعلها أقصر'، 'أضف أسئلة صفية')",
      example: "القصة التي ولدتها رائعة، ولكن أريدها الآن أن تكون بلهجة دافئة وبسيطة أكثر، مع إضافة طفل يدعى 'سالم' كشخصية ثانوية تساعد البطل.",
      icon: Repeat
    }
  ];

  return (
    <section id="prompting-guide" className="relative py-24 bg-slate-900/10 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.02] z-0"></div>
      <div className="absolute top-1/2 left-[-10%] w-[350px] h-[350px] glow-purple rounded-full opacity-[0.06] blur-[120px] z-0"></div>
      <div className="absolute bottom-1/4 right-[-10%] w-[300px] h-[300px] glow-green rounded-full opacity-[0.06] blur-[110px] z-0"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/20 text-red-400 text-xs font-bold mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>مهارات المستقبل الأساسية</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-100 via-emerald-100 to-slate-200 bg-clip-text text-transparent mb-4">
            دليل هندسة الأوامر (كيف تحاورين الذكاء الاصطناعي؟)
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            الذكاء الاصطناعي ليس سحراً؛ جودة المخرجات تعتمد كلياً على جودة المدخلات. إليكِ القواعد والأساليب الذهبية للحصول على إجابات تفصيلية ودقيقة:
          </p>
        </div>

        {/* Framework Breakdown: The 4 elements of a perfect prompt */}
        <div className="mb-20">
          <h3 className="text-xl font-bold text-slate-100 mb-8 border-r-4 border-emerald-500 pr-3">
            المعادلة الذهبية لكتابة أمر كامل (Prompt Structure)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {framework.map((item, index) => (
              <div 
                key={index} 
                className={`glass-panel border rounded-2xl p-6 relative transition-all hover:border-slate-800 ${item.color} ${item.bg}`}
              >
                <div className="absolute top-4 left-6 text-2xl font-bold text-slate-700/20 font-mono">
                  {(index + 1).toString().padStart(2, '0')}
                </div>
                <h4 className="font-bold text-base sm:text-lg text-slate-100 mb-2">{item.element}</h4>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">{item.description}</p>
                <div className="p-3 bg-slate-950/80 border border-slate-900 rounded-xl text-[11px] sm:text-xs font-mono text-slate-300 leading-relaxed italic">
                  "{item.example}"
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prompting Methods Grid */}
        <div>
          <h3 className="text-xl font-bold text-slate-100 mb-8 border-r-4 border-emerald-500 pr-3">
            أفضل 4 أساليب للحوار المتقدم والفعال
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {methods.map((method, index) => {
              const MethodIcon = method.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -4 }}
                  className="glass-panel border border-slate-900 rounded-2xl p-8 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-850 text-emerald-400 flex-shrink-0">
                      <MethodIcon className="w-6 h-6" />
                    </div>
                    <div className="space-y-3 flex-1">
                      <h4 className="text-lg font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                        {method.title}
                      </h4>
                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                        {method.description}
                      </p>
                      
                      {/* Formula Badges */}
                      <div className="flex flex-wrap gap-1.5 items-center">
                        <span className="text-[10px] sm:text-xs font-semibold text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded-md border border-emerald-900/20">
                          صيغة الأمر: {method.formula}
                        </span>
                      </div>

                      {/* Example Box */}
                      <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-900 text-xs sm:text-sm font-mono text-slate-300 leading-relaxed relative">
                        <span className="absolute top-[-9px] right-4 px-2 bg-slate-950 text-[9px] text-slate-500 font-bold border border-slate-900 rounded">مثال تطبيقي:</span>
                        "{method.example}"
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default PromptingGuide;
