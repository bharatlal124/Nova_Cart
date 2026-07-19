'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/types/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  wishlist: string[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleWishlist: (id: string) => void;
  clearCart: () => void;
  isInWishlist: (id: string) => boolean;
  getCartCount: () => number;
  getCartSubtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      wishlist: [],
      addToCart: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((item) => item.product.id === product.id);

          if (existing) {
            return {
              ...state,
              items: state.items.map((item) =>
                item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
              ),
            };
          }

          return {
            ...state,
            items: [...state.items, { product, quantity }],
          };
        }),
      removeFromCart: (id) =>
        set((state) => ({
          ...state,
          items: state.items.filter((item) => item.product.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          ...state,
          items: state.items
            .map((item) => (item.product.id === id ? { ...item, quantity } : item))
            .filter((item) => item.quantity > 0),
        })),
      toggleWishlist: (id) =>
        set((state) => ({
          ...state,
          wishlist: state.wishlist.includes(id)
            ? state.wishlist.filter((itemId) => itemId !== id)
            : [...state.wishlist, id],
        })),
      clearCart: () => set({ items: [], wishlist: get().wishlist }),
      isInWishlist: (id) => get().wishlist.includes(id),
      getCartCount: () => get().items.reduce((total, item) => total + item.quantity, 0),
      getCartSubtotal: () => get().items.reduce((total, item) => total + item.product.price * item.quantity, 0),
    }),
    {
      name: 'novacart-store',
    },
  ),
);
