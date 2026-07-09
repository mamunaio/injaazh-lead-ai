import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  SequencesService,
  UiStep,
  toApiSteps,
  fromApiSteps,
  SequenceStepType,
} from '../../../lib/api/sequences.service';
import { toast } from 'sonner';

// Re-export so builder components can import from this hook
export type { UiStep as SequenceStep, SequenceStepType };

export function useSequenceBuilder(initialSequenceId?: string) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [stopOnReply, setStopOnReply] = useState(true);

  // Internal UI steps — use _key for React identity
  const [steps, setSteps] = useState<UiStep[]>([
    { _key: crypto.randomUUID(), type: 'EMAIL', promptTemplateId: '' },
  ]);

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(!!initialSequenceId);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Load existing sequence for edit mode
  useEffect(() => {
    if (!initialSequenceId) return;
    const fetchSeq = async () => {
      setIsLoading(true);
      try {
        const seq = await SequencesService.getSequence(initialSequenceId);
        setName(seq.name);
        setStopOnReply(seq.stopOnReply);
        const uiSteps = seq.steps && seq.steps.length > 0
          ? fromApiSteps(seq.steps)
          : [{ _key: crypto.randomUUID(), type: 'EMAIL' as SequenceStepType, promptTemplateId: '' }];
        setSteps(uiSteps);
      } catch (err: unknown) {
        const error = err as Error;
        setError(error instanceof Error ? error.message : String(error) || 'Failed to load sequence');
      } finally {
        setIsLoading(false);
      }
    };
    fetchSeq();
  }, [initialSequenceId]);

  const addEmailStep = useCallback(() => {
    setSteps(prev => [...prev, { _key: crypto.randomUUID(), type: 'EMAIL', promptTemplateId: '' }]);
  }, []);

  const addWaitStep = useCallback(() => {
    setSteps(prev => [...prev, { _key: crypto.randomUUID(), type: 'WAIT', delayDays: 3 }]);
  }, []);

  const removeStep = useCallback((key: string) => {
    setSteps(prev => prev.filter(s => s._key !== key));
  }, []);

  const updateStep = useCallback((key: string, updates: Partial<UiStep>) => {
    setSteps(prev => prev.map(s => s._key === key ? { ...s, ...updates } : s));
  }, []);

  const saveSequence = useCallback(async () => {
    try {
      setError(null);
      setSuccessMessage(null);

      // Validation
      if (!name.trim()) throw new Error('Sequence name is required.');
      if (steps.length === 0) throw new Error('Sequence must have at least one step.');

      for (const step of steps) {
        if (step.type === 'EMAIL' && !step.promptTemplateId) {
          throw new Error('All Email steps must have a prompt template selected.');
        }
        if (step.type === 'WAIT' && (!step.delayDays || step.delayDays <= 0)) {
          throw new Error('All Wait steps must have a duration greater than 0 days.');
        }
      }

      setIsSaving(true);

      const payload = {
        name: name.trim(),
        stopOnReply,
        steps: toApiSteps(steps), // Transform UI steps → backend format
      };

      if (initialSequenceId) {
        await SequencesService.updateSequence(initialSequenceId, payload);
        toast.success('Sequence updated successfully.');
      } else {
        await SequencesService.createSequence(payload);
        toast.success('Sequence created successfully.');
      }

      setIsSaving(false);
      router.push('/sequences');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save sequence.');
      setIsSaving(false);
    }
  }, [name, steps, stopOnReply, initialSequenceId, router]);

  return {
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
    successMessage,
  };
}
