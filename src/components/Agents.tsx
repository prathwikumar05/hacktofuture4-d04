import { motion } from "motion/react";
import { Brain, Network, TerminalSquare, ShieldAlert } from "lucide-react";

const agents = [
  {
    id: "01",
    name: "Contextualizer Agent",
    icon: Network,
    color: "from-blue-500 to-cyan-400",
    shadow: "shadow-cyan-500/20",
    features: [
      "Detects task changes globally",
      "Reads Jira tickets automatically",
      "Retrieves exact documentation",
      "Understands deep codebase context"
    ]
  },
  {
    id: "02",
    name: "Strategist Agent",
    icon: Brain,
    color: "from-purple-500 to-pink-500",
    shadow: "shadow-purple-500/20",
    features: [
      "Powered by Gemini / Claude models",
      "Creates step-by-step implementation plans",
      "Suggests structural / architectural best practices",
      "Foresees technical debt"
    ]
  },
  {
    id: "03",
    name: "Execution Agent",
    icon: TerminalSquare,
    color: "from-green-500 to-emerald-400",
    shadow: "shadow-emerald-500/20",
    features: [
      "Writes boilerplate & CRUD operations",
      "Generates config files instantly",
      "Updates dependencies proactively",
      "Fixes lint & formatting issues"
    ]
  },
  {
    id: "04",
    name: "Governance Agent",
    icon: ShieldAlert,
    color: "from-orange-500 to-red-500",
    shadow: "shadow-red-500/20",
    features: [
      "Real-time risk scoring engine",
      "Checks business logic impact",
      "Human-in-the-loop approval system",
      "Security & compliance checks"
    ]
  }
];

export function Agents() {
  return (
    <section id="agents" className="py-24 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">4 AI Agents</span>
            </h2>
            <p className="text-white/60 text-lg">
              We created a proactive AI DevOps assistant that continuously helps engineers by understanding workspace context, automating boring work, and ensuring safe autonomous execution.
            </p>
          </div>
          <div className="font-mono text-sm text-white/40 uppercase tracking-widest border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            Swarm Architecture
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {agents.map((agent, idx) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`glass-card p-8 border border-white/5 relative overflow-hidden group hover:border-white/20 transition-all duration-300 ${agent.shadow} hover:shadow-2xl`}
            >
              {/* Giant Background Number */}
              <div className="absolute -right-4 -bottom-10 text-[120px] font-bold text-white/[0.03] select-none pointer-events-none font-mono">
                {agent.id}
              </div>

              <div className={`w-14 h-14 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-br ${agent.color}`}>
                <agent.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-2xl font-bold mb-4">{agent.name}</h3>

              <ul className="space-y-3 relative z-10">
                {agent.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-white/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-current mt-2 opacity-50" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
