import { Injectable } from '@nestjs/common';
import { ILeadSourceStrategy } from '../../domain/interfaces/source-strategy.interface';
import { SourceType } from '../../domain/types/source-type.enum';
import { RawLeadData } from '../../domain/entities/import-context.entity';

@Injectable()
export class CsvSourceStrategy implements ILeadSourceStrategy {
  readonly sourceType = SourceType.CSV;

  async mapPayload(payload: any): Promise<RawLeadData[]> {
    // Expects payload to be an array of parsed CSV rows
    const rows = Array.isArray(payload) ? payload : [];
    
    return rows.map((row: any) => ({
      firstName: row['First Name'] || row.firstName,
      lastName: row['Last Name'] || row.lastName,
      email: row['Email'] || row.email,
      phone: row['Phone'] || row.phone,
      domain: row['Website'] || row.domain,
      companyName: row['Company'] || row.companyName,
      source: SourceType.CSV,
      metadata: row,
    }));
  }
}
