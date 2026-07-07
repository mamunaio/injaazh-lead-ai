import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ResponseParser {
  private readonly logger = new Logger(ResponseParser.name);

  /**
   * Attempts to parse JSON from a raw LLM string that might include Markdown blocks.
   * Example: ```json\n{...}\n``` will be parsed correctly.
   */
  parseJson<T>(rawText: string): T | null {
    try {
      let cleaned = rawText.trim();
      
      // Remove markdown code block wrappers if they exist
      if (cleaned.startsWith('```')) {
        const lines = cleaned.split('\n');
        // Remove the first line (e.g. ```json)
        lines.shift();
        // Remove the last line (e.g. ```)
        if (lines.length > 0 && lines[lines.length - 1].startsWith('```')) {
          lines.pop();
        }
        cleaned = lines.join('\n').trim();
      }

      return JSON.parse(cleaned) as T;
    } catch (error: any) {
      this.logger.error(`Failed to parse JSON from LLM response: ${error.message}`, rawText);
      return null;
    }
  }

  /**
   * Extracts raw text without any wrapping markdown blocks
   */
  parseText(rawText: string): string {
    return rawText.trim();
  }
}
