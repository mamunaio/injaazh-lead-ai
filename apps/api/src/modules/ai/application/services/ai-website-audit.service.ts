import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { LlmEngineService } from '../../../llm/application/services/llm-engine.service';

export interface WebsiteAuditResult {
  valueProposition: string;
  targetAudience: string;
  painPointsAddressed: string[];
  suggestedAngles: string[];
}

@Injectable()
export class AiWebsiteAuditService {
  private readonly logger = new Logger(AiWebsiteAuditService.name);

  constructor(private readonly llmEngine: LlmEngineService) {}

  async auditWebsite(url: string): Promise<WebsiteAuditResult> {
    if (!url) {
      throw new BadRequestException('URL is required for website audit');
    }

    const normalizedUrl = url.startsWith('http') ? url : `https://${url}`;
    
    this.logger.log(`Starting AI audit for website: ${normalizedUrl}`);
    let html: string;
    
    try {
      const response = await axios.get(normalizedUrl, {
        timeout: 15000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        }
      });
      html = response.data;
    } catch (error: any) {
      this.logger.error(`Failed to fetch website ${normalizedUrl}: ${error.message}`);
      throw new BadRequestException(`Could not fetch the website at ${normalizedUrl}. Error: ${error.message}`);
    }

    const $ = cheerio.load(html);
    
    // Remove scripts, styles, and other non-visible elements
    $('script, style, noscript, iframe, img, svg, video').remove();
    
    // Extract text and clean up whitespace
    let rawText = $('body').text().replace(/\s+/g, ' ').trim();
    
    // Truncate to ~10000 characters to save tokens and prevent context overflow
    if (rawText.length > 10000) {
       rawText = rawText.substring(0, 10000) + '... [TRUNCATED]';
    }

    if (!rawText || rawText.length < 50) {
      throw new BadRequestException('Not enough text content found on the website to perform an audit.');
    }

    const prompt = `
      You are an expert B2B sales strategist and copywriter.
      I will provide you with the text content scraped from a company's website homepage.
      
      Website URL: ${normalizedUrl}
      Website Content:
      ---
      ${rawText}
      ---
      
      Based on this content, perform a strategic audit. You must output the result as a raw JSON object (do not wrap it in markdown code blocks) matching the following interface:
      {
        "valueProposition": "A concise, 1-2 sentence summary of exactly what this company does and the core value they offer.",
        "targetAudience": "A description of their ideal customer profile or target market based on the text.",
        "painPointsAddressed": ["Pain point 1", "Pain point 2", "Pain point 3"],
        "suggestedAngles": ["Cold email angle 1", "Cold email angle 2", "Cold email angle 3"]
      }
      
      Ensure your analysis is insightful and tailored specifically to the content provided.
    `;

    this.logger.log(`Sending website text (${rawText.length} chars) to LLM for audit...`);
    
    const result = await this.llmEngine.generateJson<WebsiteAuditResult>(prompt);
    
    if (!result) {
      throw new BadRequestException('The AI engine failed to generate a valid audit report.');
    }
    
    this.logger.log(`Website audit completed successfully for ${normalizedUrl}`);
    return result;
  }
}
