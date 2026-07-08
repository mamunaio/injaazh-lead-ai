import React from 'react';
import { WorkflowNodeInstance } from '../../types';
import * as Icons from 'lucide-react';

interface NodeConfigSidebarProps {
  node: WorkflowNodeInstance | null;
  onClose: () => void;
  onUpdateConfig: (id: string, updates: Record<string, unknown>) => void;
}

export function NodeConfigSidebar({ node, onClose, onUpdateConfig }: NodeConfigSidebarProps) {
  if (!node) return null;

  return (
    <div className="w-80 h-full border-l border-border bg-card flex flex-col shadow-[-4px_0_15px_-3px_rgba(0,0,0,0.1)]">
      <div className="flex-none h-14 border-b border-border px-4 flex items-center justify-between bg-secondary/5">
        <h3 className="font-semibold text-sm text-foreground">Configure Step</h3>
        <button onClick={onClose} className="p-1.5 text-secondary-foreground hover:text-foreground hover:bg-secondary/20 rounded">
          <Icons.X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
        <div>
          <label className="block text-xs font-semibold text-secondary-foreground mb-1.5 uppercase tracking-wider">Step Name</label>
          <input
            type="text"
            value={node.title}
            disabled
            className="w-full h-9 px-3 bg-secondary/10 border border-border rounded text-sm text-secondary-foreground cursor-not-allowed"
          />
        </div>

        {node.type === 'WAIT' && (
          <div>
            <label className="block text-xs font-semibold text-secondary-foreground mb-1.5 uppercase tracking-wider">Wait Duration</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={(node.config.duration as number) || 1}
                onChange={(e) => onUpdateConfig(node.id, { duration: parseInt(e.target.value, 10) || 1 })}
                className="w-20 h-9 px-3 bg-background border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                min="1"
              />
              <select
                value={(node.config.unit as string) || 'days'}
                onChange={(e) => onUpdateConfig(node.id, { unit: e.target.value })}
                className="flex-1 h-9 px-3 bg-background border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
                <option value="days">Days</option>
              </select>
            </div>
          </div>
        )}

        {node.type === 'ACTION' && node.templateId === 'action_enrich' && (
          <div>
            <label className="block text-xs font-semibold text-secondary-foreground mb-1.5 uppercase tracking-wider">Enrichment Provider</label>
            <select
              value={(node.config.provider as string) || 'apollo'}
              onChange={(e) => onUpdateConfig(node.id, { provider: e.target.value })}
              className="w-full h-9 px-3 bg-background border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="apollo">Apollo.io</option>
              <option value="clearbit">Clearbit</option>
              <option value="hunter">Hunter.io</option>
            </select>
          </div>
        )}

        {node.type === 'AI' && (
          <div>
            <label className="block text-xs font-semibold text-secondary-foreground mb-1.5 uppercase tracking-wider">Prompt Template</label>
            <select
              value={(node.config.templateId as string) || 'default'}
              onChange={(e) => onUpdateConfig(node.id, { templateId: e.target.value })}
              className="w-full h-9 px-3 bg-background border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="default">Default Sales Follow-up</option>
              <option value="intro">Introductory Pitch</option>
              <option value="custom">Custom Template (v4)</option>
            </select>
            <p className="mt-2 text-[11px] text-secondary-foreground leading-relaxed">
              This node will use the selected template to generate content based on the lead&apos;s enriched data.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
