import { useState, useCallback, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { PromptsService } from '../../../lib/api/prompts.service';

export function usePromptBuilder() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Live Preview & Test State
  const [testLeads, setTestLeads] = useState<unknown[]>([]);
  const [selectedLeadId, setSelectedLeadId] = useState<string>('');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  // Version History State
  const [history, setHistory] = useState<unknown[]>([]);
  const [activeVersionId, setActiveVersionId] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [leads, hist] = await Promise.all([
          PromptsService.getTestLeads(),
          PromptsService.getHistory('current')
        ]);
        setTestLeads(leads);
        if (leads.length > 0) setSelectedLeadId(leads[0].id);
        
        setHistory(hist);
        if (hist.length > 0) {
          setName('Outreach Follow-up v' + hist[0].version);
          setContent(hist[0].content);
          setActiveVersionId(hist[0].id);
        }
      } catch (err: unknown) {
        console.error(err);
      }
    };
    loadData();
  }, []);

  const insertVariable = useCallback((variable: string) => {
    const el = textareaRef.current;
    if (!el) {
      setContent(prev => prev + ` {${variable}} `);
      return;
    }

    const start = el.selectionStart;
    const end = el.selectionEnd;
    const currentVal = el.value;
    
    const newVal = currentVal.substring(0, start) + `{${variable}}` + currentVal.substring(end);
    setContent(newVal);
    
    // Attempt to reset cursor position after React re-renders
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + variable.length + 2, start + variable.length + 2);
    }, 0);
  }, []);

  const revertToVersion = useCallback((versionId: string) => {
    const v = history.find(h => h.id === versionId);
    if (v) {
      setContent(v.content);
      setActiveVersionId(v.id);
    }
  }, [history]);

  const runTest = useCallback(async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const result = await PromptsService.testPrompt(content, selectedLeadId);
      setTestResult(result);
    } catch (err: unknown) {
      setTestResult('Error testing prompt.');
    } finally {
      setIsTesting(false);
    }
  }, [content, selectedLeadId]);

  const saveTemplate = useCallback(async () => {
    try {
      await PromptsService.saveTemplate({ name, description, content });
      toast.success('Template saved successfully');
    } catch (err: unknown) {
      toast.error('Failed to save template');
    }
  }, [name, description, content]);

  return {
    name,
    setName,
    description,
    setDescription,
    content,
    setContent,
    textareaRef,
    insertVariable,
    testLeads,
    selectedLeadId,
    setSelectedLeadId,
    isTesting,
    testResult,
    runTest,
    history,
    activeVersionId,
    revertToVersion,
    saveTemplate
  };
}
