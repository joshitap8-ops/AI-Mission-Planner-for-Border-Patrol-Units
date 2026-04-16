import React from 'react';
import { motion } from 'motion/react';
import { Target, Activity, Zap, Cpu, Video, Satellite } from 'lucide-react';

export default function Intelligence() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-mono">
      {/* Simulation Feeds */}
      <div className="space-y-8">
        {/* Drone Feed */}
        <div className="data-panel p-0 overflow-hidden group">
          <div className="bg-accent/10 border-b border-accent/20 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] text-accent font-black uppercase">
              <Video className="w-3 h-3" />
              Drone Feed – Live (Simulated)
            </div>
            <div className="text-[8px] text-accent/50">CAM-04 // 4K 60FPS</div>
          </div>
          <div className="relative aspect-video bg-black/80 flex items-center justify-center">
            {/* Animated Feed Background */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.2),transparent_70%)]" />
            <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/terrain/800/450')] bg-cover opacity-10 mix-blend-overlay grayscale" />
            
            {/* Target Tracking UI */}
            <div className="absolute inset-4 border border-accent/10 pointer-events-none">
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-accent" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-accent" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-accent" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-accent" />
            </div>

            {/* Simulated Detection Boxes */}
            <motion.div
              animate={{ 
                x: [0, 40, -20, 0],
                y: [0, -30, 10, 0]
              }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute w-20 h-20 border-2 border-warning/40 flex flex-col items-center justify-center"
            >
              <div className="absolute -top-4 left-0 text-[8px] bg-warning/20 text-warning px-1 font-black whitespace-nowrap">OBJ-242: UNKNOWN</div>
              <Target className="w-8 h-8 text-warning opacity-40" />
            </motion.div>

            <motion.div
              animate={{ 
                x: [-100, -80, -110, -100],
                y: [50, 70, 40, 50]
              }}
              transition={{ duration: 15, repeat: Infinity }}
              className="absolute w-12 h-12 border border-accent/40 flex flex-col items-center justify-center"
            >
              <div className="absolute -top-4 left-0 text-[8px] bg-accent/20 text-accent px-1 font-black whitespace-nowrap">OBJ-882: PATROL</div>
            </motion.div>

            <div className="absolute bottom-4 left-4 text-[9px] text-accent font-mono space-y-1">
              <div>ALT: 1,420m</div>
              <div>SPD: 84 km/h</div>
              <div>AZM: 182°</div>
            </div>
          </div>
        </div>

        {/* Satellite Analysis */}
        <div className="data-panel p-0 overflow-hidden">
          <div className="bg-accent/10 border-b border-accent/20 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] text-accent font-black uppercase">
              <Satellite className="w-3 h-3" />
              Satellite Analysis – AI Enhanced
            </div>
            <div className="text-[8px] text-accent/50">RES-0.5M // MULTI-SPECTRAL</div>
          </div>
          <div className="p-4 grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-[9px] text-text-dim uppercase tracking-widest">Terrain Status</div>
              <div className="p-2 border border-accent/10 rounded flex items-center gap-3">
                <div className="w-1 h-8 bg-accent/40" />
                <div className="text-[10px] text-white">Mountainous / Snow Coverage 84%</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-[9px] text-text-dim uppercase tracking-widest">Thermal Detection</div>
              <div className="p-2 border border-accent/10 rounded flex items-center gap-3">
                <div className="w-1 h-8 bg-warning/40" />
                <div className="text-[10px] text-white">3 Heat Signatures (Sector Bravo)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Intelligence Insights */}
      <div className="space-y-8">
        <div className="data-panel p-6 space-y-6 h-full">
          <div className="flex items-center gap-2 text-xs font-black text-white uppercase border-b border-white/5 pb-4">
            <Cpu className="w-4 h-4 text-accent" />
            Strategic Intelligence Output
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-text-dim uppercase tracking-widest">Pattern Recognition</span>
                <span className="text-[10px] text-accent font-bold">94% CONFIDENCE</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "94%" }}
                  className="h-full bg-accent shadow-[0_0_10px_#00ff41]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-accent/5 border border-accent/10 rounded">
                <div className="flex items-center gap-2 text-[11px] text-accent font-bold mb-2">
                  <Zap className="w-3 h-3" />
                  AI OBSERVATION
                </div>
                <p className="text-[10px] text-slate-300 leading-relaxed italic">
                  "Thermal signatures in Sector Bravo match standard encampment patterns. High probability of multi-unit coordination."
                </p>
              </div>

              <div className="p-4 bg-warning/5 border border-warning/10 rounded">
                <div className="flex items-center gap-2 text-[11px] text-warning font-bold mb-2">
                  <Activity className="w-3 h-3" />
                  THREAT FORECAST
                </div>
                <p className="text-[10px] text-slate-300 leading-relaxed italic">
                  "Movement patterns indicate potential deployment towards Border Zone 4 within the next 120 minutes."
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5">
              <div className="text-[10px] text-text-dim uppercase tracking-widest mb-4">Recommended Actions</div>
              <div className="space-y-2">
                {[
                  "Deploy Drone Recon to Sector Bravo",
                  "Increase Alert Level for Zone 4 patrols",
                  "Verify heat signatures with high-res optical feed"
                ].map((action, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                    <span className="text-[11px] text-white/80">{action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
