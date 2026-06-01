import { NextResponse } from 'next/server';
import { getCategories, saveCategories } from '@/lib/dataStore';

export async function GET() {
  try {
    return NextResponse.json(await getCategories());
  } catch {
    return NextResponse.json({ message: 'Loi khi doc danh muc' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const categories = await request.json();
    await saveCategories(categories);
    return NextResponse.json({ message: 'Da luu danh muc thanh cong' }, { status: 200 });
  } catch {
    return NextResponse.json({ message: 'Loi khi luu danh muc' }, { status: 500 });
  }
}
