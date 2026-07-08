import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { workshopSessions } from '../data/workshop';
import type { WorkshopBlock, WorkshopSession } from '../data/workshop';
import { siteContent } from '../data/content';
import { Icon } from '../components/Icons';
import SpeakerNotes from '../components/SpeakerNotes';
import Poll from '../components/Poll';
import { usePresenter } from '../context/PresenterContext';
import {
  Clock,
  Copy,
  Check,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  MonitorPlay,
  CalendarDays,
  MapPin
} from 'lucide-react';

/* ---------- تلوين حسب نوع الجلسة ---------- */
const variantAccent: Record<WorkshopSession['variant'], { badge: string; ring: string; dot: string }> = {
  registration: { badge: 'bg-slate-800 text-slate-300 border-slate-700', ring: 'border-slate-800', dot: 'bg-slate-500' },
  opening: { badge: 'bg-amber-950/50 text-amber-400 border-amber-500/25', ring: 'border-amber-500/20', dot: 'bg-amber-400' },
  session: { badge: 'bg-emerald-950/50 text-emerald-400 border-emerald-500/25', ring: 'border-emerald-500/15', dot: 'bg-emerald-400' },
  practice: { badge: 'bg-red-950/50 text-red-400 border-red-500/25', ring: 'border-red-500/20', dot: 'bg-red-400' },
  break: { badge: 'bg-sky-950/50 text-sky-400 border-sky-500/25', ring: 'border-sky-500/20', dot: 'bg-sky-400' },
  closing: { badge: 'bg-teal-950/50 text-teal-400 border-teal-500/25', ring: 'border-teal-500/20', dot: 'bg-teal-400' }
};

const calloutTones: Record<string, string> = {
  gold: 'border-amber-500/30 bg-amber-950/15 text-amber-100',
  green: 'border-emerald-500/30 bg-emerald-950/15 text-emerald-100',
  red: 'border-red-500/30 bg-red-950/15 text-red-100',
  blue: 'border-sky-500/30 bg-sky-950/15 text-sky-100'
};

const calloutTitleTones: Record<string, string> = {
  gold: 'text-amber-400',
  green: 'text-emerald-400',
  red: 'text-red-400',
  blue: 'text-sky-400'
};

const pillarColors: Record<string, { border: string; bg: string; icon: string }> = {
  emerald: { border: 'border-emerald-500/30', bg: 'bg-emerald-950/15', icon: 'text-emerald-400' },
  amber: { border: 'border-amber-500/30', bg: 'bg-amber-950/15', icon: 'text-amber-400' },
  red: { border: 'border-red-500/30', bg: 'bg-red-950/15', icon: 'text-red-400' },
  sky: { border: 'border-sky-500/30', bg: 'bg-sky-950/15', icon: 'text-sky-400' }
};

/* ---------- زر نسخ برومبت ---------- */
const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard قد لا يتوفر على http — نتجاهل بصمت
    }
  };

  return (
    <button
      onClick={copy}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
        copied
          ? 'bg-emerald-500 text-slate-950 border-emerald-500'
          : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-emerald-500/40 hover:text-emerald-400'
      }`}
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      <span>{copied ? 'تم النسخ!' : 'نسخ البرومبت'}</span>
    </button>
  );
};

/* ---------- عرض كتلة محتوى ---------- */
const BlockRenderer: React.FC<{ block: WorkshopBlock }> = ({ block }) => {
  switch (block.kind) {
    case 'points': {
      const cols = block.columns ?? 2;
      const gridClass = cols === 1 ? 'grid-cols-1' : cols === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3';
      return (
        <div className="space-y-3">
          {block.title && (
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-100 border-r-4 border-emerald-500 pr-3">
              {block.title}
            </h3>
          )}
          <div className={`grid ${gridClass} gap-3`}>
            {block.items.map((item, i) => (
              <div key={i} className="glass-panel border-slate-900 rounded-xl p-4 sm:p-5 hover:border-emerald-500/20 transition-colors">
                <div className="flex items-start gap-3">
                  {item.icon && (
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 flex-shrink-0">
                      <Icon name={item.icon} size={18} />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-bold text-slate-100 text-sm sm:text-base leading-snug">{item.title}</p>
                    {item.desc && (
                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mt-1">{item.desc}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case 'prompt':
      return (
        <div className="rounded-xl border border-emerald-500/25 bg-emerald-950/10 overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-emerald-950/30 border-b border-emerald-500/15">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 text-xs sm:text-sm font-extrabold">{block.label}</span>
              {block.tool && (
                <span className="text-[10px] sm:text-xs font-semibold text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                  {block.tool}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {block.toolUrl && (
                <a
                  href={block.toolUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-sky-500/30 bg-sky-950/20 text-sky-300 text-xs font-bold hover:border-sky-400/50 hover:text-sky-200 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>فتح الأداة</span>
                </a>
              )}
              <CopyButton text={block.text} />
            </div>
          </div>
          <p className="px-4 py-3.5 text-slate-200 text-sm sm:text-base leading-relaxed font-medium select-all" dir="rtl">
            {block.text}
          </p>
        </div>
      );

    case 'callout':
      return (
        <div className={`rounded-xl border-2 p-4 sm:p-5 ${calloutTones[block.tone]}`}>
          <p className={`font-black text-sm sm:text-base mb-1.5 ${calloutTitleTones[block.tone]}`}>
            {block.title}
          </p>
          <p className="text-sm sm:text-base leading-relaxed">{block.text}</p>
        </div>
      );

    case 'compare':
      return (
        <div className="space-y-3">
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-100 border-r-4 border-amber-500 pr-3">
            {block.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-xl border border-red-500/25 bg-red-950/10 p-4">
              <p className="text-red-400 text-xs font-black mb-2">❌ ضعيف</p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{block.bad}</p>
            </div>
            <div className="rounded-xl border border-emerald-500/25 bg-emerald-950/10 p-4">
              <p className="text-emerald-400 text-xs font-black mb-2">✅ احترافي</p>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">{block.good}</p>
            </div>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed border-r-2 border-slate-700 pr-3">
            {block.explain}
          </p>
        </div>
      );

    case 'grid':
      return (
        <div className="space-y-3">
          {block.title && (
            <h3 className="text-base sm:text-lg font-extrabold text-emerald-300 border-r-4 border-emerald-500 pr-3">
              {block.title}
            </h3>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {block.items.map((item, i) => (
              <div key={i} className="glass-panel border-slate-900 rounded-xl p-4 hover:border-emerald-500/25 transition-colors group">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-black text-slate-100 text-sm sm:text-base">{item.name}</span>
                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded">
                        {item.badge}
                      </span>
                    )}
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 hover:text-emerald-400 transition-colors"
                        title={`فتح ${item.name}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'steps':
      return (
        <div className="space-y-3">
          {block.title && (
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-100 border-r-4 border-emerald-500 pr-3">
              {block.title}
            </h3>
          )}
          <div className="space-y-2">
            {block.items.map((item, i) => (
              <div key={i} className="flex items-start gap-3 glass-panel border-slate-900 rounded-xl p-3.5 sm:p-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500 text-slate-950 font-black text-sm flex items-center justify-center">
                  {i + 1}
                </span>
                <div className="min-w-0 pt-0.5">
                  <span className="font-bold text-slate-100 text-sm sm:text-base">{item.step}</span>
                  {item.desc && (
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mt-0.5">{item.desc}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'pillars': {
      const cols = block.items.length <= 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
      return (
        <div className="space-y-3">
          {block.title && (
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-100 border-r-4 border-emerald-500 pr-3">
              {block.title}
            </h3>
          )}
          <div className={`grid ${cols} gap-3`}>
            {block.items.map((item, i) => {
              const colors = pillarColors[item.color] ?? pillarColors.emerald;
              return (
                <div
                  key={i}
                  className={`rounded-xl border-2 p-4 sm:p-5 ${colors.border} ${colors.bg} hover:scale-[1.01] transition-transform`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 ${colors.icon} flex-shrink-0`}>
                      <Icon name={item.icon} size={22} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-black text-slate-100 text-sm sm:text-base">{item.title}</p>
                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mt-1">{item.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    default:
      return null;
  }
};

/* ---------- الصفحة الرئيسية للعرض ---------- */
export const WorkshopPage: React.FC = () => {
  const { event } = siteContent;
  const { setCurrentAxisIdx, presenterMode } = usePresenter();
  const [activeId, setActiveId] = useState<string>(workshopSessions[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const activeIndex = useMemo(
    () => workshopSessions.findIndex((s) => s.id === activeId),
    [activeId]
  );

  // تتبع الجلسة الظاهرة على الشاشة
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-25% 0px -60% 0px' }
    );

    workshopSessions.forEach((s) => {
      const el = sectionRefs.current[s.id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // مزامنة شريط المدرب مع الجلسة الظاهرة
  useEffect(() => {
    const idx = workshopSessions.findIndex((s) => s.id === activeId);
    if (idx >= 0) setCurrentAxisIdx(idx);
  }, [activeId, setCurrentAxisIdx]);

  const scrollTo = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const goPrev = () => {
    if (activeIndex > 0) {
      const idx = activeIndex - 1;
      setCurrentAxisIdx(idx);
      scrollTo(workshopSessions[idx].id);
    }
  };
  const goNext = () => {
    if (activeIndex < workshopSessions.length - 1) {
      const idx = activeIndex + 1;
      setCurrentAxisIdx(idx);
      scrollTo(workshopSessions[idx].id);
    }
  };

  const progressPct = useMemo(
    () => Math.round(((activeIndex + 1) / workshopSessions.length) * 100),
    [activeIndex]
  );

  // اختصارات لوحة المفاتيح: ← السابق · → التالي
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (activeIndex > 0) {
          const idx = activeIndex - 1;
          setCurrentAxisIdx(idx);
          scrollTo(workshopSessions[idx].id);
        }
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (activeIndex < workshopSessions.length - 1) {
          const idx = activeIndex + 1;
          setCurrentAxisIdx(idx);
          scrollTo(workshopSessions[idx].id);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex]);

  return (
    <div className="relative pt-20">
      {/* شريط التقدم */}
      <div className="fixed top-[72px] left-0 right-0 z-40 h-1 bg-slate-900">
        <div
          className="h-full bg-gradient-to-l from-emerald-500 to-teal-400 transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div>
      {/* ترويسة الصفحة */}
      <section className="relative py-12 bg-slate-950 overflow-hidden border-b border-slate-900/60">
        <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.03] z-0"></div>
        <div className="absolute top-1/2 left-[-10%] w-[300px] h-[300px] glow-green opacity-10 blur-[120px] z-0"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
            <MonitorPlay className="w-3.5 h-3.5" />
            <span>عرض الندوة — المادة الكاملة للتقديم</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-100 leading-snug">
            {event.workshopTitle}
          </h1>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-slate-400 text-xs sm:text-sm font-semibold">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4 text-red-400" />
              {event.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              {event.schedule}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-400" />
              {event.location}
            </span>
          </div>
        </div>
      </section>

      {/* المحتوى: شريط جانبي + جلسات */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-8">
          {/* الشريط الجانبي — سطح المكتب */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-1.5 max-h-[calc(100vh-120px)] overflow-y-auto pl-1">
              <p className="text-slate-500 text-[11px] font-black uppercase tracking-wide px-2 pb-1">
                جدول الجلسات
              </p>
              {workshopSessions.map((s, i) => {
                const accent = variantAccent[s.variant];
                const isActive = s.id === activeId;
                return (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className={`w-full text-right px-3 py-2.5 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-emerald-950/30 border-emerald-500/40'
                        : 'bg-transparent border-transparent hover:bg-slate-900/60 hover:border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${accent.dot} ${isActive ? '' : 'opacity-40'}`}></span>
                      <div className="min-w-0">
                        <p className={`text-xs font-bold leading-snug truncate ${isActive ? 'text-emerald-300' : 'text-slate-300'}`}>
                          {i}. {s.navTitle}
                        </p>
                        <p className="text-[10px] text-slate-500 font-mono mt-0.5">{s.time}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* الجلسات */}
          <div className="flex-1 min-w-0 space-y-14">
            {workshopSessions.map((session, idx) => {
              const accent = variantAccent[session.variant];
              return (
                <section
                  key={session.id}
                  id={session.id}
                  ref={(el) => { sectionRefs.current[session.id] = el; }}
                  className="scroll-mt-24"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5 }}
                    className={`glass-panel rounded-3xl border ${accent.ring} overflow-hidden`}
                  >
                    {/* ترويسة الجلسة */}
                    <div className="px-6 sm:px-8 pt-6 sm:pt-7 pb-5 border-b border-slate-900/80 bg-slate-950/40">
                      <div className="flex flex-wrap items-center gap-2.5 mb-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-black font-mono ${accent.badge}`}>
                          <Clock className="w-3.5 h-3.5" />
                          {session.time}
                        </span>
                        {session.duration && (
                          <span className="text-xs text-slate-500 font-bold">({session.duration})</span>
                        )}
                        <span className="text-xs text-slate-600 font-bold">جلسة {idx} / {workshopSessions.length - 1}</span>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-emerald-400 flex-shrink-0">
                          <Icon name={session.iconName} size={26} />
                        </div>
                        <div className="min-w-0">
                          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-100 leading-snug">
                            {session.title}
                          </h2>
                          {session.subtitle && (
                            <p className="text-slate-400 text-sm sm:text-base mt-1.5 leading-relaxed">
                              {session.subtitle}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* كتل المحتوى */}
                    <div className="px-6 sm:px-8 py-6 sm:py-7 space-y-6">
                      {session.blocks.map((block, i) => (
                        <BlockRenderer key={i} block={block} />
                      ))}

                      {/* استفتاء تفاعلي — جلسة المقدمة */}
                      {session.id === 'intro' && (
                        <div className="rounded-2xl border border-slate-800 overflow-hidden">
                          <Poll compact />
                        </div>
                      )}

                      {/* ملاحظات المدرب — تظهر فقط في وضع العارض */}
                      {session.notes && (
                        <SpeakerNotes
                          whatToSay={session.notes.whatToSay}
                          questionsToAsk={session.notes.questionsToAsk}
                          liveExample={session.notes.liveExample}
                          nextAxis={session.notes.nextAxis}
                        />
                      )}
                    </div>
                  </motion.div>
                </section>
              );
            })}

            {/* روابط ما بعد العرض */}
            <div className="glass-panel border-emerald-500/20 rounded-3xl p-6 sm:p-8 text-center space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-100">موارد إضافية للمتعمقات</h2>
              <p className="text-slate-400 text-sm sm:text-base">
                كل ما عُرض اليوم — وأكثر — متاح بشكل دائم في صفحات الموقع:
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/attendee" className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-sm transition-colors">
                  📱 بوابة المشاركة
                </Link>
                <Link to="/evaluation" className="px-5 py-2.5 bg-amber-500/90 hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-sm transition-colors">
                  استبانة التقييم
                </Link>
                <Link to="/cheatsheet" className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold rounded-xl text-sm transition-colors">
                  ورقة الغش (طباعة)
                </Link>
                <Link to="/sandbox" className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold rounded-xl text-sm transition-colors">
                  مختبر التوليد والأدوات
                </Link>
                <Link to="/how-to-prompt" className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold rounded-xl text-sm transition-colors">
                  كيف أحاور الـ AI؟
                </Link>
                <Link to="/guide" className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold rounded-xl text-sm transition-colors">
                  دليل المعلمة الكامل
                </Link>
                <Link to="/union" className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold rounded-xl text-sm transition-colors">
                  البوابة النقابية
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* أزرار التنقل السريع بين الجلسات */}
      {!presenterMode && (
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-2">
        <button
          onClick={goPrev}
          disabled={activeIndex <= 0}
          className="p-3 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 disabled:opacity-30 disabled:cursor-default cursor-pointer transition-all shadow-lg"
          title="الجلسة السابقة"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
        <button
          onClick={goNext}
          disabled={activeIndex >= workshopSessions.length - 1}
          className="p-3 rounded-full bg-emerald-500 text-slate-950 hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-default cursor-pointer transition-all shadow-lg shadow-emerald-500/20"
          title="الجلسة التالية"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
      )}

      {/* شريط الجلسة الحالية — موبايل */}
      {!presenterMode && (
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-slate-950/95 backdrop-blur-md border-t border-slate-900 px-4 py-2.5">
        <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
          <span className="text-emerald-400 text-xs font-black truncate">
            {workshopSessions[activeIndex]?.navTitle}
          </span>
          <span className="text-slate-500 text-[11px] font-mono flex-shrink-0">
            {workshopSessions[activeIndex]?.time}
          </span>
        </div>
      </div>
      )}
    </div>
  );
};

export default WorkshopPage;
