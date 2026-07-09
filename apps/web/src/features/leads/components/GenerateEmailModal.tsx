import React, { useState, useEffect } from 'react';
import { X, Loader2, Copy, RefreshCw, Save, Check, Sparkles } from 'lucide-react';
import { apiFetch } from '../../../lib/api';
import { LeadsService } from '../../../lib/api/leads.service';

interface AiOutreachData {
  subject?: string;
  coldEmail?: string;
  confidenceScore?: number;
  companyAnalysis?: string;
  painPoints?: string[];
  personalization?: string;
  cta?: string;
}

interface GenerateEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadId: string;
  initialOutreach?: AiOutreachData | null;
}

export function GenerateEmailModal({ isOpen, onClose, leadId, initialOutreach }: GenerateEmailModalProps) {
  const [loading, setLoading] = useState(false);
  const [outreachData, setOutreachData] = useState<AiOutreachData | null>(initialOutreach || null);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);

  const pollForOutreach = React.useCallback(async (previousData?: AiOutreachData | null) => {
    let attempts = 0;
    while (attempts < 30) {
      await new Promise(res => setTimeout(res, 1000));
      try {
        const lead = await LeadsService.getLead(leadId);
        const newOutreach = (lead as Record<string, unknown>).aiOutreach as AiOutreachData;
        if (newOutreach && JSON.stringify(newOutreach) !== JSON.stringify(previousData)) {
          return newOutreach;
        }
      } catch (err: unknown) {
        console.error('Polling error:', err);
      }
      attempts++;
    }
    throw new Error('Generation timed out.');
  }, [leadId]);

  const generateEmail = React.useCallback(async () => {
    setLoading(true);
    try {
      const prevData = outreachData;
      await apiFetch('/ai/generate-emails', {
        method: 'POST',
        body: JSON.stringify({ leadIds: [leadId] })
      });
      const newData = await pollForOutreach(prevData);
      setOutreachData(newData);
    } catch (err: unknown) {
      console.error(err);
      alert('Failed to generate email. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [leadId, outreachData, pollForOutreach]);

  useEffect(() => {
    if (isOpen && !initialOutreach && !outreachData) {
      setTimeout(() => generateEmail(), 0);
    }
  }, [isOpen, initialOutreach, outreachData, generateEmail]);

  const handleCopy = () => {
    if (!outreachData) return;
    const text = `Subject: ${outreachData.subject || ''}\n\n${outreachData.coldEmail || ''}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await LeadsService.updateLead(leadId, { aiOutreach: outreachData } as Record<string, unknown>);
      onClose();
    } catch (err: unknown) {
      console.error(err);
      alert('Failed to save email content.');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-card border border-border rounded-xl shadow-lg flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-[1rem] font-semibold text-foreground">AI Email Generator</h2>
            {outreachData?.confidenceScore && (
              <span className="ml-3 px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-xs font-medium border border-green-500/20">
                {outreachData.confidenceScore}% Match
              </span>
            )}
          </div>
          <button 
            onClick={onClose}
            disabled={saving}
            className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary transition-colors disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 flex-1 min-h-[400px] flex flex-col overflow-y-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center flex-1 h-full gap-4 text-muted-foreground py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-sm">Generating highly personalized email...</p>
            </div>
          ) : outreachData ? (
            <div className="flex flex-col gap-6">
              
              {outreachData.companyAnalysis && (
                <div className="p-4 rounded-lg bg-secondary/30 border border-border">
                  <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Company Context</h3>
                  <p className="text-sm text-secondary-foreground">{outreachData.companyAnalysis}</p>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">Subject Line</label>
                <input
                  type="text"
                  value={outreachData.subject || ''}
                  onChange={(e) => setOutreachData({ ...outreachData, subject: e.target.value })}
                  className="w-full h-10 px-3 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-sm font-medium text-foreground">Email Body</label>
                <textarea
                  value={outreachData.coldEmail || ''}
                  onChange={(e) => setOutreachData({ ...outreachData, coldEmail: e.target.value })}
                  className="w-full flex-1 min-h-[250px] p-4 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-y"
                />
              </div>
            </div>
          ) : (
             <div className="flex flex-col items-center justify-center flex-1 h-full gap-4 text-muted-foreground py-12">
              <p className="text-sm">No outreach data available.</p>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-border bg-secondary/20 flex items-center justify-between gap-3">
          <button
            onClick={generateEmail}
            disabled={loading || saving}
            className="h-9 px-4 inline-flex items-center gap-2 bg-secondary text-secondary-foreground text-sm font-medium rounded-md hover:bg-accent transition-colors disabled:opacity-50"
          >
            <RefreshCw className={loading ? "w-4 h-4 animate-spin" : "w-4 h-4"} />
            Regenerate
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              disabled={loading || !outreachData}
              className="h-9 px-4 inline-flex items-center gap-2 bg-secondary text-secondary-foreground text-sm font-medium rounded-md hover:bg-accent transition-colors disabled:opacity-50"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button
              onClick={handleSave}
              disabled={loading || saving || !outreachData}
              className="h-9 px-4 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? 'Saving...' : 'Save Draft'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
