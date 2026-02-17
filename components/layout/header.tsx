'use client';

import Link from 'next/link';
import { useLang } from './language-provider';

export function Header() {
  const { locale, setLocale, t } = useLang();
  return (
    <header className="border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <Link href="/" className="font-semibold text-sky-700">{t.appName}</Link>
        <div className="flex gap-2 text-sm">
          <button onClick={() => setLocale('uz')} className={locale==='uz' ? 'font-bold' : ''}>UZ</button>
          <button onClick={() => setLocale('ru')} className={locale==='ru' ? 'font-bold' : ''}>RU</button>
        </div>
      </div>
    </header>
  );
}
