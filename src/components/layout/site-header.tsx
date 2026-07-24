'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Heart,
  Menu,
  X,
  User,
  LogOut,
} from 'lucide-react';

import { useAuth } from '@/components/providers/auth-provider';
import { useCartStore } from '@/lib/cart-store';

export function SiteHeader() {
  const { user, signOut, isAuthenticated } = useAuth();
  const { getCartCount } = useCartStore();

  const cartCount = getCartCount();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-50 rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-semibold tracking-wide text-white"
        >
          NovaCart
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 text-sm text-zinc-300 md:flex">
          <Link
            href="/products"
            className="transition hover:text-white"
          >
            Products
          </Link>

          <Link
            href="/about"
            className="transition hover:text-white"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="transition hover:text-white"
          >
            Contact
          </Link>
        </nav>

        {/* Desktop Right */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/wishlist"
            className="rounded-full border border-white/10 p-2 text-zinc-300 transition hover:bg-white/10 hover:text-white"
          >
            <Heart className="h-5 w-5" />
          </Link>

          <Link
            href="/cart"
            className="relative rounded-full border border-white/10 p-2 text-zinc-300 transition hover:bg-white/10 hover:text-white"
          >
            <ShoppingBag className="h-5 w-5" />

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                href="/profile"
                className="text-sm font-medium text-zinc-200 hover:text-white"
              >
                {user?.name ?? 'Profile'}
              </Link>

              <button
                onClick={() => signOut()}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-200 transition hover:bg-white/10"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-zinc-200 hover:text-white"
              >
                Sign In
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-600"
              >
                Create Account
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-full border border-white/10 p-2 text-white md:hidden"
        >
          {menuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute left-0 right-0 top-[calc(100%+12px)] z-[999] rounded-3xl border border-white/10 bg-zinc-900 p-5 shadow-2xl md:hidden">

          {/* Navigation */}
          <nav className="flex flex-col gap-4 border-b border-white/10 pb-5 text-zinc-300">

            <Link
              href="/products"
              onClick={() => setMenuOpen(false)}
            >
              Products
            </Link>

            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>

            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>

          </nav>

          {/* Wishlist & Cart */}
          <div className="mt-5 flex flex-col gap-3">

            <Link
              href="/wishlist"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-zinc-300 transition hover:bg-white/10"
            >
              <Heart className="h-5 w-5" />
              Wishlist
            </Link>

            <Link
              href="/cart"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-zinc-300 transition hover:bg-white/10"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5" />
                Cart
              </div>

              {cartCount > 0 && (
                <span className="rounded-full bg-brand-500 px-2 py-1 text-xs text-white">
                  {cartCount}
                </span>
              )}
            </Link>

          </div>

          {/* User */}
          <div className="mt-5 border-t border-white/10 pt-5">

            {isAuthenticated ? (
              <div className="space-y-3">

                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-zinc-300 transition hover:bg-white/10"
                >
                  <User className="h-5 w-5" />
                  {user?.name ?? 'Profile'}
                </Link>

                <button
                  onClick={() => {
                    setMenuOpen(false);
                    signOut();
                  }}
                  className="flex w-full items-center gap-3 rounded-xl border border-red-500/30 px-4 py-3 text-red-400 transition hover:bg-red-500/10"
                >
                  <LogOut className="h-5 w-5" />
                  Log out
                </button>

              </div>
            ) : (
              <div className="space-y-3">

                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl border border-white/10 px-4 py-3 text-center text-zinc-200 transition hover:bg-white/10"
                >
                  Sign In
                </Link>

                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl bg-brand-500 px-4 py-3 text-center font-medium text-white transition hover:bg-brand-600"
                >
                  Create Account
                </Link>

              </div>
            )}

          </div>
        </div>
      )}
    </header>
  );
}