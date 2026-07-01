import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { siteContent } from '../data/content';
import { Sparkles, Calendar, MapPin, Users } from 'lucide-react';

export const Hero: React.FC = () => {
  const { hero } = siteContent;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const glowVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.6, 0.8, 0.6],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 ai-grid opacity-[0.15] z-0"></div>
      <div className="absolute inset-0 bg-tatreez-diamond opacity-[0.06] z-0"></div>
      
      {/* Glow Orbs */}
      <motion.div 
        variants={glowVariants}
        animate="animate"
        className="absolute top-1/4 right-[-10%] w-[500px] h-[500px] glow-green rounded-full z-0"
      ></motion.div>
      <motion.div 
        variants={glowVariants}
        animate="animate"
        className="absolute bottom-1/4 left-[-10%] w-[500px] h-[500px] glow-red rounded-full z-0"
      ></motion.div>
      <div className="absolute top-10 left-1/3 w-[300px] h-[300px] glow-purple rounded-full z-0 opacity-40"></div>

      {/* Hero Content */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Top Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-950/20 backdrop-blur-md text-emerald-400 text-xs sm:text-sm font-semibold mb-8 hover:bg-emerald-950/40 transition-colors"
          >
            <Sparkles className="w-4 h-4 animate-pulse text-red-500" />
            <span>نحو تمكين تكنولوجي ونقابي متطور</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.2] sm:leading-[1.15] mb-6"
          >
            <span className="block text-slate-100 mb-2">
              {hero.title.split("في")[0]}
            </span>
            <span className="block bg-gradient-to-r from-emerald-400 via-teal-300 to-red-400 bg-clip-text text-transparent">
              في التعليم والتنظيم النقابي
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="max-w-3xl text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed mb-10"
          >
            {hero.subtitle}
          </motion.p>

          {/* Event Quick Info */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full mb-12 bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 backdrop-blur-sm"
          >
            <div className="flex flex-col items-center text-center p-2 border-b sm:border-b-0 sm:border-l border-slate-800/80">
              <Calendar className="w-6 h-6 text-red-500 mb-2" />
              <span className="text-slate-400 text-xs">مدة التدريب</span>
              <span className="text-slate-200 text-sm font-semibold mt-1">3 ساعات مكثفة</span>
            </div>
            <div className="flex flex-col items-center text-center p-2 border-b sm:border-b-0 sm:border-l border-slate-800/80">
              <MapPin className="w-6 h-6 text-emerald-500 mb-2" />
              <span className="text-slate-400 text-xs">مكان الانعقاد</span>
              <span className="text-slate-200 text-sm font-semibold mt-1">وجاهي + عبر الإنترنت</span>
            </div>
            <div className="flex flex-col items-center text-center p-2">
              <Users className="w-6 h-6 text-teal-500 mb-2" />
              <span className="text-slate-400 text-xs">الفئة المستهدفة</span>
              <span className="text-slate-200 text-sm font-semibold mt-1">المعلمات والكوادر النقابية</span>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto"
          >
            <Link
              to="/curriculum"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transform hover:-translate-y-0.5 transition-all text-center"
            >
              استكشاف البرنامج التدريبي
            </Link>
            <Link
              to="/sandbox"
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-850 text-slate-200 font-semibold rounded-xl border border-slate-800 hover:border-emerald-500/30 transition-all text-center"
            >
              مختبر التوليد والأدوات 🚀
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Palestine Colors Subtle Tech Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 flex z-10">
        <div className="flex-1 bg-black"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-emerald-600"></div>
        <div className="flex-1 bg-red-600"></div>
      </div>
    </section>
  );
};

export default Hero;
