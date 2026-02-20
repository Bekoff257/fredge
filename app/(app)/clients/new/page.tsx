'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clientSchema } from '@/lib/validators';
import { z } from 'zod';
import { api } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type FormData = z.infer<typeof clientSchema>;

export default function NewClientPage() {
  const { register, handleSubmit } = useForm<FormData>({ resolver: zodResolver(clientSchema), defaultValues: { entryDate: new Date().toISOString().slice(0,10), containerType: 'YASHIK' } });
  const [rooms, setRooms] = useState<Array<{ _id: string; name: string }>>([]); const [types, setTypes] = useState<Array<{ _id: string; name: string }>>([]);
  useEffect(() => { api.get('/admin/rooms').then((r)=>setRooms(r.data.items)); api.get('/admin/product-types').then((r)=>setTypes(r.data.items)); }, []);
  const submit = async (values: FormData) => { await api.post('/clients', values); toast.success('Created'); };
  return <form onSubmit={handleSubmit(submit)} className='grid gap-3 md:grid-cols-2'>{['firstName','lastName','phone','productName','quantityKg','containerCount','entryDate','note'].map((f)=><Input key={f} type={f==='entryDate'?'date':'text'} placeholder={f} {...register(f as keyof FormData)} />)}<Select {...register('productTypeId')}>{types.map((t)=><option key={t._id} value={t._id}>{t.name}</option>)}</Select><Select {...register('roomId')}>{rooms.map((r)=><option key={r._id} value={r._id}>{r.name}</option>)}</Select><Select {...register('containerType')}><option value='YASHIK'>YASHIK</option><option value='QOP'>QOP</option><option value='KARZINKA'>KARZINKA</option></Select><Button type='submit' className='md:col-span-2'>Save</Button></form>;
}
