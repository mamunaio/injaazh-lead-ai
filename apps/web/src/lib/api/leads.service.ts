import { apiFetch } from '../api';

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Won' | 'Lost';

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  status: LeadStatus;
  score: number;
  tags: string[];
  campaign: string | null;
  createdAt: string;
}

export interface DetailedLead extends Lead {
  phone?: string;
  website?: string;
  linkedin?: string;
  jobTitle?: string;
  location?: string;
  scoreBreakdown?: {
    fit: number;
    intent: number;
    engagement: number;
  };
  lastScoredAt?: string;
  aiRecommendations?: string[];
  aiOutreach?: {
    subject: string;
    body: string;
    confidenceScore: number;
    generatedAt: string;
    status: 'draft' | 'sent' | 'failed';
  };
}

export interface LeadActivity {
  id: string;
  type: 'email' | 'note' | 'status_change' | 'task_created';
  title: string;
  description: string;
  timestamp: string;
  author: {
    name: string;
    avatar?: string;
  };
}

export interface LeadTask {
  id: string;
  title: string;
  dueDate: string;
  status: 'pending' | 'completed';
  assignee: string;
}

export interface LeadCampaignHistory {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'paused';
  joinedAt: string;
}

export interface LeadsFilters {
  status: LeadStatus | 'All';
  search: string;
}

export const LeadsService = {
  getLeads: async (filters: LeadsFilters): Promise<Lead[]> => {
    let url = '/leads';
    const params = new URLSearchParams();
    if (filters.status !== 'All') {
      params.append('status', filters.status);
    }
    if (filters.search) {
      params.append('search', filters.search);
    }
    
    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }

    return apiFetch<Lead[]>(url);
  },

  getLead: async (id: string): Promise<Lead> => {
    return apiFetch<Lead>(`/leads/${id}`);
  },

  createLead: async (data: Partial<Lead>): Promise<Lead> => {
    return apiFetch<Lead>('/leads', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateLead: async (id: string, data: Partial<Lead>): Promise<Lead> => {
    return apiFetch<Lead>(`/leads/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  deleteLead: async (id: string): Promise<void> => {
    return apiFetch<void>(`/leads/${id}`, {
      method: 'DELETE',
    });
  },
  
  getActivities: async (id: string): Promise<LeadActivity[]> => {
    return apiFetch<LeadActivity[]>(`/timeline?leadId=${id}`).catch(() => []);
  },

  getCampaigns: async (id: string): Promise<LeadCampaignHistory[]> => {
    return apiFetch<LeadCampaignHistory[]>(`/leads/${id}/campaigns`).catch(() => []);
  }
};
