import { Injectable } from '@nestjs/common';
import { IWebCrawler } from '../../domain/interfaces/web-crawler.interface';
import axios from 'axios';

@Injectable()
export class AxiosWebCrawler implements IWebCrawler {
  async crawl(url: string): Promise<string | null> {
    try {
      // Basic implementation for fetching HTML
      // Add timeout and generic headers to avoid simple blocking
      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; InjaazhBot/1.0; +http://injaazh.com)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        },
      });

      if (typeof response.data === 'string') {
        return response.data;
      }
      return null;
    } catch (error: any) {
      // In production, we might want to log this or return a specific error type
      return null;
    }
  }
}
