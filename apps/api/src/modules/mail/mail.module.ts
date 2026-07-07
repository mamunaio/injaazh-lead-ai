import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailController } from './mail.controller';
import { MailAccountManagerService } from './application/services/mail-account.manager.service';
import { EmailDispatchService } from './application/services/email-dispatch.service';
import { MailProviderFactory } from './infrastructure/factories/mail-provider.factory';
import { MailAccountSchema, MailAccountDocument } from './infrastructure/schemas/mail-account.schema';
import { MailAccountRepository } from './infrastructure/repositories/mail-account.repository';
import { MAIL_ACCOUNT_REPOSITORY } from './domain/repositories/mail-account.repository.interface';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MailAccountDocument.name, schema: MailAccountSchema },
    ]),
  ],
  controllers: [MailController],
  providers: [
    MailAccountManagerService,
    EmailDispatchService,
    MailProviderFactory,
    {
      provide: MAIL_ACCOUNT_REPOSITORY,
      useClass: MailAccountRepository,
    },
  ],
  exports: [EmailDispatchService],
})
export class MailModule {}
