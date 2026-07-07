export type EmailEventType = 'Delivered' | 'Opened' | 'Clicked' | 'Replied' | 'Bounced' | 'Unsubscribed';

export class EmailEvent {
  constructor(
    public readonly id: string,
    public organizationId: string,
    public messageId: string,
    public campaignId: string,
    public leadId: string,
    public type: EmailEventType,
    public userAgent?: string,
    public ipAddress?: string,
    public metadata?: Record<string, any>,
    public readonly createdAt?: Date,
  ) {}
}
