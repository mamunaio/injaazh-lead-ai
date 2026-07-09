import React from 'react';
import { Loader2 } from 'lucide-react';

interface PageLoaderProps {
  message?: string;
}

export function PageLoader({ message = "Loading..." }: PageLoaderProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-secondary-foreground">
      <Loader2 className="w-8 h-8 animate-spin mb-4" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
