'use client';

import { IntlProvider } from 'react-intl';
import type { Messages } from '@/i18n';

interface IntlClientProviderProps {
  locale: string;
  messages: Messages;
  children: React.ReactNode;
}

export function IntlClientProvider({
  locale,
  messages,
  children,
}: IntlClientProviderProps): React.ReactElement {
  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
}
