import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

interface OrgProfileSectionProps {
  currentName: string;
  saveStatus: 'idle' | 'saving' | 'success';
  onSave: (name: string) => void;
}

export function OrgProfileSection({ currentName, saveStatus, onSave }: OrgProfileSectionProps) {
  const [name, setName] = useState(currentName);
  const [prevNameProp, setPrevNameProp] = useState(currentName);

  if (currentName !== prevNameProp) {
    setPrevNameProp(currentName);
    setName(currentName);
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && name !== currentName) {
      onSave(name.trim());
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-foreground">Organization Profile</h2>
        <p className="text-sm text-secondary-foreground">Update your company name and basic information.</p>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-4 max-w-md">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Organization Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-10 px-3 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="e.g. Acme Corp"
          />
        </div>

        <div className="flex items-center gap-4 mt-2">
          <button
            type="submit"
            disabled={saveStatus === 'saving' || name === currentName || !name.trim()}
            className={clsx(
              "px-4 py-2 text-sm font-semibold rounded-md transition-colors",
              (saveStatus === 'saving' || name === currentName || !name.trim())
                ? "bg-primary/50 text-primary-foreground/50 cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
          </button>
          {saveStatus === 'success' && (
            <span className="text-sm text-green-500 font-medium">Organization name updated ✓</span>
          )}
        </div>
      </form>
    </div>
  );
}
