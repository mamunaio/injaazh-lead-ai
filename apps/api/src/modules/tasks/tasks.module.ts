import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bullmq';
import { MailModule } from '../mail/mail.module';
import { UsersModule } from '../users/users.module';
import { TaskDocument, TaskSchema } from './infrastructure/schemas/task.schema';
import { TASK_REPOSITORY } from './domain/repositories/task.repository.interface';
import { TaskRepository } from './infrastructure/repositories/task.repository';
import { TasksService } from './application/services/tasks.service';
import { TasksController } from './presentation/tasks.controller';
import { TaskReminderProcessor } from './application/processors/task-reminder.processor';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TaskDocument.name, schema: TaskSchema },
    ]),
    BullModule.registerQueue({
      name: 'task-reminders',
      defaultJobOptions: {
        attempts: 3,
        backoff: { type: 'exponential', delay: 5000 },
      },
    }),
    MailModule,
    UsersModule,
  ],
  controllers: [TasksController],
  providers: [
    {
      provide: TASK_REPOSITORY,
      useClass: TaskRepository,
    },
    TasksService,
    TaskReminderProcessor,
  ],
  exports: [TasksService],
})
export class TasksModule {}
