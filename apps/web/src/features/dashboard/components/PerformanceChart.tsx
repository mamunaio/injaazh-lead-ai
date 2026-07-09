"use client";

import React, { useState, useEffect } from 'react';
import { DashboardService } from '../../../lib/api/dashboard.service';


export function PerformanceChart({ loading }: { loading?: boolean }) {

  const [performanceData, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    DashboardService.getPerformance().then(res => {
      if (Array.isArray(res)) setData(res);
      else if (res && Array.isArray(res.data)) setData(res.data);
      else if (res) setData([res]);
    }).catch(console.error).finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="col-span-12 lg:col-span-8 bg-card border border-border rounded-xl p-6 h-[280px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[0.75rem] font-semibold uppercase text-secondary-foreground tracking-[0.05em]">
          Outreach Performance
        </h2>
        <div className="flex gap-4">
          <button className="text-tertiary text-sm pb-1">7D</button>
          <button className="text-primary text-sm pb-1 border-b-2 border-primary font-medium">30D ●</button>
          <button className="text-tertiary text-sm pb-1">90D</button>
        </div>
      </div>
      
      {/* Mock Chart Area */}
      <div className="flex-1 relative flex flex-col justify-between">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pt-2 pb-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="w-full border-t border-dashed border-[#1F2937]" />
          ))}
        </div>
        
        {/* Y Axis labels */}
        <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[0.6875rem] text-muted-foreground font-mono">
          <span>40%</span>
          <span>30%</span>
          <span>20%</span>
          <span>10%</span>
          <span>0%</span>
        </div>

        {/* Chart SVG */}
        <div className="absolute inset-0 ml-8 mb-6">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
            {/* Open Rate (Indigo) */}
            <polyline 
              fill="none" 
              stroke="#6366F1" 
              strokeWidth="1.5"
              points="0,60 20,40 40,50 60,30 80,45 100,20" 
            />
            {/* Reply Rate (Green) */}
            <polyline 
              fill="none" 
              stroke="#10B981" 
              strokeWidth="1.5"
              points="0,90 20,85 40,75 60,80 80,70 100,65" 
            />
          </svg>
        </div>

        {/* X Axis labels */}
        <div className="absolute bottom-0 left-8 right-0 flex justify-between text-[0.6875rem] text-muted-foreground">
          <span>Jul 1</span>
          <span>Jul 8</span>
          <span>Jul 15</span>
          <span>Jul 22</span>
          <span>Jul 29</span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex gap-5 ml-8">
        <div className="flex items-center gap-2">
          <div className="w-4 h-[2px] bg-[#6366F1]" />
          <span className="text-[0.75rem] text-secondary-foreground">Open Rate</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-[2px] bg-[#10B981]" />
          <span className="text-[0.75rem] text-secondary-foreground">Reply Rate</span>
        </div>
      </div>
    </div>
  );
}
