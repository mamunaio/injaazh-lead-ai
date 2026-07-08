import React from 'react';
import { Mail, Clock } from 'lucide-react';

interface AddStepControlsProps {
  onAddEmail: () => void;
  onAddWait: () => void;
}

export function AddStepControls({ onAddEmail, onAddWait }: AddStepControlsProps) {
  return (
    <div className="flex items-center gap-3 justify-center pt-4">
      <div className="h-px bg-border flex-1 max-w-[100px]" />
      
      <button
        onClick={onAddEmail}
        className="h-9 px-4 rounded-full border border-border bg-background hover:bg-secondary/50 transition-colors flex items-center gap-2 text-sm font-medium text-foreground"
      >
        <Mail className="w-4 h-4 text-primary" />
        Add Email Step
      </button>

      <button
        onClick={onAddWait}
        className="h-9 px-4 rounded-full border border-border bg-background hover:bg-secondary/50 transition-colors flex items-center gap-2 text-sm font-medium text-foreground"
      >
        <Clock className="w-4 h-4 text-secondary-foreground" />
        Add Wait Step
      </button>

      <div className="h-px bg-border flex-1 max-w-[100px]" />
    </div>
  );
}
