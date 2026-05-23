import { NextResponse } from 'next/server';
import { getAdminProfile } from '../../../../lib/adminAuth';

export async function GET() {
  const profile = getAdminProfile();
  return NextResponse.json(profile);
}
