// src/mocks/dashboard.ts

export const KPI_CARDS_MOCK_DATA = [
  {
    label: "Today's Imports",
    value: "142",
    trend: "+12 since yest",
    trendPositive: true,
    color: 'blue' as const
  },
  {
    label: "Qualified Leads",
    value: "38",
    trend: "30% of total",
    trendPositive: true,
    color: 'green' as const
  },
  {
    label: "Emails Sent Today",
    value: "630",
    trend: "of 4,830 total",
    trendPositive: true,
    trendNeutral: true,
    color: 'violet' as const
  },
  {
    label: "Reply Rate",
    value: "8.7%",
    trend: "+1.1% this wk",
    trendPositive: true,
    color: 'orange' as const
  }
];

export const AI_INSIGHTS_MOCK_DATA = [
  {
    id: 1,
    initials: 'JD',
    name: 'John Doe',
    company: 'Acme Corp',
    score: 92,
    scoreColor: 'green',
    insight: 'High ICP. Send follow-up.',
    action: 'Generate Email'
  },
  {
    id: 2,
    initials: 'SL',
    name: 'Sara Lee',
    company: 'Beta Inc',
    score: 87,
    scoreColor: 'green',
    insight: 'Uncontacted. Start outreach.',
    action: 'Generate Outreach'
  }
];

export const PIPELINE_FUNNEL_MOCK_DATA = [
  { status: 'New', count: 68, percent: 54, color: 'bg-blue' },
  { status: 'Contacted', count: 24, percent: 19, color: 'bg-violet' },
  { status: 'Qualified', count: 8, percent: 6, color: 'bg-amber' },
  { status: 'Won', count: 22, percent: 17, color: 'bg-green' },
  { status: 'Lost', count: 3, percent: 2, color: 'bg-destructive' },
];

export const PIPELINE_TOP_LEADS_MOCK_DATA = [
  { initials: 'JD', name: 'John Doe', company: 'Acme Corp', score: 92, status: 'New', color: 'blue' },
  { initials: 'SL', name: 'Sara Lee', company: 'Beta Inc', score: 87, status: 'Qualified', color: 'amber' },
  { initials: 'MY', name: 'Mike Yu', company: 'Gamma Ltd', score: 81, status: 'Contacted', color: 'violet' },
];

export const CAMPAIGN_STATS_MOCK_DATA = [
  { label: 'Active', count: 3, icon: 'â—', color: 'text-green', bg: 'bg-green-subtle' },
  { label: 'Paused', count: 1, icon: 'â¸', color: 'text-amber', bg: 'bg-amber-subtle' },
  { label: 'Done', count: 8, icon: 'âœ“', color: 'text-blue', bg: 'bg-blue-subtle' },
  { label: 'Draft', count: 2, icon: 'â—»', color: 'text-secondary-foreground', bg: 'bg-secondary' },
];

export const CAMPAIGNS_MOCK_DATA = [
  {
    id: 1,
    name: 'Summer Outreach 2026',
    status: 'Active',
    statusColor: 'text-green',
    sequence: '3-step',
    audience: 'VIP Leads',
    total: 42,
    completed: 28,
    open: 31,
    reply: 9,
    bounced: 2,
  },
  {
    id: 2,
    name: 'Cold SDR Q3',
    status: 'Active',
    statusColor: 'text-green',
    sequence: '5-step',
    audience: 'SDR Segment',
    total: 80,
    completed: 48,
    open: 26,
    reply: 6,
    bounced: 1,
  }
];

export const ACTIVITY_TODAY_MOCK_DATA = [
  {
    id: 1,
    type: 'reply',
    iconName: 'MessageSquare',
    bg: 'bg-[#1E2048]',
    text: 'text-violet',
    title: 'John Doe replied to "Summer Outreach"',
    meta: 'Campaign: Summer Outreach 2026',
    link: 'View Lead',
    time: '2m ago'
  },
  {
    id: 2,
    type: 'opened',
    iconName: 'Eye',
    bg: 'bg-[#052E16]',
    text: 'text-green',
    title: 'Sara Lee opened "Cold SDR Q3"',
    meta: null,
    link: null,
    time: '14m ago'
  },
  {
    id: 3,
    type: 'completed',
    iconName: 'CheckCircle',
    bg: 'bg-[#052E16]',
    text: 'text-green',
    title: '"Q3 Outreach" campaign completed',
    meta: '42 leads Â· Open 29%',
    link: null,
    time: '1h ago'
  },
  {
    id: 4,
    type: 'import',
    iconName: 'Upload',
    bg: 'bg-[#0A1628]',
    text: 'text-blue',
    title: '152 leads imported by Alex J.',
    meta: null,
    link: 'View',
    time: '3h ago'
  }
];

export const ACTIVITY_YESTERDAY_MOCK_DATA = [
  {
    id: 5,
    type: 'ai',
    iconName: 'Sparkles',
    bg: 'bg-[#1A0D3D]',
    text: 'text-violet',
    title: 'AI audit: Acme Corp',
    meta: 'Completed',
    link: null,
    time: 'Yesterday'
  }
];

export const ONBOARDING_MOCK_DATA = [
  { label: 'Connected email', done: true },
  { label: 'Imported first lead', done: true },
  { label: 'Created campaign', done: true },
  { label: 'Sent first email', done: false },
];
export const QUICK_ACTIONS_MOCK_DATA = [
  { iconName: 'Plus', label: 'Add Lead', href: '/leads/new' },
  { iconName: 'Upload', label: 'Import Leads (CSV)', href: '/leads/import' },
  { iconName: 'LayoutTemplate', label: 'Create Campaign', href: '/campaigns/new' },
  { iconName: 'Repeat', label: 'New Sequence', href: '/sequences/new' },
  { iconName: 'Sparkles', label: 'Run AI Website Audit', href: '/ai-tools/audit', text: 'text-violet' },
];
