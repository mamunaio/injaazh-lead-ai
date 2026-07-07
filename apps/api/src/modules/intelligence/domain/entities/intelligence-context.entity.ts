export class IntelligenceContext {
  public prospectIntelligence: {
    companyDetails: {
      size: string;
      industry: string;
      location: string;
      description: string;
    };
    decisionMaker: {
      name: string | null;
      title: string | null;
      emails: string[];
      linkedInUrl: string | null;
    };
    technologyStack: string[];
    painPoints: string[];
    buyingSignals: string[];
    confidenceScore: number;
  } = {
    companyDetails: { size: 'Unknown', industry: 'Unknown', location: 'Unknown', description: '' },
    decisionMaker: { name: null, title: null, emails: [], linkedInUrl: null },
    technologyStack: [],
    painPoints: [],
    buyingSignals: [],
    confidenceScore: 0,
  };

  public errors: string[] = [];
  public status: 'Pending' | 'Success' | 'Failed' = 'Pending';

  constructor(
    public readonly organizationId: string,
    public readonly leadId: string,
    public readonly rawLead: any, 
    public readonly rawEnrichmentData: any
  ) {}

  addError(error: string) {
    this.errors.push(error);
    this.status = 'Failed';
  }

  isFailed(): boolean {
    return this.status === 'Failed';
  }
}
