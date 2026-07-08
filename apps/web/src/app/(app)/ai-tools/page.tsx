import React from 'react';
import { PageHeader } from '../../../components/ui/PageHeader';

export default function AiToolsPage() {
  return (
    <div className="w-full h-full flex flex-col p-6">
      <PageHeader title="AI Tools" breadcrumbs={[{ label: 'AI Tools' }]} />
      <div className="flex-1 flex items-center justify-center text-muted-foreground mt-10 border border-dashed border-border rounded-lg">
        AI Tools Dashboard (Coming Soon)
      </div>
    </div>
  );
}
