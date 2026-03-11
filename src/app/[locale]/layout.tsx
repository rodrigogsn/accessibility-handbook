import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { getIntl, getMessages, SUPPORTED_LOCALES } from '@/i18n';
import type { Locale } from '@/i18n';
import { SiteHeader } from '@/components/SiteHeader';
import { IntlClientProvider } from '@/components/IntlClientProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export function generateStaticParams(): { locale: Locale }[] {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const intl = await getIntl(locale as Locale);
  return {
    title: intl.formatMessage({ id: 'metadata.siteName' }),
    description: intl.formatMessage({ id: 'metadata.siteDescription' }),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}): Promise<React.ReactElement> {
  const locale = ((await params).locale as Locale) ?? 'en';
  const intl = await getIntl(locale);
  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <body className={`${inter.variable} font-sans antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:ring-2 focus:ring-ring"
        >
          {intl.formatMessage({ id: 'common.skipToMain' })}
        </a>
        <SiteHeader
          locale={locale}
          siteName={intl.formatMessage({ id: 'metadata.siteName' })}
          changeLanguageLabel={intl.formatMessage({ id: 'common.changeLanguage' })}
        />
        <IntlClientProvider locale={locale} messages={messages}>
          {children}
        </IntlClientProvider>
      </body>
    </html>
  );
}
