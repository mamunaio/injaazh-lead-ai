export interface Integration {
  id: string;
  name: string;
  description: string;
  status: 'connected' | 'disconnected';
  connectedAt?: string;
  category: 'data' | 'communication' | 'automation';
}

export const MOCK_INTEGRATIONS: Integration[] = [
  {
    id: 'google-maps',
    name: 'Google Maps',
    description: 'Extract leads directly from Google Maps listings.',
    status: 'connected',
    connectedAt: '2026-06-15T10:30:00Z',
    category: 'data'
  },
  {
    id: 'apollo',
    name: 'Apollo',
    description: 'Enrich lead data with Apollo\'s extensive database.',
    status: 'disconnected',
    category: 'data'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    description: 'Connect your account to send automated LinkedIn messages.',
    status: 'connected',
    connectedAt: '2026-07-01T14:20:00Z',
    category: 'communication'
  },
  {
    id: 'gmail',
    name: 'Gmail',
    description: 'Send sequences and sync replies directly with Gmail.',
    status: 'connected',
    connectedAt: '2026-05-20T09:15:00Z',
    category: 'communication'
  },
  {
    id: 'outlook',
    name: 'Outlook',
    description: 'Send sequences and sync replies directly with Outlook.',
    status: 'disconnected',
    category: 'communication'
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Receive real-time notifications for new leads and replies.',
    status: 'disconnected',
    category: 'automation'
  },
  {
    id: 'webhooks',
    name: 'Webhooks',
    description: 'Trigger custom endpoints on specific CRM events.',
    status: 'disconnected',
    category: 'automation'
  }
];
