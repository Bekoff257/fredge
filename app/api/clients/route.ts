import { NextRequest, NextResponse } from 'next/server';
import { requireUser } from '@/lib/server-auth';
import { dbConnect } from '@/lib/db';
import Client from '@/models/Client';
import { clientSchema } from '@/lib/validators';

export async function GET(req: NextRequest) {
  await requireUser(); await dbConnect();
  const q = req.nextUrl.searchParams.get('q');
  const filter = q ? { status: 'ACTIVE', $text: { $search: q } } : { status: 'ACTIVE' };
  const items = await Client.find(filter).sort({ createdAt: -1 });
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const user = await requireUser(); await dbConnect();
  const data = clientSchema.parse(await req.json());
  const item = await Client.create({ ...data, status: 'ACTIVE', createdBy: user.firebaseUid, entryDate: new Date(data.entryDate) });
  return NextResponse.json({ item });
}
