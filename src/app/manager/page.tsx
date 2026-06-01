import fs from 'fs';
import path from 'path';

type AnalyticsStore = {
  total?: number;
  pageViews?: number;
  uniqueSessions?: number;
  byDay?: Record<string, number>;
  byMonth?: Record<string, number>;
  pages?: Record<string, number>;
  referrers?: Record<string, number>;
  devices?: {
    mobile?: number;
    desktop?: number;
  };
  recent?: Array<{
    at: string;
    path: string;
    referrer: string;
    device: string;
    isNewSession?: boolean;
  }>;
};

function getAnalytics(): AnalyticsStore {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'analytics.json');
    if (!fs.existsSync(filePath)) return {};
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return {};
  }
}

function topEntries(source: Record<string, number> = {}, limit = 5) {
  return Object.entries(source)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit);
}

export default function AdminDashboard() {
  const analytics = getAnalytics();
  const days = topEntries(analytics.byDay, 7);
  const months = topEntries(analytics.byMonth, 6);
  const pages = topEntries(analytics.pages, 6);
  const referrers = topEntries(analytics.referrers, 5);
  const mobile = analytics.devices?.mobile || 0;
  const desktop = analytics.devices?.desktop || 0;
  const pageViews = analytics.pageViews || analytics.total || 0;
  const uniqueSessions = analytics.uniqueSessions || pageViews;

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
      </div>
    </div>
  );
}
