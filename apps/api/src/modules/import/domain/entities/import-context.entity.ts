import { SourceType } from '../types/source-type.enum';

export interface RawLeadData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  domain?: string;
  companyName?: string;
  source: SourceType;
  metadata?: any;
}

export class ImportContext {
  public normalizedLead: Partial<RawLeadData> = {};
  public errors: string[] = [];
  public status: 'Pending' | 'Success' | 'Failed' = 'Pending';
  public savedLeadId?: string;

  constructor(
    public readonly organizationId: string,
    public readonly rawPayload: RawLeadData,
  ) {}

  addError(error: string) {
    this.errors.push(error);
    this.status = 'Failed';
  }

  isFailed(): boolean {
    return this.status === 'Failed';
  }
}
