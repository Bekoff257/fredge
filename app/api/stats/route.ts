import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/server-auth';
import { dbConnect } from '@/lib/db';
import Client from '@/models/Client';
import Debt from '@/models/Debt';
import Archive from '@/models/Archive';

export async function GET() {
  await requireUser(); await dbConnect();
  const [activeClients, debts, clients, archives] = await Promise.all([Client.countDocuments({ status: 'ACTIVE' }), Debt.find(), Client.find({ status: 'ACTIVE' }), Archive.find()]);
  const debtTotal = debts.reduce((s, d) => s + d.remainingSom, 0);
  const storedKg = clients.reduce((s, c) => s + c.quantityKg, 0);
  const dailyMap = new Map<string, number>();
  archives.forEach((a) => { const key = new Date(a.closedAt).toISOString().slice(0, 10); dailyMap.set(key, (dailyMap.get(key) ?? 0) + a.totalSom); });
  return NextResponse.json({ kpi: { activeClients, debtTotal, debtCount: debts.length, storedKg }, daily: Array.from(dailyMap.entries()).map(([name, total]) => ({ name, total })) });
}
