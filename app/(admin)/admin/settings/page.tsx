'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AdminSettingsPage() {
  const [room, setRoom] = useState(''); const [type, setType] = useState('');
  const [rooms, setRooms] = useState<Array<{_id:string;name:string}>>([]); const [types, setTypes] = useState<Array<{_id:string;name:string}>>([]);
  const load = () => { api.get('/admin/rooms').then((r)=>setRooms(r.data.items)); api.get('/admin/product-types').then((r)=>setTypes(r.data.items)); };
  useEffect(load,[]);
  return <div className='space-y-4'><div className='rounded border bg-white p-4'><Input value={room} onChange={(e)=>setRoom(e.target.value)} placeholder='new room' /><Button onClick={()=>api.post('/admin/rooms',{name:room}).then(load)}>Add room</Button>{rooms.map((r)=><div key={r._id}>{r.name}</div>)}</div><div className='rounded border bg-white p-4'><Input value={type} onChange={(e)=>setType(e.target.value)} placeholder='new product type' /><Button onClick={()=>api.post('/admin/product-types',{name:type}).then(load)}>Add type</Button>{types.map((t)=><div key={t._id}>{t.name}</div>)}</div></div>;
}
