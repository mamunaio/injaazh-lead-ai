export type TeamRole = 'owner' | 'admin' | 'member';
export type MemberStatus = 'active' | 'invited' | 'suspended';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  status: MemberStatus;
  joinedAt: string;
  avatarUrl?: string;
}

export const MOCK_TEAM: TeamMember[] = [
  {
    id: 'u_1',
    name: 'Mamun Rahman',
    email: 'mamun@injaazh.ai',
    role: 'owner',
    status: 'active',
    joinedAt: 'Jan 10, 2026',
    avatarUrl: 'https://ui-avatars.com/api/?name=Mamun+Rahman&background=0D8ABC&color=fff'
  },
  {
    id: 'u_2',
    name: 'Alex Director',
    email: 'alex@injaazh.ai',
    role: 'admin',
    status: 'active',
    joinedAt: 'Feb 15, 2026',
    avatarUrl: 'https://ui-avatars.com/api/?name=Alex+Director&background=10b981&color=fff'
  },
  {
    id: 'u_3',
    name: 'Sarah Sales',
    email: 'sarah@injaazh.ai',
    role: 'member',
    status: 'active',
    joinedAt: 'Mar 01, 2026',
    avatarUrl: 'https://ui-avatars.com/api/?name=Sarah+Sales&background=f59e0b&color=fff'
  },
  {
    id: 'u_4',
    name: 'John Closer',
    email: 'john@injaazh.ai',
    role: 'member',
    status: 'active',
    joinedAt: 'Mar 20, 2026',
    avatarUrl: 'https://ui-avatars.com/api/?name=John+Closer&background=6366f1&color=fff'
  },
  {
    id: 'u_5',
    name: 'Pending User',
    email: 'newhire@injaazh.ai',
    role: 'member',
    status: 'invited',
    joinedAt: 'Jul 05, 2026',
  },
  {
    id: 'u_6',
    name: 'Suspended Intern',
    email: 'intern@injaazh.ai',
    role: 'member',
    status: 'suspended',
    joinedAt: 'Apr 10, 2026',
    avatarUrl: 'https://ui-avatars.com/api/?name=Suspended+Intern&background=ef4444&color=fff'
  }
];
