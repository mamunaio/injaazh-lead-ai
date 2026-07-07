import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bullmq';
import { CampaignsController } from './campaigns.controller';
import { CampaignManagerService } from './application/services/campaign.manager.service';
import { CampaignSchema, CampaignDocument } from './infrastructure/schemas/campaign.schema';
import { CampaignLeadSchema, CampaignLeadDocument } from './infrastructure/schemas/campaign-lead.schema';
import { CampaignRepository } from './infrastructure/repositories/campaign.repository';
import { CampaignLeadRepository } from './infrastructure/repositories/campaign-lead.repository';
import { CAMPAIGN_REPOSITORY } from './domain/repositories/campaign.repository.interface';
import { CAMPAIGN_LEAD_REPOSITORY } from './domain/repositories/campaign-lead.repository.interface';
import { LeadsModule } from '../leads/leads.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CampaignDocument.name, schema: CampaignSchema },
      { name: CampaignLeadDocument.name, schema: CampaignLeadSchema },
    ]),
    BullModule.registerQueue({
      name: 'scheduler-dispatch',
    }),
    LeadsModule, // exports ILeadRepository
    MailModule,
  ],
  controllers: [CampaignsController],
  providers: [
    CampaignManagerService,
    {
      provide: CAMPAIGN_REPOSITORY,
      useClass: CampaignRepository,
    },
    {
      provide: CAMPAIGN_LEAD_REPOSITORY,
      useClass: CampaignLeadRepository,
    },
  ],
  exports: [CAMPAIGN_REPOSITORY, CAMPAIGN_LEAD_REPOSITORY],
})
export class CampaignsModule {}
