import { ContextBuilderState } from '../entities/context-builder-state.entity';

export interface IContextBuilderStep {
  process(state: ContextBuilderState): Promise<ContextBuilderState>;
}
