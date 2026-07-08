import React from 'react';
import { ChartWidget } from './ChartWidget';
import { LEAD_SOURCES } from '../../../mocks/analytics';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function LeadsTab() {
  return (
    <div className="flex flex-col gap-6">
      <ChartWidget title="Lead Sources">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={LEAD_SOURCES}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {LEAD_SOURCES.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#262626', borderRadius: '8px' }}
              itemStyle={{ color: '#e5e5e5' }}
            />
            <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '12px' }} />
          </PieChart>
        </ResponsiveContainer>
      </ChartWidget>
    </div>
  );
}
