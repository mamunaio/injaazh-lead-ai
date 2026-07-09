import React from 'react';
import { ChartWidget } from './ChartWidget';
import { AnalyticsService } from '../../../lib/api/analytics.service';

export function CampaignsTab() {
  return (
    <div className="flex flex-col gap-6">
      <ChartWidget title="Campaign Comparison">
        <div className="overflow-x-auto w-full h-full">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-secondary-foreground uppercase bg-secondary/10 border-b border-border">
              <tr>
                <th className="px-4 py-3 font-medium">Campaign Name</th>
                <th className="px-4 py-3 font-medium">Sent</th>
                <th className="px-4 py-3 font-medium">Open Rate</th>
                <th className="px-4 py-3 font-medium">Reply Rate</th>
                <th className="px-4 py-3 font-medium">Conversion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-foreground">
              {[].map((campaign: unknown, i: number) => (
                <tr key={i} className="hover:bg-secondary/5 transition-colors">
                  <td className="px-4 py-4 font-medium">{campaign.name}</td>
                  <td className="px-4 py-4">{campaign.sent.toLocaleString()}</td>
                  <td className="px-4 py-4">{campaign.openRate}%</td>
                  <td className="px-4 py-4">{campaign.replyRate}%</td>
                  <td className="px-4 py-4 text-primary font-medium">{campaign.conversion}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartWidget>
    </div>
  );
}
