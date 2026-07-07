import { Injectable, Inject, NotFoundException, Logger } from '@nestjs/common';
import { Types } from 'mongoose';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { TASK_REPOSITORY } from '../../domain/repositories/task.repository.interface';
import type { ITaskRepository } from '../../domain/repositories/task.repository.interface';
import { TaskDocument } from '../../infrastructure/schemas/task.schema';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @Inject(TASK_REPOSITORY) private readonly taskRepo: ITaskRepository,
    @InjectQueue('task-reminders') private readonly remindersQueue: Queue,
  ) {}

  async createTask(
    organizationId: string,
    assignedTo: string,
    data: {
      title: string;
      description?: string;
      type?: string;
      dueDate: Date;
      leadId?: string;
      dealId?: string;
    },
  ) {
    this.logger.log(`Creating task for org ${organizationId}`);
    
    const { leadId, dealId, ...restData } = data;
    
    const created = await this.taskRepo.create({
      ...restData,
      assignedTo: new Types.ObjectId(assignedTo),
      organizationId: new Types.ObjectId(organizationId),
      ...(leadId && { leadId: new Types.ObjectId(leadId as string) }),
      ...(dealId && { dealId: new Types.ObjectId(dealId as string) }),
    } as any);

    await this.scheduleReminder(created as any);

    return created;
  }

  private async scheduleReminder(task: TaskDocument) {
    if (task.status === 'Completed' || !task.dueDate) return;

    // Schedule 1 hour before due date
    const delay = task.dueDate.getTime() - Date.now() - (60 * 60 * 1000);
    
    // Only schedule if it's in the future
    if (delay > 0) {
      this.logger.log(`Scheduling reminder for task ${task._id} in ${Math.round(delay / 60000)} minutes`);
      await this.remindersQueue.add('send-reminder', {
        taskId: task._id.toString(),
        organizationId: task.organizationId.toString(),
      }, {
        delay,
        jobId: `reminder-${task._id.toString()}-${task.dueDate.getTime()}`, // unique per due date so updates create new jobs
      });
    }
  }

  async getTasks(organizationId: string, filters: any = {}) {
    const query: any = { organizationId: new Types.ObjectId(organizationId) };
    
    if (filters.status) query.status = filters.status;
    if (filters.type) query.type = filters.type;
    if (filters.assignedTo) query.assignedTo = new Types.ObjectId(filters.assignedTo);
    if (filters.leadId) query.leadId = new Types.ObjectId(filters.leadId);
    if (filters.dealId) query.dealId = new Types.ObjectId(filters.dealId);

    return this.taskRepo.find(query);
  }

  async getTaskById(organizationId: string, taskId: string) {
    const task = await this.taskRepo.findById(taskId);
    if (!task || task.organizationId.toString() !== organizationId) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async updateTask(organizationId: string, taskId: string, data: Partial<TaskDocument>) {
    await this.getTaskById(organizationId, taskId); // Verify ownership
    
    // Ensure we don't accidentally update organizationId
    delete data.organizationId;
    
    const updated = await this.taskRepo.update(taskId, data);
    if (updated) {
        await this.scheduleReminder(updated);
    }
    return updated;
  }

  async deleteTask(organizationId: string, taskId: string) {
    await this.getTaskById(organizationId, taskId); // Verify ownership
    return this.taskRepo.delete(taskId);
  }
}
