'use client';
import Link from 'next/link';
import { ReactNode } from 'react';
import { LayoutDashboard, Users, Archive, CircleDollarSign, BarChart3 } from 'lucide-react';
import { LanguageSwitcher } from './language-switcher';

const items = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/clients', label: 'Clients', icon: Users },
  { href: '/archive', label: 'Archive', icon: Archive },
  { href: '/debtors', label: 'Debtors', icon: CircleDollarSign },
  { href: '/stats', label: 'Stats', icon: BarChart3 }
];

export function AppShell({ children }: { children: ReactNode }) {
  return <div className='min-h-screen md:grid md:grid-cols-[220px_1fr]'><aside className='hidden border-r bg-white p-4 md:block'>{items.map((i) => <Link key={i.href} href={i.href} className='mb-1 flex items-center gap-2 rounded px-3 py-2 hover:bg-slate-100'><i.icon size={16} />{i.label}</Link>)}</aside><main><header className='flex items-center justify-between border-b bg-white p-4'><h1 className='font-semibold'>FREDGE</h1><LanguageSwitcher /></header><div className='p-4'>{children}</div></main></div>;
}
