import { NextRequest, NextResponse } from 'next/server';
import { requireUser } from '@/lib/server-auth';
import { dbConnect } from '@/lib/db';
import Debt from '@/models/Debt';
import { debtPaymentSchema } from '@/lib/validators';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await requireUser(); await dbConnect();
  const payload = debtPaymentSchema.parse(await req.json());
  const debt = await Debt.findById(params.id);
  if (!debt) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  debt.paidSom += payload.amountSom; debt.remainingSom = Math.max(0, debt.totalSom - debt.paidSom);
  debt.status = debt.remainingSom === 0 ? 'PAID' : debt.paidSom > 0 ? 'PARTIAL' : 'UNPAID';
  debt.payments.push({ amountSom: payload.amountSom, note: payload.note, paidAt: new Date(), paidByUid: user.firebaseUid });
  await debt.save();
  return NextResponse.json({ item: debt });
}
