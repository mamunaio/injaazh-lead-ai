import { useState, useEffect } from 'react';
import { Lead, LeadStatus } from '../../../mocks/leads';
import { LeadsService, LeadsFilters } from '../../../lib/api/leads.service';

export function useLeads() {
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<LeadStatus | 'All'>('All');

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchLeads = async () => {
      try {
        const data = await LeadsService.getLeads({ search: searchQuery, status: selectedStatus });
        if (isMounted) {
          setLeads(data);
        }
      } catch (error) {
        console.error("Failed to fetch leads", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchLeads();

    return () => {
      isMounted = false;
    };
  }, [searchQuery, selectedStatus]);

  return {
    leads,
    loading,
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus
  };
}
