import { apiFetch } from '../api';

export interface EmailThread {
  id: string;
  subject: string;
  leadName: string;
  leadCompany: string;
  snippet: string;
  timestamp: string;
  isUnread: boolean;
  status: 'active' | 'archived' | 'snoozed';
  messages: EmailMessage[];
}

export interface EmailMessage {
  id: string;
  sender: {
    name: string;
    email: string;
  };
  body: string;
  timestamp: string;
  isOutbound: boolean;
  status?: 'sent' | 'delivered' | 'opened' | 'clicked' | 'failed';
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  initials: string;
  color: string;
}

export const InboxService = {
  getThreads: async (): Promise<EmailThread[]> => {
    return apiFetch<EmailThread[]>('/inbox/threads').catch(() => []);
  },

  getTeamMembers: async (): Promise<TeamMember[]> => {
    return apiFetch<TeamMember[]>('/inbox/team').catch(() => []);
  },

  sendMessage: async (threadId: string, content: string): Promise<void> => {
    return apiFetch(`/inbox/threads/${threadId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ content })
    }).catch(() => {});
  }
};
