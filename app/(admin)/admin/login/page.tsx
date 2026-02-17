'use client';

import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { auth } from '@/lib/firebase-client';
import { api } from '@/lib/api';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const onAdminLogin = async () => {
    setError('');

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await cred.user.getIdToken();

      const sessionRes = await fetch('/api/session', {
        method: 'POST',
        headers: { Authorization: `Bearer ${idToken}` }
      });

      if (!sessionRes.ok) {
        throw new Error('Failed to create server session');
      }

      await fetch('/api/users/sync', { method: 'POST' });
      const res = await api.get('/admin/stats').catch(() => null);
      if (!res) {
        await fetch('/api/session', { method: 'DELETE' });
        await signOut(auth);
        setError('auth/not-admin');
        return;
      }

      router.replace('/admin');
    } catch (err) {
      if (err instanceof FirebaseError) setError(err.code);
      else if (err instanceof Error) setError(err.message);
      else setError('auth/unknown-error');
    }
  };

  return (
    <main className="mx-auto max-w-sm p-4">
      <div className="card grid gap-3 p-6">
        <h1 className="font-bold">Admin login</h1>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button onClick={onAdminLogin}>Login</Button>
      </div>
    </main>
  );
}
