import React from 'react';
import { SequenceStep } from '../../hooks/useSequenceBuilder';
import { PromptTemplate } from '../../../../lib/api/prompts.service';
import { Mail, Trash2, Loader2 } from 'lucide-react';

interface EmailStepCardProps {
  step: SequenceStep;
  index: number;
  templates: PromptTemplate[];
  templatesLoading: boolean;
  updateStep: (key: string, updates: Partial<SequenceStep>) => void;
  removeStep: (key: string) => void;
  canRemove: boolean;
}

export function EmailStepCard({ step, index, templates, templatesLoading, updateStep, removeStep, canRemove }: EmailStepCardProps) {
  return (
    <div className="relative p-5 bg-card border border-border rounded-xl shadow-sm flex flex-col gap-4 group">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Mail className="w-4 h-4 text-primary" />
          </div>
          <span className="font-semibold text-foreground">Step {index + 1}: Email</span>
        </div>

        {canRemove && (
          <button
            onClick={() => removeStep(step._key)}
            className="w-8 h-8 flex items-center justify-center rounded-md text-secondary-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
            title="Remove Step"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3 pl-11">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-secondary-foreground">
            Prompt Template <span className="text-red-500">*</span>
          </label>
          {templatesLoading ? (
            <div className="w-full h-9 flex items-center gap-2 px-3 bg-background border border-border rounded-md text-sm text-muted-foreground">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Loading templates...
            </div>
          ) : templates.length === 0 ? (
            <div className="w-full h-9 flex items-center px-3 bg-secondary/20 border border-border rounded-md text-sm text-muted-foreground">
              No templates found — create one in Prompt Templates
            </div>
          ) : (
            <select
              value={step.promptTemplateId || ''}
              onChange={(e) => updateStep(step._key, { promptTemplateId: e.target.value })}
              className="w-full h-9 px-3 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
            >
              <option value="" disabled>Select a template...</option>
              {templates.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
  );
}
