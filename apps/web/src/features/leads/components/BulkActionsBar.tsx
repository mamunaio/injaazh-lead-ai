import React from 'react';
import { Trash2, UserPlus, Send, X } from 'lucide-react';

interface BulkActionsBarProps {
  selectedCount: number;
  onClear: () => void;
  onAssignCampaign?: () => void;
}

export function BulkActionsBar({ selectedCount, onClear, onAssignCampaign }: BulkActionsBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-card border border-border shadow-lg rounded-full px-4 py-3 flex items-center gap-4 animate-in slide-in-from-bottom-5 fade-in duration-200">
      <div className="flex items-center gap-2 pr-4 border-r border-border">
        <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[0.75rem] font-bold">
          {selectedCount}
        </div>
        <span className="text-[0.875rem] font-medium text-foreground">selected</span>
      </div>

      <div className="flex items-center gap-1">
        <button 
          onClick={onAssignCampaign}
          className="h-8 px-3 inline-flex items-center justify-center gap-2 hover:bg-accent text-secondary-foreground hover:text-foreground text-[0.8125rem] font-medium rounded-full transition-colors"
        >
          <UserPlus className="w-3.5 h-3.5" />
          Assign Campaign
        </button>
        <button className="h-8 px-3 inline-flex items-center justify-center gap-2 hover:bg-accent text-secondary-foreground hover:text-foreground text-[0.8125rem] font-medium rounded-full transition-colors">
          <Send className="w-3.5 h-3.5" />
          Update Status
        </button>
        <button className="h-8 px-3 inline-flex items-center justify-center gap-2 hover:bg-destructive/10 text-destructive text-[0.8125rem] font-medium rounded-full transition-colors">
          <Trash2 className="w-3.5 h-3.5" />
          Delete
        </button>
      </div>

      <div className="pl-2 border-l border-border">
        <button 
          onClick={onClear}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          title="Clear selection"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
