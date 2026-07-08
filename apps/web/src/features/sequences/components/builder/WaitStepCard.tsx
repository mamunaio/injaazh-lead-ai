import React from 'react';
import { SequenceStep } from '../../hooks/useSequenceBuilder';
import { Clock, Trash2 } from 'lucide-react';

interface WaitStepCardProps {
  step: SequenceStep;
  updateStep: (key: string, updates: Partial<SequenceStep>) => void;
  removeStep: (key: string) => void;
}

export function WaitStepCard({ step, updateStep, removeStep }: WaitStepCardProps) {
  return (
    <div className="relative p-4 bg-secondary/10 border border-border border-dashed rounded-xl flex items-center justify-between group">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
          <Clock className="w-4 h-4 text-secondary-foreground" />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-secondary-foreground text-sm">Wait for</span>
          <input
            type="number"
            min="1"
            value={step.delayDays || 1}
            onChange={(e) => updateStep(step._key, { delayDays: parseInt(e.target.value) || 1 })}
            className="w-16 h-8 px-2 text-center bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
          />
          <span className="font-medium text-secondary-foreground text-sm">days</span>
        </div>
      </div>

      <button
        onClick={() => removeStep(step._key)}
        className="w-8 h-8 flex items-center justify-center rounded-md text-secondary-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
        title="Remove Step"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
