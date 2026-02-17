'use client';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase-client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function RegisterPage() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return <main className="mx-auto max-w-sm p-4"><div className="card grid gap-3 p-6"><h1 className="text-xl font-bold">Register</h1><Input placeholder="Name" value={displayName} onChange={(e)=>setDisplayName(e.target.value)} /><Input value={email} onChange={(e)=>setEmail(e.target.value)} /><Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} /><Button onClick={async ()=>{const cred=await createUserWithEmailAndPassword(auth,email,password); await updateProfile(cred.user,{displayName});}}>Ro'yxatdan o'tish</Button><p className="text-xs text-slate-500">Phone OTP TODO (feature-flagged in settings)</p></div></main>;
}
