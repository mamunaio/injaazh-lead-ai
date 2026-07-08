import React from 'react';
import { CrmTask, TaskStatus } from '../../../lib/api/tasks.service';
import { CheckCircle2, Circle } from 'lucide-react';
import clsx from 'clsx';

interface TaskListViewProps {
  tasks: CrmTask[];
  onStatusChange: (id: string, status: TaskStatus) => void;
}

export function TaskListView({ tasks, onStatusChange }: TaskListViewProps) {
  if (tasks.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-secondary-foreground">
        No tasks found.
      </div>
    );
  }

  return (
    <div className="w-full bg-card rounded-lg border border-border overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="text-xs text-secondary-foreground uppercase bg-secondary/10 border-b border-border">
          <tr>
            <th className="px-4 py-3 font-medium w-10"></th>
            <th className="px-4 py-3 font-medium">Task</th>
            <th className="px-4 py-3 font-medium">Related To</th>
            <th className="px-4 py-3 font-medium">Due Date</th>
            <th className="px-4 py-3 font-medium">Assignee</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border text-foreground">
          {tasks.map(task => {
            const isDone = task.status === 'Completed';
            const isOverdue = task.dueDate < new Date().toISOString().split('T')[0] && !isDone;
            
            return (
              <tr key={task.id} className="hover:bg-secondary/5 transition-colors">
                <td className="px-4 py-3">
                  <button 
                    onClick={() => onStatusChange(task.id, isDone ? 'Pending' : 'Completed')}
                    className="text-secondary-foreground hover:text-primary transition-colors flex items-center justify-center"
                  >
                    {isDone ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5" />}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className={clsx("font-medium mb-0.5", isDone && "line-through text-secondary-foreground opacity-70")}>
                    {task.title}
                  </div>
                  <div className="text-xs text-secondary-foreground line-clamp-1">{task.description}</div>
                </td>
                <td className="px-4 py-3 text-secondary-foreground">{task.leadName || '-'}</td>
                <td className="px-4 py-3">
                  <span className={clsx(
                    "px-2 py-1 rounded text-xs font-semibold",
                    isDone ? "bg-secondary/20 text-secondary-foreground" :
                    isOverdue ? "bg-red-500/10 text-red-500 border border-red-500/20" : "text-foreground"
                  )}>
                    {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {task.assignedName && (
                      <>
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary uppercase">
                          {task.assignedName.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                        <span className="text-sm">{task.assignedName}</span>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
