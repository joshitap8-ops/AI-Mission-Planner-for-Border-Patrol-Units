import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  Target, 
  ShieldAlert, 
  Settings, 
  Activity,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'planner', label: 'Mission Planner', icon: Target },
  { id: 'map', label: 'Live Map', icon: Map },
  { id: 'intelligence', label: 'Intelligence', icon: ShieldAlert },
  { id: 'alerts', label: 'Alerts', icon: Activity },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="w-[280px] border-r border-white/5 flex flex-col bg-black/20">
      <div className="p-8 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent text-bg flex items-center justify-center font-black rounded">A</div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-sm tracking-tighter">AEGIS TACTICAL</span>
            <span className="text-[9px] text-accent/60 font-mono uppercase tracking-widest">Command Center</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-6 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center justify-between p-3 rounded transition-all group",
              activeTab === item.id 
                ? "bg-accent/10 text-accent border border-accent/20" 
                : "text-text-dim hover:text-white hover:bg-white/5"
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase tracking-widest">{item.label}</span>
            </div>
            {activeTab === item.id && <ChevronRight className="w-3 h-3" />}
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-white/5">
        <button className="w-full flex items-center gap-3 p-3 text-warning hover:bg-warning/10 rounded transition-all">
          <LogOut className="w-4 h-4" />
          <span className="text-[11px] font-bold uppercase tracking-widest">Logout</span>
        </button>
      </div>
    </aside>
  );
}
