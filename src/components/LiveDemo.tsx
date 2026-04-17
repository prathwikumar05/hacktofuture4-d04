import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Terminal, Bot, Send, Loader2, User } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "agent";
  content: string;
};

export function LiveDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "intro",
      role: "agent",
      content: "System initialized. Contextualizer & Strategist agent ready. Provide a task or goal to begin orchestration."
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userMessage.content })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to communicate with Agent");
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "agent",
        content: data.reply
      }]);
    } catch (error: any) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "agent",
        content: `Error: ${error.message}. Ensure GROQ_API_KEY is configured in AI Studio Variables.`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="demo" className="py-24 px-4 border-y border-white/5 relative z-10 bg-black/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Live Agent Demo</h2>
          <p className="text-slate-400">Interact with the Strategist Agent powered by Groq's fast inference network.</p>
        </div>

        <div className="glass-card overflow-hidden border border-white/10 shadow-2xl">
          {/* Chat Header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-white/5 bg-white/[0.02]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="mx-auto flex items-center gap-2">
              <Terminal className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Groq Engine Active // Llama 3</span>
            </div>
          </div>

          {/* Chat Messages */}
          <div ref={scrollRef} className="h-[400px] overflow-y-auto p-6 flex flex-col gap-6 font-mono text-sm">
            {messages.map(msg => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={msg.id} 
                className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`w-8 h-8 rounded shrink-0 flex items-center justify-center border ${msg.role === "user" ? "bg-white/5 border-white/10" : "bg-blue-500/10 border-blue-500/30"}`}>
                  {msg.role === "user" ? <User className="w-4 h-4 text-slate-300" /> : <Bot className="w-4 h-4 text-blue-500" />}
                </div>
                <div className={`flex flex-col max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                  <span className="text-xs text-slate-500 mb-1">{msg.role === "user" ? "Developer" : "Agent"}</span>
                  <div className={`p-4 rounded-xl ${msg.role === "user" ? "bg-white/5 border border-white/10 text-white" : "bg-blue-500/5 border border-blue-500/20 text-slate-300 leading-relaxed"}`}>
                    {msg.content}
                  </div>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                <div className="w-8 h-8 rounded shrink-0 flex items-center justify-center border bg-blue-500/10 border-blue-500/30">
                  <Bot className="w-4 h-4 text-blue-500" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xs text-slate-500 mb-1">Agent</span>
                  <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 text-slate-300">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Suggested Queries */}
          <div className="px-6 pt-4 pb-2 border-t border-white/5 bg-white/[0.01]">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {[
                "Architect a scalable Node.js backend",
                "Write a Dockerfile for a React app",
                "How do you handle dependency updates?"
              ].map((q, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setInput(q)}
                  className="whitespace-nowrap text-xs text-slate-400 bg-white/5 hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/30 border border-white/10 px-3 py-1.5 rounded-full transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input */}
          <div className="px-6 pb-6 pt-2 bg-white/[0.01]">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask the agent to refactor code, plan architecture, etc..."
                className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors"
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
