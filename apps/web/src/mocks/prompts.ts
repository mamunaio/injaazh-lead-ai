export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
}

export const PROMPT_TEMPLATES_MOCK_DATA: PromptTemplate[] = [
  { id: 'pt_1', name: 'Intro Email', description: 'Initial cold outreach focusing on pain points.' },
  { id: 'pt_2', name: 'Value Prop Follow-up', description: 'Second email highlighting core product benefits.' },
  { id: 'pt_3', name: 'Case Study Share', description: 'Share a relevant customer success story.' },
  { id: 'pt_4', name: 'Meeting Request', description: 'Directly ask for a 15-minute introductory call.' },
  { id: 'pt_5', name: 'Break-up Email', description: 'Final email to close the loop if unresponsive.' },
];
