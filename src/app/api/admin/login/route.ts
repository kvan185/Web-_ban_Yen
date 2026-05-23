import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdminCredentials, ADMIN_USERNAME } from '../../../../lib/adminAuth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Vui lòng nhập tài khoản và mật khẩu' },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();

    if (verifyAdminCredentials(username, password)) {
      cookieStore.set('admin_session', 'authenticated_true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24,
        path: '/',
      });

      return NextResponse.json({ success: true, isAdmin: true });
    }

    if (username === ADMIN_USERNAME) {
      return NextResponse.json(
        { success: false, message: 'Sai tài khoản hoặc mật khẩu' },
        { status: 401 }
      );
    }

    cookieStore.set('user_session', username, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return NextResponse.json({ success: true, isAdmin: false });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Đã có lỗi xảy ra' },
      { status: 500 }
    );
  }
}
