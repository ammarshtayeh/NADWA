import React from 'react';
import WhatWillYouLearn from '../sections/WhatWillYouLearn';
import Agenda from '../sections/Agenda';
import Outcomes from '../sections/Outcomes';
import { Calendar } from 'lucide-react';

export const CurriculumPage: React.FC = () => {
  return (
    <div className="relative pt-20">
      {/* Visual Page Header */}
      <section className="relative py-16 bg-slate-950 overflow-hidden border-b border-slate-900/60">
        <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.03] z-0"></div>
        <div className="absolute top-1/2 left-[-10%] w-[300px] h-[300px] glow-purple opacity-5 blur-[120px] z-0"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
            <Calendar className="w-3.5 h-3.5" />
            <span>خطة تدريبية متكاملة</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100">
            البرنامج التدريبي والمحاور
          </h1>
          <p className="max-w-xl mx-auto text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed">
            الجدول الرسمي ليوم الأربعاء 8 تموز 2026 في فندق القصر — نابلس، كما ورد في برنامج حملات التنظيم والتوعية.
          </p>
        </div>
      </section>

      {/* Pages components */}
      <WhatWillYouLearn />
      <Agenda />
      <Outcomes />
    </div>
  );
};

export default CurriculumPage;
