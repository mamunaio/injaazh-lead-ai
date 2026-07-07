import { Injectable } from '@nestjs/common';
import { ILeadSourceStrategy } from '../../domain/interfaces/source-strategy.interface';
import { SourceType } from '../../domain/types/source-type.enum';
import { RawLeadData } from '../../domain/entities/import-context.entity';

@Injectable()
export class ApiSourceStrategy implements ILeadSourceStrategy {
  readonly sourceType = SourceType.API;

  async mapPayload(payload: any): Promise<RawLeadData[]> {
    const leads = Array.isArray(payload) ? payload : [payload];
    
    return leads.map((lead: any) => ({
      firstName: lead.firstName || lead.givenName,
      lastName: lead.lastName || lead.familyName,
      email: lead.email,
      phone: lead.phone,
      domain: lead.domain || lead.website,
      companyName: lead.companyName || lead.organization,
      source: SourceType.API,
      metadata: lead.metadata || {},
    }));
  }
}
