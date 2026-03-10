import React from 'react';
import { 
  AlertCircle, 
  Activity, 
  Package, 
  Heart, 
  TrendingUp,
  MapPin,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { cn } from '../utils';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { dummyIncidents, dummyAlerts, dummyResources } from '../data/dummyData';
import { motion } from 'motion/react';

const stats = [
  { label: 'Total Incidents', value: '1,284', icon: AlertCircle, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Active Cases', value: '42', icon: Activity, color: 'text-red-500', bg: 'bg-red-500/10' },
  { label: 'Resources Available', value: '85%', icon: Package, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { label: 'Volunteers Active', value: '156', icon: Heart, color: 'text-pink-500', bg: 'bg-pink-500/10' },
];

const chartData = [
  { name: 'Mon', incidents: 12 },
  { name: 'Tue', incidents: 19 },
  { name: 'Wed', incidents: 15 },
  { name: 'Thu', incidents: 22 },
  { name: 'Fri', incidents: 30 },
  { name: 'Sat', incidents: 25 },
  { name: 'Sun', incidents: 18 },
];

export const Home: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Command Center</h2>
          <p className="text-white/40 mt-1">Real-time operational overview of ongoing disaster response.</p>
        </div>
        <div className="flex items-center gap-3 bg-zinc-900/50 p-4 rounded-2xl border border-white/5">
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Community Risk Score</p>
            <p className="text-2xl font-mono font-bold text-red-500">78.4</p>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-red-500/20 border-t-red-500 flex items-center justify-center">
            <TrendingUp size={20} className="text-red-500" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#111111] border border-white/5 p-6 rounded-2xl hover:border-white/10 transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={stat.bg + " p-3 rounded-xl " + stat.color}>
                <stat.icon size={24} />
              </div>
              <ArrowUpRight size={16} className="text-white/20 group-hover:text-white/40 transition-colors" />
            </div>
            <p className="text-white/40 text-sm font-medium">{stat.label}</p>
            <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-[#111111] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-white">Incident Trends</h3>
            <select className="bg-white/5 border border-white/10 text-white text-xs rounded-lg px-3 py-1.5 outline-none focus:border-red-500/50 transition-colors">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#ffffff40', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#ffffff40', fontSize: 12 }} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#ef4444' }}
                />
                <Bar dataKey="incidents" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Recent Alerts</h3>
            <span className="text-[10px] uppercase tracking-widest font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded">Live</span>
          </div>
          <div className="space-y-4 flex-1">
            {dummyAlerts.map((alert) => (
              <div key={alert.id} className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-start gap-3">
                  <div className={alert.severity === 'critical' ? 'text-red-500' : 'text-yellow-500'}>
                    <AlertCircle size={18} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-white/80 leading-relaxed">{alert.message}</p>
                    <div className="flex items-center gap-2 text-[10px] text-white/30 font-mono">
                      <Clock size={10} />
                      <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-all border border-dashed border-white/10">
            View All Alerts
          </button>
        </div>
      </div>

      {/* High Priority Incidents */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-6">High Priority Incidents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {dummyIncidents.filter(i => i.severity === 'critical' || i.severity === 'high').map((incident) => (
            <div key={incident.id} className="p-5 bg-zinc-900/50 border border-white/5 rounded-xl hover:border-red-500/30 transition-all group">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono text-white/40">{incident.id}</span>
                <span className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                  incident.severity === 'critical' ? "bg-red-500 text-white" : "bg-orange-500 text-white"
                )}>
                  {incident.severity}
                </span>
              </div>
              <h4 className="text-white font-bold mb-1 group-hover:text-red-400 transition-colors">{incident.title}</h4>
              <div className="flex items-center gap-2 text-white/40 text-xs mb-4">
                <MapPin size={12} />
                <span>{incident.location}</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[10px] text-white/60 uppercase font-bold tracking-widest">{incident.status}</span>
                </div>
                <button className="text-[10px] text-white/40 hover:text-white uppercase font-bold tracking-widest transition-colors">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
