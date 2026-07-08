import React from 'react';
import { WorkflowNodeInstance } from '../../types';
import * as Icons from 'lucide-react';
import clsx from 'clsx';

interface WorkflowNodeCardProps {
  node: WorkflowNodeInstance;
  isSelected: boolean;
  onClick: () => void;
  onRemove: () => void;
}

export function WorkflowNodeCard({ node, isSelected, onClick, onRemove }: WorkflowNodeCardProps) {
  const Icon = ((Icons as unknown as Record<string, React.ElementType>)[node.icon] || Icons.Circle) as React.ElementType;

  const getTypeColor = () => {
    switch (node.type) {
      case 'TRIGGER': return 'text-purple-400 bg-purple-400/10 border-purple-400/30';
      case 'ACTION': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'AI': return 'text-primary bg-primary/10 border-primary/30';
      case 'WAIT': return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
      default: return 'text-secondary-foreground bg-secondary/10 border-border';
    }
  };

  return (
    <div
      onClick={onClick}
      className={clsx(
        "group relative flex items-center gap-4 w-[350px] p-4 rounded-xl border bg-card transition-all cursor-pointer hover:shadow-lg",
        isSelected ? "border-primary ring-1 ring-primary" : "border-border hover:border-primary/50"
      )}
    >
      <div className={clsx("flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center border", getTypeColor())}>
        <Icon className="w-5 h-5" />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-foreground truncate">{node.title}</h4>
        <p className="text-xs text-secondary-foreground truncate mt-0.5">{node.description}</p>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-destructive/10 rounded-md text-secondary-foreground hover:text-destructive transition-all"
        title="Remove Step"
      >
        <Icons.Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
