'use client';

import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { auth } from '@/lib/firebase-client';

export default function RegisterPage() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onRegister = async () => {
    setLoading(true);

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName });
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
        alert(err.code);
      } else if (err instanceof Error) {
        alert(err.message);
      } else {
        alert('auth/unknown-error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-sm p-4">
      <div className="card grid gap-3 p-6">
        <h1 className="text-xl font-bold">Register</h1>
        <Input placeholder="Name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={onRegister} disabled={loading}>
          {loading ? "Ro'yxatdan o'tmoqda..." : "Ro'yxatdan o'tish"}
        </Button>
        <p className="text-xs text-slate-500">Phone OTP TODO (feature-flagged in settings)</p>
      </div>
    </main>
  );
}
