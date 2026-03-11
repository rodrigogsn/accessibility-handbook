export type WcagLevel = 'A' | 'AA' | 'AAA';

// Structural data — no translatable text
export interface WcagCriterionMeta {
  number: string;
  level: WcagLevel;
  url: string;
}

// Full interface used by components (includes translated title)
export interface WcagCriterion extends WcagCriterionMeta {
  title: string;
}

export interface TopicMeta {
  slug: string;
  title: string;
  description: string;
  wcagCriteria: WcagCriterion[];
}

// Structural topic data (no translatable text)
export interface TopicStructure {
  slug: string;
  wcagCriteria: WcagCriterionMeta[];
}

export const semanticHtmlStructure: TopicStructure = {
  slug: 'semantic-html',
  wcagCriteria: [
    {
      number: '1.3.1',
      level: 'A',
      url: 'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html',
    },
    {
      number: '4.1.1',
      level: 'A',
      url: 'https://www.w3.org/WAI/WCAG21/Understanding/parsing.html',
    },
    {
      number: '4.1.2',
      level: 'A',
      url: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html',
    },
  ],
};

export const allTopicStructures: TopicStructure[] = [semanticHtmlStructure];
