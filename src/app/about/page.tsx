import Link from 'next/link';
import { SiteHeader } from '@/components/layout/site-header';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-8 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <SiteHeader />
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h1 className="text-3xl font-semibold text-white">About NovaCart</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
            NovaCart brings together premium design, trusted commerce, and thoughtful product discovery into an experience that feels effortless from first click to final delivery.
          </p>
          <div className="mt-8 flex gap-4">
            <Link href="/products" className="rounded-full bg-brand-500 px-5 py-3 font-medium text-white transition hover:bg-brand-600">
              Browse Products
            </Link>
            <Link href="/contact" className="rounded-full border border-white/15 px-5 py-3 font-medium text-white transition hover:bg-white/10">
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
