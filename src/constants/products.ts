import type { Product } from '@/types/product';

export const featuredProducts: Product[] = [
  {
    id: 'aurora-headphones',
    name: 'Aurora Headphones',
    price: 249,
    originalPrice: 299,
    description: 'Immersive sound and seamless comfort for daily focus.',
    badge: 'Bestseller',
    category: 'Audio',
  },
  {
    id: 'lumen-smart-lamp',
    name: 'Lumen Smart Lamp',
    price: 89,
    originalPrice: 119,
    description: 'Adaptive ambient lighting for modern spaces.',
    badge: 'New',
    category: 'Home',
  },
  {
    id: 'atlas-backpack',
    name: 'Atlas Backpack',
    price: 129,
    originalPrice: 159,
    description: 'Luxury utility designed for everyday movement.',
    badge: 'Limited',
    category: 'Travel',
  },
];
