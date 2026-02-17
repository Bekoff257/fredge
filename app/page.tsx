import Link from 'next/link';
import { AppNav } from '@/components/layout/app-shell';

const cards = [
  { title: 'Jami mijozlar', value: '0' },
  { title: 'Qarzdorlar', value: '0' },
  { title: 'Jami mahsulotlar (kg)', value: '0' }
];

const tiles = [
  ['/clients/new', "Yangi mijoz qo'shish"], ['/clients', 'Faol mijozlar'], ['/debtors', 'Qarzdorlar'], ['/my-debts', 'Mening qarzlarim'], ['/stats', 'Statistika'], ['/archive', 'Arxiv']
] as const;

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl space-y-6 p-4">
      <AppNav />
      <section className="grid gap-4 md:grid-cols-3">{cards.map((c)=><article key={c.title} className="card p-4"><p className="text-slate-500">{c.title}</p><p className="text-2xl font-bold">{c.value}</p></article>)}</section>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{tiles.map(([href, label])=><Link key={href} href={href} className="card p-6 text-lg font-semibold hover:border-sky-400">{label}</Link>)}</section>
    </main>
  );
}
