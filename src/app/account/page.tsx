import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AccountPage() {
  const cookieStore = await cookies();

  if (cookieStore.has('admin_session')) {
    redirect('/manager');
  }

  if (cookieStore.has('user_session')) {
    redirect('/manager/profile');
  }

  redirect('/login?callbackUrl=/manager/profile');
}
