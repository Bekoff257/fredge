import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDb } from '@/lib/db';
import { finalizeSchema } from '@/lib/validators';
import { Client } from '@/models/Client';
import { Archive } from '@/models/Archive';
import { Debt } from '@/models/Debt';
import { requireUser } from '@/lib/server-guards';

export async function POST(req: Request) {
  await requireUser();
  const body = finalizeSchema.parse(await req.json());
  await connectDb();
  const session = await mongoose.startSession();
  try {
    let result: unknown;
    await session.withTransaction(async () => {
      const client = await Client.findOne({ _id: body.clientId, status: 'active' }).session(session);
      if (!client) throw new Error('Client not active or already finalized');
      const days = Math.max(1, Math.ceil((new Date(body.exitDate).getTime() - new Date(client.entryDate).getTime()) / 86400000));
      const total = days * client.quantityKg * body.dailyRateSomPerKg;
      const archive = await Archive.create([{
        clientId: String(client._id), fullName: `${client.firstName} ${client.lastName}`, phone: client.phone,
        productName: client.productName, productType: client.productType, quantityKg: client.quantityKg,
        room: client.room, entryDate: client.entryDate, exitDate: body.exitDate, daysStored: days,
        dailyRateSomPerKg: body.dailyRateSomPerKg, total, paymentType: body.paymentType, immutableSnapshot: client.toObject()
      }], { session });
      client.status = 'archived';
      await client.save({ session });
      if (body.paymentType === 'debt') await Debt.create([{ archiveId: String(archive[0]._id), clientId: String(client._id), fullName: `${client.firstName} ${client.lastName}`, originalAmount: total, remainingAmount: total }], { session });
      result = archive[0];
    });
    return NextResponse.json(result);
  } finally { await session.endSession(); }
}
