import React from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../data/content';
import { Icon } from '../components/Icons';

export const WhoIsItFor: React.FC = () => {
  const { audience } = siteContent;

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

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="audience" className="relative py-24 bg-slate-950/40 overflow-hidden">
      {/* Background Subtle Elements */}
      <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.03] z-0"></div>
      <div className="absolute top-1/2 left-[-10%] w-[300px] h-[300px] glow-green rounded-full opacity-20 blur-[100px] z-0"></div>

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
            {audience.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg"
          >
            {audience.subtitle}
          </motion.p>
        </div>

        {/* Audience Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {audience.items.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{ 
                y: -6,
                borderColor: 'rgba(16, 185, 129, 0.3)',
                boxShadow: '0 12px 30px -10px rgba(16, 185, 129, 0.15)'
              }}
              className="glass-panel rounded-2xl p-8 border border-slate-900 transition-all duration-300 relative group overflow-hidden"
            >
              {/* Subtle card highlight glow */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-emerald-500/5 group-hover:bg-emerald-500/10 rounded-full blur-xl transition-all duration-300"></div>
              
              {/* Top/Side Palestine colors flag tab */}
              <div className="absolute top-0 right-8 w-12 h-1 flex">
                <div className="flex-1 bg-black"></div>
                <div className="flex-1 bg-red-600"></div>
                <div className="flex-1 bg-emerald-600"></div>
              </div>

              {/* Icon container */}
              <div className="inline-flex items-center justify-center p-4 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 mb-6 group-hover:text-slate-950 group-hover:bg-emerald-400 transition-all duration-300">
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

export default WhoIsItFor;
