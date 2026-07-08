import React from 'react';
import { EmailThread } from '../../../mocks/inbox';
import { ReplyComposer } from './ReplyComposer';
import { User, CornerUpLeft } from 'lucide-react';
import clsx from 'clsx';

interface ThreadViewProps {
  thread: EmailThread | null;
}

export function ThreadView({ thread }: ThreadViewProps) {
  if (!thread) {
    return (
      <div className="flex-1 h-full flex flex-col items-center justify-center text-secondary-foreground bg-background">
        <User className="w-12 h-12 mb-4 opacity-20" />
        <p>Select a thread to read</p>
      </div>
    );
  }

  return (
    <div className="flex-1 h-full flex flex-col bg-background relative overflow-hidden">
      <div className="flex-none p-6 border-b border-border bg-card">
        <h2 className="text-xl font-bold text-foreground mb-2">{thread.subject}</h2>
        <div className="flex items-center gap-2 text-sm text-secondary-foreground">
          <span className="font-semibold">{thread.leadName}</span>
          <span>({thread.leadCompany})</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-6 p-6">
          {thread.messages.map(message => (
            <div key={message.id} className={clsx("flex flex-col max-w-[85%]", message.isOutbound ? "ml-auto" : "mr-auto")}>
              <div className="flex items-center gap-2 mb-2 text-xs text-secondary-foreground px-1">
                <span className="font-semibold text-foreground">{message.sender.name}</span>
                <span>{message.timestamp}</span>
              </div>
              <div className={clsx(
                "p-4 rounded-xl text-sm leading-relaxed border whitespace-pre-wrap",
                message.isOutbound 
                  ? "bg-primary/10 border-primary/20 text-foreground" 
                  : "bg-card border-border text-foreground"
              )}>
                {message.body}
              </div>
              {message.isOutbound && message.status && (
                <div className="text-[10px] text-secondary-foreground mt-1 text-right px-1 capitalize">
                  {message.status}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="px-6 pb-2 text-sm font-semibold flex items-center gap-2 text-foreground">
          <CornerUpLeft className="w-4 h-4 text-primary" />
          Reply
        </div>
        <ReplyComposer onSend={(_text) => { /* Simulate reply */ }} />
      </div>
    </div>
  );
}
