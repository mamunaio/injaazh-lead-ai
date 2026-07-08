import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { AI_INSIGHTS_MOCK_DATA } from '../../../mocks/dashboard';

export function AiInsightStrip() {
  return (
    <div className="col-span-12 lg:col-span-4 bg-card border border-border rounded-xl p-6 h-[280px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-violet" />
          <h2 className="text-[0.6875rem] font-semibold uppercase text-secondary-foreground tracking-[0.05em]">
            AI Insights
          </h2>
        </div>
        <span className="text-[0.6875rem] text-muted-foreground">↻ 12m ago</span>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col no-scrollbar">
        {AI_INSIGHTS_MOCK_DATA.map((item, i) => (
          <div key={item.id}>
            {i !== 0 && <div className="h-px w-full bg-border my-3" />}
            <div className="flex justify-between items-start mb-1.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-sm bg-accent flex items-center justify-center text-xs font-medium text-foreground">
                  {item.initials}
                </div>
                <div>
                  <span className="text-[0.8125rem] font-medium text-foreground">{item.name}</span>
                  <span className="text-[0.8125rem] text-secondary-foreground ml-1">· {item.company}</span>
                </div>
              </div>
              <div className="w-6 h-6 rounded-full border border-green text-green bg-green-subtle flex items-center justify-center text-[0.6875rem] font-bold">
                {item.score}
              </div>
            </div>
            <div className="pl-9 pr-2">
              <div className="text-[0.75rem] text-secondary-foreground italic truncate">
                "{item.insight}"
              </div>
              <button className="text-[0.75rem] text-primary flex items-center gap-1 mt-1 hover:underline">
                <ArrowRight className="w-3 h-3" /> {item.action}
              </button>
            </div>
          </div>
        ))}

        <div className="h-px w-full bg-border my-3" />
        <div className="text-[0.8125rem] text-secondary-foreground mb-2">
          + 4 leads in enrichment queue
        </div>
        <button className="w-full h-8 bg-secondary hover:bg-accent text-foreground text-[0.8125rem] font-medium rounded-md transition-colors border border-border">
          Run Audit for All
        </button>
      </div>
    </div>
  );
}
