import React, { useState } from 'react';
import { User as UserProfile } from '../../../lib/api/users.service';
import { User } from 'lucide-react';
import clsx from 'clsx';

interface PersonalInfoSectionProps {
  profile: UserProfile;
  saveStatus: 'idle' | 'saving' | 'success';
  onSave: (data: Partial<UserProfile>) => void;
}

export function PersonalInfoSection({ profile, saveStatus, onSave }: PersonalInfoSectionProps) {
  const [formData, setFormData] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email
  });
  const [prevProfile, setPrevProfile] = useState(profile);

  if (profile !== prevProfile) {
    setPrevProfile(profile);
    setFormData({
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email
    });
  }

  const hasChanges = 
    formData.firstName !== profile.firstName ||
    formData.lastName !== profile.lastName ||
    formData.email !== profile.email;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasChanges) {
      onSave(formData);
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-bold text-foreground">Personal Information</h2>
        <p className="text-sm text-secondary-foreground mt-1">Update your personal details and public profile.</p>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="max-w-2xl flex flex-col gap-6">
          
          <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center border border-border">
                <User className="w-8 h-8 text-secondary-foreground" />
              </div>
            <div>
              <button type="button" className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground text-sm font-semibold rounded-md transition-colors">
                Change Avatar
              </button>
              <p className="text-xs text-secondary-foreground mt-2">JPG, GIF or PNG. Max size of 800K</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={e => setFormData(f => ({ ...f, firstName: e.target.value }))}
                className="w-full h-10 px-3 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={e => setFormData(f => ({ ...f, lastName: e.target.value }))}
                className="w-full h-10 px-3 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
              className="w-full h-10 px-3 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="pt-2 flex items-center gap-4">
            <button
              type="submit"
              disabled={!hasChanges || saveStatus === 'saving'}
              className={clsx(
                "px-6 py-2 text-sm font-bold rounded-md transition-colors",
                (!hasChanges || saveStatus === 'saving')
                  ? "bg-primary/50 text-primary-foreground/50 cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              {saveStatus === 'saving' ? 'Saving...' : 'Save Profile'}
            </button>
            {saveStatus === 'success' && (
              <span className="text-sm font-medium text-green-500">Profile updated ✓</span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
