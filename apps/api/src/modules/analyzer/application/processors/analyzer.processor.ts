import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Inject, Logger } from '@nestjs/common';
import { AiAnalysisService } from '../services/ai-analysis.service';
import type { IRawLeadRepository } from '../../../scraper/domain/repositories/raw-lead.repository.interface';
import { RAW_LEAD_REPOSITORY } from '../../../scraper/domain/repositories/raw-lead.repository.interface';
import type { ILeadRepository } from '../../../leads/domain/repositories/lead.repository.interface';
import { LEAD_REPOSITORY } from '../../../leads/domain/repositories/lead.repository.interface';

@Processor('analyzer')
export class AnalyzerProcessor extends WorkerHost {
  private readonly logger = new Logger(AnalyzerProcessor.name);

  constructor(
    @Inject(RAW_LEAD_REPOSITORY) private readonly rawLeadRepo: IRawLeadRepository,
    @Inject(LEAD_REPOSITORY) private readonly leadRepo: ILeadRepository,
    private readonly aiService: AiAnalysisService,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    const { organizationId, rawLeadId } = job.data;
    this.logger.log(`Processing Analysis for RawLead ${rawLeadId}`);
    
    // We would normally fetch the rawLead by ID from the repo.
    // However, our IRawLeadRepository only has `findByJobId` and `upsert`.
    // Wait, we need a way to fetch a rawLead by ID!
    // I will fetch by job ID and find it, or I should just use the rawLead object passed in job data if possible.
    // Let's assume the manager service passes the rawLead object directly in job data to avoid changing scraper module for now.
    const { rawLead } = job.data;

    if (!rawLead || rawLead.processed) {
      this.logger.log(`RawLead ${rawLeadId} already processed or missing.`);
      return;
    }

    try {
      // 1. Analyze with AI
      const analysis = await this.aiService.analyzeWebsite(rawLead.rawData);

      // 2. Create Lead
      const createLeadDto = {
        firstName: analysis.title ? analysis.title.split(' ')[0] : 'Unknown',
        lastName: analysis.title ? analysis.title.split(' ').slice(1).join(' ') : 'Unknown',
        email: analysis.emails && analysis.emails.length > 0 ? analysis.emails[0] : null,
        phone: analysis.phone || null,
        status: 'New' as any,
        source: rawLead.sourceType,
      };

      await this.leadRepo.create(organizationId, {
        ...createLeadDto,
        websiteAnalysis: analysis,
      } as any);

      // 3. Mark raw lead as processed
      await this.rawLeadRepo.upsert(organizationId, {
        sourceId: rawLead.sourceId,
        scrapeJobId: rawLead.scrapeJobId,
        sourceType: rawLead.sourceType,
        rawData: rawLead.rawData,
        processed: true
      });

      this.logger.log(`Analysis complete for RawLead ${rawLeadId}`);
    } catch (error: any) {
      this.logger.error(`Analysis failed for RawLead ${rawLeadId}: ${error.message}`);
      throw error;
    }
  }
}
