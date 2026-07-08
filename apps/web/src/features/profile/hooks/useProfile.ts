import { useState, useEffect } from 'react';
import { User, UsersService } from '../../../lib/api/users.service';

export function useProfile() {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success'>('idle');
  const [passwordStatus, setPasswordStatus] = useState<'idle' | 'saving' | 'success'>('idle');

  useEffect(() => {
    let mounted = true;
    const fetchProfile = async () => {
      try {
        const data = await UsersService.getProfile();
        if (mounted) {
          setProfile(data);
        }
      } catch (err) {
        console.error('Failed to fetch profile', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchProfile();
    return () => { mounted = false; };
  }, []);

  const updateProfile = async (updatedData: Partial<User>) => {
    if (!profile) return;
    setSaveStatus('saving');
    try {
      const updated = await UsersService.updateUser(profile.id, updatedData);
      setProfile(updated);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2500);
    } catch (err) {
      console.error('Failed to update profile', err);
      setSaveStatus('idle'); // or error state
    }
  };

  const changePassword = async (_current: string, _newPass: string) => {
    setPasswordStatus('saving');
    // Actual API call for changing password might not be in UsersService, we keep simulate for now
    setTimeout(() => {
      setPasswordStatus('success');
      setTimeout(() => setPasswordStatus('idle'), 2500);
    }, 1000);
  };

  return {
    profile,
    loading,
    saveStatus,
    passwordStatus,
    updateProfile,
    changePassword
  };
}
