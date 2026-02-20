import { NextRequest, NextResponse } from 'next/server';
import { requireUser } from '@/lib/server-auth';

export async function GET() { const user = await requireUser(); return NextResponse.json({ user }); }
export async function PATCH(req: NextRequest) { await requireUser(); const { locale } = await req.json() as { locale: 'uz'|'ru' }; const res = NextResponse.json({ ok: true }); res.cookies.set('locale', locale, { path: '/' }); return res; }
