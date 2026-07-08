import React from 'react';
import clsx from 'clsx';
import { CampaignStatus } from '../../../lib/api/campaigns.service';

type TabOption = 'All' | CampaignStatus;

interface CampaignTabsProps {
  activeTab: TabOption;
  onChange: (tab: TabOption) => void;
}

export function CampaignTabs({ activeTab, onChange }: CampaignTabsProps) {
  const tabs: TabOption[] = ['All', 'Active', 'Draft', 'Paused', 'Completed', 'Stopped'];

  return (
    <div className="flex items-center gap-6 border-b border-border mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={clsx(
            "pb-3 text-sm font-medium transition-colors relative",
            activeTab === tab 
              ? "text-foreground" 
              : "text-secondary-foreground hover:text-foreground"
          )}
        >
          {tab}
          {activeTab === tab && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full" />
          )}
        </button>
      ))}
    </div>
  );
}
