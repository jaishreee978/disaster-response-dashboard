import { Incident, Resource, RescueTeam, Alert, Volunteer } from '../types';

export const dummyIncidents: Incident[] = [
  {
    id: 'INC-2024-001',
    title: 'Flash Flood in Sector 7',
    description: 'Heavy rainfall caused sudden flooding in low-lying residential areas.',
    location: 'Sector 7, North District',
    severity: 'high',
    status: 'active',
    timestamp: '2024-02-28T09:30:00Z',
    type: 'Flood',
  },
  {
    id: 'INC-2024-002',
    title: 'Forest Fire near Ridge',
    description: 'Dry conditions led to a small fire spreading near the national park boundary.',
    location: 'Ridge Park, East District',
    severity: 'critical',
    status: 'active',
    timestamp: '2024-02-28T10:15:00Z',
    type: 'Fire',
  },
  {
    id: 'INC-2024-003',
    title: 'Power Grid Outage',
    description: 'Major transformer failure affecting three sub-districts.',
    location: 'Central Hub',
    severity: 'medium',
    status: 'pending',
    timestamp: '2024-02-28T11:00:00Z',
    type: 'Infrastructure',
  },
];

export const dummyResources: Resource[] = [
  { id: '1', name: 'Ambulances', type: 'Medical', total: 50, available: 12, unit: 'Units' },
  { id: '2', name: 'Fire Trucks', type: 'Emergency', total: 30, available: 5, unit: 'Units' },
  { id: '3', name: 'Rescue Boats', type: 'Water', total: 20, available: 18, unit: 'Units' },
  { id: '4', name: 'Medical Kits', type: 'Medical', total: 500, available: 150, unit: 'Kits' },
  { id: '5', name: 'Food Supplies', type: 'Logistics', total: 1000, available: 800, unit: 'Packs' },
  { id: '6', name: 'Shelter Capacity', type: 'Housing', total: 2000, available: 450, unit: 'Beds' },
];

export const dummyTeams: RescueTeam[] = [
  { id: 'T1', name: 'Alpha Squad', members: 8, status: 'on-duty', location: 'Sector 7', eta: '10 mins' },
  { id: 'T2', name: 'Bravo Team', members: 6, status: 'available', location: 'Central Base' },
  { id: 'T3', name: 'Charlie Unit', members: 10, status: 'dispatched', location: 'Ridge Park', eta: '25 mins' },
];

export const dummyAlerts: Alert[] = [
  { id: 'A1', message: 'Severe weather warning for North District. Residents advised to stay indoors.', timestamp: '2024-02-28T08:00:00Z', severity: 'critical' },
  { id: 'A2', message: 'Water levels rising in River Basin. Monitoring in progress.', timestamp: '2024-02-28T09:45:00Z', severity: 'warning' },
];

export const dummyVolunteers: Volunteer[] = [
  { id: 'V1', name: 'John Doe', contact: '+1 234 567 890', location: 'West Side', skills: ['Medical', 'Driving'], status: 'available', availability: 'Full-time' },
  { id: 'V2', name: 'Jane Smith', contact: '+1 987 654 321', location: 'East Side', skills: ['Logistics', 'Technical'], status: 'on-duty', availability: 'Weekends' },
];
