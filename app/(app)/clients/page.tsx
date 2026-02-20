'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Table, Td, Th } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

type Client = { _id: string; firstName: string; lastName: string; phone: string; quantityKg: number; entryDate: string };

export default function ClientsPage() {
  const [items, setItems] = useState<Client[]>([]);
  const load = () => api.get('/clients').then((r) => setItems(r.data.items));
  useEffect(load, []);
  const finalize = async (id: string) => { await api.post(`/clients/${id}/finalize`, { dailyRateSomPerKg: 500, exitDate: new Date().toISOString(), paymentType: 'CASH' }); load(); };
  return <Table><thead><tr><Th>Name</Th><Th>Phone</Th><Th>Kg</Th><Th>Entry</Th><Th/></tr></thead><tbody>{items.map((c)=><tr key={c._id}><Td>{c.firstName} {c.lastName}</Td><Td>{c.phone}</Td><Td>{c.quantityKg}</Td><Td>{new Date(c.entryDate).toLocaleDateString()}</Td><Td><Button onClick={()=>finalize(c._id)}>Billing/Yakunlash</Button></Td></tr>)}</tbody></Table>;
}
