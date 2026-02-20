import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server-auth';
import { dbConnect } from '@/lib/db';
import Setting from '@/models/Setting';

export async function GET() { await requireAdmin(); await dbConnect(); const item = await Setting.findOne({ key: 'defaultDailyRate' }); return NextResponse.json({ defaultDailyRate: item?.value ?? null }); }
export async function PATCH(req: NextRequest) { await requireAdmin(); await dbConnect(); const { defaultDailyRate } = await req.json() as { defaultDailyRate: number }; await Setting.findOneAndUpdate({ key: 'defaultDailyRate' }, { value: defaultDailyRate }, { upsert: true }); return NextResponse.json({ ok: true }); }
