import { NextResponse } from 'next/server';
import { updateAdminPassword } from '../../../../lib/adminAuth';

export async function POST(request: Request) {
  try {
    const { currentPassword, newPassword, confirmPassword } = await request.json();

    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json({ success: false, message: 'Vui lòng điền đầy đủ thông tin' }, { status: 400 });
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json({ success: false, message: 'Mật khẩu mới và xác nhận mật khẩu không khớp' }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ success: false, message: 'Mật khẩu mới phải có ít nhất 8 ký tự' }, { status: 400 });
    }

    const updated = updateAdminPassword(currentPassword, newPassword);

    if (!updated) {
      return NextResponse.json({ success: false, message: 'Mật khẩu hiện tại không đúng' }, { status: 401 });
    }

    return NextResponse.json({ success: true, message: 'Đổi mật khẩu thành công' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Đã có lỗi xảy ra' }, { status: 500 });
  }
}
