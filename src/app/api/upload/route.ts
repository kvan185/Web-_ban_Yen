import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const productsImagesFolder = path.join(process.cwd(), 'public', 'images', 'products');

function sanitizeFilename(filename: string) {
  return path.basename(filename).replace(/[^a-zA-Z0-9._-]/g, '-');
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File | null;

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Unsupported image type' }, { status: 400 });
    }

    const filename = `${Date.now()}-${sanitizeFilename(file.name)}`;
    const imageBuffer = Buffer.from(await file.arrayBuffer());

    if (!fs.existsSync(productsImagesFolder)) {
      fs.mkdirSync(productsImagesFolder, { recursive: true });
    }

    const savePath = path.join(productsImagesFolder, filename);
    fs.writeFileSync(savePath, imageBuffer);

    return NextResponse.json({ imageUrl: `/images/products/${filename}` });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
