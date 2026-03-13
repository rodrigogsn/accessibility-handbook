import type { Metadata } from 'next';
import { TopicHeader } from '@/components/topic/TopicHeader';
import { ContentSection } from '@/components/topic/ContentSection';
import { CodeComparison } from '@/components/topic/CodeComparison';
import { WcagCriteriaBadge } from '@/components/topic/WcagCriteriaBadge';
import { semanticHtmlStructure } from '@/lib/topics';
import { getIntl, getMessages } from '@/i18n';
import type { Locale } from '@/i18n';
import { formatRich } from '@/lib/richText';
import type { TopicMeta } from '@/lib/topics';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = ((await params).locale as Locale) ?? 'en';
  const intl = await getIntl(locale);
  return {
    title: intl.formatMessage({ id: 'topics.semanticHtml.pageTitle' }),
    description: intl.formatMessage({ id: 'topics.semanticHtml.description' }),
  };
}

export default async function SemanticHtmlPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<React.ReactElement> {
  const locale = ((await params).locale as Locale) ?? 'en';
  const intl = await getIntl(locale);
  const messages = await getMessages(locale);

  const topic: TopicMeta = {
    ...semanticHtmlStructure,
    title: intl.formatMessage({ id: 'topics.semanticHtml.title' }),
    description: intl.formatMessage({ id: 'topics.semanticHtml.description' }),
    wcagCriteria: semanticHtmlStructure.wcagCriteria.map((criterion) => ({
      ...criterion,
      title: intl.formatMessage({
        id: `topics.semanticHtml.wcagCriteria.${criterion.number}`,
      }),
    })),
  };

  const topicHeaderLabels = {
    home: intl.formatMessage({ id: 'common.home' }),
    topics: intl.formatMessage({ id: 'common.topics' }),
    breadcrumbNav: intl.formatMessage({ id: 'topicHeader.breadcrumbNav' }),
    wcagCriteriaLabel: intl.formatMessage({ id: 'topicHeader.wcagCriteriaLabel' }),
  };

  const sections = {
    whyThisMatters: {
      heading: intl.formatMessage({
        id: 'topics.semanticHtml.sections.whyThisMatters.heading',
      }),
      para1: formatRich(intl, 'topics.semanticHtml.sections.whyThisMatters.para1'),
      para2: formatRich(intl, 'topics.semanticHtml.sections.whyThisMatters.para2'),
    },
    preferNativeElements: {
      heading: intl.formatMessage({
        id: 'topics.semanticHtml.sections.preferNativeElements.heading',
      }),
      intro: formatRich(intl, 'topics.semanticHtml.sections.preferNativeElements.intro'),
      avoid1Label: intl.formatMessage({
        id: 'topics.semanticHtml.sections.preferNativeElements.avoid1Label',
      }),
      prefer1Label: intl.formatMessage({
        id: 'topics.semanticHtml.sections.preferNativeElements.prefer1Label',
      }),
      avoid2Label: intl.formatMessage({
        id: 'topics.semanticHtml.sections.preferNativeElements.avoid2Label',
      }),
      prefer2Label: intl.formatMessage({
        id: 'topics.semanticHtml.sections.preferNativeElements.prefer2Label',
      }),
      avoid1Code: messages['topics.semanticHtml.sections.preferNativeElements.avoid1Code'] ?? '',
      prefer1Code: messages['topics.semanticHtml.sections.preferNativeElements.prefer1Code'] ?? '',
      avoid2Code: messages['topics.semanticHtml.sections.preferNativeElements.avoid2Code'] ?? '',
      prefer2Code: messages['topics.semanticHtml.sections.preferNativeElements.prefer2Code'] ?? '',
    },
    headingHierarchy: {
      heading: intl.formatMessage({
        id: 'topics.semanticHtml.sections.headingHierarchy.heading',
      }),
      para: intl.formatMessage({ id: 'topics.semanticHtml.sections.headingHierarchy.para' }),
      avoidLabel: intl.formatMessage({
        id: 'topics.semanticHtml.sections.headingHierarchy.avoidLabel',
      }),
      preferLabel: intl.formatMessage({
        id: 'topics.semanticHtml.sections.headingHierarchy.preferLabel',
      }),
      avoidCode: messages['topics.semanticHtml.sections.headingHierarchy.avoidCode'] ?? '',
      preferCode: messages['topics.semanticHtml.sections.headingHierarchy.preferCode'] ?? '',
    },
    lists: {
      heading: intl.formatMessage({ id: 'topics.semanticHtml.sections.lists.heading' }),
      para: intl.formatMessage({ id: 'topics.semanticHtml.sections.lists.para' }),
      avoidLabel: intl.formatMessage({
        id: 'topics.semanticHtml.sections.lists.avoidLabel',
      }),
      preferLabel: intl.formatMessage({
        id: 'topics.semanticHtml.sections.lists.preferLabel',
      }),
      avoidCode: messages['topics.semanticHtml.sections.lists.avoidCode'] ?? '',
      preferCode: messages['topics.semanticHtml.sections.lists.preferCode'] ?? '',
    },
    tables: {
      heading: intl.formatMessage({ id: 'topics.semanticHtml.sections.tables.heading' }),
      para: intl.formatMessage({ id: 'topics.semanticHtml.sections.tables.para' }),
      avoidLabel: intl.formatMessage({
        id: 'topics.semanticHtml.sections.tables.avoidLabel',
      }),
      preferLabel: intl.formatMessage({
        id: 'topics.semanticHtml.sections.tables.preferLabel',
      }),
      avoidCode: messages['topics.semanticHtml.sections.tables.avoidCode'] ?? '',
      preferCode: messages['topics.semanticHtml.sections.tables.preferCode'] ?? '',
    },
    whenNativeIsntEnough: {
      heading: intl.formatMessage({
        id: 'topics.semanticHtml.sections.whenNativeIsntEnough.heading',
      }),
      para: intl.formatMessage({
        id: 'topics.semanticHtml.sections.whenNativeIsntEnough.para',
      }),
      avoidLabel: intl.formatMessage({
        id: 'topics.semanticHtml.sections.whenNativeIsntEnough.avoidLabel',
      }),
      preferLabel: intl.formatMessage({
        id: 'topics.semanticHtml.sections.whenNativeIsntEnough.preferLabel',
      }),
      avoidCode: messages['topics.semanticHtml.sections.whenNativeIsntEnough.avoidCode'] ?? '',
      preferCode: messages['topics.semanticHtml.sections.whenNativeIsntEnough.preferCode'] ?? '',
    },
  };

  return (
    <main id="main-content" className="mx-auto max-w-3xl px-6 py-12">
      <TopicHeader topic={topic} locale={locale} labels={topicHeaderLabels}>
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
              { number: criterion.number, title: criterion.title, level: criterion.level },
            )}
          />
        ))}
      </TopicHeader>

      <div className="mt-10 flex flex-col gap-12">
        <ContentSection heading={sections.whyThisMatters.heading}>
          <p className="leading-relaxed text-muted-foreground">{sections.whyThisMatters.para1}</p>
          <p className="leading-relaxed text-muted-foreground">{sections.whyThisMatters.para2}</p>
        </ContentSection>

        <ContentSection heading={sections.preferNativeElements.heading}>
          <p className="leading-relaxed text-muted-foreground">
            {sections.preferNativeElements.intro}
          </p>
          <CodeComparison
            avoid={{
              label: sections.preferNativeElements.avoid1Label,
              code: sections.preferNativeElements.avoid1Code,
            }}
            prefer={{
              label: sections.preferNativeElements.prefer1Label,
              code: sections.preferNativeElements.prefer1Code,
            }}
          />
          <CodeComparison
            avoid={{
              label: sections.preferNativeElements.avoid2Label,
              code: sections.preferNativeElements.avoid2Code,
            }}
            prefer={{
              label: sections.preferNativeElements.prefer2Label,
              code: sections.preferNativeElements.prefer2Code,
            }}
          />
        </ContentSection>

        <ContentSection heading={sections.headingHierarchy.heading}>
          <p className="leading-relaxed text-muted-foreground">{sections.headingHierarchy.para}</p>
          <CodeComparison
            avoid={{
              label: sections.headingHierarchy.avoidLabel,
              code: sections.headingHierarchy.avoidCode,
            }}
            prefer={{
              label: sections.headingHierarchy.preferLabel,
              code: sections.headingHierarchy.preferCode,
            }}
          />
        </ContentSection>

        <ContentSection heading={sections.lists.heading}>
          <p className="leading-relaxed text-muted-foreground">{sections.lists.para}</p>
          <CodeComparison
            avoid={{
              label: sections.lists.avoidLabel,
              code: sections.lists.avoidCode,
            }}
            prefer={{
              label: sections.lists.preferLabel,
              code: sections.lists.preferCode,
            }}
          />
        </ContentSection>

        <ContentSection heading={sections.tables.heading}>
          <p className="leading-relaxed text-muted-foreground">{sections.tables.para}</p>
          <CodeComparison
            avoid={{
              label: sections.tables.avoidLabel,
              code: sections.tables.avoidCode,
            }}
            prefer={{
              label: sections.tables.preferLabel,
              code: sections.tables.preferCode,
            }}
          />
        </ContentSection>

        <ContentSection heading={sections.whenNativeIsntEnough.heading}>
          <p className="leading-relaxed text-muted-foreground">
            {sections.whenNativeIsntEnough.para}
          </p>
          <CodeComparison
            avoid={{
              label: sections.whenNativeIsntEnough.avoidLabel,
              code: sections.whenNativeIsntEnough.avoidCode,
            }}
            prefer={{
              label: sections.whenNativeIsntEnough.preferLabel,
              code: sections.whenNativeIsntEnough.preferCode,
            }}
          />
        </ContentSection>
      </div>
    </main>
  );
}
