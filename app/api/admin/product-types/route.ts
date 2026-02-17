import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server-guards';
import { connectDb } from '@/lib/db';
import { ProductType } from '@/models/ProductType';
export async function GET(){await requireAdmin(); await connectDb(); return NextResponse.json(await ProductType.find());}
export async function POST(req:Request){await requireAdmin(); await connectDb(); const body=await req.json() as { name: string }; return NextResponse.json(await ProductType.create({name:body.name,isActive:true}),{status:201});}
