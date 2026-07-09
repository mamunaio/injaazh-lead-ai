import { useState, useEffect } from 'react';
import { Lead, LeadStatus } from '../../../lib/api/leads.service';
import { LeadsService } from '../../../lib/api/leads.service';

import { toast } from 'sonner';

export function useLeads() {
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<LeadStatus | 'All'>('All');

  const [refetchTrigger, setRefetchTrigger] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchLeads = async () => {
      setLoading(true);
      try {
        const data = await LeadsService.getLeads({ search: searchQuery, status: selectedStatus });
        if (isMounted) {
          setLeads(data);
        }
      } catch (error) {
        console.error("Failed to fetch leads", error);
        toast.error("Failed to fetch leads");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchLeads();

    return () => {
      isMounted = false;
    };
  }, [searchQuery, selectedStatus, refetchTrigger]);

  const fetchLeads = () => setRefetchTrigger((prev) => prev + 1);

  const createLead = async (data: Partial<Lead>) => {
    try {
      const newLead = await LeadsService.createLead(data);
      setLeads((prev) => [newLead, ...prev]);
      toast.success("Lead created successfully");
      return newLead;
    } catch (error) {
      console.error("Failed to create lead", error);
      toast.error("Failed to create lead");
      throw error;
    }
  };

  const updateLead = async (id: string, data: Partial<Lead>) => {
    try {
      const updatedLead = await LeadsService.updateLead(id, data);
      setLeads((prev) => prev.map((l) => (l.id === id ? updatedLead : l)));
      toast.success("Lead updated successfully");
      return updatedLead;
    } catch (error) {
      console.error("Failed to update lead", error);
      toast.error("Failed to update lead");
      throw error;
    }
  };

  const deleteLead = async (id: string) => {
    try {
      await LeadsService.deleteLead(id);
      setLeads((prev) => prev.filter((l) => l.id !== id));
      toast.success("Lead deleted");
    } catch (error) {
      console.error("Failed to delete lead", error);
      toast.error("Failed to delete lead");
      throw error;
    }
  };

  return {
    leads,
    loading,
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    createLead,
    updateLead,
    deleteLead,
    fetchLeads,
  };
}
