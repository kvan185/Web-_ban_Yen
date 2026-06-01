import BlogAdminClient, { Post } from './BlogAdminClient';
import { getBlogPosts } from '@/lib/dataStore';

function repairText(value = '') {
  if (!/(Ã|Ä|Æ|Â|áº|á»|â€|ðŸ)/.test(value)) {
    return value;
  }

  try {
    return Buffer.from(value, 'latin1').toString('utf8');
  } catch {
    return value;
  }
}

export default async function BlogAdminPage() {
  const posts = ((await getBlogPosts()) as Post[]).map((post) => ({
    ...post,
    title: repairText(post.title),
    description: repairText(post.description),
    content: post.content || '',
  }));

  return <BlogAdminClient initialPosts={posts} />;
}
