'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { SiteHeader } from '@/components/layout/site-header';
import { useCartStore } from '@/lib/cart-store';
import type { Product } from '@/types/product';

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useCartStore();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');

        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const items = products.filter(
    (product) =>
      product._id && wishlist.includes(product._id)
  );

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-8 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <SiteHeader />

        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-300">
              Wishlist
            </p>

            <h1 className="text-2xl font-semibold text-white">
              Saved for later
            </h1>
          </div>

          {loading ? (
            <div className="py-10 text-center text-zinc-400">
              Loading wishlist...
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-[1.5rem] border border-dashed border-white/10 p-8 text-center text-zinc-400">
              <p className="mb-3 text-lg text-white">
                Nothing saved yet.
              </p>

              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-300 transition hover:text-white"
              >
                Discover products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {items.map((product) => (
                <div
                  key={product._id}
                  className="rounded-[1.5rem] border border-white/10 bg-zinc-900/70 p-5"
                >
                  <p className="text-sm text-brand-300">
                    {product.badge}
                  </p>

                  <h2 className="mt-2 text-lg font-semibold text-white">
                    {product.name}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    {product.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-white">
                      ${product.price}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        product._id &&
                        toggleWishlist(product._id)
                      }
                      className="text-sm text-brand-300 transition hover:text-white"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}