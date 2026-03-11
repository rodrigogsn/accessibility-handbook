import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language = 'tsx', className }: CodeBlockProps): React.ReactElement {
  return (
    <pre
      className={cn('overflow-x-auto rounded-md bg-muted p-4 text-sm leading-relaxed', className)}
      tabIndex={0}
    >
      <code className="font-mono text-foreground" data-language={language}>
        {code}
      </code>
    </pre>
  );
}
