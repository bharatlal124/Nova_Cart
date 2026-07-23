'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Heart, ShoppingBag } from 'lucide-react';

import type { Product } from '@/types/product';
import { useCartStore } from '@/lib/cart-store';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

interface WishlistItem {
  _id: string;
  userId: string;
  productId: string;
  createdAt: string;
}

export function ProductCard({
  product,
  className,
}: ProductCardProps) {
  const { addToCart } = useCartStore();

  const productId = product._id ?? '';

  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!productId) return;

    async function loadWishlist() {
      try {
        const res = await fetch('/api/wishlist');

        if (!res.ok) return;

        const wishlist: WishlistItem[] = await res.json();

        setLiked(
          wishlist.some(
            (item) => item.productId === productId
          )
        );
      } catch (err) {
        console.error(err);
      }
    }

    loadWishlist();
  }, [productId]);

  async function handleWishlist() {
    if (!productId || loading) return;

    setLoading(true);

    try {
      const method = liked ? 'DELETE' : 'POST';

      const res = await fetch('/api/wishlist', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
        }),
      });

      if (!res.ok) {
        throw new Error('Wishlist request failed');
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
        'group flex h-full flex-col rounded-3xl border border-white/10 bg-zinc-900/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-xl',
        className
      )}
    >
      {/* Image */}
      <div className="mb-5 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-500/20 via-zinc-800 to-zinc-700">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-52" />
        )}
      </div>

      {/* Badge */}
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="rounded-full bg-brand-500/10 px-3 py-1 text-brand-300">
          {product.badge}
        </span>

        <span className="text-zinc-400">
          {product.category}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-white">
        {product.name}
      </h3>

      {/* Description */}
      <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-400">
        {product.description}
      </p>

      {/* Price */}
      <div className="mt-6">
        <p className="text-2xl font-semibold text-white">
          ₹{product.price}
        </p>

        {product.originalPrice && (
          <p className="text-sm text-zinc-500 line-through">
            ₹{product.originalPrice}
          </p>
        )}
      </div>

      <div className="mt-auto pt-6">
        {/* Wishlist + Cart */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleWishlist}
            disabled={loading}
            className={cn(
              'rounded-full border border-white/10 p-3 transition',
              liked
                ? 'bg-red-500/20 text-red-300'
                : 'text-zinc-300 hover:bg-white/10 hover:text-white',
              loading &&
                'cursor-not-allowed opacity-70'
            )}
          >
            <Heart
              className={cn(
                'h-5 w-5',
                liked && 'fill-current'
              )}
            />
          </button>

          <button
            type="button"
            onClick={() => addToCart(product)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-brand-600"
          >
            <ShoppingBag className="h-4 w-4" />
            Add to cart
          </button>
        </div>

        {/* View */}
        <Link
          href={`/products/${product._id}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand-300 transition hover:text-white"
        >
          View Details
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}