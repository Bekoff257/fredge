import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server-guards';
import { connectDb } from '@/lib/db';
import { User } from '@/models/User';
export async function GET(){await requireAdmin(); await connectDb(); return NextResponse.json(await User.find());}
