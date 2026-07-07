import React from 'react';
import { Company } from '../../../mocks/companies';
import { Building, MapPin, Users, DollarSign, Calendar } from 'lucide-react';

interface CompanyFirmographicsCardProps {
  company: Company;
}

export function CompanyFirmographicsCard({ company }: CompanyFirmographicsCardProps) {
  const details = [
    { label: 'Industry', value: company.industry, icon: Building },
    { label: 'Headquarters', value: company.headquarters, icon: MapPin },
    { label: 'Employees', value: company.employees, icon: Users },
    { label: 'Est. Revenue', value: company.revenue, icon: DollarSign },
    { label: 'Founded', value: company.founded, icon: Calendar },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6 h-full">
      <h2 className="text-lg font-semibold text-card-foreground mb-6 pb-4 border-b border-border">
        Firmographics
      </h2>
      
      <div className="space-y-5">
        {details.map((detail, idx) => (
          <div key={idx} className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-secondary/30 flex items-center justify-center shrink-0 border border-border">
              <detail.icon className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div className="flex flex-col pt-1">
              <span className="text-xs text-secondary-foreground font-medium uppercase tracking-wider mb-0.5">
                {detail.label}
              </span>
              <span className="text-sm font-medium text-foreground">
                {detail.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
