export interface EmailMessage {
  id: string;
  sender: { name: string; email: string };
  recipient: { name: string; email: string };
  subject: string;
  body: string;
  timestamp: string;
  isOutbound: boolean;
  status?: 'sent' | 'delivered' | 'opened' | 'clicked';
}

export interface ThreadLabel {
  id: string;
  name: string;
  color: string;
}

export interface ThreadInternalNote {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export interface EmailThread {
  id: string;
  leadId: string;
  leadName: string;
  leadCompany: string;
  subject: string;
  messages: EmailMessage[];
  unread: boolean;
  lastMessageAt: string;
  labels: ThreadLabel[];
  assignee: string | null;
  notes: ThreadInternalNote[];
}

export const MOCK_LABELS: ThreadLabel[] = [
  { id: 'l1', name: 'Hot Lead', color: 'bg-red-500/20 text-red-500 border-red-500/30' },
  { id: 'l2', name: 'Meeting Booked', color: 'bg-green-500/20 text-green-500 border-green-500/30' },
  { id: 'l3', name: 'Needs Follow-up', color: 'bg-orange-500/20 text-orange-500 border-orange-500/30' },
  { id: 'l4', name: 'Not Interested', color: 'bg-secondary/40 text-secondary-foreground border-border' },
];

export const MOCK_TEAM_MEMBERS = [
  { id: 'u1', name: 'Alex Director' },
  { id: 'u2', name: 'Sarah Sales' },
  { id: 'u3', name: 'John Closer' }
];

export const MOCK_THREADS: EmailThread[] = [
  {
    id: 't_1001',
    leadId: 'lead_1',
    leadName: 'Jane Smith',
    leadCompany: 'TechCorp Inc.',
    subject: 'Re: Improving your API infrastructure',
    unread: true,
    lastMessageAt: '10:42 AM',
    labels: [MOCK_LABELS[0]],
    assignee: 'u1',
    notes: [
      { id: 'n1', author: 'Alex Director', text: 'She seems very interested in our caching layer.', timestamp: 'Yesterday' }
    ],
    messages: [
      {
        id: 'm1',
        sender: { name: 'Alex Director', email: 'alex@injaazh.ai' },
        recipient: { name: 'Jane Smith', email: 'jane@techcorp.com' },
        subject: 'Improving your API infrastructure',
        body: 'Hi Jane,\n\nI noticed TechCorp has been scaling rapidly. We help companies like yours optimize API latency by up to 40%.\n\nOpen to a quick chat this Thursday?',
        timestamp: 'Oct 24, 2:00 PM',
        isOutbound: true,
        status: 'opened'
      },
      {
        id: 'm2',
        sender: { name: 'Jane Smith', email: 'jane@techcorp.com' },
        recipient: { name: 'Alex Director', email: 'alex@injaazh.ai' },
        subject: 'Re: Improving your API infrastructure',
        body: 'Hi Alex,\n\nActually, yes. We are currently evaluating new caching solutions. Thursday at 10 AM EST works for me. Can you send over a calendar invite?\n\nBest,\nJane',
        timestamp: '10:42 AM',
        isOutbound: false
      }
    ]
  },
  {
    id: 't_1002',
    leadId: 'lead_2',
    leadName: 'Michael Chang',
    leadCompany: 'Nexus Financial',
    subject: 'Follow-up: Nexus Financial <> Injaazh',
    unread: false,
    lastMessageAt: 'Yesterday',
    labels: [MOCK_LABELS[2]],
    assignee: null,
    notes: [],
    messages: [
      {
        id: 'm3',
        sender: { name: 'Sarah Sales', email: 'sarah@injaazh.ai' },
        recipient: { name: 'Michael Chang', email: 'm.chang@nexus.com' },
        subject: 'Follow-up: Nexus Financial <> Injaazh',
        body: 'Hi Michael, just bubbling this up to the top of your inbox. Did you have a chance to review the proposal I sent last week?',
        timestamp: 'Yesterday, 9:00 AM',
        isOutbound: true,
        status: 'delivered'
      }
    ]
  },
  {
    id: 't_1003',
    leadId: 'lead_3',
    leadName: 'Amanda Rivera',
    leadCompany: 'CloudScale',
    subject: 'Re: Checking in',
    unread: false,
    lastMessageAt: 'Oct 20',
    labels: [MOCK_LABELS[3]],
    assignee: 'u2',
    notes: [],
    messages: [
      {
        id: 'm4',
        sender: { name: 'Amanda Rivera', email: 'amanda@cloudscale.io' },
        recipient: { name: 'Sarah Sales', email: 'sarah@injaazh.ai' },
        subject: 'Re: Checking in',
        body: 'Hi Sarah, thanks for reaching out, but we are not currently looking for a new vendor in this space. We just signed a 2-year contract with your competitor. Please remove me from your list.',
        timestamp: 'Oct 20, 4:15 PM',
        isOutbound: false
      }
    ]
  }
];
