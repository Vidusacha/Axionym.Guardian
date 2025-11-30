import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import CheckupModule from './components/CheckupModule';
import InspectModule from './components/InspectModule';
import RadarModule from './components/RadarModule';
import ReportModule from './components/ReportModule';
import BroadcastBanner from './components/BroadcastBanner';
import { AppTab, BroadcastMessage } from './types';
import { subscribeToBroadcasts } from './services/mockService';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<AppTab>(AppTab.CHECKUP);
  const [broadcast, setBroadcast] = useState<BroadcastMessage | null>(null);

  useEffect(() => {
    // Initialize broadcast listener
    const unsubscribe = subscribeToBroadcasts((msg) => {
      setBroadcast(msg);
      // Auto dismiss non-critical after 10 seconds
      if (msg.level !== 'critical') {
        setTimeout(() => setBroadcast(null), 10000);
      }
    });
    return () => unsubscribe();
  }, []);

  const renderContent = () => {
    switch (currentTab) {
      case AppTab.CHECKUP: return <CheckupModule />;
      case AppTab.INSPECT: return <InspectModule />;
      case AppTab.RADAR: return <RadarModule />;
      case AppTab.REPORT: return <ReportModule />;
      default: return <CheckupModule />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-900 text-slate-50 overflow-hidden font-mono selection:bg-cyan-500/30">
      
      <BroadcastBanner message={broadcast} onDismiss={() => setBroadcast(null)} />

      <Navigation currentTab={currentTab} onTabChange={setCurrentTab} />

      <main className="flex-1 overflow-auto relative flex flex-col">
        {/* Header (Mobile Only) */}
        <header className="md:hidden p-4 border-b border-slate-800 bg-slate-900/95 sticky top-0 z-40 flex justify-between items-center">
          <div className="text-xl font-bold text-cyan-500 tracking-wider">
            AXIONYM<span className="text-white">.GUARD</span>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-4 md:p-8 pb-24 md:pb-8 max-w-7xl mx-auto w-full">
          {renderContent()}
        </div>

        {/* Background ambient glow effect */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[100px]"></div>
        </div>
      </main>
    </div>
  );
};

export default App;