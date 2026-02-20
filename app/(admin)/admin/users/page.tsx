'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
export default function AdminUsersPage() { const [items,setItems]=useState<Array<{_id:string;email:string;role:string;status:string}>>([]); const load=()=>api.get('/admin/users').then((r)=>setItems(r.data.items)); useEffect(load,[]); const patch=(id:string,p:object)=>api.patch(`/admin/users/${id}`,p).then(load); return <div className='space-y-2'>{items.map((u)=><div key={u._id} className='rounded border bg-white p-3'>{u.email} {u.role} {u.status} <Button onClick={()=>patch(u._id,{role:u.role==='admin'?'staff':'admin'})}>Toggle role</Button> <Button onClick={()=>patch(u._id,{status:u.status==='active'?'disabled':'active'})}>Toggle status</Button></div>)}</div>; }
