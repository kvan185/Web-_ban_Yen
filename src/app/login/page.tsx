import LoginForm from './LoginForm';

type LoginPageProps = {
  searchParams?: Promise<{
    callbackUrl?: string | string[];
    error?: string | string[];
  }>;
};

function firstParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value || '';
}

function safePath(value: string) {
  return value.startsWith('/') && !value.startsWith('//') ? value : '';
}

function errorMessage(code: string) {
  if (code === 'missing') {
    return 'Vui lòng nhập tài khoản và mật khẩu';
  }

  if (code === 'invalid') {
    return 'Sai tài khoản hoặc mật khẩu';
  }

  return '';
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const callbackUrl = safePath(firstParam(params?.callbackUrl));
  const initialError = errorMessage(firstParam(params?.error));

  return <LoginForm callbackUrl={callbackUrl} initialError={initialError} />;
}
