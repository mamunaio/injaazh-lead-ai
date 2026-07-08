"use client";

import React from 'react';
import { useAnalytics } from '../../../features/analytics/hooks/useAnalytics';
import { TabBar } from '../../../features/analytics/components/TabBar';
import { OverviewTab } from '../../../features/analytics/components/OverviewTab';
import { EmailsTab } from '../../../features/analytics/components/EmailsTab';
import { CampaignsTab } from '../../../features/analytics/components/CampaignsTab';
import { LeadsTab } from '../../../features/analytics/components/LeadsTab';
import { AITab } from '../../../features/analytics/components/AITab';

export default function AnalyticsPage() {
  const { activeTab, setActiveTab, dateRange, setDateRange } = useAnalytics();

  return (
    <div className="w-full h-full flex flex-col bg-background relative overflow-hidden">
      <div className="flex-none px-6 py-4 border-b border-border bg-card flex items-center justify-between shadow-sm z-10">
        <div>
          <h1 className="text-xl font-bold text-foreground">Analytics Overview</h1>
          <p className="text-sm text-secondary-foreground mt-0.5">Track your pipeline, campaigns, and AI performance.</p>
        </div>

        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="h-9 px-3 bg-secondary/10 border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
          <option value="year">This Year</option>
        </select>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[1200px] mx-auto">
          <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
          
          <div className="mt-4">
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'emails' && <EmailsTab />}
            {activeTab === 'campaigns' && <CampaignsTab />}
            {activeTab === 'leads' && <LeadsTab />}
            {activeTab === 'ai' && <AITab />}
          </div>
        </div>
      </div>
    </div>
  );
}
