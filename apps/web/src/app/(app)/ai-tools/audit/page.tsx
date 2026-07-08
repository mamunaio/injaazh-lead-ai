import React from 'react';
import { PageHeader } from '../../../../components/ui/PageHeader';

export default function AiToolsAuditPage() {
  return (
    <div className="w-full h-full flex flex-col p-6">
      <PageHeader title="AI Website Audit" breadcrumbs={[{ label: 'AI Tools', href: '/ai-tools' }, { label: 'Audit' }]} />
      <div className="flex-1 flex items-center justify-center text-muted-foreground mt-10 border border-dashed border-border rounded-lg">
        AI Website Audit (Coming Soon)
      </div>
    </div>
  );
}
