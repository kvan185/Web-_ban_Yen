import { NextResponse } from 'next/server';
import { getMongoDb } from '@/lib/mongodb';

type ImageAsset = {
  _id: string;
  contentType: string;
  data: string;
  createdAt: string;
};

function sanitizeFilename(filename: string) {
  return filename.replace(/[^a-zA-Z0-9._-]/g, '-');
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing image id' }, { status: 400 });
    }

    const db = await getMongoDb();
    const image = await db.collection<ImageAsset>('imageAssets').findOne({ _id: id });

    if (!image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    return new NextResponse(Buffer.from(image.data, 'base64'), {
      headers: {
        'Content-Type': image.contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to read image' }, { status: 500 });
  }
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

    const maxSizeBytes = 4 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return NextResponse.json({ error: 'Image must be smaller than 4MB' }, { status: 400 });
    }

    const filename = `${Date.now()}-${sanitizeFilename(file.name)}`;
    const imageBuffer = Buffer.from(await file.arrayBuffer());
    const db = await getMongoDb();

    await db.collection<ImageAsset>('imageAssets').insertOne({
      _id: filename,
      contentType: file.type,
      data: imageBuffer.toString('base64'),
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ imageUrl: `/api/upload?id=${encodeURIComponent(filename)}` });
  } catch {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
