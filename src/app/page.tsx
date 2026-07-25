// import Link from 'next/link';
// import { ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';

// const featuredProducts = [
//   { name: 'Aurora Headphones', price: '$249', badge: 'Bestseller' },
//   { name: 'Lumen Smart Lamp', price: '$89', badge: 'New' },
//   { name: 'Atlas Backpack', price: '$129', badge: 'Limited' },
// ];

// export default function HomePage() {
//   return (
//     <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(53,99,233,0.18),_transparent_40%)]">
//       <section className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-20 lg:px-8">
//         <header className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
//           <div className="text-lg font-semibold tracking-wide">NovaCart</div>
//           <nav className="hidden gap-6 text-sm text-zinc-300 md:flex">
//             <Link href="/products" className="transition hover:text-white">Products</Link>
//             <Link href="/about" className="transition hover:text-white">About</Link>
//             <Link href="/contact" className="transition hover:text-white">Contact</Link>
//           </nav>
//           <Link href="/products" className="rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-600">
//             Shop Now
//           </Link>
//         </header>

//         <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
//           <div className="space-y-8">
//             <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-sm text-brand-100">
//               <Sparkles className="h-4 w-4" />
//               Premium commerce, reimagined
//             </div>
//             <div className="space-y-4">
//               <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
//                 Elevate your shopping experience with NovaCart.
//               </h1>
//               <p className="max-w-2xl text-lg text-zinc-300">
//                 Discover modern essentials, curated drops, and seamless delivery designed for the next generation of retail.
//               </p>
//             </div>
//             <div className="flex flex-wrap gap-4">
//               <Link href="/products" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-medium text-zinc-950 transition hover:bg-zinc-200">
//                 Explore Collection <ArrowRight className="h-4 w-4" />
//               </Link>
//               <Link href="/about" className="rounded-full border border-white/15 px-5 py-3 font-medium text-white transition hover:bg-white/10">
//                 Learn More
//               </Link>
//             </div>
//             <div className="flex flex-wrap gap-6 pt-3 text-sm text-zinc-400">
//               <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-brand-400" /> Secure checkout</div>
//               <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-brand-400" /> Fast delivery</div>
//               <div className="flex items-center gap-2"><RefreshCcw className="h-4 w-4 text-brand-400" /> Easy returns</div>
//             </div>
//           </div>

//           <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-soft backdrop-blur-xl">
//             <div className="grid gap-4 sm:grid-cols-2">
//               {featuredProducts.map((product) => (
//                 <div key={product.name} className="rounded-2xl border border-white/10 bg-zinc-900/70 p-4">
//                   <div className="mb-4 h-28 rounded-xl bg-gradient-to-br from-brand-500/30 via-zinc-800 to-zinc-700" />
//                   <div className="mb-2 flex items-center justify-between text-sm text-brand-300">
//                     <span>{product.badge}</span>
//                     <span>{product.price}</span>
//                   </div>
//                   <h3 className="font-medium text-white">{product.name}</h3>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }



import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  RefreshCcw,
} from 'lucide-react';

import { ProductCard } from '@/components/product/product-card';
import { getProducts } from '@/lib/mongo-products';

async function getFeaturedProducts() {
  try {
    return await getProducts();
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(53,99,233,0.18),_transparent_40%)]">
      <section className="mx-auto flex max-w-7xl flex-col gap-20 px-6 py-20 lg:px-8">
        {/* Header */}
        <header className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
          <div className="text-lg font-semibold tracking-wide text-white">
            NovaCart
          </div>

          <nav className="hidden gap-8 text-sm text-zinc-300 md:flex">
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

          <Link
            href="/products"
            className="rounded-full bg-brand-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-600"
          >
            Shop Now
          </Link>
        </header>

        {/* Hero */}
        <section className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-2 text-sm text-brand-100">
            <Sparkles className="h-4 w-4" />
            Premium commerce, reimagined
          </div>

          <h1 className="mt-8 max-w-5xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-7xl">
            Elevate your shopping experience with NovaCart.
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-zinc-300">
            Discover modern essentials, curated drops, and seamless
            delivery designed for the next generation of retail.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-zinc-900 transition hover:bg-zinc-200"
            >
              Explore Collection
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/about"
              className="rounded-full border border-white/15 px-6 py-3 font-medium text-white transition hover:bg-white/10"
            >
              Learn More
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-brand-400" />
              Secure Checkout
            </div>

            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-brand-400" />
              Fast Delivery
            </div>

            <div className="flex items-center gap-2">
              <RefreshCcw className="h-4 w-4 text-brand-400" />
              Easy Returns
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="space-y-10">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-300">
              Featured Collection
            </p>

            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
              Trending Products
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              Explore our latest arrivals and best-selling products
              curated for modern shoppers.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {featuredProducts.slice(0, 3).map((product: any) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>

          <div className="flex justify-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 font-medium text-white transition hover:bg-white/10"
            >
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}