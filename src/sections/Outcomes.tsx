import React from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../data/content';
import { Icon } from '../components/Icons';
import { CheckCircle2 } from 'lucide-react';

export const Outcomes: React.FC = () => {
  const { outcomes } = siteContent;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="outcomes" className="relative py-24 bg-slate-950/40 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.02] z-0"></div>
      <div className="absolute top-1/4 right-[-10%] w-[300px] h-[300px] glow-red rounded-full opacity-10 blur-[120px] z-0"></div>

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
            {outcomes.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg"
          >
            {outcomes.subtitle}
          </motion.p>
        </div>

        {/* Outcomes Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-center"
        >
          {outcomes.items.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                borderColor: 'rgba(16, 185, 129, 0.25)',
                boxShadow: '0 10px 30px -10px rgba(16, 185, 129, 0.1)'
              }}
              className="glass-panel border-slate-900 rounded-2xl p-6 md:p-8 flex flex-col relative group transition-all duration-300 overflow-hidden"
            >
              {/* Top border flag highlight */}
              <div className="absolute top-0 right-6 w-10 h-0.5 bg-emerald-500 group-hover:w-20 transition-all duration-300"></div>

              {/* Icon & Title Row */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-300">
                  <Icon name={item.iconName} size={24} />
                </div>
                <h3 className="font-bold text-slate-100 text-base md:text-lg leading-tight group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Checklist verification item at the bottom */}
              <div className="mt-auto flex items-center gap-2 text-emerald-400/70 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>مهارة عملية مكتسبة</span>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Outcomes;
