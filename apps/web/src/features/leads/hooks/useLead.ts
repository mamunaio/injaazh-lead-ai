import { useState, useEffect } from 'react';
import { LeadsService } from '../../../lib/api/leads.service';
import {
  DetailedLead,
  LeadActivity,
  LeadTask,
  LeadCampaignHistory,
} from '../../../lib/api/leads.service';
import { TasksService } from '../../../lib/api/tasks.service';
import { toast } from 'sonner';

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
        setLead(data as unknown as DetailedLead); // Cast for now until detailed lead type is unified
        // Fetch actual tasks, activities, and campaigns
        const [realTasks, realActivities, realCampaigns] = await Promise.all([
          TasksService.getTasks({ leadId: id }),
          LeadsService.getActivities(id),
          LeadsService.getCampaigns(id)
        ]);

        if (!mounted) return;
        setActivities(realActivities);
        setCampaigns(realCampaigns);
        setTasks(realTasks as unknown as LeadTask[]);
      } catch (err: unknown) {
        if (mounted) setError(err as Error);
        toast.error('Failed to fetch lead details');
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

