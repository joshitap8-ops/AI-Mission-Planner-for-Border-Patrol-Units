import React, { useEffect, useState } from 'react';

export default function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sequence = [
      "Initializing AI Core...",
      "Loading Tactical Modules...",
      "Connecting to Satellite Grid...",
      "Establishing Secure Link...",
      "System Ready."
    ];

    let i = 0;
    const interval = setInterval(() => {
      setLogs(prev => [...prev, sequence[i]]);
      setProgress(((i + 1) / sequence.length) * 100);
      i++;
      if (i === sequence.length) {
        clearInterval(interval);
        setTimeout(onComplete, 1000);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="h-screen bg-bg flex flex-col items-center justify-center font-mono text-accent relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-accent rounded-full animate-spin-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-accent/40 rounded-full animate-spin-slow [animation-direction:reverse]" />
      </div>

      <div className="relative z-10 w-full max-w-md px-8 text-center">
        <div className="text-4xl font-black mb-2 tracking-tighter glow-cyan">AEGIS TACTICAL</div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-accent/60 mb-12">Intelligence & Mission Planning System</div>
        
        <div className="space-y-3 text-left mb-8 min-h-[120px]">
          {logs.map((log, i) => (
            <div key={i} className="flex gap-3 text-[11px] animate-in fade-in slide-in-from-left-2 duration-300">
              <span className="text-accent/40">[{new Date().toLocaleTimeString('en-US', { hour12: false })}]</span>
              <span className="text-accent tracking-wide uppercase">➤ {log}</span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/5 relative overflow-hidden mb-4">
          <div 
            className="absolute top-0 left-0 h-full bg-accent transition-all duration-500 ease-out glow-border shadow-[0_0_10px_rgba(0,255,65,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-[8px] uppercase tracking-widest text-accent/40">
          <span>Boot Sequence</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
      
      <div className="absolute bottom-8 text-[9px] uppercase tracking-widest text-text-dim">
        v4.1.2 // Secure Session: {Math.random().toString(36).substring(2, 10).toUpperCase()}
      </div>
    </div>
  );
}
