import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteContent } from '../data/content';
import type { AITool } from '../data/content';
import { ExternalLink, Play, X } from 'lucide-react';

export const Tools: React.FC = () => {
  const { tools } = siteContent;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeExampleTool, setActiveExampleTool] = useState<AITool | null>(null);

  const categories = [
    { id: 'all', label: 'الكل' },
    { id: 'education', label: 'التعليم' },
    { id: 'general', label: 'مساعد عام' },
    { id: 'design', label: 'التصميم والتقديم' },
    { id: 'audio', label: 'الصوت والأناشيد' },
    { id: 'productivity', label: 'الإنتاجية والتلخيص' }
  ];

  const filteredTools = selectedCategory === 'all'
    ? tools.items
    : tools.items.filter(tool => tool.category === selectedCategory);

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'education': return 'تعليمي مخصص';
      case 'general': return 'مساعد ذكي عام';
      case 'design': return 'تصميم وعروض';
      case 'audio': return 'توليد صوت وأناشيد';
      case 'productivity': return 'إنتاجية وبحوث';
      default: return 'أداة ذكية';
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'education': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'general': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'design': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'audio': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'productivity': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <section id="tools" className="relative py-24 bg-slate-900/20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.03] z-0"></div>
      <div className="absolute top-1/3 left-[-10%] w-[350px] h-[350px] glow-green rounded-full opacity-10 blur-[120px] z-0"></div>
      <div className="absolute bottom-10 right-1/4 w-80 h-80 glow-purple rounded-full opacity-10 blur-[130px] z-0"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-100 via-emerald-100 to-slate-200 bg-clip-text text-transparent mb-4">
            {tools.title}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed">
            {tools.subtitle}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold border transition-all duration-300 cursor-pointer ${
                selectedCategory === category.id
                  ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-md shadow-emerald-500/10'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8 mb-24">
          {filteredTools.map((tool: AITool) => (
            <div
              key={tool.name}
              className="glass-panel border-slate-900 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden hover:border-slate-850 hover:shadow-lg"
            >
              {/* Outer decorative glow */}
              <div className="absolute -top-12 -right-12 w-20 h-20 bg-emerald-500/5 group-hover:bg-emerald-500/10 rounded-full blur-xl transition-all"></div>

              <div>
                {/* Header: Name, Logo text, Category tag */}
                <div className="flex justify-between items-start gap-4 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center font-mono font-black text-xs text-emerald-450 shadow-inner group-hover:border-emerald-500/20 transition-all select-none">
                      {tool.logoText || "AI"}
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-slate-100 group-hover:text-emerald-400 transition-colors">
                      {tool.name}
                    </h3>
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border ${getCategoryColor(tool.category)}`}>
                    {getCategoryLabel(tool.category)}
                  </span>
                </div>

                {/* Primary Description */}
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                  {tool.description}
                </p>

                {/* Detailed usage parameters */}
                <div className="space-y-2.5 bg-slate-950/50 p-4 rounded-2xl border border-slate-900 mb-5 text-[11px] sm:text-xs">
                  <div>
                    <span className="block text-emerald-400 font-extrabold">💡 طريقة الاستخدام الأساسية:</span>
                    <span className="text-slate-300 font-medium leading-relaxed">{tool.usage}</span>
                  </div>
                  <div>
                    <span className="block text-red-400 font-extrabold">🎯 أفضل حالة لتوظيفها:</span>
                    <span className="text-slate-350 font-medium leading-relaxed">{tool.bestUse}</span>
                  </div>
                  {tool.features && (
                    <div className="pt-2 border-t border-slate-900 mt-2">
                      <span className="block text-amber-400 font-extrabold mb-1">⭐ المميزات الرئيسية:</span>
                      <ul className="space-y-1 list-disc list-inside text-slate-400">
                        {tool.features.map((f, i) => (
                          <li key={i} className="truncate">{f}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions panel */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-900 mt-auto">
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-emerald-400 font-bold transition-colors cursor-pointer"
                >
                  <span>زيارة الموقع الرسمى</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {tool.exampleResult && (
                  <button
                    onClick={() => setActiveExampleTool(tool)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/15 transition-all cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>اعرض مثالاً</span>
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* Comparison Table Section */}
        <div id="comparison-table" className="relative mt-12 bg-slate-950/30 border border-slate-900/60 rounded-3xl p-6 sm:p-10">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">مقارنة فنية هادفة</span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-100">جدول مقارنة الأدوات الذكية المساعدة</h3>
            <p className="text-slate-400 text-xs sm:text-sm">قارني بين أبرز نماذج الذكاء الاصطناعي المتاحة لتحديد الأداة الملائمة لكل محور:</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse text-xs sm:text-sm text-slate-300">
              <thead>
                <tr className="border-b border-slate-900 bg-slate-950/60 text-slate-400">
                  <th className="p-4 font-black">الأداة الذكية</th>
                  <th className="p-4 font-black">سهولة الاستخدام</th>
                  <th className="p-4 font-black">دعم اللغة العربية</th>
                  <th className="p-4 font-black">تحضير المناهج</th>
                  <th className="p-4 font-black">توليد الرسومات</th>
                  <th className="p-4 font-black">تصميم الشرائح</th>
                  <th className="p-4 font-black">بنك الاختبارات</th>
                  <th className="p-4 font-black">تلخيص الكتب</th>
                  <th className="p-4 font-black">التسعير</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900">
                <tr>
                  <td className="p-4 font-bold text-slate-100">ChatGPT</td>
                  <td className="p-4">سهل جداً (دردشة)</td>
                  <td className="p-4 text-emerald-450 font-bold">🟢 ممتازة</td>
                  <td className="p-4 text-emerald-450">🟢 كامل</td>
                  <td className="p-4 text-slate-500">❌ لا (إلا المدفوع)</td>
                  <td className="p-4 text-slate-500">❌ لا</td>
                  <td className="p-4 text-emerald-455">🟢 كامل</td>
                  <td className="p-4 text-emerald-455">🟢 كامل</td>
                  <td className="p-4">مجاني / مدفوع ($20)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-100">Gemini</td>
                  <td className="p-4">سهل جداً (دردشة)</td>
                  <td className="p-4 text-emerald-450 font-bold">🟢 ممتازة</td>
                  <td className="p-4 text-emerald-450">🟢 كامل</td>
                  <td className="p-4 text-amber-500">⚠️ جزئي</td>
                  <td className="p-4 text-slate-500">❌ لا</td>
                  <td className="p-4 text-emerald-455">🟢 كامل</td>
                  <td className="p-4 text-emerald-455">🟢 كامل (متصل)</td>
                  <td className="p-4">مجاني بالكامل</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-100">Claude AI</td>
                  <td className="p-4">سهل جداً (دردشة)</td>
                  <td className="p-4 text-emerald-455 font-bold">🟢 ممتازة (الأدق)</td>
                  <td className="p-4 text-emerald-455">🟢 كامل</td>
                  <td className="p-4 text-slate-500">❌ لا</td>
                  <td className="p-4 text-slate-500">❌ لا</td>
                  <td className="p-4 text-emerald-455">🟢 كامل</td>
                  <td className="p-4 text-emerald-455">🟢 ممتاز</td>
                  <td className="p-4">مجاني / مدفوع ($20)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-100">NotebookLM</td>
                  <td className="p-4">متوسط (يحتاج مستندات)</td>
                  <td className="p-4 text-emerald-455 font-bold">🟢 ممتازة</td>
                  <td className="p-4 text-amber-500">⚠️ جزئي (حسب المرجع)</td>
                  <td className="p-4 text-slate-500">❌ لا</td>
                  <td className="p-4 text-slate-500">❌ لا</td>
                  <td className="p-4 text-emerald-455">🟢 كامل</td>
                  <td className="p-4 text-emerald-455 font-extrabold">🟢 الأقوى 👑</td>
                  <td className="p-4">مجاني بالكامل</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-100">MagicSchool</td>
                  <td className="p-4 font-semibold text-emerald-400">سهل جداً (قوالب جاهزة)</td>
                  <td className="p-4 text-amber-500 font-bold">⚠️ جيدة (ترجمة)</td>
                  <td className="p-4 text-emerald-455 font-black">🟢 الأقوى 👑</td>
                  <td className="p-4 text-slate-500">❌ لا</td>
                  <td className="p-4 text-slate-500">❌ لا</td>
                  <td className="p-4 text-emerald-455 font-black">🟢 الأقوى 👑</td>
                  <td className="p-4 text-emerald-455">🟢 كامل</td>
                  <td className="p-4">مجاني للمعلمين</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-100">Canva AI</td>
                  <td className="p-4">سهل (واجهة تصميم)</td>
                  <td className="p-4 text-emerald-455 font-bold">🟢 ممتازة</td>
                  <td className="p-4 text-slate-500">❌ لا</td>
                  <td className="p-4 text-emerald-455 font-black">🟢 الأقوى 👑</td>
                  <td className="p-4 text-emerald-455 font-black">🟢 الأقوى 👑</td>
                  <td className="p-4 text-slate-500">❌ لا</td>
                  <td className="p-4 text-slate-500">❌ لا</td>
                  <td className="p-4">مجاني للمعلمين (Pro)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-100">Gamma</td>
                  <td className="p-4 font-semibold">سهل جداً (توليد عنوان)</td>
                  <td className="p-4 text-emerald-450 font-bold">🟢 ممتازة</td>
                  <td className="p-4 text-slate-500">❌ لا</td>
                  <td className="p-4 text-amber-500">⚠️ جزئي (صور تكميلية)</td>
                  <td className="p-4 text-emerald-455 font-black">🟢 الأقوى 👑</td>
                  <td className="p-4 text-slate-500">❌ لا</td>
                  <td className="p-4 text-slate-500">❌ لا</td>
                  <td className="p-4">نقاط مجانية / مدفوع</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-100">Napkin AI</td>
                  <td className="p-4">سهل (محرر مستندات)</td>
                  <td className="p-4 text-emerald-450 font-bold">🟢 ممتازة</td>
                  <td className="p-4 text-slate-500">❌ لا</td>
                  <td className="p-4 text-slate-500">❌ لا</td>
                  <td className="p-4 text-slate-500">❌ لا</td>
                  <td className="p-4 text-slate-500">❌ لا</td>
                  <td className="p-4 text-amber-500">⚠️ جزئي (مخططات)</td>
                  <td className="p-4">مجاني للنسخة التجريبية</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Tool Example Output Modal */}
      <AnimatePresence>
        {activeExampleTool && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveExampleTool(null)}
                className="absolute top-4 left-4 p-2 rounded-xl bg-slate-950 border border-slate-850 hover:bg-slate-850 text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center font-mono font-black text-xs text-emerald-450 shadow-inner select-none">
                  {activeExampleTool.logoText || "AI"}
                </div>
                <div>
                  <span className="text-[9px] font-bold text-emerald-400 tracking-widest block uppercase">مثال على مخرجات الأداة</span>
                  <h3 className="text-base sm:text-lg font-black text-slate-100">{activeExampleTool.name}</h3>
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-400">نموذج النتيجة المباشرة:</h4>
                <div className="bg-slate-950 border border-slate-850 rounded-2xl p-4.5 text-xs sm:text-sm font-mono text-emerald-450 whitespace-pre-wrap leading-relaxed min-h-[120px] max-h-[250px] overflow-y-auto select-all">
                  {activeExampleTool.exampleResult}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setActiveExampleTool(null)}
                  className="px-5 py-2.5 bg-slate-950 border border-slate-800 hover:bg-slate-850 rounded-xl text-xs font-bold text-slate-300 transition-all cursor-pointer"
                >
                  إغلاق النموذج
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Tools;
