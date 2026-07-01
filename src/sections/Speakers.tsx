import React from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../data/content';
import { Mail, Award } from 'lucide-react';

export const Speakers: React.FC = () => {
  const { speakers } = siteContent;

  return (
    <section id="speakers" className="relative py-24 bg-slate-900/10 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.02] z-0"></div>
      <div className="absolute top-1/2 left-[-10%] w-[300px] h-[300px] glow-green opacity-10 blur-[120px] z-0"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Header */}
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

        {/* Speakers Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {speakers.items.map((speaker, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4, borderColor: 'rgba(16, 185, 129, 0.25)' }}
              className="glass-panel border-slate-900 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-start transition-all duration-300 relative overflow-hidden group"
            >
              {/* Profile Avatar Frame */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border border-slate-800 flex-shrink-0">
                <img 
                  src={speaker.avatar} 
                  alt={speaker.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Subtle overlay borders */}
                <div className="absolute inset-0 border border-emerald-500/10 group-hover:border-emerald-500/30 transition-all rounded-2xl"></div>
              </div>

              {/* Speaker Info */}
              <div className="space-y-3.5 text-center sm:text-right flex-1">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                    {speaker.name}
                  </h3>
                  <p className="text-emerald-400 text-xs sm:text-sm font-semibold">
                    {speaker.role}
                  </p>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {speaker.bio}
                </p>

                {/* Social links / Contact indicators */}
                <div className="flex gap-2.5 justify-center sm:justify-start pt-2">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 bg-slate-900 border border-slate-850 px-2.5 py-1 rounded-md">
                    <Award className="w-3.5 h-3.5 text-emerald-400" />
                    <span>متحدث رئيسي</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 bg-slate-900 border border-slate-850 px-2.5 py-1 rounded-md">
                    <Mail className="w-3.5 h-3.5 text-red-400" />
                    <span>تواصل مهني</span>
                  </span>
                </div>
              </div>

              {/* Decorative Palestine Flag Line */}
              <div className="absolute bottom-0 right-0 left-0 h-1 flex">
                <div className="flex-1 bg-black"></div>
                <div className="flex-1 bg-red-600"></div>
                <div className="flex-1 bg-emerald-600"></div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Speakers;
