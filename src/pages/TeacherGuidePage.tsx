import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BookOpen, Copy, Check, ChevronDown, ChevronUp,
  Zap, Star, ArrowLeft, MessageSquare,
  Lightbulb, Shield, Target, Clock,
  Brain, Wand2, Globe
} from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const sections = [
  {
    id: 'start',
    icon: <Zap className="w-6 h-6 text-emerald-400" />,
    color: 'emerald',
    title: 'كيف تبدأي الآن — الخطوات الأولى',
    subtitle: 'ابدأي من هنا مباشرة بعد الدورة',
    items: [
      {
        title: 'الخطوة الأولى: افتحي ChatGPT أو Gemini',
        body: `اذهبي إلى chat.openai.com أو gemini.google.com وأنشئي حساباً مجانياً إذا لم يكن لديكِ. اختاري اللغة العربية إن أمكن. في المرة الأولى، تدرّبي بهذا الأمر البسيط:

"أنا معلمة مادة [اسم المادة] للصف [رقم الصف]. ساعديني في شرح مفهوم [اسم المفهوم] بأسلوب بسيط يناسب عمر الطلاب."

لا تخافي من الأخطاء — الذكاء الاصطناعي يتقبل الحوار ويتكيف مع احتياجكِ.`
      },
      {
        title: 'الخطوة الثانية: جرّبي أداة واحدة فقط هذا الأسبوع',
        body: `لا تفتحي 10 أدوات في يوم واحد. اختاري أداة واحدة وركّزي عليها:
• ChatGPT: لكتابة الشرح والمراجعة وبناء الأسئلة
• Canva: لتصميم النشرات والبطاقات الصفية
• Kahoot: لبناء اختبارات تفاعلية ممتعة
• Google Gemini: للتكامل مع Google Docs والشيتات

بعد أسبوع ستشعرين بالراحة وتنتقلين للتالية.`
      },
      {
        title: 'الخطوة الثالثة: خصصي 15 دقيقة يومياً للتجريب',
        body: `أفضل وقت هو بعد انتهاء الدوام مباشرة أو قبل التحضير لليوم التالي. في 15 دقيقة يمكنكِ:
• توليد 5 أسئلة اختبار بنقرة واحدة
• تحويل نص طويل إلى نقاط مبسطة
• كتابة رسالة لأولياء الأمور بأسلوب احترافي
• إنشاء نشاط تعليمي تفاعلي للغد

الاستمرارية أهم من المدة.`
      },
      {
        title: 'الخطوة الرابعة: وثّقي تجاربكِ في دفتر ذكي',
        body: `أنشئي ملف Notion أو Google Doc بعنوان "أوامري التي نجحت" وضعي فيه:
— الأمر الذي استخدمتيه
— النتيجة التي حصلتِ عليها
— هل تحتاج تعديلاً؟

ستبنين خلال شهر مكتبة شخصية من أفضل الأوامر لمادتكِ تحديداً.`
      }
    ]
  },
  {
    id: 'chemistry',
    icon: <Wand2 className="w-6 h-6 text-violet-400" />,
    color: 'violet',
    title: 'كيمياء الصياغة — فن الأوامر الذهبية',
    subtitle: 'الفرق بين سؤال عادي ونتيجة مذهلة',
    items: [
      {
        title: 'المعادلة الذهبية للأمر المثالي',
        body: `كل أمر ناجح يحتوي على 4 عناصر:

🎯 الدور — من أنتِ؟
"أنا معلمة لغة عربية في المرحلة الإعدادية..."

📍 السياق — ما الوضع؟
"...أحضّر لدرس عن الفعل المضارع للصف الثامن..."

✅ المهمة — ماذا تريدين؟
"...أريد 5 أنشطة تفاعلية قصيرة تناسب 40 دقيقة..."

🔒 القيد — ما الحدود؟
"...بدون إنترنت، باللغة العربية الفصحى المبسطة."

احفظي هذه المعادلة: دور + سياق + مهمة + قيد`
      },
      {
        title: 'من الضعيف إلى الذهبي — أمثلة فعلية',
        body: `❌ ضعيف: "اعملي اختباراً في الرياضيات"
✅ ذهبي: "أنا معلمة رياضيات صف تاسع. اعملي اختباراً في الكسور العشرية يناسب 45 دقيقة، يشمل: 5 أسئلة اختيار من متعدد، 3 مسائل حل، وسؤال تفكير ناقد. المستوى: متوسط."

❌ ضعيف: "اشرحي الكلمة العروضية"
✅ ذهبي: "اشرحي مفهوم الكلمة العروضية بأسلوب قصة قصيرة مشوّقة يفهمها طالب في الصف العاشر، ثم أعطيني 3 أمثلة من القرآن الكريم."

❌ ضعيف: "اكتبي رسالة لولي الأمر"
✅ ذهبي: "اكتبي رسالة رسمية لطيفة لولي أمر طالب ضعيف في القراءة لتدعوه لاجتماع. اللهجة: محترمة ومشجعة، 3 فقرات، تبدأ بتقدير الوالد."`
      },
      {
        title: 'أوامر التكرار والتحسين',
        body: `بعد أن تحصلي على رد، لا تقفي عند أول إجابة — استمري في الحوار:

"اجعليه أبسط" — تبسيط المستوى
"اجعليه أكثر تفصيلاً" — توسيع الإجابة
"بدّلي المثال الثالث بمثال من الحياة اليومية"
"حوّلي هذا النص إلى جدول"
"أضيفي أسئلة تفكير ناقد في النهاية"
"ترجمي هذه الفقرة للطلاب الأصغر سناً"
"اجعلي النبرة أكثر تحميساً وإيجابية"

الذكاء الاصطناعي يتذكر المحادثة السابقة — استخدمي هذا لصالحكِ!`
      },
      {
        title: 'أسرار الصياغة التي لا يعرفها أحد',
        body: `🔥 السر الأول: حدّدي الشكل المطلوب
"...أريد الإجابة كـ: جدول / نقاط مرقّمة / فقرات قصيرة / خطوات / بطاقات"

🔥 السر الثاني: أعطيها مثالاً
"...مثلاً كأن تكتبي: [مثال]، ثم واصلي بنفس الأسلوب"

🔥 السر الثالث: احددي الجمهور المستهدف
"...للطلاب ذوي صعوبات التعلم / للمتفوقين / لأولياء الأمور المتعلمين"

🔥 السر الرابع: اطلبي عدة خيارات
"...أعطيني 3 خيارات مختلفة وأنا سأختار الأنسب"

🔥 السر الخامس: اطلبي التقييم
"...بعد كتابة الأسئلة، قيّمي كلاً منها: سهل/متوسط/صعب"`
      }
    ]
  },
  {
    id: 'usecases',
    icon: <Target className="w-6 h-6 text-blue-400" />,
    color: 'blue',
    title: 'تطبيقات يومية — اصنعيها الآن',
    subtitle: 'أكثر من 20 حالة استخدام جاهزة للتطبيق الفوري',
    items: [
      {
        title: '📝 تحضير الدروس والمحتوى',
        body: `جرّبي هذه الأوامر الجاهزة مباشرة:

① خطة درس كاملة:
"اعملي خطة درس لمادة [المادة] الصف [الصف] عن [الموضوع] مدة 45 دقيقة. تشمل: الأهداف، التهيئة، العرض، التطبيق، التقويم."

② شرح مبسط:
"اشرحي [المفهوم] بأسلوب قصة واحدة ممتعة مناسبة لعمر [X] سنوات"

③ أنشطة متنوعة:
"أعطيني 5 أنشطة متنوعة (بصري/سمعي/حركي) لتعليم [الموضوع]"

④ أمثلة من الواقع:
"أعطيني 10 أمثلة من الحياة اليومية الفلسطينية توضح [المفهوم]"`
      },
      {
        title: '📊 الاختبارات والتقييم',
        body: `① اختبار جاهز للطباعة:
"اصنعي اختباراً في [المادة] للصف [X] عن [الوحدة]. 10 أسئلة: 4 اختيار متعدد، 3 صح/خطأ، 2 كمل الجملة، 1 تفكير ناقد. مع الإجابات في صفحة منفصلة."

② بنك أسئلة:
"أنشئي بنك من 20 سؤالاً عن [الموضوع] مصنفة حسب مستوى بلوم: تذكر، فهم، تطبيق، تحليل"

③ تقييم مشروع:
"صمّمي نموذج تقييم (روبريك) لمشروع [وصف المشروع] بمعايير واضحة ودرجات 1-4"

④ أسئلة تحفيزية:
"أعطيني 10 أسئلة تفتح أذهان الطلاب وتثير فضولهم عن [الموضوع]"`
      },
      {
        title: '✉️ التواصل مع الأهل والإدارة',
        body: `① رسالة لولي الأمر:
"اكتبي رسالة رسمية ومحترمة لولي أمر طالب [وصف الموقف: غياب متكرر/ضعف أكاديمي/سلوك إيجابي] لدعوته لاجتماع. اللهجة دافئة ومشجعة."

② تقرير أداء طالب:
"اكتبي تقرير أداء نصف فصل لطالب [وصف مستوى الطالب]. يشمل: نقاط القوة، جوانب التطوير، التوصية التربوية."

③ إعلان مدرسي:
"اكتبي إعلاناً مشوّقاً لنشاط [اسم النشاط] للصق على لوحة الإعلانات. الجمهور: طلاب المرحلة [X]"

④ محاضر الاجتماع:
"نظّمي هذه الملاحظات في محضر اجتماع رسمي: [الصق ملاحظاتكِ]"`
      },
      {
        title: '🎨 المحتوى البصري والإبداعي',
        body: `① نشرة تعليمية بـ Canva:
اذهبي لـ Canva، ابحثي عن "educational poster"، اختاري قالباً، وعدّلي النص فقط.

② مخطط مفاهيمي بـ Napkin:
الصقي نص درسكِ في napkin.ai وستحوّله لمخطط بصري جميل.

③ اختبار تفاعلي بـ Kahoot:
أنشئي أسئلة في ChatGPT ثم أدخليها يدوياً في Kahoot.

④ صورة تعليمية بـ Ideogram:
"اصنع رسم توضيحي يصلح كبطاقة تعليمية عن [الموضوع] بنص عربي واضح، بألوان زاهية، أسلوب كارتون"

⑤ عرض تلقائي بـ Gamma:
اكتبي العنوان الرئيسي وانقري "Generate" وستحصلين على عرض PowerPoint جاهز.`
      },
      {
        title: '🏛️ توظيف الذكاء الاصطناعي في النقابة',
        body: `① محضر اجتماع نقابي:
"نظّمي هذه الملاحظات في محضر رسمي لاجتماع لجنة [اسم اللجنة]. يشمل: المحاور، القرارات، المسؤولين، المواعيد."

② مقترح أو ورقة موقف:
"اكتبي ورقة موقف رسمية تطالب بـ [المطلب]. الأسلوب: قانوني ومنظم. 3 حجج داعمة + التوصية."

③ تقرير دوري للجنة:
"اكتبي تقريراً دورياً لنشاطات لجنة [اسم اللجنة] خلال [الفترة]. يشمل: الإنجازات، التحديات، الخطة القادمة."

④ تواصل مع الأعضاء:
"اكتبي رسالة إلكترونية لجميع أعضاء النقابة تدعوهم لـ [النشاط] بأسلوب رسمي ومحفّز."`
      }
    ]
  },
  {
    id: 'tools',
    icon: <Brain className="w-6 h-6 text-amber-400" />,
    color: 'amber',
    title: 'دليل الأدوات — الموصى بها للمعلمات',
    subtitle: 'دليل سريع لأهم الأدوات وكيفية استخدامها',
    items: [
      {
        title: 'ChatGPT — المساعد الشامل',
        body: `الرابط: chat.openai.com | مجاني
أفضل استخداماته:
✓ كتابة وتحسين كل أنواع النصوص
✓ توليد أسئلة اختبارات ومراجعات
✓ شرح المفاهيم الصعبة بأساليب متعددة
✓ ترجمة وتبسيط النصوص
✓ كتابة البريد الإلكتروني الرسمي

نصيحة: استخدمي نسخة GPT-4o المجانية كافية لمعظم الاحتياجات التعليمية.`
      },
      {
        title: 'Google Gemini — الأذكى مع العربية',
        body: `الرابط: gemini.google.com | مجاني
أفضل استخداماته:
✓ التكامل مع Google Docs وSheets
✓ تلخيص ملفات PDF بالسحب والإلقاء
✓ تحليل الجداول والبيانات
✓ الإجابة على الأسئلة العامة
✓ البحث الموثوق مع المصادر

نصيحة: يفهم اللهجات العربية وليس الفصحى فقط — جربيه.`
      },
      {
        title: 'Canva — التصميم الاحترافي بدون خبرة',
        body: `الرابط: canva.com | مجاني/Pro
ماذا تصنعين؟
✓ نشرات أولياء الأمور
✓ بطاقات تعليمية ملوّنة
✓ عروض PowerPoint جميلة
✓ ملصقات وإعلانات الفصل
✓ شهادات تقدير للطلاب
✓ قوائم المهام والبرامج

ابحثي دائماً عن: "education poster arabic" أو "classroom arabic"`
      },
      {
        title: 'MagicSchool AI — أدوات المعلمة المتخصصة',
        body: `الرابط: magicschool.ai | مجاني
60+ أداة خصيصاً للمعلمين منها:
✓ Lesson Plan Generator — خطة درس كاملة
✓ Quiz Generator — اختبارات جاهزة
✓ Report Card Comments — تعليقات التقارير
✓ Rubric Generator — نماذج التقييم
✓ Parent Email Writer — رسائل الأهل
✓ Differentiation Helper — تكييف للمستويات
✓ IEP Generator — خطة تعليمية فردية
✓ Text Leveler — تبسيط النصوص`
      },
      {
        title: 'Kahoot! وQuizlet — التفاعل والمراجعة',
        body: `Kahoot: kahoot.com — للمراجعة التفاعلية
• أنشئي لعبة بـ 10 أسئلة في 5 دقائق
• يلعب الطلاب بهواتفهم أو أجهزتهم
• احتفظي بأرقام الجلسة لإعادة الاستخدام

Quizlet: quizlet.com — للحفظ والاستذكار
• بطاقات flashcards للمصطلحات
• AI يولد الأسئلة من النص
• يتابع تقدم الطالب تلقائياً

Gimkit وWordwall أيضاً مشابهة ومجانية.`
      },
      {
        title: 'Napkin AI وGamma — المحتوى البصري',
        body: `Napkin: napkin.ai — مخططات من النص
• الصقي أي نص → ستولّد مخططات بصرية
• مثالي لخرائط المفاهيم والتسلسل الزمني
• تصديرها كصورة أو PDF جاهزة

Gamma: gamma.app — عروض من الكتابة
• اكتبي الموضوع → عرض PowerPoint كامل
• تصميمات احترافية جاهزة
• يمكن تعديل كل شيء بعد التوليد

Ideogram: ideogram.ai — صور عربية
• الأفضل لتوليد صور تحتوي نصاً عربياً
• مجاني 10 صور/يوم`
      }
    ]
  },
  {
    id: 'ethics',
    icon: <Shield className="w-6 h-6 text-red-400" />,
    color: 'red',
    title: 'الحدود والأخلاقيات — ما يجب أن تعرفيه',
    subtitle: 'استخدام آمن ومسؤول للذكاء الاصطناعي',
    items: [
      {
        title: 'متى تثقين بالذكاء الاصطناعي؟',
        body: `✅ ثقي به في:
• الصياغة والتحرير والترجمة
• توليد الأفكار والخيارات
• التلخيص والشرح المبسط
• الأسئلة العامة الموثوقة
• التصميم والتنسيق

⚠️ تحققي دائماً في:
• الأرقام والإحصائيات والتواريخ
• أسماء الأشخاص والمراجع
• المعلومات الطبية أو القانونية
• الفتاوى والمسائل الدينية
• أي معلومة تبدو غريبة أو غير متوقعة

قاعدة ذهبية: الذكاء الاصطناعي مساعد ذكي — أنتِ المعلمة والمقرِّرة.`
      },
      {
        title: 'حماية خصوصية الطلاب والبيانات',
        body: `🔒 قواعد أساسية للحماية:

① لا تُدخلي أسماء طلاب حقيقية في أي أداة ذكاء اصطناعي
② استبدلي الاسم بـ "الطالب أ" أو "طالب صف ثامن"
③ لا تشاركي صور الطلاب لتوليد المحتوى
④ لا تُدخلي أرقام هواتف أولياء الأمور
⑤ استخدمي الحسابات المدرسية لا الشخصية للبيانات الرسمية

قاعدة: ما لا تريدين أن يظهر على الإنترنت، لا تضعيه في أداة ذكاء اصطناعي.`
      },
      {
        title: 'الأمانة الأكاديمية مع الطلاب',
        body: `كيف تتعاملين مع احتمال استخدام الطالب للذكاء الاصطناعي؟

بدلاً من المنع التام:
✓ علّمي الطلاب الاستخدام الأمين الصريح
✓ صمّمي مهام تعتمد على التجربة الشخصية
✓ أضيفي سؤال تفكير ناقد شخصياً: "لماذا تعتقد ذلك؟"
✓ اطلبي مسوّدة خطوط أولى بخط اليد
✓ استخدمي الأدوات التفاعلية الصفية لا الواجبات المنزلية

المعلمة التي تعرف الذكاء الاصطناعي هي من تصنع أسئلة لا يمكن إجابتها بشكل آلي.`
      },
      {
        title: 'التوازن الصحي — الذكاء البشري أولاً',
        body: `تذكّري دائماً:

🧠 ذكاؤكِ البشري لا يُعوَّض:
• العلاقة الإنسانية مع الطالب
• الحدس التربوي وقراءة المشاعر
• الإبداع الحقيقي والرؤية الشخصية
• الخبرة الميدانية في الفصل

🤖 الذكاء الاصطناعي يوفّر وقتكِ لـ:
• التفاعل الأعمق مع الطلاب
• التطوير المهني والتأمل التربوي
• الإبداع في التصميم التعليمي
• الاهتمام الفردي بالطلاب المحتاجين

الهدف: وقت أكثر مع الطلاب، ورق وإجراءات أقل.`
      }
    ]
  },
  {
    id: 'weekly',
    icon: <Clock className="w-6 h-6 text-sky-400" />,
    color: 'sky',
    title: 'خطة الأسبوعين الأولين — ابدأي هنا',
    subtitle: 'خطة عملية يوم بيوم لبداية قوية',
    items: [
      {
        title: 'الأسبوع الأول — الاستكشاف',
        body: `اليوم ١: افتحي ChatGPT واطلبي شرح مفهوم من درسكِ القادم
اليوم ٢: اطلبي 10 أسئلة اختبار عن نفس الموضوع
اليوم ٣: جرّبي Gemini وقارني الفرق في الأسلوب
اليوم ٤: افتحي Canva وصمّمي بطاقة تعليمية واحدة
اليوم ٥: اطلبي من ChatGPT كتابة رسالة لولي أمر

هدف الأسبوع: تحسّسي أن هذه الأدوات صديقة وليست معقدة.`
      },
      {
        title: 'الأسبوع الثاني — التطبيق',
        body: `اليوم ١: استخدمي ChatGPT لتحضير درس كامل غد
اليوم ٢: جرّبي MagicSchool لتوليد تقرير طالب
اليوم ٣: افتحي Kahoot وأنشئي لعبة مراجعة لطلابكِ
اليوم ٤: ابدأي ملف "أفضل أوامري" في Google Docs
اليوم ٥: شاركي زميلة واحدة أفضل أداة جرّبتيها

هدف الأسبوع: لديكِ الآن 3 أدوات تستخدمينها بثقة.`
      },
      {
        title: 'الشهر الأول — التمكين',
        body: `🎯 أهداف الشهر الأول:
□ حضّري 4 دروس كاملة بمساعدة الذكاء الاصطناعي
□ أنشئي اختبارين باستخدام أداة AI
□ استخدمي Canva في تصميم 3 مواد بصرية
□ شاركي تجربتكِ مع 3 زميلات
□ أنشئي مكتبة شخصية من 20 أمر ناجح
□ جرّبي أداة جديدة لم تسمعي بها من قبل

✅ معيار النجاح: وفّرتِ ساعتين على الأقل في أعمال الورق الأسبوعية.`
      },
      {
        title: 'مجتمع التعلم — ابقي متصلة',
        body: `💡 لا تتعلمي وحدكِ:

① أنشئي مجموعة واتس مع زميلاتكِ لمشاركة الأوامر الناجحة
② اشتركي في مجموعة "المعلمين والذكاء الاصطناعي" على فيسبوك
③ تابعي قناة ساجد العباسي وقنوات يوتيوب الموصى بها
④ خصصي 30 دقيقة أسبوعياً لمشاهدة فيديو تدريبي جديد
⑤ شاركي نتائجكِ مع المدرسة — كوني السفيرة الرقمية لزميلاتكِ

التعلم الجماعي يُسرّع النمو بثلاثة أضعاف.`
      }
    ]
  }
];

const quickPrompts = [
  { label: 'خطة درس', prompt: 'أنا معلمة [المادة] للصف [الصف]. اعملي خطة درس عن [الموضوع] مدة 45 دقيقة تشمل: الأهداف، التهيئة، العرض، التطبيق، التقويم.' },
  { label: 'اختبار جاهز', prompt: 'اصنعي اختباراً في [المادة] للصف [X] عن [الوحدة]. 10 أسئلة متنوعة: اختيار متعدد، صح/خطأ، تفكير ناقد. مع الإجابات.' },
  { label: 'رسالة للأهل', prompt: 'اكتبي رسالة رسمية ومحترمة لولي أمر طالب [الموقف]. اللهجة: دافئة ومشجعة، 3 فقرات قصيرة.' },
  { label: 'شرح مبسط', prompt: 'اشرحي مفهوم [المفهوم] بأسلوب قصة ممتعة مناسبة لعمر [X] سنوات. أضيفي مثالاً من الحياة اليومية الفلسطينية.' },
  { label: 'أنشطة متنوعة', prompt: 'أعطيني 5 أنشطة تعليمية متنوعة (بصري/سمعي/حركي) لتعليم [الموضوع] لطلاب الصف [X].' },
  { label: 'تقرير طالب', prompt: 'اكتبي تقرير أداء نصف فصل لطالب [وصف المستوى]. يشمل: نقاط القوة، جوانب التطوير، التوصية.' },
  { label: 'بنك أسئلة', prompt: 'أنشئي بنك من 20 سؤالاً عن [الموضوع] مصنفة حسب مستوى بلوم: تذكر، فهم، تطبيق، تحليل، تقييم، إبداع.' },
  { label: 'محضر اجتماع', prompt: 'نظّمي هذه الملاحظات في محضر اجتماع رسمي للجنة [اسم اللجنة]. يشمل: المحاور، القرارات، المسؤولين، المواعيد: [الصق ملاحظاتكِ]' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export const TeacherGuidePage: React.FC = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ start: true });
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState<string | null>(null);

  const toggleSection = (id: string) =>
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));

  const toggleItem = (key: string) =>
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));

  const copyPrompt = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const colorMap: Record<string, string> = {
    emerald: 'border-emerald-500/30 bg-emerald-950/10',
    violet: 'border-violet-500/30 bg-violet-950/10',
    blue: 'border-blue-500/30 bg-blue-950/10',
    amber: 'border-amber-500/30 bg-amber-950/10',
    red: 'border-red-500/30 bg-red-950/10',
    sky: 'border-sky-500/30 bg-sky-950/10',
  };

  const colorText: Record<string, string> = {
    emerald: 'text-emerald-400',
    violet: 'text-violet-400',
    blue: 'text-blue-400',
    amber: 'text-amber-400',
    red: 'text-red-400',
    sky: 'text-sky-400',
  };

  const colorBorder: Record<string, string> = {
    emerald: 'border-emerald-500/20',
    violet: 'border-violet-500/20',
    blue: 'border-blue-500/20',
    amber: 'border-amber-500/20',
    red: 'border-red-500/20',
    sky: 'border-sky-500/20',
  };

  return (
    <div className="relative pt-20 animate-fade-in">
      {/* Header */}
      <section className="relative py-28 bg-slate-950 overflow-hidden border-b border-slate-900/60">
        <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.03] z-0"></div>
        <div className="absolute top-1/2 left-[-10%] w-[600px] h-[600px] glow-emerald opacity-5 blur-[160px] z-0"></div>
        <div className="absolute top-1/4 right-[-5%] w-[400px] h-[400px] glow-purple opacity-4 blur-[140px] z-0"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-sm font-bold">
            <BookOpen className="w-4 h-4" />
            <span>المرجع الشامل لما بعد الدورة</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-100 leading-tight">
            دليل المعلمة الذكية
            <span className="block text-emerald-400 mt-2">بعد الدورة</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed">
            مرجعكِ الدائم لكل ما تعلّمتيه — أوامر جاهزة، أدوات موصى بها، خطة أسابيع، وأخلاقيات الاستخدام. ارجعي إليه متى احتجتِ.
          </p>
          
          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            {[
              { v: '6', l: 'محاور رئيسية', c: 'text-emerald-400' },
              { v: '24+', l: 'موضوع تفصيلي', c: 'text-violet-400' },
              { v: '8', l: 'أوامر جاهزة للنسخ', c: 'text-blue-400' },
              { v: '20+', l: 'حالة استخدام', c: 'text-amber-400' },
            ].map((s, i) => (
              <div key={i} className="px-5 py-3 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
                <div className={`text-2xl font-extrabold ${s.c}`}>{s.v}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Copy Prompts */}
      <section className="relative py-14 bg-slate-950 border-b border-slate-900/40">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="flex items-center gap-3 mb-8">
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-extrabold text-slate-100">أوامر جاهزة — انسخي وأرسلي</h2>
            <span className="text-xs text-slate-600 mr-auto">عدّلي الأجزاء بين [   ] حسب احتياجكِ</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickPrompts.map((qp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group relative bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3 hover:border-emerald-500/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                    {qp.label}
                  </span>
                  <button
                    onClick={() => copyPrompt(qp.prompt, `qp-${i}`)}
                    className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-400 hover:bg-emerald-950/30 transition-all"
                  >
                    {copied === `qp-${i}` ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-4">{qp.prompt}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Sections */}
      <section className="relative py-16 bg-slate-950/20">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10 space-y-5">
          
          {sections.map((sec, si) => (
            <motion.div
              key={sec.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: si * 0.08 }}
              className={`rounded-3xl border overflow-hidden ${colorMap[sec.color]}`}
            >
              {/* Section Header */}
              <button
                onClick={() => toggleSection(sec.id)}
                className="w-full flex items-center justify-between p-6 sm:p-8 text-right hover:brightness-110 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl bg-slate-950 border ${colorBorder[sec.color]}`}>
                    {sec.icon}
                  </div>
                  <div className="text-right">
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-100">{sec.title}</h2>
                    <p className={`text-sm ${colorText[sec.color]} mt-0.5`}>{sec.subtitle}</p>
                  </div>
                </div>
                <div className={`flex-shrink-0 p-2 rounded-xl ${colorText[sec.color]}`}>
                  {openSections[sec.id] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Section Items */}
              <AnimatePresence>
                {openSections[sec.id] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-8 pb-8 space-y-3">
                      {sec.items.map((item, ii) => {
                        const key = `${sec.id}-${ii}`;
                        return (
                          <div
                            key={ii}
                            className="bg-slate-950/60 border border-slate-900 rounded-2xl overflow-hidden"
                          >
                            {/* Item Header */}
                            <button
                              onClick={() => toggleItem(key)}
                              className="w-full flex items-center justify-between p-5 text-right hover:bg-slate-900/40 transition-all"
                            >
                              <div className="flex items-center gap-3">
                                <Lightbulb className={`w-4 h-4 flex-shrink-0 ${colorText[sec.color]}`} />
                                <h3 className="font-bold text-slate-200 text-sm sm:text-base text-right">
                                  {item.title}
                                </h3>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <button
                                  onClick={(e) => { e.stopPropagation(); copyPrompt(item.body, key); }}
                                  className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-400 transition-all"
                                  title="نسخ المحتوى"
                                >
                                  {copied === key ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                                {openItems[key] ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                              </div>
                            </button>

                            {/* Item Body */}
                            <AnimatePresence>
                              {openItems[key] && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-5 pb-5">
                                    <div className={`h-px bg-gradient-to-l from-transparent via-slate-800 to-transparent mb-4`}></div>
                                    <pre className="whitespace-pre-wrap font-sans text-slate-400 text-sm leading-relaxed text-right">
                                      {item.body}
                                    </pre>
                                    <button
                                      onClick={() => copyPrompt(item.body, key + '-btn')}
                                      className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 text-xs font-bold transition-all"
                                    >
                                      {copied === key + '-btn' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                      نسخ المحتوى
                                    </button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="relative py-20 bg-slate-950 border-t border-slate-900/60 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] glow-emerald opacity-5 blur-[120px]"></div>
        <div className="relative max-w-3xl mx-auto px-4 text-center z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
            <Star className="w-3.5 h-3.5" />
            <span>استمري في التعلم</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
            الموارد والملفات جاهزة لكِ
          </h2>
          <p className="text-slate-400 text-base leading-relaxed max-w-xl mx-auto">
            ارجعي لهذا الدليل متى احتجتِ — وزوري صفحة الموارد لتحميل ملفات الدورة والوصول لجميع الأدوات المذكورة.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/resources"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-lg shadow-emerald-500/20"
            >
              <Globe className="w-5 h-5" />
              صفحة الموارد والتنزيل
            </Link>
            <Link
              to="/how-to-prompt"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-bold transition-all"
            >
              <Wand2 className="w-5 h-5 text-violet-400" />
              مختبر الأوامر التفاعلي
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeacherGuidePage;
