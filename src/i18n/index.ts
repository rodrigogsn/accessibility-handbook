import { createIntl } from 'react-intl';

export type Locale = 'en';

export const SUPPORTED_LOCALES: Locale[] = ['en'];
export const DEFAULT_LOCALE: Locale = 'en';

export type Messages = Record<string, string>;

export async function getMessages(locale: Locale): Promise<Messages> {
  switch (locale) {
    case 'en':
    default:
      return (await import('./messages/en.json')).default as Messages;
  }
}

export async function getIntl(locale: Locale) {
  const messages = await getMessages(locale);
  return createIntl({ locale, messages });
}
