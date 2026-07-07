export class Organization {
  constructor(
    public readonly id: string,
    public name: string,
    public ownerId: string,
    public domain: string | null,
    public status: 'Active' | 'Suspended',
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
