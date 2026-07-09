'use client';

import React from 'react';
import { Plus, Upload, LayoutTemplate, Repeat, Sparkles, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { DashboardService } from '../../../lib/api/dashboard.service';
import { useState, useEffect } from 'react';

const ICON_MAP: Record<string, React.ElementType> = {
  Plus,
  Upload,
  LayoutTemplate,
  Repeat,
  Sparkles
};

export function QuickActions({ loading }: { loading?: boolean }) {

  const [actions, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    DashboardService.getQuickActions().then(res => {
      if (Array.isArray(res)) setData(res);
      else if (res && Array.isArray(res.data)) setData(res.data);
      else if (res) setData([res]);
    }).catch(console.error).finally(() => setIsLoading(false));
  }, []);

  const [onboarding, setOnboarding] = useState<unknown[]>([]);
  const [quickActions, setQuickActions] = useState<unknown[]>([]);

  useEffect(() => {
    DashboardService.getOnboardingTasks().then(setOnboarding);
    DashboardService.getQuickActions().then(setQuickActions);
  }, []);
  return (
    <div className="col-span-12 lg:col-span-4 bg-card border border-border rounded-xl p-6 h-[360px] flex flex-col hidden lg:flex">
      <h2 className="text-[0.75rem] font-semibold uppercase text-secondary-foreground tracking-[0.05em] mb-4">
        Quick Actions
      </h2>

      <div className="flex flex-col gap-1 mb-6">
        {quickActions.map((action, i) => {
          const Icon = ICON_MAP[action.iconName];
          return (
          <Link 
            key={i} 
            href={action.href}
            className="group flex items-center justify-between p-2 -mx-2 rounded-md hover:bg-accent transition-colors"
          >
            <div className={`flex items-center gap-3 ${action.text || 'text-foreground'} group-hover:text-primary transition-colors`}>
              <Icon className="w-[18px] h-[18px]" />
              <span className="text-[0.875rem] font-medium">{action.label}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        )})}
      </div>

      <div className="h-px w-full bg-border mb-6" />

      <div>
        <h2 className="text-[0.625rem] font-semibold uppercase text-tertiary tracking-[0.08em] mb-3">
          Onboarding
        </h2>
        
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden flex">
            <div className="w-3/4 h-full bg-green rounded-full" />
          </div>
          <span className="text-[0.75rem] text-secondary-foreground whitespace-nowrap">3 of 4 complete</span>
        </div>

        <div className="flex flex-col gap-2">
          {onboarding.map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${step.done ? 'bg-green text-card' : 'border border-border text-transparent'}`}>
                <Check className="w-2.5 h-2.5" />
              </div>
              <span className={`text-[0.8125rem] ${step.done ? 'text-secondary-foreground line-through' : 'text-foreground font-medium'}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
