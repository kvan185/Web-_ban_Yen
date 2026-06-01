import { NextResponse } from 'next/server';
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

function ensureContactLeadsFile() {
  if (!fs.existsSync(contactLeadsFilePath)) {
    fs.writeFileSync(contactLeadsFilePath, '[]', 'utf8');
  }
}

function readContactLeads(): ContactLead[] {
  ensureContactLeadsFile();
  const data = fs.readFileSync(contactLeadsFilePath, 'utf8');
  const parsed = JSON.parse(data);
  return Array.isArray(parsed) ? parsed : [];
}

function writeContactLeads(leads: ContactLead[]) {
  ensureContactLeadsFile();
  fs.writeFileSync(contactLeadsFilePath, JSON.stringify(leads, null, 2), 'utf8');
}

export async function GET() {
  try {
    return NextResponse.json(readContactLeads());
  } catch {
    return NextResponse.json({ error: 'Failed to read contact leads' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || '').trim();
    const phone = String(body.phone || '').trim();
    const need = String(body.need || '').trim();

    if (!name || !phone) {
      return NextResponse.json({ error: 'Missing contact information' }, { status: 400 });
    }

    const lead: ContactLead = {
      id: `lead_${Date.now()}`,
      name,
      phone,
      need,
      createdAt: new Date().toISOString(),
    };

    writeContactLeads([lead, ...readContactLeads()]);
    return NextResponse.json({ success: true, lead });
  } catch {
    return NextResponse.json({ error: 'Failed to save contact lead' }, { status: 500 });
  }
}
