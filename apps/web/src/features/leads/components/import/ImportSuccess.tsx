import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface ImportSuccessProps {
  result: { total: number; success: number; failed: number } | null;
  onReset: () => void;
}

export function ImportSuccess({ result, onReset }: ImportSuccessProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center max-w-md mx-auto animate-in fade-in zoom-in duration-500">
      <CheckCircle2 className="w-20 h-20 text-green-500 mb-6" />
      <h2 className="text-2xl font-bold text-foreground mb-2">Import Complete!</h2>
      <p className="text-secondary-foreground mb-8 text-lg">
        <strong className="text-foreground">{result?.success || 0}</strong> leads were successfully imported.
      </p>
      
      {result && result.failed > 0 && (
        <div className="w-full bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-8 text-sm text-left">
          <p className="text-yellow-600 font-medium mb-1">Partial Import Warning</p>
          <p className="text-yellow-600/80">
            {result.failed} rows failed to import. Download the error log to see what went wrong.
          </p>
          <button className="mt-3 text-yellow-600 font-medium hover:underline">
            Download Error Log
          </button>
        </div>
      )}

      <div className="flex flex-col w-full gap-3">
        <Link 
          href="/leads"
          className="h-10 w-full rounded-md bg-primary text-primary-foreground font-medium text-sm flex items-center justify-center hover:bg-primary/90 transition-colors"
        >
          View Imported Leads
        </Link>
        <button 
          onClick={onReset}
          className="h-10 w-full rounded-md bg-secondary text-secondary-foreground font-medium text-sm hover:bg-secondary/80 transition-colors"
        >
          Import Another File
        </button>
      </div>
    </div>
  );
}
