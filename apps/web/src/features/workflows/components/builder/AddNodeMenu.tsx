import React from 'react';
const WORKFLOW_NODE_TEMPLATES: unknown[] = [];
import { WorkflowNodeTemplate } from '../../types';
import * as Icons from 'lucide-react';

interface AddNodeMenuProps {
  onAdd: (template: WorkflowNodeTemplate) => void;
  onClose: () => void;
  isTriggerMode?: boolean;
}

export function AddNodeMenu({ onAdd, onClose, isTriggerMode = false }: AddNodeMenuProps) {
  const templates = isTriggerMode 
    ? WORKFLOW_NODE_TEMPLATES.filter(t => t.type === 'TRIGGER')
    : WORKFLOW_NODE_TEMPLATES.filter(t => t.type !== 'TRIGGER');

  return (
    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-80 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-secondary/10 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">
          {isTriggerMode ? 'Select Trigger' : 'Add Action'}
        </h3>
        <button onClick={onClose} className="text-secondary-foreground hover:text-foreground">
          <Icons.X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="max-h-[300px] overflow-y-auto p-2">
        {templates.map(template => {
          const Icon = ((Icons as unknown as Record<string, React.ElementType>)[template.icon] || Icons.Circle) as React.ElementType;
          
          return (
            <button
              key={template.id}
              onClick={() => {
                onAdd(template);
                onClose();
              }}
              className="w-full flex items-start gap-3 p-2.5 rounded-lg hover:bg-secondary/20 transition-colors text-left"
            >
              <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded border border-border bg-background flex items-center justify-center text-foreground">
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground">{template.title}</h4>
                <p className="text-xs text-secondary-foreground mt-0.5">{template.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
