import React, { useState } from 'react';
import { Copy, RefreshCw, Check } from 'lucide-react';

interface OrgInviteSectionProps {
  orgId: string;
  inviteCode: string;
  onRegenerate: () => void;
}

export function OrgInviteSection({ orgId, inviteCode, onRegenerate }: OrgInviteSectionProps) {
  const [copiedId, setCopiedId] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const copyToClipboard = (text: string, setCopied: React.Dispatch<React.SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm mt-6">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-foreground">Organization IDs & Invites</h2>
        <p className="text-sm text-secondary-foreground">Identifiers used for API access and joining the team.</p>
      </div>

      <div className="flex flex-col gap-6 max-w-md">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Organization ID</label>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={orgId}
              className="flex-1 h-10 px-3 bg-secondary/10 border border-border rounded-md text-sm text-secondary-foreground focus:outline-none"
            />
            <button
              onClick={() => copyToClipboard(orgId, setCopiedId)}
              className="h-10 px-3 bg-secondary/10 hover:bg-secondary/20 border border-border rounded-md text-secondary-foreground transition-colors flex items-center justify-center gap-2 min-w-[80px]"
            >
              {copiedId ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              <span className="text-sm font-medium">{copiedId ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Current Invite Code</label>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={inviteCode}
              className="flex-1 h-10 px-3 bg-secondary/10 border border-border rounded-md text-sm text-secondary-foreground focus:outline-none"
            />
            <button
              onClick={() => copyToClipboard(inviteCode, setCopiedCode)}
              className="h-10 px-3 bg-secondary/10 hover:bg-secondary/20 border border-border rounded-md text-secondary-foreground transition-colors flex items-center justify-center gap-2 min-w-[80px]"
            >
              {copiedCode ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              <span className="text-sm font-medium">{copiedCode ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <button
            onClick={onRegenerate}
            className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Regenerate Invite Code
          </button>
          <p className="text-xs text-secondary-foreground mt-1.5">
            Regenerating the code will invalidate the old one. Previously generated invite links will stop working.
          </p>
        </div>
      </div>
    </div>
  );
}
