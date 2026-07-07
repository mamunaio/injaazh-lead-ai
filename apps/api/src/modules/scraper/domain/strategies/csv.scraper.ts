import { Injectable, Logger } from '@nestjs/common';
import { IScraperStrategy } from './scraper.strategy.interface';
import { RawLead } from '../entities/raw-lead.entity';
import csvParser from 'csv-parser';
import { Readable } from 'stream';
import axios from 'axios';

@Injectable()
export class CsvScraper implements IScraperStrategy {
  private readonly logger = new Logger(CsvScraper.name);

  async scrape(organizationId: string, scrapeJobId: string, parameters: any): Promise<Partial<RawLead>[]> {
    this.logger.log(`Starting CSV Scrape for job ${scrapeJobId}`);
    
    let stream: Readable;

    if (parameters.csvString) {
      this.logger.log('Parsing from provided csvString parameter.');
      stream = Readable.from(parameters.csvString);
    } else if (parameters.csvUrl) {
      this.logger.log(`Parsing from provided csvUrl: ${parameters.csvUrl}`);
      const response = await axios({
        method: 'GET',
        url: parameters.csvUrl,
        responseType: 'stream',
      });
      stream = response.data;
    } else {
      throw new Error('CSV Scraper requires either "csvString" or "csvUrl" in parameters.');
    }

    return new Promise((resolve, reject) => {
      const results: Partial<RawLead>[] = [];
      let rowIndex = 1;

      stream
        .pipe(csvParser())
        .on('data', (data: any) => {
          // Attempt some very basic normalizations if known columns exist
          // Usually, CSVs have columns like "Name", "Email", "Company", "Website"
          // We will store everything in `rawData` safely.
          const normalizedData = this.normalizeKeys(data);
          
          results.push({
            scrapeJobId,
            sourceType: 'CSV',
            sourceId: `row-${rowIndex++}`,
            rawData: normalizedData,
          });
        })
        .on('end', () => {
          this.logger.log(`CSV parsing completed. Extracted ${results.length} rows.`);
          resolve(results);
        })
        .on('error', (error: any) => {
          this.logger.error(`Error parsing CSV: ${error.message}`);
          reject(error);
        });
    });
  }

  private normalizeKeys(row: any): any {
    const normalized: any = { ...row };
    
    // Create a copy with lowercased keys for easier lookup
    const lowerKeys: any = {};
    for (const key of Object.keys(row)) {
      lowerKeys[key.toLowerCase().trim()] = row[key];
    }

    // Try to extract some common fields directly to the root of rawData for ease of use
    // (The AI Context builder will ultimately use all fields anyway)
    if (lowerKeys['email'] || lowerKeys['email address']) {
      normalized.email = lowerKeys['email'] || lowerKeys['email address'];
    }
    if (lowerKeys['name'] || lowerKeys['full name'] || lowerKeys['first name']) {
      normalized.name = lowerKeys['name'] || lowerKeys['full name'] || lowerKeys['first name'];
    }
    if (lowerKeys['company'] || lowerKeys['company name'] || lowerKeys['organization']) {
      normalized.company = lowerKeys['company'] || lowerKeys['company name'] || lowerKeys['organization'];
    }
    if (lowerKeys['website'] || lowerKeys['url'] || lowerKeys['domain']) {
      normalized.website = lowerKeys['website'] || lowerKeys['url'] || lowerKeys['domain'];
    }
    
    return normalized;
  }
}
