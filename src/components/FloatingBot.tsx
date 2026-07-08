import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';

interface ChatMessage {
  sender: 'bot' | 'user';
  text: string;
  action?: {
    label: string;
    targetId: string;
  };
}

export const FloatingBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'bot',
      text: 'مرحباً بكِ! أنا المساعد الذكي للندوة. يمكنني إجابتكِ حول موضوعات الورشة، الأدوات التدريبية، أو قانون العمل والخدمات النقابية. كيف أساعدكِ؟'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const presets = [
    { label: '📚 محاور الندوة', query: 'ما هي أهم محاور وتطبيقات الندوة؟' },
    { label: '⚖️ إجازة المعلمة السنوية', query: 'ما هي تفاصيل الإجازات السنوية للمعلمة في قانون العمل؟' },
    { label: '🛠️ أدوات الذكاء الاصطناعي', query: 'ما هي البرامج والأدوات التي سنتدرب عليها؟' },
    { label: '▶️ عرض الورشة', query: 'أريد فتح عرض الورشة الكامل' },
  ];

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleActionClick = (targetId: string) => {
    setIsOpen(false);
    if (targetId === 'workshop-link') {
      window.location.href = '/workshop';
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // If it is the register section, we can highlight the name field
      if (targetId === 'register') {
        setTimeout(() => {
          const input = document.getElementById('name');
          if (input) input.focus();
        }, 800);
      }
    }
  };

  const processResponse = (query: string) => {
    setIsTyping(true);
    const normalized = query.toLowerCase();

    setTimeout(() => {
      let botResponse: ChatMessage = {
        sender: 'bot',
        text: 'عذراً، لم أفهم سؤالكِ تماماً. يمكنكِ سؤالي عن محاور الندوة، أدوات الذكاء الاصطناعي، قانون العمل الفلسطيني للمعلمات، أو كيفية التسجيل.'
      };

      if (normalized.includes('عرض') || normalized.includes('ورش') || normalized.includes('workshop')) {
        botResponse = {
          sender: 'bot',
          text: 'عرض الورشة الكامل متاح في صفحة /workshop — 11 جلسة من التسجيل حتى الغداء، مع برومبتات جاهزة لمدارس ورياض أطفال والعمل النقابي.',
          action: {
            label: 'افتحي عرض الورشة ▶️',
            targetId: 'workshop-link'
          }
        };
      } else if (normalized.includes('تسجيل') || normalized.includes('سجل') || normalized.includes('احجز')) {
        botResponse = {
          sender: 'bot',
          text: 'التسجيل للندوة مجاني بالكامل ومفتوح حالياً لمعلمات المدارس، ورياض الأطفال، والمشرفات التربويات وعضوات النقابة. المقاعد محدودة لضمان التطبيق العملي الفعال.',
          action: {
            label: 'افتحي عرض الورشة الكامل ▶️',
            targetId: 'workshop-link'
          }
        };
      } else if (normalized.includes('إجازة') || normalized.includes('قانون') || normalized.includes('حقوق') || normalized.includes('leave') || normalized.includes('law')) {
        botResponse = {
          sender: 'bot',
          text: 'حسب المادة (74) من قانون العمل الفلسطيني رقم (7) لسنة 2000:\n- يحق لكل معلمة أو عاملة إجازة سنوية مدفوعة الأجر مدتها 14 يوماً.\n- تزداد الإجازة لتصبح 21 يوماً بعد العمل لمدة 5 سنوات متصلة في نفس المنشأة.\n- كما تضمن المادة (2) حق حماية الأمومة وتأمين إجازة وضع مدفوعة بالكامل لمدة 10 أسابيع (70 يوماً). سنقوم بالتدرب على كيفية توليد ردود واستبيانات نقابية بالذكاء الاصطناعي مبنية على هذه القوانين!'
        };
      } else if (normalized.includes('أداة') || normalized.includes('أدوات') || normalized.includes('برامج') || normalized.includes('tools')) {
        botResponse = {
          sender: 'bot',
          text: 'سنتعلم بالندوة استخدام 10 أدوات رائدة مجانية بالكامل:\n1. ChatGPT & Claude للتحضير وإعداد النصوص.\n2. Canva AI وGamma للعروض التوضيحية وتوليد الصور للدروس.\n3. NotebookLM لتلخيص المناهج وتوفير أوراق العمل.\n4. ElevenLabs وSuno لتوليد الأصوات وأناشيد الأطفال التفاعلية.\n5. MagicSchool AI المخصص لتصميم الامتحانات وخطط الدروس.\n\nيمكنكِ استكشاف التفاصيل في قسم الأدوات بالموقع.',
          action: {
            label: 'عرض قسم الأدوات الذكية 🛠️',
            targetId: 'tools'
          }
        };
      } else if (normalized.includes('محور') || normalized.includes('محاور') || normalized.includes('موضوع') || normalized.includes('ماذا') || normalized.includes('تعلم')) {
        botResponse = {
          sender: 'bot',
          text: 'تغطي الندوة محاور تعليمية ونقابية تفصيلية:\n- تحضير الدروس الفلسطينية بالذكاء الاصطناعي في دقيقة واحدة.\n- تأليف قصص مصورة وألعاب حركية لأطفال الروضة والمدارس.\n- إنشاء أوراق عمل وتصميم امتحانات متزنة.\n- استخدام الذكاء الاصطناعي لخدمة النقابات (تلخيص الاجتماعات وصياغة البيانات والخطابات الرسمية).',
          action: {
            label: 'شاهدي المحاور التدريبية بالتفصيل 📚',
            targetId: 'curriculum'
          }
        };
      }

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = inputText;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInputText('');
    processResponse(userMsg);
  };

  const handlePresetClick = (query: string) => {
    setMessages(prev => [...prev, { sender: 'user', text: query }]);
    processResponse(query);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute bottom-16 right-0 w-[350px] sm:w-[400px] max-h-[550px] glass-panel border-emerald-500/20 rounded-2xl flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-gradient-to-l from-emerald-950 via-slate-900 to-slate-900 border-b border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/20 relative">
                  <Bot className="w-5 h-5" />
                  <span className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-950 rounded-full animate-pulse"></span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm sm:text-base leading-none">مساعد الندوة الذكي</h3>
                  <span className="text-[10px] text-emerald-400 font-semibold mt-1.5 inline-block">متاح لمساعدتكِ فوراً</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800 flex items-center justify-center transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[300px] min-h-[250px] bg-slate-950/50 custom-scrollbar">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2.5 max-w-[85%] ${
                    msg.sender === 'user' ? 'mr-auto flex-row-reverse' : 'ml-auto'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs border ${
                      msg.sender === 'bot'
                        ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900/30'
                        : 'bg-red-950/40 text-red-400 border-red-900/30'
                    }`}
                  >
                    {msg.sender === 'bot' ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                  </div>

                  <div className="space-y-2">
                    <div
                      className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                        msg.sender === 'bot'
                          ? 'bg-slate-900 border border-slate-850 text-slate-200 rounded-tr-none shadow-md shadow-slate-950/45'
                          : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>

                    {msg.action && (
                      <button
                        onClick={() => handleActionClick(msg.action!.targetId)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 text-xs font-extrabold hover:bg-emerald-400 transition-all shadow-md shadow-emerald-950/20"
                      >
                        {msg.action.label}
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2.5 max-w-[85%] ml-auto">
                  <div className="w-7 h-7 rounded-full bg-emerald-950/40 text-emerald-400 flex-shrink-0 flex items-center justify-center text-xs border border-emerald-900/30">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-850 text-slate-400 rounded-2xl rounded-tr-none flex items-center gap-1.5 shadow-md shadow-slate-950/45">
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                    <span className="text-xs">يكتب حالياً...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Presets List */}
            <div className="p-3 bg-slate-950/80 border-t border-slate-900/60 flex flex-wrap gap-1.5 max-h-[100px] overflow-y-auto scrollbar-none">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => handlePresetClick(preset.query)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 text-[10px] sm:text-xs font-semibold transition-all hover:border-emerald-500/30 cursor-pointer"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Form Input */}
            <form onSubmit={handleSend} className="p-3 bg-slate-900/40 border-t border-slate-900 flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="اكتبي سؤالكِ هنا..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500/60 placeholder-slate-600 transition-colors"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/10 cursor-pointer"
              >
                <Send className="w-4 h-4 rotate-180" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 flex items-center justify-center shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 cursor-pointer relative border border-emerald-400/20"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageSquare className="w-6 h-6" />
            {/* Pulsing notification dot */}
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-slate-950 rounded-full animate-bounce"></span>
          </>
        )}
      </motion.button>
    </div>
  );
};

export default FloatingBot;
