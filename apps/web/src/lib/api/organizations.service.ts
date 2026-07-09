import { apiFetch } from '../api';

export interface Organization {
  id: string;
  name: string;
  domain?: string;
  logoUrl?: string;
  timezone?: string;
  ownerId: string;
  createdAt: string;
}

export const OrganizationsService = {
  getOrganization: async (id: string): Promise<Organization> => {
    return apiFetch<Organization>(`/organizations/${id}`);
  },

  updateOrganization: async (id: string, data: Partial<Organization>): Promise<Organization> => {
    return apiFetch<Organization>(`/organizations/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  },

  deleteOrganization: async (id: string): Promise<void> => {
    return apiFetch<void>(`/organizations/${id}`, {
      method: 'DELETE'
    });
  }
};
