import type { IntlShape } from 'react-intl';

export const richTextValues = {
  kbd: (chunks: React.ReactNode) => (
    <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-sm">
      {chunks}
    </kbd>
  ),
  code: (chunks: React.ReactNode) => (
    <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">{chunks}</code>
  ),
  strong: (chunks: React.ReactNode) => <strong className="font-semibold">{chunks}</strong>,
  em: (chunks: React.ReactNode) => <em>{chunks}</em>,
};

export function formatRich(intl: IntlShape, id: string): React.ReactNode {
  return intl.formatMessage({ id }, richTextValues);
}
