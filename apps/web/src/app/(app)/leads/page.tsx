"use client";

import React, { useState } from 'react';
import { Upload, Plus } from 'lucide-react';
import { PageHeader } from '../../../components/ui/PageHeader';
import { Pagination } from '../../../components/ui/Pagination';
import { LeadsToolbar } from '../../../features/leads/components/LeadsToolbar';
import { LeadsTable } from '../../../features/leads/components/LeadsTable';
import { BulkActionsBar } from '../../../features/leads/components/BulkActionsBar';
import { useLeads } from '../../../features/leads/hooks/useLeads';
import { useSelection } from '../../../hooks/useSelection';

export default function LeadsPage() {
  const {
    leads,
    loading,
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus
  } = useLeads();

  const {
    selectedIds,
    toggleSelect,
    toggleAll,
    clearSelection,
  } = useSelection(leads, (l) => l.id);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 sm:p-5 md:p-6 lg:p-8 relative min-h-[calc(100vh-56px)]">
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
      />
    </div>
  );
}
