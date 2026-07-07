import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './application/services/organizations.service';
import { OrganizationRepository } from './infrastructure/repositories/organization.repository';
import { OrganizationSchema, OrganizationDocument } from './infrastructure/schemas/organization.schema';
import { ORGANIZATION_REPOSITORY } from './domain/repositories/organization.repository.interface';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrganizationDocument.name, schema: OrganizationSchema },
    ]),
  ],
  controllers: [OrganizationsController],
  providers: [
    OrganizationsService,
    {
      provide: ORGANIZATION_REPOSITORY,
      useClass: OrganizationRepository,
    },
  ],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
