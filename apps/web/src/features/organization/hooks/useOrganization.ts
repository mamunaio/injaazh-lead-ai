import { useState, useEffect } from 'react';
import { Organization, OrganizationsService } from '../../../lib/api/organizations.service';
import { UsersService } from '../../../lib/api/users.service';

export function useOrganization() {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success'>('idle');

  useEffect(() => {
    let mounted = true;
    const fetchOrg = async () => {
      try {
        const profile = await UsersService.getProfile();
        if (profile?.organizationId) {
          const orgData = await OrganizationsService.getOrganization(profile.organizationId);
          if (mounted) setOrganization(orgData);
        }
      } catch (err) {
        console.error('Failed to fetch organization', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchOrg();
    return () => { mounted = false; };
  }, []);

  const updateName = async (newName: string) => {
    if (!organization) return;
    setSaveStatus('saving');
    try {
      const updated = await OrganizationsService.updateOrganization(organization.id, { name: newName });
      setOrganization(updated);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (err) {
      console.error('Failed to update organization', err);
      setSaveStatus('idle');
    }
  };

  const regenerateInviteCode = async () => {
    // Currently no inviteCode endpoint, simulate or just log
    console.warn("regenerateInviteCode not supported by backend");
  };

  const deleteOrganization = async () => {
    if (!organization) return;
    try {
      await OrganizationsService.deleteOrganization(organization.id);
      window.location.href = '/login';
    } catch (err) {
      console.error('Failed to delete organization', err);
    }
  };

  return {
    organization,
    loading,
    saveStatus,
    updateName,
    regenerateInviteCode,
    deleteOrganization
  };
}
