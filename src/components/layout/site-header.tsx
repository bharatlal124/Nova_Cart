'use client';

import Link from 'next/link';
import { ShoppingBag, Heart } from 'lucide-react';
import { useAuth } from '@/components/providers/auth-provider';
import { useCartStore } from '@/lib/cart-store';

export function SiteHeader() {
  const { user, signOut, isAuthenticated } = useAuth();
  const { getCartCount } = useCartStore();
  const cartCount = getCartCount();

  return (
    <header className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
      <Link href="/" className="text-lg font-semibold tracking-wide text-white">
        NovaCart
      </Link>
      <nav className="hidden gap-6 text-sm text-zinc-300 md:flex">
        <Link href="/products" className="transition hover:text-white">
          Products
        </Link>
        <Link href="/about" className="transition hover:text-white">
          About
        </Link>
        <Link href="/contact" className="transition hover:text-white">
          Contact
        </Link>
      </nav>
      <div className="flex items-center gap-3">
        <Link href="/wishlist" className="rounded-full border border-white/10 p-2 text-zinc-300 transition hover:bg-white/10 hover:text-white">
          <Heart className="h-4 w-4" />
        </Link>
        <Link href="/cart" className="relative rounded-full border border-white/10 p-2 text-zinc-300 transition hover:bg-white/10 hover:text-white">
          <ShoppingBag className="h-4 w-4" />
          {cartCount > 0 ? (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-[10px] font-semibold text-white">
              {cartCount}
            </span>
          ) : null}
        </Link>
        {isAuthenticated ? (
          <>
            <Link href="/profile" className="text-sm font-medium text-zinc-200 transition hover:text-white">
              {user?.name ?? 'Profile'}
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              className="rounded-full border border-white/10 px-3 py-2 text-sm font-medium text-zinc-200 transition hover:bg-white/10"
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-sm font-medium text-zinc-200 transition hover:text-white">
              Sign in
            </Link>
            <Link href="/register" className="rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-600">
              Create account
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
