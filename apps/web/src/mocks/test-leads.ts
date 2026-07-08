export interface TestLead {
  id: string;
  firstName: string;
  lastName: string;
  company: string;
  jobTitle: string;
  email: string;
}

export const TEST_LEADS_MOCK_DATA: TestLead[] = [
  {
    id: 'tl_1',
    firstName: 'Alice',
    lastName: 'Johnson',
    company: 'TechFlow Inc.',
    jobTitle: 'VP of Engineering',
    email: 'alice@techflow.io'
  },
  {
    id: 'tl_2',
    firstName: 'Bob',
    lastName: 'Smith',
    company: 'Global Enterprises',
    jobTitle: 'Sales Director',
    email: 'bob.smith@globalent.com'
  },
  {
    id: 'tl_3',
    firstName: 'Charlie',
    lastName: 'Davis',
    company: 'StartupX',
    jobTitle: 'CEO',
    email: 'charlie@startupx.co'
  }
];
