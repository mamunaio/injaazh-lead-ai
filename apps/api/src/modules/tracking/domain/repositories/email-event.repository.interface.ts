import { EmailEvent } from '../entities/email-event.entity';

export const EMAIL_EVENT_REPOSITORY = 'EMAIL_EVENT_REPOSITORY';

export interface IEmailEventRepository {
  create(event: Omit<EmailEvent, 'id' | 'createdAt'>): Promise<EmailEvent>;
  findByMessageId(messageId: string): Promise<EmailEvent[]>;
  findByLeadId(leadId: string): Promise<EmailEvent[]>;
  hasEventForMessage(messageId: string, type: string): Promise<boolean>;
  countEvents(organizationId: string, type: string): Promise<number>;
  countUniqueLeads(organizationId: string, type: string): Promise<number>;
}
