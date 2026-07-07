"use client";

import React from 'react';
import { PageHeader } from '../../../../components/ui/PageHeader';
import { useLeadImport } from '../../../../features/leads/hooks/useLeadImport';
import { ImportWizardStepper } from '../../../../features/leads/components/import/ImportWizardStepper';
import { StepUploadFile } from '../../../../features/leads/components/import/StepUploadFile';
import { StepMapColumns } from '../../../../features/leads/components/import/StepMapColumns';
import { StepImportOptions } from '../../../../features/leads/components/import/StepImportOptions';
import { ImportProgress } from '../../../../features/leads/components/import/ImportProgress';
import { ImportSuccess } from '../../../../features/leads/components/import/ImportSuccess';

export default function ImportLeadsPage() {
  const {
    currentStep,
    setCurrentStep,
    isParsing,
    csvHeaders,
    previewData,
    mapping,
    setMapping,
    defaultStatus,
    setDefaultStatus,
    tags,
    setTags,
    updateExisting,
    setUpdateExisting,
    importProgress,
    importResult,
    handleUpload,
    handleStartImport
  } = useLeadImport();

  const handleReset = () => {
    window.location.reload();
  };

  const isMapValid = Object.values(mapping).includes('email');

  return (
    <div className="w-full max-w-[1000px] mx-auto">
      <PageHeader 
        title="Import Leads" 
        breadcrumbs={[{ label: 'Leads', href: '/leads' }, { label: 'Import Leads' }]} 
      />

      <div className="bg-card border border-border rounded-xl p-8 mt-6 min-h-[600px] flex flex-col">
        {currentStep !== 'progress' && currentStep !== 'success' && (
          <ImportWizardStepper currentStep={currentStep} />
        )}

        <div className="flex-1">
          {currentStep === 'upload' && (
            <StepUploadFile onUpload={handleUpload} isParsing={isParsing} />
          )}

          {currentStep === 'map' && (
            <StepMapColumns 
              headers={csvHeaders} 
              previewData={previewData} 
              mapping={mapping} 
              setMapping={setMapping} 
            />
          )}

          {currentStep === 'options' && (
            <StepImportOptions 
              defaultStatus={defaultStatus}
              setDefaultStatus={setDefaultStatus}
              tags={tags}
              setTags={setTags}
              updateExisting={updateExisting}
              setUpdateExisting={setUpdateExisting}
              rowCount={previewData.length}
            />
          )}

          {currentStep === 'progress' && (
            <ImportProgress progress={importProgress} />
          )}

          {currentStep === 'success' && (
            <ImportSuccess result={importResult} onReset={handleReset} />
          )}
        </div>

        {/* Footer Actions */}
        {(currentStep === 'map' || currentStep === 'options') && (
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <button 
              onClick={() => setCurrentStep(currentStep === 'options' ? 'map' : 'upload')}
              className="h-10 px-6 rounded-md border border-border bg-background text-foreground font-medium text-sm hover:bg-secondary transition-colors"
            >
              Back
            </button>
            
            {currentStep === 'map' && (
              <button 
                onClick={() => setCurrentStep('options')}
                disabled={!isMapValid}
                className="h-10 px-6 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            )}

            {currentStep === 'options' && (
              <button 
                onClick={handleStartImport}
                className="h-10 px-6 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                Start Import
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
