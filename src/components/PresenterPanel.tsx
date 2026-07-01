import React from 'react';
import { usePresenter } from '../context/PresenterContext';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Type, Eye, EyeOff, XCircle } from 'lucide-react';

const AXES_TITLES = [
  "المحور 1: الترحيب ومقدمة ندوة التمكين الرقمي",
  "المحور 2: كيمياء الأوامر وإطار SMART للحوار",
  "المحور 3: التطبيقات العملية المباشرة وتحضير الدروس",
  "المحور 4: التمكين الرقمي والذكاء الاصطناعي نقابياً",
  "المحور 5: الأناشيد ورسومات الأطفال (Suno & Canva)",
  "المحور 6: أمان الخصوصية وأخلاقيات الاستخدام الآمن",
  "المحور 7: التطبيق الحر والاستشارات والتوزيع الختامي"
];

export const PresenterPanel: React.FC = () => {
  const {
    presenterMode,
    setPresenterMode,
    currentAxisIdx,
    setCurrentAxisIdx,
    timerSeconds,
    setTimerSeconds,
    isTimerRunning,
    setIsTimerRunning,
    fontSizeClass,
    setFontSizeClass,
    showSpeakerNotes,
    setShowSpeakerNotes
  } = usePresenter();

  if (!presenterMode) return null;

  // Format stopwatch timer (MM:SS)
  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handlePrev = () => {
    if (currentAxisIdx > 0) {
      setCurrentAxisIdx(currentAxisIdx - 1);
    }
  };

  const handleNext = () => {
    if (currentAxisIdx < AXES_TITLES.length - 1) {
      setCurrentAxisIdx(currentAxisIdx + 1);
    }
  };

  const handleCycleFontSize = () => {
    if (fontSizeClass === 'text-normal') setFontSizeClass('text-large');
    else if (fontSizeClass === 'text-large') setFontSizeClass('text-xlarge');
    else setFontSizeClass('text-normal');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 border-b border-red-500/30 backdrop-blur-md shadow-2xl px-4 py-2 flex flex-col md:flex-row justify-between items-center gap-3">
      
      {/* 1. Session Timer Controls */}
      <div className="flex items-center gap-3.5 bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-1.5 flex-shrink-0">
        <span className="font-mono text-lg font-black text-red-400 select-none tracking-widest min-w-[55px] text-center">
          {formatTime(timerSeconds)}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="p-1.5 rounded-lg bg-slate-900 text-slate-350 hover:text-white border border-slate-800 hover:bg-slate-800 transition-all cursor-pointer"
            title={isTimerRunning ? "إيقاف مؤقت" : "تشغيل المؤقت"}
          >
            {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
          <button
            onClick={() => {
              setTimerSeconds(0);
              setIsTimerRunning(false);
            }}
            className="p-1.5 rounded-lg bg-slate-900 text-slate-350 hover:text-white border border-slate-800 hover:bg-slate-800 transition-all cursor-pointer"
            title="إعادة ضبط المؤقت"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Lecture Axis and Navigation */}
      <div className="flex items-center gap-2 max-w-xl w-full flex-grow justify-center">
        <button
          onClick={handlePrev}
          disabled={currentAxisIdx === 0}
          className="p-2 rounded-xl bg-slate-950/70 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/20 text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        
        <div className="flex-grow text-center bg-slate-950/40 border border-slate-900 rounded-xl py-2 px-4 select-none">
          <span className="block text-[10px] text-emerald-400 font-bold uppercase tracking-wider">المحور التدريبي الحالي</span>
          <span className="text-slate-100 font-black text-xs sm:text-sm truncate block mt-0.5">
            {AXES_TITLES[currentAxisIdx]}
          </span>
        </div>

        <button
          onClick={handleNext}
          disabled={currentAxisIdx === AXES_TITLES.length - 1}
          className="p-2 rounded-xl bg-slate-950/70 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/20 text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      {/* 3. Helper Panel Tools */}
      <div className="flex items-center gap-2.5 flex-shrink-0">
        {/* Toggle notes */}
        <button
          onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
          className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            showSpeakerNotes 
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' 
              : 'bg-slate-950/70 border-slate-800 text-slate-400'
          }`}
          title="ملاحظات الملقي"
        >
          {showSpeakerNotes ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          <span>{showSpeakerNotes ? 'إخفاء الملاحظات' : 'إظهار الملاحظات'}</span>
        </button>

        {/* Change size */}
        <button
          onClick={handleCycleFontSize}
          className={`px-3 py-2 rounded-xl bg-slate-950/70 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/20 text-xs font-bold text-slate-300 flex items-center gap-1.5 cursor-pointer`}
          title="تغيير حجم الخطوط"
        >
          <Type className="w-4 h-4 text-emerald-400" />
          <span>الخط: {fontSizeClass === 'text-normal' ? 'عادي' : fontSizeClass === 'text-large' ? 'كبير' : 'ضخم'}</span>
        </button>

        {/* Exit Presenter mode */}
        <button
          onClick={() => setPresenterMode(false)}
          className="p-2 rounded-xl bg-red-950/20 border border-red-500/20 hover:bg-red-950/40 text-red-400 hover:text-red-300 transition-all cursor-pointer"
          title="إنهاء وضع العارض"
        >
          <XCircle className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};

export default PresenterPanel;
