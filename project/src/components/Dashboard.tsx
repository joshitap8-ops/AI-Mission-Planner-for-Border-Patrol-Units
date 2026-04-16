import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Target, 
  Zap, 
  Cpu, 
  Activity, 
  AlertTriangle, 
  Send, 
  Loader2,
  ChevronRight,
  Terminal,
  Globe,
  Radar,
  Bell,
  Clock
} from 'lucide-react';
import TacticalMap from './TacticalMap';
import Sidebar from './Sidebar';
import { generateMissionPlan, MissionPlan } from '@/src/services/geminiService';
import { cn } from '@/src/lib/utils';

import Intelligence from './Intelligence';
import Alerts from './Alerts';

interface DashboardProps {
  onStartPresentation: () => void;
}

export default function Dashboard({ onStartPresentation }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [objective, setObjective] = useState('');
  const [loading, setLoading] = useState(false);
  const [missionPlan, setMissionPlan] = useState<MissionPlan | null>(null);
  const [logs, setLogs] = useState<string[]>(['System initialized.', 'Waiting for mission parameters...']);
  const [time, setTime] = useState(new Date());
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (startTime) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime]);

  const formatElapsed = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      }, () => {
        setLocation({ lat: 28.6139, lng: 77.2090 });
      });
    }
  }, []);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev.slice(-4), `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handlePlanMission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!objective.trim()) return;
    setLoading(true);
    addLog(`Analyzing objective: ${objective}`);
    try {
      const plan = await generateMissionPlan(objective);
      setMissionPlan(plan);
      setStartTime(Date.now());
      setElapsedTime(0);
      addLog(`Mission strategy generated: ${plan.title}`);
    } catch (error) {
      addLog("ERROR: AI Strategic Uplink failed.");
      const mockPlan: MissionPlan = {
        title: "Tactical Response Alpha",
        objective: objective,
        analysis: "Aerial surveillance indicates heavy terrain obstruction in the northern corridor, suggesting a low-altitude ground approach.",
        threats: [
          { lat: 34.2, lng: 74.5, type: "Mobile Radar" },
          { lat: 34.5, lng: 74.9, type: "Enemy Outpost" }
        ],
        safeZones: [
          { lat: 34.0, lng: 74.2 },
          { lat: 33.8, lng: 74.8 }
        ],
        route: [
          [34.0, 74.2], [34.1, 74.4], [34.3, 74.6], [34.4, 74.8], [34.5, 75.0]
        ],
        riskLevel: "Medium",
        successProbability: "78.5%",
        assets: ["UAV Patrol 04", "Ground Recon Team Delta"],
        strategy: "Execute high-altitude approach using Sector Charlie for terrain masking. Avoid direct line-of-sight with identified red markers.",
        explanation: "Terrain analysis shows the Ridge Line Beta provides optimal cover against thermal detection. Satellite data suggests enemy patrols are currently biased towards lower valleys.",
        timeline: [
          { phase: "Deployment", description: "Deploy UAV for aerial recon" },
          { phase: "Infiltration", description: "Ground team moves to Ridge Line Beta" }
        ]
      };
      setMissionPlan(mockPlan);
      setStartTime(Date.now());
      setElapsedTime(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen bg-bg text-accent font-sans overflow-hidden flex">
      <div className="scanline" />
      
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-20 border-b border-white/5 flex justify-between items-center px-10 bg-black/20">
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-widest text-text-dim">Current Time (UTC)</span>
              <span className="font-mono text-white text-sm">{time.toUTCString().split(' ')[4]}</span>
            </div>
            
            {startTime && (
              <div className="flex flex-col border-l border-white/10 pl-8">
                <span className="text-[9px] uppercase tracking-widest text-accent flex items-center gap-1">
                  <Clock className="w-2 h-2" />
                  Mission Duration
                </span>
                <span className="font-mono text-accent text-sm glow-cyan">{formatElapsed(elapsedTime)}</span>
              </div>
            )}

            <div className="flex items-center gap-3 px-4 py-1 bg-accent/10 border border-accent/20 rounded">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Status: Active</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={onStartPresentation}
              className="px-4 py-2 border border-accent/40 text-accent text-[9px] font-bold uppercase tracking-widest hover:bg-accent/10 transition-colors"
            >
              Open Slide Deck
            </button>
            <div className="relative">
              <Bell className="w-5 h-5 text-warning animate-bounce" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-warning rounded-full" />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full"
              >
                {/* Center Map */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                  <div className="flex-1 min-h-[400px] data-panel">
                    <TacticalMap location={location} missionPlan={missionPlan} />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: 'Troops', value: '1,240', color: 'text-blue-400' },
                      { label: 'Enemy', value: '342', color: 'text-red-400' },
                      { label: 'Drones', value: '12', color: 'text-yellow-400' },
                    ].map((stat, i) => (
                      <div key={i} className="data-panel p-4">
                        <div className="text-[9px] text-text-dim uppercase tracking-widest mb-1">{stat.label}</div>
                        <div className={cn("text-xl font-black", stat.color)}>{stat.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Panel */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                  <div className="data-panel flex-1 flex flex-col gap-6">
                    <div className="text-[10px] uppercase tracking-widest text-text-dim border-b border-white/5 pb-4">Mission Summary</div>
                    {missionPlan ? (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-white font-bold uppercase tracking-tight">{missionPlan.title}</h3>
                          <div className="flex gap-4 mt-2">
                            <div className="flex flex-col">
                              <span className="text-[8px] text-text-dim uppercase">Risk Level</span>
                              <span className="text-xs font-bold text-warning uppercase">{missionPlan.riskLevel}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[8px] text-text-dim uppercase">Success Prob.</span>
                              <span className="text-xs font-bold ai-decision">{missionPlan.successProbability || '84.2%'}</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="p-3 bg-white/5 border border-white/10 rounded">
                            <div className="text-[9px] text-text-dim uppercase mb-1">Geospatial Analysis</div>
                            <div className="text-[10px] text-white font-mono leading-relaxed">
                              {missionPlan.analysis}
                            </div>
                          </div>
                          <div className="p-3 bg-accent/5 border border-accent/20 rounded">
                            <div className="text-[9px] text-accent font-bold uppercase mb-1 flex items-center gap-2">
                              <Cpu className="w-3 h-3" />
                              AI Tactical Reasoning
                            </div>
                            <p className="text-[10px] text-slate-300 font-mono leading-relaxed italic">
                              {missionPlan.explanation || "Strategic algorithm favors high-altitude approach to minimize thermal signature capture."}
                            </p>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-300 font-mono leading-relaxed italic border-t border-white/5 pt-4">
                          {missionPlan.strategy}
                        </p>
                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
                        <Radar className="w-12 h-12 mb-4 animate-pulse" />
                        <span className="text-[10px] uppercase tracking-widest">Awaiting Strategic Input</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'planner' && (
              <motion.div
                key="planner"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full"
              >
                <div className="lg:col-span-3 flex flex-col gap-6">
                  <div className="data-panel p-6 space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-text-dim">Mission Type</label>
                      <select className="w-full bg-black/40 border border-accent/20 rounded p-2 text-xs font-mono text-accent focus:outline-none">
                        <option>RECONNAISSANCE</option>
                        <option>STRIKE OPS</option>
                        <option>SEARCH & RESCUE</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-text-dim">Parameters</label>
                      <textarea
                        value={objective}
                        onChange={(e) => setObjective(e.target.value)}
                        placeholder="INPUT MISSION OBJECTIVE..."
                        className="w-full bg-black/40 border border-accent/20 rounded p-3 text-xs font-mono focus:outline-none focus:border-accent transition-colors min-h-[150px] resize-none"
                      />
                    </div>
                    <button
                      onClick={handlePlanMission}
                      disabled={loading || !objective.trim()}
                      className="w-full bg-accent text-bg font-black py-4 text-[10px] uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50"
                    >
                      {loading ? "PROCESSING..." : "DEPLOY AI MISSION STRATEGY"}
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-6 data-panel p-0 overflow-hidden">
                  <TacticalMap location={location} missionPlan={missionPlan} />
                </div>

                <div className="lg:col-span-3 flex flex-col gap-6">
                  <div className="data-panel p-6 flex-1">
                    <div className="text-[10px] uppercase tracking-widest text-text-dim mb-4">AI Recommendations</div>
                    {missionPlan ? (
                      <div className="space-y-6">
                        <div className="p-3 bg-accent/10 border border-accent/20 rounded">
                          <div className="text-[9px] text-accent font-bold uppercase">Best Route: Path Alpha</div>
                          <div className="text-[10px] text-white mt-1">Estimated Time: 42m</div>
                        </div>
                        <div className="p-3 bg-warning/10 border border-warning/20 rounded opacity-60">
                          <div className="text-[9px] text-warning font-bold uppercase">Alt Route: Path Beta</div>
                          <div className="text-[10px] text-white mt-1">Estimated Time: 58m</div>
                        </div>
                        <div className="mt-6 p-4 bg-black/40 border border-white/5 rounded">
                          <div className="text-[9px] text-text-dim uppercase font-bold mb-2">AI Insight</div>
                          <p className="text-[10px] text-slate-300 font-mono italic">
                            "Enemy patrol likely in Sector 5 in next 15 mins. Recommend Path Alpha for maximum stealth."
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center opacity-20">
                        <Terminal className="w-12 h-12" />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'intelligence' && (
              <motion.div
                key="intelligence"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-full"
              >
                <Intelligence />
              </motion.div>
            )}

            {activeTab === 'alerts' && (
              <motion.div
                key="alerts"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-full"
              >
                <Alerts />
              </motion.div>
            )}

            {activeTab === 'map' && (
              <motion.div
                key="map"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full ai-box-accent p-0 overflow-hidden"
              >
                <TacticalMap location={location} missionPlan={missionPlan} />
                <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-md border border-accent/20 p-4 flex justify-between items-center">
                  <div className="flex gap-8">
                    <div className="flex flex-col">
                      <span className="text-[8px] text-text-dim uppercase">Speed</span>
                      <span className="text-xs font-mono text-accent">42 KM/H</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] text-text-dim uppercase">Direction</span>
                      <span className="text-xs font-mono text-accent">342° NW</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-full text-center"
              >
                <div className="ai-box-accent p-12 max-w-md w-full space-y-8">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-6">System Configuration</h3>
                  <div className="space-y-4 text-left">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-text-dim">AI Sensitivity</label>
                      <input type="range" className="w-full accent-accent" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-text-dim">Comm Channels</label>
                      <div className="flex gap-2">
                        <button className="flex-1 p-2 bg-accent/20 border border-accent text-accent text-[9px] font-bold uppercase">Secure</button>
                        <button className="flex-1 p-2 bg-black/40 border border-white/5 text-text-dim text-[9px] font-bold uppercase">Open</button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* System Logs Footer */}
        <footer className="h-12 border-t border-white/5 bg-black/40 flex items-center justify-between px-8 overflow-hidden">
          <div className="flex gap-8 whitespace-nowrap text-[10px] font-mono text-text-dim uppercase overflow-hidden max-w-[70%]">
            {logs.map((log, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="text-accent">//</span> {log}
              </span>
            ))}
          </div>
          <div className="text-[8px] font-bold text-white/20 uppercase tracking-tighter">
            DISCLAIMER: All locations and movements are simulated for demonstration purposes only. No real military data is used.
          </div>
        </footer>
      </div>
    </div>
  );
}
