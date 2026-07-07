import { Injectable, Inject } from '@nestjs/common';
import { IEnrichmentStep } from '../../domain/interfaces/enrichment-step.interface';
import { EnrichmentContext } from '../../domain/entities/enrichment-context.entity';
import type { IWebCrawler } from '../../domain/interfaces/web-crawler.interface';

@Injectable()
export class CrawlWebsiteStep implements IEnrichmentStep {
  constructor(
    @Inject('IWebCrawler') private readonly webCrawler: IWebCrawler,
  ) {}

  async process(context: EnrichmentContext): Promise<EnrichmentContext> {
    if (context.isFailed() || !context.websiteUrl) return context;

    const html = await this.webCrawler.crawl(context.websiteUrl);
    
    if (!html) {
      context.addError(`Failed to fetch HTML from ${context.websiteUrl}`);
      return context;
    }

    context.crawledHtml = html;
    return context;
  }
}
