import fs from 'fs';
import path from 'path';

type ContactLead = {
  id: string;
  name: string;
  phone: string;
  need?: string;
  createdAt: string;
};

const contactLeadsFilePath = path.join(process.cwd(), 'src', 'data', 'contact-leads.json');

function getContactLeads(): ContactLead[] {
  try {
    if (!fs.existsSync(contactLeadsFilePath)) {
      return [];
    }

    const data = JSON.parse(fs.readFileSync(contactLeadsFilePath, 'utf8'));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function formatDate(value: string) {
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

export default function ManagerContactPage() {
  const leads = getContactLeads();

  return (
    <div>
      <h1>Khách liên hệ</h1>
      <p className="manager-muted" style={{ marginBottom: '24px' }}>
        Danh sách khách hàng để lại thông tin trên trang liên hệ để quản lý chủ động tư vấn.
      </p>

      {leads.length === 0 ? (
        <div className="glass-card" style={{ padding: '24px' }}>
          <p>Chưa có khách hàng nào để lại thông tin.</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }} className="glass-card">
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <th style={{ padding: '14px 12px' }}>Thời gian</th>
                <th style={{ padding: '14px 12px' }}>Họ tên</th>
                <th style={{ padding: '14px 12px' }}>Số điện thoại</th>
                <th style={{ padding: '14px 12px' }}>Nhu cầu</th>
                <th style={{ padding: '14px 12px' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <td style={{ padding: '14px 12px', whiteSpace: 'nowrap' }}>{formatDate(lead.createdAt)}</td>
                  <td style={{ padding: '14px 12px', fontWeight: 700 }}>{lead.name}</td>
                  <td style={{ padding: '14px 12px' }}>
                    <a href={`tel:${lead.phone}`} style={{ color: 'var(--primary-color)', fontWeight: 700 }}>
                      {lead.phone}
                    </a>
                  </td>
                  <td style={{ padding: '14px 12px' }}>{lead.need || '-'}</td>
                  <td style={{ padding: '14px 12px' }}>
                    <a href={`https://zalo.me/${lead.phone}`} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '8px 12px', display: 'inline-block' }}>
                      Zalo
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
