export type NodeType = 'TRIGGER' | 'ACTION' | 'AI' | 'WAIT';

export interface WorkflowNodeTemplate {
  id: string;
  type: NodeType;
  title: string;
  description: string;
  icon: string;
  defaultConfig?: Record<string, unknown>;
}

export interface WorkflowNodeInstance {
  id: string;
  templateId: string;
  type: NodeType;
  title: string;
  description: string;
  icon: string;
  config: Record<string, unknown>;
}
