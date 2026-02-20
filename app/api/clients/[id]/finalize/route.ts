import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { requireUser } from '@/lib/server-auth';
import { dbConnect } from '@/lib/db';
import Client from '@/models/Client';
import Archive from '@/models/Archive';
import Debt from '@/models/Debt';
import Room from '@/models/Room';
import ProductType from '@/models/ProductType';
import { finalizeSchema } from '@/lib/validators';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await requireUser(); await dbConnect();
  const body = finalizeSchema.parse(await req.json());
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const client = await Client.findById(params.id).session(session);
    if (!client) throw new Error('Not found');
    const exit = new Date(body.exitDate); const entry = new Date(client.entryDate);
    const days = Math.max(1, Math.ceil((exit.getTime() - entry.getTime()) / 86400000));
    const total = client.quantityKg * body.dailyRateSomPerKg * days;
    const room = await Room.findById(client.roomId).session(session);
    const pType = await ProductType.findById(client.productTypeId).session(session);
    const archive = await Archive.create([{ clientId: client._id.toString(), firstName: client.firstName, lastName: client.lastName, phone: client.phone, productName: client.productName, productTypeName: pType?.name ?? '', quantityKg: client.quantityKg, roomName: room?.name ?? '', containerType: client.containerType, containerCount: client.containerCount, note: client.note, entryDate: client.entryDate, exitDate: exit, daysStored: days, dailyRateSomPerKg: body.dailyRateSomPerKg, totalSom: total, paymentStatus: body.paymentType === 'DEBT' ? 'DEBT' : 'PAID', closedBy: user.firebaseUid, closedAt: new Date() }], { session });
    if (body.paymentType === 'DEBT') await Debt.create([{ archiveId: archive[0]._id, totalSom: total, paidSom: 0, remainingSom: total, status: 'UNPAID', payments: [] }], { session });
    await Client.findByIdAndDelete(params.id).session(session);
    await session.commitTransaction();
    return NextResponse.json({ ok: true });
  } catch (error) {
    await session.abortTransaction();
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  } finally { session.endSession(); }
}
