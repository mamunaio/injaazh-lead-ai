import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class EnrichmentManagerService {
  private readonly logger = new Logger(EnrichmentManagerService.name);

  constructor(
    @InjectQueue('enrichment') private readonly enrichmentQueue: Queue,
  ) {}

  async queueEnrichment(organizationId: string, leadId: string, initialDomain?: string, initialEmail?: string) {
    const job = await this.enrichmentQueue.add('enrich-lead', {
      organizationId,
      leadId,
      initialDomain,
      initialEmail,
    }, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 5000 },
    });

    this.logger.log(`Queued enrichment job ${job.id} for lead ${leadId}`);
    return { jobId: job.id, status: 'Queued' };
  }
}
