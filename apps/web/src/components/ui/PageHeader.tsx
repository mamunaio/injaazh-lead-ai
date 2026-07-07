import React from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface PageHeaderAction {
  label: string;
  icon?: LucideIcon;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

interface PageHeaderProps {
  title: string;
  breadcrumbs: { label: string; href?: string }[];
  actions?: PageHeaderAction[];
}

export function PageHeader({ title, breadcrumbs, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-[1.5rem] font-semibold text-primary-foreground leading-tight">{title}</h1>
        <div className="text-[0.875rem] text-secondary-foreground mt-1 flex items-center gap-2">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span>/</span>}
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-foreground transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-foreground">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {actions && actions.length > 0 && (
        <div className="flex items-center gap-3 self-end sm:self-auto">
          {actions.map((action, index) => {
            const Icon = action.icon;
            const isPrimary = action.variant === 'primary' || (!action.variant && index === actions.length - 1);
            
            const className = isPrimary
              ? "h-9 px-4 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-[0.875rem] font-medium rounded-md shadow-sm transition-colors"
              : "h-9 px-4 inline-flex items-center justify-center gap-2 bg-secondary hover:bg-accent text-foreground text-[0.875rem] font-medium rounded-md border border-border transition-colors";

            const content = (
              <>
                {Icon && <Icon className="w-4 h-4" />}
                {action.label}
              </>
            );

            if (action.href) {
              return (
                <Link key={index} href={action.href} className={className}>
                  {content}
                </Link>
              );
            }
            
            return (
              <button key={index} onClick={action.onClick} className={className}>
                {content}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
