import React from 'react';
import clsx from 'clsx';
import { ImportStep } from '../../hooks/useLeadImport';

interface ImportWizardStepperProps {
  currentStep: ImportStep;
}

export function ImportWizardStepper({ currentStep }: ImportWizardStepperProps) {
  const steps = [
    { id: 'upload', label: '1. Upload File', order: 1 },
    { id: 'map', label: '2. Map Columns', order: 2 },
    { id: 'options', label: '3. Options & Confirm', order: 3 },
  ];

  const getStepOrder = (step: ImportStep) => {
    switch(step) {
      case 'upload': return 1;
      case 'map': return 2;
      case 'options': return 3;
      case 'progress': return 4;
      case 'success': return 5;
      default: return 1;
    }
  };

  const currentOrder = getStepOrder(currentStep);

  return (
    <div className="flex items-center gap-4 border-b border-border mb-8 pb-4">
      {steps.map((step, index) => {
        const isCompleted = currentOrder > step.order;
        const isActive = currentOrder === step.order;
        
        return (
          <div key={step.id} className="flex items-center gap-4">
            <div className={clsx(
              "flex items-center gap-2",
              isActive ? "text-primary" : isCompleted ? "text-foreground" : "text-secondary-foreground/50"
            )}>
              <span className={clsx(
                "w-6 h-6 rounded-full flex items-center justify-center text-[0.75rem] font-bold",
                isActive ? "bg-primary text-primary-foreground" : isCompleted ? "bg-secondary text-secondary-foreground" : "bg-secondary/50 text-secondary-foreground/50"
              )}>
                {step.order}
              </span>
              <span className="text-sm font-medium">{step.label.split('. ')[1]}</span>
            </div>
            {index < steps.length - 1 && (
              <div className="w-12 h-px bg-border" />
            )}
          </div>
        );
      })}
    </div>
  );
}
