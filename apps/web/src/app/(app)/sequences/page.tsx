"use client";

import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../../components/ui/PageHeader';
import { SequencesService, Sequence } from '../../../lib/api/sequences.service';
import { DataTable, ColumnDef } from '../../../components/ui/DataTable';
import { Plus, Edit2, Trash2, CheckCircle2, XCircle, ListOrdered } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SequencesPage() {
  const router = useRouter();
  const [sequences, setSequences] = useState<Sequence[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchSequences = () => {
    setLoading(true);
    SequencesService.getSequences()
      .then(data => {
        setSequences(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchSequences();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this sequence?')) {
      try {
        await SequencesService.deleteSequence(id);
        fetchSequences();
        showToast('success', 'Sequence deleted.');
      } catch (err) {
        showToast('error', 'Failed to delete sequence. Please try again.');
      }
    }
  };

  const columns: ColumnDef<Sequence>[] = [
    {
      header: 'Name',
      width: 'w-[35%]',
      accessor: (seq) => (
        <span className="font-medium text-foreground">{seq.name}</span>
      ),
    },
    {
      header: 'Status',
      width: 'w-[15%]',
      accessor: (seq) => (
        <span className={`text-sm font-medium ${seq.isActive ? 'text-green-500' : 'text-secondary-foreground'}`}>
          {seq.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      header: 'Steps',
      width: 'w-[15%]',
      accessor: (seq) => (
        <span className="text-sm text-secondary-foreground">{seq.steps?.length || 0} steps</span>
      ),
    },
    {
      header: 'Stop on Reply',
      width: 'w-[15%]',
      accessor: (seq) => (
        <span className={`text-sm ${seq.stopOnReply ? 'text-foreground' : 'text-secondary-foreground'}`}>
          {seq.stopOnReply ? 'Yes' : 'No'}
        </span>
      ),
    },
    {
      header: 'Created',
      width: 'w-[10%]',
      accessor: (seq) => (
        <span className="text-xs text-secondary-foreground">{new Date(seq.createdAt).toLocaleDateString()}</span>
      ),
    },
    {
      header: '',
      width: 'w-[10%]',
      className: 'text-right',
      accessor: (seq) => (
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => { e.stopPropagation(); router.push(`/sequences/${seq.id}/edit`); }}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-secondary text-secondary-foreground hover:text-foreground transition-colors"
            title="Edit Sequence"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleDelete(seq.id); }}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-destructive/10 text-destructive transition-colors"
            title="Delete Sequence"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    }
  ];

  const emptyState = (
    <>
      <ListOrdered className="w-12 h-12 text-muted-foreground mb-4" />
      <h3 className="text-[1.125rem] font-semibold text-foreground">No sequences yet</h3>
      <p className="text-[0.875rem] text-secondary-foreground max-w-sm text-center mt-2 mb-6">
        Create your first email sequence to automate outreach for your campaigns.
      </p>
      <a
        href="/sequences/new"
        className="h-9 px-4 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-[0.875rem] font-medium rounded-md shadow-sm transition-colors"
      >
        <Plus className="w-4 h-4" />
        New Sequence
      </a>
    </>
  );

  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 sm:p-5 md:p-6 lg:p-8 relative min-h-[calc(100vh-56px)] flex flex-col">
      {toast && (
        <div className={`fixed top-20 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg animate-in slide-in-from-top-2 fade-in duration-300 ${
          toast.type === 'success'
            ? 'bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400'
            : 'bg-destructive/10 border-destructive/30 text-destructive'
        }`}>
          {toast.type === 'success'
            ? <CheckCircle2 className="w-4 h-4 shrink-0" />
            : <XCircle className="w-4 h-4 shrink-0" />
          }
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      <PageHeader
        title="Sequences"
        breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Sequences' }]}
        actions={[
          { label: "New Sequence", href: "/sequences/new", icon: Plus, variant: 'primary' }
        ]}
      />

      <div className="mt-6">
        <DataTable
          data={sequences}
          columns={columns}
          loading={loading}
          keyExtractor={(s) => s.id}
          onRowClick={(seq) => router.push(`/sequences/${seq.id}/edit`)}
          emptyState={emptyState}
        />
      </div>
    </div>
  );
}
