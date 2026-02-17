'use client';

import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { auth } from '@/lib/firebase-client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const onLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await cred.user.getIdToken();

      const sessionRes = await fetch('/api/session', {
        method: 'POST',
        headers: { Authorization: `Bearer ${idToken}` }
      });

      if (!sessionRes.ok) {
        const body = (await sessionRes.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error ?? 'Failed to create server session');
      }

      await fetch('/api/users/sync', { method: 'POST' });
      router.replace('/');
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.code);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('auth/unknown-error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-sm p-4">
      <div className="card grid gap-3 p-6">
        <h1 className="text-xl font-bold">Login</h1>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button onClick={onLogin} disabled={loading}>
          {loading ? 'Kirilmoqda...' : 'Kirish'}
        </Button>
      </div>
    </main>
  );
}
