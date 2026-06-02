import { isKvConfigured, kv } from '@/lib/kv';

type AnalyticsRecentEntry = {
  at: string;
  path: string;
  referrer: string;
  device: string;
  deviceLabel?: string;
  isNewSession?: boolean;
};

function topEntries(source: Record<string, number> = {}, limit = 5) {
  return Object.entries(source)
    .map(([label, value]) => [label, Number(value)] as const)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit);
}

async function readNumberMap(key: string) {
  const data = (await kv!.hgetall<Record<string, number | string>>(key)) || {};
  return Object.fromEntries(
    Object.entries(data).map(([label, value]) => [label, Number(value) || 0])
  );
}

async function getAnalytics() {
  if (!isKvConfigured()) {
    return {
      summary: {},
      byDay: {},
      byMonth: {},
      pages: {},
      referrers: {},
      devices: {},
      recent: [] as AnalyticsRecentEntry[],
    };
  }

  const [summaryRaw, byDay, byMonth, pages, referrers, devicesRaw, recentRaw] = await Promise.all([
    kv!.hgetall<Record<string, number | string>>('analytics:summary'),
    readNumberMap('analytics:byDay'),
    readNumberMap('analytics:byMonth'),
    readNumberMap('analytics:pages'),
    readNumberMap('analytics:referrers'),
    kv!.hgetall<Record<string, number | string>>('analytics:devices'),
    kv!.lrange<string>('analytics:recent', 0, 19),
  ]);

  return {
    summary: summaryRaw || {},
    byDay,
    byMonth,
    pages,
    referrers,
    devices: devicesRaw || {},
    recent: (recentRaw || []).map((entry) => {
      try {
        return JSON.parse(entry) as AnalyticsRecentEntry;
      } catch {
        return null;
      }
    }).filter(Boolean) as AnalyticsRecentEntry[],
  };
}

function formatDateTime(value: string) {
  try {
    return new Intl.DateTimeFormat('vi-VN', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'Asia/Ho_Chi_Minh',
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export default async function AdminDashboard() {
  const analytics = await getAnalytics();
  const days = topEntries(analytics.byDay, 7);
  const months = topEntries(analytics.byMonth, 6);
  const pages = topEntries(analytics.pages, 6);
  const referrers = topEntries(analytics.referrers, 5);
  const mobile = Number(analytics.devices.mobile || 0);
  const desktop = Number(analytics.devices.desktop || 0);
  const pageViews = Number(analytics.summary.pageViews || analytics.summary.total || 0);
  const uniqueSessions = Number(analytics.summary.uniqueSessions || 0);

  return (
    <div>
      <h1>Bảng điều khiển</h1>
      <p className="manager-muted">
        Theo dõi phiên truy cập, lượt xem trang, trang được xem nhiều và nguồn truy cập để tối ưu nội dung bán hàng.
      </p>

      <div className="stats-grid">
        <div className="glass-card stat-card">
          <span>Phiên khách truy cập</span>
          <strong>{uniqueSessions.toLocaleString('vi-VN')}</strong>
        </div>
        <div className="glass-card stat-card">
          <span>Lượt xem trang</span>
          <strong>{pageViews.toLocaleString('vi-VN')}</strong>
        </div>
        <div className="glass-card stat-card">
          <span>Mobile</span>
          <strong>{mobile.toLocaleString('vi-VN')}</strong>
        </div>
        <div className="glass-card stat-card">
          <span>Desktop</span>
          <strong>{desktop.toLocaleString('vi-VN')}</strong>
        </div>
      </div>

      <div className="manager-grid two-cols">
        <section className="glass-card">
          <h2>Theo ngày</h2>
          <div className="analytics-list">
            {days.length ? days.map(([label, value]) => (
              <div key={label}><span>{label}</span><strong>{value}</strong></div>
            )) : <p>Chưa có dữ liệu truy cập.</p>}
          </div>
        </section>

        <section className="glass-card">
          <h2>Theo tháng</h2>
          <div className="analytics-list">
            {months.length ? months.map(([label, value]) => (
              <div key={label}><span>{label}</span><strong>{value}</strong></div>
            )) : <p>Chưa có dữ liệu truy cập.</p>}
          </div>
        </section>

        <section className="glass-card">
          <h2>Trang được xem nhiều</h2>
          <div className="analytics-list">
            {pages.length ? pages.map(([label, value]) => (
              <div key={label}><span>{label}</span><strong>{value}</strong></div>
            )) : <p>Chưa có dữ liệu trang.</p>}
          </div>
        </section>

        <section className="glass-card">
          <h2>Nguồn truy cập</h2>
          <div className="analytics-list">
            {referrers.length ? referrers.map(([label, value]) => (
              <div key={label}><span>{label}</span><strong>{value}</strong></div>
            )) : <p>Chưa có dữ liệu nguồn truy cập.</p>}
          </div>
        </section>

        <section className="glass-card" style={{ gridColumn: '1 / -1' }}>
          <h2>Thiết bị truy cập gần đây</h2>
          <div className="analytics-list">
            {analytics.recent.length ? analytics.recent.map((entry, index) => (
              <div key={`${entry.at}-${index}`}>
                <span>
                  {(entry.deviceLabel || entry.device)} · {entry.path}
                </span>
                <strong>{formatDateTime(entry.at)}</strong>
              </div>
            )) : <p>Chưa có dữ liệu thiết bị truy cập.</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
