"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { PageHeader } from '../../../../../components/ui/PageHeader';
import { LeadsService } from '../../../../../lib/api/leads.service';

export default function EditLeadPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    title: '',
    status: 'New'
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchLead = async () => {
      try {
        const lead = await LeadsService.getLead(id);
        if (isMounted) {
          setFormData({
            firstName: lead.firstName || '',
            lastName: lead.lastName || '',
            email: lead.email || '',
            company: (lead as any).company || '',
            title: (lead as any).title || '',
            status: lead.status || 'New'
          });
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : String(err) || 'Failed to fetch lead');
        }
      } finally {
        if (isMounted) {
          setFetching(false);
        }
      }
    };
    fetchLead();
    
    return () => { isMounted = false; };
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await LeadsService.updateLead(id, formData as any);
      router.push('/leads');
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err) || 'Failed to update lead');
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="w-full max-w-[800px] mx-auto p-4 sm:p-5 md:p-6 lg:p-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[800px] mx-auto p-4 sm:p-5 md:p-6 lg:p-8">
      <PageHeader 
        title="Edit Lead"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Leads", href: "/leads" },
          { label: "Edit Lead" }
        ]}
      />

      <div className="bg-card border border-border rounded-lg mt-6 p-6">
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">First Name *</label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={e => setFormData(p => ({ ...p, firstName: e.target.value }))}
                className="w-full h-10 px-3 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Last Name *</label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={e => setFormData(p => ({ ...p, lastName: e.target.value }))}
                className="w-full h-10 px-3 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                className="w-full h-10 px-3 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Company</label>
              <input
                type="text"
                value={formData.company}
                onChange={e => setFormData(p => ({ ...p, company: e.target.value }))}
                className="w-full h-10 px-3 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Job Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData(p => ({ ...p, title: e.target.value }))}
                className="w-full h-10 px-3 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Status</label>
              <select
                value={formData.status}
                onChange={e => setFormData(p => ({ ...p, status: e.target.value }))}
                className="w-full h-10 px-3 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Lost">Lost</option>
                <option value="Customer">Customer</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-border mt-8">
            <button
              type="button"
              onClick={() => router.back()}
              className="h-10 px-4 inline-flex items-center justify-center bg-secondary hover:bg-accent text-foreground text-sm font-medium rounded-md border border-border transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="h-10 px-6 inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium rounded-md shadow-sm transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
