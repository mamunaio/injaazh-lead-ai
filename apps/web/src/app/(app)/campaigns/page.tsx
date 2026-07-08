"use client";

import React from 'react';
import { PageHeader } from '../../../components/ui/PageHeader';
import { useCampaigns } from '../../../features/campaigns/hooks/useCampaigns';
import { CampaignTabs } from '../../../features/campaigns/components/CampaignTabs';
import { CampaignsTable } from '../../../features/campaigns/components/CampaignsTable';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function CampaignListPage() {
  const { campaigns, isLoading, activeTab, setActiveTab, updateCampaignStatus, deleteCampaign, actionLoading } = useCampaigns();

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <PageHeader 
          title="Campaigns" 
          breadcrumbs={[{ label: 'Campaigns' }]} 
        />
        <Link
          href="/campaigns/new"
          className="h-10 px-4 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Campaign
        </Link>
      </div>

      <div className="flex-1 bg-background">
        <CampaignTabs activeTab={activeTab} onChange={setActiveTab} />
        
        {isLoading ? (
          <div className="w-full flex flex-col gap-4 animate-pulse">
            <div className="h-12 bg-secondary/50 rounded-lg w-full"></div>
            <div className="h-16 bg-secondary/50 rounded-lg w-full"></div>
            <div className="h-16 bg-secondary/50 rounded-lg w-full"></div>
            <div className="h-16 bg-secondary/50 rounded-lg w-full"></div>
          </div>
        ) : (
          <CampaignsTable 
            campaigns={campaigns} 
            onStatusChange={updateCampaignStatus} 
            onDelete={async (id) => {
              if (window.confirm('Are you sure you want to delete this campaign?')) {
                await deleteCampaign(id);
              }
            }}
            actionLoading={actionLoading} 
          />
        )}
      </div>
    </div>
  );
}
