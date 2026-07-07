export type SequenceStepType = 'EMAIL' | 'WAIT';

export interface SequenceStep {
  type: SequenceStepType;
  delayDays?: number; // Only for WAIT
  promptTemplateId?: string; // Only for EMAIL
  order: number;
}

export class Sequence {
  constructor(
    public readonly id: string,
    public organizationId: string,
    public name: string,
    public steps: SequenceStep[],
    public stopOnReply: boolean,
    public isActive: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
