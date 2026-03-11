import type { Metadata } from 'next';
import { TopicHeader } from '@/components/topic/TopicHeader';
import { ContentSection } from '@/components/topic/ContentSection';
import { CodeComparison } from '@/components/topic/CodeComparison';
import { WcagCriteriaBadge } from '@/components/topic/WcagCriteriaBadge';
import { semanticHtmlStructure } from '@/lib/topics';
import { getIntl } from '@/i18n';
import type { Locale } from '@/i18n';
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
      para1: intl.formatMessage({ id: 'topics.semanticHtml.sections.whyThisMatters.para1' }),
      para2: intl.formatMessage({ id: 'topics.semanticHtml.sections.whyThisMatters.para2' }),
    },
    preferNativeElements: {
      heading: intl.formatMessage({
        id: 'topics.semanticHtml.sections.preferNativeElements.heading',
      }),
      intro: intl.formatMessage({
        id: 'topics.semanticHtml.sections.preferNativeElements.intro',
      }),
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
              code: `// Missing: role, keyboard support, focus, disabled state
<div onClick={handleSubmit} className="btn">
  Submit
</div>`,
            }}
            prefer={{
              label: sections.preferNativeElements.prefer1Label,
              code: `// Built-in: keyboard, focus, role="button", disabled
<button type="submit" onClick={handleSubmit}>
  Submit
</button>`,
            }}
          />
          <CodeComparison
            avoid={{
              label: sections.preferNativeElements.avoid2Label,
              code: `<div className="nav">
  <div className="nav-item">Home</div>
  <div className="nav-item">About</div>
</div>`,
            }}
            prefer={{
              label: sections.preferNativeElements.prefer2Label,
              code: `<nav aria-label="Main">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>`,
            }}
          />
        </ContentSection>

        <ContentSection heading={sections.headingHierarchy.heading}>
          <p className="leading-relaxed text-muted-foreground">{sections.headingHierarchy.para}</p>
          <CodeComparison
            avoid={{
              label: sections.headingHierarchy.avoidLabel,
              code: `<h1>Accessibility Handbook</h1>
{/* h2 skipped entirely */}
<h3>Semantic HTML</h3>
<h3>ARIA Attributes</h3>`,
            }}
            prefer={{
              label: sections.headingHierarchy.preferLabel,
              code: `<h1>Accessibility Handbook</h1>

<h2>Foundations</h2>
<h3>Semantic HTML</h3>
<h3>ARIA Attributes</h3>`,
            }}
          />
        </ContentSection>

        <ContentSection heading={sections.lists.heading}>
          <p className="leading-relaxed text-muted-foreground">{sections.lists.para}</p>
          <CodeComparison
            avoid={{
              label: sections.lists.avoidLabel,
              code: `<div className="list">
  <div className="list-item">Perceivable</div>
  <div className="list-item">Operable</div>
  <div className="list-item">Understandable</div>
  <div className="list-item">Robust</div>
</div>`,
            }}
            prefer={{
              label: sections.lists.preferLabel,
              code: `<ul>
  <li>Perceivable</li>
  <li>Operable</li>
  <li>Understandable</li>
  <li>Robust</li>
</ul>`,
            }}
          />
        </ContentSection>

        <ContentSection heading={sections.tables.heading}>
          <p className="leading-relaxed text-muted-foreground">{sections.tables.para}</p>
          <CodeComparison
            avoid={{
              label: sections.tables.avoidLabel,
              code: `<div className="grid grid-cols-3">
  <div>Name</div>
  <div>Role</div>
  <div>Level</div>
  <div>Alice</div>
  <div>Engineer</div>
  <div>Senior</div>
</div>`,
            }}
            prefer={{
              label: sections.tables.preferLabel,
              code: `<table>
  <caption>Team members</caption>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Role</th>
      <th scope="col">Level</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>Engineer</td>
      <td>Senior</td>
    </tr>
  </tbody>
</table>`,
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
              code: `// No role, no keyboard, no announced state
<div onClick={toggleMenu} className="menu-trigger">
  Menu
</div>`,
            }}
            prefer={{
              label: sections.whenNativeIsntEnough.preferLabel,
              code: `// Has role, keyboard, and announced state
// Note: <button> is still preferable if styling allows
<div
  role="button"
  tabIndex={0}
  aria-expanded={isOpen}
  aria-haspopup="menu"
  onClick={toggleMenu}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') toggleMenu();
  }}
>
  Menu
</div>`,
            }}
          />
        </ContentSection>
      </div>
    </main>
  );
}
