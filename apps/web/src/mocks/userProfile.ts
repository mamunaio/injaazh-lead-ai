export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
}

export const MOCK_USER_PROFILE: UserProfile = {
  id: 'usr_abc123xyz',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@injaazh.ai',
  avatarUrl: 'https://i.pravatar.cc/150?u=john.doe@injaazh.ai'
};
