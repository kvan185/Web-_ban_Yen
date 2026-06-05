import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const productsImagesFolder = path.join(process.cwd(), 'public', 'images', 'products');
const squareBackground = { r: 13, g: 44, b: 39, alpha: 1 };

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
    const image = sharp(imageBuffer, { animated: file.type === 'image/gif' });
    const metadata = await image.metadata();
    const squareSize = Math.max(metadata.width || 0, metadata.height || 0, 1200);
    const squaredImage = image.resize(squareSize, squareSize, {
      fit: 'contain',
      background: squareBackground,
      withoutEnlargement: false,
    });

    fs.writeFileSync(savePath, await squaredImage.toBuffer());

    return NextResponse.json({ imageUrl: `/images/products/${filename}` });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
