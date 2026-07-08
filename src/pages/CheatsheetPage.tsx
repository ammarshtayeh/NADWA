import React from 'react';
import { Link } from 'react-router-dom';
import { siteContent } from '../data/content';
import { promptRecipe, ethicsQuick, quickTools, attendeeTracks } from '../data/attendee';
import { Printer, ArrowRight } from 'lucide-react';

/** برومبتات مختصرة لكل مسار — للطباعة */
const cheatsheetPrompts = {
  school: [
    'صمم خطة درس تفاعلية عن [الموضوع] للصف [الصف]: تمهيد، نشاط حركي، 3 أسئلة فهم.',
    'صمم اختباراً 15 دقيقة: 3 صح/خطأ، 3 اختيار، سؤال تعليل — مع الإجابة.',
    'صمم ورقة عمل عربية للصف [الصف] عن [الموضوع] مع جدول تفاعلي.'
  ],
  kg: [
    'قصة تربوية لأطفال 5 سنوات في [مكان فلسطيني] عن [قيمة] + 3 أسئلة + نشاط تمثيلي.',
    'لقاء صباحي 20 دقيقة عن [الموضوع]: ترحيب حركي، قصة، لعبة هادئة.',
    'رسالة واتساب قصيرة لأولياء الأمور عن نشاط منزلي بدون أجهزة.'
  ],
  union: [
    'لخص ملاحظات اجتماع النقابة في محضر رسمي: قرارات، مهام، مواعيد.',
    'حلل شكاوى المعلمات وحدد أهم 3 مشكلات مع حلول نقابية.',
    'صغ بياناً رسمياً يطالب بـ [المطلب] موجهاً إلى [الجهة] — 3 فقرات.'
  ]
};

export const CheatsheetPage: React.FC = () => {
  const { event } = siteContent;

  const handlePrint = () => window.print();

  return (
    <>
      {/* شريط طباعة — يختفي عند الطباعة */}
      <div className="print:hidden relative pt-20">
        <div className="max-w-3xl mx-auto px-4 py-8 flex flex-wrap gap-3 justify-between items-center">
          <Link to="/attendee" className="text-emerald-400 text-sm font-bold flex items-center gap-1 hover:text-emerald-300">
            <ArrowRight className="w-4 h-4" />
            العودة لبوابة المشاركة
          </Link>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-slate-950 font-bold rounded-xl cursor-pointer hover:bg-emerald-600"
          >
            <Printer className="w-5 h-5" />
            طباعة / حفظ PDF
          </button>
        </div>
      </div>

      {/* محتوى الطباعة */}
      <article className="cheatsheet-print max-w-[210mm] mx-auto px-6 py-8 print:px-8 print:py-6 bg-white text-slate-900 print:bg-white">
        <header className="border-b-2 border-emerald-600 pb-4 mb-6">
          <p className="text-xs text-slate-600">{event.programName} · {event.date}</p>
          <h1 className="text-2xl font-black text-slate-900 mt-1">ورقة الغش — الذكاء الاصطناعي للمعلمات</h1>
          <p className="text-sm text-slate-600 mt-1">مدارس · رياض أطفال · نقابة — {event.location}</p>
          <p className="text-xs text-emerald-700 font-bold mt-2">المدرب: عمار اشتية · nadwa.vercel.app</p>
        </header>

        <section className="mb-6">
          <h2 className="text-lg font-black text-emerald-800 mb-3">{promptRecipe.title}</h2>
          <table className="w-full text-sm border-collapse">
            <tbody>
              {promptRecipe.items.map((item, i) => (
                <tr key={i} className="border-b border-slate-200">
                  <td className="py-2 pl-2 font-bold w-24">{item.step}</td>
                  <td className="py-2 text-slate-700">{item.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {attendeeTracks.map((track) => (
          <section key={track.id} className="mb-6 break-inside-avoid">
            <h2 className="text-base font-black text-slate-900 mb-2">
              {track.emoji} {track.label}
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-sm text-slate-800 leading-relaxed">
              {cheatsheetPrompts[track.id].map((p, i) => (
                <li key={i} className="pl-1">{p}</li>
              ))}
            </ol>
          </section>
        ))}

        <section className="mb-6">
          <h2 className="text-base font-black text-red-800 mb-2">⚠️ خطوط حمراء</h2>
          <ul className="text-sm space-y-1 text-slate-800">
            {ethicsQuick.map((line, i) => (
              <li key={i}>• {line}</li>
            ))}
          </ul>
        </section>

        <section className="mb-4">
          <h2 className="text-base font-black text-slate-900 mb-2">🛠️ أدوات (مجانية للبداية)</h2>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {quickTools.slice(0, 6).map((t) => (
              <div key={t.name} className="border border-slate-200 rounded p-2">
                <span className="font-bold">{t.name}</span>
                <span className="text-slate-600 block">{t.use}</span>
              </div>
            ))}
          </div>
        </section>

        <footer className="border-t border-slate-300 pt-4 text-center text-xs text-slate-500">
          <p>الذكاء الاصطناعي يكتب المسودة — أنتِ بتوقّعي على النسخة النهائية.</p>
          <p className="mt-1">امسحي QR الموقع للبرومبتات الكاملة والتحدي اليومي.</p>
        </footer>
      </article>

      <style>{`
        @media print {
          body { background: white !important; }
          nav, footer, .print\\:hidden { display: none !important; }
          .cheatsheet-print { max-width: 100%; }
        }
      `}</style>
    </>
  );
};

export default CheatsheetPage;
