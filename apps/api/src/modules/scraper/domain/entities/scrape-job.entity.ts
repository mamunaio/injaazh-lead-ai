export class ScrapeJob {
  constructor(
    public readonly id: string,
    public organizationId: string,
    public type: 'GoogleMaps' | 'Website' | 'LinkedIn' | 'CSV',
    public status: 'Pending' | 'Processing' | 'Completed' | 'Failed',
    public parameters: any,
    public progress: number,
    public resultCount: number,
    public error: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
