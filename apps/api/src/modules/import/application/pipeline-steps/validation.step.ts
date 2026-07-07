import { Injectable } from '@nestjs/common';
import { IImportPipelineStep } from '../../domain/interfaces/import-step.interface';
import { ImportContext } from '../../domain/entities/import-context.entity';

@Injectable()
export class ValidationStep implements IImportPipelineStep {
  async process(context: ImportContext): Promise<ImportContext> {
    const data = context.rawPayload;

    if (!data.email && !data.phone && !data.domain && !data.companyName) {
      context.addError('Lead must contain at least one of: email, phone, domain, or companyName.');
    }

    if (data.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        context.addError(`Invalid email format: ${data.email}`);
      }
    }

    if (context.isFailed()) {
      return context; // Halt further processing
    }

    // Pass valid data to the normalized payload
    context.normalizedLead = { ...data };
    return context;
  }
}
