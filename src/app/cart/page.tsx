'use client';

import Link from 'next/link';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { SiteHeader } from '@/components/layout/site-header';
import { useCartStore } from '@/lib/cart-store';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getCartSubtotal, clearCart } = useCartStore();

  const subtotal = getCartSubtotal();

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-3 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <SiteHeader />
        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur sm:p-6 lg:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Your cart</p>
                <h1 className="text-2xl font-semibold text-white">{items.length ? 'Ready to check out' : 'Your bag is empty'}</h1>
              </div>
              {items.length ? (
                <button type="button" onClick={clearCart} className="text-sm text-zinc-400 transition hover:text-white">
                  Clear all
                </button>
              ) : null}
            </div>

            {items.length === 0 ? (
              <div className="rounded-[1.5rem] border border-dashed border-white/10 p-8 text-center text-zinc-400">
                <p className="mb-3 text-lg text-white">No products selected yet.</p>
                <Link href="/products" className="inline-flex items-center gap-2 text-sm font-medium text-brand-300 transition hover:text-white">
                  Browse products <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product._id} className="flex flex-col gap-4 rounded-[1.5rem] border border-white/10 bg-zinc-900/70 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-lg font-semibold text-white">{item.product.name}</p>
                      <p className="mt-1 text-sm text-zinc-400">{item.product.category}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
  item.product._id &&
  updateQuantity(item.product._id, Math.max(0, item.quantity - 1))
}
                        className="rounded-full border border-white/10 p-2 text-zinc-300 transition hover:bg-white/10"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="min-w-6 text-center text-sm font-medium text-white">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() =>
  item.product._id &&
  updateQuantity(item.product._id, item.quantity + 1)
}
                        className="rounded-full border border-white/10 p-2 text-zinc-300 transition hover:bg-white/10"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                       onClick={() =>
  item.product._id &&
  removeFromCart(item.product._id)
}
                        className="ml-2 rounded-full border border-white/10 p-2 text-zinc-300 transition hover:bg-white/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-white">₹{(item.product.price * item.quantity).toLocaleString("en-IN")}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Order summary</p>
            <div className="mt-5 space-y-3 text-sm text-zinc-400">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="text-white">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span className="text-white">Free</span>
              </div>
            </div>
            <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-zinc-900/70 p-4">
              <div className="flex items-center justify-between text-lg font-semibold text-white">
                <span>Total</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
            </div>
            <button type="button" className="mt-6 w-full rounded-full bg-brand-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-brand-600">
              Proceed to checkout
            </button>
          </aside>
        </section>
      </div>
    </main>
  );
}
