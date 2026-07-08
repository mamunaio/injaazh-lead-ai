export interface PromptVersion {
  id: string;
  version: number;
  content: string;
  updatedAt: string;
  updatedBy: string;
}

export const PROMPT_HISTORY_MOCK_DATA: PromptVersion[] = [
  {
    id: 'v4',
    version: 4,
    content: "Hi {firstName},\n\nI noticed {company} recently expanded its engineering team. I'd love to show you how our tool helps scale workflows.\n\nBest,\nSales Team",
    updatedAt: "2023-11-01T10:00:00Z",
    updatedBy: "Sarah Connor"
  },
  {
    id: 'v3',
    version: 3,
    content: "Hi {firstName},\n\nI saw that {company} is growing. We help companies like yours streamline their sales process.\n\nThanks,\nSarah",
    updatedAt: "2023-10-15T14:30:00Z",
    updatedBy: "John Smith"
  },
  {
    id: 'v2',
    version: 2,
    content: "Hello {firstName},\n\nWe provide solutions for {company}. Are you available for a quick chat next week?",
    updatedAt: "2023-09-20T09:15:00Z",
    updatedBy: "Sarah Connor"
  },
  {
    id: 'v1',
    version: 1,
    content: "Hi there,\n\nWe have a great product for your company. Let me know if you want to see a demo.",
    updatedAt: "2023-08-01T11:00:00Z",
    updatedBy: "Admin"
  }
];
