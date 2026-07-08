import React from 'react';
import { Lead } from '../../../lib/api/leads.service';
import { DataTable, ColumnDef } from '../../../components/ui/DataTable';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { ScoreBadge } from '../../../components/ui/ScoreBadge';
import { useRouter } from 'next/navigation';

interface CompanyLeadsTableProps {
  leads: Lead[];
}

export function CompanyLeadsTable({ leads }: CompanyLeadsTableProps) {
  const router = useRouter();

  const columns: ColumnDef<Lead>[] = [
    {
      header: 'Name',
      accessor: (lead) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center font-bold text-xs shrink-0">
            {lead.firstName.charAt(0)}{lead.lastName.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-primary text-sm">{lead.firstName} {lead.lastName}</span>
            <span className="text-xs text-secondary-foreground">{lead.email}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Title',
      accessor: () => <span className="text-sm text-foreground">{'--'}</span>,
    },
    {
      header: 'Status',
      accessor: (lead) => <StatusBadge status={lead.status} />,
    },
    {
      header: 'Score',
      accessor: (lead) => <ScoreBadge score={lead.score} />,
    },
    {
      header: 'Created At',
      accessor: (lead) => <span className="text-sm text-secondary-foreground">{new Date(lead.createdAt).toLocaleDateString()}</span>,
    },
  ];

  const handleRowClick = (lead: Lead) => {
    router.push(`/leads/${lead.id}`);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h2 className="text-lg font-semibold text-card-foreground mb-4">Associated Leads</h2>
      {leads.length > 0 ? (
        <DataTable
          columns={columns}
          data={leads}
          keyExtractor={(lead) => lead.id}
          onRowClick={handleRowClick}
        />
      ) : (
        <div className="py-12 flex flex-col items-center justify-center text-center">
          <p className="text-secondary-foreground mb-4">No leads found for this company.</p>
        </div>
      )}
    </div>
  );
}
