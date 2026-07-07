import React from 'react';
import { LeadTask } from '../../../mocks/lead-details';
import { DataTable, ColumnDef } from '../../../components/ui/DataTable';
import clsx from 'clsx';
import { CheckCircle2, Circle } from 'lucide-react';

interface LeadTasksTableProps {
  tasks: LeadTask[];
}

export function LeadTasksTable({ tasks }: LeadTasksTableProps) {
  const columns: ColumnDef<LeadTask>[] = [
    {
      header: 'Task',
      accessor: (task) => (
        <div className="flex items-center gap-3">
          {task.status === 'completed' ? (
            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
          ) : (
            <Circle className="w-4 h-4 text-secondary-foreground shrink-0" />
          )}
          <span className={clsx(
            "font-medium",
            task.status === 'completed' ? "text-secondary-foreground line-through" : "text-foreground"
          )}>
            {task.title}
          </span>
        </div>
      )
    },
    {
      header: 'Due Date',
      accessor: (task) => (
        <span className="text-secondary-foreground">
          {new Date(task.dueDate).toLocaleDateString()}
        </span>
      )
    },
    {
      header: 'Status',
      accessor: (task) => (
        <span className={clsx(
          "text-[0.625rem] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider",
          task.status === 'completed' ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
        )}>
          {task.status}
        </span>
      )
    },
    {
      header: 'Assignee',
      accessor: (task) => (
        <span className="text-secondary-foreground">
          {task.assignee}
        </span>
      )
    }
  ];

  const emptyState = (
    <div className="flex flex-col items-center justify-center py-12 text-secondary-foreground border border-dashed border-border rounded-xl">
      <CheckCircle2 className="w-8 h-8 mb-3 opacity-50" />
      <p className="text-sm">No tasks for this lead.</p>
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-card-foreground">Tasks</h3>
        <button className="h-8 px-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
          Add Task
        </button>
      </div>
      
      {tasks.length === 0 ? emptyState : (
        <DataTable
          data={tasks}
          columns={columns}
          keyExtractor={(t) => t.id}
        />
      )}
    </div>
  );
}

