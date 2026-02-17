import { cookies } from 'next/headers';
import type { DecodedIdToken } from 'firebase-admin/auth';
import { adminAuth } from '@/lib/firebase-admin';

export async function verifySessionCookieFromRequest(): Promise<DecodedIdToken> {
  const session = (await cookies()).get('session')?.value;
  if (!session) {
    throw new Error('Unauthorized: missing session cookie');
  }

  return adminAuth.verifySessionCookie(session, true);
}
