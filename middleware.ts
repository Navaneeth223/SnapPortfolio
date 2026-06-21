import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  // Protected routes
  const protectedPaths = ['/dashboard', '/editor', '/analytics', '/settings', '/onboarding'];
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));

  // Redirect to login if not authenticated
  if (isProtectedPath && !token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  // Redirect to dashboard if authenticated and trying to access auth pages
  if ((pathname === '/login' || pathname === '/signup') && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/editor/:path*',
    '/analytics/:path*',
    '/settings/:path*',
    '/onboarding/:path*',
    '/login',
    '/signup',
  ],
};
