import { Injectable } from '@nestjs/common';
import { ITechDetector } from '../../domain/interfaces/tech-detector.interface';

@Injectable()
export class RegexTechDetector implements ITechDetector {
  private readonly signatures: Record<string, RegExp> = {
    'WordPress': /wp-content|wp-includes/i,
    'React': /data-reactroot|react-dom/i,
    'Next.js': /_next\/static/i,
    'Vue.js': /data-v-|__VUE__/i,
    'Angular': /ng-version|ng-app/i,
    'Shopify': /cdn\.shopify\.com/i,
    'Google Analytics': /google-analytics\.com\/analytics\.js|gtag/i,
    'Stripe': /js\.stripe\.com/i,
    'Tailwind CSS': /tailwind/i,
    'Bootstrap': /bootstrap/i,
  };

  detect(html: string): string[] {
    const detected: string[] = [];
    if (!html) return detected;

    for (const [tech, regex] of Object.entries(this.signatures)) {
      if (regex.test(html)) {
        detected.push(tech);
      }
    }

    return detected;
  }
}
