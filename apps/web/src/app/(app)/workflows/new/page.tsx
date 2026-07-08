"use client";

import React, { useState } from 'react';
import { useWorkflowBuilder } from '../../../../features/workflows/hooks/useWorkflowBuilder';
import { WorkflowCanvas } from '../../../../features/workflows/components/builder/WorkflowCanvas';
import { NodeConfigSidebar } from '../../../../features/workflows/components/builder/NodeConfigSidebar';
import { Save } from 'lucide-react';

export default function WorkflowBuilderPage() {
  const {
    nodes,
    selectedNodeId,
    setSelectedNodeId,
    selectedNode,
    addNode,
    removeNode,
    updateNodeConfig
  } = useWorkflowBuilder();

  const [workflowName, setWorkflowName] = useState('My Automation');

  return (
    <div className="w-full h-full flex flex-col bg-background relative overflow-hidden">
      <div className="flex-none px-6 py-4 border-b border-border bg-card flex items-center justify-between shadow-sm z-10">
        <div>
          <div className="text-xs font-semibold text-secondary-foreground mb-1 uppercase tracking-wider">Workflow Builder</div>
          <input
            type="text"
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            className="text-lg font-bold text-foreground bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none transition-colors px-1 -ml-1"
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="h-9 px-4 rounded-md font-medium text-sm text-foreground bg-secondary/20 hover:bg-secondary/40 transition-colors">
            Cancel
          </button>
          <button className="h-9 px-4 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-sm">
            <Save className="w-4 h-4" />
            Publish Workflow
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Canvas Area */}
        <WorkflowCanvas
          nodes={nodes}
          selectedNodeId={selectedNodeId}
          onSelectNode={setSelectedNodeId}
          onAddNode={addNode}
          onRemoveNode={removeNode}
        />

        {/* Configuration Sidebar */}
        <div className={`transition-all duration-300 ease-in-out ${selectedNodeId ? 'w-80' : 'w-0'}`}>
          <NodeConfigSidebar
            node={selectedNode}
            onClose={() => setSelectedNodeId(null)}
            onUpdateConfig={updateNodeConfig}
          />
        </div>
      </div>
    </div>
  );
}
