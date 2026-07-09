import { apiFetch } from '../api';

export interface DashboardMetrics {
  totalLeads: number;
  importedToday: number;
  aiGenerated: number;
  emailsSent: number;
  openRate: number;
  replyRate: number;
  conversionRate: number;
}

export interface CampaignPerformance {
  id: string;
  name: string;
  status: string;
  stats: {
    totalLeads: number;
    activeLeads: number;
    completedLeads: number;
    failedLeads: number;
  };
}

export const AnalyticsService = {
  getDashboardMetrics: async (): Promise<DashboardMetrics> => {
    return apiFetch<DashboardMetrics>('/analytics/dashboard');
  },

  getCampaignsPerformance: async (): Promise<CampaignPerformance[]> => {
    return apiFetch<CampaignPerformance[]>('/analytics/campaigns');
  }
};
