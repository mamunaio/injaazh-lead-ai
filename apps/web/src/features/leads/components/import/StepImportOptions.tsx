import React, { useState } from 'react';

import { Plus } from 'lucide-react';

interface StepImportOptionsProps {
  defaultStatus: string;
  setDefaultStatus: (status: string) => void;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  updateExisting: boolean;
  setUpdateExisting: (val: boolean) => void;
  rowCount: number;
}

export function StepImportOptions({
  defaultStatus,
  setDefaultStatus,
  tags,
  setTags,
  updateExisting,
  setUpdateExisting,
  rowCount
}: StepImportOptionsProps) {
  const [newTag, setNewTag] = useState('');

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold text-card-foreground mb-2">Import Options</h2>
      <p className="text-sm text-secondary-foreground mb-8">
        Configure how the imported leads should be handled in the system.
      </p>

      <div className="space-y-6 max-w-2xl">
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Default Status</label>
          <select 
            className="w-full sm:w-1/2 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={defaultStatus}
            onChange={(e) => setDefaultStatus(e.target.value)}
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
          </select>
          <p className="text-xs text-secondary-foreground">This status will be applied to all imported leads.</p>
        </div>

        <div className="space-y-3 border-t border-border pt-6">
          <label className="text-sm font-medium text-foreground">Tags to Apply</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 rounded-sm bg-secondary text-secondary-foreground text-[0.75rem] font-medium border border-border">
                {tag}
                <button 
                  onClick={() => removeTag(tag)}
                  className="w-3.5 h-3.5 inline-flex items-center justify-center rounded-sm hover:bg-foreground/10 text-secondary-foreground"
                >
                  <Plus className="w-3 h-3 rotate-45" />
                </button>
              </span>
            ))}
          </div>
          <div className="relative w-full sm:w-1/2">
            <Plus className="absolute left-3 top-2.5 h-4 w-4 text-secondary-foreground" />
            <input 
              type="text" 
              placeholder="Type a tag and press Enter" 
              className="w-full h-10 rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleAddTag}
            />
          </div>
          <p className="text-xs text-secondary-foreground">These tags will be added to every imported lead.</p>
        </div>

        <div className="space-y-3 border-t border-border pt-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-input bg-background text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" 
              checked={updateExisting}
              onChange={(e) => setUpdateExisting(e.target.checked)}
            />
            <span className="text-sm font-medium text-foreground">Update existing leads if email matches</span>
          </label>
          <p className="text-xs text-secondary-foreground ml-7">
            If a lead with the same email already exists, their profile will be updated with the new data instead of creating a duplicate.
          </p>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <h4 className="font-medium text-primary-foreground mb-1">Ready to Import</h4>
        <p className="text-sm text-secondary-foreground">
          You are about to import <strong>{rowCount} leads</strong> into your CRM.
        </p>
      </div>
    </div>
  );
}
