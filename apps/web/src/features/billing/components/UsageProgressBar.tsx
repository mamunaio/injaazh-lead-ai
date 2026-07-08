import React from 'react';
import { UsageMetric } from '../../../mocks/billing';
import clsx from 'clsx';

interface UsageProgressBarProps {
  metric: UsageMetric;
}

export function UsageProgressBar({ metric }: UsageProgressBarProps) {
  const percentage = Math.min(100, Math.round((metric.current / metric.limit) * 100));
  
  let colorClass = "bg-primary";
  if (percentage >= 90) colorClass = "bg-red-500";
  else if (percentage >= 80) colorClass = "bg-yellow-500";

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">{metric.name}</span>
        <span className="text-secondary-foreground font-mono text-xs">
          {metric.current.toLocaleString()} / {metric.limit.toLocaleString()}
          <span className="ml-2 font-semibold text-foreground w-10 inline-block text-right">{percentage}%</span>
        </span>
      </div>
      <div className="w-full h-2.5 bg-secondary/20 rounded-full overflow-hidden">
        <div 
          className={clsx("h-full rounded-full transition-all duration-500", colorClass)} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
