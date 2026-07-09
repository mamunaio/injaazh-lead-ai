import { useState, useEffect } from 'react';
import { CrmTask, TasksService, TaskStatus } from '../../../lib/api/tasks.service';
import { toast } from 'sonner';

export type ViewMode = 'list' | 'kanban' | 'calendar';

export function useTasks() {
  const [tasks, setTasks] = useState<CrmTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [filter, setFilter] = useState<'all' | 'today' | 'overdue' | 'completed'>('all');

  useEffect(() => {
    let mounted = true;
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const data = await TasksService.getTasks();
        if (mounted) setTasks(data);
      } catch (err) {
        console.error('Failed to fetch tasks', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchTasks();
    return () => { mounted = false; };
  }, []);

  const updateTaskStatus = async (id: string, status: TaskStatus) => {
    try {
      const updated = await TasksService.updateTask(id, { status });
      setTasks(prev => prev.map(t => t.id === id ? { ...t, status: updated.status } : t));
      toast.success(`Task marked as ${status}`);
    } catch (err) {
      console.error('Failed to update task status', err);
      toast.error('Failed to update task status');
    }
  };

  const getFilteredTasks = () => {
    const today = new Date().toISOString().split('T')[0];
    
    return tasks.filter(task => {
      const taskDate = task.dueDate ? task.dueDate.split('T')[0] : '';
      if (filter === 'completed') return task.status === 'Completed';
      if (filter === 'today') return taskDate === today && task.status !== 'Completed';
      if (filter === 'overdue') return taskDate < today && task.status !== 'Completed';
      return true; // all
    });
  };

  return {
    tasks: getFilteredTasks(),
    allTasks: tasks,
    loading,
    viewMode,
    setViewMode,
    filter,
    setFilter,
    updateTaskStatus
  };
}
