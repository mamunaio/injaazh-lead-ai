import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    TerminusModule,
    BullModule.registerQueue({
      name: 'email-queue', // Just checking the default queue for health
    })
  ],
  controllers: [HealthController],
})
export class HealthModule {}
