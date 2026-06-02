import { NextResponse } from 'next/server';
import { getAnalyticsDayKey, getAnalyticsMonthKey, isKvConfigured, kv } from '@/lib/kv';

type DeviceType = 'mobile' | 'desktop';

export async function POST(request: Request) {
  try {
    if (!isKvConfigured()) {
      return NextResponse.json({ ok: true, skipped: 'kv-not-configured' });
    }

    const body = await request.json().catch(() => ({}));
    const url = new URL(request.url);
    const pagePath = typeof body.path === 'string' && body.path.startsWith('/') ? body.path : '/';

    if (
      pagePath.startsWith('/manager') ||
      pagePath.startsWith('/login') ||
      pagePath.startsWith('/api') ||
      pagePath.startsWith('/_next')
    ) {
      return NextResponse.json({ ok: true });
    }

    const now = new Date();
    const day = getAnalyticsDayKey(now);
    const month = getAnalyticsMonthKey(now);
    const width = Number(body.width) || 1024;
    const device = (width < 768 ? 'mobile' : 'desktop') as DeviceType;
    const referrer = typeof body.referrer === 'string' && body.referrer ? body.referrer : 'Trực tiếp';
    const normalizedReferrer = referrer.startsWith(url.origin) ? 'Nội bộ' : referrer;
    const sessionId = typeof body.sessionId === 'string' && body.sessionId.length <= 80 ? body.sessionId : '';
    const platform = typeof body.platform === 'string' ? body.platform.trim() : '';
    const language = typeof body.language === 'string' ? body.language.trim() : '';
    const userAgent = request.headers.get('user-agent') || '';
    const deviceLabel = [device, platform, language].filter(Boolean).join(' · ') || device;
    const sessionKey = `analytics:sessions:${day}`;
    const isNewSession = Boolean(sessionId) && !(await kv.sismember(sessionKey, sessionId));

    await kv.hincrby('analytics:summary', 'pageViews', 1);
    await kv.hincrby('analytics:summary', 'total', 1);
    await kv.hincrby('analytics:byDay', day, 1);
    await kv.hincrby('analytics:byMonth', month, 1);
    await kv.hincrby('analytics:pages', pagePath, 1);
    await kv.hincrby('analytics:referrers', normalizedReferrer, 1);
    await kv.hincrby('analytics:devices', device, 1);

    if (isNewSession && sessionId) {
      await kv.sadd(sessionKey, sessionId);
      await kv.hincrby('analytics:summary', 'uniqueSessions', 1);
    }

    await kv.lpush(
      'analytics:recent',
      JSON.stringify({
        at: now.toISOString(),
        path: pagePath,
        referrer: normalizedReferrer,
        device,
        deviceLabel,
        userAgent,
        isNewSession,
      })
    );
    await kv.ltrim('analytics:recent', 0, 49);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
