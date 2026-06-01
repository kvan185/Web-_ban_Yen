import fs from 'fs';
import path from 'path';
import type { Collection, Document } from 'mongodb';
import { getMongoDb } from './mongodb';
import type { OrderHistoryItem } from './storage';

export type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  badge?: string;
  weight?: string;
  origin?: string;
  shelfLife?: string;
  usage?: string;
  category?: string;
};

export type Category = {
  id: string;
  name: string;
  description: string;
};

export type SiteSettings = {
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  productsPerRow: number;
  adminProductsPerPage: number;
};

export type BlogPost = {
  id: string;
  title: string;
  description: string;
  slug: string;
  imageUrl?: string;
  date?: string;
  content?: string;
};

export type AdminUserRecord = {
  username: string;
  email: string;
  passwordHash: string;
};

const defaultSettings: Required<SiteSettings> = {
  primaryColor: '#D4AF37',
  backgroundColor: '#062621',
  textColor: '#F5F5F5',
  productsPerRow: 4,
  adminProductsPerPage: 5,
};

function dataPath(fileName: string) {
  return path.join(process.cwd(), 'src', 'data', fileName);
}

function readJsonFile<T>(fileName: string, fallback: T): T {
  try {
    const filePath = dataPath(fileName);
    if (!fs.existsSync(filePath)) return fallback;
    return JSON.parse(fs.readFileSync(filePath, 'utf8')) as T;
  } catch {
    return fallback;
  }
}

function stripMongoId<T extends Document>(doc: T): Omit<T, '_id'> {
  const rest = { ...doc };
  delete rest._id;
  return rest;
}

async function getCollection<T extends Document>(name: string): Promise<Collection<T>> {
  const db = await getMongoDb();
  return db.collection<T>(name);
}

async function readCollectionWithSeed<T extends { id: string } & Document>(
  collectionName: string,
  seedFileName: string
): Promise<T[]> {
  try {
    const collection = await getCollection<T & { _id: string }>(collectionName);
    const count = await collection.estimatedDocumentCount();

    if (count === 0) {
      const seedItems = readJsonFile<T[]>(seedFileName, []);
      if (seedItems.length) {
        await collection.insertMany(seedItems.map((item) => ({ ...item, _id: item.id })) as any);
        return seedItems;
      }
    }

    const docs = await collection.find({}).sort({ _id: 1 }).toArray();
    return docs.map((doc) => stripMongoId(doc) as unknown as T);
  } catch {
    return readJsonFile<T[]>(seedFileName, []);
  }
}

async function replaceCollection<T extends { id: string } & Document>(
  collectionName: string,
  items: T[]
) {
  const collection = await getCollection<T & { _id: string }>(collectionName);
  await collection.deleteMany({});
  if (items.length) {
    await collection.insertMany(items.map((item) => ({ ...item, _id: item.id })) as any);
  }
}

export async function getProducts() {
  const products = await readCollectionWithSeed<Product & Document>('products', 'products.json');
  return products.map((product) => ({ ...product, description: product.description || '' }));
}

export async function saveProducts(products: Product[]) {
  await replaceCollection<Product & Document>('products', products);
}

export async function getCategories() {
  const categories = await readCollectionWithSeed<Category & Document>('categories', 'categories.json');
  return categories.map((category) => ({ ...category, description: category.description || '' }));
}

export async function saveCategories(categories: Category[]) {
  await replaceCollection<Category & Document>('categories', categories);
}

export async function getSettings(): Promise<SiteSettings> {
  try {
    const collection = await getCollection<SiteSettings & { _id: string }>('settings');
    const existing = await collection.findOne({ _id: 'site' });

    if (existing) {
      return { ...defaultSettings, ...stripMongoId(existing) };
    }

    const seedSettings = readJsonFile<SiteSettings>('settings.json', defaultSettings);
    const settings = { ...defaultSettings, ...seedSettings };
    await collection.updateOne({ _id: 'site' }, { $set: settings }, { upsert: true });
    return settings;
  } catch {
    return { ...defaultSettings, ...readJsonFile<SiteSettings>('settings.json', defaultSettings) };
  }
}

export async function saveSettings(settings: SiteSettings) {
  const collection = await getCollection<SiteSettings & { _id: string }>('settings');
  await collection.updateOne({ _id: 'site' }, { $set: settings }, { upsert: true });
}

export async function getOrders() {
  return readCollectionWithSeed<OrderHistoryItem & { id: string } & Document>('orders', 'orders.json');
}

export async function saveOrder(order: OrderHistoryItem & { id: string }) {
  const collection = await getCollection<OrderHistoryItem & { id: string; _id: string }>('orders');
  await collection.updateOne({ _id: order.id }, { $set: order }, { upsert: true });
}

export async function updateOrder(orderPatch: Partial<OrderHistoryItem> & { id: string }) {
  const collection = await getCollection<OrderHistoryItem & { id: string; _id: string }>('orders');
  await collection.updateOne({ _id: orderPatch.id }, { $set: orderPatch });
}

export async function getAdminUser() {
  try {
    const collection = await getCollection<AdminUserRecord & { _id: string }>('users');
    const existing = await collection.findOne({ _id: 'admin' });

    if (existing) {
      return stripMongoId(existing);
    }

    const seedUsers = readJsonFile<{ admin: AdminUserRecord } | null>('users.json', null);
    if (seedUsers?.admin) {
      await collection.updateOne(
        { _id: 'admin' },
        { $set: seedUsers.admin },
        { upsert: true }
      );
      return seedUsers.admin;
    }
  } catch {
  }

  return null;
}

export async function saveAdminUser(admin: AdminUserRecord) {
  const collection = await getCollection<AdminUserRecord & { _id: string }>('users');
  await collection.updateOne({ _id: 'admin' }, { $set: admin }, { upsert: true });
}

function getBlogSeedPosts(): BlogPost[] {
  const metadata = readJsonFile<BlogPost[]>('blog-metadata.json', []);
  const blogDirPath = path.join(process.cwd(), 'src', 'data', 'blog');

  return metadata.map((post) => {
    const contentPath = path.join(blogDirPath, `${post.id}.md`);
    const content = fs.existsSync(contentPath) ? fs.readFileSync(contentPath, 'utf8') : '';
    return { ...post, content };
  });
}

export async function getBlogPosts() {
  try {
    const collection = await getCollection<BlogPost & { _id: string }>('blogPosts');
    const count = await collection.estimatedDocumentCount();

    if (count === 0) {
      const seedPosts = getBlogSeedPosts();
      if (seedPosts.length) {
        await collection.insertMany(seedPosts.map((post) => ({ ...post, _id: post.id })) as any);
        return seedPosts;
      }
    }

    const docs = await collection.find({}).sort({ date: -1 }).toArray();
    return docs.map((doc) => stripMongoId(doc) as unknown as BlogPost);
  } catch {
    return getBlogSeedPosts();
  }
}

export async function getBlogPostById(id: string) {
  const posts = await getBlogPosts();
  return posts.find((post) => post.id === id) || null;
}

export async function getBlogPostBySlug(slug: string) {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug) || null;
}

export async function saveBlogPost(post: BlogPost) {
  const collection = await getCollection<BlogPost & { _id: string }>('blogPosts');
  await collection.updateOne({ _id: post.id }, { $set: post }, { upsert: true });
}

export async function deleteBlogPost(id: string) {
  const collection = await getCollection<BlogPost & { _id: string }>('blogPosts');
  await collection.deleteOne({ _id: id });
}
