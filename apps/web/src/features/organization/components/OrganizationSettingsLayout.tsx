import React, { useState } from 'react';
import { useOrganization } from '../hooks/useOrganization';
import { OrgProfileSection } from './OrgProfileSection';
import { OrgInviteSection } from './OrgInviteSection';
import { OrgDangerZone } from './OrgDangerZone';
import { DeleteOrgModal } from './DeleteOrgModal';

export function OrganizationSettingsLayout() {
  const {
    organization,
    loading,
    saveStatus,
    updateName,
    regenerateInviteCode,
    deleteOrganization
  } = useOrganization();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  if (loading || !organization) {
    return <div className="p-6">Loading organization...</div>;
  }

  return (
    <div className="w-full h-full flex flex-col bg-background p-6 overflow-y-auto">
      <div className="max-w-5xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Organization Settings</h1>
          <p className="text-sm text-secondary-foreground mt-1">Manage your organization&apos;s core details and invites.</p>
        </div>

        <div className="flex flex-col gap-6">
          <OrgProfileSection 
            currentName={organization.name}
            saveStatus={saveStatus}
            onSave={updateName}
          />
          
          <div className="h-px bg-border my-2"></div>

          <OrgInviteSection
            orgId={organization.id}
            inviteCode={"INJAAZH-INVITE-2026"}
            onRegenerate={regenerateInviteCode}
          />

          <OrgDangerZone onDeleteClick={() => setIsDeleteModalOpen(true)} />
        </div>
      </div>

      <DeleteOrgModal
        isOpen={isDeleteModalOpen}
        orgName={organization.name}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={deleteOrganization}
      />
    </div>
  );
}
