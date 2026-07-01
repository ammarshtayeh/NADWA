import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Download, Youtube, BookOpen, ExternalLink, 
  Search, Globe, Sparkles 
} from 'lucide-react';

interface ResourceItem {
  title: string;
  description: string;
  category: 'pdf' | 'video' | 'site' | 'book';
  url: string;
  sizeOrDuration?: string;
  badge?: string;
}

export const ResourcesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'pdf' | 'video' | 'site' | 'book'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'الكل' },
    { id: 'pdf', label: '📄 مستندات وعروض (PDF/PPT)' },
    { id: 'video', label: '🎥 قنوات ودروس يوتيوب' },
    { id: 'site', label: '🌐 مواقع ومنصات مجانية' },
    { id: 'book', label: '📚 كتب ومراجع مقترحة' }
  ];

  const resourcesList: ResourceItem[] = [
    {
      title: "دليل المتحدث الذكاء الاصطناعي للمعلمات",
      description: "الحقيبة التدريبية الكاملة الموجهة للمعلمات وصانعات القرار التربوي ورياض الأطفال لشرح أدوات التمكين الرقمي.",
      category: "pdf",
      url: "/دليل-المتحدث-الذكاء-الاصطناعي-للمعلمات.pdf",
      sizeOrDuration: "1.02 MB",
      badge: "دليل رسمي"
    },
    {
      title: "أجندة الندوة التفصيلية للمسؤولين",
      description: "المستند الرسمي التفصيلي لتوزيع المحاضرات الزمنية وتقييم الورشة الإدارية الشاملة لثلاث ساعات.",
      category: "pdf",
      url: "/Agenda-الندوة-AI-للمسؤولين.pdf",
      sizeOrDuration: "218 KB",
      badge: "أجندة رسمية"
    },
    {
      title: "عرض الندوة التقديمي PowerPoint (PPTX)",
      description: "شرائح العرض التوضيحية والتمثيلية التي يستخدمها المدرب عمار اشتية في استعراض الأقسام والتطبيقات الصفية.",
      category: "pdf",
      url: "/عرض-الندوة-AI-للمعلمات.pptx",
      sizeOrDuration: "233 KB",
      badge: "عرض شرائح"
    },
    {
      title: "العرض النقابي التقديمي Pitch Deck (PPTX)",
      description: "العرض التقديمي المخصص لشرح وتأصيل توظيف الذكاء الاصطناعي في تمكين اللجان وإدارة نقابة معلمات ورياض الأطفال.",
      category: "pdf",
      url: "/Pitch-Deck-ندوة-AI-نقابة-المعلمات.pptx",
      sizeOrDuration: "204 KB",
      badge: "عرض نقابي"
    },
    {
      title: "قناة ساجد العباسي - تقنيات التعليم",
      description: "قناة عربية رائدة تقدم شروحات تطبيقية مبسطة لاستخدام الذكاء الاصطناعي وتصميم العروض التفاعلية للمعلمين.",
      category: "video",
      url: "https://www.youtube.com/@SajidAlAbbasi",
      sizeOrDuration: "دروس مستمرة",
      badge: "قناة موصى بها"
    },
    {
      title: "قناة معلمين مبدعين - Creative Teachers",
      description: "شروحات تقنية وأفكار صفية مدمجة بالذكاء الاصطناعي والتطبيقات التفاعلية لتبسيط التحضير والمحتوى التربوي.",
      category: "video",
      url: "https://www.youtube.com/results?search_query=%D9%85%D8%B9%D9%84%D9%85%D9%8A%D9%86+%D9%85%D8%A8%D8%AF%D8%B9%D9%8A%D9%86",
      sizeOrDuration: "دروس مسجلة",
      badge: "شروحات تطبيقية"
    },
    {
      title: "منصة MagicSchool AI التعليمية",
      description: "الموقع المجاني المتكامل والمدعوم بأكثر من 50 أداة لتوليد الاختبارات وخطط الدروس وتلخيص نصوص المعلمين.",
      category: "site",
      url: "https://www.magicschool.ai",
      sizeOrDuration: "مجاني / مدفوع",
      badge: "منصة تعليمية"
    },
    {
      title: "موقع Napkin AI للمخططات",
      description: "أداة ذكية ممتازة لتحويل نصوص التحضير والشروحات العلمية والجغرافية تلقائياً إلى رسوم بيانية وتوضيحية للمدارس.",
      category: "site",
      url: "https://www.napkin.ai",
      sizeOrDuration: "نسخة مجانية",
      badge: "أداة بصرية"
    },
    {
      title: "كتاب الذكاء الاصطناعي في التعليم - دليل المعلمين",
      description: "كتاب رقمي تربوي يستعرض أخلاقيات ومفاهيم صياغة الأوامر وبناء المساعدين المخصصين للمنهاج والطلاب.",
      category: "book",
      url: "https://unesdoc.unesco.org/ark:/48223/pf0000375322_ara",
      sizeOrDuration: "منشورات اليونسكو",
      badge: "كتاب رسمي عربي"
    },
    {
      title: "دليل المعلم لتطبيقات الذكاء التوليدي",
      description: "إطار عملي ودليل توجيهي من معهد ماساتشوستس للتكنولوجيا (MIT) لتمكين المعلمين وصناعة البرومبتات في المدرسة.",
      category: "book",
      url: "https://www.mit.edu",
      sizeOrDuration: "مترجم للعربية",
      badge: "دليل مرجعي"
    }
  ];

  const filteredResources = resourcesList
    .filter(res => activeCategory === 'all' || res.category === activeCategory)
    .filter(res => 
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      res.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const getIcon = (cat: string) => {
    switch (cat) {
      case 'pdf': return <FileText className="w-5 h-5 text-red-400" />;
      case 'video': return <Youtube className="w-5 h-5 text-emerald-450" />;
      case 'site': return <Globe className="w-5 h-5 text-blue-450" />;
      case 'book': return <BookOpen className="w-5 h-5 text-amber-450" />;
      default: return <FileText className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="relative pt-20 animate-fade-in">
      {/* 1. Header Banner */}
      <section className="relative py-20 bg-slate-950 overflow-hidden border-b border-slate-900/60">
        <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.03] z-0"></div>
        <div className="absolute top-1/2 left-[-10%] w-[300px] h-[300px] glow-purple opacity-5 blur-[120px] z-0"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-455 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>مكتبة الموارد المساعدة وحقيبة التنزيل</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 leading-tight">
            حقيبة موارد الدورة والندوة
          </h1>
          <p className="max-w-xl mx-auto text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed">
            حملّي ملفات العرض ودليل الأوامر الذهبية، واكتشفي قنوات الشرح والمنصات التفاعلية الموثوقة لخدمة أهدافكِ التعليمية والنقابية.
          </p>
        </div>
      </section>

      {/* 2. Controls and Search */}
      <section className="relative py-12 bg-slate-950/40 overflow-hidden border-b border-slate-900/40">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 space-y-8">
          
          {/* Search bar */}
          <div className="max-w-xl mx-auto relative">
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-500">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحثي عن ملفات، أدوات، شروحات يوتيوب أو مراجع..."
              className="w-full bg-slate-950 border border-slate-850 hover:border-slate-800 focus:border-emerald-500/60 rounded-xl py-3.5 pr-12 pl-4 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none transition-colors shadow-inner"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold border transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-emerald-500 border-emerald-450 text-slate-950 shadow-md shadow-emerald-500/10'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Resources Grid */}
      <section className="relative py-16 bg-slate-950/20 min-h-[400px]">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          
          <AnimatePresence mode="popLayout">
            {filteredResources.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {filteredResources.map((res) => (
                  <motion.div
                    layout
                    key={res.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="glass-panel border-slate-900 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-850 transition-all group"
                  >
                      <div className="space-y-4">
                        {/* Title & Badge */}
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-900 flex-shrink-0">
                              {getIcon(res.category)}
                            </div>
                            <h3 className="font-extrabold text-slate-100 text-sm sm:text-base leading-tight group-hover:text-emerald-400 transition-colors">
                              {res.title}
                            </h3>
                          </div>

                          {res.badge && (
                            <span className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-900 text-slate-400 text-[10px] font-bold">
                              {res.badge}
                            </span>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                          {res.description}
                        </p>
                      </div>

                      {/* Download / Visit Panel */}
                      <div className="flex items-center justify-between gap-4 pt-5 mt-6 border-t border-slate-900">
                        {res.sizeOrDuration && (
                          <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-500">
                            الحجم/المدة: {res.sizeOrDuration}
                          </span>
                        )}

                        {res.category === 'pdf' ? (
                          <a
                            href={res.url}
                            download
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-650 text-slate-950 text-xs font-bold transition-all shadow-md cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>تحميل الملف المباشر</span>
                          </a>
                        ) : (
                          <a
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-850 text-slate-200 text-xs font-bold transition-all cursor-pointer"
                          >
                            <span>فتح الرابط الرسمي</span>
                            <ExternalLink className="w-3.5 h-3.5 text-emerald-450" />
                          </a>
                        )}
                      </div>

                    </motion.div>
                  ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-slate-950/30 border border-slate-900/60 rounded-3xl p-8"
              >
                <p className="text-slate-400 text-sm">عذراً، لم نجد أي تطابقات لكلمة البحث في الموارد المتوفرة.</p>
                <button
                  onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                  className="mt-4 px-4 py-2 bg-slate-900 border border-slate-800 text-xs font-bold text-emerald-450 hover:bg-slate-850 rounded-xl transition-all cursor-pointer"
                >
                  إعادة ضبط الفلاتر والبحث
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

    </div>
  );
};

export default ResourcesPage;
