import { connectDb } from '@/lib/db';
import { Debt } from '@/models/Debt';
export default async function DebtorsPage() {
  await connectDb();
  const data = await Debt.find().sort({ createdAt: -1 }).lean();
  return <main className="mx-auto max-w-5xl p-4"><h1 className="text-2xl font-bold">Qarzdorlar</h1>{data.map((d)=><div key={String(d._id)} className="card my-3 p-4">{d.fullName} • {d.remainingAmount} so'm • {d.status}</div>)}</main>;
}
