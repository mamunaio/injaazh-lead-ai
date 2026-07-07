// src/mocks/leads.ts

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Won' | 'Lost';

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  status: LeadStatus;
  score: number;
  tags: string[];
  campaign: string | null;
  createdAt: string;
}

export const LEADS_MOCK_DATA: Lead[] = [
  {
    id: 'lead_001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@acmecorp.com',
    company: 'Acme Corp',
    status: 'New',
    score: 92,
    tags: ['Enterprise', 'Tech', 'High Value'],
    campaign: 'Summer Outreach 2026',
    createdAt: '2026-07-06T10:00:00Z',
  },
  {
    id: 'lead_002',
    firstName: 'Sara',
    lastName: 'Lee',
    email: 'sara@betainc.io',
    company: 'Beta Inc',
    status: 'Qualified',
    score: 87,
    tags: ['SaaS', 'Decision Maker'],
    campaign: 'Cold SDR Q3',
    createdAt: '2026-07-05T14:30:00Z',
  },
  {
    id: 'lead_003',
    firstName: 'Mike',
    lastName: 'Yu',
    email: 'myu@gammaltd.com',
    company: 'Gamma Ltd',
    status: 'Contacted',
    score: 81,
    tags: ['SMB', 'Fintech'],
    campaign: 'Summer Outreach 2026',
    createdAt: '2026-07-07T09:15:00Z',
  },
  {
    id: 'lead_004',
    firstName: 'Emma',
    lastName: 'Stone',
    email: 'emma.stone@stark.com',
    company: 'Stark Industries',
    status: 'Won',
    score: 98,
    tags: ['Enterprise', 'VIP'],
    campaign: null,
    createdAt: '2026-07-01T11:20:00Z',
  },
  {
    id: 'lead_005',
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.j@wayne.ent',
    company: 'Wayne Enterprises',
    status: 'Lost',
    score: 45,
    tags: ['B2B', 'Retail'],
    campaign: 'Cold SDR Q3',
    createdAt: '2026-06-28T16:45:00Z',
  },
  {
    id: 'lead_006',
    firstName: 'Diana',
    lastName: 'Prince',
    email: 'diana@themyscira.gov',
    company: 'Themyscira',
    status: 'New',
    score: 89,
    tags: ['Government', 'Decision Maker'],
    campaign: null,
    createdAt: '2026-07-07T12:00:00Z',
  },
  {
    id: 'lead_007',
    firstName: 'Bruce',
    lastName: 'Banner',
    email: 'bruce@hulk.org',
    company: 'Hulk Foundation',
    status: 'Qualified',
    score: 95,
    tags: ['Non-Profit', 'Tech'],
    campaign: 'Summer Outreach 2026',
    createdAt: '2026-07-06T15:30:00Z',
  }
];
