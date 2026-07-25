// import { SiteHeader } from '@/components/layout/site-header';

// export default function DashboardPage() {
//   return (
//     <main className="min-h-screen bg-zinc-950 px-6 py-8 lg:px-8">
//       <div className="mx-auto flex max-w-6xl flex-col gap-8">
//         <SiteHeader />
//         <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur">
//           <h1 className="text-3xl font-semibold text-white">Admin dashboard</h1>
//           <p className="mt-4 text-lg leading-8 text-zinc-300">
//             This space will host analytics, inventory, orders, and customer management for store operators.
//           </p>
//         </section>
//       </div>
//     </main>
//   );
// }



'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';

import { SiteHeader } from '@/components/layout/site-header';
import ProductTable from '@/components/dashboard/ProductTable';
import type { Product } from '@/types/product';

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);

      const res = await fetch('/api/products');

      if (!res.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await res.json();

      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleDelete(id: string) {
    setProducts((prev) =>
      prev.filter((product) => product._id !== id)
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-3 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">

        <SiteHeader />

        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur sm:p-6 lg:p-8">

          <div className="mb-8 flex items-center justify-between">

            <div>
              <h1 className="text-3xl font-semibold text-white">
                Products
              </h1>

              <p className="mt-2 text-zinc-400">
                Manage your store inventory.
              </p>
            </div>

            <Link
              href="/dashboard/products/new"
              className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-brand-600"
            >
              <Plus className="h-4 w-4" />
              Add Product
            </Link>

          </div>

          {loading ? (
            <div className="py-16 text-center text-zinc-400">
              Loading products...
            </div>
          ) : (
            <ProductTable
              products={products}
              onDelete={handleDelete}
            />
          )}

        </section>
      </div>
    </main>
  );
}