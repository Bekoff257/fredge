import { NextResponse } from 'next/server';
import { connectDb } from '@/lib/db';
import { Client } from '@/models/Client';
import { clientSchema } from '@/lib/validators';
import { requireUser } from '@/lib/server-guards';

export async function GET() { await requireUser(); await connectDb(); return NextResponse.json(await Client.find({ status: 'active' })); }
export async function POST(req: Request) {
  await requireUser();
  const body = clientSchema.parse(await req.json());
  await connectDb();
  const created = await Client.create({ ...body, status: 'active' });
  return NextResponse.json(created, { status: 201 });
}
