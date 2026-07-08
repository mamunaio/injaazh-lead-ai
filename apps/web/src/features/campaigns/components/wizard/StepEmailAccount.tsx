import React, { useState, useEffect } from 'react';
import { CampaignWizardState } from '../../hooks/useCampaignWizard';
import { EmailAccount, EMAIL_ACCOUNTS_MOCK_DATA } from '../../../../mocks/email-accounts';
import { Mail, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

interface StepEmailAccountProps {
  formData: CampaignWizardState;
  updateFormData: (data: Partial<CampaignWizardState>) => void;
}

export function StepEmailAccount({ formData, updateFormData }: StepEmailAccountProps) {
  const [accounts, setAccounts] = useState<EmailAccount[]>([]);

  useEffect(() => {
    setAccounts(EMAIL_ACCOUNTS_MOCK_DATA);
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full max-w-xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">Email Account</h2>
        <p className="text-sm text-secondary-foreground">Select the email account you want to use for sending this campaign.</p>
      </div>

      <div className="flex flex-col gap-3">
        {accounts.length === 0 ? (
          <div className="p-6 border border-border border-dashed rounded-xl flex flex-col items-center justify-center text-center">
            <Mail className="w-8 h-8 text-secondary-foreground mb-2" />
            <p className="text-foreground font-medium">No email accounts connected</p>
            <p className="text-sm text-secondary-foreground mb-4">You need to connect an email account to send campaigns.</p>
            <Link href="/settings/email-accounts" className="h-9 px-4 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors flex items-center justify-center">
              Connect Account
            </Link>
          </div>
        ) : (
          accounts.map(acc => {
            const isSelected = formData.emailAccountId === acc.id;
            const remaining = acc.dailyLimit - acc.usedToday;
            
            return (
              <button
                key={acc.id}
                onClick={() => updateFormData({ emailAccountId: acc.id })}
                className={clsx(
                  "relative flex items-center justify-between p-4 rounded-xl border text-left transition-all",
                  isSelected 
                    ? "border-primary bg-primary/5 ring-1 ring-primary" 
                    : "border-border bg-background hover:border-primary/50 hover:bg-secondary/20"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground">{acc.email}</span>
                    <span className="text-xs text-secondary-foreground capitalize">{acc.provider} Provider</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="flex flex-col text-right">
                    <span className={clsx("text-sm font-medium", remaining < 100 ? "text-amber-500" : "text-foreground")}>
                      {remaining.toLocaleString()} left
                    </span>
                    <span className="text-xs text-secondary-foreground">daily limit: {acc.dailyLimit.toLocaleString()}</span>
                  </div>
                  <div className="w-5 h-5 flex items-center justify-center">
                    {isSelected ? (
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-secondary-foreground/50" />
                    )}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
      
      <div className="flex justify-end mt-2">
        <Link href="/settings/email-accounts" className="text-xs font-medium text-primary hover:underline">
          Manage email accounts
        </Link>
      </div>
    </div>
  );
}
