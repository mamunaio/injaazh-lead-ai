import { ImportContext } from '../entities/import-context.entity';

export interface IImportPipelineStep {
  /**
   * Executes a step in the import pipeline.
   * If the step decides to halt the pipeline, it should set context.status to 'Failed'.
   */
  process(context: ImportContext): Promise<ImportContext>;
}
