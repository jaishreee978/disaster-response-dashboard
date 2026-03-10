import React, { useState } from 'react';
import { 
  Home, 
  FileText, 
  Truck, 
  Users, 
  Megaphone, 
  UserPlus, 
  ChevronLeft, 
  ChevronRight,
  LayoutDashboard
} from 'lucide-react';
import { cn } from '../utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'incidents', label: 'Incident Reports', icon: FileText },
    { id: 'resources', label: 'Resource Tracking', icon: Truck },
    { id: 'rescue', label: 'Rescue Team Allocation', icon: Users },
    { id: 'alerts', label: 'Emergency Alerts', icon: Megaphone },
    { id: 'enroll', label: 'Volunteer Enrollment', icon: UserPlus },
  ];

  return (
    <aside 
      className={cn(
        "fixed left-0 top-16 bottom-0 bg-[#0a0a0a] border-r border-white/10 transition-all duration-300 z-40 flex flex-col",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex-1 py-6 overflow-y-auto scrollbar-hide">
        <nav className="px-3 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all group relative",
                activeTab === item.id 
                  ? "bg-white/10 text-white shadow-inner" 
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon size={20} className={cn(
                "transition-colors",
                activeTab === item.id ? "text-red-500" : "group-hover:text-white"
              )} />
              {!isCollapsed && (
                <span className="text-sm font-medium tracking-wide">{item.label}</span>
              )}
              {activeTab === item.id && (
                <div className="absolute left-0 top-2 bottom-2 w-1 bg-red-500 rounded-r-full" />
              )}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-zinc-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-white/10">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <div className="flex items-center gap-2"><ChevronLeft size={20} /><span className="text-xs uppercase tracking-widest font-bold">Collapse</span></div>}
        </button>
      </div>
    </aside>
  );
};
