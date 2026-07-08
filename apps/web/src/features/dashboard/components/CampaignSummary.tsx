import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { CAMPAIGN_STATS_MOCK_DATA, CAMPAIGNS_MOCK_DATA } from '../../../mocks/dashboard';

export function CampaignSummary() {
  return (
    <div className="col-span-12 lg:col-span-6 bg-card border border-border rounded-xl p-6 h-[320px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[0.75rem] font-semibold uppercase text-secondary-foreground tracking-[0.05em]">
          Campaigns
        </h2>
        <Link href="/campaigns" className="text-[0.75rem] text-primary flex items-center gap-1 hover:underline">
          View All <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex gap-2 mb-4 pb-4 border-b border-border overflow-x-auto no-scrollbar">
          {CAMPAIGN_STATS_MOCK_DATA.map(s => (
            <div key={s.label} className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${s.bg}`}>
              <span className={`text-[0.625rem] font-bold ${s.color}`}>{s.icon}</span>
              <span className={`text-[0.75rem] font-semibold ${s.color}`}>{s.count} {s.label}</span>
            </div>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar pr-1 flex flex-col gap-4">
          {CAMPAIGNS_MOCK_DATA.map((camp, i) => (
            <Link key={camp.id} href={`/campaigns/${camp.id}`} className="group block rounded-md hover:bg-accent -mx-2 px-2 py-1 transition-colors">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <h3 className="text-[0.9375rem] font-semibold text-foreground group-hover:text-primary transition-colors">{camp.name}</h3>
                  <div className="text-[0.8125rem] text-secondary-foreground">
                    Sequence: {camp.sequence} · {camp.audience} ({camp.total})
                  </div>
                </div>
                <div className={`flex items-center gap-1.5 text-[0.75rem] font-semibold ${camp.statusColor}`}>
                  ● {camp.status}
                </div>
              </div>

              <div className="flex items-center gap-3 my-2">
                <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-[width] duration-500 ease-out" style={{ width: `${(camp.completed / camp.total) * 100}%` }} />
                </div>
                <div className="text-[0.75rem] text-secondary-foreground font-mono w-14 text-right">
                  {camp.completed} / {camp.total}
                </div>
              </div>

              <div className="text-[0.75rem] text-secondary-foreground">
                <span className="font-mono text-foreground mr-1">Open {camp.open}%</span> · 
                <span className="font-mono text-foreground mx-1">Reply {camp.reply}%</span> · 
                <span className="font-mono text-foreground ml-1">Bounced {camp.bounced}</span>
              </div>
              
              {i < CAMPAIGNS_MOCK_DATA.length - 1 && <div className="h-px w-full bg-border mt-3 mb-1 block group-hover:opacity-0" />}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
