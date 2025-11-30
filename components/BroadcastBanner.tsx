import React from 'react';
import { AlertTriangle, Info, X } from 'lucide-react';
import { BroadcastMessage } from '../types';

interface BroadcastBannerProps {
  message: BroadcastMessage | null;
  onDismiss: () => void;
}

const BroadcastBanner: React.FC<BroadcastBannerProps> = ({ message, onDismiss }) => {
  if (!message) return null;

  const isCritical = message.level === 'critical';
  const isWarning = message.level === 'warning';

  const bgColor = isCritical ? 'bg-red-900/90' : isWarning ? 'bg-orange-900/90' : 'bg-cyan-900/90';
  const borderColor = isCritical ? 'border-red-500' : isWarning ? 'border-orange-500' : 'border-cyan-500';

  return (
    <div className={`fixed top-4 left-4 right-4 md:left-auto md:right-8 md:w-96 z-50 animate-bounce`}>
      <div className={`${bgColor} backdrop-blur border-l-4 ${borderColor} p-4 shadow-lg rounded-r-md flex items-start gap-3`}>
        <div className="mt-1 shrink-0">
          {isCritical || isWarning ? <AlertTriangle className="text-white" /> : <Info className="text-white" />}
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-white text-sm uppercase tracking-wide">{message.title}</h4>
          <p className="text-slate-200 text-xs mt-1 leading-relaxed">
            {message.message}
          </p>
        </div>
        <button onClick={onDismiss} className="text-slate-300 hover:text-white">
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default BroadcastBanner;