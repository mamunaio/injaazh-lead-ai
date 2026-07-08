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
};
