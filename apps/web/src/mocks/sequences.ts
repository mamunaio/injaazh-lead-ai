export interface Sequence {
  id: string;
  name: string;
  stepCount: number;
  estimatedDuration: string;
}

export const SEQUENCES_MOCK_DATA: Sequence[] = [
  { id: 'seq_1', name: 'Cold Outbound v2', stepCount: 4, estimatedDuration: '14 days' },
  { id: 'seq_2', name: 'Inbound Lead Nurture', stepCount: 6, estimatedDuration: '30 days' },
  { id: 'seq_3', name: 'Webinar Follow-up', stepCount: 3, estimatedDuration: '5 days' },
  { id: 'seq_4', name: 'Re-engagement Campaign', stepCount: 5, estimatedDuration: '21 days' },
];
