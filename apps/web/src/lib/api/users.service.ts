import { apiFetch } from './index';

export type UserRole = 'Owner' | 'Admin' | 'Member';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  organizationId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const UsersService = {
  getProfile: async (): Promise<User> => {
    return apiFetch<User>('/users/me');
  },

  getOrganizationUsers: async (orgId: string): Promise<User[]> => {
    return apiFetch<User[]>(`/users/organization/${orgId}`);
  },

  updateUser: async (id: string, data: Partial<User>): Promise<User> => {
    return apiFetch<User>(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  deleteUser: async (id: string): Promise<void> => {
    return apiFetch<void>(`/users/${id}`, {
      method: 'DELETE',
    });
  },
};
