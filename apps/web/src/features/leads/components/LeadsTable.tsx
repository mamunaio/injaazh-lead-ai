import React, { useMemo } from 'react';
import { MoreHorizontal, Edit2, Trash2, Users } from 'lucide-react';
import { Lead } from '../../../mocks/leads';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { ScoreBadge } from '../../../components/ui/ScoreBadge';
import { TagList } from '../../../components/ui/TagPill';
import { DataTable, ColumnDef } from '../../../components/ui/DataTable';

interface LeadsTableProps {
  leads: Lead[];
  loading?: boolean;
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onToggleAll: () => void;
}

export function LeadsTable({ leads, loading, selectedIds, onToggleSelect, onToggleAll }: LeadsTableProps) {
  const columns = useMemo<ColumnDef<Lead>[]>(() => [
    {
      header: 'Lead Name',
      width: 'w-[30%]',
      accessor: (lead) => (
        <>
          <div className="font-semibold text-[0.875rem] text-foreground group-hover:text-primary transition-colors">
            {lead.firstName} {lead.lastName}
          </div>
          <div className="text-[0.75rem] text-secondary-foreground mt-0.5 flex items-center gap-2">
            <span>{lead.email}</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>{lead.company}</span>
          </div>
        </>
      ),
    },
    {
      header: 'Status',
      width: 'w-[15%]',
      accessor: (lead) => <StatusBadge status={lead.status} />,
    },
    {
      header: 'AI Score',
      width: 'w-[10%]',
      accessor: (lead) => <ScoreBadge score={lead.score} />,
    },
    {
      header: 'Tags',
      width: 'w-[20%]',
      accessor: (lead) => <TagList tags={lead.tags} max={2} />,
    },
    {
      header: 'Campaign',
      width: 'w-[15%]',
      accessor: (lead) => (
        lead.campaign ? (
          <span className="text-[0.8125rem] text-foreground font-medium truncate max-w-[150px] inline-block">{lead.campaign}</span>
        ) : (
          <span className="text-[0.8125rem] text-muted-foreground">—</span>
        )
      ),
    },
    {
      header: '',
      width: 'w-[10%]',
      className: 'text-right',
      accessor: (lead) => (
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
          <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-secondary text-secondary-foreground hover:text-foreground transition-colors" title="Edit Lead">
            <Edit2 className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-destructive/10 text-destructive transition-colors" title="Delete Lead">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    }
  ], []);

  const emptyState = (
    <>
      <Users className="w-12 h-12 text-muted-foreground mb-4" />
      <h3 className="text-[1.125rem] font-semibold text-foreground">No leads found</h3>
      <p className="text-[0.875rem] text-secondary-foreground max-w-sm text-center mt-2 mb-6">
        Add your first lead manually or import from a CSV file to get started.
      </p>
      <div className="flex gap-3">
        <button className="h-9 px-4 inline-flex items-center justify-center gap-2 bg-secondary hover:bg-accent text-foreground text-[0.875rem] font-medium rounded-md border border-border transition-colors">
          Import CSV
        </button>
        <button className="h-9 px-4 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-[0.875rem] font-medium rounded-md shadow-sm transition-colors">
          Add Lead
        </button>
      </div>
    </>
  );

  return (
    <DataTable
      data={leads}
      columns={columns}
      loading={loading}
      keyExtractor={(l) => l.id}
      selectedIds={selectedIds}
      onToggleSelect={onToggleSelect}
      onToggleAll={onToggleAll}
      emptyState={emptyState}
    />
  );
}
