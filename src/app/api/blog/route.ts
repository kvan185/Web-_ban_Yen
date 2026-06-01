import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const blogDirPath = path.join(process.cwd(), 'src', 'data', 'blog');
const metadataFilePath = path.join(process.cwd(), 'src', 'data', 'blog-metadata.json');

function getMetadata() {
  if (!fs.existsSync(metadataFilePath)) {
    fs.writeFileSync(metadataFilePath, '[]', 'utf8');
  }
  return JSON.parse(fs.readFileSync(metadataFilePath, 'utf8'));
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');

    const metadata = getMetadata();

    if (id) {
      const filePath = path.join(blogDirPath, `${id}.md`);
      const content = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
      const meta = metadata.find((m: any) => m.id === id);
      return NextResponse.json({ ...meta, content });
    }

    if (slug) {
      const meta = metadata.find((m: any) => m.slug === slug);
      if (!meta) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      const filePath = path.join(blogDirPath, `${meta.id}.md`);
      const content = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
      return NextResponse.json({ ...meta, content });
    }

    return NextResponse.json(metadata);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read blog' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { id, title, description, slug, content } = await request.json();
    
    if (!fs.existsSync(blogDirPath)) {
      fs.mkdirSync(blogDirPath, { recursive: true });
    }

    const metadata = getMetadata();
    const existingIndex = metadata.findIndex((m: any) => m.id === id);

    const newMeta = {
      id: id || Date.now().toString(),
      title,
      description,
      slug: slug || title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
      date: new Date().toISOString().split('T')[0]
    };

    if (existingIndex > -1) {
      metadata[existingIndex] = newMeta;
    } else {
      metadata.push(newMeta);
    }

    fs.writeFileSync(metadataFilePath, JSON.stringify(metadata, null, 2), 'utf8');
    fs.writeFileSync(path.join(blogDirPath, `${newMeta.id}.md`), content, 'utf8');

    return NextResponse.json(newMeta);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save blog post' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const metadata = getMetadata();
    const newMetadata = metadata.filter((m: any) => m.id !== id);
    fs.writeFileSync(metadataFilePath, JSON.stringify(newMetadata, null, 2), 'utf8');

    const filePath = path.join(blogDirPath, `${id}.md`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
}
