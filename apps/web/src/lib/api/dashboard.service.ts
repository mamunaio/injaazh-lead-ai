import { apiFetch } from '../api';

export const DashboardService = {
  getRecentActivity: async (timeframe: 'today' | 'yesterday'): Promise<unknown[]> => {
    return apiFetch<unknown[]>(`/dashboard/activity?timeframe=${timeframe}`).catch(() => []);
  },

  getKpis: async (): Promise<unknown[]> => {
    return apiFetch<unknown[]>('/analytics/dashboard').catch(() => []);
  },

  getPipelineFunnel: async (): Promise<unknown[]> => {
    return apiFetch<unknown[]>('/dashboard/pipeline/funnel').catch(() => []);
  },

  getPipelineTopLeads: async (): Promise<unknown[]> => {
    return apiFetch<unknown[]>('/dashboard/pipeline/top-leads').catch(() => []);
  },

  getCampaignStats: async (): Promise<unknown> => {
    return apiFetch<unknown>('/analytics/campaigns').catch(() => null);
  },

  getCampaigns: async (): Promise<unknown[]> => {
    return apiFetch<unknown[]>('/dashboard/campaigns').catch(() => []);
  },

  getAiInsights: async (): Promise<unknown[]> => {
    return apiFetch<unknown[]>('/dashboard/ai-insights').catch(() => []);
  },

  getQuickActions: async (): Promise<unknown[]> => {
    return apiFetch<unknown[]>('/dashboard/quick-actions').catch(() => []);
  },

  getOnboardingTasks: async (): Promise<unknown[]> => {
    return apiFetch<unknown[]>('/dashboard/onboarding').catch(() => []);
  }
};
