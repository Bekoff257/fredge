'use client';

import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase-client';
import { useLang } from './language-provider';

export function Header() {
  const { locale, setLocale, t } = useLang();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  const onLogout = async () => {
    setLoading(true);
    await fetch('/api/session', { method: 'DELETE' });
    await signOut(auth);
    router.replace('/login');
    setLoading(false);
  };

  return (
    <header className="border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <Link href="/" className="font-semibold text-sky-700">
          {t.appName}
        </Link>
        <div className="flex items-center gap-3 text-sm">
          <button onClick={() => setLocale('uz')} className={locale === 'uz' ? 'font-bold' : ''}>
            UZ
          </button>
          <button onClick={() => setLocale('ru')} className={locale === 'ru' ? 'font-bold' : ''}>
            RU
          </button>
          {user && (
            <button onClick={onLogout} disabled={loading} className="rounded border px-2 py-1">
              {loading ? '...' : 'Logout'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
