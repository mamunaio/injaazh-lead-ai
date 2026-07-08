import { useState, useEffect } from 'react';
import { LeadsService } from '../../../lib/api/leads.service';
import {
  DetailedLead,
  LeadActivity,
  LeadTask,
  LeadCampaignHistory,
} from '../../../lib/api/leads.service';
import {
  LEAD_ACTIVITIES_MOCK,
  LEAD_CAMPAIGNS_MOCK,
} from '../../../mocks/lead-details';
import { TasksService } from '../../../lib/api/tasks.service';

export function useLead(id: string) {
  const [lead, setLead] = useState<DetailedLead | null>(null);
  const [activities, setActivities] = useState<LeadActivity[]>([]);
  const [tasks, setTasks] = useState<LeadTask[]>([]);
  const [campaigns, setCampaigns] = useState<LeadCampaignHistory[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchLead = async () => {
      try {
        const data = await LeadsService.getLead(id);
        if (!mounted) return;
        setLead(data as any); // Cast for now until detailed lead type is unified
        // Keep mock data for activities and campaigns since no backend APIs yet
        setActivities(LEAD_ACTIVITIES_MOCK);
        setCampaigns(LEAD_CAMPAIGNS_MOCK);
        
        // Fetch actual tasks
        const realTasks = await TasksService.getTasks({ leadId: id });
        setTasks(realTasks as any);
      } catch (err: any) {
        if (mounted) setError(err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    fetchLead();

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

