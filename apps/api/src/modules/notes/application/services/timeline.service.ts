import { Injectable, Logger } from '@nestjs/common';
import { NotesService } from './notes.service';
import { TasksService } from '../../../tasks/application/services/tasks.service';

@Injectable()
export class TimelineService {
  private readonly logger = new Logger(TimelineService.name);

  constructor(
    private readonly notesService: NotesService,
    private readonly tasksService: TasksService,
  ) {}

  async getTimeline(organizationId: string, leadId?: string, dealId?: string) {
    this.logger.log(`Fetching timeline for org ${organizationId}`);
    
    const filters: any = {};
    if (leadId) filters.leadId = leadId;
    if (dealId) filters.dealId = dealId;

    // Fetch notes and tasks concurrently
    const [notes, tasks] = await Promise.all([
      this.notesService.getNotes(organizationId, filters),
      this.tasksService.getTasks(organizationId, filters),
    ]);

    const timeline = [];

    // Map Notes
    for (const note of notes) {
      timeline.push({
        type: 'Note',
        data: note,
        date: (note as any).createdAt, // Notes use createdAt
      });
    }

    // Map Tasks
    for (const task of tasks) {
      timeline.push({
        type: 'Task',
        data: task,
        date: task.dueDate, // Tasks use dueDate or createdAt depending on context, we'll use dueDate for the timeline activity date or maybe createdAt to show when it was added
        // Actually, for an activity feed, createdAt is when the activity was logged.
        // If it's a completed task, maybe updated_at.
        // Let's use createdAt for simplicity.
        createdAt: (task as any).createdAt,
      });
    }

    // Sort chronologically (newest first)
    timeline.sort((a, b) => {
      const dateA = new Date(a.date || a.createdAt).getTime();
      const dateB = new Date(b.date || b.createdAt).getTime();
      return dateB - dateA;
    });

    return timeline;
  }
}
