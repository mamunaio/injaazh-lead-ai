import React from 'react';
import { CrmTask, TaskStatus } from '../../../lib/api/tasks.service';
import { TaskCard } from './TaskCard';

interface TaskCalendarViewProps {
  tasks: CrmTask[];
  onStatusChange: (id: string, status: TaskStatus) => void;
}

export function TaskCalendarView({ tasks, onStatusChange }: TaskCalendarViewProps) {
  // Simple view: group tasks by their due date strings
  const groupedTasks = tasks.reduce((acc, task) => {
    const date = task.dueDate;
    if (!acc[date]) acc[date] = [];
    acc[date].push(task);
    return acc;
  }, {} as Record<string, CrmTask[]>);

  // Sort dates
  const sortedDates = Object.keys(groupedTasks).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  if (tasks.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-secondary-foreground">
        No tasks found.
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto pr-2">
      <div className="flex flex-col gap-8">
        {sortedDates.map(dateStr => {
          const dateTasks = groupedTasks[dateStr];
          const isOverdue = dateStr < new Date().toISOString().split('T')[0];
          const isToday = dateStr === new Date().toISOString().split('T')[0];
          
          let dateLabel = new Date(dateStr).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
          if (isToday) dateLabel = `Today - ${dateLabel}`;
          
          return (
            <div key={dateStr} className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <h3 className="font-bold text-foreground text-lg">{dateLabel}</h3>
                {isOverdue && <span className="px-2 py-0.5 bg-red-500/10 text-red-500 text-xs font-semibold rounded border border-red-500/20">Overdue</span>}
                <div className="flex-1 h-px bg-border"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {dateTasks.map(task => (
                  <TaskCard key={task.id} task={task} onStatusChange={onStatusChange} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
