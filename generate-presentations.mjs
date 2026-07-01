import PptxGenJS from "pptxgenjs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const COLORS = {
  primary: "0D3D2E",
  primaryMid: "1A5F4A",
  gold: "B8860B",
  goldLight: "FDF8EB",
  accent: "8B2635",
  white: "FFFFFF",
  light: "E6F4EF",
  text: "1A1A1A",
  muted: "555555",
};

function baseSlide(pptx) {
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.white };
  return slide;
}

function addHeader(pptx, slide, title, subtitle = "") {
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: "100%",
    h: 0.55,
    fill: { color: COLORS.primary },
  });
  slide.addText(title, {
    x: 0.4,
    y: 0.08,
    w: 9.2,
    h: 0.4,
    fontSize: 22,
    bold: true,
    color: COLORS.white,
    align: "right",
    fontFace: "Arial",
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.4,
      y: 0.65,
      w: 9.2,
      h: 0.35,
      fontSize: 12,
      color: COLORS.muted,
      align: "right",
      fontFace: "Arial",
    });
  }
}

function addBullets(slide, items, y = 1.1, fontSize = 16) {
  const text = items.map((t) => ({ text: t, options: { bullet: true, breakLine: true } }));
  slide.addText(text, {
    x: 0.5,
    y,
    w: 9,
    h: 4.5,
    fontSize,
    color: COLORS.text,
    align: "right",
    rtlMode: true,
    fontFace: "Arial",
    paraSpaceAfter: 8,
  });
}

function addGoldBox(pptx, slide, text, y = 4.8) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.4,
    y,
    w: 9.2,
    h: 0.7,
    fill: { color: COLORS.goldLight },
    line: { color: COLORS.gold, width: 1 },
  });
  slide.addText(text, {
    x: 0.6,
    y: y + 0.1,
    w: 8.8,
    h: 0.5,
    fontSize: 13,
    bold: true,
    color: COLORS.primary,
    align: "right",
    rtlMode: true,
    fontFace: "Arial",
  });
}

function titleSlide(pptx, { title, subtitle, footer, dark = true }) {
  const slide = baseSlide(pptx);
  slide.background = { color: dark ? COLORS.primary : COLORS.white };
  slide.addText(title, {
    x: 0.5,
    y: 1.8,
    w: 9,
    h: 1.5,
    fontSize: 32,
    bold: true,
    color: dark ? COLORS.white : COLORS.primary,
    align: "center",
    rtlMode: true,
    fontFace: "Arial",
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.5,
      y: 3.3,
      w: 9,
      h: 1,
      fontSize: 16,
      color: dark ? "D4E8E0" : COLORS.muted,
      align: "center",
      rtlMode: true,
      fontFace: "Arial",
    });
  }
  if (footer) {
    slide.addText(footer, {
      x: 0.5,
      y: 4.8,
      w: 9,
      h: 0.5,
      fontSize: 12,
      color: dark ? COLORS.gold : COLORS.primaryMid,
      align: "center",
      rtlMode: true,
      fontFace: "Arial",
    });
  }
  return slide;
}

// ─── WORKSHOP PRESENTATION ───
function buildWorkshop() {
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_16x9";
  pptx.author = "NADWA";
  pptx.title = "ندوة AI للمعلمات — عرض تقديمي";

  titleSlide(pptx, {
    title: "مساعد ذكي في حقيبة المعلمة",
    subtitle: "الذكاء الاصطناعي عملياً — من الفكرة إلى الصف في دقائق",
    footer: "نقابة المعلمات / رياض الأطفال | 3 ساعات | [التاريخ]",
  });

  titleSlide(pptx, {
    title: "[اسم المتحدث]",
    subtitle: "مدربة / خبيرة تربوية\n[سطر واحد عن خبرتك]",
    footer: "ندوة بتنظيم: [اسم النقابة / الجمعية]",
    dark: false,
  });

  let s = baseSlide(pptx);
  addHeader(pptx, s, "وعد اليوم — 3 مخرجات");
  addBullets(s, [
    "خطة درس واحدة جاهزة — كتبتِها بمساعدة AI وراجعتِها",
    "10 أوامر (Prompts) جاهزة للنسخ — تستخدمينها غداً",
    "قواعد أمان تحمي المعلمة وطلابها",
  ]);
  addGoldBox(pptx, s, "ثلاث رسائل: أنتِ صاحبة القرار | Prompt جيد + مراجعة | لا بيانات طلاب");

  s = baseSlide(pptx);
  addHeader(pptx, s, "من نحن اليوم؟", "استطلاع سريع");
  addBullets(s, [
    "ارفعي يدك: مَن جرّبت ChatGPT أو Copilot؟",
    "مَن تحضير الدرس يأخذ أكثر من ساعتين يومياً؟",
    "اكتبي: شيء واحد تتمنين AI يساعدك فيه اليوم",
  ]);

  s = baseSlide(pptx);
  addHeader(pptx, s, "ما هو الذكاء الاصطناعي؟ — بجملتين");
  addBullets(s, [
    "برنامج يتنبأ بالكلمات — يكتب، يقترح، يلخّص",
    "مساعد للمعلمة — ليس بديلاً عنها",
    "قد يخطئ — المراجعة البشرية ضرورية",
    "لا يعرف طلابك شخصياً — لا تدخلي بياناتهم",
  ]);

  s = baseSlide(pptx);
  addHeader(pptx, s, "الفرق بين الأدوات");
  slideTable(pptx, s, [
    ["الأداة", "ماذا تفعل", "متى"],
    ["Google", "يبحث عن صفحات", "معلومات محددة"],
    ["ChatGPT / Copilot", "يكتب محتوى جديداً", "دروس، أسئلة، رسائل"],
    ["Canva", "تصميم بصري", "بطاقات، دعوات، لوحات"],
  ]);

  s = baseSlide(pptx);
  addHeader(pptx, s, "عرض حي — Live Demo", "الآن أمامكن");
  addBullets(s, [
    "Prompt: قصة تعاون + أسئلة + لعبة حركية — KG",
    "شاهدنا: النتيجة في أقل من دقيقة",
    "لكن: هل أنسب لصفي؟ → أعدّل → أطبّق",
  ], 1.1, 18);
  addGoldBox(pptx, s, "الجودة = Prompt واضح + مراجعة المعلمة");

  s = baseSlide(pptx);
  addHeader(pptx, s, "القالب الذهبي — 5 عناصر");
  addBullets(s, [
    "الدور: أنت مساعدة لمعلمة [KG / صف / مادة]",
    "الهدف: خطة درس [___] دقيقة عن [الموضوع]",
    "الطلاب: العمر، العدد، المستوى",
    "القيود: عربي مبسّط | فلسطين | موارد الصف",
    "المخرجات: أهداف + خطوات + نشاط + أسئلة",
  ]);

  s = baseSlide(pptx);
  addHeader(pptx, s, "ورشة 1 — أول درس جاهز", "0:30 – 1:15 | 45 دقيقة");
  addBullets(s, [
    "اختاري موضوعاً من الأسبوع القادم — حقيقي",
    "اكتبي Prompt بالقالب الذهبي",
    "شغّلي ChatGPT أو Copilot — انسخي لـ Word",
    "راجعي: عمر؟ منهاج؟ واقع الصف؟",
    "شاركي: هدف + نشاط واحد",
  ]);
  addGoldBox(pptx, s, "40% قيمة الندوة — هنا");

  s = baseSlide(pptx);
  addHeader(pptx, s, "Checklist المراجعة — قبل الصف");
  addBullets(s, [
    "☐ هل يناسب عمر طلابي؟",
    "☐ هل صحيح تربوياً ومنهاجياً؟",
    "☐ هل واقعي في وقتي ومواردي؟",
    "☐ لا أسماء ولا بيانات طلاب في AI",
  ], 1.1, 20);

  titleSlide(pptx, {
    title: "☕ استراحة",
    subtitle: "15 دقيقة — 1:15 – 1:30",
    footer: "ارجعي بـ Prompt في بالك",
    dark: false,
  });

  s = baseSlide(pptx);
  addHeader(pptx, s, "ورشة 2 — تقييم + تمايز", "1:30 – 2:05");
  addBullets(s, [
    "10 أسئلة MCQ — 3 سهلة، 4 متوسطة، 3 صعبة + مفتاح",
    "نفس الدرس بـ 3 مستويات: متفوق / أساسي / دعم",
    "KG: 5 أسئلة شفوية + 3 أنشطة بمستويات مختلفة",
  ]);

  s = baseSlide(pptx);
  addHeader(pptx, s, "Prompt التقييم — انسخي");
  s.addText(
    "اكتب 10 أسئلة اختيار من متعدد عن [موضوعك] للصف [___].\n3 سهلة، 4 متوسطة، 3 صعبة. مفتاح إجابة. عربي — فلسطين.",
    {
      x: 0.6,
      y: 1.2,
      w: 8.8,
      h: 1.5,
      fontSize: 14,
      color: COLORS.primary,
      align: "right",
      rtlMode: true,
      fontFace: "Arial",
      fill: { color: COLORS.light },
    }
  );

  s = baseSlide(pptx);
  addHeader(pptx, s, "مثال KG — قصة + حركة");
  addBullets(s, [
    "قصة 4 دقائق عن قيمة [التعاون / الصدق]",
    "3 أسئلة شفوية بعد القصة",
    "لعبة حركية 8 دقائق — بدون مواد",
    "مناسب: 20 طفل — 5–6 سنوات",
  ]);

  s = baseSlide(pptx);
  addHeader(pptx, s, "مثال مدارس — تواصل أولياء");
  addBullets(s, [
    "رسالة WhatsApp مهذبة — دعوة اجتماع",
    "قالب عام — بدون أسماء طلاب",
    "راجعي وعدّلي قبل الإرسال",
  ]);

  s = baseSlide(pptx);
  addHeader(pptx, s, "الأمان — قواعد لا تتفاوض عليها");
  addBullets(s, [
    "❌ لا أسماء طلاب | لا صور | لا علامات | لا تقارير شخصية",
    "✅ خطط عامة | أسئلة | قوالب | «طالب الصف الرابع»",
    "في التاريخ والتربية الوطنية والدين — راجعي كل جملة",
  ], 1.1, 17);
  addGoldBox(pptx, s, "الخصوصية أولاً — كرّريها 4 مرات في الندوة");

  s = baseSlide(pptx);
  addHeader(pptx, s, "AI والعمل النقابي", "لنقابة المعلمات ورياض الأطفال");
  addBullets(s, [
    "مسودات بيانات وخطابات — للمراجعة والتوقيع",
    "برامج تدريب وأجندة ورش — توفير وقت الأمانة",
    "تواصل أعضاء: نشرات، دعوات، تلخيص اجتماعات",
    "أفكار أنشطة نقابية + تعليمية — KG ومدارس",
    "قوالب شكاوى/مطالب عامة — بدون بيانات شخصية",
  ]);
  addGoldBox(pptx, s, "AI يخدم النقابة في التنظيم — القرار النقابي يبقى بشرياً");

  s = baseSlide(pptx);
  addHeader(pptx, s, "Prompts نقابية — 5 جاهزة");
  addBullets(s, [
    "مسودة بيان صحفي عن [موضوع تعليمي] — 150 كلمة — رسمي",
    "أجندة اجتماع نقابي — 90 دقيقة — 5 بنود",
    "نشرة أسبوعية لأعضاء النقابة — أخبار + تذكير",
    "خطة ورشة تدريبية للمعلمات — 3 ساعات — AI عملي",
    "تلخيص نقاط اجتماع — من notes عامة — بدون أسماء",
  ], 1.0, 14);

  s = baseSlide(pptx);
  addHeader(pptx, s, "خطة 7 أيام — بعد الندوة");
  addBullets(s, [
    "اليوم 1–2: جرّبي 3 Prompts من ورقتك",
    "اليوم 3–4: درس كامل + مراجعة بشرية",
    "اليوم 5: شاركي زميلة في النقابة",
    "اليوم 6–7: قيّمي — كم وفّرتِ من وقت؟",
  ]);

  s = baseSlide(pptx);
  addHeader(pptx, s, "أسئلة شائعة — سريع");
  addBullets(s, [
    "هل AI غش؟ → للمعلمة تحضير OK | للطالب نسخ = غش",
    "هل يحل محلي؟ → يختصر وقت التحضير",
    "Net ضعيف؟ → Prompts على ورق — جرّبي في البيت",
    "خطأ عن فلسطين؟ → أنتِ المرجع — راجعي دائماً",
  ], 1.0, 15);

  titleSlide(pptx, {
    title: "شكراً — معلمات فلسطين",
    subtitle: "AI في حقيبتكن — وأنتن في خدمة أطفالكن",
    footer: "[تواصل] | استبانة التقييم عند المخرج",
  });

  const out = path.join(__dirname, "عرض-الندوة-AI-للمعلمات.pptx");
  return pptx.writeFile({ fileName: out }).then(() => out);
}

function slideTable(pptx, slide, rows) {
  const tableData = rows.map((row, i) =>
    row.map((cell) => ({
      text: cell,
      options: {
        bold: i === 0,
        fill: i === 0 ? COLORS.light : COLORS.white,
        color: i === 0 ? COLORS.primary : COLORS.text,
        align: "right",
        fontFace: "Arial",
        fontSize: i === 0 ? 12 : 11,
      },
    }))
  );
  slide.addTable(tableData, {
    x: 0.4,
    y: 1.1,
    w: 9.2,
    colW: [2.2, 3.5, 3.5],
    border: { type: "solid", color: COLORS.primaryMid, pt: 0.5 },
    align: "right",
    rtlMode: true,
  });
}

// ─── PITCH DECK ───
function buildPitch() {
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_16x9";
  pptx.author = "NADWA";
  pptx.title = "Pitch — ندوة AI لنقابة المعلمات";

  titleSlide(pptx, {
    title: "عرض تنفيذي",
    subtitle: "ندوة: الذكاء الاصطناعي في خدمة المعلمة\nلنقابة المعلمات ورياض الأطفال",
    footer: "[اسم المتحدث] | [التاريخ]",
  });

  let s = baseSlide(pptx);
  addHeader(pptx, s, "التحدي الذي تواجهه المعلمات");
  addBullets(s, [
    "ساعات طويلة في التحضير بعد يوم مرهق في الصف",
    "تعدد المهام: دروس، تقييم، تواصل أولياء، أنشطة KG",
    "موارد محدودة: إنترنت، طابعات، فصول مزدحمة",
    "النقابة تحتاج أدوات حديثة لخدمة أعضائها وتنظيم عملها",
  ]);

  s = baseSlide(pptx);
  addHeader(pptx, s, "الفرصة");
  addBullets(s, [
    "AI أداة عملية — ليست رفاهية تقنية",
    "توفير 30–70% من وقت التحضير عند الاستخدام الصحيح",
    "تمكين المعلمة + تمكين النقابة في التواصل والتدريب",
    "استثمار واحد ($500) — أثر على عشرات المعلمات",
  ]);
  addGoldBox(pptx, s, "الهدف: معلمات يخرجن بمهارات تطبّقونها غداً — ليس محاضرة نظرية");

  s = baseSlide(pptx);
  addHeader(pptx, s, "لمن هذه الندوة؟");
  addBullets(s, [
    "معلمات رياض الأطفال — قصص، ألعاب، بطاقات، روتين",
    "معلمات المرحلة الأساسية — خطط، امتحانات، تمايز",
    "معلمات المرحلة الثانوية — مشاريع، rubrics، تقييم",
    "قيادات نقابية — AI في التنظيم والتواصل (قسم مخصص)",
  ]);

  s = baseSlide(pptx);
  addHeader(pptx, s, "ماذا نقدّم؟ — الندوة");
  addBullets(s, [
    "3 ساعات تدريب تفاعلي (70% عملي)",
    "متحدث محترف + عرض حي + ورشتان hands-on",
    "مواد رقمية وورقية للتوزيع",
    "شهادات حضور (باسم النقابة)",
    "استبانة تقييم + مقترحات متابعة",
  ]);

  s = baseSlide(pptx);
  addHeader(pptx, s, "أجندة الـ 180 دقيقة");
  slideTable(pptx, s, [
    ["الوقت", "النشاط", "المخرج"],
    ["0:00–0:30", "افتتاح + AI + Demo", "فهم + إلهام"],
    ["0:30–1:15", "ورشة: أول درس جاهز", "خطة درس / معلمة"],
    ["1:15–1:30", "استراحة", "—"],
    ["1:30–2:05", "ورشة: تقييم + تمايز", "أسئلة + 3 مستويات"],
    ["2:05–2:45", "Demo + أمان + نقابة", "Checklist + prompts"],
    ["2:45–3:00", "خطة 7 أيام + Q&A", "تقييم"],
  ]);

  s = baseSlide(pptx);
  addHeader(pptx, s, "مخرجات كل معلمة");
  addBullets(s, [
    "✓ خطة درس واحدة مكتملة ومُراجَعة",
    "✓ 10 Prompts جاهزة للنسخ",
    "✓ Checklist أمان (صفحة واحدة)",
    "✓ خطة شخصية 7 أيام",
    "✓ فهم AI في الصف + في العمل النقابي",
  ]);

  s = baseSlide(pptx);
  addHeader(pptx, s, "AI في التنظيم النقابي", "قيمة مضافة للنقابة");
  addBullets(s, [
    "بيانات وخطابات: مسودات للمراجعة قبل النشر",
    "برامج تدريب: أجندات ورش وأنشطة أعضاء",
    "تواصل: نشرات، دعوات اجتماعات، تلخيصات",
    "دعم أعضاء KG: قوالب أنشطة وجاهزة للتوزيع",
    "توثيق: محاضر اجتماعات من نقاط عامة — بدون أسماء",
  ], 1.0, 15);
  addGoldBox(pptx, s, "القرار النقابي والسياسات — دائماً بشرية ومسؤولة");

  s = baseSlide(pptx);
  addHeader(pptx, s, "الأمان والامتثال");
  addBullets(s, [
    "لا بيانات طلاب أو أعضاء شخصية في أدوات AI عامة",
    "مراجعة إلزامية للمحتوى التاريخي والوطني والديني",
    "AI للمسودات — النشر الرسمي بقرار النقابة",
    "تدريب عملي على «ماذا نفعل / ماذا لا نفعل»",
  ]);

  s = baseSlide(pptx);
  addHeader(pptx, s, "لماذا هذا المتحدث؟");
  addBullets(s, [
    "[خبرتك التربوية / التقنية — 2–3 نقاط]",
    "[خبرة تدريب أو عمل مع معلمات — إن وجدت]",
    "[فهم السياق الفلسطيني والنقابي]",
    "سكربت كامل، مواد جاهزة، خطة بديلة بدون إنترنت",
  ]);
  addGoldBox(pptx, s, "املئي الأقواس قبل عرض الـ Pitch");

  s = baseSlide(pptx);
  addHeader(pptx, s, "المتطلبات من النقابة");
  addBullets(s, [
    "قاعة + Projector + Wi-Fi (أو إعلام مسبق بضعف الشبكة)",
    "طاولات مجموعات — ليس صفوف محاضرة",
    "15 دقيقة استراحة ضمن الـ 3 ساعات",
    "تسجيل الحضور + شهادات (النقابة توقّع)",
    "ترويج عبر قنوات النقابة — WhatsApp / Facebook",
  ]);

  s = baseSlide(pptx);
  addHeader(pptx, s, "الاستثمار");
  s.addText("$500", {
    x: 3.5,
    y: 1.5,
    w: 3,
    h: 1.2,
    fontSize: 54,
    bold: true,
    color: COLORS.gold,
    align: "center",
    fontFace: "Arial",
  });
  s.addText("ندوة 3 ساعات — حتى 40–50 مشاركة", {
    x: 0.5,
    y: 2.8,
    w: 9,
    h: 0.5,
    fontSize: 16,
    color: COLORS.muted,
    align: "center",
    rtlMode: true,
    fontFace: "Arial",
  });
  addBullets(
    s,
    [
      "إلقاء كامل + تحضير + مواد توزيع",
      "Demo حي + دعم تقني يوم الندوة",
      "رسالة متابعة بعد أسبوع (اختياري)",
    ],
    3.4,
    14
  );

  s = baseSlide(pptx);
  addHeader(pptx, s, "ماذا يشمل السعر؟");
  addBullets(s, [
    "تحضير مسبق + تخصيص أمثلة للنقابة",
    "3 ساعات إلقاء على المنصة",
    "PDF: 10 Prompts + Checklist (للطباعة)",
    "عرض PowerPoint الندوة",
    "استبانة تقييم — تقرير ملخص للنقابة (اختياري)",
  ]);

  s = baseSlide(pptx);
  addHeader(pptx, s, "الخطوات التالية");
  addBullets(s, [
    "1. تأكيد التاريخ والمكان وعدد الحضور",
    "2. توقيع اتفاق بسيط (رسالة / WhatsApp رسمي)",
    "3. ترويج النقابة — 2 أسبوع قبل",
    "4. تنفيذ الندوة + تقييم",
    "5. (اختياري) دورة متابعة 4–6 جلسات",
  ]);
  addGoldBox(pptx, s, "[اسمك] | [هاتف] | [بريد] | [LinkedIn اختياري]");

  titleSlide(pptx, {
    title: "لنُمكّن معلمات فلسطين",
    subtitle: "بالأدوات التي يستحقنها — عملياً، بأمان، وبكرامة",
    footer: "شكراً لثقتكم — [اسم النقابة]",
  });

  const out = path.join(__dirname, "Pitch-Deck-ندوة-AI-نقابة-المعلمات.pptx");
  return pptx.writeFile({ fileName: out }).then(() => out);
}

const workshopPath = await buildWorkshop();
const pitchPath = await buildPitch();
console.log("Workshop PPTX:", workshopPath);
console.log("Pitch PPTX:", pitchPath);
