import React from 'react';
import { useTasks } from '../hooks/useTasks';
import { TaskListView } from './TaskListView';
import { TaskKanbanView } from './TaskKanbanView';
import { TaskCalendarView } from './TaskCalendarView';
import { LayoutList, KanbanSquare, CalendarDays, Plus } from 'lucide-react';
import clsx from 'clsx';

export function TasksLayout() {
  const { 
    tasks, 
    viewMode, 
    setViewMode, 
    filter, 
    setFilter, 
    updateTaskStatus 
  } = useTasks();

  return (
    <div className="w-full h-full flex flex-col bg-background p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tasks</h1>
          <p className="text-sm text-secondary-foreground mt-1">Manage your pipeline tasks and follow-ups.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </div>

      <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
        <div className="flex gap-2">
          {(['all', 'today', 'overdue', 'completed'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={clsx(
                "px-4 py-1.5 rounded-full text-sm font-semibold capitalize transition-colors",
                filter === f 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary/10 text-secondary-foreground hover:bg-secondary/20"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 bg-secondary/10 p-1 rounded-md border border-border">
          <button
            onClick={() => setViewMode('list')}
            className={clsx("p-1.5 rounded", viewMode === 'list' ? "bg-card text-primary shadow-sm" : "text-secondary-foreground hover:text-foreground")}
            title="List View"
          >
            <LayoutList className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('kanban')}
            className={clsx("p-1.5 rounded", viewMode === 'kanban' ? "bg-card text-primary shadow-sm" : "text-secondary-foreground hover:text-foreground")}
            title="Kanban View"
          >
            <KanbanSquare className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={clsx("p-1.5 rounded", viewMode === 'calendar' ? "bg-card text-primary shadow-sm" : "text-secondary-foreground hover:text-foreground")}
            title="Calendar View"
          >
            <CalendarDays className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {viewMode === 'list' && <TaskListView tasks={tasks} onStatusChange={updateTaskStatus} />}
        {viewMode === 'kanban' && <TaskKanbanView tasks={tasks} onStatusChange={updateTaskStatus} />}
        {viewMode === 'calendar' && <TaskCalendarView tasks={tasks} onStatusChange={updateTaskStatus} />}
      </div>
    </div>
  );
}
