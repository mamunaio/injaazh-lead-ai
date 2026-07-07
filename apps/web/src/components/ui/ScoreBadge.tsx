import React from 'react';
import clsx from 'clsx';

export function ScoreBadge({ score }: { score: number }) {
  let colorClass = 'text-green border-green bg-green-subtle';
  
  if (score < 60) {
    colorClass = 'text-destructive border-destructive bg-destructive/10';
  } else if (score < 85) {
    colorClass = 'text-amber border-amber bg-amber-subtle';
  }

  return (
    <div className={clsx("inline-flex items-center justify-center w-8 h-8 rounded-full border text-[0.75rem] font-bold tabular-nums", colorClass)}>
      {score}
    </div>
  );
}
