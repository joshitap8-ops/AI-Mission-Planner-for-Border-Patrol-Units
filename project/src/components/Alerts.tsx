import React from 'react';
import { motion } from 'motion/react';
import { Activity, AlertCircle, Clock, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';

const alerts = [
  { id: 1, type: 'critical', msg: "Unusual movement detected in Sector Bravo", time: "16:42 UTC", loc: "Sector Bravo" },
  { id: 2, type: 'warning', msg: "High-risk activity near J&K northern border zone", time: "16:30 UTC", loc: "Northern Rim" },
  { id: 3, type: 'info', msg: "Drone Patrol 04 reporting clear visibility", time: "16:15 UTC", loc: "Sector Alpha" },
  { id: 4, type: 'critical', msg: "Simulated Heat Signature Cluster: Zone Delta", time: "16:05 UTC", loc: "Zone Delta" },
];

export default function Alerts() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Active Threat Alerts</h2>
        <div className="px-4 py-1 bg-warning/10 border border-warning/20 text-warning text-[10px] font-bold uppercase tracking-widest">
          {alerts.filter(a => a.type === 'critical').length} Critical Threats
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
              "p-6 flex items-center justify-between group hover:bg-white/5 transition-colors",
              alert.type === 'critical' ? "alert-box signal-blink" : "data-panel"
            )}
          >
            <div className="flex items-center gap-6">
              <div className={cn(
                "p-3 rounded-full border",
                alert.type === 'critical' ? "bg-red-500/10 border-red-500/30 text-red-500" :
                alert.type === 'warning' ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-500" :
                "bg-blue-500/10 border-blue-500/30 text-blue-500"
              )}>
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className={cn(
                  "font-bold uppercase tracking-tight",
                  alert.type === 'critical' ? "text-warning" : "text-white"
                )}>{alert.msg}</h4>
                <div className="flex gap-4 text-[10px] font-mono text-text-dim uppercase">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {alert.time}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {alert.loc}</span>
                </div>
              </div>
            </div>
            <button className={cn(
              "px-6 py-2 font-black text-[10px] uppercase tracking-widest transition-colors",
              alert.type === 'critical' ? "bg-warning text-bg" : "bg-accent text-bg hover:bg-white"
            )}>
              Take Action
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
