export class Lead {
  constructor(
    public readonly id: string,
    public organizationId: string,
    public firstName: string,
    public lastName: string | null,
    public email: string | null,
    public phone: string | null,
    public status: 'New' | 'Contacted' | 'Qualified' | 'Lost' | 'Won',
    public source: string | null,
    public assignedTo: string | null,
    public websiteAnalysis: any | null,
    public aiOutreach: any | null,
    public prospectIntelligence: any | null,
    public aiContext: any | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
