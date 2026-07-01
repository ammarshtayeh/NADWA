import React, { useState } from 'react';
import { Image, Copy, Check, Award, Layout, BookOpen, AlertCircle } from 'lucide-react';

interface PosterTemplate {
  id: string;
  title: string;
  subject: string;
  description: string;
  rules: string[];
  prompt: string;
  layoutIdea: string;
}

export const VisualAidsSection: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const posterTemplates: PosterTemplate[] = [
    {
      id: 'biology',
      title: "بوستر تشريح الجهاز الهضمي والعلوم الحيوية",
      subject: "الأحياء والعلوم الطبية",
      description: "تصميم وسيلة إيضاحية طبية تظهر أجهزة الجسم البشري بترميز لوني واضح وأسهم توضيحية خالية من الهلوسة.",
      rules: [
        "ترميز لوني فريد لكل عضو (مثال: الكبد باللون البني، الأمعاء الغليظة باللون البني الفاتح).",
        "تسميات واضحة ومقروءة للمصطلحات العلمية مع ترقيم تسلسلي للعملية.",
        "تخصيص جزء جانبي لحقائق علمية سريعة وسؤال تفاعلي (هل تعلم؟).",
        "تضمين إرشادات السلامة أو التوجيهات الصحية العامة في الهوامش السفلية."
      ],
      prompt: "ملصق تعليمي علمي احترافي يوضح تشريح الجهاز الهضمي البشري بالكامل للأطفال. رسم تخطيطي دقيق وجميل لجسم الإنسان يظهر المريء، المعدة، الكبد، البنكرياس، والأمعاء بترميز لوني واضح وخلفية بيضاء نقية. أضف مؤشرات خطية رفيعة تشير إلى كل عضو مع فراغات لكتابة الأسماء باللغة العربية، بأسلوب تصميم رسوم توضيحية لاهوتية معاصرة ومقاس بوستر فصلي رأسي.",
      layoutIdea: "رسم انسيابي في المنتصف، مع قائمة مصطلحات مرقمة من 1 إلى 10 على اليمين، وبطاقات ملونة صغيرة للحقائق الغريبة أسفل البوستر."
    },
    {
      id: 'arabic-grammar',
      title: "بوستر شجرة النحو والقواعد (كان وأخواتها)",
      subject: "اللغة العربية والنحو",
      description: "تصميم بوستر شجري انسيابي يربط القواعد النحوية بعضها ببعض بأسلوب الخرائط الذهنية الجذابة.",
      rules: [
        "استخدام تمثيل بصري مألوف للأطفال (مثال: شجرة، غيوم، أو قطار انسيابي).",
        "تقسيم الأقسام بترميز لوني متباين (مثال: عائلة 'أصبح' بلون، وعائلة 'ليس' بلون).",
        "توفير أمثلة إعرابية تطبيقية قصيرة ومباشرة أسفل كل قسم.",
        "وضع تذكير سريع بالقاعدة الذهبية للإعراب في مربع مخصص وبارز."
      ],
      prompt: "ملصق إنفوجرافيك تعليمي لتعليم النحو العربي للأطفال يمثل 'شجرة كان وأخواتها'. شجرة مركزية جميلة تخرج منها أغصان ملونة تمثل الأخوات (كان، أصبح، أضحى، ظل، أمسى، بات، صار، ليس)، لكل غصن لون زاهٍ وتصميم أوراق شجر واضح ومكتوب عليها الكلمة بخط Tajawal عربي كبير. أسفل الشجرة رسم توضيحي لغرفة صفية مبهجة وصندوق مبسط يوضح قاعدة دخولها على المبتدأ والخبر، خلفية فاتحة ومريحة للعين.",
      layoutIdea: "شجرة مركزية في المنتصف مع 8 أغصان ملونة متفرعة، وصندوقين مسطحين في الأسفل للإعراب والأمثلة الشائعة."
    },
    {
      id: 'english-grammar',
      title: "بوستر الزمن المضارع البسيط (Present Simple)",
      subject: "اللغة الإنجليزية والقواعد العالمية",
      description: "تصميم وسيلة إيضاح دائرية أو شجرية لشرح تصريف الأفعال والضمائر بأسلوب المقارنة المباشرة.",
      rules: [
        "تقسيم الضمائر إلى مجموعتين واضحتين (المفرد والجمع) مع ترميز لوني متباين.",
        "توضيح قاعدة إضافة حرف S للفعل في حالة المفرد بإشارة بصرية مكبرة وملونة.",
        "جدول انسيابي مسطح يظهر صيغ النفي والاستفهام (Don't / Doesn't) بشكل متقابل.",
        "صندوق الكلمات المفتاحية الدالة (Time Expressions) في الركن لتسهيل الحفظ."
      ],
      prompt: "Educational wall poster for English Grammar explaining 'Present Simple Tense'. Modern infographic layout with dual color coding: one side for singular pronouns (He, She, It + verb-S) with a friendly robot character, and the other side for plural pronouns (I, You, We, They + verb) with a group of smiling kids. Includes clear text blocks for Positive, Negative (don't/doesn't), and Question forms. Soft pastel background, high contrast, clean typography, fully optimized for classroom display.",
      layoutIdea: "تصميم مقسم إلى نصفين رأسيين متقابلين للمقارنة السريعة، مع عجلة دائرية في المنتصف للظروف الزمنية الشائعة."
    },
    {
      id: 'physics-magnetic',
      title: "بوستر انسيابية المحرك الكهربائي والمغناطيس",
      subject: "العلوم الطبيعية والفيزياء",
      description: "تصميم رسم ميكانيكي ثلاثي الأبعاد مبسط يوضح خطوط المجال والقوى المغناطيسية بشكل مرئي ومحسوس.",
      rules: [
        "تمثيل اتجاه القوة والتيار والمجال بأسهم ملونة متطابقة مع قاعدة اليد اليمنى.",
        "رسم مبسط ثلاثي الأبعاد للمغناطيس يوضح قطبي الشمال (N) والجنوب (S) بلونين مميزين (الأحمر والأزرق).",
        "إضافة كارت جانبي يوضح حقيقة علمية حول مخترع الآلة وتطبيقاتها في حياتنا اليومية.",
        "وضع تحذيرات سلامة للتعامل مع المغناطيسات القوية والكهرباء في زاوية البوستر."
      ],
      prompt: "Infographic educational poster explaining electromagnetism and electric motors for school students. Clear 3D diagram showing a wire loop between two colored bar magnets (Red for North pole N, Blue for South pole S). Glowing arrows showing current flow direction and invisible magnetic field lines with soft glows. Minimalist icons for terminal wires and rotary motion, high-tech clean dark slate background, professional labeling boxes in Arabic and English, high readability.",
      layoutIdea: "رسم ثلاثي الأبعاد للنموذج الميكانيكي في الركن العلوي، ومخطط انسيابي ثنائي الأبعاد لشرح المبدأ بالأسفل مع كارت الحقائق الفيزيائية."
    }
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="visual-aids" className="relative py-24 bg-slate-900/10 overflow-hidden border-b border-slate-900/60 scroll-mt-20">
      <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.02] z-0"></div>
      <div className="absolute top-1/2 right-10 w-[300px] h-[300px] glow-purple opacity-5 blur-[120px] z-0"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-red-500 bg-red-950/40 border border-red-500/20 px-3.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
            <Layout className="w-3.5 h-3.5" />
            <span>تصميم الوسائل التعليمية والبوسترات</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-slate-100 via-emerald-100 to-slate-200 bg-clip-text text-transparent mt-3 mb-4">
            كيفية إنشاء بوسترات ووسائل تعليمية مرتبطة بالمنهاج
          </h2>
          <p className="text-slate-450 text-xs sm:text-sm md:text-base leading-relaxed">
            البوستر التعليمي ليس مجرد صورة ملونة، بل هو وسيلة إيضاحية مقننة تربوياً وبصرياً. تعلمي المعايير العشرة لإنشاء بوسترات خالية من الأخطاء وانسخي الأوامر الذهبية لتوليدها فوراً.
          </p>
        </div>

        {/* The 5 Core Pedagogical Rules Box */}
        <div className="glass-panel border-emerald-500/10 rounded-3xl p-6 sm:p-8 mb-16 relative overflow-hidden bg-slate-950/40">
          <div className="absolute top-0 left-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl"></div>
          
          <h3 className="text-base sm:text-lg font-black text-slate-100 mb-6 flex items-center gap-2">
            <Award className="w-5.5 h-5.5 text-emerald-450" />
            <span>المعايير الخمسة الذهبية للبوستر التعليمي المتميز والمنظم:</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="space-y-2 p-4 bg-slate-950/60 rounded-2xl border border-slate-900">
              <span className="text-lg">🎨</span>
              <h4 className="font-extrabold text-slate-200">1. التسلسل الهرمي البصري</h4>
              <p className="text-slate-450 leading-relaxed text-xs">
                يجب أن تكون الفكرة الرئيسية (مثل عنوان الدرس أو المكون الأساسي) هي الأكبر حجماً، وتليها العناوين الفرعية والمصطلحات التفسيرية الأصغر حجماً.
              </p>
            </div>
            
            <div className="space-y-2 p-4 bg-slate-950/60 rounded-2xl border border-slate-900">
              <span className="text-lg">🏷️</span>
              <h4 className="font-extrabold text-slate-200">2. الترميز اللوني والموازنة</h4>
              <p className="text-slate-450 leading-relaxed text-xs">
                استخدمي ألواناً متناسقة وغير متداخلة لتمييز المكونات. يمنع استخدام أكثر من 4 ألوان رئيسية لتفادي تشتيت بصر الأطفال.
              </p>
            </div>

            <div className="space-y-2 p-4 bg-slate-950/60 rounded-2xl border border-slate-900">
              <span className="text-lg">🚫</span>
              <h4 className="font-extrabold text-slate-200">3. تجنب الهلوسة البصرية والكلامية</h4>
              <p className="text-slate-455 leading-relaxed text-xs">
                عند توليد الصور بالذكاء الاصطناعي، يفضل ترك النصوص فارغة (أو طلب تسميات خطية فارغة) وكتابة الكلمات يدوياً ببرنامج Canva لتفادي الكلمات المشوهة.
              </p>
            </div>
          </div>
        </div>

        {/* Poster Templates Grid */}
        <div className="space-y-8">
          <h3 className="text-sm sm:text-base font-extrabold text-slate-200 flex items-center gap-1.5">
            <BookOpen className="w-5 h-5 text-emerald-450" />
            <span>نماذج وأوامر توليد بوسترات تعليمية مطابقة لمعايير الصورة المرفقة:</span>
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {posterTemplates.map((template) => (
              <div 
                key={template.id}
                className="glass-panel border-slate-900 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-slate-850 transition-all group relative"
              >
                <div className="space-y-5">
                  {/* Category and Title */}
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{template.subject}</span>
                      <h4 className="font-black text-slate-100 text-sm sm:text-base group-hover:text-emerald-400 transition-colors">
                        {template.title}
                      </h4>
                    </div>
                    <span className="p-2 bg-slate-950 border border-slate-850 rounded-xl">
                      <Image className="w-5 h-5 text-emerald-450" />
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {template.description}
                  </p>

                  {/* Scientific correctness rules list */}
                  <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-900 space-y-2">
                    <span className="block text-[10px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>قواعد التنسيق والصحة العلمية:</span>
                    </span>
                    <ul className="space-y-1.5 list-disc list-inside text-xs text-slate-350 leading-relaxed">
                      {template.rules.map((rule, i) => (
                        <li key={i}>{rule}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Layout Concept */}
                  <div className="text-xs text-slate-400">
                    <span className="font-bold text-slate-300">💡 فكرة الهيكلية المقترحة: </span>
                    {template.layoutIdea}
                  </div>

                  {/* Prompt Text block */}
                  <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-1.5 relative overflow-hidden">
                    <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest">صيغة البرومبت الذهبي للنسخ (Canva AI / DALL-E):</span>
                    <p className="text-slate-300 text-xs font-mono leading-relaxed select-all italic">
                      "{template.prompt}"
                    </p>
                  </div>
                </div>

                {/* Copy Button */}
                <div className="pt-5 border-t border-slate-900 mt-6">
                  <button
                    onClick={() => handleCopy(template.id, template.prompt)}
                    className="w-full inline-flex items-center justify-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-950 border border-slate-900 px-3.5 py-2.5 rounded-xl transition-all font-semibold cursor-pointer"
                  >
                    {copiedId === template.id ? <Check className="w-4 h-4 text-red-500" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedId === template.id ? 'تم نسخ البرومبت!' : 'نسخ برومبت توليد البوستر'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default VisualAidsSection;
