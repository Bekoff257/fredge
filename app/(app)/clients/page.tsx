import { connectDb } from '@/lib/db';
import { Client } from '@/models/Client';

export default async function ClientsPage() {
  await connectDb();
  const clients = await Client.find({ status: 'active' }).sort({ createdAt: -1 }).lean();
  return <main className="mx-auto max-w-5xl space-y-4 p-4"><h1 className="text-2xl font-bold">Faol mijozlar</h1>{clients.length === 0 ? <p className="card p-8 text-center">Bo'sh holat</p> : clients.map((c) => <article key={String(c._id)} className="card p-4"><p className="font-semibold">{c.firstName} {c.lastName}</p><p>{c.phone}</p><p>{c.productName} / {c.productType} • {c.quantityKg}kg</p></article>)}</main>;
}
