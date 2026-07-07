import { Injectable } from '@nestjs/common';
import { ILeadSourceStrategy } from '../../domain/interfaces/source-strategy.interface';
import { SourceType } from '../../domain/types/source-type.enum';
import { RawLeadData } from '../../domain/entities/import-context.entity';

@Injectable()
export class ManualSourceStrategy implements ILeadSourceStrategy {
  readonly sourceType = SourceType.MANUAL;

  async mapPayload(payload: any): Promise<RawLeadData[]> {
    // Manual source payload is expected to be a single lead or array of leads
    // that already mostly match the structure.
    const leads = Array.isArray(payload) ? payload : [payload];
    
    return leads.map((lead: any) => ({
      firstName: lead.firstName,
      lastName: lead.lastName,
      email: lead.email,
      phone: lead.phone,
      domain: lead.domain,
      companyName: lead.companyName,
      source: SourceType.MANUAL,
      metadata: lead.metadata || {},
    }));
  }
}
