"use client";

import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';
import { PIPELINE_FUNNEL_MOCK_DATA, PIPELINE_TOP_LEADS_MOCK_DATA } from '../../../mocks/dashboard';

export function LeadPipeline() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="col-span-12 lg:col-span-6 bg-card border border-border rounded-xl p-6 h-[320px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[0.75rem] font-semibold uppercase text-secondary-foreground tracking-[0.05em]">
          Lead Pipeline
        </h2>
        <Link href="/leads" className="text-[0.75rem] text-primary flex items-center gap-1 hover:underline">
          View All <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col justify-between">
        <div className="mb-4">
          <div className="text-[0.625rem] font-semibold uppercase text-tertiary tracking-[0.08em] mb-2">
            Status Breakdown
          </div>
          <div className="flex flex-col gap-1.5">
            {PIPELINE_FUNNEL_MOCK_DATA.map((item) => (
              <Link key={item.status} href={`/leads?status=${item.status.toLowerCase()}`} className="flex items-center group cursor-pointer rounded-sm hover:bg-accent -mx-2 px-2 py-0.5 transition-colors">
                <div className="w-[70px] text-[0.8125rem] text-secondary-foreground shrink-0">{item.status}</div>
                <div className="flex-1 flex items-center h-5 mr-3 relative bg-secondary rounded-r-sm overflow-hidden">
                  <div 
                    className={clsx("h-full rounded-r-sm transition-[width] duration-500 ease-out", item.color)} 
                    style={{ width: mounted ? `${item.percent}%` : '0%' }}
                  />
                </div>
                <div className="w-6 text-right text-[0.8125rem] font-mono text-foreground">{item.count}</div>
                <div className="w-8 text-right text-[0.75rem] text-muted-foreground ml-2">{item.percent}%</div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="w-full h-px bg-border mb-3" />
          <div className="text-[0.625rem] font-semibold uppercase text-tertiary tracking-[0.08em] mb-2">
            Top Leads By Score
          </div>
          <div className="flex flex-col">
            {PIPELINE_TOP_LEADS_MOCK_DATA.map((lead, i) => (
              <Link key={i} href={`/leads/${i}`} className="flex items-center justify-between h-[44px] group hover:bg-accent -mx-2 px-2 rounded-md transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-accent text-primary flex items-center justify-center text-xs font-medium shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {lead.initials}
                  </div>
                  <div>
                    <span className="text-[0.875rem] font-medium text-foreground">{lead.name}</span>
                    <span className="text-[0.8125rem] text-secondary-foreground ml-1 hidden sm:inline-block">Â· {lead.company}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={clsx("w-7 h-7 rounded-full border flex items-center justify-center text-[0.6875rem] font-bold", `border-${lead.color}`, `text-${lead.color}`, `bg-${lead.color}-subtle`)}>
                    {lead.score}
                  </div>
                  <span className="text-[0.8125rem] text-secondary-foreground w-16 text-right">{lead.status}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
