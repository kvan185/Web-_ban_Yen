import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdminCredentials } from '../../../../lib/adminAuth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (verifyAdminCredentials(username, password)) {
      const cookieStore = await cookies();
      
      // Set a secure cookie
      cookieStore.set('admin_session', 'authenticated_true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, message: 'Sai tài khoản hoặc mật khẩu' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Đã có lỗi xảy ra' },
      { status: 500 }
    );
  }
}
