import React from 'react';
import { EmailThread } from '../../../lib/api/inbox.service';
import clsx from 'clsx';
import { Search, Inbox as InboxIcon } from 'lucide-react';

interface ThreadListProps {
  threads: EmailThread[];
  selectedThreadId: string | null;
  onSelectThread: (id: string) => void;
}

export function ThreadList({ threads, selectedThreadId, onSelectThread }: ThreadListProps) {
  return (
    <div className="w-80 h-full border-r border-border bg-card flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <InboxIcon className="w-5 h-5 text-primary" />
            Global Inbox
          </h2>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary-foreground" />
          <input
            type="text"
            placeholder="Search emails..."
            className="w-full h-9 pl-9 pr-3 bg-secondary/10 border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {threads.map(thread => (
          <button
            key={thread.id}
            onClick={() => onSelectThread(thread.id)}
            className={clsx(
              "w-full text-left p-4 border-b border-border transition-colors hover:bg-secondary/10",
              selectedThreadId === thread.id ? "bg-secondary/10 border-l-2 border-l-primary" : "border-l-2 border-l-transparent",
              thread.unread && selectedThreadId !== thread.id && "bg-primary/5"
            )}
          >
            <div className="flex justify-between items-start mb-1">
              <span className={clsx("text-sm truncate font-semibold", thread.unread ? "text-foreground" : "text-secondary-foreground")}>
                {thread.leadName}
              </span>
              <span className="text-xs text-secondary-foreground whitespace-nowrap ml-2">
                {thread.lastMessageAt}
              </span>
            </div>
            <div className={clsx("text-sm truncate mb-1.5", thread.unread ? "text-foreground font-medium" : "text-secondary-foreground")}>
              {thread.subject}
            </div>
            <div className="text-xs text-secondary-foreground truncate">
              {thread.leadCompany}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
