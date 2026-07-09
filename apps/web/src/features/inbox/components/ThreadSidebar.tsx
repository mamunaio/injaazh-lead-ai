import React, { useState, useEffect } from 'react';
import { EmailThread, InboxService, TeamMember } from '../../../lib/api/inbox.service';
import { Tag, UserPlus, StickyNote, Plus } from 'lucide-react';
import clsx from 'clsx';

interface ThreadSidebarProps {
  thread: EmailThread;
  onAssign: (userId: string | null) => void;
  onAddNote: (text: string) => void;
}

export function ThreadSidebar({ thread, onAssign, onAddNote }: ThreadSidebarProps) {
  const [newNote, setNewNote] = useState('');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    InboxService.getTeamMembers().then(setTeamMembers);
  }, []);
  
  return (
    <div className="w-[300px] h-full border-l border-border bg-card overflow-y-auto flex flex-col">
      <div className="p-5 border-b border-border">
        <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2 uppercase tracking-wider">
          <Tag className="w-4 h-4 text-secondary-foreground" />
          Labels
        </h3>
        <div className="flex flex-wrap gap-2">
          {thread.labels.map(label => (
            <span key={label.id} className={clsx("px-2.5 py-1 rounded text-xs font-semibold border", label.color)}>
              {label.name}
            </span>
          ))}
          <button className="px-2.5 py-1 rounded text-xs font-semibold border border-dashed border-border text-secondary-foreground hover:bg-secondary/10 flex items-center gap-1">
            <Plus className="w-3 h-3" /> Add
          </button>
        </div>
      </div>

      <div className="p-5 border-b border-border">
        <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2 uppercase tracking-wider">
          <UserPlus className="w-4 h-4 text-secondary-foreground" />
          Assignee
        </h3>
        <select
          value={thread.assignee || ''}
          onChange={(e) => onAssign(e.target.value || null)}
          className="w-full h-9 px-3 bg-secondary/10 border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="">Unassigned</option>
          {MOCK_TEAM_MEMBERS.map(member => (
            <option key={member.id} value={member.id}>{member.name}</option>
          ))}
        </select>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2 uppercase tracking-wider">
          <StickyNote className="w-4 h-4 text-secondary-foreground" />
          Internal Notes
        </h3>
        
        <div className="flex-1 flex flex-col gap-3 mb-4">
          {thread.notes.length === 0 ? (
            <p className="text-xs text-secondary-foreground italic text-center mt-4">No notes yet.</p>
          ) : (
            thread.notes.map(note => (
              <div key={note.id} className="bg-secondary/10 rounded-lg p-3 text-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-foreground text-xs">{note.author}</span>
                  <span className="text-[10px] text-secondary-foreground">{note.timestamp}</span>
                </div>
                <p className="text-secondary-foreground text-xs">{note.text}</p>
              </div>
            ))
          )}
        </div>

        <div className="mt-auto">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add an internal note..."
            className="w-full h-20 p-3 text-sm bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none mb-2"
          />
          <button
            onClick={() => {
              if (newNote.trim()) {
                onAddNote(newNote);
                setNewNote('');
              }
            }}
            disabled={!newNote.trim()}
            className="w-full h-8 bg-secondary/20 hover:bg-secondary/40 text-foreground text-xs font-semibold rounded transition-colors disabled:opacity-50"
          >
            Add Note
          </button>
        </div>
      </div>
    </div>
  );
}
