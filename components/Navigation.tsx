import React from 'react';
import { ShieldCheck, Search, Radar, MessageSquareWarning } from 'lucide-react';
import { AppTab } from '../types';

interface NavigationProps {
  currentTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentTab, onTabChange }) => {
  const navItems = [
    { id: AppTab.CHECKUP, label: 'CHECKUP', icon: ShieldCheck },
    { id: AppTab.INSPECT, label: 'INSPECT', icon: Search },
    { id: AppTab.RADAR, label: 'RADAR', icon: Radar },
    { id: AppTab.REPORT, label: 'REPORT', icon: MessageSquareWarning },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-cyan-900/50 bg-slate-900/95 backdrop-blur-md md:static md:w-64 md:border-t-0 md:border-r md:h-full z-50">
      <div className="flex flex-row md:flex-col h-full justify-around md:justify-start md:p-4">
        <div className="hidden md:block mb-8 text-2xl font-bold text-cyan-500 tracking-wider">
          AXIONYM<span className="text-white">.GUARD</span>
        </div>
        
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col md:flex-row items-center md:space-x-4 p-3 md:py-4 md:px-4 rounded-lg transition-all duration-200 
                ${isActive 
                  ? 'text-cyan-400 bg-cyan-950/30 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
            >
              <Icon size={24} className={isActive ? 'animate-pulse' : ''} />
              <span className="text-xs md:text-sm font-bold mt-1 md:mt-0">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;