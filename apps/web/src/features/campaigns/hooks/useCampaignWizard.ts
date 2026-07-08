import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { CampaignsService } from '../../../lib/api/campaigns.service';

export interface CampaignWizardState {
  name: string;
  description: string;
  segmentId: string;
  sequenceId: string;
  emailAccountId: string;
  scheduleType: 'immediate' | 'scheduled';
  startDate: string;
  startTime: string;
  timezone: string;
}

const initialState: CampaignWizardState = {
  name: '',
  description: '',
  segmentId: '',
  sequenceId: '',
  emailAccountId: '',
  scheduleType: 'immediate',
  startDate: '',
  startTime: '',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
};

export function useCampaignWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CampaignWizardState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 6;

  const updateFormData = useCallback((data: Partial<CampaignWizardState>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  }, [totalSteps]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const saveDraft = useCallback(async () => {
    setIsSubmitting(true);
    try {
      await CampaignsService.createCampaign({
        name: formData.name || 'Untitled Campaign',
        status: 'Draft',
        // Optional fields could be passed here based on API DTO
        // segmentId: formData.segmentId,
      });
      router.push('/campaigns');
    } catch (err) {
      console.error('Failed to save draft', err);
      alert('Failed to save draft');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, router]);

  const launchCampaign = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const camp = await CampaignsService.createCampaign({
        name: formData.name || 'Untitled Campaign',
        status: 'Active',
      });
      await CampaignsService.updateStatus(camp.id, 'Active');
      router.push('/campaigns');
    } catch (err) {
      console.error('Failed to launch campaign', err);
      alert('Failed to launch campaign');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, router]);

  return {
    currentStep,
    totalSteps,
    formData,
    isSubmitting,
    updateFormData,
    nextStep,
    prevStep,
    saveDraft,
    launchCampaign,
  };
}
