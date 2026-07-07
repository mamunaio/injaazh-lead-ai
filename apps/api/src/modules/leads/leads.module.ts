import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeadsController } from './leads.controller';
import { LeadsService } from './application/services/leads.service';
import { LeadRepository } from './infrastructure/repositories/lead.repository';
import { LeadSchema, LeadDocument } from './infrastructure/schemas/lead.schema';
import { LEAD_REPOSITORY } from './domain/repositories/lead.repository.interface';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LeadDocument.name, schema: LeadSchema },
    ]),
  ],
  controllers: [LeadsController],
  providers: [
    LeadsService,
    {
      provide: LEAD_REPOSITORY,
      useClass: LeadRepository,
    },
  ],
  exports: [LeadsService, LEAD_REPOSITORY],
})
export class LeadsModule {}
