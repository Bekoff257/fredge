'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { clientSchema } from '@/lib/validators';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { toast } from 'sonner';

type FormValues = z.infer<typeof clientSchema>;

export default function NewClientPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: { containerType: 'Yashik', entryDate: new Date().toISOString().slice(0, 10) }
  });

  const submit = async (data: FormValues) => {
    await api.post('/clients', data);
    toast.success('Mijoz saqlandi');
  };

  return <main className="mx-auto max-w-3xl p-4"><form onSubmit={handleSubmit(submit)} className="card grid gap-3 p-6">
    <h1 className="text-xl font-bold">Yangi mijoz qo'shish</h1>
    <Input placeholder="Ism" {...register('firstName')} /><p>{errors.firstName?.message}</p>
    <Input placeholder="Familiya" {...register('lastName')} />
    <Input placeholder="Telefon" {...register('phone')} />
    <Input placeholder="Mahsulot nomi" {...register('productName')} />
    <Select {...register('productType')}><option value="">Mahsulot navi</option><option>Go'sht</option><option>Baliq</option><option>Tovuq</option></Select>
    <Input type="number" step="0.1" placeholder="Miqdori kg" {...register('quantityKg', { valueAsNumber: true })} />
    <Select {...register('room')}><option value="">Xona</option><option>1-xona</option><option>2-xona</option></Select>
    <Select {...register('containerType')}><option>Yashik</option><option>Qop</option><option>Karzinka</option></Select>
    <Input type="number" placeholder="Idish soni" {...register('containerCount', { valueAsNumber: true })} />
    <Input type="date" {...register('entryDate')} />
    <Input placeholder="Izoh" {...register('note')} />
    <Button disabled={isSubmitting}>Saqlash</Button>
  </form></main>;
}
