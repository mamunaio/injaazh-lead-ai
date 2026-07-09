import { useState } from 'react';
import { apiFetch } from '../../../lib/api';
type BillingData = any;

export function useBilling() {
  const [billing] = useState<BillingData>(MOCK_BILLING);

  return {
    billing
  };
}
