import React from 'react';
import clsx from 'clsx';

interface ProgressBarProps {
  completed: number;
  total: number;
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({ completed, total, className, showLabel = true }: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return (
    <div className={clsx("w-full flex flex-col gap-1.5", className)}>
      <div className="flex justify-between items-center text-xs font-medium">
        {showLabel && (
          <>
            <span className="text-secondary-foreground">
              {completed.toLocaleString()} / {total.toLocaleString()}
            </span>
            <span className="text-foreground">{percentage}%</span>
          </>
        )}
      </div>
      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-in-out" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
