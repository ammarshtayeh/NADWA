import React, { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';

interface PromptCardProps {
  title: string;
  description?: string;
  prompt: string;
  tool?: string;
  toolUrl?: string;
  badge?: string;
}

export const PromptCard: React.FC<PromptCardProps> = ({
  title,
  description,
  prompt,
  tool,
  toolUrl,
  badge
}) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/10 overflow-hidden hover:border-emerald-500/35 transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-emerald-950/25 border-b border-emerald-500/10">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-emerald-400 text-sm font-extrabold">{title}</span>
            {badge && (
              <span className="text-[10px] font-bold text-amber-400 bg-amber-950/40 border border-amber-500/20 px-2 py-0.5 rounded">
                {badge}
              </span>
            )}
          </div>
          {description && (
            <p className="text-slate-500 text-xs mt-0.5">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {tool && (
            <span className="text-[10px] text-slate-500 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
              {tool}
            </span>
          )}
          {toolUrl && (
            <a
              href={toolUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-sky-500/25 text-sky-300 text-[10px] font-bold hover:border-sky-400/40"
            >
              <ExternalLink className="w-3 h-3" />
              فتح
            </a>
          )}
          <button
            type="button"
            onClick={copy}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[10px] font-bold cursor-pointer transition-all ${
              copied
                ? 'bg-emerald-500 text-slate-950 border-emerald-500'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-emerald-500/40'
            }`}
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copied ? 'تم!' : 'نسخ'}
          </button>
        </div>
      </div>
      <p className="px-4 py-3 text-slate-300 text-xs sm:text-sm leading-relaxed select-all" dir="rtl">
        {prompt}
      </p>
    </div>
  );
};

export default PromptCard;
