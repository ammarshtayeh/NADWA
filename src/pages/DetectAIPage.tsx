import React from 'react';
import { Link } from 'react-router-dom';
import { aiDetectionContent } from '../data/aiDetection';
import { Icon } from '../components/Icons';
import {
  ScanEye,
  User,
  Bot,
  CheckCircle2,
  AlertTriangle,
  MessageCircle,
  ArrowLeft,
  ShieldCheck
} from 'lucide-react';

const verdictStyles = {
  unreliable: 'bg-red-950/30 border-red-500/30 text-red-400',
  partial: 'bg-amber-950/30 border-amber-500/30 text-amber-400',
  useful: 'bg-emerald-950/30 border-emerald-500/30 text-emerald-400'
};

const verdictLabels = {
  unreliable: 'غير موثوق كدليل وحيد',
  partial: 'مساعد جزئي',
  useful: 'موصى به'
};

export const DetectAIPage: React.FC = () => {
  const c = aiDetectionContent;

  return (
    <div className="relative pt-20 pb-20">
      {/* Header */}
      <section className="relative py-16 bg-slate-950 border-b border-slate-900/60 overflow-hidden">
        <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.03] z-0" />
        <div className="relative max-w-4xl mx-auto px-4 text-center z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-950/40 border border-sky-500/20 text-sky-400 text-xs font-bold">
            <ScanEye className="w-3.5 h-3.5" />
            <span>وعي وتمييز — للمعلمات والمشاركات</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100">
            {c.meta.title}
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {c.meta.subtitle}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-14">
        {/* Intro */}
        <section className="glass-panel border-slate-900 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-black text-slate-100 mb-3">{c.intro.title}</h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{c.intro.text}</p>
        </section>

        {/* Golden rule */}
        <section className="rounded-2xl border-2 border-amber-500/30 bg-amber-950/15 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <ShieldCheck className="w-8 h-8 text-amber-400 flex-shrink-0" />
            <div>
              <h2 className="text-lg font-black text-amber-400 mb-2">{c.goldenRule.title}</h2>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">{c.goldenRule.text}</p>
            </div>
          </div>
        </section>

        {/* Text signs - two columns */}
        <section>
          <h2 className="text-2xl font-black text-slate-100 mb-6 text-center">علامات في النص المكتوب</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="flex items-center gap-2 text-emerald-400 font-black mb-4">
                <User className="w-5 h-5" />
                غالباً بشري
              </h3>
              <div className="space-y-3">
                {c.textSignsHuman.map((s, i) => (
                  <div key={i} className="glass-panel border-emerald-500/15 rounded-xl p-4 flex gap-3">
                    <div className="p-2 rounded-lg bg-emerald-950/30 text-emerald-400 h-fit">
                      <Icon name={s.iconName} size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-100 text-sm">{s.title}</p>
                      <p className="text-slate-400 text-xs mt-1 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-sky-400 font-black mb-4">
                <Bot className="w-5 h-5" />
                غالباً AI (أو «م polished»)
              </h3>
              <div className="space-y-3">
                {c.textSignsAI.map((s, i) => (
                  <div key={i} className="glass-panel border-sky-500/15 rounded-xl p-4 flex gap-3">
                    <div className="p-2 rounded-lg bg-sky-950/30 text-sky-400 h-fit">
                      <Icon name={s.iconName} size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-100 text-sm">{s.title}</p>
                      <p className="text-slate-400 text-xs mt-1 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Compare examples */}
        <section>
          <h2 className="text-2xl font-black text-slate-100 mb-6">أمثلة — قارني بنفسك</h2>
          <div className="space-y-8">
            {c.examples.map((ex, i) => (
              <div key={i} className="space-y-3">
                <h3 className="font-black text-emerald-400 text-sm">{ex.label}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="rounded-xl border border-emerald-500/25 bg-emerald-950/10 p-4">
                    <p className="text-emerald-400 text-xs font-black mb-2 flex items-center gap-1">
                      <User className="w-3.5 h-3.5" /> بشري (محتمل)
                    </p>
                    <p className="text-slate-300 text-sm leading-relaxed">{ex.humanSnippet}</p>
                  </div>
                  <div className="rounded-xl border border-sky-500/25 bg-sky-950/10 p-4">
                    <p className="text-sky-400 text-xs font-black mb-2 flex items-center gap-1">
                      <Bot className="w-3.5 h-3.5" /> AI (محتمل)
                    </p>
                    <p className="text-slate-300 text-sm leading-relaxed">{ex.aiSnippet}</p>
                  </div>
                </div>
                <p className="text-slate-500 text-xs border-r-2 border-slate-700 pr-3 leading-relaxed">
                  {ex.explain}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Image signs */}
        <section>
          <h2 className="text-2xl font-black text-slate-100 mb-6">علامات في الصور المولّدة</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {c.imageSigns.map((s, i) => (
              <div key={i} className="glass-panel border-slate-900 rounded-xl p-4 flex gap-3">
                <div className="p-2 rounded-lg bg-purple-950/30 text-purple-400 h-fit">
                  <Icon name={s.iconName} size={18} />
                </div>
                <div>
                  <p className="font-bold text-slate-100 text-sm">{s.title}</p>
                  <p className="text-slate-400 text-xs mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Live tests */}
        <section className="glass-panel border-emerald-500/20 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-black text-slate-100 mb-2 flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-emerald-400" />
            {c.liveTests.title}
          </h2>
          <p className="text-slate-500 text-sm mb-4">إذا شكيتِ — اسألي (باحترام):</p>
          <ul className="space-y-2">
            {c.liveTests.items.map((q, i) => (
              <li key={i} className="flex gap-2 text-slate-300 text-sm">
                <span className="text-emerald-400 font-bold">{i + 1}.</span>
                {q}
              </li>
            ))}
          </ul>
        </section>

        {/* Tools */}
        <section>
          <h2 className="text-2xl font-black text-slate-100 mb-6">كواشف AI والبدائل</h2>
          <div className="space-y-3">
            {c.tools.map((t, i) => (
              <div key={i} className={`rounded-xl border p-4 ${verdictStyles[t.verdict]}`}>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <span className="font-bold text-slate-100 text-sm">{t.name}</span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-950/50">
                    {verdictLabels[t.verdict]}
                  </span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Scenarios */}
        <section>
          <h2 className="text-2xl font-black text-slate-100 mb-6">سيناريوهات من واقع المدرسة والنقابة</h2>
          <div className="space-y-4">
            {c.scenarios.map((sc, i) => (
              <div key={i} className="glass-panel border-slate-900 rounded-2xl p-5 sm:p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400">
                    <Icon name={sc.iconName} size={22} />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-100">{sc.title}</h3>
                    <p className="text-slate-500 text-xs mt-0.5">{sc.context}</p>
                  </div>
                </div>
                <ol className="space-y-1.5 mr-2">
                  {sc.steps.map((step, j) => (
                    <li key={j} className="text-slate-300 text-sm flex gap-2">
                      <span className="text-emerald-500 font-bold">{j + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {/* Checklist */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8">
          <h2 className="text-xl font-black text-slate-100 mb-4">✓ قائمة تحقق سريعة</h2>
          <ul className="space-y-2">
            {c.checklist.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Disclaimer */}
        <section className="flex gap-3 rounded-xl border border-slate-800 p-4 text-slate-500 text-xs leading-relaxed">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-500" />
          {c.disclaimer}
        </section>

        {/* Links */}
        <div className="flex flex-wrap gap-3 justify-center pt-4">
          <Link to="/how-to-prompt" className="px-5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm font-bold text-slate-300 hover:border-emerald-500/30">
            كيف أحاور الـ AI؟
          </Link>
          <Link to="/guide" className="px-5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm font-bold text-slate-300 hover:border-emerald-500/30">
            دليل المعلمة
          </Link>
          <Link to="/attendee" className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-slate-950 rounded-xl text-sm font-bold">
            بوابة المشاركة
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetectAIPage;
