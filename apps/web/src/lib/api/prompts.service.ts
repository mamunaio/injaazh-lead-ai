import { apiFetch } from '../api';

export interface PromptTemplate {
  id: string;
  name: string;
  description?: string;
  type?: string;
  organizationId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const PromptsService = {
  getTemplates: async (): Promise<PromptTemplate[]> => {
    return apiFetch<PromptTemplate[]>('/prompts/templates');
  },

  getTemplate: async (id: string): Promise<PromptTemplate> => {
    return apiFetch<PromptTemplate>(`/prompts/templates/${id}`);
  },

  getHistory: async (templateId: string): Promise<unknown[]> => {
    // Missing API
    return apiFetch<unknown[]>(`/prompts/history/${templateId}`).catch(() => []);
  },

  getTestLeads: async (): Promise<unknown[]> => {
    // Missing API - fallback to actual leads or empty
    return apiFetch<unknown[]>('/prompts/test-leads').catch(() => []);
  },

  saveTemplate: async (data: unknown): Promise<void> => {
    return apiFetch('/prompts/templates', {
      method: 'POST',
      body: JSON.stringify(data),
    }).catch(() => {});
  },

  testPrompt: async (content: string, leadId: string): Promise<string> => {
    // Missing API
    return apiFetch<unknown>('/prompts/test', {
      method: 'POST',
      body: JSON.stringify({ content, leadId }),
    }).then(res => res.result).catch(() => 'Backend test API missing.');
  }
};
