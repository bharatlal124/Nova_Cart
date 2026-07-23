'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { SiteHeader } from '@/components/layout/site-header';
import ProductForm from '@/components/dashboard/ProductForm';
import type { Product } from '@/types/product';

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);

        if (!res.ok) {
          throw new Error('Unable to fetch product');
        }

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
        Loading...
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-zinc-950 flex items-center justify-center text-red-400">
        Product not found.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-8 lg:px-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <SiteHeader />

        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h1 className="mb-8 text-3xl font-semibold text-white">
            Edit Product
          </h1>

          <ProductForm
            mode="edit"
            product={product}
          />
        </section>
      </div>
    </main>
  );
}