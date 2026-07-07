export class MailAccount {
  constructor(
    public readonly id: string,
    public organizationId: string,
    public provider: 'Gmail' | 'Microsoft365' | 'SendGrid' | 'AmazonSES' | 'Resend',
    public credentials: any,
    public isDefault: boolean,
    public fromEmail: string,
    public fromName: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
