import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { IScraperStrategy } from './scraper.strategy.interface';
import { RawLead } from '../entities/raw-lead.entity';

@Injectable()
export class GoogleMapsScraper implements IScraperStrategy {
  private readonly logger = new Logger(GoogleMapsScraper.name);

  constructor(private readonly configService: ConfigService) {}

  async scrape(organizationId: string, scrapeJobId: string, parameters: any): Promise<Partial<RawLead>[]> {
    const apiKey = this.configService.get<string>('GOOGLE_MAPS_API_KEY');
    
    if (!apiKey) {
      this.logger.error('GOOGLE_MAPS_API_KEY is not configured');
      throw new Error('Google Maps API key is missing');
    }

    const query = parameters.query || 'businesses near me';
    this.logger.log(`Starting Google Maps Scrape for query: ${query}`);

    try {
      // 1. Fetch places via Text Search API
      const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`;
      const searchRes = await axios.get(searchUrl);

      if (searchRes.data.status !== 'OK') {
        this.logger.error(`Google Places API returned status: ${searchRes.data.status}`);
        if (searchRes.data.status === 'ZERO_RESULTS') {
          return [];
        }
        throw new Error(`Google Places API Error: ${searchRes.data.status}`);
      }

      const results = searchRes.data.results;
      const leads: Partial<RawLead>[] = [];

      // Limit results for MVP or respect parameter limit
      const limit = parameters.limit || 5; 
      const placesToProcess = results.slice(0, limit);

      // 2. Fetch Place Details to get phone number and website
      for (const place of placesToProcess) {
        let website = null;
        let phone = null;

        try {
          const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=website,formatted_phone_number&key=${apiKey}`;
          const detailsRes = await axios.get(detailsUrl);
          
          if (detailsRes.data.status === 'OK') {
            website = detailsRes.data.result.website || null;
            phone = detailsRes.data.result.formatted_phone_number || null;
          }
        } catch (detailErr) {
          this.logger.warn(`Failed to fetch details for Place ID: ${place.place_id}`);
        }

        leads.push({
          scrapeJobId,
          sourceType: 'GoogleMaps',
          sourceId: place.place_id,
          rawData: {
            name: place.name,
            address: place.formatted_address,
            phone: phone,
            website: website,
            rating: place.rating,
            user_ratings_total: place.user_ratings_total,
            types: place.types,
            place_id: place.place_id,
          },
        });
      }

      return leads;
    } catch (error: any) {
      this.logger.error(`Scrape Failed: ${error.message}`);
      throw error;
    }
  }
}
