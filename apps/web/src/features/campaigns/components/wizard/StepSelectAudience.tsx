import React, { useState, useEffect } from 'react';
import { CampaignWizardState } from '../../hooks/useCampaignWizard';
import { Segment, SEGMENTS_MOCK_DATA } from '../../../../mocks/segments';
import Link from 'next/link';
import { Users } from 'lucide-react';

interface StepSelectAudienceProps {
  formData: CampaignWizardState;
  updateFormData: (data: Partial<CampaignWizardState>) => void;
}

export function StepSelectAudience({ formData, updateFormData }: StepSelectAudienceProps) {
  const [segments, setSegments] = useState<Segment[]>([]);

  useEffect(() => {
    setSegments(SEGMENTS_MOCK_DATA);
  }, []);

  const selectedSegment = segments.find(s => s.id === formData.segmentId);

  return (
    <div className="flex flex-col gap-6 w-full max-w-xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">Select Audience</h2>
        <p className="text-sm text-secondary-foreground">Choose a segment of leads to target for this campaign.</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="segmentSelect" className="text-sm font-medium text-foreground">
            Segment <span className="text-red-500">*</span>
          </label>
          <select
            id="segmentSelect"
            value={formData.segmentId}
            onChange={(e) => updateFormData({ segmentId: e.target.value })}
            className="w-full h-10 px-3 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
          >
            <option value="" disabled>Select a segment...</option>
            {segments.map(seg => (
              <option key={seg.id} value={seg.id}>
                {seg.name} ({seg.leadCount} leads)
              </option>
            ))}
          </select>
          <div className="flex justify-end mt-1">
            <Link href="/segments" className="text-xs font-medium text-primary hover:underline">
              Create a new segment
            </Link>
          </div>
        </div>

        {selectedSegment && (
          <div className="mt-4 p-4 border border-primary/20 bg-primary/5 rounded-lg flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-foreground">{selectedSegment.name}</span>
              <span className="text-sm text-secondary-foreground">
                This campaign will be sent to <strong className="text-foreground">{selectedSegment.leadCount.toLocaleString()}</strong> leads.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
