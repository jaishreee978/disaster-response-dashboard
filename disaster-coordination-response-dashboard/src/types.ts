export type Severity = 'low' | 'medium' | 'high' | 'critical';
export type Status = 'pending' | 'active' | 'resolved' | 'closed';

export interface Incident {
  id: string;
  title: string;
  description: string;
  location: string;
  severity: Severity;
  status: Status;
  timestamp: string;
  type: string;
}

export interface Resource {
  id: string;
  name: string;
  type: string;
  total: number;
  available: number;
  unit: string;
}

export interface RescueTeam {
  id: string;
  name: string;
  members: number;
  status: 'available' | 'on-duty' | 'dispatched';
  location: string;
  eta?: string;
}

export interface Alert {
  id: string;
  message: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'critical';
}

export interface Volunteer {
  id: string;
  name: string;
  contact: string;
  location: string;
  skills: string[];
  status: 'available' | 'assigned' | 'on-duty';
  availability: string;
}
