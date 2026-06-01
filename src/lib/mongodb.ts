import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'yenth';

let cachedClient: MongoClient | null = null;

export async function getMongoDb() {
  if (!uri) {
    throw new Error('Missing MONGODB_URI');
  }

  if (!cachedClient) {
    cachedClient = new MongoClient(uri);
    await cachedClient.connect();
  }

  return cachedClient.db(dbName);
}
