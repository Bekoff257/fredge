import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/server-auth';
import { dbConnect } from '@/lib/db';
import Archive from '@/models/Archive';
export async function GET(_: Request, { params }: { params: { id: string } }) { await requireUser(); await dbConnect(); return NextResponse.json({ item: await Archive.findById(params.id) }); }
