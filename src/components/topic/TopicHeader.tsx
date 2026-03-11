import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { TopicMeta } from '@/lib/topics';

interface TopicHeaderLabels {
  home: string;
  topics: string;
  breadcrumbNav: string;
  wcagCriteriaLabel: string;
}

interface TopicHeaderProps {
  topic: TopicMeta;
  locale: string;
  labels: TopicHeaderLabels;
  children: React.ReactNode;
}

export function TopicHeader({
  topic,
  locale,
  labels,
  children,
}: TopicHeaderProps): React.ReactElement {
  return (
    <header className="flex flex-col gap-4 border-b border-border pb-8">
      <nav aria-label={labels.breadcrumbNav}>
        <ol className="flex items-center gap-1 text-sm text-muted-foreground">
          <li>
            <Link
              href={`/${locale}`}
              className="rounded hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {labels.home}
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-3.5 w-3.5" />
          </li>
          <li>
            <Link
              href={`/${locale}`}
              className="rounded hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {labels.topics}
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

      <div className="flex flex-wrap gap-2" aria-label={labels.wcagCriteriaLabel}>
        {children}
      </div>
    </header>
  );
}
