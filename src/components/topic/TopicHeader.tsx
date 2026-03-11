import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { WcagCriteriaBadge } from './WcagCriteriaBadge';
import type { TopicMeta } from '@/lib/topics';

interface TopicHeaderProps {
  topic: TopicMeta;
}

export function TopicHeader({ topic }: TopicHeaderProps): React.ReactElement {
  return (
    <header className="flex flex-col gap-4 border-b border-border pb-8">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-1 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-3.5 w-3.5" />
          </li>
          <li>
            <Link href="/" className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">
              Topics
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-3.5 w-3.5" />
          </li>
          <li>
            <span aria-current="page" className="text-foreground">
              {topic.title}
            </span>
          </li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-foreground">{topic.title}</h1>

      <p className="text-base leading-relaxed text-muted-foreground">{topic.description}</p>

      <div className="flex flex-wrap gap-2" aria-label="Relevant WCAG criteria">
        {topic.wcagCriteria.map((criterion) => (
          <WcagCriteriaBadge key={criterion.number} criterion={criterion} />
        ))}
      </div>
    </header>
  );
}
