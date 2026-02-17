import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';

const SESSION_NAME = 'session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function unauthorized(message: string) {
  return NextResponse.json({ error: message }, { status: 401 });
}

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

async function extractIdToken(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }

  try {
    const body = (await req.json()) as { idToken?: string };
    return body.idToken;
  } catch {
    return undefined;
  }
}

export async function POST(req: Request) {
  try {
    const idToken = await extractIdToken(req);
    if (!idToken) return badRequest('Missing Firebase ID token');

    await adminAuth.verifyIdToken(idToken);

    const expiresIn = SESSION_MAX_AGE_SECONDS * 1000;
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

    (await cookies()).set(SESSION_NAME, sessionCookie, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: SESSION_MAX_AGE_SECONDS
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create session';
    if (message.toLowerCase().includes('token')) return unauthorized(message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE() {
  (await cookies()).set(SESSION_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0
  });

  return NextResponse.json({ ok: true });
}
