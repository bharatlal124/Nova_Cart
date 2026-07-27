import Link from 'next/link';
import { SiteHeader } from '@/components/layout/site-header';

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-3 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <SiteHeader />
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur sm:p-6 lg:p-8">
          <h1 className="text-3xl font-semibold text-white">Your profile</h1>
          <p className="mt-4 text-lg leading-8 text-zinc-300">
            This protected profile area is now ready for your personal account experience, order history, addresses, and settings.
          </p>
          <div className="mt-8 flex gap-4">
            <Link href="/products" className="rounded-full bg-brand-500 px-5 py-3 font-medium text-white transition hover:bg-brand-600">
              Continue shopping
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
