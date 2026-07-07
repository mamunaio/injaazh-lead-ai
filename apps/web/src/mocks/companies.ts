export interface Company {
  id: string;
  name: string;
  logo: string | null;
  website: string;
  description: string;
  industry: string;
  headquarters: string;
  founded: number;
  employees: string;
  revenue: string;
  aiInsights: {
    intentSignals: string[];
    techStack: string[];
    swot: {
      strengths: string[];
      weaknesses: string[];
    };
  };
}

export const MOCK_COMPANIES: Record<string, Company> = {
  'acme-corp': {
    id: 'acme-corp',
    name: 'Acme Corp',
    logo: 'https://logo.clearbit.com/acme.com',
    website: 'https://acme.com',
    description: 'Acme Corp is a leading provider of innovative widget solutions for enterprise companies globally.',
    industry: 'Software Development',
    headquarters: 'San Francisco, CA',
    founded: 2010,
    employees: '500-1000',
    revenue: '$50M - $100M',
    aiInsights: {
      intentSignals: [
        'Recently raised $30M Series C funding',
        'Actively hiring for 15+ Enterprise Sales roles',
        'Website traffic spiked 40% in last 30 days'
      ],
      techStack: [
        'Salesforce',
        'HubSpot',
        'AWS',
        'React',
        'Node.js'
      ],
      swot: {
        strengths: [
          'Strong market position in enterprise widgets',
          'Recent funding enables aggressive expansion'
        ],
        weaknesses: [
          'High sales turnover noted on LinkedIn',
          'Outdated legacy billing infrastructure'
        ]
      }
    }
  }
};
