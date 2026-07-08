export type CampaignStatus = 'Active' | 'Draft' | 'Paused' | 'Completed';

export interface Campaign {
  id: string;
  name: string;
  status: CampaignStatus;
  audience: {
    segmentName: string;
    leadCount: number;
  };
  progress: {
    completed: number;
    total: number;
  };
  metrics: {
    openRate: number;
    clickRate: number;
    replies: number;
  };
  createdAt: string;
}

export const CAMPAIGNS_MOCK_DATA: Campaign[] = [
  {
    id: 'camp_001',
    name: 'Summer Outreach 2026',
    status: 'Active',
    audience: {
      segmentName: 'Enterprise Tech Leads',
      leadCount: 450,
    },
    progress: {
      completed: 210,
      total: 450,
    },
    metrics: {
      openRate: 45.2,
      clickRate: 12.8,
      replies: 34,
    },
    createdAt: '2026-06-15T10:00:00Z',
  },
  {
    id: 'camp_002',
    name: 'Q3 Product Update',
    status: 'Draft',
    audience: {
      segmentName: 'All Active Customers',
      leadCount: 1200,
    },
    progress: {
      completed: 0,
      total: 1200,
    },
    metrics: {
      openRate: 0,
      clickRate: 0,
      replies: 0,
    },
    createdAt: '2026-07-01T14:30:00Z',
  },
  {
    id: 'camp_003',
    name: 'Cold Outbound - FinTech',
    status: 'Paused',
    audience: {
      segmentName: 'FinTech Founders',
      leadCount: 850,
    },
    progress: {
      completed: 300,
      total: 850,
    },
    metrics: {
      openRate: 22.4,
      clickRate: 5.1,
      replies: 12,
    },
    createdAt: '2026-05-20T09:15:00Z',
  },
  {
    id: 'camp_004',
    name: 'Webinar Follow-up',
    status: 'Completed',
    audience: {
      segmentName: 'Webinar Attendees - May',
      leadCount: 320,
    },
    progress: {
      completed: 320,
      total: 320,
    },
    metrics: {
      openRate: 68.9,
      clickRate: 24.5,
      replies: 56,
    },
    createdAt: '2026-05-01T11:00:00Z',
  }
];
