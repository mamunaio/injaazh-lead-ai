export class Campaign {
  constructor(
    public readonly id: string,
    public organizationId: string,
    public name: string,
    public status: 'Draft' | 'Active' | 'Paused' | 'Completed' | 'Stopped',
    public leadSegmentId: string | null,
    public promptTemplateId: string | null,
    public sequenceId: string | null,
    public schedule: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
