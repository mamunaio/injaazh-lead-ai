import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class AiManagerService {
  constructor(
    @InjectQueue('ai-generation') private readonly aiQueue: Queue,
  ) {}

  async queueGeneration(organizationId: string, leadIds: string[]) {
    const jobs = leadIds.map(leadId => ({
      name: 'generate-outreach',
      data: {
        organizationId,
        leadId,
      },
      opts: {
        attempts: 3,
        backoff: { type: 'exponential', delay: 5000 },
      }
    }));

    await this.aiQueue.addBulk(jobs);
    return { queued: jobs.length };
  }
}
