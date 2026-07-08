import React from 'react';
import { CampaignWizardState } from '../../hooks/useCampaignWizard';

interface StepCampaignInfoProps {
  formData: CampaignWizardState;
  updateFormData: (data: Partial<CampaignWizardState>) => void;
}

export function StepCampaignInfo({ formData, updateFormData }: StepCampaignInfoProps) {
  return (
    <div className="flex flex-col gap-6 w-full max-w-xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">Campaign Details</h2>
        <p className="text-sm text-secondary-foreground">Provide a name and description for your new campaign.</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="campaignName" className="text-sm font-medium text-foreground">
            Campaign Name <span className="text-red-500">*</span>
          </label>
          <input
            id="campaignName"
            type="text"
            value={formData.name}
            onChange={(e) => updateFormData({ name: e.target.value })}
            placeholder="e.g. Q3 Enterprise Outreach"
            className="w-full h-10 px-3 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
            autoFocus
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="campaignDescription" className="text-sm font-medium text-foreground">
            Description <span className="text-secondary-foreground font-normal">(Optional)</span>
          </label>
          <textarea
            id="campaignDescription"
            value={formData.description}
            onChange={(e) => updateFormData({ description: e.target.value })}
            placeholder="Add some context about this campaign..."
            className="w-full min-h-[100px] p-3 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-y"
          />
        </div>
      </div>
    </div>
  );
}
