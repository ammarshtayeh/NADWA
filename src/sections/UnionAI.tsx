import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../data/content';
import { Icon } from '../components/Icons';
import { Bot, Send, User } from 'lucide-react';

export const UnionAI: React.FC = () => {
  const { union } = siteContent;
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'مرحباً بكِ في المساعد الذكي لنقابة المعلمات. كيف يمكنني مساعدتكِ اليوم في المسائل القانونية أو التنظيمية؟' },
    { sender: 'user', text: 'أريد معرفة الإجازة السنوية المستحقة لمعلمة رياض الأطفال حسب قانون العمل الفلسطيني.' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: inputText }];
    setMessages(newMessages);
    setInputText('');
    setIsTyping(true);

    // Simulate response based on keywords
    setTimeout(() => {
      let reply = 'أنا هنا لمساعدتكِ. بصفتي مساعداً ذكياً للنقابة، يمكنني مساعدتكِ في صياغة الكتب الرسمية أو البحث في اللوائح القانونية.';
      const query = inputText.toLowerCase();
      if (query.includes('إجازة') || query.includes('قانون') || query.includes('leave') || query.includes('law')) {
        reply = 'وفقاً للمادة (74) من قانون العمل الفلسطيني رقم (7) لسنة 2000، للموظف الحق في إجازة سنوية مدفوعة الأجر مدتها أسبوعان (14 يوماً)، وتصبح 21 يوماً بعد قضاء خمس سنوات في نفس المنشأة. هل ترغبين في صياغة طلب إجازة رسمي للمعلمة؟';
      } else if (query.includes('بيان') || query.includes('إضراب') || query.includes('رواتب') || query.includes('statement') || query.includes('salary')) {
        reply = 'يمكنني المساعدة في صياغة مسودة خطاب رسمي حول هذا الشأن. هل تفضلين صياغة كتاب موجه للمدرسة أم بيان موجه للرأي العام؟';
      }

      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <section id="union" className="relative py-24 bg-slate-900/10 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.02] z-0"></div>
      <div className="absolute bottom-0 right-[-10%] w-[400px] h-[400px] glow-red rounded-full opacity-10 blur-[120px] z-0"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-100 via-emerald-100 to-slate-200 bg-clip-text text-transparent mb-4"
          >
            {union.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg"
          >
            {union.subtitle}
          </motion.p>
        </div>

        {/* Content Section: Left: description & features, Right: Interactive Bot Simulation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Columns (Features Grid) */}
          <div className="lg:col-span-7 space-y-8">
            <motion.p 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-slate-300 text-base sm:text-lg leading-relaxed border-r-4 border-emerald-500 pr-4"
            >
              {union.description}
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {union.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="flex gap-4 p-4 rounded-xl bg-slate-900/30 border border-slate-900/80 hover:border-slate-800 transition-colors"
                >
                  <div className="text-emerald-400 mt-1 flex-shrink-0">
                    <Icon name={feature.iconName} size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200 text-sm sm:text-base mb-1">{feature.title}</h4>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Chatbot Mock */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 w-full max-w-md mx-auto glass-panel border-slate-800 rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Bot Header */}
            <div className="px-5 py-4 bg-slate-900/80 border-b border-slate-850 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm sm:text-base leading-none">مساعد النقابة الذكي</h3>
                  <span className="text-[10px] text-emerald-400 font-semibold mt-1 inline-block animate-pulse">متصل وقيد التشغيل</span>
                </div>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
            </div>

            {/* Chat Body */}
            <div className="p-4 h-80 overflow-y-auto space-y-4 bg-slate-950/40 custom-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2.5 max-w-[85%] ${msg.sender === 'user' ? 'mr-auto flex-row-reverse' : 'ml-auto'}`}>
                  
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs border ${
                    msg.sender === 'bot' 
                      ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900/30' 
                      : 'bg-red-950/40 text-red-400 border-red-900/30'
                  }`}>
                    {msg.sender === 'bot' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  {/* Text */}
                  <div className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'bot' 
                      ? 'bg-slate-900 border border-slate-850 text-slate-200 rounded-tr-none' 
                      : 'bg-emerald-500 text-slate-950 font-semibold rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2.5 max-w-[85%] ml-auto">
                  <div className="w-8 h-8 rounded-full bg-emerald-950/40 text-emerald-400 flex-shrink-0 flex items-center justify-center text-xs border border-emerald-900/30">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-850 text-slate-400 rounded-2xl rounded-tr-none flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-3 bg-slate-900/50 border-t border-slate-850 flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="اسألي المساعد عن قانون العمل أو المراسلات..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500/60 placeholder-slate-600 transition-colors"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center hover:bg-emerald-400 transition-colors"
              >
                <Send className="w-4 h-4 rotate-180" />
              </button>
            </form>

          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default UnionAI;
