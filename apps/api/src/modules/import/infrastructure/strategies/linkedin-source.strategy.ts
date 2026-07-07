import { Injectable } from '@nestjs/common';
import { ILeadSourceStrategy } from '../../domain/interfaces/source-strategy.interface';
import { SourceType } from '../../domain/types/source-type.enum';
import { RawLeadData } from '../../domain/entities/import-context.entity';

@Injectable()
export class LinkedinSourceStrategy implements ILeadSourceStrategy {
  readonly sourceType = SourceType.LINKEDIN;

  async mapPayload(payload: any): Promise<RawLeadData[]> {
    const records = Array.isArray(payload) ? payload : (payload.elements || []);
    
    return records.map((record: any) => ({
      firstName: record.firstName || record.miniProfile?.firstName,
      lastName: record.lastName || record.miniProfile?.lastName,
      email: record.emailAddress, // Might require additional resolution depending on API format
      phone: record.phoneNumber,
      domain: record.companyWebsite, // Often needs separate enrichment
      companyName: record.headline || record.miniProfile?.occupation,
      source: SourceType.LINKEDIN,
      metadata: record,
    }));
  }
}
