import { MailAccount } from '../entities/mail-account.entity';

export interface IMailAccountRepository {
  create(organizationId: string, account: Partial<MailAccount>): Promise<MailAccount>;
  findById(organizationId: string, id: string): Promise<MailAccount | null>;
  findByOrganization(organizationId: string): Promise<MailAccount[]>;
  getDefault(organizationId: string): Promise<MailAccount | null>;
  setDefault(organizationId: string, id: string): Promise<void>;
  update(organizationId: string, id: string, data: Partial<MailAccount>): Promise<MailAccount | null>;
}

export const MAIL_ACCOUNT_REPOSITORY = Symbol('MAIL_ACCOUNT_REPOSITORY');
