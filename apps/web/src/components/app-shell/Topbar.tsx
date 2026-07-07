import React from 'react';
import { Search, Bell, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Topbar({ 
  onToggleAiDrawer 
}: { 
  onToggleAiDrawer: () => void;
}) {
  const { user } = useAuth();
  
  return (
    <header className="fixed top-0 left-0 right-0 h-[56px] bg-card border-b border-border z-50 flex items-center px-4 md:px-0">
      {/* Left Zone - 256px */}
      <div className="flex items-center w-[256px] shrink-0 md:pl-4">
        <div className="w-6 h-6 bg-primary flex items-center justify-center rounded-sm mr-2 text-white font-bold text-xs">
          IN
        </div>
        <span className="text-[0.9375rem] font-semibold text-primary-foreground">Injaazh</span>
      </div>

      {/* Center Zone */}
      <div className="flex-1 flex items-center">
        <div className="text-[0.875rem] text-secondary-foreground cursor-pointer flex items-center hidden md:flex">
          Acme Corp <span className="ml-1 text-xs">▾</span>
        </div>
        
        <div className="h-[20px] w-px bg-border mx-4 hidden md:block"></div>
        
        <div className="hidden md:flex items-center relative w-full max-w-[480px]">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search leads, campaigns..." 
            className="w-full h-8 bg-background border border-border rounded-md pl-8 pr-12 text-sm text-foreground focus:outline-none focus:border-ring transition-colors"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[0.6875rem] text-muted-foreground">
            ⌘K
          </div>
        </div>
        
        <button className="md:hidden ml-auto text-secondary-foreground hover:bg-accent hover:text-foreground p-1.5 rounded-md transition-colors">
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* Right Zone */}
      <div className="flex items-center gap-1.5 ml-4 shrink-0 md:pr-4">
        <button className="hidden md:flex w-7 h-7 items-center justify-center text-secondary-foreground hover:bg-accent hover:text-foreground rounded-md transition-colors">
          <span className="text-xs">⌘K</span>
        </button>
        
        <button 
          onClick={onToggleAiDrawer}
          className="flex items-center gap-1.5 h-7 px-2 text-violet hover:bg-accent rounded-md transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="text-[0.8125rem] font-medium hidden sm:inline-block">AI</span>
        </button>
        
        <button className="relative w-7 h-7 flex items-center justify-center text-secondary-foreground hover:bg-accent hover:text-foreground rounded-md transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-destructive rounded-full"></span>
        </button>
        
        <div className="w-px h-4 bg-border mx-1"></div>
        
        <button className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-xs font-medium text-white hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-background transition-all">
          {user?.email?.charAt(0).toUpperCase() || 'U'}
        </button>
      </div>
    </header>
  );
}
