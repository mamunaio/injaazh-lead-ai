import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { IScraperStrategy } from './scraper.strategy.interface';
import { RawLead } from '../entities/raw-lead.entity';

@Injectable()
export class LinkedInScraper implements IScraperStrategy {
  private readonly logger = new Logger(LinkedInScraper.name);

  constructor(private readonly configService: ConfigService) {}

  async scrape(organizationId: string, scrapeJobId: string, parameters: any): Promise<Partial<RawLead>[]> {
    const apiKey = this.configService.get<string>('PROXYCURL_API_KEY');
    
    if (!apiKey) {
      this.logger.error('PROXYCURL_API_KEY is not configured');
      throw new Error('Proxycurl API key is missing');
    }

    const profileUrls: string[] = parameters.profileUrls || [];
    
    if (!Array.isArray(profileUrls) || profileUrls.length === 0) {
      this.logger.warn(`No profileUrls provided for LinkedIn Scrape Job: ${scrapeJobId}`);
      return [];
    }

    this.logger.log(`Starting LinkedIn Scrape for ${profileUrls.length} profiles (Job: ${scrapeJobId})`);

    const leads: Partial<RawLead>[] = [];
    const proxycurlUrl = 'https://nubela.co/proxycurl/api/v2/linkedin';

    for (const url of profileUrls) {
      try {
        const response = await axios.get(proxycurlUrl, {
          params: { url },
          headers: {
            'Authorization': `Bearer ${apiKey}`,
          },
        });

        const data = response.data;

        // Basic mapping for core fields
        let company = null;
        let title = data.headline;
        
        if (data.experiences && data.experiences.length > 0) {
          const currentRole = data.experiences[0];
          company = currentRole.company;
          title = currentRole.title;
        }

        leads.push({
          scrapeJobId,
          sourceType: 'LinkedIn',
          sourceId: url,
          rawData: {
            ...data,
            name: data.full_name,
            company: company,
            title: title,
            linkedin: url,
          },
        });
        
        // Optional: Add a delay here to respect rate limits if needed.
        // await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error: any) {
        this.logger.error(`Failed to scrape LinkedIn profile (${url}): ${error.message}`);
        if (error.response?.data) {
          this.logger.error(`Proxycurl Error: ${JSON.stringify(error.response.data)}`);
        }
        // Continue processing other URLs even if one fails
      }
    }

    this.logger.log(`LinkedIn scrape completed. Successfully fetched ${leads.length}/${profileUrls.length} profiles.`);
    return leads;
  }
}
