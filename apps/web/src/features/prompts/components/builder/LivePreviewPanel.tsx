import React from 'react';
import { TestLead } from '../../../../mocks/test-leads';
import { Eye } from 'lucide-react';

interface LivePreviewPanelProps {
  content: string;
  testLeads: TestLead[];
  selectedLeadId: string;
  onSelectLead: (id: string) => void;
}

export function LivePreviewPanel({ content, testLeads, selectedLeadId, onSelectLead }: LivePreviewPanelProps) {
  const lead = testLeads.find(l => l.id === selectedLeadId);
  
  let rendered = content;
  if (lead) {
    rendered = rendered.replace(/{firstName}/g, lead.firstName);
    rendered = rendered.replace(/{lastName}/g, lead.lastName);
    rendered = rendered.replace(/{company}/g, lead.company);
    rendered = rendered.replace(/{jobTitle}/g, lead.jobTitle);
  }

  return (
    <div className="flex flex-col h-full bg-card border border-border rounded-xl shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-secondary/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-secondary-foreground" />
          <h3 className="font-semibold text-foreground text-sm">Live Preview</h3>
        </div>
        
        <select
          value={selectedLeadId}
          onChange={(e) => onSelectLead(e.target.value)}
          className="h-7 text-xs bg-background border border-border rounded px-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        >
          {testLeads.map(l => (
            <option key={l.id} value={l.id}>{l.firstName} {l.lastName} ({l.company})</option>
          ))}
        </select>
      </div>
      
      <div className="flex-1 p-4 bg-secondary/5 overflow-y-auto whitespace-pre-wrap text-sm text-foreground leading-relaxed">
        {rendered || (
          <span className="text-secondary-foreground italic">Your preview will appear here...</span>
        )}
      </div>
    </div>
  );
}
