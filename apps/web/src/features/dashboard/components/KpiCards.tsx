import React from 'react';
import { ArrowDownToLine, BadgeCheck, Mail, MessageSquare } from 'lucide-react';
import clsx from 'clsx';

interface KpiData {
  label: string;
  value: string | number;
  trend: string;
  trendPositive: boolean;
  trendNeutral?: boolean;
  color: 'blue' | 'green' | 'violet' | 'orange';
}

const KpiCard = ({ data, loading }: { data: KpiData, loading?: boolean }) => {
  const Icon = {
    blue: ArrowDownToLine,
    green: BadgeCheck,
    violet: Mail,
    orange: MessageSquare
  }[data.color];

  const borderClass = {
    blue: 'border-l-blue',
    green: 'border-l-green',
    violet: 'border-l-violet',
    orange: 'border-l-[#F97316]', // We didn't add orange to tailwind config as primary semantic but inline here
  }[data.color];

  const gradientClass = {
    blue: 'text-gradient-blue',
    green: 'text-gradient-green',
    violet: 'text-gradient-violet',
    orange: 'text-gradient-orange',
  }[data.color];

  return (
    <div className={clsx(
      "bg-card border border-border rounded-xl h-[120px] p-[20px] pr-[20px] pl-[17px] cursor-pointer hover:bg-accent hover:border-[#374151] transition-colors relative flex flex-col justify-between",
      borderClass
    )} style={{ borderLeftWidth: '3px', borderLeftStyle: 'solid' }}>
      
      {/* Top row */}
      <div className="flex justify-between items-start">
        {loading ? (
          <div className="h-3 w-[40%] bg-secondary rounded-sm animate-none" />
        ) : (
          <div className="text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-secondary-foreground">
            {data.label}
          </div>
        )}
        <Icon className="w-[18px] h-[18px] text-muted-foreground" />
      </div>

      {/* Middle row (Value) */}
      <div className="mt-auto mb-1">
        {loading ? (
          <div className="h-8 w-[60%] bg-secondary rounded-sm mt-2 mb-1 animate-none" />
        ) : (
          <div className={clsx("text-[2rem] font-bold tabular-nums leading-none", gradientClass)}>
            {data.value}
          </div>
        )}
      </div>

      {/* Bottom row (Trend) */}
      <div>
        {loading ? (
          <div className="h-3 w-[50%] bg-secondary rounded-sm animate-none" />
        ) : (
          <div className="text-[0.75rem] text-secondary-foreground flex items-center gap-1">
            {data.trendNeutral ? (
              <span className="text-muted-foreground">–</span>
            ) : data.trendPositive ? (
              <span className="text-green text-[0.625rem]">▲</span>
            ) : (
              <span className="text-destructive text-[0.625rem]">▼</span>
            )}
            <span>{data.trend}</span>
          </div>
        )}
      </div>
    </div>
  );
};



export function KpiCards({ loading }: { loading?: boolean }) {
  return (
    <div className="col-span-12 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {kpis.map((card, i) => (
        <KpiCard key={i} data={card} loading={loading} />
      ))}
    </div>
  );
}
