import { motion } from "motion/react";
import { Terminal, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card mx-4 mt-4 px-6 py-4 flex items-center justify-between border border-white/10 rounded-2xl bg-white/5 backdrop-blur-xl">
      <div className="flex items-center gap-2 text-white">
        <span className="font-sans font-bold tracking-wider text-base uppercase text-blue-500">AD-PLATFORM //</span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-wider text-white/70">
        <a href="#agents" className="hover:text-white transition-colors">Architecture</a>
        <a href="#features" className="hover:text-white transition-colors">Agent Network</a>
        <a href="#workflow" className="hover:text-white transition-colors">Integrations</a>
        <a href="#stack" className="hover:text-white transition-colors">Docs</a>
      </div>

      <div className="hidden md:flex gap-4">
        <button className="px-5 py-2 text-sm font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          Start Free
        </button>
      </div>

      <button 
        className="md:hidden text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-4 glass-card p-4 flex flex-col gap-4 border !border-white/5 bg-black/80"
        >
          <a href="#agents" onClick={() => setIsOpen(false)} className="text-sm font-medium text-white/70 hover:text-white p-2">Agents</a>
          <a href="#features" onClick={() => setIsOpen(false)} className="text-sm font-medium text-white/70 hover:text-white p-2">Features</a>
          <a href="#workflow" onClick={() => setIsOpen(false)} className="text-sm font-medium text-white/70 hover:text-white p-2">Workflow</a>
          <div className="h-px bg-white/10 my-2" />
          <button className="w-full px-5 py-3 text-sm font-medium bg-white text-black rounded-lg hover:bg-white/90 transition-colors">
            Start Free
          </button>
        </motion.div>
      )}
    </nav>
  );
}
