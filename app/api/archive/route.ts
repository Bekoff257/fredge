import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/server-auth';
import { dbConnect } from '@/lib/db';
import Archive from '@/models/Archive';
export async function GET() { await requireUser(); await dbConnect(); return NextResponse.json({ items: await Archive.find().sort({ closedAt: -1 }) }); }
