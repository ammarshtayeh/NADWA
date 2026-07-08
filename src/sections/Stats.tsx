import React from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../data/content';
import { Award, Clock, Users, Laptop } from 'lucide-react';

interface StatItem {
  number: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export const Stats: React.FC = () => {
  const { event } = siteContent;

  const items: StatItem[] = [
    {
      number: "10",
      label: "أدوات ذكية",
      description: "ChatGPT، Canva، Gamma، NotebookLM، MagicSchool وغيرها.",
      icon: Laptop,
      color: "text-emerald-400 border-emerald-500/20"
    },
    {
      number: "5.5",
      label: "ساعة برنامج",
      description: "من 9:00 ص حتى 2:30 م — تدريب وتطبيق واستراحة وغداء.",
      icon: Clock,
      color: "text-red-400 border-red-500/20"
    },
    {
      number: "3",
      label: "محاور رئيسية",
      description: "مدارس · رياض أطفال · عمل نقابي — + أدوات وأخلاقيات.",
      icon: Users,
      color: "text-amber-400 border-amber-500/20"
    },
    {
      number: "2",
      label: "جهة منظمة",
      description: "مركز التضامن · الاتحاد العام لنقابات عمال فلسطين.",
      icon: Award,
      color: "text-blue-400 border-blue-500/20"
    }
  ];

  return (
    <section className="relative py-16 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 bg-tatreez-diamond opacity-[0.02] z-0"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <p className="text-center text-slate-500 text-xs sm:text-sm mb-8 font-semibold">
          {event.date} · {event.location}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((stat, i) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`glass-panel border rounded-2xl p-6 text-center flex flex-col items-center justify-center relative overflow-hidden group transition-all duration-300 ${stat.color}`}
              >
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-emerald-500/5 group-hover:bg-emerald-500/10 rounded-full blur-xl transition-all"></div>

                <div className="absolute top-0 left-0 right-0 h-0.5 flex">
                  <div className="flex-1 bg-black"></div>
                  <div className="flex-1 bg-red-600"></div>
                  <div className="flex-1 bg-emerald-600"></div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-850 mb-4 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-300">
                  <IconComponent className="w-6 h-6" />
                </div>
                
                <span className="text-3xl sm:text-4xl font-black text-slate-100 mb-1.5 font-mono group-hover:text-emerald-400 transition-colors">
                  {stat.number}
                </span>
                
                <h4 className="font-extrabold text-slate-200 text-sm sm:text-base mb-1">
                  {stat.label}
                </h4>
                
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-[200px]">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
