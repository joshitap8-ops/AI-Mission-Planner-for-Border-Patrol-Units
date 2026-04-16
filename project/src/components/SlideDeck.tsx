import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Shield, 
  AlertTriangle, 
  Zap, 
  Cpu, 
  Layers, 
  Target, 
  TrendingUp, 
  Lightbulb, 
  Code, 
  FastForward, 
  CheckCircle2,
  XCircle,
  ArrowRight,
  Globe,
  Radar,
  Activity,
  Terminal,
  Radio
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SlideDeckProps {
  onExit: () => void;
}

const slides = [
  {
    id: 'title',
    title: 'AI-Powered Mission Planner',
    subtitle: 'Defence Operations Interface',
    tagline: '“Smarter Decisions. Faster Missions. Safer Outcomes.”',
    content: (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="relative mb-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-16 border border-accent/20 rounded-full border-dashed"
          />
          <Shield className="w-32 h-32 text-accent glow-cyan" />
        </div>
        <h1 className="massive-type text-white mb-4 glow-cyan text-center">AEGIS TACTICAL</h1>
        <p className="text-accent font-mono tracking-[0.5em] uppercase text-sm mb-12">Mission Planning System</p>
        <div className="grid grid-cols-2 gap-8 text-[10px] font-mono text-text-dim uppercase tracking-widest border-t border-white/5 pt-8">
          <div>Team: Aegis Strategic</div>
          <div>Event: Techo Expo 2024</div>
        </div>
      </div>
    )
  },
  {
    id: 'problem',
    title: 'The Critical Gap',
    subtitle: 'Real-World Operational Challenges',
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-warning">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-xl font-bold uppercase tracking-tight">The Problem</h3>
            </div>
            <ul className="space-y-4 text-sm font-mono text-slate-300">
              <li className="flex gap-3"><XCircle className="w-4 h-4 text-warning shrink-0" /> Manual planning is slow & error-prone</li>
              <li className="flex gap-3"><XCircle className="w-4 h-4 text-warning shrink-0" /> Lack of real-time intelligence integration</li>
              <li className="flex gap-3"><XCircle className="w-4 h-4 text-warning shrink-0" /> Poor multi-unit coordination (Air/Land/Sea)</li>
              <li className="flex gap-3"><XCircle className="w-4 h-4 text-warning shrink-0" /> Static plans fail in dynamic battlefields</li>
            </ul>
          </div>
          <div className="p-6 bg-warning/10 border-l-4 border-warning">
            <p className="text-xl font-bold text-white italic">“In modern warfare, delay = danger.”</p>
          </div>
        </div>
        <div className="ai-box-accent p-8">
          <div className="text-[10px] text-text-dim uppercase mb-6">Before vs After AI</div>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/5">
              <div className="text-warning font-bold">Manual</div>
              <div className="text-accent font-bold">Aegis AI</div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-[11px] font-mono">
              <div className="text-slate-500">Hours of Planning</div>
              <div className="text-white">Seconds to Minutes</div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-[11px] font-mono">
              <div className="text-slate-500">Reactive Stance</div>
              <div className="text-white">Predictive Strategy</div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-[11px] font-mono">
              <div className="text-slate-500">High Human Risk</div>
              <div className="text-white">Risk Optimized</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'solution',
    title: 'The Aegis Solution',
    subtitle: 'Next-Gen Strategic Intelligence',
    content: (
      <div className="flex flex-col gap-12 h-full justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Globe, title: 'Terrain Analysis', desc: 'Real-time GIS & weather integration' },
            { icon: Zap, title: 'Rapid Strategy', desc: 'AI-suggested optimal mission paths' },
            { icon: Layers, title: 'Multi-Unit', desc: 'Seamless Air, Land, and Naval coordination' }
          ].map((item, i) => (
            <div key={i} className="ai-box-accent p-6 flex flex-col items-center text-center gap-4">
              <item.icon className="w-10 h-10 text-accent" />
              <h4 className="font-bold text-white uppercase tracking-tight">{item.title}</h4>
              <p className="text-[11px] text-text-dim leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-white mb-4">Faster planning (minutes vs hours)</p>
          <div className="inline-block px-6 py-2 bg-accent/10 border border-accent/30 text-accent font-mono text-xs uppercase tracking-widest">
            Data-Driven Decisions at Scale
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'features',
    title: 'Operational Capabilities',
    subtitle: 'Core System Features',
    content: (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-full items-center">
        {[
          { icon: Target, title: 'Planning', list: ['Route Optimization', 'Risk Assessment'] },
          { icon: Radar, title: 'Intelligence', list: ['Satellite Feeds', 'Enemy Prediction'] },
          { icon: Cpu, title: 'AI Support', list: ['Strategy Suggestion', 'Success Probability'] },
          { icon: Activity, title: 'Real-Time', list: ['Troop Tracking', 'Threat Alerts'] }
        ].map((feat, i) => (
          <div key={i} className="h-full border border-white/5 bg-black/20 p-6 flex flex-col gap-4">
            <feat.icon className="w-8 h-8 text-accent" />
            <h4 className="font-bold text-white text-sm uppercase tracking-widest">{feat.title}</h4>
            <ul className="space-y-2">
              {feat.list.map((item, j) => (
                <li key={j} className="text-[10px] font-mono text-text-dim flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full" /> {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )
  },
  {
    id: 'architecture',
    title: 'System Architecture',
    subtitle: 'Secure & Scalable Infrastructure',
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-12">
        <div className="flex items-center gap-8 w-full max-w-4xl">
          <div className="flex-1 ai-box-accent p-6 text-center">
            <div className="text-[10px] text-text-dim uppercase mb-4">Input</div>
            <div className="space-y-2 text-xs font-mono">
              <div>Drone Feeds</div>
              <div>Satellite Data</div>
              <div>Sensors</div>
            </div>
          </div>
          <ArrowRight className="w-8 h-8 text-accent animate-pulse" />
          <div className="flex-1 bg-accent text-bg p-8 text-center font-black rounded shadow-[0_0_30px_rgba(0,242,255,0.3)]">
            <div className="text-[10px] uppercase mb-4">Processing</div>
            <div className="text-xl">AI/ML MODELS</div>
            <div className="text-[9px] mt-2 opacity-70">SECURE EDGE COMPUTING</div>
          </div>
          <ArrowRight className="w-8 h-8 text-accent animate-pulse" />
          <div className="flex-1 ai-box-accent p-6 text-center">
            <div className="text-[10px] text-text-dim uppercase mb-4">Output</div>
            <div className="space-y-2 text-xs font-mono">
              <div>HUD Dashboard</div>
              <div>Mission Recs</div>
            </div>
          </div>
        </div>
        <div className="flex gap-12 font-mono text-[10px] text-text-dim uppercase tracking-[0.3em]">
          <span>Cloud Computing</span>
          <span>Edge AI</span>
          <span>Secure Comms</span>
        </div>
      </div>
    )
  },
  {
    id: 'ai-components',
    title: 'AI Intelligence Core',
    subtitle: 'The Brain Behind the Mission',
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 h-full items-center">
        <div className="space-y-8">
          {[
            { title: 'Pathfinding', desc: 'A* and RL-based shortest safe route calculation in complex terrains.' },
            { title: 'Threat Detection', desc: 'Computer Vision for real-time enemy asset identification from drone feeds.' },
            { title: 'Predictive Analytics', desc: 'Forecasting enemy movements and mission success probability.' }
          ].map((item, i) => (
            <div key={i} className="space-y-2">
              <h4 className="text-accent font-bold uppercase tracking-widest flex items-center gap-3">
                <div className="w-2 h-2 bg-accent" /> {item.title}
              </h4>
              <p className="text-sm text-slate-300 font-mono leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="relative aspect-square bg-black/40 border border-accent/20 rounded-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0%,rgba(0,242,255,0.1)_50%,transparent_100%)] animate-spin-slow" />
          <Cpu className="w-24 h-24 text-accent glow-cyan relative z-10" />
          <div className="absolute bottom-10 font-mono text-[10px] text-accent/40">NEURAL NETWORK ACTIVE</div>
        </div>
      </div>
    )
  },
  {
    id: 'demo',
    title: 'UI/UX Interface',
    subtitle: 'Military-Grade HUD Design',
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full items-center">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white">Designed for the Field</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            A high-contrast, dark-theme interface optimized for low-light environments and rapid data ingestion.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-xs font-mono">
              <CheckCircle2 className="w-4 h-4 text-accent" /> Radar-style tactical map visualization
            </li>
            <li className="flex items-center gap-3 text-xs font-mono">
              <CheckCircle2 className="w-4 h-4 text-accent" /> Real-time enemy detection alerts
            </li>
            <li className="flex items-center gap-3 text-xs font-mono">
              <CheckCircle2 className="w-4 h-4 text-accent" /> Dynamic route suggestions & success metrics
            </li>
          </ul>
        </div>
        <div className="relative border border-accent/30 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(0,242,255,0.1)]">
          <div className="bg-accent/10 p-2 border-b border-accent/20 flex gap-2">
            <div className="w-2 h-2 rounded-full bg-accent/40" />
            <div className="w-2 h-2 rounded-full bg-accent/40" />
            <div className="w-2 h-2 rounded-full bg-accent/40" />
          </div>
          <div className="aspect-video bg-bg flex items-center justify-center p-4">
            <div className="w-full h-full border border-accent/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.05)_0%,transparent_70%)]" />
              <Radar className="w-12 h-12 text-accent/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute top-4 left-4 w-20 h-1 bg-accent/20" />
              <div className="absolute bottom-4 right-4 text-[8px] font-mono text-accent/40">SYSTEM_HUD_MOCK</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'use-case',
    title: 'Use Case: Border Surveillance',
    subtitle: 'Operational Scenario Execution',
    content: (
      <div className="flex flex-col gap-8 h-full justify-center">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { step: '01', title: 'Detection', desc: 'AI detects unusual movement at sector 7G' },
            { step: '02', title: 'Analysis', desc: 'System identifies asset as hostile drone' },
            { step: '03', title: 'Strategy', desc: 'AI suggests optimal intercept route' },
            { step: '04', title: 'Action', desc: 'Command re-routes troops safely' }
          ].map((item, i) => (
            <div key={i} className="ai-box-accent p-6 relative">
              <div className="text-4xl font-black text-accent/10 absolute top-2 right-4">{item.step}</div>
              <h4 className="font-bold text-white mb-2 uppercase">{item.title}</h4>
              <p className="text-[11px] text-text-dim leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="p-6 bg-accent/5 border border-accent/20 text-center">
          <p className="text-lg font-bold text-white italic">“Not just planning — intelligent battlefield assistance.”</p>
        </div>
      </div>
    )
  },
  {
    id: 'innovation',
    title: 'Innovation & USP',
    subtitle: 'What Sets Aegis Apart',
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 h-full items-center">
        <div className="space-y-8">
          {[
            { title: 'Battlefield Adaptation', desc: 'Real-time strategy adjustment based on live sensor data.' },
            { title: 'Multi-Domain Integration', desc: 'Unified command for land, air, and sea operations.' },
            { title: 'Predictive Outcomes', desc: 'AI-driven simulation of mission success before deployment.' }
          ].map((item, i) => (
            <div key={i} className="flex gap-6">
              <div className="w-12 h-12 shrink-0 bg-accent text-bg flex items-center justify-center font-black text-xl">
                {i + 1}
              </div>
              <div className="space-y-1">
                <h4 className="text-white font-bold uppercase tracking-widest">{item.title}</h4>
                <p className="text-xs text-text-dim font-mono">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="ai-box-accent p-10 text-center">
          <Lightbulb className="w-16 h-16 text-accent mx-auto mb-6 glow-cyan" />
          <h3 className="text-2xl font-bold text-white mb-4">Unique Selling Point</h3>
          <p className="text-sm text-slate-300 italic">
            "Aegis transforms defence operations from reactive to predictive, ensuring faster, safer, and smarter missions."
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'tech-stack',
    title: 'Technology Stack',
    subtitle: 'Robust & Modern Frameworks',
    content: (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 h-full items-center">
        {[
          { icon: Code, title: 'Frontend', tech: 'React / Tailwind' },
          { icon: Terminal, title: 'Backend', tech: 'Node.js / Express' },
          { icon: Cpu, title: 'AI Engine', tech: 'Google Gemini / ML' },
          { icon: Globe, title: 'Maps', tech: 'D3.js / GIS' }
        ].map((item, i) => (
          <div key={i} className="ai-box-accent p-8 flex flex-col items-center text-center gap-4">
            <item.icon className="w-10 h-10 text-accent" />
            <h4 className="font-bold text-white uppercase tracking-tight">{item.title}</h4>
            <div className="px-3 py-1 bg-white/5 rounded text-[10px] font-mono text-accent">
              {item.tech}
            </div>
          </div>
        ))}
      </div>
    )
  },
  {
    id: 'future',
    title: 'Future Scope',
    subtitle: 'The Road Ahead',
    content: (
      <div className="flex flex-col gap-12 h-full justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Radar, title: 'Autonomous Drones', desc: 'Direct integration with drone swarm control systems.' },
            { icon: Activity, title: 'AR Visualization', desc: 'Augmented Reality battlefield overlays for field commanders.' },
            { icon: Radio, title: 'Voice Command', desc: 'Natural language interface for hands-free mission control.' }
          ].map((item, i) => (
            <div key={i} className="space-y-4 border-l-2 border-accent/20 pl-6">
              <item.icon className="w-8 h-8 text-accent" />
              <h4 className="font-bold text-white uppercase tracking-widest">{item.title}</h4>
              <p className="text-xs text-text-dim leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-accent font-mono text-[10px] uppercase tracking-[0.4em]">
            <FastForward className="w-4 h-4" />
            Scaling Strategic Intelligence
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'conclusion',
    title: 'Mission Complete',
    subtitle: 'Strategic Summary',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <Shield className="w-24 h-24 text-accent mb-12 glow-cyan" />
        <h2 className="massive-type text-white mb-8 glow-cyan">READY FOR DEPLOYMENT</h2>
        <p className="text-xl text-slate-300 max-w-2xl font-mono leading-relaxed mb-12">
          “AI Mission Planner transforms defence operations from reactive to predictive, ensuring faster, safer, and smarter missions.”
        </p>
        <div className="flex gap-4">
          <div className="px-8 py-3 bg-accent text-bg font-bold uppercase tracking-widest text-xs">
            SECURE CHANNEL ACTIVE
          </div>
        </div>
      </div>
    )
  }
];

export default function SlideDeck({ onExit }: SlideDeckProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-bg text-accent font-sans flex flex-col overflow-hidden">
      <div className="scanline" />
      
      {/* Header */}
      <header className="h-20 border-b border-accent/20 flex justify-between items-center px-10 bg-black/40">
        <div className="flex items-center gap-4">
          <Shield className="w-6 h-6 text-accent" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-text-dim">Presentation Mode</span>
            <span className="font-bold text-white text-xs uppercase tracking-tight">Aegis Tactical AI</span>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="text-[10px] font-mono text-text-dim uppercase tracking-widest">
            Slide {currentSlide + 1} / {slides.length}
          </div>
          <button 
            onClick={onExit}
            className="px-4 py-2 border border-warning/50 text-warning text-[10px] font-bold uppercase tracking-widest hover:bg-warning/10 transition-colors"
          >
            Exit Presentation
          </button>
        </div>
      </header>

      {/* Main Slide Area */}
      <main className="flex-1 relative overflow-hidden px-20 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="h-full flex flex-col"
          >
            <div className="mb-12">
              <span className="text-[10px] uppercase tracking-[0.4em] text-accent/60 font-mono block mb-2">
                {slides[currentSlide].subtitle}
              </span>
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter">
                {slides[currentSlide].title}
              </h2>
            </div>
            <div className="flex-1">
              {slides[currentSlide].content}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer / Navigation */}
      <footer className="h-24 border-t border-accent/20 flex items-center justify-between px-10 bg-black/40">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "h-1 transition-all duration-300",
                i === currentSlide ? "w-8 bg-accent" : "w-2 bg-accent/20"
              )} 
            />
          ))}
        </div>
        <div className="flex gap-4">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-4 border border-accent/20 text-accent disabled:opacity-20 hover:bg-accent/10 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="p-4 bg-accent text-bg disabled:opacity-20 hover:bg-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </footer>
    </div>
  );
}
