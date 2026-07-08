import React from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../data/content';
import { CheckCircle2, Laptop, Wifi, Sparkles } from 'lucide-react';

export const PreWorkshopChecklist: React.FC = () => {
  const { instructions } = siteContent;

  const icons = [Laptop, Wifi, Sparkles, CheckCircle2, CheckCircle2];

  return (
    <section className="relative py-16 bg-slate-900/20 border-y border-slate-900/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mb-2">
            {instructions.title}
          </h2>
          <p className="text-slate-400 text-sm">تحضّري قبل ما تدخلي القاعة — 5 دقائق تفرق</p>
        </div>
        <div className="space-y-3">
          {instructions.items.map((item, i) => {
            const Icon = icons[i] ?? CheckCircle2;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 glass-panel border-slate-900 rounded-xl p-4 sm:p-5"
              >
                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 flex items-center justify-center font-black text-sm">
                  {i + 1}
                </span>
                <div className="flex items-start gap-3 min-w-0">
                  <Icon className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PreWorkshopChecklist;
