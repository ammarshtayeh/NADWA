import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteContent } from '../data/content';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const { faq } = siteContent;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section id="faq" className="relative py-24 bg-slate-950 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-tatreez-diamond opacity-[0.02] z-0"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 glow-purple opacity-5 blur-[120px] z-0"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-100 via-emerald-100 to-slate-200 bg-clip-text text-transparent mb-4"
          >
            {faq.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg"
          >
            {faq.subtitle}
          </motion.p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faq.items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass-panel border-slate-900 rounded-2xl overflow-hidden transition-all duration-300 hover:border-slate-800"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-right focus:outline-none cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5">
                    <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 ${isOpen ? 'text-emerald-400' : 'text-slate-500 group-hover:text-emerald-400'}`} />
                    <span className={`font-bold text-sm md:text-base transition-colors duration-300 ${isOpen ? 'text-emerald-400' : 'text-slate-200 group-hover:text-slate-100'}`}>
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown 
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-400' : ''}`} 
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-5 md:px-6 md:pb-6 text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-slate-900 pt-4 pr-12">
                        <p className="whitespace-pre-line text-slate-300">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
