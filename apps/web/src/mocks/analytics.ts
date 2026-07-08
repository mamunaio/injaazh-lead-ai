export const ANALYTICS_OVERVIEW = {
  totalLeads: 12450,
  leadsTrend: '+12%',
  totalEmailsSent: 85200,
  emailsTrend: '+5%',
  avgOpenRate: 42.5,
  openTrend: '+2.1%',
  avgReplyRate: 8.2,
  replyTrend: '+1.4%',
  overallConversion: 3.5,
  conversionTrend: '+0.5%'
};

export const TIME_SERIES_DATA = [
  { date: 'Mon', sent: 1200, opened: 600, replied: 120, bounced: 20 },
  { date: 'Tue', sent: 1500, opened: 800, replied: 150, bounced: 30 },
  { date: 'Wed', sent: 1800, opened: 950, replied: 200, bounced: 25 },
  { date: 'Thu', sent: 1400, opened: 700, replied: 130, bounced: 15 },
  { date: 'Fri', sent: 1100, opened: 550, replied: 90, bounced: 10 },
  { date: 'Sat', sent: 400, opened: 200, replied: 30, bounced: 5 },
  { date: 'Sun', sent: 300, opened: 150, replied: 20, bounced: 2 },
];

export const CAMPAIGN_PERFORMANCE = [
  { name: 'Q4 SaaS Outreach', sent: 4500, openRate: 48, replyRate: 12, conversion: 4.2 },
  { name: 'Enterprise Pitch', sent: 2100, openRate: 52, replyRate: 15, conversion: 5.8 },
  { name: 'Webinar Follow-up', sent: 3200, openRate: 35, replyRate: 8, conversion: 2.1 },
  { name: 'Cold IT Directors', sent: 5000, openRate: 28, replyRate: 4, conversion: 1.0 },
];

export const LEAD_SOURCES = [
  { name: 'Apollo.io', value: 4500, fill: '#8b5cf6' },
  { name: 'LinkedIn Import', value: 3200, fill: '#3b82f6' },
  { name: 'CSV Upload', value: 1800, fill: '#10b981' },
  { name: 'Organic Inbound', value: 900, fill: '#f59e0b' }
];

export const AI_PERFORMANCE = [
  { metric: 'Avg Generation Time', value: '1.2s' },
  { metric: 'Personalization Success', value: '94%' },
  { metric: 'Tokens Used (30d)', value: '1.2M' },
  { metric: 'Template Accuracy', value: '98%' }
];
