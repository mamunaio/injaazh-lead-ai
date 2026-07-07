import { Injectable } from '@nestjs/common';
import { IImportPipelineStep } from '../../domain/interfaces/import-step.interface';
import { ImportContext } from '../../domain/entities/import-context.entity';

@Injectable()
export class QueueReadyStep implements IImportPipelineStep {
  async process(context: ImportContext): Promise<ImportContext> {
    if (context.isFailed()) return context;

    // Depending on the infrastructure, this could push to a BullMQ queue.
    // For now, it marks the context as ready for queueing or signals downstream steps.
    context.normalizedLead.metadata = {
      ...context.normalizedLead.metadata,
      isQueueReady: true,
      queuedAt: new Date().toISOString(),
    };

    return context;
  }
}
