import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server-guards';
import { connectDb } from '@/lib/db';
import { Debt } from '@/models/Debt';
import { Archive } from '@/models/Archive';
export async function GET(){await requireAdmin(); await connectDb(); const [debtAgg,archives]=await Promise.all([Debt.aggregate([{ $group: { _id: null, total: { $sum: '$remainingAmount' } } }]),Archive.countDocuments()]); return NextResponse.json({totalDebt:debtAgg[0]?.total??0,archives});}
