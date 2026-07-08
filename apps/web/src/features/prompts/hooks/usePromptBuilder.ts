import { useState, useCallback, useEffect, useRef } from 'react';
import { PromptVersion, PROMPT_HISTORY_MOCK_DATA } from '../../../mocks/prompt-history';
import { TestLead, TEST_LEADS_MOCK_DATA } from '../../../mocks/test-leads';

export function usePromptBuilder() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Live Preview & Test State
  const [testLeads, setTestLeads] = useState<TestLead[]>([]);
  const [selectedLeadId, setSelectedLeadId] = useState<string>('');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  // Version History State
  const [history, setHistory] = useState<PromptVersion[]>([]);
  const [activeVersionId, setActiveVersionId] = useState<string | null>(null);

  useEffect(() => {
    setHistory(PROMPT_HISTORY_MOCK_DATA);
    setTestLeads(TEST_LEADS_MOCK_DATA);
    
    if (TEST_LEADS_MOCK_DATA.length > 0) {
      setSelectedLeadId(TEST_LEADS_MOCK_DATA[0].id);
    }
    
    if (PROMPT_HISTORY_MOCK_DATA.length > 0) {
      const latest = PROMPT_HISTORY_MOCK_DATA[0];
      setContent(latest.content);
      setActiveVersionId(latest.id);
      setName('Outreach Follow-up v' + latest.version);
    }
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
    
    // Mock AI generation immediately
    const lead = testLeads.find(l => l.id === selectedLeadId);
    if (!lead) {
      setIsTesting(false);
      return;
    }

    let rendered = content;
    rendered = rendered.replace(/{firstName}/g, lead.firstName);
    rendered = rendered.replace(/{lastName}/g, lead.lastName);
    rendered = rendered.replace(/{company}/g, lead.company);
    rendered = rendered.replace(/{jobTitle}/g, lead.jobTitle);

    setTestResult(`[MOCK AI GENERATED RESPONSE based on above context]\n\nSubject: Following up on our {company} integration\n\n${rendered}`);
    setIsTesting(false);
  }, [content, selectedLeadId, testLeads]);

  const saveTemplate = useCallback(async () => {
    // Simulate saving
    return Promise.resolve();
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
