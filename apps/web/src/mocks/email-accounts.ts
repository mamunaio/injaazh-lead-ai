export interface EmailAccount {
  id: string;
  email: string;
  provider: 'google' | 'microsoft' | 'smtp';
  dailyLimit: number;
  usedToday: number;
}

export const EMAIL_ACCOUNTS_MOCK_DATA: EmailAccount[] = [
  { id: 'acc_1', email: 'john.doe@injaazh.com', provider: 'google', dailyLimit: 500, usedToday: 120 },
  { id: 'acc_2', email: 'marketing@injaazh.com', provider: 'google', dailyLimit: 2000, usedToday: 1850 },
  { id: 'acc_3', email: 'sales@injaazh.com', provider: 'microsoft', dailyLimit: 1000, usedToday: 50 },
];
