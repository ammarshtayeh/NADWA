import React from 'react';
import { QrCode, Phone, Sparkles } from 'lucide-react';

export const QRCodeContainer: React.FC = () => {
  return (
    <section className="relative py-16 bg-slate-950 overflow-hidden border-b border-slate-900/40">
      <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.015] z-0"></div>
      
      <div className="relative max-w-4xl mx-auto px-4 z-10">
        <div className="glass-panel border-emerald-500/10 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 shadow-xl">
          
          {/* QR Code Graphic Frame (Palestinian Tatreez Frame) */}
          <div className="relative bg-slate-950 border border-slate-800 p-4.5 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-inner group">
            {/* Corner stitches */}
            <div className="absolute top-1 right-1 text-red-500 text-xs font-serif select-none opacity-40">✕ ✕</div>
            <div className="absolute bottom-1 left-1 text-red-500 text-xs font-serif select-none opacity-40">✕ ✕</div>
            
            {/* SVG representation of a scannable QR Code */}
            <svg 
              className="w-32 h-32 sm:w-36 sm:h-36 text-slate-100 fill-current group-hover:scale-[1.02] transition-transform duration-300"
              viewBox="0 0 29 29"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* QR Code finder patterns */}
              <rect x="0" y="0" width="7" height="7" />
              <rect x="1" y="1" width="5" height="5" fill="#020617" />
              <rect x="2" y="2" width="3" height="3" />
              
              <rect x="22" y="0" width="7" height="7" />
              <rect x="23" y="1" width="5" height="5" fill="#020617" />
              <rect x="24" y="2" width="3" height="3" />
              
              <rect x="0" y="22" width="7" height="7" />
              <rect x="1" y="22" width="5" height="5" fill="#020617" />
              <rect x="2" y="23" width="3" height="3" />

              {/* QR Alignment and timing patterns */}
              <rect x="22" y="22" width="3" height="3" />
              <rect x="8" y="2" width="1" height="1" />
              <rect x="10" y="2" width="2" height="1" />
              <rect x="13" y="1" width="1" height="3" />
              <rect x="16" y="0" width="2" height="2" />
              <rect x="19" y="3" width="1" height="1" />
              
              {/* Random simulated data pixels for ramallah/resources path */}
              <rect x="8" y="5" width="2" height="2" />
              <rect x="11" y="6" width="3" height="1" />
              <rect x="15" y="4" width="1" height="3" />
              <rect x="18" y="5" width="2" height="1" />
              <rect x="20" y="7" width="1" height="2" />
              
              <rect x="0" y="9" width="3" height="1" />
              <rect x="4" y="8" width="1" height="2" />
              <rect x="6" y="9" width="2" height="2" />
              <rect x="9" y="8" width="1" height="1" />
              <rect x="11" y="9" width="3" height="3" />
              <rect x="15" y="8" width="2" height="1" />
              <rect x="18" y="9" width="4" height="2" />
              <rect x="23" y="8" width="2" height="2" />
              <rect x="26" y="9" width="3" height="1" />
              
              <rect x="2" y="12" width="1" height="3" />
              <rect x="5" y="13" width="3" height="1" />
              <rect x="9" y="14" width="2" height="2" />
              <rect x="12" y="13" width="4" height="2" />
              <rect x="17" y="12" width="1" height="1" />
              <rect x="19" y="14" width="2" height="2" />
              <rect x="22" y="13" width="3" height="1" />
              <rect x="27" y="12" width="1" height="3" />
              
              <rect x="0" y="17" width="2" height="2" />
              <rect x="3" y="16" width="1" height="3" />
              <rect x="6" y="18" width="2" height="1" />
              <rect x="9" y="17" width="1" height="1" />
              <rect x="11" y="16" width="3" height="2" />
              <rect x="16" y="17" width="2" height="1" />
              <rect x="19" y="18" width="1" height="1" />
              <rect x="21" y="16" width="4" height="3" />
              <rect x="26" y="17" width="2" height="1" />

              <rect x="8" y="20" width="3" height="1" />
              <rect x="12" y="21" width="1" height="2" />
              <rect x="14" y="20" width="3" height="1" />
              <rect x="18" y="21" width="2" height="2" />
              <rect x="21" y="20" width="1" height="1" />
              
              <rect x="8" y="24" width="2" height="2" />
              <rect x="11" y="25" width="4" height="1" />
              <rect x="16" y="24" width="1" height="3" />
              <rect x="18" y="25" width="3" height="1" />
              
              <rect x="10" y="27" width="2" height="2" />
              <rect x="13" y="28" width="3" height="1" />
              <rect x="17" y="27" width="1" height="2" />
              <rect x="20" y="28" width="4" height="1" />
            </svg>
            
            {/* Small center logo block */}
            <div className="absolute bg-slate-950 p-1 border border-slate-900 rounded-lg flex items-center justify-center">
              <QrCode className="w-5 h-5 text-emerald-450" />
            </div>
          </div>

          {/* QR Text and explanation */}
          <div className="space-y-4 text-center md:text-right flex-grow">
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center justify-center md:justify-start gap-1.5">
                <Sparkles className="w-4 h-4 text-red-500 animate-pulse" />
                <span>حملّي الحقيبة التدريبية فوراً</span>
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-100">الحقيبة الرقمية للأوامر البرمجية</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                قومي بمسح رمز الاستجابة السريعة (QR Code) باستخدام كاميرا جوالكِ للانتقال مباشرة لصفحة الموارد وتحميل دليل المتحدث وخطط الدروس وعروض الباوربوينت والروابط المساعدة لهاتفكِ.
              </p>
            </div>
            
            <div className="inline-flex items-center gap-2 bg-slate-950/80 border border-slate-900 px-4 py-2.5 rounded-xl text-xs text-slate-300 font-semibold select-none">
              <Phone className="w-4 h-4 text-red-500" />
              <span>جاهز للمسح المباشر داخل القاعة 📱</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default QRCodeContainer;
