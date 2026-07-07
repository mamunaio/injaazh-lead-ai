import { Lead, LeadStatus, LEADS_MOCK_DATA } from '../../mocks/leads';

export interface LeadsFilters {
  status: LeadStatus | 'All';
  search: string;
}

export const LeadsService = {
  getLeads: async (filters: LeadsFilters): Promise<Lead[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...LEADS_MOCK_DATA];
        
        if (filters.status !== 'All') {
          filtered = filtered.filter(l => l.status === filters.status);
        }
        
        if (filters.search) {
          const q = filters.search.toLowerCase();
          filtered = filtered.filter(l => 
            l.firstName.toLowerCase().includes(q) || 
            l.lastName.toLowerCase().includes(q) || 
            l.email.toLowerCase().includes(q) || 
            l.company.toLowerCase().includes(q)
          );
        }

        resolve(filtered);
      }, 400); // Simulate network latency
    });
  }
};
