import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, BarChart2, RefreshCw } from 'lucide-react';

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export const Poll: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [hasVoted, setHasVoted] = useState<boolean>(() => {
    return localStorage.getItem('poll_voted') === 'true';
  });
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(() => {
    return localStorage.getItem('poll_selection');
  });

  const [options, setOptions] = useState<PollOption[]>([
    { id: 'opt1', text: 'نعم، أستخدم الذكاء الاصطناعي بشكل شبه يومي في التحضير والتعليم.', votes: 42 },
    { id: 'opt2', text: 'نعم، جربت الأدوات بضع مرات فقط لتجربة قدراتها.', votes: 28 },
    { id: 'opt3', text: 'لا، لم يسبق لي استخدام أي أداة ذكاء اصطناعي من قبل.', votes: 18 }
  ]);

  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);

  const handleVote = (optionId: string) => {
    if (hasVoted) return;

    setOptions((prev) =>
      prev.map((opt) => (opt.id === optionId ? { ...opt, ...{ votes: opt.votes + 1 } } : opt))
    );
    setSelectedOptionId(optionId);
    setHasVoted(true);
    localStorage.setItem('poll_voted', 'true');
    localStorage.setItem('poll_selection', optionId);
  };

  const handleReset = () => {
    setOptions([
      { id: 'opt1', text: 'نعم، أستخدم الذكاء الاصطناعي بشكل شبه يومي في التحضير والتعليم.', votes: 42 },
      { id: 'opt2', text: 'نعم، جربت الأدوات بضع مرات فقط لتجربة قدراتها.', votes: 28 },
      { id: 'opt3', text: 'لا، لم يسبق لي استخدام أي أداة ذكاء اصطناعي من قبل.', votes: 18 }
    ]);
    setHasVoted(false);
    setSelectedOptionId(null);
    localStorage.removeItem('poll_voted');
    localStorage.removeItem('poll_selection');
  };

  return (
    <section id="poll-section" className={`relative overflow-hidden ${compact ? 'py-0' : 'py-20 bg-slate-900/10 border-b border-slate-900/40'}`}>
      {!compact && <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.01] z-0"></div>}
      {!compact && <div className="absolute top-10 right-10 w-80 h-80 glow-green opacity-[0.03] blur-[100px] z-0"></div>}

      <div className={`relative z-10 ${compact ? '' : 'max-w-4xl mx-auto px-4'}`}>
        <div className={`glass-panel border-slate-900 space-y-8 ${compact ? 'rounded-2xl p-4 sm:p-6 border-emerald-500/15' : 'rounded-3xl p-6 sm:p-10'}`}>
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest flex items-center gap-1.5">
                <BarChart2 className="w-4 h-4" />
                <span>استفتاء مباشر تفاعلي للندوة</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-100">
                هل استخدمتِ الذكاء الاصطناعي التوليدي سابقاً؟
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm">
                شاركي برأيكِ لنرى تجارب معلمات فلسطين الحاضرات معنا في القاعة الآن:
              </p>
            </div>
            
            {hasVoted && (
              <button
                onClick={handleReset}
                className="text-[10px] text-slate-500 hover:text-slate-350 bg-slate-950 border border-slate-900 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>إعادة تصويت</span>
              </button>
            )}
          </div>

          {/* Voting Options */}
          <div className="space-y-4">
            {options.map((opt) => {
              const pct = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
              const isSelected = selectedOptionId === opt.id;

              return (
                <div key={opt.id} className="relative">
                  {hasVoted ? (
                    /* Show Animated Results */
                    <div 
                      className={`relative w-full rounded-2xl bg-slate-950/80 border overflow-hidden p-4 sm:p-5 flex items-center justify-between gap-4 transition-all duration-300 ${
                        isSelected ? 'border-emerald-500/40 shadow-md shadow-emerald-500/2' : 'border-slate-900/60'
                      }`}
                    >
                      {/* Animated Progress Fill */}
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`absolute top-0 bottom-0 right-0 z-0 ${
                          isSelected 
                            ? 'bg-emerald-950/20 border-l-2 border-emerald-500' 
                            : 'bg-slate-900/40 border-l border-slate-800'
                        }`}
                      />

                      {/* Option content */}
                      <div className="relative z-10 flex items-center gap-3">
                        {isSelected ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-450 flex-shrink-0" />
                        ) : (
                          <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-850 flex-shrink-0" />
                        )}
                        <span className="text-slate-200 text-xs sm:text-sm font-semibold">{opt.text}</span>
                      </div>

                      {/* Percentage display */}
                      <div className="relative z-10 flex items-baseline gap-1 font-mono">
                        <span className="text-lg font-black text-slate-100">{pct}</span>
                        <span className="text-xs text-slate-400 font-bold">%</span>
                      </div>
                    </div>
                  ) : (
                    /* Show Active Voting Card */
                    <button
                      onClick={() => handleVote(opt.id)}
                      className="w-full text-right rounded-2xl bg-slate-950/40 hover:bg-slate-950/80 border border-slate-900 hover:border-red-500/30 p-4 sm:p-5 flex items-center justify-between gap-4 transition-all group cursor-pointer"
                    >
                      <span className="text-slate-300 group-hover:text-slate-100 text-xs sm:text-sm font-semibold transition-colors">
                        {opt.text}
                      </span>
                      <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-800 group-hover:border-red-500/30 group-hover:bg-red-500/10 flex-shrink-0 transition-all flex items-center justify-center">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 scale-0 group-hover:scale-100 transition-transform"></span>
                      </span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* total votes count indicator */}
          {hasVoted && (
            <div className="text-center text-[10px] sm:text-xs text-slate-500 select-none">
              إجمالي الأصوات المصوتة حالياً: <span className="font-mono font-bold text-slate-400">{totalVotes}</span> معلِمة وعضوة نقابية.
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default Poll;
