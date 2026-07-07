import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Inject, Logger } from '@nestjs/common';
import { TASK_REPOSITORY } from '../../domain/repositories/task.repository.interface';
import type { ITaskRepository } from '../../domain/repositories/task.repository.interface';
import { UsersService } from '../../../users/application/services/users.service';
import { EmailDispatchService } from '../../../mail/application/services/email-dispatch.service';

@Processor('task-reminders', {
  concurrency: 5,
})
export class TaskReminderProcessor extends WorkerHost {
  private readonly logger = new Logger(TaskReminderProcessor.name);

  constructor(
    @Inject(TASK_REPOSITORY) private readonly taskRepo: ITaskRepository,
    private readonly usersService: UsersService,
    private readonly emailService: EmailDispatchService,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    const { taskId, organizationId } = job.data;
    this.logger.log(`Processing reminder for Task ${taskId}`);

    try {
      const task = await this.taskRepo.findById(taskId);
      if (!task || task.organizationId.toString() !== organizationId) {
        this.logger.warn(`Task ${taskId} not found or mismatch org. Aborting reminder.`);
        return;
      }

      if (task.status === 'Completed') {
        this.logger.log(`Task ${taskId} is already completed. Skipping reminder.`);
        return;
      }

      // Check if the due date has changed significantly (meaning a new job was scheduled)
      // The jobId contains the timestamp of the dueDate when the job was scheduled.
      const scheduledDueTime = parseInt(job.id!.split('-').pop()!);
      const currentDueTime = task.dueDate.getTime();
      
      // If the difference is more than a minute, assume it was rescheduled
      if (Math.abs(scheduledDueTime - currentDueTime) > 60000) {
          this.logger.log(`Task ${taskId} dueDate was updated. Skipping this old reminder.`);
          return;
      }

      const assignedUser = await this.usersService.findById(task.assignedTo.toString());
      if (!assignedUser || !assignedUser.email) {
        this.logger.warn(`Assigned user for task ${taskId} not found or has no email.`);
        return;
      }

      const subject = `Reminder: Task "${task.title}" is due soon`;
      const body = `
        <p>Hi ${assignedUser.firstName},</p>
        <p>This is an automated reminder that your task <strong>${task.title}</strong> is due at ${task.dueDate.toLocaleString()}.</p>
        <p>Type: ${task.type}</p>
        ${task.description ? `<p>Description: ${task.description}</p>` : ''}
        <br/>
        <p>Thanks,<br/>Injaazh CRM</p>
      `;

      this.logger.log(`Sending reminder email to ${assignedUser.email} for task ${taskId}`);
      
      // We will send the email via the user's default MailAccount if available, otherwise just use system config if we had one.
      // The EmailDispatchService handles finding the default account. 
      // If the user hasn't connected an email, we could gracefully ignore, or log an error.
      try {
        await this.emailService.sendEmail(
            organizationId, 
            assignedUser.email, 
            subject, 
            body,
            task.leadId?.toString() // optionally track it to the lead
        );
      } catch (e: any) {
        this.logger.warn(`Failed to send reminder email (maybe user hasn't connected an email account?): ${e.message}`);
      }

    } catch (error: any) {
      this.logger.error(`Failed to process task reminder job: ${error.message}`);
      throw error; // Let BullMQ retry if it's a transient error
    }
  }
}
