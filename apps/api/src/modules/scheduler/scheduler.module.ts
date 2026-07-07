import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { SchedulerProcessor } from './application/processors/scheduler.processor';
import { CampaignsModule } from '../campaigns/campaigns.module';
import { SequencesModule } from '../sequences/sequences.module';
import { EmailEngineModule } from '../email-engine/email-engine.module';
import { MailModule } from '../mail/mail.module';
import { LeadsModule } from '../leads/leads.module';
import { TrackingModule } from '../tracking/tracking.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'scheduler-dispatch',
      defaultJobOptions: {
        attempts: 3,
        backoff: { type: 'exponential', delay: 10000 },
      },
      // Note: GroupRateLimit is a Pro feature in BullMQ, but we can set simple queue level ratelimits on the Worker
    }),
    CampaignsModule,
    SequencesModule,
    EmailEngineModule,
    MailModule,
    LeadsModule,
    TrackingModule,
  ],
  providers: [SchedulerProcessor],
})
export class SchedulerModule {}
