import { useState, useEffect } from 'react';
import { User, UsersService, UserRole } from '../../../lib/api/users.service';

export function useTeam() {
  const [members, setMembers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchTeam = async () => {
      try {
        const profile = await UsersService.getProfile();
        if (profile?.organizationId) {
          const orgMembers = await UsersService.getOrganizationUsers(profile.organizationId);
          if (mounted) {
            setMembers(orgMembers);
          }
        }
      } catch (err) {
        console.error('Failed to fetch team', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchTeam();
    return () => { mounted = false; };
  }, []);

  const updateMemberRole = async (id: string, role: UserRole) => {
    try {
      const updated = await UsersService.updateUser(id, { role });
      setMembers(prev => prev.map(m => m.id === id ? { ...m, role: updated.role } : m));
    } catch (err) {
      console.error('Failed to update role', err);
    }
  };

  const removeMember = async (id: string) => {
    try {
      await UsersService.deleteUser(id);
      setMembers(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      console.error('Failed to remove member', err);
    }
  };

  const inviteMember = async (email: string, role: UserRole) => {
    // In a real app this would call an invitations endpoint
    // For now we'll just log it or simulate
    console.warn('Invite functionality not fully implemented on backend');
  };

  return {
    members,
    loading,
    isInviteModalOpen,
    setIsInviteModalOpen,
    updateMemberRole,
    removeMember,
    inviteMember
  };
}
