import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Zap, Bot, ShieldCheck, Cog, Loader2, FastForward } from "lucide-react";

export function Features() {
  const [task, setTask] = useState("");
  const [logs, setLogs] = useState<{ step: string; status: string; message?: string }[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [logs]);

  const runPipeline = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim() || isRunning) return;
    
    setIsRunning(true);
    setLogs([{ step: 'system', status: 'info', message: `Initializing orchestration for: "${task}"` }]);

    try {
      const res = await fetch("/api/pipeline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task })
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunks = decoder.decode(value).split('\n').filter(Boolean);
        for (const chunk of chunks) {
          try {
            const data = JSON.parse(chunk);
            setLogs(prev => {
              // If replacing a "running" step with a "done" step of the same kind, remove the running step
              const filtered = prev.filter(p => !(p.step === data.step && p.status === 'running'));
              return [...filtered, data];
            });
          } catch (e) {}
        }
      }
    } catch (error: any) {
       setLogs(prev => [...prev, { step: 'error', status: 'error', message: error.message }]);
    } finally {
      setIsRunning(false);
    }
  };

  const getStepColor = (step: string) => {
    switch (step) {
      case 'context': return 'text-cyan-400';
      case 'strategist': return 'text-purple-400';
      case 'execution': return 'text-green-400';
      case 'governance': return 'text-orange-400';
      case 'error': return 'text-red-400';
      default: return 'text-blue-400';
    }
  };

  return (
    <section id="features" className="py-24 px-4 bg-white/[0.02] border-y border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-16 text-center">Powerful Features Orchestrated</h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          <div className="space-y-12">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="text-2xl font-semibold">Smart Context Surfacing</h3>
              </div>
              <p className="text-slate-400 ml-14">Shows relevant documentation, PRs, and snippets exactly when you need them, without asking.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-purple-500" />
                </div>
                <h3 className="text-2xl font-semibold">Predictive Automation</h3>
              </div>
              <p className="text-slate-400 ml-14">Learns your repetitive patterns. Notice you always create these 3 config files? The agent will do it next time.</p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-2xl font-semibold">Proof of Compile</h3>
              </div>
              <p className="text-slate-400 ml-14">Runs generated code inside an isolated Docker sandbox before presenting the PR for human approval.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Cog className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="text-2xl font-semibold">Background Tasks</h3>
              </div>
              <p className="text-slate-400 ml-14">Auto-handles dependency updates, PR descriptions, linting fixes, and doc-gen purely in the background.</p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
            className="glass-card border border-white/10 rounded-2xl relative overflow-hidden flex flex-col shadow-2xl h-[600px]"
          >
            {/* Live Terminal Chrome */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-black/60">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="text-xs font-mono text-slate-400">~/pipeline/orchestrator</div>
            </div>

            {/* Terminal Input */}
            <form onSubmit={runPipeline} className="p-4 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-2 mb-2">
                <FastForward className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-semibold">Live Multi-Agent Run</span>
              </div>
              <div className="flex gap-2">
                <input 
                   disabled={isRunning}
                   placeholder="e.g. Set up a secure Express.js server with CORS."
                   className="flex-1 bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50 font-mono"
                   value={task}
                   onChange={e => setTask(e.target.value)}
                />
                <button 
                  disabled={isRunning || !task.trim()}
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm font-semibold disabled:opacity-50 transition-colors flex items-center justify-center min-w-[100px]"
                >
                  {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : "Orchestrate"}
                </button>
              </div>
            </form>

            {/* Output Stream */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-4">
              {logs.length === 0 && (
                <div className="text-slate-500 h-full flex items-center justify-center italic text-center">
                  Submit a task to witness the 4 AI Agents <br/> work in real-time sequence.
                </div>
              )}
              {logs.map((log, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  key={i} 
                  className="leading-relaxed whitespace-pre-wrap"
                >
                  <span className={`font-semibold mr-2 ${getStepColor(log.step)} uppercase`}>
                    [{log.step}]
                  </span>
                  {log.status === 'running' ? (
                    <span className="text-slate-400 flex items-center inline-flex gap-2">
                      <Loader2 className="w-3 h-3 animate-spin"/> Processing...
                    </span>
                  ) : (
                    <span className="text-slate-300">{log.message}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
