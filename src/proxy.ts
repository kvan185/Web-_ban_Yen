import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const customerManagerPaths = ['/manager/profile', '/manager/favorite', '/manager/order-history'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminSession = request.cookies.get('admin_session');
  const userSession = request.cookies.get('user_session');

  if (pathname === '/manager/login') {
    return NextResponse.redirect(new URL(adminSession ? '/manager' : '/login', request.url));
  }

  if (pathname.startsWith('/manager')) {
    const isCustomerArea = customerManagerPaths.some(
      (allowedPath) => pathname === allowedPath || pathname.startsWith(`${allowedPath}/`)
    );

    if (!adminSession && !userSession) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', isCustomerArea ? pathname : '/manager/profile');
      return NextResponse.redirect(loginUrl);
    }

    if (!adminSession && userSession && !isCustomerArea) {
      return NextResponse.redirect(new URL('/manager/profile', request.url));
    }
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|logo.jpeg).*)'],
};
