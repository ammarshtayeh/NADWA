import React from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../data/content';
import type { AgendaItem } from '../data/content';
import { Icon } from '../components/Icons';
import { Clock, CalendarDays } from 'lucide-react';

const variantStyles: Record<NonNullable<AgendaItem['variant']>, string> = {
  session: 'border-slate-900 hover:border-emerald-500/20',
  break: 'border-sky-900/60 bg-sky-950/10 hover:border-sky-500/20',
  registration: 'border-slate-800/80 bg-slate-900/30',
  opening: 'border-amber-900/50 bg-amber-950/10 hover:border-amber-500/20',
  closing: 'border-emerald-900/50 bg-emerald-950/10 hover:border-emerald-500/20',
};

const badgeStyles: Record<NonNullable<AgendaItem['variant']>, string> = {
  session: 'bg-red-950/40 border-red-500/20 text-red-400',
  break: 'bg-sky-950/40 border-sky-500/20 text-sky-400',
  registration: 'bg-slate-900 border-slate-700 text-slate-400',
  opening: 'bg-amber-950/40 border-amber-500/20 text-amber-400',
  closing: 'bg-emerald-950/40 border-emerald-500/20 text-emerald-400',
};

export const Agenda: React.FC = () => {
  const { agenda } = siteContent;

  return (
    <section id="agenda" className="relative py-24 bg-slate-950/40 overflow-hidden">
      <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.03] z-0"></div>
      <div className="absolute top-1/2 left-[10%] w-[300px] h-[300px] glow-purple rounded-full opacity-10 blur-[120px] z-0"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/30 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4"
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>الجدول الرسمي المعتمد</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-100 via-emerald-100 to-slate-200 bg-clip-text text-transparent mb-4"
          >
            {agenda.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg"
          >
            {agenda.subtitle}
          </motion.p>
        </div>

        <div className="relative">
          <div className="absolute right-4 md:right-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-amber-500 to-emerald-500 opacity-20 transform md:translate-x-1/2 z-0"></div>

          <div className="space-y-8 relative z-10">
            {agenda.items.map((item, index) => {
              const isEven = index % 2 === 0;
              const variant = item.variant ?? 'session';
              const panelClass = variantStyles[variant];
              const badgeClass = badgeStyles[variant];

              return (
                <div 
                  key={index} 
                  className={`flex flex-col md:flex-row items-stretch ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="w-full md:w-1/2 pr-12 md:pr-0 md:px-8 pb-4 md:pb-0"
                  >
                    <div className={`glass-panel rounded-2xl p-6 md:p-7 relative transition-all duration-300 ${panelClass} ${
                      isEven ? 'md:text-right' : 'md:text-left'
                    }`}>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-bold font-mono ${badgeClass}`}>
                          <Clock className="w-3.5 h-3.5" />
                          {item.clockTime}
                        </span>
                        {item.duration && (
                          <span className="text-[11px] text-slate-500 font-semibold">
                            ({item.duration})
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg md:text-xl font-bold text-slate-100 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>

                  <div className="absolute right-0 md:right-1/2 w-8 h-8 transform translate-x-0 md:translate-x-1/2 flex items-center justify-center">
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                      className="w-10 h-10 rounded-full bg-slate-900 border border-emerald-500 text-emerald-400 flex items-center justify-center shadow-md shadow-emerald-950/50 z-20 hover:bg-emerald-400 hover:text-slate-950 transition-all duration-300"
                    >
                      <Icon name={item.iconName} size={16} />
                    </motion.div>
                  </div>

                  <div className="hidden md:block w-1/2"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Agenda;
