import React from 'react';
import { Loader2 } from 'lucide-react';

interface ImportProgressProps {
  progress: number;
}

export function ImportProgress({ progress }: ImportProgressProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center max-w-md mx-auto">
      <Loader2 className="w-16 h-16 text-primary animate-spin mb-6" />
      <h2 className="text-2xl font-bold text-foreground mb-2">Importing Leads...</h2>
      <p className="text-sm text-secondary-foreground mb-8">
        Please don&apos;t close this window. We are processing your file and importing the leads into your CRM.
      </p>
      
      <div className="w-full">
        <div className="flex items-center justify-between text-sm mb-2 font-medium">
          <span className="text-foreground">Progress</span>
          <span className="text-primary">{progress}%</span>
        </div>
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>
    </div>
  );
}
