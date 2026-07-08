"use client";

import React, { use } from 'react';
import { PageHeader } from '../../../../../components/ui/PageHeader';
import { useSequenceBuilder } from '../../../../../features/sequences/hooks/useSequenceBuilder';
import { SequenceStepEditor } from '../../../../../features/sequences/components/builder/SequenceStepEditor';
import { Save, Loader2, AlertCircle } from 'lucide-react';
import clsx from 'clsx';

export default function EditSequencePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const {
    name,
    setName,
    stopOnReply,
    setStopOnReply,
    steps,
    addEmailStep,
    addWaitStep,
    removeStep,
    updateStep,
    saveSequence,
    isSaving,
    isLoading,
    error,
  } = useSequenceBuilder(resolvedParams.id);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center min-h-[calc(100vh-56px)]">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col p-4 sm:p-5 md:p-6 lg:p-8 max-w-[1600px] mx-auto min-h-[calc(100vh-56px)]">
      <div className="flex-none mb-6 flex items-center justify-between">
        <PageHeader 
          title="Edit Sequence" 
          breadcrumbs={[
            { label: 'Sequences', href: '/sequences' },
            { label: 'Edit Sequence' }
          ]} 
        />
        
        <button
          onClick={saveSequence}
          disabled={isSaving}
          className="h-10 px-6 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          )}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto bg-background flex flex-col gap-8 pb-12">
        {error && (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold text-red-500">Validation Error</h3>
              <p className="text-sm text-red-500/90 mt-1">{error}</p>
            </div>
          </div>
        )}

        <div className="p-6 bg-card border border-border rounded-xl shadow-sm flex flex-col gap-6 max-w-4xl mx-auto w-full">
          <div className="flex flex-col gap-2">
            <label htmlFor="sequenceName" className="text-sm font-medium text-foreground">
              Sequence Name <span className="text-red-500">*</span>
            </label>
            <input
              id="sequenceName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Q3 Inbound Nurture"
              className="w-full h-10 px-3 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
            />
          </div>

          <div className="flex items-center justify-between py-2 border-t border-border">
            <div className="flex flex-col">
              <span className="font-medium text-foreground text-sm">Stop on Reply</span>
              <span className="text-xs text-secondary-foreground">Automatically stop sending sequence emails when a lead replies.</span>
            </div>
            
            <button
              type="button"
              onClick={() => setStopOnReply(!stopOnReply)}
              className={clsx(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                stopOnReply ? "bg-primary" : "bg-secondary"
              )}
            >
              <span className="sr-only">Toggle Stop on Reply</span>
              <span
                className={clsx(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  stopOnReply ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto w-full">
          <SequenceStepEditor
            steps={steps}
            updateStep={updateStep}
            removeStep={removeStep}
            addEmailStep={addEmailStep}
            addWaitStep={addWaitStep}
          />
        </div>
      </div>
    </div>
  );
}
