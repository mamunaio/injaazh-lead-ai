import React, { useEffect, useState } from 'react';
import { MetricCard } from './MetricCard';
import { ChartWidget } from './ChartWidget';
import { DashboardMetrics } from '../../../lib/api/analytics.service';
import { Users, Mail, MousePointerClick, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function OverviewTab() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);

  useEffect(() => {
    let mounted = true;
    AnalyticsService.getDashboardMetrics()
      .then(data => {
        if (mounted) setMetrics(data);
      })
      .catch(console.error);
    return () => { mounted = false; };
  }, []);

  if (!metrics) {
    return <div className="text-secondary-foreground">Loading metrics...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Leads" value={metrics.totalLeads.toLocaleString()} trend="+0%" icon={<Users className="w-5 h-5" />} />
        <MetricCard title="Emails Sent" value={metrics.emailsSent.toLocaleString()} trend="+0%" icon={<Mail className="w-5 h-5" />} />
        <MetricCard title="Avg Open Rate" value={`${metrics.openRate}%`} trend="+0%" icon={<MousePointerClick className="w-5 h-5" />} />
        <MetricCard title="Conversion Rate" value={`${metrics.conversionRate}%`} trend="+0%" icon={<TrendingUp className="w-5 h-5" />} />
      </div>

      <ChartWidget title="Engagement Trend">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={[]}>
            <defs>
              <linearGradient id="colorOpened" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
            <XAxis dataKey="date" stroke="#737373" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#737373" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#262626', borderRadius: '8px' }}
              itemStyle={{ color: '#e5e5e5' }}
            />
            <Area type="monotone" dataKey="opened" stroke="#3b82f6" fillOpacity={1} fill="url(#colorOpened)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartWidget>
    </div>
  );
}
