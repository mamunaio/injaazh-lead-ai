import { Injectable } from '@nestjs/common';
import { IScraperStrategy } from './scraper.strategy.interface';
import { RawLead } from '../entities/raw-lead.entity';

@Injectable()
export class CsvScraper implements IScraperStrategy {
  async scrape(organizationId: string, scrapeJobId: string, parameters: any): Promise<Partial<RawLead>[]> {
    // Expects CSV row data directly passed in parameters or via a downloaded file
    return [
      {
        scrapeJobId,
        sourceType: 'CSV',
        sourceId: 'row-1',
        rawData: {
          firstName: 'Alice',
          email: 'alice@test.csv',
        },
      }
    ];
  }
}
