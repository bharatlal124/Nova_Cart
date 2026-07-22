import { ObjectId } from "mongodb";

import { getDb } from "@/lib/mongodb";
import type { Wishlist } from "@/types/wishlist";

interface WishlistDocument {
  _id?: ObjectId;

  // Store your custom user id as string
  userId: string;

  // Store MongoDB product id
  productId: ObjectId;

  createdAt: string;
}

const COLLECTION = "wishlists";

/**
 * Get wishlist of a user
 */
export async function getWishlistByUser(userId: string) {
  const db = await getDb();

  const wishlist = await db
    .collection<WishlistDocument>(COLLECTION)
    .find({
      userId,
    })
    .sort({
      createdAt: -1,
    })
    .toArray();

  return wishlist.map((item) => ({
    _id: item._id?.toString(),
    userId: item.userId,
    productId: item.productId.toString(),
    createdAt: item.createdAt,
  }));
}

/**
 * Check wishlist
 */
export async function isWishlisted(
  userId: string,
  productId: string
) {
  const db = await getDb();

  return db
    .collection<WishlistDocument>(COLLECTION)
    .findOne({
      userId,
      productId: new ObjectId(productId),
    });
}

/**
 * Add wishlist
 */
export async function addWishlist(
  userId: string,
  productId: string
) {
  const db = await getDb();

  const collection =
    db.collection<WishlistDocument>(COLLECTION);

  const exists = await collection.findOne({
    userId,
    productId: new ObjectId(productId),
  });

  if (exists) {
    return {
      _id: exists._id?.toString(),
      userId,
      productId,
      createdAt: exists.createdAt,
    };
  }

  const document: WishlistDocument = {
    userId,
    productId: new ObjectId(productId),
    createdAt: new Date().toISOString(),
  };

  const result = await collection.insertOne(document);

  return {
    _id: result.insertedId.toString(),
    userId,
    productId,
    createdAt: document.createdAt,
  };
}

/**
 * Remove wishlist
 */
export async function removeWishlist(
  userId: string,
  productId: string
) {
  const db = await getDb();

  return db
    .collection<WishlistDocument>(COLLECTION)
    .deleteOne({
      userId,
      productId: new ObjectId(productId),
    });
}

/**
 * Toggle wishlist
 */
export async function toggleWishlist(
  userId: string,
  productId: string
) {
  const exists = await isWishlisted(
    userId,
    productId
  );

  if (exists) {
    await removeWishlist(userId, productId);

    return {
      action: "removed",
    };
  }

  await addWishlist(userId, productId);

  return {
    action: "added",
  };
}