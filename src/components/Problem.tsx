import { motion } from "motion/react";
import { AlertTriangle, Clock, Search, Layers, GitPullRequest, BrainCircuit } from "lucide-react";

const problems = [
  { icon: Layers, title: "Context Switching", desc: "Jumping between Jira, IDE, Slack, and Docs breaks flow state." },
  { icon: Clock, title: "Repetitive Boilerplate", desc: "Wasting hours writing the same setup code over and over." },
  { icon: Search, title: "Manual Documentation", desc: "Endlessly searching for outdated internal documentation." },
  { icon: GitPullRequest, title: "Slow PR Workflows", desc: "Blocked by formatting, linting, and trivial dependency issues." },
  { icon: BrainCircuit, title: "Mental Fatigue", desc: "High cognitive load from multitasking and constant interruptions." },
];

export function Problem() {
  return (
    <section className="py-24 px-4 bg-black/40 border-y border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-4 mb-6 bg-red-500/5 items-center justify-center border-l-[3px] border-red-500 rounded text-left inline-block"
          >
            <h4 className="flex items-center gap-2 text-[12px] text-red-500 font-bold uppercase mb-1">
              <AlertTriangle className="w-4 h-4" /> The Cognitive Load Crisis
            </h4>
            <p className="text-[13px] opacity-80 text-white leading-relaxed">Context switching between Jira, IDE, Slack, and Docs kills 40% of developer productivity every day.</p>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Why Developers Need This?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg"
          >
            Modern developers are overwhelmed. Our mental bandwidth is consumed by tooling, 
            context switching, and repetitive toil instead of actual problem-solving.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((prob, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
              className="glass-card p-6 border border-white/5 hover:border-white/10 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
                <prob.icon className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{prob.title}</h3>
              <p className="text-white/50 leading-relaxed">{prob.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
