import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../data/content';
import type { AITool } from '../data/content';
import { ExternalLink } from 'lucide-react';

export const Tools: React.FC = () => {
  const { tools } = siteContent;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'الكل' },
    { id: 'education', label: 'التعليم' },
    { id: 'general', label: 'مساعد عام' },
    { id: 'design', label: 'التصميم والتقديم' },
    { id: 'audio', label: 'الصوت والأناشيد' },
    { id: 'productivity', label: 'الإنتاجية والتلخيص' }
  ];

  const filteredTools = selectedCategory === 'all'
    ? tools.items
    : tools.items.filter(tool => tool.category === selectedCategory);

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'education': return 'تعليمي مخصص';
      case 'general': return 'مساعد ذكي عام';
      case 'design': return 'تصميم وعروض';
      case 'audio': return 'توليد صوت وأناشيد';
      case 'productivity': return 'إنتاجية وبحوث';
      default: return 'أداة ذكية';
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'education': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'general': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'design': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'audio': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'productivity': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <section id="tools" className="relative py-24 bg-slate-900/20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.03] z-0"></div>
      <div className="absolute top-1/3 left-[-10%] w-[350px] h-[350px] glow-green rounded-full opacity-10 blur-[120px] z-0"></div>
      <div className="absolute bottom-10 right-1/4 w-80 h-80 glow-purple rounded-full opacity-10 blur-[130px] z-0"></div>

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
            {tools.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg"
          >
            {tools.subtitle}
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold border transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-md shadow-emerald-500/10'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredTools.map((tool: AITool, index: number) => (
            <motion.div
              layout
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              whileHover={{ y: -4, borderColor: 'rgba(16, 185, 129, 0.2)' }}
              className="glass-panel border-slate-900 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden"
            >
              {/* Outer decorative glow */}
              <div className="absolute -top-12 -right-12 w-20 h-20 bg-emerald-500/5 group-hover:bg-emerald-500/10 rounded-full blur-xl transition-all"></div>

              <div>
                {/* Tool Name and Category Tag */}
                <div className="flex justify-between items-start gap-4 mb-4">
                  <h3 className="text-lg md:text-xl font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                    {tool.name}
                  </h3>
                  <span className={`px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-bold border ${getCategoryColor(tool.category)}`}>
                    {getCategoryLabel(tool.category)}
                  </span>
                </div>

                {/* Description */}
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {tool.description}
                </p>
              </div>

              {/* Action Link */}
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 group-hover:underline font-bold mt-auto self-start"
              >
                <span>زيارة الموقع</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Tools;
