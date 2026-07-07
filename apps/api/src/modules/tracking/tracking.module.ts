import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackingController } from './presentation/tracking.controller';
import { TrackingService } from './application/services/tracking.service';
import { EmailEventSchema, EmailEventDocument } from './infrastructure/schemas/email-event.schema';
import { EmailEventRepository } from './infrastructure/repositories/email-event.repository';
import { EMAIL_EVENT_REPOSITORY } from './domain/repositories/email-event.repository.interface';
import { CampaignsModule } from '../campaigns/campaigns.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailEventDocument.name, schema: EmailEventSchema },
    ]),
    CampaignsModule, // gives us CAMPAIGN_LEAD_REPOSITORY
  ],
  controllers: [TrackingController],
  providers: [
    TrackingService,
    {
      provide: EMAIL_EVENT_REPOSITORY,
      useClass: EmailEventRepository,
    },
  ],
  exports: [TrackingService, EMAIL_EVENT_REPOSITORY],
})
export class TrackingModule {}
