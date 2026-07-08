import { apiFetch } from '../api';

// Backend step types are UPPERCASE
export type SequenceStepType = 'EMAIL' | 'WAIT';

// Matches the exact backend SequenceStep entity
export interface ApiSequenceStep {
  type: SequenceStepType;
  promptTemplateId?: string; // Required for EMAIL steps
  delayDays?: number;        // Required for WAIT steps
  order: number;             // Position in the sequence (0-indexed)
}

// Frontend UI step — includes a client-side _key for React rendering
// This is transformed to ApiSequenceStep when sending to the backend
export interface UiStep {
  _key: string;              // Client-side only — NOT sent to API
  type: SequenceStepType;
  promptTemplateId?: string;
  delayDays?: number;
}

// Matches the exact backend Sequence entity
export interface Sequence {
  id: string;
  organizationId: string;
  name: string;
  steps: ApiSequenceStep[];
  stopOnReply: boolean;
  isActive: boolean;         // Backend uses isActive, NOT status string
  createdAt: string;
  updatedAt: string;
}

// Transform UI steps → API steps (add order, strip _key)
export function toApiSteps(uiSteps: UiStep[]): ApiSequenceStep[] {
  return uiSteps.map((s, idx) => ({
    type: s.type,
    ...(s.promptTemplateId ? { promptTemplateId: s.promptTemplateId } : {}),
    ...(s.delayDays != null ? { delayDays: s.delayDays } : {}),
    order: idx,
  }));
}

// Transform API steps → UI steps (add _key, strip order)
export function fromApiSteps(apiSteps: ApiSequenceStep[]): UiStep[] {
  const sorted = [...apiSteps].sort((a, b) => a.order - b.order);
  return sorted.map(s => ({
    _key: crypto.randomUUID(),
    type: s.type,
    promptTemplateId: s.promptTemplateId,
    delayDays: s.delayDays,
  }));
}

export interface CreateSequencePayload {
  name: string;
  steps: ApiSequenceStep[];
  stopOnReply?: boolean;
  isActive?: boolean;
}

export const SequencesService = {
  getSequences: async (): Promise<Sequence[]> => {
    return apiFetch<Sequence[]>('/sequences');
  },

  getSequence: async (id: string): Promise<Sequence> => {
    return apiFetch<Sequence>(`/sequences/${id}`);
  },

  createSequence: async (data: CreateSequencePayload): Promise<Sequence> => {
    return apiFetch<Sequence>('/sequences', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateSequence: async (id: string, data: Partial<CreateSequencePayload>): Promise<Sequence> => {
    return apiFetch<Sequence>(`/sequences/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  deleteSequence: async (id: string): Promise<void> => {
    return apiFetch<void>(`/sequences/${id}`, {
      method: 'DELETE',
    });
  },
};

// Keep legacy export for backward compat with useSequenceBuilder re-export
export type { UiStep as SequenceStep };
export type { SequenceStepType as SequenceStepTypeLegacy };
