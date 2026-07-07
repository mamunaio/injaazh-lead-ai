import React from 'react';
import { RefreshCw } from 'lucide-react';
import { KpiCards } from '../../../features/dashboard/components/KpiCards';
import { PerformanceChart } from '../../../features/dashboard/components/PerformanceChart';
import { AiInsightStrip } from '../../../features/dashboard/components/AiInsightStrip';
import { LeadPipeline } from '../../../features/dashboard/components/LeadPipeline';
import { CampaignSummary } from '../../../features/dashboard/components/CampaignSummary';
import { RecentActivity } from '../../../features/dashboard/components/RecentActivity';
import { QuickActions } from '../../../features/dashboard/components/QuickActions';

export default function DashboardPage() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });

  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 sm:p-5 md:p-6 lg:p-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[1.5rem] font-semibold text-primary-foreground leading-tight">Dashboard</h1>
          <p className="text-[0.875rem] text-secondary-foreground mt-1">Your workspace overview</p>
        </div>
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <span className="text-[0.875rem] text-secondary-foreground">{currentDate}</span>
          <button className="w-8 h-8 flex items-center justify-center text-tertiary hover:text-foreground hover:bg-accent rounded-md transition-colors border border-border sm:border-transparent sm:hover:border-border">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 12-Column Grid */}
      <div className="grid grid-cols-12 gap-4 sm:gap-5 md:gap-6">
        <KpiCards />
        
        {/* Row 2 */}
        <PerformanceChart />
        <AiInsightStrip />

        {/* Row 3 */}
        <LeadPipeline />
        <CampaignSummary />

        {/* Row 4 */}
        <RecentActivity />
        <QuickActions />
      </div>
    </div>
  );
}
