import React from 'react';
import { useInbox } from '../hooks/useInbox';
import { ThreadList } from './ThreadList';
import { ThreadView } from './ThreadView';
import { ThreadSidebar } from './ThreadSidebar';

export function InboxLayout() {
  const { 
    threads, 
    selectedThreadId, 
    setSelectedThreadId, 
    selectedThread,
    updateThreadAssignee,
    addNoteToThread
  } = useInbox();

  return (
    <div className="w-full h-full flex overflow-hidden bg-background">
      <ThreadList
        threads={threads}
        selectedThreadId={selectedThreadId}
        onSelectThread={setSelectedThreadId}
      />
      
      <ThreadView thread={selectedThread} />

      {selectedThread && (
        <ThreadSidebar 
          thread={selectedThread} 
          onAssign={(userId) => updateThreadAssignee(selectedThread.id, userId)}
          onAddNote={(text) => addNoteToThread(selectedThread.id, text)}
        />
      )}
    </div>
  );
}
