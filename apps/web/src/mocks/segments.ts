export interface Segment {
  id: string;
  name: string;
  leadCount: number;
}

export const SEGMENTS_MOCK_DATA: Segment[] = [
  { id: 'seg_1', name: 'Enterprise Tech Leads', leadCount: 450 },
  { id: 'seg_2', name: 'All Active Customers', leadCount: 1200 },
  { id: 'seg_3', name: 'FinTech Founders', leadCount: 850 },
  { id: 'seg_4', name: 'Webinar Attendees - May', leadCount: 320 },
  { id: 'seg_5', name: 'Cold Outbound List A', leadCount: 2000 },
];
