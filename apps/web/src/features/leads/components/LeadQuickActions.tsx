import React from 'react';
import { Mail, MonitorSpeaker, ChevronRight } from 'lucide-react';

export function LeadQuickActions() {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <button className="w-full flex items-center justify-between p-3 rounded-lg border border-border bg-background hover:bg-secondary transition-colors group">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-violet-500/10 flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4 text-violet-500" />
            </div>
            <span className="text-sm font-medium text-foreground">Generate Email</span>
          </div>
          <ChevronRight className="w-4 h-4 text-secondary-foreground group-hover:text-foreground transition-colors" />
        </button>
        <button className="w-full flex items-center justify-between p-3 rounded-lg border border-border bg-background hover:bg-secondary transition-colors group">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-blue-500/10 flex items-center justify-center shrink-0">
              <MonitorSpeaker className="w-4 h-4 text-blue-500" />
            </div>
            <span className="text-sm font-medium text-foreground">Run Website Audit</span>
          </div>
          <ChevronRight className="w-4 h-4 text-secondary-foreground group-hover:text-foreground transition-colors" />
        </button>
      </div>
    </div>
  );
}
