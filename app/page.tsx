'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { AppShell } from '@/components/layout/app-shell';

type Stats = { kpi: { activeClients: number; debtTotal: number; debtCount: number; storedKg: number } };

export default function DashboardPage() {
  const [data, setData] = useState<Stats | null>(null);
  useEffect(() => { api.get('/stats').then((r) => setData(r.data)); }, []);
  return <AppShell><div className='space-y-4'><div className='grid gap-4 md:grid-cols-3'><Card>Total active: {data?.kpi.activeClients ?? 0}</Card><Card>Debt: {data?.kpi.debtTotal ?? 0} ({data?.kpi.debtCount ?? 0})</Card><Card>Stored kg: {data?.kpi.storedKg ?? 0}</Card></div><div className='grid gap-3 md:grid-cols-5'>{['/clients/new','/clients','/debtors','/archive','/stats'].map((href)=><Link key={href} href={href} className='rounded-xl border bg-white p-4 text-center'>{href}</Link>)}</div></div></AppShell>;
}
