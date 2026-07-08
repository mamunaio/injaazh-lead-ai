import React, { useState } from 'react';
import { Sparkles, Send, Paperclip } from 'lucide-react';
import clsx from 'clsx';

interface ReplyComposerProps {
  onSend: (text: string) => void;
}

export function ReplyComposer({ onSend }: ReplyComposerProps) {
  const [text, setText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setText("Hi there,\n\nThanks for getting back to me. Thursday at 10 AM EST works perfectly. I will send over a calendar invite shortly.\n\nLooking forward to speaking with you!\n\nBest,\nAlex");
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm m-6 mt-2 flex flex-col overflow-hidden">
      <div className="px-4 py-2 border-b border-border flex gap-2">
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className={clsx(
            "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border transition-all",
            isGenerating 
              ? "bg-secondary/20 text-secondary-foreground border-transparent cursor-not-allowed opacity-70"
              : "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20"
          )}
        >
          <Sparkles className="w-3.5 h-3.5" />
          {isGenerating ? 'Generating...' : 'AI Suggestion'}
        </button>
      </div>
      
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your reply here..."
        className="w-full min-h-[150px] p-4 bg-transparent text-sm text-foreground focus:outline-none resize-none"
      />

      <div className="px-4 py-3 border-t border-border bg-secondary/5 flex items-center justify-between">
        <button className="p-1.5 text-secondary-foreground hover:bg-secondary/20 rounded">
          <Paperclip className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            if (text.trim()) {
              onSend(text);
              setText('');
            }
          }}
          disabled={!text.trim()}
          className="flex items-center gap-2 px-4 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Send
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
