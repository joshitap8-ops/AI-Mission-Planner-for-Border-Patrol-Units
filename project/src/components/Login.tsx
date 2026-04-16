import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Lock, Scan, User, Key, CheckCircle } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    
    // Simulate Face ID scanning sequence
    setTimeout(() => {
      setScanComplete(true);
      setTimeout(() => {
        onLogin();
      }, 1000);
    }, 2500);
  };

  return (
    <div className="relative h-screen w-full bg-bg flex items-center justify-center overflow-hidden font-sans">
      <div className="scanline" />
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,255,65,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,65,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md p-8 ai-box-accent bg-black/60 backdrop-blur-xl"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="p-4 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <Shield className="w-12 h-12 text-accent glow-cyan" />
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Secure Access</h2>
          <p className="text-[10px] text-text-dim uppercase tracking-[0.3em] mt-2">Level 4 Clearance Required</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isAuthenticating ? (
            <>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-text-dim block ml-1">Personnel ID</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent/40" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="AEGIS-XXXX-XXXX"
                    className="w-full bg-black/40 border border-accent/20 rounded p-3 pl-10 text-xs font-mono text-accent focus:outline-none focus:border-accent transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-text-dim block ml-1">Access Key</label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent/40" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-black/40 border border-accent/20 rounded p-3 pl-10 text-xs font-mono text-accent focus:outline-none focus:border-accent transition-colors"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-accent text-bg font-black py-4 text-xs uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[0_0_20px_rgba(0,255,65,0.2)]"
              >
                Initiate Biometric Link
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 space-y-6">
              <div className="relative w-40 h-40">
                <AnimatePresence mode="wait">
                  {!scanComplete ? (
                    <motion.div
                      key="scanning"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center"
                    >
                      <div className="relative w-32 h-32 border-2 border-accent/20 rounded-2xl overflow-hidden">
                        <motion.div
                          animate={{ top: ['0%', '100%', '0%'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="absolute left-0 w-full h-0.5 bg-accent shadow-[0_0_15px_#00ff41] z-20"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-40">
                          <Scan className="w-16 h-16 text-accent" />
                        </div>
                      </div>
                      <div className="mt-4 text-[10px] text-accent font-mono uppercase tracking-[0.2em] animate-pulse">
                        Scanning Retina & Facials...
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="granted"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute inset-0 flex flex-col items-center justify-center text-accent"
                    >
                      <CheckCircle className="w-20 h-20 glow-cyan" />
                      <div className="mt-4 text-sm font-black uppercase tracking-[0.3em] glow-cyan">
                        Access Granted
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: scanComplete ? '100%' : '80%' }}
                  transition={{ duration: 2.5 }}
                  className="h-full bg-accent"
                />
              </div>
            </div>
          )}
        </form>

        <div className="mt-10 text-center">
          <p className="text-[9px] text-warning font-mono uppercase tracking-widest">
            Authorized Personnel Only // Global Defence Protocol 00-1
          </p>
        </div>
      </motion.div>
    </div>
  );
}
