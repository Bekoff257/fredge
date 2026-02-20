import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ['/login', '/register', '/admin/login'];

export function middleware(req: NextRequest) {
  const session = req.cookies.get('session')?.value;
  const { pathname } = req.nextUrl;
  if (pathname.startsWith('/api')) return NextResponse.next();

  if (!session && !publicRoutes.includes(pathname)) {
    if (pathname.startsWith('/admin')) return NextResponse.redirect(new URL('/admin/login', req.url));
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (session && publicRoutes.includes(pathname)) return NextResponse.redirect(new URL('/', req.url));
  return NextResponse.next();
}

export const config = { matcher: ['/((?!_next|favicon.ico).*)'] };
