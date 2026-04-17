import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";

const steps = [
  "Developer opens task",
  "Context Agent gathers data",
  "Strategist creates plan",
  "Execution agent writes code",
  "Governance checks risk",
  "Docker validates output",
  "Safe changes auto-submit",
  "High-risk asks approval"
];

export function Workflow() {
  return (
    <section id="workflow" className="py-24 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-16 text-center">How It Works</h2>
        
        <div className="relative border-l border-white/10 ml-4 md:ml-1/2">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ delay: idx * 0.1 }}
              className={`relative mb-8 pl-8 md:pl-0 ${idx % 2 === 0 ? "md:pr-12 md:text-right md:left-[calc(-50%-2rem)]" : "md:pl-12 md:left-2"}`}
            >
              {/* Timeline Dot */}
              <div className={`absolute top-1.5 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] ${idx % 2 === 0 ? "-left-[1.35rem] md:left-auto md:-right-[1.95rem]" : "-left-[1.35rem] md:-left-[0.45rem]"}`} />
              
              <div className={`glass-card p-4 border inline-block ${idx % 2 === 0 ? "border-r-blue-500/30 border-y-white/5 border-l-white/5" : "border-l-purple-500/30 border-y-white/5 border-r-white/5"} md:min-w-[250px]`}>
                <div className="text-xs font-mono text-white/40 mb-1">Step 0{idx + 1}</div>
                <div className="font-medium">{step}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
