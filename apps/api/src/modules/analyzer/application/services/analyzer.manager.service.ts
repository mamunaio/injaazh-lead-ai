import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class AnalyzerManagerService {
  constructor(
    @InjectQueue('analyzer') private readonly analyzerQueue: Queue,
  ) {}

  async queueAnalysis(organizationId: string, rawLeads: any[]) {
    const jobs = rawLeads.map(lead => ({
      name: 'analyze-task',
      data: {
        organizationId,
        rawLeadId: lead.id,
        rawLead: lead,
      },
      opts: {
        attempts: 3,
        backoff: { type: 'exponential', delay: 5000 },
      }
    }));

    await this.analyzerQueue.addBulk(jobs);
    return { queued: jobs.length };
  }
}
