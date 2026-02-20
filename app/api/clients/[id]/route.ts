import { NextRequest, NextResponse } from 'next/server';
import { requireUser } from '@/lib/server-auth';
import { dbConnect } from '@/lib/db';
import Client from '@/models/Client';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) { await requireUser(); await dbConnect(); return NextResponse.json({ item: await Client.findById(params.id) }); }
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) { await requireUser(); await dbConnect(); return NextResponse.json({ item: await Client.findByIdAndUpdate(params.id, await req.json(), { new: true }) }); }
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) { await requireUser(); await dbConnect(); await Client.findByIdAndDelete(params.id); return NextResponse.json({ ok: true }); }
