import { useState, useEffect } from 'react';
import {
  DetailedLead,
  LeadActivity,
  LeadTask,
  LeadCampaignHistory,
  LEAD_DETAILS_MOCK,
  LEAD_ACTIVITIES_MOCK,
  LEAD_TASKS_MOCK,
  LEAD_CAMPAIGNS_MOCK,
} from '../../../mocks/lead-details';

export function useLead(id: string) {
  const [lead, setLead] = useState<DetailedLead | null>(null);
  const [activities, setActivities] = useState<LeadActivity[]>([]);
  const [tasks, setTasks] = useState<LeadTask[]>([]);
  const [campaigns, setCampaigns] = useState<LeadCampaignHistory[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    // Simulate API call
    setTimeout(() => {
      if (!mounted) return;
      
      // Simulate not found
      if (id !== 'lead_001' && id !== '1') {
        setError(new Error('Lead not found'));
        setIsLoading(false);
        return;
      }

      setLead(LEAD_DETAILS_MOCK);
      setActivities(LEAD_ACTIVITIES_MOCK);
      setTasks(LEAD_TASKS_MOCK);
      setCampaigns(LEAD_CAMPAIGNS_MOCK);
      setIsLoading(false);
    }, 800);

    return () => {
      mounted = false;
    };
  }, [id]);

  return {
    lead,
    activities,
    tasks,
    campaigns,
    isLoading,
    error,
  };
}

