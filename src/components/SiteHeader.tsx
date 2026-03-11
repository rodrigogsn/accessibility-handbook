import Link from 'next/link';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SUPPORTED_LOCALES } from '@/i18n';
import type { Locale } from '@/i18n';

interface SiteHeaderProps {
  locale: Locale;
  siteName: string;
  changeLanguageLabel: string;
}

export function SiteHeader({
  locale,
  siteName,
  changeLanguageLabel,
}: SiteHeaderProps): React.ReactElement {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link
          href={`/${locale}`}
          className="rounded text-sm font-semibold text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {siteName}
        </Link>
        <LanguageSwitcher
          currentLocale={locale}
          locales={SUPPORTED_LOCALES}
          label={changeLanguageLabel}
        />
      </div>
    </header>
  );
}
