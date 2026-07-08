export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface CrmTask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  assignee: {
    id: string;
    name: string;
    avatar?: string;
  };
  leadId?: string;
  leadName?: string;
}

const getFutureDate = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0]; // YYYY-MM-DD
};

export const MOCK_TASKS: CrmTask[] = [
  {
    id: 'task_1',
    title: 'Follow up on proposal',
    description: 'Call Jane regarding the Q3 API infrastructure proposal sent last week.',
    status: 'todo',
    dueDate: getFutureDate(0),
    assignee: { id: 'u1', name: 'Alex Director' },
    leadId: 'lead_1',
    leadName: 'Jane Smith'
  },
  {
    id: 'task_2',
    title: 'Review Nexus Financial contract',
    description: 'Ensure legal has cleared the custom clauses requested by Michael.',
    status: 'in-progress',
    dueDate: getFutureDate(1),
    assignee: { id: 'u2', name: 'Sarah Sales' },
    leadId: 'lead_2',
    leadName: 'Michael Chang'
  },
  {
    id: 'task_3',
    title: 'Prepare demo instance',
    description: 'Setup the tailored demo environment for CloudScale presentation.',
    status: 'todo',
    dueDate: getFutureDate(2),
    assignee: { id: 'u1', name: 'Alex Director' },
    leadId: 'lead_3',
    leadName: 'Amanda Rivera'
  },
  {
    id: 'task_4',
    title: 'Send welcome kit',
    description: 'Send onboarding documents to the newly signed Acme Corp.',
    status: 'done',
    dueDate: getFutureDate(-2),
    assignee: { id: 'u3', name: 'John Closer' }
  },
  {
    id: 'task_5',
    title: 'Connect on LinkedIn',
    description: 'Send connection request and comment on latest post.',
    status: 'todo',
    dueDate: getFutureDate(0),
    assignee: { id: 'u2', name: 'Sarah Sales' }
  },
  {
    id: 'task_6',
    title: 'Draft Q4 outreach sequence',
    description: 'Write the 4-step sequence for the new product launch.',
    status: 'in-progress',
    dueDate: getFutureDate(4),
    assignee: { id: 'u1', name: 'Alex Director' }
  },
  {
    id: 'task_7',
    title: 'Update CRM fields',
    description: 'Fill missing data for imported list of 50 leads.',
    status: 'done',
    dueDate: getFutureDate(-5),
    assignee: { id: 'u3', name: 'John Closer' }
  }
];
