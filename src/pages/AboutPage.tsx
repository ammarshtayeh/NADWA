import React from 'react';
import Speakers from '../sections/Speakers';
import FAQ from '../sections/FAQ';
import { siteContent } from '../data/content';
import { Info, Compass, History } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { association } = siteContent;

  return (
    <div className="relative pt-20">
      {/* Visual Page Header */}
      <section className="relative py-16 bg-slate-950 overflow-hidden border-b border-slate-900/60">
        <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.03] z-0"></div>
        <div className="absolute top-1/2 left-[-10%] w-[300px] h-[300px] glow-purple opacity-5 blur-[120px] z-0"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
            <Info className="w-3.5 h-3.5" />
            <span>نبذة عن الهيئة المنظمة</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100">
            عن البرنامج والجهات المنظمة
          </h1>
          <p className="max-w-xl mx-auto text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed">
            برنامج حملات التنظيم والتوعية — بتنظيم مركز التضامن والاتحاد العام لنقابات عمال فلسطين، بالتنسيق مع النقابة الفرعية في نابلس.
          </p>
        </div>
      </section>

      {/* Association Vision & History Content */}
      <section className="relative py-20 bg-slate-950 overflow-hidden border-b border-slate-900/60">
        <div className="absolute inset-0 bg-tatreez-diamond opacity-[0.02] z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] glow-green opacity-5 blur-[120px] z-0"></div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            {/* Vision (Col 5) */}
            <div className="md:col-span-5 flex">
              <div className="glass-panel border-emerald-500/20 bg-emerald-950/5 rounded-2xl p-6 sm:p-8 flex flex-col justify-center relative overflow-hidden h-full">
                <div className="absolute top-0 right-8 w-12 h-1 bg-emerald-500"></div>
                <div className="flex items-center gap-3 text-emerald-400 mb-4">
                  <Compass className="w-6 h-6" />
                  <h2 className="text-lg sm:text-xl font-bold">{association.visionTitle}</h2>
                </div>
                <p className="text-slate-350 text-xs sm:text-sm leading-relaxed italic">
                  "{association.visionText}"
                </p>
              </div>
            </div>

            {/* History & Mission (Col 7) */}
            <div className="md:col-span-7 flex">
              <div className="glass-panel border-slate-900 rounded-2xl p-6 sm:p-8 flex flex-col justify-center h-full">
                <div className="flex items-center gap-3 text-red-400 mb-4">
                  <History className="w-6 h-6" />
                  <h2 className="text-lg sm:text-xl font-bold">{association.historyTitle}</h2>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                  {association.historyText}
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Primary Trainer Spotlight Section */}
      <section className="relative py-20 bg-slate-900/10 overflow-hidden border-b border-slate-900/40">
        <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.02] z-0"></div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mb-2">مدرب ومنسق الورشة الرئيسي</h2>
            <p className="text-slate-400 text-xs sm:text-sm">المحاضر المسؤول عن تقديم المحتوى العلمي والتوجيه العملي للذكاء الاصطناعي:</p>
          </div>

          <div className="glass-panel border-emerald-500/20 bg-emerald-950/5 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row gap-8 items-center md:items-start transition-all relative overflow-hidden">
            <div className="absolute top-0 right-12 w-20 h-1 bg-red-500"></div>

            {/* Avatar */}
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border border-slate-800 flex-shrink-0 shadow-lg">
              <img 
                src={siteContent.trainer.avatar} 
                alt={siteContent.trainer.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border border-emerald-500/20 rounded-2xl"></div>
            </div>

            {/* Description */}
            <div className="space-y-4 text-center md:text-right flex-grow">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-100">{siteContent.trainer.name}</h3>
                <p className="text-emerald-450 text-xs sm:text-sm font-bold">{siteContent.trainer.role}</p>
              </div>
              <p className="text-slate-350 text-xs sm:text-sm leading-relaxed">
                {siteContent.trainer.bio}
              </p>
              <div className="pt-2 flex flex-wrap gap-2.5 justify-center md:justify-start">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-300 bg-slate-950 border border-slate-900 px-2.5 py-1 rounded-md">
                  <span>🎯 المشرف العام</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-300 bg-slate-950 border border-slate-900 px-2.5 py-1 rounded-md">
                  <span>✉️ استشارة تكنولوجية ونقابية</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speakers Profiles Section */}
      <Speakers />

      {/* Expandable Accordion FAQ Section */}
      <FAQ />
    </div>
  );
};

export default AboutPage;
