import { useState, useEffect } from 'react';
import { Campaign, CampaignStatus, CampaignsService } from '../../../lib/api/campaigns.service';

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'All' | CampaignStatus>('All');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchCampaigns = async () => {
      try {
        const data = await CampaignsService.getCampaigns();
        if (mounted) {
          setCampaigns(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Failed to fetch campaigns', error);
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchCampaigns();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredCampaigns = campaigns.filter(
    (camp) => activeTab === 'All' || camp.status === activeTab
  );

  const updateCampaignStatus = async (id: string, status: CampaignStatus) => {
    setActionLoading(id);
    try {
      const updated = await CampaignsService.updateStatus(id, status);
      setCampaigns((prev) => 
        prev.map((c) => (c.id === id ? { ...c, status: updated.status } : c))
      );
    } catch (err) {
      console.error('Failed to update status', err);
    } finally {
      setActionLoading(null);
    }
  };

  const deleteCampaign = async (id: string) => {
    setActionLoading(id);
    try {
      await CampaignsService.deleteCampaign(id);
      setCampaigns((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error('Failed to delete campaign', err);
    } finally {
      setActionLoading(null);
    }
  };

  return {
    campaigns: filteredCampaigns,
    isLoading,
    activeTab,
    setActiveTab,
    updateCampaignStatus,
    deleteCampaign,
    actionLoading,
  };
}
