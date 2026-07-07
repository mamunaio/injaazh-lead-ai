"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLead } from '../../../../features/leads/hooks/useLead';
import { LeadProfileHeader } from '../../../../features/leads/components/LeadProfileHeader';
import { LeadTabs, TabValue } from '../../../../features/leads/components/LeadTabs';
import { LeadContactCard } from '../../../../features/leads/components/LeadContactCard';
import { LeadCampaignHistoryCard } from '../../../../features/leads/components/LeadCampaignHistoryCard';
import { LeadScoreCard } from '../../../../features/leads/components/LeadScoreCard';
import { LeadQuickActions } from '../../../../features/leads/components/LeadQuickActions';
import { LeadTagsCard } from '../../../../features/leads/components/LeadTagsCard';
import { LeadActivityFeed } from '../../../../features/leads/components/LeadActivityFeed';
import { LeadTasksTable } from '../../../../features/leads/components/LeadTasksTable';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LeadDetailsPage() {
  const params = useParams();
  const leadId = Array.isArray(params.id) ? params.id[0] : params.id;
  
  const { lead, activities, tasks, campaigns, isLoading, error } = useLead(leadId || '');
  const [activeTab, setActiveTab] = useState<TabValue>('overview');

  if (isLoading) {
    return (
      <div className="w-full max-w-[1600px] mx-auto animate-pulse">
        <div className="h-[120px] bg-secondary/50 rounded-xl mb-8"></div>
        <div className="h-12 bg-secondary/50 rounded-xl mb-8 w-1/3"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-6">
            <div className="h-[300px] bg-secondary/50 rounded-xl"></div>
            <div className="h-[200px] bg-secondary/50 rounded-xl"></div>
          </div>
          <div className="lg:col-span-5 space-y-6">
            <div className="h-[400px] bg-secondary/50 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h2 className="text-xl font-bold text-foreground mb-2">Lead Not Found</h2>
        <p className="text-secondary-foreground mb-6">This lead doesn&apos;t exist or has been deleted.</p>
        <Link 
          href="/leads"
          className="flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Leads
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto">
      <LeadProfileHeader 
        lead={lead} 
        onEdit={() => {}} 
        onDelete={() => {}} 
      />
      
      <LeadTabs activeTab={activeTab} onChange={setActiveTab} />
      
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-6">
            <LeadContactCard lead={lead} />
            <LeadCampaignHistoryCard campaigns={campaigns} />
          </div>
          <div className="lg:col-span-5 space-y-6">
            <LeadScoreCard lead={lead} />
            <LeadQuickActions />
            <LeadTagsCard tags={lead.tags} />
          </div>
        </div>
      )}

      {activeTab === 'activity' && (
        <LeadActivityFeed activities={activities} />
      )}

      {activeTab === 'tasks' && (
        <LeadTasksTable tasks={tasks} />
      )}
    </div>
  );
}
