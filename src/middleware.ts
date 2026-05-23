import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware xử lý xác thực và bảo vệ các tuyến đường Admin
 */
export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const session = request.cookies.get('admin_session');
  
  // LOG: Theo dõi truy cập vào khu vực admin (Tùy chọn)
  if (pathname.startsWith('/admin')) {
    console.log(`[Admin Access] Path: ${pathname}, Session: ${session ? 'Active' : 'None'}`);
  }

  // 1. Nếu đang truy cập vào các tuyến đường /admin
  if (pathname.startsWith('/admin')) {
    
    // 1.1. Nếu là trang cũ /admin/login thì chuyển về /login
    if (pathname === '/admin/login') {
      if (session) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // 1.2. Đối với các trang admin khác
    if (!session) {
      const loginUrl = new URL('/login', request.url);
      if (pathname !== '/admin') {
        loginUrl.searchParams.set('callbackUrl', pathname);
      }
      return NextResponse.redirect(loginUrl);
    }
  }

  // Cho phép tiếp tục đối với các route khác (public)
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);
  
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// Cấu hình các route sẽ áp dụng middleware
export const config = {
  matcher: [
    /*
     * Khớp với tất cả các tuyến đường
     * Ngoại trừ các file tĩnh (public, _next/static, _next/image, favicon.ico) và api routes
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
