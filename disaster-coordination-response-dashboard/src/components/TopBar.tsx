import React, { useState, useEffect } from 'react';
import { Bell, User, AlertTriangle, Clock, ShieldAlert } from 'lucide-react';
import { format } from 'date-fns';

export const TopBar: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="fixed top-0 right-0 left-0 h-16 bg-[#0a0a0a] border-b border-white/10 flex items-center justify-between px-6 z-50">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold tracking-tight text-white hidden md:block">
          DISASTER <span className="text-red-500">RESPONSE</span>
        </h1>
        <div className="h-6 w-px bg-white/10 hidden md:block" />
        <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-xs font-medium text-red-500 uppercase tracking-wider">Live Status: Critical</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center gap-2 text-white/60 font-mono text-sm">
          <Clock size={16} />
          <span>{format(time, 'MMM dd, yyyy | HH:mm:ss')}</span>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0a0a0a]" />
          </button>
          
          <button className="flex items-center gap-2 pl-2 pr-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all font-bold text-sm uppercase tracking-tight shadow-lg shadow-red-600/20">
            <ShieldAlert size={18} />
            <span className="hidden sm:inline">Emergency Alert</span>
          </button>

          <div className="h-8 w-px bg-white/10" />

          <button className="flex items-center gap-2 p-1 pr-3 hover:bg-white/5 rounded-full transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center border border-white/10">
              <User size={18} className="text-white/80" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-bold text-white leading-none">Admin Control</p>
              <p className="text-[10px] text-white/40 leading-none mt-1">Super User</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
