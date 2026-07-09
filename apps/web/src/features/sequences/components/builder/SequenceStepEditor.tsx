import React, { useEffect, useState } from 'react';
import { SequenceStep } from '../../hooks/useSequenceBuilder';
import { PromptTemplate, PromptsService } from '../../../../lib/api/prompts.service';
import { EmailStepCard } from './EmailStepCard';
import { WaitStepCard } from './WaitStepCard';
import { AddStepControls } from './AddStepControls';

interface SequenceStepEditorProps {
  steps: SequenceStep[];
  updateStep: (key: string, updates: Partial<SequenceStep>) => void;
  removeStep: (key: string) => void;
  addEmailStep: () => void;
  addWaitStep: () => void;
}

export function SequenceStepEditor({
  steps,
  updateStep,
  removeStep,
  addEmailStep,
  addWaitStep
}: SequenceStepEditorProps) {
  const [templates, setTemplates] = useState<PromptTemplate[]>([]);
  const [templatesLoading, setTemplatesLoading] = useState(true);

  useEffect(() => {
    PromptsService.getTemplates()
      .then(data => {
        setTemplates(data);
        setTemplatesLoading(false);
      })
      .catch(() => {
        // If no templates exist yet, show empty state gracefully
        setTemplates([]);
        setTemplatesLoading(false);
      });
  }, []);

  let emailIndex = 0;

  return (
    <div className="flex flex-col max-w-2xl mx-auto w-full">
      <div className="flex flex-col gap-6">
        {steps.map((step, idx) => {
          const isEmail = step.type === 'EMAIL';
          if (isEmail) {
            const currentIndex = emailIndex;
            emailIndex++;
            return (
              <div key={step._key} className="relative">
                <EmailStepCard
                  step={step}
                  index={currentIndex}
                  templates={templates}
                  templatesLoading={templatesLoading}
                  updateStep={updateStep}
                  removeStep={removeStep}
                  canRemove={steps.length > 1}
                />
                {idx < steps.length - 1 && (
                  <div className="absolute left-1/2 -bottom-6 w-px h-6 bg-border -translate-x-1/2" />
                )}
              </div>
            );
          } else {
            return (
              <div key={step._key} className="relative w-3/4 mx-auto">
                <WaitStepCard
                  step={step}
                  updateStep={updateStep}
                  removeStep={removeStep}
                />
                {idx < steps.length - 1 && (
                  <div className="absolute left-1/2 -bottom-6 w-px h-6 bg-border -translate-x-1/2" />
                )}
              </div>
            );
          }
        })}

        <AddStepControls onAddEmail={addEmailStep} onAddWait={addWaitStep} />
      </div>
    </div>
  );
}
