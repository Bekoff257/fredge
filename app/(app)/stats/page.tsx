'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
export default function StatsPage() { const [data, setData] = useState<Array<{ name: string; total: number }>>([]); useEffect(()=>{ api.get('/stats').then((r)=>setData(r.data.daily)); },[]); return <div className='h-80 rounded-xl border bg-white p-4'><ResponsiveContainer width='100%' height='100%'><LineChart data={data}><XAxis dataKey='name' /><YAxis /><Tooltip /><Line dataKey='total' stroke='#0f172a' /></LineChart></ResponsiveContainer></div>; }
