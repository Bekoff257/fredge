'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Table, Td, Th } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
export default function ArchivePage() { const [items, setItems] = useState<Array<{ _id: string; firstName: string; totalSom: number }>>([]); useEffect(()=>{api.get('/archive').then((r)=>setItems(r.data.items));},[]); const excel = (id: string)=>api.post(`/archive/${id}/excel`, {}, { responseType: 'blob' }).then((r)=>{ const url = URL.createObjectURL(r.data); const a=document.createElement('a'); a.href=url; a.download='invoice.xlsx'; a.click();}); return <Table><thead><tr><Th>Client</Th><Th>Total</Th><Th/></tr></thead><tbody>{items.map((i)=><tr key={i._id}><Td>{i.firstName}</Td><Td>{i.totalSom}</Td><Td><Button onClick={()=>excel(i._id)}>Excel</Button></Td></tr>)}</tbody></Table>; }
