import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { IScraperStrategy } from './scraper.strategy.interface';
import { RawLead } from '../entities/raw-lead.entity';

@Injectable()
export class WebsiteScraper implements IScraperStrategy {
  private readonly logger = new Logger(WebsiteScraper.name);
  
  // Basic Regex for email extraction (ignoring common false positives like image extensions)
  private readonly emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9_-]+)/gi;

  async scrape(organizationId: string, scrapeJobId: string, parameters: any): Promise<Partial<RawLead>[]> {
    const urls: string[] = parameters.urls || [];
    
    if (!Array.isArray(urls) || urls.length === 0) {
      this.logger.warn(`No urls provided for Website Scrape Job: ${scrapeJobId}`);
      return [];
    }

    this.logger.log(`Starting Website Scrape for ${urls.length} URLs (Job: ${scrapeJobId})`);

    const leads: Partial<RawLead>[] = [];

    for (const url of urls) {
      try {
        // Ensure URL has a protocol
        const normalizedUrl = url.startsWith('http') ? url : `https://${url}`;

        const response = await axios.get(normalizedUrl, {
          timeout: 10000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          }
        });

        const html = response.data;
        const $ = cheerio.load(html);

        // 1. Extract Title
        const title = $('title').text().trim() || null;

        // 2. Extract Meta Description
        let description = $('meta[name="description"]').attr('content')?.trim() || null;
        if (!description) {
          description = $('meta[property="og:description"]').attr('content')?.trim() || null;
        }

        // 3. Extract Emails
        const emailsFound = new Set<string>();
        let match;
        while ((match = this.emailRegex.exec(html)) !== null) {
          const email = match[0].toLowerCase();
          // Filter out typical false positives like images or css
          if (!email.endsWith('.png') && !email.endsWith('.jpg') && !email.endsWith('.jpeg') && !email.endsWith('.gif') && !email.endsWith('.webp')) {
             emailsFound.add(email);
          }
        }

        const emailsArray = Array.from(emailsFound);
        const primaryEmail = emailsArray.length > 0 ? emailsArray[0] : null;

        leads.push({
          scrapeJobId,
          sourceType: 'Website',
          sourceId: normalizedUrl,
          rawData: {
            url: normalizedUrl,
            title,
            description,
            emails: emailsArray,
            email: primaryEmail,
          },
        });
        
      } catch (error: any) {
        this.logger.error(`Failed to scrape website (${url}): ${error.message}`);
        // Continue to the next URL
      }
    }

    this.logger.log(`Website scrape completed. Successfully fetched ${leads.length}/${urls.length} websites.`);
    return leads;
  }
}
