import React from 'react';
import { TagPill } from '../../../components/ui/TagPill';
import { Plus } from 'lucide-react';

interface LeadTagsCardProps {
  tags: string[];
}

export function LeadTagsCard({ tags }: LeadTagsCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <TagPill key={idx} tag={tag} />
        ))}
        <button className="h-[22px] px-2 rounded-full border border-dashed border-border flex items-center gap-1 text-[0.625rem] font-medium text-secondary-foreground hover:border-primary hover:text-primary transition-colors">
          <Plus className="w-3 h-3" />
          Add Tag
        </button>
      </div>
    </div>
  );
}


