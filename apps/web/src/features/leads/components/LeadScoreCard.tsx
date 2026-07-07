import React from 'react';
import { DetailedLead } from '../../../mocks/lead-details';
import { ScoreBadge } from '../../../components/ui/ScoreBadge';
import { Sparkles, BrainCircuit } from 'lucide-react';

interface LeadScoreCardProps {
  lead: DetailedLead;
}

export function LeadScoreCard({ lead }: LeadScoreCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-primary" />
            AI Lead Score
          </h3>
          <div className="text-[0.75rem] text-secondary-foreground mt-1">
            Last scored: {new Date(lead.lastScoredAt).toLocaleString()}
          </div>
        </div>
        <div className="scale-125 origin-top-right">
          <ScoreBadge score={lead.score} />
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-secondary-foreground">Profile Fit</span>
            <span className="font-medium text-foreground">{lead.scoreBreakdown.fit}/100</span>
          </div>
          <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: `${lead.scoreBreakdown.fit}%` }} />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-secondary-foreground">Buying Intent</span>
            <span className="font-medium text-foreground">{lead.scoreBreakdown.intent}/100</span>
          </div>
          <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: `${lead.scoreBreakdown.intent}%` }} />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-secondary-foreground">Engagement</span>
            <span className="font-medium text-foreground">{lead.scoreBreakdown.engagement}/100</span>
          </div>
          <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: `${lead.scoreBreakdown.engagement}%` }} />
          </div>
        </div>
      </div>

      {lead.aiRecommendations.length > 0 && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <h4 className="text-sm font-medium text-primary-foreground flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            AI Recommendations
          </h4>
          <ul className="space-y-2 text-sm text-secondary-foreground list-disc list-inside">
            {lead.aiRecommendations.map((rec: string, idx: number) => (
              <li key={idx}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}


