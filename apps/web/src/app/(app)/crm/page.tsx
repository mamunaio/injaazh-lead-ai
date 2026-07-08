import React from 'react';
import { PageHeader } from '../../../components/ui/PageHeader';
import Link from 'next/link';

export default function CrmPage() {
  return (
    <div className="w-full h-full flex flex-col p-6">
      <PageHeader title="CRM" breadcrumbs={[{ label: 'CRM' }]} />
      <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground mt-10 border border-dashed border-border rounded-lg gap-4">
        <div>CRM Dashboard (Coming Soon)</div>
        <Link href="/crm/tasks" className="text-primary hover:underline">
          Go to Tasks
        </Link>
      </div>
    </div>
  );
}
