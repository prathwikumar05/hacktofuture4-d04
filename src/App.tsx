/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Problem } from "./components/Problem";
import { Agents } from "./components/Agents";
import { Features } from "./components/Features";
import { Workflow } from "./components/Workflow";
import { TechInfo } from "./components/TechInfo";
import { LiveDemo } from "./components/LiveDemo";
import { Terminal } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen relative selection:bg-blue-500 selection:text-white">
      {/* Global Background Atmosphere effect */}
      <div className="atmosphere">
        <div className="bg-glow glow-blue"></div>
        <div className="bg-glow glow-purple"></div>
      </div>
      
      <Navbar />

      <main className="pt-20">
        <Hero />
        <Problem />
        <Agents />
        <LiveDemo />
        <Features />
        <Workflow />
        <TechInfo />
      </main>

      <footer className="py-8 border-t border-white/5 glass-card text-center relative z-10 bg-transparent">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Terminal className="w-5 h-5 text-blue-500" />
          <span className="font-sans font-bold tracking-tight text-white uppercase text-sm">AD-PLATFORM //</span>
        </div>
        <p className="text-slate-500 text-xs uppercase tracking-wide">Developed by Elite Hackers</p>
      </footer>
    </div>
  );
}
