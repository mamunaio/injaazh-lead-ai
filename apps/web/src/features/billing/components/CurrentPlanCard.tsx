import React from 'react';
import { BillingData } from '../../../mocks/billing';
import { UsageProgressBar } from './UsageProgressBar';
import { AlertTriangle, Zap } from 'lucide-react';

interface CurrentPlanCardProps {
  billing: BillingData;
}

export function CurrentPlanCard({ billing }: CurrentPlanCardProps) {
  const isCloseToLimit = Object.values(billing.usage).some(
    metric => (metric.current / metric.limit) >= 0.8
  );

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border bg-secondary/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-medium text-secondary-foreground uppercase tracking-wider mb-1">Current Plan</h2>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-black text-foreground">{billing.planName}</span>
            {billing.planName === 'FREE' && (
              <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                Active
              </span>
            )}
          </div>
        </div>
        
        <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-md hover:bg-primary/90 transition-colors shadow-sm">
          <Zap className="w-4 h-4 fill-current" />
          Upgrade Plan
        </button>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-foreground mb-6">Usage this month</h3>
        
        {isCloseToLimit && (
          <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-start gap-3 text-yellow-500">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="text-sm">
              <strong className="font-bold">Usage Warning:</strong> You are approaching the limit for one or more metrics on your current plan. Upgrade to avoid interruption.
            </div>
          </div>
        )}

        <div className="flex flex-col gap-5">
          {Object.values(billing.usage).map((metric) => (
            <UsageProgressBar key={metric.name} metric={metric} />
          ))}
        </div>
      </div>
    </div>
  );
}
