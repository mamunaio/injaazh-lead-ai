"use client";

import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../../../components/ui/PageHeader';
import { useSequenceBuilder } from '../../../../features/sequences/hooks/useSequenceBuilder';
import { SequenceStepEditor } from '../../../../features/sequences/components/builder/SequenceStepEditor';
import { CampaignsService, Campaign } from '../../../../lib/api/campaigns.service';
import { Save, Loader2, AlertCircle } from 'lucide-react';
import clsx from 'clsx';

export default function NewSequencePage() {
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
    error,
  } = useSequenceBuilder();

  // Optional campaign linking
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState('');

  useEffect(() => {
    CampaignsService.getCampaigns()
      .then(data => setCampaigns(data))
      .catch(() => {/* silent — campaign linking is optional */});
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-none mb-6 flex items-center justify-between">
        <PageHeader
          title="Create Sequence"
          breadcrumbs={[
            { label: 'Sequences', href: '/sequences' },
            { label: 'New Sequence' }
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
              Save Sequence
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
              autoFocus
            />
          </div>

          {campaigns.length > 0 && (
            <div className="flex flex-col gap-2">
              <label htmlFor="campaignLink" className="text-sm font-medium text-foreground">
                Link to Campaign <span className="text-secondary-foreground text-xs font-normal">(optional)</span>
              </label>
              <select
                id="campaignLink"
                value={selectedCampaignId}
                onChange={(e) => setSelectedCampaignId(e.target.value)}
                className="w-full h-10 px-3 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              >
                <option value="">— None —</option>
                {campaigns.map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.status})</option>
                ))}
              </select>
            </div>
          )}

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
