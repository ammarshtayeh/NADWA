/** محتوى مخصص للمشاركات في الورشة — مرجع سريع بعد التدريب */

export type AttendeeTrack = 'school' | 'kg' | 'union';

export interface TrackInfo {
  id: AttendeeTrack;
  label: string;
  emoji: string;
  desc: string;
  categories: string[];
  color: string;
}

export const attendeeTracks: TrackInfo[] = [
  {
    id: 'school',
    label: 'معلمة مدرسة',
    emoji: '🎓',
    desc: 'دروس، اختبارات، عروض، أوراق عمل — أساسي وثانوي',
    categories: ['education', 'exams', 'activities', 'presentations'],
    color: 'emerald'
  },
  {
    id: 'kg',
    label: 'معلمة رياض أطفال',
    emoji: '🧸',
    desc: 'قصص، لقاء صباحي، أنشطة حركية، أناشيد، رسائل أهالي',
    categories: ['kg', 'images', 'activities'],
    color: 'amber'
  },
  {
    id: 'union',
    label: 'عضوة نقابة',
    emoji: '📋',
    desc: 'محاضر، بيانات، تعاميم، تحليل شكاوى، حملات',
    categories: ['union', 'social'],
    color: 'red'
  }
];

export const promptRecipe = {
  title: 'وصفة البرومبت — 5 عناصر',
  items: [
    { step: 'الدور', example: '«أنتِ معلمة فلسطينية خبيرة»' },
    { step: 'المهمة', example: '«صممي خطة درس» أو «صوغي محضر»' },
    { step: 'السياق', example: '«الصف السابع — علوم» أو «اجتماع نقابة نابلس»' },
    { step: 'القيود', example: '«15 دقيقة — عربي مبسّط — بدون أجهزة»' },
    { step: 'المخرجات', example: '«جدول + أسئلة» أو «محضر بالقرارات»' }
  ]
};

export const ethicsQuick = [
  'لا أسماء أطفال ولا صورهم ولا علاماتهم',
  'لا معلومات نقابية سرية في أدوات عامة',
  'راجعي كل مخرج قبل الاعتماد — AI بيغلط',
  'المسودة من AI — التوقيع النهائي بشري'
];

export const quickTools = [
  { name: 'ChatGPT', url: 'https://chatgpt.com', use: 'دروس، قصص، أسئلة' },
  { name: 'Claude', url: 'https://claude.ai', use: 'خطابات، محاضر، بيانات' },
  { name: 'Gemini', url: 'https://gemini.google.com', use: 'بحث، PDF، معلومات حديثة' },
  { name: 'Canva', url: 'https://www.canva.com', use: 'تصميم، بطاقات، بوسترات' },
  { name: 'Gamma', url: 'https://gamma.app', use: 'عروض PowerPoint' },
  { name: 'MagicSchool', url: 'https://www.magicschool.ai', use: 'اختبارات، أوراق عمل' },
  { name: 'Suno', url: 'https://suno.com', use: 'أناشيد للأطفال' },
  { name: 'NotebookLM', url: 'https://notebooklm.google', use: 'تلخيص كتاب مدرسي' }
];

export const sevenDayPlan = [
  { day: 'اليوم 1', task: 'انسخي برومبت واحد من بوابة المشاركة وجربيه على ChatGPT — 10 دقائق فقط.' },
  { day: 'اليوم 2', task: 'حضّري تمهيداً لدرس أو قصة قصيرة للروضة بمساعدة AI وراجعيه بنفسك.' },
  { day: 'اليوم 3', task: 'جرّبي Claude لصياغة رسالة أو تعميم (حتى لو مسودة شخصية).' },
  { day: 'اليوم 4', task: 'صممي ورقة عمل أو 5 أسئلة اختبار — MagicSchool أو ChatGPT.' },
  { day: 'اليوم 5', task: 'افتحي Canva أو Gamma — أنشئي بطاقة أو 3 شرائح عرض.' },
  { day: 'اليوم 6', task: 'شاركي زميلة واحدة: أرسلي لها برومпт نجح معك + النتيجة.' },
  { day: 'اليوم 7', task: 'خططي أسبوعك القادم: 3 مهام راح تعمليها بالـ AI (درس، نشاط، أو نقابة).' }
];

export const TRACK_STORAGE_KEY = 'nadwa_attendee_track';
export const FAVORITES_STORAGE_KEY = 'nadwa_saved_prompts';
export const SEVEN_DAY_STORAGE_KEY = 'nadwa_seven_day';
