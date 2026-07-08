import React from 'react';
import { Integration } from '../../../mocks/integrations';
import { formatDistanceToNow } from 'date-fns';
import { CheckCircle2, XCircle, MapPin, Search, Briefcase, Mail, Inbox, Hash, Webhook } from 'lucide-react';
import clsx from 'clsx';

interface IntegrationCardProps {
  integration: Integration;
  isActionInProgress: boolean;
  onToggle: (id: string) => void;
}

const getIcon = (id: string) => {
  switch (id) {
    case 'google-maps': return <MapPin className="w-8 h-8 text-blue-500" />;
    case 'apollo': return <Search className="w-8 h-8 text-yellow-500" />;
    case 'linkedin': return <Briefcase className="w-8 h-8 text-blue-700" />;
    case 'gmail': return <Mail className="w-8 h-8 text-red-500" />;
    case 'outlook': return <Inbox className="w-8 h-8 text-blue-600" />;
    case 'slack': return <Hash className="w-8 h-8 text-purple-600" />;
    case 'webhooks': return <Webhook className="w-8 h-8 text-secondary-foreground" />;
    default: return <div className="w-8 h-8 bg-secondary/20 rounded-md" />;
  }
};

export function IntegrationCard({ integration, isActionInProgress, onToggle }: IntegrationCardProps) {
  const isConnected = integration.status === 'connected';

  return (
    <div className="bg-card border border-border rounded-xl p-6 flex flex-col h-full shadow-sm hover:border-primary/30 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-secondary/5 rounded-lg border border-border">
          {getIcon(integration.id)}
        </div>
        <div className={clsx(
          "px-2.5 py-1 text-xs font-semibold rounded-full flex items-center gap-1.5",
          isConnected ? "bg-green-500/10 text-green-500" : "bg-secondary/10 text-secondary-foreground"
        )}>
          {isConnected ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
          {isConnected ? 'Connected' : 'Not Connected'}
        </div>
      </div>

      <div className="mb-6 flex-1">
        <h3 className="text-lg font-bold text-foreground">{integration.name}</h3>
        <p className="text-sm text-secondary-foreground mt-1.5">{integration.description}</p>
        
        {isConnected && integration.connectedAt && (
          <p className="text-xs text-secondary-foreground/60 mt-3">
            Connected {formatDistanceToNow(new Date(integration.connectedAt))} ago
          </p>
        )}
      </div>

      <button
        onClick={() => onToggle(integration.id)}
        disabled={isActionInProgress}
        className={clsx(
          "w-full py-2.5 px-4 text-sm font-semibold rounded-md transition-colors",
          isActionInProgress
            ? "bg-secondary/20 text-secondary-foreground/50 cursor-not-allowed"
            : isConnected
              ? "bg-secondary/10 text-secondary-foreground hover:bg-red-500/10 hover:text-red-500"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
        )}
      >
        {isActionInProgress ? 'Please wait...' : isConnected ? 'Disconnect' : 'Connect'}
      </button>
    </div>
  );
}
