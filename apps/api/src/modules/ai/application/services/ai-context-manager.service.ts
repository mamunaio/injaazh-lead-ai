import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class AiContextManagerService {
  private readonly logger = new Logger(AiContextManagerService.name);

  constructor(
    @InjectQueue('ai-context') private readonly aiContextQueue: Queue,
  ) {}

  async queueContextGeneration(organizationId: string, leadId: string, outreachGoal: string = 'Cold Email') {
    const job = await this.aiContextQueue.add('build-ai-context', {
      organizationId,
      leadId,
      outreachGoal,
    }, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 5000 },
    });

    this.logger.log(`Queued AI Context job ${job.id} for lead ${leadId}`);
    return { jobId: job.id, status: 'Queued' };
  }
}
