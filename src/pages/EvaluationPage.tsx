import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { attendeeTracks, type AttendeeTrack } from '../data/attendee';
import { ClipboardCheck, CheckCircle2, ArrowRight, Star } from 'lucide-react';

const EVAL_STORAGE_KEY = 'nadwa_evaluations';

interface EvalForm {
  name: string;
  track: AttendeeTrack | '';
  rating: number;
  useful: string;
  improve: string;
  firstTask: string;
}

export const EvaluationPage: React.FC = () => {
  const [form, setForm] = useState<EvalForm>({
    name: '',
    track: '',
    rating: 0,
    useful: '',
    improve: '',
    firstTask: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.rating === 0) return;
    try {
      const existing = JSON.parse(localStorage.getItem(EVAL_STORAGE_KEY) || '[]');
      existing.push({ ...form, submittedAt: new Date().toISOString() });
      localStorage.setItem(EVAL_STORAGE_KEY, JSON.stringify(existing));
    } catch {
      // ignore
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="relative pt-20 min-h-[70vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel border-emerald-500/30 rounded-3xl p-10 max-w-md text-center space-y-4"
        >
          <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
          <h1 className="text-2xl font-black text-slate-100">شكراً لمشاركتك!</h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            رأيك يساعدنا نطوّر التدريبات القادمة. لا تنسي بوابة المشاركة وتحدي 7 أيام.
          </p>
          <Link
            to="/attendee"
            className="inline-flex items-center gap-2 text-emerald-400 font-bold text-sm hover:text-emerald-300"
          >
            اذهبي لبوابة المشاركة
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative pt-20 pb-20">
      <section className="py-12 border-b border-slate-900/60 text-center px-4">
        <ClipboardCheck className="w-10 h-10 text-amber-400 mx-auto mb-3" />
        <h1 className="text-3xl font-extrabold text-slate-100">استبانة التقييم</h1>
        <p className="text-slate-400 text-sm mt-2 max-w-md mx-auto">
          دقيقتان — رأيك مهم لتطوير ورش الذكاء الاصطناعي القادمة
        </p>
      </section>

      <form onSubmit={submit} className="max-w-lg mx-auto px-4 py-10 space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-300 mb-2">الاسم (اختياري)</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 text-sm focus:border-emerald-500/50 focus:outline-none"
            placeholder="الاسم الأول كفاية"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-300 mb-2">مسارك في الورشة</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {attendeeTracks.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setForm({ ...form, track: t.id })}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                  form.track === t.id
                    ? 'border-emerald-500/50 bg-emerald-950/30 text-emerald-300'
                    : 'border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {t.emoji} {t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-300 mb-2">تقييم الورشة</label>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setForm({ ...form, rating: n })}
                className="p-2 cursor-pointer"
              >
                <Star
                  className={`w-8 h-8 transition-colors ${
                    n <= form.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-300 mb-2">شو أكثر شي استفدتِ منه؟</label>
          <textarea
            value={form.useful}
            onChange={(e) => setForm({ ...form, useful: e.target.value })}
            rows={2}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 text-sm focus:border-emerald-500/50 focus:outline-none resize-none"
            placeholder="مثلاً: التطبيق العملي، برومptات النقابة..."
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-300 mb-2">شو نحسّن للمرة الجاية؟</label>
          <textarea
            value={form.improve}
            onChange={(e) => setForm({ ...form, improve: e.target.value })}
            rows={2}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 text-sm focus:border-emerald-500/50 focus:outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-300 mb-2">أول مهمة راح تعمليها بالـ AI بكرة؟</label>
          <input
            type="text"
            value={form.firstTask}
            onChange={(e) => setForm({ ...form, firstTask: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 text-sm focus:border-emerald-500/50 focus:outline-none"
            placeholder="درس، قصة، محضر..."
          />
        </div>

        <button
          type="submit"
          disabled={form.rating === 0}
          className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-black rounded-xl cursor-pointer transition-colors"
        >
          إرسال التقييم
        </button>

        <p className="text-slate-600 text-[11px] text-center">
          إجاباتك تُحفظ محلياً على جهازك. للتقييم الرسمي قد تُرسل نسخة للمنظمين لاحقاً.
        </p>
      </form>
    </div>
  );
};

export default EvaluationPage;
