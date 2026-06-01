import { NextResponse } from 'next/server';
import {
  deleteBlogPost,
  getBlogPostById,
  getBlogPostBySlug,
  getBlogPosts,
  saveBlogPost,
} from '@/lib/dataStore';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');

    if (id) {
      return NextResponse.json(await getBlogPostById(id));
    }

    if (slug) {
      const post = await getBlogPostBySlug(slug);
      if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json(post);
    }

    const posts = await getBlogPosts();
    return NextResponse.json(
      posts.map((post) => {
        const metadata = { ...post };
        delete metadata.content;
        return metadata;
      })
    );
  } catch {
    return NextResponse.json({ error: 'Failed to read blog' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { id, title, description, slug, content, imageUrl } = await request.json();
    const post = {
      id: id || Date.now().toString(),
      title,
      description,
      slug: slug || title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
      imageUrl,
      content,
      date: new Date().toISOString().split('T')[0],
    };

    await saveBlogPost(post);

    const metadata = { ...post };
    delete metadata.content;
    return NextResponse.json(metadata);
  } catch {
    return NextResponse.json({ error: 'Failed to save blog post' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    await deleteBlogPost(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
}
