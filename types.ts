export enum AppTab {
  CHECKUP = 'CHECKUP',
  INSPECT = 'INSPECT',
  RADAR = 'RADAR',
  REPORT = 'REPORT'
}

export interface SecurityQuestion {
  id: string;
  text: string;
  weight: number; // How much this question impacts the score
}

export interface BroadcastMessage {
  id: string;
  title: string;
  message: string;
  level: 'info' | 'warning' | 'critical';
  timestamp: Date;
}

export interface InspectResult {
  status: 'safe' | 'suspicious' | 'dangerous' | 'unknown';
  details: string;
  scannedAt: Date;
}

export interface ThreatStat {
  name: string;
  count: number;
}

export interface TrendData {
  time: string;
  attacks: number;
  prevented: number;
}