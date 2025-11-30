import React, { useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Legend } from 'recharts';
import { getThreatStats, getTrendData } from '../services/mockService';

const RadarModule: React.FC = () => {
  const trendData = useMemo(() => getTrendData(), []);
  const threatData = useMemo(() => getThreatStats(), []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      {/* Chart 1: Trends */}
      <div className="bg-slate-800/30 border border-slate-700 p-4 rounded-xl backdrop-blur-sm">
        <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center">
          <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
          GLOBAL ATTACK VECTORS (24H)
        </h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorAttacks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPrevented" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                itemStyle={{ color: '#f8fafc' }}
              />
              <Area type="monotone" dataKey="attacks" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorAttacks)" />
              <Area type="monotone" dataKey="prevented" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorPrevented)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Distribution */}
      <div className="bg-slate-800/30 border border-slate-700 p-4 rounded-xl backdrop-blur-sm">
        <h3 className="text-lg font-bold text-cyan-400 mb-4">THREAT DISTRIBUTION</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={threatData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
              <XAxis type="number" stroke="#94a3b8" fontSize={12} />
              <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} width={100} />
              <Tooltip 
                cursor={{fill: '#1e293b'}}
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
              />
              <Bar dataKey="count" fill="#06b6d4" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Info Panel */}
      <div className="lg:col-span-2 bg-cyan-950/20 border border-cyan-900/50 p-6 rounded-xl">
        <h4 className="text-sm font-mono text-cyan-500 uppercase tracking-widest mb-2">System Status</h4>
        <div className="flex flex-col md:flex-row justify-between items-center text-slate-300 space-y-4 md:space-y-0">
          <div>
            <span className="block text-xs text-slate-500">ACTIVE NODES</span>
            <span className="text-2xl font-bold font-mono">14,203</span>
          </div>
          <div>
            <span className="block text-xs text-slate-500">THREATS BLOCKED</span>
            <span className="text-2xl font-bold font-mono">89.4%</span>
          </div>
          <div>
            <span className="block text-xs text-slate-500">LAST SYNC</span>
            <span className="text-xl font-mono animate-pulse text-green-400">LIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadarModule;