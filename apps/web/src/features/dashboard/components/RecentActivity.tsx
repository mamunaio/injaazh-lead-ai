import React from 'react';
import { MessageSquare, Eye, CheckCircle, Upload, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ACTIVITY_TODAY_MOCK_DATA, ACTIVITY_YESTERDAY_MOCK_DATA } from '../../../mocks/dashboard';

const ICON_MAP: Record<string, React.ElementType> = {
  MessageSquare,
  Eye,
  CheckCircle,
  Upload,
  Sparkles
};

export function RecentActivity() {
  const renderGroup = (label: string, items: typeof ACTIVITY_TODAY_MOCK_DATA) => (
    <div className="mb-4">
      <div className="flex items-center mb-2">
        <div className="flex-1 h-px bg-border" />
        <span className="px-3 text-[0.625rem] font-semibold uppercase text-tertiary tracking-[0.08em]">{label}</span>
        <div className="flex-1 h-px bg-border" />
      </div>
      
      <div className="flex flex-col">
        {items.map((item, i) => {
          const Icon = ICON_MAP[item.iconName];
          return (
          <div key={item.id} className="group relative flex items-start gap-3 py-3 px-2 -mx-2 hover:bg-accent rounded-md transition-colors border-b border-border last:border-0">
            <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${item.bg}`}>
              <Icon className={`w-4 h-4 ${item.text}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[0.875rem] text-foreground font-medium truncate group-hover:text-primary transition-colors">
                {item.title}
              </div>
              {(item.meta || item.link) && (
                <div className="text-[0.8125rem] text-tertiary mt-0.5 flex items-center gap-2">
                  {item.meta && <span>{item.meta}</span>}
                  {item.meta && item.link && <span>Â·</span>}
                  {item.link && (
                    <Link href="#" className="text-secondary-foreground hover:text-primary hover:underline flex items-center gap-1 transition-colors">
                      {item.link} <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              )}
            </div>
            <div className="text-[0.75rem] text-tertiary font-mono whitespace-nowrap shrink-0 mt-0.5">
              {item.time}
            </div>
          </div>
        )})}
      </div>
    </div>
  );

  return (
    <div className="col-span-12 lg:col-span-8 bg-card border border-border rounded-xl p-6 h-[360px] flex flex-col">
      <div className="flex items-center justify-between mb-4 border-b border-border pb-4">
        <h2 className="text-[0.75rem] font-semibold uppercase text-secondary-foreground tracking-[0.05em]">
          Recent Activity
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex gap-3">
            <button className="text-primary text-sm font-medium border-b-2 border-primary pb-4 -mb-4">All â—</button>
            <button className="text-tertiary hover:text-foreground text-sm pb-4 -mb-4 transition-colors">Emails</button>
            <button className="text-tertiary hover:text-foreground text-sm pb-4 -mb-4 transition-colors">Tasks</button>
          </div>
          <div className="w-px h-4 bg-border mx-2" />
          <Link href="/activity" className="text-[0.75rem] text-primary flex items-center gap-1 hover:underline">
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {renderGroup('Today', ACTIVITY_TODAY_MOCK_DATA)}
        {renderGroup('Yesterday', ACTIVITY_YESTERDAY_MOCK_DATA)}
        
        <button className="w-full py-2 text-[0.875rem] text-tertiary hover:text-secondary-foreground transition-colors mt-2">
          Load 10 more activities â†“
        </button>
      </div>
    </div>
  );
}
