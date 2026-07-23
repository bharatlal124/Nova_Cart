'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import type { Product } from '@/types/product';

interface ProductFormProps {
  mode: 'create' | 'edit';
  product?: Product;
}

export default function ProductForm({
  mode,
  product,
}: ProductFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: '',
    badge: '',
    image: '',
    description: '',
  });

  useEffect(() => {
    if (mode === 'edit' && product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        originalPrice: product.originalPrice
          ? product.originalPrice.toString()
          : '',
        category: product.category,
        badge: product.badge,
        image: product.image ?? '',
        description: product.description,
      });
    }
  }, [mode, product]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        name: formData.name,
        price: Number(formData.price),
        originalPrice: formData.originalPrice
          ? Number(formData.originalPrice)
          : undefined,
        category: formData.category,
        badge: formData.badge,
        image: formData.image,
        description: formData.description,
      };

      const url =
        mode === 'create'
          ? '/api/products'
          : `/api/products/${product?._id}`;

      const method =
        mode === 'create'
          ? 'POST'
          : 'PUT';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Failed');
      }

      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      console.error(err);
      alert(
        mode === 'create'
          ? 'Unable to create product.'
          : 'Unable to update product.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label className="mb-2 block text-sm text-white">
          Product Name
        </label>

        <input
          required
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-white">
            Price
          </label>

          <input
            required
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-white">
            Original Price
          </label>

          <input
            type="number"
            name="originalPrice"
            value={formData.originalPrice}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-white">
            Category
          </label>

          <input
            required
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-white">
            Badge
          </label>

          <input
            required
            name="badge"
            value={formData.badge}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-white">
          Image URL
        </label>

        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none"
        />
      </div>

      {formData.image && (
        <img
          src={formData.image}
          alt="Preview"
          className="h-48 w-48 rounded-xl border border-white/10 object-cover"
        />
      )}

      <div>
        <label className="mb-2 block text-sm text-white">
          Description
        </label>

        <textarea
          required
          rows={5}
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-brand-500 px-8 py-3 font-medium text-white transition hover:bg-brand-600 disabled:opacity-60"
      >
        {loading
          ? mode === 'create'
            ? 'Creating...'
            : 'Updating...'
          : mode === 'create'
          ? 'Create Product'
          : 'Update Product'}
      </button>
    </form>
  );
}