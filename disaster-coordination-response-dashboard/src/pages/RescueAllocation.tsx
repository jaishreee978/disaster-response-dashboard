import React, { useState } from 'react';
import { 
  Users, 
  MapPin, 
  Clock, 
  Navigation, 
  CheckCircle2, 
  AlertCircle,
  Search,
  ChevronRight,
  Shield
} from 'lucide-react';
import { dummyTeams, dummyIncidents } from '../data/dummyData';
import { cn } from '../utils';

export const RescueAllocation: React.FC = () => {
  const [selectedIncident, setSelectedIncident] = useState(dummyIncidents[0]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Rescue Team Allocation</h2>
          <p className="text-white/40 text-sm mt-1">Assign and coordinate specialized rescue units to active incidents.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">12 Teams Ready</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Incidents Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-white/60 uppercase tracking-widest">Active Incidents</h3>
            <span className="text-[10px] font-bold text-white/30">{dummyIncidents.length} Found</span>
          </div>
          <div className="space-y-3">
            {dummyIncidents.map((incident) => (
              <button
                key={incident.id}
                onClick={() => setSelectedIncident(incident)}
                className={cn(
                  "w-full text-left p-4 rounded-2xl border transition-all group",
                  selectedIncident.id === incident.id 
                    ? "bg-red-500/10 border-red-500/30 ring-1 ring-red-500/20" 
                    : "bg-[#111111] border-white/5 hover:border-white/10"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-white/30">{incident.id}</span>
                  <span className={cn(
                    "px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider",
                    incident.severity === 'critical' ? "bg-red-500 text-white" : "bg-orange-500 text-white"
                  )}>
                    {incident.severity}
                  </span>
                </div>
                <h4 className={cn(
                  "font-bold text-sm mb-1 transition-colors",
                  selectedIncident.id === incident.id ? "text-white" : "text-white/60 group-hover:text-white"
                )}>
                  {incident.title}
                </h4>
                <div className="flex items-center gap-2 text-[10px] text-white/30">
                  <MapPin size={10} />
                  <span>{incident.location}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Allocation Command Center */}
        <div className="lg:col-span-2 space-y-6">
          {/* Selected Incident Details */}
          <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{selectedIncident.title}</h3>
                <div className="flex items-center gap-4 text-xs text-white/40">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    <span>{selectedIncident.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    <span>Reported {new Date(selectedIncident.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
              <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Status</p>
                <p className="text-sm font-bold text-emerald-500 uppercase tracking-tight">Active Response</p>
              </div>
            </div>
            
            <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl mb-6">
              <p className="text-xs text-white/60 leading-relaxed">
                <span className="font-bold text-red-500 uppercase tracking-widest mr-2">Situation:</span>
                {selectedIncident.description}
              </p>
            </div>

            <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Available Teams Nearby</h4>
            <div className="space-y-3">
              {dummyTeams.map((team) => (
                <div key={team.id} className="p-4 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between hover:border-white/10 transition-all">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center",
                      team.status === 'available' ? "bg-emerald-500/10 text-emerald-500" : "bg-blue-500/10 text-blue-500"
                    )}>
                      <Shield size={20} />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white">{team.name}</h5>
                      <div className="flex items-center gap-3 text-[10px] text-white/40 font-medium">
                        <span className="flex items-center gap-1"><Users size={10} /> {team.members} Members</span>
                        <span className="flex items-center gap-1"><MapPin size={10} /> {team.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {team.status === 'available' ? (
                      <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-all shadow-lg shadow-red-600/10">
                        Dispatch Team
                      </button>
                    ) : (
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{team.status}</p>
                        <p className="text-xs font-mono text-white/60">ETA: {team.eta}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map Visualization Placeholder */}
          <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 h-64 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Navigation size={24} className="text-red-500" />
              </div>
              <h3 className="text-white font-bold mb-1">Interactive Map View</h3>
              <p className="text-white/40 text-xs">Visualizing incident location and nearby rescue units.</p>
              <button className="mt-4 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] font-bold text-white uppercase tracking-widest transition-all">
                Open Full Map
              </button>
            </div>
            {/* Mock Markers */}
            <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-red-500 rounded-full animate-ping" />
            <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-red-500 rounded-full" />
            <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-blue-500 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
