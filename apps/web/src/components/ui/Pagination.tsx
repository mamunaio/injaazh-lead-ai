import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

export interface PaginationProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  itemName?: string;
}

export function Pagination({
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
  itemName = 'items'
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / pageSize);
  if (totalCount === 0 || totalPages <= 1) return null;

  const startCount = (currentPage - 1) * pageSize + 1;
  const endCount = Math.min(currentPage * pageSize, totalCount);

  // Simple pagination logic for demonstration
  const pages: (number | string)[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 || 
      i === totalPages || 
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return (
    <div className="flex items-center justify-between py-4 mt-2">
      <div className="text-[0.875rem] text-secondary-foreground">
        Showing <span className="font-medium text-foreground">{startCount}</span> to <span className="font-medium text-foreground">{endCount}</span> of <span className="font-medium text-foreground">{totalCount}</span> {itemName}
      </div>
      <div className="flex items-center gap-2">
        <button 
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="w-8 h-8 flex items-center justify-center rounded-md border border-border text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-1">
          {pages.map((page, i) => (
            <button
              key={i}
              disabled={page === '...'}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              className={clsx(
                "w-8 h-8 flex items-center justify-center rounded-md text-[0.875rem] font-medium transition-colors",
                page === currentPage 
                  ? "bg-primary text-primary-foreground border border-primary" 
                  : page === '...'
                    ? "text-muted-foreground cursor-default"
                    : "text-foreground hover:bg-accent border border-transparent hover:border-border"
              )}
            >
              {page}
            </button>
          ))}
        </div>
        <button 
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="w-8 h-8 flex items-center justify-center rounded-md border border-border text-foreground hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
