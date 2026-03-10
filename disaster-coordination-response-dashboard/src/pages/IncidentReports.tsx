import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  MapPin, 
  Clock, 
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Loader2
} from 'lucide-react';
import { dummyIncidents } from '../data/dummyData';
import { Incident, Severity, Status } from '../types';
import { cn } from '../utils';

export const IncidentReports: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>(dummyIncidents);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredIncidents = incidents.filter(i => 
    i.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSeverityColor = (severity: Severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'high': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'low': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    }
  };

  const getStatusIcon = (status: Status) => {
    switch (status) {
      case 'active': return <Loader2 size={14} className="animate-spin" />;
      case 'pending': return <Clock size={14} />;
      case 'resolved': return <CheckCircle2 size={14} />;
      case 'closed': return <XCircle size={14} />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Incident Reports</h2>
          <p className="text-white/40 text-sm mt-1">Manage and track all reported emergency incidents.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all font-bold text-sm shadow-lg shadow-red-600/20"
        >
          <Plus size={18} />
          <span>New Report</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
          <input 
            type="text" 
            placeholder="Search by ID, title, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#111111] border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-white text-sm outline-none focus:border-red-500/50 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#111111] border border-white/5 rounded-xl text-white/60 hover:text-white hover:border-white/10 transition-colors text-sm font-medium">
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <select className="bg-[#111111] border border-white/5 rounded-xl px-4 py-2 text-white/60 text-sm outline-none focus:border-white/10 transition-colors">
            <option>All Status</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Resolved</option>
          </select>
        </div>
      </div>

      {/* Incident List */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/40">Incident ID</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/40">Title & Location</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/40">Severity</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/40">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/40">Reported At</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/40"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredIncidents.map((incident) => (
                <tr key={incident.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono font-bold text-white/60">{incident.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">{incident.title}</p>
                      <div className="flex items-center gap-1.5 text-[10px] text-white/30">
                        <MapPin size={10} />
                        <span>{incident.location}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border",
                      getSeverityColor(incident.severity)
                    )}>
                      {incident.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "p-1 rounded-md",
                        incident.status === 'active' ? 'text-emerald-500 bg-emerald-500/10' : 'text-white/40 bg-white/5'
                      )}>
                        {getStatusIcon(incident.status)}
                      </div>
                      <span className="text-xs font-medium text-white/60 capitalize">{incident.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-white/40 font-mono">
                      {new Date(incident.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-white/20 hover:text-white transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simple Modal Placeholder */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl w-full max-w-lg p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Report New Incident</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white">
                <XCircle size={24} />
              </button>
            </div>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Incident Title</label>
                <input type="text" placeholder="e.g., Flash Flood in Sector 4" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-red-500/50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Severity</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-red-500/50">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Type</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-red-500/50">
                    <option>Flood</option>
                    <option>Fire</option>
                    <option>Earthquake</option>
                    <option>Infrastructure</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Location</label>
                <input type="text" placeholder="Enter specific address or coordinates" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-red-500/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Description</label>
                <textarea rows={3} placeholder="Describe the situation..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-red-500/50 resize-none"></textarea>
              </div>
              <button type="submit" className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all mt-4">
                Submit Report
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
