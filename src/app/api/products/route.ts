import { NextResponse } from 'next/server';
import { getProducts, saveProducts } from '@/lib/dataStore';

export async function GET() {
  try {
    return NextResponse.json(await getProducts());
  } catch {
    return NextResponse.json({ error: 'Failed to read products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const products = await request.json();
    await saveProducts(products);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to save products' }, { status: 500 });
  }
}
