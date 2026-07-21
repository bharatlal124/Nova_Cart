// import { getDb } from '@/lib/mongodb';
// import type { Product } from '@/types/product';

// export interface ProductRecord extends Product {
//   createdAt: string;
// }

// export async function getProducts() {
//   const db = await getDb();
//   const products = db.collection<ProductRecord>('products');

//   return products.find({}).sort({ createdAt: -1 }).toArray();
// }

// export async function createProduct(input: Product) {
//   const db = await getDb();
//   const products = db.collection<ProductRecord>('products');

//   const record: ProductRecord = {
//     ...input,
//     createdAt: new Date().toISOString(),
//   };

//   await products.insertOne(record);
//   return record;
// }


import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/mongodb';
import type { Product } from '@/types/product';
import type { UpdateFilter } from "mongodb";
 

export interface ProductRecord {
  _id?: ObjectId;

  name: string;
  price: number;
  originalPrice?: number;

  description: string;
  badge: string;
  category: string;

  image?: string;

  createdAt: string;
}

export async function getProducts() {
  const db = await getDb();
  const products = db.collection<ProductRecord>('products');

  return await products.find({}).sort({ createdAt: -1 }).toArray();
}

export async function getProductById(id: string) {
  console.log("Searching for:", id);

  const db = await getDb();
  const products = db.collection<ProductRecord>("products");

  const product = await products.findOne({
    _id: new ObjectId(id),
  });

  console.log(product);

  return product;
}

export async function createProduct(input: Product) {
  const db = await getDb();
  const products = db.collection<ProductRecord>("products");

  const record: Omit<ProductRecord, "_id"> = {
    name: input.name,
    price: input.price,
    originalPrice: input.originalPrice,
    description: input.description,
    badge: input.badge,
    category: input.category,
    image: input.image,
    createdAt: new Date().toISOString(),
  };

  const result = await products.insertOne(record);

  return {
    ...record,
    _id: result.insertedId.toString(),
  };
}

export async function updateProduct(
  id: string,
  data: Partial<Product>
) {
  const db = await getDb();
  const products = db.collection<ProductRecord>('products');

 await products.updateOne(
  { _id: new ObjectId(id) },
  {
    $set: data,
  } as UpdateFilter<ProductRecord>
);

  return await getProductById(id);
}

export async function deleteProduct(id: string) {
  const db = await getDb();
  const products = db.collection<ProductRecord>('products');

  return await products.deleteOne({
    _id: new ObjectId(id),
  });
}