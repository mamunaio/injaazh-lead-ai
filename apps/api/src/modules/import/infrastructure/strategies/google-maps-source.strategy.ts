import { Injectable } from '@nestjs/common';
import { ILeadSourceStrategy } from '../../domain/interfaces/source-strategy.interface';
import { SourceType } from '../../domain/types/source-type.enum';
import { RawLeadData } from '../../domain/entities/import-context.entity';

@Injectable()
export class GoogleMapsSourceStrategy implements ILeadSourceStrategy {
  readonly sourceType = SourceType.GOOGLE_MAPS;

  async mapPayload(payload: any): Promise<RawLeadData[]> {
    // Stub implementation as per instructions: Do NOT implement Google Maps scraping yet.
    // However, the import pipeline should be ready to accept its mapped data.
    const places = Array.isArray(payload) ? payload : [payload];
    
    return places.map((place: any) => ({
      firstName: undefined, // Google Maps usually doesn't provide this directly
      lastName: undefined,
      email: place.email || undefined,
      phone: place.formatted_phone_number || place.phone,
      domain: place.website,
      companyName: place.name,
      source: SourceType.GOOGLE_MAPS,
      metadata: place,
    }));
  }
}
