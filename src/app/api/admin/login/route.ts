import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdminCredentials, ADMIN_USERNAME } from '../../../../lib/adminAuth';

function setAdminCookie(response: NextResponse) {
  response.cookies.set('admin_session', 'authenticated_true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24,
    path: '/',
  });
}

function setUserCookie(response: NextResponse, username: string) {
  response.cookies.set('user_session', username, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24,
    path: '/',
  });
}

function safeRedirectPath(value: FormDataEntryValue | null) {
  if (typeof value !== 'string') {
    return '';
  }

  return value.startsWith('/') && !value.startsWith('//') ? value : '';
}

function redirectUrl(request: Request, path: string) {
  const currentUrl = new URL(request.url);
  const host = request.headers.get('host') || currentUrl.host;
  const proto = request.headers.get('x-forwarded-proto') || currentUrl.protocol.replace(':', '');

  return `${proto}://${host}${path}`;
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    const isFormPost = contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data');
    let username = '';
    let password = '';
    let callbackUrl = '';

    if (isFormPost) {
      const formData = await request.formData();
      username = String(formData.get('username') || '');
      password = String(formData.get('password') || '');
      callbackUrl = safeRedirectPath(formData.get('callbackUrl'));
    } else {
      const body = await request.json();
      username = body.username;
      password = body.password;
    }

    if (!username || !password) {
      if (isFormPost) {
        return NextResponse.redirect(redirectUrl(request, '/login?error=missing'), 303);
      }

      return NextResponse.json(
        { success: false, message: 'Vui lòng nhập tài khoản và mật khẩu' },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();

    if (verifyAdminCredentials(username, password)) {
      if (isFormPost) {
        const response = NextResponse.redirect(redirectUrl(request, callbackUrl || '/manager'), 303);
        setAdminCookie(response);
        return response;
      }

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
      if (isFormPost) {
        return NextResponse.redirect(redirectUrl(request, '/login?error=invalid'), 303);
      }

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

    if (isFormPost) {
      const response = NextResponse.redirect(redirectUrl(request, callbackUrl || '/account'), 303);
      setUserCookie(response, username);
      return response;
    }

    return NextResponse.json({ success: true, isAdmin: false });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Đã có lỗi xảy ra' },
      { status: 500 }
    );
  }
}
