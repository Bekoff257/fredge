import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server-guards';
import { connectDb } from '@/lib/db';
import { User } from '@/models/User';
export async function PATCH(req: Request, { params }: { params: { id: string } }){await requireAdmin(); await connectDb(); const body=await req.json() as { status: 'active'|'disabled' }; const user=await User.findByIdAndUpdate(params.id,{ status: body.status },{ new:true }); return NextResponse.json(user);}
