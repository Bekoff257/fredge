import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server-auth';
import { dbConnect } from '@/lib/db';
import Room from '@/models/Room';
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) { await requireAdmin(); await dbConnect(); return NextResponse.json({ item: await Room.findByIdAndUpdate(params.id, await req.json(), { new: true }) }); }
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) { await requireAdmin(); await dbConnect(); await Room.findByIdAndDelete(params.id); return NextResponse.json({ ok: true }); }
