'use client';

import { createContext, useContext, useMemo, useState, ReactNode } from 'react';
import uz from '@/messages/uz.json';
import ru from '@/messages/ru.json';

type Locale = 'uz' | 'ru';
type Dictionary = typeof uz;

const Ctx = createContext<{locale: Locale; setLocale: (l: Locale)=>void; t: Dictionary}>({locale: 'uz', setLocale: () => undefined, t: uz});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>((process.env.NEXT_PUBLIC_DEFAULT_LOCALE as Locale) || 'uz');
  const value = useMemo(() => ({ locale, setLocale, t: locale === 'uz' ? uz : ru }), [locale]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang() { return useContext(Ctx); }
