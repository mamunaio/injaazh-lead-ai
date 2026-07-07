import { Module } from '@nestjs/common';
import { AnalyticsController } from './presentation/analytics.controller';
import { AnalyticsService } from './application/services/analytics.service';
import { LeadsModule } from '../leads/leads.module';
import { TrackingModule } from '../tracking/tracking.module';
import { CampaignsModule } from '../campaigns/campaigns.module';

@Module({
  imports: [
    LeadsModule, // exports LEAD_REPOSITORY
    TrackingModule, // exports EMAIL_EVENT_REPOSITORY
    CampaignsModule, // exports CAMPAIGN_REPOSITORY, CAMPAIGN_LEAD_REPOSITORY
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
