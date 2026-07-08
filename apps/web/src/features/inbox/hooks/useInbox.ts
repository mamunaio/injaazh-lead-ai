import { useState } from 'react';
import { MOCK_THREADS, EmailThread } from '../../../mocks/inbox';

export function useInbox() {
  const [threads, setThreads] = useState<EmailThread[]>(MOCK_THREADS);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(MOCK_THREADS[0].id);

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
