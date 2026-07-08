import React from 'react';
import { PromptVersion } from '../../../../mocks/prompt-history';
import { History, Clock, ArrowLeft } from 'lucide-react';
import clsx from 'clsx';

interface VersionHistorySidebarProps {
  history: PromptVersion[];
  activeVersionId: string | null;
  onRevert: (id: string) => void;
}

export function VersionHistorySidebar({ history, activeVersionId, onRevert }: VersionHistorySidebarProps) {
  return (
    <div className="flex flex-col h-full bg-card border border-border rounded-xl shadow-sm overflow-hidden w-64 shrink-0">
      <div className="px-4 py-3 border-b border-border bg-secondary/5 flex items-center gap-2">
        <History className="w-4 h-4 text-secondary-foreground" />
        <h3 className="font-semibold text-foreground text-sm">Version History</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1">
        {history.map((v, i) => {
          const isActive = v.id === activeVersionId;
          const date = new Date(v.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
          
          return (
            <div
              key={v.id}
              className={clsx(
                "p-3 rounded-lg border flex flex-col gap-2 transition-colors",
                isActive ? "bg-primary/5 border-primary/20" : "bg-transparent border-transparent hover:bg-secondary/10"
              )}
            >
              <div className="flex items-center justify-between">
                <span className={clsx("font-semibold text-sm", isActive ? "text-primary" : "text-foreground")}>
                  v{v.version} {i === 0 && "(Latest)"}
                </span>
                {isActive ? (
                  <span className="text-[10px] uppercase font-bold text-primary tracking-wider bg-primary/10 px-1.5 py-0.5 rounded">Active</span>
                ) : (
                  <button
                    onClick={() => onRevert(v.id)}
                    className="flex items-center gap-1 text-xs text-secondary-foreground hover:text-primary transition-colors"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    Restore
                  </button>
                )}
              </div>
              
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5 text-xs text-secondary-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{date}</span>
                </div>
                <div className="text-xs text-secondary-foreground pl-4.5">
                  by {v.updatedBy}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
