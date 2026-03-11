import Link from 'next/link';
import { WcagCriteriaBadge } from '@/components/topic/WcagCriteriaBadge';
import { allTopics } from '@/lib/topics';

export default function Home(): React.ReactElement {
  return (
    <main id="main-content" className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-12 flex flex-col gap-4">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Accessibility Handbook</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          A practical reference for building WCAG 2.1 AA compliant React applications. Each topic
          covers real-world patterns, code comparisons, and the specific success criteria you need
          to meet.
        </p>
      </header>

      <section aria-labelledby="topics-heading">
        <h2 id="topics-heading" className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
          Topics
        </h2>
        <ul className="flex flex-col gap-4" role="list">
          {allTopics.map((topic) => (
            <li key={topic.slug}>
              <article className="rounded-lg border border-border bg-card p-6 transition-colors hover:bg-accent">
                <h3 className="mb-2 text-lg font-semibold">
                  <Link
                    href={`/topics/${topic.slug}`}
                    className="text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                  >
                    {topic.title}
                  </Link>
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {topic.description}
                </p>
                <div className="flex flex-wrap gap-2" aria-label={`WCAG criteria for ${topic.title}`}>
                  {topic.wcagCriteria.map((criterion) => (
                    <WcagCriteriaBadge key={criterion.number} criterion={criterion} />
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
