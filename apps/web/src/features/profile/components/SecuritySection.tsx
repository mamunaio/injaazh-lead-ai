import React, { useState } from 'react';
import { PasswordStrengthMeter } from './PasswordStrengthMeter';
import clsx from 'clsx';

interface SecuritySectionProps {
  passwordStatus: 'idle' | 'saving' | 'success';
  onChangePassword: (current: string, newPass: string) => void;
}

export function SecuritySection({ passwordStatus, onChangePassword }: SecuritySectionProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const isValid = currentPassword.length > 0 && newPassword.length >= 8 && newPassword === confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("New passwords don't match.");
      return;
    }
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    setError('');
    onChangePassword(currentPassword, newPassword);
    
    // reset after success (in real app, do this inside a useEffect listening to passwordStatus)
    setTimeout(() => {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 1000);
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-bold text-foreground">Security</h2>
        <p className="text-sm text-secondary-foreground mt-1">Manage your password and security settings.</p>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="max-w-2xl flex flex-col gap-6">
          
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              className="w-full h-10 px-3 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={e => {
                  setNewPassword(e.target.value);
                  setError('');
                }}
                className="w-full h-10 px-3 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <PasswordStrengthMeter password={newPassword} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => {
                  setConfirmPassword(e.target.value);
                  setError('');
                }}
                className="w-full h-10 px-3 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="pt-2 flex items-center gap-4">
            <button
              type="submit"
              disabled={!isValid || passwordStatus === 'saving'}
              className={clsx(
                "px-6 py-2 text-sm font-bold rounded-md transition-colors",
                (!isValid || passwordStatus === 'saving')
                  ? "bg-primary/50 text-primary-foreground/50 cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              {passwordStatus === 'saving' ? 'Updating...' : 'Change Password'}
            </button>
            {passwordStatus === 'success' && (
              <span className="text-sm font-medium text-green-500">Password updated ✓</span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
