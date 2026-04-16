import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import SlideDeck from './components/SlideDeck';
import Login from './components/Login';
import BootScreen from './components/BootScreen';

type AppState = 'BOOT' | 'LANDING' | 'LOGIN' | 'DASHBOARD' | 'PRESENTATION';

export default function App() {
  const [state, setState] = useState<AppState>('BOOT');

  // 🔥 Keyboard shortcut (press "P" for presentation)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!e.key) return;
      if (e.key.toLowerCase() === 'p') setState('PRESENTATION');
      if (e.key.toLowerCase() === 'd') setState('DASHBOARD');
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="min-h-screen bg-bg selection:bg-accent/30 selection:text-white">

      {/* 🧠 Global System Status Bar */}
      <div className="fixed top-0 left-0 w-full text-[10px] font-mono text-accent px-4 py-1 bg-black/40 z-50 flex justify-between border-b border-accent/20 backdrop-blur-sm">
        <span>AI CORE: ACTIVE</span>
        <span>SATELLITE LINK: STABLE</span>
        <span>STATUS: OPERATIONAL</span>
      </div>

      <AnimatePresence mode="wait">

        {/* 🚀 BOOT SCREEN */}
        {state === 'BOOT' && (
          <motion.div key="boot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
            <BootScreen onComplete={() => setState('LANDING')} />
          </motion.div>
        )}

        {/* 🌐 LANDING */}
        {state === 'LANDING' && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
            <LandingPage onEnter={() => setState('LOGIN')} />
          </motion.div>
        )}

        {/* 🔐 LOGIN (Face ID simulation inside) */}
        {state === 'LOGIN' && (
          <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
            <Login onLogin={() => setState('DASHBOARD')} />
          </motion.div>
        )}
        
        {/* 🛰️ DASHBOARD */}
        {state === 'DASHBOARD' && (
          <motion.div key="dashboard" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} className="h-full">
            <Dashboard onStartPresentation={() => setState('PRESENTATION')} />
          </motion.div>
        )}

        {/* 🎤 PRESENTATION MODE */}
        {state === 'PRESENTATION' && (
          <motion.div key="presentation" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full">
            <SlideDeck onExit={() => setState('DASHBOARD')} />
          </motion.div>
        )}

      </AnimatePresence>

      {/* 🚨 Emergency Exit */}
      <button 
        onClick={() => setState('LANDING')}
        className="fixed bottom-4 right-4 text-[10px] text-warning border border-warning/30 px-3 py-1 hover:bg-warning/10 z-[100] cursor-pointer transition-colors"
      >
        EXIT SYSTEM
      </button>

      {/* 📜 Global Disclaimer */}
      <div className="fixed bottom-0 w-full text-[8px] text-white/20 text-center pb-1 pointer-events-none z-50">
        Simulation Interface – No Real Military Data Used
      </div>

    </div>
  );
}
