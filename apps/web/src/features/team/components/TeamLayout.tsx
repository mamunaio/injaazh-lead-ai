import React from 'react';
import { useTeam } from '../hooks/useTeam';
import { TeamTable } from './TeamTable';
import { InviteMemberModal } from './InviteMemberModal';
import { UserPlus } from 'lucide-react';

export function TeamLayout() {
  const { 
    members, 
    isInviteModalOpen, 
    setIsInviteModalOpen, 
    updateMemberRole, 
    removeMember, 
    inviteMember 
  } = useTeam();

  return (
    <div className="w-full h-full flex flex-col bg-background p-6 overflow-y-auto">
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Team Members</h1>
            <p className="text-sm text-secondary-foreground mt-1">Manage your team and their account permissions.</p>
          </div>
          <button
            onClick={() => setIsInviteModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            Invite Member
          </button>
        </div>

        <TeamTable
          members={members}
          onUpdateRole={updateMemberRole}
          onRemove={removeMember}
        />
      </div>

      <InviteMemberModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInvite={inviteMember}
      />
    </div>
  );
}
