import { SiteHeader } from '@/components/layout/site-header';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-3 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <SiteHeader />
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur sm:p-6 lg:p-8">
          <h1 className="text-3xl font-semibold text-white">Contact NovaCart</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
            We are building a premium support experience with real-time assistance, order updates, and a polished help center.
          </p>
        </section>
      </div>
    </main>
  );
}
