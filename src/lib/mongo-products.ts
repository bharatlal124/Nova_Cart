import { getDb } from '@/lib/mongodb';
import type { Product } from '@/types/product';

export interface ProductRecord extends Product {
  createdAt: string;
}

export async function getProducts() {
  const db = await getDb();
  const products = db.collection<ProductRecord>('products');

  return products.find({}).sort({ createdAt: -1 }).toArray();
}

export async function createProduct(input: Product) {
  const db = await getDb();
  const products = db.collection<ProductRecord>('products');

  const record: ProductRecord = {
    ...input,
    createdAt: new Date().toISOString(),
  };

  await products.insertOne(record);
  return record;
}
