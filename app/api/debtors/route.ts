import { NextResponse } from 'next/server';
import { connectDb } from '@/lib/db';
import { Debt } from '@/models/Debt';
import { requireUser } from '@/lib/server-guards';

export async function GET() { await requireUser(); await connectDb(); return NextResponse.json(await Debt.find()); }
export async function PATCH(req: Request) {
  await requireUser();
  const body = await req.json() as { debtId: string; amount: number };
  await connectDb();
  const debt = await Debt.findById(body.debtId);
  if (!debt) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  debt.paidAmount += body.amount;
  debt.remainingAmount = Math.max(0, debt.originalAmount - debt.paidAmount);
  debt.status = debt.remainingAmount === 0 ? 'paid' : debt.paidAmount > 0 ? 'partial' : 'unpaid';
  debt.payments.push({ amount: body.amount, paidAt: new Date() });
  await debt.save();
  return NextResponse.json(debt);
}
