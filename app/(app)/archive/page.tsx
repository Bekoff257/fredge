import { connectDb } from '@/lib/db';
import { Archive } from '@/models/Archive';

export default async function ArchivePage() {
  await connectDb();
  const data = await Archive.find().sort({ exitDate: -1 }).lean();
  return <main className="mx-auto max-w-5xl p-4"><h1 className="text-2xl font-bold">Arxiv</h1>{data.map((a)=><div key={String(a._id)} className="card my-3 p-4">{a.fullName} • {new Date(a.entryDate).toLocaleDateString()} - {new Date(a.exitDate).toLocaleDateString()}</div>)}</main>;
}
