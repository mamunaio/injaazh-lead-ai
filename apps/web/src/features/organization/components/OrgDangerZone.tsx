import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface OrgDangerZoneProps {
  onDeleteClick: () => void;
}

export function OrgDangerZone({ onDeleteClick }: OrgDangerZoneProps) {
  return (
    <div className="bg-card border border-red-500/50 rounded-xl p-6 shadow-sm mt-6">
      <div className="mb-6 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-red-500" />
        <h2 className="text-lg font-bold text-foreground">Danger Zone</h2>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-2xl">
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-1">Delete Organization</h3>
          <p className="text-sm text-secondary-foreground">
            Permanently delete your organization, all team members, leads, and associated data. This action cannot be undone.
          </p>
        </div>
        
        <button
          onClick={onDeleteClick}
          className="shrink-0 px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-400 font-semibold rounded-md transition-colors border border-red-500/20"
        >
          Delete Organization
        </button>
      </div>
    </div>
  );
}
