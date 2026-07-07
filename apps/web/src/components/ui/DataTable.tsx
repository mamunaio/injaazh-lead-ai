import React from 'react';
import clsx from 'clsx';
import { Users } from 'lucide-react'; // Default empty state icon

export interface ColumnDef<T> {
  header: React.ReactNode;
  accessor: (item: T) => React.ReactNode;
  width?: string;
  className?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  loading?: boolean;
  keyExtractor: (item: T) => string;
  selectedIds?: Set<string>;
  onToggleSelect?: (id: string) => void;
  onToggleAll?: () => void;
  onRowClick?: (item: T) => void;
  emptyState?: React.ReactNode;
}

export function DataTable<T>({
  data,
  columns,
  loading,
  keyExtractor,
  selectedIds,
  onToggleSelect,
  onToggleAll,
  onRowClick,
  emptyState
}: DataTableProps<T>) {
  const hasSelection = !!selectedIds && !!onToggleSelect && !!onToggleAll;
  const isAllSelected = data.length > 0 && selectedIds?.size === data.length;

  if (loading) {
    return (
      <div className="w-full border border-border rounded-lg overflow-hidden bg-card">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              {hasSelection && (
                <th className="w-12 px-4 py-3"><div className="w-4 h-4 bg-border rounded-sm animate-pulse" /></th>
              )}
              {columns.map((col, i) => (
                <th key={i} className={clsx("px-4 py-3 text-[0.75rem] font-semibold text-secondary-foreground uppercase tracking-wider", col.width)}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="border-b border-border last:border-0">
                {hasSelection && (
                  <td className="w-12 px-4 py-4"><div className="w-4 h-4 bg-border rounded-sm animate-pulse" /></td>
                )}
                {columns.map((_, j) => (
                  <td key={j} className="px-4 py-4">
                    <div className="w-full max-w-[150px] h-4 bg-secondary rounded animate-pulse" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-card border border-border rounded-lg border-dashed">
        {emptyState || (
          <>
            <Users className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-[1.125rem] font-semibold text-foreground">No records found</h3>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="w-full border border-border rounded-lg overflow-x-auto bg-card">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="border-b border-border bg-secondary/50">
            {hasSelection && (
              <th className="w-12 px-4 py-3">
                <input 
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={onToggleAll}
                  className="w-4 h-4 rounded border-border bg-background text-primary focus:ring-primary/20 focus:ring-offset-0 cursor-pointer"
                />
              </th>
            )}
            {columns.map((col, i) => (
              <th key={i} className={clsx("px-4 py-3 text-[0.75rem] font-semibold text-secondary-foreground uppercase tracking-wider", col.width, col.className)}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            const id = keyExtractor(item);
            const isSelected = selectedIds?.has(id);
            return (
              <tr 
                key={id} 
                onClick={() => onRowClick?.(item)}
                className={clsx(
                  "border-b border-border last:border-0 hover:bg-accent/50 transition-colors group",
                  onRowClick && "cursor-pointer",
                  isSelected && "bg-primary/5 hover:bg-primary/10"
                )}
              >
                {hasSelection && (
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <input 
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelect(id)}
                      className="w-4 h-4 rounded border-border bg-background text-primary focus:ring-primary/20 focus:ring-offset-0 cursor-pointer"
                    />
                  </td>
                )}
                {columns.map((col, i) => (
                  <td key={i} className={clsx("px-4 py-3", col.className)}>
                    {col.accessor(item)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
