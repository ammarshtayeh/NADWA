import React from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../data/content';
import { Mic, GraduationCap } from 'lucide-react';

function speakerInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return parts[0].charAt(0) + parts[1].charAt(0);
  return name.charAt(0);
}

export const Speakers: React.FC = () => {
  const { speakers } = siteContent;

  return (
    <section id="speakers" className="relative py-24 bg-slate-900/10 overflow-hidden">
      <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.02] z-0"></div>
      <div className="absolute top-1/2 left-[-10%] w-[300px] h-[300px] glow-green opacity-10 blur-[120px] z-0"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-100 via-emerald-100 to-slate-200 bg-clip-text text-transparent mb-4"
          >
            {speakers.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg"
          >
            {speakers.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {speakers.items.map((speaker, index) => {
            const isTrainer = speaker.name === 'عمار اشتية';

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{ y: -4, borderColor: isTrainer ? 'rgba(16, 185, 129, 0.35)' : 'rgba(16, 185, 129, 0.2)' }}
                className={`glass-panel rounded-2xl p-6 sm:p-7 flex gap-5 items-start transition-all duration-300 relative overflow-hidden group ${
                  isTrainer ? 'border-emerald-500/25 bg-emerald-950/5 sm:col-span-2' : 'border-slate-900'
                }`}
              >
                <div className={`relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl flex-shrink-0 flex items-center justify-center text-lg font-black border ${
                  isTrainer
                    ? 'bg-gradient-to-br from-emerald-600 to-teal-700 border-emerald-500/30 text-white'
                    : 'bg-slate-900 border-slate-800 text-emerald-400'
                }`}>
                  {speaker.avatar ? (
                    <img src={speaker.avatar} alt={speaker.name} className="w-full h-full object-cover rounded-2xl" />
                  ) : (
                    speakerInitials(speaker.name)
                  )}
                </div>

                <div className="space-y-2 text-right flex-1 min-w-0">
                  <div className="space-y-1">
                    <h3 className={`text-lg font-bold transition-colors ${
                      isTrainer ? 'text-emerald-300' : 'text-slate-100 group-hover:text-emerald-400'
                    }`}>
                      {speaker.name}
                    </h3>
                    <p className="text-emerald-400 text-xs sm:text-sm font-semibold">
                      {speaker.role}
                    </p>
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {speaker.bio}
                  </p>

                  <div className="flex gap-2 pt-1">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 bg-slate-900 border border-slate-850 px-2.5 py-1 rounded-md">
                      {isTrainer ? (
                        <>
                          <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                          <span>مدرب الورشة</span>
                        </>
                      ) : (
                        <>
                          <Mic className="w-3.5 h-3.5 text-amber-400" />
                          <span>كلمة افتتاح</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-0 right-0 left-0 h-1 flex">
                  <div className="flex-1 bg-black"></div>
                  <div className="flex-1 bg-red-600"></div>
                  <div className="flex-1 bg-emerald-600"></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Speakers;
