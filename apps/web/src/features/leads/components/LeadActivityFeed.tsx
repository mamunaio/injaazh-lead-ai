import React from 'react';
import { LeadActivity } from '../../../lib/api/leads.service';
import { Mail, FileText, CheckCircle2, Clock } from 'lucide-react';
import clsx from 'clsx';

interface LeadActivityFeedProps {
  activities: LeadActivity[];
}

export function LeadActivityFeed({ activities }: LeadActivityFeedProps) {
  if (activities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-secondary-foreground border border-dashed border-border rounded-xl">
        <Clock className="w-8 h-8 mb-3 opacity-50" />
        <p className="text-sm">No activity on this lead yet.</p>
      </div>
    );
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="w-4 h-4 text-violet-500" />;
      case 'note':
        return <FileText className="w-4 h-4 text-blue-500" />;
      case 'status_change':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      default:
        return <Clock className="w-4 h-4 text-secondary-foreground" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case 'email':
        return 'bg-violet-500/10';
      case 'note':
        return 'bg-blue-500/10';
      case 'status_change':
        return 'bg-green-500/10';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-6">Activity Timeline</h3>
      <div className="relative pl-4 border-l border-border space-y-8">
        {activities.map((activity) => (
          <div key={activity.id} className="relative">
            <div className={clsx(
              "absolute -left-[33px] top-0 w-8 h-8 rounded-full flex items-center justify-center border-4 border-card",
              getIconBg(activity.type)
            )}>
              {getIcon(activity.type)}
            </div>
            <div className="ml-2">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium text-foreground">{activity.title}</h4>
                <span className="text-[0.75rem] text-secondary-foreground">
                  {new Date(activity.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-secondary-foreground mb-2">
                {activity.description}
              </p>
              <div className="flex items-center gap-2">
                {activity.author.avatar ? (
                  <img src={activity.author.avatar} alt={activity.author.name} className="w-5 h-5 rounded-full" loading="lazy" />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-[0.625rem] font-bold">
                    {activity.author.name.charAt(0)}
                  </div>
                )}
                <span className="text-[0.75rem] font-medium text-foreground">{activity.author.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


