'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

import type { Product } from '@/types/product';

interface ProductTableProps {
  products: Product[];
  onDelete: (id: string) => void;
}

export default function ProductTable({
  products,
  onDelete,
}: ProductTableProps) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this product?'
    );

    if (!confirmDelete) return;

    try {
      setLoadingId(id);

      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete');
      }

      onDelete(id);

      router.refresh();
    } catch (err) {
      console.error(err);
      alert('Unable to delete product');
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="min-w-full">
        <thead className="bg-zinc-900">
          <tr className="text-left text-sm text-zinc-400">
            <th className="px-6 py-4">Product</th>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4">Price</th>
            <th className="px-6 py-4">Badge</th>
            <th className="px-6 py-4 text-right">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product._id}
              className="border-t border-white/10"
            >
              <td className="px-6 py-5">
                <div>
                  <p className="font-medium text-white">
                    {product.name}
                  </p>

                  <p className="mt-1 text-sm text-zinc-500 line-clamp-1">
                    {product.description}
                  </p>
                </div>
              </td>

              <td className="px-6 py-5 text-zinc-300">
                {product.category}
              </td>

              <td className="px-6 py-5 text-white">
                 ₹{product.price.toLocaleString("en-IN")}
              </td>

              <td className="px-6 py-5">
                <span className="rounded-full bg-brand-500/20 px-3 py-1 text-xs text-brand-300">
                  {product.badge}
                </span>
              </td>

              <td className="px-6 py-5">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/dashboard/products/edit/${product._id}`}
                    className="rounded-lg border border-white/10 p-2 text-zinc-300 transition hover:bg-white/10 hover:text-white"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>

                  <button
                    onClick={() =>
                      product._id &&
                      handleDelete(product._id)
                    }
                    disabled={loadingId === product._id}
                    className="rounded-lg border border-red-500/20 p-2 text-red-400 transition hover:bg-red-500/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {products.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="py-10 text-center text-zinc-500"
              >
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}