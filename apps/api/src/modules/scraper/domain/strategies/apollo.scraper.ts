import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { IScraperStrategy } from './scraper.strategy.interface';
import { RawLead } from '../entities/raw-lead.entity';

@Injectable()
export class ApolloScraper implements IScraperStrategy {
  private readonly logger = new Logger(ApolloScraper.name);

  constructor(private readonly configService: ConfigService) {}

  async scrape(organizationId: string, scrapeJobId: string, parameters: any): Promise<Partial<RawLead>[]> {
    const apiKey = this.configService.get<string>('APOLLO_API_KEY');
    
    if (!apiKey) {
      this.logger.error('APOLLO_API_KEY is not configured');
      throw new Error('Apollo API key is missing');
    }

    this.logger.log(`Starting Apollo Scrape for job: ${scrapeJobId}`);

    try {
      // 1. Prepare search payload
      // Parameters could include q_organization_domains, person_titles, contact_email_status
      const searchUrl = `https://api.apollo.io/v1/mixed_people/search`;
      const payload = {
        api_key: apiKey,
        page: parameters.page || 1,
        ...parameters,
      };

      // Ensure we don't send `limit` to Apollo, as their API uses `per_page` (max 100 usually, but we'll let default handle it if not set)
      if (parameters.limit && !payload.per_page) {
         // rough approximation, Apollo allows max 100 per page on some endpoints
         // Actually, we'll let the user pass `per_page` directly if they want
      }

      // 2. Fetch from Apollo API
      const response = await axios.post(searchUrl, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        }
      });

      const people = response.data.people || [];
      const leads: Partial<RawLead>[] = [];

      // 3. Map to RawLead
      // Default behavior: extract top-level info and save entire object to rawData
      for (const person of people) {
        
        let website = null;
        let company = null;
        if (person.organization) {
          website = person.organization.website_url || person.organization.primary_domain;
          company = person.organization.name;
        }

        leads.push({
          scrapeJobId,
          sourceType: 'Apollo',
          sourceId: person.id,
          rawData: {
            ...person,
            name: `${person.first_name || ''} ${person.last_name || ''}`.trim(),
            email: person.email || person.contact?.email,
            company: company,
            website: website,
            title: person.title,
            linkedin: person.linkedin_url,
          },
        });
      }

      this.logger.log(`Apollo scrape returned ${leads.length} leads.`);
      return leads;
    } catch (error: any) {
      this.logger.error(`Apollo Scrape Failed: ${error.message}`);
      if (error.response?.data) {
        this.logger.error(`Apollo API Error Response: ${JSON.stringify(error.response.data)}`);
      }
      throw error;
    }
  }
}
