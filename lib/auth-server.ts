import { headers } from 'next/headers';
import { adminAuth } from '@/lib/firebase-admin';

export async function requireToken(): Promise<string> {
  const authHeader = headers().get('authorization');
  if (!authHeader?.startsWith('Bearer ')) throw new Error('Unauthorized');
  return authHeader.split(' ')[1];
}

export async function verifyIdToken() {
  const token = await requireToken();
  return adminAuth.verifyIdToken(token);
}
