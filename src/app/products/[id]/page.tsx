import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/layout/site-header';
import { ProductDetailCard } from '@/components/product/product-detail-card';
import { featuredProducts } from '@/constants/products';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = featuredProducts.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-8 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <SiteHeader />
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <ProductDetailCard product={product} />
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Why customers love it</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Designed to feel effortless</h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-zinc-400">
              <li>• Premium finishes and signature craftsmanship.</li>
              <li>• Built to blend into everyday routines with ease.</li>
              <li>• Fast delivery and seamless customer support.</li>
            </ul>
            <Link href="/products" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-brand-300 transition hover:text-white">
              Back to catalog
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
