import { useState } from 'react';
import { MOCK_INTEGRATIONS, Integration } from '../../../mocks/integrations';

export function useIntegrations() {
  const [integrations, setIntegrations] = useState<Integration[]>(MOCK_INTEGRATIONS);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);

  const toggleConnection = (id: string) => {
    setActionInProgress(id);
    
    // Simulate API call
    setTimeout(() => {
      setIntegrations(prev => prev.map(integration => {
        if (integration.id === id) {
          const isConnected = integration.status === 'connected';
          return {
            ...integration,
            status: isConnected ? 'disconnected' : 'connected',
            connectedAt: isConnected ? undefined : new Date().toISOString()
          };
        }
        return integration;
      }));
      setActionInProgress(null);
    }, 1000);
  };

  return {
    integrations,
    actionInProgress,
    toggleConnection
  };
}
