import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const productsFilePath = path.join(process.cwd(), 'src', 'data', 'products.json');

export async function GET() {
  try {
    if (!fs.existsSync(productsFilePath)) {
      fs.writeFileSync(productsFilePath, '[]', 'utf8');
    }
    const data = fs.readFileSync(productsFilePath, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const products = await request.json();
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf8');
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save products' }, { status: 500 });
  }
}
