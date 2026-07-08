import React from 'react';
import { ChartWidget } from './ChartWidget';
import { AI_PERFORMANCE } from '../../../mocks/analytics';

export function AITab() {
  return (
    <div className="flex flex-col gap-6">
      <ChartWidget title="AI Performance Metrics">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
          {AI_PERFORMANCE.map((item, i) => (
            <div key={i} className="flex flex-col justify-center items-center bg-secondary/10 border border-border rounded-lg p-6">
              <div className="text-secondary-foreground text-sm font-medium mb-2 uppercase tracking-wider">{item.metric}</div>
              <div className="text-3xl font-bold text-foreground text-primary">{item.value}</div>
            </div>
          ))}
        </div>
      </ChartWidget>
    </div>
  );
}
