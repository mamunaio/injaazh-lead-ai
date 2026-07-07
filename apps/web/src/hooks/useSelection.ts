import { useState, useCallback } from 'react';

export function useSelection<T>(items: T[], keyFn: (item: T) => string) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleAll = useCallback(() => {
    if (selectedIds.size === items.length && items.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(items.map(keyFn)));
    }
  }, [items, selectedIds.size, keyFn]);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const isAllSelected = items.length > 0 && selectedIds.size === items.length;

  return {
    selectedIds,
    toggleSelect,
    toggleAll,
    clearSelection,
    isAllSelected
  };
}
