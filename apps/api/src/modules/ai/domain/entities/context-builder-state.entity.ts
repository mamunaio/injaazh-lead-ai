import { AiContext } from './ai-context.entity';
import type { Lead } from '../../../leads/domain/entities/lead.entity';

export class ContextBuilderState {
  public aiContext: AiContext = new AiContext();
  public errors: string[] = [];
  public status: 'Pending' | 'Success' | 'Failed' = 'Pending';

  constructor(
    public readonly organizationId: string,
    public readonly leadId: string,
    public readonly leadDocument: Lead,
    public readonly outreachGoal: string
  ) {}

  addError(error: string) {
    this.errors.push(error);
    this.status = 'Failed';
  }

  isFailed(): boolean {
    return this.status === 'Failed';
  }
}
