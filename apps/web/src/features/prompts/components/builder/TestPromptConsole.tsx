import React from 'react';
import { Play, Loader2, Sparkles } from 'lucide-react';

interface TestPromptConsoleProps {
  onRunTest: () => void;
  isTesting: boolean;
  testResult: string | null;
}

export function TestPromptConsole({ onRunTest, isTesting, testResult }: TestPromptConsoleProps) {
  return (
    <div className="flex flex-col h-full bg-card border border-border rounded-xl shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-secondary/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-foreground text-sm">Test Output</h3>
        </div>
        
        <button
          onClick={onRunTest}
          disabled={isTesting}
          className="h-7 px-3 rounded text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
        >
          {isTesting ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <Play className="w-3 h-3 fill-current" />
          )}
          Run Test
        </button>
      </div>
      
      <div className="flex-1 p-4 bg-[#0A0A0A] text-gray-300 font-mono text-xs overflow-y-auto whitespace-pre-wrap">
        {isTesting ? (
          <div className="flex items-center justify-center h-full opacity-50">
            Generating AI response...
          </div>
        ) : testResult ? (
          <div className="text-green-400">
            {testResult}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full opacity-30 gap-2">
            <Sparkles className="w-8 h-8" />
            <span>Click &quot;Run Test&quot; to see AI generation</span>
          </div>
        )}
      </div>
    </div>
  );
}
