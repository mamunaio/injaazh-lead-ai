export class EnrichmentContext {
  public websiteUrl?: string;
  public crawledHtml?: string;
  public extractedData: {
    title?: string;
    metaDescription?: string;
    emails: string[];
    phoneNumbers: string[];
    socialLinks: string[];
    contactPageUrl?: string;
  } = { emails: [], phoneNumbers: [], socialLinks: [] };
  
  public technologies: string[] = [];
  public companyProfile: any = {};
  
  public errors: string[] = [];
  public status: 'Pending' | 'Success' | 'Failed' = 'Pending';

  constructor(
    public readonly organizationId: string,
    public readonly leadId: string,
    public readonly initialDomain?: string | null,
    public readonly initialEmail?: string | null,
  ) {}

  addError(error: string) {
    this.errors.push(error);
    this.status = 'Failed';
  }

  isFailed(): boolean {
    return this.status === 'Failed';
  }
}
