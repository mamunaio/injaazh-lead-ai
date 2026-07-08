import React, { useState } from 'react';
import { Campaign, CampaignStatus } from '../../../lib/api/campaigns.service';
import { DataTable, ColumnDef } from '../../../components/ui/DataTable';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { ProgressBar } from '../../../components/ui/ProgressBar';
import { MoreHorizontal, Play, Pause, Square } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CampaignsTableProps {
  campaigns: Campaign[];
  onStatusChange: (id: string, status: CampaignStatus) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  actionLoading: string | null;
}

export function CampaignsTable({ campaigns, onStatusChange, onDelete, actionLoading }: CampaignsTableProps) {
  const router = useRouter();
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const columns: ColumnDef<Campaign>[] = [
    {
      header: 'Name',
      accessor: (camp) => (
        <div className="flex flex-col">
          <span className="font-medium text-primary text-sm">{camp.name}</span>
          <span className="text-xs text-secondary-foreground">
            Created on {new Date(camp.createdAt).toLocaleDateString()}
          </span>
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: (camp) => <StatusBadge status={camp.status} />,
    },
    {
      header: 'Segment',
      accessor: (camp) => (
        <span className="text-sm text-foreground">{camp.leadSegmentId ?? '—'}</span>
      ),
    },
    {
      header: 'Sequence',
      accessor: (camp) => (
        <span className="text-sm text-foreground">{camp.sequenceId ?? '—'}</span>
      ),
    },
    {
      header: 'Schedule',
      accessor: (camp) => (
        <span className="text-sm text-foreground">{camp.schedule ?? '—'}</span>
      ),
    },
    {
      header: '',
      accessor: (camp) => (
        <div className="relative flex justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenDropdownId(openDropdownId === camp.id ? null : camp.id);
            }}
            className="w-8 h-8 rounded-md hover:bg-secondary/80 flex items-center justify-center transition-colors"
          >
            <MoreHorizontal className="w-4 h-4 text-secondary-foreground" />
          </button>
          
          {openDropdownId === camp.id && (
            <div className="absolute right-0 top-full mt-1 w-40 bg-card border border-border rounded-lg shadow-lg py-1 z-10 animate-in fade-in zoom-in-95 duration-150">
              {camp.status !== 'Active' && camp.status !== 'Completed' && camp.status !== 'Stopped' && (
                <button
                  onClick={(e) => { e.stopPropagation(); onStatusChange(camp.id, 'Active'); setOpenDropdownId(null); }}
                  className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors flex items-center gap-2"
                  disabled={actionLoading === camp.id}
                >
                  <Play className="w-4 h-4 text-green-500" /> {actionLoading === camp.id ? 'Starting...' : 'Start'}
                </button>
              )}
              {camp.status === 'Active' && (
                <button
                  onClick={(e) => { e.stopPropagation(); onStatusChange(camp.id, 'Paused'); setOpenDropdownId(null); }}
                  className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors flex items-center gap-2"
                  disabled={actionLoading === camp.id}
                >
                  <Pause className="w-4 h-4 text-amber-500" /> {actionLoading === camp.id ? 'Pausing...' : 'Pause'}
                </button>
              )}
              {camp.status !== 'Completed' && camp.status !== 'Stopped' && (
                <button
                  onClick={(e) => { e.stopPropagation(); onStatusChange(camp.id, 'Completed'); setOpenDropdownId(null); }}
                  className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors flex items-center gap-2"
                  disabled={actionLoading === camp.id}
                >
                  <Square className="w-4 h-4 text-secondary-foreground" /> Stop
                </button>
              )}
              {onDelete && (
                <button
                  onClick={(e) => { e.stopPropagation(); onDelete(camp.id); setOpenDropdownId(null); }}
                  className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-2 border-t border-border mt-1 pt-1"
                  disabled={actionLoading === camp.id}
                >
                  <svg className="w-4 h-4 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      ),
    },
  ];

  const handleRowClick = (camp: Campaign) => {
    router.push(`/campaigns/${camp.id}`);
  };

  return (
    <div className="bg-card border border-border rounded-xl" onClick={() => setOpenDropdownId(null)}>
      {campaigns.length > 0 ? (
        <DataTable
          columns={columns}
          data={campaigns}
          keyExtractor={(camp) => camp.id}
          onRowClick={handleRowClick}
        />
      ) : (
        <div className="py-16 flex flex-col items-center justify-center text-center">
          <p className="text-secondary-foreground mb-4">No campaigns found in this view.</p>
        </div>
      )}
    </div>
  );
}
