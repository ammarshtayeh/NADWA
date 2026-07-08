import React from 'react';
import { Link } from 'react-router-dom';
import { siteContent } from '../data/content';
import { Icon } from '../components/Icons';
import PromptCard from '../components/PromptCard';
import SpeakerNotes from '../components/SpeakerNotes';
import { Shield, AlertTriangle, ArrowLeft } from 'lucide-react';

const unionPrompts = siteContent.promptLibrary.items.filter(
  (p) => p.category === 'union' || p.category === 'social'
);

export const UnionPage: React.FC = () => {
  const { union } = siteContent;

  return (
    <div className="relative pt-20">
      <section className="relative py-16 bg-slate-950 overflow-hidden border-b border-slate-900/60">
        <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.03] z-0"></div>
        <div className="absolute top-1/2 left-[-10%] w-[300px] h-[300px] glow-red opacity-5 blur-[120px] z-0"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/20 text-red-400 text-xs font-bold">
            <Shield className="w-3.5 h-3.5" />
            <span>التمكين النقابي والتنظيمي</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100">
            {union.title}
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 text-sm md:text-base leading-relaxed">
            {union.description}
          </p>
          <Link
            to="/workshop#union"
            className="inline-flex items-center gap-2 text-emerald-400 text-sm font-bold hover:text-emerald-300"
          >
            جلسة العمل النقابي في العرض
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* الميزات */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-black text-slate-100 mb-2 text-center">{union.subtitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {union.features.map((f, i) => (
            <div key={i} className="glass-panel border-slate-900 rounded-xl p-5 hover:border-red-500/20 transition-colors">
              <div className="p-2.5 rounded-lg bg-red-950/20 border border-red-500/15 text-red-400 inline-flex mb-3">
                <Icon name={f.iconName} size={20} />
              </div>
              <h3 className="font-bold text-slate-100 text-sm sm:text-base mb-1">{f.title}</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* برومبتات جاهزة */}
      <section className="py-12 bg-slate-900/20 border-y border-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 text-center">
            برومبتات نقابية جاهزة — انسخي وطبّقي
          </h2>
          <div className="space-y-4">
            {unionPrompts.map((p, i) => (
              <PromptCard
                key={i}
                title={p.title}
                description={p.description}
                prompt={p.prompt}
                tool="ChatGPT / Claude"
                toolUrl="https://claude.ai"
                badge={p.category === 'social' ? 'تواصل' : 'نقابة'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* تحذير */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="rounded-2xl border-2 border-red-500/30 bg-red-950/15 p-6 flex gap-4">
          <AlertTriangle className="w-8 h-8 text-red-400 flex-shrink-0" />
          <div>
            <h3 className="font-black text-red-400 mb-2">قاعدة نقابية ثابتة</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              كل مخرجات الذكاء الاصطناعي النقابية = <strong className="text-slate-100">مسودات فقط</strong>.
              الاعتماد الرسمي والقرار النهائي بشري دائماً. لا تدخلي معلومات نقابية داخلية سرية أو أسماء عضوات في أدوات عامة.
            </p>
          </div>
        </div>

        <SpeakerNotes
          whatToSay="العمل النقابي = كتابة، تحليل، تواصل. نفس مهارة البرومبت من الصف. ورّيهن محضر اجتماع حي على الشاشة خلال 30 ثانية."
          questionsToAsk="شو أكثر مهمة كتابية بتعطّل شغل النقابة عندكن؟"
          liveExample="شغّلي برومبت المحضر أو البيان أمامهن — هذا أكثر شي بيلمسهن."
          nextAxis="بعدها: صندوق الأدوات الكامل — 10 أدوات لكل مهمة."
        />
      </section>
    </div>
  );
};

export default UnionPage;
