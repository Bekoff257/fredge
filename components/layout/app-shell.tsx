import Link from 'next/link';

const links = [
  { href: '/', label: 'Dashboard' },
  { href: '/clients/new', label: 'Yangi mijoz' },
  { href: '/clients', label: 'Mijozlar' },
  { href: '/debtors', label: 'Qarzdorlar' },
  { href: '/archive', label: 'Arxiv' },
  { href: '/stats', label: 'Statistika' }
];

export function AppNav() {
  return <nav className="grid grid-cols-2 gap-2 md:flex">{links.map((l)=><Link key={l.href} href={l.href} className="card px-3 py-2 text-sm">{l.label}</Link>)}</nav>;
}
