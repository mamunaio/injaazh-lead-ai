export class CampaignLead {
  constructor(
    public readonly id: string,
    public organizationId: string,
    public campaignId: string,
    public leadId: string,
    public status: 'Enrolled' | 'Processing' | 'Completed' | 'Failed',
    public sentAt: Date | null,
    public currentSequenceStep: number,
    public nextActionDate: Date | null,
    public hasReplied: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
