import React from 'react';
import { useProfile } from '../hooks/useProfile';
import { PersonalInfoSection } from './PersonalInfoSection';
import { SecuritySection } from './SecuritySection';

export function ProfileLayout() {
  const { profile, loading, saveStatus, passwordStatus, updateProfile, changePassword } = useProfile();

  if (loading || !profile) {
    return <div className="p-6">Loading profile...</div>;
  }

  return (
    <div className="w-full h-full flex flex-col bg-background p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Profile Settings</h1>
          <p className="text-sm text-secondary-foreground mt-1">Manage your account details and security.</p>
        </div>

        <div className="flex flex-col gap-8">
          <PersonalInfoSection 
            profile={profile} 
            saveStatus={saveStatus} 
            onSave={updateProfile} 
          />
          <SecuritySection 
            passwordStatus={passwordStatus}
            onChangePassword={changePassword}
          />
        </div>
      </div>
    </div>
  );
}
