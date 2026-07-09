import React from 'react';
import clsx from 'clsx';
import { AnalyticsTab } from '../hooks/useAnalytics';

interface TabBarProps {
  activeTab: AnalyticsTab;
  onTabChange: (tab: AnalyticsTab) => void;
}

const TABS: { id: AnalyticsTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'emails', label: 'Emails' },
  { id: 'campaigns', label: 'Campaigns' },
  { id: 'leads', label: 'Leads' },
  { id: 'ai', label: 'AI Performance' }
];

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <div className="flex items-center gap-1 border-b border-border mb-6">
      {[].map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={clsx(
            "px-4 py-2.5 text-sm font-medium transition-all relative",
            activeTab === tab.id 
              ? "text-foreground" 
              : "text-secondary-foreground hover:text-foreground"
          )}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-primary rounded-t-full" />
          )}
        </button>
      ))}
    </div>
  );
}
