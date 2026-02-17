import { ReactNode } from 'react';
import Link from 'next/link';

const links = [
  ['/admin', 'Dashboard'], ['/admin/users', 'Users'], ['/admin/rooms', 'Rooms'], ['/admin/product-types', 'Product Types'], ['/admin/debts', 'Debts Monitor'], ['/admin/archives', 'Archives Monitor'], ['/admin/settings', 'Settings']
] as const;

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="grid min-h-screen grid-cols-12 bg-slate-950 text-slate-100"><aside className="col-span-12 border-r border-slate-800 p-4 md:col-span-3 lg:col-span-2"><h2 className="mb-4 font-bold text-sky-400">Admin Control</h2><nav className="space-y-2">{links.map(([href,label])=><Link key={href} href={href} className="block rounded-lg px-3 py-2 hover:bg-slate-800">{label}</Link>)}</nav></aside><main className="col-span-12 p-6 md:col-span-9 lg:col-span-10">{children}</main></div>;
}
