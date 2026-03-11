import Link from 'next/link';
import { WcagCriteriaBadge } from '@/components/topic/WcagCriteriaBadge';
import { getIntl } from '@/i18n';
import { allTopicStructures } from '@/lib/topics';
import type { Locale } from '@/i18n';
import type { TopicMeta } from '@/lib/topics';

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<React.ReactElement> {
  const locale = ((await params).locale as Locale) ?? 'en';
  const intl = await getIntl(locale);

  const topics: TopicMeta[] = allTopicStructures.map((topicStructure) => {
    if (topicStructure.slug === 'semantic-html') {
      return {
        slug: topicStructure.slug,
        title: intl.formatMessage({ id: 'topics.semanticHtml.title' }),
        description: intl.formatMessage({ id: 'topics.semanticHtml.description' }),
        wcagCriteria: topicStructure.wcagCriteria.map((criterion) => ({
          ...criterion,
          title: intl.formatMessage({
            id: `topics.semanticHtml.wcagCriteria.${criterion.number}`,
          }),
        })),
      };
    }
    return {
      slug: topicStructure.slug,
      title: topicStructure.slug,
      description: '',
      wcagCriteria: topicStructure.wcagCriteria.map((criterion) => ({
        ...criterion,
        title: criterion.number,
      })),
    };
  });

  return (
    <main id="main-content" className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-12 flex flex-col gap-4">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          {intl.formatMessage({ id: 'home.title' })}
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          {intl.formatMessage({ id: 'home.subtitle' })}
        </p>
      </header>

      <section aria-labelledby="topics-heading">
        <h2
          id="topics-heading"
          className="mb-6 text-2xl font-semibold tracking-tight text-foreground"
        >
          {intl.formatMessage({ id: 'home.topicsHeading' })}
        </h2>
        <ul className="flex flex-col gap-4" role="list">
          {topics.map((topic) => (
            <li key={topic.slug}>
              <article className="rounded-lg border border-border bg-card p-6 transition-colors hover:bg-accent">
                <h3 className="mb-2 text-lg font-semibold">
                  <Link
                    href={`/${locale}/topics/${topic.slug}`}
                    className="rounded text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {topic.title}
                  </Link>
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {topic.description}
                </p>
                <div
                  className="flex flex-wrap gap-2"
                  aria-label={intl.formatMessage(
                    { id: 'common.wcagCriteriaFor' },
                    { topic: topic.title },
                  )}
                >
                  {topic.wcagCriteria.map((criterion) => (
                    <WcagCriteriaBadge
                      key={criterion.number}
                      criterion={criterion}
                      levelLabel={intl.formatMessage(
                        { id: 'topicHeader.levelLabel' },
                        { level: criterion.level },
                      )}
                      ariaLabel={intl.formatMessage(
                        { id: 'topicHeader.wcagBadgeAriaLabel' },
                        {
                          number: criterion.number,
                          title: criterion.title,
                          level: criterion.level,
                        },
                      )}
                    />
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
