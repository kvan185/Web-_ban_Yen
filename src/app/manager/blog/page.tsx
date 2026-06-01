import fs from 'fs';
import path from 'path';
import BlogAdminClient, { Post } from './BlogAdminClient';

const metadataFilePath = path.join(process.cwd(), 'src', 'data', 'blog-metadata.json');

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

function getInitialPosts(): Post[] {
  try {
    if (!fs.existsSync(metadataFilePath)) {
      return [];
    }

    const posts = JSON.parse(fs.readFileSync(metadataFilePath, 'utf8')) as Post[];
    return posts.map((post) => ({
      ...post,
      title: repairText(post.title),
      description: repairText(post.description),
      content: post.content || '',
    }));
  } catch {
    return [];
  }
}

export default function BlogAdminPage() {
  return <BlogAdminClient initialPosts={getInitialPosts()} />;
}
