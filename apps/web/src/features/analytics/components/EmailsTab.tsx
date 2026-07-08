import React from 'react';
import { ChartWidget } from './ChartWidget';
import { TIME_SERIES_DATA } from '../../../mocks/analytics';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function EmailsTab() {
  return (
    <div className="flex flex-col gap-6">
      <ChartWidget title="Email Delivery Performance">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={TIME_SERIES_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
            <XAxis dataKey="date" stroke="#737373" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#737373" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#262626', borderRadius: '8px' }}
              itemStyle={{ color: '#e5e5e5' }}
              cursor={{ fill: '#262626', opacity: 0.4 }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Bar dataKey="sent" name="Sent" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="opened" name="Opened" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="replied" name="Replied" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="bounced" name="Bounced" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartWidget>
    </div>
  );
}
