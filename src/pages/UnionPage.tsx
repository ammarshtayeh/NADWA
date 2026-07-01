import React from 'react';
import UnionAI from '../sections/UnionAI';
import { Shield } from 'lucide-react';
import SpeakerNotes from '../components/SpeakerNotes';

export const UnionPage: React.FC = () => {
  return (
    <div className="relative pt-20">
      {/* Visual Page Header */}
      <section className="relative py-16 bg-slate-950 overflow-hidden border-b border-slate-900/60">
        <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.03] z-0"></div>
        <div className="absolute top-1/2 left-[-10%] w-[300px] h-[300px] glow-red opacity-5 blur-[120px] z-0"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/20 text-red-400 text-xs font-bold">
            <Shield className="w-3.5 h-3.5" />
            <span>التمكين النقابي والتنظيمي</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100">
            الذكاء الاصطناعي في خدمة العمل النقابي
          </h1>
          <p className="max-w-xl mx-auto text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed">
            استكشفي أحدث أساليب تفعيل التكنولوجيا في الدفاع عن حقوق المعلمات، وتحليل الشكاوى والاستبيانات، وبناء المساعد الذكي الخاص بنقابتكِ.
          </p>
        </div>
      </section>

      {/* Union AI Panel */}
      <UnionAI />

      {/* Speaker Notes HUD */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <SpeakerNotes
          whatToSay="العمل النقابي يتطلب صياغة خطابات رسمية دقيقة، بيانات صحفية، وتلخيص اجتماعات. هذه اللوحة التفاعلية توفر القوالب النقابية الجاهزة المفرغة مع نصوص قانون العمل الفلسطيني لدعم حقوق المعلمات وحماية عقودهن المادية والخدمية."
          questionsToAsk="كيف نضمن موثوقية الخطابات وصحة الحقوق القانونية الواردة فيها؟"
          liveExample="توليد بيان نقابي رسمي بخصوص تطبيق الحد الأدنى للأجور في رياض الأطفال الخاصة."
          nextAxis="سنتحدث الآن عن المحور الخامس: كيف نصنع أناشيد ملحنة ورسومات وطنية ممتازة لأطفالنا (رياض الأطفال)."
        />
      </div>
    </div>
  );
};

export default UnionPage;
