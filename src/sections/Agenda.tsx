import React from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../data/content';
import { Icon } from '../components/Icons';
import { Clock } from 'lucide-react';

export const Agenda: React.FC = () => {
  const { agenda } = siteContent;

  return (
    <section id="agenda" className="relative py-24 bg-slate-950/40 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.03] z-0"></div>
      <div className="absolute top-1/2 left-[10%] w-[300px] h-[300px] glow-purple rounded-full opacity-10 blur-[120px] z-0"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/30 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>تنظيم زمني فعال ومدروس</span>
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

        {/* Timeline Winding Container */}
        <div className="relative">
          
          {/* Vertical Connecting Line (Desktop) */}
          <div className="absolute right-4 md:right-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-red-500 to-emerald-500 opacity-20 transform md:translate-x-1/2 z-0"></div>

          {/* Timeline Nodes */}
          <div className="space-y-12 relative z-10">
            {agenda.items.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={index} 
                  className={`flex flex-col md:flex-row items-stretch ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Left/Right Text Panel */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="w-full md:w-1/2 pr-12 md:pr-0 md:px-8 pb-4 md:pb-0"
                  >
                    <div className={`glass-panel border-slate-900 rounded-2xl p-6 md:p-8 relative transition-all duration-300 hover:border-slate-800 ${
                      isEven ? 'md:text-right' : 'md:text-left'
                    }`}>
                      {/* Floating Time Badge */}
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-500/20 text-red-400 text-xs font-bold mb-4 font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        {item.time}
                      </span>

                      <h3 className="text-lg md:text-xl font-bold text-slate-100 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>

                  {/* Central Axis Node */}
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

                  {/* Empty Spacer Column for layout mapping */}
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
