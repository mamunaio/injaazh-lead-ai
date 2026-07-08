import React, { useState } from 'react';
import { WorkflowNodeInstance, WorkflowNodeTemplate } from '../../types';
import { WorkflowNodeCard } from './WorkflowNodeCard';
import { AddNodeMenu } from './AddNodeMenu';
import { Plus } from 'lucide-react';

interface WorkflowCanvasProps {
  nodes: WorkflowNodeInstance[];
  selectedNodeId: string | null;
  onSelectNode: (id: string | null) => void;
  onAddNode: (template: WorkflowNodeTemplate, index: number) => void;
  onRemoveNode: (id: string) => void;
}

export function WorkflowCanvas({ nodes, selectedNodeId, onSelectNode, onAddNode, onRemoveNode }: WorkflowCanvasProps) {
  const [addingAtIndex, setAddingAtIndex] = useState<number | null>(null);

  const handleAdd = (template: WorkflowNodeTemplate) => {
    if (addingAtIndex !== null) {
      onAddNode(template, addingAtIndex);
      setAddingAtIndex(null);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-background/50 flex flex-col items-center py-12 relative" onClick={() => onSelectNode(null)}>
      
      {/* Top Initial Add Button (if no nodes or adding as trigger) */}
      <div className="relative flex flex-col items-center">
        {nodes.length === 0 ? (
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setAddingAtIndex(addingAtIndex === 0 ? null : 0);
              }}
              className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 text-primary flex items-center justify-center hover:bg-primary/20 hover:scale-110 transition-all shadow-sm"
            >
              <Plus className="w-6 h-6" />
            </button>
            
            {addingAtIndex === 0 && (
              <AddNodeMenu 
                isTriggerMode={true} 
                onAdd={handleAdd} 
                onClose={() => setAddingAtIndex(null)} 
              />
            )}
          </div>
        ) : (
          <div className="text-xs font-semibold text-secondary-foreground uppercase tracking-wider mb-6">Workflow Start</div>
        )}
      </div>

      {nodes.map((node, index) => (
        <React.Fragment key={node.id}>
          {/* Connecting Line if not first node */}
          {index > 0 && <div className="w-px h-12 bg-border relative" />}

          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <WorkflowNodeCard
              node={node}
              isSelected={selectedNodeId === node.id}
              onClick={() => onSelectNode(node.id)}
              onRemove={() => onRemoveNode(node.id)}
            />
          </div>

          {/* Line to next node / add button */}
          <div className="w-px h-12 bg-border relative flex flex-col items-center justify-center">
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setAddingAtIndex(addingAtIndex === index + 1 ? null : index + 1)}
                className="w-6 h-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background border border-border text-secondary-foreground flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-sm z-10"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
              
              {addingAtIndex === index + 1 && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 z-50">
                  <AddNodeMenu 
                    isTriggerMode={false} 
                    onAdd={handleAdd} 
                    onClose={() => setAddingAtIndex(null)} 
                  />
                </div>
              )}
            </div>
          </div>
        </React.Fragment>
      ))}
      
      {nodes.length > 0 && (
        <div className="text-xs font-semibold text-secondary-foreground uppercase tracking-wider mt-2">Workflow End</div>
      )}
    </div>
  );
}
