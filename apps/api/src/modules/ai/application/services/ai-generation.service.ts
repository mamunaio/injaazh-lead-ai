import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class AiGenerationService {
  private readonly logger = new Logger(AiGenerationService.name);
  private readonly ai: GoogleGenAI;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    this.ai = new GoogleGenAI({ apiKey });
  }

  async generateOutreach(lead: any): Promise<any> {
    this.logger.log(`Generating AI outreach for Lead ${lead.id}...`);

    const prompt = `
You are an expert B2B sales copywriter. I am providing you with the details and website analysis of a Lead.
Your task is to analyze this lead and generate a highly personalized cold email campaign.

Lead Information:
- First Name: ${lead.firstName}
- Last Name: ${lead.lastName}
- Website Analysis: ${JSON.stringify(lead.websiteAnalysis || {}, null, 2)}

Respond ONLY with a valid JSON object matching this exact structure:
{
  "companyAnalysis": "A 2-sentence summary of what their company does based on the website analysis.",
  "painPoints": ["Pain point 1", "Pain point 2", "Pain point 3"],
  "personalization": "A highly personalized icebreaker sentence for the cold email.",
  "subject": "An engaging, short cold email subject line.",
  "coldEmail": "The full body of the cold email, incorporating the personalization and addressing one of the pain points.",
  "cta": "The Call to Action at the end of the email."
}
`;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      if (!response.text) {
        throw new Error('No text returned from Gemini API');
      }

      const generatedData = JSON.parse(response.text);
      return generatedData;
    } catch (error: any) {
      this.logger.error(`Failed to generate AI outreach: ${error.message}`);
      throw error;
    }
  }
}
