import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { IMailAccountRepository } from '../../domain/repositories/mail-account.repository.interface';
import { MAIL_ACCOUNT_REPOSITORY } from '../../domain/repositories/mail-account.repository.interface';
import { MailAccount } from '../../domain/entities/mail-account.entity';

@Injectable()
export class MailAccountManagerService {
  constructor(
    @Inject(MAIL_ACCOUNT_REPOSITORY) private readonly mailAccountRepo: IMailAccountRepository,
  ) {}

  async createAccount(organizationId: string, accountData: Partial<MailAccount>) {
    const existingAccounts = await this.mailAccountRepo.findByOrganization(organizationId);
    
    // Auto-set as default if it's the first account
    if (existingAccounts.length === 0) {
      accountData.isDefault = true;
    }

    return this.mailAccountRepo.create(organizationId, accountData);
  }

  async getAccounts(organizationId: string) {
    return this.mailAccountRepo.findByOrganization(organizationId);
  }

  async setDefault(organizationId: string, id: string) {
    const account = await this.mailAccountRepo.findById(organizationId, id);
    if (!account) {
      throw new NotFoundException('Mail account not found');
    }
    await this.mailAccountRepo.setDefault(organizationId, id);
    return { success: true };
  }
}
