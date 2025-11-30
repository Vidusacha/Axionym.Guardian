import { BroadcastMessage, InspectResult, SecurityQuestion, ThreatStat, TrendData } from '../types';

// Simulate fetching questions from Firestore
export const getSecurityQuestions = async (): Promise<SecurityQuestion[]> => {
  return [
    { id: 'q1', text: 'Do you use a unique password for every account?', weight: 20 },
    { id: 'q2', text: 'Is Two-Factor Authentication (2FA) enabled on your email?', weight: 30 },
    { id: 'q3', text: 'Do you update your OS automatically?', weight: 15 },
    { id: 'q4', text: 'Do you use an encrypted messaging app (e.g., Signal)?', weight: 15 },
    { id: 'q5', text: 'Is your hard drive encrypted (BitLocker/FileVault)?', weight: 20 },
  ];
};

// Simulate URL/Phone inspection (mocking an external API check)
export const inspectInput = async (input: string): Promise<InspectResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lower = input.toLowerCase();
      
      let status: InspectResult['status'] = 'safe';
      let details = 'No known threats found in global databases.';

      if (lower.includes('malware') || lower.includes('virus') || lower.includes('win-prize')) {
        status = 'dangerous';
        details = 'MATCH FOUND: Known phishing pattern detected.';
      } else if (lower.includes('http:') && !lower.includes('https:')) {
        status = 'suspicious';
        details = 'Protocol insecure (HTTP). Data can be intercepted.';
      } else if (input.replace(/\D/g, '').length > 15) {
        status = 'suspicious';
        details = 'Number format irregular for standard international dialing.';
      }

      resolve({
        status,
        details,
        scannedAt: new Date()
      });
    }, 1500); // Fake network delay
  });
};

// Simulate submitting report to Google Sheets / Firestore
export const submitReport = async (content: string): Promise<boolean> => {
  console.log('Submitting report to backend:', content);
  return new Promise(resolve => setTimeout(() => resolve(true), 1000));
};

// Mock Data for Radar
export const getTrendData = (): TrendData[] => [
  { time: '00:00', attacks: 120, prevented: 110 },
  { time: '04:00', attacks: 80, prevented: 78 },
  { time: '08:00', attacks: 450, prevented: 430 },
  { time: '12:00', attacks: 980, prevented: 900 },
  { time: '16:00', attacks: 670, prevented: 650 },
  { time: '20:00', attacks: 230, prevented: 220 },
];

export const getThreatStats = (): ThreatStat[] => [
  { name: 'Phishing', count: 4500 },
  { name: 'Ransomware', count: 1200 },
  { name: 'DDoS', count: 800 },
  { name: 'Malware', count: 3200 },
];

// Simulate a server broadcast listener
// In a real app, this would use WebSocket or Firebase onSnapshot
export const subscribeToBroadcasts = (callback: (msg: BroadcastMessage) => void) => {
  const timeoutId = setTimeout(() => {
    callback({
      id: 'alert-001',
      title: 'GLOBAL THREAT LEVEL: ELEVATED',
      message: 'New Zero-Day vulnerability detected in standard browser engines. Please update Chrome/Edge immediately.',
      level: 'warning',
      timestamp: new Date()
    });
  }, 5000); // Simulate an alert arriving 5 seconds after app load

  return () => clearTimeout(timeoutId);
};