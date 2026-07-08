import { useState } from 'react';
import { MOCK_BILLING, BillingData } from '../../../mocks/billing';

export function useBilling() {
  const [billing] = useState<BillingData>(MOCK_BILLING);

  return {
    billing
  };
}
