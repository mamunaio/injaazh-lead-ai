"use client";

import React, { useState } from 'react';
import { PageHeader } from '../../../../../components/ui/PageHeader';
import { usePromptBuilder } from '../../../../../features/prompts/hooks/usePromptBuilder';
import { PromptEditor } from '../../../../../features/prompts/components/builder/PromptEditor';
import { LivePreviewPanel } from '../../../../../features/prompts/components/builder/LivePreviewPanel';
import { TestPromptConsole } from '../../../../../features/prompts/components/builder/TestPromptConsole';
import { VersionHistorySidebar } from '../../../../../features/prompts/components/builder/VersionHistorySidebar';
import { Save, History, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import clsx from 'clsx';

export default function PromptBuilderPage() {
  const {
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
  } = usePromptBuilder();

  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-none mb-6 flex items-center justify-between">
        <PageHeader 
          title="Prompt Builder" 
          breadcrumbs={[
            { label: 'Settings', href: '/settings/profile' },
            { label: 'Prompts', href: '/settings/prompts' },
            { label: 'Builder' }
          ]} 
        />
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className={clsx(
              "h-10 px-4 rounded-md font-medium text-sm border transition-colors flex items-center gap-2",
              showHistory 
                ? "bg-secondary/20 border-border text-foreground" 
                : "bg-background border-border text-foreground hover:bg-secondary/50"
            )}
          >
            {showHistory ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
            History
          </button>

          <button
            onClick={saveTemplate}
            className="h-10 px-6 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Template
          </button>
        </div>
      </div>

      {/* Meta info */}
      <div className="flex-none mb-6 flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Template Name (e.g. Initial Outreach)"
            className="w-full h-10 px-3 bg-card border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all font-semibold"
          />
        </div>
        <div className="flex-[2]">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Template Description (optional)"
            className="w-full h-10 px-3 bg-card border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
          />
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden gap-6">
        {/* Version History Sidebar */}
        {showHistory && (
          <VersionHistorySidebar
            history={history}
            activeVersionId={activeVersionId}
            onRevert={revertToVersion}
          />
        )}

        {/* Editor Area */}
        <div className="flex-1 flex flex-col h-full">
          <PromptEditor
            content={content}
            onChange={setContent}
            textareaRef={textareaRef}
            onInsertVariable={insertVariable}
          />
        </div>

        {/* Preview & Test Area */}
        <div className="w-[450px] shrink-0 flex flex-col gap-6 h-full overflow-y-auto pr-2 pb-12">
          <div className="h-[350px] shrink-0">
            <LivePreviewPanel
              content={content}
              testLeads={testLeads}
              selectedLeadId={selectedLeadId}
              onSelectLead={setSelectedLeadId}
            />
          </div>
          
          <div className="flex-1 min-h-[300px]">
            <TestPromptConsole
              onRunTest={runTest}
              isTesting={isTesting}
              testResult={testResult}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
