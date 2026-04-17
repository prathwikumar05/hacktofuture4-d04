import { motion } from "motion/react";
import { Terminal, ArrowRight, Play, Database, Cpu } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 px-4 overflow-hidden">
      
      {/* No decorative elements here since they are globally placed via index.css */}

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[11px] font-semibold uppercase tracking-wider mb-8">
          <span>NEXT-GEN MULTI-AGENT SYSTEM</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1] text-white">
          Agentic Developer Platform
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Stay in flow. Let AI handle the toil. Proactive orchestration for elite engineering teams.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#demo" className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-transform hover:scale-105 border-none">
            🚀 Live Demo
          </a>
          
          <a href="#agents" className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-white/5 text-white rounded-lg font-semibold hover:bg-white/10 transition-transform hover:scale-105 border border-white/10">
            Meet AI Agents
          </a>
        </div>
      </motion.div>

      {/* Floating abstract tech widgets */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="hidden lg:flex absolute top-1/4 left-[10%] glass-card p-4 items-center gap-4 border border-white/5 shadow-2xl shadow-black"
      >
        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
          <Cpu className="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <div className="text-xs text-white/50 font-mono uppercase mb-1">Status</div>
          <div className="text-sm font-medium">Context Syncing...</div>
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
        className="hidden lg:flex absolute bottom-1/3 right-[10%] glass-card p-4 items-center gap-4 border border-white/5 shadow-2xl shadow-black"
      >
        <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
          <Database className="w-5 h-5 text-purple-500" />
        </div>
        <div>
          <div className="text-xs text-white/50 font-mono uppercase mb-1">Background Task</div>
          <div className="text-sm font-medium">Updating Dependencies</div>
        </div>
      </motion.div>
    </section>
  );
}
