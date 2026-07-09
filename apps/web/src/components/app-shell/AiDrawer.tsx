import React from 'react';
import { X, Sparkles, Send } from 'lucide-react';
import clsx from 'clsx';

export function AiDrawer({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void;
}) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <div 
        className={clsx(
          "fixed top-[56px] bottom-0 right-0 bg-card border-l border-border z-40 flex flex-col transition-transform duration-300 ease-in-out w-full lg:w-[400px]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="h-14 border-b border-border flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-2 text-violet">
            <Sparkles className="w-4 h-4" />
            <span className="font-semibold text-sm">AI Assistant</span>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          <div className="bg-secondary rounded-lg p-3 text-sm text-foreground">
            Hi! I&apos;m your Injaazh AI assistant. How can I help you today?
          </div>
        </div>
        
        <div className="p-4 border-t border-border shrink-0 bg-background/50">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Ask AI to draft an email..."
              className="w-full h-10 bg-background border border-border rounded-md pl-3 pr-10 text-sm text-foreground focus:outline-none focus:border-violet transition-colors"
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-violet hover:bg-violet-subtle rounded-md transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
