import { useState, useEffect } from 'react';
import { OrganizationsService } from '../../../lib/api/organizations.service';
type Company = any;
import { LeadsService, Lead } from '../../../lib/api/leads.service';

export function useCompany(id: string) {
  const [company, setCompany] = useState<Company | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchCompanyData = async () => {
      try {
        const foundCompany = await OrganizationsService.getOrganization(id).catch(() => null);
        if (foundCompany) {
          if (mounted) setCompany(foundCompany);
          // In a real app, query by company_id, here we just get all and filter
          const allLeads = await LeadsService.getLeads({ status: 'All', search: '' });
          const associatedLeads = allLeads.filter(
            (lead: Lead) => lead.company.toLowerCase() === foundCompany.name.toLowerCase()
          );
          if (mounted) setLeads(associatedLeads);
        } else {
          if (mounted) setError('Company not found');
        }
      } catch (err) {
        if (mounted) setError('Failed to fetch company data');
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    
    fetchCompanyData();

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
