import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server-guards';
import { connectDb } from '@/lib/db';
import { User } from '@/models/User';
export async function PATCH(req: Request, { params }: { params: { id: string } }){await requireAdmin(); await connectDb(); const body=await req.json() as { role: 'admin'|'staff' }; const user=await User.findByIdAndUpdate(params.id,{ role: body.role },{ new:true }); return NextResponse.json(user);}
