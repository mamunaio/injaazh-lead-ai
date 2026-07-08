import React from 'react';
import { useIntegrations } from '../hooks/useIntegrations';
import { IntegrationCard } from './IntegrationCard';
import { Integration } from '../../../mocks/integrations';

export function IntegrationsLayout() {
  const { integrations, actionInProgress, toggleConnection } = useIntegrations();

  const groupedIntegrations = integrations.reduce((acc, integration) => {
    if (!acc[integration.category]) acc[integration.category] = [];
    acc[integration.category].push(integration);
    return acc;
  }, {} as Record<string, Integration[]>);

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'data': return 'Data Enrichment';
      case 'communication': return 'Communication Channels';
      case 'automation': return 'Automation & Notifications';
      default: return 'Other Integrations';
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-background p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Integrations</h1>
          <p className="text-sm text-secondary-foreground mt-1">Connect your workspace with essential third-party tools.</p>
        </div>

        <div className="flex flex-col gap-10">
          {Object.entries(groupedIntegrations).map(([category, items]) => (
            <div key={category}>
              <h2 className="text-lg font-bold text-foreground mb-4">{getCategoryTitle(category)}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {items.map(integration => (
                  <IntegrationCard 
                    key={integration.id} 
                    integration={integration}
                    isActionInProgress={actionInProgress === integration.id}
                    onToggle={toggleConnection}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
