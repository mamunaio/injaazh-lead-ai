import React from 'react';
import clsx from 'clsx';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: string;
  icon?: React.ReactNode;
}

export function MetricCard({ title, value, trend, icon }: MetricCardProps) {
  const isPositive = trend?.startsWith('+');
  const isNegative = trend?.startsWith('-');

  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-secondary-foreground">{title}</h3>
        {icon && <div className="text-primary">{icon}</div>}
      </div>
      
      <div className="flex items-end justify-between">
        <div className="text-2xl font-bold text-foreground">{value}</div>
        
        {trend && (
          <div className={clsx(
            "flex items-center text-xs font-medium px-1.5 py-0.5 rounded",
            isPositive && "text-green-500 bg-green-500/10",
            isNegative && "text-red-500 bg-red-500/10",
            !isPositive && !isNegative && "text-secondary-foreground bg-secondary/10"
          )}>
            {isPositive && <ArrowUpRight className="w-3 h-3 mr-0.5" />}
            {isNegative && <ArrowDownRight className="w-3 h-3 mr-0.5" />}
            {trend}
          </div>
        )}
      </div>
    </div>
  );
}
