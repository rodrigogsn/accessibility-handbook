import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import type { WcagCriterion } from '@/lib/topics';

const levelChip = cva('inline-flex items-center rounded border px-1.5 py-0.5 text-xs font-semibold', {
  variants: {
    level: {
      A: 'border-blue-200 bg-blue-100 text-blue-800',
      AA: 'border-purple-200 bg-purple-100 text-purple-800',
      AAA: 'border-amber-200 bg-amber-100 text-amber-800',
    },
  },
});

interface WcagCriteriaBadgeProps {
  criterion: WcagCriterion;
  className?: string;
}

export function WcagCriteriaBadge({ criterion, className }: WcagCriteriaBadgeProps): React.ReactElement {
  return (
    <a
      href={criterion.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm',
        'transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
      aria-label={`WCAG ${criterion.number} ${criterion.title}, Level ${criterion.level}, opens in new tab`}
    >
      <span className="font-mono font-bold text-foreground">{criterion.number}</span>
      <span className="text-muted-foreground">{criterion.title}</span>
      <span className={levelChip({ level: criterion.level })}>Level {criterion.level}</span>
    </a>
  );
}
