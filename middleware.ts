import { NextRequest, NextResponse } from 'next/server';

const authRoutes = ['/login', '/register'];

function isPublicPath(pathname: string) {
  return (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico' ||
    pathname === '/admin/login' ||
    authRoutes.includes(pathname)
  );
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasSession = Boolean(req.cookies.get('session')?.value);

  if (isPublicPath(pathname)) {
    if (hasSession && authRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
  }

  if (!hasSession) {
    if (pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};
