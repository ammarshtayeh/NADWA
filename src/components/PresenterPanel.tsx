import React, { useEffect } from 'react';
import { usePresenter } from '../context/PresenterContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { workshopSessions } from '../data/workshop';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Type, Eye, EyeOff, XCircle } from 'lucide-react';

export const PresenterPanel: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
    setShowSpeakerNotes,
  } = usePresenter();

  const currentStep = workshopSessions[currentAxisIdx];

  const scrollToStep = (idx: number) => {
    const step = workshopSessions[idx];
    if (!step) return;
    setTimeout(() => {
      const el = document.getElementById(step.id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, location.pathname === '/workshop' ? 100 : 400);
  };

  useEffect(() => {
    if (!presenterMode) return;
    if (location.pathname !== '/workshop') {
      navigate('/workshop');
    }
  }, [presenterMode, location.pathname, navigate]);

  useEffect(() => {
    if (presenterMode) {
      scrollToStep(currentAxisIdx);
    }
  }, [currentAxisIdx, presenterMode]);

  if (!presenterMode || !currentStep) return null;

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handlePrev = () => {
    if (currentAxisIdx > 0) setCurrentAxisIdx(currentAxisIdx - 1);
  };

  const handleNext = () => {
    if (currentAxisIdx < workshopSessions.length - 1) setCurrentAxisIdx(currentAxisIdx + 1);
  };

  const handleCycleFontSize = () => {
    if (fontSizeClass === 'text-normal') setFontSizeClass('text-large');
    else if (fontSizeClass === 'text-large') setFontSizeClass('text-xlarge');
    else setFontSizeClass('text-normal');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900/98 border-b-2 border-emerald-500/30 backdrop-blur-md shadow-2xl px-4 py-2.5 flex flex-col lg:flex-row justify-between items-center gap-3">
      <div className="flex items-center gap-3.5 bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-1.5 flex-shrink-0">
        <span className="font-mono text-base sm:text-lg font-black text-emerald-400 select-none tracking-widest min-w-[55px] text-center">
          {formatTime(timerSeconds)}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="p-1.5 rounded-lg bg-slate-900 text-slate-350 hover:text-white border border-slate-800 hover:bg-slate-800 transition-all cursor-pointer"
            title={isTimerRunning ? 'إيقاف' : 'تشغيل'}
          >
            {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-450" />}
          </button>
          <button
            type="button"
            onClick={() => {
              setTimerSeconds(0);
              setIsTimerRunning(false);
            }}
            className="p-1.5 rounded-lg bg-slate-900 text-slate-350 hover:text-white border border-slate-800 hover:bg-slate-800 transition-all cursor-pointer"
            title="إعادة ضبط"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
        <span className="hidden md:inline text-[10px] text-slate-500 font-mono border-r border-slate-800 pr-3">
          {currentStep.time}
        </span>
      </div>

      <div className="flex items-center gap-2 max-w-xl w-full flex-grow justify-center">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentAxisIdx === 0}
          className="p-2 rounded-xl bg-slate-950/70 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/20 text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
          title="المحور السابق (←)"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="flex-grow text-center bg-slate-950/40 border border-slate-900 rounded-xl py-2 px-4 select-none min-w-0">
          <span className="block text-[9px] text-emerald-450 font-bold uppercase tracking-wider">
            جلسة {currentAxisIdx + 1} / {workshopSessions.length}
          </span>
          <span className="text-slate-100 font-black text-xs sm:text-sm truncate block mt-0.5">
            {currentStep.title}
          </span>
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={currentAxisIdx === workshopSessions.length - 1}
          className="p-2 rounded-xl bg-slate-950/70 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/20 text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
          title="المحور التالي (→)"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-2 flex-wrap justify-center sm:flex-nowrap flex-shrink-0">
        <button
          type="button"
          onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
          className={`px-3 py-2 rounded-xl border text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            showSpeakerNotes
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-450'
              : 'bg-slate-950/70 border-slate-800 text-slate-400'
          }`}
        >
          {showSpeakerNotes ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{showSpeakerNotes ? 'إخفاء الملاحظات' : 'ملاحظات المدرب'}</span>
        </button>

        <button
          type="button"
          onClick={handleCycleFontSize}
          className="px-3 py-2 rounded-xl bg-slate-950/70 hover:bg-slate-850 border border-slate-800 text-[11px] font-bold text-slate-300 flex items-center gap-1.5 cursor-pointer"
        >
          <Type className="w-3.5 h-3.5 text-emerald-450" />
          <span className="hidden sm:inline">
            {fontSizeClass === 'text-normal' ? 'خط عادي' : fontSizeClass === 'text-large' ? 'خط كبير' : 'خط ضخم'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setPresenterMode(false)}
          className="p-2 rounded-xl bg-red-950/20 border border-red-500/20 hover:bg-red-950/40 text-red-400 transition-all cursor-pointer flex items-center gap-1 text-[11px] font-bold"
        >
          <XCircle className="w-4 h-4" />
          <span className="hidden sm:inline">إنهاء</span>
        </button>
      </div>
    </div>
  );
};

export default PresenterPanel;
