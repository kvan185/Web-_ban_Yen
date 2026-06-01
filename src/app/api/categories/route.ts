import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'categories.json');
    if (!fs.existsSync(filePath)) {
      return NextResponse.json([]);
    }
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return NextResponse.json(JSON.parse(fileContents));
  } catch (error) {
    return NextResponse.json({ message: 'Lỗi khi đọc danh mục' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const categories = await request.json();
    const filePath = path.join(process.cwd(), 'src', 'data', 'categories.json');
    
    fs.writeFileSync(filePath, JSON.stringify(categories, null, 2), 'utf8');
    return NextResponse.json({ message: 'Đã lưu danh mục thành công' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Lỗi khi lưu danh mục' }, { status: 500 });
  }
}
