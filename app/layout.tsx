import './globals.css';
import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
import { Toaster } from 'sonner';
import { getMessages, Locale, locales } from '@/lib/i18n';

export default async function RootLayout({ children }: { children: ReactNode }) {
  const localeCookie = cookies().get('locale')?.value as Locale | undefined;
  const locale = localeCookie && locales.includes(localeCookie) ? localeCookie : 'uz';
  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <Toaster position="top-right" richColors />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
