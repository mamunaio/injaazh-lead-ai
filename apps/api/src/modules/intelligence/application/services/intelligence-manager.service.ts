import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class IntelligenceManagerService {
  private readonly logger = new Logger(IntelligenceManagerService.name);

  constructor(
    @InjectQueue('intelligence') private readonly intelligenceQueue: Queue,
  ) {}

  async queueIntelligence(organizationId: string, leadId: string, rawLead: any, rawEnrichmentData: any) {
    const job = await this.intelligenceQueue.add('generate-intelligence', {
      organizationId,
      leadId,
      rawLead,
      rawEnrichmentData,
    }, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 5000 },
    });

    this.logger.log(`Queued intelligence job ${job.id} for lead ${leadId}`);
    return { jobId: job.id, status: 'Queued' };
  }
}
