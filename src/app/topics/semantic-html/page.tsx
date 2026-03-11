import { redirect } from 'next/navigation';
import { DEFAULT_LOCALE } from '@/i18n';

export default function SemanticHtmlRedirect(): never {
  redirect(`/${DEFAULT_LOCALE}/topics/semantic-html`);
}
