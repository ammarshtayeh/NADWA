import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Sparkles, X, Maximize2 } from 'lucide-react';

export const QRCodeContainer: React.FC = () => {
  const [qrUrl, setQrUrl] = useState('https://nadwa.vercel.app/attendee');
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const origin = window.location.origin;
      setQrUrl(`${origin}/attendee`);
    }
  }, []);

  const qrImageSrc = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(qrUrl)}&color=0f172a&bgcolor=ffffff`;

  return (
    <section className="relative py-16 bg-slate-950 overflow-hidden border-b border-slate-900/40">
      <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.015] z-0"></div>
      
      <div className="relative max-w-4xl mx-auto px-4 z-10">
        <div className="glass-panel border-emerald-500/10 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 shadow-xl">
          
          {/* QR Code Container with Zoom trigger */}
          <div 
            onClick={() => setIsZoomed(true)}
            className="relative bg-white border-4 border-slate-900 p-3.5 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-2xl cursor-pointer group hover:scale-[1.03] transition-all"
            title="انقر لتكبير الرمز للشاشة الكاملة"
          >
            {/* Visual corner stitches */}
            <div className="absolute top-1 right-1 text-slate-900 text-[10px] font-black select-none opacity-30">✕</div>
            <div className="absolute bottom-1 left-1 text-slate-900 text-[10px] font-black select-none opacity-30">✕</div>
            
            {/* Real scannable dynamic QR Code */}
            <img 
              src={qrImageSrc} 
              alt="رمز استجابة سريع حقيقي وقابل للمسح" 
              className="w-32 h-32 sm:w-36 sm:h-36 object-contain rounded-lg"
            />
            
            {/* Hover overlay with indicator */}
            <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
              <div className="flex flex-col items-center space-y-1">
                <Maximize2 className="w-6 h-6 text-emerald-400" />
                <span className="text-[10px] font-bold text-slate-200">تكبير الرمز</span>
              </div>
            </div>
          </div>

          {/* QR Text and explanation */}
          <div className="space-y-4 text-center md:text-right flex-grow">
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center justify-center md:justify-start gap-1.5">
                <Sparkles className="w-4 h-4 text-red-500 animate-pulse" />
                <span>مسح وتنزيل الموارد</span>
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-100">بوابة المشاركة — للحاضرات</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                امسحي الرمز بكاميرا الجوال — تفتح بوابة المشاركة: مسارك (مدرسة/روضة/نقابة)، برومبتات جاهزة، تحدي 7 أيام، وورقة غش للطباعة.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-2.5">
              <div className="inline-flex items-center gap-1.5 bg-slate-950 border border-slate-900 px-3.5 py-2 rounded-xl text-[11px] text-slate-350 font-bold select-none">
                <Phone className="w-3.5 h-3.5 text-red-500" />
                <span>رابط الموارد المباشر: </span>
                <span className="text-emerald-400 font-mono text-xs">{qrUrl.replace('http://', '').replace('https://', '')}</span>
              </div>
              
              <button
                onClick={() => setIsZoomed(true)}
                className="inline-flex items-center gap-1 px-4 py-2 bg-emerald-500 hover:bg-emerald-650 text-slate-950 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md shadow-emerald-500/10"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>عرض بالحجم الكامل</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Fullscreen Lightbox Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4">
            {/* Modal backdrop closer */}
            <div 
              className="absolute inset-0 cursor-pointer"
              onClick={() => setIsZoomed(false)}
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-white border-8 border-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full flex flex-col items-center space-y-6 shadow-2xl z-10"
            >
              {/* Close button */}
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute -top-12 right-0 p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
              >
                <X className="w-4 h-4 text-red-500" />
                <span>إغلاق التكبير</span>
              </button>

              <h4 className="text-slate-950 font-black text-sm sm:text-base text-center">
                امسحي الرمز بكاميرا الجوال لتحميل حقيبة الموارد 📱
              </h4>

              {/* Enlarged QR Code */}
              <img 
                src={qrImageSrc} 
                alt="رمز استجابة سريع مكبر" 
                className="w-64 h-64 sm:w-80 sm:h-80 object-contain rounded-xl select-none"
              />

              <div className="text-center space-y-1">
                <span className="text-[10px] text-slate-500 font-mono block select-all">
                  {qrUrl}
                </span>
                <span className="text-[10px] text-slate-450 font-semibold block">
                  الرمز ديناميكي وسيعمل فوراً على أي نطاق يتم استضافته
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default QRCodeContainer;
