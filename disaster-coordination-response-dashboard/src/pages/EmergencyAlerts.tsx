import React, { useState } from 'react';
import { 
  Megaphone, 
  Send, 
  History, 
  AlertTriangle, 
  Info, 
  ShieldAlert,
  Clock,
  Search,
  MoreVertical,
  CheckCircle2
} from 'lucide-react';
import { dummyAlerts } from '../data/dummyData';
import { cn } from '../utils';

export const EmergencyAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState(dummyAlerts);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('warning');

  const handleSendAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    const newAlert = {
      id: `A${Date.now()}`,
      message,
      timestamp: new Date().toISOString(),
      severity: severity as any
    };
    
    setAlerts([newAlert, ...alerts]);
    setMessage('');
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Emergency Alerts</h2>
          <p className="text-white/40 text-sm mt-1">Broadcast critical information to the public and response teams.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl">
          <Megaphone size={18} className="text-red-500" />
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Broadcasting Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Alert Broadcast Form */}
        <div className="lg:col-span-1">
          <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 sticky top-24">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Send size={20} className="text-red-500" />
              Broadcast New Alert
            </h3>
            <form onSubmit={handleSendAlert} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Alert Severity</label>
                <div className="grid grid-cols-3 gap-2">
                  {['info', 'warning', 'critical'].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSeverity(s)}
                      className={cn(
                        "py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all",
                        severity === s 
                          ? s === 'critical' ? "bg-red-500 border-red-500 text-white" : s === 'warning' ? "bg-orange-500 border-orange-500 text-white" : "bg-blue-500 border-blue-500 text-white"
                          : "bg-white/5 border-white/10 text-white/40 hover:text-white/60"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Message Content</label>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type the emergency message here..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-red-500/50 transition-colors resize-none"
                />
              </div>

              <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <p className="text-[10px] text-white/40 font-medium leading-relaxed">
                  <span className="text-red-500 font-bold mr-1">Note:</span>
                  This alert will be broadcasted to all mobile devices and public displays in the designated zones.
                </p>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-2"
              >
                <Megaphone size={18} />
                Broadcast Alert
              </button>
            </form>
          </div>
        </div>

        {/* Alert History */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-white/60 uppercase tracking-widest flex items-center gap-2">
              <History size={18} />
              Alert History
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={14} />
              <input 
                type="text" 
                placeholder="Search history..."
                className="bg-[#111111] border border-white/5 rounded-lg py-1.5 pl-9 pr-4 text-xs text-white outline-none focus:border-white/10"
              />
            </div>
          </div>

          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="bg-[#111111] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all group">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                      alert.severity === 'critical' ? "bg-red-500/10 text-red-500" : alert.severity === 'warning' ? "bg-orange-500/10 text-orange-500" : "bg-blue-500/10 text-blue-500"
                    )}>
                      {alert.severity === 'critical' ? <ShieldAlert size={20} /> : alert.severity === 'warning' ? <AlertTriangle size={20} /> : <Info size={20} />}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "text-[10px] font-bold uppercase tracking-widest",
                          alert.severity === 'critical' ? "text-red-500" : alert.severity === 'warning' ? "text-orange-500" : "text-blue-500"
                        )}>
                          {alert.severity} Alert
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px] text-white/30 font-mono">
                          <Clock size={10} />
                          <span>{new Date(alert.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                      <p className="text-sm text-white/80 leading-relaxed">{alert.message}</p>
                    </div>
                  </div>
                  <button className="p-2 text-white/10 hover:text-white transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] text-emerald-500 font-bold uppercase tracking-widest">
                    <CheckCircle2 size={12} />
                    <span>Delivered to 1.2M Devices</span>
                  </div>
                  <button className="text-[10px] text-white/30 hover:text-white font-bold uppercase tracking-widest transition-colors">
                    View Analytics
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
