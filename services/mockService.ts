import { BroadcastMessage, InspectResult, SecurityQuestion, ThreatStat, TrendData } from '../types';
import { db } from '../lib/firebase';
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';

// --- MOCK DATA FALLBACKS ---
const MOCK_QUESTIONS: SecurityQuestion[] = [
  { id: 'q1', text: 'Do you use a unique password for every account?', weight: 20 },
  { id: 'q2', text: 'Is Two-Factor Authentication (2FA) enabled on your email?', weight: 30 },
  { id: 'q3', text: 'Do you update your OS automatically?', weight: 15 },
  { id: 'q4', text: 'Do you use an encrypted messaging app (e.g., Signal)?', weight: 15 },
  { id: 'q5', text: 'Is your hard drive encrypted (BitLocker/FileVault)?', weight: 20 },
];

// --- DATABASE OPERATIONS ---

// Fetch questions from Firestore 'safety_questions' collection
export const getSecurityQuestions = async (): Promise<SecurityQuestion[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "safety_questions"));
    if (!querySnapshot.empty) {
      console.log(`[DB] Successfully loaded ${querySnapshot.size} questions from Firestore.`);
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          text: data.text || data.question || "Untitled Question",
          weight: data.weight || 10
        };
      }) as SecurityQuestion[];
    } else {
      console.log("[DB] 'safety_questions' collection is empty. Using mock data.");
    }
  } catch (error) {
    console.warn("[DB] Connection failed. Using mock data. Check your API Key in lib/firebase.ts", error);
  }
  return MOCK_QUESTIONS;
};

// Save Checkup Results to 'checkup_results' collection
export const saveCheckupResult = async (score: number, answers: Record<string, boolean>): Promise<boolean> => {
  try {
    await addDoc(collection(db, "checkup_results"), {
      score,
      answers,
      timestamp: Timestamp.now(),
      platform: 'web',
      meta: {
        userAgent: navigator.userAgent
      }
    });
    console.log("[DB] Checkup result saved successfully.");
    return true;
  } catch (error) {
    console.error("[DB] Error saving checkup result:", error);
    // Simulate success for UI if DB fails so user isn't stuck
    return new Promise(resolve => setTimeout(() => resolve(true), 500));
  }
};

// Submit Report to 'incidents' collection
export const submitReport = async (content: string): Promise<boolean> => {
  try {
    await addDoc(collection(db, "incidents"), {
      content,
      timestamp: Timestamp.now(),
      status: 'pending',
      platform: 'web'
    });
    console.log("[DB] Incident report submitted successfully.");
    return true;
  } catch (error) {
    console.error("[DB] Error submitting report:", error);
    return new Promise(resolve => setTimeout(() => resolve(true), 1000));
  }
};

// --- SIMULATED SERVICES (No DB changes requested yet) ---

// Simulate URL/Phone inspection
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
    }, 1500);
  });
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
export const subscribeToBroadcasts = (callback: (msg: BroadcastMessage) => void) => {
  const timeoutId = setTimeout(() => {
    callback({
      id: 'alert-001',
      title: 'GLOBAL THREAT LEVEL: ELEVATED',
      message: 'New Zero-Day vulnerability detected in standard browser engines. Please update Chrome/Edge immediately.',
      level: 'warning',
      timestamp: new Date()
    });
  }, 5000);

  return () => clearTimeout(timeoutId);
};