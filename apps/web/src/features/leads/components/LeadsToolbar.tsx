import React from 'react';
import { Search, Filter, Columns, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { LeadStatus } from '../../../lib/api/leads.service';

interface LeadsToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedStatus: LeadStatus | 'All';
  setSelectedStatus: (status: LeadStatus | 'All') => void;
}

const TABS: (LeadStatus | 'All')[] = ['All', 'New', 'Contacted', 'Qualified', 'Won', 'Lost'];

export function LeadsToolbar({
  searchQuery,
  setSearchQuery,
  selectedStatus,
  setSelectedStatus
}: LeadsToolbarProps) {
  return (
    <div className="flex flex-col gap-4 mb-4">
      {/* Tabs Row */}
      <div className="flex items-center gap-2 border-b border-border pb-px overflow-x-auto no-scrollbar">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedStatus(tab)}
            className={clsx(
              "px-4 py-2 text-[0.875rem] font-medium whitespace-nowrap border-b-2 transition-colors",
              selectedStatus === tab 
                ? "border-primary text-primary-foreground" 
                : "border-transparent text-secondary-foreground hover:text-foreground hover:border-border"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Toolbar Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search leads by name, email, or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 bg-card border border-border rounded-md pl-9 pr-3 text-[0.875rem] text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <select className="h-9 appearance-none bg-card border border-border rounded-md pl-8 pr-8 text-[0.875rem] text-foreground focus:outline-none focus:border-primary cursor-pointer">
              <option value="">All Tags</option>
              <option value="Enterprise">Enterprise</option>
              <option value="SMB">SMB</option>
              <option value="SaaS">SaaS</option>
            </select>
            <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          </div>

          <div className="relative">
            <select className="h-9 appearance-none bg-card border border-border rounded-md pl-3 pr-8 text-[0.875rem] text-foreground focus:outline-none focus:border-primary cursor-pointer">
              <option value="">Any Score</option>
              <option value="high">High (&gt;85)</option>
              <option value="medium">Medium (60-85)</option>
              <option value="low">Low (&lt;60)</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          </div>

          <button className="h-9 px-3 inline-flex items-center justify-center gap-2 bg-secondary hover:bg-accent text-foreground text-[0.875rem] font-medium rounded-md border border-border transition-colors ml-auto sm:ml-2">
            <Columns className="w-4 h-4" />
            <span className="hidden sm:inline">Columns</span>
          </button>
        </div>
      </div>
    </div>
  );
}
