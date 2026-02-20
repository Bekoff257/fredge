import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';
import { dbConnect } from '@/lib/db';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  const { idToken } = await req.json() as { idToken: string };
  const decoded = await adminAuth.verifyIdToken(idToken);
  const expiresIn = 1000 * 60 * 60 * 24 * 7;
  const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
  await dbConnect();
  const count = await User.countDocuments();
  const user = await User.findOne({ firebaseUid: decoded.uid });
  if (!user) {
    await User.create({ firebaseUid: decoded.uid, email: decoded.email ?? '', displayName: decoded.name ?? '', role: count === 0 ? 'admin' : 'staff', status: 'active' });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set('session', sessionCookie, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: expiresIn / 1000, path: '/' });
  return res;
}
