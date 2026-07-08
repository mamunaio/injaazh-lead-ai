import React from 'react';
import { Mail, Phone, Building2, Globe, Link, MapPin } from 'lucide-react';
import { DetailedLead } from '../../../lib/api/leads.service';

interface LeadContactCardProps {
  lead: DetailedLead;
}

export function LeadContactCard({ lead }: LeadContactCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">Contact Information</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-sm">
          <Mail className="w-4 h-4 text-secondary-foreground shrink-0" />
          <a href={`mailto:${lead.email}`} className="text-primary hover:underline truncate">
            {lead.email}
          </a>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Phone className="w-4 h-4 text-secondary-foreground shrink-0" />
          <span className="text-card-foreground truncate">{lead.phone || 'N/A'}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Building2 className="w-4 h-4 text-secondary-foreground shrink-0" />
          <span className="text-card-foreground truncate">{lead.company}</span>
        </div>
        {lead.website && (
          <div className="flex items-center gap-3 text-sm">
            <Globe className="w-4 h-4 text-secondary-foreground shrink-0" />
            <a href={lead.website} target="_blank" rel="noreferrer" className="text-primary hover:underline truncate">
              {lead.website.replace(/^https?:\/\//, '')}
            </a>
          </div>
        )}
        {lead.linkedin && (
          <div className="flex items-center gap-3 text-sm">
            <Link className="w-4 h-4 text-secondary-foreground shrink-0" />
            <a href={`https://${lead.linkedin}`} target="_blank" rel="noreferrer" className="text-primary hover:underline truncate">
              {lead.linkedin}
            </a>
          </div>
        )}
        {lead.location && (
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="w-4 h-4 text-secondary-foreground shrink-0" />
            <span className="text-card-foreground truncate">{lead.location}</span>
          </div>
        )}
      </div>
    </div>
  );
}



