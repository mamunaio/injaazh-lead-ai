import React from 'react';
import { CrmTask, TaskStatus } from '../../../lib/api/tasks.service';
import { Calendar, CheckCircle2, Circle } from 'lucide-react';
import clsx from 'clsx';

interface TaskCardProps {
  task: CrmTask;
  onStatusChange?: (id: string, status: TaskStatus) => void;
}

export function TaskCard({ task, onStatusChange }: TaskCardProps) {
  const isDone = task.status === 'Completed';

  const toggleStatus = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onStatusChange) {
      onStatusChange(task.id, isDone ? 'Pending' : 'Completed');
    }
  };

  return (
    <div className={clsx(
      "bg-card border border-border rounded-lg p-4 shadow-sm hover:border-primary/50 transition-colors cursor-grab active:cursor-grabbing",
      isDone && "opacity-60"
    )}>
      <div className="flex items-start gap-3">
        <button onClick={toggleStatus} className="mt-0.5 text-secondary-foreground hover:text-primary transition-colors flex-shrink-0">
          {isDone ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5" />}
        </button>
        
        <div className="flex-1 min-w-0">
          <h4 className={clsx("text-sm font-semibold truncate mb-1 text-foreground", isDone && "line-through")}>
            {task.title}
          </h4>
          <p className="text-xs text-secondary-foreground line-clamp-2 mb-3">
            {task.description}
          </p>
          
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-4">
              <div className={clsx(
                "flex items-center gap-1.5 text-xs font-medium",
                isDone ? "text-secondary-foreground" : 
                task.dueDate < new Date().toISOString().split('T')[0] ? "text-red-500" : "text-secondary-foreground"
              )}>
                <Calendar className="w-3.5 h-3.5" />
                {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </div>
              
              {task.leadName && (
                <div className="text-xs text-secondary-foreground truncate max-w-[100px]">
                  {task.leadName}
                </div>
              )}
            </div>

            {task.assignedName && (
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary uppercase" title={task.assignedName}>
                {task.assignedName.split(' ').map((n: string) => n[0]).join('')}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
