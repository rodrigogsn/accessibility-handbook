export type WcagLevel = 'A' | 'AA' | 'AAA';

export interface WcagCriterion {
  number: string;
  title: string;
  level: WcagLevel;
  url: string;
}

export interface TopicMeta {
  slug: string;
  title: string;
  description: string;
  wcagCriteria: WcagCriterion[];
}

export const semanticHtmlTopic: TopicMeta = {
  slug: 'semantic-html',
  title: 'Semantic HTML Foundation',
  description:
    'The foundation of accessible web development. Native HTML elements carry inherent meaning that browsers, screen readers, and assistive technologies understand automatically — no extra work required.',
  wcagCriteria: [
    {
      number: '1.3.1',
      title: 'Info and Relationships',
      level: 'A',
      url: 'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html',
    },
    {
      number: '4.1.1',
      title: 'Parsing',
      level: 'A',
      url: 'https://www.w3.org/WAI/WCAG21/Understanding/parsing.html',
    },
    {
      number: '4.1.2',
      title: 'Name, Role, Value',
      level: 'A',
      url: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html',
    },
  ],
};

export const allTopics: TopicMeta[] = [semanticHtmlTopic];
