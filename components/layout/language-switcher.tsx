'use client';
import { useTransition } from 'react';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';

export function LanguageSwitcher() {
  const [pending, start] = useTransition();
  const setLocale = (locale: 'uz' | 'ru') => start(async () => { await api.patch('/me', { locale }); location.reload(); });
  return <div className='flex gap-2'><Button variant='outline' disabled={pending} onClick={() => setLocale('uz')}>UZ</Button><Button variant='outline' disabled={pending} onClick={() => setLocale('ru')}>RU</Button></div>;
}
