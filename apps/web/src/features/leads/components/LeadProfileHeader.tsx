import React from 'react';
import Link from 'next/link';
import { Edit2, Trash2, ChevronRight } from 'lucide-react';
import { DetailedLead } from '../../../lib/api/leads.service';
import { StatusBadge } from '../../../components/ui/StatusBadge';

interface LeadProfileHeaderProps {
  lead: DetailedLead;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function LeadProfileHeader({ lead, onEdit, onDelete }: LeadProfileHeaderProps) {
  const initials = `${lead.firstName[0]}${lead.lastName[0]}`.toUpperCase();

  return (
    <div className="flex flex-col mb-8 gap-4">
      <div className="flex items-center text-[0.875rem] text-secondary-foreground">
        <Link href="/leads" className="hover:text-primary transition-colors">Leads</Link>
        <ChevronRight className="w-4 h-4 mx-1" />
        <span className="text-primary-foreground font-medium">{lead.firstName} {lead.lastName}</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl shrink-0">
            {initials}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-foreground to-primary-foreground/70">
              {lead.firstName} {lead.lastName}
            </h1>
            <div className="flex items-center gap-3 mt-1 text-sm text-secondary-foreground">
              <span>{lead.jobTitle}</span>
              <span>•</span>
              <span>{lead.company}</span>
              <span>•</span>
              <StatusBadge status={lead.status} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={onEdit}
            className="flex items-center h-9 px-4 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors text-sm font-medium gap-2"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
          <button 
            onClick={onDelete}
            className="flex items-center h-9 px-4 rounded-md border border-destructive text-destructive hover:bg-destructive/10 transition-colors text-sm font-medium gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

