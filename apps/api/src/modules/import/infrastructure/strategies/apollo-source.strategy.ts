import { Injectable } from '@nestjs/common';
import { ILeadSourceStrategy } from '../../domain/interfaces/source-strategy.interface';
import { SourceType } from '../../domain/types/source-type.enum';
import { RawLeadData } from '../../domain/entities/import-context.entity';

@Injectable()
export class ApolloSourceStrategy implements ILeadSourceStrategy {
  readonly sourceType = SourceType.APOLLO;

  async mapPayload(payload: any): Promise<RawLeadData[]> {
    const records = Array.isArray(payload) ? payload : (payload.contacts || []);
    
    return records.map((record: any) => ({
      firstName: record.first_name,
      lastName: record.last_name,
      email: record.email,
      phone: record.phone_number,
      domain: record.organization?.website_url,
      companyName: record.organization?.name,
      source: SourceType.APOLLO,
      metadata: record,
    }));
  }
}
