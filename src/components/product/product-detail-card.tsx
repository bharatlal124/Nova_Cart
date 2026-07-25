'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';

import type { Product } from '@/types/product';
import { useCartStore } from '@/lib/cart-store';
import { cn } from '@/lib/utils';

interface ProductDetailCardProps {
  product: Product;
  className?: string;
}

interface WishlistItem {
  _id: string;
  userId: string;
  productId: string;
  createdAt: string;
}

export function ProductDetailCard({
  product,
  className,
}: ProductDetailCardProps) {
  const { addToCart } = useCartStore();

  const productId = product._id ?? '';

  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load wishlist status
  useEffect(() => {
    if (!productId) return;

    async function loadWishlist() {
      try {
        const res = await fetch('/api/wishlist');

        if (!res.ok) return;

        const wishlist: WishlistItem[] = await res.json();

        const exists = wishlist.some(
          (item) => item.productId === productId
        );

        setLiked(exists);
      } catch (error) {
        console.error(error);
      }
    }

    loadWishlist();
  }, [productId]);

 async function handleWishlist() {
  if (!productId || loading) return;

  setLoading(true);

  try {
    const method = liked ? "DELETE" : "POST";

    const res = await fetch("/api/wishlist", {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
      }),
    });

    if (!res.ok) {
      throw new Error("Wishlist request failed");
    }

    setLiked(!liked);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
}

  return (
    <article
      className={cn(
        'rounded-[2rem] border border-white/10 bg-zinc-900/70 p-6 shadow-soft',
        className
      )}
    >
      {/* <div className="mb-6 h-48 rounded-[1.5rem] bg-gradient-to-br from-brand-500/30 via-zinc-800 to-zinc-700" /> */}
       {/* Image */}
      <div className="mb-5 bg-white  flex justify-center item-center overflow-hidden rounded-2xl from-brand-500/20 via-zinc-800 to-zinc-700">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-52 w-50 bg-white object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-52" />
        )}
      </div>
      <div className="mb-3 flex items-center justify-between text-sm text-brand-300">
        <span>{product.badge}</span>
        <span>{product.category}</span>
      </div>

      <h3 className="text-2xl font-semibold text-white">
        {product.name}
      </h3>

      <p className="mt-3 text-sm leading-7 text-zinc-400">
        {product.description}
      </p>

      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="text-2xl font-semibold text-white">
            ₹{product.price.toLocaleString("en-IN")}
          </p>

          {product.originalPrice && (
            <p className="text-sm text-zinc-500 line-through">
              ₹{product.price.toLocaleString("en-IN")}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleWishlist}
            disabled={loading}
            className={cn(
              'rounded-full border border-white/10 p-2.5 transition',
              liked
                ? 'bg-red-500/20 text-red-300'
                : 'text-zinc-300 hover:bg-white/10 hover:text-white',
              loading && 'cursor-not-allowed opacity-70'
            )}
            aria-label="Toggle wishlist"
          >
            <Heart
              className={cn(
                'h-4 w-4',
                liked && 'fill-current'
              )}
            />
          </button>

          <button
            type="button"
            onClick={() => addToCart(product)}
            className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-600"
          >
            <ShoppingBag className="h-4 w-4" />
            Add to cart
          </button>
        </div>
      </div>

      <Link
        href="/products"
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-300 transition hover:text-white"
      >
        Explore more
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}