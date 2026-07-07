import { Injectable } from '@nestjs/common';
import { IScraperStrategy } from './scraper.strategy.interface';
import { RawLead } from '../entities/raw-lead.entity';

@Injectable()
export class WebsiteScraper implements IScraperStrategy {
  async scrape(organizationId: string, scrapeJobId: string, parameters: any): Promise<Partial<RawLead>[]> {
    return [
      {
        scrapeJobId,
        sourceType: 'Website',
        sourceId: 'https://example.com',
        rawData: {
          url: 'https://example.com',
          title: 'Example Domain',
          emails: ['contact@example.com'],
        },
      }
    ];
  }
}
