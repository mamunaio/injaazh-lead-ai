import React from 'react';
import clsx from 'clsx';
import { Check } from 'lucide-react';

interface CampaignWizardStepperProps {
  currentStep: number;
}

const steps = [
  { id: 1, label: 'Details' },
  { id: 2, label: 'Audience' },
  { id: 3, label: 'Sequence' },
  { id: 4, label: 'Email' },
  { id: 5, label: 'Schedule' },
  { id: 6, label: 'Review' },
];

export function CampaignWizardStepper({ currentStep }: CampaignWizardStepperProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-secondary -z-10" />
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-primary -z-10 transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />
        
        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          
          return (
            <div key={step.id} className="flex flex-col items-center gap-2">
              <div 
                className={clsx(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors bg-background",
                  isCompleted ? "border-primary text-primary" : 
                  isCurrent ? "border-primary text-primary" : 
                  "border-secondary text-secondary-foreground"
                )}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : step.id}
              </div>
              <span 
                className={clsx(
                  "text-xs font-medium",
                  isCompleted || isCurrent ? "text-foreground" : "text-secondary-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
