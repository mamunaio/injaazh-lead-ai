import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from '@injaazh/config';
import { AppLoggerModule } from '@injaazh/logger';
import { DatabaseModule } from '@injaazh/database';
import { AuthModule } from './modules/auth/auth.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { UsersModule } from './modules/users/users.module';
import { LeadsModule } from './modules/leads/leads.module';
import { ScraperModule } from './modules/scraper/scraper.module';
import { TrackingModule } from './modules/tracking/tracking.module';
import { AnalyzerModule } from './modules/analyzer/analyzer.module';
import { AiModule } from './modules/ai/ai.module';
import { MailModule } from './modules/mail/mail.module';
import { CampaignsModule } from './modules/campaigns/campaigns.module';
import { ImportModule } from './modules/import/import.module';
import { EnrichmentModule } from './modules/enrichment/enrichment.module';
import { IntelligenceModule } from './modules/intelligence/intelligence.module';
import { PromptsModule } from './modules/prompts/prompts.module';
import { LlmModule } from './modules/llm/llm.module';
import { EmailEngineModule } from './modules/email-engine/email-engine.module';
import { SequencesModule } from './modules/sequences/sequences.module';
import { SchedulerModule } from './modules/scheduler/scheduler.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { CrmModule } from './modules/crm/crm.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { NotesModule } from './modules/notes/notes.module';
import { SegmentsModule } from './modules/segments/segments.module';

@Module({
  imports: [
    AppConfigModule,
    AppLoggerModule,
    DatabaseModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        connection: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    OrganizationsModule,
    UsersModule,
    LeadsModule,
    ScraperModule,
    TrackingModule,
    AnalyzerModule,
    AiModule,
    MailModule,
    CampaignsModule,
    ImportModule,
    EnrichmentModule,
    IntelligenceModule,
    PromptsModule,
    LlmModule,
    EmailEngineModule,
    SequencesModule,
    SchedulerModule,
    AnalyticsModule,
    CrmModule,
    TasksModule,
    NotesModule,
    SegmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
