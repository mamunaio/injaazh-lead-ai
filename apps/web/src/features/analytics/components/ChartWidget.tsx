import React from 'react';

interface ChartWidgetProps {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export function ChartWidget({ title, children, action }: ChartWidgetProps) {
  return (
    <div className="bg-card border border-border rounded-xl shadow-sm flex flex-col overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        {action && <div>{action}</div>}
      </div>
      <div className="p-5 flex-1 min-h-[300px]">
        {children}
      </div>
    </div>
  );
}
