import React, { useState } from 'react';
import { Search, ShieldAlert, ShieldCheck, HelpCircle, Loader2 } from 'lucide-react';
import { inspectInput } from '../services/mockService';
import { InspectResult } from '../types';

const InspectModule: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<InspectResult | null>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setResult(null);
    
    try {
      const data = await inspectInput(input);
      setResult(data);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: InspectResult['status']) => {
    switch (status) {
      case 'safe': return <ShieldCheck size={48} className="text-cyan-400" />;
      case 'dangerous': return <ShieldAlert size={48} className="text-red-500" />;
      case 'suspicious': return <HelpCircle size={48} className="text-yellow-500" />;
      default: return <HelpCircle size={48} className="text-slate-400" />;
    }
  };

  const getStatusColor = (status: InspectResult['status']) => {
    switch (status) {
      case 'safe': return 'bg-cyan-950/30 border-cyan-500/50';
      case 'dangerous': return 'bg-red-950/30 border-red-500/50';
      case 'suspicious': return 'bg-yellow-950/30 border-yellow-500/50';
      default: return 'bg-slate-800 border-slate-700';
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Threat Scanner</h2>
        <p className="text-slate-400">Enter a URL or Phone Number to verify against global threat intelligence.</p>
      </div>

      <form onSubmit={handleScan} className="relative mb-8 group">
        <div className="absolute inset-0 bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
        <div className="relative flex shadow-lg">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="https://example.com or +1-555-0199..."
            className="w-full bg-slate-900 border-2 border-slate-700 focus:border-cyan-500 rounded-l-lg py-4 px-6 text-slate-100 placeholder-slate-600 outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 text-white font-bold py-4 px-8 rounded-r-lg flex items-center transition-colors"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Search />}
            <span className="ml-2 hidden sm:inline">SCAN</span>
          </button>
        </div>
      </form>

      {result && (
        <div className={`p-6 rounded-xl border ${getStatusColor(result.status)} flex items-start space-x-6 animate-in fade-in slide-in-from-bottom-4`}>
          <div className="shrink-0 pt-1">
            {getStatusIcon(result.status)}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white uppercase mb-2">{result.status}</h3>
            <p className="text-slate-300 leading-relaxed">
              {result.details}
            </p>
            <div className="mt-4 text-xs text-slate-500 font-mono">
              SCANNED AT: {result.scannedAt.toLocaleTimeString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InspectModule;