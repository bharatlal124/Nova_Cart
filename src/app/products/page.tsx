import { SiteHeader } from '@/components/layout/site-header';
import { ProductCard } from '@/components/product/product-card';
import { featuredProducts } from '@/constants/products';

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-8 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <SiteHeader />
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Curated essentials</p>
              <h1 className="text-3xl font-semibold text-white">Discover products built for modern living</h1>
            </div>
            <p className="max-w-xl text-sm text-zinc-400">
              Premium, minimal, and crafted for performance — from everyday staples to statement pieces.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
