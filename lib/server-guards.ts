import { connectDb } from '@/lib/db';
import { verifySessionCookieFromRequest } from '@/lib/server-auth';
import { User } from '@/models/User';

export async function requireUser() {
  await connectDb();
  const token = await verifySessionCookieFromRequest();
  const user = await User.findOne({ firebaseUid: token.uid });
  if (!user || user.status === 'disabled') throw new Error('Unauthorized');
  return { token, user };
}

export async function requireAdmin() {
  const { user, token } = await requireUser();
  if (user.role !== 'admin') throw new Error('Forbidden');
  return { user, token };
}
