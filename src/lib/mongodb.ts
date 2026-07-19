import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'NovaCart_DB';

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const mongoUri = uri;
let cachedClient: MongoClient | null = null;

export async function getMongoClient() {
  if (cachedClient) {
    return cachedClient;
  }

  cachedClient = new MongoClient(mongoUri);
  await cachedClient.connect();
  return cachedClient;
}

export async function getDb() {
  const client = await getMongoClient();
  return client.db(dbName);
}
