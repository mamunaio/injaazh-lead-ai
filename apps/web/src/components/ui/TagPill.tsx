import React from 'react';

export function TagPill({ tag }: { tag: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-secondary text-secondary-foreground text-[0.75rem] font-medium border border-border">
      {tag}
    </span>
  );
}

export function TagList({ tags, max = 2 }: { tags: string[], max?: number }) {
  const visibleTags = tags.slice(0, max);
  const hiddenCount = tags.length - max;

  return (
    <div className="flex flex-wrap gap-1.5 items-center">
      {visibleTags.map((tag) => (
        <TagPill key={tag} tag={tag} />
      ))}
      {hiddenCount > 0 && (
        <span className="text-[0.75rem] text-muted-foreground font-medium">
          +{hiddenCount}
        </span>
      )}
    </div>
  );
}
