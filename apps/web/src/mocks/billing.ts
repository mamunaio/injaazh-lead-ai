export interface UsageMetric {
  name: string;
  current: number;
  limit: number;
}

export interface BillingData {
  planName: string;
  usage: {
    leads: UsageMetric;
    emails: UsageMetric;
    aiCredits: UsageMetric;
    teamMembers: UsageMetric;
  };
}

export const MOCK_BILLING: BillingData = {
  planName: 'FREE',
  usage: {
    leads: { name: 'Leads', current: 142, limit: 500 },
    emails: { name: 'Emails/mo', current: 4830, limit: 10000 },
    aiCredits: { name: 'AI Credits', current: 18, limit: 50 },
    teamMembers: { name: 'Team Members', current: 3, limit: 5 }
  }
};
