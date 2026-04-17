import { motion } from "motion/react";
import { CheckCircle2, Trophy } from "lucide-react";

export function TechInfo() {
  return (
    <div className="relative z-10 w-full" id="stack">
      {/* Tech Stack Section */}
      <section className="py-24 px-4 border-y border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight mb-12 text-center text-white/90">Powered By</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
            {["React.js", "Tailwind CSS", "Framer Motion", "Node.js", "Express", "LangGraph", "Gemini API", "Claude API", "MongoDB", "ChromaDB", "Docker", "GitHub Actions"].map((tech, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="glass-card py-4 px-2 border border-white/5 font-mono text-sm text-white/70 hover:text-white hover:border-white/20 transition-colors"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Impact on Teams</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "60% Faster Development", desc: "Drastically reduce time spent on boilerplate and setup." },
              { title: "Reduced Mental Load", desc: "No more context switching. Stay focused on hard problems." },
              { title: "Less Repetitive Work", desc: "Automate chores that machines are better at doing." },
              { title: "Faster Releases", desc: "Unblock PRs faster with auto-formatting and tests." },
              { title: "Safe Automation", desc: "Compile-checks and human-in-the-loop prevent bad code." },
              { title: "Better DX", desc: "Happy developers are productive developers." },
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-6 border border-white/5 border-l-4 border-l-blue-500 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-500" />
                  <h3 className="text-xl font-bold">{stat.title}</h3>
                </div>
                <p className="text-slate-400 ml-8">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Hackathon Section */}
      <section className="py-24 px-4 border-t border-white/5 bg-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xs uppercase tracking-wide text-slate-500 mb-8">Developed by Elite Hackers</h2>
          
          <div className="flex flex-wrap justify-center gap-6">
            {["Prathwikumar M G", "Navneet B", "Aniket G", "Tejas S"].map((name, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="font-medium text-slate-400"
              >
                {name}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
