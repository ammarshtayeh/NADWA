import React, { useState } from 'react';
import PracticalExamples from '../sections/PracticalExamples';
import AISandbox from '../sections/AISandbox';
import { siteContent } from '../data/content';
import type { PromptLibraryItem } from '../data/content';
import { Terminal, Copy, Check, Music, Image, Search } from 'lucide-react';
import SpeakerNotes from '../components/SpeakerNotes';

export const AISandboxPage: React.FC = () => {
  const { promptLibrary, mediaGenerationGuide } = siteContent;
  const [filter, setFilter] = useState<'all' | 'education' | 'kg' | 'union' | 'presentations' | 'images' | 'exams' | 'activities' | 'social'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [copiedMediaIdx, setCopiedMediaIdx] = useState<number | null>(null);
  const [expandedIdxs, setExpandedIdxs] = useState<Record<number, boolean>>({});

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(index);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyMedia = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedMediaIdx(index);
    setTimeout(() => setCopiedMediaIdx(null), 2000);
  };

  const toggleExpand = (idx: number) => {
    setExpandedIdxs(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'education': return '📚 التحضير والتعليم';
      case 'kg': return '👶 رياض الأطفال';
      case 'union': return '⚖️ العمل النقابي';
      case 'presentations': return '📊 العروض التقديمية';
      case 'images': return '🎨 إنشاء الصور';
      case 'exams': return '📝 الاختبارات';
      case 'activities': return '🎮 الأنشطة الصفية';
      case 'social': return '📢 السوشال ميديا';
      default: return 'الأمر الذكي';
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'education': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'kg': return 'bg-pink-500/10 text-pink-400 border-pink-500/20';
      case 'union': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'presentations': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'images': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'exams': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'activities': return 'bg-teal-500/10 text-teal-400 border-teal-500/20';
      case 'social': return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const filteredPrompts = promptLibrary.items
    .filter(item => filter === 'all' || item.category === filter)
    .filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.prompt.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="relative pt-20 animate-fade-in">
      
      {/* Page Header */}
      <section className="relative py-16 bg-slate-950 overflow-hidden border-b border-slate-900/60">
        <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.03] z-0"></div>
        <div className="absolute top-1/2 left-[-10%] w-[300px] h-[300px] glow-green opacity-5 blur-[120px] z-0"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-455 text-xs font-bold">
            <Terminal className="w-3.5 h-3.5" />
            <span>بيئة تجريبية تفاعلية للتحميل والتصنيع</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 leading-tight">
            مختبر الذكاء الاصطناعي وهندسة الأوامر
          </h1>
          <p className="max-w-xl mx-auto text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed">
            تعلمي قواعد صياغة الأوامر البرمجية (Prompts)، واكتبي أوامرك الخاصة وولدّي الدروس والخطابات حياً، وصممي وسائط غنائية للأطفال بضغطة زر.
          </p>
        </div>
      </section>

      {/* 1. Interactive Prompt examples editor */}
      <PracticalExamples />

      {/* 2. Live AI sandbox mock generator */}
      <AISandbox />

      {/* 3. NEW: دليل توليد الأناشيد والرسومات للأطفال (Suno & Canva AI) */}
      <section className="relative py-24 bg-slate-950 overflow-hidden border-b border-slate-900/60">
        <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.015] z-0"></div>
        <div className="absolute top-10 left-10 w-80 h-80 glow-green opacity-[0.04] blur-[100px] z-0"></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-100 via-emerald-100 to-slate-200 bg-clip-text text-transparent mb-4">
              {mediaGenerationGuide.title}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              {mediaGenerationGuide.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mediaGenerationGuide.items.map((item, idx) => (
              <div key={idx} className="glass-panel border-slate-900 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-slate-850 transition-all">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/50 border border-emerald-500/15 px-2.5 py-1 rounded-lg">
                      🛠️ {item.tool}
                    </span>
                    <div className="text-slate-500">
                      {item.tool.includes('Suno') ? <Music className="w-5 h-5 text-emerald-450" /> : <Image className="w-5 h-5 text-red-400" />}
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-200">{item.title}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>

                  <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-2 relative overflow-hidden">
                    <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest">صيغة الأمر المقترحة للنسخ:</span>
                    <p className="text-slate-300 text-xs sm:text-sm font-mono leading-relaxed select-all italic">
                      "{item.prompt}"
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-900">
                  <button
                    onClick={() => handleCopyMedia(item.prompt, idx)}
                    className="w-full inline-flex items-center justify-center gap-1.5 text-xs text-slate-350 hover:text-white bg-slate-950 border border-slate-900 px-3.5 py-2.5 rounded-xl transition-all font-semibold cursor-pointer"
                  >
                    {copiedMediaIdx === idx ? <Check className="w-4 h-4 text-red-500" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedMediaIdx === idx ? 'تم نسخ الأمر للموقع!' : `نسخ الأمر لـ ${item.tool}`}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Axis 5 Speaker Notes */}
          <div className="max-w-4xl mx-auto mt-10">
            <SpeakerNotes
              whatToSay="المراحل الأساسية ورياض الأطفال تعتمد على السمع والبصر. في هذا المحور سنقوم بتوليد أناشيد ملحنة تربوية للأطفال باستخدام Suno AI وتصميم قصص كرتونية فلسطينية دافئة ببيارات البرتقال في Canva."
              questionsToAsk="هل تفضلين الأناشيد الملحنة كوسيلة لشرح الدروس الحركية لرياض الأطفال؟"
              liveExample="نسخ أمر الأنشطة وتطبيقه في Suno/Canva لإنتاج وسيلة إيضاح فلسطينية مبهجة."
              nextAxis="سنتحدث الآن عن المحور السادس: حماية أمن طالباتنا وحماية الخصوصية ومشاكل الاستخدام الآمن للبيانات."
            />
          </div>
        </div>
      </section>

      {/* 4. Prompt Library Section */}
      <section id="prompt-library" className="relative py-24 bg-slate-900/15 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.02] z-0"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 glow-purple opacity-5 blur-[120px] z-0"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-100 via-emerald-100 to-slate-200 bg-clip-text text-transparent mb-4">
              {promptLibrary.title}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              {promptLibrary.subtitle}
            </p>
          </div>

          {/* Search bar inside Prompt Library */}
          <div className="max-w-md mx-auto mb-10 relative">
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحثي عن أوامر التحضير، الصور، الأنشطة..."
              className="w-full bg-slate-950 border border-slate-900 rounded-xl py-3 pr-10 pl-4 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/60 transition-colors"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-12">
            {['all', 'education', 'kg', 'union', 'presentations', 'images', 'exams', 'activities', 'social'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat as any)}
                className={`px-4.5 py-2.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                  filter === cat
                    ? 'bg-emerald-500 border-emerald-450 text-slate-950 shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-250 hover:bg-slate-900'
                }`}
              >
                {cat === 'all' ? '🔍 الكل' : getCategoryLabel(cat)}
              </button>
            ))}
          </div>

          {/* Prompt Library Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredPrompts.map((item: PromptLibraryItem) => {
              const globalIndex = promptLibrary.items.findIndex(p => p.prompt === item.prompt);
              const isCopied = copiedId === globalIndex;
              const isExpanded = expandedIdxs[globalIndex] || false;

              return (
                <div
                  key={globalIndex}
                  className="glass-panel border-slate-900 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:border-slate-800 relative group"
                >
                  <div className="absolute top-0 right-6 w-12 h-0.5 bg-emerald-500"></div>

                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <h3 className="text-sm sm:text-base font-bold text-slate-100">
                        {item.title}
                      </h3>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${getCategoryColor(item.category)}`}>
                        {getCategoryLabel(item.category).split(' ')[1] || getCategoryLabel(item.category)}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-slate-450 text-xs leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Code block with expansion toggle */}
                    <div className={`relative p-3.5 rounded-xl bg-slate-950 border border-slate-900 text-xs text-slate-350 leading-relaxed font-mono whitespace-pre-wrap ${!isExpanded && 'line-clamp-3 select-none'}`}>
                      "{item.prompt}"
                    </div>

                    {/* Expand/Collapse Toggle */}
                    {item.prompt.length > 80 && (
                      <button
                        onClick={() => toggleExpand(globalIndex)}
                        className="text-[10px] text-slate-500 hover:text-slate-300 mt-2 font-bold cursor-pointer transition-colors"
                      >
                        {isExpanded ? 'طيّ النص ⬆' : 'توسيع الأمر الكامل ⬇'}
                      </button>
                    )}
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={() => handleCopy(item.prompt, globalIndex)}
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 bg-emerald-950/20 hover:bg-emerald-950/40 px-3.5 py-2.5 rounded-xl border border-emerald-905/20 transition-all font-semibold mt-6 self-start cursor-pointer w-full justify-center"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 text-red-500" />
                        <span>تم النسخ للحافظة!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>نسخ الأمر المحدث</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
          {/* Axis 7 Speaker Notes */}
          <div className="max-w-4xl mx-auto mt-10">
            <SpeakerNotes
              whatToSay="في هذا المحور الأخير سنقوم بالتطبيق الفردي المباشر على الحواسيب والهواتف. سنقوم بنسخ الأوامر الذهبية من مكتبة الأوامر وتطبيقها، وتصفح حقيبة الموارد الكاملة لتحميل المستندات والعروض التدريبية تمهيداً لتوزيع شهادات الحضور الختامية."
              questionsToAsk="هل هناك أي استفسار أو صعوبة واجهتكن أثناء محاكاة الأوامر والتوليد المباشر؟"
              liveExample="مساعدة الحضور في فتح روابط الموارد ومسح الـ QR للتحميل."
              nextAxis="ندوة سعيدة ومباركة، ونتمنى لكن التوفيق والتمكين الرقمي الدائم!"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AISandboxPage;
