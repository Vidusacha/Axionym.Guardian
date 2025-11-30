import React, { useState } from 'react';
import { Send, FileText, Check } from 'lucide-react';
import { submitReport } from '../services/mockService';

const ReportModule: React.FC = () => {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsSubmitting(true);
    await submitReport(text);
    setIsSubmitting(false);
    setSubmitted(true);
    setText('');

    // Reset success message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Secure Channel</h2>
        <p className="text-slate-400">Share your thoughts or report a cybersecurity incident anonymously. Data is encrypted before transmission.</p>
      </div>

      <div className="flex-1 bg-slate-800/30 border border-slate-700 rounded-xl p-1 relative overflow-hidden">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>

        <form onSubmit={handleSubmit} className="h-full flex flex-col p-6 relative z-10">
          <label className="sr-only" htmlFor="report-text">Your message</label>
          <textarea
            id="report-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 w-full bg-transparent text-slate-100 placeholder-slate-600 resize-none outline-none font-mono text-sm leading-relaxed"
            placeholder="// TYPE YOUR MESSAGE HERE...
// Examples:
// - Suspected phishing email from 'admin@company-support.net'
// - Unusual battery drain on mobile device
// - Suggestion: Add more crypto-jacking detection"
          />
          
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || !text.trim()}
              className={`
                flex items-center space-x-2 px-6 py-3 rounded-lg font-bold transition-all
                ${submitted 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                  : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)] disabled:opacity-50 disabled:cursor-not-allowed'}
              `}
            >
              {submitted ? (
                <>
                  <Check size={18} />
                  <span>SENT</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>TRANSMIT</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      
      <div className="mt-4 flex items-center text-xs text-slate-500 space-x-2">
        <FileText size={12} />
        <span>AXIONYM PROTOCOL V2.1 // E2E ENCRYPTED</span>
      </div>
    </div>
  );
};

export default ReportModule;