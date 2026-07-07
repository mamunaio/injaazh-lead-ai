import { useState, useEffect } from 'react';
import { Company, MOCK_COMPANIES } from '../../../mocks/companies';
import { LEADS_MOCK_DATA, Lead } from '../../../mocks/leads';

export function useCompany(id: string) {
  const [company, setCompany] = useState<Company | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    // Simulate API delay
    setTimeout(() => {
      if (!mounted) return;

      const foundCompany = MOCK_COMPANIES[id];
      if (foundCompany) {
        setCompany(foundCompany);
        // Find leads belonging to this company based on company name
        // (In a real app, this would query by company_id)
        const associatedLeads = LEADS_MOCK_DATA.filter(
          (lead: Lead) => lead.company.toLowerCase() === foundCompany.name.toLowerCase()
        );
        setLeads(associatedLeads);
      } else {
        setError('Company not found');
      }
      setIsLoading(false);
    }, 800);

    return () => {
      mounted = false;
    };
  }, [id]);

  return {
    company,
    leads,
    isLoading,
    error
  };
}
