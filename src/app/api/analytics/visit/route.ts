import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

type AnalyticsStore = {
  total: number;
  byDay: Record<string, number>;
  byMonth: Record<string, number>;
  pages: Record<string, number>;
  referrers: Record<string, number>;
  devices: {
    mobile: number;
    desktop: number;
  };
  recent: Array<{
    at: string;
    path: string;
    referrer: string;
    device: 'mobile' | 'desktop';
  }>;
};

const analyticsPath = path.join(process.cwd(), 'src', 'data', 'analytics.json');

function emptyStore(): AnalyticsStore {
  return {
    total: 0,
    byDay: {},
    byMonth: {},
    pages: {},
    referrers: {},
    devices: { mobile: 0, desktop: 0 },
    recent: [],
  };
}

function readStore(): AnalyticsStore {
  try {
    if (!fs.existsSync(analyticsPath)) return emptyStore();
    return { ...emptyStore(), ...JSON.parse(fs.readFileSync(analyticsPath, 'utf8')) };
  } catch {
    return emptyStore();
  }
}

function increment(map: Record<string, number>, key: string) {
  map[key] = (map[key] || 0) + 1;
}

export async function POST(request: Request) {
  try {
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
    const day = now.toISOString().slice(0, 10);
    const month = day.slice(0, 7);
    const width = Number(body.width) || 1024;
    const device: 'mobile' | 'desktop' = width < 768 ? 'mobile' : 'desktop';
    const referrer = typeof body.referrer === 'string' && body.referrer ? body.referrer : 'Trực tiếp';
    const normalizedReferrer = referrer.startsWith(url.origin) ? 'Nội bộ' : referrer;
    const store = readStore();

    store.total += 1;
    increment(store.byDay, day);
    increment(store.byMonth, month);
    increment(store.pages, pagePath);
    increment(store.referrers, normalizedReferrer);
    store.devices[device] += 1;
    store.recent = [
      { at: now.toISOString(), path: pagePath, referrer: normalizedReferrer, device },
      ...store.recent,
    ].slice(0, 50);

    fs.writeFileSync(analyticsPath, JSON.stringify(store, null, 2), 'utf8');

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
