import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Download, Youtube, BookOpen, ExternalLink, 
  Search, Globe, Sparkles, Zap, Star, Users, Package
} from 'lucide-react';

interface ResourceItem {
  title: string;
  description: string;
  category: 'pdf' | 'video' | 'site' | 'book' | 'tool';
  url: string;
  sizeOrDuration?: string;
  badge?: string;
  isFeatured?: boolean;
}

export const ResourcesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'pdf' | 'video' | 'site' | 'book' | 'tool'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: '✨ الكل', count: 42 },
    { id: 'pdf', label: '📄 ملفات الدورة', count: 6 },
    { id: 'video', label: '🎥 قنوات يوتيوب', count: 10 },
    { id: 'site', label: '🌐 منصات مجانية', count: 14 },
    { id: 'tool', label: '🛠️ أدوات ذكاء', count: 8 },
    { id: 'book', label: '📚 كتب ومراجع', count: 6 },
  ];

  const resourcesList: ResourceItem[] = [
    // ── PDFs / Course Files ─────────────────────────────────────────────────
    {
      title: "دليل المتحدث — الذكاء الاصطناعي للمعلمات",
      description: "الحقيبة التدريبية الكاملة الموجهة للمعلمات وصانعات القرار التربوي ورياض الأطفال لشرح أدوات التمكين الرقمي، تحتوي على أمثلة تطبيقية ونماذج صياغة فعلية.",
      category: "pdf",
      url: "/دليل-المتحدث-الذكاء-الاصطناعي-للمعلمات.pdf",
      sizeOrDuration: "1.02 MB",
      badge: "دليل رسمي",
      isFeatured: true
    },
    {
      title: "أجندة الندوة التفصيلية للمسؤولين",
      description: "المستند الرسمي التفصيلي لتوزيع المحاضرات الزمنية وتقييم الورشة الإدارية الشاملة لثلاث ساعات مع توصيف كل محور ومؤشرات النجاح.",
      category: "pdf",
      url: "/Agenda-الندوة-AI-للمسؤولين.pdf",
      sizeOrDuration: "218 KB",
      badge: "أجندة رسمية",
      isFeatured: true
    },
    {
      title: "عرض الندوة التقديمي PowerPoint",
      description: "شرائح العرض التوضيحية والتمثيلية التي يستخدمها المدرب عمار اشتية في استعراض الأقسام والتطبيقات الصفية لكل الوحدات التدريبية.",
      category: "pdf",
      url: "/عرض-الندوة-AI-للمعلمات.pptx",
      sizeOrDuration: "233 KB",
      badge: "عرض شرائح"
    },
    {
      title: "Pitch Deck النقابي — العرض التقديمي",
      description: "العرض التقديمي المخصص لشرح وتأصيل توظيف الذكاء الاصطناعي في تمكين اللجان وإدارة نقابة معلمات ورياض الأطفال بأسلوب احترافي.",
      category: "pdf",
      url: "/Pitch-Deck-ندوة-AI-نقابة-المعلمات.pptx",
      sizeOrDuration: "204 KB",
      badge: "عرض نقابي"
    },
    {
      title: "دليل الأوامر الذهبية — 50 برومبت جاهز",
      description: "مجموعة مصنّفة من أفضل 50 أمراً جاهزاً للمعلمات: تحضير دروس، اختبارات، ردود أولياء أمور، تقارير إدارية، ووصف وظيفي لمنصة نقابية.",
      category: "pdf",
      url: "/دليل-المتحدث-الذكاء-الاصطناعي-للمعلمات.pdf",
      sizeOrDuration: "مرفق بالدليل",
      badge: "مرجع سريع"
    },
    {
      title: "ورقة المصطلحات — مسرد الذكاء الاصطناعي",
      description: "قاموس مبسط بأهم 80 مصطلح في الذكاء الاصطناعي باللغتين العربية والإنجليزية، مصمم خصيصاً للمعلمات والإداريين التربويين.",
      category: "pdf",
      url: "/Agenda-الندوة-AI-للمسؤولين.pdf",
      sizeOrDuration: "مرفق بالأجندة",
      badge: "مسرد مصطلحات"
    },

    // ── YouTube Channels ─────────────────────────────────────────────────────
    {
      title: "قناة ساجد العباسي — تقنيات التعليم",
      description: "قناة عربية رائدة تقدم شروحات تطبيقية مبسطة لاستخدام الذكاء الاصطناعي وتصميم العروض التفاعلية للمعلمين باللهجة العربية المفهومة.",
      category: "video",
      url: "https://www.youtube.com/@SajidAlAbbasi",
      sizeOrDuration: "دروس مستمرة",
      badge: "الأكثر متابعة",
      isFeatured: true
    },
    {
      title: "قناة معلمين مبدعين",
      description: "شروحات تقنية وأفكار صفية مدمجة بالذكاء الاصطناعي والتطبيقات التفاعلية لتبسيط التحضير والمحتوى التربوي للمراحل كافة.",
      category: "video",
      url: "https://www.youtube.com/results?search_query=%D9%85%D8%B9%D9%84%D9%85%D9%8A%D9%86+%D9%85%D8%A8%D8%AF%D8%B9%D9%8A%D9%86",
      sizeOrDuration: "دروس مسجلة",
      badge: "تطبيقي"
    },
    {
      title: "قناة ChatGPT بالعربي",
      description: "شروحات متخصصة باللغة العربية لاستخدام ChatGPT في الحياة اليومية والعمل التربوي، مع أمثلة فعلية على صياغة الأوامر للمعلمات.",
      category: "video",
      url: "https://www.youtube.com/results?search_query=chatgpt+%D8%A8%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A+%D9%84%D9%84%D9%85%D8%B9%D9%84%D9%85%D9%8A%D9%86",
      sizeOrDuration: "100+ فيديو",
      badge: "ChatGPT"
    },
    {
      title: "قناة تقنية بلا حدود",
      description: "مراجعات وشروحات أدوات الذكاء الاصطناعي الجديدة أولاً بأول باللغة العربية مع تطبيقات تعليمية وإدارية متعددة.",
      category: "video",
      url: "https://www.youtube.com/results?search_query=%D8%AA%D9%82%D9%86%D9%8A%D8%A9+%D8%A8%D9%84%D8%A7+%D8%AD%D8%AF%D9%88%D8%AF",
      sizeOrDuration: "جديد أسبوعياً",
      badge: "أدوات جديدة"
    },
    {
      title: "قناة AI للعرب — Gemini وClaude",
      description: "شرح مفصل لنماذج Gemini وClaude وLlama العربي وكيفية استخدامها في التعليم والإدارة التربوية مع مقارنات عملية.",
      category: "video",
      url: "https://www.youtube.com/results?search_query=gemini+claude+%D8%B9%D8%B1%D8%A8%D9%8A+%D8%AA%D8%B9%D9%84%D9%8A%D9%85",
      sizeOrDuration: "دروس متعمقة",
      badge: "نماذج متقدمة"
    },
    {
      title: "Microsoft Copilot للمعلمين — عربي",
      description: "سلسلة دروس تعليمية لاستخدام Microsoft Copilot في تحضير الدروس وإعداد التقارير وتوليد المحتوى المنهجي للمدارس الحكومية.",
      category: "video",
      url: "https://www.youtube.com/results?search_query=microsoft+copilot+%D9%84%D9%84%D9%85%D8%B9%D9%84%D9%85%D9%8A%D9%86",
      sizeOrDuration: "سلسلة كاملة",
      badge: "Copilot"
    },
    {
      title: "قناة TED-Ed بالعربية — التعليم والتقنية",
      description: "أفضل محاضرات TED-Ed المترجمة للعربية حول مستقبل التعليم والذكاء الاصطناعي وأثرهما على المعلم وبيئة الصف الدراسي.",
      category: "video",
      url: "https://www.youtube.com/@TEDed",
      sizeOrDuration: "محاضرات دولية",
      badge: "TED-Ed"
    },
    {
      title: "قناة Canva العربية — تصميم المحتوى",
      description: "دروس رسمية من Canva لاستخدام مزايا الذكاء الاصطناعي في Canva لتصميم العروض والنشرات والأوراق الدراسية بدقائق.",
      category: "video",
      url: "https://www.youtube.com/results?search_query=canva+ai+%D8%B9%D8%B1%D8%A8%D9%8A",
      sizeOrDuration: "دروس تصميم",
      badge: "Canva AI"
    },
    {
      title: "قناة Google للتعليم — Workspace",
      description: "الاستخدامات التعليمية لـ Google Workspace مع Gemini AI في Docs وSheets وSlides وForms لرفع الكفاءة المهنية للمعلمات.",
      category: "video",
      url: "https://www.youtube.com/@GoogleforEducation",
      sizeOrDuration: "محتوى رسمي",
      badge: "Google Edu"
    },
    {
      title: "سلسلة مهارات المستقبل — وزارة التعليم",
      description: "سلسلة دروس رسمية من وزارة التربية والتعليم الأردنية حول توظيف التقنية في الفصول الدراسية وبناء كفايات المعلم الرقمي.",
      category: "video",
      url: "https://www.youtube.com/results?search_query=%D9%85%D9%87%D8%A7%D8%B1%D8%A7%D8%AA+%D8%A7%D9%84%D9%85%D8%B3%D8%AA%D9%82%D8%A8%D9%84+%D9%88%D8%B2%D8%A7%D8%B1%D8%A9+%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85",
      sizeOrDuration: "رسمي أردني",
      badge: "وزارة التعليم"
    },
    {
      title: "قناة EduTech Arabia — تكنولوجيا التعليم",
      description: "أحدث الأدوات والمنصات التعليمية الرقمية والتطبيقات العربية المخصصة لتطوير التعليم وتمكين المعلمات من التقنية الحديثة.",
      category: "video",
      url: "https://www.youtube.com/results?search_query=edutech+arabia+%D8%A7%D9%84%D8%B0%D9%83%D8%A7%D8%A1+%D8%A7%D9%84%D8%A7%D8%B5%D8%B7%D9%86%D8%A7%D8%B9%D9%8A",
      sizeOrDuration: "محتوى عربي",
      badge: "تكنولوجيا"
    },

    // ── Free Platforms / Sites ───────────────────────────────────────────────
    {
      title: "ChatGPT — الأداة الأساسية",
      description: "المنصة الأكثر استخداماً عالمياً للذكاء الاصطناعي. مجانية بنسخة GPT-3.5 وتشمل توليد نصوص، شرح مفاهيم، تصحيح إنشاءات، وبناء اختبارات للمعلمات.",
      category: "site",
      url: "https://chat.openai.com",
      sizeOrDuration: "مجاني / مدفوع",
      badge: "الأساسي",
      isFeatured: true
    },
    {
      title: "Google Gemini — ذكاء جوجل",
      description: "نموذج جوجل للذكاء الاصطناعي المجاني يفهم العربية بامتياز ويتكامل مع Google Docs وSheets وGmail لتسريع العمل الإداري والتربوي.",
      category: "site",
      url: "https://gemini.google.com",
      sizeOrDuration: "مجاني",
      badge: "Google",
      isFeatured: true
    },
    {
      title: "Microsoft Copilot — مساعد مايكروسوفت",
      description: "الذكاء الاصطناعي الرسمي من مايكروسوفت مجاني وكامل يدعم العربية ويعمل مع Word وPowerPoint وExcel ومنصة Teams المدرسية.",
      category: "site",
      url: "https://copilot.microsoft.com",
      sizeOrDuration: "مجاني",
      badge: "Microsoft"
    },
    {
      title: "MagicSchool AI — 60 أداة تعليمية",
      description: "المنصة الأكثر تخصصاً للمعلمين عالمياً: توليد اختبارات، خطط دروس، تقارير أداء، رسائل أولياء الأمور، وأنشطة تعليمية جاهزة.",
      category: "site",
      url: "https://www.magicschool.ai",
      sizeOrDuration: "مجاني / مدفوع",
      badge: "للمعلمات تحديداً"
    },
    {
      title: "Napkin AI — مخططات من النص",
      description: "تحوّل أي نص أو فكرة تربوية إلى مخطط بياني أو إنفوغراف بنقرة واحدة، مثالي لتوضيح المنهج الدراسي وتبسيط المفاهيم المعقدة.",
      category: "site",
      url: "https://www.napkin.ai",
      sizeOrDuration: "مجاني جزئياً",
      badge: "مخططات بصرية"
    },
    {
      title: "Canva AI — تصميم ذكي",
      description: "الإصدار الجديد من Canva مع مزايا AI لتوليد الصور وتصميم العروض ونشرات الأولياء والبطاقات التعليمية والملصقات الصفية.",
      category: "site",
      url: "https://www.canva.com",
      sizeOrDuration: "مجاني / Pro",
      badge: "تصميم"
    },
    {
      title: "Kahoot! — تفاعل الطلاب",
      description: "منصة الألعاب التعليمية التفاعلية الأشهر عالمياً، تتيح إنشاء اختبارات ومسابقات ومراجعات ممتعة للطلاب في الوقت الفعلي.",
      category: "site",
      url: "https://kahoot.com",
      sizeOrDuration: "مجاني",
      badge: "تفاعلي"
    },
    {
      title: "Quizlet AI — بطاقات دراسية",
      description: "منصة بطاقات المراجعة الذكية مع Quizlet AI الذي يولد بطاقات دراسية من أي نص منهجي تلقائياً ويصمم جلسات مراجعة مخصصة للطلاب.",
      category: "site",
      url: "https://quizlet.com",
      sizeOrDuration: "مجاني / مدفوع",
      badge: "مراجعة"
    },
    {
      title: "Padlet — لوحات تفاعلية",
      description: "أداة التعاون الصفي الأمثل لإنشاء لوحات تفاعلية يشاركها الطلاب لكتابة الأفكار والإجابات ورصد مخرجات العمل الجماعي.",
      category: "site",
      url: "https://padlet.com",
      sizeOrDuration: "مجاني",
      badge: "تعاون"
    },
    {
      title: "Google Forms + AI — استبيانات ذكية",
      description: "منصة Google Forms مجانية لإنشاء استبيانات رضا الطلاب وأولياء الأمور والاختبارات الإلكترونية مع تحليل النتائج تلقائياً.",
      category: "site",
      url: "https://forms.google.com",
      sizeOrDuration: "مجاني",
      badge: "استبيانات"
    },
    {
      title: "Mentimeter — عروض تفاعلية",
      description: "إنشاء عروض تقديمية تفاعلية يتفاعل معها الحاضرون بهواتفهم مباشرة، مثالية لجلسات التدريب والاجتماعات مع أولياء الأمور.",
      category: "site",
      url: "https://www.mentimeter.com",
      sizeOrDuration: "مجاني جزئياً",
      badge: "عروض"
    },
    {
      title: "Gamma AI — عروض من الكتابة",
      description: "اكتبي موضوعاً أو الصقي نصاً وستولّد Gamma عرضاً PowerPoint كاملاً جاهزاً للتقديم في ثوانٍ بتصميم احترافي.",
      category: "site",
      url: "https://gamma.app",
      sizeOrDuration: "مجاني",
      badge: "عروض AI"
    },
    {
      title: "Diffit — تبسيط النصوص المنهجية",
      description: "أداة AI تبسّط أي نص منهجي معقد لمستويات قراءة مختلفة (مبتدئ/متوسط/متقدم) وتولّد أسئلة مفهوم تلقائياً.",
      category: "site",
      url: "https://beta.diffit.me",
      sizeOrDuration: "مجاني",
      badge: "تبسيط"
    },
    {
      title: "Claude AI — كتابة وتحليل",
      description: "نموذج Anthropic المتميز في تحليل المستندات الطويلة وكتابة التقارير التعليمية والإدارية والرسائل المؤسسية باللغة العربية.",
      category: "site",
      url: "https://claude.ai",
      sizeOrDuration: "مجاني / مدفوع",
      badge: "Claude"
    },

    // ── AI Tools ─────────────────────────────────────────────────────────────
    {
      title: "Ideogram AI — صور وبطاقات بصرية",
      description: "أداة توليد الصور الأفضل للنصوص العربية، تنشئ ملصقات ونشرات وبطاقات تعليمية جاهزة للطباعة بخط عربي واضح ومقروء.",
      category: "tool",
      url: "https://ideogram.ai",
      sizeOrDuration: "مجاني",
      badge: "صور AI",
      isFeatured: true
    },
    {
      title: "ElevenLabs — تحويل نص لصوت",
      description: "أداة تحويل النص إلى صوت بشري طبيعي بالعربية، لإنشاء شروحات صوتية ومواد سمعية للطلاب ذوي صعوبات القراءة.",
      category: "tool",
      url: "https://elevenlabs.io",
      sizeOrDuration: "مجاني/مدفوع",
      badge: "نص لصوت"
    },
    {
      title: "Otter.ai — تفريغ الاجتماعات",
      description: "يسجّل ويفرّغ الاجتماعات ويلخّصها تلقائياً. مثالي لتوثيق اجتماعات مجالس الأمناء ولقاءات المعلمين والمحاضر الإدارية.",
      category: "tool",
      url: "https://otter.ai",
      sizeOrDuration: "مجاني جزئياً",
      badge: "تفريغ"
    },
    {
      title: "Descript — فيديو وبودكاست",
      description: "تحرير الفيديو التعليمي بتحرير النص فقط — احذفي الكلام الزائد بحذف النص ووفّري الوقت في إنتاج المحتوى التعليمي.",
      category: "tool",
      url: "https://www.descript.com",
      sizeOrDuration: "مجاني/مدفوع",
      badge: "فيديو"
    },
    {
      title: "Grammarly — تدقيق وتحسين",
      description: "مدقق لغوي ذكي بالعربية والإنجليزية يحسّن أسلوب كتابة التقارير والرسائل الإدارية والمراسلات المؤسسية تلقائياً.",
      category: "tool",
      url: "https://www.grammarly.com",
      sizeOrDuration: "مجاني/مدفوع",
      badge: "تدقيق"
    },
    {
      title: "Notion AI — تنظيم المعلومات",
      description: "منصة إدارة المعرفة مع AI مدمج لتنظيم خطط الدروس ومتابعة أعمال الطلاب وبناء قواعد بيانات لللجان النقابية.",
      category: "tool",
      url: "https://www.notion.so",
      sizeOrDuration: "مجاني",
      badge: "تنظيم"
    },
    {
      title: "Perplexity AI — بحث ذكي",
      description: "محرك بحث مدعوم بالذكاء الاصطناعي يجيب بالمصادر وباللغة العربية، مثالي للبحث التربوي والمراجع الأكاديمية.",
      category: "tool",
      url: "https://www.perplexity.ai",
      sizeOrDuration: "مجاني",
      badge: "بحث"
    },
    {
      title: "Tome — قصة عرض بالذكاء الاصطناعي",
      description: "أداة لبناء عروض تقديمية ذات طابع سردي يولّد المحتوى والصور تلقائياً ويوفر قوالب متخصصة لأهداف التعليم والتدريب.",
      category: "tool",
      url: "https://tome.app",
      sizeOrDuration: "مجاني",
      badge: "عروض"
    },

    // ── Books & References ───────────────────────────────────────────────────
    {
      title: "الذكاء الاصطناعي في التعليم — اليونسكو",
      description: "الدليل الرسمي العربي الصادر عن اليونسكو 2023 لتوظيف الذكاء الاصطناعي في التعليم مع أطر أخلاقية وتطبيقات عملية ميدانية.",
      category: "book",
      url: "https://unesdoc.unesco.org/ark:/48223/pf0000375322_ara",
      sizeOrDuration: "PDF مجاني",
      badge: "اليونسكو",
      isFeatured: true
    },
    {
      title: "إطار كفايات المعلم الرقمي — اليونسكو",
      description: "الإطار الدولي لكفايات المعلمين في العصر الرقمي، يحدد المهارات المطلوبة في ستة محاور: فهم السياسة، الثقافة الرقمية، والتقييم.",
      category: "book",
      url: "https://unesdoc.unesco.org/ark:/48223/pf0000389374",
      sizeOrDuration: "مرجع دولي",
      badge: "كفايات"
    },
    {
      title: "كيف يفكر الذكاء الاصطناعي — عربي",
      description: "كتاب مبسط يشرح آلية عمل نماذج اللغة الكبيرة وكيف تولّد الإجابات، مما يساعد المعلمة على فهم حدود الأداة ومتى تثق بها.",
      category: "book",
      url: "https://www.goodreads.com/shelf/show/artificial-intelligence-arabic",
      sizeOrDuration: "قراءة رقمية",
      badge: "فكر تقني"
    },
    {
      title: "GPT-4 للمعلمين — دليل MIT",
      description: "إطار عملي من معهد ماساتشوستس للتكنولوجيا لتمكين المعلمين من استخدام نماذج GPT في إنشاء بيئات تعلم شخصية وتكيّفية.",
      category: "book",
      url: "https://education.mit.edu",
      sizeOrDuration: "مترجم جزئياً",
      badge: "MIT"
    },
    {
      title: "أخلاقيات الذكاء الاصطناعي في التعليم",
      description: "دليل من OECD حول الحدود الأخلاقية والأمنية للذكاء الاصطناعي في التعليم، وحماية بيانات الطلاب وحقوق المعلمين الرقمية.",
      category: "book",
      url: "https://www.oecd.org/education/",
      sizeOrDuration: "OECD",
      badge: "أخلاقيات"
    },
    {
      title: "مستقبل العمل التعليمي — تقرير WEF",
      description: "تقرير المنتدى الاقتصادي العالمي 2024 حول المهارات المطلوبة مستقبلاً وكيف يغير الذكاء الاصطناعي مهنة التعليم والتدريب.",
      category: "book",
      url: "https://www.weforum.org/reports/the-future-of-jobs-report-2025/",
      sizeOrDuration: "WEF 2025",
      badge: "مستقبل التعليم"
    },
  ];

  const filteredResources = resourcesList
    .filter(res => activeCategory === 'all' || res.category === activeCategory)
    .filter(res => 
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      res.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const getIcon = (cat: string) => {
    switch (cat) {
      case 'pdf': return <FileText className="w-7 h-7 text-red-400" />;
      case 'video': return <Youtube className="w-7 h-7 text-red-500" />;
      case 'site': return <Globe className="w-7 h-7 text-blue-400" />;
      case 'book': return <BookOpen className="w-7 h-7 text-amber-400" />;
      case 'tool': return <Zap className="w-7 h-7 text-violet-400" />;
      default: return <FileText className="w-7 h-7 text-slate-400" />;
    }
  };

  const getCatAccent = (cat: string) => {
    switch (cat) {
      case 'pdf': return 'border-red-500/20 bg-red-950/10';
      case 'video': return 'border-red-600/20 bg-red-950/10';
      case 'site': return 'border-blue-500/20 bg-blue-950/10';
      case 'book': return 'border-amber-500/20 bg-amber-950/10';
      case 'tool': return 'border-violet-500/20 bg-violet-950/10';
      default: return 'border-slate-800';
    }
  };

  const stats = [
    { value: '42+', label: 'مورد ورابط منتقى', icon: <Package className="w-5 h-5 text-emerald-400" /> },
    { value: '14', label: 'منصة مجانية', icon: <Globe className="w-5 h-5 text-blue-400" /> },
    { value: '10', label: 'قناة يوتيوب', icon: <Youtube className="w-5 h-5 text-red-400" /> },
    { value: '8', label: 'أداة ذكاء اصطناعي', icon: <Zap className="w-5 h-5 text-violet-400" /> },
  ];

  return (
    <div className="relative pt-20 animate-fade-in">
      {/* 1. Header Banner */}
      <section className="relative py-28 bg-slate-950 overflow-hidden border-b border-slate-900/60">
        <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.03] z-0"></div>
        <div className="absolute top-1/2 left-[-10%] w-[600px] h-[600px] glow-purple opacity-5 blur-[160px] z-0"></div>
        <div className="absolute top-1/4 right-[-5%] w-[400px] h-[400px] glow-emerald opacity-3 blur-[140px] z-0"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-sm font-bold">
            <Sparkles className="w-4 h-4" />
            <span>مكتبة الموارد المساعدة وحقيبة التنزيل</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-100 leading-tight">
            حقيبة موارد الدورة والندوة
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed">
            42+ مورد منتقى بعناية: ملفات الدورة الرسمية، منصات مجانية جاهزة للاستخدام الفوري، قنوات شرح عربية موثوقة، وكتب مرجعية دولية — كل ما تحتاجينه في مكان واحد.
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            {stats.map((s, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                {s.icon}
                <div className="text-right">
                  <div className="text-xl font-extrabold text-slate-100">{s.value}</div>
                  <div className="text-xs text-slate-500">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Controls and Search */}
      <section className="relative py-14 bg-slate-950/40 overflow-hidden border-b border-slate-900/40">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 space-y-10">
          
          {/* Search bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-slate-500">
              <Search className="w-6 h-6" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحثي عن ملفات، أدوات، قنوات يوتيوب أو كتب مرجعية..."
              className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-emerald-500/60 rounded-2xl py-5 pr-14 pl-5 text-sm sm:text-base text-slate-200 placeholder-slate-600 focus:outline-none transition-colors shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 left-4 flex items-center text-slate-600 hover:text-slate-300 transition-colors text-xs"
              >
                مسح ✕
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm sm:text-base font-bold border transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-emerald-500 border-emerald-450 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {cat.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-md font-mono ${activeCategory === cat.id ? 'bg-slate-950/30 text-slate-800' : 'bg-slate-800 text-slate-500'}`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Results count */}
          {searchQuery && (
            <p className="text-center text-slate-500 text-sm">
              تم العثور على <span className="text-emerald-400 font-bold">{filteredResources.length}</span> نتيجة
            </p>
          )}
        </div>
      </section>

      {/* 3. Featured Resources */}
      {activeCategory === 'all' && !searchQuery && (
        <section className="relative py-14 bg-slate-950 border-b border-slate-900/40">
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <div className="flex items-center gap-3 mb-8">
              <Star className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl font-extrabold text-slate-100">الموارد المميزة والأكثر طلباً</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {resourcesList.filter(r => r.isFeatured).map((res) => (
                <motion.div
                  key={res.title + '-featured'}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`relative rounded-2xl p-6 border flex flex-col gap-3 group transition-all ${getCatAccent(res.category)} hover:brightness-110`}
                >
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[10px] font-bold flex items-center gap-1">
                      <Star className="w-3 h-3" /> مميز
                    </span>
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-900">
                      {getIcon(res.category)}
                    </div>
                    <h3 className="font-extrabold text-slate-100 text-sm leading-tight group-hover:text-emerald-400 transition-colors">
                      {res.title}
                    </h3>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{res.description}</p>
                  {res.category === 'pdf' ? (
                    <a href={res.url} download className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all mt-auto">
                      <Download className="w-3.5 h-3.5" /> تحميل
                    </a>
                  ) : (
                    <a href={res.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-bold transition-all mt-auto">
                      فتح <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Resources Grid */}
      <section className="relative py-20 bg-slate-950/20 min-h-[400px]">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          
          {activeCategory !== 'all' || searchQuery ? (
            <div className="flex items-center gap-3 mb-8">
              <Users className="w-5 h-5 text-slate-500" />
              <h2 className="text-lg font-bold text-slate-300">
                {searchQuery ? `نتائج البحث عن "${searchQuery}"` : categories.find(c => c.id === activeCategory)?.label}
              </h2>
            </div>
          ) : (
            <div className="flex items-center gap-3 mb-8">
              <Package className="w-5 h-5 text-slate-500" />
              <h2 className="text-xl font-extrabold text-slate-100">المكتبة الكاملة للموارد</h2>
            </div>
          )}

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
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.25 }}
                    className={`glass-panel rounded-3xl p-7 flex flex-col justify-between transition-all group border ${getCatAccent(res.category)} hover:brightness-110`}
                  >
                      <div className="space-y-4">
                        {/* Title & Badge */}
                        <div className="flex justify-between items-start gap-3">
                          <div className="flex items-center gap-3">
                            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-900 flex-shrink-0">
                              {getIcon(res.category)}
                            </div>
                            <h3 className="font-extrabold text-slate-100 text-base sm:text-lg leading-snug group-hover:text-emerald-400 transition-colors">
                              {res.title}
                            </h3>
                          </div>

                          {res.badge && (
                            <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 text-[11px] font-bold whitespace-nowrap">
                              {res.badge}
                            </span>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                          {res.description}
                        </p>
                      </div>

                      {/* Download / Visit Panel */}
                      <div className="flex items-center justify-between gap-4 pt-5 mt-6 border-t border-slate-900">
                        {res.sizeOrDuration && (
                          <span className="text-xs sm:text-sm font-mono font-bold text-slate-600">
                            {res.sizeOrDuration}
                          </span>
                        )}

                        {res.category === 'pdf' ? (
                          <a
                            href={res.url}
                            download
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-bold transition-all shadow-md cursor-pointer"
                          >
                            <Download className="w-4 h-4" />
                            <span>تحميل</span>
                          </a>
                        ) : (
                          <a
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-sm font-bold transition-all cursor-pointer"
                          >
                            <span>فتح الرابط</span>
                            <ExternalLink className="w-4 h-4 text-emerald-400" />
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
                className="text-center py-24 bg-slate-950/30 border border-slate-900/60 rounded-3xl p-10"
              >
                <p className="text-slate-400 text-base">عذراً، لم نجد أي تطابقات لكلمة البحث في الموارد المتوفرة.</p>
                <button
                  onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                  className="mt-5 px-6 py-3 bg-slate-900 border border-slate-800 text-sm font-bold text-emerald-400 hover:bg-slate-850 rounded-xl transition-all cursor-pointer"
                >
                  إعادة ضبط الفلاتر
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
