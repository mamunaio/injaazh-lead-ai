import React from 'react';
import { VariableToolbar } from './VariableToolbar';

interface PromptEditorProps {
  content: string;
  onChange: (val: string) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  onInsertVariable: (variable: string) => void;
}

export function PromptEditor({ content, onChange, textareaRef, onInsertVariable }: PromptEditorProps) {
  return (
    <div className="flex flex-col h-full bg-card border border-border rounded-xl shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-secondary/5">
        <h3 className="font-semibold text-foreground text-sm">Template Body</h3>
      </div>
      <div className="flex-1 p-4 flex flex-col">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write your prompt here. Use variables like {firstName}..."
          className="flex-1 w-full bg-transparent text-sm text-foreground focus:outline-none resize-none leading-relaxed"
        />
        <VariableToolbar onInsert={onInsertVariable} />
      </div>
    </div>
  );
}
