export class RawLead {
  constructor(
    public readonly id: string,
    public organizationId: string,
    public scrapeJobId: string,
    public sourceType: string,
    public sourceId: string,
    public rawData: any,
    public processed: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
