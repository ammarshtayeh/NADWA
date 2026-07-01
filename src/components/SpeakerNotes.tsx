import React from 'react';
import { usePresenter } from '../context/PresenterContext';
import { HelpCircle, Mic, Play, ArrowLeftCircle } from 'lucide-react';

interface SpeakerNotesProps {
  whatToSay: string;
  questionsToAsk?: string;
  liveExample?: string;
  nextAxis?: string;
}

export const SpeakerNotes: React.FC<SpeakerNotesProps> = ({
  whatToSay,
  questionsToAsk,
  liveExample,
  nextAxis
}) => {
  const { presenterMode, showSpeakerNotes } = usePresenter();

  if (!presenterMode || !showSpeakerNotes) return null;

  return (
    <div className="relative my-8 border-2 border-dashed border-amber-500/40 rounded-2xl p-5 bg-amber-955/5 backdrop-blur-sm overflow-hidden select-none">
      {/* Visual Accent */}
      <div className="absolute top-0 right-0 w-24 h-6 bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider flex items-center justify-center rounded-bl-xl">
        🔑 ملاحظات المدرب (عمار)
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        
        {/* Left column: Talking points and Questions */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <h4 className="flex items-center gap-1.5 text-xs font-black text-amber-400">
              <Mic className="w-4 h-4" />
              <span>ماذا أقول للجمهور؟</span>
            </h4>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
              {whatToSay}
            </p>
          </div>

          {questionsToAsk && (
            <div className="space-y-1.5">
              <h4 className="flex items-center gap-1.5 text-xs font-black text-amber-400">
                <HelpCircle className="w-4 h-4" />
                <span>أسئلة للنقاش والتفاعل؟</span>
              </h4>
              <p className="text-slate-350 text-xs leading-relaxed">
                {questionsToAsk}
              </p>
            </div>
          )}
        </div>

        {/* Right column: Live demo and axis transition */}
        <div className="space-y-4 border-t md:border-t-0 md:border-r border-slate-800/80 md:pr-6">
          {liveExample && (
            <div className="space-y-1.5">
              <h4 className="flex items-center gap-1.5 text-xs font-black text-amber-400">
                <Play className="w-4 h-4 animate-pulse" />
                <span>مثال عملي مباشر أمام الجمهور:</span>
              </h4>
              <div className="p-3 bg-slate-950/80 border border-slate-900 rounded-xl text-xs text-slate-300 font-mono italic leading-relaxed">
                {liveExample}
              </div>
            </div>
          )}

          {nextAxis && (
            <div className="space-y-1.5">
              <h4 className="flex items-center gap-1.5 text-xs font-black text-amber-400">
                <ArrowLeftCircle className="w-4 h-4" />
                <span>الانتقال للمحور التالي:</span>
              </h4>
              <p className="text-slate-300 text-xs font-semibold leading-relaxed">
                {nextAxis}
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default SpeakerNotes;
