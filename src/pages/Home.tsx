import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../sections/Hero';
import Stats from '../sections/Stats';
import WhoIsItFor from '../sections/WhoIsItFor';
import { Sparkles, ArrowLeft } from 'lucide-react';

// New Presenter Cues and Engagement Widgets
import SpeakerNotes from '../components/SpeakerNotes';
import Poll from '../components/Poll';
import QRCodeContainer from '../components/QRCodeContainer';

export const Home: React.FC = () => {
  return (
    <div className="relative">
      {/* 1. Hero banner */}
      <Hero />
      
      {/* 2. Seminar statistics */}
      <Stats />

      {/* Axis 1 Speaker Notes */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SpeakerNotes
          whatToSay="نرحب بالمعلمات الكريمات وعضوات النقابة. اليوم ليس ندوة نظرية مكررة، بل تمكين رقمي ونقابي حقيقي. الهدف هو توفير ساعات التحضير الورقية لتتفرغ المعلمة لتنمية القيم والتفاعل المباشر مع الأطفال ودعم صمودها المهني والمهاري."
          questionsToAsk="كم من الوقت تستغرق المعلمة أسبوعياً في تحضير الدروس وكتابة الأوراق الإدارية؟"
          liveExample="استعراض الهيكل العام وتصفح الموقع من الهواتف مع المشاركات."
          nextAxis="سنتحدث الآن عن المحور الثاني: كيف نفكر بالذكاء الاصطناعي وكيف نصوغ البرومبت بذكاء (الـ SMART وكيمياء البرومبت)."
        />
      </div>
      
      {/* 3. Who is this for */}
      <WhoIsItFor />

      {/* Interactive Poll */}
      <Poll />

      {/* Scannable QR Code */}
      <QRCodeContainer />

      {/* 4. Beautiful Palestine-themed CTA Banner */}
      <section className="relative py-20 bg-slate-950 overflow-hidden">
        {/* Background grids */}
        <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.03] z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] glow-green opacity-10 blur-[120px] z-0"></div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="glass-panel border-emerald-500/25 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden group">
            {/* National colors border flag line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 flex">
              <div className="flex-1 bg-black"></div>
              <div className="flex-1 bg-white"></div>
              <div className="flex-1 bg-emerald-600"></div>
              <div className="flex-1 bg-red-600"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/20 text-red-400 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>الورشة مجانية بالكامل والمقاعد محدودة</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-100 leading-tight">
                ابدئي رحلة التمكين الرقمي والنقابي اليوم
              </h2>
              
              <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base leading-relaxed">
                انضمي إلينا وجاهياً أو عن بُعد عبر الإنترنت، وتعلّمي كيف تختصرين ساعات التحضير الطويلة، وتصنعين وسائط وألعاب صفية مبتكرة لأطفال فلسطين، وتفعّلين العمل النقابي والتواصل التكنولوجي بذكاء.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/how-to-prompt"
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transform hover:-translate-y-0.5 transition-all text-center flex items-center justify-center gap-2"
                >
                  <span>ابدئي تعلّم الصياغة الذهبية</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
                <Link
                  to="/curriculum"
                  className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-850 text-slate-200 font-semibold rounded-xl border border-slate-850 hover:border-emerald-500/20 transition-all text-center"
                >
                  استكشاف البرنامج التدريبي
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
