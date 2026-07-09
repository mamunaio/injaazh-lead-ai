import { apiFetch } from '../api';

export type CampaignStatus = 'Active' | 'Draft' | 'Paused' | 'Completed' | 'Stopped';

// Matches the backend Campaign entity returned by GET /campaigns
export interface Campaign {
  id: string;
  organizationId: string;
  name: string;
  status: CampaignStatus;
  leadSegmentId: string | null;
  promptTemplateId: string | null;
  sequenceId: string | null;
  schedule: string | null;
  createdAt: string;
  updatedAt: string;
}

export const CampaignsService = {
  getCampaigns: async (): Promise<Campaign[]> => {
    return apiFetch<Campaign[]>('/campaigns');
  },

  getCampaign: async (id: string): Promise<Campaign> => {
    return apiFetch<Campaign>(`/campaigns/${id}`);
  },

  createCampaign: async (data: Partial<Campaign>): Promise<Campaign> => {
    return apiFetch<Campaign>('/campaigns', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateCampaign: async (id: string, data: Partial<Campaign>): Promise<Campaign> => {
    return apiFetch<Campaign>(`/campaigns/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  getSegments: async (): Promise<unknown[]> => {
    return apiFetch<unknown[]>('/campaigns/segments').catch(() => []);
  },

  getAccounts: async (): Promise<unknown[]> => {
    return apiFetch<unknown[]>('/campaigns/accounts').catch(() => []);
  },

  enrollLeads: async (campaignId: string, leadIds: string[]): Promise<{ enrolled: number }> => {
    return apiFetch<{ enrolled: number }>(`/campaigns/${campaignId}/enroll`, {
      method: 'POST',
      body: JSON.stringify({ leadIds }),
    });
  },

  deleteCampaign: async (id: string): Promise<void> => {
    return apiFetch<void>(`/campaigns/${id}`, {
      method: 'DELETE',
    });
  },

  updateStatus: async (id: string, status: CampaignStatus): Promise<Campaign> => {
    // Depending on the backend routes we can use specific endpoints or PATCH
    switch (status) {
      case 'Active':
        return apiFetch<Campaign>(`/campaigns/${id}/start`, { method: 'POST' });
      case 'Paused':
        return apiFetch<Campaign>(`/campaigns/${id}/pause`, { method: 'POST' });
      case 'Completed':
        return apiFetch<Campaign>(`/campaigns/${id}/stop`, { method: 'POST' });
      default:
        // Or default to updateCampaign if standard patch is supported
        return CampaignsService.updateCampaign(id, { status });
    }
  }
};
