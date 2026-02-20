import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server-auth';
import { dbConnect } from '@/lib/db';
import User from '@/models/User';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  await requireAdmin(); await dbConnect();
  const patch = await req.json() as { role?: 'admin'|'staff'; status?: 'active'|'disabled' };
  if (patch.role === 'staff') {
    const target = await User.findById(params.id);
    if (target?.role === 'admin') {
      const admins = await User.countDocuments({ role: 'admin' });
      if (admins <= 1) return NextResponse.json({ error: 'Cannot demote last admin' }, { status: 400 });
    }
  }
  const item = await User.findByIdAndUpdate(params.id, patch, { new: true });
  return NextResponse.json({ item });
}
