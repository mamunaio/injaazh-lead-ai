import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import clsx from 'clsx';

interface DeleteOrgModalProps {
  isOpen: boolean;
  orgName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteOrgModal({ isOpen, orgName, onClose, onConfirm }: DeleteOrgModalProps) {
  const [confirmName, setConfirmName] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen) return null;

  const isMatch = confirmName === orgName;

  const handleDelete = () => {
    if (isMatch) {
      setIsDeleting(true);
      setTimeout(() => {
        onConfirm();
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-card border border-red-500/30 rounded-xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h3 className="text-lg font-bold text-foreground">Delete Organization</h3>
          </div>
          <button onClick={onClose} className="text-secondary-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4">
          <div className="bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg p-3 text-sm">
            <strong>Warning:</strong> This action is irreversible. All data, leads, campaigns, and team member access will be permanently deleted.
          </div>

          <div>
            <label className="block text-sm text-secondary-foreground mb-1.5">
              Please type <strong>{orgName}</strong> to confirm.
            </label>
            <input
              type="text"
              value={confirmName}
              onChange={(e) => setConfirmName(e.target.value)}
              placeholder={orgName}
              className="w-full h-10 px-3 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-border bg-secondary/5 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary/10 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={!isMatch || isDeleting}
            className={clsx(
              "px-4 py-2 text-sm font-semibold rounded-md transition-colors",
              (!isMatch || isDeleting)
                ? "bg-red-500/50 text-white/50 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600"
            )}
          >
            {isDeleting ? 'Deleting...' : 'Permanently Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
