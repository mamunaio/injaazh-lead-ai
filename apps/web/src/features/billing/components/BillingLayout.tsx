import React from 'react';
import { useBilling } from '../hooks/useBilling';
import { CurrentPlanCard } from './CurrentPlanCard';
import { Settings } from 'lucide-react';

export function BillingLayout() {
  const { billing } = useBilling();

  return (
    <div className="w-full h-full flex flex-col bg-background p-6 overflow-y-auto">
      <div className="max-w-5xl mx-auto w-full">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Billing & Subscription</h1>
            <p className="text-sm text-secondary-foreground mt-1">Manage your plan, billing details, and view current usage.</p>
          </div>
          
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground font-semibold rounded-md hover:bg-secondary/80 transition-colors">
            <Settings className="w-4 h-4" />
            Manage Billing
          </button>
        </div>

        <div className="flex flex-col gap-6">
          <CurrentPlanCard billing={billing} />
        </div>
      </div>
    </div>
  );
}
