import React, { useState } from 'react';
import { UserRole } from '../../../lib/api/users.service';
import { X } from 'lucide-react';
import clsx from 'clsx';

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (email: string, role: UserRole) => void;
}

export function InviteMemberModal({ isOpen, onClose, onInvite }: InviteMemberModalProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('Member');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleInvite = () => {
    setStatus('sending');
    setTimeout(() => {
      onInvite(email, role);
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setEmail('');
        setRole('Member');
      }, 1000);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground">Invite Team Member</h3>
          <button onClick={onClose} className="text-secondary-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4">
          {status === 'success' && (
            <div className="p-3 mb-2 bg-green-500/10 text-green-500 border border-green-500/20 rounded-lg text-sm font-medium">
              Invite sent successfully!
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="colleague@company.com"
              className="w-full h-10 px-3 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full h-10 px-3 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="Owner">Owner (Full access & billing)</option>
              <option value="Admin">Admin (Full access except billing)</option>
              <option value="Member">Member (Can manage leads & campaigns)</option>
            </select>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-border bg-secondary/5 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary/10 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleInvite}
            disabled={!email || status !== 'idle'}
            className={clsx(
              "px-4 py-2 text-sm font-semibold rounded-md transition-colors",
              !email || status !== 'idle'
                ? "bg-primary/50 text-primary-foreground/50 cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            {status === 'sending' ? 'Sending...' : 'Send Invite'}
          </button>
        </div>
      </div>
    </div>
  );
}
