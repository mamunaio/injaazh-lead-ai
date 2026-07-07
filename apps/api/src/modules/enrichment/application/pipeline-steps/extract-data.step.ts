import { Injectable } from '@nestjs/common';
import { IEnrichmentStep } from '../../domain/interfaces/enrichment-step.interface';
import { EnrichmentContext } from '../../domain/entities/enrichment-context.entity';
import * as cheerio from 'cheerio';

@Injectable()
export class ExtractDataStep implements IEnrichmentStep {
  async process(context: EnrichmentContext): Promise<EnrichmentContext> {
    if (context.isFailed() || !context.crawledHtml) return context;

    const $ = cheerio.load(context.crawledHtml);
    
    // Title
    context.extractedData.title = $('title').text().trim();
    
    // Meta Description
    context.extractedData.metaDescription = $('meta[name="description"]').attr('content')?.trim();
    
    // Social Links (Basic heuristic: link containing linkedin, twitter, etc.)
    const socialLinks = new Set<string>();
    $('a[href]').each((_, el) => {
      const href = $(el).attr('href')?.toLowerCase() || '';
      if (href.includes('linkedin.com/company') || href.includes('twitter.com') || href.includes('facebook.com')) {
        socialLinks.add($(el).attr('href') as string);
      }
    });
    context.extractedData.socialLinks = Array.from(socialLinks);

    // Basic Regex for emails in HTML text
    // Note: In production, robust parsing or headless browser might be needed,
    // but regex on stripped text is a good start.
    const textContent = $('body').text();
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
    const emails = textContent.match(emailRegex) || [];
    context.extractedData.emails = Array.from(new Set(emails));

    return context;
  }
}
