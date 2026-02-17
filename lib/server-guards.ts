import { connectDb } from '@/lib/db';
import { verifyIdToken } from '@/lib/auth-server';
import { User } from '@/models/User';

export async function requireUser() {
  await connectDb();
  const token = await verifyIdToken();
  const user = await User.findOne({ firebaseUid: token.uid });
  if (!user || user.status === 'disabled') throw new Error('Unauthorized');
  return { token, user };
}

export async function requireAdmin() {
  const { user } = await requireUser();
  if (user.role !== 'admin') throw new Error('Forbidden');
  return user;
}
