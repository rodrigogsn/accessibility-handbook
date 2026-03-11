import { cn } from '@/lib/utils';

interface ContentSectionProps {
  heading: string;
  children: React.ReactNode;
  className?: string;
}

export function ContentSection({ heading, children, className }: ContentSectionProps): React.ReactElement {
  return (
    <section className={cn('flex flex-col gap-4', className)}>
      <h2 className="text-xl font-semibold tracking-tight text-foreground">{heading}</h2>
      {children}
    </section>
  );
}
