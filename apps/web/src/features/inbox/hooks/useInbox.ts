import { useState, useEffect } from 'react';
import { InboxService, EmailThread } from '../../../lib/api/inbox.service';

export function useInbox() {
  const [threads, setThreads] = useState<EmailThread[]>([]);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);


  useEffect(() => {
    InboxService.getThreads().then(data => {
      setThreads(data);
      if (data.length > 0) setSelectedThreadId(data[0].id);
    });
  }, []);

  const selectedThread = threads.find(t => t.id === selectedThreadId) || null;

  const updateThreadAssignee = (threadId: string, assignee: string | null) => {
    setThreads(prev => prev.map(t => t.id === threadId ? { ...t, assignee } : t));
  };

  const addNoteToThread = (threadId: string, text: string) => {
    setThreads(prev => prev.map(t => {
      if (t.id === threadId) {
        return {
          ...t,
          notes: [...t.notes, { id: `n_${Date.now()}`, author: 'You', text, timestamp: 'Just now' }]
        };
      }
      return t;
    }));
  };

  return {
    threads,
    selectedThreadId,
    setSelectedThreadId,
    selectedThread,
    updateThreadAssignee,
    addNoteToThread
  };
}
