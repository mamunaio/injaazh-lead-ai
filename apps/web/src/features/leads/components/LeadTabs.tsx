import React from 'react';
import clsx from 'clsx';

export type TabValue = 'overview' | 'activity' | 'tasks';

interface LeadTabsProps {
  activeTab: TabValue;
  onChange: (tab: TabValue) => void;
}

export function LeadTabs({ activeTab, onChange }: LeadTabsProps) {
  const tabs: { value: TabValue; label: string }[] = [
    { value: 'overview', label: 'Overview' },
    { value: 'activity', label: 'Activity' },
    { value: 'tasks', label: 'Tasks' },
  ];

  return (
    <div className="flex items-center gap-6 border-b border-border mb-6">
      {tabs.map(tab => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={clsx(
            'pb-3 text-sm font-medium transition-colors border-b-2 -mb-[1px]',
            activeTab === tab.value 
              ? 'border-primary text-primary-foreground' 
              : 'border-transparent text-secondary-foreground hover:text-primary-foreground hover:border-border'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
