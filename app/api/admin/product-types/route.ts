import { NextRequest, NextResponse } from 'next/server';
import { requireUser, requireAdmin } from '@/lib/server-auth';
import { dbConnect } from '@/lib/db';
import ProductType from '@/models/ProductType';

export async function GET() { await requireUser(); await dbConnect(); return NextResponse.json({ items: await ProductType.find().sort({ name: 1 }) }); }
export async function POST(req: NextRequest) { await requireAdmin(); await dbConnect(); return NextResponse.json({ item: await ProductType.create(await req.json()) }); }
