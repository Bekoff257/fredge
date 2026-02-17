import { NextResponse } from 'next/server';
import { connectDb } from '@/lib/db';
import { Client } from '@/models/Client';
import { Debt } from '@/models/Debt';
import { requireUser } from '@/lib/server-guards';
export async function GET(){await requireUser(); await connectDb(); const [clients,debtors,debtAgg]=await Promise.all([Client.countDocuments({status:'active'}),Debt.countDocuments({status:{$ne:'paid'}}),Debt.aggregate([{ $group: { _id: null, total: { $sum: '$remainingAmount' } } }])]); return NextResponse.json({clients,debtors,totalDebt:debtAgg[0]?.total ?? 0});}
