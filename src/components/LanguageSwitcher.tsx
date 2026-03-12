'use client';

import { usePathname, useRouter } from 'next/navigation';
import type { Locale } from '@/i18n';

const LANGUAGE_NAMES: Record<Locale, string> = {
  en: '🇺🇸 English',
  'pt-BR': '🇧🇷 Português (BR)',
};

interface LanguageSwitcherProps {
  currentLocale: Locale;
  locales: Locale[];
  label: string;
}

export function LanguageSwitcher({
  currentLocale,
  locales,
  label,
}: LanguageSwitcherProps): React.ReactElement {
  const pathname = usePathname();
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    const newLocale = e.target.value;
    // Replace the leading locale segment: /en/... -> /newLocale/...
    const newPath = pathname.replace(new RegExp(`^/${currentLocale}(/|$)`), `/${newLocale}$1`);
    router.push(newPath);
  }

  return (
    <label className="flex items-center gap-2">
      <span className="sr-only">{label}</span>
      <select
        value={currentLocale}
        onChange={handleChange}
        className="rounded border border-border bg-background px-2 py-1 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {LANGUAGE_NAMES[locale] ?? locale}
          </option>
        ))}
      </select>
    </label>
  );
}
