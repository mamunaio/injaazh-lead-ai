import React from 'react';
import { Company } from '../../../mocks/companies';
import { Building2, Globe, MapPin, Users } from 'lucide-react';
import Link from 'next/link';

interface CompanyHeaderProps {
  company: Company;
}

export function CompanyHeader({ company }: CompanyHeaderProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-8 mb-6">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-2xl bg-secondary/20 flex items-center justify-center overflow-hidden border border-border shadow-sm shrink-0">
            {company.logo ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={company.logo} alt={company.name} className="w-16 h-16 object-contain" />
              </>
            ) : (
              <Building2 className="w-12 h-12 text-secondary-foreground" />
            )}
          </div>
          
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent mb-2">
              {company.name}
            </h1>
            <p className="text-secondary-foreground mb-4 max-w-2xl">
              {company.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-secondary-foreground font-medium">
              <div className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-primary" />
                <a href={company.website} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                  {company.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{company.headquarters}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-primary" />
                <span>{company.employees} employees</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 shrink-0">
          <Link href={`/leads/new?company=${company.id}`} className="h-9 px-4 rounded-md border border-border bg-background text-foreground font-medium text-sm hover:bg-secondary transition-colors inline-flex items-center justify-center">
            Add Contact
          </Link>
          <button className="h-9 px-4 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
            Generate Report
          </button>
        </div>
        
      </div>
    </div>
  );
}
