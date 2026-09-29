export interface User {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
}

export interface EnergyRecord {
  id: string;
  user_id: string;
  type: 'electricity' | 'gas' | 'water';
  amount: number;
  unit: string;
  period_start: string;
  period_end: string;
  cost: number;
  created_at: string;
}

export interface Analysis {
  id: string;
  user_id: string;
  record_id: string | null;
  summary: string;
  findings: Finding[];
  recommendations: Recommendation[];
  footprint_kg_co2: number;
  created_at: string;
}

export interface Finding {
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

export interface Recommendation {
  title: string;
  action: string;
  reason: string;
  priority: 'low' | 'medium' | 'high';
}

export interface JwtPayload {
  userId: string;
  email: string;
}
