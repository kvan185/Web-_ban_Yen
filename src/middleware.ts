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
    
    // 1.1. Nếu là trang Login
    if (pathname === '/admin/login') {
      // Nếu đã có session, không cần đăng nhập lại, chuyển về dashboard
      if (session) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      // Nếu chưa có session, cho phép truy cập trang login bình thường
      return NextResponse.next();
    }

    // 1.2. Đối với các trang admin khác
    if (!session) {
      // Lưu lại trang đang định truy cập để quay lại sau khi đăng nhập thành công
      const loginUrl = new URL('/admin/login', request.url);
      
      // Nếu không phải trang chủ admin, thêm tham số callbackUrl
      if (pathname !== '/admin') {
        loginUrl.searchParams.set('callbackUrl', pathname);
      }
      
      return NextResponse.redirect(loginUrl);
    }
  }

  // Cho phép tiếp tục đối với các route khác (public)
  return NextResponse.next();
}

// Cấu hình các route sẽ áp dụng middleware
export const config = {
  matcher: [
    /*
     * Khớp với tất cả các tuyến đường bắt đầu bằng /admin
     * Ngoại trừ các file tĩnh (public, _next/static, _next/image, favicon.ico)
     */
    '/admin/:path*',
  ],
};
