import { useState, useCallback } from 'react';
import { WorkflowNodeInstance, WorkflowNodeTemplate } from '../types';

export function useWorkflowBuilder() {
  const [nodes, setNodes] = useState<WorkflowNodeInstance[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const addNode = useCallback((template: WorkflowNodeTemplate, insertAtIndex: number) => {
    const newNode: WorkflowNodeInstance = {
      id: `${template.id}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      templateId: template.id,
      type: template.type,
      title: template.title,
      description: template.description,
      icon: template.icon,
      config: { ...template.defaultConfig }
    };

    setNodes(prev => {
      const copy = [...prev];
      copy.splice(insertAtIndex, 0, newNode);
      return copy;
    });
    
    setSelectedNodeId(newNode.id);
  }, []);

  const removeNode = useCallback((id: string) => {
    setNodes(prev => prev.filter(n => n.id !== id));
    if (selectedNodeId === id) {
      setSelectedNodeId(null);
    }
  }, [selectedNodeId]);

  const updateNodeConfig = useCallback((id: string, updates: Record<string, unknown>) => {
    setNodes(prev => prev.map(n => 
      n.id === id ? { ...n, config: { ...n.config, ...updates } } : n
    ));
  }, []);

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || null;

  return {
    nodes,
    selectedNodeId,
    setSelectedNodeId,
    selectedNode,
    addNode,
    removeNode,
    updateNodeConfig
  };
}
