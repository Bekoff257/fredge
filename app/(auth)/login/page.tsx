'use client';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase-client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  return <main className="mx-auto max-w-sm p-4"><div className="card grid gap-3 p-6"><h1 className="text-xl font-bold">Login</h1><Input value={email} onChange={(e)=>setEmail(e.target.value)} /><Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} /><Button onClick={async ()=>{await signInWithEmailAndPassword(auth,email,password); router.push('/');}}>Kirish</Button></div></main>;
}
