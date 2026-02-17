import { NextResponse } from 'next/server';
import { connectDb } from '@/lib/db';
import { Archive } from '@/models/Archive';
import { requireUser } from '@/lib/server-guards';
export async function GET(){await requireUser(); await connectDb(); return NextResponse.json(await Archive.find().sort({exitDate:-1}));}
