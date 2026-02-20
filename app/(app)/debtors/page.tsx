'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, Td, Th } from '@/components/ui/table';

export default function DebtorsPage() { const [items, setItems] = useState<Array<{ _id: string; remainingSom: number; status: string }>>([]); const [amount,setAmount]=useState(''); const load=()=>api.get('/debts').then((r)=>setItems(r.data.items)); useEffect(load,[]); const pay=(id:string)=>api.post(`/debts/${id}/payments`,{amountSom:Number(amount),note:''}).then(load); return <div className='space-y-3'><Input placeholder='payment amount' value={amount} onChange={(e)=>setAmount(e.target.value)} /><Table><thead><tr><Th>Remaining</Th><Th>Status</Th><Th/></tr></thead><tbody>{items.map((i)=><tr key={i._id}><Td>{i.remainingSom}</Td><Td>{i.status}</Td><Td><Button onClick={()=>pay(i._id)}>Add payment</Button></Td></tr>)}</tbody></Table></div>; }
