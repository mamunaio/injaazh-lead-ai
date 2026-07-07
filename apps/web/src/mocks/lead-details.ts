import { Lead } from './leads';

export interface DetailedLead extends Lead {
  phone: string;
  website: string;
  linkedin: string;
  jobTitle: string;
  location: string;
  scoreBreakdown: {
    fit: number;
    intent: number;
    engagement: number;
  };
  lastScoredAt: string;
  aiRecommendations: string[];
}

export const LEAD_DETAILS_MOCK: DetailedLead = {
  id: 'lead_001',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@acmecorp.com',
  company: 'Acme Corp',
  status: 'New',
  score: 85,
  tags: ['Enterprise', 'High Priority'],
  campaign: 'Q3 Outbound',
  createdAt: '2026-07-01T10:00:00Z',
  phone: '+1 (555) 123-4567',
  website: 'https://acmecorp.com',
  linkedin: 'linkedin.com/in/johndoe',
  jobTitle: 'VP of Sales',
  location: 'San Francisco, CA',
  scoreBreakdown: {
    fit: 90,
    intent: 80,
    engagement: 85,
  },
  lastScoredAt: '2026-07-06T14:30:00Z',
  aiRecommendations: [
    'Mention recent Series B funding in next email.',
    'Follow up on pricing page visit.',
    'Connect with CTO as secondary point of contact.',
  ]
};

export interface LeadActivity {
  id: string;
  type: 'email' | 'note' | 'status_change' | 'task_created';
  title: string;
  description: string;
  timestamp: string;
  author: {
    name: string;
    avatar?: string;
  };
}

export const LEAD_ACTIVITIES_MOCK: LeadActivity[] = [
  {
    id: 'act_1',
    type: 'note',
    title: 'Left a note',
    description: 'Had a great discovery call. They are evaluating our enterprise plan for 50 seats.',
    timestamp: '2026-07-05T15:30:00Z',
    author: { name: 'Sarah Jenkins' }
  },
  {
    id: 'act_2',
    type: 'email',
    title: 'Sent "Q3 Follow up" email',
    description: 'Email was opened 2 times. Clicked on pricing link.',
    timestamp: '2026-07-04T09:15:00Z',
    author: { name: 'Automated Sequence' }
  },
  {
    id: 'act_3',
    type: 'status_change',
    title: 'Changed status to Qualified',
    description: 'Previous status was Contacted.',
    timestamp: '2026-07-03T11:20:00Z',
    author: { name: 'Sarah Jenkins' }
  }
];

export interface LeadTask {
  id: string;
  title: string;
  dueDate: string;
  status: 'pending' | 'completed';
  assignee: string;
}

export const LEAD_TASKS_MOCK: LeadTask[] = [
  {
    id: 'task_1',
    title: 'Prepare custom proposal',
    dueDate: '2026-07-09T17:00:00Z',
    status: 'pending',
    assignee: 'Sarah Jenkins'
  },
  {
    id: 'task_2',
    title: 'Send follow-up email',
    dueDate: '2026-07-06T10:00:00Z',
    status: 'completed',
    assignee: 'Sarah Jenkins'
  }
];

export interface LeadCampaignHistory {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'paused';
  joinedAt: string;
}

export const LEAD_CAMPAIGNS_MOCK: LeadCampaignHistory[] = [
  {
    id: 'camp_1',
    name: 'Q3 Enterprise Outbound',
    status: 'active',
    joinedAt: '2026-07-01T10:00:00Z'
  },
  {
    id: 'camp_2',
    name: 'Webinar Follow-up (June)',
    status: 'completed',
    joinedAt: '2026-06-15T14:00:00Z'
  }
];