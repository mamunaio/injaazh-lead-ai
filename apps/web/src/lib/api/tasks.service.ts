import { apiFetch } from '../api';

export type TaskStatus = 'Pending' | 'In Progress' | 'Completed' | 'Overdue';

export interface CrmTask {
  id: string;
  title: string;
  description?: string;
  type: 'Call' | 'Email' | 'Meeting' | 'To-do';
  dueDate: string;
  status: TaskStatus;
  leadId?: string;
  leadName?: string;
  assignedTo?: string;
  assignedName?: string;
  createdAt: string;
}

export const TasksService = {
  getTasks: async (filters?: { status?: string; type?: string; assignedTo?: string; leadId?: string }): Promise<CrmTask[]> => {
    const query = new URLSearchParams();
    if (filters?.status) query.append('status', filters.status);
    if (filters?.type) query.append('type', filters.type);
    if (filters?.assignedTo) query.append('assignedTo', filters.assignedTo);
    if (filters?.leadId) query.append('leadId', filters.leadId);
    
    return apiFetch<CrmTask[]>(`/tasks?${query.toString()}`);
  },

  createTask: async (data: Partial<CrmTask>): Promise<CrmTask> => {
    return apiFetch<CrmTask>('/tasks', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  updateTask: async (id: string, data: Partial<CrmTask>): Promise<CrmTask> => {
    return apiFetch<CrmTask>(`/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  },

  deleteTask: async (id: string): Promise<void> => {
    return apiFetch<void>(`/tasks/${id}`, {
      method: 'DELETE'
    });
  }
};
