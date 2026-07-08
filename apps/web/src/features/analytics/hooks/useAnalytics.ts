import { useState } from 'react';

export type AnalyticsTab = 'overview' | 'emails' | 'campaigns' | 'leads' | 'ai';

export function useAnalytics() {
  const [activeTab, setActiveTab] = useState<AnalyticsTab>('overview');
  const [dateRange, setDateRange] = useState('7d');

  return {
    activeTab,
    setActiveTab,
    dateRange,
    setDateRange
  };
}
