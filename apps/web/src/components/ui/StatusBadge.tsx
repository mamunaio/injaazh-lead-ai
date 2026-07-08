import React from 'react';
import clsx from 'clsx';

export function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { color: string; bg: string; dot: string }> = {
    // Lead Statuses
    New: { color: 'text-blue', bg: 'bg-blue-subtle', dot: 'bg-blue' },
    Contacted: { color: 'text-violet', bg: 'bg-violet-subtle', dot: 'bg-violet' },
    Qualified: { color: 'text-amber', bg: 'bg-amber-subtle', dot: 'bg-amber' },
    Won: { color: 'text-green', bg: 'bg-green-subtle', dot: 'bg-green' },
    Lost: { color: 'text-secondary-foreground', bg: 'bg-secondary', dot: 'bg-secondary-foreground' },
    
    // Campaign Statuses
    Active: { color: 'text-green', bg: 'bg-green-subtle', dot: 'bg-green' },
    Draft: { color: 'text-secondary-foreground', bg: 'bg-secondary', dot: 'bg-secondary-foreground' },
    Paused: { color: 'text-amber', bg: 'bg-amber-subtle', dot: 'bg-amber' },
    Completed: { color: 'text-blue', bg: 'bg-blue-subtle', dot: 'bg-blue' },
    Stopped: { color: 'text-secondary-foreground', bg: 'bg-secondary', dot: 'bg-secondary-foreground' },
  };

  const { color, bg, dot } = config[status] || config.New;

  return (
    <div className={clsx("inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-border/50", bg)}>
      <div className={clsx("w-1.5 h-1.5 rounded-full", dot)} />
      <span className={clsx("text-[0.75rem] font-medium", color)}>{status}</span>
    </div>
  );
}


