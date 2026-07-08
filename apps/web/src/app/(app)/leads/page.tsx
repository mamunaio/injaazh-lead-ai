"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, Plus, CheckCircle2, XCircle } from 'lucide-react';
import { PageHeader } from '../../../components/ui/PageHeader';
import { Pagination } from '../../../components/ui/Pagination';
import { LeadsToolbar } from '../../../features/leads/components/LeadsToolbar';
import { LeadsTable } from '../../../features/leads/components/LeadsTable';
import { BulkActionsBar } from '../../../features/leads/components/BulkActionsBar';
import { useLeads } from '../../../features/leads/hooks/useLeads';
import { useSelection } from '../../../hooks/useSelection';
import { CampaignPickerModal } from '../../../features/campaigns/components/CampaignPickerModal';
import { CampaignsService } from '../../../lib/api/campaigns.service';

export default function LeadsPage() {
  const router = useRouter();
  const {
    leads,
    loading,
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    deleteLead,
    fetchLeads
  } = useLeads();

  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollToast, setEnrollToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const {
    selectedIds,
    toggleSelect,
    toggleAll,
    clearSelection,
  } = useSelection(leads, (l) => l.id);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await deleteLead(id);
      } catch (err) {
        alert('Failed to delete lead');
      }
    }
  };

  const handleEnrollCampaign = async (campaignId: string) => {
    setEnrolling(true);
    try {
      const result = await CampaignsService.enrollLeads(campaignId, Array.from(selectedIds));
      const count = result.enrolled ?? Array.from(selectedIds).length;
      clearSelection();
      setIsCampaignModalOpen(false);
      fetchLeads();
      setEnrollToast({ type: 'success', message: `${count} lead${count !== 1 ? 's' : ''} enrolled in campaign.` });
      setTimeout(() => setEnrollToast(null), 5000);
    } catch (error) {
      setIsCampaignModalOpen(false);
      setEnrollToast({ type: 'error', message: 'Failed to enroll leads. Please try again.' });
      setTimeout(() => setEnrollToast(null), 5000);
    } finally {
      setEnrolling(false);
    }
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 sm:p-5 md:p-6 lg:p-8 relative min-h-[calc(100vh-56px)]">
      {enrollToast && (
        <div className={`fixed top-20 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg animate-in slide-in-from-top-2 fade-in duration-300 ${
          enrollToast.type === 'success'
            ? 'bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400'
            : 'bg-destructive/10 border-destructive/30 text-destructive'
        }`}>
          {enrollToast.type === 'success'
            ? <CheckCircle2 className="w-4 h-4 shrink-0" />
            : <XCircle className="w-4 h-4 shrink-0" />
          }
          <span className="text-sm font-medium">{enrollToast.message}</span>
        </div>
      )}
      <PageHeader 
        title="Leads Management"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Leads" }
        ]}
        actions={[
          { label: "Import Leads", href: "/leads/import", icon: Upload },
          { label: "Add Lead", href: "/leads/new", icon: Plus, variant: 'primary' }
        ]}
      />
      
      <LeadsToolbar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />
      
      <LeadsTable 
        leads={leads}
        loading={loading}
        selectedIds={selectedIds}
        onToggleSelect={toggleSelect}
        onToggleAll={toggleAll}
        onRowClick={(lead) => router.push(`/leads/${lead.id}`)}
        onEdit={(id) => router.push(`/leads/${id}/edit`)}
        onDelete={handleDelete}
      />
      
      <Pagination 
        currentPage={currentPage}
        totalCount={leads.length > 0 || loading ? 42 : 0} // Hardcoded total count for mock simulation
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        itemName="leads"
      />

      <BulkActionsBar 
        selectedCount={selectedIds.size} 
        onClear={clearSelection}
        onAssignCampaign={() => setIsCampaignModalOpen(true)}
      />

      <CampaignPickerModal 
        isOpen={isCampaignModalOpen}
        onClose={() => setIsCampaignModalOpen(false)}
        onConfirm={handleEnrollCampaign}
        isLoading={enrolling}
      />
    </div>
  );
}
