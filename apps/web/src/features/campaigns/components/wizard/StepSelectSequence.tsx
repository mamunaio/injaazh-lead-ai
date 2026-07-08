import React, { useState, useEffect } from 'react';
import { CampaignWizardState } from '../../hooks/useCampaignWizard';
import { SequencesService, Sequence } from '../../../../lib/api/sequences.service';
import Link from 'next/link';
import { Route } from 'lucide-react';

interface StepSelectSequenceProps {
  formData: CampaignWizardState;
  updateFormData: (data: Partial<CampaignWizardState>) => void;
}

export function StepSelectSequence({ formData, updateFormData }: StepSelectSequenceProps) {
  const [sequences, setSequences] = useState<Sequence[]>([]);

  useEffect(() => {
    SequencesService.getSequences().then(data => setSequences(data)).catch(console.error);
  }, []);

  const selectedSequence = sequences.find(s => s.id === formData.sequenceId);

  return (
    <div className="flex flex-col gap-6 w-full max-w-xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">Select Sequence</h2>
        <p className="text-sm text-secondary-foreground">Choose an automated email sequence to send to your audience.</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="sequenceSelect" className="text-sm font-medium text-foreground">
            Sequence <span className="text-red-500">*</span>
          </label>
          <select
            id="sequenceSelect"
            value={formData.sequenceId}
            onChange={(e) => updateFormData({ sequenceId: e.target.value })}
            className="w-full h-10 px-3 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
          >
            <option value="" disabled>Select a sequence...</option>
            {sequences.map(seq => (
              <option key={seq.id} value={seq.id}>
                {seq.name}
              </option>
            ))}
          </select>
          <div className="flex justify-end mt-1">
            <Link href="/sequences/new" className="text-xs font-medium text-primary hover:underline">
              Create a new sequence
            </Link>
          </div>
        </div>

        {selectedSequence && (
          <div className="mt-4 p-4 border border-primary/20 bg-primary/5 rounded-lg flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <Route className="w-5 h-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-foreground">{selectedSequence.name}</span>
              <span className="text-sm text-secondary-foreground mt-1">
                This sequence contains <strong className="text-foreground">{selectedSequence.steps?.length || 0} steps</strong>.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
