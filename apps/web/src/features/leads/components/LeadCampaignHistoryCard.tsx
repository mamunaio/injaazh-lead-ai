import React from 'react';
import { LeadCampaignHistory } from '../../../lib/api/leads.service';
import clsx from 'clsx';
import { Megaphone, Calendar } from 'lucide-react';

interface LeadCampaignHistoryCardProps {
  campaigns: LeadCampaignHistory[];
}

export function LeadCampaignHistoryCard({ campaigns }: LeadCampaignHistoryCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">Campaign History</h3>
      
      {campaigns.length === 0 ? (
        <div className="text-sm text-secondary-foreground">
          This lead has not been added to any campaigns.
        </div>
      ) : (
        <div className="space-y-4">
          {campaigns.map(campaign => (
            <div key={campaign.id} className="flex items-start justify-between border-b border-border pb-4 last:border-0 last:pb-0">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                  <Megaphone className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground">{campaign.name}</h4>
                  <div className="flex items-center gap-1 text-[0.75rem] text-secondary-foreground mt-1">
                    <Calendar className="w-3 h-3" />
                    <span>Joined: {new Date(campaign.joinedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div>
                <span className={clsx(
                  "text-[0.625rem] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider",
                  campaign.status === 'active' ? "bg-green-500/10 text-green-500" :
                  campaign.status === 'completed' ? "bg-secondary text-secondary-foreground" :
                  "bg-yellow-500/10 text-yellow-500"
                )}>
                  {campaign.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

