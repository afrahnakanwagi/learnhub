import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Minimize2 } from "lucide-react";

const botResponses = {
  hello: "Hi there! 👋 I'm LearnBot, your AI learning assistant. How can I help you today?",
  course: "We have 342+ courses across Web Dev, Data Science, Design, Marketing, and more! You can browse them all in the Course Catalog. Need help finding the right one?",
  certificate: "Yes! Every course comes with a certificate of completion once you pass the final quiz with 70% or above. Certificates are shareable on LinkedIn!",
  price: "Our courses range from $39 to $70. We also have a Pro plan at $19/month for unlimited access to all courses!",
  progress: "You can track your progress on the Progress page! It shows your completion stats, streaks, learning hours, and badges earned.",
  quiz: "Quizzes are available after completing a course's lessons. You need 70% to pass and earn a certificate. You can retake them unlimited times!",
  help: "I can help you with:\n• Finding the right course\n• Understanding certificates\n• Tracking your progress\n• Pricing and plans\n• Technical issues",
  default: "That's a great question! For detailed help, you can check our Help Center or contact our support team. Is there something specific about our courses or platform I can help you with?",
};

function getBotResponse(msg) {
  const lower = msg.toLowerCase();
  if (lower.match(/hi|hello|hey|greet/)) return botResponses.hello;
  if (lower.match(/course|learn|class|topic/)) return botResponses.course;
  if (lower.match(/certif/)) return botResponses.certificate;
  if (lower.match(/price|cost|pay|plan|free|pro/)) return botResponses.price;
  if (lower.match(/progress|streak|badge|achiev/)) return botResponses.progress;
  if (lower.match(/quiz|test|exam/)) return botResponses.quiz;
  if (lower.match(/help|support|assist/)) return botResponses.help;
  return botResponses.default;
}

const quickReplies = ["Find a course", "How do certificates work?", "What's the pricing?", "Track my progress"];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, from: "bot", text: "Hi! I'm LearnBot 🤖 — your AI learning assistant. Ask me anything about our courses, certificates, or how to get the most out of LearnHub!", time: new Date() }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = async (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput("");
    setMessages(prev => [...prev, { id: Date.now(), from: "user", text: msg, time: new Date() }]);
    setTyping(true);
    await new Promise(r => setTimeout(r, 900 + Math.random() * 600));
    setTyping(false);
    const response = getBotResponse(msg);
    setMessages(prev => [...prev, { id: Date.now() + 1, from: "bot", text: response, time: new Date() }]);
    if (!open) setUnread(n => n + 1);
  };

  const handleOpen = () => {
    setOpen(true);
    setMinimized(false);
    setUnread(0);
  };

  const formatTime = (date) => date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button onClick={handleOpen}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95">
          <MessageCircle size={24} />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {unread}
            </span>
          )}
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className={`fixed bottom-6 right-6 z-50 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden transition-all duration-300 ${minimized ? "h-16" : "h-[480px]"}`}>

          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">LearnBot</p>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <p className="text-white/80 text-xs">Online · AI Assistant</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setMinimized(!minimized)} className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors">
                <Minimize2 size={14} className="text-white" />
              </button>
              <button onClick={() => setOpen(false)} className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors">
                <X size={14} className="text-white" />
              </button>
            </div>
          </div>

          {!minimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {messages.map(msg => (
                  <div key={msg.id} className={`flex gap-2 ${msg.from === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.from === "bot" ? "bg-orange-100" : "bg-green-100"}`}>
                      {msg.from === "bot" ? <Bot size={14} className="text-orange-500" /> : <User size={14} className="text-green-600" />}
                    </div>
                    <div className={`max-w-[75%] ${msg.from === "user" ? "items-end" : "items-start"} flex flex-col gap-0.5`}>
                      <div className={`px-3 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${msg.from === "bot" ? "bg-white border border-gray-100 text-gray-800 rounded-tl-sm" : "bg-orange-500 text-white rounded-tr-sm"}`}>
                        {msg.text}
                      </div>
                      <p className="text-[10px] text-gray-400 px-1">{formatTime(msg.time)}</p>
                    </div>
                    </div>
                ))}
                {typing && (
                  <div className="flex gap-2">
                    <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                      <Bot size={14} className="text-orange-500" />
                    </div>
                    <div className="bg-white border border-gray-100 px-3 py-2 rounded-2xl rounded-tl-sm">
                      <div className="flex gap-1 items-center h-4">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Quick replies */}
              <div className="px-4 py-2 flex gap-2 overflow-x-auto shrink-0 bg-gray-50 border-t border-gray-100">
                {quickReplies.map(q => (
                  <button key={q} onClick={() => sendMessage(q)}
                    className="text-xs font-semibold text-orange-500 border border-orange-200 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-full whitespace-nowrap transition-colors">
                    {q}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="px-4 py-3 bg-white border-t border-gray-100 flex items-center gap-2 shrink-0">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
                <button onClick={() => sendMessage()}
                  disabled={!input.trim()}
                  className="w-9 h-9 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white rounded-full flex items-center justify-center transition-colors shrink-0">
                  <Send size={15} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}