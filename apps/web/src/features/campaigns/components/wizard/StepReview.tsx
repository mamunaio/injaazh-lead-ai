import React, { useEffect, useState } from 'react';
import { CampaignWizardState } from '../../hooks/useCampaignWizard';
import { SEGMENTS_MOCK_DATA } from '../../../../mocks/segments';
import { SEQUENCES_MOCK_DATA } from '../../../../mocks/sequences';
import { EMAIL_ACCOUNTS_MOCK_DATA } from '../../../../mocks/email-accounts';
import { AlertTriangle, Info } from 'lucide-react';

interface StepReviewProps {
  formData: CampaignWizardState;
}

export function StepReview({ formData }: StepReviewProps) {
  const [data, setData] = useState({
    segment: null as any,
    sequence: null as any,
    account: null as any,
  });

  useEffect(() => {
    setData({
      segment: SEGMENTS_MOCK_DATA.find(s => s.id === formData.segmentId),
      sequence: SEQUENCES_MOCK_DATA.find(s => s.id === formData.sequenceId),
      account: EMAIL_ACCOUNTS_MOCK_DATA.find(s => s.id === formData.emailAccountId),
    });
  }, [formData]);

  const leadCount = data.segment?.leadCount || 0;
  const isImmediate = formData.scheduleType === 'immediate';

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">Review & Launch</h2>
        <p className="text-sm text-secondary-foreground">Review your campaign configuration before launching.</p>
      </div>

      {isImmediate && leadCount > 1000 && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <h4 className="text-sm font-semibold text-amber-500">High Volume Immediate Send</h4>
            <p className="text-xs text-amber-500/90 mt-1">
              You are about to send to {leadCount.toLocaleString()} leads immediately. This may cause delivery rate issues if your email account is not fully warmed up.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Campaign Info */}
        <div className="col-span-1 md:col-span-2 p-4 border border-border rounded-xl bg-secondary/5">
          <div className="text-xs font-semibold text-secondary-foreground mb-2 uppercase tracking-wider">Campaign Details</div>
          <div className="text-foreground font-medium mb-1">{formData.name || 'Unnamed Campaign'}</div>
          {formData.description && (
            <div className="text-sm text-secondary-foreground">{formData.description}</div>
          )}
        </div>

        {/* Audience */}
        <div className="p-4 border border-border rounded-xl bg-secondary/5">
          <div className="text-xs font-semibold text-secondary-foreground mb-2 uppercase tracking-wider">Audience</div>
          <div className="text-foreground font-medium mb-1">{data.segment?.name || 'No segment selected'}</div>
          <div className="text-sm text-secondary-foreground">
            {leadCount > 0 ? `${leadCount.toLocaleString()} leads` : '0 leads'}
          </div>
        </div>

        {/* Sequence */}
        <div className="p-4 border border-border rounded-xl bg-secondary/5">
          <div className="text-xs font-semibold text-secondary-foreground mb-2 uppercase tracking-wider">Sequence</div>
          <div className="text-foreground font-medium mb-1">{data.sequence?.name || 'No sequence selected'}</div>
          <div className="text-sm text-secondary-foreground">
            {data.sequence?.stepCount} steps • {data.sequence?.estimatedDuration}
          </div>
        </div>

        {/* Email Account */}
        <div className="p-4 border border-border rounded-xl bg-secondary/5">
          <div className="text-xs font-semibold text-secondary-foreground mb-2 uppercase tracking-wider">Sender Account</div>
          <div className="text-foreground font-medium mb-1">{data.account?.email || 'No account selected'}</div>
          <div className="text-sm text-secondary-foreground capitalize">
            {data.account?.provider} Provider
          </div>
        </div>

        {/* Schedule */}
        <div className="p-4 border border-border rounded-xl bg-secondary/5">
          <div className="text-xs font-semibold text-secondary-foreground mb-2 uppercase tracking-wider">Schedule</div>
          {isImmediate ? (
            <div className="text-foreground font-medium mb-1">Start Immediately</div>
          ) : (
            <>
              <div className="text-foreground font-medium mb-1">
                {formData.startDate} at {formData.startTime}
              </div>
              <div className="text-sm text-secondary-foreground">{formData.timezone}</div>
            </>
          )}
        </div>
      </div>
      
      <div className="bg-secondary/10 rounded-lg p-3 flex gap-2 items-start mt-2">
        <Info className="w-4 h-4 text-secondary-foreground shrink-0 mt-0.5" />
        <p className="text-xs text-secondary-foreground">
          Emails will be sent according to your account's daily limits and sending window configurations.
        </p>
      </div>
    </div>
  );
}
