import { Injectable } from '@nestjs/common';
import { IImportPipelineStep } from '../../domain/interfaces/import-step.interface';
import { ImportContext } from '../../domain/entities/import-context.entity';

@Injectable()
export class NormalizationStep implements IImportPipelineStep {
  async process(context: ImportContext): Promise<ImportContext> {
    if (context.isFailed()) return context;

    const lead = context.normalizedLead;

    if (lead.email) {
      lead.email = lead.email.trim().toLowerCase();
    }

    if (lead.phone) {
      // Very basic normalization: remove all non-numeric and non-plus characters
      lead.phone = lead.phone.replace(/[^\d+]/g, '');
    }

    if (lead.firstName) {
      lead.firstName = lead.firstName.trim();
    }

    if (lead.lastName) {
      lead.lastName = lead.lastName.trim();
    }

    if (lead.domain) {
      lead.domain = lead.domain.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '');
    }

    return context;
  }
}
