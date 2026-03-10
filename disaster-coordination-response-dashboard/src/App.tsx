import React, { useState } from 'react';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { Home } from './pages/Home';
import { IncidentReports } from './pages/IncidentReports';
import { ResourceTracking } from './pages/ResourceTracking';
import { RescueAllocation } from './pages/RescueAllocation';
import { EmergencyAlerts } from './pages/EmergencyAlerts';
import { VolunteerEnrollment } from './pages/VolunteerEnrollment';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'incidents':
        return <IncidentReports />;
      case 'resources':
        return <ResourceTracking />;
      case 'rescue':
        return <RescueAllocation />;
      case 'alerts':
        return <EmergencyAlerts />;
      case 'enroll':
        return <VolunteerEnrollment />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col">
      <TopBar />
      
      <div className="flex flex-1 pt-16">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 transition-all duration-300 ml-16 lg:ml-64 p-4 md:p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Mobile Overlay for Sidebar if needed - currently sidebar is fixed and small on mobile */}
      <div className="fixed bottom-4 right-4 z-50 md:hidden">
        <button 
          onClick={() => setActiveTab('alerts')}
          className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-2xl shadow-red-600/40 text-white animate-bounce"
        >
          <span className="sr-only">Quick Alert</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
      </div>
    </div>
  );
}

