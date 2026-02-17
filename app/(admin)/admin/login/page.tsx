'use client';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase-client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { api } from '@/lib/api';

export default function AdminLoginPage(){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const router=useRouter();
  return <main className="mx-auto max-w-sm p-4"><div className="card grid gap-3 p-6"><h1 className="font-bold">Admin login</h1><Input value={email} onChange={(e)=>setEmail(e.target.value)} /><Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} /><Button onClick={async ()=>{const cred=await signInWithEmailAndPassword(auth,email,password); const t=await cred.user.getIdToken(); const res=await api.get('/admin/stats',{headers:{Authorization:`Bearer ${t}`}}).catch(()=>null); if(!res){await signOut(auth); return;} router.push('/admin');}}>Login</Button></div></main>
}
