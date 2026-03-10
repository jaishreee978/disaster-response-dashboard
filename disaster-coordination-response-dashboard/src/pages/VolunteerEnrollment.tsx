import React, { useState } from 'react';
import { 
  UserPlus, 
  Search, 
  Filter, 
  MapPin, 
  Phone, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Activity,
  User,
  X,
  Plus
} from 'lucide-react';
import { dummyVolunteers } from '../data/dummyData';
import { Volunteer } from '../types';
import { cn } from '../utils';

export const VolunteerEnrollment: React.FC = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>(dummyVolunteers);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVolunteers = volunteers.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'on-duty': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'assigned': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      default: return 'bg-white/5 text-white/40 border-white/10';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Volunteer Enrollment</h2>
          <p className="text-white/40 text-sm mt-1">Register and manage community volunteers for disaster response.</p>
        </div>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-black hover:bg-zinc-200 rounded-xl transition-all font-bold text-sm shadow-xl"
        >
          <UserPlus size={18} />
          <span>Register Volunteer</span>
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Enrolled', value: '1,420', icon: User, color: 'text-blue-500' },
          { label: 'Available Now', value: '156', icon: CheckCircle2, color: 'text-emerald-500' },
          { label: 'On Duty', value: '42', icon: Activity, color: 'text-orange-500' },
          { label: 'New This Week', value: '+24', icon: Plus, color: 'text-pink-500' },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#111111] border border-white/5 p-4 rounded-2xl">
            <div className="flex items-center gap-3 mb-2">
              <div className={cn("p-2 rounded-lg bg-white/5", stat.color)}>
                <stat.icon size={16} />
              </div>
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{stat.label}</span>
            </div>
            <p className="text-xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search & List */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, skill, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#111111] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-white text-sm outline-none focus:border-white/20 transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#111111] border border-white/5 rounded-xl text-white/60 hover:text-white transition-colors text-sm font-medium">
            <Filter size={16} />
            <span>Filter Skills</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredVolunteers.map((volunteer) => (
            <div key={volunteer.id} className="bg-[#111111] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center text-white font-bold text-lg">
                    {volunteer.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-white font-bold group-hover:text-blue-400 transition-colors">{volunteer.name}</h3>
                    <div className="flex items-center gap-2 text-[10px] text-white/30 font-mono uppercase tracking-widest">
                      <span>ID: {volunteer.id}</span>
                    </div>
                  </div>
                </div>
                <span className={cn(
                  "px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border",
                  getStatusColor(volunteer.status)
                )}>
                  {volunteer.status}
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <MapPin size={14} className="text-white/20" />
                  <span>{volunteer.location}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <Phone size={14} className="text-white/20" />
                  <span>{volunteer.contact}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <Calendar size={14} className="text-white/20" />
                  <span>Available: {volunteer.availability}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {volunteer.skills.map((skill) => (
                  <span key={skill} className="px-2 py-1 bg-white/5 text-white/40 rounded text-[10px] font-bold uppercase tracking-widest">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex gap-2 pt-4 border-t border-white/5">
                <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all">
                  View Profile
                </button>
                <button className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all shadow-lg shadow-blue-600/10">
                  Assign Task
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Registration Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl w-full max-w-2xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <UserPlus size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Volunteer Registration</h3>
                  <p className="text-white/40 text-xs">Join the community response network.</p>
                </div>
              </div>
              <button onClick={() => setIsFormOpen(false)} className="text-white/40 hover:text-white p-2">
                <X size={24} />
              </button>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => { e.preventDefault(); setIsFormOpen(false); }}>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Contact Number</label>
                <input type="tel" placeholder="+1 234 567 890" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Location / District</label>
                <input type="text" placeholder="e.g., North District" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Availability</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500/50">
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Weekends Only</option>
                  <option>On-call / Emergency</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-3">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Skills & Expertise</label>
                <div className="flex flex-wrap gap-2">
                  {['Medical', 'Logistics', 'Driving', 'Technical', 'Search & Rescue', 'Communications', 'Cooking'].map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white/60 hover:text-white hover:bg-white/10 transition-all"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2 pt-4">
                <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20">
                  Complete Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
