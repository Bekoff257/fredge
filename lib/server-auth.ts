import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase-admin';
import { dbConnect } from '@/lib/db';
import User from '@/models/User';

export async function requireUser() {
  const session = cookies().get('session')?.value;
  if (!session) throw new Error('UNAUTHORIZED');
  const decoded = await adminAuth.verifySessionCookie(session, true);
  await dbConnect();
  const user = await User.findOne({ firebaseUid: decoded.uid });
  if (!user || user.status !== 'active') throw new Error('FORBIDDEN');
  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== 'admin') throw new Error('ADMIN_ONLY');
  return user;
}
