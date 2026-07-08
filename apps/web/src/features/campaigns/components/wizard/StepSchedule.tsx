import React from 'react';
import { CampaignWizardState } from '../../hooks/useCampaignWizard';
import { Calendar, Clock } from 'lucide-react';
import clsx from 'clsx';

interface StepScheduleProps {
  formData: CampaignWizardState;
  updateFormData: (data: Partial<CampaignWizardState>) => void;
}

export function StepSchedule({ formData, updateFormData }: StepScheduleProps) {
  return (
    <div className="flex flex-col gap-6 w-full max-w-xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">Schedule</h2>
        <p className="text-sm text-secondary-foreground">Decide when this campaign should start sending.</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <label
            className={clsx(
              "relative flex flex-col p-4 rounded-xl border cursor-pointer transition-all",
              formData.scheduleType === 'immediate' 
                ? "border-primary bg-primary/5 ring-1 ring-primary" 
                : "border-border bg-background hover:border-primary/50"
            )}
          >
            <input
              type="radio"
              name="scheduleType"
              value="immediate"
              checked={formData.scheduleType === 'immediate'}
              onChange={() => updateFormData({ scheduleType: 'immediate' })}
              className="absolute opacity-0"
            />
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center">
                <Clock className="w-4 h-4 text-foreground" />
              </div>
              <span className="font-semibold text-foreground">Start Immediately</span>
            </div>
            <p className="text-xs text-secondary-foreground">
              Begin sending emails as soon as the campaign is launched.
            </p>
          </label>

          <label
            className={clsx(
              "relative flex flex-col p-4 rounded-xl border cursor-pointer transition-all",
              formData.scheduleType === 'scheduled' 
                ? "border-primary bg-primary/5 ring-1 ring-primary" 
                : "border-border bg-background hover:border-primary/50"
            )}
          >
            <input
              type="radio"
              name="scheduleType"
              value="scheduled"
              checked={formData.scheduleType === 'scheduled'}
              onChange={() => updateFormData({ scheduleType: 'scheduled' })}
              className="absolute opacity-0"
            />
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-foreground" />
              </div>
              <span className="font-semibold text-foreground">Schedule for later</span>
            </div>
            <p className="text-xs text-secondary-foreground">
              Pick a specific date and time to start sending emails.
            </p>
          </label>
        </div>

        {formData.scheduleType === 'scheduled' && (
          <div className="mt-4 p-5 border border-border rounded-xl bg-secondary/10 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="startDate" className="text-sm font-medium text-foreground">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => updateFormData({ startDate: e.target.value })}
                  className="w-full h-10 px-3 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="startTime" className="text-sm font-medium text-foreground">
                  Start Time <span className="text-red-500">*</span>
                </label>
                <input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => updateFormData({ startTime: e.target.value })}
                  className="w-full h-10 px-3 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="timezone" className="text-sm font-medium text-foreground">
                Timezone
              </label>
              <input
                id="timezone"
                type="text"
                readOnly
                value={formData.timezone}
                className="w-full h-10 px-3 bg-background border border-border rounded-md text-sm text-secondary-foreground focus:outline-none opacity-70 cursor-not-allowed"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
