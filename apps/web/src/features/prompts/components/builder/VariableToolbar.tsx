import React from 'react';
import { Variable } from 'lucide-react';

interface VariableToolbarProps {
  onInsert: (variable: string) => void;
}

const VARIABLES = [
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'company', label: 'Company' },
  { key: 'jobTitle', label: 'Job Title' },
];

export function VariableToolbar({ onInsert }: VariableToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border mt-3">
      <div className="flex items-center gap-1.5 text-secondary-foreground text-xs font-medium mr-2">
        <Variable className="w-3.5 h-3.5" />
        <span>Variables:</span>
      </div>
      {VARIABLES.map((v) => (
        <button
          key={v.key}
          type="button"
          onClick={() => onInsert(v.key)}
          className="px-2 py-1 rounded border border-border bg-secondary/20 hover:bg-secondary/40 text-xs font-medium text-foreground transition-colors"
        >
          {`{${v.key}}`}
        </button>
      ))}
    </div>
  );
}
