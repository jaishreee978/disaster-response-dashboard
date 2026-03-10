import React from 'react';
import { 
  Package, 
  AlertTriangle, 
  ArrowUpRight, 
  Search, 
  Filter,
  Activity,
  Shield,
  Droplets,
  Zap,
  Home as HomeIcon,
  Truck
} from 'lucide-react';
import { dummyResources } from '../data/dummyData';
import { cn } from '../utils';

export const ResourceTracking: React.FC = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'Medical': return <Activity size={20} />;
      case 'Emergency': return <Shield size={20} />;
      case 'Water': return <Droplets size={20} />;
      case 'Logistics': return <Truck size={20} />;
      case 'Housing': return <HomeIcon size={20} />;
      default: return <Package size={20} />;
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage < 20) return 'bg-red-500';
    if (percentage < 50) return 'bg-orange-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Resource Tracking</h2>
          <p className="text-white/40 text-sm mt-1">Monitor availability and distribution of critical resources.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm font-bold hover:bg-white/10 transition-all">
            Request Supplies
          </button>
          <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-red-600/20 transition-all">
            Dispatch Resource
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl">
          <div className="flex items-center gap-3 text-red-500 mb-2">
            <AlertTriangle size={20} />
            <span className="text-xs font-bold uppercase tracking-widest">Critical Shortage</span>
          </div>
          <p className="text-2xl font-bold text-white">Fire Trucks</p>
          <p className="text-white/40 text-sm mt-1">Only 5 units available in Sector 7 & 9.</p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl">
          <div className="flex items-center gap-3 text-emerald-500 mb-2">
            <Package size={20} />
            <span className="text-xs font-bold uppercase tracking-widest">Stock Replenished</span>
          </div>
          <p className="text-2xl font-bold text-white">Medical Kits</p>
          <p className="text-white/40 text-sm mt-1">150 kits arriving at Central Hub.</p>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-2xl">
          <div className="flex items-center gap-3 text-blue-500 mb-2">
            <Zap size={20} />
            <span className="text-xs font-bold uppercase tracking-widest">Power Status</span>
          </div>
          <p className="text-2xl font-bold text-white">Grid Active</p>
          <p className="text-white/40 text-sm mt-1">92% of metropolitan area powered.</p>
        </div>
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {dummyResources.map((resource) => {
          const percentage = (resource.available / resource.total) * 100;
          return (
            <div key={resource.id} className="bg-[#111111] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all group">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/60 group-hover:text-white transition-colors">
                    {getIcon(resource.type)}
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{resource.name}</h3>
                    <p className="text-white/40 text-xs">{resource.type} Resource</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-white">{resource.available} / {resource.total}</p>
                  <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">{resource.unit}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-white/40">Availability Status</span>
                  <span className={cn(
                    percentage < 20 ? 'text-red-500' : percentage < 50 ? 'text-orange-500' : 'text-emerald-500'
                  )}>
                    {percentage.toFixed(0)}% Available
                  </span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full transition-all duration-1000", getProgressColor(percentage))}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-2">
                  {percentage < 20 && (
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-red-500/10 text-red-500 rounded text-[10px] font-bold uppercase tracking-wider">
                      <AlertTriangle size={10} />
                      <span>Low Resource Warning</span>
                    </div>
                  )}
                </div>
                <button className="text-[10px] text-white/40 hover:text-white uppercase font-bold tracking-widest transition-colors flex items-center gap-1">
                  View Distribution <ArrowUpRight size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
