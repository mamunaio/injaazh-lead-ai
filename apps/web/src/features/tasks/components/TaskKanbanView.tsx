import React from 'react';
import { CrmTask, TaskStatus } from '../../../lib/api/tasks.service';
import { TaskCard } from './TaskCard';

interface TaskKanbanViewProps {
  tasks: CrmTask[];
  onStatusChange: (id: string, status: TaskStatus) => void;
}

const COLUMNS: { id: TaskStatus; label: string }[] = [
  { id: 'Pending', label: 'To Do' },
  { id: 'In Progress', label: 'In Progress' },
  { id: 'Completed', label: 'Completed' }
];

export function TaskKanbanView({ tasks, onStatusChange }: TaskKanbanViewProps) {
  return (
    <div className="w-full h-full flex gap-6 overflow-x-auto pb-4">
      {COLUMNS.map(column => {
        const columnTasks = tasks.filter(t => t.status === column.id);
        
        return (
          <div key={column.id} className="flex-1 min-w-[300px] flex flex-col bg-secondary/5 rounded-xl border border-border overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between bg-card">
              <h3 className="font-bold text-foreground">{column.label}</h3>
              <span className="bg-secondary/20 text-secondary-foreground px-2 py-0.5 rounded text-xs font-semibold">
                {columnTasks.length}
              </span>
            </div>
            
            <div className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto min-h-[200px]">
              {columnTasks.map(task => (
                <TaskCard key={task.id} task={task} onStatusChange={onStatusChange} />
              ))}
              {columnTasks.length === 0 && (
                <div className="h-24 border-2 border-dashed border-border rounded-lg flex items-center justify-center text-secondary-foreground text-sm">
                  Drop tasks here
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
