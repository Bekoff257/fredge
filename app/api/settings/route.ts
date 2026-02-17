import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/server-guards';
import { connectDb } from '@/lib/db';
import { Setting } from '@/models/Setting';
export async function GET(){await requireUser(); await connectDb(); let s=await Setting.findOne(); if(!s) s=await Setting.create({}); return NextResponse.json(s);}
