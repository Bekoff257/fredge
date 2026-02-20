import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/server-auth';
import { dbConnect } from '@/lib/db';
import Debt from '@/models/Debt';
export async function GET() { await requireUser(); await dbConnect(); return NextResponse.json({ items: await Debt.find().sort({ createdAt: -1 }) }); }
