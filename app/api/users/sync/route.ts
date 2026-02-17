import { NextResponse } from 'next/server';
import { connectDb } from '@/lib/db';
import { User } from '@/models/User';
import { verifySessionCookieFromRequest } from '@/lib/server-auth';

export async function POST() {
  const token = await verifySessionCookieFromRequest();
  await connectDb();
  const count = await User.countDocuments();
  const user = await User.findOneAndUpdate(
    { firebaseUid: token.uid },
    {
      firebaseUid: token.uid,
      email: token.email ?? `${token.uid}@local`,
      displayName: token.name ?? 'Staff',
      role: count === 0 ? 'admin' : 'staff'
    },
    { upsert: true, new: true }
  );
  return NextResponse.json(user);
}
