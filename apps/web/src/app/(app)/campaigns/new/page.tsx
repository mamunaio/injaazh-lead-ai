"use client";

import React from 'react';
import { PageHeader } from '../../../../components/ui/PageHeader';
import { useCampaignWizard } from '../../../../features/campaigns/hooks/useCampaignWizard';
import { CampaignWizardStepper } from '../../../../features/campaigns/components/wizard/CampaignWizardStepper';
import { StepCampaignInfo } from '../../../../features/campaigns/components/wizard/StepCampaignInfo';
import { StepSelectAudience } from '../../../../features/campaigns/components/wizard/StepSelectAudience';
import { StepSelectSequence } from '../../../../features/campaigns/components/wizard/StepSelectSequence';
import { StepEmailAccount } from '../../../../features/campaigns/components/wizard/StepEmailAccount';
import { StepSchedule } from '../../../../features/campaigns/components/wizard/StepSchedule';
import { StepReview } from '../../../../features/campaigns/components/wizard/StepReview';
import { ArrowLeft, ArrowRight, Save, Rocket, Loader2 } from 'lucide-react';

export default function NewCampaignPage() {
  const {
    currentStep,
    totalSteps,
    formData,
    isSubmitting,
    updateFormData,
    nextStep,
    prevStep,
    saveDraft,
    launchCampaign
  } = useCampaignWizard();

  const isNextDisabled = () => {
    switch (currentStep) {
      case 1:
        return !formData.name.trim();
      case 2:
        return !formData.segmentId;
      case 3:
        return !formData.sequenceId;
      case 4:
        return !formData.emailAccountId;
      case 5:
        if (formData.scheduleType === 'scheduled') {
          return !formData.startDate || !formData.startTime;
        }
        return false;
      default:
        return false;
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-none mb-8">
        <PageHeader 
          title="New Campaign" 
          breadcrumbs={[
            { label: 'Campaigns', href: '/campaigns' },
            { label: 'New Campaign' }
          ]} 
        />
      </div>

      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        {/* Header / Stepper */}
        <div className="px-8 py-6 border-b border-border bg-secondary/5">
          <CampaignWizardStepper currentStep={currentStep} />
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          {currentStep === 1 && <StepCampaignInfo formData={formData} updateFormData={updateFormData} />}
          {currentStep === 2 && <StepSelectAudience formData={formData} updateFormData={updateFormData} />}
          {currentStep === 3 && <StepSelectSequence formData={formData} updateFormData={updateFormData} />}
          {currentStep === 4 && <StepEmailAccount formData={formData} updateFormData={updateFormData} />}
          {currentStep === 5 && <StepSchedule formData={formData} updateFormData={updateFormData} />}
          {currentStep === 6 && <StepReview formData={formData} />}
        </div>

        {/* Footer / Actions */}
        <div className="px-8 py-4 border-t border-border bg-secondary/5 flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1 || isSubmitting}
            className="h-10 px-4 rounded-md font-medium text-sm border border-border bg-background hover:bg-secondary/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={saveDraft}
              disabled={isSubmitting}
              className="h-10 px-4 rounded-md font-medium text-sm border border-border bg-background hover:bg-secondary/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-foreground"
            >
              <Save className="w-4 h-4" />
              Save as Draft
            </button>

            {currentStep < totalSteps ? (
              <button
                onClick={nextStep}
                disabled={isNextDisabled()}
                className="h-10 px-4 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Next Step
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={launchCampaign}
                disabled={isSubmitting}
                className="h-10 px-4 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Launching...
                  </>
                ) : (
                  <>
                    <Rocket className="w-4 h-4" />
                    Launch Campaign
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
