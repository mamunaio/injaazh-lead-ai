"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { useCompany } from '../../../../features/companies/hooks/useCompany';
import { CompanyHeader } from '../../../../features/companies/components/CompanyHeader';
import { CompanyAIInsightsCard } from '../../../../features/companies/components/CompanyAIInsightsCard';
import { CompanyFirmographicsCard } from '../../../../features/companies/components/CompanyFirmographicsCard';
import { CompanyLeadsTable } from '../../../../features/companies/components/CompanyLeadsTable';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CompanyProfilePage() {
  const params = useParams();
  const companyId = Array.isArray(params.id) ? params.id[0] : params.id;
  
  const { company, leads, isLoading, error } = useCompany(companyId || '');

  if (isLoading) {
    return (
      <div className="w-full max-w-[1600px] mx-auto animate-pulse">
        <div className="h-[140px] bg-secondary/50 rounded-xl mb-6"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          <div className="lg:col-span-8">
            <div className="h-[300px] bg-secondary/50 rounded-xl"></div>
          </div>
          <div className="lg:col-span-4">
            <div className="h-[300px] bg-secondary/50 rounded-xl"></div>
          </div>
        </div>
        <div className="h-[400px] bg-secondary/50 rounded-xl"></div>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h2 className="text-xl font-bold text-foreground mb-2">Company Not Found</h2>
        <p className="text-secondary-foreground mb-6">This company profile doesn&apos;t exist or has been deleted.</p>
        <Link 
          href="/leads"
          className="flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Leads
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto">
      <CompanyHeader company={company} />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        <div className="lg:col-span-8">
          <CompanyAIInsightsCard company={company} />
        </div>
        <div className="lg:col-span-4">
          <CompanyFirmographicsCard company={company} />
        </div>
      </div>

      <CompanyLeadsTable leads={leads} />
    </div>
  );
}
