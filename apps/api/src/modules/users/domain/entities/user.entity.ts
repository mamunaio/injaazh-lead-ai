export class User {
  constructor(
    public readonly id: string,
    public email: string,
    public passwordHash: string,
    public firstName: string,
    public lastName: string,
    public organizationId: string,
    public roles: string[],
    public status: 'Active' | 'Suspended',
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
