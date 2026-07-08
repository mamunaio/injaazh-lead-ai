import React, { useEffect, useState } from 'react';
import { X, Search } from 'lucide-react';
import { Campaign, CampaignsService } from '../../../lib/api/campaigns.service';
import clsx from 'clsx';

interface CampaignPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (campaignId: string) => void;
  isLoading?: boolean;
}

export function CampaignPickerModal({ isOpen, onClose, onConfirm, isLoading }: CampaignPickerModalProps) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      CampaignsService.getCampaigns()
        .then((data) => {
          setCampaigns(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
      setSelectedId(null);
      setSearch('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredCampaigns = campaigns.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) && 
    (c.status === 'Active' || c.status === 'Draft' || c.status === 'Paused')
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-lg flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-[1rem] font-semibold text-foreground">Add to Campaign</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 border-b border-border bg-secondary/20">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-4 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto max-h-[300px] p-2">
          {loading ? (
            <div className="py-8 text-center text-sm text-muted-foreground">Loading campaigns...</div>
          ) : filteredCampaigns.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">No eligible campaigns found.</div>
          ) : (
            <div className="flex flex-col gap-1">
              {filteredCampaigns.map(camp => (
                <button
                  key={camp.id}
                  onClick={() => setSelectedId(camp.id)}
                  className={clsx(
                    "flex flex-col text-left px-3 py-2 rounded-md transition-colors",
                    selectedId === camp.id 
                      ? "bg-primary/10 border border-primary/30" 
                      : "hover:bg-accent border border-transparent"
                  )}
                >
                  <span className="text-sm font-medium text-foreground">{camp.name}</span>
                  <span className="text-xs text-secondary-foreground">{camp.status}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-border flex items-center justify-end gap-3 bg-secondary/10">
          <button
            onClick={onClose}
            className="h-9 px-4 text-sm font-medium text-secondary-foreground hover:text-foreground transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => selectedId && onConfirm(selectedId)}
            disabled={!selectedId || isLoading}
            className="h-9 px-4 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? 'Enrolling...' : 'Add to Campaign'}
          </button>
        </div>

      </div>
    </div>
  );
}
