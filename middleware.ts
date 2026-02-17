import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ['/login', '/register', '/admin/login'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (publicRoutes.some((r) => pathname.startsWith(r))) return NextResponse.next();

  const token = req.cookies.get('firebaseToken')?.value;
  if (!token) {
    if (pathname.startsWith('/admin')) return NextResponse.redirect(new URL('/admin/login', req.url));
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] };
