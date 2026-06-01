import { NextResponse } from 'next/server';
import { getSettings, saveSettings } from '@/lib/dataStore';

export async function GET() {
  try {
    return NextResponse.json(await getSettings());
  } catch {
    return NextResponse.json({ error: 'Failed to read settings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newSettings = await request.json();
    await saveSettings(newSettings);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
