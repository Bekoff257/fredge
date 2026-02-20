'use client';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase-client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/api';

export default function RegisterPage() {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const router = useRouter();
  const submit = async () => { const res = await createUserWithEmailAndPassword(auth, email, password); const token = await res.user.getIdToken(); await api.post('/session', { idToken: token }); router.push('/'); };
  return <div className='mx-auto mt-24 max-w-md space-y-3 rounded-xl border bg-white p-6'><h1 className='text-xl font-semibold'>Register</h1><Input placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} /><Input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} /><Button onClick={submit}>Register</Button></div>;
}
