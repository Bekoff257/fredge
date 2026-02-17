import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server-guards';
import { connectDb } from '@/lib/db';
import { ProductType } from '@/models/ProductType';
export async function PATCH(req:Request,{params}:{params:{id:string}}){await requireAdmin(); await connectDb(); const body=await req.json() as { name?:string; isActive?:boolean }; return NextResponse.json(await ProductType.findByIdAndUpdate(params.id,body,{new:true}));}
export async function DELETE(_:Request,{params}:{params:{id:string}}){await requireAdmin(); await connectDb(); await ProductType.findByIdAndDelete(params.id); return NextResponse.json({ok:true});}
