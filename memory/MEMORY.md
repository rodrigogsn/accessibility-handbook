# Project Memory

## i18n Setup (react-intl)

- **Library:** `react-intl` (FormatJS)
- **Routing strategy:** Manual `[locale]` sub-path routing (`/en/`, `/es/`, etc.)
  - Next.js built-in `i18n` config is Pages Router only and incompatible with `output: 'export'`
- **Message format:** Flat ICU message IDs at `src/i18n/messages/{locale}.json`
- **i18n utilities:** `src/i18n/index.ts` exports `getIntl`, `getMessages`, `SUPPORTED_LOCALES`, `DEFAULT_LOCALE`, `Locale` type
- **Server components:** Use `getIntl(locale)` — result stored as `intl` (conventional react-intl name), then `intl.formatMessage({ id: '...' }, { vars })`
- **Client components:** Wrapped by `IntlClientProvider` in `[locale]/layout.tsx`; use `useIntl()` hook
- **Root layout:** Transparent (`return children`) so `[locale]/layout.tsx` owns `<html lang={locale}>`
- **Next.js params typing:** Next.js provides params as `string`, not literal union. Cast: `(locale as Locale) ?? 'en'`

## Architecture

- `src/i18n/messages/en.json` - flat message IDs
- `src/i18n/index.ts` - getIntl, getMessages, locale config
- `src/lib/topics.ts` - structural data only (no text); `TopicStructure`, `WcagCriterionMeta`; `TopicMeta`/`WcagCriterion` still used by components (text filled from intl in pages)
- `src/app/[locale]/layout.tsx` - HTML shell, skip link, SiteHeader, IntlClientProvider
- `src/components/SiteHeader.tsx` - server component, receives locale + string props
- `src/components/LanguageSwitcher.tsx` - client component, select-based locale switcher
- `src/components/IntlClientProvider.tsx` - thin 'use client' wrapper around IntlProvider
- `src/components/topic/WcagCriteriaBadge.tsx` - receives `levelLabel` and `ariaLabel` as pre-formatted strings
- `src/components/topic/TopicHeader.tsx` - receives `labels` object + `locale` + `children` (badges)

## Adding a New Language

1. Create `src/i18n/messages/{locale}.json` (copy en.json, translate values)
2. Add locale to `SUPPORTED_LOCALES` and `Locale` type in `src/i18n/index.ts`
3. Add `getMessages` case for the new locale
4. Add display name to `LANGUAGE_NAMES` in `src/components/LanguageSwitcher.tsx`
