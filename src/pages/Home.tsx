import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../sections/Hero';
import Stats from '../sections/Stats';
import WhoIsItFor from '../sections/WhoIsItFor';
import WhatWillYouLearn from '../sections/WhatWillYouLearn';
import Outcomes from '../sections/Outcomes';
import PreWorkshopChecklist from '../sections/PreWorkshopChecklist';
import QRCodeContainer from '../components/QRCodeContainer';
import { siteContent } from '../data/content';
import { Tv, ArrowLeft, Sparkles, List, User } from 'lucide-react';
import { usePresenter } from '../context/PresenterContext';
import { workshopSessions } from '../data/workshop';

export const Home: React.FC = () => {
  const { setPresenterMode, setCurrentAxisIdx } = usePresenter();
  const { trainer } = siteContent;

  const startWorkshop = () => {
    setCurrentAxisIdx(0);
    setPresenterMode(true);
  };

  return (
    <div className="relative">
      <Hero />

      <section className="relative py-12 bg-slate-950 border-b border-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel border-emerald-500/30 rounded-3xl p-8 md:p-10"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>بدون PowerPoint — الموقع هو العرض الكامل</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 mb-3">
              {workshopSessions.length} جلسة — مدارس · روضة · نقابة
            </h2>
            <p className="text-slate-400 text-sm md:text-base mb-8 max-w-xl mx-auto leading-relaxed">
              افتحي وضع المدرب ومرّري بين المحاور بالأسهم. كل شيء هنا: الجدول، الأمثلة، البرومبتات، الأدوات، ملاحظات الإلقاء، والتطبيق العملي.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/workshop"
                onClick={startWorkshop}
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all"
              >
                <Tv className="w-5 h-5" />
                ابدأ الورشة — وضع العارض
              </Link>
              <Link
                to="/workshop"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 border border-slate-800 text-slate-200 font-semibold rounded-xl hover:border-emerald-500/30 transition-all"
              >
                <List className="w-5 h-5 text-emerald-400" />
                تصفّح المحاور
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* بطاقة المدرب */}
      <section className="py-12 bg-slate-900/20 border-b border-slate-900/50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="glass-panel border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-right">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-600/20 border border-emerald-500/25 flex items-center justify-center flex-shrink-0">
              <User className="w-10 h-10 text-emerald-400" />
            </div>
            <div className="min-w-0">
              <p className="text-emerald-400 text-xs font-bold mb-1">مدرب الورشة</p>
              <h3 className="text-xl font-black text-slate-100">{trainer.name}</h3>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">{trainer.role}</p>
              <p className="text-slate-500 text-xs mt-3 italic leading-relaxed">«{trainer.introQuote}»</p>
            </div>
          </div>
        </div>
      </section>

      {/* للمشاركات — بوابة سريعة */}
      <section className="relative py-10 bg-gradient-to-b from-emerald-950/20 to-slate-950 border-b border-emerald-900/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Link
            to="/attendee"
            className="inline-flex flex-col sm:flex-row items-center gap-4 glass-panel border-emerald-500/25 rounded-2xl p-6 sm:p-8 w-full hover:border-emerald-500/45 transition-all group"
          >
            <span className="text-4xl">📱</span>
            <div className="text-right flex-grow">
              <p className="text-emerald-400 text-xs font-bold mb-1">للمشاركات في القاعة</p>
              <h2 className="text-xl font-black text-slate-100 group-hover:text-emerald-300 transition-colors">
                بوابة المشاركة — مسارك، برومبتاتك، تحدي 7 أيام
              </h2>
              <p className="text-slate-500 text-sm mt-1">اختاري مدارس / روضة / نقابة · احفظي المفضلة · ورقة غش للطباعة</p>
            </div>
            <span className="text-emerald-400 font-bold text-sm flex-shrink-0">ادخلي ←</span>
          </Link>
        </div>
      </section>

      <PreWorkshopChecklist />
      <Stats />
      <WhoIsItFor />
      <WhatWillYouLearn />
      <Outcomes />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <QRCodeContainer />
      </div>

      <section className="relative py-16 bg-slate-950 overflow-hidden border-t border-slate-900">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-xl font-bold text-slate-200">للمشاركات — افتحي الموقع على جوالك</h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            انسخي البرومبتات، جرّبي الأمثلة، وارجعي للموقع بعد الورشة كمرجع دائم — مدارس، روضة، ونقابة
          </p>
          <Link
            to="/workshop"
            onClick={startWorkshop}
            className="inline-flex items-center gap-2 text-emerald-400 font-bold text-sm hover:text-emerald-300"
          >
            ابدأ عرض الورشة
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
