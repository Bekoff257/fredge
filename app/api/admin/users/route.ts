import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server-auth';
import { dbConnect } from '@/lib/db';
import User from '@/models/User';
export async function GET() { await requireAdmin(); await dbConnect(); return NextResponse.json({ items: await User.find().sort({ createdAt: -1 }) }); }
