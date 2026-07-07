import { RawLeadData } from '../entities/import-context.entity';
import { SourceType } from '../types/source-type.enum';

export interface ILeadSourceStrategy {
  /**
   * Identifies which source type this strategy handles.
   */
  readonly sourceType: SourceType;

  /**
   * Parses and standardizes the incoming raw payload into the internal RawLeadData format.
   */
  mapPayload(payload: any): Promise<RawLeadData[]>;
}
