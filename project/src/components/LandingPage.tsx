import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Target, Zap, ChevronRight, Lock, Radio } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface LandingPageProps {
  onEnter: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  const [scanning, setScanning] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setScanning(false);
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full bg-bg overflow-hidden flex flex-col items-center justify-center font-sans text-accent">
      <div className="scanline" />
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* HUD Elements */}
      <div className="absolute top-10 left-10 flex flex-col gap-2 opacity-50 font-mono">
        <div className="flex items-center gap-2 text-xs">
          <Radio className="w-3 h-3 animate-pulse" />
          <span>SIGNAL: ENCRYPTED</span>
        </div>
        <div className="text-[10px]">LAT: 28.6139° N | LONG: 77.2090° E</div>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative z-20 flex flex-col items-center text-center px-6"
      >
        <div className="relative mb-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-12 border border-accent/20 rounded-full border-dashed"
          />
          <div className="relative bg-black/40 p-8 rounded-full border border-accent/30 shadow-[0_0_50px_rgba(0,242,255,0.15)]">
            <Shield className="w-20 h-20 text-accent glow-cyan" />
          </div>
        </div>

        <h1 className="massive-type text-white mb-4 glow-cyan">
          AEGIS <span className="text-accent">TACTICAL</span>
        </h1>
        <p className="text-text-dim max-w-lg mb-12 text-[11px] uppercase tracking-[0.4em] font-mono">
          Strategic AI Mission Planning Interface
        </p>

        <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden mb-12">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-accent shadow-[0_0_15px_rgba(0,242,255,0.8)]"
          />
        </div>

        <AnimatePresence mode="wait">
          {!scanning ? (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onEnter}
              className="bg-accent text-bg px-12 py-5 font-black text-xs uppercase tracking-[0.2em] transition-all hover:bg-white"
            >
              INITIALIZE MISSION CONTROL
            </motion.button>
          ) : (
            <div className="flex items-center gap-2 text-accent/40 font-mono text-[10px] uppercase tracking-widest animate-pulse">
              <Lock className="w-3 h-3" />
              <span>Authenticating...</span>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
