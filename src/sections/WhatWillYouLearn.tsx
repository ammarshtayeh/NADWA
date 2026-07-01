import React from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../data/content';
import { Icon } from '../components/Icons';

export const WhatWillYouLearn: React.FC = () => {
  const { curriculum } = siteContent;

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
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="curriculum" className="relative py-24 bg-slate-900/30 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 right-[-10%] w-[300px] h-[300px] glow-purple rounded-full opacity-20 blur-[100px] z-0"></div>
      <div className="absolute bottom-1/4 left-[-10%] w-[350px] h-[350px] glow-green rounded-full opacity-10 blur-[120px] z-0"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-100 via-emerald-100 to-slate-200 bg-clip-text text-transparent mb-4"
          >
            {curriculum.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg"
          >
            {curriculum.subtitle}
          </motion.p>
        </div>

        {/* Content Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {curriculum.items.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -6,
                borderColor: 'rgba(239, 68, 68, 0.2)', // Palestinian red tint border on hover
                boxShadow: '0 12px 30px -10px rgba(239, 68, 68, 0.08)'
              }}
              className="glass-panel rounded-2xl p-8 border border-slate-900 transition-all duration-300 relative group overflow-hidden"
            >
              {/* Number Indicator */}
              <div className="absolute top-4 left-6 text-6xl font-extrabold text-slate-800/10 group-hover:text-emerald-500/5 select-none transition-colors duration-300 font-mono">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Icon Container */}
              <div className="inline-flex items-center justify-center p-4 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 mb-6 group-hover:text-red-400 transition-all duration-300">
                <Icon name={item.iconName} size={28} />
              </div>

              {/* Title & Desc */}
              <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-emerald-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWillYouLearn;
