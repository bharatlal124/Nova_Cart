import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/types/product';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <article className={cn('rounded-3xl border border-white/10 bg-zinc-900/70 p-5 shadow-soft', className)}>
      <div className="mb-4 h-36 rounded-2xl bg-gradient-to-br from-brand-500/30 via-zinc-800 to-zinc-700" />
      <div className="mb-3 flex items-center justify-between text-sm text-brand-300">
        <span>{product.badge}</span>
        <span>{product.category}</span>
      </div>
      <h3 className="text-lg font-semibold text-white">{product.name}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-400">{product.description}</p>
      <div className="mt-5 flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold text-white">${product.price}</p>
          {product.originalPrice ? <p className="text-sm text-zinc-500 line-through">${product.originalPrice}</p> : null}
        </div>
        <Link href={`/products/${product.id}`} className="inline-flex items-center gap-2 text-sm font-medium text-brand-300 transition hover:text-white">
          View <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
