import React, { useState, useEffect } from 'react';
import { SecurityQuestion } from '../types';
import { getSecurityQuestions, saveCheckupResult } from '../services/mockService';
import { CheckCircle2, Circle, Save, Loader2 } from 'lucide-react';

const CheckupModule: React.FC = () => {
  const [questions, setQuestions] = useState<SecurityQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [score, setScore] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    getSecurityQuestions().then(setQuestions);
  }, []);

  useEffect(() => {
    let currentScore = 0;
    let totalWeight = 0;

    questions.forEach(q => {
      totalWeight += q.weight;
      if (answers[q.id]) {
        currentScore += q.weight;
      }
    });

    if (totalWeight > 0) {
      setScore(Math.round((currentScore / totalWeight) * 100));
    }
  }, [answers, questions]);

  const toggleAnswer = (id: string) => {
    setAnswers(prev => ({ ...prev, [id]: !prev[id] }));
    setLastSaved(null); // Reset saved status on change
  };

  const handleSave = async () => {
    setIsSaving(true);
    await saveCheckupResult(score, answers);
    setLastSaved(new Date());
    setIsSaving(false);
  };

  const getScoreColor = (s: number) => {
    if (s >= 80) return 'text-cyan-400';
    if (s >= 50) return 'text-yellow-400';
    return 'text-red-500';
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        <div className="flex-1 bg-slate-800/50 border border-slate-700 p-6 rounded-xl flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Security Score</h2>
            <p className="text-slate-400 text-sm mt-1">Based on your configuration</p>
          </div>
          <div className={`text-5xl font-bold ${getScoreColor(score)}`}>
            {score}%
          </div>
        </div>

        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-cyan-900/40 hover:bg-cyan-900/60 border border-cyan-500/30 text-cyan-400 p-6 rounded-xl flex flex-col items-center justify-center min-w-[120px] transition-all disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="animate-spin mb-1" /> : <Save className="mb-1" />}
          <span className="text-xs font-bold tracking-wider">
            {lastSaved ? 'SAVED' : 'SAVE ANALYSIS'}
          </span>
        </button>
      </div>

      <div className="space-y-3">
        {questions.map((q) => {
          const isChecked = !!answers[q.id];
          return (
            <div 
              key={q.id}
              onClick={() => toggleAnswer(q.id)}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 flex items-center space-x-4
                ${isChecked 
                  ? 'bg-cyan-950/20 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.1)]' 
                  : 'bg-slate-800/30 border-slate-700 hover:bg-slate-800'}`}
            >
              <div className={`transition-colors duration-300 ${isChecked ? 'text-cyan-400' : 'text-slate-600'}`}>
                {isChecked ? <CheckCircle2 size={24} /> : <Circle size={24} />}
              </div>
              <div className="flex-1">
                <p className="text-slate-200 font-medium">{q.text}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      {lastSaved && (
        <div className="text-center text-xs text-slate-500 font-mono">
          LAST SAVED TO DATABASE: {lastSaved.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
};

export default CheckupModule;