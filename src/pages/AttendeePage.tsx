import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { siteContent } from '../data/content';
import PromptCard from '../components/PromptCard';
import {
  attendeeTracks,
  sevenDayPlan,
  quickTools,
  promptRecipe,
  ethicsQuick,
  TRACK_STORAGE_KEY,
  FAVORITES_STORAGE_KEY,
  SEVEN_DAY_STORAGE_KEY,
  type AttendeeTrack
} from '../data/attendee';
import {
  GraduationCap,
  Baby,
  Briefcase,
  Star,
  CheckCircle2,
  ExternalLink,
  FileText,
  ClipboardCheck,
  Sparkles,
  Heart
} from 'lucide-react';

const trackIcons: Record<AttendeeTrack, React.ComponentType<{ className?: string }>> = {
  school: GraduationCap,
  kg: Baby,
  union: Briefcase
};

export const AttendeePage: React.FC = () => {
  const { promptLibrary } = siteContent;
  const [track, setTrack] = useState<AttendeeTrack | null>(() => {
    const saved = localStorage.getItem(TRACK_STORAGE_KEY);
    return (saved as AttendeeTrack) || null;
  });
  const [dayChecks, setDayChecks] = useState<boolean[]>(() => {
    try {
      const raw = localStorage.getItem(SEVEN_DAY_STORAGE_KEY);
      return raw ? JSON.parse(raw) : Array(7).fill(false);
    } catch {
      return Array(7).fill(false);
    }
  });
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const selectTrack = (t: AttendeeTrack) => {
    setTrack(t);
    localStorage.setItem(TRACK_STORAGE_KEY, t);
  };

  const trackInfo = attendeeTracks.find((t) => t.id === track);

  const trackPrompts = useMemo(() => {
    if (!trackInfo) return [];
    return promptLibrary.items.filter((p) => trackInfo.categories.includes(p.category));
  }, [trackInfo, promptLibrary.items]);

  const favoritePrompts = useMemo(
    () => promptLibrary.items.filter((p) => favorites.includes(p.prompt)),
    [favorites, promptLibrary.items]
  );

  const toggleFavorite = (prompt: string) => {
    setFavorites((prev) => {
      const next = prev.includes(prompt) ? prev.filter((p) => p !== prompt) : [...prev, prompt];
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const toggleDay = (i: number) => {
    setDayChecks((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      localStorage.setItem(SEVEN_DAY_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const completedDays = dayChecks.filter(Boolean).length;

  return (
    <div className="relative pt-20">
      <section className="relative py-14 bg-slate-950 border-b border-slate-900/60 overflow-hidden">
        <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.03] z-0" />
        <div className="relative max-w-4xl mx-auto px-4 text-center z-10 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            للمشاركات في الورشة
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">بوابة المشاركة</h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            اختاري مسارك، انسخي البرومبتات، تابعي تحدي 7 أيام، واحفظي المفضلة — كل شي يظل معك بعد الورشة.
          </p>
        </div>
      </section>

      {/* اختيار المسار */}
      <section className="py-12 max-w-5xl mx-auto px-4">
        <h2 className="text-xl font-black text-slate-100 mb-2 text-center">1. اختاري مسارك</h2>
        <p className="text-slate-500 text-sm text-center mb-8">راح نعرضلك البرومبتات الأنسب لشغلك</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {attendeeTracks.map((t) => {
            const Icon = trackIcons[t.id];
            const active = track === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => selectTrack(t.id)}
                className={`text-right rounded-2xl border-2 p-5 transition-all cursor-pointer ${
                  active
                    ? t.color === 'emerald'
                      ? 'border-emerald-500/50 bg-emerald-950/20'
                      : t.color === 'amber'
                        ? 'border-amber-500/50 bg-amber-950/20'
                        : 'border-red-500/50 bg-red-950/20'
                    : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                }`}
              >
                <span className="text-2xl mb-2 block">{t.emoji}</span>
                <Icon className={`w-5 h-5 mb-2 ${active ? 'text-emerald-400' : 'text-slate-500'}`} />
                <p className="font-black text-slate-100">{t.label}</p>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">{t.desc}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* برومبتات مسارك */}
      {track && (
        <section className="py-10 bg-slate-900/20 border-y border-slate-900/50">
          <div className="max-w-4xl mx-auto px-4 space-y-4">
            <h2 className="text-xl font-black text-slate-100">
              2. برومبتات {trackInfo?.label} — انسخي وطبّقي
            </h2>
            {trackPrompts.map((p, i) => (
              <div key={i} className="relative">
                <PromptCard
                  title={p.title}
                  description={p.description}
                  prompt={p.prompt}
                  tool="ChatGPT / Claude"
                  toolUrl="https://chatgpt.com"
                />
                <button
                  type="button"
                  onClick={() => toggleFavorite(p.prompt)}
                  className={`absolute top-3 left-3 p-2 rounded-lg border transition-all cursor-pointer ${
                    favorites.includes(p.prompt)
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                      : 'bg-slate-900/80 border-slate-700 text-slate-500 hover:text-amber-400'
                  }`}
                  title="حفظ في المفضلة"
                >
                  <Star className={`w-4 h-4 ${favorites.includes(p.prompt) ? 'fill-current' : ''}`} />
                </button>
              </div>
            ))}
            <Link to="/sandbox" className="inline-flex items-center gap-2 text-emerald-400 text-sm font-bold hover:text-emerald-300">
              المزيد في مختبر الأدوات ←
            </Link>
          </div>
        </section>
      )}

      {/* المفضلة */}
      {favoritePrompts.length > 0 && (
        <section className="py-10 max-w-4xl mx-auto px-4">
          <h2 className="text-lg font-black text-slate-100 mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-400" />
            محفوظاتك ({favoritePrompts.length})
          </h2>
          <div className="space-y-3">
            {favoritePrompts.map((p, i) => (
              <PromptCard key={i} title={p.title} prompt={p.prompt} tool="ChatGPT" toolUrl="https://chatgpt.com" />
            ))}
          </div>
        </section>
      )}

      {/* تحدي 7 أيام */}
      <section className="py-12 bg-slate-900/20 border-y border-slate-900/50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <h2 className="text-xl font-black text-slate-100">3. تحدي 7 أيام بعد الورشة</h2>
            <span className="text-sm font-bold text-emerald-400">{completedDays}/7 ✓</span>
          </div>
          <div className="space-y-2">
            {sevenDayPlan.map((d, i) => (
              <button
                key={i}
                type="button"
                onClick={() => toggleDay(i)}
                className={`w-full text-right flex items-start gap-3 rounded-xl border p-4 transition-all cursor-pointer ${
                  dayChecks[i]
                    ? 'border-emerald-500/30 bg-emerald-950/15'
                    : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                }`}
              >
                <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${dayChecks[i] ? 'text-emerald-400' : 'text-slate-600'}`} />
                <div>
                  <span className="font-bold text-slate-200 text-sm">{d.day}</span>
                  <p className={`text-sm mt-0.5 leading-relaxed ${dayChecks[i] ? 'text-slate-400 line-through' : 'text-slate-300'}`}>
                    {d.task}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* أدوات سريعة + روابط */}
      <section className="py-12 max-w-5xl mx-auto px-4">
        <h2 className="text-xl font-black text-slate-100 mb-6 text-center">4. أدوات ومراجع سريعة</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {quickTools.map((tool) => (
            <a
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel border-slate-900 rounded-xl p-4 hover:border-emerald-500/25 transition-colors group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-100 text-sm">{tool.name}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400" />
              </div>
              <p className="text-slate-500 text-[11px]">{tool.use}</p>
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/cheatsheet"
            className="flex items-center gap-4 glass-panel border-emerald-500/20 rounded-2xl p-5 hover:border-emerald-500/40 transition-colors"
          >
            <FileText className="w-8 h-8 text-emerald-400 flex-shrink-0" />
            <div>
              <p className="font-black text-slate-100">ورقة الغش — للطباعة</p>
              <p className="text-slate-500 text-xs mt-0.5">وصفة البرومبت + أوامر جاهزة — A4</p>
            </div>
          </Link>
          <Link
            to="/evaluation"
            className="flex items-center gap-4 glass-panel border-amber-500/20 rounded-2xl p-5 hover:border-amber-500/40 transition-colors"
          >
            <ClipboardCheck className="w-8 h-8 text-amber-400 flex-shrink-0" />
            <div>
              <p className="font-black text-slate-100">استبانة التقييم</p>
              <p className="text-slate-500 text-xs mt-0.5">ساعدينا نطوّر التدريبات القادمة</p>
            </div>
          </Link>
          <Link to="/guide" className="flex items-center gap-4 glass-panel border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
            <GraduationCap className="w-8 h-8 text-sky-400 flex-shrink-0" />
            <div>
              <p className="font-black text-slate-100">دليل المعلمة الكامل</p>
              <p className="text-slate-500 text-xs mt-0.5">خطوة بخطوة بعد الورشة</p>
            </div>
          </Link>
          <Link to="/union" className="flex items-center gap-4 glass-panel border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
            <Briefcase className="w-8 h-8 text-red-400 flex-shrink-0" />
            <div>
              <p className="font-black text-slate-100">البوابة النقابية</p>
              <p className="text-slate-500 text-xs mt-0.5">برومبتات المراسلات والمحاضر</p>
            </div>
          </Link>
        </div>
      </section>

      {/* وصفة + أخلاقيات */}
      <section className="py-12 max-w-4xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel border-slate-900 rounded-2xl p-6">
            <h3 className="font-black text-emerald-400 mb-4">{promptRecipe.title}</h3>
            <ol className="space-y-2">
              {promptRecipe.items.map((item, i) => (
                <li key={i} className="text-sm">
                  <span className="font-bold text-slate-200">{i + 1}. {item.step}:</span>
                  <span className="text-slate-400 mr-1">{item.example}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="glass-panel border-red-500/20 rounded-2xl p-6">
            <h3 className="font-black text-red-400 mb-4">خطوط حمراء — تذكّري</h3>
            <ul className="space-y-2">
              {ethicsQuick.map((line, i) => (
                <li key={i} className="text-slate-300 text-sm flex gap-2">
                  <span className="text-red-400">•</span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AttendeePage;
