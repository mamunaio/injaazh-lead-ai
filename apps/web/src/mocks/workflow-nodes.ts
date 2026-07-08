import { WorkflowNodeTemplate } from '../features/workflows/types';

export const WORKFLOW_NODE_TEMPLATES: WorkflowNodeTemplate[] = [
  {
    id: 'trigger_import',
    type: 'TRIGGER',
    title: 'Import Leads',
    description: 'Trigger when new leads are imported via CSV or Integration',
    icon: 'Database',
    defaultConfig: { source: 'all' }
  },
  {
    id: 'action_enrich',
    type: 'ACTION',
    title: 'Enrich Lead',
    description: 'Fetch missing data using Apollo or external providers',
    icon: 'Search',
    defaultConfig: { provider: 'apollo' }
  },
  {
    id: 'ai_score',
    type: 'AI',
    title: 'AI Lead Score',
    description: 'Evaluate lead readiness based on ICP criteria',
    icon: 'BrainCircuit',
    defaultConfig: { criteria: 'default' }
  },
  {
    id: 'ai_generate_email',
    type: 'AI',
    title: 'Generate Email',
    description: 'Draft personalized email using prompt templates',
    icon: 'Sparkles',
    defaultConfig: { templateId: 'default' }
  },
  {
    id: 'action_send_email',
    type: 'ACTION',
    title: 'Send Email',
    description: 'Dispatch an email through connected accounts',
    icon: 'Send',
    defaultConfig: { accountId: 'default' }
  },
  {
    id: 'wait_delay',
    type: 'WAIT',
    title: 'Wait',
    description: 'Pause the workflow for a specified time',
    icon: 'Clock',
    defaultConfig: { duration: 2, unit: 'days' }
  }
];
