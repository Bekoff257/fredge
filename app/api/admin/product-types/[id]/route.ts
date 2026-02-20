import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server-auth';
import { dbConnect } from '@/lib/db';
import ProductType from '@/models/ProductType';
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) { await requireAdmin(); await dbConnect(); return NextResponse.json({ item: await ProductType.findByIdAndUpdate(params.id, await req.json(), { new: true }) }); }
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) { await requireAdmin(); await dbConnect(); await ProductType.findByIdAndDelete(params.id); return NextResponse.json({ ok: true }); }
